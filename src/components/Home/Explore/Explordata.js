import React from "react";

const Explordata = ({ item }) => {
  return (
    <div className="b_r flex_c Explor_imade_container_div">
      <img src={item.image} alt="image.." />
      <p>{item.name}</p>
    </div>
  );
};

export default Explordata;
