import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadMedia from "./UploadMedia.jsx";
import LearnObjects from "./Kids/LearnObjects.jsx";
import { selectCategory } from "../utils/categorySlice.js";
import { useNavigate } from "react-router-dom";

const Category = ({ userDetails }) => {
  //const [showUpload, setShowUpload] = useState(false);
  // const [currentView, setCurrentView] = useState("");
  // const { setSelectedCategory } = useContext(CategoryContext);
  const selectedCategory = useSelector((state) => state.category.selected);
  const selectedGamePath = useSelector((state) => state.gamePath);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (categoryName) => {
    console.log(`Selected category: ${categoryName}`);
    dispatch(selectCategory(categoryName));
    //setShowUpload(true);
    if (selectedGamePath) {
      navigate(selectedGamePath);
    } else {
      navigate("/learnobjects");
    }
  };

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
      {/* {showUpload && <UploadMedia category={selectedCategory} />} */}
    </>
  );
};

export default Category;

// console.log("Navigating to /AdminMode/UploadMedia");
// navigate("/admin/uploadmedia");
//   if (
//     userDetails?.userType === "teacher" ||
//     userDetails?.userType === "parent"
//   ) {
//     console.log("Navigating to /AdminMode/UploadMedia");
//     navigate("/adminmode/uploadmedia");
//   } else if (userDetails?.userType === "child") {
//     console.log("Navigating to /learnObjects");
//     navigate("/kids/learnobjects");
//   }
// };

// if (showUpload) {
//   // return <UploadMedia />;
//   return <UploadMedia category={selectedCategory} />;
// }
