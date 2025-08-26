import React from "react";
import { createMarkup } from "../../../config/Helper";

function UpdateElement({ ImgSrc, heading, content }) {
  return (
    <div className="update-div">
      <div className="update-image">
        <img src={ImgSrc} alt="image..." />
      </div>
      <div className="update-header">

      <div dangerouslySetInnerHTML={createMarkup(content)} />

      {/* {heading}
        {content} */}
        {/* <h4>{heading}</h4>
        <p>{content}</p> */}
      </div>
    </div>
  );
}

export default UpdateElement;
