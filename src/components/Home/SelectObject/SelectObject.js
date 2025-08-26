import React, { useState } from "react";
import Selects from "./Selects";
import "./SelectObject.css";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";

const SelectObject = () => {
  const options = ["Residental", "Commertial", "PG", "Sale", "Rent or Lease"];
  const [opValue, setOpValue] = useState("All Property");
  const [width, setWidth] = useState();

  const value = useContext(AuthContext);


  const changeStatus = () => {
    if (window.scrollY > 350) {
      setWidth(window.scrollY);
    }
  };
  window.addEventListener("scroll", changeStatus);

  return (
    <div style={{ width: "150px" }}>
      <Selects
        headValue={opValue}
        options={options}
        setSelectOption={value.setSearchQuary}
      />
    </div>
  );
};

export default SelectObject;
