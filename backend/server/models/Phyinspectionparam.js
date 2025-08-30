// Phyinspectionparam.js (Sequelize Model)
// This file defines the Phyinspectionparam model for Sequelize.

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Phyinspectionparam = sequelize.define(
    "Phyinspectionparam",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      broken: {
        type: DataTypes.DECIMAL(5, 2), // Numeric(5,2) for broken percentage
        allowNull: false,
        defaultValue: 0.0,
        validate: {
          min: 0, // Ensure value is not negative
        },
      },
      purity: {
        type: DataTypes.DECIMAL(5, 2), // Numeric(5,2) for purity percentage
        allowNull: false,
        defaultValue: 0.0,
        validate: {
          min: 0,
          max: 100, // Purity should be between 0 and 100
        },
      },
      yellowKernel: {
        type: DataTypes.DECIMAL(5, 2), // Numeric(5,2) for yellow kernel percentage
        allowNull: false,
        defaultValue: 0.0,
        field: "yellow_kernel", // Map to snake_case column name in DB
        validate: {
          min: 0,
        },
      },
      damageKernel: {
        type: DataTypes.DECIMAL(5, 2), // Numeric(5,2) for damage kernel percentage
        allowNull: false,
        defaultValue: 0.0,
        field: "damage_kernel", // Map to snake_case column name in DB
        validate: {
          min: 0,
        },
      },
      redKernel: {
        type: DataTypes.DECIMAL(5, 2), // Numeric(5,2) for red kernel percentage
        allowNull: false,
        defaultValue: 0.0,
        field: "red_kernel", // Map to snake_case column name in DB
        validate: {
          min: 0,
        },
      },
      paddyKernel: {
        type: DataTypes.DECIMAL(5, 2), // Numeric(5,2) for paddy kernel percentage
        allowNull: false,
        defaultValue: 0.0,
        field: "paddy_kernel", // Map to snake_case column name in DB
        validate: {
          min: 0,
        },
      },
      chalkyRice: {
        type: DataTypes.DECIMAL(5, 2), // Numeric(5,2) for chalky rice percentage
        allowNull: false,
        defaultValue: 0.0,
        field: "chalky_rice", // Map to snake_case column name in DB
        validate: {
          min: 0,
        },
      },
      liveInsects: {
        type: DataTypes.INTEGER, // Integer for count of live insects
        allowNull: false,
        defaultValue: 0,
        field: "live_insects", // Map to snake_case column name in DB
        validate: {
          min: 0,
        },
      },
      millingDegree: {
        type: DataTypes.STRING(50), // String for milling degree
        allowNull: false,
        field: "milling_degree", // Map to snake_case column name in DB
        validate: {
          isIn: [["Under Milled", "Well Milled", "Over Milled"]], // Enum-like validation
        },
      },
      averageGrainLength: {
        type: DataTypes.DECIMAL(5, 2), // Numeric(5,2) for average grain length
        allowNull: false,
        defaultValue: 0.0,
        field: "average_grain_length", // Map to snake_case column name in DB
        validate: {
          min: 0,
        },
      },
    },
    {
      tableName: "phyinspectionparams", // Explicitly set table name to match previous SQL
      timestamps: true, // Adds createdAt and updatedAt columns
      // If you want to prevent Sequelize from pluralizing the table name, set freezeTableName: true
      // freezeTableName: true,
    }
  );

  return Phyinspectionparam;
};
