import React,{ useState} from 'react';
import MyAdsMain from '../../MyAds/MyAdsCom/MyAdsMainCom';
import ProfileSetting from '../ProfileSetting/ProfileSetting';
import './ProfileBody.css'

const ProfileBody = ({selectMenu}) => {
  const AdsContent =[{ 
    id:1,
    Active:false,
  },{
    id:2,
    Active:true,
  },]
  return (
    <div className='ProfileBody_main_container_div'>
        <div className='ProfileBody_container_div'>
        {/* <MyAdsMain AdsContent={AdsContent} /> */}
        <ProfileSetting />

        </div>
    </div>
  )
}

export default ProfileBody