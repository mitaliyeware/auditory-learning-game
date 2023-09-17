import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "../../Styles/MatchMasters.css";
import { useNavigate } from "react-router-dom";

const MatchMasters = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [lines, setLines] = useState([]);
  const [currentStartBox, setCurrentStartBox] = useState(null);
  const [learnData, setLearnData] = useState([]);
  const [imageToAudioMapping, setImageToAudioMapping] = useState({});
  const selectedCategory = useSelector((state) => state.category.category);
  console.log("Selected Category:", selectedCategory);
  const navigate = useNavigate();

  const canvasRef = useRef(null);

  useEffect(() => {
    const mapping = {};
    learnData.forEach((data, index) => {
      mapping[`box${index + 1}`] = `box${index + 4}`;
    });
    setImageToAudioMapping(mapping);
  }, [learnData]);

  useEffect(() => {
    getLearnData();
  }, [selectedCategory]);

  const getButtonCenter = (btn) => {
    const rect = btn.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const handleStart = (e, boxId) => {
    const startCenter = getButtonCenter(e.target);
    setCurrentStartBox({
      boxId,
      startPoint: startCenter,
    });
  };

  const handleEnd = (e, boxId) => {
    if (!currentStartBox) return;

    const endCenter = getButtonCenter(e.target);

    // Overwrite any existing lines with the same start or end box
    const newLines = { ...lines };

    // Remove any lines that end at the current box (ensuring only one line can connect to any audio)
    Object.entries(newLines).forEach(([key, line]) => {
      if (line.end === boxId) {
        delete newLines[key];
      }
    });

    newLines[currentStartBox.boxId] = {
      start: currentStartBox.boxId,
      end: boxId,
      startPoint: currentStartBox.startPoint,
      endPoint: endCenter,
    };

    setLines(newLines);
    setCurrentStartBox(null);
  };

  const drawLines = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    Object.values(lines).forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.startPoint.x, line.startPoint.y);
      ctx.lineTo(line.endPoint.x, line.endPoint.y);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }

      drawLines();

      return () => {
        clearTimeout(timerId);
      };
    } else {
      window.alert("Time's up!");
      setLines([]);
      postTimeoutLearnData();
      setTimeLeft(60);
    }
  }, [timeLeft, lines]);

  const handleRefresh = () => {
    setLines([]);
    getLearnData();
    setTimeLeft(60);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getLearnData = async () => {
    try {
      if (!selectedCategory) {
        console.log("Selected category is missing!");
        return;
      }
      const res = await fetch(`/matchmasters?category=${selectedCategory}`);
      const response = await res.json();
      const shuffledData = shuffleArray([...response]);
      const selectedData = shuffledData.slice(0, 4);
      const mapping = {};

      // Separate images and audios, and then shuffle them
      const images = shuffleArray(selectedData.map((item) => item.image));
      const audios = shuffleArray(selectedData.map((item) => item.audio));

      // Combine back into pairs
      const randomizedPairs = images.map((image, index) => {
        const matchingAudio = audios.find((audio) => audio.id === image.id);
        mapping[`box${index + 1}`] = `box${index + 1 + images.length}`;
        return { image: image, audio: audios[index] };
      });

      setImageToAudioMapping(mapping); // Update the mapping state
      setLearnData(randomizedPairs);
    } catch (error) {
      console.log(error);
    }
  };

  const postTimeoutLearnData = async () => {
    try {
      if (!selectedCategory) {
        console.log("Selected category is missing!");
        return;
      }
      const res = await fetch(`/matchmasters?category=${selectedCategory}`);
      const response = await res.json();

      // Just take the top 4 without shuffling
      const selectedData = response.slice(0, 4);
      setLearnData(selectedData);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAnswer = () => {
    console.log("User's lines:", lines);
    console.log("Correct mapping:", imageToAudioMapping);
    for (const [startBoxId, line] of Object.entries(lines)) {
      const correctEndBoxId = imageToAudioMapping[startBoxId];
      if (line.end !== correctEndBoxId) {
        console.log(
          `Mismatch: Expected ${startBoxId} to connect to ${correctEndBoxId} but found ${line.end}`
        );
        window.alert("Some answers are incorrect. Try again!");
        return;
      }
    }
    window.alert("All answers are correct!");
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
      <div className="rectangle-container-mm">
        <canvas
          ref={canvasRef}
          className="drawing-canvas"
          id="canvas"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
          }}
        ></canvas>

        <div className="rectangle-mm">
          {learnData.map((data, index) => (
            <button
              key={index}
              className="square-box-mm"
              box-id={`box${index + 1}`}
              onMouseDown={(e) => handleStart(e, `box${index + 1}`)}
            >
              <img
                width={100}
                height={100}
                src={data.image.image}
                alt="Image description"
              />
            </button>
          ))}
        </div>

        <div className="rectangle-mm">
          {learnData.map((data, index) => (
            <button
              key={index}
              className="square-box-mm"
              box-id={`box${index + learnData.length + 1}`}
              onMouseUp={(e) =>
                handleEnd(e, `box${index + learnData.length + 1}`)
              }
            >
              <audio controls>
                <source src={data.audio.audio} />
              </audio>
            </button>
          ))}
        </div>

        <div className="timer-content-mm">
          <img
            src="/assets/timer.png"
            alt="Timer Icon"
            className="sound-button-mm"
          />
          <p>Time left: {timeLeft} seconds</p>
        </div>
      </div>
      <div className="check-button-mm">
        <button
          onClick={() => {
            checkAnswer();
            handleRefresh();
          }}
        >
          <img
            src="/assets/check.png"
            alt="Check Button"
            className="sound-button-mm"
          />
        </button>
      </div>
    </>
  );
};

