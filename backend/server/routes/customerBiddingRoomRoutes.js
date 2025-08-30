const express = require("express");
const router = express.Router();
const customerBiddingRoomController = require("../controllers/customerBiddingRoomController");

router.get(
  "/Bidding/:inspectorId",
  customerBiddingRoomController.getInspectionsByInspector
);

module.exports = router;
