import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/TaskSelect.css";

const TaskSelect = () => {
  const navigate = useNavigate();
  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="rectangle-container">
        <div
          className="clickable-box"
          onClick={() => handleButtonClick("/taskselect/learn")}
        >
          <img src="/assets/learn.png" alt="Learn" />
        </div>
        <div
          className="clickable-box"
          onClick={() => handleButtonClick("/taskselect/playgame")}
        >
          <img src="/assets/play.png" alt="Play" />
        </div>
      </div>
    </>
  );
};

export default TaskSelect;
