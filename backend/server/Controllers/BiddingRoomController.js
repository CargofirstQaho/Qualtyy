const db = require("../models");
const BiddingRoom = db.Bidding;
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const Raiseenquiry = db.Raiseenquiry;
const Inspector = db.Inspector;
// Create new bidding room
// controllers/biddingController.js
exports.create = async (req, res) => {
  try {
    const {
      inspectorId,
      opportunityId,
      customerId,
      bidAmount,
      category,
      status,
      location,
      client_name,
      volume,
      budget_usd,
      lowest_bid_usd,
      certificate,
      inspectiontype,
      special_description,
      siUnits,
      urgencyLevel,
    } = req.body;

    // Validation: required fields
    const missingFields = [];
    if (!inspectorId) missingFields.push("inspectorId");
    if (!customerId) missingFields.push("customerId");
    if (!category) missingFields.push("category");
    if (!status) missingFields.push("status");
    if (!urgencyLevel) missingFields.push("urgencyLevel");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Required fields missing: ${missingFields.join(", ")}`,
      });
    }

    // Create bidding room
    const newBiddingRoom = await BiddingRoom.create({
      inspector_id: inspectorId,
      customer_id: customerId,
      category,
      status,
      location,
      client_name,
      opportunity_id: opportunityId || null,
      your_bid_usd: bidAmount || null,
      volume: volume || null,
      budget_usd: budget_usd || null,
      lowest_bid_usd: lowest_bid_usd || null,
      certificate: certificate || null,
      inspectiontype: inspectiontype || null,
      special_description: special_description || null,
      siUnits: siUnits || null,
      urgencyLevel, // already validated
    });

    res.status(201).json({
      success: true,
      message: "Bid placed successfully",
      data: newBiddingRoom,
    });
  } catch (error) {
    console.error("Error creating bid:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create bid",
      details: error.message,
    });
  }
};

// ✅ CONSOLIDATED: Get all bidding rooms with search, filter, and sort
exports.getAll = async (req, res) => {
  try {
    const {
      search = "",
      category = "all",
      status = "all",
      sortBy = "createdAt",
      order = "DESC",
    } = req.query;

    const whereClause = { [Op.and]: [] };

    // --- Text search in client_name, location ---
    if (search) {
      whereClause[Op.and].push({
        [Op.or]: [
          { client_name: { [Op.iLike]: `%${search}%` } },
          { location: { [Op.iLike]: `%${search}%` } },
          { category: { [Op.iLike]: `%${search}%` } },
        ],
      });
    }

    // --- Category filter ---
    if (category !== "all") {
      whereClause[Op.and].push({ category });
    }

    // --- Status filter ---
    if (status !== "all") {
      whereClause[Op.and].push({ status });
    }

    // --- Dynamic sorting ---
    let orderClause;
    switch (sortBy) {
      case "budget_high_low":
        orderClause = [["budget_usd", "DESC"]];
        break;
      case "budget_low_high":
        orderClause = [["budget_usd", "ASC"]];
        break;
      case "least_competitive":
        orderClause = [["lowest_bid_usd", "ASC"]];
        break;
      case "newest":
        orderClause = [["createdAt", "DESC"]];
        break;
      case "oldest":
        orderClause = [["createdAt", "ASC"]];
        break;
      default:
        orderClause = [[sortBy, order.toUpperCase()]];
    }

    const rooms = await BiddingRoom.findAll({
      attributes: [
        "id",
        "customer_id", // ✅ Include customer_id
        "category",
        "location",
        "client_name",
        "status",
        "volume",
        "certificate",
        "inspectiontype",
        "budget_usd",
        "lowest_bid_usd",
        "your_bid_usd",
        "special_description",
        "createdAt",
        "updatedAt",
      ],
      where: whereClause,
      order: orderClause,
    });

    res.status(200).json({
      success: true,
      message: "Bidding rooms fetched successfully",
      data: rooms,
      total: rooms.length,
    });
  } catch (error) {
    console.error("Error fetching bidding rooms:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bidding rooms.",
      details: error.message,
    });
  }
};

// Get one bidding room
exports.getOne = async (req, res) => {
  try {
    const room = await BiddingRoom.findByPk(req.params.id, {
      attributes: [
        "id",
        "customer_id", // ✅ Include customer_id
        "category",
        "location",
        "client_name",
        "status",
        "volume",
        "certificate",
        "inspectiontype",
        "budget_usd",
        "lowest_bid_usd",
        "your_bid_usd",
        "special_description",
        "createdAt",
        "updatedAt",
        "siUnits",
        "emailAddress",
        "phoneNumber",
      ],
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Bidding room not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bidding room fetched successfully",
      data: room,
    });
  } catch (error) {
    console.error("Error fetching bidding room:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bidding room.",
      details: error.message,
    });
  }
};

// Update bidding room
exports.update = async (req, res) => {
  try {
    const room = await BiddingRoom.findByPk(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Bidding room not found.",
      });
    }

    await room.update(req.body);

    res.status(200).json({
      success: true,
      message: "Bidding room updated successfully!",
      data: room,
    });
  } catch (error) {
    console.error("Error updating bidding room:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update bidding room.",
      details: error.message,
    });
  }
};

// Delete bidding room
exports.remove = async (req, res) => {
  try {
    const result = await BiddingRoom.destroy({ where: { id: req.params.id } });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Bidding room not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bidding room deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting bidding room:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete bidding room.",
      details: error.message,
    });
  }
};

// ✅ UPDATED: Get bidding rooms with their enquiries using proper association
exports.getBiddingWithEnquiries = async (req, res) => {
  try {
    // ✅ Use the correct association based on customer_id
    const biddingRoomsWithEnquiries = await BiddingRoom.findAll({
      attributes: [
        "id",
        "customer_id", // ✅ Common joining column
        "inspectiontype", // ✅ inspection type
        "category", // ✅ commodity
        "client_name", // ✅ client name
        "location", // ✅ location
        "createdAt", // ✅ deadline
        "status",
        "budget_usd",
        "volume",
        "certificate",
        // "siUnits",
        // "emailAddress",
        // "phoneNumber",
      ],
      include: [
        {
          model: Raiseenquiry,
          as: "enquiries",
          attributes: [
            "id",
            "customerId",
            "subCommodity", // ✅ sub-commodity
            "urgencyLevel", // ✅ priority
            "commodityCategory",
            "inspectionLocation",
            "inspectionType",
            "volume",
            "expectedBudgetUSD",
            "companyName",
            "contactPersonName",
            "createdAt",
          ],
          required: false, // LEFT JOIN - includes bidding rooms even without enquiries
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // ✅ Transform the data into the desired format
    const combinedResults = [];

    biddingRoomsWithEnquiries.forEach((room) => {
      if (room.enquiries && room.enquiries.length > 0) {
        // Create a record for each enquiry
        room.enquiries.forEach((enquiry) => {
          combinedResults.push({
            // ✅ From commodities table
            bidding_id: room.id,
            customer_id: room.customer_id,
            inspectiontype: room.inspectiontype,
            commodity: room.category,
            client_name: room.client_name,
            location: room.location,
            deadline: room.createdAt,

            // ✅ From raise_enquiries table
            enquiry_id: enquiry.id,
            sub_commodity: enquiry.subCommodity,
            priority: enquiry.urgencyLevel,

            // Additional useful fields
            status: room.status,
            bidding_budget_usd: room.budget_usd,
            enquiry_budget_usd: enquiry.expectedBudgetUSD,
            enquiry_company: enquiry.companyName,
            enquiry_contact: enquiry.contactPersonName,
            match_type: "associated",
          });
        });
      } else {
        // Include bidding room even if no enquiries
        combinedResults.push({
          // ✅ From commodities table
          bidding_id: room.id,
          customer_id: room.customer_id,
          inspectiontype: room.inspectiontype,
          commodity: room.category,
          client_name: room.client_name,
          location: room.location,
          deadline: room.createdAt,

          // ✅ No enquiry data
          enquiry_id: null,
          sub_commodity: null,
          priority: null,

          // Additional fields
          status: room.status,
          bidding_budget_usd: room.budget_usd,
          enquiry_budget_usd: null,
          enquiry_company: null,
          enquiry_contact: null,
          match_type: "bidding_only",
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "Bidding rooms with enquiries fetched successfully",
      data: combinedResults,
      summary: {
        total_records: combinedResults.length,
        bidding_rooms: biddingRoomsWithEnquiries.length,
        associated_records: combinedResults.filter(
          (r) => r.match_type === "associated"
        ).length,
        bidding_only_records: combinedResults.filter(
          (r) => r.match_type === "bidding_only"
        ).length,
      },
    });
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch combined data",
      error: error.message,
    });
  }
};

// ✅ ALIAS: Keep searchBiddingRooms for backward compatibility
exports.searchBiddingRooms = exports.getAll;
exports.getCertificatesAndInspectionType = async (req, res) => {
  try {
    const { customer_id } = req.params; // read ID from URL

    if (!customer_id) {
      return res.status(400).json({
        success: false,
        message: "customer_id is required",
      });
    }

    const data = await BiddingRoom.findAll({
      attributes: [
        "certificate",
        "inspectiontype",
        "special_description",
        "your_bid_usd",
      ],
      where: { customer_id }, // filter by customer_id
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching data from BiddingRoom:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certificates and inspection type",
      error: error.message,
    });
  }
};

// Add this in BiddingRoomController.js
// BiddingRoomController.js
exports.getBiddingSummaryByQualityAssessment = async (req, res) => {
  try {
    const id = req.params.id; // dynamic QA ID from URL
    const userId = req.query.userId || null; // optional, currently unused

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Bidding room ID is required",
      });
    }

    const summary = await BiddingRoom.findOne({
      where: { id },
      attributes: [
        "id",
        "budget_usd",
        "lowest_bid_usd",
        "your_bid_usd",
        "status",
      ],
      raw: true,
    });

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: "No bidding room found for this ID",
      });
    }

    // Optional: count total bids if you later create a Bids table
    summary.total_bids = summary.lowest_bid_usd ? 1 : 0;

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Error fetching bidding summary:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bidding summary",
      error: error.message,
    });
  }
};

exports.getActiveCount = async (req, res) => {
  try {
    const totalActive = await BiddingRoom.count({
      where: { status: "active" },
    });

    return res.status(200).json({
      success: true,
      totalActive,
    });
  } catch (error) {
    console.error("Error fetching active count:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch active count",
      error: error.message,
    });
  }
};
exports.getUrgentInspectionsCount = async (req, res) => {
  try {
    const count = await BiddingRoom.count({
      where: {
        urgencyLevel: {
          [Op.in]: ["High", "Critical"], // urgent levels
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Fetched urgent inspections count successfully",
      count,
    });
  } catch (error) {
    console.error("Error fetching urgent inspections count:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch urgent inspections count",
      error: error.message,
    });
  }
};

exports.getTotalBudget = async (req, res) => {
  try {
    const totalBudget = await BiddingRoom.sum("budget_usd");

    return res.status(200).json({
      success: true,
      message: "Fetched total budget successfully",
      totalBudget: totalBudget || 0, // return 0 if no records
    });
  } catch (error) {
    console.error("Error fetching total budget:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch total budget",
      error: error.message,
    });
  }
};

exports.getInspectorBiddedCount = async (req, res) => {
  try {
    const count = await BiddingRoom.count({
      where: {
        your_bid_usd: {
          [Op.ne]: null, // ✅ not null
          // [Op.gt]: 0,   // ✅ uncomment this if you want only bids > 0
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Fetched inspector bidded count successfully",
      count,
    });
  } catch (error) {
    console.error("Error fetching inspector bidded count:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inspector bidded count",
      error: error.message,
    });
  }
};
exports.getTotalInspectionCount = async (req, res) => {
  try {
    const count = await BiddingRoom.count(); // ✅ counts all rows

    return res.status(200).json({
      success: true,
      message: "Fetched total inspection count successfully",
      count,
    });
  } catch (error) {
    console.error("Error fetching total inspection count:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch total inspection count",
      error: error.message,
    });
  }
};
exports.getSubmittedBidCount = async (req, res) => {
  try {
    const count = await BiddingRoom.count({
      where: {
        your_bid_usd: {
          [Op.ne]: null, // ✅ not null
          // [Op.gt]: 0,   // ✅ use this if bids should only count when > 0
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Fetched submitted bid count successfully",
      count,
    });
  } catch (error) {
    console.error("Error fetching submitted bid count:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch submitted bid count",
      error: error.message,
    });
  }
};

exports.getInspectionsByInspector = async (req, res) => {
  try {
    const { inspectorId } = req.params;

    if (!inspectorId) {
      return res
        .status(400)
        .json({ success: false, message: "inspectorId is required" });
    }

    // Fetch only from BiddingRoom model
    const bids = await BiddingRoom.findAll({
      where: { inspector_id: inspectorId },
      attributes: [
        "id",
        "category",
        "location",
        "client_name",
        "status",
        "volume",
        "certificate",
        "inspectiontype",
        "budget_usd",
        "lowest_bid_usd",
        "your_bid_usd",
        "special_description",
        "urgencyLevel",
        "customer_id",
      ],
    });

    res.status(200).json({
      success: true,
      count: bids.length,
      data: bids,
    });
  } catch (error) {
    console.error("Error fetching inspections for inspector:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch inspections for this inspector",
      error: error.message,
    });
  }
};

// Add this method to your BiddingRoomController.js

exports.getCombinedDataByInspectorAndCustomer = async (req, res) => {
  try {
    const { inspectorId, customerId } = req.params;

    if (!inspectorId || !customerId) {
      return res.status(400).json({
        success: false,
        message: "Both inspectorId and customerId are required",
      });
    }

    // Join raise_enquiries with commodities table using customer_id
    const combinedData = await Raiseenquiry.findAll({
      where: {
        customerId: customerId, // Filter by specific customer in raise_enquiries
      },
      attributes: [
        "id",
        "subCommodity",
        "inspectionLocation",
        "createdAt",
        "urgencyLevel",
        "country",
        [
          Sequelize.literal(`CONCAT('$', "Raiseenquiry"."expectedBudgetUSD")`),
          "budget_usd_formatted",
        ],
        "expectedBudgetUSD", // Keep original for calculations
      ],
      include: [
        {
          model: BiddingRoom,
          as: "biddingRoom",
          where: {
            inspector_id: inspectorId, // Filter by specific inspector in commodities
            customer_id: customerId, // Ensure matching customer_id
          },
          attributes: [
            "id",
            "your_bid_usd",
            [
              Sequelize.literal(`CONCAT('$', "biddingRoom"."your_bid_usd")`),
              "your_bid_usd_formatted",
            ],
          ],
          required: true, // INNER JOIN - only get enquiries that have matching bidding rooms
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Calculate savings and format the response
    const formattedData = combinedData.map((enquiry) => {
      const budgetUSD = parseFloat(enquiry.expectedBudgetUSD) || 0;
      const yourBidUSD = parseFloat(enquiry.biddingRoom?.your_bid_usd) || 0;
      const savings = budgetUSD - yourBidUSD;

      return {
        enquiry_id: enquiry.id,
        bidding_room_id: enquiry.biddingRoom?.id,
        subCommodity: enquiry.subCommodity,
        inspectionLocation: enquiry.inspectionLocation,
        createdAt: enquiry.createdAt,
        urgencyLevel: enquiry.urgencyLevel,
        country: enquiry.country,
        budget_usd: `$${budgetUSD.toFixed(2)}`,
        your_bid_usd: `$${yourBidUSD.toFixed(2)}`,
        savings: `$${savings.toFixed(2)}`,
        savings_amount: savings, // For sorting/filtering if needed
      };
    });

    res.status(200).json({
      success: true,
      message: `Combined data fetched successfully for inspector ${inspectorId} and customer ${customerId}`,
      data: formattedData,
      summary: {
        total_records: formattedData.length,
        inspector_id: inspectorId,
        customer_id: customerId,
        total_savings: `$${formattedData
          .reduce((sum, item) => sum + item.savings_amount, 0)
          .toFixed(2)}`,
      },
    });
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch combined data",
      error: error.message,
    });
  }
};

// Alternative method if you want to get data for all customers of a specific inspector
// Add this method to your existing BiddingRoomController.js file
exports.getCustomerInspectorData = async (req, res) => {
  try {
    const { customerId, inspectorId } = req.params;
    const { countOnly, search } = req.query; // Add search parameter

    if (!customerId || !inspectorId) {
      return res.status(400).json({
        success: false,
        message: "Both customerId and inspectorId are required",
      });
    }

    // Build where clause for search
    const whereClause = {
      customerId: customerId,
    };

    // Add search functionality for subCommodity
    if (search) {
      whereClause.subCommodity = {
        [Op.iLike]: `%${search}%`, // Case-insensitive search
      };
    }

    // If countOnly is requested, return just the count
    if (countOnly === "true") {
      const count = await Raiseenquiry.count({
        where: whereClause,
        include: [
          {
            model: BiddingRoom,
            as: "biddingRoom",
            where: {
              inspector_id: inspectorId,
              customer_id: customerId,
            },
            required: true,
          },
        ],
      });

      return res.status(200).json({
        success: true,
        message: `Count fetched successfully for customer ${customerId} and inspector ${inspectorId}${
          search ? ` with search: "${search}"` : ""
        }`,
        count: count,
        customer_id: customerId,
        inspector_id: inspectorId,
        search_term: search || null,
      });
    }

    // Otherwise, return full data with search
    const combinedData = await Raiseenquiry.findAll({
      where: whereClause,
      attributes: [
        "id",
        "subCommodity",
        "inspectionLocation",
        "createdAt",
        "urgencyLevel",
        "country",
        "expectedBudgetUSD",
      ],
      include: [
        {
          model: BiddingRoom,
          as: "biddingRoom",
          where: {
            inspector_id: inspectorId,
            customer_id: customerId,
          },
          attributes: ["id", "your_bid_usd", "createdAt"],
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Calculate savings and format the response
    const formattedData = combinedData.map((enquiry) => {
      const budgetUSD = parseFloat(enquiry.expectedBudgetUSD) || 0;
      const yourBidUSD = parseFloat(enquiry.biddingRoom?.your_bid_usd) || 0;
      const savings = budgetUSD - yourBidUSD;

      return {
        enquiry_id: enquiry.id,
        bidding_room_id: enquiry.biddingRoom?.id,
        subCommodity: enquiry.subCommodity,
        inspectionLocation: enquiry.inspectionLocation,
        enquiry_createdAt: enquiry.createdAt,
        inspector_createdAt: enquiry.biddingRoom?.createdAt,
        urgencyLevel: enquiry.urgencyLevel,
        country: enquiry.country,
        budget_usd: `$${budgetUSD.toFixed(2)}`,
        your_bid_usd: `$${yourBidUSD.toFixed(2)}`,
        savings: `$${savings.toFixed(2)}`,
        savings_amount: savings,
      };
    });

    res.status(200).json({
      success: true,
      message: `Data fetched successfully for customer ${customerId} and inspector ${inspectorId}${
        search ? ` with search: "${search}"` : ""
      }`,
      data: formattedData,
      search_term: search || null,
      summary: {
        total_records: formattedData.length,
        customer_id: customerId,
        inspector_id: inspectorId,
        total_savings: `$${formattedData
          .reduce((sum, item) => sum + item.savings_amount, 0)
          .toFixed(2)}`,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};
exports.getCustomerInspectorData = async (req, res) => {
  try {
    const { customerId, inspectorId } = req.params;
    const {
      countOnly,
      inspectionName,
      subCommodity,
      location,
      fromDate,
      toDate,
      minAmount,
      maxAmount,
    } = req.query;

    if (!customerId || !inspectorId) {
      return res.status(400).json({
        success: false,
        message: "Both customerId and inspectorId are required",
      });
    }

    // Build where clause for Raiseenquiry table
    const whereClause = {
      customerId: customerId,
    };

    // Build where clause for BiddingRoom table
    const biddingWhereClause = {
      inspector_id: inspectorId,
      customer_id: customerId,
    };

    // Search by inspection name (inspectionLocation field)
    if (inspectionName) {
      whereClause.inspectionLocation = { [Op.iLike]: `%${inspectionName}%` };
    }

    // Search by subcommodity with specific options (updated)
    if (subCommodity) {
      const validSubCommodities = [
        "rice",
        "cotton",
        "wheat",
        "pulses",
        "spices",
        "pulse quality assessment",
      ];
      const searchTerms = subCommodity
        .toLowerCase()
        .split(",")
        .map((s) => s.trim());

      // Filter only valid subcommodities
      const validSearchTerms = searchTerms.filter((term) =>
        validSubCommodities.some(
          (valid) => valid.includes(term) || term.includes(valid)
        )
      );

      if (validSearchTerms.length > 0) {
        if (validSearchTerms.length === 1) {
          whereClause.subCommodity = { [Op.iLike]: `%${validSearchTerms[0]}%` };
        } else {
          whereClause.subCommodity = {
            [Op.or]: validSearchTerms.map((term) => ({
              [Op.iLike]: `%${term}%`,
            })),
          };
        }
      }
    }

    // Search by location (both inspectionLocation and country)
    if (location) {
      whereClause[Op.or] = [
        { inspectionLocation: { [Op.iLike]: `%${location}%` } },
        { country: { [Op.iLike]: `%${location}%` } },
      ];
    }

    // Date range filter (from date to to date)
    if (fromDate || toDate) {
      const dateFilter = {};
      if (fromDate && toDate) {
        dateFilter[Op.between] = [new Date(fromDate), new Date(toDate)];
      } else if (fromDate) {
        dateFilter[Op.gte] = new Date(fromDate);
      } else if (toDate) {
        dateFilter[Op.lte] = new Date(toDate);
      }
      whereClause.createdAt = dateFilter;
    }

    // Budget amount range filter (min and max amount)
    if (minAmount || maxAmount) {
      const amountFilter = {};
      if (minAmount && maxAmount) {
        amountFilter[Op.between] = [
          parseFloat(minAmount),
          parseFloat(maxAmount),
        ];
      } else if (minAmount) {
        amountFilter[Op.gte] = parseFloat(minAmount);
      } else if (maxAmount) {
        amountFilter[Op.lte] = parseFloat(maxAmount);
      }
      whereClause.expectedBudgetUSD = amountFilter;
    }

    // If countOnly is requested, return just the count
    if (countOnly === "true") {
      const count = await Raiseenquiry.count({
        where: whereClause,
        include: [
          {
            model: BiddingRoom,
            as: "biddingRoom",
            where: biddingWhereClause,
            required: true,
          },
        ],
      });

      return res.status(200).json({
        success: true,
        message: `Count fetched successfully with applied filters`,
        count: count,
        customer_id: customerId,
        inspector_id: inspectorId,
        filters: {
          inspectionName,
          subCommodity,
          location,
          fromDate,
          toDate,
          minAmount,
          maxAmount,
        },
      });
    }

    // Otherwise, return full data with filters
    const combinedData = await Raiseenquiry.findAll({
      where: whereClause,
      attributes: [
        "id",
        "subCommodity",
        "inspectionLocation",
        "createdAt",
        "urgencyLevel",
        "country",
        "expectedBudgetUSD",
      ],
      include: [
        {
          model: BiddingRoom,
          as: "biddingRoom",
          where: biddingWhereClause,
          attributes: ["id", "your_bid_usd", "createdAt"],
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Calculate savings and format the response
    const formattedData = combinedData.map((enquiry) => {
      const budgetUSD = parseFloat(enquiry.expectedBudgetUSD) || 0;
      const yourBidUSD = parseFloat(enquiry.biddingRoom?.your_bid_usd) || 0;
      const savings = budgetUSD - yourBidUSD;

      return {
        enquiry_id: enquiry.id,
        bidding_room_id: enquiry.biddingRoom?.id,
        subCommodity: enquiry.subCommodity,
        inspectionLocation: enquiry.inspectionLocation,
        enquiry_createdAt: enquiry.createdAt,
        inspector_createdAt: enquiry.biddingRoom?.createdAt,
        urgencyLevel: enquiry.urgencyLevel,
        country: enquiry.country,
        budget_usd: `$${budgetUSD.toFixed(2)}`,
        your_bid_usd: `$${yourBidUSD.toFixed(2)}`,
        savings: `$${savings.toFixed(2)}`,
        savings_amount: savings,
      };
    });

    res.status(200).json({
      success: true,
      message: `Data fetched successfully with applied filters`,
      data: formattedData,
      filters: {
        inspectionName,
        subCommodity,
        location,
        fromDate,
        toDate,
        minAmount,
        maxAmount,
      },
      summary: {
        total_records: formattedData.length,
        customer_id: customerId,
        inspector_id: inspectorId,
        total_savings: `$${formattedData
          .reduce((sum, item) => sum + item.savings_amount, 0)
          .toFixed(2)}`,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

exports.getBiddingWithInspector = async (req, res) => {
  try {
    const data = await BiddingRoom.findAll({
      include: [
        {
          model: Inspector,
          as: "inspector", // matches BiddingRoom.belongsTo(Inspector, { as: 'inspector' })
          attributes: ["inspector_id", "name", "commodities"], // inspector fields
        },
      ],
      // Fetch all columns from commodities table
      attributes: { exclude: [] }, // empty exclude means include all columns
      order: [["createdAt", "DESC"]], // optional: order by creation date
    });

    return res.status(200).json({
      success: true,
      message: "Commodities with inspector data fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching commodities with inspector:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};
