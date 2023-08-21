import { useState } from "react";
import Sidebar from "./Sidebar";
import TeacherDashboard from "./TeacherDashboard";
import Profile from "./Profile";
import UploadMedia from "./UploadMedia";

const UserPanel = ({ userDetails }) => {
  const [currentView, setCurrentView] = useState("dashboard");
  return (
    <>
      {userDetails && (
        <div className="container-fluid bg-secondary min-vh-100">
          <div className="row">
            {/* <Router> */}
            {userDetails?.userType !== "child" ? (
              <div className="col-2 bg-white vh-100">
                {/* <Routes>
                  <Route exact path="/" Component={Sidebar} />
                </Routes> */}
                <Sidebar changeView={setCurrentView} />
              </div>
            ) : null}
            {userDetails?.userType === "teacher" ? (
              <div className="col-10">
                {/* <Routes>
                  <Route exact path="/dashboard" Component={TeacherDashboard} />
                </Routes> */}
                {/* <TeacherDashboard userDetails={userDetails} /> */}
                {currentView === "dashboard" && (
                  <TeacherDashboard userDetails={userDetails} />
                )}
                {currentView === "upload" && <UploadMedia />}
                {currentView === "profile" && <Profile />}
              </div>
            ) : null}
            {/* </Router> */}
          </div>
        </div>
      )}
    </>
  );
};

export default UserPanel;
