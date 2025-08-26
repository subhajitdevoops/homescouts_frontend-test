import React from "react";
import BDS from "../../css/BasicDetails.module.css";

function PGRoomType(props) {
  const room_type = props.property_profile_info.room_type;
  const setPostPropertyInfo = props.setPostPropertyInfo;
  const error = props.error;

  const roomTypeHandler = (e) => {
    if (e.target.value === "Sharing") {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            [e.target.name]: e.target.value,
            no_of_room_partners: "",
          },
        };
      });
    } else {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            [e.target.name]: e.target.value,
          },
        };
      });
    }
  };
  // console.log(room_type);
  // --------------- JSX ----------------
  return (
    <div className={``}>
      <h5 className="pt-1 pb-1">
        Room Type<sapn style={{color:'red'}}>*</sapn>
        <span className={`${BDS.error}`} style={{ display: "inline" }}>
          {error.room_type_error
            ? `${error.room_type_error}`
            : `${
                error.no_of_room_partners_error
                  ? `${error.no_of_room_partners_error}`
                  : ``
              }`}
        </span>
      </h5>
      <div className="d-flex flex-row pt-2 pb-1">
        <input
          type="button"
          className={`${
            room_type === "Sharing" ? `${BDS.selected}` : `${BDS.input}`
          }`}
          name="room_type"
          value="Sharing"
          onClick={roomTypeHandler}
        />
        <input
          type="button"
          className={`${
            room_type === "Private" ? `${BDS.selected}` : `${BDS.input}`
          }`}
          name="room_type"
          value="Private"
          onClick={roomTypeHandler}
        />
      </div>
      {room_type === "Sharing" && (
        <div>
          <h5 className="pt-1 pb-1">How many people can share this room?<sapn style={{color:'red'}}>*</sapn></h5>
          <div className="d-flex flex-row pt-2 pb-1">
            {["1", "2", "3", "4", "4+"].map((item, index) => {
              return (
                <input
                  type="button"
                  className={`${
                    props.property_profile_info.no_of_room_partners === item
                      ? `${BDS.selected}`
                      : `${BDS.input}`
                  }`}
                  name="no_of_room_partners"
                  value={item}
                  key={index}
                  onClick={roomTypeHandler}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default PGRoomType;