// const handleCheckClick = () => {
//   setLines([]);
//   drawLines();
// };

// const handleEnd = (e, boxId) => {
//   if (!currentStartBox) return;

//   const startCenter = getButtonCenter(
//     document.querySelector(`.square-box-mm[box-id='${currentStartBox}']`)
//   );
//   const endCenter = getButtonCenter(e.target);

//   // Overwrite any existing lines with the same start or end box
//   const newLines = { ...lines };

//   // Remove any lines that end at the current box
//   Object.entries(newLines).forEach(([key, line]) => {
//     if (line.end === boxId) {
//       delete newLines[key];
//     }
//   });

// newLines[currentStartBox] = {
//   start: currentStartBox,
//   end: boxId,
//   startPoint: startCenter,
//   endPoint: endCenter,
// };

// setLines(newLines);
// setCurrentStartBox(null);

// const getLearnData = async () => {
//   try {
//     const res = await fetch(`/learn?category=${selectedCategory}`);
//     const response = await res.json();
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const selectRandomThree = (data) => {
//   const shuffled = [...data].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, 3);
// };

// const shuffleSelectedData = (selectedData) => {
//   const shuffledImages = [...selectedData].sort(() => 0.5 - Math.random());
//   const shuffledAudios = [...selectedData].sort(() => 0.5 - Math.random());

//   return shuffledImages.map((img, idx) => {
//     return { image: img, audio: shuffledAudios[idx] };
//   });
// };
// useEffect(() => {
//   async function fetchDataAndSet() {
//     const allData = await getLearnData();
//     const randomThree = selectRandomThree(allData);
//     const shuffledSelected = shuffleSelectedData(randomThree);
//     setLearnData(shuffledSelected);
//   }

//   fetchDataAndSet();
// }, []);

//   return (
//     <>
//       <div className="rectangle-container-mm">
//         <canvas
//           ref={canvasRef}
//           className="drawing-canvas"
//           id="canvas"
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             zIndex: -1,
//             width: "100%",
//             height: "100%",
//           }}
//         ></canvas>
//         <div className="rectangle-mm">
//           <button
//             className="square-box-mm"
//             box-id="box1"
//             onMouseDown={(e) => handleStart(e, "box1")}
//           ></button>
//           <button
//             className="square-box-mm"
//             box-id="box2"
//             onMouseDown={(e) => handleStart(e, "box2")}
//           ></button>
//           <button
//             className="square-box-mm"
//             box-id="box3"
//             onMouseDown={(e) => handleStart(e, "box3")}
//           ></button>
//         </div>
//         <div className="rectangle-mm">
//           <button
//             className="square-box-mm"
//             box-id="box4"
//             onMouseDown={(e) => handleEnd(e, "box4")}
//           >
//             <img
//               src="/assets/sound.png"
//               alt="Sound Button"
//               className="sound-button-mm"
//             />
//           </button>
//           <button
//             className="square-box-mm"
//             box-id="box5"
//             onMouseDown={(e) => handleEnd(e, "box5")}
//           >
//             <img
//               src="/assets/sound.png"
//               alt="Sound Button"
//               className="sound-button-mm"
//             />
//           </button>
//           <button
//             className="square-box-mm"
//             box-id="box6"
//             onMouseDown={(e) => handleEnd(e, "box6")}
//           >
//             <img
//               src="/assets/sound.png"
//               alt="Sound Button"
//               className="sound-button-mm"
//             />
//           </button>
//         </div>
//         <div className="timer-content-mm">
//           <img
//             src="/assets/timer.png"
//             alt="Timer Icon"
//             className="sound-button-mm"
//           />
//           <p>Time left: {timeLeft} seconds</p>
//         </div>
//       </div>
//       <button
//         className="check-button-mm"
//         onClick={() => {
//           handleCheckClick();
//           handleRefresh();
//         }}
//       >
//         <img
//           src="/assets/check.png"
//           alt="Check Button"
//           className="sound-button-mm"
//         />
//       </button>
//     </>
//   );
// };

export default MatchMasters;
