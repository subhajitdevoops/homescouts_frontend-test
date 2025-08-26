import React, { useState } from "react";
import img1 from "../../../assets/Feature/photo-1.png";
import img2 from "../../../assets/Feature/photo-2.png";
import img3 from "../../../assets/Feature/photo-3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import ImgData from "../../Home/Nav/StatusData";
import configData from "../../../config/config.json";

const SliderImg = ({ item }) => {
  return (
    <div className="slider_carosal-div">
      <img
        src={
          // configData.COMMON_MEDIA_LINK_URL + "/dynamichomepage/" + 
          item}
        alt="image..."
        height="400vh"
        width="100%"
      />
    </div>
  );
};

const Slider = ({ sliderImg }) => {
  const [imageData, setImageData] = useState(ImgData.statusData);
  console.log(imageData.imgstatus);
  return (
    <Carousel>
      {sliderImg &&
        sliderImg.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <SliderImg item={item} />
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
};

export default Slider;
