import React, { useContext, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Nav from "../Nav";
import PropertyMain from "./PropertyMain";
import "../../../assets/admin/css/Property.css";
import AuthContext from "../../../context/AuthProvider";

const Property = () => {
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])
  return (
    <div className="d-flex">
      <Header sideActive="PropertyType" />
      <div className="col">
        <Nav 
      setDataTranscript={''}
      />
        <div className="Dashboard_mainContainerDiv">
          <div className="Dashboard_ContainerDiv">
            <PropertyMain />
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
