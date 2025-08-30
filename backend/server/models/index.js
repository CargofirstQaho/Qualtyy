// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

const env = process.env.NODE_ENV || "local";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port, // Only needed for PostgreSQL
    logging: dbConfig.logging,
    define: dbConfig.define || {},
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Load models
db.Customer = require("./customer")(sequelize, DataTypes);
db.Company = require("./company")(sequelize, DataTypes);
db.Raiseenquiry = require("./Raiseenquiry")(sequelize, DataTypes);
db.Phyinspectionparam = require("./Phyinspectionparam")(sequelize, DataTypes);
db.Chemicalinsparameter = require("./CheminsParam")(sequelize, DataTypes);
db.Inspector = require("./inspector")(sequelize, DataTypes);
db.Message = require("./message")(sequelize, DataTypes);
db.GeneralPhyinspectionparam = require("./GeneralPhyinspectionparam")(
  sequelize,
  DataTypes
);
db.Auth = require("./auth")(sequelize, DataTypes);
db.Profess = require("./Profes")(sequelize, DataTypes);
db.Bidding = require("./biddingroom")(sequelize, DataTypes);
db.Inspection = require("./inspection")(sequelize, DataTypes);

// 🚀 Initialize associations (important!)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
