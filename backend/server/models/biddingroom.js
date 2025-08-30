// server/models/biddingroom.js
module.exports = (sequelize, DataTypes) => {
  const BiddingRoom = sequelize.define(
    "BiddingRoom",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      // ✅ ADD THIS: customer_id column (for joining with raise_enquiries)

      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Made nullable since existing records won't have this
        comment: "Used for joining with raise_enquiries table via customerId",
      },
      inspector_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Links the record to the inspector who owns it",
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      client_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "expired"),
        allowNull: false,
      },
      volume: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      certificate: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      inspectiontype: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      budget_usd: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      lowest_bid_usd: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      your_bid_usd: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      special_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
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
    },
    {
      tableName: "commodities",
      timestamps: true,
      underscored: true,
    }
  );

  // ✅ ONLY associate with Raiseenquiry (no Customer association)
  BiddingRoom.associate = function (models) {
    // Association with Raiseenquiry via customer_id
    BiddingRoom.hasMany(models.Raiseenquiry, {
      foreignKey: "customerId", // Foreign key in raise_enquiries table
      sourceKey: "customer_id", // Key in commodities table
      as: "enquiries",
    });

    BiddingRoom.belongsTo(models.Inspector, {
      foreignKey: "inspector_id",
      targetKey: "inspector_id",
      as: "inspector",
    });
  };

  return BiddingRoom;
};
