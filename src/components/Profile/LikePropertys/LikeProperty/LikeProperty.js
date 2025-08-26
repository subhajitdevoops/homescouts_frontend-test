import React, { useState } from "react";
import Searchlist from "../../../Userpage/Searchlist/Searchlist";
import { API_REQ_GET } from "../../../../config/API";
import configData from "../../../../config/config.json";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import imgNotFound from "../../../../assets/services/NotFound.png";

const LikeProperty = () => {
  const [ownerCont, setOwnerCont] = useState(false);
  const ownerNo = "1234567890";

  // const [heart, setHeart] = useState(true);
  const [lists, setLists] = useState([]);

  // -----------------------------------------------------------------------
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);

  // -----------------------------Api get shoetlist property-------------------------------------------
  const getCases = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_SERVICE_PROPERTY_SHORTLIST_URL,
      userToken
    );

    console.log("ApiRes shortList  property response==>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("from here warning");
        // toast.success(ApiRes.message);
        setLists(ApiRes.response);
        // value.setLocations("");
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
    <div className="LikeProperty_main_container">
      {lists.length > 0 ? (
        <>
          {lists.map((list, index) => (
            <Searchlist
              user={list}
              ownerCont={ownerCont}
              setOwnerCont={setOwnerCont}
              ownerNo={ownerNo}
              shortListButton={true}
              Verified="Verified"
              heardId="like"
              setLists={setLists}
              lists={lists}
              shortListFunction={true}
            />
          ))}
        </>
      ) : (
        <>
          <div className="b_r bg_w sw PropertyNotFound ">
            <img src={imgNotFound} alt="property not found ..." />
            <h5>
              All of your 🏘️ shortlisted 🗂️ property will be shown here! 😊 Go
              🏃‍♂️ grab them!
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

export default LikeProperty;
