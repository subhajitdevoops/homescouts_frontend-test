import React, { useState, useEffect } from "react";
import FilterCom from "../../Userpage/Filter/FilterCom";
import TiffinService from "./TiffinService";
import img1 from "../../Home/Nav/Group 2293.svg";
import img2 from "../../Home/Nav/Group 2294.svg";
import img3 from "../../Home/Nav/Group 2295.svg";
import { API_REQ_GET } from "../../../config/API";
import configData from "../../../config/config.json";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import { useContext } from "react";

const TiffinServiceFilter = ({applyFilter,handleSelectOption,serviceList}) => {
  const value = useContext(AuthContext);

  return (
    <div className="filter_main_container_div">
      <div
        className="b_r filtermaincontainer_div TiffinServiceFiltercontainer_div"
        style={{ height: "100%" }}
      >
        <div className="my-3 filter_proporty_main_container_div">
          <div>
            <h4 className="c_t filter_proporty_heading">Services </h4>
          </div>
          <div className="filter_proporty_container_div ">
            {serviceList.map((option, index) => (
              <NavLink to={`/service?serviceName=${option.name} `}
                key={index}
                className={`sw b_r TiffinService_Element ${
                  applyFilter === option.name && "selectTiffin"
                }`}
                onClick={() => handleSelectOption(option.name)}
              >
                <img
                  src={
                    // configData.COMMON_MEDIA_LINK_URL +
                    // "/serviceSettings/" +
                    option.serviceIcon
                  }
                  alt="service Image.."
                />
                <p>{option.name}</p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiffinServiceFilter;
