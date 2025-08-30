const db = require("../models");
const express = require("express");

const router = express.Router();

// Import the controller
const PhyInspectionController = require("../Controllers/PhyinspectionparamController");

// Define routes
router.post("/save", PhyInspectionController.savePhyInspectionParam);
router.get("/:id", PhyInspectionController.getPhyInspectionParamById); // Get by ID only
router.post("/migrate", PhyInspectionController.updateExistingData); // Migration helper

module.exports = router;
