const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth-controller");

// Health check
router.get("/", (req, res) => {
  res.status(200).json({ message: "Auth API is running!" });
});

// Login
router.post("/login", authController.login);

module.exports = router;
