import React, { useState } from "react";
import "../../assets/signup/Signup.css";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import img1 from "../../assets/signup/Group 132.png";
import img2 from "../../assets/signup/Group 133.png";
import img3 from "../../assets/Logo.svg";
import img4 from "../../assets/signup/Group 134.png";
import img5 from "../../assets/signup/Group 124.png";
import img6 from "../../assets/signup/Ellipse 44.png";
import img7 from "../../assets/signup/Group 136.png";
import img8 from "../../assets/signup/Group.png";
import google from "../../assets/signup/flat-color-icons_google.png";
import { Link } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import ChangedPasswordrafce from "./ChangedPasswordrafce";
import { NavLink } from "react-router-dom";

const ResetPasswordMain = () => {
  const [changenewpas,setChangenewpas]=useState(false)
 
  return (
    <div>
      <img src={img7} alt="corner image..." id="image_corner_elips" />
      <div className="container">
        <div className="flex_c signup_main_container_div">
          <div className=" signup_container_div">
            <div className="bg_og signup_container1_div resetpassword_container1_div">
              <div>
                <div className="signup_container23_div ">
                <NavLink to={"/"} className='homescoutLogo'>
                    <img src={img3} alt="houselogo..." id="signup_image11" />
                  </NavLink>
                  <img src={img8} alt="dots..." id="signup_image11_dots" />
                  <img src={img4} alt="houselogo..." id="signup_image12" />
                  <img src={img8} alt="dots..." id="signup_image12_dots" />
                  <p className="c_w h3p">
                    HomeScouts,100% Housing Solution for you
                  </p>
                  <img src={img5} alt="houselogo..." id="signup_image13" />
                </div>
              </div>
            </div>
            {
              changenewpas!==true?
            
            <ResetPassword changenewpas={changenewpas} setChangenewpas={setChangenewpas} />:
             <ChangedPasswordrafce /> }
          </div>
        </div>
      </div>
      {/* <img src={img6} alt="Elips..." /> */}
    </div>
  );
};

export default ResetPasswordMain;
