import React from "react";
import "../../Styles/PlayGame.css";

const PlayGame = () => {
  const handleBoxClick = (boxNumber) => {
    console.log(`Box ${boxNumber} clicked!`);
    // Add any other logic you want on click here
  };
  return (
    <>
      <div className="rectangle-container-game">
        <div
          className="square-box-game"
          onClick={() => handleBoxClick(1)}
        ></div>
        <div
          className="square-box-game"
          onClick={() => handleBoxClick(1)}
        ></div>
        <div
          className="square-box-game"
          onClick={() => handleBoxClick(1)}
        ></div>
        <div
          className="square-box-game"
          onClick={() => handleBoxClick(1)}
        ></div>
      </div>
    </>
  );
};

export default PlayGame;
