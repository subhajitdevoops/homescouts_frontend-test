import React, { useState } from "react";
import logo from "../../../assets/Logo.svg";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Nevbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`nevbar_main_containner ${open ? "Active_Nev" : ""}`}>
      <div className="nevbar_container">
        <div className="nevbar_homescouts">
          <div className="navbar_main_homescouts">
            <HashLink smooth to="#deshboar">
              <img src={logo} alt="HomeScouts LOGO" />
            </HashLink>
          </div>
          {/* ------------ Toggle Button for menu ---------- */}
          <div className={`nevbar_menu_button1 `}>
            <button
              className={`btn_menu ${open ? "Active_btn_menu" : ""}`}
              onClick={() => setOpen(!open)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {/* --------------------------------- */}
        <div className={`nevbar_menu_div ${open ? "Active_menu" : ""}`}>
          <ul>
            <li>
              <HashLink smooth to="#home">
                Home
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="#features">
                Features
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="#services">
                Service
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="#contact">
                Contact
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="#faq">
                FAQ
              </HashLink>
            </li>
          </ul>
        </div>
        {/* ------------------------------------ */}
        <div className={`navbar_signin_div ${open ? "Active_menu" : ""}`}>
          <div>
            <button className="sign_in_button">
              {" "}
              <NavLink to="/login">Sign In</NavLink>
            </button>
          </div>
          <p>|</p>
          <div>
            <button className="get_started_button">
              {" "}
              <NavLink to="/signup">Get Started</NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nevbar;
