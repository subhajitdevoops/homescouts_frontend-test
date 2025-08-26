import React from "react";
import { GrDocumentImage, GrView } from "react-icons/gr";
import UC from "./UserChatCSS/UserChat.module.css";
// import ListViewOfUser from "./UserChatComponents/ListViewOfUser";
// import ChatViewOfUser from "./UserChatComponents/ChatViewOfUser";
import Pic from "./pic.jpg";
import "react-chat-elements/dist/main.css";
import { MessageBox, Navbar, Avatar } from "react-chat-elements";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  MdKeyboardArrowDown,
  MdAutoDelete,
  MdOutlineReport,
  MdOutlineFileCopy,
} from "react-icons/md";
import { HiReply } from "react-icons/hi";
import img1 from "./Group 82.svg";
import img2 from "./Group 84.svg";
import img3 from "../../../assets/statusimg/img2.jpg";
import { io } from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from "../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import NoChatFound from "../../../assets/chat/NO MESSAGE CONDITION IMAGE.svg";
import NoMessage from "../../../assets/chat/No message.svg";
import { RxCross2 } from "react-icons/rx";
import { BsArrowsAngleExpand } from "react-icons/bs";

const isImage = (link) => {
  return /\.(jpg|jpeg|png|gif|bmp)$/i.test(link);
};

const Replyed = ({
  position,
  handleChatMessageReport,
  chatId,
  personId,
  messageId,
  messageText,
  DelSend,
}) => {
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  const userIds = UserTokenAvilable && UserTokenAvilable.response._id;
  return (
    <div className={`${UC.recivArrowDown}`}>
      <MdKeyboardArrowDown className={`${UC.MdKeyboardArrowDown}`} />
      <div
        className={
          position === "left"
            ? `  ${UC.recivedMenu} ${UC.recivedMenuLeft}`
            : `${UC.recivedMenu}`
        }
      >
        {/* <div>
          <HiReply style={{ fontSize: "20px" }} /> <p>Reply</p>
        </div> */}
        {/* {DelSend && (
          <div>
            <MdAutoDelete style={{ fontSize: "20px" }} />
            <p>{DelSend}</p>{" "}
          </div>
        )} */}
        <div
          onClick={() =>
            handleChatMessageReport(chatId, personId, messageId, messageText)
          }
        >
          <MdOutlineReport style={{ fontSize: "20px" }} />
          <p>Report</p>
        </div>
      </div>
    </div>
  );
};

