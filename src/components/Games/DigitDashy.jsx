import React from "react";
import "../../Styles/DigitDashy.css";

const DigitDashy = () => {
  const handleRadioChange = (event) => {
    console.log(`Selected box: ${event.target.value}`);
  };
  return (
    <>
      <div className="rectangles-container">
        <div className="rectangle-item">
          <input
            type="radio"
            name="box-selector"
            value="box1"
            onChange={handleRadioChange}
          />
          <div className="rectangles">
            <div className="square-box"></div>
            <div className="sound-box">
              <img
                src="/assets/sound.png"
                alt="Sound Button"
                className="sound-button"
              />
            </div>
          </div>
        </div>
        <div className="rectangle-item">
          <input
            type="radio"
            name="box-selector"
            value="box1"
            onChange={handleRadioChange}
          />
          <div className="rectangles">
            <div className="square-box"></div>
            <div className="sound-box">
              <img
                src="/assets/sound.png"
                alt="Sound Button"
                className="sound-button"
              />
            </div>
          </div>
        </div>
        <div className="rectangle-item">
          <input
            type="radio"
            name="box-selector"
            value="box1"
            onChange={handleRadioChange}
          />
          <div className="rectangles">
            <div className="square-box"></div>
            <div className="sound-box">
              <img
                src="/assets/sound.png"
                alt="Sound Button"
                className="sound-button"
              />
            </div>
          </div>
        </div>
        <div className="rectangle-item">
          <input
            type="radio"
            name="box-selector"
            value="box1"
            onChange={handleRadioChange}
          />
          <div className="rectangles">
            <div className="square-box"></div>
            <div className="sound-box">
              <img
                src="/assets/sound.png"
                alt="Sound Button"
                className="sound-button"
              />
            </div>
          </div>
        </div>
      </div>
      <button className="check-button">
        <img
          src="/assets/check.png"
          alt="Check Button"
          className="sound-button"
        />
      </button>
    </>
  );
};

export default DigitDashy;
