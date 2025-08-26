import React from "react";
import small from "../../../assets/small.png";
import dot from "../../../assets/dot.png";
import Slider from "../Slider/Slider";
import crl from "../../../assets/line-oval.png";
import { NavLink } from "react-router-dom";
import { createMarkup } from "../../../config/Helper";
import configData from "../../../config/config.json";

const Banner = ({ res }) => {
  return (
    <>
      <div className="banner-main-div">
        <div className="banner_container_section_1">
          <div className="banner_container_content">
            <div className="banner_heading">
              {/* {res && res.title} */}
              <div dangerouslySetInnerHTML={createMarkup(res && res.title)} />
              {/* Hope a seemless <br />
                <span style={{ color: "#ED6823" }}> Search </span> of yours new
                <br />
                <span style={{ color: "#ED6823" }}>stay</span>. */}
            </div>
            <div className="banner_paragraph">
              {/* {res && res.description} */}
              <div
                dangerouslySetInnerHTML={createMarkup(res && res.description)}
              />

              {/* With HomeScouts search the best property near you with <br />
              a support of all yours housholds and homeservices,
              <br />
              available on your fingretips */}
            </div>
            <div className="banner_button">
              <NavLink to="/">
                <button id="banner_button1">Explore</button>
              </NavLink>
              {/* <NavLink to="/login">
                <button id="banner_button2">Get Started</button>
              </NavLink> */}
            </div>
          </div>

          <div className="dot_sytle1">
            <img src={dot} alt="design img" />
          </div>
          <div className="banner_circle_image_div">
            <img src={crl} alt="circle image..." />
          </div>
        </div>
        {/* ----------------------------------------------------- */}

        <div className="banner_container_section_2">
          <div className="banner_slider_div">
            <div className="slider_container">
              <Slider sliderImg={res && res.sliderImagepath} />
            </div>{" "}
          </div>
          <div className="banner_image_div">
            <img
              src={
                res &&
                // configData.COMMON_MEDIA_LINK_URL +
                //   "/dynamichomepage/" +
                res.seccondaryImagePath
              }
              alt="small image..."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
