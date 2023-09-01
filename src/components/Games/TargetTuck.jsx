import React, { useState, useEffect } from "react";
import "../../Styles/TargetTuck.css";

const TargetTuck = () => {
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for example

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      // Cleanup timer when component unmounts or timeLeft changes
      return () => clearTimeout(timerId);
    } else {
      window.alert("Time's up!");
    }
  }, [timeLeft]);
  return (
    <>
      <div className="rectangle-container">
        <div className="rectangles">
          <button className="square-box"></button>
          <button className="square-box"></button>
          <button className="square-box"></button>
          <button className="square-box"></button>
        </div>
        <div className="timer-content">
          <img
            src="/assets/timer.png"
            alt="Timer Icon"
            className="sound-button"
          />
          <p>Time left: {timeLeft} seconds</p> {/* Display timer */}
        </div>
        <div className="beaker-container">
          <button className="square-button">
            <img
              src="/assets/sound.png"
              alt="Sound Button"
              className="sound-button"
            />{" "}
          </button>
        </div>
      </div>
      <button className="check-button">
        <img
          src="/assets/check.png"
          alt="Check Button"
          className="sound-button"
        />
      </button>
    </>
  );
};

export default TargetTuck;
