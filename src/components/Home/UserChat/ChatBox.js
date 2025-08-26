import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import imgs1 from "../../../assets/services/avatar.png";
import imgs2 from "../../../assets/services/Ellipse 31.png";
import NavImg from "../../../assets/Logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { GrFormSubtract } from "react-icons/gr";
import { MdOutlineMessage } from "react-icons/md";
import { VscDebugDisconnect } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import unknown from "../../../assets/User/unknown.png";
import { useContext } from "react";
import AuthContext from '../../../context/AuthProvider'

const ChatBox = ({
  chatOpen,
  setChatOpen,
  // chatQuary,
  messageList,
  username,
  handleSkipUser,
  currentMessage,
  handleInputFild,
  sendMessage,
  initiateHeading,
  setInitiateHeading,
  joinRoom,
  otherUserInitiale,
  patnerTyping,
  handleDisconnect,
  userImg,
  userDetails,
  handleNewUser,
  skipedMsg,
  GetRequest,
  GetAccept,
  AcceptOrReject,
  handleMoveToInBox,
  handleAcceptOrReject,
  handleAcceptMsg,
}) => {
  // console.log('messageList==>',messageList);

  const value = useContext(AuthContext);
const handleGoToChat=()=>{
  console.log("value.setRoomId",value.setRoomId);
  value.setRoomId(value.setRoomId)
  handleDisconnect()
}

  return (
    <div className=" usermainchat_main_container_div">
      <div style={{ position: "relative" }} className="userMainChatContainer">
        <div className="flex_c usermainchat_nav_container_div">
          <div className="usermainchat_navimg_container_div">
            <img src={NavImg} alt="navImage..." />
          </div>

          <div className="flex_c c_blue usermainchat_navlogin_container_div">
            <div>
              <MdOutlineMessage
                className="usermainchat_navlogin_icon_container_div"
                title="move to in box"
                onClick={()=>handleMoveToInBox()}
              />
            </div>
            <div>
              <VscDebugDisconnect
                className="usermainchat_navlogin_icon_container_div"
                onClick={() => handleDisconnect()}
                title="Disconnect"
              />
            </div>
            <div>
              <GrFormSubtract
                className="usermainchat_navlogin_icon_container_div"
                onClick={() => setChatOpen(!chatOpen)}
              />
            </div>
          </div>
        </div>
        <div className="ChatBox_chatInitiar">
          <div
            className={
              otherUserInitiale
                ? "ChatBox_chatInitiarUserConnect "
                : "ChatBox_chatInitiarUserbg"
            }
          >
            <img
              src={unknown}
              alt="userimg.."
              className="usermainchat_recivedimg_container_div"
            />
            {otherUserInitiale ? (
              <p className="ChatBox_chatInitiarPragraph">
                {otherUserInitiale && otherUserInitiale.msg}
              </p>
            ) : (
              <p className=" dotbg">...</p>
            )}

            {/* <p className="ChatBox_chatInitiarPragraph">
              {otherUserInitiale && otherUserInitiale.msg}
            </p> */}
          </div>
          <div className="ChatBox_chatInitiarUserSelf">
            <p className="ChatBox_chatInitiarPragraph">{initiateHeading}</p>
            <img
              src={userImg}
              alt="userimg.."
              className="usermainchat_sendimg_container_div"
              title={userDetails && userDetails.name}
            />
          </div>
        </div>
        <ScrollToBottom className="usermainchat_chat_main_container_div">
          {/* <div className="usermainchat_recived_container_div">
            <img
              src={imgs1}
              alt="userimg.."
              className="usermainchat_recivedimg_container_div"
            />
            <div className="">
              <p className="usermainchat_recived_msg_container_div">Hi</p>
            </div>
          </div> */}
          {/* <div className="usermainchat_send_container_div">
            <img
              src={imgs2}
              alt="userimg.."
              className="usermainchat_sendimg_container_div"
            />
            <div className="usermainchat_recivedp_container_div">
              <p className="usermainchat_send_msg_container_div">Hello!</p>
            </div>
          </div> */}
          {messageList.map((messageContent) => {
            return (
              <>
                <div
                  className={
                    messageContent.recived !== true
                      ? "usermainchat_send_container_div"
                      : "usermainchat_recived_container_div"
                  }
                >
                  {messageContent.recived !== true ? (
                    <img
                      src={userImg}
                      alt="userimg.."
                      className="usermainchat_recivedimg_container_div"
                    />
                  ) : (
                    <img
                      src={imgs1}
                      alt="userimg.."
                      className="usermainchat_recivedimg_container_div"
                    />
                  )}
                  <div className="">
                    <p
                      className={
                        messageContent.recived !== true
                          ? "usermainchat_send_msg_container_div"
                          : "usermainchat_recived_msg_container_div"
                      }
                    >
                      {messageContent.msg}
                    </p>
                  </div>
                  {/* <div className="message-meta">
              <p id="time">{messageContent.time}</p>
              <p id="author">{messageContent.author}</p>
            </div> */}
                </div>
              </>
            );
          })}
          {patnerTyping === true ? (
            <div className="usermainchat_recived_container_div">
              <img
                src={imgs2}
                alt="userimg.."
                className="usermainchat_recivedimg_container_div"
              />

              <div className="">
                <p className="usermainchat_recived_msg_container_div">...</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* {chatQuary.map((curr, index) => {
            return (
              <div className="usermainchat_send_container_div">
                <img
                  src={imgs2}
                  alt="userimg.."
                  className="usermainchat_sendimg_container_div"
                />
                <div className="usermainchat_recivedp_container_div">
                  <p className="usermainchat_send_msg_container_div">{curr}</p>
                </div>
              </div>
            );
          })} */}
          <div>
            {!otherUserInitiale ? (
              <div className="skipUserparagraph">
                {!skipedMsg ? (
                  <p>Click New To search new Patner</p>
                ) : (
                  <p>{skipedMsg}</p>
                )}
                <div
                  className="c_og  usermainchat_skipButton  "
                  onClick={handleNewUser}
                >
                  <p style={{ width: "80px", textAlign: "center" }}> New</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </ScrollToBottom>
        {GetRequest === true && (
          <div className="UserMoveBox">
            {GetAccept === true && (
              <div className="UserMoveChatAccept">
                <div className="UserMovePra">
                  <p>You have successfully connected !</p>
                </div>
                {/* <div className="UserMoveBoxDiv">
                  <button
                    className="sw UserMoveButton UserMoveButtonAccept "
                    style={{ backgroundColor: "#36c74e" }}
                    onClick={()=>handleAcceptMsg(false)}
                  >
                    Okay
                  </button>
                </div> */}
                <div className="UserMoveBoxDiv">
                  <button className="sw UserMoveButton UserMoveButtonReject" onClick={()=>handleAcceptMsg(false)}>
                    Cancel
                  </button>
                  <NavLink to='/message'>
                  <button className="sw UserMoveButton UserMoveButtonAccept" onClick={()=>handleGoToChat()} >
                    Chat
                  </button>
                  </NavLink>
                </div>
              </div>
            )}

            {AcceptOrReject === true && (
              <div className="UserMoveBoxContainer">
                <div className="UserMovePra">
                  <p>This user wants to connect with You!</p>
                </div>
                <div className="UserMoveBoxDiv">
                  <button className="sw UserMoveButton UserMoveButtonReject" onClick={()=>handleAcceptOrReject(false)}>
                    Reject
                  </button>
                  <button className="sw UserMoveButton UserMoveButtonAccept" onClick={()=>handleAcceptOrReject(true)}>
                    Accept
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="usermainchat_msg_container_div">
          {otherUserInitiale ? (
            <div
              className=" usermainchat_skip_container_div"
              onClick={handleSkipUser}
            >
              <p>Skip</p>
            </div>
          ) : (
            <div
              className="c_og  usermainchat_skipButton "
              onClick={handleNewUser}
            >
              <p>New</p>
            </div>
          )}
          <div></div>
          <div className="usermainchat_msg_input_container_div">
            <input
              type="text"
              placeholder="Enter a message"
              id="usermainchat_msg_input_container"
              disabled={!otherUserInitiale ? true : false}
              value={currentMessage}
              onChange={(e) => handleInputFild(e)}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
          </div>
          <div className="">
            <RiSendPlaneFill
              className="h4 c_og usermainchat_msg_sendicon_container_div"
              title="send message"
              onClick={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
