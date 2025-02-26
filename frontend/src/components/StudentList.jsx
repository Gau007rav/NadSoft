import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true); // Disable buttons
      try {
        const res = await axios.get(
          `http://localhost:5000/students?page=${page}&limit=${limit}`
        );
        setStudents(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        setError(""); // Clear previous errors
      } catch (error) {
        setError("Failed to fetch students. Please try again." + error);
      }
      setLoading(false); // Re-enable buttons
    };

    fetchStudents();
  }, [page]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student List</h2>

      {/* Show Error Message */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id || student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || loading}
        >
          Prev
        </button>
        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentList;
