import React, { useState } from "react";
import data from "./Citdata";
import Citiesdata from "./Citiesdata";
import "./Cities.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import { useContext } from "react";

const Cities = () => {
  const [citiesdata, setCitiesdata] = useState(data);
  const value = useContext(AuthContext);

  const handleSelectCities=(cities)=>{

    value.setLocations(cities);
  }

  return (
    <div className="Cities_main_container_div">
      <div>
        <div>
          <p className="Cities_para_topcity">TOP CITIES</p>
          <p className="Cities_para_explorecity">
            Explore Real estate in Popular Indian Cities
          </p>
        </div>

        <div className="Cities_container_div">
          {citiesdata.map((item, index) => (
            <NavLink to="/search/property">
              <Citiesdata key={index} item={item} handleSelectCities={handleSelectCities} />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cities;
