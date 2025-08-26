import React from "react";
import { Carousel } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import "../SwitchToggleBtn.css";
import img1 from "../../../../assets/statusimg/img1.jpg";
import img2 from "../../../../assets/statusimg/img2.jpg";
import img3 from "../../../../assets/statusimg/img3.jpg";
import img4 from "../../../../assets/statusimg/img4.jpg";
import img5 from "../../../../assets/statusimg/img5.jpg";
import img6 from "../../../../assets/statusimg/img6.jpg";
import img7 from "../../../../assets/statusimg/img7.jpg";
import img8 from "../../../../assets/statusimg/img8.jpg";
import img9 from "../../../../assets/statusimg/img9.jpg";
import img10 from "../../../../assets/statusimg/img10.jpg";
import img11 from "../../../../assets/statusimg/img11.jpg";
import { MdAddShoppingCart } from "react-icons/md";
import configData from "../../../../config/config.json";
import imgBus from "../../../../assets/signup/Group 133.png";

function innerPropertyItem({
  setPotential,
  potentialByerButton,
  ToggleButton,
  userData,
}) {
  console.log("userDatauserData==>", userData);
  // ============= JSX =====================
  return (
    <>
      <div className="sw inner-section-1">
        <Carousel>
          {userData &&
            userData.uploadImages &&
            userData.uploadImages.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <div className="carousel-inner-imageDiv">
                    <img
                      className="d-block w-100"
                      src={
                        item &&
                        // configData.COMMON_MEDIA_LINK_URL +
                        //   "/postproperty/" +
                        item.propertyImage
                      }
                      alt="_Status_image"
                    />
                  </div>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
      {/* ------------------------------------------------- */}
      <div className="inner-section-2">
        <div className="property-info-row-1">
          <div className="catagory-info">
            <p>
              Property Catagory&nbsp;
              <span>
                {userData &&
                userData.basicdetails &&
                userData.basicdetails.typeOfBusiness === "pg" ? (
                  <strong>
                    {userData &&
                      userData.basicdetails.typeOfBusiness.toUpperCase()}
                  </strong>
                ) : (
                  <strong>
                    {userData &&
                      userData.basicdetails.typeOfProperty
                        .charAt(0)
                        .toUpperCase() +
                        userData.basicdetails.typeOfProperty.slice(1)}
                  </strong>
                )}
              </span>
              {userData && userData.basicdetails.subCatagory != "" && (
                <>
                  / Type of property
                  <span>
                    <strong>
                      {userData &&
                        userData.basicdetails.subCatagory
                          .charAt(0)
                          .toUpperCase() +
                          userData.basicdetails.subCatagory.slice(1)}
                    </strong>
                  </span>
                </>
              )}
              /
              {userData.basicdetails.catagory && userData.basicdetails.catagory}{" "}
              for
              {userData.basicdetails.typeOfBusiness &&
                userData.basicdetails.typeOfBusiness === "sell" &&
                " Sale"}
              {userData.basicdetails.typeOfBusiness &&
                userData.basicdetails.typeOfBusiness === "rent/lease" &&
                " Rent or Lease"}
              {userData.basicdetails.typeOfBusiness &&
                userData.basicdetails.typeOfBusiness === "pg" &&
                " Rent (PG)"}
            </p>
            <p>
              {userData.location && userData.location.apartmentAndSocity}

              {userData.location && userData.location.length === 0 ? (
                ""
              ) : (
                <>
                  {`>`}
                  {userData.location && userData.location.houseNumber}
                </>
              )}

              {userData.location && userData.location === "" ? (
                ""
              ) : (
                <>
                  {`>`}
                  {userData.location && userData.location.subLocality}
                </>
              )}

              {userData.location && userData.location === "" ? (
                ""
              ) : (
                <>
                  {`>`} {userData.location && userData.location.locality}
                </>
              )}

              {userData.location && userData.location === "" ? (
                ""
              ) : (
                <>
                  {`>`}
                  {userData.location && userData.location.city}
                </>
              )}
            </p>
          </div>

          <div className="active-ads-btn">
            {potentialByerButton === true && (
              <div className="active_button">
                <button onClick={() => setPotential(true)}>
                  <MdAddShoppingCart className="Myads_EditAas_icons" />
                  Potential Buyers
                </button>
              </div>
            )}
            {ToggleButton === true && (
              <div className="active-ads-btn-1">
                <span className="flex_c">
                  <BsFillPencilFill />
                </span>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            )}
          </div>
          {userData?.user?.user_type == "business" && (
            <div className="AccountChange_UserRegisteredAdmin">
              <div className="AccountChange_AccountIcon">
                <img src={imgBus} alt="user..." />
              </div>
              <div className="">
                <h6 className="AccountChange_UserRegisteredAdminParagraph">
                  Business(agent)
                </h6>
              </div>
            </div>
          )}
        </div>
        <div className="hrLine"></div>
        <div className="property-info-row-2">
          <div>
            {userData &&
            userData.basicdetails &&
            userData.basicdetails.typeOfBusiness === "pg" ? (
              <span>
                ₹
                {userData &&
                  userData.pricinganddetails.rentDetails &&
                  userData.pricinganddetails.rentDetails}
                <span style={{ fontWeight: 300, fontSize: "10px" }}>
                  /month
                </span>
              </span>
            ) : (
              <span>
                ₹
                {userData &&
                  userData.pricinganddetails.pricingDetails &&
                  userData.pricinganddetails.pricingDetails.expectedPrice}
                {userData &&
                  userData.basicdetails.typeOfBusiness &&
                  userData.basicdetails.typeOfBusiness == "rent/lease" && (
                    <span style={{ fontWeight: 300, fontSize: "10px" }}>
                      /month
                    </span>
                  )}
              </span>
            )}
          </div>
          <div>
            {userData &&
            userData.basicdetails &&
            userData.basicdetails.typeOfBusiness === "pg" ? (
              <>
                <span>
                  {userData &&
                    userData.pricinganddetails.securityDepositeAmmount &&
                    userData.pricinganddetails.securityDepositeAmmount}
                </span>
                <span>Security Deposite</span>
              </>
            ) : (
              <>
                <span>
                  {userData &&
                    userData.aboutproperty &&
                    userData.aboutproperty.carpetArea}
                </span>
                <span>
                  {userData &&
                    userData.aboutproperty &&
                    userData.aboutproperty.areaMessurementUnit}
                </span>
              </>
            )}
          </div>
          <div>
            <span>
              {" "}
              {userData &&
              userData.basicdetails &&
              userData.basicdetails.typeOfBusiness === "pg" ? (
                <>
                  {" "}
                  <>
                    {userData &&
                      userData.aboutproperty.capacityAndAvailability &&
                      userData.aboutproperty.capacityAndAvailability
                        .noOfBed}{" "}
                    Bed
                  </>
                </>
              ) : (
                <>
                  {userData &&
                    userData.aboutproperty.roomDetails &&
                    userData.aboutproperty.roomDetails.noOfBedRooms}{" "}
                  room
                </>
              )}
            </span>
          </div>
        </div>

        <div className="property-info-row-3">
          This{" "}
          {userData &&
          userData.basicdetails &&
          userData.basicdetails.typeOfBusiness === "pg" ? (
            <>
              {userData && userData.basicdetails.typeOfBusiness.toUpperCase()}
            </>
          ) : (
            <>
              {" "}
              {userData &&
                userData.basicdetails.typeOfProperty.charAt(0).toUpperCase() +
                  userData.basicdetails.typeOfProperty.slice(1)}{" "}
              property
            </>
          )}
          &nbsp; is located on&nbsp;
          {userData && userData.location && userData.location.city}. Highly
          connected with easy available routes to reach on the location and
          available at just ₹&nbsp;
          {userData &&
          userData.basicdetails &&
          userData.basicdetails.typeOfBusiness === "pg" ? (
            <>
              {userData &&
                userData.pricinganddetails.rentDetails &&
                userData.pricinganddetails.rentDetails}
            </>
          ) : (
            <>
              {userData &&
                userData.pricinganddetails.pricingDetails &&
                userData.pricinganddetails.pricingDetails.expectedPrice}
            </>
          )}
          &nbsp;contact listing owner to deal.
        </div>

        <div className="property-info-row-4">
          <div className="flex_c">
            <span className="flex_c">
              <AiFillEye />
            </span>
            {userData &&
            userData.user &&
            // userData.user.length > 0 &&
            // userData &&
            // userData.user &&
            userData.user.mobilenumber
              ? userData.user.mobilenumber
              : "This user dis'n have contact"}
          </div>
        </div>
      </div>
    </>
  );
}

export default innerPropertyItem;
