import React, { useEffect, useState } from "react";
import "./ProfileSideMenu.css";
import {
  MdAdsClick,
  MdSettingsSuggest,
  MdManageAccounts,
  MdCircleNotifications,
  MdHomeRepairService,
} from "react-icons/md";
import { SiCircle } from "react-icons/si";
import { BsHeartFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_GET } from "../../../config/API";
import configData from "../../../config/config.json";
import { RiServiceFill } from "react-icons/ri";

const ProfileSideMenu = ({ selectMenu, notifi }) => {
  const [notification, setNotification] = useState(false);
  // console.log('notification===>',notification);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =UserTokenAvilable &&
  UserTokenAvilable.response &&
  UserTokenAvilable.response.token;;
  // console.log("userToken------------------------------------>", userToken);

  // -----------------------------Api get request-------------------------------------------
  const getNotification = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_NOTIFICATION_GET_URL,
      userToken
    );
    // console.log("ApiRes",ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        // console.log('notification navProfile=>',ApiRes);
        // setResp(ApiRes.result);
        for (let ele of ApiRes.notification) {
          if (ele.viewsOrNot === false) {
            setNotification(true);
          }
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
    if (userToken) {
      getNotification();
    }
  }, []);
  return (
    <div className="ProfileSideMenu_main_conTainer_div">
      <div className="ProfileSideMenu_Lists_div">
        <NavLink
          id="1"
          to="/Myads"
          data-toggle="tooltip"
          data-placement="bottom"
          title="My ads"
          className={`ProfileSideMenu_list_SelectMenu ${
            selectMenu === "1" && "ProfileSideMenu_SelectMenu"
          }`}
        >
          <MdAdsClick
            className="ProfileSideMenu_Listsicon"
            style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
          />
          <p>My ads </p>{" "}
        </NavLink>
        <NavLink
          id="2"
          to="/MyService"
          data-toggle="tooltip"
          data-placement="bottom"
          title="My ads"
          className={`ProfileSideMenu_list_SelectMenu ${
            selectMenu === "2" && "ProfileSideMenu_SelectMenu"
          }`}
        >
          <MdHomeRepairService
            className="ProfileSideMenu_Listsicon"
            style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
          />
          <p>My Service </p>{" "}
        </NavLink>
        <NavLink
          id="3"
          to="/Profile-setting"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Profile setting"
          className={`ProfileSideMenu_list_SelectMenu ${
            selectMenu === "3" && "ProfileSideMenu_SelectMenu"
          }`}
        >
          <MdSettingsSuggest className="ProfileSideMenu_Listsicon" />
          <p>Profile setting </p>{" "}
        </NavLink>
        <NavLink
          id="4"
          to="/Service-provider"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Be a service provider"
          className={`ProfileSideMenu_list_SelectMenu ${
            selectMenu === "4" && "ProfileSideMenu_SelectMenu"
          }`}
        >
          <SiCircle className="ProfileSideMenu_Listsicon" />
          <p>Be a service provider</p>
        </NavLink>
        <NavLink
          id="5"
          to="/Account-change"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Request account change"
          className={`ProfileSideMenu_list_SelectMenu ${
            selectMenu === "5" && "ProfileSideMenu_SelectMenu"
          }`}
        >
          <MdManageAccounts className="ProfileSideMenu_Listsicon" />{" "}
          <p>Request account change</p>
        </NavLink>
        <NavLink
          id="6"
          to="/Notifications"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Notifications"
          className={`ProfileSideMenu_list_SelectMenu ${
            selectMenu === "6" && "ProfileSideMenu_SelectMenu"
          }`}
        >
          <div style={{ position: "relative" }}>
            <MdCircleNotifications
              className="ProfileSideMenu_Listsicon"
              style={{ transform: " rotate(-15deg)" }}
            />
            {notification === true && (
              <RxDotFilled className="HomeNavbar_profile_RxDotFilled" />
            )}
          </div>
          <p>Notifications</p>
        </NavLink>
        <NavLink
          id="7"
          to="/Like-Property"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Shortlist property"
          className={`ProfileSideMenu_list_SelectMenu ${
            selectMenu === "7" && "ProfileSideMenu_SelectMenu"
          }`}
        >
          <BsHeartFill className="ProfileSideMenu_Listsicon" />
          <p>Shortlist property</p>
        </NavLink>
        <NavLink
          id="8"
          to="/Like-Service"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Shortlist property"
          className={`ProfileSideMenu_list_SelectMenu ${
            selectMenu === "8" && "ProfileSideMenu_SelectMenu"
          }`}
        >
          <RiServiceFill className="ProfileSideMenu_Listsicon" />
          <p>Shortlist Service</p>
        </NavLink>
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

export default ProfileSideMenu;
