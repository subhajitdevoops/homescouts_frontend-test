import React from "react";
import PPS from "../css/propertyProfile.module.css";
import BDS from "../css/BasicDetails.module.css";

function RoomDetails(props) {
  const { no_of_bedrooms, no_of_bathrooms, no_of_balconies } =
    props.property_profile_info.room_details;
  const setPostPropertyInfo = props.setPostPropertyInfo;

  const updateRoomDetails = (e) => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          room_details: {
            ...props.property_profile_info.room_details,
            [e.target.name]: parseInt(e.target.value),
          },
        },
      };
    });
  };
  const range = [];
  for (let i = 0; i <= 10; i++) {
    range.push(i);
  }
  // ----------------------------------- JSX ---------------------------------------------

  return (
    <div className="d-flex flex-column">
      <h5 className=" pb-2 mb-1">
        Add Room Details
        <span className={`${BDS.error}`} style={{ display: "inline" }}>
          {" "}
          {props.error.no_of_bedrooms_error
            ? `${props.error.no_of_bedrooms_error}`
            : `${
                props.error.no_of_bathrooms_error
                  ? `${props.error.no_of_bathrooms_error}`
                  : `${
                      props.error.no_of_balconies_error
                        ? `${props.error.no_of_balconies_error}`
                        : ``
                    }`
              }`}
        </span>
      </h5>
      <div
        className={`d-flex flex-row justify-content-start align-items-center flex-wrap ${PPS.gap}`}
      >
        {" "}
        {/* -------------------------No. of Bedrooms:-------------------------- */}
        <div className="d-flex align-items-center justify-content-start flex-row ">
          <label
            className={`mt-auto mr-3 mb-auto ${PPS.label}`}
            htmlFor="bedroom"
          >
            No. of Bedrooms:
          </label>

          <select
            className={PPS.RDselect}
            name="no_of_bedrooms"
            id="bedroom"
            value={no_of_bedrooms}
            onChange={(e) => updateRoomDetails(e)}
          >
            <option value="" disabled></option>
            {range.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>{" "}
        {/* ------------------------No. of Bathrooms:--------------------------- */}
        <div className="d-flex align-item-center justify-content-start flex-row">
          <label
            className={`mt-auto mr-3 mb-auto ${PPS.label}`}
            htmlFor="bathroom"
          >
            No. of Bathrooms:
          </label>
          <select
            className={PPS.RDselect}
            name="no_of_bathrooms"
            id="bathroom"
            value={no_of_bathrooms}
            onChange={(e) => updateRoomDetails(e)}
          >
            <option value="" disabled></option>
            {range.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {" "}
                  {item}{" "}
                </option>
              );
            })}
          </select>
        </div>{" "}
        {/* ------------------------No. of Balconies:--------------------------- */}
        <div className="d-flex align-items-center justify-content-start flex-row">
          <label
            className={`mt-auto mr-3 mb-auto ${PPS.label}`}
            htmlFor="balconies"
          >
            No. of Balconies:
          </label>
          <select
            className={PPS.RDselect}
            name="no_of_balconies"
            id="balconies"
            value={no_of_balconies}
            onChange={(e) => updateRoomDetails(e)}
          >
            <option value="" disabled></option>
            {range.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {" "}
                  {item}{" "}
                </option>
              );
            })}
          </select>
        </div>{" "}
        {/* --------------------------------------------------- */}
      </div>
    </div>
  );
}

export default RoomDetails;
