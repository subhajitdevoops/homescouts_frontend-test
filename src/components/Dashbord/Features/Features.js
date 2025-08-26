import React, { useEffect } from "react";
import dot2 from "../../../assets/Feature/dot 2.png";
import feature from "../../../assets/Feature/Group 60.png";
import illustation from "../../../assets/Feature/illustation.png";
import exclusive from "../../../assets/Feature/Group 54.png";
import disaster from "../../../assets/Feature/icon (1).png";
import servic from "../../../assets/Feature/icon (2).png";
import solution from "../../../assets/Feature/icon.png";
import monitor from "../../../assets/Feature/icon (3).png";
import maintenance from "../../../assets/Feature/icon (4).png";
import repair from "../../../assets/Feature/icon (5).png";
import paint from "../../../assets/Feature/icon (6).png";
import photo1 from "../../../assets/Feature/photo-1.png";
import photo2 from "../../../assets/Feature/photo-2.png";
import photo3 from "../../../assets/Feature/photo-3.png";
import dot1 from "../../../assets/Feature/dot (1).png";
import dot3 from "../../../assets/Feature/Group 65.png";
import service from "../../../assets/services/Group 66.png";
import featureservice from "../../../assets/services/feature tags.svg";
import mobilecommand from "../../../assets/services/icon (6).png";
import equipment from "../../../assets/services/icon (7).png";
import lifecycle from "../../../assets/services/icon (8).png";
import troubleshooting from "../../../assets/services/icon.svg";
import energyoptomizer from "../../../assets/services/icon (10).png";
import smartdiagnostics from "../../../assets/services/icon (11).png";
import vitalequipment from "../../../assets/services/icon (12).png";
import smartalerts from "../../../assets/services/icon (13).png";
import preventative from "../../../assets/services/icon (14).png";
import dot from "../../../assets/Feature/Union.png";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import Services from "./services";
import TestimonialCarousel from "./TestimonialCarousel";
import UpdateElement from "./UpdateElement";
import ServicesCaraosel from "./servicesCaraosel";
import { createMarkup } from "../../../config/Helper";
import configData from "../../../config/config.json";

