import React from "react";
import { createMarkup } from "../../../config/Helper";

function services({ heading, ImgSrc }) {
  return (
    <div className="service_div_for_caraosal">
      <div className="service_div">
        <div className="service_img">
          <img src={ImgSrc} alt="image..." />
        </div>
        <div className="service_header">
        <div dangerouslySetInnerHTML={createMarkup(heading)} />
        </div>
      </div>
    </div>
  );
}

export default services;
