import React from 'react'
import Nav from '../../Home/Nav/Nav'
import Userchat from '../../Home/UserChat/Userchat'
import MyAdsMainPage from '../MyAds/MyAdsCom/MyAdsMainPage'
import './AccountChangeMain.css'
import AccountChangePage from './AccountChangePage/AccountChangePage'

const AccountChangeMain = () => {
  return (
    <div className="ProfileMain_main_container_div">
    <Nav
      // userSearchProperty={true}
      postpropertyBtnVeiw={true}
      setDataTranscript={''}
    />
    <div className="ProfileMain_profile_container_div ">
    < AccountChangePage />
    </div>
     {/* <Userchat /> */}
  </div>
  )
}

export default AccountChangeMain