// professional.routes.js
// This file defines the API endpoints for professional-related actions.
const express = require("express");
const router = express.Router();
const professionalController = require("./professional.controller");

// A POST route to save new professional data.
// It maps the '/api/professionals' endpoint to the createProfessional function in the controller.
router.post("/", professionalController.createProfessional);

module.exports = router;
