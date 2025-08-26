import React, { useState } from "react";
import Nav from "../../Home/Nav/Nav";
import Userchat from "../../Home/UserChat/Userchat";
import MyAdsMainPage from "./MyAdsCom/MyAdsMainPage";
import PotentialBuyers from "../PotentialBuyers/PotentialBuyers";
import { useEffect } from "react";
import { API_REQ_GET } from "../../../config/API";
import configData from "../../../config/config.json";

const MyAdsMain = () => {
  const [potentialBuyers, setPotentialBuyers] = useState(false);
  const [potentialUser, setPotentialUser] = useState([]);
  const [userProfile, setUserProfile] = useState("");
  const [PropertyId, setPropertyId] = useState("");
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  const userId = UserTokenAvilable && UserTokenAvilable.response._id;

  // console.log("userToken------------------------------------>", userToken);
  const handlePotentialBuyers = (ele) => {
    setPotentialBuyers(true);
    setPotentialUser(ele);
  };
  console.log("potentialUser:", potentialUser);
  const getUserProfile = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_GET_USER_PROFILE_URL,
      userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        if (ApiRes.result) {
          setUserProfile(ApiRes.result);
        }
      } else {
        if (userToken) {
          // toast.warning(ApiRes.message);
        }
      }
    } else {
      // toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="ProfileMain_main_container_div">
      <Nav
        // userSearchProperty={true}
        postpropertyBtnVeiw={true}
        setDataTranscript={""}
      />
      {potentialBuyers === true && (
        <PotentialBuyers
          setPotentialBuyers={setPotentialBuyers}
          potentialUser={potentialUser}
          contact={true}
          userProfile={userProfile}
        />
      )}
      <div className="ProfileMain_profile_container_div ">
        <MyAdsMainPage handlePotentialBuyers={handlePotentialBuyers} />
      </div>
      {/* <Userchat /> */}
    </div>
  );
};

export default MyAdsMain;
