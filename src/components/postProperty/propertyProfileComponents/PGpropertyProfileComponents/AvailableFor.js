import React from "react";
import BDS from "../../css/BasicDetails.module.css";

function AvailableFor(props) {
  const available_for = props.property_profile_info.available_for;
  const setPostPropertyInfo = props.setPostPropertyInfo;
  const error = props.error;
  // --------------------------------------------------

  const clickHandler = (e) => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          available_for: e.target.value,
        },
      };
    });
  };
  // --------------------------------JSX-------------------------------
  return (
    <div className="pb-1">
      <h5 className="pt-1 pb-1">Available for<sapn style={{color:'red'}}>*</sapn>
        <span className={`${BDS.error}`} style={{ display: "inline" }}>
          {
            error.available_for_error
          }
      </span>
      </h5>
      <div className="d-flex flex-row pt-2">
        {["Girls", "Boys", "Any"].map((item, index) => {
          return (
            <input
              type="button"
              className={`${
                available_for === item ? `${BDS.selected}` : `${BDS.input}`
              }`}
              name="available_for"
              value={item}
              key={index}
              onClick={clickHandler}
            />
          );
        })}
      </div>
      <br />
    </div>
  );
}

export default AvailableFor;
