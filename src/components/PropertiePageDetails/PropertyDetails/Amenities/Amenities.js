import React, { useState } from "react";
import AboutPropety from "./AboutPropety";
import "./Amenities.css";
import OwnerFurnished from "./OwnerFurnished";
import { BsFillInboxesFill, BsDisplay } from "react-icons/bs";
import {
  FaFan,
  FaRegLightbulb,
  FaBed,
  FaFacebook,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";
import {
  FacebookShareButton,
  OKIcon,
  OKShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import img from '../../../../assets/admin/Home/img1.png'

const Amenities = ({ user, mediaLink, urlToShare, titleToShare,AgentRERA }) => {
  // console.log(titleToShare);
  const handleShareOnInstagram = () => {
    const encodedCaption = encodeURIComponent(urlToShare);
    const instagramUrl = `instagram://library?AssetPath=${encodeURIComponent(img)}&InstagramCaption=${encodedCaption}`;

    window.location.href = instagramUrl;
  };
  return (
    <div>
      <AboutPropety user={user} AgentRERA={AgentRERA} />
      <hr />
      <OwnerFurnished
        head={user && user.aboutproperty && user.aboutproperty.furnishingType}
        heatsec={`${
          user && user.aboutproperty && user.aboutproperty.furnishingType
        } Details`}
        semifurnished={
          user && user.aboutproperty && user.aboutproperty.option
            ? user.aboutproperty.option
            : []
        }
        withOutIcon={true}
        Icon={BsFillInboxesFill}
      />
      <hr />
      {/* <OwnerFurnished heatsec="Features" semifurnished={features} /> */}
      {/* <hr /> */}
      {mediaLink === true && (
        <div className="Amenities_shareReport_container">
          <div className="Amenities_share_container">
            <p>Liked this property? Share with people</p>
            {/* <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer noopener"
            ></a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer noopener"
            ></a>{" "}
            <a
              href="https://twitter.com/saigowthamr/"
              target="_blank"
              rel="noreferrer noopener"
            ></a> */}
            <FacebookShareButton url={urlToShare} quote ={'Adding description will increase your listing visiblityAdding description will increase your listing visiblityAdding description will increase your listing visiblityAdding description will increase your listing visiblityAdding description will increase your listing visiblityAdding description will increase your listing visiblityAdding description will increase your listing visiblity'}>
              <FaFacebook style={{ color: "#4267B2", cursor: "pointer" }} />
              {/* <FacebookIcon size={32} round={true} /> */}
            </FacebookShareButton>
            <TwitterShareButton url={urlToShare} title={titleToShare}>
              <FaTwitter style={{ color: "#00acee", cursor: "pointer" }} />
            </TwitterShareButton>
            {/* <OKShareButton> */}
              <FaInstagramSquare
                style={{ color: "#8a3ab9", cursor: "pointer" }}
                onClick={()=>handleShareOnInstagram()}
              />
            {/* </OKShareButton> */}
          </div>
          {/* <div className="Amenities_report_container">
            <p>Property soldout? Incorrect data? </p>
            <button>
              <GoReport /> Report
            </button>
          </div> phase2 */}
        </div>
      )}
    </div>
  );
};

export default Amenities;
