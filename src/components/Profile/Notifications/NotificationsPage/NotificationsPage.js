import React, { useEffect, useState } from "react";
import "./NotificationsPage.css";
import ProfileSideMenu from "../../ProfileSideMenu/ProfileSideMenu";
import Notifications from "../Notification/Notifications";
import MobileBottomMenu from "../../../Home/MobileBottomMenu/MobileBottomMenu";
import { API_REQ_GET } from "../../../../config/API";
import configData from "../../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";

const NotificationsPage = () => {
  const [notification, setNotification] = useState([]);
  const [notifi, setNotifi] = useState(false);
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =UserTokenAvilable &&
  UserTokenAvilable.response &&
  UserTokenAvilable.response.token;;
  // console.log("userToken------------------------------------>", userToken);
  // console.log("notifi------------------------------------>", notifi);

  // -----------------------------Api get request-------------------------------------------
  const getNotification = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_NOTIFICATION_GET_URL,
      userToken
    );
    console.log("ApiRes", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        // console.log("notification=>", ApiRes);
        // setResp(ApiRes.result);
        setNotification(ApiRes.notification);
        for (let ele of ApiRes.notification) {
          if (ele.viewsOrNot === false) {
            setNotifi(true);
          }
        }
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }

        // console.log("notification=>", ApiRes);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    if (userToken) {
      getNotification();
    }
  }, []);
  return (
    <div className="ProfilePage_main_Contain_div">
      <div className="ProfilePage_Sideprofilemenu_Contain_div">
        <ProfileSideMenu selectMenu="6" notifi={notifi} />
      </div>
      <div className="ProfilePage_Ads_Contain_div">
        <div className="ProfileBody_main_container_div">
          <div className="ProfileBody_container_div">
            <Notifications
              notification={notification}
              setNotifi={setNotifi}
              setNotification={setNotification}
            />
          </div>
        </div>
      </div>
      <MobileBottomMenu Highlight='profile' />
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

export default NotificationsPage;
