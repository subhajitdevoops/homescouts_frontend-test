import React from "react";
import "./PropertyPriceDetails.css";
import img2 from "../../../../assets/signup/Group 133.png";
import { BsFillSuitHeartFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";
import { GiDiamondTrophy } from "react-icons/gi";
import { BsFillPencilFill } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import img4 from "../../../admin/UserProfileVerify/userService/Vector (1).svg";
import img5 from "../../../admin/UserProfileVerify/userService/Vector (2).svg";
import img6 from "../../../admin/UserProfileVerify/userService/Vector.svg";
import configData from "../../../../config/config.json";
import { useEffect } from "react";
import { useState } from "react";
// import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import { ToastContainer, toast } from "react-toastify";

const PropertyPriceDetails = ({
  UpToDate,
  ToggleButton,
  VeriIconChange,
  user,
  setAdsDetails,
  handleChangeStaus,
  backButton,
  sellerDetails,
  userToken,
  handleShortListProperty,
  shortList,
}) => {
  const [coverImg, setCoverImg] = useState();

  const [adminVerified, setAdminVerified] = useState(user && user.is_verified);
  const [calenderShow, setCalenderShow] = useState(false);
  const [calenderDate, setCalenderDate] = useState(
    user && user.feacher_validity ? user.feacher_validity : ""
  );
  // new Date(user.feacher_validity).toLocaleDateString("en-US")
  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  console.log("user------------------------------------>", user);

  const handleMarkAsVeirified = async () => {
    const verifyied = {
      id: user && user._id,
      is_verified: calenderShow === true ? false : true,
    };
    let ResVerifyied = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_VERIFY_PROPERTY_URL,
      verifyied,
      adminToken
    );
    // console.log(resFurnish);
    if (ResVerifyied) {
      if (ResVerifyied.success === true) {
        // toast.success(ResVerifyied.message);

        if (adminVerified === true) {
          setAdminVerified(false);
        } else {
          setAdminVerified(true);
        }
      } else {
        toast.warning(ResVerifyied.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };
  const handleButtonClick = (phoneNumber) => {
    const dialerLink = `tel:${phoneNumber}`;
    window.location.href = dialerLink;
  };
  const handleShowCalender = () => {
    if (calenderShow === true) {
      setCalenderShow(false);
    } else {
      setCalenderShow(true);
    }
  };
  const handleSelect = async (dates) => {
    console.log("dates====>", dates); // native Date object
    setCalenderShow(false);

    const date = new Date(dates);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    console.log("formattedDate", formattedDate);
    setCalenderDate(formattedDate);

    const feature = {
      id: user && user._id,
      is_feacher: true,
      feacher_validity: formattedDate,
    };
    let resFurnish = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_FEATURE_URL,
      feature,
      adminToken
    );
    // console.log(resFurnish);
    if (resFurnish) {
      if (resFurnish.success === true) {
        // toast.success(resFurnish.message);
      } else {
        toast.warning(resFurnish.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };

  // console.log("coverImg=>", coverImg);
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
    <div className="PropertyPriceDetails_main_container_div">
      {backButton === true && (
        <HiOutlineArrowLeft
          style={{ marginBottom: "-25px", cursor: "pointer" }}
          onClick={() => setAdsDetails(false)}
        />
      )}
      <div className="flex_c PropertyPriceDetails_Page_date_details">
        <div className="PropertyPriceDetails_page_details">
          {user && user.basicdetails && user.basicdetails.catagory}
          {">"}Property in {user && user.location && user.location.city}
          {">"}
          {user && user.basicdetails.catagory && user.basicdetails.catagory} for
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
          in {user && user.location && user.location.city}
          {/* Home {">"} Property in Kolkata {">"} House for sale in Kolkata */}
        </div>
        <div className="PropertyPriceDetails_date_details">
          Posted on{" "}
          {user &&
            user.createdAt &&
            new Date(user.createdAt).toLocaleDateString("en-US")}{" "}
          |{" "}
          {user &&
            user.aboutproperty.availability &&
            user.aboutproperty.availability.status}
        </div>
      </div>
      <div className="flex_c PropertyPriceDetails_image_price_Button">
        <div className="PropertyPriceDetails_image">
          <div>
            <img src={coverImg} alt="property image..." width="350" />
          </div>
        </div>
        <div className="PropertyPriceDetails_price">
          <div className="flex_c PropertyPriceDetails_very_feat_icon">
            {VeriIconChange === true ? (
              <>
                {adminVerified === true ? (
                  <div
                    className="flex_c PropertyPriceDetails_NewVerifieds"
                    onClick={handleMarkAsVeirified}
                  >
                    <MdOutlineVerified style={{ fontSize: "30px" }} />
                    <p>Verified</p>
                  </div>
                ) : (
                  <div
                    className="flex_c PropertyPriceDetails_NewVerified"
                    onClick={handleMarkAsVeirified}
                  >
                    <MdOutlineVerified style={{ fontSize: "30px" }} />
                    <p>
                      Mark as
                      <br /> Verified
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {user && user.is_verified && user.is_verified === true ? (
                  <div className="flex_c PropertyPriceDetails_verified">
                    <MdOutlineVerified />
                    <p>Verified</p>
                  </div>
                ) : null}
              </>
            )}
            {VeriIconChange === true ? (
              <>
                <div
                  className={`flex_c PropertyPriceDetails_NewVerified ${
                    calenderDate && calenderDate.length > 0
                      ? "PropertyPriceDetails_newFeatureSelected"
                      : "PropertyPriceDetails_newFeature"
                  }`}
                  onClick={handleShowCalender}
                >
                  <GiDiamondTrophy style={{ fontSize: "30px" }} />
                  {calenderDate && calenderDate.length > 0 ? (
                    <p>
                      Featured upto
                      <br /> {calenderDate}
                    </p>
                  ) : (
                    <p>
                      Click to make
                      <br /> Featured
                    </p>
                  )}
                </div>
                {/* <input type="date" id="featureDate" value className="inputCalender" /> */}
                {calenderShow === true && (
                  <div className="PropertyPriceDetails_newFeatCalender">
                    {/* <Calendar
                      date={new Date()}
                      onChange={handleSelect}
                      minDate={new Date()}
                    /> */}
                  </div>
                )}
              </>
            ) : (
              <>
                {user && user.is_feacher && user.is_feacher === true ? (
                  <div className="flex_c PropertyPriceDetails_verified PropertyPriceDetails_feature">
                    <GiDiamondTrophy />
                    <p>Feature</p>
                  </div>
                ) : null}
              </>
            )}

            {/* {UpToDate === true ? (
              <div className="PropertyPriceDetails_UpToDate">
                <p>
                  Featured upto
                  <br /> 12 jan 2023
                </p>
              </div>
            ) : undefined} */}
          </div>
          <div className="flex_c PropertyPriceDetails_Price_details">
            <div className="c_t flex_c PropertyPriceDetails_priceofproperty">
              {user &&
              user.basicdetails &&
              user.basicdetails.typeOfBusiness === "pg" ? (
                <h6>
                  <span>₹</span>
                  {user &&
                    user.pricinganddetails.rentDetails &&
                    user.pricinganddetails.rentDetails}
                </h6>
              ) : (
                <h6>
                  <span>₹</span>
                  {user &&
                    user.pricinganddetails.pricingDetails &&
                    user.pricinganddetails.pricingDetails.expectedPrice}
                </h6>
              )}

              <p>
                {user &&
                user.basicdetails &&
                user.basicdetails.typeOfBusiness === "pg" ? (
                  <>
                    <span style={{ fontWeight: 300, fontSize: "10px" }}>
                      /month
                      {user &&
                        user.aboutproperty &&
                        user.aboutproperty.roomDetails &&
                        user.aboutproperty.roomDetails.roomTypes == "Sharing" &&
                        "/Bed"}
                    </span>
                  </>
                ) : (
                  <>
                    {user &&
                    user.basicdetails.typeOfBusiness &&
                    user.basicdetails.typeOfBusiness == "rent/lease" ? (
                      <span style={{ fontWeight: 300, fontSize: "10px" }}>
                        /month
                      </span>
                    ) : (
                      <>
                        @{" "}
                        {user &&
                          user.aboutproperty &&
                          user.aboutproperty.carpetArea}
                        per &nbsp;
                        {user &&
                          user.aboutproperty &&
                          user.aboutproperty.areaMessurementUnit}
                      </>
                    )}
                  </>
                )}{" "}
              </p>
            </div>
            <div className="PropertyPriceDetails_sepretor"></div>
            <div className="c_t PropertyPriceDetails_detailsOfproperty">
              <h5>
                {user &&
                user.basicdetails &&
                user.basicdetails.typeOfBusiness === "pg" ? (
                  <>
                    {user &&
                    user.aboutproperty &&
                    user.aboutproperty.roomDetails &&
                    user.aboutproperty.roomDetails.roomTypes == "Sharing"
                      ? "Shared"
                      : "Private"}{" "}
                    Room for{" "}
                    {user &&
                      user.aboutproperty &&
                      user.aboutproperty.availableFor &&
                      user.aboutproperty.availableFor}
                  </>
                ) : (
                  <>
                    {user?.aboutproperty?.roomDetails?.noOfBedRooms == "0" ?'': (
                      <>
                        {user?.aboutproperty?.roomDetails?.noOfBedRooms}{" "}
                        Bedrooms|
                      </>
                    )}
                    {user?.aboutproperty?.roomDetails?.noOfBathRooms == "0" ? '':(
                      <>
                        {user?.aboutproperty?.roomDetails?.noOfBathRooms}{" "}
                        BathRooms
                      </>
                    ) }
                    {user?.aboutproperty?.roomDetails?.noOfBalconies == "0" ?'': (
                      <>
                        |{user?.aboutproperty?.roomDetails?.noOfBalconies}{" "}
                         Balconies
                      </>
                    )}
                  </>
                )}
              </h5>
              {/* <h5>7Bedrooms 4Baths</h5> */}
              <h6>
                {" "}
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
                  " Rent (PG)"}{" "}
              </h6>
              <p>
                in {user && user.location && user.location.city} ,
                {user && user.location && user.location.locality},{" "}
                {user && user.location && user.location.subLocality},
                {user && user.location && user.location.apartmentAndSocity},
                {user && user.location && user.location.houseNumber}
              </p>
            </div>
          </div>
        </div>
        <div className="PropertyPriceDetails_Button">
          {ToggleButton === true ? (
            <>
              {user?.user?.user_type == "business" && (
                <div className="AccountChange_UserRegisteredAdmin">
                  <div className="AccountChange_AccountIcon">
                    <img src={img2} alt="user..." />
                  </div>
                  <div className="">
                    <h6 className="AccountChange_UserRegisteredAdminParagraph">
                      Business(agent)
                    </h6>
                  </div>
                </div>
              )}
              <div className="UserServices_adminApproved">
                <div className="UserServices_Approve">
                  {user &&
                    user.admin_approval &&
                    user.admin_approval === "pending" && <img src={img4} />}
                  {user &&
                    user.admin_approval &&
                    user.admin_approval === "approved" && <img src={img6} />}
                  {user &&
                    user.admin_approval &&
                    user.admin_approval === "rejected" && <img src={img5} />}
                  <p>
                    {user && user.admin_approval}
                    {/* {user&&user.admin_approval&&user.admin_approval
                            .charAt(0)
                            .toUpperCase() +
                            user&&user.admin_approval&&user.admin_approval.slice(1)} */}
                  </p>
                </div>
                <div className="UserServices_ApproveMenu">
                  <div
                    className="UserServices_Approve"
                    onClick={() => handleChangeStaus("pending", user._id)}
                  >
                    <img src={img4} />
                    <p>Pending </p>
                  </div>
                  <div
                    className="UserServices_Approve"
                    onClick={() => handleChangeStaus("approved", user._id)}
                  >
                    <img src={img6} />
                    <p>Approved </p>
                  </div>
                  <div
                    className="UserServices_Approve"
                    onClick={() => handleChangeStaus("rejected", user._id)}
                  >
                    <img src={img5} />
                    <p>Rejected </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {userToken ? (
                // <a
                //   href="tel:+6199942413"
                // >
                <button
                  className="PropertyPriceDetails_Button_contact"
                  onClick={() =>
                    handleButtonClick(
                      sellerDetails && sellerDetails.mobilenumber
                    )
                  }
                >
                  <BsFillTelephoneFill style={{ fontSize: "15px" }} />
                  {sellerDetails && sellerDetails.mobilenumber}
                </button>
              ) : (
                // </a>
                <button
                  className="PropertyPriceDetails_Button_contact"
                  onClick={() => {
                    toast.warning("Please login first");
                  }}
                >
                  <BsFillTelephoneFill style={{ fontSize: "15px" }} />
                  <>
                    Contact Owner<span> FREE</span>
                  </>
                </button>
              )}

              {userToken && (
                <button
                  className={
                    user && user.sortliststatus
                      ? " PropertyPriceDetails_ButtonShortlist"
                      : " PropertyPriceDetails_Button_shortlist"
                  }
                  onClick={() => handleShortListProperty(user._id)}
                >
                  <BsFillSuitHeartFill />{" "}
                  {user && user.sortliststatus ? "Shortlisted" : "Shortlist"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
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
    </div>
  );
};

export default PropertyPriceDetails;
