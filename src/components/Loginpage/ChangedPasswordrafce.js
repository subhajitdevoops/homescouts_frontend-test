import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/signup/circle check full.png";
import img3 from "../../assets/Logo.svg";
import img5 from "../../assets/signup/Group 124.png";
import { NavLink } from "react-router-dom";

const ChangedPasswordrafce = () => {
  return (
    <>
      <div className="signup_container2_div">
        <div>
          <div className="signup_container2_color_div reset_Forcolor_color_div"></div>
          <div className="signup_container2_mobile_div">
            <img src={img5} alt="houselogo..." id="signup_image13" />
            <NavLink to={"/"} className="">
              <img src={img3} alt="houselogo..." id="signup_image11" />
            </NavLink>
          </div>
          <div className="flex_c mt-3 signup_Already_account_div">
            <Link to="">
              <div className="signupind_backbutton_div resetpassword_backbutton_div  ">
                {/* <AiOutlineArrowLeft className="c_blue" /> */}
              </div>
            </Link>
            <p className=" signup_Already_account signupind_Already_account h3p c_br">
              account recovered,&nbsp; 
              <Link to="/login">
                <span className="c_blue signupind_Already_account_span">
                  login
                </span>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex_c s ignupind_register_main_account_div">
          <div className=" signup_join_us_div">
            <div className="signup_joinus_div login_joinus_div">
              <h3 className="h3p">
                <span className="c_og">Login</span>
                &nbsp; to your account!
              </h3>
              <p className="h3p"></p>
            </div>
            <div className="Flex_c changedPassword_center">
              <img src={img1} alt="image..." />
              <h3>
                Congratulations
                <br /> You just changed your home’s lock
              </h3>
            </div>

            <div className="flex_c login_Prosonal_account_div">
              <Link to="/login">
                <button className="bg_blue c_w resetfillotp_verify_button ">
                  Login to my account
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="signup_elips_div signupind_elips_div">
          {/* <img src={img6} alt="Elips..." /> */}
        </div>
      </div>
    </>
  );
};

export default ChangedPasswordrafce;
