import React, { useState } from "react";
import Furnished from "./Furnished";
import SemiFurnished from "./SemiFurnished";

const FurnishedRen = () => {
  const [furnished, setFurnished] = useState(true);
  const [semiFurnished, setSemiFurnished] = useState(false);
  const [unFurnished, setUnFurnished] = useState(false);

  const handleResidential = () => {
    setFurnished(true);
    setSemiFurnished(false);
    setUnFurnished(false);
  };
  const handleCommertial = () => {
    setFurnished(false);
    setSemiFurnished(true);
    setUnFurnished(false);
  };
  const handlePg = () => {
    setFurnished(false);
    setSemiFurnished(false);
    setUnFurnished(true);
  };
  return (
    <div className="container">
      <div className="d-flex furnished_container_main_div">
        <div
          className="furnished_container_details_div"
          style={
            furnished === true
              ? { backgroundColor: "#ED6823", color: "white" }
              : null
          }
          onClick={handleResidential}
        >
          <span>Furnished</span>
        </div>
        <div
          className="furnished_container_details_div"
          style={
            semiFurnished === true
              ? { backgroundColor: "#ED6823", color: "white" }
              : null
          }
          onClick={handleCommertial}
        >
          <span>Semi Furnished</span>
        </div>
        <div
          className="furnished_container_details_div"
          style={
            unFurnished === true
              ? { backgroundColor: "#ED6823", color: "white" }
              : null
          }
          onClick={handlePg}
        >
          <span>Unfuirnished</span>
        </div>
      </div>

      {furnished === true && <Furnished />}
      {semiFurnished === true && <SemiFurnished />}
      {unFurnished === true && (
        <>
          <h1> Not Furnished</h1>
        </>
      )}
    </div>
  );
};

export default FurnishedRen;
