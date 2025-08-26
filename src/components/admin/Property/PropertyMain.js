import React, { useState } from "react";
import Commertial from "./Commertial";
import Pg from "./Pg";
import Residential from "./Residential";

const PropertyMain = () => {
  const [residential, setresidential] = useState(true);
  const [commertial, setCommertial] = useState(false);
  const [pg, setPg] = useState(false);

  const handleResidential = () => {
    setresidential(true);
    setCommertial(false);
    setPg(false);
  };
  const handleCommertial = () => {
    setresidential(false);
    setCommertial(true);
    setPg(false);
  };
  const handlePg = () => {
    setresidential(false);
    setCommertial(false);
    setPg(true);
  };

  return (
    <div className="container">
      <div className="d-flex">
        <div className="d-flex form-check m-3 property_main_container ">
          <label className="form-check-label" for="flexRadioDefault1">
            Residential
          </label>
          <input
            className="form-check-input  formcheckinput checked"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            checked={residential}
            onClick={handleResidential}
          />
        </div>
        <div className="d-flex form-check m-3 property_main_container">
          <label className="form-check-label" for="flexRadioDefault2">
            Commertial
          </label>
          <input
            className="form-check-input formcheckinput"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked={commertial}
            onClick={handleCommertial}
          />
        </div>
        <div className="d-flex form-check m-3 property_main_container">
          <label className="form-check-label" for="flexRadioDefault3">
            PG
          </label>
          <input
            className="form-check-input formcheckinput"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault3"
            checked={pg}
            onClick={handlePg}
          />
        </div>
      </div>

      {residential === true && <Residential />}
      {commertial === true && <Commertial />}
      {pg === true && <Pg />}
    </div>
  );
};

export default PropertyMain;
