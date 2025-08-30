// server/Controllers/RaiseEnquiryController.js
const db = require("../models");
const { Op } = require( "sequelize" );


const Raiseenquiry = db.Raiseenquiry;
const Customer = db.Customer;
const Sequelize = db.Sequelize; 
exports.createRaiseEnquiry = async (req, res) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    // Get customer ID from request body instead of JWT
    const {
      customerId, // Get from body, not JWT
      inspectionLocation,
      country,
      urgencyLevel,
      commodityCategory,
      subCommodity,
      riceType,
      volume,
      siUnits,
      expectedBudgetUSD,
      singleDayInspectionDate,
      multiDayInspectionStartDate,
      multiDayInspectionEndDate,
      physicalInspection,
      chemicalTesting,
      certificates,
      additionalServices,
      companyName,
      contactPersonName,
      emailAddress,
      phoneNumber,
      specialRequirements,
      selectedPhyParamId,
      selectedChemParamId,
      chemicaltestingparam,
    } = req.body;

    console.log("Received customerId:", customerId);
    console.log("All request body:", req.body);

    // Validate customer ID
    if (!customerId) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Customer ID is required.",
      });
    }

    // Basic validation
    if (!commodityCategory) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Commodity category is required.",
      });
    }

    if (!siUnits) {
      await transaction.rollback();
      return res.status(400).json({
        message: "SI units are required.",
      });
    }

    const validCommodityCategories = [
      "food & beverages",
      "textiles & garments",
      "electronics & electrical",
      "pharmaceuticals",
      "chemicals",
      "automotive",
      "other",
    ];

    if (!validCommodityCategories.includes(commodityCategory.toLowerCase())) {
      await transaction.rollback();
      return res.status(400).json({
        message: `Invalid commodity category. Allowed: ${validCommodityCategories.join(
          ", "
        )}.`,
      });
    }

    const validSIUnits = ["kg", "ton", "liter", "gallon", "pieces", "other"];
    if (!validSIUnits.includes(siUnits.toLowerCase())) {
      await transaction.rollback();
      return res.status(400).json({
        message: `Invalid SI unit. Must be: ${validSIUnits.join(", ")}.`,
      });
    }

    // Date validation
    const isSingleDay =
      singleDayInspectionDate && singleDayInspectionDate.trim() !== "";
    const isMultiDay =
      multiDayInspectionStartDate &&
      multiDayInspectionEndDate &&
      multiDayInspectionStartDate.trim() !== "" &&
      multiDayInspectionEndDate.trim() !== "";

    if (!isSingleDay && !isMultiDay) {
      await transaction.rollback();
      return res.status(400).json({
        message: "An inspection date (single day or multi day) is required.",
      });
    }

    const inspectionType = isSingleDay ? "single_day" : "multi_day";

    // Create enquiry
    const newEnquiry = await Raiseenquiry.create(
      {
        customerId,
        inspectionLocation,
        country,
        urgencyLevel,
        commodityCategory: commodityCategory.toLowerCase(),
        subCommodity: subCommodity || null,
        riceType: riceType || null,
        volume: parseFloat(volume) || 0,
        siUnits: siUnits.toLowerCase(),
        expectedBudgetUSD: expectedBudgetUSD
          ? parseFloat(expectedBudgetUSD)
          : null,
        inspectionType,
        singleDayInspectionDate: isSingleDay ? singleDayInspectionDate : null,
        multiDayInspectionStartDate: isMultiDay
          ? multiDayInspectionStartDate
          : null,
        multiDayInspectionEndDate: isMultiDay
          ? multiDayInspectionEndDate
          : null,
        physicalInspection: !!physicalInspection,
        chemicalTesting: !!chemicalTesting,
        certificates: certificates || [],
        additionalServices: additionalServices || [],
        companyName,
        contactPersonName,
        emailAddress,
        phoneNumber,
        specialRequirements,
        chemicaltestingparam,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({
      message: "Enquiry created successfully!",
      enquiry: newEnquiry,
      id: newEnquiry.id,
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error creating enquiry:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
          value: err.value,
        })),
      });
    }

    res.status(500).json({
      message: "Failed to create enquiry",
      error: error.message,
    });
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;

    const enquiries = await Raiseenquiry.findAndCountAll({
      attributes: [
        "id",
        "customerId",
        "inspectionLocation",
        "country",
        "urgencyLevel",
        "commodityCategory",
        "subCommodity",
        "riceType",
        "volume",
        "siUnits",
        "expectedBudgetUSD",
        "inspectionType",
        "singleDayInspectionDate",
        "multiDayInspectionStartDate",
        "multiDayInspectionEndDate",
        "physicalInspection",
        "physicalInspectionParam",
        "chemicalTesting",
        "chemicaltestingparam",
        "certificates",
        "additionalServices",
        "companyName",
        "contactPersonName",
        "emailAddress",
        "phoneNumber",
        "specialRequirements",
        "createdAt",
        "updatedAt",
      ],
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      success: true,
      message: "All enquiries fetched successfully",
      data: enquiries.rows,
      pagination: {
        total: enquiries.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(enquiries.count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching all enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
      error: error.message,
    });
  }
};

