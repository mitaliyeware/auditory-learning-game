import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "../../Styles/DigitDashy.css";
import { selectCategory } from "../../utils/categorySlice";

const DigitDashy = () => {
  const [learnData, setLearnData] = useState([]);
  const audioRef = useRef(null);
  const category = useSelector((state) => state.category.selected);
  const handleRadioChange = (event) => {
    console.log(`Selected box: ${event.target.value}`);
  };

  useEffect(() => {
    getLearnData();
  }, []);

  const getLearnData = async () => {
    try {
      const res = await fetch(`/learn?category=${category}`);
      const response = await res.json();
      setLearnData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayAudio = (src) => {
    if (audioRef.current) {
      audioRef.current.src = src; // Set the audio source to the clicked one
      audioRef.current.play(); // Play the audio when the sound box is clicked
    }
  };

  return (
    <>
      <div className="rectangles-container">
        {learnData &&
          learnData.map((data, index) => (
            <div key={index} className="rectangle-item">
              <input
                type="radio"
                name="box-selector"
                value={`box${index}`}
                onChange={handleRadioChange}
              />
              <div className="rectangles">
                <div className="square-box">
                  <img
                    width={100}
                    height={100}
                    src={data?.image?.image}
                    alt="Uploaded Image"
                  />
                </div>
                <div className="sound-box">
                  <img
                    src="/assets/sound.png"
                    alt="Sound Button"
                    className="sound-button"
                    onClick={() => handlePlayAudio(data?.audio?.audio)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <audio ref={audioRef} />
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

// import React from "react";
// import "../../Styles/DigitDashy.css";

// const DigitDashy = () => {
//   const handleRadioChange = (event) => {
//     console.log(`Selected box: ${event.target.value}`);
//   };
//   return (
//     <>
//       <div className="rectangles-container">
//         <div className="rectangle-item">
//           <input
//             type="radio"
//             name="box-selector"
//             value="box1"
//             onChange={handleRadioChange}
//           />
//           <div className="rectangles">
//             <div className="square-box"></div>
//             <div className="sound-box">
//               <img
//                 src="/assets/sound.png"
//                 alt="Sound Button"
//                 className="sound-button"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="rectangle-item">
//           <input
//             type="radio"
//             name="box-selector"
//             value="box1"
//             onChange={handleRadioChange}
//           />
//           <div className="rectangles">
//             <div className="square-box"></div>
//             <div className="sound-box">
//               <img
//                 src="/assets/sound.png"
//                 alt="Sound Button"
//                 className="sound-button"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="rectangle-item">
//           <input
//             type="radio"
//             name="box-selector"
//             value="box1"
//             onChange={handleRadioChange}
//           />
//           <div className="rectangles">
//             <div className="square-box"></div>
//             <div className="sound-box">
//               <img
//                 src="/assets/sound.png"
//                 alt="Sound Button"
//                 className="sound-button"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="rectangle-item">
//           <input
//             type="radio"
//             name="box-selector"
//             value="box1"
//             onChange={handleRadioChange}
//           />
//           <div className="rectangles">
//             <div className="square-box"></div>
//             <div className="sound-box">
//               <img
//                 src="/assets/sound.png"
//                 alt="Sound Button"
//                 className="sound-button"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <button className="check-button">
//         <img
//           src="/assets/check.png"
//           alt="Check Button"
//           className="sound-button"
//         />
//       </button>
//     </>
//   );
// };

// export default DigitDashy;
