import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ImageStstus1 from "../../../../assets/services/Ellipse 31 (1).png";
import ImageStstus2 from "../../../../assets/services/Ellipse 31.png";
import data from "../StatusData";
import photo from "../../../../assets/statusimg/img2.jpg";
import configData from '../../../../config/config.json';

const StatusImageSmall = ({ item, index, id, handleshowStatus }) => {
  // console.log(item);
  return (
    <div className="flex_c Navbar_status_container_div">
      <img
        src={item}
        alt="homescouts img..."
        onClick={() => handleshowStatus(id, index)}
      />
    </div>
  );
};

const HomeSlider = ({ lists, setModalIsOpen, handleshowStatus }) => {
  // const [showSlider,setShowSlider]=useState(lists.length>4?5:lists.length)
  // console.log('showSlider==>',showSlider);
  // console.log('lists==>',lists);
  const slidesToShow = lists.length > 4 ? 5 : lists.length;

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="mt-1 statusslider_main_container_div">
        <Slider {...settings}>
          {lists.map((item, index) => {
            return (
              <StatusImageSmall
                item={item && item.media[item.media.length - 1]}
                key={index}
                index={index}
                id={item.id}
                handleshowStatus={handleshowStatus}
                setModalIsOpen={setModalIsOpen}
              />
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default HomeSlider;


