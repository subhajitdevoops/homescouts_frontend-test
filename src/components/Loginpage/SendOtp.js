import React from 'react';
import { Link } from "react-router-dom";

const SendOtp = ({text,handleSendOtp,emailValidator}) => {
  return (
    <>
        <div className="signupind_Register_button_div">
          {!emailValidator.test(text)?
            <button type="submit" 
            // onClick={()=>setOtp(!otp)}
            className="c_w bg_blue">
              Send OTP
            </button>: <button type="submit" 
            onClick={()=>handleSendOtp()}
            className="c_w bg_blue">
              Send OTP
            </button>}
          </div>
          {text !== "" ? null : (
            <div className="reasetpassword_warning_div">
              <p className="reasetpassword_warning_pred h3p">
                We aren't able to find this mail id in our system, please try
              </p>
              <Link to="/signup">
                <p className="reasetpassword_warning_signup h3p">Sign_up</p>
              </Link>
              <p className="reasetpassword_warning_por h3p c_br">
                Or enter another mail id
              </p>
            </div>
          )}
    </>
  )
}

export default SendOtp