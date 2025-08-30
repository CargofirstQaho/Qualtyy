// controllers/companyController.js

const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const fs = require("fs"); // ✅ For handling file deletion
const { v4: uuidv4 } = require("uuid"); // ✅ For generating unique UUIDs
const Company = db.Company; // ✅ Import Company model from Sequelize

/**
 * Registers a new company (either Indian or International) and handles file uploads.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.registerCompany = async (req, res) => {
  let uploadedFilePaths = [];

  try {
    const {
      companyType,
      companyName,
      officeNumber,
      registeredAddress,
      accountNumber,
      bankName,
      ifscCode,
      swiftCode,
      repName,
      repContact,
      repEmail,
      repPassword,
      teamMembers,
    } = req.body;

    console.log("DEBUG req.body:", req.body);

    const company_type_backend =
      companyType.charAt(0).toUpperCase() + companyType.slice(1);

    if (!companyType || !companyName || !repEmail || !repPassword) {
      return res.status(400).json({
        message:
          "Company type, name, representative email, and password are required.",
      });
    }

    if (!["Indian", "International"].includes(company_type_backend)) {
      return res.status(400).json({
        message: 'Invalid company type. Must be "Indian" or "International".',
      });
    }

    let trade_license_path = null;
    let import_export_certificate_path = null;
    let gst_pan_iec_document_path = null;
    let government_id_passport_path = null;
    let government_id_indian_path = null;

    if (req.files) {
      if (company_type_backend === "International") {
        trade_license_path = req.files["tradeLicense"]
          ? req.files["tradeLicense"][0].path
          : null;
        import_export_certificate_path = req.files["importExportCertificate"]
          ? req.files["importExportCertificate"][0].path
          : null;
        government_id_passport_path = req.files["repGovernmentId"]
          ? req.files["repGovernmentId"][0].path
          : null;

        if (trade_license_path) uploadedFilePaths.push(trade_license_path);
        if (import_export_certificate_path)
          uploadedFilePaths.push(import_export_certificate_path);
        if (government_id_passport_path)
          uploadedFilePaths.push(government_id_passport_path);
      } else if (company_type_backend === "Indian") {
        gst_pan_iec_document_path = req.files["gstPanIec"]
          ? req.files["gstPanIec"][0].path
          : null;
        government_id_indian_path = req.files["repGovernmentId"]
          ? req.files["repGovernmentId"][0].path
          : null;

        if (gst_pan_iec_document_path)
          uploadedFilePaths.push(gst_pan_iec_document_path);
        if (government_id_indian_path)
          uploadedFilePaths.push(government_id_indian_path);
      }
    }

    const existingCompany = await Company.findOne({
      where: {
        email_address: repEmail,
        company_type: company_type_backend,
      },
    });

    if (existingCompany) {
      uploadedFilePaths.forEach((filePath) => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
      return res.status(409).json({
        message:
          "This email ID is already registered for this company type. Please use some other email ID.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(repPassword, salt);
    const company_uuid = uuidv4();

    let parsedMembers = [];
    if (teamMembers) {
      try {
        parsedMembers =
          typeof teamMembers === "string"
            ? JSON.parse(teamMembers)
            : teamMembers;
      } catch (parseError) {
        console.error("Error parsing teamMembers JSON:", parseError);
        parsedMembers = [];
      }
    }

    const validTeamMembers = Array.isArray(parsedMembers)
      ? parsedMembers.filter(
          (member) => member.name && member.name.trim() !== ""
        )
      : [];

    const companyData = {
      company_uuid,
      company_type: company_type_backend,
      company_name: companyName,
      office_number: officeNumber,
      registered_address:
        company_type_backend === "International" ? registeredAddress : null,
      address: company_type_backend === "Indian" ? registeredAddress : null,
      trade_license_path,
      import_export_certificate_path,
      gst_pan_iec_document_path,
      bank_account_number: accountNumber,
      bank_name: bankName,
      ifsc_code: company_type_backend === "Indian" ? ifscCode : null,
      swift_code: company_type_backend === "International" ? swiftCode : null,
      representative_name: repName,
      contact_number: repContact,
      email_address: repEmail,
      password_hash,
      government_id_passport_path,
      government_id_indian_path,
      team_members: validTeamMembers,
    };

    const newCompany = await Company.create(companyData);

    res.status(201).json({
      message: `${company_type_backend} company registered successfully!`,
      company: {
        id: newCompany.id,
        company_uuid: newCompany.company_uuid,
        company_name: newCompany.company_name,
        email_address: newCompany.email_address,
        company_type: newCompany.company_type,
      },
    });
  } catch (error) {
    console.error("Error during company registration:", error);
    uploadedFilePaths.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    if (error.message.includes("Only PDF, JPG, and PNG files are allowed!")) {
      return res.status(400).json({ message: error.message });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message:
          "This email ID is already registered for this company type. Please use some other email ID.",
      });
    }

    res.status(500).json({ message: "Server error during registration." });
  }
};

/**
 * Retrieves a company's details and its members by email and company type.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getCompanyDetails = async (req, res) => {
  try {
    const { email_address, company_type } = req.params;

    const company_type_backend =
      company_type.charAt(0).toUpperCase() + company_type.slice(1);

    if (
      !company_type_backend ||
      !["Indian", "International"].includes(company_type_backend)
    ) {
      return res.status(400).json({
        message:
          'Invalid or missing company type in URL. Must be "Indian" or "International".',
      });
    }

    const company = await Company.findOne({
      where: {
        email_address: email_address,
        company_type: company_type_backend,
      },
    });

    if (!company) {
      return res.status(404).json({
        message: `${company_type_backend} company with email ${email_address} not found.`,
      });
    }

    const companyJson = company.toJSON();
    const { password_hash, ...companyWithoutHash } = companyJson;

    res.status(200).json({
      company: companyWithoutHash,
      members: company.team_members || [],
    });
  } catch (error) {
    console.error("Error fetching company details:", error);
    res.status(500).json({ message: "Server error fetching company details." });
  }
};
