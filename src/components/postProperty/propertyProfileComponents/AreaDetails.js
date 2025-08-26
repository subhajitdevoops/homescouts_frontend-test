import React from "react";
import PPS from "../css/propertyProfile.module.css";
import POS from "../css/pricingAndOthers.module.css";
import LDS from "../css/locationDetails.module.css";
import BDS from "../css/BasicDetails.module.css";

function AreaDetails(props) {
  const { carpet_area, area_unit } = props.property_profile_info.area_details;
  const setPostPropertyInfo = props.setPostPropertyInfo;
  const areaType = [
    "sq.ft.",
    "sq.yards",
    "sq.m.",
    "acres",
    "marla",
    // "cents",
    "Guntha",
    // " Per person",
  ];
  const updateAreaDetails = (e) => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          area_details: {
            ...props.property_profile_info.area_details,
            [e.target.name]: e.target.value,
          },
        },
      };
    });
  };
  const updateAreaUnit = (e) => {
    props.setPriceUnit( e.target.value)
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          area_details: {
            ...props.property_profile_info.area_details,
            [e.target.name]: e.target.value,
          },
        },
      };
    });
  };


  // --------------------------------- JSX ----------------------------
  return (
    <div className={`d-flex flex-column`}>
      <h5 className={` pb-2 mb-1 mt-2`}>
        Add Area Details
        <span className={`${BDS.error}`} style={{ display: "inline" }}>
          {" "}
          {props.error.carpet_area_error
            ? `${props.error.carpet_area_error}`
            : `${
                props.error.area_unit_error
                  ? `${props.error.area_unit_error}`
                  : ``
              }`}
        </span>
      </h5>
      <p className={`${PPS.label} pt-1 pb-3`}>
        Atleast one area type is mandatory
      </p>
      <div
        className={`d-flex flex-column justify-content-start align-items-center  ${POS.maintenanceSelectDiv}  `}
      >
        <div className={`${POS.inpContainer} w-100`}>
          <input
            type="number"
            id="Carpet Area"
            name="carpet_area"
            className={`${LDS.inputAdd}`}
            autoComplete="off"
            placeholder="  "
            value={carpet_area}
            onChange={(e) => updateAreaDetails(e)}
            onWheel={(e) => e.target.blur()}
          />
          <label htmlFor="Carpet Area" className={`${LDS.label}`}>
            Carpet Area
          </label>
        </div>
        <select
          className={`${POS.maintenanceSelect}`}
          name="area_unit"
          id=""
          value={area_unit}
          onChange={(e) => updateAreaUnit(e)}
        >
          <option className={`${PPS.option}`} value="" disabled>
            Area Unit
          </option>

          {areaType.map((item, index) => {
            return (
              <option className={`${PPS.option}`} key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default AreaDetails;
