import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "../utils/categorySlice";

//const CategoryContext = React.createContext();

const UploadMedia = ({ userDetails }) => {
  const [imageDetails, setImageDetails] = useState({});
  const [audioDetails, setAudioDetails] = useState({});
  // const [selectedCategory, setSelectedCategory] = useState({});
  const [disableUploadButton, setDisableUploadButton] = useState(true);
  const selectedCategory = useSelector((state) => state.category.category);
  const dispatch = useDispatch();

  const handleFieldChange = (e) => {
    const selectedCategory = e.target.value;
    dispatch(selectCategory(selectedCategory));
  };

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
        window.location.reload();
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

  const state = useSelector((state) => state);
  console.log(state);
  return (
    <>
      {/* {userDetails && ( */}

      {/* {userDetails?.userType !== "child" ? ( */}
      <div className="row mx-5 my-5 mt-5">
        <h2 className="text-center"> Upload Questions </h2>
        <div className="mb-3">
          <label
            htmlFor="exampleInputCategory"
            className="inputFieldLabelExtended"
          >
            Category{" "}
          </label>
          <select
            className="form-control"
            id="exampleInputCategory"
            name="category"
            onChange={(e) => handleFieldChange(e)}
            placeholder="Please select the Category Here first"
          >
            <option value="">Select Catgory</option>
            <option value="Animals">Animals</option>
            <option value="Birds">Birds</option>
            <option value="Vehicles">Vehicles</option>
          </select>
        </div>
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
      </div>
    </>
  );
};
export default UploadMedia;
