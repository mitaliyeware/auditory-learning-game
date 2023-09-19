import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../Styles/TargetTuck.css";
import { useNavigate } from "react-router-dom";

const TargetTuck = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const selectedCategory = useSelector((state) => state.category.category);
  const [boxes, setBoxes] = useState(["box1", "box2", "box3", "box4"]);
  const [audioDetails, setAudioDetails] = useState({});
  const [droppedBox, setDroppedBox] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuestions(); // Fetch the questions on component mount
  }, [selectedCategory]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      window.alert("Time's up!");
      window.location.reload();
    }
  }, [timeLeft]);

  const fetchQuestions = () => {
    fetch(`/targettuck?category=${selectedCategory}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Server did not return an array:", data);
          return;
        }
        setQuestions(data); // console.log("Questions Array:", questions);

        data.forEach((question, index) => {
          console.log(`Question ${index + 1}:`, question);
        });
      })
      .catch((error) => {
        console.error("Error fetching questions:", error.message);
      });
  };

  const generateSound = (audioData) => {
    const audioUrl = audioData.audio;
    const audio = new Audio(audioUrl);
    audio.onerror = function (e) {
      console.error("Audio Error", e);
    };
    audio.volume = 1;
    audio.play();
    setAudioDetails(audioData);
  };

  const playSound = () => {
    if (Object.keys(audioDetails).length > 0) {
      generateSound(audioDetails);
    } else if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      const question = questions[randomIndex]; // Check if question.audio is defined and not null

      if (question.audio && question.audio.audio) {
        generateSound(question.audio);
      } else {
        console.error("Audio URL is missing or invalid in the question data");
      }
    } else {
      console.error("No questions available to play sound");
    }
  };

  const handleDragStart = (e, box) => {
    e.dataTransfer.setData("box", box);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    console.log("handleDrop function called"); // Confirm that the function is called
    e.preventDefault();

    if (!droppedBox) {
      const droppedImage = e.dataTransfer.getData("text/plain"); // Find the question corresponding to the dropped image

      const choosenAnswer = questions.find(
        (q) => q.image.image === droppedImage
      ); // setSelectedAnswer(choosenAnswer);

      checkAnswer(choosenAnswer); // setDroppedBox(box); // setBoxes((prevBoxes) => prevBoxes.filter((b) => b !== box));
    } else {
      alert("You can only drop one box into the beaker!");
    }
  };

  const checkAnswer = (choosenAnswer) => {
    if (choosenAnswer) {
      const { id, audio } = choosenAnswer;

      if (audio?._id === audioDetails._id) {
        //alert("Correct Answer!");
        setResult("correct");
        console.log("Dropped Image ID:", id); // Log the ID of the dropped image
        console.log("Associated Question ID:", id); // Log the ID of the associated question // Handle correct answer logic here
      } else {
        setResult("wrong");
        // alert("Wrong Answer!"); // Handle wrong answer logic here
      }
    }
    setShowModal(true);
    fetchQuestions();
    setTimeLeft(60);
    setAudioDetails({});
  };

  const handleContinue = () => {
    setShowModal(false);
    fetchQuestions();
    setTimeLeft(60);
    setAudioDetails({});
    // You can add more logic here if needed, such as fetching a new question, resetting the state, etc.
  };

  return (
    <>
      <div className="top-row-pp">
        <button
          className="btn"
          style={{ width: 50 }}
          onClick={() => navigate("/user/kid/play/category")}>
          <i
            className="bi bi-arrow-left-circle-fill"
            style={{ fontSize: "3rem" }}></i>
        </button>
        <div className="timer-content-pp">
          <img
            src="/assets/timer.png"
            alt="Timer Icon"
            className="sound-button-pp"
          />
          <p>Time left: {timeLeft} seconds</p>
        </div>
      </div>
      <div className="rectangle-container-tt">
        <div className="rectangles-tt">
          {questions.map((question, index) => {
            const boxId = `box${index + 1}`; // If the boxId matches the droppedBox, don't render it

            if (boxId === droppedBox) return null;
            return (
              <button
                key={index}
                className="square-box-tt"
                draggable={true}
                onDragStart={(e) => handleDragStart(e, `box${index + 1}`)}>
                <img
                  src={question.image.image}
                  alt={question.image.name}
                />
              </button>
            );
          })}
        </div>
        <div className={`modal ${showModal ? "active" : ""}`}>
          <div className="modal-content">
            {result === "correct" && (
              <>
                <img
                  src="/assets/correct.png"
                  alt="Correct Answer"
                />
                <button onClick={handleContinue}>Continue</button>
              </>
            )}
            {result === "wrong" && (
              <>
                <img
                  src="/assets/wrong.png"
                  alt="Wrong Answer"
                />
                <button onClick={handleContinue}>Continue</button>
              </>
            )}
          </div>
        </div>
        <div
          className="beaker-container-tt"
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          <button
            className="square-button-tt"
            onClick={() =>
              playSound(Math.floor(Math.random() * questions.length))
            }>
            <img
              src="/assets/sound.png"
              alt="Sound Button"
              className="sound-button-tt"
            />
          </button>
        </div>
        {/* {Object.keys(selectedAnswer).length > 0 && (
            <button
              className="check-button-tt m-5"
              onClick={checkAnswer}>
              <img
                src="/assets/check.png"
                alt="Check Button"
                className="check-box-tt"
              />
            </button>
          )} */}
      </div>
    </>
  );
};

export default TargetTuck;
