import React from "react";
import commaimg from "../../../assets/services/ico-quote.png";
import { createMarkup } from "../../../config/Helper";

function Testimonial({ ImgSrc, userName, comment, designation, content }) {
  return (
    <div className="testimonials_comments_main_div">
      <div className="testimonials_comments_imgheader">
        <div className="testimonials_userImage">
          <img src={ImgSrc} alt="user image..." />
        </div>
        {/* {comment} */}
        {/* <p>{comment} testimonials_comments_username</p> */}
        <div className="testimonials_comments_username">
          <div dangerouslySetInnerHTML={createMarkup(content)} />
          {/* {userName} testimonials_comments_username */}
          {/* <h5>{userName}</h5> */}
          {/* {designation} testimonials_comments_username */}
          {/* <p>{designation} testimonials_comments_username</p> */}
          {/* <div className="testimonials_comma_img">
            <img src={commaimg} alt="comma image..." />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
