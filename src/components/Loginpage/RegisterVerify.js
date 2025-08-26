import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FcClock } from "react-icons/fc";

const RegisterVerify = ({
  setOtpSend,
  handleResetTime,
  counter,
  handleRegisterAccount,
  handleRegisterVerify,
  verifyOtp,
  email
}) => {
  return (
    <div className="w-100 flex_c signupind_Prosonal_account_div">
      {/* <form
        className="w-100"
        //    onSubmit={handleSubmission}
      > */}
      <div className="signupind_Register_account_div">
        <label
          title="Enter your name."
          htmlFor="name"
          className="c_br labelpadd labelpadds "
          // style={{width:'auto !importent'}}
        >
          Enter the verification code to verify your mail
          {/* <span style={styleError}>{errorMessage.nameError}</span> */}
        </label>
        <input
          type="number"
          name="name"
          id="name"
          value={verifyOtp}
          placeholder="Enter the verification code"
          title="Enter the verification code."
          onChange={(e) => handleRegisterVerify(e)}
          className={`p-2`}
        />
      </div>

      {/* <br /> */}
      <div className=" w-100 flex_c resetfillotp_container_buttontimer_div">
        {counter === 0 ? (
          <button
            className=" h3p resetfillotp_container_button"
            id="bg_blue"
            onClick={handleResetTime}
          >
            <span>ResendOTP</span> <FcClock />
          </button>
        ) : (
          <button
            className=" h3p resetfillotp_container_button"
            //   id='bg_blue'
            //   onClick={handleResetTime}
          >
            <span>ResendOTP</span> <FcClock />
          </button>
        )}
        <p className="c_blue h3p resetfillotp_container_timer">
          00:{counter < 10 ? "0" : null}
          {counter}
        </p>
      </div>
      <div className="signupind_Register_account_div">
        <label
          title="Enter your name."
          htmlFor="name"
          className="c_br labelpadd "
        >
          Please check the mail {email} to find the verification code{" "}
          <br />
          if you don’t find, please check the spam folder and don’t miss to mark
          as not spam to not miss the further mail from us.
          <br /> We respect your privecy and hence, we won’t spam.
        </label>
      </div>

      <div className="signupind_Register_button_div">
        <button
          type="submit"
          name="submit"
          className="c_w bg_blue"
          title="Click to submit your registration form."
          onClick={handleRegisterAccount}
        >
           Account Verify
        </button>
      </div>
      {/* </form> */}
      <div className="">
        <p
          style={{
            color: "#8692A6",
            margin: "10px",
            opacity: "0.3",
          }}
        >
          Or
        </p>
      </div>
      <div className="">
        <button
          name="submitWithGoogle"
          type="submit"
          className="signupind_google_button_div"
          onClick={() => setOtpSend(false)}
        >
          {/* <img src={google} alt="google icons..." /> */}
          <p>&larr; Back to edit details</p>
        </button>
      </div>
    </div>
  );
};

export default RegisterVerify;
