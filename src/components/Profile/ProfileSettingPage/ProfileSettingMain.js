import React, { useState } from 'react';
import Nav from '../../Home/Nav/Nav';
import Userchat from '../../Home/UserChat/Userchat';
import '../ProfileSettingPage/ProfileSettingMain.css';
import ProfileSettingPage from '../ProfileSettingPage/ProfileSettingPage'


const ProfileSettingMain = () => {
  return (
 
        <div className="ProfileMain_main_container_div">
      <Nav
        // userSearchProperty={true}
        postpropertyBtnVeiw={true}
      setDataTranscript={''}

      />
      <div className="ProfileMain_profile_container_div ">
      <ProfileSettingPage  />
      </div>
       {/* <Userchat /> */}
    </div>
  )
}

export default ProfileSettingMain