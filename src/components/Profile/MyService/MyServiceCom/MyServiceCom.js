import React, { useEffect, useState } from "react";
import MyService from "./MyService";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import configData from "../../../../config/config.json";
import imgNotFound from '../../../../assets/services/NotFound.png'
import { NavLink } from "react-router-dom";

const MyServiceCom = () => {
  const [serviceData, setServiceData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  // const [pagenation, setPagenation] = useState();
  console.log("serviceData===serviceData>", serviceData);
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);
  const userId = UserTokenAvilable && UserTokenAvilable.response._id;


  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);
  // -----------------------------Api get request-------------------------------------------

  const handleActiveService = async (id) => {
    //-------------Active deActive service
    const activeServiceId = {
      id: id,
    };

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.USER_SERVICE_ACTIVE_INACTIVE_POST_URL,
      activeServiceId,
      userToken
    );

    if (ResBasic) {
      if (ResBasic.success === true) {
        // toast.success(ResBasic.message);
        const AllVal = [...serviceData];
        AllVal.forEach((element, index) => {
          if (element._id == id) {
            AllVal[index].is_active = !element.is_active;
            console.log("working");
          }
        });
        setServiceData(AllVal);
        // setHeart(id);
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };
  //----------------------------getting all my service ----------------------------------------
  const getCases = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_SERVICE_LISTING_BY_ID_GET_URL +
        `?id=${userId}&limit=40&page=1`,
      userToken
    );
    console.log("USER service=>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("from here warning");
        // toast.success(ApiRes.message);
        setServiceData(ApiRes.result);
        //   setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    //     let ApiRes = await API_REQ_GET(
    //       configData.ADMIN_SERVICE_PENDING_LIST_GET_URL,
    //         adminToken
    //     );
    //     console.log('pending service=>',ApiRes);
    //     if (ApiRes) {
    //       if (ApiRes.success === true) {
    //         console.log("from here warning");
    //         toast.success(ApiRes.message);
    //         setServiceData(ApiRes.pendingservices);
    // //       setServiceData(ApiRes.result);

    //       //   setPagenation(ApiRes.Pagination);
    //       } else {
    //         toast.warning(ApiRes.message);
    //       }
    //     } else {
    //       toast.error("Please Check Your Internet connection !");
    //     }

    // ---------------------------- for service response ------------------------------
    getCases();
  }, []);

  return (
    <div>
      {serviceData.length > 0 ? (
        <>
          {serviceData.map((ads, index) => (
            <div key={index}>
              <MyService
                service={ads}
                approvel={true}
                handleActiveService={handleActiveService}
                showEye={true}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="b_r bg_w sw PropertyNotFound ">
            <img src={imgNotFound} alt="property not found ..." />
            <h5>
              You aren't offering any service now. Here all services will appear
              that you will offer to HomeScouts community Apply from{" "}
              <NavLink style={{ color: "#ED6823" }} to={"/Service-provider"}>
                Be a service provider
              </NavLink>{" "}
              option
            </h5>
          </div>
        </>
      )}
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

export default MyServiceCom;
