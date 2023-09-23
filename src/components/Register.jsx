import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import RegistrationForm from "./RegistrationForm";
import { useDispatch } from "react-redux";
import { hideHomePage } from "../utils/appSlice";
import "../Styles/RegistrationForm.css";

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
  parentEmail: "",
};

const Register = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [user, setUser] = useState(userData);
  const [isRegisterBtnDisabled, setIsRegisterBtnDisabled] = useState(true);
  const dateInputRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideHomePage());
  }, []);

  useEffect(() => {
    showRegisterButton();
  }, [user]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setUser(userData);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    // if (!userData.firstName) {
    //   return;
    // }

    const myData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      contact: user.phone,
      birthDate: user.birthDate,
      rollNo: selectedOption === "kid" ? user.rollNo : undefined,
      ageGroup: selectedOption === "kid" ? user.ageGroup : undefined,
      teacherId: Number(user.teacherId),
      parentEmail: selectedOption === "kid" ? user.parentEmail : undefined,
      userType: selectedOption,
    };

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // "Access-Control-Allow-Origin": "*", // "Access-Control-Allow-Credentials": "true", // "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
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

  const showRegisterButton = () => {
    if (
      user &&
      user.firstName &&
      user.lastName &&
      user.email &&
      user.password
    ) {
      if (selectedOption === "kid") {
        if (
          user.rollNo &&
          user.ageGroup &&
          user.parentEmail &&
          user.teacherId
        ) {
          setIsRegisterBtnDisabled(false);
        }
      } else if (selectedOption === "teacher") {
        if (user.teacherId) {
          setIsRegisterBtnDisabled(false);
        }
      } else {
        setIsRegisterBtnDisabled(false);
      }
    } else {
      setIsRegisterBtnDisabled(true);
    }
  };

  return (
    <div
      id="homeDiv"
      className="homeDiv">
      <div
        id="signUpMainDiv"
        className="registerContainer shadow my-5">
        <div className="row justify-content-end">
          <h1 className="display-6 fw-bolder mb-5">Register</h1>
          <div className="radioButtonDiv">
            <label>
              <input
                className="radioInput"
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
                className="radioInput"
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
                className="radioInput"
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
            <div className="signUpForm">
              <div className="singUpFormSubDiv">
                <RegistrationForm
                  user={user}
                  dateInputRef={dateInputRef}
                  selectedOption={selectedOption}
                  handleFieldChange={handleFieldChange}
                />
                <div
                  id="submitButtonContainer"
                  className="submitButtonContainer">
                  <div className="submitButton col-md-6">
                    <button //type="submit"
                      disabled={isRegisterBtnDisabled}
                      className="btn btn-primary w-50 pb-2 rounded-pill"
                      onClick={(e) => handleSubmit(e)}>
                      Register
                    </button>
                  </div>
                  <div className="existingUserLabel col-md-6 d-flex align-items-center">
                    <p className="">Existing User?</p>
                    {/* <NavLink
                      to="/login"
                      className="btn btn-outline-light rounded-pill pb-2 w-50 ms-auto px-4 ">
                      <i className="fa fa-sign-in me-2"></i>
                      Login
                    </NavLink> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
