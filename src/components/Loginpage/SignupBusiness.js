import React, { useState, useEffect } from "react";
import "../../assets/signup/Signup.css";
import {
  AiOutlineArrowLeft,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import img3 from "../../assets/Logo.svg";
import img4 from "../../assets/signup/Group 134.png";
import img5 from "../../assets/signup/Group 124.png";
import img6 from "../../assets/signup/Ellipse 44.png";
import img7 from "../../assets/signup/Group 136.png";
import img8 from "../../assets/signup/Group.png";
import google from "../../assets/signup/flat-color-icons_google.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import RegisterVerify from "./RegisterVerify";
import configData from "../../config/config.json";
import { API_REQ_POST } from "../../config/API";
import { NavLink } from "react-router-dom";
// import GoogleLogin from "react-google-login";
import Cookies from "js-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

const FullName = /^[A-Za-z. ]{3,30}$/;
const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Password =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

const Google = () => {
  const navigate = useNavigate();
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google credentialResponse", credentialResponse.credential);
      // // var token = "eyJ0eXAiO.../// jwt token";
      // const decoded = jwt_decode(credentialResponse.credential);
      // console.log("Google decoded", decoded);
      // console.log("Google credentialResponse", credentialResponse);
      const googleData = {
        credential: credentialResponse.credential,
        user_type: "business",
      };

      if (credentialResponse) {
        const ResLogin = await API_REQ_POST(
          configData.REGISTRATION_WITH_GOOGLE_URL,
          googleData
        );
        console.log(ResLogin);

        if (ResLogin) {
          if (ResLogin.success === true) {
            toast.success(ResLogin.message);
            localStorage.setItem("accessToken", JSON.stringify(ResLogin));
            setTimeout(() => {
              navigate("/", { replace: true });
              window.location.reload();
            }, 3000);
            // setTimeout(() => {
            //   navigate("/login", { replace: true });
            // }, 3000);
          } else {
            toast.warning(ResLogin.message);
          }
        } else {
          toast.error(ResLogin.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      text={"signup_with"}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

const SignupBusiness = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [loginState, setLoginState] = useState("Register Account");
  const [businessUserData, setBusinessUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    userType: "business",
  });
  // console.log(businessUserData);

  const [response, setResponse] = useState({});
  const [TermAndCondition, setTermAndCondition] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  console.log("otpSend->", otpSend);
  const [counter, setCounter] = useState(0);
  const [verifyOtp, setVerifyOtp] = useState("");

  const UpdateTC = (e) => {
    setTermAndCondition(e.target.checked);
  };
  const navigate = useNavigate();
  // ---------------------------------------------------------
  const styleError = { color: "red", paddingLeft: "20px", cursor: "text" };
  const eyeIconStyle = {
    color: "black",
    fontSize: "18px",
    height: "fit-content",
  };
  // --------------------------------------------------------
  // =========== naviagtion from signup page to login page after 3s for toast message ===================
  useEffect(() => {
    if (response.success) {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    }
  }, [response, navigate]);

  const handleBusinessData = (event) => {
    const field = event.target.getAttribute("name");
    const fieldvalue = event.target.value;
    const newFormData = { ...businessUserData, [field]: fieldvalue };
    setBusinessUserData(newFormData);
    // =========== for error message removing during edit the fields =============
    setErrorMessage({ ...errorMessage, [field + "Error"]: "" });
    if (field === "confirmpassword") {
      setErrorMessage({ ...errorMessage, passwordError: "" });
    }
  };

  // --------------------------------------------------------
  const handleSubmission = (e) => {
    e.preventDefault();
    const error = {};
    // ---------- Name error ---------
    if (businessUserData.name.length === 0) {
      error.nameError = "Please enter your name.";
    } else if (businessUserData.name.length < 3) {
      error.nameError = "Please enter atleast 3 character.";
    } else if (!FullName.test(businessUserData.name)) {
      error.nameError = "Remove special character.";
    }
    // --------- Email error ------------
    if (businessUserData.email.length === 0) {
      error.emailError = "Please enter your email.";
    } else if (!emailValidator.test(businessUserData.email)) {
      error.emailError = "Please enter correct email.";
    }
    // --------- password error ------
    if (businessUserData.password.length === 0) {
      error.passwordError = "Please enter password";
    } else if (
      businessUserData.password.length < 8 ||
      businessUserData.password.length > 15
    ) {
      error.passwordError = "Password must be 8 to 15 characters.";
    } else if (!Password.test(businessUserData.password)) {
      error.passwordError = "Password will be this format: Abc@123.";
    } else if (businessUserData.confirmpassword.length === 0) {
      error.passwordError = "Please enter confirm password.";
    } else if (businessUserData.password !== businessUserData.confirmpassword) {
      error.passwordError = "Your confirm password is not match.";
    }

    // ----------- term and condition error -----------
    if (!TermAndCondition) {
      error.TCerror = "Please accept T&C.";
    }
    // -------- Sending data to api ---------
    if (Object.keys(error).length === 0) {
      handleFormError();
    } else {
      setErrorMessage(error);
    }
  };

  // ---------------------------------------------------------------
  const handleFormError = async () => {
    // -------- Sending data to api ---------
    // if (Object.keys(error).length === 0) {
    setLoginState("Please wait...");
    const User_data = {
      name: `${businessUserData.name}`,
      email: `${businessUserData.email}`,
      password: businessUserData.password,
      confirmpassword: businessUserData.confirmpassword,
      user_type: `${businessUserData.userType}`,
      termandcondition: TermAndCondition,
    };
    // response from API---------------
    let ResBusiness = await API_REQ_POST(
      configData.REGISTRATION_INDIVIDUAL_URL,
      User_data
    );
    console.log(ResBusiness);
    if (ResBusiness) {
      setLoginState("Register Account");
      if (ResBusiness.success === true) {
        if (ResBusiness.is_verified === true) {
          setResponse(ResBusiness);
        } else {
          setOtpSend(true);
        }
        toast.success(ResBusiness.message);
        // setOtpSend(true);
        setCounter(40);
        // handleCounter()
      } else {
        toast.warning(ResBusiness.message);
      }
      // console.log("setDefaultMessage........ ", ResBusiness);
    } else {
      toast.error("Some Thing Wrong! Please Check Your Internet");
    }
    // setEditMessageId(null);
    // }
    // return error;
  };

  // -----------------------------------------------------------------------------
  const handleRegisterVerify = (e) => {
    const val = e.target.value;
    setVerifyOtp(val);
  };
  const handleRegisterAccount = async () => {
    const business_data_otp = {
      otp: verifyOtp,
      email: `${businessUserData.email}`,
    };
    let ResBusinessOtp = await API_REQ_POST(
      configData.REGISTRATION_INDIVIDUAL_OTP_URL,
      business_data_otp
    );
    if (ResBusinessOtp) {
      console.log("RegisterIndividualAccount! res=", ResBusinessOtp);
      setResponse(ResBusinessOtp); //<<--------
      if (ResBusinessOtp.success === true) {
        toast.success(ResBusinessOtp.message);
        setResponse(ResBusinessOtp);
      } else {
        toast.warning(ResBusinessOtp.message);
      }
    } else {
      toast.error("Some Thing Wrong! Please Check Your Internet");
    }
  };


  const handleResetTime = async () => {
    if (counter === 0) {
      setCounter(40);
      const User_data = {
        email: `${businessUserData.email}`,
        password: businessUserData.password,
        confirmpassword: businessUserData.confirmpassword,
        user_type: `${businessUserData.userType}`,
        termandcondition: TermAndCondition,
      };
      // response from API---------------
      let ResBusiness = await API_REQ_POST(
        configData.REGISTRATION_INDIVIDUAL_URL,
        User_data
      );
      console.log(ResBusiness);
      if (ResBusiness) {
        // setOtpSend(true);
        if (ResBusiness.success === true) {
          toast.success(ResBusiness.message);
          setOtpSend(true);
        } else {
          toast.warning(ResBusiness.message);
        }
        // console.log("setDefaultMessage........ ", ResBusiness);
      } else {
        toast.error(ResBusiness.message);
        // setEditMessageId(null);
      }
    }
  };
  useEffect(() => {
    if (otpSend === true) {
      console.log("counter true");
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
  
  }, [counter]);
  return (
    <div>
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
      <img src={img7} alt="corner img..." id="image_corner_elips" />
      <div className="container">
        <div className="flex_c signup_main_container_div">
          <div className=" signup_container_div">
            <div className="bg_og signup_container1_div signupbuss_container1_div">
              <div>
                <div className="signup_container23_div ">
                  <NavLink to={"/"} className="homescoutLogo">
                    <img src={img3} alt="houselogo..." id="signup_image11" />
                  </NavLink>
                  <img src={img8} alt="dots..." id="signup_image11_dots" />
                  <img src={img4} alt="houselogo..." id="signup_image12" />
                  <img src={img8} alt="dots..." id="signup_image12_dots" />
                  <p className="c_w">
                    HomeScouts,100% Housing Solution for you
                  </p>
                  <img src={img5} alt="houselogo..." id="signup_image13" />
                </div>
              </div>
            </div>
            <div className="signup_container2_div">
              <div>
                <div className="signup_container2_color_div signupbus_Forcolor_color_div"></div>
                <div className="signup_container2_mobile_div">
                  <img src={img5} alt="houselogo..." id="signup_image13" />
                  <NavLink to={"/"} className="">
                    <img src={img3} alt="houselogo..." id="signup_image11" />
                  </NavLink>
                </div>
                <div className="flex_c mt-3 signup_Already_account_div">
                  <Link to="/signup">
                    <div className="signupind_backbutton_div  signupbuss_backbutton_div ">
                      <AiOutlineArrowLeft className="c_blue" />
                    </div>
                  </Link>
                  <p className=" signup_Already_account signupind_Already_account">
                    Already have an account?&nbsp;
                    <Link to="/login">
                      <span className="c_blue signupind_Already_account_span">
                        Sign In
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex_c s ignupind_register_main_account_div">
                <div className=" signup_join_us_div">
                  <div className="signup_joinus_div signupind_joinus_div">
                    <h3>
                      Register&nbsp;<span className="c_og">Business</span>
                      &nbsp;Account!
                    </h3>
                    {otpSend === true ? (
                      <br />
                    ) : (
                      <p className="h3p c_br">
                        For the purpose of providing best service,your details
                        are required.
                      </p>
                    )}
                  </div>
                  {otpSend === true ? (
                    <RegisterVerify
                      setOtpSend={setOtpSend}
                      handleResetTime={handleResetTime}
                      counter={counter}
                      handleRegisterAccount={handleRegisterAccount}
                      handleRegisterVerify={handleRegisterVerify}
                      verifyOtp={verifyOtp}
                    />
                  ) : (
                    <div className="flex_c signupind_Prosonal_account_div">
                      <form className="w-100" onSubmit={handleSubmission}>
                        <div className="signupind_Register_account_div">
                          <label htmlFor="name" className="c_br labelpadd">
                            Your fullname*
                            <span style={styleError}>
                              {errorMessage.nameError}
                            </span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={businessUserData.name}
                            placeholder="Enter Your Name"
                            onChange={handleBusinessData}
                            className={`p-2`}
                            id="name"
                          />
                        </div>
                        <div className="signupind_email_address_account_div">
                          <label htmlFor="email" className="labelpadd">
                            Email address*
                            <span style={styleError}>
                              {errorMessage.emailError}
                            </span>
                          </label>
                          <input
                            type="text"
                            name="email"
                            value={businessUserData.email}
                            placeholder="Enter email address"
                            onChange={handleBusinessData}
                            className={`p-2`}
                            id="email"
                          />
                        </div>
                        <div className="signupind_password_account_div">
                          <label htmlFor="password" className="labelpadd">
                            Create password*
                            <span style={styleError}>
                              {errorMessage.passwordError}
                            </span>
                          </label>
                          <div className="flex_c signupind_password_div">
                            <div className="flex_c signupind_enpassword_div">
                              <input
                                type={
                                  showPassword === true ? "text" : "password"
                                }
                                name="password"
                                value={businessUserData.password}
                                placeholder="Enter strong password."
                                onChange={handleBusinessData}
                                className={`p-2`}
                                id="password"
                              />
                              <span
                                style={eyeIconStyle}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {" "}
                                {showPassword ? (
                                  <AiFillEyeInvisible
                                    style={{ color: "red" }}
                                  />
                                ) : (
                                  <AiFillEye />
                                )}
                              </span>
                            </div>
                            <div className="flex_c signupind_repassword_div">
                              <input
                                type={
                                  showConfirmPassword === true
                                    ? "text"
                                    : "password"
                                }
                                name="confirmpassword"
                                value={businessUserData.confirmpassword}
                                placeholder="Enter confirm password."
                                onChange={handleBusinessData}
                                className={`p-2`}
                              />
                              <span
                                style={eyeIconStyle}
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {" "}
                                {showConfirmPassword ? (
                                  <AiFillEyeInvisible
                                    style={{ color: "red" }}
                                  />
                                ) : (
                                  <AiFillEye />
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className=" signupind_termcondition_div">
                          <input
                            id="ch"
                            checked={TermAndCondition}
                            title="Please click to accept Terms and Conditions"
                            onChange={UpdateTC}
                            type="checkbox"
                          />
                          <label htmlFor="ch" className="h3p c_br">
                            I agree to{" "}
                            <NavLink to="/term-condition">
                              <span style={{ color: "#1565d8" }}>
                                Terms & Conditions.
                              </span>
                            </NavLink>
                            <span style={styleError}>
                              {errorMessage.TCerror}
                            </span>
                          </label>
                        </div>
                        <div className="signupind_Register_button_div">
                          <button type="submit" className="c_w bg_blue">
                            {loginState}
                          </button>
                        </div>
                      </form>
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
                        {/* <button
                          name="submitWithGoogle"
                          type="submit"
                          className="signupind_google_button_div"
                        >
                          <img src={google} alt="google icons..." />
                          <p>Register with Google</p>
                   
                        </button> */}
                        {/* <GoogleLogin
                          clientId="67773642298-0koi3iih77bo0i29v13spa2agde53fap.apps.googleusercontent.com"
                          onSuccess={responseGoogle}
                          buttonText="Login with Google"
                          onFailure={responseGoogle}
                          cookiePolicy={"single_host_origin"}
                        /> */}
                        <GoogleOAuthProvider
                          clientId={configData.GOOGLE_LOGIN_CLIENT_ID}
                        >
                          <Google />
                        </GoogleOAuthProvider>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="signup_elips_div signupind_elips_div">
                <img src={img6} alt="Elips..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupBusiness;
