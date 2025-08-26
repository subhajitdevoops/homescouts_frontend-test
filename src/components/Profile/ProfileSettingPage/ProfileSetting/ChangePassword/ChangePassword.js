import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import { MdOutlineCancel, MdVerifiedUser } from "react-icons/md";
import {
  ReUsableInput,
  ReUsableInputOtp,
  ReSentOtpTime,
  ReUsableVerifyButton,
} from "../ReUsableInput/ReUsableInput";
import { ToastContainer, toast } from "react-toastify";
import {
  API_REQ_POST,
  API_REQ_POST_WITH_TOKEN,
} from "../../../../../config/API";
import configData from "../../../../../config/config.json";

const Password =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

const ChangePassword = ({ handleCancleEditPass, Email,setEditPass }) => {
  const [otps, setOtps] = useState("");
  // console.log("otps---------------------------=", otps);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =UserTokenAvilable &&
  UserTokenAvilable.response &&
  UserTokenAvilable.response.token;;
  // const userId = UserTokenAvilable && UserTokenAvilable.response._id;

  // console.log("userToken------------------------------------>", userToken);

  const [counter, setCounter] = useState(0);
  const [style, setStyle] = useState("");
  const [verify, setVerify] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState("");
  console.log('oldPassword======>',oldPassword);
  const [newPassRep, setNewPassRep] = useState("");
  // console.log(newPassRep);
  const [newPassworderror, setNewPassworderror] = useState(false);
  const [newPassRepError, setNewPassRepError] = useState(false);
  const [getOtp, setGetOtp] = useState(true);
  const [userId, setUserId] = useState("");
  const [apiHit, setApiHit] = useState(false);


  const handleOldPassword = (e) => {
    const val = e.target.value;
    setOldPassword(val);
  };
  const handleNewPassword = (e) => {
    const val = e.target.value;
    setNewPassword(val);
  };
  const handleRepPassword = (e) => {
    const val = e.target.value;
    setNewPassRep(val);
  };
  const handleGetOtp = async () => {
    const RequestReset = {
      oldpassword: oldPassword,
      newpassword: newPassword,
      confirmpassword: newPassRep,
    };
    console.log("password RequestReset", RequestReset);
    if (newPassword !== "" && Password.test(newPassword)) {
      let ResSendOtp = await API_REQ_POST_WITH_TOKEN(
        configData.USER_CHANGE_PASSWORD_POST_URL,
        RequestReset,
        userToken
      );
      // console.log(ResSendOtp);

      if (ResSendOtp.success) {
        toast.success(`${ResSendOtp.message}`);
        console.log(ResSendOtp.message);
        setUserId(ResSendOtp._id);
        console.log("we recived Otps");
        setGetOtp(false);
        setApiHit(true);
        setCounter(40);
      } else {
        toast.error(`${ResSendOtp.message}`);
      }
    } else {
      toast.warning("please check your internet connection !");
    }
  };

  const handleVerifyPassword = async () => {
    if (!Password.test(newPassword)) {
      setNewPassworderror(true);
      toast.warning(
        "should contail min 8 character with 1 uppercase and 1 lower case character with one special character"
      );
    } else {
      setNewPassworderror(false);
      if (newPassRep !== newPassword) {
        setNewPassRepError(true);
        toast.warning("Please Give Maching Password");
      } else {
        setNewPassworderror(false);
        setNewPassRepError(false);
        // setPhoneError(false);

        if (otps && otps.length == 6) {
          const verifyOtp = {
            newpassword:newPassword,
            otp: otps,
          };
          let ResVerifyOtp = await API_REQ_POST_WITH_TOKEN(
            configData.USER_CHANGE_PASSWORD_OTP_VERIFY_POST_URL,
            verifyOtp,
            userToken
          );
          console.log(ResVerifyOtp);

          if (ResVerifyOtp.success === true) {
            toast.success(ResVerifyOtp.message);
            // console.log(ResVerifyOtp.message);
            setOtps("");
            setEditPass(false);
          } else {
            // console.log(ResVerifyOtp.message);
            toast.warning(ResVerifyOtp.message);
          }
        } else {
          toast.warning("Please check your internet connection! ");
        }
      }
    }
  };
  const handleResetTime = () => {
    setCounter(40);
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
          onClick={handleCancleEditPass}
        />
        <div className="flex_c ChangeEmail_tittle_div">
          <h6>Change passsword</h6>
        </div>
        <hr />
        <div className="ChangeEmail_Email_div">
          <ReUsableInput
            inputValue={oldPassword}
            handleInput={handleOldPassword}
            // handleEditClick
            Lable="Old Password"
            placeholder="Old Password"
            InputType="password"
            // GetOtpButton={true}
            Error={false}
            // disabled={true}
            // VerifyIcon={false}
            // message="should contail min 8 character with 1 uppercase and 1 lower case character with one special character"
          />
          <ReUsableInput
            inputValue={newPassword}
            handleInput={handleNewPassword}
            // handleEditClick
            Lable="New Password"
            placeholder="New Password"
            InputType="password"
            //   GetOtpButton={true}
            Error={newPassworderror}
            VerifyIcon={false}
            // message="should contail min 8 character with 1 uppercase and 1 lower case character with one special character"
          />
          <ReUsableInput
            inputValue={newPassRep}
            handleInput={handleRepPassword}
            // handleEditClick
            Lable="Re-enter New Password"
            placeholder="New Password"
            InputType="password"
            GetOtpButton={
              newPassRep === newPassword && Password.test(newPassword) && getOtp
                ? true
                : false
            }
            Error={newPassRepError}
            VerifyIcon={false}
            handleGetOtp={handleGetOtp}
            // message="should contail min 8 character with 1 uppercase and 1 lower case character with one special character"
          />
          <ReUsableInputOtp
            inputValue="Password"
            // handleInput
            // handleEditClick
            Lable="Enter OTP"
            // GetOtpButton={false}
            // Error={true}
            VerifyIcon={false}
            message="Please enter the correct otp"
            otp={otps}
            setOtp={setOtps}
            style={style}
            setStyle={setStyle}
            setVerify={setVerify}
          />
          <ReSentOtpTime counter={counter} handleResetTime={handleGetOtp}  AfterApiHIt={apiHit} />
        </div>
        <ReUsableVerifyButton
          buttonName="verify OTP"
          verify={otps.length === 6 ? true : false}
          handleButton={handleVerifyPassword}
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

export default ChangePassword;
