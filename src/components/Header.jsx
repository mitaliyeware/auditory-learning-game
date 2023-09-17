import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../utils/loginSlice";
import { toggleMenu } from "../utils/appSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((store) => store.login.userDetails[0]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 401 || !res) {
        window.alert("Please Logout");
      } else {
        dispatch(clearUserDetails());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        {userDetails?.userType !== "kid" && (
          <img
            width={50}
            height={50}
            src="https://static.vecteezy.com/system/resources/previews/021/190/402/original/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg"
            alt="Menu"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenuHandler()}
          />
        )}
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/About">
                  About
                </NavLink>
              </li>
            </ul>
            {!userDetails && (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline-primary ms-auto px-4 rounded-pill"
                >
                  <i className="fa fa-sign-in me-2"></i>
                  Login
                </NavLink>
                <NavLink
                  to="register"
                  className="btn btn-outline-primary ms-2 px-4 rounded-pill"
                >
                  <i className="fa fa-user-plus me-2"></i>
                  Register
                </NavLink>
              </>
            )}
            {userDetails && (
              <>
                {`Hello, ${userDetails?.firstName}`}
                <i
                  // className="bi bi-person-circle"
                  className="bi"
                  style={{
                    fontSize: "2rem",
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                  }}
                ></i>
                <button
                  className="btn btn-outline-primary ms-2 px-4 rounded-pill"
                  onClick={handleLogout}
                >
                  <i className="fa fa-sign-out me-2"></i>Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
