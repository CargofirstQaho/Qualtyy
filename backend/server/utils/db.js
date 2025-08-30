const { Pool } = require('pg'); // Import pg module
const config = require('../config/config.json');
const env = process.env.NODE_ENV || "production";
const dbConfig = config[env];

// Create a PostgreSQL pool
const pool = new Pool({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  // max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 100000, // Close idle clients after 10 seconds
  connectionTimeoutMillis: 50000, // 5 seconds to establish a connection
});

module.exports = pool;
