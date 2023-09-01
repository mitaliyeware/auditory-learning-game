import React, { useState } from "react";
import UploadMedia from "./AdminMode/UploadMedia.jsx";

const Category = () => {
  const [showUpload, setShowUpload] = useState(false);

  const handleCardClick = (categoryName) => {
    console.log(`Selected category: ${categoryName}`);
    setShowUpload(true);
  };

  if (showUpload) {
    return <UploadMedia />;
  }
  return (
    <>
      <div className="row mx-5 my-5 mt-5">
        <h2 className="text-center">Category</h2>
        <div className="col-md-3 position-relative mb-5">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("Animals")}
          >
            <img
              src="/assets/animals.png"
              alt="Animals"
              className="button-image"
            />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("Birds")}
          >
            <img src="/assets/birds.png" alt="Birds" className="button-image" />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("Vehicles")}
          >
            <img
              src="/assets/vehicles.png"
              alt="Vehicles"
              className="button-image"
            />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("HumanBody")}
          >
            <img
              src="/assets/humanbody.png"
              alt="HumanBody"
              className="button-image"
            />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("Fruits")}
          >
            <img
              src="/assets/fruits.png"
              alt="Fruits"
              className="button-image"
            />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("Music")}
          >
            <img src="/assets/music.png" alt="Music" className="button-image" />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("Nature")}
          >
            <img
              src="/assets/nature.png"
              alt="Nature"
              className="button-image"
            />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("Sports")}
          >
            <img
              src="/assets/sports.png"
              alt="Sports"
              className="button-image"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Category;
