import React from "react";
import LDS from "../../css/locationDetails.module.css";
import POS from "../../css/pricingAndOthers.module.css";
import PPHS from "../../css/propertyPhoto.module.css";

function CapacityAndAvailability(props) {
  const capacity_and_availability =
    props.property_profile_info.capacity_and_availability;
  const setPostPropertyInfo = props.setPostPropertyInfo;

  // ---------------------------------------
  const changeHandler = (e) => {
    if (e.target.type === "checkbox") {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            capacity_and_availability: {
              ...capacity_and_availability,
              [e.target.name]: e.target.checked,
            },
          },
        };
      });
    } else {
      // --- Validation of no. of beds available according to total no. of beds task is pending
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            capacity_and_availability: {
              ...capacity_and_availability,
              [e.target.name]: e.target.value,
            },
          },
        };
      });
    }
  };

  // ------------- JSX ---------------------------
  return (
    <div className="">
      <br />
      <h5 className="pt-1 pb-3">
        Capacity and Availability{" "}
        <span className={`${PPHS.span}`}>(Optional)</span>
      </h5>
      <div className={`${LDS.inputAddressContainer} pb-2`}>
        <div className={`${LDS.inpContainer}`}>
          <input
            type="number"
            className={`${LDS.inputAdd}`}
            name="total_no_of_beds"
            id="tnob"
            placeholder="  "
            value={capacity_and_availability.total_no_of_beds}
            onChange={changeHandler}
          />
          <label htmlFor="tnob" className={`${LDS.label}`}>
            Total no. of beds in PG
          </label>
        </div>
        <div className={`${LDS.inpContainer}`}>
          <input
            type="number"
            className={`${LDS.inputAdd}`}
            name="no_of_beds_available"
            id="noba"
            placeholder="  "
            value={capacity_and_availability.no_of_beds_available}
            onChange={changeHandler}
          />
          <label htmlFor="noba" className={`${LDS.label}`}>
            No. of beds available in PG
          </label>
        </div>
      </div>
      {/* ------------------------ */}
      <div className={`${POS.checkBoxContainer}`}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <input
            type="checkbox"
            className={`${POS.checkbox}`}
            name="attached_bathroom"
            id="ab"
            checked={capacity_and_availability.attached_bathroom}
            onChange={changeHandler}
          />
          <label htmlFor="ab">Attached Bathroom</label>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <input
            type="checkbox"
            className={`${POS.checkbox}`}
            name="attached_balcony"
            id="attachedB"
            checked={capacity_and_availability.attached_balcony}
            onChange={changeHandler}
          />
          <label htmlFor="attachedB">Attached Balcony</label>
        </div>
      </div>
    </div>
  );
}

export default CapacityAndAvailability;
