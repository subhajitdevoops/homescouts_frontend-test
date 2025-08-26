// AdminChangePassword.js
import React, { useContext, useEffect, useState } from "react";
import "../../../assets/signup/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import img3 from "../../../assets/Logo.svg";
import img4 from "../../../assets/signup/Group 134.png";
import img5 from "../../../assets/signup/Group 124.png";
import img6 from "../../../assets/signup/Ellipse 44.png";
import img7 from "../../../assets/signup/Group 136.png";
import img8 from "../../../assets/signup/Group.png";
// import google from "../../../assets/signup/flat-color-icons_google.png";
// import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import RegisterVerify from "./RegisterVerify";
import configData from "../../../config/config.json";
import { API_REQ_POST, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";

// const FullName = /^[A-Za-z. ]{3,30}$/;
const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Password =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

const AdminChangePassword = ({ setChangPass }) => {
  // user/registration/otpverify
  const value = useContext(AuthContext);


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  console.log(errorMessage);
  const [induserdata, setInduserdata] = useState({
    email: "",
    currentPassword: "",
    password: "",
    confirmpassword: "",
    userType: "admin",
  });
  const [response, setResponse] = useState({});
  const [TermAndCondition, setTermAndCondition] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState("");
  console.log(induserdata);
  const UpdateTC = (e) => {
    setTermAndCondition(e.target.checked);
  };
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  console.log(adminToken);
  const navigate = useNavigate();
  // ---------------------------------------------------------
  const styleError = { color: "red", paddingLeft: "20px", cursor: "text" };
  const eyeIconStyle = { color: "black", fontSize: "18px" };
  // ------------------------------------------------------------
  // =========== naviagtion from signup page to login page after 3s for toast message ===================
  useEffect(() => {
    if (response.success) {
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 3000);
    }
  }, [response, navigate]);
  // -----------------------------------------------------------------
  const handleindividul = (event) => {
    const field = event.target.getAttribute("name");
    const fieldvalue = event.target.value;
    const newFormData = { ...induserdata, [field]: fieldvalue };
    setInduserdata(newFormData);
    // =========== for error message removing during edit the fields =============
    setErrorMessage({ ...errorMessage, [field + "Error"]: "" });
    if (field === "confirmpassword") {
      setErrorMessage({ ...errorMessage, passwordError: "" });
    }
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const error = {};
    // ---------- Name error ---------
    if (induserdata.currentPassword.length === 0) {
      error.currentError = "Please enter your Password.";
    }
    // --------- Email error ------------
    if (induserdata.email.length === 0) {
      error.emailError = "Please enter your email.";
    } else if (!emailValidator.test(induserdata.email)) {
      error.emailError = "Please enter correct email.";
    }
    // --------- password error ------
    if (induserdata.password.length === 0) {
      error.passwordError = "Please enter password";
    } else if (
      induserdata.password.length < 8 ||
      induserdata.password.length > 15
    ) {
      error.passwordError = "Password must be 8 to 15 characters.";
    } else if (!Password.test(induserdata.password)) {
      error.passwordError = "Password will be this format: Abc@123.";
    } else if (induserdata.confirmpassword.length === 0) {
      error.passwordError = "Please enter confirm password.";
    } else if (induserdata.password !== induserdata.confirmpassword) {
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
  const handleFormError = async () => {
    const AdminPssswordChange_data = {
      email: `${induserdata.email}`,
      oldpassword: induserdata.currentPassword,
      newpassword: induserdata.password,
      confirmpassword: induserdata.confirmpassword,
    };
    // response from API---------------
    console.log(AdminPssswordChange_data);
    let ResAdminChange = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_CHANGE_PASSWPORD_URL,
      AdminPssswordChange_data,
      adminToken
    );
    console.log(ResAdminChange);
    if (ResAdminChange) {
      if (ResAdminChange.success === true) {
        toast.success(ResAdminChange.message);
        setResponse(ResAdminChange);
      } else {
        toast.warning(ResAdminChange.message);
      }
      // console.log("setDefaultMessage........ ", ResAdminChange);
    } else {
      toast.error("please Check Your Internet Connection !");
    }
  };
  // -----------------------------------------------------------------------------------
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
            <div className="bg_og signup_container1_div signupind_container1_div">
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
            {/* --------------------------------------------------------------- */}
            <div className="signup_container2_div">
              <div>
                <div className="signup_container2_color_div signupind_Forcolor_color_div"></div>
                <div className="signup_container2_mobile_div">
                  <img src={img5} alt="houselogo..." id="signup_image13" />
                  <NavLink to={"/"} className=''>
                    <img src={img3} alt="houselogo..." id="signup_image11" />
                  </NavLink>
                </div>
                <div className="flex_c mt-3 signup_Already_account_div">
                  <Link to="">
                    <div
                      className="signupind_backbutton_div   "
                      onClick={() => navigate(-1)}
                    >
                      <AiOutlineArrowLeft className="c_blue" />
                    </div>
                  </Link>
                  {/* <p className=" signup_Already_account signupind_Already_account">
                    Already have an account?
                    <Link to="/loginAdmin">
                      <span className="c_blue signupind_Already_account_span">
                        Sign In
                      </span>
                    </Link>
                  </p> */}
                </div>
              </div>
              <div className="flex_c signupind_register_main_account_div">
                <div className=" signup_join_us_div">
                  <div className="signup_joinus_div signupind_joinus_div">
                    <h3>
                      Admin&nbsp;<span className="c_og">Change</span>
                      &nbsp;Password!
                    </h3>

                    <p className="h3p c_br">
                      For the purpose of providing best service,your details are
                      required.
                    </p>
                  </div>

                  <div className="flex_c signupind_Prosonal_account_div">
                    <form className="w-100" onSubmit={handleSubmission}>
                      <div className="signupind_email_address_account_div">
                        <label
                          title="Enter your email address."
                          htmlFor="email"
                          className="labelpadd c_br"
                        >
                          Email address*
                          <span style={styleError}>
                            {errorMessage.emailError}
                          </span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={induserdata.email}
                          placeholder="Enter email address"
                          title="Enter your email address."
                          onChange={handleindividul}
                          className={`p-2 `}
                        />
                      </div>
                      <div className="signupind_Register_account_div">
                        <label
                          title="Enter your current password."
                          htmlFor="name"
                          className="c_br labelpadd "
                        >
                          Current Password*
                          <span style={styleError}>
                            {errorMessage.currentError}
                          </span>
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          id="name"
                          value={induserdata.currentPassword}
                          placeholder="Enter your current password"
                          title="Enter your current password."
                          onChange={handleindividul}
                          className={`p-2`}
                        />
                      </div>
                      <div className="signupind_password_account_div">
                        <label
                          title="Enter password"
                          htmlFor="password"
                          className="labelpadd c_br"
                        >
                          Create password*{" "}
                          <span style={styleError}>
                            {errorMessage.passwordError}
                          </span>
                        </label>
                        <div className="flex_c signupind_password_div">
                          <div className="flex_c signupind_enpassword_div">
                            <input
                              type={showPassword === true ? "text" : "password"}
                              name="password"
                              id="password"
                              value={induserdata.password}
                              placeholder="Enter password"
                              title="Enter password"
                              onChange={handleindividul}
                              className={`p-2 `}
                            />
                            <span
                              style={eyeIconStyle}
                              onClick={() => setShowPassword(!showPassword)}
                              className="flex_c"
                            >
                              {showPassword ? (
                                <AiFillEyeInvisible style={{ color: "red" }} />
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
                              value={induserdata.confirmpassword}
                              placeholder="Confirm Password"
                              title="Confirm your password"
                              onChange={handleindividul}
                              className={`p-2`}
                            />
                            <span
                              style={eyeIconStyle}
                              className="flex_c"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <AiFillEyeInvisible style={{ color: "red" }} />
                              ) : (
                                <AiFillEye />
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className=" signupind_termcondition_div">
                        <input
                          id="c"
                          title="Please click to accept Terms and Conditions"
                          type="checkbox"
                          onChange={UpdateTC}
                          checked={TermAndCondition}
                        />
                        <label
                          title="Please click to accept Terms and Conditions"
                          htmlFor="c"
                          className="h3p c_br"
                        >
                          I agree to Terms & Conditions.
                          <span style={styleError}>{errorMessage.TCerror}</span>
                        </label>
                      </div>
                      <div className="signupind_Register_button_div">
                        <button
                          type="submit"
                          name="submit"
                          className="c_w bg_blue"
                          title="Click to submit your registration form."
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                    {/* <div className="">
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
                        >
                          <img src={google} alt="google icons..." />
                          <p>Register with Google</p>
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

export default AdminChangePassword;
