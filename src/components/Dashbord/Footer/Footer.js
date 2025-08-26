import React from "react";
import fb from "../../../assets/Footer/ico-fb.png";
import twitter from "../../../assets/Footer/ic-twitter.png";
import insta from "../../../assets/Footer/ic-instagram.png";
import logo from "../../../assets/Logo.svg";
import { HashLink } from "react-router-hash-link";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  const handleOpenSite = (link) => {
    window.open(link, "_blank");
  };
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="dashboard_footer">
        <div className="dashboard_footer_container">
          {/* ---------------------------------------------- */}
          <div className="dashboard_footer_div1">
            <HashLink smooth to="#home">
              <img src={logo} alt="homeScouts" />
            </HashLink>
            {/* <img src={logo} alt="homeScouts" /> */}
            <h5>HomeScouts- Housing and Services</h5>
            <p>
              This is my address
              <br />
              and my location,
              <br />
              Mumbai,india
            </p>

            <p>
              Phone: +91-8169165152
              <br />
              Email: hello@homescouts.in
            </p>
          </div>
          {/* -------------------------------------------------- */}
          <div className="footer_link_section">
            <div className="dashboard_footer_div2">
              <h3>Navigation</h3>
              {/* ------------------------------------- */}
              <HashLink smooth to="#home">
                Home
              </HashLink>
              <HashLink smooth to="#features">
                Features
              </HashLink>
              <HashLink smooth to="#services">
                Services
              </HashLink>
              <HashLink smooth to="#testimonials">
                Testimonials
              </HashLink>
              <HashLink smooth to="">
                We Care
              </HashLink>
              <HashLink smooth to="">
                Idea Exchange
              </HashLink>
            </div>
            {/* ----------------------------------------------------- */}
            <div className="dashboard_footer_div3">
              <h3>About</h3>
              <HashLink smooth to="#contact">
                Contact Us
              </HashLink>
              <HashLink smooth to="/privacy-policy">
                Privacy & Policy
              </HashLink>
              <HashLink smooth to="/term-condition">
                Terms & Condition
              </HashLink>
              <HashLink smooth to="#faq">
                FAQ
              </HashLink>
            </div>
            {/* ------------------------------------------- */}
            <div className="dashboard_footer_div4">
              <h3>Stay Connected</h3>
              <div>
                <img src={fb} alt="facebook image..." />
                <a
                  href="https://www.facebook.com/homescoutshouse"
                  target="_blank"
                >
                  Facebook
                </a>
              </div>
              <div>
                {/* <img src={twitter} alt="facebook image..." />
                <a href="" target="_blank">
                  Twitter
                </a> */}
                <AiFillYoutube
                  style={{ color: "red", fontSize: "32px" }}
                  onClick={() =>
                    handleOpenSite(
                      "https://www.youtube.com/channel/UCl6MxR3ZfrOTRZ3IbrrVG3w"
                    )
                  }
                />
                <a
                  href="https://www.instagram.com/homescoutshouse/"
                  target="_blank"
                >
                  Youtube
                </a>
              </div>
              <div>
                <img src={insta} alt="facebook image..." />
                <a
                  href="https://www.instagram.com/homescoutshouse/"
                  target="_blank"
                >
                  Instagram
                </a>
              </div>
            </div>
            {/* -------------------------------------------- */}
          </div>
        </div>
        <p className="homescouts_properties">
          {" "}
          &copy; {currentYear} HomeScouts, All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
