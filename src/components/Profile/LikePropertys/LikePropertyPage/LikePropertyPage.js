import React from 'react'
import MobileBottomMenu from '../../../Home/MobileBottomMenu/MobileBottomMenu'
import ProfileSideMenu from '../../ProfileSideMenu/ProfileSideMenu'
import LikeProperty from '../LikeProperty/LikeProperty'

const LikePropertyPage = () => {
  return (
    <div className="ProfilePage_main_Contain_div">
    <div className="ProfilePage_Sideprofilemenu_Contain_div">
      <ProfileSideMenu selectMenu="7" />
    </div>
    <div className="ProfilePage_Ads_Contain_div">
      <div className="ProfileBody_main_container_div">
        <div className="ProfileBody_container_div">
          <LikeProperty />
        </div>
      </div>
    </div>
    <MobileBottomMenu Highlight='profile' />
  </div>
  )
}

export default LikePropertyPage