exports.getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enquiry ID is required",
      });
    }

    const enquiry = await Raiseenquiry.findOne({
      where: { id: id },
      attributes: [
        "id",
        "customerId",
        "inspectionLocation",
        "country",
        "urgencyLevel",
        "commodityCategory",
        "subCommodity",
        "riceType",
        "volume",
        "siUnits",
        "expectedBudgetUSD",
        "inspectionType",
        "singleDayInspectionDate",
        "multiDayInspectionStartDate",
        "multiDayInspectionEndDate",
        "physicalInspection",
        "physicalInspectionParam",
        "chemicalTesting",
        "chemicaltestingparam",
        "certificates",
        "additionalServices",
        "companyName",
        "contactPersonName",
        "emailAddress",
        "phoneNumber",
        "specialRequirements",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry fetched successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error fetching enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiry",
      error: error.message,
    });
  }
};

exports.getEnquiriesByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required",
      });
    }

    const offset = (page - 1) * limit;

    const enquiries = await Raiseenquiry.findAndCountAll({
      where: {
        customerId: customerId,
      },
      attributes: [
        "id",
        "customerId",
        "inspectionLocation",
        "country",
        "urgencyLevel",
        "commodityCategory",
        "subCommodity",
        "riceType",
        "volume",
        "siUnits",
        "expectedBudgetUSD",
        "inspectionType",
        "singleDayInspectionDate",
        "multiDayInspectionStartDate",
        "multiDayInspectionEndDate",
        "physicalInspection",
        "chemicalTesting",
        "certificates",
        "additionalServices",
        "companyName",
        "contactPersonName",
        "emailAddress",
        "phoneNumber",
        "specialRequirements",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      success: true,
      message: "Customer enquiries fetched successfully",
      data: enquiries.rows,
      pagination: {
        total: enquiries.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(enquiries.count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching customer enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer enquiries",
      error: error.message,
    });
  }
};

exports.getEnquiriesWithFilters = async (req, res) => {
  try {
    const {
      commodityCategory,
      urgencyLevel,
      country,
      physicalInspection,
      chemicalTesting,
      startDate,
      endDate,
      minBudget,
      maxBudget,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
    } = req.query;

    const whereClause = {};

    if (commodityCategory) {
      whereClause.commodityCategory = commodityCategory;
    }

    if (urgencyLevel) {
      whereClause.urgencyLevel = urgencyLevel;
    }

    if (country) {
      whereClause.country = {
        [Op.iLike]: `%${country}%`,
      };
    }

    if (physicalInspection !== undefined) {
      whereClause.physicalInspection = physicalInspection === "true";
    }

    if (chemicalTesting !== undefined) {
      whereClause.chemicalTesting = chemicalTesting === "true";
    }

    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      whereClause.createdAt = {
        [Op.gte]: new Date(startDate),
      };
    } else if (endDate) {
      whereClause.createdAt = {
        [Op.lte]: new Date(endDate),
      };
    }

    if (minBudget && maxBudget) {
      whereClause.expectedBudgetUSD = {
        [Op.between]: [parseFloat(minBudget), parseFloat(maxBudget)],
      };
    } else if (minBudget) {
      whereClause.expectedBudgetUSD = {
        [Op.gte]: parseFloat(minBudget),
      };
    } else if (maxBudget) {
      whereClause.expectedBudgetUSD = {
        [Op.lte]: parseFloat(maxBudget),
      };
    }

    const offset = (page - 1) * limit;

    const enquiries = await Raiseenquiry.findAndCountAll({
      where: whereClause,
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      success: true,
      message: "Filtered enquiries fetched successfully",
      data: enquiries.rows,
      filters: {
        commodityCategory,
        urgencyLevel,
        country,
        physicalInspection,
        chemicalTesting,
        dateRange: { startDate, endDate },
        budgetRange: { minBudget, maxBudget },
      },
      pagination: {
        total: enquiries.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(enquiries.count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching filtered enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch filtered enquiries",
      error: error.message,
    });
  }
};

exports.getCommodityCategories = async (req, res) => {
  try {
    const categories = await Raiseenquiry.findAll({
      attributes: ["commodityCategory"],
      where: {
        commodityCategory: {
          [Op.in]: ["textiles & garments", "food & beverages"],
        },
      },
      group: ["commodityCategory"],
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};
// Add this function to your existing RaiseEnquiryController.js file

// RaiseEnquiryController.js
// 📌 Fetch ALL enquiries with customers (no pagination)
// 📌 Fetch ALL enquiries with customers (no pagination)
// 📌 Fetch ALL enquiries with customers (no pagination)
exports.getEnquiriesWithCustomers = async (req, res) => {
  try {
    const { sort = "createdAt", order = "DESC" } = req.query;

    const enquiries = await Raiseenquiry.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["customer_id", "full_name", "mobile_number", "email_address"],
          required: false,
        },
      ],
      attributes: [
        "id",
        "customerId",
        "commodityCategory",
        "inspectionLocation",
        "volume",
        "siUnits",
        "urgencyLevel", // ✅ Added urgency level
        "specialRequirements", // ✅ Added special description
        // "emailAddress",
        // "phoneNumber",
        [
  Sequelize.literal(`CONCAT('$', "Raiseenquiry"."expectedBudgetUSD")`),
  "expectedBudgetUSD", // ✅ Budget with $ prefix
],

        "certificates",
        "inspectionType",
        [
          Sequelize.literal(`
            CASE 
              WHEN 
                ("Raiseenquiry"."singleDayInspectionDate" IS NOT NULL 
                  AND "Raiseenquiry"."singleDayInspectionDate" < NOW())
              OR 
                ("Raiseenquiry"."multiDayInspectionEndDate" IS NOT NULL 
                  AND "Raiseenquiry"."multiDayInspectionEndDate" < NOW())
              THEN 'Expired' 
              ELSE 'Active' 
            END
          `),
          "deadlineStatus",
        ],
      ],
      order: [[sort, order]],
    });

    res.status(200).json({
      success: true,
      message: "Enquiries with customers fetched successfully",
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries with customers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries with customers",
      error: error.message,
    });
  }
};

// 📌 Fetch ALL enquiries for a specific customerId (no pagination)
exports.getEnquiriesWithCustomersByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { sort = "createdAt", order = "DESC" } = req.query;

    const enquiries = await Raiseenquiry.findAll({
      where: { customerId },
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["customer_id", "full_name"],
          required: false,
        },
      ],
      attributes: [
        "id",
        "customerId",
        "commodityCategory",
        "inspectionLocation",
        "volume",
        "urgencyLevel", // ✅ Added urgency level
        "specialRequirements", // ✅ Added special description
        [
          Sequelize.literal(`CONCAT('$', "Raiseenquiry"."expectedBudgetUSD")`),
          "expectedBudgetUSD", // ✅ Budget with $ prefix
        ],
        "certificates",
        "inspectionType",
        [
          Sequelize.literal(`
            CASE 
              WHEN 
                ("Raiseenquiry"."singleDayInspectionDate" IS NOT NULL 
                  AND "Raiseenquiry"."singleDayInspectionDate" < NOW())
              OR 
                ("Raiseenquiry"."multiDayInspectionEndDate" IS NOT NULL 
                  AND "Raiseenquiry"."multiDayInspectionEndDate" < NOW())
              THEN 'Expired' 
              ELSE 'Active' 
            END
          `),
          "deadlineStatus",
        ],
      ],
      order: [[sort, order]],
    });

    res.status(200).json({
      success: true,
      message: `Enquiries for customerId ${customerId} fetched successfully`,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries by customerId:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries by customerId",
      error: error.message,
    });
  }
};
exports.getCommodityDistribution = async (req, res) => {
  try {
    // Fetch counts grouped by subCommodity
    const counts = await Raiseenquiry.findAll({
      attributes: [
        "subCommodity",
        [
          Raiseenquiry.sequelize.fn(
            "COUNT",
            Raiseenquiry.sequelize.col("subCommodity")
          ),
          "count",
        ],
      ],
      where: {
        subCommodity: {
          [Op.ne]: null, // ignore nulls
        },
      },
      group: ["subCommodity"],
      order: [[Raiseenquiry.sequelize.literal("count"), "DESC"]],
    });

    // Convert to plain objects
    const result = counts.map((row) => ({
      name: row.subCommodity,
      count: parseInt(row.get("count")),
    }));

    // Calculate total enquiries
    const total = result.reduce((sum, item) => sum + item.count, 0);

    // Add percentage field for chart
    const distribution = result.map((item) => ({
      ...item,
      value:
        total > 0 ? parseFloat(((item.count / total) * 100).toFixed(2)) : 0,
    }));

    res.status(200).json({
      success: true,
      data: distribution,
    });
  } catch (error) {
    console.error("Error fetching commodity distribution:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch commodity distribution",
      error: error.message,
    });
  }
};