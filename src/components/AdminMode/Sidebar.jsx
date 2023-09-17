import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const userDetails = useSelector((store) => store.login.userDetails[0]);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  // Early return
  if (!isMenuOpen) return null;

  return (
    <div className="bg-white sidebar">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">HearMe</span>
      </div>
      <hr className="text-dark" />
      <ul>
        {userDetails?.userType === "teacher" && (
          <li>
            <Link to="/user/teacher">
              <i className="bi bi-speedometer2 fs-5 me-3"></i>
              <span className="fs-5">Dashboard</span>
            </Link>
          </li>
        )}
        {userDetails?.userType === "parent" && (
          <li>
            <Link to="/user/parent">
              <i className="bi bi-speedometer2 fs-5 me-3"></i>
              <span className="fs-5">Dashboard</span>
            </Link>
          </li>
        )}
        <li>
          <Link to="/user/upload">
            <i className="bi bi-upload fs-5 me-3"></i>
            <span className="fs-5">Upload</span>
          </Link>
        </li>
        <li>
          <Link to="/user/profile">
            <i className="bi bi-people fs-5 me-3"></i>
            <span className="fs-5">Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
