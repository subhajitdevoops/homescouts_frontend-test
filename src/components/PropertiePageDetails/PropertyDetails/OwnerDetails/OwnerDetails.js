import React, { useState } from "react";
import "./OwnerDetails.css";
import img from "./Rectangle (1).svg";
import { FaCircle, FaHospitalUser } from "react-icons/fa";
import { SiElectronbuilder } from "react-icons/si";

import { ToastContainer, toast } from "react-toastify";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import configData from "../../../../config/config.json";
import { useEffect } from "react";
// import io from "socket.io-client";
import { useQuery } from "../../../../config/Helper";
import { useNavigate } from "react-router-dom";
import TermAndCondition from "../../../Term&Condition/TermAndCondition";
import { NavLink } from "react-router-dom";

const validationEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OwnerDetails = ({ user,sellerDetails  }) => {
  // var socket = io.connect("http://localhost:9000");
  let query = useQuery();
  const [profileRes, setProfileRes] = useState("");

  const [formData, setFormData] = useState({
    owner: sellerDetails && sellerDetails.name,
    name: "",
    email: "",
    phone: "",
    message: "",
    isAgreed: false,
    userType: "",
  });
  console.log("formData------------------------------------->", formData);
  console.log("sellerDetails------------------------------------->", sellerDetails);

  const navigate = useNavigate();
  const phoneValidation = /^[56789]\d{9}$/;

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  const userId = UserTokenAvilable && UserTokenAvilable.response._id;

  // console.log("userToken------------------------------------>", userToken);
  const handleInputChange = (e) => {
    console.log("phone ");
    if (e.target.name === "phone") {
      // let value = phoneValidation.test(e.target.value);
      // if (value === true) {
      // console.log('phone ',value);

      setFormData({
        ...formData,
        [e.target.name]: e.target.value.replace(/[^0-9]/g, ""),
      });
      // }
    } else {
      // console.log('phone ',value);

      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      isAgreed: !formData.isAgreed,
    });
  };

  const handleSubmit = (sellerName) => {
    // e.preventDefault();

    const { name, email, phone, message, isAgreed } = formData;
    if (name.trim() === "") {
      toast.warning("Please enter your name");
      // } else if (email.trim() === "") {
      //   toast.warning("Please enter your email");
    } else if (!validationEmail.test(email)) {
      toast.warning("Please enter a valid Email");
      // } else if (phone.trim() === "") {
      //   toast.warning("Please enter your phone number");
    } else if (!/^([+]\d{2})?\d{10}$/.test(phone)) {
      toast.warning("Please enter a valid phone number");
      // } else if (message.trim() === "") {
      //   toast.warning("Please enter a message");
    } else if (!isAgreed) {
      toast.warning("Please agree to the terms and conditions");
    } else {
      if (userToken) {
        ContactOwnerUrl(sellerName);
      } else {
        toast.warning("Please login for property enquiry");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1000);
      }
    }
  };
  const ContactOwnerUrl = async (sellerName) => {
    const AllData = {
      senderId: userId,
      receiverId: user && user.userId,
      enquiry: {
        mediaLink:
          user && user.uploadImages && user.uploadImages[0].propertyImage,
        propertyId: query.get("_id"),
        name:sellerName&&sellerName.split(" ")[0],
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        userType: formData.userType,
        messagetype: "enquiry",
      },
    };

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.USER_ENQUIRY_POST_URL,
      AllData,
      userToken
    );

    if (ResBasic) {
      if (ResBasic.success === true) {
        toast.success(ResBasic.message);
        setFormData((ele) => {
          return {
            ...ele,
            message: "",
            isAgreed: false,
          };
        });
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };

  // -------------------------get user Details---------------------------
  const getCasesUser = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_SERVICE_APPLY_GET_URL,
      userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  // -------------------------get  postproperty user---------------------------
  const getCasesPostproperty = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_SERVICE_APPLY_GET_URL,
      userToken
    );
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  //------------------------------------get response for user Profile -------
  const getCasesProfile = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_GET_USER_PROFILE_URL,
      userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        // console.log("PROFILE details", ApiRes);
        console.log("get  postproperty user===>", ApiRes);
        if (ApiRes.result) {
          setProfileRes(ApiRes.result);
          setFormData((resData) => {
            return {
              ...resData,
              name: ApiRes.result.name,
              email: ApiRes.result.email,
              phone: JSON.stringify(ApiRes.result.mobilenumber),
              userType: ApiRes.result.user_type,
            };
          });
        }
        // if (ApiRes.result.avatar) {
        //   setUserImg(
        //     configData.COMMON_MEDIA_LINK_URL + "/avatar/" + ApiRes.result.avatar
        //   );
        // }
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    getCasesUser();
    getCasesPostproperty();
    getCasesProfile();
  }, []);
  return (
    <div
      className="OwnerDetails_main_container_div"
      // style={!userToken ? { justifyContent: "flex-start" } : {}}
    >
      <div className="flex_c OwnerDetails_OwnerDetails_container_div">
        <div className="flex_c OwnerDetails_Owner_div">
          <p>Owner Details</p>
          <img src={img} alt="icon..." />
          <span>
            Properties Listed: {sellerDetails && sellerDetails.is_active}
          </span>
        </div>
        <div className="flex_c OwnerDetails_OwnerName_div">
          <div>
            <span>
              {sellerDetails && sellerDetails.name}{" "}
              <FaHospitalUser style={{ color: "#a30000" }} />
            </span>
            <p className="OwnerDetails_Ownerlable">
              {sellerDetails && sellerDetails.user_type}
            </p>
          </div>
          <div>
            <button>
              {userToken
                ? sellerDetails && sellerDetails.mobilenumber
                : "login for Contact with Owner"}
            </button>
          </div>
          <div>
            <p>
              Verified Properties: {sellerDetails && sellerDetails.is_verified}
            </p>
          </div>
        </div>
      </div>
      <div className="OwnerDetails_ContactDetails_container_div">
        <p>Send enquiry to Owner</p>
        <div className="flex_c OwnerDetails_ContactDetails_div">
          <div>
            <p>You are</p>
          </div>
          <div className="flex_c OwnerDetails_Individual_div">
            <input
              type="radio"
              id="Dealer"
              name="userType"
              checked={userToken && formData.userType === "individual"}
              onChange={handleInputChange}
              value="Individual"
              disabled={userToken && formData.userType && true}
            />
             <label htmlFor="Individual">Individual</label>
          </div>
          <div className="flex_c OwnerDetails_Dealer_div">
            <input
              type="radio"
              id="Dealer"
              name="userType"
              checked={userToken && formData.userType === "business"}
              onChange={handleInputChange}
              value="Dealer"
              disabled={userToken && formData.userType && true}
            />
             <label htmlFor="Dealer">Business</label>
          </div>
        </div>
        <div className="flex_c OwnerDetails_contactUser_div">
          <div className="OwnerDetails_nameEmailPhone_div">
            <input
              type="text"
              required
              placeholder="Your Name"
              name="name"
              disabled={userToken && formData.name ? true : false}
              onChange={handleInputChange}
              value={formData.name}
            />
            <input
              type="text"
              required
              placeholder="Email"
              name="email"
              disabled={userToken && formData.email ? true : false}
              onChange={handleInputChange}
              value={formData.email}
            />
            <div className="flex_c OwnerDetails_Phone_div">
              <input
                type="text"
                required
                placeholder="+91 (INDIA)"
                className="OwnerDetails_countarycode_input"
                readOnly
              />
              <input
                type="tel"
                className="OwnerDetails_phone_input"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
                placeholder="9800000000"
                name="phone"
                disabled={userToken && profileRes.mobilenumber ? true : false}
                onChange={handleInputChange}
                value={formData.phone}
              />
            </div>
          </div>
          <div className="OwnerDetails_textarea_input_div">
            <textarea
              type="text"
              maxlength="1000"
              height
              // disabled={profileRes._id===user.userId}
              className="OwnerDetails_textarea_input"
              name="message"
              onChange={handleInputChange}
              value={formData.message}
              placeholder="Please enter your message..."
            />
            <p>1000 chars</p>
          </div>
        </div>
        <div>
          <div className="OwnerDetails_TermsAndConditions">
            <input
              type="checkbox"
              id="vehicle3"
              name="isAgreed"
              disabled={profileRes._id === user.userId}
              value={formData.isAgreed}
              checked={formData.isAgreed}
              onChange={() => handleCheckboxChange()}
            />
            <div>
              <label htmlFor="vehicle3">By clicking below you agree to</label>
              <NavLink to="/term-condition">
                <span style={{ color: "#1565d8" }}>Terms and Conditions</span>
              </NavLink>
            </div>
          </div>

          <button
            className="OwnerDetails_message_button"
            onClick={()=>handleSubmit(sellerDetails && sellerDetails.name)}
            disabled={profileRes._id === user.userId}
          >
            {profileRes._id === user.userId ? (
              "You can't send message"
            ) : (
              <span> Send Message &#8702;</span>
            )}
          </button>
        </div>
      </div>
      {/* <div style={{position:'absolute',width:'100%',height:'200vh'}}>

      <TermAndCondition />
      </div> */}
      {/* <div className="termAndCondition">
        <TermAndCondition />
      </div> */}

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

export default OwnerDetails;
