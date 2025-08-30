// server/models/Raiseenquiry.js (Updated with BiddingRoom association)
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Raiseenquiry = sequelize.define(
    "Raiseenquiry",
    {
      // Inspection Location Details
      // In your Raiseenquiry model, add this field:
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Make it nullable for now
        references: {
          model: "customers",
          key: "customer_id",
        },
      },
      inspectionLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inspection location is required.",
          },
          notEmpty: {
            msg: "Inspection location cannot be empty.",
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Country is required.",
          },
          notEmpty: {
            msg: "Country cannot be empty.",
          },
        },
      },
      // Urgency and Commodity Details
      urgencyLevel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Low",
        validate: {
          isIn: {
            args: [["Low", "Medium", "High", "Critical"]],
            msg: "Invalid urgency level. Must be Low, Medium, High, or Critical.",
          },
        },
      },
      commodityCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Commodity category is required.",
          },
          notEmpty: {
            msg: "Commodity category cannot be empty.",
          },
          isIn: {
            args: [
              [
                "food & beverages",
                "textiles & garments",
                "electronics & electrical",
                "pharmaceuticals",
                "chemicals",
                "automotive",
                "other",
              ],
            ],
            msg: "Invalid commodity category. Allowed: food & beverages, textiles & garments, electronics & electrical, pharmaceuticals, chemicals, automotive, other.",
          },
        },
      },
      subCommodity: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "Sub-commodity cannot be empty if provided.",
          },
          // Note: Complex validation for sub-commodity is best handled at the controller/service level
        },
      },
      riceType: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "Rice type cannot be empty if provided.",
          },
          isValidRiceType: function (value) {
            if (value && value.trim() !== "") {
              // Case-insensitive check against a list of allowed rice types
              const allowedRiceTypes = [
                "basmati rice",
                "jasmine rice",
                "brown rice",
                "white rice",
                "wild rice",
                "arborio rice",
                "black rice",
                "red rice",
                "sticky rice",
                "parboiled rice",
                "long grain rice",
                "medium grain rice",
                "short grain rice",
                "organic rice",
                "non-gmo rice",
                "broken rice",
                "rice bran",
                "rice flour",
                "other",
              ];
              const lowerValue = value.toLowerCase();
              if (!allowedRiceTypes.includes(lowerValue)) {
                throw new Error(
                  `Invalid rice type '${value}'. Allowed types include: Basmati, Jasmine, Brown Rice, etc.`
                );
              }
            }
          },
        },
      },
      volume: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Volume is required.",
          },
          isFloat: {
            msg: "Volume must be a number.",
          },
          min: {
            args: [0],
            msg: "Volume cannot be negative.",
          },
        },
      },
      siUnits: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "SI units are required.",
          },
          isIn: {
            args: [["kg", "ton", "liter", "gallon", "pieces", "other"]],
            msg: "Invalid SI unit. Must be kg, ton, liter, gallon, pieces, or other.",
          },
        },
      },
      expectedBudgetUSD: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: {
            msg: "Expected budget must be a number.",
          },
          min: {
            args: [0],
            msg: "Budget cannot be negative.",
          },
        },
      },
      // Inspection Type and Dates
      inspectionType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inspection type is required.",
          },
          isIn: {
            args: [["single_day", "multi_day"]],
            msg: "Invalid inspection type. Must be single_day or multi_day.",
          },
        },
      },
      singleDayInspectionDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: {
            msg: "Single day inspection date must be a valid date format.",
          },
        },
      },
      multiDayInspectionStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: {
            msg: "Multi-day inspection start date must be a valid date format.",
          },
        },
      },
      multiDayInspectionEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: {
            msg: "Multi-day inspection end date must be a valid date format.",
          },
        },
      },
      // Services Required
      physicalInspection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      physicalInspectionParam: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [0, 5000],
            msg: "Physical inspection parameters cannot exceed 5000 characters.",
          },
        },
      },
      chemicalTesting: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      chemicaltestingparam: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [0, 5000],
            msg: "Chemical testing parameters cannot exceed 5000 characters.",
          },
        },
      },
      certificates: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
        validate: {
          isValidCertificate: function (value) {
            const allowedCertificates = [
              "NABL",
              "NABCB",
              "COC",
              "FOSFE",
              "GAFTA",
              "ISO",
              "Other",
            ];
            if (value && value.length > 0) {
              const invalidCert = value.find(
                (cert) => !allowedCertificates.includes(cert)
              );
              if (invalidCert) {
                throw new Error(
                  `Invalid certificate type: ${invalidCert}. Allowed types are ${allowedCertificates.join(
                    ", "
                  )}.`
                );
              }
            }
          },
        },
      },
      additionalServices: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
        validate: {
          isValidService: function (value) {
            const allowedServices = [
              "psi",
              "loading_track",
              "stuffing_container",
              "Sampling",
              "Supervision",
              "Loading/Unloading",
              "Stock-pile inventory",
              "Photo/Video Report",
            ];
            if (value && value.length > 0) {
              const invalidService = value.find(
                (service) => !allowedServices.includes(service)
              );
              if (invalidService) {
                throw new Error(
                  `Invalid additional service: ${invalidService}. Allowed types are ${allowedServices.join(
                    ", "
                  )}.`
                );
              }
            }
          },
        },
      },
      // Contact Information
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company name is required.",
          },
          notEmpty: {
            msg: "Company name cannot be empty.",
          },
        },
      },
      contactPersonName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Contact person name is required.",
          },
          notEmpty: {
            msg: "Contact person name cannot be empty.",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          notNull: {
            msg: "Email address is required.",
          },
          isEmail: {
            msg: "Please enter a valid email address.",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true, // Made optional as per some use cases
        validate: {
          is: {
            args: [/^\+?\d{10,15}$/],
            msg: "Please enter a valid phone number (10-15 digits, optional +).",
          },
        },
      },
      // Additional Requirements
      specialRequirements: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [0, 1000],
            msg: "Special requirements cannot exceed 1000 characters.",
          },
        },
      },
    },
    {
      // Model options
      tableName: "raise_enquiries",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );

  // ✅ UPDATED ASSOCIATION METHOD
  // Association with Customer
  Raiseenquiry.associate = function (models) {
    // Association with Customer
    Raiseenquiry.belongsTo(models.Customer, {
      foreignKey: "customerId",
      targetKey: "customer_id", // Map to the customer_id field in Customer model
      as: "customer",
    });

    // ✅ FIXED: Use 'Bidding' instead of 'BiddingRoom' (matches your models/index.js)
    Raiseenquiry.belongsTo(models.Bidding, {
      foreignKey: "customerId", // Foreign key in raise_enquiries table
      targetKey: "customer_id", // Target key in commodities table
      as: "biddingRoom", // Alias for the association
    });
  };

  return Raiseenquiry;
};
