// server/routes/BiddingRoom-routes.js
const express = require("express");
const router = express.Router();
const biddingRoomController = require("../Controllers/BiddingRoomController");

// ✅ SPECIFIC ROUTES FIRST (must come before parameterized routes)
// Get bidding rooms with enquiries
router.get("/with-inspector", biddingRoomController.getBiddingWithInspector);
router.get("/with-enquiries", biddingRoomController.getBiddingWithEnquiries);

// ✅ REMOVED DUPLICATE: searchBiddingRooms is now an alias of getAll
// If you want to keep a separate search endpoint:
// router.get("/search", biddingRoomController.searchBiddingRooms);

// ✅ GENERAL ROUTES
// Create new bidding room
router.post("/save", biddingRoomController.create);
router.get(
  "/certificates-inspection/:customer_id",
  biddingRoomController.getCertificatesAndInspectionType
);
router.get("/active-count", biddingRoomController.getActiveCount);
router.get(
  "/urgent-inspections/count",
  biddingRoomController.getUrgentInspectionsCount
);
router.get("/total-budget", biddingRoomController.getTotalBudget);
router.get("/submitted-bids/count", biddingRoomController.getSubmittedBidCount);
// Add in BiddingRoom-routes.js
// Example: GET /bidding-room/summary/10?userId=5
router.get(
  "/summary/:id",
  biddingRoomController.getBiddingSummaryByQualityAssessment
);
router.get(
  "/inspector-bidded-count",
  biddingRoomController.getInspectorBiddedCount
);
router.get("/total-inspections", biddingRoomController.getTotalInspectionCount);
// Get all bidding rooms (with search, filter, sort functionality)
router.get("/", biddingRoomController.getAll);

// ✅ PARAMETERIZED ROUTES LAST (to avoid conflicts)
// Get one by ID
router.get("/:id", biddingRoomController.getOne);

// Update bidding room
router.put("/:id", biddingRoomController.update);
// Get inspections for a specific inspector
router.get(
  "/inspections/inspector/:inspectorId",
  biddingRoomController.getInspectionsByInspector
);
// Add this line to your BiddingRoom-routes.js (before other parameterized routes)
router.get(
  "/customer-inspector/:customerId/:inspectorId",
  biddingRoomController.getCustomerInspectorData
);
// Delete bidding room
router.delete("/:id", biddingRoomController.remove);
// Get commodities with inspector info

module.exports = router;
