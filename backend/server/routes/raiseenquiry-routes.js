// raiseenquiry-routes.js
const express = require("express");
const router = express.Router();

const RaiseenquiryController = require("../controllers/RaiseenquiryController");

// ===== Specific Routes =====
router.get(
  "/commodity-distribution",
  RaiseenquiryController.getCommodityDistribution
);

router.get("/with-customers", RaiseenquiryController.getEnquiriesWithCustomers);

router.get(
  "/with-customers/:customerId",
  RaiseenquiryController.getEnquiriesWithCustomersByCustomerId
);

router.get("/filters", RaiseenquiryController.getEnquiriesWithFilters);

router.get(
  "/commodity-categories",
  RaiseenquiryController.getCommodityCategories
);

router.get(
  "/customer/:customerId",
  RaiseenquiryController.getEnquiriesByCustomer
);

// ===== General Routes =====
router.post("/", RaiseenquiryController.createRaiseEnquiry);
router.get("/", RaiseenquiryController.getAllEnquiries);
// only match numeric IDs
router.get("/:id(\\d+)", RaiseenquiryController.getEnquiryById);

module.exports = router;
