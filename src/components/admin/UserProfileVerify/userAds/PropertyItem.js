import React, { useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import InnerPropertyItem from "./innerPropertyItem";

function PropertyItem({
  setAdsDetails,
  setPotential,
  userData,
  potentialByerButton,
  ToggleButton,
  setUserDetails,
}) {
  let [more, setMore] = useState(true);
  // ==========================================
  let featuredTag = [
    "idle for bachelor",
    "smoking allowed",
    "independent",
    "idle for bachelor",
    "smoking allowed",
    "independent",
  ];
  const moreHandle = () => {
    setMore(!more);
  };
  // ====================== JSX ====================
  console.log("responseData", userData);
  
  return (
    <div
      className="property-item-main"
      onClick={() => {
        setAdsDetails(true);
        setUserDetails(userData);
      }}
    >
      <p
        className={`post-date  ${
          userData && userData.admin_approval == "rejected" && "adminReject"
        } ${
          userData && userData.admin_approval == "pending" && "adminPending"
        }`}
      >
        <span className="searchlist_postdateReraNUmber">
          <i>
            Post on{" "}
            {userData?.createdAt &&
              new Date(userData.createdAt).toLocaleDateString("en-US")}
          </i>
          {userData?.basicdetails?.typeOfBusiness == "sell" && (
            <>
              {userData?.pricinganddetails?.rera_number && (
                <>
                  {userData?.pricinganddetails?.rera_number && (
                    <p className="searchlist_ReraNUmber">
                      RERA:{userData?.pricinganddetails?.rera_number}
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </span>
        <div style={{ display: "flex", gap: "5px" }}>
          {userData?.basicdetails?.typeOfBusiness == "sell" && (
            <>
              {userData?.user?.rera_number && (
                <p className="searchlist_ReraNUmber">
                  Posted by RERA verified agent : {userData?.user?.rera_number}
                </p>
              )}
            </>
          )}
          <i>Admin {userData && userData.admin_approval} this proprty</i>
        </div>
      </p>
      <div className="property-item-inner">
        {/*======= Inner Property section ======== */}
        <InnerPropertyItem
          setPotential={setPotential}
          potentialByerButton={potentialByerButton}
          ToggleButton={ToggleButton}
          setAdsDetails={setAdsDetails}
          userData={userData}
        />
      </div>
      <div
        onClick={() => {
          setAdsDetails(true);
          setUserDetails(userData);
        }}
        className="property-featured-tag"
      >
        <div>
          {userData &&
            userData.basicdetails &&
            userData.basicdetails.typeOfBusiness === "pg" && (
              <>
                {userData.pricinganddetails.someHouseRules &&
                  userData.pricinganddetails.someHouseRules.alcoholAllowed ===
                    true && (
                    <span>
                      <MdOutlineVerified />
                      &ensp; Alcohol Allowed
                    </span>
                  )}
                {userData.pricinganddetails.someHouseRules &&
                  userData.pricinganddetails.someHouseRules.partyAllowed ===
                    true && (
                    <span>
                      <MdOutlineVerified />
                      &ensp; Party Allowed
                    </span>
                  )}
                {userData.pricinganddetails.someHouseRules &&
                  userData.pricinganddetails.someHouseRules.petsAllowed ===
                    true && (
                    <span>
                      <MdOutlineVerified />
                      &ensp;Pets Allowed
                    </span>
                  )}
                {userData.pricinganddetails.someHouseRules &&
                  userData.pricinganddetails.someHouseRules.smokingAllowed ===
                    true && (
                    <span>
                      <MdOutlineVerified />
                      &ensp; Smoking Allowed
                    </span>
                  )}
                {userData.pricinganddetails.someHouseRules &&
                  userData.pricinganddetails.someHouseRules.visitorsAllowed ===
                    true && (
                    <span>
                      <MdOutlineVerified />
                      &ensp; Visitors Allowed
                    </span>
                  )}
              </>
            )}

          {userData.aboutproperty.furnishingType != "" && (
            <span>
              <MdOutlineVerified />
              &ensp; {userData.aboutproperty.furnishingType}
            </span>
          )}
        </div>
        <div>
          <span className="more-btn" onClick={moreHandle}>
            more&#8811;
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertyItem;
