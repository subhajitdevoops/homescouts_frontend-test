import React from "react";
import PPS from "../css/propertyProfile.module.css";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

function OthersRoom(props) {
  const OtherRoom = ["Study Room", "Pooja Room", "Servent Room", "Store Room"];
  const other_rooms_details = props.property_profile_info.other_rooms_details;
  const setPostPropertyInfo = props.setPostPropertyInfo;

  const handleClickIcon = (e) => {
    if (other_rooms_details.indexOf(e) === -1) {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            other_rooms_details: [...other_rooms_details, e],
          },
        };
      });
    } else {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            other_rooms_details: other_rooms_details.filter((item, index) => {
              return item !== e;
            }),
          },
        };
      });
    }
  };

  // ----------------------------- JSX ---------------------------------------------
  return (
    <div>
      <h5 className="pt-1 pb-2 mb-1">
        Other rooms <span className={`${PPS.span}`}>(Optional)</span>
      </h5>

      <div
        className={`d-flex flex-row justify-content-start align-items-center flex-wrap pt-1 pb-1 ${PPS.gap}`}
      >
        {" "}
        {OtherRoom.map((item, index) => {
          return (
            <div
              className={`d-flex flex-row justify-content-between align-items-center  ${
                PPS.inputDiv
              }
              ${
                other_rooms_details.indexOf(item) !== -1
                  ? `${PPS.selected}`
                  : ""
              }`}
              key={index}
            >
              {other_rooms_details.indexOf(item) !== -1 ? (
                <AiOutlineCheck
                  style={{
                    display: "block",
                    transition: "inherit !important",
                    transitionDelay: "inherit !important",
                  }}
                  onClick={() => {
                    handleClickIcon(item);
                  }}
                />
              ) : (
                <AiOutlinePlus
                  style={{
                    display: "block",
                    transition: "inherit !important",
                    transitionDelay: "inherit !important",
                  }}
                  onClick={() => {
                    handleClickIcon(item);
                  }}
                />
              )}

              <input
                className={`${PPS.inputBtn}`}
                type="button"
                value={item}
                onClick={() => {
                  handleClickIcon(item);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OthersRoom;
