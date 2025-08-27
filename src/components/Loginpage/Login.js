import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import img3 from "../../assets/Logo.svg";
import img6 from "../../assets/signup/Ellipse 44.png";
import img5 from "../../assets/signup/Group 124.png";
import img4 from "../../assets/signup/Group 134.png";
import img7 from "../../assets/signup/Group 136.png";
import img8 from "../../assets/signup/Group.png";
import "../../assets/signup/Signup.css";
import { API_REQ_POST } from "../../config/API";
import configData from "../../config/config.json";
// import { GoogleLogin } from "react-google-login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NavLink } from "react-router-dom";
// import Google from './google';
import { GoogleLogin } from "@react-oauth/google";
import ResetFillOtp from "../ResetFillOtp/ResetFillOtp";

const Google = () => {
  const navigate = useNavigate();
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google credentialResponse", credentialResponse.credential);
      // // var token = "eyJ0eXAiO.../// jwt token";
      // const decoded = jwt_decode(credentialResponse.credential);
      // console.log("Google decoded", decoded);
      // console.log("Google credentialResponse", credentialResponse);

      if (credentialResponse) {
        const ResLogin = await API_REQ_POST(configData.USER_GOOGLE_LOGIN_URL, {
          credential: credentialResponse.credential,
        });
        console.log(ResLogin);

        if (ResLogin) {
          if (ResLogin.success === true) {
            toast.success(ResLogin.message);
            localStorage.setItem("accessToken", JSON.stringify(ResLogin));
            setTimeout(() => {
              navigate("/", { replace: true });
              window.location.reload();
            }, 1000);
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
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
  // const url = "http://localhost:9000/user/login";

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [response, setResponse] = useState({});
  const [loginState, setLoginState] = useState("Login Account");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  // const getToken = JSON.parse(localStorage.getItem("accessToken"));
  // console.log("getToken>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",getToken)
  // localStorage.clear("accessToken");
  const [remember, setRemember] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [resIdForOtp, setResIdForOtp] = useState(null);

  const navigate = useNavigate();
  // ---------------------------------------------------------
  const styleError = {
    color: "red",
    paddingLeft: "20px",
    cursor: "text",
    fontSize: "11px",
  };
  const eyeIconStyle = {
    color: "black",
    fontSize: "18px",
    top: "9px",
    right: "10px",
  };
  // ------------------------------------------------------------
  useEffect(() => {
    if (response.success) {
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 1000);
    }
  }, [response, navigate]);

  // -----------------------------------------------------------
  const handleLoginPage = (event) => {
    const field = event.target.getAttribute("name");
    const fieldvalue = event.target.value;
    setLoginInfo((old) => {
      return { ...old, [field]: fieldvalue };
    });

    // =========== for error message removing during edit the fields =============
    setErrorMessage((old) => {
      return { ...errorMessage, [field + "Error"]: "" };
    });
  };

  const handleLogin = () => {
    const error = {};
    if (loginInfo.email.length === 0) {
      error.emailError = "Please enter registered email.";
    } else if (!emailValidator.test(loginInfo.email)) {
      error.emailError = "Please enter correct email.";
    }
    if (loginInfo.password.length === 0) {
      error.passwordError = "Please enter password.";
    }
    if (Object.keys(error).length === 0) {
      handleError();
    } else {
      setErrorMessage(error);
    }
    // setErrorMessage(handleError());
  };
  const handleError = async () => {
    setLoginState("Please wait...");
    const Login_data = {
      email: loginInfo.email,
      password: loginInfo.password,
    };
    
    let ResLogin = await API_REQ_POST(configData.USER_LOGIN_URL, Login_data);
    console.log(ResLogin);
    
    if (ResLogin) {
      setLoginState("Login Account");
      if (ResLogin.success === true) {
        // Normal login success - keep existing code unchanged
        toast.success(ResLogin.message);
        localStorage.setItem("accessToken", JSON.stringify(ResLogin));
        setResponse(ResLogin);
        if (remember) {
          Cookies.set("accessToken", ResLogin.response.token, { expires: 7 });
        }
      } else {
        // Check if message indicates OTP verification needed
        if (ResLogin.message && (
          ResLogin.message.toLowerCase().includes("verify") ||
          ResLogin.message.toLowerCase().includes("otp") ||
          ResLogin.message.toLowerCase().includes("verification")
        )) {
          // Redirect to OTP verification without changing existing flow
          navigate("/reset-password");
        } else {
          // Keep existing error handling unchanged
          toast.warning(ResLogin.message);
        }
      }
    } else {
        toast.error("Please Check Your Internet Connection !");
    }
  };
  // -------------------------login with google-----------------------------
  const responseGoogle = (response) => {
    console.log(response);
    // const accessToken = response.accessToken;

    // // Save the access token in localStorage
    // if (!response) {
    //   localStorage.setItem('accessToken', accessToken);
    //   Cookies.set('accessToken', accessToken, { expires: 7 })
    //   setTimeout(() => {
    //     navigate("/", { replace: true });
    //     window.location.reload();
    //   }, 1000);
    // }
  };

  // If OTP verification is required, show the OTP verification component
  if (showOtpVerification) {
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
        
        {/* Add a back button to return to login */}
        <div style={{ padding: "20px", textAlign: "center" }}>
          <button 
            onClick={() => setShowOtpVerification(false)}
            style={{
              background: "none",
              border: "1px solid #007bff",
              color: "#007bff",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            ← Back to Login
          </button>
        </div>
        
        {/* OTP Verification Component */}
        <ResetFillOtp
          newpas={false}
          setNewpas={() => {
            // After successful OTP verification, redirect to login
            setShowOtpVerification(false);
            toast.success("Email verified successfully! Please login again.");
          }}
          text={emailForOtp}
          resId={resIdForOtp}
        />
      </div>
    );
  }

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
            <div className="bg_og signup_container1_div login_container1_div">
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
                <div className="signup_container2_color_div login_Forcolor_color_div"></div>
                <div className="signup_container2_mobile_div">
                  <img src={img5} alt="houselogo..." id="signup_image13" />
                  <NavLink to={"/"} className="">
                    <img src={img3} alt="houselogo..." id="signup_image11" />
                  </NavLink>
                </div>
                <div className="flex_c mt-3 signup_Already_account_div">
                  <Link to="">
                    <div className="signupind_backbutton_div login_backbutton_div  "></div>
                  </Link>
                  <p className=" signup_Already_account signupind_Already_account h3p c_br ">
                    Not have an account?&nbsp;
                    <Link to="/signup">
                      <span className="c_blue signupind_Already_account_span">
                        Sign Up
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex_c signupind_register_main_account_div">
                <div className=" signup_join_us_div">
                  <div className="signup_joinus_div login_joinus_div">
                    <h3 className="h3p ">
                      <span className="c_og">Login</span>
                      &nbsp; to your Account!
                    </h3>
                    <p className="h3p"></p>
                  </div>
                  <div className="flex_c   login_Prosonal_account_div">
                    <div className="signupind_Register_account_div  ">
                      <label htmlFor="email_id" className="c_br h3p labelpadd">
                        Email*{" "}
                        <span style={styleError}>
                          {errorMessage.emailError}
                        </span>
                      </label>
                      <input
                        type="email"
                        id="email_id"
                        placeholder="Enter your email"
                        value={loginInfo.email}
                        className="p-2"
                        name="email"
                        title="Enter registered email id."
                        onChange={handleLoginPage}
                        required
                      />
                    </div>
                    <div className="signupind_password_account_div">
                      <label htmlFor="password" className="c_br h3p labelpadd">
                        Password*{" "}
                        <span style={styleError}>
                          {errorMessage.passwordError}
                        </span>
                      </label>
                      <div className="flex_c signupind_password_div">
                        <form action="">
                          <div
                            style={{ position: "relative" }}
                            className="flex_c signupind_Register_account_div login_enpassword_div"
                          >
                            <input
                              type={showPassword === true ? "text" : "password"}
                              required
                              id="password"
                              placeholder="Enter password"
                              value={loginInfo.password}
                              className=""
                              style={{
                                padding: "0.5rem",
                                paddingRight: "30px",
                              }}
                              name="password"
                              onChange={handleLoginPage}
                              title="Enter your correct password."
                            />
                            <span
                              style={eyeIconStyle}
                              className="flex_c"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <AiFillEyeInvisible style={{ color: "red" }} />
                              ) : (
                                <AiFillEye />
                              )}
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className=" login_reset_password_div">
                      <div className="flex_c">
                        <input
                          id="r"
                          type="checkbox"
                          value={remember}
                          onChange={(e) => setRemember(e.target.value)}
                        />
                        <label htmlFor="r" className="h3p c_br">
                          Remember Me
                        </label>
                      </div>

                      <Link to="/reset-password">
                        <p className="h3p c_blue login_resetpassword_div ">
                          Reset Password!
                        </p>
                      </Link>
                    </div>
                    <div className="signupind_Register_button_div">
                      <button
                        type="submit"
                        className="c_w bg_blue"
                        onClick={handleLogin}
                      >
                        {loginState}
                      </button>
                    </div>
                    <div className="">
                      <p
                        className="h3p "
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
                      {/* <button className="signupind_google_button_div">
                        <img src={google} alt="google icons..." />
                        <p className="h3p">Login with Google</p>
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

export default Login;
