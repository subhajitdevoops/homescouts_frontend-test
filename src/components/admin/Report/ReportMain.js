import React, { useContext, useEffect } from "react";
import Header from "../Header";
import Nav from "../Nav";
import ReportPage from "./ReportPage/ReportPage";
import "./Report.css";
import ReportPages from "./ReportPages/ReportPages";
import AuthContext from "../../../context/AuthProvider";

const ReportMain = () => {
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])
  return (
    <div className="page-flex">
      <Header sideActive="report" />
      <div className="main-wrapper">
        <Nav 
      setDataTranscript={''}
      />
        <div className="Dashboard_mainContainerDiv">
          <div className="Dashboard_ContainerDiv">
            <div className="App">
            <ReportPages />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMain;
