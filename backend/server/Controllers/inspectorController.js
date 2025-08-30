// controllers/inspectorController.js
// Contains logic for inspector registration, login, fetching, updating, and deletion

const db = require("../models");
const { Op, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Inspector = db.Inspector;
const LoginSession = db.Auth;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET not set in environment!");
  process.exit(1);
}

// =========================
// Register Inspector
// =========================
exports.registerInspector = async (req, res) => {
  try {
    const {
      inspectorType,
      countryCode,
      name,
      email,
      password,
      mobile,
      address,
      commodities,
      createAccount,
      accountNumber,
      bankName,
      ifscCode,
    } = req.body;

    // Parse commodities JSON
    let parsedCommodities;
    try {
      parsedCommodities = JSON.parse(commodities);
      if (!Array.isArray(parsedCommodities)) {
        return res
          .status(400)
          .json({ message: "Commodities must be an array." });
      }

      for (const item of parsedCommodities) {
        if (!item.name || typeof item.name !== "string" || !item.name.trim()) {
          return res
            .status(400)
            .json({ message: "Each commodity must have a non-empty name." });
        }
        if (
          typeof item.experience === "undefined" ||
          isNaN(parseFloat(item.experience)) ||
          parseFloat(item.experience) < 0
        ) {
          return res.status(400).json({
            message:
              "Each commodity must have a valid non-negative experience.",
          });
        }
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid commodities format." });
    }

    // Required fields
    if (
      !inspectorType ||
      !countryCode ||
      !name ||
      !email ||
      !password ||
      !mobile ||
      !address ||
      parsedCommodities.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required basic fields." });
    }

    // Email format check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    }

    // Password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    // Check if email already exists for same inspectorType
    const existingInspector = await Inspector.findOne({
      where: {
        email: email.toLowerCase(),
        inspectorType: inspectorType,
      },
    });

    if (existingInspector) {
      return res.status(409).json({
        message: `This email is already registered as an ${inspectorType} inspector.`,
      });
    }

    // File upload (if any)
    let governmentIdUrl = null;
    if (req.file) {
      governmentIdUrl = `/uploads/inspector-documents/${req.file.filename}`;
    }

    const isCreateAccount = createAccount === "true";

    if (isCreateAccount) {
      if (!governmentIdUrl) {
        return res
          .status(400)
          .json({ message: "Government ID is required to create an account." });
      }
      if (!accountNumber || !bankName) {
        return res
          .status(400)
          .json({ message: "Account number and bank name are required." });
      }
      if (inspectorType === "indian" && !ifscCode) {
        return res
          .status(400)
          .json({ message: "IFSC code is required for Indian inspectors." });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create inspector
    const newInspector = await Inspector.create({
      inspectorType,
      countryCode,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      mobile,
      address,
      commodities: parsedCommodities,
      createAccount: isCreateAccount,
      governmentIdUrl,
      accountNumber: accountNumber || null,
      bankName: bankName || null,
      ifscCode: ifscCode || null,
    });

    res.status(201).json({
      message: "Inspector registered successfully!",
      inspector: {
        id: newInspector.inspector_id,
        name: newInspector.name,
        email: newInspector.email,
        inspectorType: newInspector.inspectorType,
      },
    });
  } catch (error) {
    console.error("Error during inspector registration:", error);
    if (error instanceof UniqueConstraintError) {
      return res
        .status(409)
        .json({ message: "A unique constraint error occurred." });
    }
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed.",
        errors: messages,
      });
    }
    res.status(500).json({
      message: "Server error during registration.",
      error: error.message,
    });
  }
};

// =========================
// Login (Multi-role)
// =========================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    let user = null;
    let role = null;
    let userEmail = null;

    // --- Check Roles ---
    user = await db.Customer.findOne({ where: { email_address: email } });
    if (user) {
      role = "customer";
      userEmail = user.email_address;
    }

    if (!user) {
      user = await db.Company.findOne({ where: { email_address: email } });
      if (user) {
        role = "company";
        userEmail = user.email_address;
      }
    }

    if (!user) {
      user = await Inspector.findOne({ where: { email: email } });
      if (user) {
        role = "inspector";
        userEmail = user.email;
      }
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials. User not found." });
    }

    // --- Check Password ---
    const storedPasswordHash =
      role === "company" ? user.password_hash : user.password;
    const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials. Wrong password." });
    }

    const userId =
      role === "customer"
        ? user.customer_id
        : role === "inspector"
        ? user.inspector_id
        : user.id;

    // --- Check Documents for Customer ---
    let hasDocuments = true;
    if (role === "customer") {
      hasDocuments =
        !!user.trade_license_or_legal_document_photo_url &&
        !!user.certificate_photo_url;
    }

    // --- Generate Token ---
    const tokenPayload = { userId, email: userEmail, role, hasDocuments };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "12h" });

    // --- Prepare fullName and mobileNumber ---
    let fullName = null;
    let mobileNumber = null;

    if (role === "customer") {
      fullName = `${user.firstName} ${user.lastName}`;
      mobileNumber = user.phoneNumber;
    } else if (role === "company") {
      fullName = user.representative_name;
      mobileNumber = user.phone_number;
    } else if (role === "inspector") {
      fullName = user.name; // Inspector uses single 'name' field
      mobileNumber = user.mobile; // Inspector uses 'mobile' field
    }

    // --- Save to login_sessions (replace old session) ---
    await LoginSession.destroy({ where: { userId } });

    await LoginSession.create({
      userId,
      role,
      token,
      loginTime: new Date(),
      ipAddress: req.ip || req.connection?.remoteAddress || null,
      fullName,
      emailId: userEmail,
      mobileNumber,
    });

    // --- Response User Data ---
    let responseUserData = { id: userId, email: userEmail, role, hasDocuments };
    if (role === "customer") {
      responseUserData.firstName = user.firstName;
      responseUserData.lastName = user.lastName;
      responseUserData.customer_id = user.customer_id;
    } else if (role === "company") {
      responseUserData.companyName = user.company_name;
      responseUserData.representativeName = user.representative_name;
      responseUserData.company_id = user.id;
    } else if (role === "inspector") {
      responseUserData.name = user.name;
      responseUserData.inspector_id = user.inspector_id;
      responseUserData.inspectorType = user.inspectorType;
    }

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: responseUserData,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// =========================
// Get All Inspectors
// =========================
exports.getInspectors = async (req, res) => {
  try {
    const inspectors = await Inspector.findAll({
      attributes: { exclude: ["password"] }, // hide password
    });
    res.status(200).json(inspectors);
  } catch (error) {
    console.error("Error fetching inspectors:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching inspectors." });
  }
};

