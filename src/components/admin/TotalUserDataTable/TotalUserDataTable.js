import React, { useContext, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Nav from "../Nav";
import DataTable from "./DataTable";
import "./TotalUserDataTable.css";
import UserDataTable from "./UserDataTable";
import { useQuery } from "../../../config/Helper";
import AuthContext from "../../../context/AuthProvider";

const TotalUserDataTable = () => {
  let query = useQuery();
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])

  return (
    <div className="page-flex">
      <Header 
      sideActive='table' />
      <div className="main-wrapper">
        <Nav 
      setDataTranscript={''}
      />
        <div className="Dashboard_mainContainerDiv">
          <div className="Dashboard_ContainerDiv">
            {/* <DataTable />  */}
            <UserDataTable />
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalUserDataTable;
