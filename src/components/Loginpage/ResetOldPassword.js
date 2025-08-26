import React, { useEffect, useState } from "react";
import "../../assets/signup/Signup.css";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import SendOtp from "./SendOtp";
import ResetFillOtp from "./ResetFillOtp";
// import ResetNewPassword from "./ResetNewPassword";
import configData from "../../config/config.json";
import { API_REQ_POST, API_REQ_POST_WITH_TOKEN } from "../../config/API";
import { ToastContainer, toast } from "react-toastify";

const emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ResetOldPassword = ({
  newpas,
  setNewpas,
  setText,
  text,
  setResId,
  resId,
}) => {
  const [otp, setOtp] = useState(false);
  const [oldRes, setOldRes] = useState();
  const handleReset = () => {
    if (text !== "" && emailValidator.test(text)) {
    }
  };
  const handleSendOtp = async () => {
    const RequestReset = {
      email: `${text}`,
    };
    if (text !== "" && emailValidator.test(text)) {
      let ResSendOtp = await API_REQ_POST(
        configData.MAIL_RESET_PASSWORD_URL,
        RequestReset
      );
      // console.log(ResSendOtp);

      if (ResSendOtp.success) {
        toast.success(`${ResSendOtp.message}`);
        console.log(ResSendOtp.message);
        setOtp(true);
        setResId(ResSendOtp);
      } else {
        console.log(ResSendOtp.message);
        toast.error(`${ResSendOtp.message}`);
      }
    } else {
      toast.warning("please give valid email");
    }
  };

  return (
    <>
      <div className="flex_c login_Prosonal_account_div">
        <div className="signupind_password_account_div">
          <label className="h3p c_br">Email*</label>
          <div className="flex_c signupind_password_div">
            <div
              className="my-3 flex_c signupind_Register_account_div resetpassword_enpassword_div"
              style={{ position: "relative",width:'100%' }}
            >
              <input
                type="text"
                value={text}
                require
                placeholder="Enter your Email ID"
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(event) => {
                  event.key === "Enter" && handleSendOtp();
                }}
              />
              <span>
                {text !== "" && !emailValidator.test(text) ? (
                  <AiFillCloseCircle className="h6 text-danger mx-2 mt-1 resetpassword_redcross" />
                ) : (
                  <AiFillCheckCircle className="h6 text-success mx-2 mt-1 resetpassword_redcross" />
                )}
              </span>
            </div>
          </div>
        </div>
        {otp === true ? (
          <ResetFillOtp
            newpas={newpas}
            setNewpas={setNewpas}
            text={text}
            resId={resId}
          />
        ) : (
          <SendOtp
            text={text}
            handleSendOtp={handleSendOtp}
            emailValidator={emailValidator}
          />
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseonhover={false}
        />
      </div>
    </>
  );
};

export default ResetOldPassword;
