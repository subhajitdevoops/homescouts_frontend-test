import React, { useState } from "react";
import "../../assets/signup/Signup.css";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import SendOtp from "./SendOtp";
import ResetFillOtp from "./ResetFillOtp";
import ResetNewPassword from "./ResetNewPassword";
import ResetOldPassword from "./ResetOldPassword";
import ChangedPasswordrafce from "./ChangedPasswordrafce";
import img3 from "../../assets/Logo.svg";
import img5 from "../../assets/signup/Group 124.png";
import { NavLink } from "react-router-dom";

const ResetPassword = ({ changenewpas, setChangenewpas }) => {
  const [otp, setOtp] = useState(false);
  const [text, setText] = useState("");
  const [newpas, setNewpas] = useState(false);
  const [resId, setResId] = useState();
  // const [changenewpas,setChangenewpas]=useState(false)
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
              Not have an account?&nbsp;
              <Link to="/signup">
                <span className="c_blue signupind_Already_account_span">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex_c s ignupind_register_main_account_div">
          <div className=" signup_join_us_div">
            <div className="signup_joinus_div login_joinus_div">
              <h3 className="h3p">
                <span className="c_og">Reset</span>
                &nbsp; password of your account!
              </h3>
              <p className="h3p"></p>
            </div>
            {newpas === true ? (
              <ResetNewPassword
                changenewpas={changenewpas}
                setChangenewpas={setChangenewpas}
                resId={resId}
              />
            ) : (
              <ResetOldPassword
                newpas={newpas}
                setNewpas={setNewpas}
                setText={setText}
                text={text}
                setResId={setResId}
                resId={resId}
              />
            )}
          </div>
        </div>
        <div className="signup_elips_div signupind_elips_div">
          {/* <img src={img6} alt="Elips..." /> */}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
