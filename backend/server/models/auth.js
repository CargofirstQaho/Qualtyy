const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Auth = sequelize.define(
    "Auth",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        field: "full_name",
        allowNull: true,
      },
      emailId: {
        type: DataTypes.STRING,
        field: "email_id",
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      mobileNumber: {
        type: DataTypes.STRING,
        field: "mobile_number",
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      loginTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      logoutTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "login_sessions",
      timestamps: false,
    }
  );

  return Auth;
};
