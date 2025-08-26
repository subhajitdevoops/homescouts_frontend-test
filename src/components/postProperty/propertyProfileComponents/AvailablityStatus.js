import React from "react";
import PPS from "../css/propertyProfile.module.css";
import BDS from "../css/BasicDetails.module.css";

function AvailablityStatus(props) {
  const { availibility_status } =
    props.property_profile_info.availibility_details;
  const setPostPropertyInfo = props.setPostPropertyInfo;

  const handleAvailibilityDetails = (e) => {
    if (e.target.value === "Ready to move") {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            availibility_details: {
              [e.target.name]: e.target.value,
              age_of_property: "",
            },
          },
        };
      });
    } else if (e.target.value === "Under construction") {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            availibility_details: {
              [e.target.name]: e.target.value,
              expected_by: "",
            },
          },
        };
      });
    } else {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            availibility_details: {
              ...props.property_profile_info.availibility_details,
              [e.target.name]: e.target.value,
            },
          },
        };
      });
    }
  };
  // ---------------------------------------------------------------------
  const typesOfAge = ["0-1 years", "1-5 years", "5-10 years", "10+ years"];

  // ------------------------------------------------------------------------
  const objDate = new Date();
  const currentYear = objDate.getFullYear();
  const nextTenYear = [];
  for (let i = currentYear; i < currentYear + 10; i++) {
    nextTenYear.push(i);
  }
  // ---------------------------JSX---------------------------------
  return (
    <div>
      <div>
        <h5 className="pt-1 pb-2 mb-1">
          Availability Status{" "}
          <span className={`${BDS.error}`} style={{ display: "inline" }}>
            {" "}
            {props.error.availibility_status_error
              ? `${props.error.availibility_status_error}`
              : `${
                  props.error.age_of_property_error
                    ? `${props.error.age_of_property_error}`
                    : `${
                        props.error.expected_by_error
                          ? `${props.error.expected_by_error}`
                          : ``
                      }`
                }`}
          </span>
        </h5>
        <div
          className={`d-flex flex-row justify-content-start align-item-center pt-1 pb-1 ${PPS.gap}`}
        >
          <input
            className={`${PPS.inputBtn2} ${
              availibility_status === "Ready to move" ? `${PPS.Selected}` : ``
            }`}
            type="button"
            name="availibility_status"
            value="Ready to move"
            onClick={handleAvailibilityDetails}
          />
          <input
            className={`${PPS.inputBtn2} ${
              availibility_status === "Under construction"
                ? `${PPS.Selected}`
                : ``
            }`}
            name="availibility_status"
            type="button"
            value="Under construction"
            onClick={handleAvailibilityDetails}
          />
        </div>
      </div>

      <br />
      {(() => {
        if (availibility_status === "Ready to move") {
          return (
            <div>
              <h5 className="pt-1 pb-2 mb-1">Age of property</h5>
              <div
                className={`d-flex flex-row justify-content-start align-item-center flex-wrap pt-1 pb-1 ${PPS.gap}`}
              >
                {typesOfAge.map((item, index) => {
                  return (
                    <input
                      className={`${PPS.inputBtn2} ${
                        props.property_profile_info.availibility_details
                          .age_of_property === item
                          ? `${PPS.Selected}`
                          : ``
                      }`}
                      name="age_of_property"
                      type="button"
                      value={item}
                      key={index}
                      onClick={(e) => {
                        handleAvailibilityDetails(e);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        } else if (availibility_status === "Under construction") {
          return (
            <div>
              <h5 className="pt-1 pb-2 mb-1">Possession By</h5>
              <select
                className={`${PPS.selectDate}`}
                name="expected_by"
                id=""
                value={
                  props.property_profile_info.availibility_details.expected_by
                }
                onChange={handleAvailibilityDetails}
              >
                <option value="" disabled>Expected By</option>
                <option value="within 3 months">within 3 months</option>
                <option value="within 6 months">within 6 months</option>
                {nextTenYear.map((item, index) => {
                  return (
                    <option key={index} value={`By ${item}`}>
                      By {item}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        }
      })()}
    </div>
  );
}

export default AvailablityStatus;
