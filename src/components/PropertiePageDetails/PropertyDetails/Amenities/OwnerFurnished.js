import React from "react";

const OwnerFurnished = ({ head, heatsec, semifurnished, withOutIcon,Icon }) => {
  return (
    <div className="OwnerFurnished_main_Container_div">
      <h6>{head} </h6>
      <p>{heatsec}</p>
      {withOutIcon === true ? (
        <div className="OwnerFurnished_Container_div">
          {semifurnished.map((List, index) => (
            <div className="OwnerFurnished_furnirshed" key={index}>
              <Icon
                style={{ color: '#8C3D13' }}
                className="OwnerFurnished_furnirshed_icons"
              />
              <p>{List.count===null?List.name:<>
              {List.count===0?`No ${List.name}`:`${List.count} ${List.name}`}
              </>}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="OwnerFurnished_Container_div">
          {semifurnished.map((List, index) => (
            <div className="OwnerFurnished_furnirshed" key={index}>
              <List.icon
                style={{ color: List.color }}
                className="OwnerFurnished_furnirshed_icons"
              />
              <p>{List.feature}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerFurnished;
