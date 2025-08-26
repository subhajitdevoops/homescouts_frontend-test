import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FcManager } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import img1 from "../../../../assets/statusimg/img2.jpg";
import configData from "../../../../config/config.json";
import { toast } from "react-toastify";
import { API_REQ_POST_WITH_TOKEN } from "../../../../config/API";

const LikeService = ({ ForUser, service, serviceData, setServiceData }) => {
  const [heart, setHeart] = useState(service && service._id);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =UserTokenAvilable &&
  UserTokenAvilable.response &&
  UserTokenAvilable.response.token;;
  // console.log("userToken------------------------------------>", userToken);
  const userId = UserTokenAvilable && UserTokenAvilable.response._id;

  // console.log("userToken------------------------------------>", UserTokenAvilable.response._id);

  const handleRemoveShortListService = async (id) => {
    const shortListServiceId = {
      id: id,
    };

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.USER_SERVICE_SERVICE_SHORTLIST_URL,
      shortListServiceId,
      userToken
    );

    if (ResBasic) {
      if (ResBasic.success === true) {
        // toast.success(ResBasic.message);
        const allData = [...serviceData];
        const filterService = allData.filter((ele, indx) => ele._id !== id);
        setServiceData(filterService);
        setHeart("");
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="b_r bg_w sw MyService_main_container_div">
          <p className=" MyAds_postdate">
            <i>
              Post on{" "}
              {service &&
                service.createdAt &&
                new Date(service.createdAt).toLocaleDateString("en-US")}
            </i>
          </p>
          <div className="MyAds_container_div MyServer_container_div">
            <div className="b_r sw bg_w MyAds_detailsandimages_div MyService_detailsandimages_div">
              <div className="MyService_image_container">
                <img
                  src={
                    service &&
                    // configData.COMMON_MEDIA_LINK_URL +
                    //   "/applyforservice/" +
                      service.snapsort_offering[0]
                  }
                  alt="property image ..."
                />
              </div>
              <div className="MyAds_details_container_div MyService_details_container_div">
                <div className="MyService_detailstype_div">
                  <div>
                    <h3 className="MyServiceTitle">
                      {service &&
                        service.service_offering_title.charAt(0).toUpperCase() +
                          service.service_offering_title.slice(1)}
                    </h3>
                  </div>
                  {ForUser === true ? (
                    <>
                      <div className=" hearrt">
                        <AiFillHeart
                          className="like"
                          onClick={() =>
                            handleRemoveShortListService(service && service._id)
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <div className="MyserviceToggleButton">
                      <div className="form-check form-switch  UserTable_toggleSwitch MyServiceToggleButtons">
                        <label
                          className="form-check-label form-check-label-color:red sw"
                          htmfor="flexSwitchCheckDefault"
                        >
                          <input
                            className="form-check-input  sw  "
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked
                            // onClick={() => setDe_active(!de_active)}
                          />
                        </label>
                      </div>
                      <NavLink to="/Service-provider">
                        <div className="Myads_EditAas MyService_EditAas">
                          <button>
                            <RiPencilFill className="Myads_EditAas_icons" />
                            Edit ad
                          </button>
                        </div>
                      </NavLink>
                    </div>
                  )}
                </div>
                <div className="MyAds_propertylocation_div">
                  <p>Service Loation</p>
                </div>
                <div className="MyService_ServiceLocationDiv">
                  <div className="MyService_ServiceLocation">
                    {service &&
                      service.add_offering_location.map((loca, i) => (
                        <div key={i} className="ServiceProvider_Location">
                          <p>{loca}</p>
                          {/* <RiDeleteBin5Fill
                        // onClick={(e) => handleDeletePlace(i)}
                        className="ServiceProvider_LocationDelete"
                        style={{ color: "#FA0000", cursor: "pointer" }}
                      /> */}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="MyService_contactowner_div">
                  <button
                    type="button"
                    className=" MyAds_contactowner_button"
                    // onClick={()=>setOwnerCont(true)}
                  >
                    <FcManager id="OwnerIcon" />
                    <span>
                          {service &&
                          service.user &&
                          // service.user.length > 0 &&
                          // service &&
                          // service.user &&
                          service.user.mobilenumber
                            ? service.user.mobilenumber
                            : "owner didn't have contact number"}
                        </span>
                    {/* <span>9803343333</span> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <MobileSearchListList ads={ads} /> */}
    </>
  );
};

export default LikeService;
