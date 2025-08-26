import React from "react";
import PPS from "../css/propertyProfile.module.css";
import LDS from "../css/locationDetails.module.css";
import POS from "../css/pricingAndOthers.module.css";
import BDS from "../css/BasicDetails.module.css";

function FloorDetails(props) {
  const { total_no_floor, property_on_floor } =
    props.property_profile_info.floor_details;

  const setPostPropertyInfo = props.setPostPropertyInfo;

  const floorHandle = (e) => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          floor_details: {
            ...props.property_profile_info.floor_details,
            total_no_floor: e.target.value,
          },
        },
      };
    });
  };
  const propertyFloorOptions = ["Basement", "Lower Ground", "Ground"];

  for (let j = 1; j <= total_no_floor; j++) {
    propertyFloorOptions.push(j);
  }
  const setPropertyFloor = (e) => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          floor_details: {
            ...props.property_profile_info.floor_details,
            [e.target.name]: e.target.value,
          },
        },
      };
    });
  };
  // --------------------- JSX --------------------------------------------
  return (
    <div>
      <h5 className="pt-1 pb-2 mb-1 ">
        Floor Details<sapn style={{color:'red'}}>*</sapn>
        <span className={`${BDS.error}`} style={{ display: "inline" }}>
          {" "}
          {props.error.total_no_floor_error
            ? `${props.error.total_no_floor_error}`
            : `${
                props.error.property_on_floor_error
                  ? `${props.error.property_on_floor_error}`
                  : ``
              }`}
        </span>
      </h5>
      <p className={`${PPS.label} pt-1 pb-2`}>
        Total no. of floors and your floor details
      </p>
      <div
        className={`d-flex flex-row justify-content-start pt-2 pb-2 ${PPS.gap}`}
      >
        <div
          className={`d-flex flex-column justify-content-start align-items-center  ${POS.maintenanceSelectDiv}  `}
        >
          <div className={`${POS.inpContainer} w-100`}>
            <input
              type="number"
              id="Total Floors"
              name="Total Floors"
              className={`${LDS.inputAdd}`}
              autoComplete="off"
              placeholder="  "
              value={total_no_floor}
              onChange={floorHandle}
              onWheel={(e) => e.target.blur()}
            />
            <label htmlFor="Total Floors" className={`${LDS.label}`}>
              Total Floors
            </label>
          </div>
          <select
            className={`${POS.maintenanceSelect}`}
            name="property_on_floor"
            id=""
            value={property_on_floor}
            onChange={(e) => {
              setPropertyFloor(e);
            }}
          >
            <option
              className={`${PPS.option}`}
              value=""
              disabled
            >
              Select Floor
            </option>
            {propertyFloorOptions.map((item, index) => {
              return (
                <option className={`${PPS.option}`} key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FloorDetails;
