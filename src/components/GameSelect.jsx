import React, { useState } from "react";

import UploadMedia from "./AdminMode/UploadMedia";
import Category from "./Category";

const GameSelect = () => {
  const [showCategory, setShowCategory] = useState(false);

  const handleCardClick = (gameName) => {
    console.log(`Selected game: ${gameName}`);
    setShowCategory(true);
  };

  if (showCategory) {
    return <Category />;
  }

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col col-md-4">
          <div
            className="card custom-card game-card"
            tabIndex="0"
            style={{ cursor: "pointer" }}
            onClick={() => handleCardClick("Game 1")}
          >
            <img
              src="/assets/game1.png"
              className="card-img-top"
              alt="Game 1"
            />
            <div className="card-body">
              <h5 className="card-title">Match Masters</h5>
              <p className="card-text">
                Match each image to its corresponding sound. Click on an image,
                then its sound. Aim for the highest score!
              </p>
            </div>
          </div>
        </div>
        <div className="col col-md-4">
          <div
            className="card custom-card game-card"
            tabIndex="0"
            style={{ cursor: "pointer" }}
            onClick={() => handleCardClick("Game 2")}
          >
            <img
              src="/assets/game2.png"
              className="card-img-top"
              alt="Game 2"
            />
            <div className="card-body">
              <h5 className="card-title">Target Tuck</h5>
              <p className="card-text">
                Click the container to hear a sound. Drag the object that
                matches the sound into the container. Choose wisely and have
                fun!
              </p>
            </div>
          </div>
        </div>
        <div className="col col-md-4">
          <div
            className="card custom-card game-card"
            tabIndex="0"
            style={{ cursor: "pointer" }}
            onClick={() => handleCardClick("Game 3")}
          >
            <img
              src="/assets/game3.png"
              className="card-img-top"
              alt="Game 3"
            />
            <div className="card-body">
              <h5 className="card-title">Digit Dashy</h5>
              <p className="card-text">
                See the number or equation on the right container. Drag and drop
                the matching number of objects into it. Match and solve!
              </p>
            </div>
          </div>
        </div>
        <div className="col col-md-4">
          <div
            className="card custom-card game-card"
            tabIndex="0"
            style={{ cursor: "pointer" }}
            onClick={() => handleCardClick("Game 4")}
          >
            <img
              src="/assets/game3.png"
              className="card-img-top"
              alt="Game 4"
            />
            <div class="card-body">
              <h5 class="card-title">Peculiar Pick</h5>
              <p class="card-text">
                Listen to each sound and view its image on the cards. Select the
                radio button of the correct pair. Identify and choose!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSelect;
