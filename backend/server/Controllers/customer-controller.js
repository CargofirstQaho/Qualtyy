// server/Controllers/customer-controller.js
const db = require("../models");
const bcrypt = require("bcrypt"); // ADD THIS

exports.createCustomer = async (req, res) => {
  try {
    console.log("=== Create Customer Controller ===");
    console.log("Received body:", {
      ...req.body,
      password: req.body.password
        ? `[${req.body.password.length} chars]`
        : "[MISSING]",
      confirmPassword: req.body.confirmPassword
        ? `[${req.body.confirmPassword.length} chars]`
        : "[MISSING]",
    });
    console.log(
      "Received files:",
      req.files ? Object.keys(req.files) : "No files"
    );

    const {
      country_code,
      full_name,
      email_address,
      mobile_number,
      password, // This should be available due to validation middleware
    } = req.body;

    // Validate required fields
    if (
      !country_code ||
      !full_name ||
      !email_address ||
      !mobile_number ||
      !password
    ) {
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

    // Hash the password
    console.log("Hashing password...");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Password hashed successfully");

    // Handle file uploads
    let tradeLicenseUrl = null;
    let certificateUrl = null;
    let tradeLicenseName = null;
    let certificateName = null;

    if (req.files) {
      if (req.files.tradeLicense && req.files.tradeLicense[0]) {
        tradeLicenseUrl = req.files.tradeLicense[0].path;
        tradeLicenseName = req.files.tradeLicense[0].filename;
        console.log("Trade license file:", tradeLicenseName);
      }
      if (
        req.files.importExportCertificate &&
        req.files.importExportCertificate[0]
      ) {
        certificateUrl = req.files.importExportCertificate[0].path;
        certificateName = req.files.importExportCertificate[0].filename;
        console.log("Certificate file:", certificateName);
      }
    }

    // Create customer with hashed password
    console.log("Creating customer in database...");
    const customer = await db.Customer.create({
      country_code,
      full_name,
      email_address,
      mobile_number,
      password: hashedPassword, // Store hashed password
      trade_license_or_legal_document_photo_url: tradeLicenseUrl,
      certificate_photo_url: certificateUrl,
    });

    console.log("Customer created with ID:", customer.customer_id);

    // Prepare response (exclude password)
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

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      customer: customerResponse,
    });
  } catch (error) {
    console.error("❌ Error creating customer:", error);

    // Handle unique constraint errors
    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0].path;
      return res.status(409).json({
        success: false,
        message: `${
          field === "email_address" ? "Email" : "Mobile number"
        } already exists`,
      });
    }

    // Handle validation errors
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.customer_id, {
      attributes: { exclude: ["password"] }, // Exclude password from response
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

// Bonus: Login function
exports.loginCustomer = async (req, res) => {
  try {
    const { email_address, password } = req.body;

    if (!email_address || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find customer by email
    const customer = await db.Customer.findOne({
      where: { email_address },
    });

    if (!customer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Remove password from response
    const customerResponse = customer.toJSON();
    delete customerResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      customer: customerResponse,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
