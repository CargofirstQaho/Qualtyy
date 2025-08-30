// server/controllers/GeneralPhyinspectionparamController.js

const db = require("../models");
const GeneralPhyinspectionparam = db.GeneralPhyinspectionparam;

// Save parameters
exports.saveGeneralPhyInspectionParam = async (req, res) => {
  try {
    const { commodity, otherCommodity, physicalRequirements } = req.body;

    if (
      !commodity ||
      !physicalRequirements ||
      typeof physicalRequirements !== "string"
    ) {
      return res.status(400).json({
        message:
          "Invalid input data. 'commodity' and 'physicalRequirements' are required.",
      });
    }

    const savedParam = await GeneralPhyinspectionparam.create({
      commodity,
      otherCommodity,
      physicalRequirements,
    });

    res.status(201).json({
      message: "General physical inspection parameters saved successfully!",
      data: savedParam,
    });
  } catch (error) {
    console.error("Error saving general physical inspection parameter:", error);
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    res.status(500).json({
      message: "Error saving general physical inspection parameter",
      error: error.message,
    });
  }
};

// Fetch all parameters
exports.getAllgeneralPhyinspectionparamController = async (req, res) => {
  try {
    const params = await GeneralPhyinspectionparam.findAll();
    res.status(200).json({
      message: "General physical inspection parameters fetched successfully!",
      data: params,
    });
  } catch (error) {
    console.error(
      "Error fetching general physical inspection parameters:",
      error
    );
    res.status(500).json({
      message: "Error fetching general physical inspection parameters",
      error: error.message,
    });
  }
};
