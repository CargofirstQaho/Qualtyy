const express = require("express");
const router = express.Router();
const companyController = require("../Controllers/CompanyController");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Get Company from your models

// -------- SET THE TARGET WINDOWS PATH --------
const uploadPath =
  "C:/Mansi frontend/Qualty/client/Indian Inspection company docs";

// Ensure the folder exists or create it
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// -------- MULTER CONFIG --------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// -------- MATCH FRONTEND FORM FIELD NAMES --------
const uploadFields = [
  { name: "tradeLicense", maxCount: 1 },
  { name: "importExportCertificate", maxCount: 1 },
  { name: "gstPanIec", maxCount: 1 },
  { name: "repGovernmentId", maxCount: 1 },
];

// -------- ROUTES --------

/**
 * @route POST /api/companies/register
 * @desc Register a new company with file uploads
 */
router.post(
  "/register",
  upload.fields(uploadFields), // Attach multer to handle multiple files
  companyController.registerCompany
);

/**
 * @route GET /api/companies/:company_type/:email_address
 */
router.get(
  "/:company_type/:email_address",
  companyController.getCompanyDetails
);

/**
 * @route GET /api/companies/uuid/:company_uuid
 */
router.get("/uuid/:company_uuid", async (req, res) => {
  try {
    const { company_uuid } = req.params;

    // Use standard Sequelize findOne method instead of custom method
    const company = await Company.findOne({
      where: { company_uuid: company_uuid },
    });

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found with this UUID." });
    }

    // Since team_members is stored as JSONB in the model, we can access it directly
    const { password_hash, ...companyWithoutHash } = company.toJSON();

    res.status(200).json({
      company: companyWithoutHash,
      members: company.team_members || [], // Get members from JSONB field
    });
  } catch (error) {
    console.error("Error fetching company by UUID:", error);
    res
      .status(500)
      .json({ message: "Server error fetching company details by UUID." });
  }
});

module.exports = router;
