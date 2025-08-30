// professional.controller.js
// This file contains the business logic for handling requests.
const db = require("../models");

const Professional = db.Professional;

// This function handles the POST request to create a new professional.
const createProfessional = async (req, res) => {
  // Destructure the data from the request body.
  // The password field has been removed from the request body.
  const {
    companyName,
    licenceNumber,
    experience,
    joinedDate,
    bio,
    specializations,
  } = req.body;

  try {
    // Perform robust server-side validation.
    // The password validation has been removed.
    if (
      !companyName ||
      !licenceNumber ||
      !bio ||
      !specializations ||
      specializations.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    // Use the Sequelize model's `create` method to save the data to the database.
    const newProfessional = await Professional.create({
      companyName,
      licenceNumber,
      experience,
      joinedDate,
      bio,
      specializations,
    });

    // Send a success response with a status code of 201 (Created).
    res.status(201).json({
      message: "Professional data saved successfully!",
      data: {
        id: newProfessional.id,
        companyName: newProfessional.companyName,
        licenceNumber: newProfessional.licenceNumber,
      },
    });
  } catch (error) {
    // If a unique constraint is violated (e.g., duplicate license number), send a 409 Conflict error.
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "A professional with this license number already exists.",
      });
    }
    // Handle other validation errors from Sequelize.
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed.",
        errors: messages,
      });
    }
    // For all other errors, send a 500 Internal Server Error.
    console.error("Error during professional creation:", error);
    res.status(500).json({
      message: "Server error during professional creation.",
      error: error.message,
    });
  }
};

module.exports = {
  createProfessional,
};
