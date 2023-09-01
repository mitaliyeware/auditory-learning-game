import React, { useState } from "react";
//import "./UserProfile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    contact: "",
    birthDate: "",
    rollNo: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
  });

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="row mb-5 gx-5">
      <div className="my-6">
        <h1>Profile Page</h1>
      </div>
      <div className="col-xxl-8 mb-5 mb-xxl-0 bordered-fields">
        <div className="bg-secondary-soft px-4 py-5 rounded ">
          <div className="row g-3">
            <h4 className="mb-4 mt-0">Contact Details</h4>
            <div className="col-md-4">
              <label className="form-label">First Name</label>

              <input
                type="text"
                className="form-control"
                name="firstName"
                value={userData.firstName}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={userData.lastName}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Email ID</label>
              <input
                type="email"
                className="form-control"
                name="emailID"
                value={userData.email}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                name="oldPassword"
                value={userData.oldPassword}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={userData.newPassword}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                value={userData.contact}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Birth Date</label>
              <input
                type="date"
                className="form-control datepicker"
                name="birthDate"
                value={userData.birthDate}
                onChange={handleOptionChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-4 bordered-fields">
        <div className="bg-secondary-soft px-4 py-5 rounded">
          <div className="row g-3">
            <h4 className="mb-4 mt-0">Upload your profile photo</h4>
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
          </div>
        </div>
      </div>
      <div className="col-xxl-8 mb-5 mb-xxl-0 bordered-fields">
        <div className="bg-secondary-soft px-4 py-5 rounded ">
          <div className="row g-3">
            <h4 className="mb-4 mt-0">Personal Details</h4>
            <div className="col-md-4">
              <label className="form-label">Address Line 1</label>

              <input
                type="text"
                className="form-control"
                name="addressLine1"
                value={userData.addressLine1}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Address Line 2</label>
              <input
                type="text"
                className="form-control"
                name="addressLine2"
                value={userData.addressLine2}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">ZIP Code</label>
              <input
                type="text"
                className="form-control"
                name="zipCode"
                value={userData.zipCode}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={userData.city}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">state</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={userData.state}
                onChange={handleOptionChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={userData.country}
                onChange={handleOptionChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="side-by-side"></div>
      <div className="gap-3 d-md-flex justify-content-md-end text-center">
        <button type="button" className="btn btn-danger btn-lg">
          Delete profile
        </button>
        <button type="button" className="btn btn-primary btn-lg">
          Update profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
