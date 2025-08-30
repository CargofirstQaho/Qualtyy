// professional.model.js
// This file defines the 'Professional' model using Sequelize, which represents the 'professionals' table in your database.
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Professional = sequelize.define(
    "Professional",
    {
      // The `id` column, which will be the primary key and will auto-increment.
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // The company name, a string that cannot be null.
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // The license number, a unique string that cannot be null.
      licenceNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      // The professional's experience in years, an integer with a default value of 0.
      experience: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      // The joined date, a date field with a default value of the current timestamp.
      joinedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      // The professional's bio, a text field that cannot be null.
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // An array of strings to store multiple specializations.
      specializations: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      // Specify the table name in the database.
      tableName: "professionals",
      // Automatically add `createdAt` and `updatedAt` timestamps.
      timestamps: true,
    }
  );

  return Professional;
};
