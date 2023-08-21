import React from "react";

function RadioButtonGroup(props) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="option1"
          checked={props.selectedOption === "option1"}
          onChange={props.handleChange}
        />
        Register as a Teacher
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="option2"
          checked={props.selectedOption === "option2"}
          onChange={props.handleChange}
        />
        Register as a Kid
      </label>
      <br />
    </div>
  );
}

export default RadioButtonGroup;
