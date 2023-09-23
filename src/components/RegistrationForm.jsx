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
              className="inputLabelRegister control-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="inputFieldsRegister form-control"
              id="exampleInputFirstName"
              value={user.firstName}
              onChange={(e) => {
                handleFieldChange(e);
              }}
              placeholder="Please Enter Your First Name Here"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputLastName"
              className="inputLabelRegister control-label">
              Last Name
            </label>
            <input
              type="text"
              className="inputFieldsRegister form-control"
              id="exampleInputLastName"
              name="lastName"
              required
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
              className="inputLabelRegister control-label">
              Email
            </label>
            <input
              type="email"
              className="inputFieldsRegister form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={user.email}
              required
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
              className="inputLabelRegister control-label">
              Password
            </label>
            <input
              type="password"
              className="inputFieldsRegister form-control"
              id="exampleInputPassword1"
              name="password"
              value={user.password}
              required
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
              className="inputLabelRegister control-label">
              Contact
            </label>
            <input
              className="inputFieldsRegister form-control"
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
              className="inputLabelRegister control-label">
              Date of Birth
            </label>
            <input
              className="inputFieldsRegister form-control datepicker"
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
      {selectedOption === "kid" && (
        <div className="side-by-side">
          <div className="col-md-6">
            <div className="mb-3">
              <label
                htmlFor="exampleInputRollNo"
                className="inputLabelRegister control-label">
                Roll No
              </label>
              <input
                className="inputFieldsRegister form-control"
                id="exampleInputRollNo"
                name="rollNo"
                value={user.rollNo}
                required
                onChange={(e) => handleFieldChange(e)}
                placeholder="Please Enter Your Roll Number Here"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label
                htmlFor="exampleInputAgeGroup"
                className="inputLabelRegister control-label">
                Age Group{" "}
              </label>
              <select
                className="inputFieldsRegister form-control"
                id="exampleInputAgeGroup"
                name="ageGroup"
                value={user.ageGroup}
                required
                onChange={(e) => handleFieldChange(e)}
                placeholder="Please select the Age Group Category Here">
                <option value="">Select Age Group</option>
                <option value="3-5">3-5</option>
                <option value="5-9">5-9</option>
                <option value="9+">9+</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="side-by-side">
        {(selectedOption === "kid" || selectedOption === "teacher") && (
          <div className="col-md-6">
            <div className="mb-3">
              <label
                htmlFor="exampleInputteacher"
                className="inputLabelRegister control-label">
                Teacher ID
              </label>
              <input
                className="inputFieldsRegister form-control"
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
                className="inputLabelRegister control-label">
                Parent's Email
              </label>
              <input
                className="inputFieldsRegister form-control"
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
