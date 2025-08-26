import React from "react";
import UC from "../../UserChatCSS/UserChat.module.css";
import Pic from "../../pic.jpg";

function ReceiverView() {
  return (
    <div className={`${UC.ReceiverViewDiv}`}>
      <div className={`${UC.ReceiverViewInnerDiv}`}>
        <div className={`${UC.receiveruserProfile}`}>
          <img src={Pic} alt="profile pic" />
        </div>
        <span className={`${UC.message}`}>
          Lore aliquid placeat illumlorem7 Lorem ipsum dolor sit amet.
        </span>
        <div className={`${UC.timeStamp}`}>
          <p>11:25 pm</p>
        </div>
      </div>
    </div>
  );
}

export default ReceiverView;
