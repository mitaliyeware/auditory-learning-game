import React, { useState, useEffect } from "react";
import "../../Styles/TargetTuck.css";

const TargetTuck = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [boxes, setBoxes] = useState(["box1", "box2", "box3", "box4"]); // State to manage boxes

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      // Cleanup timer when component unmounts or timeLeft changes
      return () => clearTimeout(timerId);
    } else {
      window.alert("Time's up!");
      window.location.reload();
    }
  }, [timeLeft]);

  const handleDragStart = (e, box) => {
    e.dataTransfer.setData("box", box);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // This is important to allow the drop
  };

  const handleDrop = (e) => {
    const box = e.dataTransfer.getData("box");
    setBoxes((prevBoxes) => prevBoxes.filter((b) => b !== box)); // Remove the dropped box
  };
  return (
    <>
      <div className="rectangle-container-tt">
        <div className="rectangles-tt">
          {boxes.map((box, index) => (
            <button
              key={index}
              className="square-box-tt"
              draggable={true}
              onDragStart={(e) => handleDragStart(e, box)}
            ></button>
          ))}
        </div>
        <div className="timer-content-tt">
          <img
            src="/assets/timer.png"
            alt="Timer Icon"
            className="sound-button-tt"
          />
          <p>Time left: {timeLeft} seconds</p> {/* Display timer */}
        </div>
        <div
          className="beaker-container-tt"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <button className="square-button-tt">
            <img
              src="/assets/sound.png"
              alt="Sound Button"
              className="sound-button-tt"
            />{" "}
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

// import React, { useState, useEffect } from "react";
// import "../../Styles/TargetTuck.css";

// const TargetTuck = () => {
//   const [timeLeft, setTimeLeft] = useState(60);
//   // const [boxes, setBoxData] = useState(["box1", "box2", "box3", "box4"]); // State to manage boxes
//   const [boxData, setBoxData] = useState([]);
//   const [selectedSound, setSelectedSound] = useState(null);

//   const getBoxData = async () => {
//     try {
//       const res = await fetch("/boxes");
//       const response = await res.json();
//       setBoxData(response);
//       const randomSound = response[Math.floor(Math.random() * response.length)];
//       setSelectedSound(randomSound.audio.audio); // Assigning a random sound
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getBoxData();
//   }, []);

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timerId = setTimeout(() => {
//         setTimeLeft(timeLeft - 1);
//       }, 1000);

//       // Cleanup timer when component unmounts or timeLeft changes
//       return () => clearTimeout(timerId);
//     } else {
//       window.alert("Time's up!");
//       window.location.reload();
//     }
//   }, [timeLeft]);

//   const handleDragStart = (e, box) => {
//     e.dataTransfer.setData("box", box);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault(); // This is important to allow the drop
//   };

//   const handleDrop = (e) => {
//     const box = e.dataTransfer.getData("box");
//     setBoxData((prevBoxes) => prevBoxes.filter((b) => b !== box)); // Remove the dropped box
//   };
//   return (
//     <>
//       <div className="rectangle-container-tt">
//         <div className="rectangles-tt">
//           {boxData.map((data, index) => (
//             <button
//               key={index}
//               className="square-box-tt"
//               draggable={true}
//               onDragStart={(e) => handleDragStart(e, data.image.image)}
//             >
//               <img src={data.image.image} alt={`Box ${index + 1}`} />
//             </button>
//           ))}
//         </div>
//         <div className="timer-content-tt">
//           <img
//             src="/assets/timer.png"
//             alt="Timer Icon"
//             className="sound-button-tt"
//           />
//           <p>Time left: {timeLeft} seconds</p> {/* Display timer */}
//         </div>
//         <div
//           className="beaker-container-tt"
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           <button className="square-button-tt">
//             {selectedSound && (
//               <audio controls>
//                 <source src={selectedSound} />
//               </audio>
//             )}
//             <img
//               src="/assets/sound.png"
//               alt="Sound Button"
//               className="sound-button-tt"
//             />
//           </button>
//         </div>
//       </div>
//       <button className="check-button-tt">
//         <img
//           src="/assets/check.png"
//           alt="Check Button"
//           className="check-box-tt"
//         />
//       </button>
//     </>
//   );
// };

// export default TargetTuck;
