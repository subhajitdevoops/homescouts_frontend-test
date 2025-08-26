import React, { useEffect, useState } from "react";
import UserServices from "../../UserProfileVerify/userService/UserServices";
import { toast } from "react-toastify";
import { API_REQ_GET } from "../../../../config/API";
import configData from "../../../../config/config.json";
import { ToastContainer } from "react-bootstrap";

const ServiceRequest = () => {
  const [getAllData, setGetAllData] = useState("");
  console.log("getAllData=======>", getAllData);
  const [change, setChange] = useState(0);
  const [pagenation, setPagenation] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);
  // ----------------------------------------------------------------------

  const changePage = async ({ selected }) => {
    setPageNumber(selected + 1);
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_PENDING_LIST_GET_URL +
        `?limit=1&page=${selected + 1}`,
      adminToken
    );
    console.log("pending service=>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        setGetAllData(ApiRes.pendingservices);
        setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  // -----------------------------Api get request-------------------------------------------
  const getCases = async () => {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_PENDING_LIST_GET_URL +
        `?limit=10&page=${pageNumber}`,
      adminToken
    );
    console.log("pending service=>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        setGetAllData(ApiRes.pendingservices);
        setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  useEffect(() => {
    getCases();
  }, [change]);
  return (
    <div>
      <UserServices
        dataList={getAllData}
        setDataList={setGetAllData}
        setChange={setChange}
        change={change}
        changePage={changePage}
        pagenation={pagenation}
      />

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

export default ServiceRequest;
