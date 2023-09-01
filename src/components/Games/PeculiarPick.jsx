import React, { useState, useEffect } from "react";
import "../../Styles/PeculiarPick.css";

const PeculiarPick = () => {
  // Generate a random number between 1 and 9
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 9) + 1
  );
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
        {/* <div className="rectangle">{generateBoxes(randomNumber)}</div> */}
        <div className="rectangle">
          {/* Loop through an array of length `randomNumber` and render boxes
          {Array.from({ length: randomNumber }).map((_, index) => (
            <div key={index} className="inner-box"></div>
          ))} */}
          <div className="square-box"></div>
          <div className="square-box"></div>
          <div className="square-box"></div>
          <div className="square-box"></div>
          <div className="square-box"></div>
          <div className="square-box"></div>
          <div className="square-box"></div>
          <div className="square-box"></div>
          <div className="square-box"></div>
        </div>
        <div className="beaker-container">
          <div className="random-number">{randomNumber}</div>{" "}
        </div>
        <div className="timer-content">
          <img
            src="/assets/timer.png"
            alt="Timer Icon"
            className="sound-button"
          />
          <p>Time left: {timeLeft} seconds</p> {/* Display timer */}
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

export default PeculiarPick;
