import React, { useEffect } from "react";
import TotalUser from "./TotalUser";
import TotalUserGraph from "./TotalUserGraph";
import img from "../img6.svg";
import { ToastContainer, toast } from "react-toastify";
import configData from "../../../../config/config.json";
import { API_REQ_GET } from "../../../../config/API";
import { useState } from "react";

const UserDetails = () => {
  const [totalData, setTotalData] = useState("");
  const [graphYear, setGraphYear] = useState({
    selectYearTot: new Date().getFullYear(),
    selectYearAds: new Date().getFullYear(),
    selectYearSer: new Date().getFullYear(),
    
  });
  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken =
    adminTokenAvilable &&
    adminTokenAvilable.response &&
    // adminTokenAvilable.response.token &&
    adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);

  const getCasesStatus = async () => {
    // if (userToken) {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_DASHBOARD_URL +
        `?useryear=${graphYear.selectYearTot}&propertyyear=${graphYear.selectYearAds}&serviceyear=${graphYear.selectYearSer}`,
      adminToken
    );

    if (ApiRes) {
      console.log("ApiRes=>", ApiRes);
      // if (ApiRes.success === "true") {
      //   // toast.success(ApiRes.message);
      // } else {
      //   toast.warning(ApiRes.message);
      // }
      setTotalData(ApiRes);
    } else {
      toast.error("Please Check Your Internet connection !");
    }
    // }
  };

  useEffect(() => {
    getCasesStatus();
  }, [graphYear]);
  return (
    <div className="UserDetails_main_container_div">
      <div className="UserDetails_TotalUser">
        <TotalUser totalData={totalData && totalData} />
      </div>
      <div className="UserDetails_MiddleLine">
        <img src={img} alt="line image..." />
      </div>
      <div className="UserDetails_TolalUserGraph">
        <TotalUserGraph
          totalData={totalData && totalData}
          graphYear={graphYear}
          setGraphYear={setGraphYear}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseonhover={false}
      />
    </div>
  );
};

export default UserDetails;
