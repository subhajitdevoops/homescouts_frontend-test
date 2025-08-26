import React, { useState } from "react";
import { AiFillFire, AiFillHeart } from "react-icons/ai";
import { FcManager } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import { MdOutlineVerified } from "react-icons/md";
import "./Searchlist.css";
import ImgData from "../../Home/Nav/StatusData";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import img1 from "../../../assets/statusimg/img2.jpg";
import { GiDiamondTrophy } from "react-icons/gi";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import configData from "../../../config/config.json";
import { useEffect } from "react";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import { ToastContainer, toast } from "react-toastify";

export const MobileSearchListList = ({
  heart,
  setHeart,
  user,
  handleProductPageId,
  Address,
  sellerDetails,
  userToken,
  handleShortListProperty,
  ownerCont,
  setOwnerCont,
  heardId,
  detailsPage,
  contactDetails,
  AgentRERA,
}) => {
  console.log("MobileSearchListList===>", sellerDetails);
  const [coverImg, setCoverImg] = useState();
  const handleButtonClick = (phoneNumber) => {
    const dialerLink = `tel:${phoneNumber}`;
    window.location.href = dialerLink;
  };

  // console.log('coverImg=>',coverImg);
  useEffect(() => {
    if (user && user.uploadImages) {
      for (let element of user.uploadImages) {
        if (element.isCoverImage === true) {
          setCoverImg(
            // configData.COMMON_MEDIA_LINK_URL +
            //   "/postproperty/" +
            element.propertyImage
          );
        }
      }
    }
  }, [user]);
  return (
    <>
      <div className=" MobileSearchListList_mainContainerDiv">
        <NavLink
          to={`/Property-Details?_id=${user._id && user._id}`}
          className="flex_c searchlist_iconmore_div"
        >
          <div
            className="MobileSearchListList_ImageContainerDiv"
            onClick={() => handleProductPageId(user._id)}
          >
            <img src={coverImg} alt="property image ..." />
            {/* {Verified === "Verified" && ( */}

            {user && user.is_verified && user.is_verified === true ? (
              <div className="flex_c PropertyPriceDetails_verified  MobileViewVerified">
                <MdOutlineVerified className="MobileViewVerified_MdOutlineVerified" />
                <p>Verified</p>
              </div>
            ) : null}

            {/* )} */}
            {user && user.is_feacher && user.is_feacher === true ? (
              <div className="flex_c PropertyPriceDetails_verified PropertyPriceDetails_feature MobileViewFeature">
                <GiDiamondTrophy className="MobileViewVerified_MdOutlineVerified" />
                <p>Feature</p>
              </div>
            ) : null}
          </div>
        </NavLink>
        <div className=" MobileSearchListList_PriceContainerDiv">
          <div className="flex_c MobileSearchListList_PriceContainer">
            <NavLink to={`/Property-Details?_id=${user._id && user._id}`}>
              <div className=" MobileSearchListList_Price">
                {user &&
                user.basicdetails &&
                user.basicdetails.typeOfBusiness === "pg" ? (
                  <h3>
                    ₹
                    {user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.rentDetails &&
                      user.pricinganddetails.rentDetails.toLocaleString(
                        "en-IN"
                      )}
                    <span style={{ fontWeight: 300, fontSize: "10px" }}>
                      /month
                      {user &&
                        user.aboutproperty &&
                        user.aboutproperty.roomDetails &&
                        user.aboutproperty.roomDetails.roomTypes == "Sharing" &&
                        "/Bed"}
                    </span>
                  </h3>
                ) : (
                  <h3>
                    ₹
                    {user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.pricingDetails &&
                      user.pricinganddetails.pricingDetails.expectedPrice.toLocaleString(
                        "en-IN"
                      )}{" "}
                    {user &&
                      user.basicdetails.typeOfBusiness &&
                      user.basicdetails.typeOfBusiness == "rent/lease" && (
                        <span style={{ fontWeight: 300, fontSize: "10px" }}>
                          /month
                        </span>
                      )}
                  </h3>
                )}
                <p className="t_c">
                  {user &&
                    user.basicdetails.catagory &&
                    user.basicdetails.catagory}{" "}
                  for
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
                    " Rent (PG)"}
                </p>
              </div>
            </NavLink>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {user?.basicdetails?.typeOfBusiness == "sell" && (
                <>
                  {user?.pricinganddetails?.rera_number && (
                    <p className="searchlist_ReraNUmber">
                      RERA:{user?.pricinganddetails?.rera_number}
                    </p>
                  )}
                </>
              )}

              {user &&
              user.pricinganddetails &&
              user.pricinganddetails.firesaleOrNot === true ? (
                <AiFillFire title="Firesale" className="AiFillFire_container" />
              ) : (
                ""
              )}
              <div className=" hearrt">
                {userToken ? (
                  <AiFillHeart
                    id={heardId}
                    className={
                      user && heart && heart.length > 0 && heart === user._id
                        ? " like"
                        : "  unlike"
                    }
                    onClick={() => handleShortListProperty(user._id)}
                  />
                ) : (
                  <AiFillHeart
                    id={heardId}
                    className={
                      user && heart && heart.length > 0 && heart === user._id
                        ? " like"
                        : "  unlike"
                    }
                    onClick={() => {
                      toast.warning(
                        "Please, login to Add this item on your list."
                      );
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex_c MobileSearchListList_ContactOwnerContainerDiv">
            <div className="MobileSearchListList_ContactOwnerButton">
              {contactDetails ? (
                <>
                  <button
                    type="button"
                    className=" MobileSearchListList_contactowner_button"
                    onClick={(e) =>
                      handleButtonClick(
                        sellerDetails && sellerDetails.mobilenumber
                      )
                    }
                  >
                    <FcManager
                      id="OwnerIcon"
                      className="MobileSearchListList_OwnerIcon"
                    />
                    {userToken ? (
                      <span>
                        {sellerDetails && sellerDetails.mobilenumber
                          ? sellerDetails.mobilenumber
                          : "owner didn't have contact number"}
                      </span>
                    ) : (
                      "Please login first to view contact"
                    )}
                  </button>
                </>
              ) : (
                <>
                  {ownerCont ? (
                    <button
                      type="button"
                      className=" MobileSearchListList_contactowner_button"
                      onClick={(e) => {
                        // e.preventdefault();
                        setOwnerCont(false);
                      }}
                    >
                      <FcManager
                        id="OwnerIcon"
                        className="MobileSearchListList_OwnerIcon"
                      />
                      {userToken ? (
                        <span>
                          {detailsPage === true ? (
                            <>
                              {sellerDetails && sellerDetails.mobilenumber
                                ? sellerDetails.mobilenumber
                                : "owner didn't have contact number"}
                            </>
                          ) : (
                            <>
                              {user && user.user && user.user.mobilenumber
                                ? user.user.mobilenumber
                                : "owner didn't have contact number"}
                            </>
                          )}
                        </span>
                      ) : (
                        "Please login first to view contact"
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      class=" MobileSearchListList_contactowner_button"
                      onClick={(e) => {
                        // e.preventdefault();
                        setOwnerCont(true);
                      }}
                    >
                      <FcManager
                        id="OwnerIcon"
                        className="MobileSearchListList_OwnerIcon"
                      />
                      <span>Contact Owner</span>
                    </button>
                  )}
                </>
              )}
              <NavLink to={`/Property-Details?_id=${user._id && user._id}`}>
                <p className="MobileSearchListList_AdressFontSize">
                  {Address === true && (
                    <>
                      {user &&
                        user.location &&
                        user.location.apartmentAndSocity}

                      {user && user.location && user.location.houseNumber ? (
                        <>
                          {`>`}
                          {user.location.houseNumber}
                        </>
                      ) : (
                        ""
                      )}

                      {user &&
                        user.location &&
                        user.location &&
                        user.location.subLocality && (
                          <>
                            {`>`}
                            {user.location && user.location.subLocality}
                          </>
                        )}

                      {user.location && user.location.locality && (
                        <>
                          {`>`} {user.location && user.location.locality}
                          {`>`}
                        </>
                      )}
                    </>
                  )}

                  {user && user.location && <>{user.location.city}</>}
                </p>
              </NavLink>
            </div>
            <NavLink to={`/Property-Details?_id=${user._id && user._id}`}>
              <div
                className=" MobileSearchListList_Date"
                style={{ textAlign: "end" }}
              >
                <p>
                  {user &&
                    user.createdAt &&
                    new Date(user.createdAt).toLocaleDateString("en-US")}
                </p>

                {user?.basicdetails?.typeOfBusiness == "sell" && (
                  <>
                    {AgentRERA && (
                      <p className="searchlist_ReraNUmber">
                        Agent RERA no: {AgentRERA}
                      </p>
                    )}
                  </>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

const CarouselImg = ({ item }) => {
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

const Slider = ({ user }) => {
  const [imageData, setImageData] = useState(ImgData.statusData);
  // console.log("user", user);
  return (
    <div className="sliders_main_container_div">
      <div className="sliders_container">
        <Carousel width={200}>
          {user &&
            user.uploadImages &&
            user.uploadImages.map((item, index) => {
              return (
                // <div key={index}>

                <Carousel.Item>
                  <CarouselImg item={item} />
                </Carousel.Item>
                // </div>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

const Searchlist = ({
  user,
  ownerNo,
  Verified,
  shortListButton,
  heardId,
  setLists,
  lists,
  shortListFunction,
}) => {
  const [heart, setHeart] = useState(
    user && user.sortliststatus === true && user._id
  );
  const value = useContext(AuthContext);
  const [ownerCont, setOwnerCont] = useState(false);

  // -----------------------------------------------------------------------
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);

  const handleProductPageId = (productId) => {
    value.setProductId(productId);
  };
  // console.log("user============>", user);

  const handleShortListProperty = async (id) => {
    if (userToken) {
      const shortListPropertyId = {
        id: id,
      };

      let ResBasic = await API_REQ_POST_WITH_TOKEN(
        configData.USER_SERVICE_PROPERTY_SHORTLIST_URL,
        shortListPropertyId,
        userToken
      );

      if (ResBasic) {
        if (ResBasic.success === true) {
          // toast.success(ResBasic.message);
          if (heart === id) {
            setHeart("");
            console.log("lists==>", lists);
            if (shortListFunction === true) {
              const AllData = [...lists];
              const filterProperty = AllData.filter(
                (ele, index) => ele._id !== id
              );
              setLists(filterProperty);
            }
          } else {
            setHeart(id);
          }
        } else {
          toast.warning(ResBasic.message);
        }
      } else {
        toast.error("Please Check Your Internet !");
      }
    }else{
      toast.warning('Please Login for shortlisted this property')
    }
    // console.log("123");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseonhover={false}
      />
      <div className="b_r bg_w sw searchlist_main_container_div">
        <p className=" searchlist_postdate">
          <span className="searchlist_postdateReraNUmber">
            <i>
              Post on{" "}
              {user?.createdAt &&
                new Date(user.createdAt).toLocaleDateString("en-US")}
            </i>
            {user?.basicdetails?.typeOfBusiness == "sell" && (
              <>
                {user?.pricinganddetails?.rera_number && (
                  <p className="searchlist_ReraNUmber">
                    RERA:{user?.pricinganddetails?.rera_number}
                  </p>
                )}
              </>
            )}
          </span>
          <div style={{ display: "flex", gap: "5px" }}>
            {user?.basicdetails?.typeOfBusiness == "sell" && (
              <>
                {user?.user?.rera_number && (
                  <p
                    className="searchlist_ReraNUmber"
                    style={{ backgroundColor: "#f8d319ba" }}
                  >
                    Posted by RERA verified agent : {user?.user?.rera_number}
                  </p>
                )}
              </>
            )}
            {user &&
            user.pricinganddetails &&
            user.pricinganddetails.firesaleOrNot === true ? (
              <AiFillFire title="Firesale" className="AiFillFire_container" />
            ) : (
              ""
            )}
          </div>
        </p>
        <div className="searchlist_container_div">
          <div
            noClick={() => handleProductPageId(user._id)}
            className="searchlist_slider_container_div"
          >
            <NavLink
              to={`/Property-Details?_id=${user._id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Slider user={user && user} />
            </NavLink>
          </div>
          <div className="b_r sw bg_w searchlist_detailsandimages_div">
            <div className="searchlist_images_div"></div>
            <div className="searchlist_details_container_div">
              <div className="searchlist_detailstype_div">
                <p>
                  Property Catagory
                  <span>
                    {user &&
                    user.basicdetails &&
                    user.basicdetails.typeOfBusiness === "pg" ? (
                      <strong>
                        {user && user.basicdetails.typeOfBusiness.toUpperCase()}
                      </strong>
                    ) : (
                      <strong>
                        {/* {user &&
                          user.basicdetails.typeOfProperty&& user.basicdetails.typeOfProperty
                            .charAt(0)
                            .toUpperCase() +
                            user.basicdetails.typeOfProperty.slice(1)} */}
                      </strong>
                    )}
                  </span>
                  {user &&
                    user.basicdetails &&
                    user.basicdetails.subCatagory != "" && (
                      <>
                        / Type of property
                        <span>
                          <strong>
                            {user &&
                              user.basicdetails.subCatagory &&
                              user.basicdetails.subCatagory
                                .charAt(0)
                                .toUpperCase() +
                                user.basicdetails.subCatagory.slice(1)}
                          </strong>
                        </span>
                      </>
                    )}
                  /
                  {user &&
                    user.basicdetails &&
                    user.basicdetails.catagory &&
                    user.basicdetails.catagory}{" "}
                  for
                  {user.basicdetails.typeOfBusiness &&
                    user.basicdetails.typeOfBusiness === "sell" &&
                    " Sale"}
                  {user.basicdetails.typeOfBusiness &&
                    user.basicdetails.typeOfBusiness === "rent/lease" &&
                    " Rent or Lease"}
                  {user.basicdetails.typeOfBusiness &&
                    user.basicdetails.typeOfBusiness === "pg" &&
                    " Rent (PG)"}
                </p>
                <div>
                  {/* {user} */}
                  <div className="flex_c">
                    {Verified === "Verified" && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        {user &&
                        user.is_verified &&
                        user.is_verified === true ? (
                          <div className="flex_c PropertyPriceDetails_verified">
                            <MdOutlineVerified />
                            <p>Verified</p>
                          </div>
                        ) : null}
                        {user && user.is_feacher && user.is_feacher === true ? (
                          <div className="flex_c PropertyPriceDetails_verified PropertyPriceDetails_feature">
                            <GiDiamondTrophy />
                            <p>Feature</p>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                  {shortListButton === true ? (
                    <div className=" hearrt">
                      <AiFillHeart
                        id={heardId}
                        className={
                          user && heart.length > 0 && heart === user._id
                            ? " like"
                            : "  unlike"
                        }
                        onClick={() =>
                          handleShortListProperty(user && user._id)
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {}
                </div>
              </div>
              <NavLink
                to={`/Property-Details?_id=${user._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  noClick={() => handleProductPageId(user._id)}
                  className="searchlist_propertylocation_div"
                >
                  <p>
                    {/* {user.location && user.location.apartmentAndSocity} */}

                    {/* {user.location && (
                    <>
                      {`>`}
                      {user.location.houseNumber}
                    </>
                  )}

                  {user.location && (
                    <>
                      {`>`}
                      {user.location.subLocality}
                    </>
                  )}

                  {user.location && (
                    <>
                      {`>`} {user.location.locality}
                    </>
                  )} */}

                    {user.location && (
                      <>
                        {/* {`>`} */}
                        {user.location.city}
                      </>
                    )}
                  </p>
                </div>
                <div
                  noClick={() => handleProductPageId(user._id)}
                  className="searchlist_prices_div"
                >
                  {user &&
                  user.basicdetails &&
                  user.basicdetails.typeOfBusiness === "pg" ? (
                    <h6>
                      ₹
                      {user &&
                        user.pricinganddetails.rentDetails &&
                        user.pricinganddetails.rentDetails.toLocaleString(
                          "en-IN"
                        )}
                      <span style={{ fontWeight: 300, fontSize: "10px" }}>
                        /month
                        {user &&
                          user.aboutproperty &&
                          user.aboutproperty.roomDetails &&
                          user.aboutproperty.roomDetails.roomTypes ==
                            "Sharing" &&
                          "/Bed"}
                      </span>
                    </h6>
                  ) : (
                    <h6>
                      ₹
                      {user &&
                        user.pricinganddetails.pricingDetails &&
                        user.pricinganddetails.pricingDetails.expectedPrice.toLocaleString(
                          "en-IN"
                        )}{" "}
                      {user &&
                        user.basicdetails.typeOfBusiness &&
                        user.basicdetails.typeOfBusiness == "rent/lease" && (
                          <span style={{ fontWeight: 300, fontSize: "10px" }}>
                            /month
                          </span>
                        )}
                    </h6>
                  )}
                  <p style={{ display: "flex", alignItems: "end", gap: "1px" }}>
                    {user &&
                    user.basicdetails &&
                    user.basicdetails.typeOfBusiness === "pg" ? (
                      <>
                        <h6>
                          {user &&
                          user.aboutproperty &&
                          user.aboutproperty.roomDetails &&
                          user.aboutproperty.roomDetails.roomTypes == "Sharing"
                            ? "Sharing Room"
                            : "Private Room"}
                        </h6>
                        {user &&
                          user.aboutproperty &&
                          user.aboutproperty.roomDetails &&
                          user.aboutproperty.roomDetails.roomTypes ==
                            "Sharing" && (
                            <span style={{ fontWeight: 300, fontSize: "10px" }}>
                              Share by{" "}
                              {user &&
                                user.aboutproperty &&
                                user.aboutproperty.capacityAndAvailability &&
                                user.aboutproperty.capacityAndAvailability
                                  .noOfBed &&
                                user.aboutproperty.capacityAndAvailability
                                  .noOfBed}
                            </span>
                          )}
                      </>
                    ) : (
                      <>
                        <h6>
                          {user &&
                            user.aboutproperty &&
                            user.aboutproperty.carpetArea}
                        </h6>
                        <span>
                          {user &&
                            user.aboutproperty &&
                            user.aboutproperty.areaMessurementUnit}
                        </span>
                      </>
                    )}
                  </p>
                  {user &&
                  user.basicdetails &&
                  user.basicdetails.typeOfBusiness === "pg" ? (
                    <>
                      {" "}
                      <h6>
                        For{" "}
                        {user &&
                          user.aboutproperty &&
                          user.aboutproperty.availableFor &&
                          user.aboutproperty.availableFor}
                      </h6>
                    </>
                  ) : (
                    <h6>
                      {user &&
                        user.aboutproperty.roomDetails &&
                        user.aboutproperty.roomDetails.noOfBedRooms}{" "}
                      room
                    </h6>
                  )}
                </div>
                <div
                  noClick={() => handleProductPageId(user._id)}
                  className="searchlist_description_div"
                >
                  <p>
                    Discover an exquisite
                    {user &&
                    user.basicdetails &&
                    user.basicdetails.typeOfBusiness === "pg" ? (
                      <>
                        {user && user.basicdetails.typeOfBusiness.toUpperCase()}
                      </>
                    ) : (
                      <>
                        {" "}
                        {user &&
                          user.basicdetails.typeOfProperty
                            .charAt(0)
                            .toUpperCase() +
                            user.basicdetails.typeOfProperty.slice(1)}{" "}
                        property
                      </>
                    )}
                    &nbsp; in &nbsp;
                    {user && user.location && user.location.city}. With
                    excellent connectivity and accessible routes. Amazing deal
                    at just ₹&nbsp;
                    {user &&
                    user.basicdetails &&
                    user.basicdetails.typeOfBusiness === "pg" ? (
                      <>
                        {user &&
                          user.pricinganddetails.rentDetails &&
                          user.pricinganddetails.rentDetails.toLocaleString(
                            "en-IN"
                          )}
                      </>
                    ) : (
                      <>
                        {user &&
                          user.pricinganddetails.pricingDetails &&
                          user.pricinganddetails.pricingDetails.expectedPrice.toLocaleString(
                            "en-IN"
                          )}
                      </>
                    )}
                    &nbsp;. Contact the owner now for this fantastic
                    opportunity.
                  </p>
                </div>
              </NavLink>
              <div className="searchlist_contactowner_div">
                {ownerCont ? (
                  <button
                    type="button"
                    class=" searchlist_contactowner_button"
                    onClick={(e) => {
                      // e.preventdefault();
                      setOwnerCont(false);
                    }}
                  >
                    <FcManager
                      id="OwnerIcon"
                      className="MobileSearchListList_OwnerIcon"
                    />
                    {userToken ? (
                      <span>
                        {user && user.user && user.user.mobilenumber
                          ? user.user.mobilenumber
                          : "owner didn't have contact number"}
                      </span>
                    ) : (
                      "Please login first to view contact"
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    class=" searchlist_contactowner_button"
                    onClick={(e) => {
                      // e.preventdefault();
                      setOwnerCont(true);
                    }}
                  >
                    <FcManager
                      id="OwnerIcon"
                      className="MobileSearchListList_OwnerIcon"
                    />
                    <span>Contact Owner</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <NavLink
            to={`/Property-Details?_id=${user._id}`}
            className=" searchlist_roomdetails_more_div"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="searchlist_roomdetails_div">
              {/* {user &&
                user.basicdetails &&
                user.basicdetails.typeOfBusiness === "pg" && ( */}
              <>
                {user.pricinganddetails.someHouseRules &&
                  user.pricinganddetails.someHouseRules.alcoholAllowed ===
                    true && (
                    <NavLink to="" className="MyAds_iconparagraph_div">
                      <TiTick className="MyAds_icons_div" />
                      <p>Alcohol Allowed</p>
                    </NavLink>
                  )}
                {user.pricinganddetails.someHouseRules &&
                  user.pricinganddetails.someHouseRules.partyAllowed ===
                    true && (
                    <NavLink to="" className="MyAds_iconparagraph_div">
                      <TiTick className="MyAds_icons_div" />
                      <p>Party Allowed</p>
                    </NavLink>
                  )}
                {user.pricinganddetails.someHouseRules &&
                  user.pricinganddetails.someHouseRules.petsAllowed ===
                    true && (
                    <NavLink to="" className="MyAds_iconparagraph_div">
                      <TiTick className="MyAds_icons_div" />
                      <p>Pets Allowed</p>
                    </NavLink>
                  )}
                {user.pricinganddetails.someHouseRules &&
                  user.pricinganddetails.someHouseRules.smokingAllowed ===
                    true && (
                    <NavLink to="" className="MyAds_iconparagraph_div">
                      <TiTick className="MyAds_icons_div" />
                      <p>Smoking Allowed</p>
                    </NavLink>
                  )}
                {user.pricinganddetails.someHouseRules &&
                  user.pricinganddetails.someHouseRules.visitorsAllowed ===
                    true && (
                    <NavLink to="" className="MyAds_iconparagraph_div">
                      <TiTick className="MyAds_icons_div" />
                      <p>Visitors Allowed</p>
                    </NavLink>
                  )}
              </>
              {/* )} */}

              {user.aboutproperty.furnishingType != "" && (
                <NavLink
                  to=""
                  className="searchlist_iconparagraph_div"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TiTick className="searchlist_icons_div" />
                  <p>{user.aboutproperty.furnishingType}</p>
                </NavLink>
              )}
            </div>
            <div
              className="searchlist_iconmore_div"
              noClick={() => handleProductPageId(user._id)}
            >
              <NavLink
                to={`/Property-Details?_id=${user._id}`}
                className="flex_c searchlist_iconmore_div"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiTick className="searchlist_icons_div" />
                <p>more{">>"}</p>
              </NavLink>
            </div>
          </NavLink>
        </div>
      </div>
      <MobileSearchListList
        heart={heart}
        setHeart={setHeart}
        user={user && user}
        handleProductPageId={handleProductPageId}
        handleShortListProperty={handleShortListProperty}
        userToken={userToken}
        ownerCont={ownerCont}
        setOwnerCont={setOwnerCont}
        heardId={heardId}
        AgentRERA={user?.user?.rera_number}
      />
    </>
  );
};

export default Searchlist;
