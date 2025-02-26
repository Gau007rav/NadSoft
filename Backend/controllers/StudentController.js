const pool = require("../config/Db.js");

// Get all students with pagination
const getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      "SELECT * FROM students ORDER BY student_id ASC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    const total = await pool.query("SELECT COUNT(*) AS total FROM students");
    const totalStudents = parseInt(total.rows[0].total, 10);

    res.json({
      data: result.rows,
      totalPages: Math.ceil(totalStudents / limit),
      totalStudents,
      currentPage: page,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching student", details: err.message });
  }
};

// Create a student
const createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res
        .status(400)
        .json({ error: "All fields (name, email, age) are required" });
    }

    if (isNaN(age) || age <= 0) {
      return res.status(400).json({ error: "Age must be a positive number" });
    }

    const result = await pool.query(
      "INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "Email already exists. Use a different one." });
    }
    res
      .status(500)
      .json({ error: "Error adding student", details: err.message });
  }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const result = await pool.query(
      "SELECT * FROM students WHERE student_id = $1",
      [studentId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching student", details: err.message });
  }
};

// Update a student
const updateStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res
        .status(400)
        .json({ error: "All fields (name, email, age) are required" });
    }

    if (isNaN(age) || age <= 0) {
      return res.status(400).json({ error: "Age must be a positive number" });
    }

    const result = await pool.query(
      "UPDATE students SET name = $1, email = $2, age = $3 WHERE student_id = $4 RETURNING *",
      [name, email, age, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating student", details: err.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const result = await pool.query(
      "DELETE FROM students WHERE student_id = $1 RETURNING *",
      [studentId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({
      message: "Student deleted successfully",
      student: result.rows[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting student", details: err.message });
  }
};

module.exports = {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
