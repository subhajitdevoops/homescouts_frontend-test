import React, { useState } from "react";
import "./Notifications.css";
import img from "../../../../assets/services/Ellipse 31 (1).png";
import { MdCircleNotifications } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import configData from "../../../../config/config.json";

const Notifications = ({ notification, setNotifi, setNotification }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      avatar: img,
      msg: "Someone viewed your AD “1BHK available for rent”",
      message:
        "Your ad got deactivated and it will be deleted permanently within 3 days please...",
      time: "10:00 AM",
      viewrs: false,
    },
    {
      id: 2,
      msg: "User replied to your inbox chat ",
      message:
        "We are really sorry for your bad experience, we aware that you insist that this piece must not be on this platform. We will inspect the same based on your information. Once again thanks for making it available in our knowledge, togather we will make this a better platform.",
      time: "03:00 AM",
      viewrs: false,
    },
    {
      id: 3,
      msg: "Your ad got deactivated and it will be deleted permanently within 3 days please  re-post to save it.",
      message:
        "Your ad got deactivated and it will be deleted permanently within 3 days please...",
      time: "01:00 PM",
      viewrs: true,
    },
    {
      id: 3,
      msg: "User replied to your inbox chat ",
      message:
        "We are really sorry for your bad experience, we aware that you insist that this piece must not be on this platform. We will inspect the same based on your information. Once again thanks for making it available in our knowledge, togather we will make this a better platform.",
      time: "03:00 AM",
      viewrs: true,
    },
  ]);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =UserTokenAvilable &&
  UserTokenAvilable.response &&
  UserTokenAvilable.response.token;;
  // console.log("userToken------------------------------------>", userToken);
  // const userId = UserTokenAvilable && UserTokenAvilable.response._id;

  const handleviweNotification = async (indx, msgId) => {
    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.USER_NOTIFICATION_POST_URL,
      { id: msgId },
      userToken
    );

    if (ResBasic) {
      if (ResBasic.length !== 0) {
        const AllData = [...notification];
        notification.forEach((ele, index) => {
          if (index === indx) {
            notification[indx].viewsOrNot = true;
          }
        });
        setNotification(AllData);

        for (let ele of notification) {
          if (ele.viewsOrNot === false) {
            setNotifi(true);
          }
        }

        // toast.success(ResBasic.message);
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };
  // console.log("notification=>", notification);

  return (
    <div className="Notifications_main_container_div">
      <h6>Notifications</h6>
      <div className="Notifications_AllList">
        {notification.map((ele, index) => (
          <div key={index} className="Notifications_List_mainContainer">
            <div className="Notifications_List_main">
              {ele && ele.avatar ? (
                <div className="Notifications_List_Image">
                  <img src={ele.avatar} alt="avatar Image..." />
                  <NavLink>
                    <BiMessageDetail className="Notifications_BiMessageDetail" />
                  </NavLink>
                </div>
              ) : (
                <MdCircleNotifications
                  className="Notifications_Listsicon"
                  style={{ transform: " rotate(-15deg)" }}
                />
              )}
            </div>
            <div className="Notifications_List">
              <h6 className="Notifications_message">
                {ele.notification && ele.notification.notification_subject}
              </h6>
              <p className="Notifications_msg">
                {ele.notification && ele.notification.notification_body}
              </p>
            </div>
            <div className="Notifications_List_time">
              <p className="Notifications_time">
                {ele.updatedAt &&
                  new Date(ele.updatedAt).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
              </p>
            </div>
            {ele && ele.viewsOrNot === false && (
              <div
                className="notification_viewButtonDiv"
                onClick={() => handleviweNotification(index, ele._id)}
              >
                {/* <button
                  className="notification_viewButton"
                  onClick={() => handleviweNotification(index)}
                >
                  View
                </button> */}
              </div>
            )}
          </div>
        ))}
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

export default Notifications;
