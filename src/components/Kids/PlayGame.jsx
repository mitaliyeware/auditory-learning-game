import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../Styles/PlayGame.css";
import { selectGame } from "../../utils/categorySlice";

const PlayGame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBoxClick = (game) => {
    dispatch(selectGame(game));
    navigate(`/user/kid/play/category`);
    // navigate(`/user/kid/game/${game}`);
  };

  return (
    <>
      <button
        className="btn"
        style={{ width: 50 }}
        onClick={() => navigate("/user/kid")}
      >
        <i
          className="bi bi-arrow-left-circle-fill"
          style={{ fontSize: "3rem" }}
        ></i>
      </button>
      <div className="rectangle-container-game">
        <div className="square-box-game1">
          <img
            src="/assets/MatchMasters.png"
            alt="MatchMasters"
            className="button-image"
            onClick={() => handleBoxClick("matchmasters")}
          />
        </div>
        <div className="square-box-game2">
          <img
            src="/assets/TargetTuck.png"
            alt="TargetTuck"
            className="button-image"
            onClick={() => handleBoxClick("targettuck")}
          />
        </div>
        <div className="square-box-game1">
          <img
            src="/assets/DigitDashy.png"
            alt="DigitDashy"
            className="button-image"
            onClick={() => handleBoxClick("digitdashy")}
          />
        </div>
        <div className="square-box-game2">
          <img
            src="/assets/PeculiarPick.png"
            alt="PeculiarPick"
            className="button-image"
            onClick={() => handleBoxClick("peculiarpick")}
          />
        </div>
      </div>
    </>
  );
};

export default PlayGame;
