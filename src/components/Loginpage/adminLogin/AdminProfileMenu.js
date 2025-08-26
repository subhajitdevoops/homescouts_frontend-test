import React, { useEffect, useState } from "react";
// import "./NavProfile.css";
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

const AdminProfileMenu = () => {
  const [selectMenu, setSelectMenu] = useState();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );
  const handleSelect = (e) => {
    setSelectMenu(e.target.id);
  };
  const handleClearToken = () => {
    localStorage.clear("accessToken");
    setToken();
  };
  return (
    <div className="navprofile_main_container_div AdminNAveProfile">
        <NavLink
          id="1"
          to="/admin-changepassword"
          className={selectMenu === "1" && "select"}
          onClick={(e) => handleSelect(e)}
        >
          <MdAdsClick
            className="ProfileSideMenu_Listsicon"
            style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
          />
          <p className="ProfileSideMenu_ListParagraph">Change password</p>
        </NavLink>
        <NavLink
          id=""
          to="/loginAdmin"
          className={selectMenu === "8" && "select"}
          onClick={() => handleClearToken()}
        >
          <MdLogout className="ProfileSideMenu_Listsicon" />
          <p className="ProfileSideMenu_ListParagraph">SIgn Out</p>
        </NavLink>
    </div>
  );
};

export default AdminProfileMenu;
