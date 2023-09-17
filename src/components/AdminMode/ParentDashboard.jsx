import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ParentDashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const userDetails = useSelector((store) => store.login?.userDetails[0]);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userDetails);
    getStudentData();
  }, []);

  const getStudentData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/student?rollNo=${userDetails.rollNo}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const response = await res.json();
      setStudentData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editStudentDetails = (student) => {
    const data = {
      email: student.email,
      userType: "kid",
    };
    navigate("/user/profile", {
      state: data,
    });
  };

  const deleteProfile = async (email) => {
    try {
      const response = await fetch(`/profile?email=${email}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        setDeleteMessage("Profile deleted successfully");
        setStudentData((prevStudents) =>
          prevStudents.filter((student) => student.email !== email)
        );
        // Here you can add logic to redirect the user to a different page or log them out
      } else {
        setDeleteMessage("Error deleting profile");
      }
    } catch (error) {
      console.error("There was an error deleting the profile:", error);
      setDeleteMessage("Error deleting profile");
    }
  };

  const closeDeleteMessage = () => {
    setDeleteMessage(null);
  };

  return (
    <div className="px-3">
      {deleteMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {deleteMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={closeDeleteMessage}
          ></button>
        </div>
      )}
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
          {studentData && studentData.length > 0 ? (
            studentData.map((student, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.rollNo}</td>
                <td>{student.ageGroup}</td>
                <td>
                  <button
                    className="btn btn-primary button-spacing"
                    onClick={() => editStudentDetails(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProfile(student.email)}
                  >
                    Delete
                  </button>
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

export default ParentDashboard;
