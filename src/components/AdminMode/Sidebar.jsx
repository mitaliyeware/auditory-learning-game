import React from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Sidebar = ({ changeView }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white sidebar">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">HearMe</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <button
          className="list-group-item py-1 my-1"
          onClick={() => changeView("dashboard")}
        >
          <i className="bi bi-speedometer2 fs-5 me-3"></i>
          <span className="fs-5">Dashboard</span>
        </button>

        <button
          className="list-group-item py-2 my-1"
          onClick={() => changeView("upload")}
        >
          <i className="bi bi-upload fs-5 me-3"></i>
          <span className="fs-5">Upload</span>
        </button>
        {/* <button className="btn btn-link list-group-item py-2 my-1">
          <i className="bi bi-upload fs-5 me-3"></i>
          <span className="fs-5">Upload</span>
        </button> */}
        <a
          className="list-group-item py-2 my-1"
          onClick={() => changeView("profile")}
        >
          <i className="bi bi-people fs-5 me-3"></i>
          <span className="fs-5">Profile</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
