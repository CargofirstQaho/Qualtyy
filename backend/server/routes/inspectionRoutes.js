const express = require("express");
const router = express.Router();
const inspectionController = require("../Controllers/inspectionController");

// Create inspection
router.post("/", inspectionController.createInspection);

// Get all inspections
router.get("/", inspectionController.getInspections);

module.exports = router;
