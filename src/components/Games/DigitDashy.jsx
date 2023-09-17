import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../Styles/DigitDashy.css";
//import { selectCategory } from "../../utils/categorySlice";

const Modal = ({ show, message, imageSrc, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={imageSrc} alt="Result" />
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

const DigitDashy = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [learnData, setLearnData] = useState([]);
  const audioRef = useRef(null);
  const selectedCategory = useSelector((state) => state.category.category);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    message: "",
    imageSrc: "",
  });
  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    console.log(`Selected box: ${event.target.value}`);
    setSelectedRadio(event.target.value);
  };

  useEffect(() => {
    getLearnData();
  }, [selectedCategory]);

  const getLearnData = async () => {
    try {
      const res = await fetch(`/digitdashy?category=${selectedCategory}`);
      const response = await res.json();

      // Ensure that the response is an array before setting it
      if (Array.isArray(response)) {
        setLearnData(response);
      } else {
        console.error("Received data is not an array:", response);
        setLearnData([]); // Reset learnData to an empty array if response isn't array-like
      }
    } catch (error) {
      console.error("Error fetching learnData:", error);
      setLearnData([]); // Reset learnData to an empty array on error
    }
  };

  const handlePlayAudio = (src) => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.play();
    }
  };

  const handleCheckClick = () => {
    if (selectedRadio === "different") {
      setModalContent({
        message: "Correct Answer!",
        imageSrc: "/assets/correct.png",
      });
    } else if (selectedRadio === "selected") {
      setModalContent({
        message: "Wrong Answer!",
        imageSrc: "/assets/wrong.png",
      });
    } else {
      setModalContent({
        message: "Please select an item first.",
        imageSrc: "/path-to-generic-image.png",
      });
    }
    setShowModal(true);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    } else {
      window.alert("Time's up!");

      setTimeLeft(60);
      setShowModal(true);
    }
  }, [timeLeft]);

  return (
    <>
      <button
        className="btn"
        style={{ width: 50 }}
        onClick={() => navigate("/user/kid/play/category")}
      >
        <i
          className="bi bi-arrow-left-circle-fill"
          style={{ fontSize: "3rem" }}
        ></i>
      </button>
      <div className="rectangles-container">
        {learnData.map((data, index) => (
          <div key={data.id} className="rectangle-item">
            <input
              type="radio"
              name="box-selector"
              value={
                data.selectedCategory === selectedCategory
                  ? "selected"
                  : "different"
              }
              onChange={handleRadioChange}
            />
            <div className="rectangles">
              <div className="square-box">
                <img
                  width={100}
                  height={100}
                  src={data.image.image}
                  alt="Uploaded Image"
                />
              </div>
              <div className="sound-box">
                <img
                  src="/assets/sound.png"
                  alt="Sound Button"
                  className="sound-button"
                  onClick={() => handlePlayAudio(data.audio.audio)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <audio ref={audioRef} />
      <div className="timer-content-dd">
        <img
          src="/assets/timer.png"
          alt="Timer Icon"
          className="sound-button"
        />
        <p>Time left: {timeLeft} seconds</p>
      </div>
      <button className="check-button" onClick={handleCheckClick}>
        <img
          src="/assets/check.png"
          alt="Check Button"
          className="sound-button"
        />
      </button>
      <Modal
        show={showModal}
        message={modalContent.message}
        imageSrc={modalContent.imageSrc}
        onClose={() => {
          setShowModal(false);
          getLearnData();
          setTimeLeft(60);
        }}
      />
    </>
  );
};

export default DigitDashy;
