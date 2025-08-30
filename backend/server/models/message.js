const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  // Define the Company Model
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationOfInspector: {
        type: DataTypes.STRING, // e.g. "Mumbai, India"
        allowNull: false,
      },
      importerExporter: {
        type: DataTypes.STRING, // e.g. "Importer" or "Exporter"
        allowNull: false,
      },
      additionalDetails: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "messages",
      timestamps: true,
    }
  );

  return Message;
};
