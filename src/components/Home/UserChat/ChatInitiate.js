import React from "react";
import { GrFormSubtract } from "react-icons/gr";
import imgs2 from "../../../assets/services/Ellipse 31.png";

const ChatInitiate = ({
  initiateHeading,
  setInitiateHeading,
  handleOpenChant,
  chatOpen,
  setChatOpen,
  userImg
}) => {
  // const handleOpenChant = () => {
  //   setInitiatePage(true);
  // };
  return (
    <div className="flex_c usermainchat_login_register_container_div">
      <GrFormSubtract
        className="usermainchat_navlogin_icon_container_div ChatLogin_sublogo"
        style={{ color: "#ddd" }}
        onClick={() => setChatOpen(false)}
      />

      <div className="usermainchat_recived_container_div">
        <img
          src={userImg}
          alt="userimg.."
          className="usermainchat_recivedimg_container_div ChatInitiate_Image"
        />
        {/* <p className="ChatInitiate_pragraph">{initiateHeading}</p> */}
        <textarea
          className="ChatInitiate_pragraph"
          placeholder="Enter Initiate Message in 100 characters"
          onChange={(e) => setInitiateHeading(e.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && handleOpenChant();
          }}
          maxlength="50"
        />
      </div>
      <br />

      {/* <div className="flex_c usermainchat_email_container_div">
        <input
          type="text"
          required
          placeholder="Enter Initiate Message in 100 words"
          maxlength="100"
          id="usermainchat_emailinput_container"
            onChange={(e)=>setInitiateHeading(e.target.value)}
            onKeyPress={(event) => {
                event.key === "Enter" && handleOpenChant();
              }} 
        />
      </div> */}
      <button
        style={{
          width: "90%",
        }}
        id="usermainchat_button__container"
        type="submit"
        onClick={() => handleOpenChant()}
      >
        Initiate chatting &rarr;
      </button>
    </div>
  );
};

export default ChatInitiate;
