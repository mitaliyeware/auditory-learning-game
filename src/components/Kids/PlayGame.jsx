import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../utils/categorySlice";
import { setGamePath } from "../../utils/gameSelectSlice";
import "../../Styles/PlayGame.css";

const PlayGame = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(""); // Store the selected game path
  const dispatch = useDispatch();
  //   const handleBoxClick = (path) => {
  //     setSelectedGame(path); // Set the selected game path

  //     // Now, navigate to category selection instead of the game
  //     navigate("/category");
  //   };

  // This function seems to be unused in your PlayGame component
  // I'd recommend moving it to the Category component if not already present there
  const handleCardClick = (categoryName) => {
    dispatch(selectCategory(categoryName));
  };

  const handleBoxClick = (path) => {
    dispatch(setGamePath(path));
    navigate("/category");
  };
  return (
    <>
      <div className="rectangle-container-game">
        <div
          className="square-box-game"
          onClick={() => handleBoxClick("/games/matchmasters")}
        >
          <img
            src="/assets/MatchMasters.png"
            alt="MatchMasters"
            className="button-image"
          />
        </div>
        <div
          className="square-box-game"
          onClick={() => handleBoxClick("/games/targettuck")}
        >
          <img
            src="/assets/TargetTuck.png"
            alt="TargetTuck"
            className="button-image"
          />
        </div>
        <div
          className="square-box-game"
          onClick={() => handleBoxClick("/games/digitdashy")}
        >
          <img
            src="/assets/DigitDashy.png"
            alt="DigitDashy"
            className="button-image"
          />
        </div>
        <div
          className="square-box-game"
          onClick={() => handleBoxClick("/games/peculiarpick")}
        >
          <img
            src="/assets/PeculiarPick.png"
            alt="PeculiarPick"
            className="button-image"
          />
        </div>
      </div>
    </>
  );
};

export default PlayGame;
