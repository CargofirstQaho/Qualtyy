const express = require("express");
const router = express.Router();
const MessageController = require("../Controllers/MessageController");

// ✅ Route: Save message only (no email sent)
router.post("/save", MessageController.saveOnly);

// ✅ Route: Save and send email
router.post("/send-message", MessageController.sendUserMessage);

// ✅ Route: Get all saved messages
router.get("/all-messages", MessageController.getAllMessages);

module.exports = router;