const Features = ({ res }) => {
  const updates = [
    {
      ImgSrc: monitor,
      heading: "Monitor",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, itaque earum aut accusamus aspernatursed rerum cupiditate ipsum atque hic excepturi expedita, ad dolores eaque esse commodi repellatLorem Ipsum is simply dummy text of the printing anLorem ",
    },
    {
      ImgSrc: maintenance,
      heading: "Maintenance",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, itaque earum aut accusamus aspernatursed rerum cupiditate ipsum atque hic excepturi expedita, ad dolores eaque esse commodi repellatLorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      ImgSrc: repair,
      heading: "Repair",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, itaque earum aut accusamus aspernatursed rerum cupiditate ipsum atque hic excepturi expedita, dummy text ever since the 1500s, when an unknownprinter took a galley of type and scrambled it to make a typespecimen book.",
    },
    {
      ImgSrc: paint,
      heading: "Paint",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, itaque earum aut accusamus aspernatursed rerum cupiditate ipsum atque hic excepturi expedita, dummy text ever since the 1500s, when an unknownprinter took a galley of type and scrambled it to make a typespecimen book.",
    },
  ];

  return (
    <>
      <div className="feature_main_container">
        <div className="feature_container">
          <div className="quote_section">
            <p>
              <ImQuotesLeft className="quotes-sign" />
              {/* {res && res.home.quote} */}
              <div
                dangerouslySetInnerHTML={createMarkup(res && res.home.quote)}
              />

              {/* Every day your home faces countless potential threats. Every day
              you face countless potential headaches. A small problem can become
              a major disaster. Early warning signs exist but often you can't
              hear or see them. */}
              <ImQuotesRight className="quotes-sign" />
            </p>
            <div className="feature_dot2">
              <img src={dot2} alt="dot..." />
            </div>
          </div>
          {/* --------------------------------------- */}
          <div className="feature_container1" id="features">
            <div className="feature_logo">
              <img src={feature} alt="Features..." />
            </div>
          </div>

          <div className="feature_container2">
            <div className="feature_illustation">
              <img
                src={
                  res &&
                  // configData.COMMON_MEDIA_LINK_URL +
                  //   "/dynamichomepage/" +
                    res.feature.featureImagePath
                }
                alt="illustation..."
              />
            </div>
            <div className="feature_meetscouts">
              <div className="feature_meetscouts_Meet">
                <h1>Meet HomeScouts</h1>
                {/* {res && res.feature.featureHeadDescription} */}
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    res && res.feature.featureHeadDescription
                  )}
                />

                {/* <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p> */}
              </div>
              <div className="feature_meethomescouts">
                {res &&
                  res.feature.featureDetails.map((ele, index) => (
                    <div key={index} className="feature_meeth_div">
                      <img
                        src={
                          // configData.COMMON_MEDIA_LINK_URL +
                          // "/dynamichomepage/" +
                          ele.iconPath
                        }
                        alt="image..."
                      />
                      <h4>Solution,where you need</h4>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------------- Update container ------------------------------------ */}

        <div className="update_main_container" id="update">
          <div className="main_update_dot3">
            <img src={dot} alt="image..." />{" "}
          </div>
          <div className="update_container">
            <div className="update_section1">
              <div className="update_section1_content">
                <h6>U P D A T E</h6>
                <div>
                  <h1>
                    Live anywhere on
                    <br /> your terms
                  </h1>
                </div>
              </div>

              <div className="updatephotos">
                <div className="update_photo1">
                  <img
                    src={
                      res &&
                      // configData.COMMON_MEDIA_LINK_URL +
                      //     "/dynamichomepage/"+
                        res.update.updateImagePath[0]
                    }
                    alt="image..."
                  />
                </div>
                <div className="update_dot1">
                  <img src={dot1} alt="image..." />
                </div>
                <div className="update_photo2">
                  <img
                    src={
                      res &&
                      // configData.COMMON_MEDIA_LINK_URL +
                      //     "/dynamichomepage/"+
                        res.update.updateImagePath[1]
                    }
                    alt="image..."
                  />
                </div>
                <div className="update_photo3">
                  <img
                    src={
                      res &&
                      // configData.COMMON_MEDIA_LINK_URL +
                      //     "/dynamichomepage/"+
                        res.update.updateImagePath[2]
                    }
                    alt="image..."
                  />
                </div>
                <div className="update_dot3">
                  <img src={dot3} alt="image..." />
                </div>
              </div>
            </div>
            <div className="update_section2">
              <div className="update_image_section">
                {res &&
                  res.update.updateDetails.map((item, index) => {
                    return (
                      <UpdateElement
                        ImgSrc={
                          // configData.COMMON_MEDIA_LINK_URL +
                          // "/dynamichomepage/" +
                          item.iconPath
                        }
                        // heading={item.heading}
                        content={item.updateDescription}
                        key={index}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------- Services --------------------------------------------------- */}
        <div className="service_testimonial_gradiante_color">
          <div className="services_section1" id="services">
            <div className="services_tag_image">
              <img src={service} alt="image..." />
            </div>
            <div className="services_heading">
              <h1>Choose the best that fits for yours stay</h1>
              <p>With HomeSocuts search the best property deals nearby you.</p>
            </div>
            <div className="services_image">
              <img src={featureservice} alt="image..." />
            </div>
          </div>
          {/* --------------------------- */}
          <div className="services_section2">
            <div className="service_section_div">
              {res &&
                res.services.servicesDescription.map((ele, index) => (
                  <div key={index}>
                    <Services
                      ImgSrc={
                        // configData.COMMON_MEDIA_LINK_URL +
                        // "/dynamichomepage/" +
                        ele.iconPath
                      }
                      heading={ele.serviceTitle}
                    />
                  </div>
                ))}

              {/* <Services ImgSrc={equipment} heading="Equipment Optimizer" />
              <Services ImgSrc={lifecycle} heading="Lifecycle prediction" />
              <Services
                ImgSrc={troubleshooting}
                heading="Troubleshooting Guide"
              />
              <Services ImgSrc={energyoptomizer} heading="Energy Optimizer" />
              <Services ImgSrc={smartdiagnostics} heading="Smart Diagnostics" />
              <Services
                ImgSrc={vitalequipment}
                heading="Vital Equipment Scan"
              />
              <Services ImgSrc={smartalerts} heading="Smart Alerts" />
              <Services
                ImgSrc={preventative}
                heading="Preventative maintenance"
              /> */}
            </div>
            <div className="service_caraosel">
              <ServicesCaraosel />
            </div>
          </div>
          {/* ----------------------------------- */}
          <div className="testimonials_container" id="testimonials">
            <div className="testimonials_heading_div">
              <p>T E S T I M O N I A L</p>
              <h1>
                Let's see what people says
                <br />
                about HomeScouts
              </h1>
            </div>
            {/*------------------- */}
            <div className="testimonials_comments_div">
              <TestimonialCarousel res={res && res.testimony} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
