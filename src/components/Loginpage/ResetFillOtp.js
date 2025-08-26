import React, { useEffect, useState } from "react";
import { FcClock } from "react-icons/fc";
import "../../assets/signup/Signup.css";
import OtpInput from "react-otp-input-rc-17";
import { API_REQ_POST } from "../../config/API";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";

const ResetFillOtp = ({ newpas, setNewpas, text,resId }) => {
  const [otps, setOtps] = useState();
  // const [otp, setOtp] = useState(new Array(6).fill(""));
  const [counter, setCounter] = useState(40);
  // const [style, setStyle] = useState("");
  const [verify, setVerify] = useState(false);

  console.log(otps);
  // const handleChange = (element, index) => {
  //   if (isNaN(element.value)) return false;

  //   if (index == otp.length - 1) {
  //     element.value != "" ? setStyle("grnbd") : setStyle("redbd");
  //     element.value != "" ? setVerify(true) : setVerify(false);
  //   } else {
  //     setStyle("");
  //     element.classList.add("redbd");
  //   }

  //   setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

  //   if (element.nextSibling) {
  //     element.nextSibling.focus();
  //   }
  //   if (element.keyCode === 8) {
  //   }
  // };
  // const onKeyDown = (e,index) => {
  //   if (e.keyCode === 8) {
  //     // setOtp([...otp.map((d, idx) => (idx === index ? e.value : ''))]);

  //     if(e.target.value== ''){
  //       if (e.target.previousSibling) {
  //         e.target.previousSibling.focus();
  //     setOtp([...otp.map((d, idx) => (idx === index ? e.value : d))]);

  //       }

  //     }

  //   }

  //   // if (e.key === "Backspace" || e.key === "Delete") {
  //   //   const allOtp=[...otp].filter((item,index)=>index==index)
  //   //   console.log('allOtp',index);
  //   // }
  // };

  const handleChangeotp = (otp, index) => {
    // console.log('otp',otp.length);
    setOtps(otp);
    // console.log('handleChangeotp',e.target.value);
    // if (index == otps.length - 1) {
    //   otp != "" ? setStyle("grnbd") : setStyle("redbd");
    //   otp != "" ? setVerify(true) : setVerify(false);
    // } else {
    //   setStyle("");
    //   // otp.classList.add("redbd");
    // }
    // if(otps.length == 6){
    //   setVerify(true)
    // }
  };

  // const handleResetTime = () => {
  //   setCounter(40);
  // };
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleResendOtp= async ()=>{
    if (counter==0 ) {
      const verifyOtp = {
        email: `${text}`,
      };
      let ResVerifyOtp = await API_REQ_POST(
        configData.MAIL_RESET_PASSWORD_URL,
        verifyOtp
      );
      console.log(ResVerifyOtp);

      if (ResVerifyOtp.success===true) {
        toast.success(ResVerifyOtp.message);
        console.log(ResVerifyOtp.message);
        setCounter(40);
      } else {
        console.log(ResVerifyOtp.message);
        toast.error(ResVerifyOtp.message);
      }
    }
  }

  const handleVerify = async() => {
    if (otps && otps.length == 6 ) {
      const verifyOtp = {
        _id: `${resId._id}`,
        otp: otps,
      };
      let ResVerifyOtp = await API_REQ_POST(
        configData.RESET_PASSWORD_VERIFY_OTP,
        verifyOtp
      );
      console.log(ResVerifyOtp);

      if (ResVerifyOtp.success===true) {
        toast.success(ResVerifyOtp.message);
        console.log(ResVerifyOtp.message);
        setNewpas(true);
        setCounter(40);
      } else {
        console.log(ResVerifyOtp.message);
        toast.error(ResVerifyOtp.message);
      }
    } else {
      toast.warning("Please Fill OTP");
    }
  };
  

  return (
    <div className="resetfillotp_main_container_div">
      <p className="c_br">OTP</p>
      <div className="flex_c resetfillotp_container_div">
        <OtpInput
          value={otps}
          onChange={handleChangeotp}
          numInputs={6}
          separator={<span> </span>}
          inputStyle={`inputStyle_react_otp_input  ${
            otps && otps.length == "6" ? "grnbd" : ""
          }`}
          hasErrored={true}
          isInputNum={true}
          // isInputSecure={true}
          // data-testid={true}
          // data-cy={true}
        />

        {/* {otp.map((data, index) => {
          return (
            <input
              maxLength="1"
              name="otp"
              className={style}
              value={data}
              key={index}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={onKeyDown}
            />
          );
        })} */}
      </div>
      <div className="flex_c resetfillotp_container_buttontimer_div">
        <button
          className=" h3p resetfillotp_container_button"
          id={counter === 0 ? "bg_blue" : null}
          onClick={handleResendOtp}
        >
          <span>ResendOTP</span> <FcClock />
        </button>
        <p className="c_blue h3p resetfillotp_container_timer">
          00:{counter < 10 ? "0" : null}
          {counter}
        </p>
      </div>
      <button
        className="bg_blue c_w resetfillotp_verify_button "
        onClick={handleVerify}
      >
        Verify
      </button>
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
  );
};

export default ResetFillOtp;
