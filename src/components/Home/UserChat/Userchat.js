import React, { useState, useEffect, useContext } from "react";
import UserMainChat from "./UserMainChat";
import { BsChatRightDotsFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import img1 from "../Rectangle.svg";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import ImageStstus2 from "../../../assets/services/avatar.png";
import configData from "../../../config/config.json";
import { API_REQ_GET } from "../../../config/API";
import AuthContext from "../../../context/AuthProvider";

var socket = io.connect("https://homescouts.in?type=anonymous");
// var socket = io.connect("http://localhost:9000/?type=anonymous");

const Userchat = () => {
  // const [chat, setChat]=useState([])
  const value = useContext(AuthContext);
  console.log(value.currentUserType);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatLogin, setChatLogin] = useState(true);
  const [chatText, setchatText] = useState("");
  const [initiatePage, setInitiatePage] = useState(false);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [initiateHeading, setInitiateHeading] = useState("");
  const [otherUserInitiale, setOtherUserInitiale] = useState("");
  const [patnerTyping, setPatnerTyping] = useState(false);
  const [userImg, setUserImg] = useState(ImageStstus2);
  const [userDetails, setUserDetails] = useState();
  const [skipedMsg, setSkipedMsg] = useState("");
  const [GetRequest, setGetRequest] = useState(false);
  const [GetAccept, setGetAccept] = useState(false);
  const [AcceptOrReject, setAcceptOrReject] = useState(false);
  const [acceptId, setAcceptId] = useState("");

  // const [chatQuary, setChatQuary] = useState([]);
  const [noOfUser, setNoOfUser] = useState(0);
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  const userId =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response._id;

  // console.log(
  //   "initiatePage------------------------------------>",
  //   initiatePage
  // );
  // console.log(chat);
  // console.log(chatQuary);
  const handleChatOpen = () => {
    if (userToken) {
      setChatOpen(!chatOpen);
    } else {
      toast.warning("Please Login to access chat");
    }
  };

  const updateMsgList = (recivedMsg)=>{
    if(messageList.filter(cur_msg=>{return (cur_msg.msgId == recivedMsg.msgId)}).length <=0){
        setMessageList((list) => [...list, recivedMsg]);
        setPatnerTyping(false);
    }
  }

  const handlechatText = (event) => {
    setchatText(event.target.value);
  };
  // -----------------------------Api get request for Avatar image-------------------------------------------
  const getCasesAvatar = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_GET_USER_PROFILE_URL,
      userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
;
        if (ApiRes.result) {
          setUserDetails(ApiRes.result);
        }

        if (
          ApiRes.result &&
          ApiRes.result.avatar &&
          ApiRes.result.avatar.length > 0
        ) {
          setUserImg(ApiRes.result.avatar);
        }
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  useEffect(() => {
    if (userToken) {
      getCasesAvatar();
    }
  }, []);
  useEffect(() => {
    socket.on("getAnonymousUsers", (data) => {
      // console.log("getAnonymousUsers==>", data);
      setNoOfUser(data && data.length);
    });
    // console.log("socket======", socket);
  }, [socket]);
  return (
    <div data-toggle="tooltip" data-placement="left">
      {chatOpen === false ? (
        <div
          className=" userchat_main_container_div"
          onClick={() => handleChatOpen()}
        >
          <div className=" userchat_onlinepeople_container_div">
            <div className=" userchat_online_logo">
              <p className="sw"></p>
              <div>
                <img src={img1} />
              </div>
            </div>
            <div className="sw userchat_dot_icon_online">
              <p>{noOfUser}</p>
              <GoDotFill className="userchat_dot_icon_container" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <UserMainChat
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            chatLogin={chatLogin}
            setChatLogin={setChatLogin}
            chatText={chatText}
            handlechatText={handlechatText}
            // handlechatSend={handlechatSend}
            setchatText={setchatText}
            // chatQuary={chatQuary}
            socket={socket}
            // handleEmailChat={handleEmailChat}
            initiatePage={initiatePage}
            setInitiatePage={setInitiatePage}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            messageList={messageList}
            setMessageList={setMessageList}
            updateMsgList = {updateMsgList}
            initiateHeading={initiateHeading}
            setInitiateHeading={setInitiateHeading}
            otherUserInitiale={otherUserInitiale}
            setOtherUserInitiale={setOtherUserInitiale}
            patnerTyping={patnerTyping}
            setPatnerTyping={setPatnerTyping}
            userImg={userImg}
            userDetails={userDetails}
            setSkipedMsg={setSkipedMsg}
            skipedMsg={skipedMsg}
            GetRequest={GetRequest}
            setGetRequest={setGetRequest}
            GetAccept={GetAccept}
            setGetAccept={setGetAccept}
            AcceptOrReject={AcceptOrReject}
            setAcceptOrReject={setAcceptOrReject}
            acceptId={acceptId}
            setAcceptId={setAcceptId}
          />
        </>
      )}

      {/* <UserMainChat /> */}
    </div>
  );
};

export default Userchat;
