const db = require("../models");
const Phyinspectionparam = db.Phyinspectionparam;

// Controller function to save a single physical inspection parameter set
exports.savePhyInspectionParam = async (req, res) => {
  try {
    const {
      broken,
      purity,
      yellowKernel,
      damageKernel,
      redKernel,
      paddyKernel,
      chalkyRice,
      liveInsects,
      millingDegree,
      averageGrainLength,
    } = req.body;

    // Basic validation
    if (
      typeof broken !== "number" ||
      broken < 0 ||
      typeof purity !== "number" ||
      purity < 0 ||
      purity > 100 ||
      typeof yellowKernel !== "number" ||
      yellowKernel < 0 ||
      typeof damageKernel !== "number" ||
      damageKernel < 0 ||
      typeof redKernel !== "number" ||
      redKernel < 0 ||
      typeof paddyKernel !== "number" ||
      paddyKernel < 0 ||
      typeof chalkyRice !== "number" ||
      chalkyRice < 0 ||
      typeof liveInsects !== "number" ||
      liveInsects < 0 ||
      typeof millingDegree !== "string" ||
      !["Under Milled", "Well Milled", "Over Milled"].includes(millingDegree) ||
      typeof averageGrainLength !== "number" ||
      averageGrainLength < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid input data. Please check all fields and ensure they are valid numbers, and 'millingDegree' is one of 'Under Milled', 'Well Milled', 'Over Milled'.",
      });
    }

    const savedParam = await Phyinspectionparam.create({
      broken,
      purity,
      yellowKernel,
      damageKernel,
      redKernel,
      paddyKernel,
      chalkyRice,
      liveInsects,
      millingDegree,
      averageGrainLength,
    });

    res.status(201).json({
      success: true,
      message: "Physical inspection parameter saved successfully!",
      data: savedParam,
    });
  } catch (error) {
    console.error("Error saving physical inspection parameter:", error);

    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error saving physical inspection parameter",
      error: error.message,
    });
  }
};

// Controller function to get a single parameter by ID
exports.getPhyInspectionParamById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID provided",
      });
    }

    const param = await Phyinspectionparam.findByPk(id, {
      attributes: [
        "id",
        "broken",
        "purity",
        "yellowKernel",
        "damageKernel",
        "redKernel",
        "paddyKernel",
        "chalkyRice",
        "liveInsects",
        "millingDegree",
        "averageGrainLength",
      ],
    });

    if (!param) {
      return res.status(404).json({
        success: false,
        message: "Physical inspection parameter not found",
      });
    }

    // Return only the parameter data without wrapping in success/data structure
    res.status(200).json({
      id: param.id,
      broken: param.broken,
      purity: param.purity,
      yellowKernel: param.yellowKernel,
      damageKernel: param.damageKernel,
      redKernel: param.redKernel,
      paddyKernel: param.paddyKernel,
      chalkyRice: param.chalkyRice,
      liveInsects: param.liveInsects,
      millingDegree: param.millingDegree,
      averageGrainLength: param.averageGrainLength,
    });
  } catch (error) {
    console.error("Error fetching physical inspection parameter:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching physical inspection parameter",
      error: error.message,
    });
  }
};

// Function to update existing data with new fields (migration helper)
exports.updateExistingData = async (req, res) => {
  try {
    // This would help migrate data from old table to new table
    const sourceData = [
      {
        id: 20,
        broken: 5.0,
        purity: 98.0,
        yellowKernel: 2.0,
        damageKernel: 1.0,
        redKernel: 0.5,
        paddyKernel: 0.2,
        chalkyRice: 3.0,
        liveInsects: 0,
        millingDegree: "Well Milled",
        averageGrainLength: 6.2,
      },
      {
        id: 21,
        broken: 5.0,
        purity: 98.0,
        yellowKernel: 2.0,
        damageKernel: 1.0,
        redKernel: 0.5,
        paddyKernel: 0.2,
        chalkyRice: 3.0,
        liveInsects: 0,
        millingDegree: "Well Milled",
        averageGrainLength: 6.2,
      },
    ];

    const results = [];

    for (const data of sourceData) {
      const { id, ...paramData } = data;

      // Try to find existing record first
      let param = await Phyinspectionparam.findByPk(id);

      if (param) {
        // Update existing
        param = await param.update(paramData);
        results.push({ action: "updated", id, data: param });
      } else {
        // Create new
        param = await Phyinspectionparam.create(paramData);
        results.push({ action: "created", id: param.id, data: param });
      }
    }

    res.status(200).json({
      success: true,
      message: "Data migration completed",
      results,
    });
  } catch (error) {
    console.error("Error updating existing data:", error);
    res.status(500).json({
      success: false,
      message: "Error updating existing data",
      error: error.message,
    });
  }
};

// Export all functions
module.exports = {
  savePhyInspectionParam: exports.savePhyInspectionParam,
  getPhyInspectionParamById: exports.getPhyInspectionParamById,
  updateExistingData: exports.updateExistingData,
};
