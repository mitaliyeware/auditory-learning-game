import React, { useState } from "react";
import MatchMasters from "../Games/MatchMasters";

const LevelSelect = () => {
  const [showGame, setShowGame] = useState(false);

  const handleCardClick = (levelName) => {
    console.log(`Selected level: ${levelName}`);
    setShowGame(true);
  };

  if (showGame) {
    return <MatchMasters />;
  }

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-5">Level</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-5 text-center">
            <button
              className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button mb-4 mx-auto"
              onClick={() => handleCardClick("Beginner")}
            >
              <img
                src="/assets/easy.png"
                alt="Begineer"
                className="button-image"
              />
            </button>
            <p>Beginner</p>
          </div>

          <div className="col-md-3 mb-5 text-center">
            <button
              className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button mb-4 mx-auto"
              onClick={() => handleCardClick("Intermediate")}
            >
              <img
                src="/assets/intermediate.png"
                alt="Intermediate"
                className="button-image"
              />
            </button>
            <p>Intermediate</p>
          </div>

          <div className="col-md-3 mb-5 text-center">
            <button
              className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button mb-4 mx-auto"
              onClick={() => handleCardClick("Advanced")}
            >
              <img
                src="/assets/advanced.png"
                alt="Advanced"
                className="button-image"
              />
            </button>
            <p>Advanced</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelSelect;
