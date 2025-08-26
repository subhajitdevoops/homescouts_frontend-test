import React, { useContext, useState } from "react";
// import Nav from "../../admin/Nav";
import Userchat from "../../Home/UserChat/Userchat";
import MyServiceMainPage from "./MyServiceCom/MyServiceMainPage";
import Nav from "../../Home/Nav/Nav";
import AuthContext from "../../../context/AuthProvider";
// import NavProfile from "../../Home/Nav/NavProfile/NavProfile";
import { useQuery } from "../../../config/Helper";


const MyServiceMain = () => {
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
        <MyServiceMainPage />
      </div>
       {/* <Userchat /> */}
    </div>
  );
};

export default MyServiceMain;
