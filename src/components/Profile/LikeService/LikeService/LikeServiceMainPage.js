import React from 'react';
import ProfileSideMenu from '../../ProfileSideMenu/ProfileSideMenu';
import MobileBottomMenu from '../../../Home/MobileBottomMenu/MobileBottomMenu';
import LikeServiceCom from './LikeServiceCom';

const LikeServiceMainPage = () => {
  return (
    <div className="ProfilePage_main_Contain_div">
    <div className="ProfilePage_Sideprofilemenu_Contain_div">
      <ProfileSideMenu selectMenu="8" />
    </div>
    <div className="ProfilePage_Ads_Contain_div">
      <div className="ProfileBody_main_container_div">
        <div className="ProfileBody_container_div">
          <LikeServiceCom />
        </div>
      </div>
    </div>
  <MobileBottomMenu Highlight='profile' />
  </div>
  )
}

export default LikeServiceMainPage