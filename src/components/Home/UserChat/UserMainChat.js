import React, { useContext, useEffect} from "react";
import "../../../assets/User/User.css";
import ChatLogin from "./ChatLogin";
import ChatBox from "./ChatBox";
import ChatInitiate from "./ChatInitiate";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthProvider";

// const socket = io.connect("http://localhost:3001");

const UserMainChat = ({
  chatOpen,
  setChatOpen,
  socket,
  initiatePage,
  setInitiatePage,
  currentMessage,
  setCurrentMessage,
  messageList,
  setMessageList,
  updateMsgList,
  initiateHeading,
  setInitiateHeading,
  otherUserInitiale,
  setOtherUserInitiale,
  patnerTyping,
  setPatnerTyping,
  userImg,
  userDetails,
  setSkipedMsg,
  skipedMsg,
  GetRequest,
  setGetRequest,
  GetAccept,
  setGetAccept,
  AcceptOrReject,
  setAcceptOrReject,
  acceptId,
  setAcceptId,
}) => {
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  const userId = UserTokenAvilable && UserTokenAvilable.response._id;
  const value = useContext(AuthContext);

  // console.log("userToken------------------------------------>", userId);
  // ------------------------------------in--------------------------------------------
  const handleOpenChant = () => {
    const initiateData = { msg: initiateHeading, userId: userId };
    socket.emit("init", initiateData);
    setInitiatePage(true);
  };

  // const joinRoom = () => {
  //   // if (username !== "" && room !== "") {
  //   //   // socket.emit("join_room", room);
  //   // }
  //   // setChatLogin(!chatLogin);
  //   setShowChat(true);
  //   // socket.emit("username", username);
  // };
  const handleInputFild = (e) => {
    setCurrentMessage(e.target.value);
    const typing = true;
    socket.emit("typing", typing);
  };
  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        // room: room,
        // author: username,
        // message: currentMessage,
        // time:
        //   new Date(Date.now()).getHours() +
        //   ":" +
        //   new Date(Date.now()).getMinutes(),
        msg: currentMessage,
        target: otherUserInitiale && otherUserInitiale.id,
        source: socket && socket.id,
      };
      // socket.emit("send_message", messageData);
      const sendMsg = {
        msg: currentMessage,
        recived: false,
      };

      setMessageList((list) => [...list, sendMsg]);
      setCurrentMessage("");
      // console.log(sendMsg);
      // console.log(messageData);

      // chat message
      socket.emit("anonymousMessage", messageData);
    }
  };
  //---------------------------skip user---------------------------
  const handleSkipUser = () => {
    // socket.emit("disconnectingNow", "");
    socket.emit("skip", "");
    setOtherUserInitiale("");
    setMessageList([]);
    setSkipedMsg("");
  };

  // ----------------------handleNewUser----------------------
  const handleNewUser = () => {
    const initiateData = { msg: initiateHeading, userId: userId };
    socket.emit("init", initiateData);
    setSkipedMsg("");
  };
  // --------------handle Move To In Box---------------
  const handleMoveToInBox = () => {
    let newChatData = [];
    for (let msg of messageList) {
      const msgData = {
        user_id:
          msg.recived === true
            ? otherUserInitiale && otherUserInitiale.id
            : socket && socket.id,
        name: "",
        messagetype: "chat",
        message: msg.msg,
        date_time: " 2022 ",
        medialink: "  ",
        is_deleted: false,
      };
      newChatData.push(msgData);
    }
    console.log("newChatData=>", newChatData);
    const data = {
      message: newChatData,
      recipientId: otherUserInitiale && otherUserInitiale.id,
      senderId: socket && socket.id,
    };
    socket.emit("moveToInbox", data);
    console.log("data==>", data);
    toast.success('You have successfully send request.')
  };
  // --------------Reject or Accept Move To In Box---------------

  const handleAcceptOrReject = (Accept) => {
    const requestData = {
      senderId: socket && socket.id,
      receiverId: acceptId && acceptId.senderId,
      accept: Accept,
      message: acceptId && acceptId.message,
    };
    socket.emit("inboxRequestResponse", requestData);
    console.log('requestData=>',requestData);
    setTimeout(() => {
      setGetRequest(false);
      setAcceptOrReject(false);
      setGetAccept(false);
    }, 2);
    toast.success('You will be able to chat in personal chat, once this user accept your request.')
  };

  // ----------------AcceptMsg-------------------
  const handleAcceptMsg = () => {
    setGetRequest(false);
    setAcceptOrReject(false);
    setGetAccept(false);
  };
  //-----------------------------Disconnect----------------------------------
  const handleDisconnect = () => {
    handleSkipUser();
    socket.emit("disconnected", "");
    setChatOpen(!chatOpen);
    setInitiatePage(false);
    setCurrentMessage("");
    setMessageList([]);
    setInitiateHeading("");
    setOtherUserInitiale("");
    setPatnerTyping(false);
    setSkipedMsg("");
  };

  useEffect(() => {
    //-----------------get patner details------------------
    socket.on("partner", (data) => {
      console.log("partner====>", data);
      setOtherUserInitiale(data);
      // setMessageList((list) => [...list, data]);
      setMessageList([]);
      // setInitiateHeading('')
      // setOtherUserInitiale("");
    });
    //--------------------chat message partner------------------
    socket.on("from", (user) => {
      console.log("from===>", user);
      // const recivedMsg = {
      //   msg: user,
      //   recived: true,
      // };
      // setMessageList((list) => [...list, recivedMsg]);
      // setPatnerTyping(false);
    });

    //--------------------to------------------
    socket.on("to", (user) => {
      const recivedMsg = {
        msg: user,
        recived: true,
      };
      console.log('to',user);
      updateMsgList(recivedMsg)
    });
    //--------------------disconnectMsg------------------
    socket.on("disconnectMsg", (user) => {
      // socket.emit("disconnectMsg", "");
      console.log("disconnectMsg===>", user);
    });
    //--------------------skipped------------------
    socket.on("skipped", (user) => {
      // socket.emit("skipped", "");
      console.log("skipped===>", user);
      setSkipedMsg(user);
      setOtherUserInitiale();
      setMessageList([]);
    });
    //----------------patner is typing----------------------
    socket.on("typing", (user) => {
      // console.log("patner is typing===>", user);
      setPatnerTyping(user);
    });
    // ------------------Received move to inbox--------------------------------
    socket.on("inboxRequest", (res) => {
      console.log("inboxRequest===>", res);
      setGetRequest(true);
      setAcceptOrReject(true);
      setAcceptId(res);
    });
    // ------------------Received move to inbox--------------------------------
    socket.on("moveToInboxResponse", (res) => {
      console.log("moveToInboxResponse===>", res);
      console.log("moveToInboxResponse===>", res.roomId);

      setGetRequest(true);
      setGetAccept(true);
      value.setRoomId(res.roomId);
    });
    return () => {
      // socket.disconnect();
      socket.off('to');
    };
  },[socket]);
