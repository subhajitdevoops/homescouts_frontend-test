import React, { useEffect, useState } from "react";
import "./NavProfile.css";
import { ImArrowUp } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdAdsClick,
  MdSettingsSuggest,
  MdManageAccounts,
  MdCircleNotifications,
  MdHomeRepairService,
  MdLogin,
  MdLogout,
} from "react-icons/md";
import { SiCircle } from "react-icons/si";
import { BsHeartFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import configData from "../../../../config/config.json";
import { API_REQ_GET } from "../../../../config/API";
import { RiServiceFill } from "react-icons/ri";

const NavProfile = () => {
  const [selectMenu, setSelectMenu] = useState();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );
  const handleSelect = (e) => {
    setSelectMenu(e.target.id);
  };
  // const getToken = JSON.parse(localStorage.getItem("accessToken"));
  // const token = getToken && getToken.response.token;
  // const navigate = useNavigate();
  const handleClearToken = () => {
    localStorage.clear("accessToken");
    setToken("");
    window.location.reload();
  };

  const [notification, setNotification] = useState(false);
  // console.log('notification===>',notification);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =UserTokenAvilable &&
  UserTokenAvilable.response &&
  UserTokenAvilable.response.token;;
  // console.log("userToken------------------------------------>", userToken);

  // -----------------------------Api get request-------------------------------------------
  const getProfile = async () => {
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
      getProfile();
    }
  }, []);
  return (
    <div
      className={`navprofile_main_container_div ${
        !userToken && "navprofile_main_withoutToken"
      }`}
    >
      {!token ? (
        <NavLink
          id="1"
          to="/login"
          className={selectMenu === "1" && "select"}
          onClick={(e) => handleSelect(e)}
        >
          <MdLogin
            className="ProfileSideMenu_Listsicon"
            style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
          />
          <p className="ProfileSideMenu_ListParagraph">Sign In</p>
        </NavLink>
      ) : (
        <>
          <NavLink
            id="1"
            to="/Myads"
            className={selectMenu === "1" && "select"}
            onClick={(e) => handleSelect(e)}
          >
            <MdAdsClick
              className="ProfileSideMenu_Listsicon"
              style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
            />
            <p className="ProfileSideMenu_ListParagraph">My Ads</p>
          </NavLink>
          <NavLink
            id="2"
            to="/MyService"
            className={selectMenu === "2" && "select"}
            onClick={(e) => handleSelect(e)}
          >
            <MdHomeRepairService className="ProfileSideMenu_Listsicon" />
            <p className="ProfileSideMenu_ListParagraph">My Service</p>
          </NavLink>
          <NavLink
            id="3"
            to="/Profile-setting"
            className={selectMenu === "3" && "select"}
            onClick={(e) => handleSelect(e)}
          >
            <MdSettingsSuggest className="ProfileSideMenu_Listsicon" />
            <p className="ProfileSideMenu_ListParagraph">Profile Setting</p>
          </NavLink>
          <NavLink
            id="4"
            to="/Service-provider"
            className={selectMenu === "4" && "select"}
            onClick={(e) => handleSelect(e)}
          >
            <SiCircle className="ProfileSideMenu_Listsicon" />
            <p className="ProfileSideMenu_ListParagraph">
              Apply for a service
            </p>{" "}
          </NavLink>
          <NavLink
            id="5"
            to="/Account-change"
            className={selectMenu === "5" && "select"}
            onClick={(e) => handleSelect(e)}
          >
            <MdManageAccounts className="ProfileSideMenu_Listsicon" />
            <p className="ProfileSideMenu_ListParagraph">
              Change account type
            </p>{" "}
          </NavLink>
          <NavLink
            id="6"
            to="/Notifications"
            className={selectMenu === "6" && "select"}
            onClick={(e) => handleSelect(e)}
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
            <p className="ProfileSideMenu_ListParagraph">Notifications</p>
          </NavLink>
          <NavLink
            id="7"
            to="/Like-Property"
            className={selectMenu === "7" && "select"}
            onClick={(e) => handleSelect(e)}
          >
            <BsHeartFill className="ProfileSideMenu_Listsicon" />
            <p className="ProfileSideMenu_ListParagraph">Shortlist property</p>
          </NavLink>
          <NavLink
            id="8"
            to="/Like-Service"
            className={selectMenu === "8" && "select"}
            onClick={(e) => handleSelect(e)}
          >
            <RiServiceFill className="ProfileSideMenu_Listsicon" />
            <p className="ProfileSideMenu_ListParagraph">Shortlist Service</p>
          </NavLink>
          <NavLink
            id="9"
            to=""
            className={selectMenu === "9" && "select"}
            onClick={() => handleClearToken()}
          >
            <MdLogout className="ProfileSideMenu_Listsicon" />
            <p className="ProfileSideMenu_ListParagraph">SIgn Out</p>
          </NavLink>
        </>
      )}

    </div>
  );
};

export default NavProfile;
