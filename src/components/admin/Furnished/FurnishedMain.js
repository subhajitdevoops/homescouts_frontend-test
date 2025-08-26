import React, { useContext, useEffect } from "react";
import Header from "../Header";
import Nav from "../Nav";
import "../../../assets/admin/css/Property.css";
import FurnishedRen from "./FurnishedRen";
import AuthContext from "../../../context/AuthProvider";
// import Furnished from './Furnished';

const FurnishedMain = () => {
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])
  return (
    <div className="d-flex">
      <div>
        <Header
        sideActive='furnishedDetails' />
      </div>
      <div className="col">
        <Nav /> 
        <FurnishedRen />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default FurnishedMain;
