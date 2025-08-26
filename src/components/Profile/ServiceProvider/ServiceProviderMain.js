import React from 'react';
import Nav from '../../Home/Nav/Nav';
import Userchat from '../../Home/UserChat/Userchat';
import './ServiceProviderMain.css';
import ServiceProviderPage from './ServiceProviderPage/ServiceProviderPage';

const ServiceProviderMain = () => {
  return (
    <div className="ProfileMain_main_container_div">
    <Nav
      // userSearchProperty={true}
      postpropertyBtnVeiw={true}
      setDataTranscript={''}
    
    />
    <div className="ProfileMain_profile_container_div ">
    < ServiceProviderPage />
    </div>
     {/* <Userchat /> */}
  </div>
  )
}

export default ServiceProviderMain





