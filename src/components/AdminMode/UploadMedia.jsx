import React from "react";

const UploadMedia = () => {
  return (
    <>
      <div className="row mx-5 my-5 mt-5">
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
            accept="image/*,audio/*"
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
            accept="image/*,audio/*"
          />
        </div>

        <div className="mt-3">
          <button className="bi bi-upload btn btn-primary">Upload</button>
        </div>
      </div>
    </>
  );
};

export default UploadMedia;
