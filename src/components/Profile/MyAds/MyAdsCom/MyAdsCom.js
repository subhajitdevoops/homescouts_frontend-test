import React, { useState } from "react";
import MyAds from "./MyAds";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import configData from "../../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import imgNotFound from "../../../../assets/services/NotFound.png";

const MyAdsCom = ({ handlePotentialBuyers }) => {
  const [getAllData, setGetAllData] = useState("");
  console.log("getAllData=======>", getAllData);

  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);
  // -----------------------------Api get request-------------------------------------------

  const handleActiveProperty = async (id) => {
    const activeServiceId = {
      id: id,
    };

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.USER_PROPERTY_ACTIVE_INACTIVE_POST_URL,
      activeServiceId,
      userToken
    );

    if (ResBasic) {
      if (ResBasic.success === true) {
        // toast.success(ResBasic.message);
        // setHeart(id);
        const AllVal = [...getAllData];
        AllVal.forEach((element, index) => {
          if (element._id == id) {
            AllVal[index].is_active = !element.is_active;
            console.log("working");
          }
        });
        setGetAllData(AllVal);
        // const allData=[...getAllData]
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };
  const getCases = async () => {
    let ApiRes = await API_REQ_GET(
      configData.GET_PROPERTY_BY_USER_ID_URL,
      userToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === "true") {
        // toast.success(ApiRes.message);
        setGetAllData(ApiRes.property);
        // setPotentialUser(ApiRes.property)
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
      {getAllData.length > 0 ? (
        <>
          {getAllData.map((ele, index) => (
            <div key={index}>
              <MyAds
                key={index}
                ele={ele}
                approvel={true}
                handleActiveProperty={handleActiveProperty}
                handlePotentialBuyers={handlePotentialBuyers}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="b_r bg_w sw PropertyNotFound ">
            <img src={imgNotFound} alt="property not found ..." />
            <h5>
              You haven't posted any property, Use <NavLink style={{ color: "#ED6823" }} to={"/postproperty"}>
                Post property
              </NavLink>{" "}
              button to start posting. All of your running ads will be shown
              here
            </h5>
          </div>
        </>
      )}
      <div className="ProfileBody_contactAdmin_div">
        <p>
          Ads here will automatically deactivate after 30 days and be
          permanently deleted after 45 days
        </p>
        <a href="#">Contact Admin</a>
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

export default MyAdsCom;
