import React from "react";
import MobileBottomMenu from "../../../Home/MobileBottomMenu/MobileBottomMenu";
import ProfileSideMenu from "../../ProfileSideMenu/ProfileSideMenu";
import ServiceProvider from "../ServiceProvider/ServiceProvider";

const ServiceProviderPage = () => {
  return (
    <div className="ProfilePage_main_Contain_div">
      <div className="ProfilePage_Sideprofilemenu_Contain_div">
        <ProfileSideMenu selectMenu="4" />
      </div>
      <div className="ProfilePage_Ads_Contain_div">
        <div className="ProfileBody_main_container_div">
          <div className="ProfileBody_container_div">
            <ServiceProvider />
          </div>
        </div>
      </div>
    <MobileBottomMenu Highlight='home' />
    </div>
  );
};

export default ServiceProviderPage;
