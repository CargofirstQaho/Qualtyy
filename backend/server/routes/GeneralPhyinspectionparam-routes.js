// server/routes/GeneralPhyinspectionparam-routes.js
const express = require("express");
const router = express.Router();
const generalPhyinspectionparamController = require("../Controllers/GeneralPhyinspectionparamController");

// Route to save general physical inspection parameters
router.post(
  "/save",
  generalPhyinspectionparamController.saveGeneralPhyInspectionParam
);

router.get(
  "/id",
  generalPhyinspectionparamController.getAllgeneralPhyinspectionparamController
);
module.exports = router;