// ---------------------------------------------
  useEffect(() => {
    setTimeout(() => {
      setPatnerTyping(false);
    }, 3000);
  }, [patnerTyping]);
  return (
    <>
      {!userToken ? (
        toast.warning("Please Login first to access chat")
      ) : (
        // <>
        //   <ChatLogin
        //     setUsername={setUsername}
        //     setRoom={setRoom}
        //     joinRoom={joinRoom}
        //     setChatOpen={setChatOpen}
        //   />
        // </>
        <>
          {initiatePage === true ? (
            <ChatBox
              chatOpen={chatOpen}
              setChatOpen={setChatOpen}
              // chatQuary={chatQuary}
              messageList={messageList}
              // username={username}
              handleSkipUser={handleSkipUser}
              currentMessage={currentMessage}
              handleInputFild={handleInputFild}
              sendMessage={sendMessage}
              initiateHeading={initiateHeading}
              setInitiateHeading={setInitiateHeading}
              otherUserInitiale={otherUserInitiale}
              patnerTyping={patnerTyping}
              handleDisconnect={handleDisconnect}
              userImg={userImg}
              userDetails={userDetails}
              // otherUserInitiale={otherUserInitiale}
              handleNewUser={handleNewUser}
              skipedMsg={skipedMsg}
              GetRequest={GetRequest}
              GetAccept={GetAccept}
              AcceptOrReject={AcceptOrReject}
              handleMoveToInBox={handleMoveToInBox}
              handleAcceptOrReject={handleAcceptOrReject}
              handleAcceptMsg={handleAcceptMsg}
            />
          ) : (
            <ChatInitiate
              handleOpenChant={handleOpenChant}
              initiateHeading={initiateHeading}
              setInitiateHeading={setInitiateHeading}
              chatOpen={chatOpen}
              setChatOpen={setChatOpen}
              userImg={userImg}
            />
          )}
        </>
      )}
    </>
  );
};

export default UserMainChat;
