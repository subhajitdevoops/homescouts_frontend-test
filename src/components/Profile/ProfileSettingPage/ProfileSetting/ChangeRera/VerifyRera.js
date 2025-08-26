import React, { useState, useEffect } from "react";
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

const phoneValidation = /^[56789]\d{9}$/;

const VerifyRera = ({
  handleCancleEditRera,
  oldRera,
  setEditRera,
  getProfileDetails,
}) => {
  const [otps, setOtps] = useState("");
  console.log("otps---------------------------=", otps);

  const [counter, setCounter] = useState(0);
  const [style, setStyle] = useState("");
  const [verify, setVerify] = useState(false);
  // const [oldPhone, setOldPhone] = useState("0123456789");
  const [newPhone, setNewPhone] = useState("");
  const [newPhoneerror, setNewPhoneerror] = useState(false);
  const [getOtp, setGetOtp] = useState(true);
  const [userId, setUserId] = useState("");
  const [apiHit, setApiHit] = useState(true);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  const UserIds = UserTokenAvilable && UserTokenAvilable.response._id;
  const UserEmail = UserTokenAvilable && UserTokenAvilable.response.email;
  const UserEmails = UserTokenAvilable && UserTokenAvilable.response;

  console.log(
    "UserEmail------------------------------------>",
    UserEmails,
    UserEmail
  );

  const handleNewPhone = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    const val = e.target.value;
    console.log(e.target.value);
    if (val.length > 10) {
      console.log(newPhone);
    } else {
      setNewPhone(val);
    }
    setNewPhoneerror(false);
  };

  const handleGetOtp = async () => {
    const RequestReset = {
      userId: UserIds,
      route: "otp",
      oldnumber: oldRera,
      newnumber: newPhone,
    };
    if (newPhone !== "" && phoneValidation.test(newPhone)) {
      let ResSendOtp = await API_REQ_POST_WITH_TOKEN(
        configData.USER_CHANGE_PHONE_POST_URL,
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
        toast.error(`${ResSendOtp.message}`);
      }
    } else {
      toast.warning("Please give valid mobile number ");
    }
  };

  const handleVerifyPhone = async () => {
    if (!phoneValidation.test(newPhone)) {
      setNewPhoneerror(true);
      toast.warning("Please give user's Valide Phone");
    } else {
      setNewPhoneerror(false);
      // setPhoneError(false);
      if (otps && otps.length == 6) {
        const verifyOtp = {
          userId: UserIds,
          email: UserEmail,
          newnumber: newPhone,
          otp: otps,
        };
        let ResVerifyOtp = await API_REQ_POST_WITH_TOKEN(
          configData.USER_CHANGE_PHONE_OTP_VERIFY_POST_URL,
          verifyOtp,
          userToken
        );
        console.log(ResVerifyOtp);

        if (ResVerifyOtp.success === true) {
          toast.success(ResVerifyOtp.message);
          // console.log(ResVerifyOtp.message);
          setOtps("");
          setEditRera(false);
          getProfileDetails();
        } else {
          // console.log(ResVerifyOtp.message);
          toast.warning(ResVerifyOtp.message);
        }
      } else {
        toast.warning("Please give valid mobile number ");
      }
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
          onClick={handleCancleEditRera}
        />
        <div className="flex_c ChangeEmail_tittle_div">
          <h6>Update your RERA number</h6>
        </div>
        <hr />
        <div className="ChangeEmail_Email_div">
          <ReUsableInput
            inputValue={newPhone}
            handleInput={handleNewPhone}
            // handleEditClick
            Lable="RERA No."
            placeholder="Enter RERA number..."
            InputType="tel"
            GetOtpButton={
              phoneValidation.test(newPhone) && getOtp ? true : false
            }
            Error={newPhoneerror}
            VerifyIcon={false}
            handleGetOtp={handleGetOtp}
            // message="Verify to change status got Error Verify to change status got Error Verify to change status got Error"
          />
          <ReUsableInputOtp
            // handleInput
            // handleEditClick
            Lable="Verify otp"
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
          <ReSentOtpTime
            counter={counter}
            handleResetTime={handleGetOtp}
            AfterApiHIt={apiHit}
          />
        </div>
        <ReUsableVerifyButton
          buttonName="Update RERA"
          verify={otps.length === 6 ? true : false}
          handleButton={handleVerifyPhone}
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

export default VerifyRera;
