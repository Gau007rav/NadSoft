const pool = require("../config/Db.js");

const createStudentTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS students (
      student_id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      age INTEGER NOT NULL
    );
  `;
  try {
    await pool.query(query);
    console.log("Students table created successfully.");
  } catch (err) {
    console.error("Error creating students table:", err);
  }
};

createStudentTable();

module.exports = pool;
