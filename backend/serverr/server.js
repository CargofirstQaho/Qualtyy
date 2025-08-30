// server.js

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// const bodyParser = require("body-parser"); // You can remove this if only using multer and express.json/urlencoded
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer"); // <--- ADD THIS LINE

dotenv.config();

// DB setup
const db = require(path.resolve("server/models")); // Adjust path if needed

// Only Customer Routes
const customerRoutes = require("./server/routes/customer-routes");
const company = require("./server/routes/company-routes");

const authRoutes = require("./server/routes/auth-routes");
const inspector = require("./server/routes/inspector-routes");
const inspectionRoutes = require("./server/routes/inspectionRoutes");
const raiseenquiryRoutes = require("./server/routes/raiseenquiry-routes");
const phyinspectionparamRoutes = require("./server/routes/Phyinspectionparam-routes");
const chemicalinsparameter = require("./server/routes/Cheminspparam-routes");
// const messageRoutes = require("./server/routes/message-routes");
const message = require("./server/models/message");
const generalPhyinspectionparamRoutes = require("./server/routes/GeneralPhyinspectionparam-routes");
const Profes = require("./server/models/Profes");
const biddingRoutes = require("./server/routes/BiddingRoom-routes"); // ✅ correct
// ✅ Correct
const customerBiddingRoomRoutes = require("./server/routes/customerBiddingRoomRoutes");
// --- DEBUGGING LOG FOR ROUTER ---
console.log(
  "Attempting to load indianInspectorsRoutes from:",
  path.resolve("./server/routes/Indianinspector-routes")
);
console.log(
  "Type of indianInspectorsRoutes before app.use:",
  typeof indianInspectorsRoutes
);
// --- END DEBUGGING LOG ---

// Content Security Policy (Optional) - Keep this for security, but ensure it doesn't block your app.
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; frame-src 'self'"
  );
  next();
});

// --- Use Express's built-in body parsers for JSON and URL-encoded if needed for other routes ---
// If you still have routes that send application/json or application/x-www-form-urlencoded, keep these:
app.use(express.json({ limit: "50mb" })); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For URL-encoded bodies

// CORS
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ], // ✅ Exact frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // ✅ Now valid because origin is specific
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Other middleware
app.use(logger("dev"));
app.use(cookieParser());

// --- MULTER SETUP ---
// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure this directory exists or create it
    const uploadPath = path.join(__dirname, "uploads"); // Example: store in a 'uploads' folder in your server root
    // You might want to create subfolders based on inspector type or ID
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// --- END MULTER SETUP ---

app.use("/v1/api/customers", customerRoutes);

app.use("/v1/api/auth", authRoutes);

app.use("/v1/api/raiseenquiry", raiseenquiryRoutes);
app.use("/v1/api/Phyinspectionparam", phyinspectionparamRoutes);
app.use("/v1/api/Cheminspparam", chemicalinsparameter);
app.use("/v1/api/inspector", inspector);
app.use("/v1/api/company", company);
app.use("/v1/api/message", message);
app.use("/v1/api/GeneralPhyinspectionparam", generalPhyinspectionparamRoutes);
app.use("/v1/api/Professional", Profes);
app.use("/v1/api/Bidding", biddingRoutes);
app.use("/v1/api/inspections", inspectionRoutes);
app.use("/v1/api/customer-bidding", customerBiddingRoomRoutes);

// Health check or API test route (place before 404 handler)
app.get("/v1/api/", (req, res) => {
  res.json({ message: "Backend API root is working ✅" });
});

// Frontend health check (place before 404 handler)
app.get("/", (req, res) => {
  res.json({ message: "server is ready" });
});

// Not Found Handler - This MUST be the LAST middleware/route before your global error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Global Error Handler
app.use(function (err, req, res, next) {
  console.error("Global Error Handler:", err);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
});

// Database Sync and Start Server
db.sequelize
  .sync({ alter: true }) // `alter: true` is good for dev, use migrations for prod
  .then(function () {
    const PORT = process.env.PORT || 3214;
    app.listen(PORT, "0.0.0.0", function () {
      process.env.TZ = "UTC"; // Ensure timezone is set for consistent timestamps
      console.log(`Node.js process timezone set to: ${process.env.TZ}`);
      console.log(`Current server time (UTC): ${new Date().toISOString()}`);
      console.log(`Backend server connected on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database or sync models:", err);
    process.exit(1); // Exit process if DB connection/sync fails
  });

module.exports = app;
