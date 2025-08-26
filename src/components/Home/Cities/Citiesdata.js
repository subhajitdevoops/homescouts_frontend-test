import React from "react";

const Citiesdata = ({ item,handleSelectCities }) => {
  return (
    <div className="b_r Citiesdata_container_div" onClick={()=>handleSelectCities(item.name)}>
      <div className="Citiesdata_image_container_div">
        <img src={item.image} alt="image.." />
      </div>
      <div className="Citiesdata_paragraph">
        <p className="Citiesdata_paragraph_name">{item.name}</p>
        <p className="Citiesdata_paragraph_proporties">
          {/* {item.properties}+Properties phase2 */}
        </p>
      </div>
    </div>
  );
};

export default Citiesdata;
