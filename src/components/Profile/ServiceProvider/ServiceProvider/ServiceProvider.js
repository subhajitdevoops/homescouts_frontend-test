import React, { useContext, useState } from "react";
import "./ServiceProvider.css";
import { RiPencilFill, RiDeleteBin5Fill } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import {
  MdElectricalServices,
  MdFastfood,
  MdMyLocation,
  MdOutlineCancel,
  MdOutlinePictureAsPdf,
  MdVerified,
} from "react-icons/md";
import AttachDoc from "./AttachDoc";
import img1 from "../../../../assets/statusimg/img2.jpg";
import img2 from "../../../../assets/Feature/icon (1).png";
import img3 from "../../../../assets/Feature/Group 102.png";
import { PiEyeDuotone } from "react-icons/pi";
import Autocomplete from "react-google-autocomplete";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import configData from "../../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import {
  Base64,
  getLocations,
  imageKit,
  useQuery,
} from "../../../../config/Helper";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../context/AuthProvider";
import imgFile from "../../../../assets/services/file upload icon.svg";

const ServiceProvider = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const styleError = {
    color: "red",
    display: "inline",
    cursor: "text",
    fontSize: "13px",
    fontWeight: "500",
  };

  const [userService, setUserService] = useState([]);
  const [location, setLocation] = useState([
    "Kolkata, North",
    "Bandra, Mumbai",
    "Chinchawad,Pune",
    "Mau",
    "Gorakhpur, Uttar Pradesh",
    "Bandra, Mumbai",
    "Bhopal, Madhya Pradesh",
    "Godhra, Gujrat",
    "Chinchawad,Pune",
    "Mau",
  ]);

  // console.log("userService====>", userService);
  let query = useQuery();
  const [place, setPlace] = useState("");
  const [documentData, setDocmentData] = useState([]);
  console.log("documentData=====>", documentData);
  const [resp, setResp] = useState("");
  const [snapsortImgs, setSnapsortImgs] = useState(img3);
  const [statusLoader, setStatusLoader] = useState(false);
  const [docLoader, setDocLoader] = useState([]);

  const [applyService, setApplyService] = useState({
    _id: "",
    service_offering_title: "",
    select_your_offering: "",
    documents_details: [],
    add_offering_location: [],
    snapsort_offering: [],
    // admin_approval: false,
  });
  console.log(
    "snapsortImgs------------------------------------>",
    applyService
  );

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);

  // ------------------service_offering_title--------------------
  const navigate = useNavigate();
  const value = useContext(AuthContext);

  const handleInputTitle = (e) => {
    const field = e.target.name;
    setErrorMessage((old) => {
      return { ...old, [field + "Error"]: "" };
    });
    setApplyService((olditems) => {
      return {
        ...olditems,
        service_offering_title: e.target.value,
      };
    });
  };

  
  // ------------------select_your_offering--------------------


  const handleSelectService = (name, id) => {
    if (!query.get("serviceId")) {
      setErrorMessage((old) => {
        return { ...old, selectedOfferingError: "" };
      });
      setApplyService((olditems) => {
        return {
          ...olditems,
          select_your_offering: name,
        };
      });
      for (let cur_ele of userService) {
        if (cur_ele.name === name) {
          setDocmentData(cur_ele.documents_details);
          const newDoc = [];
          for (let doc of cur_ele.documents_details) {
            let val = {
              name: doc.help_text,
              documents: "",
            };

            newDoc.push(val);
          }
          // console.log(newDoc);
          setApplyService((olditems) => {
            return {
              ...olditems,
              documents_details: newDoc,
            };
          });
        }
      }
    }
  };
  // ------------------documents_details--------------------
  const handleAttachFile = async (e, i, DocName, id) => {
    const file = e.target.files[0];
    const field = e.target.name;
    console.log(field, "should be handleAttachFileDocuments");
    setErrorMessage((old) => {
      return { ...old, [field + "Error"]: "" };
    });
    // let base64 = await Base64(file);
    //==============================uploading on imagekit========================================
    if (file) {
      setDocLoader([...docLoader, i]);
      const folderPath = "ServiceProvider";

      let imagekitresponse = await imageKit(file, folderPath);

      console.log("imagekitresponse", imagekitresponse);
      if (imagekitresponse) {
        let DocLoa = docLoader.filter((ele) => ele !== i);
        setDocLoader([...DocLoa]);
        const allDocData = [...applyService.documents_details];
        for (let doc of allDocData) {
          if (doc.name === DocName) {
            doc.documents = imagekitresponse;
            documentData[i].Guidline = file.name;
          }
        }
        setApplyService((olditems) => {
          return {
            ...olditems,
            documents_details: [...allDocData],
          };
        });
      }
    }

    //   //-------making the API call to upload Files to server-------

    // const formData = new FormData();
    // formData.append("files", file);
    // let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //   configData.USER_COMMON_SERVICE_POST_URL + "?step=applyforservice",
    //   formData,
    //   userToken
    // );

    // console.log('ResBasic11=>',ResBasic);
    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     const allDocData = [...applyService.documents_details];
    //     for (let doc of allDocData) {
    //       if (doc.name === DocName) {
    //         doc.documents = ResBasic[0].filename;
    //         documentData[i].Guidline = ResBasic[0].originalname;
    //       }
    //     }
    //     setApplyService((olditems) => {
    //       return {
    //         ...olditems,
    //         documents_details: [...allDocData],
    //       };
    //     });
    //     // toast.success(ResBasic.message);
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
  };
  // ------------------add_offering_location--------------------

  const handleKeyPress = (e) => {
    const val = e.target.value.trim();
    setErrorMessage((old) => {
      return { ...old, offeringLocationError: "" };
    });
    if (e.key === "Enter" && val.length != "") {
      // setLocation([...location, `${val}`]);

      if (applyService.add_offering_location.indexOf(val) !== -1) {
        toast.warning("This place is already added.");
      } else {
        setApplyService((olditems) => {
          return {
            ...olditems,
            add_offering_location: [...applyService.add_offering_location, val],
          };
        });
      }
      setPlace("");
    }
  };
  // -----------------------------------------------
  // ------------------Delete_offering_location--------------------

  const handleDeletePlace = (i) => {
    const locationList = [...applyService.add_offering_location];
    locationList.splice(i, 1);
    // setLocation(locationList);
    setApplyService((olditems) => {
      return {
        ...olditems,
        add_offering_location: locationList,
      };
    });
  };
  // ------------------Upload images--------------------

  const handleSelectImage = async (e) => {
    const val = e.target.files[0];
    console.log("image File for service Provider====>", val);
    if (val) {
      const field = e.target.name;
      setErrorMessage((old) => {
        return { ...old, [field + "Error"]: "" };
      });
      setStatusLoader(true);
    }
    // const result = URL.createObjectURL(val);
    // let img = document.getElementById("selectImg");
    // img.src = result;
    // let base64 = await Base64(val);
    //==============================uploading on imagekit========================================
    const folderPath = "ServiceProvider";
    let imagekitresponse = await imageKit(val, folderPath);

    console.log("imagekitresponse", imagekitresponse);
    if (imagekitresponse) {
      setApplyService((olditems) => {
        return {
          ...olditems,
          snapsort_offering: [imagekitresponse],
        };
      });
      setSnapsortImgs(imagekitresponse);
      setStatusLoader(false);
    }
  };
  // --------------------cancle Uploade Image------------
  const handleCancleImage = () => {
    setApplyService((olditems) => {
      return {
        ...olditems,
        snapsort_offering: [],
      };
    });
    setSnapsortImgs(img3);
  };

  // ------------------------Api post request------------------------------------------
  const handleSavefile = () => {
    let error = {};
    if (applyService.service_offering_title.length < 3) {
      error.serviceOfferingError = "Please select service offering title.";
    }
    if (applyService.select_your_offering.length === 0) {
      error.selectedOfferingError = "Please select your offering.";
    }
    for (let doc of applyService.documents_details) {
      if (doc.documents === "") {
        // error.documentDetailsError = "please add documents";
        toast.warning("please add documents " + doc.name);
      }
    }
    if (applyService.add_offering_location.length === 0) {
      error.offeringLocationError = "please add at least one location";
    }
    if (applyService.snapsort_offering.length === 0) {
      error.snapsortOfferingError = "please select any one snapsort";
    }
    if (Object.keys(error).length === 0) {
      ValidationSavefile();
    } else {
      setErrorMessage(error);
      toast.warning("Please give valid information");
    }
  };

  const ValidationSavefile = async () => {
    let resServiceMaster = await API_REQ_POST_WITH_TOKEN(
      configData.USER_SERVICE_APPLY_POST_URL,
      applyService,
      userToken
    );
    console.log(resServiceMaster);
    if (resServiceMaster) {
      if (resServiceMaster.success === true) {
        // toast.success(resServiceMaster.message);
        toast.success(
          "Your application to become a service provider has been submitted for review to our team. You will receive a notification regarding the status of your application.",
          {
            position: "top-right",
            autoClose: 13000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setApplyService({
          _id: "",
          service_offering_title: "",
          select_your_offering: "",
          documents_details: [],
          add_offering_location: [],
          snapsort_offering: [],
          // "admin_approval":false
        });
        setSnapsortImgs(img3);
        setDocmentData([]);
      } else {
        toast.warning(resServiceMaster.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };

  // -------- Geolocation (JS) Code for getting latitude and longitude ----------
  const getLocation = async () => {
    if (value.geoLocations && value.geoLocations.length > 0) {
      // setPlace(value.geoLocations[0].city);
      if (
        applyService.add_offering_location.indexOf(
          value.geoLocations[0].city
        ) !== -1
      ) {
        toast.warning("This place is already added.");
      } else {
        if (value.geoLocations[0]?.city) {
          setApplyService((olditems) => {
            return {
              ...olditems,
              add_offering_location: [
                ...applyService.add_offering_location,
                value.geoLocations[0].city.trim(),
              ],
            };
          });
        } else {
          toast.warning(
            "❌ Automatic location can not detected at this moment, 👉 Please enter your location manually"
          );
        }
      }
    } else {
      let newlocation = await getLocations();
      console.log("newlocation ==>", newlocation);
      if (newlocation) {
        if (
          applyService.add_offering_location.indexOf(
            value.geoLocations[0]?.city.trim()
          ) !== -1
        ) {
          toast.warning("This place is already added.");
        } else {
          if (value.geoLocations[0]?.city) {
            setApplyService((olditems) => {
              return {
                ...olditems,
                add_offering_location: [
                  ...applyService.add_offering_location,
                  value.geoLocations[0].city.trim(),
                ],
              };
            });
          } else {
            toast.warning(
              "❌ Automatic location can not detected at this moment, 👉 Please enter your location manually"
            );
          }
        }
        value.setGeoLocations(newlocation);
      } else {
        toast.warning(
          "❌ Automatic location can not detected at this moment, 👉 Please enter your location manually"
        );
      }
    }
  };

  // --------------------GET SERVICE BY USER ID------------------------------
  const getCasesgetServiceById = async () => {
    if (query.get("serviceId")) {
      let ApiRes = await API_REQ_GET(
        configData.USER_SERVICE_GET_SERVICE_BY_ID_URL +
          `?id=${query.get("serviceId")}`,
        userToken
      );
      // console.log("getCasesVerifyPhone==>", ApiRes);
      if (ApiRes) {
        if (ApiRes.success === true) {
          // toast.success(ApiRes.message);
          console.log("getCasesgetServiceById==>", ApiRes);
          setApplyService((olditems) => {
            return {
              ...olditems,
              _id: ApiRes.result[0]._id,
              service_offering_title: ApiRes.result[0].service_offering_title,
              select_your_offering: ApiRes.result[0].select_your_offering,
              documents_details: ApiRes.result[0].documents_details,
              add_offering_location: ApiRes.result[0].add_offering_location,
              snapsort_offering: ApiRes.result[0].snapsort_offering,
            };
          });
          let newArray = [];
          for (let ele of ApiRes?.result[0]?.documents_details) {
            let doc = {
              Guidline: ele.documents,
              help_text: ele.name,
              _id: ele._id,
            };
            newArray.push(doc);
          }
          setDocmentData(newArray);
          setSnapsortImgs(
            // configData.COMMON_MEDIA_LINK_URL +
            //   "/applyforservice/" +
            ApiRes.result[0].snapsort_offering[0]
          );
        } else {
          // toast.warning(ApiRes.message);
        }
      } else {
        toast.error("Please Check Your Internet connection !");
      }
    }
  };

  // --------------------verify user phone number------------------------------
  const getCasesVerifyPhone = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_SERVICE_VERIFY_PHONE_URL,
      userToken
    );
    console.log("getCasesVerifyPhone==>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
      } else {
        toast.warning("Please Verify Phone number before apply!");
        setTimeout(() => {
          navigate("/Profile-setting", { replace: true });
        }, 3000);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  // -----------------------------Api get request-------------------------------------------
  const getUserService = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_SERVICE_APPLY_GET_URL,
      userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        setResp(ApiRes.result);
        setUserService(ApiRes.result);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    getUserService();
    getCasesVerifyPhone();
    getCasesgetServiceById();
  }, []);

  return (
    <div className="ServiceProvider_main_contain_div">
      <div className="ServiceProvider_Service_offering_div">
        <div className="ServiceProvider_Service_offeringTitle">
          <h6>
            Service offering title<span style={{ color: "#FF0000" }}>*</span>
          </h6>
        </div>
        <div className="ServiceProvider_input">
          <span style={styleError}>{errorMessage.serviceOfferingError}</span>
          <div
            className={`ServiceProvider_Service_offeringINput ${
              errorMessage.serviceOfferingError ? "ErrorBorderBox" : undefined
            }`}
          >
            {/* <span>{error.serviceOfferingError}</span> */}
            <input
              type="text"
              name="serviceOffering"
              placeholder="Give a caching title for your offering "
              value={applyService.service_offering_title}
              onChange={(e) => handleInputTitle(e)}
              required
            />
            <RiPencilFill
              className="ReUsableInput_RiPencilFillicon"
              style={{ opacity: "1" }}
              // onClick={handleEditClick}
            />
          </div>
        </div>
      </div>
      <div className="ServiceProvider_Select_youroffering_div ">
        <div className="ServiceProvider_Select_youroffering ">
          <h6>
            Select your offering <span style={{ color: "#FF0000" }}>*</span>
          </h6>
        </div>
        <div style={{ width: "70%" }}>
          <span style={styleError}>{errorMessage.selectedOfferingError}</span>
          <div className="ServiceProvider_SelectOfferingList ">
            {userService &&
              userService.map((List, index) => (
                <div
                  key={index}
                  className={`ServiceProvider_SelectOffer ${
                    applyService.select_your_offering === List.name
                      ? "ServiceProviderSelectOffer"
                      : undefined
                  }`}
                  onClick={() => handleSelectService(List.name, List._id)}
                >
                  {/* <List.icons className="ServiceProvider_SelectOfferIcon" /> */}
                  <div className="ServiceProvider_image ">
                    <img
                      src={
                        // configData.COMMON_MEDIA_LINK_URL +
                        // "/serviceSettings/" +
                        List.serviceIcon
                      }
                      alt="image..."
                    />
                  </div>
                  <p>{List.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="ServiceProvider_AttachDoc_div">
        {documentData.length > 0 && (
          <h3>Please attach the following document</h3>
        )}

        {documentData &&
          documentData.map((docm, i) => (
            <div className="AttachDoc_mainContainer_div"   key={i}>
              <div className="AttachDoc_name">
                <h6>
                  {docm.help_text}
                  <span style={{ color: "#FF0000" }}>*</span>
                </h6>
              </div>
              <label
                htmlFor={`AttchDoc+${docm._id}`}
                className="AttachDoc_DocPdf"
              >
                <img
                  src={imgFile}
                  alt="file..."
                  className="AttachDoc_PDFIcon"
                />
                {/* <MdOutlinePictureAsPdf className="AttachDoc_PDFIcon" /> */}
                <p>{docm.Guidline.slice(0, 40)}</p>
                {docLoader.includes(i) && <span className="DLoader"></span>}
              </label>
              {applyService.documents_details.length > 0 &&
                applyService.documents_details[i].documents && (
                  <a
                    href={applyService.documents_details[i].documents}
                    target="_blank"
                    className="ServicePiEyeDuotoneA"
                  >
                    <PiEyeDuotone className="ServicePiEyeDuotone" />
                  </a>
                )}

              <input
                type="file"
                id={`AttchDoc+${docm._id}`}
                name="documentDetails"
                style={{ display: "none" }}
                onChange={(e) =>
                  handleAttachFile(e, i, docm.help_text, docm._id)
                }
                accept=".jpeg,.jpg,.png,.pdf,.doc"
              />
            </div>
          ))}
      </div>
      <div className="ServiceProvider_AttachDoc_div">
        <h3>Location details</h3>
        <div className="ServiceProvider_Service_offering_div">
          <div className="ServiceProvider_Service_offeringTitle">
            <h6>
              Add offering location<span style={{ color: "#FF0000" }}>*</span>
            </h6>
          </div>
          <div className="ServiceProvider_input">
            <span style={styleError}>{errorMessage.offeringLocationError}</span>

            <div
              className={`ServiceProvider_Service_offeringINput ${
                errorMessage.offeringLocationError
                  ? "ErrorBorderBox"
                  : undefined
              }`}
            >
              <input
                type="text"
                placeholder="Enter location where you will offer this service"
                value={place}
                name="offeringLocation"
                onChange={(e) => setPlace(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
                required
              />
              <MdMyLocation
                className="ReUsableInput_RiPencilFillicon"
                style={{ opacity: "1", color: "#0078DB" }}
                onClick={() => getLocation()}
              />
            </div>
          </div>
          {/* <Autocomplete
              // apiKey={'https://apis.mapmyindia.com/advancedmaps/v1/2c78f7c9768e2cdf375079d84c953d48'}
              onPlaceSelected={(place) => {
                console.log(place);
              }}
            /> */}
        </div>
        <div className="ServiceProvider_Service_offering_div">
          <div className="ServiceProvider_Service_offeringTitle"></div>
          <div className="ServiceProvider_ServiceLocation">
            {applyService &&
              applyService.add_offering_location.map((loca, i) => (
                <div key={i} className="ServiceProvider_Location">
                  <p>{loca}</p>
                  <RiDeleteBin5Fill
                    onClick={() => handleDeletePlace(i)}
                    className="ServiceProvider_LocationDelete"
                    style={{ color: "#FA0000", cursor: "pointer" }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="ServiceProvider_AttachDoc_div">
        <h3 style={{ paddingBottom: "30px" }}>
          Add a snap to support your offering
        </h3>
        <span style={styleError}>{errorMessage.snapsortOfferingError}</span>
        <div
          className={`ServiceProvider_AsnapOffer_div ${
            errorMessage.snapsortOfferingError ? "ErrorBorderDash" : undefined
          }`}
        >
          <img src={snapsortImgs} alt="snap image..." id="selectImg" />
          <input
            type="file"
            name="snapsortOffering"
            style={{ display: "none" }}
            id="addImage"
            onChange={(e) => handleSelectImage(e)}
          />
          <div className="ServiceProviderAddImg">
            <label htmlFor="addImage">
              <BsPlus className="ServiceProviderAddImage" />
            </label>
            <MdOutlineCancel
              className="ServiceProvider_cancel_div"
              onClick={handleCancleImage}
            />
          </div>
          {statusLoader == true && (
            <div className=" ServiceLoadersMainDiv">
              <div className="Nav-Loaders ServiceLoadersDiv"></div>
            </div>
          )}
        </div>
      </div>
      <div className="ServiceProvider_SubmitButton">
        <button onClick={handleSavefile}>
          Submit for an approval
          <MdVerified className="ServiceProvider_SubmitButtonIcon" />
        </button>
      </div>
    </div>
  );
};

export default ServiceProvider;
