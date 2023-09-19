import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../utils/loginSlice";
import { hideHomePage } from "../utils/appSlice";
import "../Styles/Login.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(hideHomePage());
  }, []);

  //handle input
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  //handle Login
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials");
      } else {
        const userDetails = await res.json();
        window.alert("User Logged In");
        console.log("Response: ", userDetails);
        dispatch(addUserDetails(userDetails));
        navigate("/loginRedirect");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="shadow my-5">
    //   <div className="row form">
    //     <div className="container col-md-5 d-flex flex-column align-items-center text-white justify-content-center">
    //       <p className="lead text-center">Enter your credentials to Login</p>
    //       <h5 className="mb-4">OR</h5>
    //       <NavLink
    //         to="/register"
    //         className="btn btn-outline-light rounded-pill pb-2 w-50">
    //         <i className="fa fa-user-plus me-2"></i>
    //         Register
    //       </NavLink>
    //     </div>
    //     <div className=" container col-med-6 p-5">
    //       <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
    //       <form onSubmit={handleSubmit}>
    //         <div className="mb-3">
    //           <label
    //             htmlFor="exampleInputEmail1"
    //             className="form-label">
    //             Email address
    //           </label>
    //           <input
    //             type="email"
    //             className="form-control"
    //             id="exampleInputEmail1"
    //             aria-describedby="emailHelp"
    //             name="email"
    //             value={user.email}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="mb-3">
    //           <label
    //             htmlFor="exampleInputPassword1"
    //             className="form-label">
    //             Password
    //           </label>
    //           <input
    //             type="password"
    //             className="form-control"
    //             id="exampleInputPassword1"
    //             name="password"
    //             value={user.password}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="mb-3 form-check">
    //           <input
    //             type="checkbox"
    //             className="form-check-input"
    //             id="exampleCheck1"
    //           />
    //           <label
    //             className="form-check-label"
    //             htmlFor="exampleCheck1">
    //             Remember Me
    //           </label>
    //         </div>
    //         <button
    //           type="submit"
    //           className="btn btn-primary w-100 mt-4 rounded-pill">
    //           Login
    //         </button>
    //         <div>
    //           <GoogleLogin />
    //         </div>
    //         {/* <NavLink
    //             to="/auth/google"
    //             className="btn btn-outline-light rounded-pill pb-2 w-50"
    //           >
    //             <i className="fa fa-google me-2"></i> Login with Google
    //           </NavLink> */}
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className="row form">
      {/* <div className="container col-md-5 d-flex flex-column align-items-center text-white justify-content-center"> */}
      {/* <p className="lead text-center">Enter your credentials to Login</p> */}
      {/* <h5 className="mb-4">OR</h5> */}
      {/* <NavLink
            to="/register"
            className="btn btn-outline-light rounded-pill pb-2 w-50">
            <i className="fa fa-user-plus me-2"></i>
            Register
          </NavLink> */}
      {/* </div> */}
      <div className="loginMainContainer container col-med-6 p-5">
        <div className="loginContainer">
          <h3 className="loginHeader fw-bolder mb-4">LOGIN</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 inputFields">
              <label
                htmlFor="exampleInputEmail1"
                className="inputLabel">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 inputFields">
              <label
                htmlFor="exampleInputPassword1"
                className="inputLabel">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            {/* <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              {/* <label
                className="inputLabel"
                htmlFor="exampleCheck1">
                Remember Me
              </label> 
            </div> */}
            <button
              type="submit"
              className="btn btn-primary w-100 mt-4 rounded-pill">
              Login
            </button>
            <div className="orDiv">
              <p className="orLabel">OR</p>
            </div>

            <div className="googleLoginDiv">
              <GoogleLogin />
            </div>
            {/* <NavLink
                to="/auth/google"
                className="btn btn-outline-light rounded-pill pb-2 w-50"
              >
                <i className="fa fa-google me-2"></i> Login with Google
              </NavLink> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
