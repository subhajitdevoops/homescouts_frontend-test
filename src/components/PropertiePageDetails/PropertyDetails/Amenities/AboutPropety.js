import React, { useState } from "react";

const AboutPropety = ({ user, AgentRERA }) => {
  const About = {
    Address: ` ${user && user.location && user.location.city} ,
 ${user && user.location && user.location.locality},
 ${user && user.location && user.location.apartmentAndSocity},
 ${user && user.location && user.location.houseNumber}`,
    dreamHouse: `${
      user && user.pricinganddetails && user.pricinganddetails.uniqueDescription
    }`,
  };
  const [more, setMore] = useState(false);
  return (
    <div className="AboutPropety_main_container">
      {user?.basicdetails?.typeOfBusiness == "sell" && (
        <div className="AboutPropety_mainRERA">
          <div className="sw AboutPropety_mainRERADetails">
            <h4 className=""> RERA Details</h4>
            <div className="AboutPropety_AgaintDetails">
              <div className="AboutPropety_AgaintRERA">
                <h5>Property RERA no.</h5>
                <p>{user?.pricinganddetails?.rera_number}</p>
              </div>
              {AgentRERA &&  
              <div className="AboutPropety_AgaintRERA">
                <h5> Agent RERA no.</h5>
                <p>{AgentRERA }</p>
              </div>
              }
            </div>
          </div>
        </div>
      )}
      <h6>What owner says about property:</h6>
      <p>Address:{About.Address} </p>
      <p>
        The {user && user.basicdetails && user.basicdetails.catagory} of your
        dreams is available for{" "}
        {user &&
          user.basicdetails &&
          user.basicdetails.typeOfBusiness &&
          user.basicdetails.typeOfBusiness === "sell" &&
          " Sale"}
        {user &&
          user.basicdetails &&
          user.basicdetails.typeOfBusiness &&
          user.basicdetails.typeOfBusiness === "rent/lease" &&
          " Rent or Lease"}
        {user &&
          user.basicdetails.typeOfBusiness &&
          user.basicdetails.typeOfBusiness === "pg" &&
          " Rent (PG)"}{" "}
        !
      </p>
      <p>
        {more === false ? About.dreamHouse.slice(0, 250) : About.dreamHouse}{" "}
      </p>
      {About.dreamHouse.length > 250 && (
        <p
          className="AboutPropety_moreLess_button"
          onClick={() => setMore(!more)}
        >
          {more === false ? `more>>` : `Less<<`}
        </p>
      )}
    </div>
  );
};

export default AboutPropety;
