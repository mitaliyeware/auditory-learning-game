import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../Styles/PeculiarPick.css";
import { useNavigate } from "react-router-dom";

const PeculiarPick = () => {
  const selectedCategory = useSelector((state) => state.category.category);
  const [droppedImages, setDroppedImages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 9) + 1
  );
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    fetchQuestions();
  }, [selectedCategory, randomNumber]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      window.alert("Time's up!");
      setTimeLeft(60);
      refreshData();
    }
  }, [timeLeft]);
  const refreshData = () => {
    // Generate a new random number
    setRandomNumber(Math.floor(Math.random() * 9) + 1);
    setTimeLeft(60); // Reset the timer to 60 seconds

    // Fetch new data
    fetch(`/peculiarpick?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        let composedData = [];

        // Use images of the selected category
        while (composedData.length < randomNumber) {
          const randomIndex = Math.floor(
            Math.random() * data.selectedImages.length
          );
          composedData.push(data.selectedImages[randomIndex]);
        }

        // Fill the remaining spots with images from other categories
        while (composedData.length < 9) {
          const randomIndex = Math.floor(
            Math.random() * data.otherImages.length
          );
          composedData.push(data.otherImages[randomIndex]);

          // Remove that image from otherImages to avoid duplication
          data.otherImages.splice(randomIndex, 1);
        }

        setQuestions(composedData);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("questionIndex", index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const questionIndex = parseInt(e.dataTransfer.getData("questionIndex"), 10);
    const droppedImage = questions[questionIndex];
    setDroppedImages((prevImages) => [...prevImages, droppedImage]);
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, index) => index !== questionIndex)
    );
    setRandomNumber((prevNumber) => prevNumber - 1);
  };

  const handleCheck = () => {
    if (
      randomNumber === 0 &&
      droppedImages.every((img) => img.selectedCategory === selectedCategory)
    ) {
      setResult("correct");
    } else {
      setResult("wrong");
    }
    setShowModal(true);
    setTimeLeft(60); // Reset the timer
  };

  const handleContinue = () => {
    setShowModal(false);
    setRandomNumber(Math.floor(Math.random() * 9) + 1);
    setDroppedImages([]);
    setResult(null);
    fetchQuestions();
  };

  const fetchQuestions = () => {
    fetch(`/peculiarpick?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        let composedData = [];
        while (composedData.length < randomNumber) {
          const randomIndex = Math.floor(
            Math.random() * data.selectedImages.length
          );
          composedData.push(data.selectedImages[randomIndex]);
        }
        while (composedData.length < 9) {
          const randomIndex = Math.floor(
            Math.random() * data.otherImages.length
          );
          composedData.push(data.otherImages[randomIndex]);
          data.otherImages.splice(randomIndex, 1);
        }
        setQuestions(composedData);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };
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
      <div className="rectangle-container-pp">
        <div className="rectangle-pp">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="square-box-pp"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
            >
              <img src={question.image} alt={question.name} />
            </div>
          ))}
        </div>
        <div
          className="beaker-container-pp"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="random-number-pp">{randomNumber}</div>
        </div>
        <div className="timer-content-pp">
          <img
            src="/assets/timer.png"
            alt="Timer Icon"
            className="sound-button-pp"
          />
          <p>Time left: {timeLeft} seconds</p>
        </div>
      </div>
      <button className="check-button-pp" onClick={handleCheck}>
        <img
          src="/assets/check.png"
          alt="Check Button"
          className="sound-button-pp"
        />
      </button>
      <div className={`modal ${showModal ? "active" : ""}`}>
        <div className="modal-content">
          {result === "correct" && (
            <>
              <img src="/assets/correct.png" alt="Correct Answer" />
              <p>Correct answer!</p>
              <button onClick={handleContinue}>Continue</button>
            </>
          )}
          {result === "wrong" && (
            <>
              <img src="/assets/wrong.png" alt="Wrong Answer" />
              <p>Wrong answer!</p>
              <button onClick={handleContinue}>Continue</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PeculiarPick;
