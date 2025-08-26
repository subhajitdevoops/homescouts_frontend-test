import React, { useState, useEffect } from "react";
import { MdOutlineCancel, MdVerifiedUser } from "react-icons/md";
import {
  ReUsableInput,
  ReUsableInputOtp,
  ReSentOtpTime,
  ReUsableVerifyButton
} from "../ReUsableInput/ReUsableInput";

const VerifyEmail = ({handleCancle}) => {
  const [otps,setOtps]=useState('');console.log('otps---------------------------=',otps);
  // const [otp, setOtp] = useState(new Array(6).fill(""));
  const [counter, setCounter] = useState(0);
  const [style, setStyle] = useState("");
  const [verify,setVerify]=useState(false);

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
        <MdOutlineCancel className="ChangeEmail_cancel_div"
        onClick={handleCancle} />
        <div className="flex_c ChangeEmail_tittle_div">
          <h6>Confirm your mail</h6>
        </div>
        <hr />
        <div className="ChangeEmail_Email_div">
          <ReUsableInput
            inputValue="user@homescouts.com"
            // handleInput
            // handleEditClick
            Lable="Email"
            placeholder="user@homescouts.com"
            InputType="text"
            // GetOtpButton={true}
            // Error={true}
            // VerifyIcon={false}
            message="Email is not correct please check the email that you have entered"
          />
          <ReUsableInputOtp
            inputValue="Password"
            // handleInput
            // handleEditClick
            Lable="Verify mail"
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
         handleResetTime={handleResetTime}  />
        </div>
        <ReUsableVerifyButton 
        buttonName='Verify Email'
        verify={verify}
        />
      </div>
    </div>
  )
}

export default VerifyEmail