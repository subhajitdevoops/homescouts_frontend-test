import React, { useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Post from "./Post";

const Dashboard = ({ herfLink }) => {
  return (
    <div className="main-wrapper">
      <Nav />
      <div className="Dashboard_mainContainerDiv">
        <div className="Dashboard_ContainerDiv">
          <Post herfLink={herfLink} />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
