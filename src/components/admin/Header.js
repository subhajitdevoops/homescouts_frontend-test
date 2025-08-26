import React, { useState } from "react";
import hslogo from "../../assets/Logo.svg";
import { Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../../assets/admin/css/style.css"; 

const Header = ({
  sideActive,
  reDirect,
  setHerfLink,
  herflink,
  showSubMenu,
}) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleDropDownShow = (event) => {
    const classList = [];
    if (event.target.nextSibling !== null) {
      for (let i = 0; i < event.target.nextSibling.classList.length; i++) {
        classList.push(event.target.nextSibling.classList[i]);
      }
      if (classList.includes("visible")) {
        event.target.nextSibling.classList.remove("visible");
        event.target.childNodes[2].classList.remove("rotated");
      } else {
        event.target.nextSibling.classList.add("visible");
        event.target.childNodes[2].classList.add("rotated");
      }
    }
  };
  
  console.log("sideActive===>", sideActive);

  
  
  
  return (
    <div>{/* Hamburger Button */}
      <button
        className="hamburger-btn"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <span className="hamburger-icon">☰</span>
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}
      >
        <div className="sidebar-start">
          <NavLink to="/" className="sidebar-head">
            <img src={hslogo} alt="homescouts..." />
          </NavLink>
          <div className="Header_MainDiv">
            <div className="Header_containerDiv">
              <div className="sidebar-body">
                <ul className="sidebar-body-menu">
                  {/* -----------Dashboard----------- */}
                  <li>
                    {/* <NavLink to='/admin'> */}
                    <NavLink
                      to="/admin"
                      className={
                        sideActive === "dashboard"
                          ? "active"
                          : undefined
                      }
                    // href="/admin"
                    >
                      <span className="icon home" aria-hidden="true"></span>
                      Dashboard
                    </NavLink>
                    {/* </NavLink> */}
                  </li>
                  {/* -----------Promotion page----------- */}

                  <li>
                    {showSubMenu === true ? (
                      <NavLink
                        to="/user-details"
                        className={`show-cat-btn
                  ${sideActive == "home" ||
                            sideActive == "feature" ||
                            sideActive == "update" ||
                            sideActive == "service" ||
                            sideActive == "testimonials" ||
                            sideActive == "faq" ||
                            sideActive == "contact"
                            ? "active"
                            : undefined
                          }`}
                        onClick={(e) => handleDropDownShow(e)}
                      >
                        <span
                          className="icon document"
                          aria-hidden="true"
                        ></span>
                        Promotion Page
                        <span
                          className="category__btn transparent-btn"
                          title="Open list"
                        >
                          <span className="sr-only">Open list</span>
                          <span
                            className="icon arrow-down"
                            aria-hidden="true"
                          ></span>
                        </span>
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/user-details"
                        className={`show-cat-btn
                   ${sideActive == "home" ||
                            sideActive == "feature" ||
                            sideActive == "update" ||
                            sideActive == "service" ||
                            sideActive == "testimonials" ||
                            sideActive == "faq" ||
                            sideActive == "contact"
                            ? "active"
                            : undefined
                          }`}
                      >
                        <span
                          className="icon document"
                          aria-hidden="true"
                        ></span>
                        Promotion Page
                        <span
                          className="category__btn transparent-btn"
                          title="Open list"
                        >
                          <span className="sr-only">Open list</span>
                          <span
                            className="icon arrow-down"
                            aria-hidden="true"
                          ></span>
                        </span>
                      </NavLink>
                    )}

                    <ul className="cat-sub-menu">
                      <li onClick={() => setHerfLink("home")}>
                        <a
                          // to="/user-details"
                          className={
                            sideActive == "home" ? "active" : undefined
                          }
                          href={`#${herflink}`}

                        // onClick={()=>setPost()}
                        >
                          <span
                            className="icon document"
                            aria-hidden="true"
                          ></span>
                          Home
                        </a>
                      </li>
                      <li onClick={() => setHerfLink("feature")}>
                        <a
                          className={
                            sideActive == "feature" ? "active" : undefined
                          }
                          href={`#${herflink}`}
                        >
                          <span
                            className="icon message"
                            aria-hidden="true"
                          ></span>
                          Feature
                        </a>
                      </li>
                      <li onClick={() => setHerfLink("update")}>
                        <a
                          className={
                            sideActive == "update" ? "active" : undefined
                          }
                          href={`#${herflink}`}
                        >
                          <span
                            className="icon folder"
                            aria-hidden="true"
                          ></span>
                          Update
                        </a>
                      </li>
                      <li onClick={() => setHerfLink("service")}>
                        <a
                          className={
                            sideActive == "service" ? "active" : undefined
                          }
                          href={`#${herflink}`}
                        >
                          <span
                            className="icon image"
                            aria-hidden="true"
                          ></span>
                          Service
                        </a>
                      </li>
                      <li onClick={() => setHerfLink("testimonials")}>
                        <a
                          className={
                            sideActive == "testimonials" ? "active" : undefined
                          }
                          href={`#${herflink}`}
                        >
                          <span
                            className="icon paper"
                            aria-hidden="true"
                          ></span>
                          Testimonials
                        </a>
                      </li>
                      <li onClick={() => setHerfLink("faq")}>
                        <a
                          className={sideActive == "faq" ? "active" : undefined}
                          href={`#${herflink}`}
                        >
                          <span
                            className="icon document"
                            aria-hidden="true"
                          ></span>
                          FAQ
                        </a>
                      </li>
                      <li>
                        <NavLink
                          to="/contact-table"
                          className={
                            sideActive == "contact" ? "active" : undefined
                          }
                          href=""
                        >
                          <span
                            className="icon document"
                            aria-hidden="true"
                          ></span>
                          Contact
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <NavLink
                      to="/service-master"
                      className={`show-cat-btn
                 ${sideActive == "serviceMaster" ? "active" : undefined}`}
                      href=""
                    >
                      <span className="icon paper" aria-hidden="true"></span>
                      Service Master
                      <span
                        className="category__btn transparent-btn"
                        title="Open list"
                      >
                        <span className="sr-only">Open list</span>
                        {/* <span className="icon arrow-down" aria-hidden="true"></span> */}
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <a
                      className={`show-cat-btn
                   ${sideActive == "PropertyType" ||
                          sideActive == "furnishedDetails"
                          ? "active"
                          : undefined
                        }`}
                      href="##"
                      onClick={(e) => handleDropDownShow(e)}
                    >
                      <span className="icon paper" aria-hidden="true"></span>
                      Property Manager
                      <span
                        className="category__btn transparent-btn"
                        title="Open list"
                      >
                        <span className="sr-only">Open list</span>
                        <span
                          className="icon arrow-down"
                          aria-hidden="true"
                        ></span>
                      </span>
                    </a>
                    <ul className="cat-sub-menu">
                      <li>
                        <NavLink
                          to="/property-type"
                          className={
                            sideActive == "PropertyType" ? "active" : undefined
                          }
                          href=""
                        >
                          <span
                            className="icon paper"
                            aria-hidden="true"
                          ></span>
                          Property Type
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/furnished-type"
                          className={
                            sideActive == "furnishedDetails"
                              ? "active"
                              : undefined
                          }
                          href="/furnished-type"
                        >
                          <span
                            className="icon paper"
                            aria-hidden="true"
                          ></span>
                          Furnished Details
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <NavLink
                      to="/Reports"
                      className={`show-cat-btn
                 ${sideActive == "report" ? "active" : undefined}`}
                      href=""
                    >
                      <span className="icon paper" aria-hidden="true"></span>
                      Report Manager
                      <span
                        className="category__btn transparent-btn"
                        title="Open list"
                      >
                        <span className="sr-only">Open list</span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/totaluser-data"
                      className={`show-cat-btn
                       ${sideActive == "user" ? "active" : undefined}`}
                    // href=""
                    >
                      <span className="icon paper" aria-hidden="true"></span>
                      User Manager
                      <span
                        className="category__btn transparent-btn"
                        title="Open list"
                      >
                        <span className="sr-only">Open list</span>
                      </span>
                    </NavLink>
                  </li>
                  {/* ---------------------pending property-------------------- */}
                  <li>
                    <a
                      className={`show-cat-btn
                   ${sideActive == "PropertyRequest" ||
                          sideActive == "serviceRequest"
                          ? "active"
                          : undefined
                        }`}
                      href="##"
                      onClick={(e) => handleDropDownShow(e)}
                    >
                      <span className="icon paper" aria-hidden="true"></span>
                      Pending Requests
                      <span
                        className="category__btn transparent-btn"
                        title="Open list"
                      >
                        <span className="sr-only">Open list</span>
                        <span
                          className="icon arrow-down"
                          aria-hidden="true"
                        ></span>
                      </span>
                    </a>
                    <ul className="cat-sub-menu">
                      <li>
                        <NavLink
                          to="/Property-Request"
                          className={
                            sideActive == "PropertyRequest"
                              ? "active"
                              : undefined
                          }
                          href=""
                        >
                          <span
                            className="icon paper"
                            aria-hidden="true"
                          ></span>
                          Post Property Request
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/service-Request"
                          className={
                            sideActive == "serviceRequest"
                              ? "active"
                              : undefined
                          }
                          href="/service-Request"
                        >
                          <span
                            className="icon paper"
                            aria-hidden="true"
                          ></span>
                          Service Request
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  {/* --------------------------------------------------------- */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Header;
