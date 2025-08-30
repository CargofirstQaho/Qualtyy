// server/controllers/cheminsparamController.js
const db = require("../models");
const CheminsParam = db.Chemicalinsparameter;

/**
 * Saves one or more chemical parameters.
 * Expects `req.body.chemicalParameters` to be an array of chemical parameter objects.
 */
exports.saveChemicalParameters = async (req, res, next) => {
  try {
    // Check if the CheminsParam model is available
    if (!CheminsParam || typeof CheminsParam.create !== "function") {
      console.error(
        "Sequelize model 'CheminsParam' is not defined. Check your models/index.js file."
      );
      return res.status(500).json({
        message:
          "Internal server error: The required database model is not available.",
      });
    }

    // Correctly destructure the chemicalParameters array from the request body object
    const { chemicalParameters } = req.body;

    if (!Array.isArray(chemicalParameters) || chemicalParameters.length === 0) {
      return res.status(400).json({
        message:
          "No chemical parameters provided. Please send an array of chemical parameter objects.",
      });
    }

    const savedParameters = [];
    const existingParameters = [];

    // Loop through each parameter to save or check for existence
    for (const param of chemicalParameters) {
      if (!param.parameter_name) {
        return res.status(400).json({
          message: "Each chemical parameter must have a parameter_name.",
        });
      }

      // Check if a parameter with the same name already exists
      const existingParam = await CheminsParam.findOne({
        where: { parameter_name: param.parameter_name },
      });

      if (existingParam) {
        // If it exists, add it to the existing list with the specified message
        existingParameters.push({
          parameter_name: param.parameter_name,
          message: "this chemical parameter is already added",
        });
      } else {
        // If it doesn't exist, create it and add it to the saved list
        const newParam = await CheminsParam.create(param);
        savedParameters.push(newParam);
      }
    }

    // Return a structured response with saved and existing parameters
    res.status(201).json({
      message: "Operation completed.",
      saved: savedParameters,
      existing: existingParameters,
    });
  } catch (error) {
    console.error("Error saving chemical parameters:", error);
    next(error);
  }
};

/**
 * Retrieves all chemical parameters.
 */
exports.getAllChemicalParameters = async (req, res, next) => {
  try {
    const parameters = await CheminsParam.findAll({
      order: [["parameter_name", "ASC"]],
    });
    res.status(200).json({
      message: "Chemical parameters retrieved successfully.",
      data: parameters,
    });
  } catch (error) {
    console.error("Error retrieving chemical parameters:", error);
    next(error);
  }
};

/**
 * Retrieves a single chemical parameter by ID.
 */
exports.getChemicalParameterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parameter = await CheminsParam.findByPk(id);

    if (!parameter) {
      return res.status(404).json({ message: "Chemical parameter not found." });
    }

    res.status(200).json({
      message: "Chemical parameter retrieved successfully.",
      data: parameter,
    });
  } catch (error) {
    console.error("Error retrieving chemical parameter by ID:", error);
    next(error);
  }
};

/**
 * Updates a chemical parameter by ID.
 */
exports.updateChemicalParameter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No update data provided." });
    }

    const [updatedRowsCount, updatedParameters] = await CheminsParam.update(
      updateData,
      {
        where: { id: id },
        returning: true,
      }
    );

    if (updatedRowsCount === 0) {
      return res
        .status(404)
        .json({ message: "Chemical parameter not found or no changes made." });
    }

    res.status(200).json({
      message: "Chemical parameter updated successfully.",
      data: updatedParameters[0],
    });
  } catch (error) {
    console.error("Error updating chemical parameter:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "A chemical parameter with this name already exists.",
        errors: error.errors,
      });
    }
    next(error);
  }
};

/**
 * Deletes a chemical parameter by ID.
 */
exports.deleteChemicalParameter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRowCount = await CheminsParam.destroy({
      where: { id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ message: "Chemical parameter not found." });
    }

    res.status(200).json({
      message: "Chemical parameter deleted successfully.",
      data: { id: id, message: "Parameter deleted." },
    });
  } catch (error) {
    console.error("Error deleting chemical parameter:", error);
    next(error);
  }
};
