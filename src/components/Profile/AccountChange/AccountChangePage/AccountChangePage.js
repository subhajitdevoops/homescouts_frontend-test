import React from 'react';
import MobileBottomMenu from '../../../Home/MobileBottomMenu/MobileBottomMenu';
import ProfileSideMenu from '../../ProfileSideMenu/ProfileSideMenu'
import AccountChange from '../AccountChange/AccountChange';

const AccountChangePage = () => {
  return (
    <div className="ProfilePage_main_Contain_div">
    <div className="ProfilePage_Sideprofilemenu_Contain_div">
      <ProfileSideMenu
      selectMenu='5' />
    </div>
    <div className="ProfilePage_Ads_Contain_div">
      <div className='ProfileBody_main_container_div'>
      <div className='ProfileBody_container_div'>
      <AccountChange />
      </div>
  </div>
    </div>
    <MobileBottomMenu Highlight='profile' />
  </div>
  )
}

export default AccountChangePage