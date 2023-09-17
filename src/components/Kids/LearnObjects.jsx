import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "../../Styles/LearnObjects.css";
import { useNavigate } from "react-router-dom";

//import { selectCategory } from "../utils/categorySlice";

const LearnObjects = () => {
  const [learnData, setLearnData] = useState([]);
  const audioRef = useRef(null); // 1. Create a reference to the audio element
  const selectedCategory = useSelector((state) => state.category.category);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("LearnObjects component mounted");
    getLearnData(selectedCategory);
  }, [selectedCategory]);

  const getLearnData = async () => {
    try {
      const res = await fetch(`/learn?category=${selectedCategory}`);
      const response = await res.json();
      setLearnData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Play the audio when the sound box is clicked
    }
  };

  return (
    <>
      <button
        className="btn"
        style={{ width: 50 }}
        onClick={() => navigate("/user/kid/learn/category")}
      >
        <i
          className="bi bi-arrow-left-circle-fill"
          style={{ fontSize: "3rem" }}
        ></i>
      </button>
      <div className="rectangle-container-lo">
        {learnData &&
          learnData.map((data, index) => (
            <div key={index} className="rectangles-lo">
              <div className="square-box-lo">
                <img
                  width={100}
                  height={100}
                  src={data?.image?.image} // Embed Base64 data here
                  alt="Image description"
                />
              </div>
              <div className="sound-box-lo">
                <audio controls>
                  <source src={data?.audio?.audio} />
                </audio>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default LearnObjects;
