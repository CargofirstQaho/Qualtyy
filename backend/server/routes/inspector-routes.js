// routes/inspector-routes.js
// Defines the API routes for inspector-related operations.

const express = require("express");
const router = express.Router();
const inspectorController = require("../Controllers/inspectorController");
const authMiddleware = require("../middleware/authMiddleware"); // Add this import
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use relative path from project root
    const uploadPath = path.join(__dirname, "../uploads/inspector-documents");

    // Ensure the folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// INSPECTOR ROUTES
router.post(
  "/register",
  upload.single("governmentId"),
  inspectorController.registerInspector
);
router.post("/login", inspectorController.login);
router.get("/", inspectorController.getInspectors);
router.get("/:id", inspectorController.getInspectorById);

// ADD THESE NEW ROUTES:
router.put("/:id", authMiddleware, inspectorController.updateInspector);
router.put(
  "/:id/billing",
  authMiddleware,
  inspectorController.updateInspectorBilling
);

router.delete("/:id", inspectorController.deleteInspector);

module.exports = router;
