import React, { useEffect, useState } from "react";
import img from "./Group 132.png";
import "./AccountChange.css";
import img2 from "../../../../assets/signup/Group 133.png";
import { toast } from "react-toastify";
import { API_REQ_GET } from "../../../../config/API";
import configData from "../../../../config/config.json";

const AccountChange = () => {
  const [profileRes, setProfileRes] = useState("");
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  const userId = UserTokenAvilable && UserTokenAvilable.response._id;

  // console.log("userToken------------------------------------>", userToken);
  const getCasesProfile = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_GET_USER_PROFILE_URL,
      userToken
    );
    if (ApiRes) {
      if (ApiRes.success === true) {
        if (ApiRes.result) {
          setProfileRes(ApiRes.result);
        }
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
    getCasesProfile();
  }, []);
  return (
    <div className="AccountChange_Main_container_div">
      <div className="AccountChange_heading">
        <h6>You are currently registered as </h6>
      </div>
      {profileRes && profileRes.user_type == "individual" ? (
        <div className="AccountChange_UserRegistered">
          <div className="AccountChange_AccountIcon">
            <img src={img} alt="user..." />
          </div>
          <div className="AccountChange_AccountDesc">
            <h6>Property Buyer/ Seller/ Rent</h6>
            <p>Personal account to manager</p>
           
            <p>all you activies.</p>
          </div>
        </div>
      ) : (
        <div className="AccountChange_UserRegistered">
          <div className="AccountChange_AccountIcon">
            <img src={img2} alt="user..." />
          </div>
          <div className="AccountChange_AccountDesc">
            <h6>Business:(Property agent or Business)</h6>
            <p>Own or belong to a company,this is for you.</p>
          </div>
        </div>
      )}

      <div className="AccountChange_pragraph">
        <p>
          This feature isn’t available right now please stay tuned for the
          further notification
        </p>
      </div>
    </div>
  );
};

export default AccountChange;
