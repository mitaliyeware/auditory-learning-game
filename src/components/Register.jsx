import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import RegistrationForm from "./RegistrationForm";
import { useDispatch } from "react-redux";
import { hideHomePage } from "../utils/appSlice";

const userData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  contact: "",
  birthDate: "",
  rollNo: "",
  ageGroup: "",
  teacherId: "",
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState("");
  const dateInputRef = useRef(null);
  const [user, setUser] = useState(userData);

  useEffect(() => {
    dispatch(hideHomePage());
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setUser(userData);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    const myData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      contact: user.phone,
      birthDate: user.birthDate,
      rollNo:
        selectedOption === "kid" || selectedOption === "parent"
          ? user.rollNo
          : undefined,
      ageGroup: selectedOption === "kid" ? user.ageGroup : undefined,
      teacherId: Number(user.teacherId),
      userType: selectedOption,
    };

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Credentials": "true",
          // "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
        },
        body: JSON.stringify(myData),
      });

      if (res.status === 400 || !res) {
        console.log("Response: ", res);
        window.alert("Existing user");
      } else {
        window.alert("Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="homeDiv">
      <div
        id="signUpMainDiv"
        className="container shadow my-5">
        <div className="row justify-content-end">
          <h1 className="display-6 fw-bolder mb-5">Registration Form</h1>

          <div className="radioButtonDiv">
            <label>
              <input
                type="radio"
                name="userType"
                value="kid"
                checked={selectedOption === "kid"}
                onChange={handleOptionChange}
              />
              Register as a Kid
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="teacher"
                checked={selectedOption === "teacher"}
                onChange={handleOptionChange}
              />
              Register as a Teacher
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="parent"
                checked={selectedOption === "parent"}
                onChange={handleOptionChange}
              />
              Register as a Parent
            </label>
          </div>
          {/* <form id="signUpFormContainer" onSubmit={handleSubmit} method="POST"> */}
          {selectedOption && (
            <div>
              <div className="singUpFormSubDiv">
                <RegistrationForm
                  user={user}
                  dateInputRef={dateInputRef}
                  selectedOption={selectedOption}
                  handleFieldChange={handleFieldChange}
                />
                <div id="submitButtonContainer">
                  <div className="col-md-6">
                    <button
                      //type="submit"
                      className="btn btn-outline-light btn-primary w-50 pb-2 rounded-pill"
                      onClick={(e) => handleSubmit(e)}>
                      Register
                    </button>
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <p className="lead text-center ms-auto">Existing User?</p>
                    <NavLink
                      to="/login"
                      className="btn btn-outline-light rounded-pill pb-2 w-50 ms-auto px-4 ">
                      <i className="fa fa-sign-in me-2"></i>
                      Login
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* </form> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