// =========================
// Get Inspector by ID
// =========================
exports.getInspectorById = async (req, res) => {
  try {
    const { id } = req.params;
    const inspector = await Inspector.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!inspector) {
      return res.status(404).json({ message: "Inspector not found." });
    }

    res.status(200).json(inspector);
  } catch (error) {
    console.error("Error fetching inspector:", error);
    res.status(500).json({ message: "Server error while fetching inspector." });
  }
};

// =========================
// Update Inspector Profile
// =========================
exports.updateInspector = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, address, inspectorType, countryCode } =
      req.body;

    // Validate request
    if (!id) {
      return res.status(400).json({ message: "Inspector ID is required." });
    }

    // Find inspector
    const inspector = await Inspector.findByPk(id);
    if (!inspector) {
      return res.status(404).json({ message: "Inspector not found." });
    }

    // Validate email format if provided
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    }

    // Check if email already exists for another inspector (if email is being updated)
    if (email && email.toLowerCase() !== inspector.email.toLowerCase()) {
      const existingInspector = await Inspector.findOne({
        where: {
          email: email.toLowerCase(),
          inspector_id: { [Op.ne]: id }, // Exclude current inspector
        },
      });

      if (existingInspector) {
        return res.status(409).json({
          message: "This email is already registered by another inspector.",
        });
      }
    }

    // Prepare update data (only include fields that are provided)
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email.toLowerCase();
    if (mobile !== undefined) updateData.mobile = mobile;
    if (address !== undefined) updateData.address = address;
    if (inspectorType !== undefined) updateData.inspectorType = inspectorType;
    if (countryCode !== undefined) updateData.countryCode = countryCode;

    // Update inspector
    await inspector.update(updateData);

    // Fetch updated inspector data (excluding password)
    const updatedInspector = await Inspector.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      message: "Inspector updated successfully!",
      inspector: updatedInspector,
    });
  } catch (error) {
    console.error("Error updating inspector:", error);

    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({
        message:
          "A unique constraint error occurred. Email might already be in use.",
      });
    }

    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed.",
        errors: messages,
      });
    }

    res.status(500).json({ message: "Server error during update." });
  }
};

// =========================
// Update Inspector Billing
// =========================
exports.updateInspectorBilling = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      billingName,
      billingAddress,
      billingCountry,
      billingState,
      billingCity,
      billingPostalCode,
      accountNumber,
      bankName,
      ifscCode,
    } = req.body;

    // Validate request
    if (!id) {
      return res.status(400).json({ message: "Inspector ID is required." });
    }

    // Find inspector
    const inspector = await Inspector.findByPk(id);
    if (!inspector) {
      return res.status(404).json({ message: "Inspector not found." });
    }

    // Prepare billing update data
    const billingUpdateData = {};

    // Basic billing info (you might need to add these fields to your Inspector model)
    if (billingName !== undefined) billingUpdateData.billingName = billingName;
    if (billingAddress !== undefined)
      billingUpdateData.billingAddress = billingAddress;
    if (billingCountry !== undefined)
      billingUpdateData.billingCountry = billingCountry;
    if (billingState !== undefined)
      billingUpdateData.billingState = billingState;
    if (billingCity !== undefined) billingUpdateData.billingCity = billingCity;
    if (billingPostalCode !== undefined)
      billingUpdateData.billingPostalCode = billingPostalCode;

    // Bank account info (these fields already exist in your model)
    if (accountNumber !== undefined)
      billingUpdateData.accountNumber = accountNumber;
    if (bankName !== undefined) billingUpdateData.bankName = bankName;
    if (ifscCode !== undefined) billingUpdateData.ifscCode = ifscCode;

    // Update inspector with billing information
    await inspector.update(billingUpdateData);

    // Fetch updated inspector data
    const updatedInspector = await Inspector.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      message: "Billing information updated successfully!",
      inspector: updatedInspector,
    });
  } catch (error) {
    console.error("Error updating billing:", error);

    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed.",
        errors: messages,
      });
    }

    res.status(500).json({ message: "Server error during billing update." });
  }
};

// =========================
// Delete Inspector
// =========================
exports.deleteInspector = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Inspector.destroy({
      where: { inspector_id: id }, // Use correct primary key field
    });

    if (deleted) {
      return res
        .status(200)
        .json({ message: "Inspector deleted successfully." });
    } else {
      return res.status(404).json({ message: "Inspector not found." });
    }
  } catch (error) {
    console.error("Error deleting inspector:", error);
    res.status(500).json({ message: "Server error during delete." });
  }
};
