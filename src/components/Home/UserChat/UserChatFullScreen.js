import React, { useContext, useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import UC from "./UserChatCSS/UserChat.module.css";
// import ListViewOfUser from "./UserChatComponents/ListViewOfUser";
// import ChatViewOfUser from "./UserChatComponents/ChatViewOfUser";
// import Pic from "./pic.jpg";
import "react-chat-elements/dist/main.css";
import {
  // MessageBox,
  // MessageList,
  // Input,
  // ChatList,
  // Navbar,
  // Avatar,
  ChatItem,
} from "react-chat-elements";
// import ScrollToBottom from "react-scroll-to-bottom";
// import {
//   MdKeyboardArrowDown,
//   MdAutoDelete,
//   MdOutlineReport,
// } from "react-icons/md";
// import { GrDocumentImage } from "react-icons/gr";
// import { HiReply } from "react-icons/hi";
// import img1 from "./Group 82.svg";
// import img2 from "./Group 84.svg";
import "./UserChatFullScreen.css";
import ChatSingle from "./ChatSingle";
import { API_REQ_GET } from "../../../config/API";
import configData from "../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
// import io from "socket.io-client";
import img from "../../../assets/services/avatar.png";
import AuthContext from "../../../context/AuthProvider";
import NoChatFound from "../../../assets/chat/NO MESSAGE CONDITION IMAGE.svg";
import NoMessage from "../../../assets/chat/No message.svg";
import { imageKit } from "../../../config/Helper";

const socket = io.connect("https://homescouts.in?type=chat");
// var socket = io.connect("https://homescouts.in?type=chat");
console.log("socket=chat==>", socket);
function UserChatFullScreen(props) {
  // ------------All user room in this state---------------------
  var [userData, setUserData] = useState([]);
  console.log("userData response= ====>", userData);

  const [text, setText] = useState(""); //---------------input text for send
  // console.log("text", text);

  // --------------------storing all message for single room ----------------
  const [send, setSend] = useState([]);
  console.log("store message---------", send);
  const [mobChatOpen, setMobChatOpen] = useState(false); //-------- open room chat
  const [userImg, setUserImg] = useState(""); //---------------------user image
  const [profileRes, setProfileRes] = useState(""); //----------------profile response
  const [sendMsg, setSendMsg] = useState([]); ///--------------------collecting single room details
  const [resUser, setResUser] = useState("123");
  const [OpenRoom, setOpenRoom] = useState("");
  const [storeUserId, setStoreUserId] = useState("");
  const [userOnline, setUserOnline] = useState(false);
  // const [fileSend, setFileSend] = useState(false);
  const [fileBlink, setFileBlink] = useState({
    fineLink: "",
    fileSend: false,
    blink: false,
    fileName: "",
  });

  // console.log("fileBlink===>", fileBlink);
  console.log("sendMsg===>", sendMsg);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  const userId = UserTokenAvilable && UserTokenAvilable.response._id;

  const value = useContext(AuthContext);
  console.log("value.roomId==>", value.roomId);

  // console.log("userToken------------------------------------>", userId);
  //-------------------------send text message --------------------------------
  const handlesend = (receiverIds, media) => {
    // console.log(receiverIds);
    if (media === true) {
      const messageData = {
        senderId: userId,
        receiverId: receiverIds,
        text: text,
        roomId: sendMsg && sendMsg[0]._id,
        medialink: fileBlink?.fineLink,
      };

      socket.emit("sendMessage", messageData);
      console.log("messageData=sendMessage==>", messageData);

      const messageDatas = {
        senderId: userId,
        receiverId: receiverIds,
        text: text,
        title: profileRes.name,
        medialink: fileBlink?.fineLink,
      };
      setSend((list) => [...list, messageDatas]);

      const newTextMessage = {
        message: text,
        name: profileRes.name,
        user_id: userId,
      };
      const sendUserMessageId = userData.filter(
        (ele) => ele._id === sendMsg[0]._id
      );
      const RestUserMessageId = userData.filter(
        (ele) => ele._id != sendMsg[0]._id
      );

      const updatedUserData = sendUserMessageId.map((user) => {
        if (user._id === sendMsg[0]._id) {
          // replace this ID with the desired user's ID
          return {
            ...user,
            chats: [...user.chats, newTextMessage],
          };
        } else {
          return user;
        }
      });
      setUserData([...updatedUserData, ...RestUserMessageId]);
      setFileBlink((ele) => {
        return {
          fineLink: "",
          fileSend: false,
          blink: false,
          fileName: "",
        };
      });
    } else {
      if (text.trim()) {
        const messageData = {
          senderId: userId,
          receiverId: receiverIds,
          text: text,
          roomId: sendMsg && sendMsg[0]._id,
        };

        socket.emit("sendMessage", messageData);
        console.log("messageData=sendMessage==>", messageData);

        const messageDatas = {
          senderId: userId,
          receiverId: receiverIds,
          text: text,
          title: profileRes.name,
        };
        setSend((list) => [...list, messageDatas]);

        const newTextMessage = {
          message: text,
          name: profileRes.name,
          user_id: userId,
        };
        const sendUserMessageId = userData.filter(
          (ele) => ele._id === sendMsg[0]._id
        );
        const RestUserMessageId = userData.filter(
          (ele) => ele._id != sendMsg[0]._id
        );
        console.log("sendUserMessageId=>", sendUserMessageId);
        console.log("RestUserMessageId=>", RestUserMessageId);

        const updatedUserData = sendUserMessageId.map((user) => {
          if (user._id === sendMsg[0]._id) {
            // replace this ID with the desired user's ID
            return {
              ...user,
              chats: [...user.chats, newTextMessage],
            };
          } else {
            return user;
          }
        });

        // console.log("updatedUserData6666===========>", updatedUserData);
        setUserData([...updatedUserData, ...RestUserMessageId]);
        setText("");
      }
    }
  };
  //-------------------------send image or documentation  message --------------------------------

  const handleSelectImages = async (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    // --------------------------imagekit profile image-------
    if (file) {
      const filename = file.name;
      setFileBlink((ele) => {
        return {
          ...ele,
          fileSend: true,
          blink: true,
          fileName: filename,
        };
      });

      const folderPath = "chat";
      let imagekitresponse = await imageKit(file, folderPath);
      if (imagekitresponse) {
        setFileBlink((ele) => {
          return {
            ...ele,
            fineLink: imagekitresponse,
            blink: false,
          };
        });
      }
      console.log("imagekitresponse", imagekitresponse);
    }
  };
  //-------------------------- Cancel Send File------------------------------

  const handleCancelSendFile = () => {
    setFileBlink((ele) => {
      return {
        fineLink: "",
        fileSend: false,
        blink: false,
        fileName: "",
      };
    });
  };

  //----------------------------------------------------
  const handleuserChatOpen = (chatId, newArr) => {
    setStoreUserId(chatId);
    console.log("----------new chat open----------", chatId);
    const data = value.roomId ? [...newArr] : [...userData];

    const newOpenMessageArray = [];
    const fil = data.filter((item) => item._id == chatId);

    if (fil.length > 0) {
      //-------------------------- new code---------------------------------------
      if (fil.length > 0) {
        for (let chat of fil[0].chats) {
          if (chat.messagetype === "enquiry") {
            // const result = chat.map((chat) => {
            // const messageArr = chat.message.split(",");
            console.log("message", chat);
            const name = fil[0].name;

            const PropertyOwner = chat.message.name;
            // const propertyId = messageArr[1].split(":")[1];
            // const email = messageArr[2].split(":")[1];
            // const phone = messageArr[3].split(":")[1];
            // const userType = messageArr[4].split(":")[1];
            // const message = messageArr[5].split(":")[1];
            const propertyImg = chat.medialink;
            const propertyId = chat.message.propertyId;
            const email = chat.message.email;
            const phone = chat.message.phone;
            const userType = chat.message.userType;
            const message = chat.message.message;
            const mediaLink = chat.medialink;
            const userIdd =
              userId === fil[0].chat_user[0]
                ? fil[0].chat_user[1]
                : fil[0].chat_user[0];
            const _id = fil[0]._id;
            const senderUserId = chat.user_id;
            const messagetype = chat.messagetype;
            const onlineStatus = fil[0].onlineStatus
              ? fil[0].onlineStatus
              : false;
            const userOnline = fil[0].userOnline ? fil[0].userOnline : "";
            const avatar = fil[0].avatar ? fil[0].avatar : img;
            const block_info = fil[0].block_info;

            // return {
            const dataChatEnquiry = {
              PropertyOwner: PropertyOwner,
              name: name,
              propertyId: propertyId,
              email: email,
              phone: phone,
              userType: userType,
              message: message,
              userIdd: userIdd,
              _id: _id,
              messagetype: messagetype,
              userOnline: userOnline,
              avatar: avatar,
              senderId: senderUserId,
              onlineStatus: onlineStatus,
              block_info: block_info,
              propertyImg: propertyImg,
              mediaLink: mediaLink,
            };
            // };
            // });
            console.log("dataChatEnquiry=================>", dataChatEnquiry);
            console.log("enquiry");
            newOpenMessageArray.push(dataChatEnquiry);
            setSendMsg([dataChatEnquiry]);
          } else if (chat.messagetype === "chat") {
            console.log("chat");

            // const messageArr = chat.message.split(",");
            const name = fil[0].name;
            // const propertyId = messageArr[1].split(":")[1];
            // const email = messageArr[2].split(":")[1];
            // const phone = messageArr[3].split(":")[1];
            // const userType = messageArr[4].split(":")[1];
            // const message = messageArr[5].split(":")[1];
            // const name = chat?.message?.name;
            const mediaLink = chat.medialink;
            const userIdd =
              userId === fil[0].chat_user[0]
                ? fil[0].chat_user[1]
                : fil[0].chat_user[0];
            const _id = fil[0]._id;
            const senderUserId = chat.user_id;
            const messagetype = chat.messagetype;
            const userOnline = fil[0].userOnline;
            const avatar = fil[0].avatar ? fil[0].avatar : img;
            const onlineStatus = fil[0].onlineStatus;
            const block_info = fil[0].block_info;

            // return {
            const dataChatEnquiry = {
              name: name,
              // propertyId: propertyId,
              // email: email,
              // phone: phone,
              // userType: userType,
              // message: message,
              mediaLink: mediaLink,
              userIdd: userIdd,
              _id: _id,
              messagetype: messagetype,
              userOnline: userOnline,
              avatar: avatar,
              senderId: senderUserId,
              text: chat && chat.message,
              messageId: chat && chat._id,
              onlineStatus: onlineStatus,
              block_info: block_info,
            };
            // console.log('dataChatEnquiry=================>',dataChatEnquiry);
            newOpenMessageArray.push(dataChatEnquiry);
            setSendMsg([dataChatEnquiry]);
          } else {
            console.log("nothing");
            const val = {
              senderId: chat && chat.user_id,
              text: chat && chat.message,
              messageId: chat && chat._id,
            };
            newOpenMessageArray.push(val);
          }
        }
        setSend(newOpenMessageArray);
      }

      //======================================================================
      setMobChatOpen(true);
      setOpenRoom(fil[0]._id);
    }
    value.setRoomId("");
  };
  // -----------------------ReceivedMessage----------------------------------
  console.log("userData 1 ", userData);
  const ReceivedMessage = (data) => {
    console.log("messageReceived from socket.io", data);
    const neUserData = [...userData];
    let newData = [];
    let otherChat = [];
    console.log("chat userData 2", userData);

    console.log("chats UserData message", neUserData);

    for (let arr of neUserData) {
      console.log("step 1");
      if (arr._id === data.roomId) {
        console.log("step 2");

        const newDataArray = {
          message: data.text,
          messagetype: data.msgType,
          user_id: data.senderId,
          medialink: data.medialink ? data.medialink : "",

          // _id: "648bfc34cac44a091c906d25",
        };
        const chats = [...arr.chats, newDataArray];
        console.log("chats received message newDataArray", newDataArray);

        console.log("chats received message", chats);

        const newChatData = {
          avatar: arr.avatar,
          chat_user: arr.chat_user,
          chats: chats,
          createdAt: arr.createdAt,
          name: arr.name,
          onlineStatus: true,
          updatedAt: arr.updatedAt,
          userOnline: arr.userOnline,
          users: arr.users,
          __v: arr.__v,
          _id: arr._id,
        };
        // };
        // const Chatdata = [...arr, chats=chats];
        newData.push(newChatData);
        console.log("newChatData=>", newChatData);
        // setUserData()
      } else {
        console.log("step 3");

        otherChat.push(arr);
      }
    }
    console.log("newData socket --->", OpenRoom);
    if (newData.length > 0) {
      // console.log("userData in recived message", newData);
      setUserData([...newData, ...otherChat]);
    }
  };
  // -----------------------------Api get request All chat List-------------------------------------------
  const getChatList = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USERGET_CHAT_BY_USERID_GET_URL,
      userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        console.log("userFullChats from url response=====>", ApiRes);

        const AllVal = [...ApiRes.chatRooms];
        let newArr = [];
        AllVal.forEach((element, index) => {
          const result = element.users.filter((chat) => chat._id !== userId);
          if (result.length > 0) {
            const val = {
              ...element,
              onlineStatus: false,
              userOnline:
                element.chat_user[0] == userId
                  ? element.chat_user[1]
                  : element.chat_user[0],
              name: result[0].name ? result[0].name : "",
              avatar: result[0].avatar ? result[0].avatar : img,
            };
            newArr.push(val);
          }
        });
        console.log("newArr-----------------", newArr);

        setUserData(newArr);
        // setResponse(true)
        if (value.roomId) {
          handleuserChatOpen(value.roomId, newArr);
          setOpenRoom(value.roomId);
        }
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  //------------------------------------get response for user Profile -------
  const AddMyself = () => {
    socket.emit("addUser", userId);
    console.log("connect my self to socket");
  };

  const getCasesProfile = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_GET_USER_PROFILE_URL,
      userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        // console.log("PROFILE details", ApiRes);
        setProfileRes(ApiRes.result);
        if (ApiRes.result && ApiRes.result.avatar) {
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
    AddMyself();
    getChatList();
    getCasesProfile();
  }, []);

  useEffect(() => {
    socket.on("getUser", (online) => {
      console.log("online user list", online);
      if (online) {
        setResUser(online);
        if (userData.length > 0) {
          const updatedUserData = userData.map((data) => {
            let isOnline = false;
            for (let ele of online) {
              if (ele.userId === data.userOnline) {
                isOnline = true;

                break;
              }
              if (storeUserId) {
                if (storeUserId == ele.userId) {
                  setUserOnline(true);
                }
              }
            }
            return {
              ...data,
              onlineStatus: isOnline,
            };
          });
          setUserData(updatedUserData);
          handleuserChatOpen(storeUserId);
        }
      }
    });
    socket.on("messageSent", (conformation) => {
      console.log("conformation:", conformation);
      // if (conformation) {
      //   setResUser(conformation);
      // }
    });

    socket.on("messageReceived", (data) => {
      console.log("messageReceived", data);
      ReceivedMessage(data);
      if (OpenRoom === data.roomId) {
        setSend((list) => [...list, data]);
        // console.log("workinggg", OpenRoom);
      }
    });
    socket.on("enquiry", (NewEnquiry) => {
      console.log("NewEnquiry:", NewEnquiry);
      getChatList();
    });

    return () => {
      // socket.disconnect();
      socket.off("messageReceived");
      socket.off("messageSent");
    };
  }, [socket, OpenRoom]);

  useEffect(() => {
    if (storeUserId) {
      const newData = [...userData];
      newData.forEach((ele, i) => {
        if (storeUserId == ele._id) {
          setUserOnline(ele.onlineStatus);
        }
      });
    }
  }, [userData]);

  // useEffect(() => {
  //   // console.log("userData response=====>", userData);
  //   if (userData.length > 0) {
  //     const updatedUserData = userData.map((data) => {
  //       let isOnline = false;
  //       for (let ele of resUser) {
  //         if (ele.userId === data.userOnline) {
  //           isOnline = true;
  //           break;
  //         }
  //       }
  //       return {
  //         ...data,
  //         onlineStatus: isOnline,
  //       };
  //     });
  //     // console.log("online user came for chatting===", updatedUserData);
  //     setUserData(updatedUserData);
  //   }
  // }, [resUser]);

  useEffect(() => {
    value.setCurrentUserType("admin");
  }, []);
  return (
    <div className={` bg-white`}>
      <Nav postpropertyBtnVeiw={true} setDataTranscript={""}></Nav>
      {userData && userData.length > 0 ? (
        <div className={`${UC.MainContainer}`}>
          <div className={`${UC.ShowChat}`}>
            <div className={`${UC.section1}`}>
              {/* <ChatList
            className={`${UC.chatlist}`}
            dataSource={userData}
          /> */}
              {userData &&
                userData.map((user, index) => (
                  <ChatItem
                    key={index}
                    avatar={user?.avatar}
                    // alt={user.alt}
                    title={user?.name}
                    subtitle={
                      user?.chats &&
                      user.chats[user.chats.length - 1].messagetype == "enquiry"
                        ? user?.chats &&
                          user.chats[user.chats.length - 1].message?.message
                        : user?.chats &&
                          user.chats[user.chats.length - 1].message &&
                          user.chats[user.chats.length - 1].message
                    }
                    date={user?.updatedAt}
                    // unread={2}
                    // statusColor="#20ff03"
                    statusColor={user.onlineStatus === true && "#20ff03"}
                    onClick={(e) => handleuserChatOpen(user._id)}
                    onClickVideoCall={true}
                    profileRes={profileRes}
                  />
                ))}
            </div>
            <ChatSingle
              text={text}
              setText={setText}
              send={send}
              setSend={setSend}
              sendMsg={sendMsg}
              handlesend={handlesend}
              setMobChatOpen={setMobChatOpen}
              userImg={userImg}
              resUser={resUser}
              handleSelectImages={handleSelectImages}
              getChatList={getChatList}
              setSendMsg={setSendMsg}
              userOnline={userOnline}
              OpenRoom={OpenRoom}
              fileBlink={fileBlink}
              handleCancelSendFile={handleCancelSendFile}
            />
          </div>
          {/* =================================chat section for mobile or small screen size ============================================= */}
          <div className={`${UC.ShowChatMobile}`}>
            {mobChatOpen === true ? (
              <ChatSingle
                text={text}
                setText={setText}
                send={send}
                setSend={setSend}
                sendMsg={sendMsg}
                handlesend={handlesend}
                setMobChatOpen={setMobChatOpen}
                userImg={userImg}
                resUser={resUser}
                handleSelectImages={handleSelectImages}
                getChatList={getChatList}
                setSendMsg={setSendMsg}
                userOnline={userOnline}
                OpenRoom={OpenRoom}
                fileBlink={fileBlink}
                handleCancelSendFile={handleCancelSendFile}
              />
            ) : (
              <div className={`${UC.section1}`}>
                {/* <ChatList
          className={`${UC.chatlist}`}
          dataSource={userData}
        /> */}
                {userData.map((user, index) => (
                  <ChatItem
                    key={index}
                    avatar={user.avatar}
                    // alt={user.alt}
                    title={user && user.name}
                    subtitle={
                      user?.chats &&
                      user.chats[user.chats.length - 1].messagetype == "enquiry"
                        ? user?.chats &&
                          user.chats[user.chats.length - 1].message?.message
                        : user?.chats &&
                          user.chats[user.chats.length - 1].message &&
                          user.chats[user.chats.length - 1].message
                    }
                    date={user && user.updatedAt}
                    // unread={2}
                    // statusColor="#20ff03"
                    statusColor={user.onlineStatus === true && "#20ff03"}
                    onClick={(e) => handleuserChatOpen(user._id)}
                    onClickVideoCall={true}
                    profileRes={profileRes}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            height: "100vh",
            paddingTop: "120px",
          }}
        >
          <img src={NoChatFound} alt="no user found" width={400} />
          <img src={NoMessage} alt="no user found" width={400} />
        </div>
      )}
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
}

export default UserChatFullScreen;
