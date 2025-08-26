import React from 'react';
import Nav from '../../Home/Nav/Nav';
import Userchat from '../../Home/UserChat/Userchat';
import './NotificationsMain.css';
import NotificationsPage from './NotificationsPage/NotificationsPage';

const NotificationsMain = () => {
  return (
    <div className="ProfileMain_main_container_div">
    <Nav
      // userSearchProperty={true}
      postpropertyBtnVeiw={true}
      setDataTranscript={''}

    />
    <div className="ProfileMain_profile_container_div ">
    <NotificationsPage />
    </div>
     {/* <Userchat /> */}
  </div>
  )
}

export default NotificationsMain