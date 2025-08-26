import React, { useEffect, useState } from "react";
import "./MyAds.css";
import { AiFillHeart } from "react-icons/ai";
import { FcManager } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import { MdAddShoppingCart, MdOutlineVerified } from "react-icons/md";
import ImgData from "../../../Home/Nav/StatusData";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { RiPencilFill } from "react-icons/ri";
import img1 from "../../../../assets/statusimg/img2.jpg";
import { GiDiamondTrophy } from "react-icons/gi";
import configData from "../../../../config/config.json";

const MobileSearchListList = ({
  ele,
  setHeart,
  handlePotentialBuyers,
  handleActiveProperty,
}) => {
  const [coverImg, setCoverImg] = useState();

  // console.log('coverImg=>',coverImg);
  useEffect(() => {
    if (ele && ele.uploadImages) {
      for (let element of ele.uploadImages) {
        if (element.isCoverImage === true) {
          setCoverImg(
            // configData.COMMON_MEDIA_LINK_URL +
            //   "/postproperty/" +
            element.propertyImage
          );
        }
      }
    }
  }, [ele]);
  return (
    <>
      <div
        className={`MobileSearchListList_mainContainerDiv ${
          ele.is_active && ele.is_active === false && "opacity"
        }`}
      >
        <div className="MobileSearchListList_ImageContainerDiv">
          <img src={coverImg} alt="Cover image ..." />
          {/* {Verified === "Verified" && ( */}
          <div className="flex_c PropertyPriceDetails_verified  MobileViewVerified">
            <MdOutlineVerified className="MobileViewVerified_MdOutlineVerified" />
            <p>Verified</p>
          </div>
          <div className="flex_c PropertyPriceDetails_verified PropertyPriceDetails_feature MobileViewFeature">
            <GiDiamondTrophy className="MobileViewVerified_MdOutlineVerified" />
            <p>Feature</p>
          </div>
          {/* )} */}
        </div>
        <div className=" MobileSearchListList_PriceContainerDiv">
          <div className="flex_c MobileSearchListList_PriceContainer">
            <div className=" MobileSearchListList_Price">
              {ele &&
              ele.basicdetails &&
              ele.basicdetails.typeOfBusiness === "pg" ? (
                <h3>
                  ₹
                  {ele &&
                    ele.pricinganddetails.rentDetails &&
                    ele.pricinganddetails.rentDetails.toLocaleString("en-IN")}
                  <span style={{ fontWeight: 300, fontSize: "10px" }}>
                    /month
                    {ele &&
                      ele.aboutproperty &&
                      ele.aboutproperty.roomDetails &&
                      ele.aboutproperty.roomDetails.roomTypes == "Sharing" &&
                      "/Bed"}
                  </span>
                </h3>
              ) : (
                <h3>
                  ₹
                  {ele &&
                    ele.pricinganddetails.pricingDetails &&
                    ele.pricinganddetails.pricingDetails.expectedPrice.toLocaleString(
                      "en-IN"
                    )}{" "}
                  {ele &&
                    ele.basicdetails.typeOfBusiness &&
                    ele.basicdetails.typeOfBusiness == "rent/lease" && (
                      <span style={{ fontWeight: 300, fontSize: "10px" }}>
                        /month
                      </span>
                    )}
                </h3>
              )}
              <p className="t_c">
                {ele.basicdetails.catagory && ele.basicdetails.catagory} for
                {ele.basicdetails.typeOfBusiness &&
                  ele.basicdetails.typeOfBusiness === "sell" &&
                  " Sale"}
                {ele.basicdetails.typeOfBusiness &&
                  ele.basicdetails.typeOfBusiness === "rent/lease" &&
                  " Rent or Lease"}
                {ele.basicdetails.typeOfBusiness &&
                  ele.basicdetails.typeOfBusiness === "pg" &&
                  " Rent (PG)"}
              </p>
            </div>
            <div className="">
              {/* <AiFillHeart
                className={heart === true ? " like" : "  unlike"}
                onClick={() => setHeart(!heart)}
              /> */}
              <div className="Myads_EditAas">
                {ele.is_active && ele.is_active === true && (
                  <>
                    <div className="form-check form-switch sw  UserTable_toggleSwitch MyServiceToggleButtons">
                      <label
                        className="form-check-label form-check-label-color:red sw"
                        htmfor="flexSwitchCheckDefault"
                      >
                        <input
                          className="form-check-input  sw  "
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          // checked={false}
                          disabled={
                            ele && ele.admin_approval == "pending" && true
                          }
                          checked={ele && ele.is_active && ele.is_active}
                          onClick={() => handleActiveProperty(ele && ele._id)}
                        />
                      </label>
                    </div>
                    <button onClick={() => handlePotentialBuyers(ele)}>
                      <MdAddShoppingCart className="Myads_EditAas_icons" />
                      Potential Buyers
                    </button>
                    <NavLink to={`/postproperty?propertyId=${ele._id}`}>
                      <button className="Myads_EditAas_button">
                        <RiPencilFill className="Myads_EditAas_icons" />
                        Edit
                      </button>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex_c MobileSearchListList_ContactOwnerContainerDiv">
            <div className="MobileSearchListList_ContactOwnerButton">
              <button
                type="button"
                className=" MobileSearchListList_contactowner_button"
              >
                <FcManager className="MobileSearchListList_OwnerIcon" />
                <span>
                  {ele && ele.property_view && ele.property_view.count} views
                </span>
              </button>
              <p className="MobileSearchListList_AdressFontSize">
                {ele.location && ele.location.apartmentAndSocity}

                {ele.location && (
                  <>
                    {`>`}
                    {ele.location.houseNumber}
                  </>
                )}

                {ele.location && (
                  <>
                    {`>`}
                    {ele.location.subLocality}
                  </>
                )}

                {ele.location && (
                  <>
                    {`>`} {ele.location.locality}
                  </>
                )}

                {ele.location && (
                  <>
                    {`>`}
                    {ele.location.city}
                  </>
                )}
              </p>
            </div>
            <div className=" MobileSearchListList_Date">
              <p>
                {ele &&
                  ele.createdAt &&
                  new Date(ele.createdAt).toLocaleDateString("en-US")}
              </p>
              {ele?.basicdetails?.typeOfBusiness == "sell" && (
                <>
                  {ele?.pricinganddetails?.rera_number && (
                    <p className="searchlist_ReraNUmber">
                      RERA:{ele?.pricinganddetails?.rera_number}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CarouselImg = ({ item }) => {
  // console.log("item", item);
  return (
    <div className="sliders_carosal-div">
      <img
        src={
          item &&
          // configData.COMMON_MEDIA_LINK_URL +
          //   "/postproperty/" +
          item.propertyImage
        }
        alt="image..."
        height="400vh"
        width="100%"
      />
    </div>
  );
};

const Slider = ({ ele }) => {
  const [imageData, setImageData] = useState(ImgData.statusData);
  // console.log(
  //   configData.COMMON_MEDIA_LINK_URL +
  //     "/postproperty/" +
  //     ele.uploadImages[1].propertyImage
  // );
  return (
    <div className="sliders_main_container_div">
      <div className="sliders_container">
        <Carousel>
          {ele &&
            ele.uploadImages.map((items, index) => {
              // console.log(configData.COMMON_MEDIA_LINK_URL +
              //   "/postproperty/" +
              //   items.propertyImage);
              return (
                <Carousel.Item>
                  <CarouselImg
                    item={items}
                    // item={'https://homescoutes.onrender.com/media/postproperty/d88efc7f65e65e92d3fb8102a23c096c.jpg'}
                  />
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

const MyAds = ({
  ele,
  handlePotentialBuyers,
  approvel,
  handleActiveProperty,
}) => {
  console.log("ele====>",ele.is_active);
  return (
    <>
      <div style={{ position: "relative" }}>
        {ele && ele.is_active === false && (
          <>
            <div className="Myads_EditToActive">
              <div className="form-check form-switch sw  UserTable_toggleSwitch MyServiceToggleButtons">
                <label
                  className="form-check-label form-check-label-color:red sw"
                  htmfor="flexSwitchCheckDefault"
                >
                  <input
                    className="form-check-input  sw  "
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    // checked={false}
                    disabled={ele && ele.admin_approval == "pending" && true}
                    checked={ele && ele.is_active && ele.is_active}
                    onClick={() => handleActiveProperty(ele && ele._id)}
                  />
                </label>
              </div>
              <NavLink to={`/postproperty?propertyId=${ele._id}`}>
                <button className="Myads_EditAas_button">
                  <RiPencilFill className="Myads_EditAas_icons" />
                  Edit
                </button>
              </NavLink>
            </div>
          </>
        )}
        <div
          className={`b_r bg_w sw MyAds_main_container_div ${
            ele && ele.is_active === false && "opacity"
          }  ${ele && ele.admin_approval == "rejected" && "adminReject"} ${
            ele && ele.admin_approval == "pending" && "adminPending"
          }`}
        >
          <p className=" MyAds_postdate">
            <i>
              Post on{" "}
              {ele &&
                ele.createdAt &&
                new Date(ele.createdAt).toLocaleDateString("en-US")}
            </i>
            <div style={{ display: "flex", gap: "5px" }}>
              {ele?.basicdetails?.typeOfBusiness == "sell" && (
                <>
                  {ele?.pricinganddetails?.rera_number && (
                    <p className="searchlist_ReraNUmber">
                      RERA:{ele?.pricinganddetails?.rera_number}
                    </p>
                  )}
                </>
              )}
              {approvel === true && (
                <i>Admin {ele && ele.admin_approval} this proprty</i>
              )}
            </div>
          </p>
          <div className="MyAds_container_div">
            <div className="MyAds_slider_container_div">
              <Slider ele={ele && ele} />
            </div>
            <div className="b_r sw bg_w MyAds_detailsandimages_div">
              <div className="MyAds_images_div"></div>
              <div className="MyAds_details_container_div">
                <div className="MyAds_detailstype_div">
                  <p>
                    Property Catagory&nbsp;
                    <span>
                      {ele &&
                      ele.basicdetails &&
                      ele.basicdetails.typeOfBusiness === "pg" ? (
                        <strong>
                          {ele && ele.basicdetails.typeOfBusiness.toUpperCase()}
                        </strong>
                      ) : (
                        <strong>
                          {ele &&
                            ele.basicdetails.typeOfProperty
                              .charAt(0)
                              .toUpperCase() +
                              ele.basicdetails.typeOfProperty.slice(1)}
                        </strong>
                      )}
                    </span>
                    {ele && ele.basicdetails.subCatagory != "" && (
                      <>
                        / Type of property
                        <span>
                          <strong>
                            {ele &&
                              ele.basicdetails.subCatagory
                                .charAt(0)
                                .toUpperCase() +
                                ele.basicdetails.subCatagory.slice(1)}
                          </strong>
                        </span>
                      </>
                    )}
                    /{ele.basicdetails.catagory && ele.basicdetails.catagory}{" "}
                    for
                    {ele.basicdetails.typeOfBusiness &&
                      ele.basicdetails.typeOfBusiness === "sell" &&
                      " Sale"}
                    {ele.basicdetails.typeOfBusiness &&
                      ele.basicdetails.typeOfBusiness === "rent/lease" &&
                      " Rent or Lease"}
                    {ele.basicdetails.typeOfBusiness &&
                      ele.basicdetails.typeOfBusiness === "pg" &&
                      " Rent (PG)"}
                  </p>
                  <div>
                    <div className="">
                      <div className="Myads_EditAas">
                        {ele && ele.is_active === true && (
                          <>
                            <div className="form-check form-switch sw  UserTable_toggleSwitch MyServiceToggleButtons">
                              <label
                                className="form-check-label form-check-label-color:red sw"
                                htmfor="flexSwitchCheckDefault"
                              >
                                <input
                                  className="form-check-input  sw  "
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                  // checked={false}
                                  disabled={
                                    ele &&
                                    ele.admin_approval == "pending" &&
                                    true
                                  }
                                  checked={
                                    ele && ele.is_active && ele.is_active
                                  }
                                  onClick={() =>
                                    handleActiveProperty(ele && ele._id)
                                  }
                                />
                              </label>
                            </div>
                            <button onClick={() => handlePotentialBuyers(ele)}>
                              <MdAddShoppingCart className="Myads_EditAas_icons" />
                              Potential Buyers
                            </button>
                            <NavLink to={`/postproperty?propertyId=${ele._id}`}>
                              <button className="Myads_EditAas_button">
                                <RiPencilFill className="Myads_EditAas_icons" />
                                Edit
                              </button>
                            </NavLink>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="MyAds_propertylocation_div">
                  <p>
                    {ele.location && ele.location.apartmentAndSocity}

                    {ele.location && (
                      <>
                        {`>`}
                        {ele.location.houseNumber}
                      </>
                    )}

                    {ele.location && (
                      <>
                        {`>`}
                        {ele.location.subLocality}
                      </>
                    )}

                    {ele.location && (
                      <>
                        {`>`} {ele.location.locality}
                      </>
                    )}

                    {ele.location && (
                      <>
                        {`>`}
                        {ele.location.city}
                      </>
                    )}
                  </p>
                </div>
                <div className="MyAds_prices_div">
                  {ele &&
                  ele.basicdetails &&
                  ele.basicdetails.typeOfBusiness === "pg" ? (
                    <h6>
                      ₹
                      {ele &&
                        ele.pricinganddetails.rentDetails &&
                        ele.pricinganddetails.rentDetails}
                      <span style={{ fontWeight: 300, fontSize: "10px" }}>
                        /month
                        {ele &&
                          ele.aboutproperty &&
                          ele.aboutproperty.roomDetails &&
                          ele.aboutproperty.roomDetails.roomTypes ==
                            "Sharing" &&
                          "/Bed"}
                      </span>
                    </h6>
                  ) : (
                    <h6>
                      ₹
                      {ele &&
                        ele.pricinganddetails.pricingDetails &&
                        ele.pricinganddetails.pricingDetails.expectedPrice}{" "}
                      {ele &&
                        ele.basicdetails.typeOfBusiness &&
                        ele.basicdetails.typeOfBusiness == "rent/lease" && (
                          <span style={{ fontWeight: 300, fontSize: "10px" }}>
                            /month
                          </span>
                        )}
                    </h6>
                  )}
                  <p style={{ display: "flex", alignItems: "end", gap: "1px" }}>
                    {ele &&
                    ele.basicdetails &&
                    ele.basicdetails.typeOfBusiness === "pg" ? (
                      <>
                        <h6>
                          {ele &&
                          ele.aboutproperty &&
                          ele.aboutproperty.roomDetails &&
                          ele.aboutproperty.roomDetails.roomTypes == "Sharing"
                            ? "Sharing Room"
                            : "Private Room"}
                        </h6>
                        {ele &&
                          ele.aboutproperty &&
                          ele.aboutproperty.roomDetails &&
                          ele.aboutproperty.roomDetails.roomTypes ==
                            "Sharing" && (
                            <span style={{ fontWeight: 300, fontSize: "10px" }}>
                              Share by{" "}
                              {ele &&
                                ele.aboutproperty &&
                                ele.aboutproperty.capacityAndAvailability &&
                                ele.aboutproperty.capacityAndAvailability
                                  .noOfBed &&
                                ele.aboutproperty.capacityAndAvailability
                                  .noOfBed}
                            </span>
                          )}
                      </>
                    ) : (
                      <>
                        <h6>
                          {ele &&
                            ele.aboutproperty &&
                            ele.aboutproperty.carpetArea}
                        </h6>
                        <span>
                          {ele &&
                            ele.aboutproperty &&
                            ele.aboutproperty.areaMessurementUnit}
                        </span>
                      </>
                    )}
                  </p>
                  {ele &&
                  ele.basicdetails &&
                  ele.basicdetails.typeOfBusiness === "pg" ? (
                    <>
                      {" "}
                      <h6>
                        For{" "}
                        {ele &&
                          ele.aboutproperty &&
                          ele.aboutproperty.availableFor &&
                          ele.aboutproperty.availableFor}
                      </h6>
                    </>
                  ) : (
                    <h6>
                      {ele &&
                        ele.aboutproperty.roomDetails &&
                        ele.aboutproperty.roomDetails.noOfBedRooms}{" "}
                      room
                    </h6>
                  )}
                </div>
                <div className="MyAds_description_div">
                  <p>
                    This{" "}
                    {ele &&
                    ele.basicdetails &&
                    ele.basicdetails.typeOfBusiness === "pg" ? (
                      <>
                        {ele && ele.basicdetails.typeOfBusiness.toUpperCase()}
                      </>
                    ) : (
                      <>
                        {" "}
                        {ele &&
                          ele.basicdetails.typeOfProperty
                            .charAt(0)
                            .toUpperCase() +
                            ele.basicdetails.typeOfProperty.slice(1)}{" "}
                        property
                      </>
                    )}
                    &nbsp; is located on&nbsp;
                    {ele && ele.location && ele.location.city}. Highly connected
                    with easy available routes to reach on the location and
                    available at just ₹&nbsp;
                    {ele &&
                    ele.basicdetails &&
                    ele.basicdetails.typeOfBusiness === "pg" ? (
                      <>
                        {ele &&
                          ele.pricinganddetails.rentDetails &&
                          ele.pricinganddetails.rentDetails}
                      </>
                    ) : (
                      <>
                        {ele &&
                          ele.pricinganddetails.pricingDetails &&
                          ele.pricinganddetails.pricingDetails.expectedPrice}
                      </>
                    )}
                    &nbsp;contact listing owner to deal.
                  </p>
                </div>
                <div className="MyAds_contactowner_div">
                  <button
                    type="button"
                    class=" MyAds_contactowner_button"
                    // onClick={()=>setOwnerCont(true)}
                  >
                    <FcManager id="OwnerIcon" />
                    <span>
                      {ele && ele.property_view && ele.property_view.count}{" "}
                      views
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className=" MyAds_roomdetails_more_div">
              <div className="MyAds_roomdetails_div">
                {ele &&
                  ele.basicdetails &&
                  ele.basicdetails.typeOfBusiness === "pg" && (
                    <>
                      {ele.pricinganddetails.someHouseRules &&
                        ele.pricinganddetails.someHouseRules.alcoholAllowed ===
                          true && (
                          <NavLink to="" className="MyAds_iconparagraph_div">
                            <TiTick className="MyAds_icons_div" />
                            <p>Alcohol Allowed</p>
                          </NavLink>
                        )}
                      {ele.pricinganddetails.someHouseRules &&
                        ele.pricinganddetails.someHouseRules.partyAllowed ===
                          true && (
                          <NavLink to="" className="MyAds_iconparagraph_div">
                            <TiTick className="MyAds_icons_div" />
                            <p>Party Allowed</p>
                          </NavLink>
                        )}
                      {ele.pricinganddetails.someHouseRules &&
                        ele.pricinganddetails.someHouseRules.petsAllowed ===
                          true && (
                          <NavLink to="" className="MyAds_iconparagraph_div">
                            <TiTick className="MyAds_icons_div" />
                            <p>Pets Allowed</p>
                          </NavLink>
                        )}
                      {ele.pricinganddetails.someHouseRules &&
                        ele.pricinganddetails.someHouseRules.smokingAllowed ===
                          true && (
                          <NavLink to="" className="MyAds_iconparagraph_div">
                            <TiTick className="MyAds_icons_div" />
                            <p>Smoking Allowed</p>
                          </NavLink>
                        )}
                      {ele.pricinganddetails.someHouseRules &&
                        ele.pricinganddetails.someHouseRules.visitorsAllowed ===
                          true && (
                          <NavLink to="" className="MyAds_iconparagraph_div">
                            <TiTick className="MyAds_icons_div" />
                            <p>Visitors Allowed</p>
                          </NavLink>
                        )}
                    </>
                  )}

                {ele.aboutproperty.furnishingType != "" && (
                  <NavLink to="" className="MyAds_iconparagraph_div">
                    <TiTick className="MyAds_icons_div" />
                    <p>{ele.aboutproperty.furnishingType}</p>
                  </NavLink>
                )}
              </div>
              <div className="MyAds_iconmore_div">
                <NavLink to="" className="flex_c MyAds_iconmore_div">
                  {/* <TiTick className="MyAds_icons_div" /> */}
                  {/* <p>more{">>"}</p> */}
                </NavLink>
              </div>  
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default MyAds;
