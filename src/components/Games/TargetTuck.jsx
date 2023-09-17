import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../Styles/TargetTuck.css";
import { useNavigate } from "react-router-dom";

const TargetTuck = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const selectedCategory = useSelector((state) => state.category.category);
  const [boxes, setBoxes] = useState(["box1", "box2", "box3", "box4"]);
  const [audioElement, setAudioElement] = useState(null);
  const [droppedBox, setDroppedBox] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

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
        setQuestions(data);

        // console.log("Questions Array:", questions);
        data.forEach((question, index) => {
          console.log(`Question ${index + 1}:`, question);
        });
      })
      .catch((error) => {
        console.error("Error fetching questions:", error.message);
      });
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
      const box = e.dataTransfer.getData("box");

      // Find the question corresponding to the dropped image
      const question = questions.find((q) => q.id === box);

      if (question) {
        const { id, audio } = question;

        if (id === box) {
          alert("Correct Answer!");
          console.log("Dropped Image ID:", box); // Log the ID of the dropped image
          console.log("Associated Question ID:", id); // Log the ID of the associated question
          // Handle correct answer logic here
        } else {
          alert("Wrong Answer!");
          // Handle wrong answer logic here
        }
      }

      setDroppedBox(box);
      setBoxes((prevBoxes) => prevBoxes.filter((b) => b !== box));
    } else {
      alert("You can only drop one box into the beaker!");
    }
  };

  const playSound = () => {
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      const question = questions[randomIndex];

      // Check if question.audio is defined and not null
      if (question.audio && question.audio.audio) {
        const audioUrl = question.audio.audio;

        console.log("Playing audio for question:", question);

        const audio = new Audio(audioUrl);
        audio.onerror = function (e) {
          console.error("Audio Error", e);
        };
        audio.volume = 1;
        audio.play();
        setAudioElement(audio);
      } else {
        console.error("Audio URL is missing or invalid in the question data");
      }
    } else {
      console.error("No questions available to play sound");
    }
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
      <div className="rectangle-container-tt">
        <div className="rectangles-tt">
          {questions.map((question, index) => {
            const boxId = `box${index + 1}`;

            // If the boxId matches the droppedBox, don't render it
            if (boxId === droppedBox) return null;
            return (
              <button
                key={index}
                className="square-box-tt"
                draggable={true}
                onDragStart={(e) => handleDragStart(e, `box${index + 1}`)}
              >
                <img src={question.image.image} alt={question.image.name} />
              </button>
            );
          })}
        </div>
        <div className="timer-content-tt" onClick={playSound}>
          <img
            src="/assets/timer.png"
            alt="Timer Icon"
            className="sound-button-tt"
          />
          <p>Time left: {timeLeft} seconds</p>
        </div>
        <div
          className="beaker-container-tt"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <button
            className="square-button-tt"
            onClick={() =>
              playSound(Math.floor(Math.random() * questions.length))
            }
          >
            <img
              src="/assets/sound.png"
              alt="Sound Button"
              className="sound-button-tt"
            />
          </button>
        </div>
      </div>
      <button className="check-button-tt">
        <img
          src="/assets/check.png"
          alt="Check Button"
          className="check-box-tt"
        />
      </button>
    </>
  );
};

export default TargetTuck;
