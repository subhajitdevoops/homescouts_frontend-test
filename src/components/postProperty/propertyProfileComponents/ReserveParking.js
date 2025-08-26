import React from "react";
import PPS from "../css/propertyProfile.module.css";

function ReserveParking(props) {
  const { cover_parking, open_parking } =
    props.property_profile_info.parking_details;
  const setPostPropertyInfo = props.setPostPropertyInfo;

  const OPincrement = () => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          parking_details: {
            ...props.property_profile_info.parking_details,
            open_parking: open_parking + 1,
          },
        },
      };
    });
  };
  const OPdecrement = () => {
    if (open_parking > 0) {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            parking_details: {
              ...props.property_profile_info.parking_details,
              open_parking: open_parking - 1,
            },
          },
        };
      });
    }
  };
  const CPincrement = () => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          parking_details: {
            ...props.property_profile_info.parking_details,
            cover_parking: cover_parking + 1,
          },
        },
      };
    });
  };
  const CPdecrement = () => {
    if (cover_parking > 0) {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            parking_details: {
              ...props.property_profile_info.parking_details,
              cover_parking: cover_parking - 1,
            },
          },
        };
      });
    }
  };
  const OPchangeHandle = (e) => {};
  const CPchangeHandle = (e) => {};
  // --------------------------------------JSX---------------------------------------------
  return (
    <div>
      <h5 className="pt-1 pb-2 mb-1">
        Reserved Parking <span className={`${PPS.span}`}>(Optional)</span>
      </h5>
      <div
        className={`d-flex flex-row justify-content-start align-items-center pt-2 pb-2 ${PPS.gap}`}
      >
        <div
          className={`d-flex flex-row justify-content-start align-items-center ml-3`}
        >
          {" "}
          <p className={`${PPS.splP}`}>Covered Parking</p>
          <button
            onClick={() => {
              CPdecrement();
            }}
            className={`btn ${PPS.splBtn}`}
          >
            -
          </button>
     
          <input
            className={`${PPS.splInput}`}
            value={cover_parking}
            onChange={CPchangeHandle}
            type="number"
            name=""
            id=""
            disabled
          />
          <button
            onClick={() => {
              CPincrement();
            }}
            className={`btn ${PPS.splBtn}`}
          >
            +
          </button>
        </div>
        <div
          className={`d-flex flex-row justify-content-start align-items-center`}
        >
          <p className={`${PPS.splP}`}>Open Parking</p>
          <button
            onClick={() => {
              OPdecrement();
            }}
            className={`btn ${PPS.splBtn}`}
          >
            -
          </button>
          <input
            className={`${PPS.splInput}`}
            value={open_parking}
            onChange={OPchangeHandle}
            type="number"
            name=""
            id=""
            disabled
          />
       
          <button
            onClick={() => {
              OPincrement();
            }}
            className={`btn ${PPS.splBtn}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReserveParking;
