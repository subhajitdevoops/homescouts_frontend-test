import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_GET } from "../../../../config/API";
import configData from "../../../../config/config.json";
import LikeService from "./LikeService";
import imgNotFound from "../../../../assets/services/NotFound.png";

const LikeServiceCom = () => {
  const [serviceData, setServiceData] = useState([]); //------------collect all get data
  const [pageNumber, setPageNumber] = useState(1); //-----------------pagination page number

  // const [pagenation, setPagenation] = useState();
  //   console.log("serviceData===serviceData>", serviceData);
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);
  const userId = UserTokenAvilable && UserTokenAvilable.response._id;

  // console.log("userToken------------------------------------>", UserTokenAvilable.response._id);

  // -----------------------------Api get request for like service-------------------------------------------

  const getCases = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_SERVICE_SERVICE_SHORTLIST_GET_URL,
      userToken
    );
    console.log("USER service=>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("from here warning");
        // toast.success(ApiRes.message);
        setServiceData(ApiRes.response);
        //   setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    getCases();
  }, []);

  return (
    <div>
      {serviceData.length > 0 ? (
        <>
          {serviceData.map((Like, index) => (
            <div key={index}>
              <LikeService
                service={Like}
                ForUser={true}
                serviceData={serviceData}
                setServiceData={setServiceData}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="b_r bg_w sw PropertyNotFound ">
            <img src={imgNotFound} alt="property not found ..." />
            <h5>
              All of your shortlisted 🗂️ Service providers will be shown here!
              Go 🏃‍♂️ grab them!
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

export default LikeServiceCom;
