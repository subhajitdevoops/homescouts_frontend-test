import React from "react";
import { useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiKeyboardBoxFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import img1 from "./Group 2293.svg";
import img2 from "./Group 2294.svg";
import img3 from "./Group 2295.svg";
import imgLine from "./Vector 59.svg";
import logo from "../../../assets/Logo.svg";
import configData from "../../../config/config.json";

import NavMenu from "./NavMenu.js/NavMenu";

const SideBarMobileView = ({ ref, onClick, servicePin }) => {
  const arr = [
    {
      name: "Home Tiffin",
      Icon: img1,
    },
    {
      name: "Food",
      Icon: img2,
    },
    {
      name: "Electricians",
      Icon: img3,
    },
    {
      name: "Home Tiffin",
      Icon: img2,
    },
    {
      name: "Food",
      Icon: img1,
    },
    {
      name: "Home Tiffin",
      Icon: img1,
    },
    {
      name: "Home Tiffin",
      Icon: img1,
    },
    {
      name: "Food",
      Icon: img2,
    },
    {
      name: "Electricians",
      Icon: img3,
    },
    {
      name: "Home Tiffin",
      Icon: img2,
    },
    {
      name: "Food",
      Icon: img1,
    },
    {
      name: "Home Tiffin",
      Icon: img1,
    },
    {
      name: "Home Tiffin",
      Icon: img1,
    },
    {
      name: "Food",
      Icon: img2,
    },
    {
      name: "Electricians",
      Icon: img3,
    },
    {
      name: "Home Tiffin",
      Icon: img2,
    },
    {
      name: "Food",
      Icon: img1,
    },
    {
      name: "Home Tiffin",
      Icon: img1,
    },
  ];
  const [servi, setServi] = useState(false);
  console.log("servicePin====> ", servicePin);
  return (
    <>
      {/* <div className="nav_sideBarMenu "
     ref={ref}
     onClick={onClick}
     > */}
      <div className="nav_sideBarMenu_container bg_ligreen ">
        <NavLink to="/message">
          <div className="nav_sideBarMenu_containerMenu">
            <p>Chats</p>
            <BiMessageDetail className="HomeNavbar_react_nev_icon" />
          </div>
        </NavLink>
        <div className="nav_sideBarMenu_containerDivMenu">
          <div
            className="nav_sideBarMenu_containerMenu"
            onClick={() => setServi(!servi)}
          >
            <p>Service Provider </p>
            <div className=" HomeNavbar_reactIconContainer ">
              {servi === true ? (
                <MdKeyboardArrowUp
                  className=" HomeNavbar_react_nev_icon "
                  // onClick={() => setNavMenu(!nevMenu)}
                />
              ) : (
                <MdKeyboardArrowDown
                  className=" HomeNavbar_react_nev_icon "
                  // onClick={() => setNavMenu(!nevMenu)}
                />
              )}
            </div>
          </div>
          {
            servi === true && (
              // <div className="SideBarMobileView_serviceProvider">
              <div className="SideBarMobileView_service">
                {servicePin &&
                  servicePin.map((Ele, index) => (
                    <NavLink to={`/service?serviceName=${Ele.name}`}>
                      <div className="SideBarMobileView_serviceEachelelmet">
                        <img
                          src={
                            // configData.COMMON_MEDIA_LINK_URL +
                            // "/serviceSettings/" +
                            Ele.serviceIcon
                          }
                          className=" HomeNavbar_react_nev_icon "
                          // onClick={() => setNavMenu(!nevMenu)}
                        />
                        <div className="SideBarMobileView_elementDiv">
                          <p>{Ele.name} </p>
                          <div></div>
                        </div>
                      </div>
                    </NavLink>
                  ))}
              </div>
            )
            // </div>
          }
        </div>
        <div className="Copyright">
          <hr className="hr" />
          {/* <img src={imgLine} alts='logo...'
          className="Copyrighthr" /> */}

          <img src={logo} alts="logo..." className="Copyrightlogo" />
          <p>Copyright 2022 ©️HomeScouts V1.0.25</p>
          {/* <img src={imgLine} alts='logo...'
          className="Copyrighthr" /> */}

          {/* <hr className="hr" /> */}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default SideBarMobileView;
