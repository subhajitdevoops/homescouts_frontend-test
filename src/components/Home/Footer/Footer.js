import React from "react";
import "./Footer.css";
import img from "../../../assets/Logo.svg";
import {
  FaYoutubeSquare,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiFillYoutube, AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  const handleOpenSite = (link) => {
    window.open(link, "_blank");
  };
  const handleOpenMail = (email) => {
    window.location.href = `mailto:${email}`;
  };
  const currentYear = new Date().getFullYear();
  //return (     <div>       {currentYear}       <div>&copy; {currentYear} HomeScouts, All rights reserved.</div> </div>
  return (
    <div className=" footer_main_container_div">
      <div className="footer_container_div">
        <div className="footer_homescouts_container_div">
          <div className="footer_logo_container_div">
            <img src={img} alt="image..." />
            <h6>Our Services</h6>
            <p>Post your Property</p>
            <p>Builders in India</p>
            {/* <p>Articles</p> */}
            <p>Customer Service</p>
          </div>
          <div className="footer_logo_container_div">
            <h6>Company</h6>
            <NavLink to="/dashboard">
              <p className="footer_logo_pragraph">About us</p>
            </NavLink>
            <p>Contact us</p>
            <p>Careers with us</p>
            <NavLink to="/term-condition">
              <p className="footer_logo_pragraph">Terms & Conditions</p>
            </NavLink>
            {/* <p>Request Info</p>
            <p>Feedback</p>
            <p>Report a problem</p>
            <p>Testimonials</p>
            <NavLink to="/privacy-policy">
              <p className="footer_logo_pragraph">Privacy Policy</p>
            </NavLink>
            <p>Summons/Notices</p>
            <p>Grievances</p>
            <p>Testimonials</p>
            <p>Safety Guide</p> */}
          </div>
          {/* <div className="footer_logo_container_div">
            <h6>Our Partners</h6>
            <p>XYZ.com</p>
            <p>Leagle simple.com- leagle solution</p>
            <p>Jaguar - Bathfittings and light</p>
            <p>Home services- xyz partner</p>
            <p>Tiffen service</p>
            <p>APML- Agrawal packer and movers ltd</p>
            <p>Report a problem</p>
          </div> */}
        </div>
        <div className="footer_logo_container_div">
          <NavLink to="/dashboard/#contact">
            <h6>Contact Us</h6>
          </NavLink>
          {/* <p>Phone: +91-8169165152</p> */}
          <p>Monday - Saturday (9:00AM to 11:00PM IST)</p>
          <p>Email - hello@homescouts.in</p>
          <h6>Connect with us</h6>
          <div className="footer_logo_social">
            <AiFillYoutube
              style={{ color: "red" }}
              onClick={() =>
                handleOpenSite(
                  "https://www.youtube.com/channel/UCl6MxR3ZfrOTRZ3IbrrVG3w"
                )
              }
            />
            {/* <FaTwitter
              style={{ color: "#55ACEE" }}
              onClick={() => handleOpenSite("")}
            /> */}
            <FaFacebook
              style={{ color: "#55ACEE" }}
              onClick={() =>
                handleOpenSite("https://www.facebook.com/homescoutshouse")
              }
            />
            <FaInstagram
              style={{ color: "red" }}
              onClick={() =>
                handleOpenSite("https://www.instagram.com/homescoutshouse/")
              }
            />
            <AiOutlineMail
              style={{
                color: "#CD7F32",
              }}
              onClick={() => handleOpenMail("homescoutshouse@gmail.com")}
            />
          </div>
          <p>&copy; {currentYear} HomeScouts, All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
