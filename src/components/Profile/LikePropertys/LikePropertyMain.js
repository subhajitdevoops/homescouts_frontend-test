import React from 'react';
import Nav from '../../Home/Nav/Nav';
import Userchat from '../../Home/UserChat/Userchat';
import './LikeProperty.css';
import LikePropertyPage from './LikePropertyPage/LikePropertyPage';

const LikePropertyMain = () => {
  return (
    <div className="ProfileMain_main_container_div">
    <Nav
      // userSearchProperty={true}
      postpropertyBtnVeiw={true}
      setDataTranscript={''}
    />
    <div className="ProfileMain_profile_container_div ">
    <LikePropertyPage />
    </div>
     {/* <Userchat /> */}
  </div>
  )
}

export default LikePropertyMain