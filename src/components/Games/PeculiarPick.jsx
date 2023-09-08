import React, { useState, useEffect } from "react";
import "../../Styles/PeculiarPick.css";

const PeculiarPick = () => {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 9) + 1
  );
  const [timeLeft, setTimeLeft] = useState(60);
  const [availableBoxes, setAvailableBoxes] = useState(
    Array.from({ length: 9 }, (_, i) => i + 1)
  );

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      // Cleanup timer when component unmounts or timeLeft changes
      return () => clearTimeout(timerId);
    } else {
      window.alert("Time's up!");
      window.location.reload(); // Refreshes the page when time runs out
    }
  }, [timeLeft]);

  const handleDragStart = (e, boxNumber) => {
    e.dataTransfer.setData("boxNumber", boxNumber.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const boxNumber = parseInt(e.dataTransfer.getData("boxNumber"), 10);
    setAvailableBoxes((prevBoxes) =>
      prevBoxes.filter((num) => num !== boxNumber)
    );

    // Reduce the beaker's number by 1
    setRandomNumber((prevNumber) => prevNumber - 1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="rectangle-container-pp">
        <div className="rectangle-pp">
          {availableBoxes.map((boxNumber) => (
            <div
              key={boxNumber}
              className="square-box-pp"
              draggable
              onDragStart={(e) => handleDragStart(e, boxNumber)}
            ></div>
          ))}
        </div>
        <div
          className="beaker-container-pp"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="random-number-pp">{randomNumber}</div>
        </div>
        <div className="timer-content-pp">
          <img
            src="/assets/timer.png"
            alt="Timer Icon"
            className="sound-button-pp"
          />
          <p>Time left: {timeLeft} seconds</p>
        </div>
      </div>
      <button className="check-button-pp" onClick={handleRefresh}>
        <img
          src="/assets/check.png"
          alt="Check Button"
          className="sound-button-pp"
        />
      </button>
    </>
  );
};

export default PeculiarPick;
