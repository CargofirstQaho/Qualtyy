const { Inspection, Bidding } = require("../models"); // Bidding instead of BiddingRoom

exports.getInspectionsByInspector = async (req, res) => {
  try {
    const { inspectorId } = req.params; // path param

    if (!inspectorId) {
      return res
        .status(400)
        .json({ success: false, message: "inspectorId is required" });
    }

    const bids = await BiddingRoom.findAll({
      where: { inspectorId },
      include: [
        {
          model: Inspection,
          include: [{ model: BiddingRoom, attributes: ["your_bid_usd"] }],
        },
      ],
    });

    if (!bids || bids.length === 0) {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }

    const formattedData = bids.map((bid) => {
      const insp = bid.Inspection;
      const bidsArray = insp.BiddingRooms.map((b) => b.your_bid_usd);
      const lowestBudget = bidsArray.length ? Math.min(...bidsArray) : null;
      const totalBids = bidsArray.length;
      const timeLeft =
        new Date(insp.endDate) < new Date() ? "Expired" : "Active";

      return {
        inspectionId: insp.id,
        commodity: insp.commodity,
        location: insp.location,
        customerBudget: insp.customerBudget,
        lowestBudget,
        totalBids,
        timeLeft,
        priority: insp.priority,
        inspectorBid: bid.your_bid_usd,
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
      message: "Failed to fetch inspections for this inspector",
      error: error.message,
    });
  }
};
