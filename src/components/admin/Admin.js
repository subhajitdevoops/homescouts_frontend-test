import React, { useContext, useEffect } from "react";
import "../../assets/admin/css/style.css";
import Header from "./Header";
import Dashboard from "./Dashboard";
import UserDetails from "./UserDetails/UserDetail/UserDetails";
import Footer from "./Footer";
import Nav from "./Nav";
import AuthContext from "../../context/AuthProvider";

const Admin = () => {
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])

  return (
    <div>
      <div className="page-flex">
        <Header 
        sideActive='dashboard' />
        <div className="main-wrapper">
          <Nav />
          <div className="Dashboard_mainContainerDiv">
        <div className="Dashboard_ContainerDiv">
          <UserDetails /> 
          {/* <Footer /> */}
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Admin;
