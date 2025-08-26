import React from "react";
import Nav from "../Home/Nav/Nav";
import "./PropertieMainPageDetails.css";
import Userchat from "../Home/UserChat/Userchat";
import PropertyDetails from "./PropertyDetails/PropertyDetails";
import TermAndCondition from "../Term&Condition/TermAndCondition";
import Warning from "../Home/Warning/Warning";

const PropertieMainPageDetails = () => {
  return (
    <div className=" PropertiePageDetails_main_container_div">
      <Nav
        // userSearchProperty={true}
        postpropertyBtnVeiw={true}
        style={{position:'static'}}
      setDataTranscript={''}

      />
      <div className=" ">
        <PropertyDetails />
        <Warning />
      </div>
       {/* <Userchat /> */}
     
    </div>
  );
};

export default PropertieMainPageDetails;
