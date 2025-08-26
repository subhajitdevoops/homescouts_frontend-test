import React, { useContext, useEffect } from "react";
import Header from "./Header";
import Nav from "./Nav";
import ServiceMaster from "./ServiceMaster";
import AuthContext from "../../context/AuthProvider";
// import Footer from './Footer';

const ServiceMasterMain = () => {
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])
  return (
    <div className="d-flex">
      <div>
        <Header sideActive="serviceMaster" />
      </div>
      <div className="col">
        <Nav />
        <div className="Dashboard_mainContainerDiv">
          <div className="Dashboard_ContainerDiv">
            <ServiceMaster />
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceMasterMain;
