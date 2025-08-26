import React, { useRef, useState } from "react";
import "./PotentialBuyers.css";
import img from "./Rectangle (2).svg";
import { MdOutlineCancel, MdOutlineMessage } from "react-icons/md";
import configData from "../../../config/config.json";
import { IoMdSend } from "react-icons/io";
import CheckOutSideClick from "../../../config/CheckOutSideClick";
import { API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import { ToastContainer, toast } from "react-toastify";

const InputField = ({ ele, contact, ContactOwnerUrl, setTextMsg, textMsg }) => {
  const [sendEnquiry, setSendEnquiry] = useState(false);

  const myRef = useRef(null);
  const handlesendEnquiry = () => {
    setSendEnquiry(true);
  };
  const closeInputFild = () => {
    console.log("hits");
    setSendEnquiry("");
  };

  return (
    <CheckOutSideClick onClickOutSide={closeInputFild}>
      <div ref={myRef} className="PotentialBuyers_user">
        <div className="PotentialBuyers_userimage">
          <img
            src={
              ele &&
              // configData.COMMON_MEDIA_LINK_URL +
              //   "/avatar/" +
              ele.avatar
            }
            alt="image..."
          />
          <p>{ele.name}</p>
        </div>
        {sendEnquiry === true ? (
          <div className="PotentialBuyers_contactDetails">
            <input
              className="PotentialBuyers_message"
              placeholder="Enter message ..."
              value={textMsg}
              onChange={(e) => setTextMsg(e.target.value)}
            />
            <div className="PotentialBuyers_chatdiv">
              <IoMdSend
                className="PotentialBuyers_chatIcons PotentialBuyers_sendIcon"
                onClick={() => ContactOwnerUrl(ele)}
              />
            </div>
          </div>
        ) : (
          <div className="PotentialBuyers_contactDetails">
            {contact === true && (
              <div className="PotentialBuyers_contact">
                <img src={img} className="PotentialBuyers_Avatar" />
                <span>{ele.mobilenumber}</span>
              </div>
            )}
            <div className="PotentialBuyers_chatdiv">
              <MdOutlineMessage
                className="PotentialBuyers_chatIcons"
                onClick={() => handlesendEnquiry()}
              />
            </div>
          </div>
        )}
      </div>
    </CheckOutSideClick>
  );
};

const PotentialBuyers = ({
  setPotentialBuyers,
  margin0,
  contact,
  potentialUser,
  userProfile,
}) => {
  const [textMsg, setTextMsg] = useState("");
  // console.log('myRef',myRef);
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  const userId = UserTokenAvilable && UserTokenAvilable.response._id;

  // console.log("userToken------------------------------------>", userToken);

  // console.log("sendEnquiry==>", sendEnquiry);

  const ContactOwnerUrl = async (ele) => {
    console.log("ele", ele);

    const AllData = {
      senderId: userId,
      receiverId: ele && ele._id,
      enquiry: {
        mediaLink:
          potentialUser &&
          potentialUser.uploadImages &&
          potentialUser.uploadImages[0].propertyImage,
        propertyId: potentialUser && potentialUser._id,
        name: userProfile && userProfile.name,
        email: userProfile && userProfile.email,
        phone: userProfile && userProfile.mobilenumber,
        message: textMsg,
        userType: userProfile && userProfile.user_type,
        messagetype: "enquiry",
      },
    };
    // console.log("AllData", AllData);
    if (textMsg.length > 1) {
      let ResBasic = await API_REQ_POST_WITH_TOKEN(
        configData.USER_ENQUIRY_POST_URL,
        AllData,
        userToken
      );
      if (ResBasic) {
        if (ResBasic.success === true) {
          toast.success(ResBasic.message);
          setTextMsg("");
        } else {
          toast.warning(ResBasic.message);
        }
      } else {
        toast.error("Please Check Your Internet !");
      }
    } else {
      toast.warning("Please Enter some message...");
    }
  };

  return (
    <div className="PotentialBuyers_mainContainerDiv">
      <div className={`PotentialBuyers_mainContainer ${margin0}`}>
        <MdOutlineCancel
          className="ChangeEmail_cancel_div"
          onClick={() => setPotentialBuyers(false)}
        />
        <div className="PotentialBuyers_heading">
          <p>
            These are the user added our property posting to their wishlist,
            please do not disclose sensitive information to anyone
          </p>
          <div className="PotentialBuyers_title">
            <img src={img} className="PotentialBuyers_Avatar" />
            <span>
              {potentialUser &&
                potentialUser.potential_buyers &&
                potentialUser.potential_buyers.length > 0 &&
                potentialUser.potential_buyers.length}
            </span>
          </div>
        </div>
        <div className="PotentialBuyers_userMainDiv">
          <div className="PotentialBuyers_userDiv">
            {potentialUser &&
              potentialUser.potential_buyers &&
              potentialUser.potential_buyers.map((ele, index) => (
                <div key={index}>
                  <InputField
                    setTextMsg={setTextMsg}
                    ele={ele}
                    contact={contact}
                    ContactOwnerUrl={ContactOwnerUrl}
                    textMsg={textMsg}
                  />
                </div>
              ))}
          </div>
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

export default PotentialBuyers;
