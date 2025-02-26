const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // Default user
  host: "localhost",
  database: "Students", // Your database name
  password: "Gk@1995",
  port: 5432, // Default PostgreSQL port
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err));

module.exports = pool;
