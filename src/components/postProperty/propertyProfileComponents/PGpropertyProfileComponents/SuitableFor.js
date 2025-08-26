import React from "react";
import POS from "../../css/pricingAndOthers.module.css";
import BDS from "../../css/BasicDetails.module.css";
function SuitableFor(props) {
  const suitable_for = props.property_profile_info.suitable_for;
  const setPostPropertyInfo = props.setPostPropertyInfo;
  const error = props.error;

  // ------------------------------------------
  const changeHnadler = (e) => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          suitable_for: {
            ...suitable_for,
            [e.target.name]: e.target.checked,
          },
        },
      };
    });
  };

  // ---------------------- JSX --------------------------
  return (
    <div className="">
      <h5 className="pt-1 pb-1">
        Suitable for<sapn style={{color:'red'}}>*</sapn>
        <span className={`${BDS.error}`} style={{ display: "inline" }}>
          {
            error.suitable_for_error
          }
        </span>
      </h5>
      <div className={`${POS.checkBoxContainer}`}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <input
            type="checkbox"
            className={`${POS.checkbox}`}
            name="students"
            id="students"
            checked={suitable_for.students}
            onChange={changeHnadler}
          />
          <label htmlFor="students">Students</label>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <input
            type="checkbox"
            className={`${POS.checkbox}`}
            name="working_professionals"
            id="working"
            // value={}
            checked={suitable_for.working_professionals}
            onChange={changeHnadler}
          />
          <label htmlFor="working">Working Professional</label>
        </div>
      </div>
    </div>
  );
}

export default SuitableFor;
