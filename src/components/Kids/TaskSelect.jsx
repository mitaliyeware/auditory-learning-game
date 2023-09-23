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
      <div className="myRectangle rectangle-container-ts">
        <div
          className="card1 clickable-box"
          onClick={() => handleButtonClick("learn")}>
          <img
            src="/assets/learn.png"
            alt="Learn"
          />
        </div>
        <div
          className="card2 clickable-box"
          onClick={() => handleButtonClick("play")}>
          <img
            src="/assets/play.png"
            alt="Play"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskSelect;
