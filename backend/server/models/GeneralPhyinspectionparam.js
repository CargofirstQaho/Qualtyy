// server/models/GeneralPhyinspectionparam.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const GeneralPhyinspectionparam = sequelize.define(
    "GeneralPhyinspectionparam",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      commodity: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      otherCommodity: {
        type: DataTypes.STRING(255),
        allowNull: true, // This is for the "Other" commodity type
        field: "other_commodity",
      },
      physicalRequirements: {
        type: DataTypes.TEXT, // Using TEXT for potentially long, free-form text
        allowNull: false,
        field: "physical_requirements",
      },
    },
    {
      tableName: "generalphyinspectionparams",
      timestamps: true,
    }
  );

  return GeneralPhyinspectionparam;
};
