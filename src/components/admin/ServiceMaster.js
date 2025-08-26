import React, { useEffect, useState } from "react";
import { GiBowlOfRice } from "react-icons/gi";
import "../../assets/admin/css/Post.css";
import { BsPlusCircle } from "react-icons/bs";
import Servicemastercontinar from "./Servicemastercontinar";
import img1 from "../../assets/services/icon (6).png";
import img2 from "../../assets/services/icon (6).png";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../config/API";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";

const ServiceMaster = () => {
  const [showService, setShowService] = useState(0); //--------select index
  const [resp, setResp] = useState("");
  const [serviceData, setServiceData] = useState([
    {
      _id: "",
      is_active: true,
      name: "",
      serviceIcon: "",
      is_documents_needed: false,
      documents_details: [],
      admin_approval: false,
    },
  ]);
  console.log("serviceData====>", serviceData);

  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);

  // -----------------------------------------------------
  const handleAddheading = () => {
    setServiceData([
      ...serviceData,
      {
        _id: "",
        is_active: true,
        name: "",
        serviceIcon: "",
        is_documents_needed: false,
        documents_details: [],
        admin_approval: false,
      },
    ]);

    handleShowData(serviceData.length);
  };
  const handleShowData = (index) => {
    setShowService(index);
  };

  const handleDeletefile = async (_id, index) => {
    let resServiceMaster = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_MASTER_SETTING_DELETE_URL,
      { _id: _id },
      adminToken
    );
    console.log(resServiceMaster);
    if (resServiceMaster) {
      if (resServiceMaster.success === true) {
        toast.success(resServiceMaster.message);
        if (serviceData.length > 1) {
          const allData = [...serviceData];
          const delectdata = allData.filter((obj, i) => i !== index);
          setServiceData(delectdata);
          if (index === 0) {
            setShowService(showService);
          } else {
            setShowService(showService - 1);
          }
        }
      } else {
        toast.warning(resServiceMaster.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };
  const handleDeleteNewData = (index) => {
    if (serviceData.length > 1) {
      const allData = [...serviceData];
      const delectdata = allData.filter((obj, i) => i !== index);
      setServiceData(delectdata);
      if (index === 0) {
        setShowService(showService);
      } else {
        setShowService(showService - 1);
      }
    }
  };
  const handleSavefile = () => {
    const error = {};
    if (serviceData[showService].is_documents_needed === true) {
      for (let cur_elem of serviceData[showService].documents_details) {
        if (cur_elem.help_text.length < 3) {
          error.text = "please give write something in help text";
        }
        if (cur_elem.Guidline.length < 3) {
          error.text = "please give write something in Guidline";
        }
      }
      
    }
    if(!serviceData[showService].name){
      toast.warning('Please give name.')
      error.fillAllInfo="Please fill all information."
    }
    if(!serviceData[showService].serviceIcon){
      toast.warning('Please upload icon image.')
      error.fillIcon="Please upload icon image."
    }
    if (Object.keys(error).length === 0) {
      
      ValidationSavefile();
    } else {
      toast.warning(error.text);
    }
  };

  const ValidationSavefile = async () => {
    let serMaster = {};
    serviceData.forEach((element, i) => {
      if (i == showService) {
        serMaster = element;
      }
    });

    console.log(serMaster);
    let resServiceMaster = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_MASTER_SETTING_URL,
      serMaster,
      adminToken
    );
    console.log(resServiceMaster);
    if (resServiceMaster) {
      if (resServiceMaster.success === true) {
        toast.success(resServiceMaster.message);
      } else {
        toast.warning(resServiceMaster.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };

  const getServiceMasterData = async () => {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_MASTER_SETTING_GET_URL,
      adminToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        setShowService(ApiRes.result.length);
        setResp(ApiRes.result);
        if (ApiRes.result.length > 0) {
          const newForm = {
            _id: "",
            is_active: true,
            name: "",
            serviceIcon: "",
            is_documents_needed: false,
            documents_details: [],
            admin_approval: false,
          };
          // setServiceData(ApiRes.result);
          const resData = ApiRes.result;
          setServiceData([...resData, newForm]);
        }
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  useEffect(() => {
    getServiceMasterData();
  }, []);

  return (
    <div className="container">
      <div className="darkmodemain">
        <div className="d-flex mt-3 servicemaster">
          {serviceData.map((single, index) => (
            <>
              <button
                key={index}
                className={`sevicemaster_Buttonicons ${
                  showService === index && "sevicemaster_ButtoniconsSelect"
                }`}
                onClick={(e) => handleShowData(index)}
              >
                {/* {single.serviceIcon.slice(0, 2) === "fa" ? (
                  <i
                    className={`${single.serviceIcon} sevicemaster_main_icons`}
                  />
                ) : (
                  <i className="material-symbols-outlined sevicemaster_main_icons">
                    {single.serviceIcon}
                  </i>
                )} */}
                <div className="servicemaster_imageDiv servicemaster_imDiv">
                  <img
                    src={
                      serviceData[index].serviceIcon === ""
                        ? img2
                        : serviceData[index].serviceIcon
                    }
                    alt="icons ..."
                    id="ServiceImageIcons"
                    className="sevicemaster_imgIcon"
                  />
                </div>
                <span>{single.name}</span>
              </button>
            </>
          ))}
          <span>
            <BsPlusCircle
              className="h1 ms-4 servicemaster_BsPlusCircle"
              onClick={(e) => handleAddheading()}
              title="Add New Data"
            />
          </span>
        </div>

        {serviceData.map((ele, index) => (
          <div key={index}>
            {showService === index && (
              <>
                <Servicemastercontinar
                  ele={ele}
                  index={index}
                  serviceData={serviceData}
                  setServiceData={setServiceData}
                  handleDeletefile={handleDeletefile}
                  handleSavefile={handleSavefile}
                  handleDeleteNewData={handleDeleteNewData}
                  resp={resp}
                />
              </>
            )}
          </div>
        ))}
        {/* <Servicemastercontinar
        heading={heading}
        setHeading={setHeading}
        setHeadName={setHeadName}
        headName={headName}
        setIcons={setIcons}
        icons={icons} /> */}
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

export default ServiceMaster;
