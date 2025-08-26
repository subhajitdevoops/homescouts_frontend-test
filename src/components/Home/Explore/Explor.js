import React, { useState } from "react";
import data from "./Expdata";
import Explordata from "./Explordata";
import "./Explor.css";

const Explor = () => {
  const [alldata, setAlldata] = useState(data);
  console.log(alldata);
  return (
    <div className="Explor_main_container_div">
      <p>GET STARTED WITH EXPLORING REAL STATE OPTIONS</p>
      <div className="Explor_container_div">
        {alldata.map((item, index) => {
          return <Explordata item={item} />;
        })}
      </div>
    </div>
  );
};

export default Explor;
