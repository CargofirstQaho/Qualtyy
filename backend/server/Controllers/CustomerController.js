// server/Controllers/customer-controller.js
const db = require("../models");
const bcrypt = require("bcrypt");

exports.createCustomer = async (req, res) => {
  try {
    console.log("\n=== CREATE CUSTOMER CONTROLLER ===");

    const {
      country_code,
      full_name,
      email_address,
      mobile_number,
      password, // confirmPassword already removed by middleware
    } = req.body;

    console.log("Received data:", {
      country_code,
      full_name,
      email_address,
      mobile_number,
      password: password ? `[${password.length} characters]` : "[MISSING]",
      confirmPassword: "Removed by middleware for security",
    });

    // The password validation middleware has already ensured:
    // 1. Both password and confirmPassword were provided
    // 2. They matched exactly
    // 3. Password meets length requirements
    // 4. confirmPassword has been removed from req.body

    // Validate other required fields
    if (
      !country_code ||
      !full_name ||
      !email_address ||
      !mobile_number ||
      !password
    ) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
        missing: {
          country_code: !country_code,
          full_name: !full_name,
          email_address: !email_address,
          mobile_number: !mobile_number,
          password: !password,
        },
      });
    }

    // Hash the validated password
    console.log("🔒 Hashing password...");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("✅ Password hashed successfully");

    // Handle file uploads
    let tradeLicenseUrl = null;
    let certificateUrl = null;
    let tradeLicenseName = null;
    let certificateName = null;

    if (req.files) {
      console.log("📁 Processing uploaded files...");

      if (req.files.tradeLicense && req.files.tradeLicense[0]) {
        tradeLicenseUrl = req.files.tradeLicense[0].path;
        tradeLicenseName = req.files.tradeLicense[0].filename;
        console.log("📄 Trade license uploaded:", tradeLicenseName);
      }

      if (
        req.files.importExportCertificate &&
        req.files.importExportCertificate[0]
      ) {
        certificateUrl = req.files.importExportCertificate[0].path;
        certificateName = req.files.importExportCertificate[0].filename;
        console.log("📋 Certificate uploaded:", certificateName);
      }
    } else {
      console.log("📁 No files uploaded");
    }

    // Create customer with hashed password (NOT confirmPassword)
    console.log("💾 Creating customer in database...");
    const customer = await db.Customer.create({
      country_code,
      full_name,
      email_address,
      mobile_number,
      password: hashedPassword, // Only save the hashed password
      trade_license_or_legal_document_photo_url: tradeLicenseUrl,
      certificate_photo_url: certificateUrl,
    });

    console.log(
      `✅ Customer created successfully with ID: ${customer.customer_id}`
    );

    // Prepare secure response (never include password in response)
    const customerResponse = {
      customer_id: customer.customer_id,
      country_code: customer.country_code,
      full_name: customer.full_name,
      email_address: customer.email_address,
      mobile_number: customer.mobile_number,
      trade_license_name: tradeLicenseName,
      certificate_name: certificateName,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };

    console.log("🚀 Sending success response");
    console.log("=== CREATE CUSTOMER COMPLETED ===\n");

    res.status(201).json({
      success: true,
      message: "Customer created successfully with password validation",
      customer: customerResponse,
    });
  } catch (error) {
    console.error("❌ ERROR in createCustomer:", error);

    // Handle specific database errors
    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0].path;
      const fieldName =
        field === "email_address" ? "Email address" : "Mobile number";

      console.log(
        `❌ Unique constraint violation: ${fieldName} already exists`
      );
      return res.status(409).json({
        success: false,
        error: "DUPLICATE_ENTRY",
        message: `${fieldName} already exists. Please use a different ${fieldName.toLowerCase()}.`,
        field: field,
      });
    }

    if (error.name === "SequelizeValidationError") {
      console.log("❌ Validation error:", error.errors);
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: "Data validation failed",
        details: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
          value: e.value,
        })),
      });
    }

    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred while creating the customer",
      details: error.message,
    });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.customer_id, {
      attributes: { exclude: ["password"] }, // NEVER return password
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.checkCertificates = async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await db.Customer.findOne({
      where: { customer_id: customerId },
      attributes: [
        "customer_id",
        "trade_license_or_legal_document_photo_url",
        "certificate_photo_url",
      ],
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const hasDocuments =
      !!customer.trade_license_or_legal_document_photo_url &&
      !!customer.certificate_photo_url;

    if (!hasDocuments) {
      return res.status(403).json({ message: "Documents not uploaded" });
    }

    res.status(200).json({ message: "Customer has required documents" });
  } catch (err) {
    console.error("❌ Error checking certificates:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Bonus: Login function to verify password hashing works
exports.loginCustomer = async (req, res) => {
  try {
    console.log("\n=== LOGIN ATTEMPT ===");
    const { email_address, password } = req.body;

    if (!email_address || !password) {
      console.log("❌ Login failed: Missing credentials");
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find customer by email
    console.log(`🔍 Looking up customer: ${email_address}`);
    const customer = await db.Customer.findOne({
      where: { email_address },
    });

    if (!customer) {
      console.log("❌ Login failed: Customer not found");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare provided password with hashed password in database
    console.log("🔒 Verifying password...");
    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      console.log("❌ Login failed: Invalid password");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("✅ Login successful");

    // Remove password from response
    const customerResponse = customer.toJSON();
    delete customerResponse.password;

    console.log("=== LOGIN COMPLETED ===\n");

    res.status(200).json({
      success: true,
      message: "Login successful",
      customer: customerResponse,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
