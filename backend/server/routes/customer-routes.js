// Updated Router with Enhanced Password Validation
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

const customerController = require("../controllers/customerController");

// Your existing multer setup...
const tradeLicensePath = path.join(
  "C:",
  "Mansi frontend",
  "Qualty",
  "client",
  "Trade Licence"
);
const certificatePath = path.join(
  "C:",
  "Mansi frontend",
  "Qualty",
  "client",
  "Certificates"
);

[tradeLicensePath, certificatePath].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "tradeLicense") {
      cb(null, tradeLicensePath);
    } else if (file.fieldname === "importExportCertificate") {
      cb(null, certificatePath);
    } else {
      cb(new Error("Invalid field name"), null);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

// ENHANCED PASSWORD VALIDATION MIDDLEWARE
const validatePasswords = (req, res, next) => {
  console.log("\n=== PASSWORD VALIDATION STARTED ===");

  const { password, confirmPassword } = req.body;

  // Log what we received (safely)
  console.log("Password received:", !!password);
  console.log("Confirm password received:", !!confirmPassword);
  console.log("Password length:", password ? password.length : 0);
  console.log(
    "Confirm password length:",
    confirmPassword ? confirmPassword.length : 0
  );

  // Step 1: Check if both fields are provided
  if (!password) {
    console.log("❌ VALIDATION FAILED: Password is missing");
    return res.status(400).json({
      success: false,
      error: "MISSING_PASSWORD",
      message: "Password is required",
    });
  }

  if (!confirmPassword) {
    console.log("❌ VALIDATION FAILED: Confirm password is missing");
    return res.status(400).json({
      success: false,
      error: "MISSING_CONFIRM_PASSWORD",
      message: "Confirm password is required",
    });
  }

  // Step 2: Check if passwords match (THIS IS THE MAIN VALIDATION)
  if (password !== confirmPassword) {
    console.log("❌ VALIDATION FAILED: Passwords do not match");
    console.log(`Password: "${password}"`);
    console.log(`Confirm: "${confirmPassword}"`);
    return res.status(400).json({
      success: false,
      error: "PASSWORD_MISMATCH",
      message:
        "Password and confirm password do not match. Please ensure both passwords are identical.",
    });
  }

  // Step 3: Check password strength
  if (password.length < 6) {
    console.log("❌ VALIDATION FAILED: Password too short");
    return res.status(400).json({
      success: false,
      error: "PASSWORD_TOO_SHORT",
      message: "Password must be at least 6 characters long",
    });
  }

  // Optional: Additional password requirements
  if (password.length > 128) {
    console.log("❌ VALIDATION FAILED: Password too long");
    return res.status(400).json({
      success: false,
      error: "PASSWORD_TOO_LONG",
      message: "Password cannot exceed 128 characters",
    });
  }

  // Step 4: All validations passed
  console.log("✅ PASSWORD VALIDATION SUCCESSFUL");
  console.log("- Both passwords provided ✓");
  console.log("- Passwords match ✓");
  console.log("- Password length acceptable ✓");
  console.log("=== PASSWORD VALIDATION COMPLETED ===\n");

  // Remove confirmPassword from req.body before it reaches the controller
  // This ensures it's not accidentally saved to database
  delete req.body.confirmPassword;
  console.log(
    "🗑️  Confirm password removed from request body (security measure)"
  );

  next();
};

// ROUTES WITH VALIDATION

// POST route with password validation
router.post(
  "/",
  upload.fields([
    { name: "tradeLicense", maxCount: 1 },
    { name: "importExportCertificate", maxCount: 1 },
  ]),
  validatePasswords, // This middleware will catch mismatched passwords
  customerController.createCustomer
);

// GET all customers (password excluded)
router.get("/", async (req, res) => {
  try {
    const db = require("../models");
    const customers = await db.Customer.findAll({
      attributes: { exclude: ["password"] }, // Never return passwords
    });
    res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET customer by ID
router.get("/:customer_id", customerController.getCustomerById);

// PUT - Update customer (with optional password change)
router.put("/:customer_id", async (req, res) => {
  try {
    const db = require("../models");
    const {
      full_name,
      email_address,
      mobile_number,
      password,
      confirmPassword,
    } = req.body;

    const customer = await db.Customer.findByPk(req.params.customer_id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Update basic fields
    if (full_name !== undefined) customer.full_name = full_name;
    if (email_address !== undefined) customer.email_address = email_address;
    if (mobile_number !== undefined) customer.mobile_number = mobile_number;

    // Handle password update with validation
    if (password !== undefined) {
      console.log("\n=== PASSWORD UPDATE VALIDATION ===");

      // Validate confirm password for updates too
      if (!confirmPassword) {
        return res.status(400).json({
          success: false,
          error: "MISSING_CONFIRM_PASSWORD",
          message: "Confirm password is required when updating password",
        });
      }

      if (password !== confirmPassword) {
        console.log("❌ Password update failed: Passwords don't match");
        return res.status(400).json({
          success: false,
          error: "PASSWORD_MISMATCH",
          message: "Password and confirm password do not match",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: "PASSWORD_TOO_SHORT",
          message: "Password must be at least 6 characters long",
        });
      }

      // Hash and save new password
      console.log("✅ Password update validation passed");
      const saltRounds = 10;
      customer.password = await bcrypt.hash(password, saltRounds);
      console.log("🔒 New password hashed and ready to save");
    }

    await customer.save();
    console.log("💾 Customer updated successfully");

    // Return response without password
    const customerResponse = customer.toJSON();
    delete customerResponse.password;

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer: customerResponse,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Other routes remain the same...
router.get("/check-certificates/:customer_id", async (req, res) => {
  try {
    const db = require("../models");
    const customer = await db.Customer.findOne({
      where: { customer_id: req.params.customer_id },
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
  } catch (error) {
    console.error("Error checking certificates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const db = require("../models");
    const deletedCount = await db.Customer.destroy({
      where: { customer_id: req.params.id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting customer:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
