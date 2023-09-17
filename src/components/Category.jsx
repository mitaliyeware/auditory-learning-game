import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../utils/categorySlice.js";
import { useNavigate } from "react-router-dom";
import "../Styles/Category.css";

const Category = () => {
  const selectedMode = useSelector((state) => state.category.mode);
  const selectedGame = useSelector((state) => state.category.game);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (category) => {
    console.log(`Selected category: ${category}`);
    dispatch(selectCategory(category));
    selectedMode === "learn"
      ? navigate("/user/learnobjects")
      : navigate(`/user/game/${selectedGame}`);
  };

  return (
    <div className="box-container">
      <button
        className="btn"
        style={{ width: 50 }}
        onClick={() =>
          selectedMode === "learn"
            ? navigate("/user/kid")
            : navigate("/user/play")
        }
      >
        <i
          className="bi bi-arrow-left-circle-fill"
          style={{ fontSize: "3rem" }}
        ></i>
      </button>
      <div className="row mx-5 my-5 mt-5">
        <h2 className="text-center">Category</h2>
        <div className="col-md-3 position-relative mb-5 box">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("animals")}
          >
            <img
              src="/assets/animals.png"
              alt="Animals"
              className="button-image"
            />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5 box">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("birds")}
          >
            <img src="/assets/birds.png" alt="Birds" className="button-image" />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5 box">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("vehicles")}
          >
            <img
              src="/assets/vehicles.png"
              alt="Vehicles"
              className="button-image"
            />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5 box">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("humanBody")}
          >
            <img
              src="/assets/humanbody.png"
              alt="HumanBody"
              className="button-image"
            />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5 box">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("fruits")}
          >
            <img
              src="/assets/fruits.png"
              alt="Fruits"
              className="button-image"
            />
          </button>
        </div>
        {/* <div className="col-md-3 position-relative mb-5">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("music")}>
            <img
              src="/assets/music.png"
              alt="Music"
              className="button-image"
            />
          </button>
        </div> */}
        <div className="col-md-3 position-relative mb-5 box">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("nature")}
          >
            <img
              src="/assets/nature.png"
              alt="Nature"
              className="button-image"
            />
          </button>
        </div>
        <div className="col-md-3 position-relative mb-5 box">
          <button
            className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center big-button"
            onClick={() => handleCardClick("sports")}
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
    </div>
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
