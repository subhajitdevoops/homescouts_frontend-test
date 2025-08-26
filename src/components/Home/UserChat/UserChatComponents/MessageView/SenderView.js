import React from "react";
import UC from "../../UserChatCSS/UserChat.module.css";
import Pic from "../../pic.jpg";

function SenderView() {
  return (
    <div className={`${UC.SenderViewDiv}`}>
      <div className={`${UC.SenderViewInnerDiv}`}>
        <div className={`${UC.senderuserProfile}`}>
          <img src={Pic} alt="profile pic" />
        </div>
        <span className={`${UC.message}`}>
          velit similique dolorum dolore doloremque, nihil in, minima, suscipit
          eius nemo necessitatibus exercitationem placeat odit consequuntur!
        </span>
        <div className={`${UC.timeStamp}`}>
          <p>11:25 pm</p>
        </div>
      </div>
    </div>
  );
}

export default SenderView;
