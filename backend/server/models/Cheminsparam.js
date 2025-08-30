// server/models/cheminsparam.js
// This file defines the CheminsParam model for Sequelize, simplified to store a single text entry.

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CheminsParam = sequelize.define(
    "CheminsParam",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      // This field will now store the "text or sentence" added by the user
      parameter_name: {
        type: DataTypes.TEXT, // Using TEXT for potentially longer sentences
        allowNull: false,
        unique: true, // Keep unique if each sentence/parameter name must be distinct
        // Change to false if you allow duplicate sentences/names
      },
    },
    {
      tableName: "chemical_parameters", // Explicitly set table name
      timestamps: true, // Adds createdAt and updatedAt columns automatically
      // If you want to prevent Sequelize from pluralizing the table name, set freezeTableName: true
      // freezeTableName: true,
    }
  );

  return CheminsParam;
};
