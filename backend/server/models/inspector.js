// models/Inspector.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Inspector = sequelize.define(
    "Inspector",
    {
      inspector_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      inspectorType: {
        type: DataTypes.ENUM("indian", "international"),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // REMOVE THIS LINE: unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      commodities: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      createAccount: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      governmentIdUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ifscCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "inspectors",
      timestamps: true,
    }
  );

  return Inspector;
};
