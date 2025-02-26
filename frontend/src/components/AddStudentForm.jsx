import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddStudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "age" && e.target.value < 0) return; // Prevent negative values

    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!student.name || !student.email || !student.age) {
      setError("All fields are required.");
      return;
    }
    if (isNaN(student.age) || student.age <= 0) {
      setError("Age must be a positive number.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/students", {
        ...student,
        age: Number(student.age), // Ensure age is a number
      });
      alert("Student added successfully!");
      setStudent({ name: "", email: "", age: "" });
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        "Failed to add student. Please try again.";
      setError(errorMsg);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add Student</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className={`form-control ${
                student.age && student.age < 1 ? "is-invalid" : ""
              }`}
              placeholder="Enter age"
              value={student.age}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Age must be a positive number.
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
