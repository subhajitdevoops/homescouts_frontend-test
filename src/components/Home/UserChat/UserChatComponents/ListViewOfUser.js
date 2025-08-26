import React from "react";
import UC from "../UserChatCSS/UserChat.module.css";

function ListViewOfUser(props) {
  return (
    <div className={`${UC.ListViewOfUser}`}>
      <div className={`${UC.userIcon}`}>
        <div className={`${UC.userIconInner}`}>
          <img title="profile pic" src={props.userIcon} alt="UserImage" />
          <div
            className={`${UC.tooltipOnline} ${
              props.active ? `${UC.active}` : `${UC.inactive}`
            }`}
          ></div>
        </div>
      </div>
      <div className={`${UC.nameMessage}`}>
        <h5 title="Name" className={`${UC.userName}`}>
          {props.userName}
        </h5>
        <p className={`${UC.latestMessage}`}>{props.latestMessage}</p>
      </div>
      <div className={`${UC.lastSeenTime}`}>
        <p title="Last Seen">{props.lastSeenTime}</p>
      </div>
    </div>
  );
}

export default ListViewOfUser;
