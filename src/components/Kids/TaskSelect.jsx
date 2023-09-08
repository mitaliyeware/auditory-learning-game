import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/TaskSelect.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../utils/loginSlice";
import Login from "../Login";
import Register from "../Register";

const TaskSelect = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleButtonClick = (path) => {
    navigate(path);
  };

  //   if (user?.user.type !== "child") {
  //     return <TaskSelect />;
  //   } else {
  //     return <Login />;
  //   }

  return (
    <>
      <div className="rectangle-container">
        <div
          className="clickable-box"
          onClick={() => handleButtonClick("/category")}
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
