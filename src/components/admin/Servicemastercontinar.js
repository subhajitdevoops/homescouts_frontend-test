import React, { useState } from "react";
import { GiBowlOfRice } from "react-icons/gi";
import { RiDeleteBinFill } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";
import "../../assets/admin/css/ServiceMaster.css";
import {
  BsFillQuestionCircleFill,
  BsPhoneVibrateFill,
  BsFillSaveFill,
} from "react-icons/bs";
import ServiceAddContainer from "./ServiceAddContainer";
import { Base64, imageKit } from "../../config/Helper";
import { RxCross2 } from "react-icons/rx";
// import img2 from "../../assets/Feature/Group 103.png";
import img2 from "../../assets/services/icon (6).png";

import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../config/API";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";

const Servicemastercontinar = ({
  ele,
  serviceData,
  index,
  setServiceData,
  handleDeletefile,
  handleSavefile,
  handleDeleteNewData,
  resp,
}) => {
  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);
  const handleSelectIcon = async (e, idName) => {
    const file = e.target.files[0];
    // const result = URL.createObjectURL(file);
    // let img = document.getElementById(idName);
    // img.src = result;
    // let base64 = await Base64(file);
    //   const formData = new FormData();
    //   formData.append("files", file);
    // // -----------------------------COMMON IMAGE ICON UPLOAD-----------------------------------------------

    //   let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //     configData.USER_COMMON_SERVICE_POST_URL + "?step=serviceSettings",
    //     formData,
    //     adminToken
    //   );

    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     toast.success(ResBasic.message);
    //     console.log("uploadImages====>", ResBasic[0]);

    //     const AllVal = [...serviceData];
    //     AllVal.forEach((element, i) => {
    //       if (i == index) {
    //         AllVal[index].serviceIcon = ResBasic[0].filename;
    //       }
    //     });
    //     setServiceData(AllVal);
    //     // set_list_of_images_upload((i) => [...i, ResBasic[0].filename])

    //     // setApplyService((olditems) => {
    //     //   return {
    //     //     ...olditems,
    //     //     snapsort_offering: [ResBasic[0].filename],
    //     //   };
    //     // });
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
    //---------------------------------------service Master Imagekit------------------
    const folderPath = "ServiceIcons";
    let imagekitresponse = await imageKit(file, folderPath);
    const AllVal = [...serviceData];
    AllVal.forEach((element, i) => {
      if (i == index) {
        AllVal[index].serviceIcon = imagekitresponse;
      }
    });
    setServiceData(AllVal);
  };

  //-----------------------service Name-------------------------------
  const handleServiceName = (e) => {
    const val = e.target.value;
    const AllVal = [...serviceData];
    AllVal.forEach((element, i) => {
      if (i == index) {
        AllVal[index].name = val;
      }
    });
    setServiceData(AllVal);
  };
  //-----------------------Active/deactive -------------------------------

  const handleIsActive = async () => {
    let resServiceMaster = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_MASTER_SETTING_ACTIVE_DEACTIVE_URL,
      { _id: ele._id, is_active: !serviceData[index].is_active },
      adminToken
    );
    console.log(resServiceMaster);
    if (resServiceMaster) {
      if (resServiceMaster.success === true) {
        toast.success(resServiceMaster.message);
        const AllVal = [...serviceData];
        AllVal.forEach((element, i) => {
          if (i == index) {
            AllVal[index].is_active = !ele.is_active;
          }
        });
        setServiceData(AllVal);
      } else {
        toast.warning(resServiceMaster.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };
  //-----------------------Certificate/ Document needed ! -------------------------------

  const handleCertificate = () => {
    const AllVal = [...serviceData];
    AllVal.forEach((element, i) => {
      if (i == index) {
        AllVal[index].is_documents_needed = !ele.is_documents_needed;
        if (AllVal[index].is_documents_needed === true) {
          if (resp && resp.documents_details > 1) {
            AllVal[index].documents_details = resp.documents_details;
          } else {
            AllVal[index].documents_details = [
              {
                help_text: "",
                Guidline: "",
              },
            ];
          }
        } else {
          AllVal[index].documents_details = [];
        }
      }
    });
    setServiceData(AllVal);
  };
  //-----------------------Active/deactive -------------------------------

  const handleAdminApprooval = () => {
    const AllVal = [...serviceData];
    AllVal.forEach((element, i) => {
      if (i == index) {
        AllVal[index].admin_approval = !ele.admin_approval;
      }
    });
    setServiceData(AllVal);
  };
  // console.log(configData.COMMON_MEDIA_LINK_URL+"/serviceSettings/"+serviceData[index].serviceIcon);
  return (
    <div>
      <div>
        <div className="container servicemaster_main_div">
          <div className="d-flex servicemaster_div">
            <div className="d-flex servicemaster_fasdish">
              <div className="servicemaster_imageDiv ">
                <img
                  src={
                    serviceData[index].serviceIcon === ""
                      ? img2
                      : serviceData[index].serviceIcon
                  }
                  alt="icons ..."
                  id={"ServiceImageIcons" + index}
                  className="sevicemaster_imgIcon"
                />
              </div>

              <div className="c_t sevicemaster_InputDiv">
                <label htmlFor="select-icon">
                  {serviceData[index].serviceIcon === ""
                    ? "Choose icon"
                    : "Change icon"}
                </label>
                <input
                  type="file"
                  // value={icons}
                  id="select-icon"
                  onChange={(e) =>
                    handleSelectIcon(e, "ServiceImageIcons" + index)
                  }
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="d-flex servicemaster_servicename">
              <p>Service Name</p>
              <div>
                <input
                  type="text"
                  value={ele.name}
                  onChange={(e) => handleServiceName(e)}
                />
              </div>
            </div>
            {ele._id === "" ? (
              <div className="servicemaster_RxCross2Div">
                <RxCross2
                  className="servicemaster_RxCross2"
                  title="Delete"
                  onClick={() => handleDeleteNewData(index)}
                />
              </div>
            ) : (
              <div className="d-flex  servicemaster_activeaanddeactive">
                <div>
                  <span>Active/deactive</span>
                  <div className="form-check form-switch sevicemaster_activedeactive_toggle">
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        checked={ele.is_active}
                        onChange={handleIsActive}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <hr />
          <div className="d-flex servicemaster_checkbox">
            <div
              className="servicemaster_CertificateBorder"
              onClick={handleCertificate}
            >
              {ele.is_documents_needed === true && (
                <p className=" servicemaster_Certificate_heckbox"></p>
              )}
            </div>
            <p>Certificate/ Document needed !</p>
          </div>

          {ele.is_documents_needed === true ? (
            <>
              <label htmlFor="guidline"></label>
              {ele &&
                ele.documents_details.map((single, i) => (
                  <div key={i}>
                    <ServiceAddContainer
                      i={i}
                      data={single}
                      eleindex={index}
                      serviceData={serviceData}
                      setServiceData={setServiceData}
                    />
                  </div>
                ))}
            </>
          ) : (
            <div style={{ opacity: "0.3" }}>
              <label htmlFor="guidline"></label>
              <div className="servicemaster_main_container_div">
                <div className="d-flex servicemaster_certianddoc">
                  <div className="servicemaster_CertificateDocumentService">
                    <p>Certificate/ Document needed for this service?</p>
                  </div>
                  <div className="servicemaster_buttonAddDelete">
                    <button>
                      <AiFillPlusCircle style={{ fontSize: "20px" }} />
                    </button>
                    <span>|</span>
                    <button>
                      <RiDeleteBinFill style={{ fontSize: "20px" }} />
                    </button>
                  </div>
                </div>
                <div className="mt-3 servicemaster_helpguidline_div">
                  <div className="d-flex servicemaster_hepltext_div">
                    <span>
                      <BsFillQuestionCircleFill className="ms-4 servicemaster_BsFillQuestionCircleFill" />
                    </span>
                    <h3 className="servicemaster_text12">Help Text</h3>
                    <div>
                      <input
                        type="text"
                        className=" ms-4 border border-4 rounded servicemaster_hepl1text_div "
                        placeholder="Upload your fssai certificate in high quality, and visible format"
                      />
                    </div>
                  </div>
                  <div className="d-flex servicemaster_hepltext_div">
                    <span>
                      <BsPhoneVibrateFill className="ms-4 servicemaster_BsFillQuestionCircleFill" />
                    </span>
                    <h3 className="servicemaster_text12">
                      Guidline<span style={{ color: "red" }}>*</span>
                    </h3>
                    <div>
                      <input
                        type="text"
                        className=" ms-4 border border-4 rounded servicemaster_hepl1text_div "
                        placeholder="Upload your fssai certificate in high quality, and visible format"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="d-flex sevicemaster_requiredper_mission ">
            <h3>Required ADMIN approoval </h3>
            <div className="form-check form-switch sevicemaster_toggle">
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={ele.admin_approval}
                  id="flexSwitchCheckDefault"
                  onChange={(e) => handleAdminApprooval()}
                />
              </label>
            </div>
          </div>
          <div
            className="d-flex flex-row bd-highlight mb-3 float-right"
            style={{ float: "right" }}
          >
            <div className="d-flex float-end mb-3 ">
              {ele._id === "" ? (
                <button
                  className="rounded-top servicemaster_save_button "
                  onClick={handleSavefile}
                >
                  <BsFillSaveFill
                    style={{
                      color: "white",
                      backgroundColor: "#0061F7",
                      margin: "5px",
                    }}
                  />
                  <span>Save</span>
                </button>
              ) : (
                <>
                  {ele.is_active === true ? (
                    <button
                      className="rounded-top servicemaster_save_button "
                      onClick={handleSavefile}
                    >
                      <BsFillSaveFill
                        style={{
                          color: "white",
                          backgroundColor: "#0061F7",
                          margin: "5px",
                        }}
                      />
                      <span>Save</span>
                    </button>
                  ) : (
                    <button
                      className="rounded-top servicemaster_save_button "
                      style={{ opacity: 0.3 }}
                    >
                      <BsFillSaveFill
                        style={{
                          color: "white",
                          backgroundColor: "#0061F7",
                          margin: "5px",
                        }}
                      />
                      <span>Save</span>
                    </button>
                  )}
                </>
              )}

              {ele._id === "" ? (
                <></>
              ) : (
                <button
                  className="rounded-top servicemaster_delete_button"
                  onClick={() => handleDeletefile(ele._id, index)}
                >
                  <RiDeleteBinFill
                    style={{
                      color: "white",
                      backgroundColor: "#ED6823",
                      margin: "5px",
                    }}
                  />
                  <span>Delete</span>
                </button>
              )}
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
    </div>
  );
};

export default Servicemastercontinar;
