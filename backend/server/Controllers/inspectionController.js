const { Inspection } = require("../models");

// Save Inspection
exports.createInspection = async (req, res) => {
  try {
    const {
      inspectionType,
      commodity,
      subCommodity,
      clientName,
      location,
      deadline,
      priority,
      customerBudget,
      lowestBid,
      totalBids,
      yourBid,
      description,
      email,
      phone,
      certificate,
      timeRemaining,
    } = req.body;

    // Auto-generate inspectorId (like INS-1, INS-2, ...)
    const lastInspection = await Inspection.findOne({
      order: [["id", "DESC"]],
    });
    const nextId = lastInspection ? lastInspection.id + 1 : 1;
    const inspectorId = `INS-${nextId}`;

    const inspection = await Inspection.create({
      inspectorId,
      inspectionType,
      commodity,
      subCommodity,
      clientName,
      location,
      deadline,
      priority,
      customerBudget,
      lowestBid,
      totalBids,
      yourBid,
      description,
      email,
      phone,
      certificate,
      timeRemaining,
    });

    return res.status(201).json({
      success: true,
      message: "Inspection created successfully",
      data: inspection,
    });
  } catch (error) {
    console.error("Error creating inspection:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create inspection",
      error: error.message,
    });
  }
};

// Get all inspections
exports.getInspections = async (req, res) => {
  try {
    const inspections = await Inspection.findAll();
    return res.status(200).json({
      success: true,
      data: inspections,
    });
  } catch (error) {
    console.error("Error fetching inspections:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inspections",
      error: error.message,
    });
  }
};
exports.getInspectionDetails = async (req, res) => {
  try {
    const inspections = await Inspection.findAll({
      attributes: [
        "id",
        "commodity",
        "location",
        "customerBudget",
        "priority",
        "endDate", // assuming you have endDate to check Active/Expired
      ],
      include: [
        {
          model: commodities,
          attributes: ["your_bid_usd"], // bids from inspectors
        },
      ],
    });

    // process data
    const formattedData = inspections.map((insp) => {
      const bids = insp.commodities.map((b) => b.your_bid_usd);

      const lowestBid = bids.length > 0 ? Math.min(...bids) : null;
      const totalBids = bids.length;

      const now = new Date();
      const isExpired = new Date(insp.endDate) < now;
      const timeLeft = isExpired ? "Expired" : "Active";

      return {
        id: insp.id,
        commodity: insp.commodity,
        location: insp.location,
        customerBudget: insp.customerBudget,
        lowestBid,
        totalBids,
        timeLeft,
        priority: insp.priority,
      };
    });

    res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch inspection details",
      error: error.message,
    });
  }
};
