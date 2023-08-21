import React from "react";

const Home = () => {
  return (
    <div>
      <section id="home"></section>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src="/assets/home2.jpg"
              alt="Home"
              className="w-150 mt-1"
            ></img>
          </div>
          <div className="col-md-6">
            {/* <h3 className="fs-5">Welcome to the App!</h3> */}
            <h1 className="display-6 ">Welcome to the App!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
