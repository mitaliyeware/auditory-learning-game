import React from "react";
import "./../Styles/RegistrationForm.css";

const RegistrationForm = ({
  user,
  dateInputRef,
  selectedOption,
  handleFieldChange,
}) => {
  return (
    <>
      <div className="side-by-side">
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputFirstName"
              className="inputFieldLabelExtended control-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              id="exampleInputLastName"
              value={user.firstName}
              onChange={(e) => {
                handleFieldChange(e);
              }}
              placeholder="Please Enter Your First Name Here"
            />

            {/* <span className="validationMessage">First name is required.</span> */}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputLastName"
              className="inputFieldLabelExtended control-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLastName"
              name="lastName"
              value={user.lastName}
              onChange={(e) => handleFieldChange(e)}
              placeholder="Please Enter Your Last Name Here"
            />
          </div>
        </div>
      </div>
      <div className="side-by-side">
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="inputFieldLabelExtended control-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={user.email}
              onChange={(e) => handleFieldChange(e)}
              placeholder="Please Enter Your Email ID Here"
              // onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="inputFieldLabelExtended control-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={user.password}
              onChange={(e) => handleFieldChange(e)}
              placeholder="Please Enter Your Password Here"
            />
          </div>
        </div>
      </div>

      <div className="side-by-side">
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputContact"
              className="inputFieldLabelExtended">
              Contact
            </label>
            <input
              className="form-control"
              id="exampleInputContact"
              name="phone"
              type="tel"
              value={user.phone}
              onChange={(e) => handleFieldChange(e)}
              placeholder="Please Enter Your Contact Number Here"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputBirthDate"
              className="inputFieldLabelExtended">
              Date of Birth
            </label>
            <input
              className="form-control datepicker"
              type="date"
              inline="true"
              id="exampleInputBirthDate"
              name="birthDate"
              value={user.birthDate}
              ref={dateInputRef}
              onChange={(e) => handleFieldChange(e)}
              placeholder="Please Enter Your Birthdate Here"
            />
          </div>
        </div>
      </div>
      <div className="side-by-side">
        {selectedOption === "kid" || selectedOption === "parent" ? (
          <>
            <div className="col-md-6">
              <div className="mb-3">
                <label
                  htmlFor="exampleInputRollNo"
                  className="inputFieldLabelExtended control-label">
                  Roll No
                </label>
                <input
                  className="form-control"
                  id="exampleInputRollNo"
                  name="rollNo"
                  value={user.rollNo}
                  onChange={(e) => handleFieldChange(e)}
                  placeholder="Please Enter Your Roll Number Here"
                />
              </div>
            </div>
          </>
        ) : null}
        {selectedOption === "kid" ? (
          <div className="col-md-6">
            <div className="mb-3">
              <label
                htmlFor="exampleInputAgeGroup"
                className="inputFieldLabelExtended control-label">
                Age Group{" "}
              </label>
              <select
                className="form-control"
                id="exampleInputAgeGroup"
                name="ageGroup"
                value={user.ageGroup}
                onChange={(e) => handleFieldChange(e)}
                placeholder="Please select the Age Group Category Here">
                <option value="">Select Age Group</option>
                <option value="3-5">3-5</option>
                <option value="5-9">5-9</option>
                <option value="9+">9+</option>
              </select>
            </div>
          </div>
        ) : null}
      </div>

      <div className="side-by-side">
        {(selectedOption === "kid" || selectedOption === "teacher") && (
          <div className="col-md-6">
            <div className="mb-3">
              <label
                htmlFor="exampleInputteacher"
                className="inputFieldLabelExtended control-label">
                Teacher ID
              </label>
              <input
                className="form-control"
                id="exampleInputteacher"
                name="teacherId"
                value={user.teacherId}
                required
                onChange={(e) => handleFieldChange(e)}
                placeholder="Please Enter Teacher's ID Here"
              />
            </div>
          </div>
        )}
        {selectedOption === "kid" && (
          <div className="col-md-6">
            <div className="mb-3">
              <label
                htmlFor="exampleInputParentEmail"
                className="inputFieldLabelExtended control-label">
                Parent's Email
              </label>
              <input
                className="form-control"
                id="exampleInputParentEmail"
                name="parentEmail"
                value={user.parentEmail}
                required
                onChange={(e) => handleFieldChange(e)}
                placeholder="Please Enter Parent's Email Here"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegistrationForm;
