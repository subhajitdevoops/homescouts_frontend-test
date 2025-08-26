import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import AuthContext from "../../../context/AuthProvider";

const Selects = ({ unit, headValue, options ,setOpValue,handleSelectValue}) => {
  const [arrow, setArrow] = useState(false);
  const [optionValue, setOptionValue] = useState(false);
  const value = useContext(AuthContext);

  const handlebutton = () => {
    setArrow(!arrow);
    setOptionValue(!optionValue);
  };

  // const handleSelectValue = (e) => {
  //   // setArrow(false);
  //   // setOptionValue(false);
  //   setOpValue(e.target.value);
  // };
  return (
    <div
      className="Selects_main_container_div"
    >
      <div
        className="flex_c c_t Selects_name"
        onClick={handlebutton}
      >
        <span> {headValue} </span>
        {arrow ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </div>
      {optionValue && (
        <div className="flex_c c_t Selects_options_value">
          {options.map((item, index) => (
            <option
              key={index}
              value={`${item}`}
              onClick={(e) =>{ handleSelectValue(e,item)
                setArrow(false);
                setOptionValue(false);
              }}
            >
              {item}{unit}
            </option>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selects;
