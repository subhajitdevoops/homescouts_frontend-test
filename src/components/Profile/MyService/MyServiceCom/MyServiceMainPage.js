import React from 'react';
import ProfileSideMenu from '../../ProfileSideMenu/ProfileSideMenu';
import MobileBottomMenu from '../../../Home/MobileBottomMenu/MobileBottomMenu';
import MyServiceCom from './MyServiceCom';
import './MyService.css';

const MyServiceMainPage = () => {
  return (
    <div className="ProfilePage_main_Contain_div">
    <div className="ProfilePage_Sideprofilemenu_Contain_div">
      <ProfileSideMenu selectMenu="2" />
    </div>
    <div className="ProfilePage_Ads_Contain_div">
      <div className="ProfileBody_main_container_div">
        <div className="ProfileBody_container_div">
          <MyServiceCom />
        </div>
      </div>
    </div>
  <MobileBottomMenu Highlight='home' />
  </div>
  )
}

export default MyServiceMainPage