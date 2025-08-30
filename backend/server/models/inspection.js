const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Inspection = sequelize.define(
    "Inspection", // <- model name
    {
      inspectorId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      inspectionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commodity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subCommodity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM("Low", "Medium", "High"),
        defaultValue: "Low",
      },
      customerBudget: {
        type: DataTypes.FLOAT,
        allowNull: false,
        get() {
          const value = this.getDataValue("customerBudget");
          return value ? `$${value}` : null;
        },
      },

      lowestBid: {
        type: DataTypes.FLOAT,
        get() {
          const value = this.getDataValue("lowestBid");
          return value ? `$${value}` : null;
        },
      },

      totalBids: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      yourBid: {
        type: DataTypes.FLOAT,
        get() {
          const value = this.getDataValue("yourBid");
          return value ? `$${value}` : null;
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      certificate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timeRemaining: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "inspections", // <- explicit table name
      timestamps: true, // <- adds createdAt & updatedAt
    }
  );

  return Inspection;
};
