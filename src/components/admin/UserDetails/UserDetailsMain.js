import React, { useContext, useEffect, useState } from "react";
import "./UserDetailsMain.css";
import Dashboard from "../Dashboard";
import Footer from "../Footer";
import Header from "../Header";
import Nav from "../Nav";
import Post from "../Post";
import UserDetails from "./UserDetail/UserDetails";
import ScrollHandler from "../ScrollHandler";
import AuthContext from "../../../context/AuthProvider";

const UserDetailsMain = () => {
  const [herfLink, setHerfLink] = useState();
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])
  return (
    <div className="page-flex">
      {/* <ScrollHandler /> */}
      <Header
        sideActive={herfLink}
        herflink={herfLink}
        setHerfLink={setHerfLink}
        showSubMenu={true}
        reDirect={true}
      />
      <Dashboard herfLink={herfLink} />
    </div>
  );
};

export default UserDetailsMain;
