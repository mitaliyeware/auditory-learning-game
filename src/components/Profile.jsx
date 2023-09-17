import React, { useState, useEffect } from "react";
//import "./UserProfile.css";
import "./../Styles/Profile.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom/dist";

const initialUserData = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  birthDate: "",
  rollNo: [],
  ageGroup: "",
  addressLine1: "",
  addressLine2: "",
  zipCode: "",
  city: "",
  state: "",
  country: "",
  image: "",
  userType: "",
};

const Profile = (props) => {
  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [updatedFields, setUpdatedFields] = useState([]);
  const [editPhoto, setEditPhoto] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const userDetails = useSelector((store) => store.login.userDetails[0]);
  const location = useLocation();
  const profileState = location?.state;

  const ageGroupList = [
    { name: "3-5", value: "3-5" },
    { name: "5-9", value: "5-9" },
    { name: "9+", value: "9+" },
  ];

  const getUserDetails = async () => {
    let res = "";
    if (profileState) {
      res = await fetch(
        `/profile?email=${profileState.email}&userType=${profileState.userType}`
      );
    } else if (userDetails) {
      res = await fetch(
        `/profile?email=${userDetails.email}&userType=${userDetails.userType}`
      );
    }
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
    setUpdatedFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const deleteProfile = async () => {
    try {
      const response = await fetch(`/profile?email=${userData.email}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        console.log("Profile deleted successfully");
        // Here you can add logic to redirect the user to a different page or log them out
      } else {
        console.error("Error deleting profile");
      }
    } catch (error) {
      console.error("There was an error deleting the profile:", error);
    }
  };

  const updateProfile = async () => {
    if (editMode) {
      try {
        const res = await fetch("/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            queryField: {
              email: profileState ? profileState.email : userDetails?.email,
            },
            updateFields: updatedFields,
          }),
        });

        if (res.status === 200) {
          const response = await res.json();
          setUserData(response);
          setSuccessMessage("Profile updated successfully");
          setShowSuccessModal(true);
        } else {
          window.alert("There is an issue while updating your record");
        }
      } catch (error) {
        window.alert("There is a problem while updating a page");
      }
    }
    console.log("Updated fields: ", updatedFields);
    setEditMode(!editMode);
  };

  const convertToBase64 = (e) => {
    console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setUserData({ ...userData, image: reader.result });
      setUpdatedFields((prevState) => ({ ...prevState, image: reader.result }));
      setEditPhoto(false);
    };
    reader.onerror = (error) => {
      console.log("Conversion to Base 64 error: ", error);
    };
  };

  const formatDateOfBirth = (birthDate) => {
    const birthday = new Date(birthDate);
    const date = birthday?.getDate();
    const month = birthday?.getMonth() + 1;
    const year = birthday?.getFullYear();

    const formattedDate = date < 10 ? `0${date}` : date;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDate}-${formattedMonth}-${year}`;
  };

  const handleRollNoChange = (index) => (event) => {
    const newRollNo = [...userData.rollNo];
    newRollNo[index] = event.target.value;
    setUserData((prevState) => ({ ...prevState, rollNo: newRollNo }));
    setUpdatedFields((prevState) => ({
      ...prevState,
      rollNo: newRollNo,
    }));
  };

  // Add a new roll number for parents
  const addRollNumber = () => {
    const updatedRollNos = [...userData.rollNo, ""];
    setUserData((prevState) => ({
      ...prevState,
      rollNo: updatedRollNos,
    }));
    setUpdatedFields((prevState) => ({
      ...prevState,
      rollNo: updatedRollNos,
    }));
  };

  // Delete a roll number for parents
  const deleteRollNumber = (index) => {
    const updatedRollNos = [...userData.rollNo];
    updatedRollNos.splice(index, 1);
    setUserData((prevState) => ({
      ...prevState,
      rollNo: updatedRollNos,
    }));
    setUpdatedFields((prevState) => ({
      ...prevState,
      rollNo: updatedRollNos,
    }));
  };

  const SuccessModal = () => {
    return (
      <div
        className="modal fade"
        id="successModal"
        tabIndex="-1"
        aria-labelledby="successModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="successModalLabel">
                Success!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowSuccessModal(false)}
              ></button>
            </div>
            <div className="modal-body">{successMessage}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="row mb-5 gx-5">
      <div className="my-6">
        <h1>Profile Page</h1>
      </div>
      <details className="my-4">
        <summary>Personal Details</summary>
        <div className="container">
          <div class="row justify-content-start">
            <div className="col-md-3 mb-4">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
              <label className="form-label">Email ID</label>
              <br />
              {editMode ? (
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  readOnly
                  value={userData.email}
                  // onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.email}</label>
              )}
            </div>
            <div className="col-md-3">
              <label className="form-label">Phone Number</label>
              <br />
              {editMode ? (
                <input
                  type="tel"
                  className="form-control"
                  name="contact"
                  value={userData.contact}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">{userData.contact}</label>
              )}
            </div>
            <div className="col-md-3">
              <label className="form-label">Birth Date</label>
              <br />
              {editMode ? (
                <input
                  type="date"
                  className="form-control datepicker"
                  name="birthDate"
                  value={formatDateOfBirth(userData?.birthDate)}
                  // value={userDetails.birthDate}
                  onChange={handleOptionChange}
                />
              ) : (
                <label className="form-label">
                  {formatDateOfBirth(userData.birthDate)}
                </label>
              )}
            </div>
            {/* <div className="col-md-3">
              {userData.userType === "parent" && (
                <div>
                  {userData.rollNo.map((roll, index) => (
                    <div key={index}>
                      <label className="form-label">
                        Roll Number {index + 1}
                      </label>
                      <br />
                      {editMode ? (
                        <div className="d-flex">
                          <input
                            type="text"
                            className="form-control"
                            name={`rollNo[${index}]`}
                            value={roll}
                            onChange={handleRollNoChange(index)}
                          />
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteRollNumber(index)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <label className="form-label">{roll}</label>
                      )}
                    </div>
                  ))}
                  {userData.userType === "parent" && editMode && (
                    <button onClick={addRollNumber}>Add Roll Number</button>
                  )}
                </div>
              )}
              {userData.userType !== "parent" && (
                <div>
                  <label className="form-label">Roll Number</label>
                  <br />
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="rollNo[0]"
                      value={userData.rollNo[0]}
                      onChange={handleRollNoChange(0)}
                    />
                  ) : (
                    <label className="form-label">{userData.rollNo[0]}</label>
                  )}
                </div>
              )}
            </div> */}
            {profileState && (
              <div className="col-md-3">
                {userData.rollNo.map((roll, index) => (
                  <div key={index}>
                    <label className="form-label">
                      Roll Number {index + 1}
                    </label>
                    <br />
                    {editMode ? (
                      <input
                        type="text"
                        className="form-control"
                        name={`rollNo[${index}]`}
                        value={roll}
                        onChange={handleRollNoChange(index)}
                      />
                    ) : (
                      <label className="form-label">{roll}</label>
                    )}
                  </div>
                ))}
                {/* <label className="form-label">Roll Number</label>
                <br />
                {editMode ? (
                  <input
                    type="text"
                    className="form-control"
                    name="rollNo"
                    value={userData.rollNo}
                    onChange={handleOptionChange}
                  />
                ) : (
                  <label className="form-label">{userData.rollNo}</label>
                )} */}
              </div>
            )}
            {profileState && (
              <div className="col-md-3">
                <label className="form-label">Age Group</label>
                <br />
                {editMode ? (
                  <select
                    className="form-control"
                    name="ageGroup"
                    value={userData.ageGroup}
                    onChange={handleOptionChange}
                  >
                    {ageGroupList.map((age) => (
                      <option key={age.value} value={age.value}>
                        {age.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <label className="form-label">
                    {ageGroupList.map(
                      (age) => age.value === userData.ageGroup && age.name
                    )}
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </details>
      <details className="my-4">
        <summary className="mb-2">Profile Photo</summary>
        {/* <div class="square position-relative display-2 mb-3">
          <i class="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>
        </div> */}
        <div className="d-flex flex-row align-items-center m-2 position-relative">
          {/* <label
            for="customFile"
            className="upload-box mx-4"> */}
          {/* <img
            width={200}
            height={200}
            src={userData.image}
            alt="Upload"
            style={{ width: "50px", height: "50px" }}
          /> */}
          {/* <button
            style={{ width: "150px", height: "150px", marginRight: "15px" }}> */}
          {!editPhoto && userData?.image ? (
            <img
              src={userData.image}
              alt="user photo"
              style={{ width: "150px", height: "150px", marginRight: "15px" }}
            />
          ) : (
            <div className="mx-4">
              <button className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center mr-5">
                <img
                  src="/assets/upload_image.png"
                  alt="Upload"
                  style={{ width: "50px", height: "50px" }}
                />
                Upload Image
              </button>
              <input
                type="file"
                className="form-control-file position-absolute"
                style={{
                  top: 0,
                  left: 0,
                  opacity: 0,
                  width: "100px",
                  height: "100px",
                }}
                onChange={convertToBase64}
                accept="image/*"
              />
            </div>
            // )
          )}
          {/* </button> */}
          {/* <input
              type="file"
              id="customFile"
              name="file"
              hidden
            /> */}
          {/* </label> */}

          <button
            className="btn btn-primary"
            disabled={!editMode && !editPhoto && updatedFields.image}
            onClick={() => setEditPhoto(!editPhoto)}
          >
            Change Photo
          </button>
        </div>
      </details>
      <details className="my-4">
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
                <select
                  className="form-control"
                  name="country"
                  value={userData.country}
                  onChange={handleOptionChange}
                >
                  <option value="Select country">Select Country</option>
                  {countryList.map((country) => (
                    <option key={country.Iso2} value={country.Iso2}>
                      {country.name}
                    </option>
                  ))}
                  {/* value={userData.country} */}
                  {/* onChange={handleOptionChange} */}
                </select>
              ) : (
                <label className="form-label">
                  {countryList.map(
                    (country) =>
                      country.Iso2 === userData.country && country.name
                  )}
                </label>
              )}
            </div>
          </div>
        </div>
      </details>
      <div className="side-by-side"></div>
      <div className="gap-3 d-md-flex justify-content-md-end text-center">
        <button
          type="button"
          className="btn btn-danger btn-lg"
          onClick={deleteProfile}
        >
          Delete profile
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={updateProfile}
        >
          {editMode ? "Update Profile" : "Edit profile"}
        </button>
        {showSuccessModal && <SuccessModal />}
      </div>
    </div>
  );
};

export default Profile;
