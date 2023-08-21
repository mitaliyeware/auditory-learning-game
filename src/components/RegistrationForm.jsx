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
              className="inputFieldLabelExtended"
            >
              First Name
            </label>
            <input
              type="text"
              className="divInput form-control"
              id="exampleInputFirstName"
              contentEditable={true}
              aria-required="true"
              name="firstName"
              value={user.firstName}
              onChange={(e) => handleFieldChange(e)}
            />
            <span className="validationMessage">First name is required.</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputLastName"
              className="inputFieldLabelExtended"
            >
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLastName"
              name="lastName"
              value={user.lastName}
              onChange={(e) => handleFieldChange(e)}
            />
          </div>
        </div>
      </div>
      <div className="side-by-side">
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="inputFieldLabelExtended"
            >
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
              // onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="inputFieldLabelExtended"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={user.password}
              onChange={(e) => handleFieldChange(e)}
            />
          </div>
        </div>
      </div>

      <div className="side-by-side">
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputContact"
              className="inputFieldLabelExtended"
            >
              Contact
            </label>
            <input
              className="form-control"
              id="exampleInputContact"
              name="phone"
              type="tel"
              value={user.phone}
              onChange={(e) => handleFieldChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputBirthDate"
              className="inputFieldLabelExtended"
            >
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
            />
          </div>
        </div>
      </div>
      {selectedOption === "child" ? (
        <>
          <div className="side-by-side">
            <div className="col-md-6">
              <div className="mb-3">
                <label
                  htmlFor="exampleInputRollNo"
                  className="inputFieldLabelExtended"
                >
                  Roll No
                </label>
                <input
                  className="form-control"
                  id="exampleInputRollNo"
                  name="rollNo"
                  value={user.rollNo}
                  onChange={(e) => handleFieldChange(e)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label
                  htmlFor="exampleInputAgeGroup"
                  className="inputFieldLabelExtended"
                >
                  Age Group
                </label>
                <select
                  className="form-control"
                  id="exampleInputAgeGroup"
                  name="ageGroup"
                  value={user.ageGroup}
                  onChange={(e) => handleFieldChange(e)}
                >
                  <option value="">Select Age Group</option>
                  <option value="3-5">3-5</option>
                  <option value="5-9">5-9</option>
                  <option value="9+">9+</option>
                </select>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="side-by-side">
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="exampleInputteacher"
              className="inputFieldLabelExtended"
            >
              {selectedOption === "child" ? "Teacher ID" : "ID"}
            </label>
            <input
              className="form-control"
              id="exampleInputteacher"
              name="teacherId"
              value={user.teacherId}
              onChange={(e) => handleFieldChange(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
