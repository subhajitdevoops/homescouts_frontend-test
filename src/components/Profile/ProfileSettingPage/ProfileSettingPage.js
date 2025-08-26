import React, { useState } from "react";
import "./ProfilePage.css";
import ProfileSetting from "./ProfileSetting/ProfileSetting";
import ProfileSideMenu from "../ProfileSideMenu/ProfileSideMenu";
import MobileBottomMenu from "../../Home/MobileBottomMenu/MobileBottomMenu";

const ProfileSettingPage = () => {
  return (
    <div className="ProfilePage_main_Contain_div">
      <div className="ProfilePage_Sideprofilemenu_Contain_div">
        <ProfileSideMenu selectMenu="3" />
      </div>
      <div className="ProfilePage_Ads_Contain_div">
        <div className="ProfileBody_main_container_div">
          <div className="ProfileBody_container_div">
            <ProfileSetting />
          </div>
        </div>
      </div>
    <MobileBottomMenu  Highlight='profile' />
    </div>
  );
};

export default ProfileSettingPage;
