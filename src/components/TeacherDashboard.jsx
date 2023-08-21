import { useState, useEffect } from "react";

const TeacherDashboard = ({ userDetails }) => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getStudentsList();
  }, []);

  const getStudentsList = async () => {
    const res = await fetch(
      `http://localhost:3001/studentList?teacherId=${userDetails.teacherId}`
    );
    const response = await res.json();
    setStudentList(response);
  };

  return (
    <div className="px-3">
      <table className="table caption-top px-3 bg-white rounded mt-2">
        <caption className="text-white fs-4">List of Students</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Roll No</th>
            <th scope="col">Age Group</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentList && studentList.length > 0 ? (
            studentList.map((student, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.rollNo}</td>
                <td>{student.ageGroup}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-primary">Track</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDashboard;
