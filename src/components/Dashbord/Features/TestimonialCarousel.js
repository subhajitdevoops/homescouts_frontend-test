import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ellipcomment1 from "../../../assets/services/Ellipse 31.png";
import Testimonial from "./Testimonial";
import configData from '../../../config/config.json'

function TestimonialCarousel({ res }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1800 },
      items: 3,
    },
    laptop: {
      breakpoint: { max: 1800, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel autoPlay infinite responsive={responsive}>
      {res &&
        res.map((ele, index) => (
          <div key={index}>
            <Testimonial
              ImgSrc={
                //  configData.COMMON_MEDIA_LINK_URL +
                // "/dynamichomepage/" + 
                ele.testimonyImagePath}
              content={ele.testimonyDescription}
              // userName={ele.userName}
              // comment={ele.testimonyDescription}
              // designation={ele.designation}
            />
          </div>
        ))}

      {/* <Testimonial
        ImgSrc={ellipcomment1}
        userName="Amit"
        comment=" Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley ."
        designation="Designation"
      />
      <Testimonial
        ImgSrc={ellipcomment1}
        userName="Amit"
        comment=" Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley ."
        designation="Designation"
      />
      <Testimonial
        ImgSrc={ellipcomment1}
        userName="Amit"
        comment=" Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley ."
        designation="Designation"
      />
      <Testimonial
        ImgSrc={ellipcomment1}
        userName="Amit"
        comment=" Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley ."
        designation="Designation"
      />
      <Testimonial
        ImgSrc={ellipcomment1}
        userName="Amit"
        comment=" Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley ."
        designation="Designation"
      />
      <Testimonial
        ImgSrc={ellipcomment1}
        userName="Amit"
        comment=" Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley ."
        designation="Designation"
      /> */}
    </Carousel>
  );
}

export default TestimonialCarousel;
