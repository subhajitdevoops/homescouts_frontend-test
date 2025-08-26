import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Services from "./services";
import mobilecommand from "../../../assets/services/icon (6).png";
import equipment from "../../../assets/services/icon (7).png";
import lifecycle from "../../../assets/services/icon (8).png";
import troubleshooting from "../../../assets/services/icon.svg";
import energyoptomizer from "../../../assets/services/icon (10).png";
import smartdiagnostics from "../../../assets/services/icon (11).png";
import vitalequipment from "../../../assets/services/icon (12).png";
import smartalerts from "../../../assets/services/icon (13).png";
import preventative from "../../../assets/services/icon (14).png";

function servicesCaraosel() {
  const responsive = {
    superLargeDesktop: {
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
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseonhover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable
      autoPlay
      responsive={responsive}
    >
      <Services ImgSrc={mobilecommand} heading="Mobile Command Management" />
      <Services ImgSrc={equipment} heading="Equipment Optimizer" />
      <Services ImgSrc={lifecycle} heading="Lifecycle prediction" />
      <Services ImgSrc={troubleshooting} heading="Troubleshooting Guide" />
      <Services ImgSrc={energyoptomizer} heading="Energy Optimizer" />
      <Services ImgSrc={smartdiagnostics} heading="Smart Diagnostics" />
      <Services ImgSrc={vitalequipment} heading="Vital Equipment Scan" />
      <Services ImgSrc={smartalerts} heading="Smart Alerts" />
      <Services ImgSrc={preventative} heading="Preventative maintenance" />
    </Carousel>
  );
}

export default servicesCaraosel;
