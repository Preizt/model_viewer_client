import React from "react";
import ModelViewer from "./ModelViewer";

const Home = () => {
  return (
    <>
      <div className="container">
        <h1 className="text-center">Render<span className="text-primary">Hub</span></h1>
        <ModelViewer />
      </div>
    </>
  );
};

export default Home;
