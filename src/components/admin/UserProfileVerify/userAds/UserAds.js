import React, { useState } from "react";
import PropertyItem from "./PropertyItem";
import UserAdsDetails from "./UserAdsDetails";
import PotentialBuyers from "../../../Profile/PotentialBuyers/PotentialBuyers";

function UserAds({
  setPotential,
  userData,
  potentialByerButton,
  ToggleButton,
  setAdsDetails,
  setUserDetails,
}) {
  return (
    <>
      <div className="user-ads-main">
        <PropertyItem
          setAdsDetails={setAdsDetails}
          setPotential={setPotential}
          userData={userData && userData}
          potentialByerButton={potentialByerButton}
          ToggleButton={ToggleButton}
          setUserDetails={setUserDetails}
        />
       
      
      </div>
    </>
  );
}

export default UserAds;
