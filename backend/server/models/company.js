// models/company.js - Create this file if it doesn't exist
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  // Define the Company Model
  const Company = sequelize.define(
    "Company", // Model name (singular, Sequelize will pluralize to 'companies' for table name)
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-incrementing primary key
      },
      company_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUIDs
        allowNull: false,
        unique: true, // Ensure UUIDs are unique
      },
      company_type: {
        type: DataTypes.ENUM("Indian", "International"), // Enum for company types
        allowNull: false,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      office_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      registered_address: {
        // For International
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        // For Indian
        type: DataTypes.TEXT,
        allowNull: true,
      },
      trade_license_path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      import_export_certificate_path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gst_pan_iec_document_path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bank_account_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bank_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ifsc_code: {
        // For Indian
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      swift_code: {
        // For International
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      representative_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password_hash: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      government_id_passport_path: {
        // For International (Passport)
        type: DataTypes.STRING,
        allowNull: true,
      },
      government_id_indian_path: {
        // For Indian (Aadhar/Pan/Passport)
        type: DataTypes.STRING,
        allowNull: true,
      },
      team_members: {
        // New: Stores an array of member objects as JSONB
        type: DataTypes.JSONB,
        defaultValue: [], // Default to an empty array
        allowNull: false,
      },
    },
    {
      tableName: "companies", // Explicitly set table name
      timestamps: true, // Adds createdAt and updatedAt columns
      indexes: [
        {
          unique: true,
          fields: ["email_address", "company_type"], // Unique constraint for email within company type
          name: "unique_email_per_company_type", // Custom index name
        },
      ],
    }
  );

  // No Member model or associations needed as members are embedded

  // Return the defined models
  return Company;
};
