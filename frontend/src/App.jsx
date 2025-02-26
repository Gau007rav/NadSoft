import { useState } from "react";
import { Container } from "react-bootstrap";
import AddStudentForm from "./components/AddStudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <Container className="mt-3">
      <h2 className="text-center">Student Management</h2>
      <AddStudentForm
        selectedStudent={selectedStudent}
        setRefresh={setRefresh}
      />
      <StudentList
        setSelectedStudent={setSelectedStudent}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </Container>
  );
}

export default App;
