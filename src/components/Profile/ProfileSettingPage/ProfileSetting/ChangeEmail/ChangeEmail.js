import React, { useState, useEffect } from "react";
import "./ChangeEmail.css";
import { MdOutlineCancel, MdVerifiedUser } from "react-icons/md";
import {
  ReUsableInput,
  ReUsableInputOtp,
  ReSentOtpTime,
  ReUsableVerifyButton,
} from "../ReUsableInput/ReUsableInput";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_POST, API_REQ_POST_WITH_TOKEN } from "../../../../../config/API";
import configData from "../../../../../config/config.json";

const emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneValidation = /^[789]\d{9}$/;

const ChangeEmail = ({ handleCancleEditmail, oldEmail, setEditMail,setLoginWithNewMail,getProfileDetails }) => {
  const [otps, setOtps] = useState("");
  console.log("otps---------------------------=", otps);

  // const [otp, setOtp] = useState(new Array(6).fill(""));
  const [counter, setCounter] = useState(0);
  const [style, setStyle] = useState("");
  const [verify, setVerify] = useState(false);
  // const [oldEmail, setOldEmail] = useState("ab@c.com");
  const [newEmail, setNewEmail] = useState("");
  const [newEmailerror, setNewEmailerror] = useState("");
  const [getOtp, setGetOtp] = useState(true);
  const [userId, setUserId] = useState("");
  const [apiHit, setApiHit] = useState(false);


  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =UserTokenAvilable &&
  UserTokenAvilable.response &&
  UserTokenAvilable.response.token;;
  // const userId = UserTokenAvilable && UserTokenAvilable.response._id;

  // console.log("userToken------------------------------------>", userToken);
  const handleOldEmail = (e) => {
    // const val = e.target.value;
    // setOldEmail(val);
  };
  const handleNewEmail = (e) => {
    const val = e.target.value;
    setNewEmail(val);
    setNewEmailerror(false);
  };
  const handleResetTime = () => {
    setCounter(40);
  };

  const handleGetOtp = async () => {
    // console.log("we recived Otps");

    const RequestReset = {
      oldemail: oldEmail,
      newemail: newEmail,
    };
    if (newEmail !== "" && emailValidator.test(newEmail)) {
      let ResSendOtp = await API_REQ_POST_WITH_TOKEN(
        configData.USER_CHANGE_EMAIL_POST_URL,
        RequestReset,
        userToken
      );
      // console.log(ResSendOtp);

      if (ResSendOtp.success) {
        toast.success(`${ResSendOtp.message}`);
        console.log(ResSendOtp.message);
        // setOtp(true);
        // setResId(ResSendOtp);
        setUserId(ResSendOtp._id);
        console.log("we recived Otps");
        setGetOtp(false);
        setApiHit(true);
        setCounter(40);
      } else {
        console.log(ResSendOtp.message);
        toast.error(`${ResSendOtp.message}`);
      }
    } else {
      toast.warning("please give valid email");
    }
  };

  const handleVerifyEmail = async () => {
    if (!emailValidator.test(newEmail)) {
      setNewEmailerror(true);
      toast.warning("Please give user's Valide Email");
    } else {
      setNewEmailerror(false);
      // setPhoneError(false);

      if (otps && otps.length == 6) {
        const verifyOtp = {
          otp: otps,
          newemail: newEmail,
        };
        let ResVerifyOtp = await API_REQ_POST_WITH_TOKEN(
          configData.USER_CHANGE_EMAIL_OTP_VERIFY_POST_URL,
          verifyOtp,
          userToken
        );
        console.log(ResVerifyOtp);

        if (ResVerifyOtp.success === true) {
          toast.success(ResVerifyOtp.message);
          console.log('ResVerifyOtp==>',ResVerifyOtp);
          setOtps("");
          setLoginWithNewMail(true)
          setEditMail(false);
          getProfileDetails()

        } else {
          // console.log(ResVerifyOtp.message);
          toast.warning(ResVerifyOtp.message);
        }
      } else {
        toast.warning("Please give valid email ");
      }
      // toast.success("You have successfully Changed");
    }
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <div className="ChangeEmail_main_container_div">
      <div className="ChangeEmail_container_div">
        <MdOutlineCancel
          className="ChangeEmail_cancel_div"
          onClick={handleCancleEditmail}
        />
        <div className="flex_c ChangeEmail_tittle_div">
          <h6>Change your mail</h6>
        </div>
        <hr />
        <div className="ChangeEmail_Email_div">
          <ReUsableInput
            inputValue={oldEmail}
            handleInput={handleOldEmail}
            // handleEditClick
            Lable="Old Email"
            placeholder="user@homescouts.com"
            InputType="text"
            // GetOtpButton={true}
            Error={false}
            disabled={true}
            // VerifyIcon={false}
            // message="Email is not correct please check the email that you have entered"
          />
          <ReUsableInput
            inputValue={newEmail}
            handleInput={handleNewEmail}
            // handleEditClick
            Lable="New Email"
            placeholder="user_new@homescouts.com"
            InputType="text"
            GetOtpButton={
              emailValidator.test(newEmail) && getOtp ? true : false
            }
            Error={newEmailerror}
            VerifyIcon={false}
            handleGetOtp={handleGetOtp}
            // message="Verify to change status got Error Verify to change status got Error Verify to change status got Error"
          />
          <ReUsableInputOtp
            inputValue="Password"
            // handleInput
            // handleEditClick
            Lable="Enter OTP"
            // GetOtpButton={false}
            // Error={true}
            VerifyIcon={false}
            // message="Please enter the correct otp"
            otp={otps}
            setOtp={setOtps}
            style={style}
            setStyle={setStyle}
            setVerify={setVerify}
          />
          <ReSentOtpTime counter={counter} handleResetTime={handleGetOtp} 
            AfterApiHIt={apiHit}
            />
        </div>
        <ReUsableVerifyButton
          buttonName="Reset mail"
          verify={otps.length === 6 ? true : false}
          handleButton={handleVerifyEmail}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseonhover
      />
    </div>
  );
};

export default ChangeEmail;
