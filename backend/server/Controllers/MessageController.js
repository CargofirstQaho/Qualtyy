const db = require("../models");
const Message = db.Message;

const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Save and send email
exports.sendUserMessage = async (req, res) => {
  try {
    const {
      fullname,
      email,
      contactNumber,
      companyName,
      locationOfInspector,
      importerExporter,
      additionalDetails,
    } = req.body;

    // Validation
    if (
      !fullname?.trim() ||
      !email?.trim() ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      !contactNumber?.trim() ||
      !companyName?.trim() ||
      !locationOfInspector?.trim() ||
      !importerExporter?.trim()
    ) {
      return res.status(400).json({
        message:
          "Invalid input. All required fields must be provided and valid.",
      });
    }

    // Save to DB
    const savedMessage = await Message.create({
      fullname,
      email,
      contactNumber,
      companyName,
      locationOfInspector,
      importerExporter,
      additionalDetails,
    });

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "support@qualty.ai",
      subject: "New Inspector Inquiry",
      html: `
        <p><strong>Full Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Location of Inspector:</strong> ${locationOfInspector}</p>
        <p><strong>Importer/Exporter:</strong> ${importerExporter}</p>
        <p><strong>Additional Details:</strong> ${
          additionalDetails || "N/A"
        }</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: "Message saved and email sent successfully.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error sending user message:", error);
    return res.status(500).json({
      message: "Error processing message.",
      error: error.message,
    });
  }
};

// ✅ Save only (no email)
exports.saveOnly = async (req, res) => {
  try {
    const {
      fullname,
      email,
      contactNumber,
      companyName,
      locationOfInspector,
      importerExporter,
      additionalDetails,
    } = req.body;

    if (
      !fullname?.trim() ||
      !email?.trim() ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      !contactNumber?.trim() ||
      !companyName?.trim() ||
      !locationOfInspector?.trim() ||
      !importerExporter?.trim()
    ) {
      return res.status(400).json({
        message:
          "Invalid input. All required fields must be provided and valid.",
      });
    }

    const savedMessage = await Message.create({
      fullname,
      email,
      contactNumber,
      companyName,
      locationOfInspector,
      importerExporter,
      additionalDetails,
    });

    return res.status(201).json({
      message: "Message saved successfully (no email sent).",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).json({
      message: "Error saving message.",
      error: error.message,
    });
  }
};

// ✅ Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "fullname",
        "email",
        "contactNumber",
        "companyName",
        "locationOfInspector",
        "importerExporter",
        "additionalDetails",
        "createdAt",
      ],
    });

    return res.status(200).json({
      message: "Messages retrieved successfully.",
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      message: "Error fetching messages.",
      error: error.message,
    });
  }
};
