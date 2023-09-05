import React, { useState, useEffect } from "react";
//import "./UserProfile.css";
import "./../Styles/Profile.css";
import { useSelector } from "react-redux";

const initialUserData = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  birthDate: "",
  rollNo: "",
  addressLine1: "",
  addressLine2: "",
  zipCode: "",
  city: "",
  state: "",
  country: "",
};

const Profile = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [countryList, setCountryList] = useState([]);

  const userDetails = useSelector((store) => store.login.userDetails[0]);

  const getUserDetails = async () => {
    const res = await fetch(
      `/profile?email=${userDetails.email}&userType=${userDetails.userType}`
    );
    const response = await res.json();
    console.log("User Details: ", response);
    setUserData(response);
  };

  const getCountryList = async () => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/iso"
    );
    const response = await res.json();
    console.log("Country: ", response);
    setCountryList(response.data);
  };

  useEffect(() => {
    getUserDetails();
    getCountryList();
    // setDateOfBirth(response.birthDate);
  }, []);

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  // const setDateOfBirth = (birthDate) => {
  //   const birthday = new Date(birthDate);
  //   const date = birthday?.getDate();
  //   const month = birthday?.getMonth();
  //   const year = birthday?.getFullYear();

  //   return `${year}-${month}-${date}`;
  // };

  return (
    <div className="row mb-5 gx-5">
      <div className="my-6">
        <h1>Profile Page</h1>
      </div>
      <details>
        <summary>Personal Details</summary>
        <div className="container">
          <div class="row justify-content-start">
            <div className="col-md-4 mb-4">
              <label className="form-label">First Name</label>
              <br />
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.firstName}</label>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Last Name</label>
              <br />
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.lastName}</label>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Email ID</label>
              <br />
              {editMode ? (
                <input
                  type="email"
                  className="form-control"
                  name="emailID"
                  value={userData.email}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.email}</label>
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label">Phone Number</label>
              <br />
              {editMode ? (
                <input
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  value={userData.contact}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.email}</label>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Birth Date</label>
              <br />
              {editMode ? (
                <input
                  type="date"
                  className="form-control datepicker"
                  name="birthDate"
                  // value={setDateOfBirth(userDetails?.birthDate)}
                  value={userDetails.birthDate}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.birthDate}</label>
              )}
            </div>
          </div>
        </div>
      </details>
      <details>
        <summary>Update your profile photo</summary>
        <div class="square position-relative display-2 mb-3">
          <i class="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>
        </div>

        <label for="customFile" class="upload-box">
          <input type="file" id="customFile" name="file" hidden />
        </label>

        <button class="btn btn-success-soft btn-block" for="customFile">
          Upload
        </button>
        <button type="button" class="btn btn-danger-soft">
          Remove
        </button>
      </details>
      <details>
        <summary>Address</summary>
        <div className="container">
          <div class="row justify-content-start">
            <div className="col-md-4">
              <label className="form-label">Address Line 1</label>
              <br />
              {editMode ? (
                <input
                  type="text"
                  className="form-control mb-4"
                  name="addressLine1"
                  value={userData.addressLine1}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.addressLine1}</label>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Address Line 2</label>
              <br />
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="addressLine2"
                  value={userData.addressLine2}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.addressLine2}</label>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">ZIP Code</label>
              <br />
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="zipCode"
                  value={userData.zipCode}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.zipCode}</label>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">City</label>
              <br />
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={userData.city}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.city}</label>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">state</label>
              <br />
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={userData.state}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.state}</label>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Country</label>
              <br />
              {editMode ? (
                <select className="form-control" name="country">
                  {countryList.forEach((country) => (
                    <option value={country.Iso2}>{country.name}</option>
                  ))}
                  {/* value={userData.country} */}
                  {/* onChange={handleOptionChange} */}
                </select>
              ) : (
                <label className="form-label">{userData.country}</label>
              )}
            </div>
          </div>
        </div>
      </details>
      <div className="side-by-side"></div>
      <div className="gap-3 d-md-flex justify-content-md-end text-center">
        <button type="button" className="btn btn-danger btn-lg">
          Delete profile
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Update Profile" : "Edit profile"}
          {/* Update Profile */}
        </button>
      </div>
    </div>
  );
};

export default Profile;
