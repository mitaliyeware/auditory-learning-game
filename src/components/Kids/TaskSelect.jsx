import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/TaskSelect.css";
import { useDispatch } from "react-redux";
import { selectMode } from "../../utils/categorySlice";

const TaskSelect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = (mode) => {
    dispatch(selectMode(mode));
    mode === "learn"
      ? navigate("/user/kid/learn/category")
      : navigate("/user/play");
  };

  return (
    <div className="page-container-ts">
      <div className="rectangle-container-ts">
        <div className="clickable-box">
          <img
            src="/assets/learn.png"
            alt="Learn"
            onClick={() => handleButtonClick("learn")}
          />
        </div>
        <div className="clickable-box">
          <img
            src="/assets/play.png"
            alt="Play"
            onClick={() => handleButtonClick("play")}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskSelect;
