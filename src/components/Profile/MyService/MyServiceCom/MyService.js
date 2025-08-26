import React, { useState } from "react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { FcManager } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import img1 from "../../../../assets/statusimg/img2.jpg";
import configData from "../../../../config/config.json";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";

const MyService = ({
  ForUser,
  service,
  approvel,
  handleActiveService,
  showEye,
}) => {
  const [heart, setHeart] = useState(
    service && service.sortliststatus === true && service._id
  );
  const [contactOwner, setContactOwner] = useState(false);

  // -----------------------------------------------------------------------
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken = UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;;
  // console.log("userToken------------------------------------>", userToken);

  const handleShortListService = async (id) => {
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
        if (heart.length > 2) {
          setHeart("");
        } else {
          setHeart(id);
        }
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };

  const handleContactOwner = async (serviceId, views) => {
    if (userToken && views === false) {
      let ApiRes = await API_REQ_GET(
        configData.USER_SERVICE_VISITOR_COUNTER_BY_ID_URL + `?_id=${serviceId}`,
        userToken
      );
      console.log("getCasesVerifyPhone==>", ApiRes);
      if (ApiRes) {
        if (ApiRes.success === true) {
          // toast.success(ApiRes.message);
        } else {
          // toast.warning(ApiRes.message);
        }
      } else {
        toast.error("Please Check Your Internet connection !");
      }
    }
    setContactOwner(!contactOwner);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          className={`b_r bg_w sw MyService_main_container_div  ${service && service.is_active === false && "opacity"
            }  ${service && service.admin_approval == "rejected" && "adminReject"
            } ${service && service.admin_approval == "pending" && "adminPending"
            }`}
        >
          <p className=" MyAds_postdate">
            <i>
              Post on{" "}
              {service &&
                service.createdAt &&
                new Date(service.createdAt).toLocaleDateString("en-US")}
            </i>
            {approvel === true && (
              <i>Admin {service && service.admin_approval} this Service</i>
            )}
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
                          className={
                            service && heart.length > 0 && heart === service._id
                              ? " like"
                              : "  unlike"
                          }
                          onClick={() =>
                            handleShortListService(service && service._id)
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
                            disabled={service && service.admin_approval == "pending" && true}
                            checked={
                              service && service.is_active && service.is_active
                            }
                            onClick={() =>
                              handleActiveService(service && service._id)
                            }
                          />
                        </label>
                      </div>
                      <NavLink
                        to={`/Service-provider?serviceId=${service._id}`}
                      >
                        <div className="Myads_EditAas MyService_EditAas">
                          <button>
                            <RiPencilFill className="Myads_EditAas_icons" />
                            Edit
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
                  {showEye === true ? (
                    <button
                      type="button"
                      className=" MyAds_contactowner_button"
                    // onClick={()=>setOwnerCont(true)}
                    >
                      {/* <FcManager id="OwnerIcon" /> */}
                      <AiFillEye
                        id="OwnerIcon"
                        style={{ color: "#FC8019", fontSize: "17px" }}
                      />
                      <span>
                        {service &&
                          service.service_view &&
                          service.service_view.count}{" "}
                        view
                      </span>
                    </button>
                  ) : (
                    <>
                      {contactOwner === true ? (
                        <button
                          type="button"
                          className=" MyAds_contactowner_button"
                          onClick={() =>
                            handleContactOwner(service && service._id)
                          }
                        >
                          <FcManager id="OwnerIcon" />
                          {/* <AiFillEye id="OwnerIcon"  style={{color: '#FC8019',fontSize:'17px'}} /> */}

                          {userToken ? (
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
                          ) : (
                            "Please login first to view contact"
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className=" MyAds_contactowner_button"
                          // onClick={()=>setOwnerCont(true)}
                          onClick={() =>
                            handleContactOwner(
                              service && service._id,
                              service && service.viewed
                            )
                          }
                        >
                          <FcManager id="OwnerIcon" />
                          {/* <AiFillEye id="OwnerIcon"  style={{color: '#FC8019',fontSize:'17px'}} /> */}
                          <span>Contact</span>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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
      {/* <MobileSearchListList ads={ads} /> */}
    </>
  );
};

export default MyService;
