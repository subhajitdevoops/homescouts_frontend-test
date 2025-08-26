import React, { useState } from "react";
import "./ReUsableInput.css";
import { GoUnverified } from "react-icons/go";
import { RiPencilFill } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import OtpInput from "react-otp-input-rc-17";

export const ReUsableInput = ({
  VerifyIcon,
  GetOtpButton,
  message,
  Error,
  inputValue,
  handleInput,
  handleEditClick,
  placeholder,
  InputType,
  Lable,
  disabled,
  handleGetOtp,
}) => {
  const [types, setTypes] = useState(InputType);
  const handleSeenPassword = () => {
    if (types === "password") {
      setTypes("text");
    } else {
      setTypes("password");
    }
  };
  return (
    <div className="ReUsableInput_changeEmail">
      <div className="ReUsableInput_paragraph_div">
        <h6>{Lable}</h6>
      </div>
      <div
        className={`ReUsableInput_oldEmail_div ${
          Error === true ? "error" : undefined
        }`}
      >
        <input
          // className="error"
          type={types}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleInput(e)}
          required
          readOnly={disabled}
        />
        {InputType === "password" ? (
          <>
            {types === "password" ? (
              <AiFillEye
                onClick={handleSeenPassword}
                className="ReUsableInput_RiPencilFillicon"
                style={{ color: "#000", opacity: "0.5" }}
              />
            ) : (
              <AiFillEyeInvisible
                style={{ color: "red" }}
                className="ReUsableInput_RiPencilFillicon"
                onClick={handleSeenPassword}
              />
            )}
          </>
        ) : (
          <RiPencilFill
            className="ReUsableInput_RiPencilFillicon"
            style={{ opacity: "0.2" }}
            // onClick={handleEditClick}
          />
        )}
      </div>
      <div className="ReUsableInput_error_div">
        {GetOtpButton && (
          <div>
            <p
              className="ReUsableInput_ErrorVerifiedUser"
              onClick={handleGetOtp}
            >
              {" "}
              Get Otp
            </p>
          </div>
        )}
        {Error === true && (
          <p className="ReUsableInput_ErrorUnVerifiedUser">
            <i>{message} </i>
          </p>
        )}
      </div>
    </div>
  );
};

// export default ReUsableInput;
// ----------------------------------------------------
export const ReUsableInputOtp = ({
  VerifyIcon,
  GetOtpButton,
  message,
  Error,
  Lable,
  otp,
  setOtp,
  style,
  setStyle,
  setVerify,
}) => {
  const handleChange = (otp, index) => {
    setOtp(otp);
  };

  return (
    <div className="ReUsableInput_changeEmail">
      <div className="ReUsableInput_paragraph_div">
        <h6>{Lable}</h6>
      </div>
      <div className="ReUsableInputOtp_input_div">
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={<span> </span>}
          inputStyle={`ReUsableInputOtp_react_otp_input ${style} ${
            otp && otp.length == "6" ? "grnbd" : ""
          }`}
          hasErrored={true}
          isInputNum={true}
          // isInputSecure={true}
          // data-testid={true}
          // data-cy={true}
        />
      </div>
      <div className="ReUsableInput_error_div">
        {GetOtpButton && (
          <div>
            {VerifyIcon === true ? (
              <>
                <MdVerifiedUser className="ReUsableInput_MdVerifiedUser" />
              </>
            ) : (
              <>
                <GoUnverified className="ReUsableInput_GoUnverified" />
                <p className="ReUsableInput_ErrorVerifiedUser">
                  {" "}
                  Please Verify
                </p>
              </>
            )}
          </div>
        )}
        {/* {Error === true && (
              <p className="ReUsableInput_ErrorUnVerifiedUser"><i> {message} </i></p>
            ) } */}
      </div>
    </div>
  );
};

export const ReSentOtpTime = ({ counter, handleResetTime,AfterApiHIt }) => {
  return (
    <div className="ReUsableInput_changeEmail">
      <div className="ReUsableInput_paragraph_div"></div>
      <div className="ReUsableInputOtp_input_div">
        {AfterApiHIt===true&&counter === 0 ? (
          <p id="ReUsableInputOtp_resetotp" onClick={handleResetTime}>
            Resend OTP
          </p>
        ) : (
          <p
          // onClick={handleResetTime}
          >
            Resend OTP
          </p>
        )}
        <span>
          {" "}
          00:{counter < 10 ? "0" : null}
          {counter}
        </span>
      </div>
      <div className="ReUsableInput_error_div"></div>
    </div>
  );
};

export const ReUsableVerifyButton = ({ buttonName, verify, handleButton }) => {
  return (
    <div className="ReUsableVerifyButton_Verifybutton">
      {verify === true ? (
        <button
          className="ReUsableVerifyButton_button ReUsableVerifyButton_buttonOpacity"
          onClick={handleButton}
        >
          {buttonName}
        </button>
      ) : (
        <button className="ReUsableVerifyButton_button ">{buttonName}</button>
      )}
    </div>
  );
};
