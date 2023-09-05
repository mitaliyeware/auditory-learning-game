import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { objectName, selectObjectName } from "../../utils/mediaSlice";
import Profile from "../Profile";

//const CategoryContext = React.createContext();

const UploadMedia = ({ userDetails }) => {
  const [imageDetails, setImageDetails] = useState({});
  const [audioDetails, setAudioDetails] = useState({});
  // const [selectedCategory, setSelectedCategory] = useState({});
  const [disableUploadButton, setDisableUploadButton] = useState(true);
  const selectedCategory = useSelector((state) => state.category.category);
  const dispatch = useDispatch();
  const objectName = useSelector(selectObjectName);

  //const { category } = props;
  // const [stage, setStage] = useState("selectCategory");

  useEffect(() => {
    if (
      Object.keys(imageDetails).length === 0 ||
      Object.keys(audioDetails).length === 0 ||
      !selectedCategory
    ) {
      setDisableUploadButton(true);
    } else {
      setDisableUploadButton(false);
    }
  }, [imageDetails, audioDetails, selectedCategory]);

  const convertToBase64 = (e) => {
    console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setMediaDetails(e, reader.result);
    };
    reader.onerror = (error) => {
      console.log("Conversion to Base 64 error: ", error);
    };
  };

  const setMediaDetails = (e, base64String) => {
    const fileName = e.target.files[0].name;
    const uploadTime = new Date().getTime();
    if (e.target.files[0].type.includes("image")) {
      setImageDetails({
        name: `${fileName}_${uploadTime}`,
        image: base64String,
        fileType: "image",
      });
    }
    if (e.target.files[0].type.includes("audio")) {
      setAudioDetails({
        name: `${fileName}_${uploadTime}`,
        audio: base64String,
        fileType: "audio",
      });
    }
    console.log("Audio details: ", audioDetails);
  };

  const uploadImage = async () => {
    try {
      const { image, name } = imageDetails;
      const res = await fetch("/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          name,
        }),
      });

      const response = await res.json();

      if (res.status === 400 || !res) {
        window.alert("Failed to upload Image");
      } else {
        console.log("Upload Image response: ", response);
        return response.image;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAudio = async () => {
    try {
      const { audio, name } = audioDetails;
      const res = await fetch("/upload-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio,
          name,
        }),
      });

      const response = await res.json();

      if (res.status === 400 || !res) {
        window.alert("Failed to upload Audio");
      } else {
        console.log("Upload Audio response: ", response);
        return response.audio;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateQuestion = async (image, audio) => {
    try {
      console.log({
        image,
        audio,
        selectedCategory,
        // objectName,
      });
      const res = await fetch("/generate-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          audio,
          selectedCategory,
          // objectName,
        }),
      });

      const json = await res.json();

      if (res.status === 400 || !res) {
        window.alert("Failed to upload Audio");
      } else {
        window.alert("Media Uploaded Sucessfully");
        setImageDetails({});
        setAudioDetails({});
        console.log("Generate question response: ", json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadMedia = async () => {
    try {
      const image = await uploadImage();
      const audio = await uploadAudio();
      await generateQuestion(image, audio);
    } catch (error) {
      window.alert("There is an error uploading media");
      console.log(error);
    }
  };

  // const handleFieldChange = (e) => {
  //   dispatch(objectName(e.target.value));
  // };

  // const UserPanel = ({ userDetails }) => {
  //   const [currentView, setCurrentView] = useState("dashboard");
  //   return (
  //     <>
  //       {userDetails && (
  //         <div className="container-fluid bg-secondary min-vh-100">
  //           <div className="row">
  //             {/* <Router> */}
  //             {userDetails?.userType === "child" ? (
  //               // Directly show the TaskSelect component for child users
  //               <div className="col-12">
  //                 <TaskSelect />
  //               </div>
  //             ) : userDetails?.userType !== "child" ? (
  //               <div className="col-2 bg-white vh-100">
  //                 <Sidebar changeView={setCurrentView} />
  //               </div>
  //             ) : null}
  //             {userDetails?.userType === "teacher" ? (
  //               <div className="col-10">
  //                 {/* <Routes>
  //                   <Route exact path="/dashboard" Component={TeacherDashboard} />
  //                 </Routes> */}
  //                 {/* <TeacherDashboard userDetails={userDetails} /> */}
  //                 {currentView === "dashboard" && (
  //                   <TeacherDashboard userDetails={userDetails} />
  //                 )}
  //                 {currentView === "upload" && <GameSelect />}
  //                 {currentView === "profile" && <Profile />}
  //               </div>
  //             ) : null}

  {
    /* <CategoryContext.Provider
        value={{ selectedCategory, setSelectedCategory }}
      > */
  }
  {
    /* Your other components */
  }

  {
    /* <div className="mb-3">
          <label htmlFor="exampleFileName" className="inputFieldLabelExtended">
            Object Name
          </label>
          <input
            className="form-control"
            id="exampleFileName"
            name="objectName"
            value={objectName}
            onChange={handleFieldChange}
            placeholder="Please Enter the Name of Object Here"
          />
        </div> */
  }
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <>
      {userDetails && (
        <div className="row mx-5 my-5 mt-5">
          {userDetails?.userType === "child" ? (
            <>
              <h2 className="text-center"> Upload Questions </h2>
              <div className="col-md-6 position-relative">
                <button className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center">
                  <img
                    src="/assets/upload_image.png"
                    alt="Upload"
                    style={{ width: "50px", height: "50px" }}
                  />
                  Upload Image
                </button>
                <input
                  type="file"
                  className="form-control-file position-absolute"
                  style={{
                    top: 0,
                    left: 0,
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  onChange={convertToBase64}
                  accept="image/*"
                />
              </div>
              <div className="col-md-6 position-relative">
                <button className="btn btn-outline-dark btn-lg d-flex flex-column align-items-center">
                  <img
                    src="/assets/volume-up.png"
                    alt="Upload"
                    style={{ width: "50px", height: "50px" }}
                  />
                  Upload Sound
                </button>
                <input
                  type="file"
                  className="form-control-file position-absolute"
                  style={{
                    top: 0,
                    left: 0,
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  onChange={convertToBase64}
                  accept="audio/*"
                />
              </div>

              <div className="mt-3">
                <button
                  className="bi bi-upload btn btn-primary upload-btn"
                  disabled={disableUploadButton}
                  onClick={uploadMedia}
                >
                  Upload
                </button>
              </div>
            </>
          ) : (
            <h2>hello</h2>
          )}
        </div>
      )}
    </>
  );
};

export default UploadMedia;
