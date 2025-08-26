import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import image from "../assets/pageNotfound/404 for homescouts.jpg";
import "./Page404.css";
import Nav from "../components/Home/Nav/Nav";
import { NavLink } from "react-router-dom";

const Page404 = () => {
  const value = useContext(AuthContext);
  useEffect(() => {
    value.setCurrentUserType("admin");
  }, []);
  return (
    <div>
      <Nav
      // slide={slide}
      // buylable={buylable}
      // rightStatus={rightStatus}
      // setOpenVoice={setOpenVoice}
      // // transcript={transcript}
      // postpropertyBtnVeiw={true}
      // showStatus={true}
      // userSearchProperty={false}
      // // MobileViewSearch={true}
      // setText={setText}
      // text={text}
      // setDataTranscript={""}
      />
      <div className="Page404MAinPAge">
        <img src={image} alt="not found" />
        <h4>
          Click <NavLink to='/'>
            <span className="Page404MAinHere">Here</span>
          </NavLink> to see listed properties!
        </h4>
      </div>
    </div>
  );
};

export default Page404;
