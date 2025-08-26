import React, { useContext, useState } from "react";
import Userchat from "../../Home/UserChat/Userchat";
import Nav from "../../Home/Nav/Nav";
import AuthContext from "../../../context/AuthProvider";
import { useQuery } from "../../../config/Helper";
import LikeServiceMainPage from "./LikeService/LikeServiceMainPage";

const LikeServiceMain = () => {
    const value = useContext(AuthContext);
    let query = useQuery();
  
    const [serviceData, setServiceData] = useState();
  
    const handleSearchButton = () => {
      console.log("serviceLocationButton");
    };
  return (
    <div className="ProfileMain_main_container_div">
    <Nav
      // userSearchProperty={true}
      postpropertyBtnVeiw={true}
      handleSearchButton={handleSearchButton}
      setDataTranscript={value.setServiceLocation}
      dataTranscript={value.serviceLocation}
      
    />
    <div className="ProfileMain_profile_container_div ">
      <LikeServiceMainPage />
    </div>
     {/* <Userchat /> */}
  </div>
  )
}

export default LikeServiceMain