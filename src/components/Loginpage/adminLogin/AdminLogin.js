import React, { useState, useEffect, useContext } from "react";
import "../../../assets/signup/Signup.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import img3 from "../../../assets/Logo.svg";
import img4 from "../../../assets/signup/Group 134.png";
import img5 from "../../../assets/signup/Group 124.png";
import img6 from "../../../assets/signup/Ellipse 44.png";
import img7 from "../../../assets/signup/Group 136.png";
import img8 from "../../../assets/signup/Group.png";
// import google from "../../../assets/signup/flat-color-icons_google.png";
// import Axios from "axios";
import configData from "../../../config/config.json";
import { API_REQ_POST } from "../../../config/API";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";

const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const AdminLogin = ({ setAdminAccessToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [response, setResponse] = useState({});
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);


  const navigate = useNavigate();
  // const history = useHistory();
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

  const handleLogin = (event) => {
    event.preventDefault();
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
  };
  const handleError = async () => {
    const Login_data = {
      email: `${loginInfo.email}`,
      password: loginInfo.password,
    };
    console.log(Login_data);
    // response from API---------------
    let ResLogin = await API_REQ_POST(configData.ADMIN_LOGIN_URL, Login_data);
    console.log(ResLogin);
    if (ResLogin) {
      if (ResLogin.success === true) {
        // setAdminAccessToken(true)
        localStorage.setItem("adminAccessToken", JSON.stringify(ResLogin));
        toast.success(ResLogin.message);
        setResponse(ResLogin);

        if (remember) {
          Cookies.set("adminAccessToken", ResLogin.response.token, {
            expires: 7,
          });
          console.log("Cookies working properly");
        }
        // localStorage.setItem('adminAccessToken',JSON.stringify(ResLogin.response))
        setTimeout(() => {
          navigate("/admin", { replace: true });
          window.location.reload();
        }, 1000);
        // history.push("/admin");
        // navigate("/admin", { replace: true });
        const adminTokenAvilable = JSON.parse(
          localStorage.getItem("adminAccessToken")
        );
        const adminToken =
          adminTokenAvilable &&
          adminTokenAvilable.response &&
          // adminTokenAvilable.response.token &&
          adminTokenAvilable.response.token;
        console.log(
          "adminToken from loginpage------------------------------------>",
          adminToken
        );
      } else {
        toast.warning(ResLogin.message);
      }
      // console.log("setDefaultMessage........ ", ResLogin);
    } else {
      toast.error("Please Check Your Internet Connection !");
    }
  };
  // ------------------------------------------------------
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])
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
                  <NavLink to={"/"} className=''>
                    <img src={img3} alt="houselogo..." id="signup_image11" />
                  </NavLink>
                </div>
                <div className="flex_c mt-3 signup_Already_account_div">
                  <Link to="">
                    <div className="signupind_backbutton_div login_backbutton_div  "></div>
                  </Link>
                  {/* <p className=" signup_Already_account signupind_Already_account h3p c_br ">
                    Not have an account?
                    <Link to="/signup">
                      <span className="c_blue signupind_Already_account_span">
                        Sign Up
                      </span>
                    </Link>
                  </p> */}
                </div>
              </div>
              <div className="flex_c signupind_register_main_account_div">
                <div className=" signup_join_us_div">
                  <div className="signup_joinus_div login_joinus_div">
                    <h3 className="h3p ">
                      <span className="c_og">Admin Login</span>
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

                      <Link to="">
                        {/* <p
                          className="h3p c_blue login_resetpassword_div "
                          onClick={() => setChangPass(true)}
                        >
                          Reset Password!
                        </p> */}
                      </Link>
                    </div>
                    <div className="signupind_Register_button_div">
                      <button
                        type="submit"
                        className="c_w bg_blue"
                        onClick={(event) => handleLogin(event)}
                      >
                        Login Account
                      </button>
                    </div>
                    {/* <div className=""> */}
                    {/* <p
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
                      <button className="signupind_google_button_div">
                        <img src={google} alt="google icons..." />
                        <p className="h3p">Login with Google</p>
                      </button>
                    </div> */}
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

export default AdminLogin;
