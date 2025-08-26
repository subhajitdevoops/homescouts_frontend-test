import React, { useState } from "react";
import img1 from "../../assets/services/avatar.png";
import AdminProfileMenu from "../Loginpage/adminLogin/AdminProfileMenu";
import { BsArrowLeft } from "react-icons/bs";
import Header from "./Header";
const Nav = () => {

  
  

  const toogleDarkMode = (event) => {
    event.preventDefault();
    console.log("Its hitting here");
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  };
  const enableDarkMode = function enableDarkMode() {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkMode", "enabled");
  };

  const disableDarkMode = function disableDarkMode() {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkMode", null);
  };
  const handleBackHistory = () => {
    window.history.back(window.location, 'index');
  }
  return (
    <>
      <nav className="main-nav-bg">
        <div className="container main-nav">
          <BsArrowLeft onClick={handleBackHistory} style={{ cursor: 'pointer' }} />
          <div className="main-nav-start">
            <div className="search-wrapper">
              <i data-feather="search" aria-hidden="true"></i>
              {/* <input type="text" placeholder="Enter keywords ..." required/> */}
            </div>
          </div>
          <div className="main-nav-end">
          {/* <button
              className="nav-user-btn dropdown-btn"
              title="Menu"
              type="button"
            >
              <span className="sr-only">Toggle menu</span>
              <span className="icon menu-toggle--gray" aria-hidden="true"></span>
            </button> */}

            <div className="lang-switcher-wrapper">
              <button className="lang-switcher transparent-btn" type="button">
                {/* EN */}
                <i data-feather="chevron-down" aria-hidden="true"></i>
              </button>
              <ul className="lang-menu dropdown">
                <li>
                  <a href="##">English</a>
                </li>
                <li>
                  <a href="##">French</a>
                </li>
                <li>
                  <a href="##">Uzbek</a>
                </li>
              </ul>
            </div>
            {/* <button className="theme-switcher gray-circle-btn" type="button" title="Switch theme" onClick={(e)=>toogleDarkMode(e)}>
                    <span className="sr-only">Switch theme</span>
                    <i className="sun-icon" data-feather="sun" aria-hidden="true"></i>
                    <i className="moon-icon" data-feather="moon" aria-hidden="true"></i>
                </button> */}
            <div className="notification-wrapper">
              {/* <button
              className="gray-circle-btn dropdown-btn"
              title="To messages"
              type="button"
            >
              <span className="sr-only">To messages</span>
              <span className="icon notification active" aria-hidden="true"></span>
            </button> */}
              <ul className="users-item-dropdown notification-dropdown dropdown">
                <li>
                  <a href="##">
                    <div className="notification-dropdown-icon info">
                      <i data-feather="check"></i>
                    </div>
                    <div className="notification-dropdown-text">
                      <span className="notification-dropdown__title">
                        System just updated
                      </span>
                      <span className="notification-dropdown__subtitle">
                        The system has been successfully upgraded. Read more here.
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="##">
                    <div className="notification-dropdown-icon danger">
                      <i data-feather="info" aria-hidden="true"></i>
                    </div>
                    <div className="notification-dropdown-text">
                      <span className="notification-dropdown__title">
                        The cache is full!
                      </span>
                      <span className="notification-dropdown__subtitle">
                        Unnecessary caches take up a lot of memory space and
                        interfere ...
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="##">
                    <div className="notification-dropdown-icon info">
                      <i data-feather="check" aria-hidden="true"></i>
                    </div>
                    <div className="notification-dropdown-text">
                      <span className="notification-dropdown__title">
                        New Subscriber here!
                      </span>
                      <span className="notification-dropdown__subtitle">
                        A new subscriber has subscribed.
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="link-to-page" href="##">
                    Go to Notifications page
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="nav-user-wrapper AdminProfileHover"
              style={{ position: "relative" }}
            >
              <button
                href="##"
                className="nav-user-btn dropdown-btn"
                title="My profile"
                type="button"
              >
                <span className="sr-only">My profile</span>
                <span className="nav-user-img">
                  <picture>
                    <source srcSet={img1} type="image/webp" />
                    <img src={img1} alt="User name" className="" />
                  </picture>
                </span>
              </button>
              <div className="AdminPeofileMenuDiv">
                <AdminProfileMenu />
              </div>
              <ul className="users-item-dropdown nav-user-dropdown dropdown">
                <li>
                  <a href="##">
                    <i data-feather="user" aria-hidden="true"></i>
                    <span>Profile</span>
                  </a>
                </li>
                <li>
                  <a href="##">
                    <i data-feather="settings" aria-hidden="true"></i>
                    <span>Account settings</span>
                  </a>
                </li>
                <li>
                  <a className="danger" href="##">
                    <i data-feather="log-out" aria-hidden="true"></i>
                    <span>Log out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Nav;
