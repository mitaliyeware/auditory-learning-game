import React, { useState, useEffect, useRef } from "react";
import "../../Styles/MatchMasters.css";

const MatchMasters = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [lines, setLines] = useState([]);
  const [currentStartBox, setCurrentStartBox] = useState(null);
  const canvasRef = useRef(null);

  const getButtonCenter = (btn) => {
    const rect = btn.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const handleStart = (e, boxId) => {
    // Set the current box being drawn from
    setCurrentStartBox(boxId);
  };

  const handleEnd = (e, boxId) => {
    if (!currentStartBox) return;

    const startCenter = getButtonCenter(
      document.querySelector(`.square-box-mm[box-id='${currentStartBox}']`)
    );
    const endCenter = getButtonCenter(e.target);

    // Store the line drawn in the state
    setLines((prevLines) => ({
      ...prevLines,
      [currentStartBox]: {
        start: currentStartBox,
        end: boxId,
        startPoint: startCenter,
        endPoint: endCenter,
      },
    }));

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

  const handleCheckClick = () => {
    setLines([]);
    drawLines();
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
    }
  }, [timeLeft, lines]);

  return (
    <>
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
          <button
            className="square-box-mm"
            box-id="box1"
            onMouseDown={(e) => handleStart(e, "box1")}
          ></button>
          <button
            className="square-box-mm"
            box-id="box2"
            onMouseDown={(e) => handleStart(e, "box2")}
          ></button>
          <button
            className="square-box-mm"
            box-id="box3"
            onMouseDown={(e) => handleStart(e, "box3")}
          ></button>
        </div>
        <div className="rectangle-mm">
          <button
            className="square-box-mm"
            box-id="box4"
            onMouseDown={(e) => handleEnd(e, "box4")}
          >
            <img
              src="/assets/sound.png"
              alt="Sound Button"
              className="sound-button-mm"
            />
          </button>
          <button
            className="square-box-mm"
            box-id="box5"
            onMouseDown={(e) => handleEnd(e, "box5")}
          >
            <img
              src="/assets/sound.png"
              alt="Sound Button"
              className="sound-button-mm"
            />
          </button>
          <button
            className="square-box-mm"
            box-id="box6"
            onMouseDown={(e) => handleEnd(e, "box6")}
          >
            <img
              src="/assets/sound.png"
              alt="Sound Button"
              className="sound-button-mm"
            />
          </button>
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
      <button className="check-button-mm" onClick={handleCheckClick}>
        <img
          src="/assets/check.png"
          alt="Check Button"
          className="sound-button-mm"
        />
      </button>
    </>
  );
};

export default MatchMasters;
