import React from "react";
import "../UserMainOverview.css";
import "../SwitchToggleBtn.css";
import Rectangle from "../../../../assets/admin/img/Rectangle 107.png";
import Unverified from "../../../../assets/admin/img/Listing card/Component 5.svg";
import Avatar from "../../../../assets/admin/img/avatar/Avatar.svg";
import BusinessIcon from "../../../../assets/admin/img/Listing card/business.svg";
import { MdVerifiedUser } from "react-icons/md";
import configData from "../../../../config/config.json";
import { VscFilePdf } from "react-icons/vsc";

function Overview({ userDetails, handleActiveInactive }) {
  // ========================== JSX =================================
  console.log("userDetails===>>>", userDetails);
  return (
    <div className="overview-container">
      <div className="overview-bg-div">
        <img src={Rectangle} alt="Background_image" />
      </div>
      <div className="overview-profile-section ">
        {/* ========== Profile Image ========== */}
        <div className="user-profile-image flex_c">
          <div>
            <img
              src={
                userDetails?.user?.avatar &&
                // configData.COMMON_MEDIA_LINK_URL +
                //   "/avatar/" +
                userDetails.user.avatar
              }
              alt="profile_image"
            />

            <div className="flex_c  user_profile_images">
              {/* <img src={BusinessIcon} alt="Icon" /> */}
              <p>
                {userDetails?.user?.user_type.charAt(0).toUpperCase() +
                  userDetails?.user?.user_type.slice(
                    1,
                    userDetails?.user?.user_type.length
                  )}
              </p>
            </div>
          </div>
        </div>
        {/* =========================== */}
        <br />
        <div className="user-name">
          <h1>
            {userDetails &&
              userDetails.user &&
              userDetails.user.name &&
              userDetails.user.name}
          </h1>
          <label className="switch">
            <input
              type="checkbox"
              checked={
                userDetails &&
                  userDetails.user &&
                  userDetails.user.is_active === true
                  ? true
                  : false
              }
              onChange={() =>
                handleActiveInactive(
                  userDetails && userDetails.user && userDetails.user._id
                )
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        {/* ----------------------------------- */}
        <br />
        <div className="user-email-section">
          <p>Email:</p>
          <input
            type="text"
            value={userDetails && userDetails.user && userDetails.user.email}
            readOnly
          />
        </div>
        {/* -------------------- */}
        <div className="user-phone-sec">
          <p>Phone:</p>
          <input
            type="text"
            value={
              userDetails && userDetails.user && userDetails.user.mobilenumber
            }
            readOnly
          />
          <div className="unverified-icon flex_c"></div>
        </div>
        {/* ------------------------------ */}
        {userDetails?.user?.user_type == "business" && (
          <div className="user-phone-sec">
            <p>Agent RERA no.:</p>
            <input
              type="text"
              value={userDetails?.user?.rera_number}
              readOnly
            />
            <div className="unverified-icon flex_c"></div>
          </div>
        )}
        {userDetails?.user?.user_type == "business" && (
            <>
              <div className="user-phone-sec">
                <p>RERA Certificate:</p>
                <a
                  href={
                    // configData.COMMON_MEDIA_LINK_URL +
                    // "/applyforservice/" +
                    userDetails?.user?.rera_certificate

                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  <label
                    htmlFor="adhar"
                    className="UserServices_FSSAICertificate_container"
                  >
                    <VscFilePdf className="UserServices_VscFilePdf" />
                    <p>PDF </p>
                  </label>
                </a>
                <div className="unverified-icon flex_c"></div>
              </div>
            </>
        )}
        {userDetails?.user?.user_type == "business" && (
            <>
              <div className="user-phone-sec">
              <p>RERA Competency <br /> <br /> Certificate:</p>
                <a
                  href={
                    // configData.COMMON_MEDIA_LINK_URL +
                    // "/applyforservice/" +
                    userDetails?.user?.rera_competency_certificate

                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  <label
                    htmlFor="adhar"
                    className="UserServices_FSSAICertificate_container"
                  >
                    <VscFilePdf className="UserServices_VscFilePdf" />
                    <p>PDF </p>
                  </label>
                </a>
                <div className="unverified-icon flex_c"></div>
              </div>
            </>
        )}
        {/* -------------------- */}
        <br />
        <div className="user-services-sec">
          <p>Services offered:</p>
          <div>
            {userDetails &&
              userDetails.joinedServices &&
              userDetails.joinedServices.map((item, index) => {
                return (
                  <div key={index}>
                    <img
                      src={
                        // configData.COMMON_MEDIA_LINK_URL +
                        // "/serviceSettings/" +
                        item.serviceIcon
                      }
                      alt="_icon"
                    />
                    <button>{item.select_your_offering}</button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