const ChatSingle = ({
  text,
  sendMsg,
  handlesend,
  send,
  setText,
  setMobChatOpen,
  userImg,
  profileRes,
  resUser,
  handleSelectImages,
  getChatList,
  setSendMsg,
  userOnline,
  OpenRoom,
  fileBlink,
  handleCancelSendFile,
}) => {
  const [onlineUser, setOnlineUser] = useState(false);
  const [chatDelete, setChatDelete] = useState();
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  const userIds = UserTokenAvilable && UserTokenAvilable.response._id;

  const getFileNameFromUrl = (url) => {
    const lastSlashIndex = url.lastIndexOf("/");
    const queryIndex = url.indexOf("?");
    const endIndex = queryIndex !== -1 ? queryIndex : url.length;
    return url.substring(lastSlashIndex + 1, endIndex);
  };
  // ---------------------------Chat Message Report------------------------------
  const handleChatMessageReport = async (
    chatId,
    personId,
    messageId,
    messageText
  ) => {
    const messageData = {
      chatId: chatId,
      personId: personId,
      message: {
        _id: messageId,
        text: messageText,
      },
    };

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.USER_SERVICE_CREATE_REPORT,
      messageData,
      userToken
    );

    if (ResBasic) {
      if (ResBasic.success === "true") {
        toast.success(ResBasic.message);
        getChatList();
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };
  // console.log("sendMsg--------------------- ", sendMsg);
  // -----------------UserBlock----------------
  const handleBlock = async (TrueFalse) => {
    const UserDetails = {
      chatid: sendMsg[0]._id,
      is_block: TrueFalse,
    };

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.USER_SERVICE_CHAT_BLOCK_URL,
      UserDetails,
      userToken
    );

    if (ResBasic) {
      if (ResBasic.success === true) {
        toast.success(ResBasic.message);
        const AllDAta = [...sendMsg];
        AllDAta.forEach((element) => {
          sendMsg[0].block_info.is_block = TrueFalse;
          sendMsg[0].block_info.block_by.userId = userIds;
        });
        console.log("AllDAta", AllDAta);
        setSendMsg(AllDAta);
        getChatList();
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };
  // --------------------------handleDeleteChatRoom--------------------------
  const handleDeleteChatRoom = async () => {
    setChatDelete(false);
    const UserRoomDetails = {
      chatRoomId: OpenRoom,
    };

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.USER_SERVICE_DELETE_CHAT_ROOM_URL,
      UserRoomDetails,
      userToken
    );

    if (ResBasic) {
      if (ResBasic.success === true) {
        toast.success(ResBasic.message);
        getChatList();
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };

  useEffect(() => {
    if (resUser.length > 0 && sendMsg.length > 0) {
      for (let ele of resUser) {
        if (ele.userId === sendMsg[0].userOnline) {
          setOnlineUser(true);
        } else {
          setOnlineUser(false);
        }
      }
    }
  }, [sendMsg]);
  // console.log('send==>',send);

  return (
    <div className={`${UC.section2}`}>
      {sendMsg &&
        sendMsg.map((user, index) => (
          <>
            <Navbar
              left=<div>
                <p
                  className={`${UC.BackArrow}`}
                  onClick={() => setMobChatOpen(false)}
                >
                  {" "}
                  &larr;
                </p>
                <Avatar
                  src={user.avatar}
                  alt={user.alt}
                  size="xlarge"
                  type="circle"
                />

                <div
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                  }}
                >
                  <h6>{user.name}</h6>
                  <span style={{ fontSize: "9px", marginTop: "5px" }}>
                    {userOnline && userOnline == true ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
              center=<div></div>
              right=<div className={`${UC.UserChatBlockDelete}`}>
                {chatDelete === true ? (
                  <div className={`${UC.UserChatsDelete}`}>
                    <p>
                      Are you sure you want to delete the chat?
                      <span>
                        won't be able to access the chat. Once deleted, you
                      </span>
                    </p>
                    <button onClick={() => handleDeleteChatRoom(OpenRoom)}>
                      yes
                    </button>
                    <button
                      style={{ backgroundColor: "#f4f0f0", color: "#000" }}
                      onClick={() => setChatDelete(false)}
                    >
                      cancel
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <div onClick={() => setChatDelete(true)}>
                  <img src={img2} />
                  <p>Delete</p>
                </div>
                {
                  user?.block_info?.is_block === true ? (
                    <>
                      {user.block_info?.block_by?.userId === userIds && (
                        <div onClick={() => handleBlock(false)}>
                          <img src={img1} />
                          <p>UnBlock</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div onClick={() => handleBlock(true)}>
                        <img
                          src={img1}
                          style={{
                            backgroundColor: "#ED6823",
                            borderRadius: "50%",
                          }}
                        />

                        <p>Block</p>
                      </div>
                    </>
                  )

                  // user.block_info?.block_by?.userId === userIds && (
                  //   <>
                  //     {user?.block_info?.is_block === true ? (
                  //       <div onClick={() => handleBlock(false)}>
                  //         <img src={img1} />

                  //         <p>UnBlock</p>
                  //       </div>
                  //     ) : (
                  //       <div onClick={() => handleBlock(true)}>
                  //         <img
                  //           src={img1}
                  //           style={{
                  //             backgroundColor: "#ED6823",
                  //             borderRadius: "50%",
                  //           }}
                  //         />

                  //         <p>Block</p>
                  //       </div>
                  //     )}
                  //   </>
                  // )
                }
              </div>
              type="dark"
            />
            <div className={`${UC.MessageCont} `}>
              <ScrollToBottom
                followButtonClassName="arrow down"
                className={`${UC.MessageScroll}`}
              >
                <>
                  {send &&
                    send.map((msg, index) => (
                      <>
                        {msg.messagetype === "enquiry" ? (
                          <div
                            className={
                              // user &&
                              msg.senderId == userIds
                                ? `${UC.enquiryLeftRight}`
                                : ""
                            }
                          >
                            <div className="card" style={{ width: "18rem" }}>
                              <img
                                className="card-img-top"
                                // src={msg.mediaLink}
                                src={msg.mediaLink}
                                alt="Card image cap"
                              />
                              <div className="card-body">
                                <h6 className="card-title">
                                  Hello {msg.PropertyOwner}
                                </h6>
                                <p
                                  className="card-text mb-1"
                                  style={{
                                    color: "#696f79",
                                    fontSize: "12px",
                                  }}
                                >
                                  I am interested in this property that you have
                                  posted.
                                </p>
                                <p
                                  className="card-text mb-1 "
                                  style={{
                                    color: "#34373d",
                                    fontSize: "15px",
                                  }}
                                >
                                  My contact number is:<i>{msg.phone}</i> please
                                  feel free to connect me at your time.
                                </p>
                                <p
                                  className="card-text mb-1 "
                                  style={{
                                    color: "#696f79",
                                    fontSize: "12px",
                                  }}
                                >
                                  more I want to add:
                                  <br /> {msg.message}
                                </p>
                                <a href="#" className=" btn btn-primary">
                                  <NavLink
                                    to={`/Property-Details?_id=${msg.propertyId}`}
                                    target="_blank"
                                  >
                                    View Property
                                  </NavLink>
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {msg.medialink ? (
                              <>
                                {msg.senderId === user.userIdd ? (
                                  <div className={`${UC.recivedMessage}`}>
                                    <div className={`${UC.recivedMessageFile}`}>
                                      {isImage(msg.medialink) ? (
                                        <div
                                          className={`${UC.chatFileMdOutline}`}
                                          style={{
                                            border:
                                              "1px solid rgb(237, 104, 35)",
                                            backgroundColor:
                                              " rgb(237, 104, 35)",
                                            color: "#fff",
                                            padding: "5px",
                                            borderRadius: "5px",
                                            position: "relative",
                                          }}
                                        >
                                          {" "}
                                          <a
                                            href={msg.medialink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <img
                                              src={msg.medialink}
                                              alt="Your Image"
                                              style={{
                                                width:'300px',
                                                height:'300px',
                                                objectFit:"cover",
                                              }}
                                            />
                                            <BsArrowsAngleExpand
                                              style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                color: "#fff",
                                                fontSize: "20px",
                                                cursor: "pointer",
                                              }}
                                            />
                                          </a>
                                        </div>
                                      ) : (
                                        <a
                                          href={msg.medialink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <div
                                            className={`${UC.chatFileMdOutline}`}
                                            style={{
                                              border:
                                                "1px solid rgb(237, 104, 35)",
                                              backgroundColor:
                                                " rgb(237, 104, 35)",
                                              color: "#fff",
                                              padding: "10px",
                                              position: "relative",
                                            }}
                                          >
                                            <MdOutlineFileCopy
                                              className={`${UC.FileMdOutlineFileCopy}`}
                                            />
                                            <p>
                                              {" "}
                                              {getFileNameFromUrl(
                                                msg.medialink
                                              )}
                                            </p>
                                            <BsArrowsAngleExpand
                                              style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                color: "#fff",
                                                fontSize: "20px",
                                                cursor: "pointer",
                                              }}
                                            />
                                          </div>
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    className={`${UC.recivedMessage} ${UC.sendMessageRig}`}
                                  >
                                    <div className={`${UC.recivedMessageFile}`}>
                                      {isImage(msg.medialink) ? (
                                        <div
                                          className={`${UC.chatFileMdOutline}`}
                                          style={{
                                            border:
                                              "1px solid rgb(237, 104, 35)",
                                            backgroundColor:
                                              " rgb(237, 104, 35)",
                                            color: "#fff",
                                            padding: "5px",
                                            borderRadius: "5px",
                                            position: "relative",
                                          }}
                                        >
                                          <a
                                            href={msg.medialink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <img
                                              src={msg.medialink}
                                              alt="Your Image"
                                              style={{
                                                width:'300px',
                                                height:'300px',
                                                objectFit:"cover",
                                              }}
                                            />

                                            <BsArrowsAngleExpand
                                              style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                color: "#fff",
                                                fontSize: "20px",
                                                cursor: "pointer",
                                              }}
                                            />
                                          </a>
                                        </div>
                                      ) : (
                                        <a
                                          href={msg.medialink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <div
                                            className={`${UC.chatFileMdOutline}`}
                                            style={{
                                              border:
                                                "1px solid rgb(237, 104, 35)",
                                              backgroundColor:
                                                " rgb(237, 104, 35)",
                                              color: "#fff",
                                              padding: "10px",
                                              borderRadius: "5px",
                                              position: "relative",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <MdOutlineFileCopy
                                              className={`${UC.FileMdOutlineFileCopy}`}
                                            />
                                            <p>
                                              {" "}
                                              {getFileNameFromUrl(
                                                msg.medialink
                                              )}
                                            </p>
                                            {/* <GrView style={{ color: "#fff" }} /> */}
                                            <BsArrowsAngleExpand
                                              style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                color: "#fff",
                                                fontSize: "20px",
                                              }}
                                            />
                                          </div>
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                {msg.senderId === user.userIdd ? (
                                  <div className={`${UC.recivedMessage}`}>
                                    <MessageBox
                                      position={"left"}
                                      type={"text"}
                                      title={user.name}
                                      text={msg.text}
                                      className={`${UC.recivedMessageBox}`}
                                      // replyButton={true}
                                      // reply={{
                                      //   title: "Emre",
                                      //   titleColor: "#8717ae",
                                      //   message: "Nice to meet you",
                                      // }}
                                      date={new Date()}
                                      // status="read"
                                      // status="waiting"
                                      status="sent"
                                      // status="received"
                                      // removeButton={true}
                                      // forwarded={true}
                                      // copiableDate={true}
                                      titleColor="#7ae"
                                      // avatar={"https://avatars.githubusercontent.com/u/80540635?v=4"}
                                      // dateString='just'
                                      // date={user.date}
                                      // lockable={false}
                                    />

                                    <Replyed
                                      handleChatMessageReport={
                                        handleChatMessageReport
                                      }
                                      chatId={user._id}
                                      personId={user.userIdd}
                                      messageId={
                                        msg.messageId ? msg.messageId : null
                                      }
                                      messageText={msg.text}
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className={`${UC.recivedMessage} ${UC.sendMessageRig}`}
                                  >
                                    <Replyed
                                      position="left"
                                      handleChatMessageReport={
                                        handleChatMessageReport
                                      }
                                      chatId={user._id}
                                      personId={user.userIdd}
                                      messageId={
                                        msg.messageId ? msg.messageId : null
                                      }
                                      messageText={msg.text}
                                      DelSend={"UnSend"}
                                    />

                                    <MessageBox
                                      position={"right"}
                                      type={"text"}
                                      title={"you"}
                                      text={msg.text}
                                      className={`${UC.recivedMessageBox}`}
                                      replyButton={true}
                                      // reply={{
                                      //   title: "Emre",
                                      //   titleColor: "#8717ae",
                                      //   message: "Nice to meet you",
                                      // }}
                                      date={new Date()}
                                      // status="read"
                                      // status="waiting"
                                      status="sent"
                                      // status="received"
                                      // status="read"
                                      // removeButton={true}
                                      // forwarded={true}
                                      // copiableDate={true}
                                      titleColor="#7ae"
                                      // avatar={"https://avatars.githubusercontent.com/u/80540635?v=4"}
                                      // dateString='just'
                                      // date={user.date}
                                      // focus={true}
                                      // lockable={false}
                                    />
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    ))}
                </>
              </ScrollToBottom>
            </div>
            <div className={`${UC.TypingDiv}`}>
              {user?.block_info?.is_block === true ? (
                <h5>You can't able to send message to this user </h5>
              ) : (
                <div className={`${UC.TypingContainerDiv}`}>
                  <div className={`${UC.userIconTypeBox}`}>
                    <img src={userImg} alt="Send Icon" />
                  </div>
                  <input
                    placeholder="Type here..."
                    inputStyle={{ borderRadius: "15px" }}
                    className={`${UC.rcecontainerinput}`}
                    defaultValue="hello"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(event) => {
                      event.key === "Enter" && handlesend(user.userIdd,false);
                    }}
                  />
                  <div
                    className={`${UC.SendIcon}`}
                    onClick={() => handlesend(user.userIdd, false)}
                  >
                    <svg viewBox="0 0 38 38" fill="none">
                      <path
                        d="M37.6463 0.351297C37.8138 0.51907 37.9283 0.732361 37.9757 0.964674C38.023 1.19699 38.001 1.43808 37.9125 1.65802L23.8331 36.8596C23.7091 37.1696 23.5019 37.4393 23.2344 37.6392C22.9669 37.839 22.6495 37.9611 22.317 37.9921C21.9846 38.0232 21.65 37.9619 21.3502 37.815C21.0504 37.6681 20.7968 37.4413 20.6176 37.1596L12.9282 25.0725L0.842616 17.3822C0.560299 17.2031 0.332943 16.9495 0.185637 16.6493C0.0383307 16.3491 -0.0231992 16.0141 0.00783667 15.6812C0.0388725 15.3482 0.161268 15.0304 0.361516 14.7626C0.561765 14.4948 0.832082 14.2876 1.14264 14.1638L36.3398 0.0875337C36.5597 -0.00100311 36.8007 -0.0229747 37.033 0.0243483C37.2653 0.0716713 37.4786 0.186203 37.6463 0.353717V0.351297ZM15.343 24.3659L22.0233 34.8632L33.475 6.23153L15.343 24.3659ZM31.7644 4.5207L3.13635 15.9738L13.6348 22.6526L31.7668 4.5207H31.7644Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className={`${UC.SendIcon}`}>
                    <label htmlFor="chatSendImage">
                      <svg viewBox="0 0 38 38" fill="none">
                        <GrDocumentImage style={{ fontSize: "30px" }} />
                      </svg>
                    </label>
                    <input
                      type="file"
                      id="chatSendImage"
                      style={{ display: "none" }}
                      accept=".png, .jpg, .jpeg ,.doc ,.pdf"
                      onChange={(e) => {
                        handleSelectImages(e);
                      }}
                    />
                  </div>
                  {fileBlink.fileSend == true && (
                    <div className={`${UC.chatDoc}`}>
                      <div className={`${UC.chatFileSelect}`}>
                        <div
                          className={`${UC.chatFileMdOutlineFileCopy} ${
                            fileBlink.fineLink && `${UC.fileBoxShadow}`
                          } `}
                        >
                          <div className={`${UC.chatFileMdOutline}`}>
                            <MdOutlineFileCopy
                              className={`${UC.FileMdOutlineFileCopy}`}
                            />
                            <p>{fileBlink.fileName}</p>
                          </div>
                          {fileBlink.fineLink && (
                            <RxCross2
                              onClick={handleCancelSendFile}
                              style={{
                                color: "red",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                            />
                          )}
                        </div>
                        {fileBlink.fineLink ? (
                          <div
                            className={`${UC.SendIcon} ` }
                            style={{
                              backgroundColor:'#585858',
                              borderRadius:'5px'
                            }}
                            onClick={() => handlesend(user.userIdd, true)}
                        
                          >
                            <svg viewBox="0 0 38 38" fill="none">
                              <path
                                d="M37.6463 0.351297C37.8138 0.51907 37.9283 0.732361 37.9757 0.964674C38.023 1.19699 38.001 1.43808 37.9125 1.65802L23.8331 36.8596C23.7091 37.1696 23.5019 37.4393 23.2344 37.6392C22.9669 37.839 22.6495 37.9611 22.317 37.9921C21.9846 38.0232 21.65 37.9619 21.3502 37.815C21.0504 37.6681 20.7968 37.4413 20.6176 37.1596L12.9282 25.0725L0.842616 17.3822C0.560299 17.2031 0.332943 16.9495 0.185637 16.6493C0.0383307 16.3491 -0.0231992 16.0141 0.00783667 15.6812C0.0388725 15.3482 0.161268 15.0304 0.361516 14.7626C0.561765 14.4948 0.832082 14.2876 1.14264 14.1638L36.3398 0.0875337C36.5597 -0.00100311 36.8007 -0.0229747 37.033 0.0243483C37.2653 0.0716713 37.4786 0.186203 37.6463 0.353717V0.351297ZM15.343 24.3659L22.0233 34.8632L33.475 6.23153L15.343 24.3659ZM31.7644 4.5207L3.13635 15.9738L13.6348 22.6526L31.7668 4.5207H31.7644Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                        ) : (
                          <>
                            <p >Please wait...</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ))}

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

export default ChatSingle;
