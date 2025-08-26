import React, { useEffect, useState } from "react";
import Richtext from "./Richtext";
import "../../assets/admin/css/style.css";
import "../../assets/admin/css/Post.css";
import pics1 from "../../assets/Feature/photo-1.png";
import pics2 from "../../assets/Feature/photo-2.png";
import pics3 from "../../assets/Feature/Group 102.png";
import pics4 from "../../assets/Feature/Group 103.png";
import pics5 from "../../assets/Feature/illustation.png";
import pics6 from "../../assets/Feature/icon.png";
import pics7 from "../../assets/services/feature tags.png";
import pics8 from "../../assets/services/Ellipse 31.png";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import configData from "../../config/config.json";
import {
  API_REQ_GET,
  API_REQ_POST,
  API_REQ_POST_WITH_TOKEN,
} from "../../config/API";
import { Base64, imageKit, isValidUrl } from "../../config/Helper";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

// ==============================================================

const ImportImgFile = ({
  image,
  id,
  editIconStyle,
  handleSliderImages,
  index,
  LableImg,
  htmlFor,
}) => {
  return (
    <div>
      <img
        src={image}
        id={id}
        alt="slider_pic_1"
        className="post_slider_image"
      />
      <label htmlFor={htmlFor}>
        <img src={LableImg} alt="edit-icon" style={editIconStyle} />
      </label>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        id={htmlFor}
        style={{ display: "none" }}
        onChange={(e) => {
          handleSliderImages(e, id, index);
        }}
      />
    </div>
  );
};

const ImportIconImg = ({
  image,
  id,
  index,
  handleimageupdate,
  LableImg,
  htmlFor,
}) => {
  return (
    <>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        id={htmlFor}
        style={{ display: "none" }}
        onChange={(e) => {
          handleimageupdate(e, id, index);
        }}
      />
      <div className="post_slider_image_icon">
        <img
          src={image}
          alt="iconPath"
          id={id}
          style={{
            width: "30px",
            borderRadius: "5px",
            // marginLeft: "40px",
          }}
        />
        <label htmlFor={htmlFor}>
          <img
            src={LableImg}
            alt="edit-icon"
            style={{
              width: "30px",
              borderRadius: "5px",
              marginLeft: "30px",
            }}
          />
          <br />
          <p
            style={{
              fontWeight: "small",
              fontSize: "12px",
              float: "right",
              marginRight: "5px",
            }}
          >
            Edit
          </p>
        </label>
      </div>
    </>
  );
};

const ButtonAddRemove = ({ handleAdd, handleRemove, initialState, index }) => {
  return (
    <>
      {initialState.length - 1 === index && (
        <div className="post_Feature3_AddRemove-div">
          <button
            type="submit"
            className="post_Feature3_button-div"
            onClick={() => handleAdd(index)}
          >
            <span id="post_Feature3_span-div">+</span> Add more
          </button>
          {initialState.length > "1" ? (
            <button
              type="submit"
              className="post_Feature3_button-div"
              onClick={() => handleRemove(index)}
            >
              <span id="post_Feature3_span-div">+</span> Remove
            </button>
          ) : (
            <button type="submit" className="post_Feature3_button-div">
              <span id="post_Feature3_span-div">+</span> Remove
            </button>
          )}
          {/* <button type="submit" className='post_Feature3_button-div' onClick={handleFeatureDelete} >
                                    <span  id='post_Feature3_span-div' >+</span> Remove</button> */}
        </div>
      )}
    </>
  );
};

// ---------API Interagation for Upadte--------------

const APIRESPONSE = async (updatedata, token, setResponse) => {
  // ---------------------------------------
  // response from API---------------
  let Res = await API_REQ_POST_WITH_TOKEN(
    configData.DYNAMIC_AND_LANDING_PAGE_GET_URL,
    updatedata,
    token
  );
  // console.log(Res);
  if (Res) {
    if (Res.success === true) {
      toast.success(Res.message);
      setResponse(true);
    } else {
      toast.warning(Res.message);
    }
    // console.log("Res........ ", Res);
  } else {
    toast.error("please check Your Internet");
  }
};

const Post = ({ herfLink }) => {
  const [toggle, setToggle] = useState(false);
  const [getRes, setGetRes] = useState();
  // console.log(getRes);
  // -------------------------------------------------------------
  let HomeData = new FormData();
  // console.log(HomeData);

  const [heading, setHeading] = useState("");
  // console.log(heading);
  const [description, setDescription] = useState("");
  // console.log(description);
  const [quote, setQuote] = useState("");
  // console.log(quote);
  // --------------------------------------------------
  const [sliderImage, setSliderImage] = useState([
    {
      index: 0,
      img: "",
    },
    {
      index: 1,
      img: "",
    },
    {
      index: 2,
      img: "",
    },
    {
      index: 3,
      img: "",
    },
    {
      index: 4,
      img: "",
    },
    {
      index: 5,
      img: "",
    },
  ]);
  const [seccondaryImage, setseccondaryImage] = useState(pics3);
  const [featureDec, setFeatureDec] = useState();
  const [featureBigImage, setFeatureBigImage] = useState();
  const [updateImage, setUpdateImage] = useState([
    {
      index: 0,
      img: "",
    },
    {
      index: 1,
      img: "",
    },
    {
      index: 2,
      img: "",
    },
  ]);
  const [serviceBigImg, setServiceBigImg] = useState();
  console.log("serviceBigImg=======", serviceBigImg);
  // console.log(quote);

  // console.log(sliderImage);
  // const [faqtwo, setFaqtwo] = useState();
  const [homeadd, setHomeadd] = useState([
    {
      title: "",
      description: "",
      quote: "",
      sliderImagepath: [""],
      seccondaryImagePath: "",
    },
  ]);
  const [featureadd, setfeatureadd] = useState([
    {
      index: 0,
      iconPath: "",
      featureDescription: "",
    },
  ]);
  const [updateadd, setUpdateadd] = useState([
    {
      index: 0,
      iconPath: "",
      updateDescription: "",
    },
  ]);
  const [servicadd, setServicadd] = useState([
    {
      index: 0,
      iconPath: "",
      serviceTitle: "",
    },
  ]);
  const [testiadd, setTestiadd] = useState([
    {
      index: 0,
      testimonyImagePath: "",
      testimonyDescription: "",
    },
  ]);
  const [faq, setFaqs] = useState([
    {
      index: 0,
      Qus: "",
      Ans: "",
    },
  ]);
  console.log("---------------updateadd------------------", updateadd);

  // const [imagefeature, setImagefeature] = useState([]);
  // const [imageupdate, setImageupdate] = useState([]);
  // const [imageservic, setImageservic] = useState([]);
  // const [imagetesti, setImagetesti] = useState([]);
  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);
  // ------- Slider Image Handle  (sliderImagepath)----------------------------------
  const handleSliderImages = async (event, id, index) => {
    const file = event.target.files[0];
    const result = URL.createObjectURL(file);
    let img = document.getElementById(id);
    img.src = result;

    // const formData = new FormData();
    // formData.append("files", file);
    // // -----------------------------COMMON IMAGE ICON UPLOAD-----------------------------------------------

    // let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //   configData.USER_COMMON_SERVICE_POST_URL + "?step=dynamichomepage",
    //   formData,
    //   adminToken
    // );

    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     toast.success(ResBasic.message);
    //     console.log("dynamichomepage sliderImage====>", ResBasic[0]);
    //     for (let cur_ele of sliderImage) {
    //       if (cur_ele.index === index) {
    //         cur_ele.img = ResBasic[0].filename;
    //       }
    //     }
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
    const folderPath = "DynamicHomePage";
    let imagekitresponse = await imageKit(file, folderPath);
    if (imagekitresponse) {
      for (let cur_ele of sliderImage) {
        if (cur_ele.index === index) {
          cur_ele.img = imagekitresponse;
        }
      }
    }
  };
  // ------- Slider Image Handle  (seccondaryImagePath)----------------------------------
  const handleSlidersec = async (event, id) => {
    const file = event.target.files[0];
    const result = URL.createObjectURL(file);
    let img = document.getElementById(id);
    img.src = result;
    // HomeData.append("seccondaryImagePath", event.target.files[0]);
    // const formData = new FormData();
    // formData.append("files", file);
    // // -----------------------------COMMON IMAGE ICON UPLOAD-----------------------------------------------

    // let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //   configData.USER_COMMON_SERVICE_POST_URL + "?step=dynamichomepage",
    //   formData,
    //   adminToken
    // );

    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     toast.success(ResBasic.message);
    //     console.log("dynamichomepage secondary====>", ResBasic[0]);
    //     setseccondaryImage(ResBasic[0].filename);
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
    // ---------------------imageKit for DynamicHomePage-----------------
    const folderPath = "DynamicHomePage";
    let imagekitresponse = await imageKit(file, folderPath);
    if (imagekitresponse) {
      setseccondaryImage(imagekitresponse);
    }
  };
  // ---------------------------getAdminToken------------------------------------
  const adminGetToken = JSON.parse(localStorage.getItem("adminAccessToken"));
  // const _id = adminGetToken && adminGetToken.response._id;
  const token = adminGetToken && adminGetToken.response.token;
  // console.log("AdminToken-----------------", token);
  let _id = "";
  //========= API Integration for Home Content ================>
  const handleHomeContent = () => {
    let homeError = {};
    if (sliderImage.length < 4) {
      homeError.error = "Please select At List 4 Images...";
    }
    if (!seccondaryImage) {
      homeError.error = "Please select Image 2";
    }
    if (Object.keys(homeError).length === 0) {
      homeAction();
    } else {
      toast.warning(homeError.error);
    }
  };
  const homeAction = async () => {
    // const formData = new FormData();

    let sliderArray = [];
    let stateVal = sliderImage;
    let index = 0;
    console.log("stateVal--------->", stateVal);

    for (let cur_ele of stateVal) {
      if (cur_ele.index == index) {
        // sliderArray.push(cur_ele.img);
        sliderArray.push(cur_ele.img);

        index += 1;
      }
    }
    console.log("sliderArray======================", sliderArray);

    const homedata = {
      step: "home",
      title: heading,
      description: description,
      quote: quote,
      _id: getRes.foundData && getRes.foundData._id,
      sliderImagepath: sliderArray,
      seccondaryImagePath: seccondaryImage,
    };
    // ---------------------------------------
    console.log('homedata',homedata);
    // formData.append("data", JSON.stringify(homedata));
    // formData.append("sliderImage", sliderArray);
    // formData.append("seccondaryImage", seccondaryImage);

    // response from API---------------
    let ResHome = await APIRESPONSE(
      homedata,
      token
      // setResponse ///--------give setState to store response data
    );
    console.log(ResHome);
  };

  // ---------API Interagation for Feature--------------
  const handleSaveFeature = () => {
    let homeError = {};
    if (featureadd.length < 2) {
      homeError.error = "Please select At List 4 Images...";
    }
    for (let cur_ele of featureadd) {
      if (!cur_ele.iconPath) {
        homeError.error = `Please select Feature ${
          cur_ele.index + 1
        }  Icon Image `;
      }
    }
    if (!featureBigImage) {
      homeError.error = "Please select Image ";
    }
    if (Object.keys(homeError).length === 0) {
      featureAction();
    } else {
      toast.warning(homeError.error);
    }
  };
  const featureAction = async () => {
    // const formData = new FormData();
    const featuredata = {
      step: "feature",
      featureHeadDescription: featureDec,
      featureDetails: featureadd,
      _id: getRes && getRes.foundData._id,
      featureImagePath: featureBigImage,
    };
    console.log(featuredata);
    // formData.append("data", JSON.stringify(featuredata));
    // formData.append("featureImage", featureBigImage);

    let ResFeature = await APIRESPONSE(
      featuredata,
      token
      // setResponse ///--------give setState to store response data
    );
    console.log(ResFeature);
  };
  // ---------API Interagation for Upadte--------------
  const handleSaveUpdate = () => {
    let homeError = {};
    if (updateImage.length !== 3) {
      homeError.error = "Please select Upadte All 3 Image";
    }
    for (let cur_ele of updateadd) {
      if (!cur_ele.iconPath) {
        homeError.error = `Please select Upadte ${
          cur_ele.index + 1
        }  Icon Image `;
      }
    }

    if (Object.keys(homeError).length === 0) {
      updateAction();
    } else {
      toast.warning(homeError.error);
    }
  };
  const updateAction = async () => {
    // const formData = new FormData();
    let UpdateArray = [];
    let stateVal = updateImage;
    let index = 0;

    for (let cur_ele of stateVal) {
      if (cur_ele.index == index) {
        UpdateArray.push(cur_ele.img);
        // formData.append("updateImage", cur_ele.img);

        index += 1;
      }
    }
    console.log(UpdateArray);

    const updatedata = {
      step: "update",
      updateDetails: updateadd,
      _id: getRes && getRes.foundData._id,
      updateImagePath: UpdateArray,
    };
    console.log(updatedata);
    // formData.append("data", JSON.stringify(updatedata));
    // formData.append("updateImage", UpdateArray);

    let ResFeature = await APIRESPONSE(
      updatedata,
      token
      // setResponse ///--------give setState to store response data
    );
    console.log(ResFeature);
  };

  // ---------API Interagation for service--------------
  const handleSaveService = () => {
    let homeError = {};
    // if(updateImage.length!==3){
    //   homeError.error='Please select All 3 Image'
    // }
    for (let cur_ele of servicadd) {
      if (!cur_ele.iconPath) {
        homeError.error = `Please select service ${
          cur_ele.index + 1
        } Icon Image `;
      }
    }
    if (!serviceBigImg) {
      homeError.error = "Please select service Image ";
    }
    if (Object.keys(homeError).length === 0) {
      serviceAction();
    } else {
      toast.warning(homeError.error);
    }
  };
  const serviceAction = async () => {
    // const formData = new FormData();
    const servicedata = {
      step: "services",
      servicesDescription: servicadd,
      _id: getRes && getRes.foundData._id,
      serviceImagePath: serviceBigImg,
    };
    console.log("servicedata", servicedata);
    // formData.append("data", JSON.stringify(servicedata));
    // formData.append("serviceImage", serviceBigImg);
    // console.log(
    //   "serviceBigImg-------------------------------->",
    //   serviceBigImg
    // );
    // console.log("Action on formData serviceImage-----------> ",JSON.parse(formData.getAll("serviceImage")));
    // console.log("Action on formData-----------> ",JSON.parse(formData.getAll("data")));

    let ResService = await APIRESPONSE(
      servicedata,
      token
      // setResponse ///--------give setState to store response data
    );
    console.log("ResService", ResService);
  };

  // ---------API Interagation for Testimony--------------
  const handleSaveTestimony = () => {
    let homeError = {};
    for (let cur_ele of testiadd) {
      if (!cur_ele.testimonyImagePath) {
        homeError.error = `Please select Testimony ${
          cur_ele.index + 1
        }  Icon Image `;
      }
    }
    if (Object.keys(homeError).length === 0) {
      testimonyAction();
    } else {
      toast.warning(homeError.error);
    }
  };
  const testimonyAction = async () => {
    // const formData = new FormData();
    const testimonydata = {
      step: "testimony",
      testimony: testiadd,
      _id: getRes && getRes.foundData._id,
    };

    console.log(testimonydata);
    // formData.append("data", JSON.stringify(testimonydata));

    let ResTestimony = await APIRESPONSE(
      testimonydata,
      token
      // setResponse ///--------give setState to store response data
    );
    console.log("ResTestimony", ResTestimony);
  };
  // ---------API Interagation for ResFaqs--------------
  const handleSaveFaqs = async () => {
    // const formData = new FormData();
    const faqsdata = {
      step: "faqs",
      faqs: faq,
      _id: getRes && getRes.foundData._id,
    };
    console.log(faqsdata);
    // formData.append("data", JSON.stringify(faqsdata));
    // formData.append("step", "faqs");
    // formData.append("_id", _id);

    // if(vmdMsgText && vmdMsgText !== ""){
    //   formData.append("message_text", vmdMsgText);
    // }
    // console.log(
    //   "Action on formData-----------> ",
    //   JSON.parse(formData.getAll("data"))
    // );
    // console.log("Action on formData ",formData.getAll("action_on"));
    // for (var pair of formData.entries()) {
    //   console.log(pair[0]);
    // }
    let ResFaqs = await APIRESPONSE(
      faqsdata,
      token
      // setResponse ///--------give setState to store response data
    );
    console.log("ResFaqs", ResFaqs);
  };
  const handleBigImageFeature = async (event, id) => {
    const file = event.target.files[0];
    const result = URL.createObjectURL(file);
    let img = document.getElementById(id);
    img.src = result;
    // setFeatureBigImage(file[0]);

    // const formData = new FormData();
    // formData.append("files", file);
    // // -----------------------------COMMON IMAGE ICON UPLOAD-----------------------------------------------

    // let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //   configData.USER_COMMON_SERVICE_POST_URL + "?step=dynamichomepage",
    //   formData,
    //   adminToken
    // );

    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     toast.success(ResBasic.message);
    //     console.log("dynamichomepage secondary====>", ResBasic[0]);
    //     setFeatureBigImage(ResBasic[0].filename);
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
    // ---------------------imageKit for DynamicHomePage-----------------
    const folderPath = "DynamicHomePage";
    let imagekitresponse = await imageKit(file, folderPath);
    if (imagekitresponse) {
      setFeatureBigImage(imagekitresponse);
    }
  };
  const handleimagefeature = async (event, id, index) => {
    const file = event.target.files[0];
    const result = URL.createObjectURL(file);
    let img = document.getElementById(id);
    img.src = result;
    // const basic64 = await Base64(file);
    // console.log(basic64);
    // setImagefeature(stateVal);

    // const formData = new FormData();
    // formData.append("files", file);
    // // -----------------------------COMMON IMAGE ICON UPLOAD-----------------------------------------------

    // let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //   configData.USER_COMMON_SERVICE_POST_URL + "?step=dynamichomepage",
    //   formData,
    //   adminToken
    // );

    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     toast.success(ResBasic.message);
    //     console.log("dynamichomepage secondary====>", ResBasic[0]);
    //     let stateVal = featureadd;
    //     // console.log(stateVal);
    //     for (let cur_ele of stateVal) {
    //       if (cur_ele.index == index) {
    //         cur_ele.iconPath = ResBasic[0].filename;
    //       }
    //     }
    //     // setFeatureBigImage(ResBasic[0].filename);
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
    // ---------------------imageKit for DynamicHomePage-----------------
    const folderPath = "DynamicHomePage";
    let imagekitresponse = await imageKit(file, folderPath);
    if (imagekitresponse) {
      let stateVal = featureadd;
      for (let cur_ele of stateVal) {
        if (cur_ele.index == index) {
          cur_ele.iconPath = imagekitresponse;
        }
      }
    }
  };
  const handleimageUpdatebig = async (event, id, index) => {
    // console.log(index);
    const file = event.target.files[0];
    const result = URL.createObjectURL(file);
    let img = document.getElementById(id);
    img.src = result;
    // let base64=await Base64(file)

    // const formData = new FormData();
    // formData.append("files", file);
    // // -----------------------------COMMON IMAGE ICON UPLOAD-----------------------------------------------

    // let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //   configData.USER_COMMON_SERVICE_POST_URL + "?step=dynamichomepage",
    //   formData,
    //   adminToken
    // );

    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     toast.success(ResBasic.message);
    //     console.log("dynamichomepage ====>", ResBasic[0]);
    //     for (let cur_ele of updateImage) {
    //       if (cur_ele.index === index) {
    //         cur_ele.img = ResBasic[0].filename;
    //       }
    //     }
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
    // ---------------------imageKit for DynamicHomePage-----------------
    const folderPath = "DynamicHomePage";
    let imagekitresponse = await imageKit(file, folderPath);
    if (imagekitresponse) {
      for (let cur_ele of updateImage) {
        if (cur_ele.index === index) {
          cur_ele.img = imagekitresponse;
        }
      }
    }
  };
  const handleimageupdate = async (event, id, index) => {
    const file = event.target.files[0];
    const result = URL.createObjectURL(file);
    let img = document.getElementById(id);
    img.src = result;
    // let base64 = await Base64(file);

    // const formData = new FormData();
    // formData.append("files", file);
    // // -----------------------------COMMON IMAGE ICON UPLOAD-----------------------------------------------

    // let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //   configData.USER_COMMON_SERVICE_POST_URL + "?step=dynamichomepage",
    //   formData,
    //   adminToken
    // );

    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     toast.success(ResBasic.message);
    //     console.log("dynamichomepage ====>", ResBasic[0]);
    //     // let stateVal = updateadd;
    //     for (let cur_ele of updateadd) {
    //       if (cur_ele.index == index) {
    //         cur_ele.iconPath = ResBasic[0].filename;
    //       }
    //     }
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
    // ---------------------imageKit for DynamicHomePage-----------------
    const folderPath = "DynamicHomePage";
    let imagekitresponse = await imageKit(file, folderPath);
    if (imagekitresponse) {
      for (let cur_ele of updateadd) {
        if (cur_ele.index == index) {
          cur_ele.iconPath = imagekitresponse;
        }
      }
    }
  };
  const handleimageservicebig = async (event, id) => {
    const file = event.target.files[0];
    const result = URL.createObjectURL(file);
    let img = document.getElementById(id);
    img.src = result;

    // const formData = new FormData();
    // formData.append("files", file);
    // // -----------------------------COMMON IMAGE ICON UPLOAD-----------------------------------------------

    // let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //   configData.USER_COMMON_SERVICE_POST_URL + "?step=dynamichomepage",
    //   formData,
    //   adminToken
    // );

    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     toast.success(ResBasic.message);
    //     console.log("dynamichomepage ====>", ResBasic[0]);
    //     setServiceBigImg(ResBasic[0].filename);
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
    // ---------------------imageKit for DynamicHomePage-----------------
    const folderPath = "DynamicHomePage";
    let imagekitresponse = await imageKit(file, folderPath);
    if (imagekitresponse) {
      setServiceBigImg(imagekitresponse);
    }
  };
  const handleimageservice = async (event, id, index) => {
    const file = event.target.files[0];
    const result = URL.createObjectURL(file);
    let img = document.getElementById(id);
    img.src = result;
    // let base64 = await Base64(file);

    // const formData = new FormData();
    // formData.append("files", file);
    // // -----------------------------COMMON IMAGE ICON UPLOAD-----------------------------------------------

    // let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //   configData.USER_COMMON_SERVICE_POST_URL + "?step=dynamichomepage",
    //   formData,
    //   adminToken
    // );

    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     toast.success(ResBasic.message);
    //     console.log("dynamichomepage ====>", ResBasic[0]);
    //     // setServiceBigImg(ResBasic[0].filename);
    //     let stateVal = servicadd;
    //     for (let cur_ele of stateVal) {
    //       if (cur_ele.index == index) {
    //         cur_ele.iconPath = ResBasic[0].filename;
    //       }
    //     }
    //     // setImageservic(stateVal);
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
    // ---------------------imageKit for DynamicHomePage-----------------
    const folderPath = "DynamicHomePage";
    let imagekitresponse = await imageKit(file, folderPath);
    if (imagekitresponse) {
      let stateVal = servicadd;
      for (let cur_ele of stateVal) {
        if (cur_ele.index == index) {
          cur_ele.iconPath = imagekitresponse;
        }
      }
    }
  };
  const handleimagetesti = async (event, id, index) => {
    const file = event.target.files[0];
    const result = URL.createObjectURL(file);
    let img = document.getElementById(id);
    img.src = result;
    // let base64 = await Base64(file);

    // const formData = new FormData();
    // formData.append("files", file);
    // // -----------------------------COMMON IMAGE ICON UPLOAD-----------------------------------------------

    // let ResBasic = await API_REQ_POST_WITH_TOKEN(
    //   configData.USER_COMMON_SERVICE_POST_URL + "?step=dynamichomepage",
    //   formData,
    //   adminToken
    // );

    // if (ResBasic) {
    //   if (ResBasic.length !== 0) {
    //     toast.success(ResBasic.message);
    //     console.log("dynamichomepage ====>", ResBasic[0]);
    //     setServiceBigImg(ResBasic[0].filename);
    //     let stateVal = testiadd;
    //     for (let cur_ele of stateVal) {
    //       if (cur_ele.index == index) {
    //         cur_ele.testimonyImagePath = ResBasic[0].filename;
    //       }
    //     }
    //   } else {
    //     toast.warning(ResBasic.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet !");
    // }
    // ---------------------imageKit for DynamicHomePage-----------------
    const folderPath = "DynamicHomePage";
    let imagekitresponse = await imageKit(file, folderPath);
    if (imagekitresponse) {
      setServiceBigImg(imagekitresponse);
        let stateVal = testiadd;
        for (let cur_ele of stateVal) {
          if (cur_ele.index == index) {
            cur_ele.testimonyImagePath = imagekitresponse;
          }
        }
    }
  };
  // ---Add text editor or add object------------

  const handleFeature = (index) => {
    setfeatureadd([
      ...featureadd,
      {
        index: index + 1,
        iconPath: "",
        featureDescription: "",
      },
    ]);
  };

  const handleUpdate = (index) => {
    setUpdateadd([
      ...updateadd,
      {
        index: index + 1,
        iconPath: "",
        updateDescription: "",
      },
    ]);
  };
  const handleServic = (index) => {
    setServicadd([
      ...servicadd,
      {
        index: index + 1,
        iconPath: "",
        serviceTitle: "",
      },
    ]);
  };
  const handleTesti = (index) => {
    setTestiadd([
      ...testiadd,
      {
        index: index + 1,
        testimonyImagePath: "",
        testimonyDescription: "",
      },
    ]);
  };
  const handleFaqAdd = (index) => {
    setFaqs([
      ...faq,
      {
        index: index + 1,
        Qus: "",
        Ans: "",
      },
    ]);
  };
  // ----------------------------------------------------
  const handleFeatureDelete = (index) => {
    const featuresList = [...featureadd];
    const fill = featuresList.filter((ele) => ele.index != index);
    setfeatureadd(fill);
  };
  const handleUpdateDelete = (index) => {
    const updateList = [...updateadd];
    const fill = updateList.filter((ele) => ele.index != index);
    setUpdateadd(fill);
  };
  const handleServicDelete = (index) => {
    const serviceList = [...servicadd];
    const fill = serviceList.filter((ele) => ele.index != index);
    setServicadd(fill);
  };
  const handleTestiDelete = (index) => {
    const testiList = [...testiadd];
    const fill = testiList.filter((ele) => ele.index != index);
    setTestiadd(fill);
  };
  const handleFaqAddDelete = (index) => {
    const faqList = [...faq];
    const fill = faqList.filter((ele) => ele.index != index);
    // faqList.splice(index, 1);
    setFaqs(fill);
  };

  // ---------- Edit Icon Style--------------------
  const editIconStyle = {
    width: "20px",
    position: "absolute",
    margin: "6px 0px 0px -25px",
    borderRadius: "5px",
  };
  // ------------------------------------------------------

  const getCases = async () => {
    let ResDynamic = await API_REQ_GET(
      configData.DYNAMIC_AND_LANDING_PAGE_GET_URL,
      adminToken,
      3
    );
    // console.log("ResDynamic=============>", ResDynamic);
    if (ResDynamic) {
      if (ResDynamic.success === true) {
        setGetRes(ResDynamic);
        if (ResDynamic.message === "no data found!! ") {
          console.log("data not found!");
        } else {
          //---------------------home store in state----------------------------------
          setHeading(ResDynamic.foundData.home.title);
          setDescription(ResDynamic.foundData.home.description);
          setQuote(ResDynamic.foundData.home.quote);
          setseccondaryImage(
            // configData.MEDIA_LINK_DYANMIC_URL +
            //   "/" +
            ResDynamic.foundData.home.seccondaryImagePath
          );
          let homeVal = ResDynamic.foundData.home.sliderImagepath;
          let homeDatas = [];
          let indexHome = 0;
          for (let cur_ele of homeVal) {
            let updateSection = {
              index: indexHome,
              img: cur_ele,
            };
            homeDatas.push(updateSection);
            indexHome += 1;
            // }
          }
          if (homeVal.length === homeDatas.length) {
            let result = sliderImage.filter(
              (o1) => !homeDatas.some((o2) => o1.index === o2.index)
            );
            console.log(result);
            setSliderImage([...homeDatas, ...result]);
          }
          //---------------------feature store in state----------------------------------
          setFeatureDec(ResDynamic.foundData.feature.featureHeadDescription);
          if (ResDynamic.foundData.feature.featureImagePath) {
            setFeatureBigImage(
              // configData.MEDIA_LINK_DYANMIC_URL +
              //   "/" +
              ResDynamic.foundData.feature.featureImagePath
            );
          }
          let featureValDec = ResDynamic.foundData.feature.featureDetails;
          console.log(featureValDec.length);

          if (featureValDec.length != 0) {
            console.log("step1111");
            let featureDatas = [];
            // console.log("--=--",featureDatas);

            let indexFeatureDec = 0;
            for (let cur_ele of featureValDec) {
              // if(featureValDec.length==indexFeatureDec-1){
              let updateSection = {
                index: indexFeatureDec,
                iconPath: cur_ele.iconPath,
                featureDescription: cur_ele.featureDescription,
                _id: cur_ele._id,
              };
              featureDatas.push(updateSection);
              // setfeatureadd([...featureadd, updateSection]);
              indexFeatureDec += 1;
              // }
            }
            if (featureValDec.length == featureDatas.length) {
              setfeatureadd(featureDatas);
            }
          }

          //---------------------Update store in state----------------------------------
          let UpdateValDec = ResDynamic.foundData.update.updateDetails;
          if (UpdateValDec.length != 0) {
            let UpdateDatas = [];
            // console.log("--=--",UpdateDatas);
            let indexUpdateDec = 0;
            for (let cur_ele of UpdateValDec) {
              let updateSection = {
                index: indexUpdateDec,
                iconPath: cur_ele.iconPath,
                updateDescription: cur_ele.updateDescription,
                _id: cur_ele._id,
              };
              UpdateDatas.push(updateSection);
              indexUpdateDec += 1;
            }
            if (UpdateValDec.length == UpdateDatas.length) {
              setUpdateadd(UpdateDatas);
            }
          }
          // ------------------------------------------------
          let featureValimg = ResDynamic.foundData.update.updateImagePath;

          if (featureValimg.length != 0) {
            let udateImgDatas = [];
            let indexFeature = 0;
            for (let cur_ele of featureValimg) {
              let updateSection = {
                index: indexFeature,
                img: cur_ele,
              };
              udateImgDatas.push(updateSection);
              indexFeature += 1;
              // }
            }
            if (homeVal.length === homeDatas.length) {
              let result = updateImage.filter(
                (o1) => !udateImgDatas.some((o2) => o1.index === o2.index)
              );
              //  console.log(result);
              setUpdateImage([...udateImgDatas, ...result]);
            }
          }

          //---------------------service store in state----------------------------------
          if (ResDynamic.foundData.services.serviceImagePath) {
            setServiceBigImg(ResDynamic.foundData.services.serviceImagePath);
          }
          let serviceValDec = ResDynamic.foundData.services.servicesDescription;
          if (serviceValDec.length != 0) {
            let serviceDatas = [];
            // console.log("--=--", serviceDatas);
            let indexserviceDec = 0;
            for (let cur_ele of serviceValDec) {
              let updateSection = {
                index: indexserviceDec,
                iconPath: cur_ele.iconPath,
                serviceTitle: cur_ele.serviceTitle,
                _id: cur_ele._id,
              };
              serviceDatas.push(updateSection);
              indexserviceDec += 1;
            }
            if (serviceValDec.length == serviceDatas.length) {
              setServicadd(serviceDatas);
            }
          }
          //---------------------Testimony store in state----------------------------------
          let testimonyValDec = ResDynamic.foundData.testimony;

          if (testimonyValDec.length != 0) {
            let testimonyDatas = [];
            // console.log("--=--", testimonyDatas);
            let indextestimonyDec = 0;
            for (let cur_ele of testimonyValDec) {
              let updateSection = {
                index: indextestimonyDec,
                testimonyImagePath: cur_ele.testimonyImagePath,
                testimonyDescription: cur_ele.testimonyDescription,
                _id: cur_ele._id,
              };
              testimonyDatas.push(updateSection);
              indextestimonyDec += 1;
            }
            if (testimonyValDec.length == testimonyDatas.length) {
              setTestiadd(testimonyDatas);
            }
          }
          //---------------------faqs store in state----------------------------------
          let faqValDec = ResDynamic.foundData.faqs;
          if (faqValDec.length != 0) {
            let faqDatas = [];
            // console.log("--=--", faqDatas);
            let indexfaqDec = 0;
            for (let cur_ele of faqValDec) {
              let updateSection = {
                index: indexfaqDec,
                Qus: cur_ele.Qus,
                Ans: cur_ele.Ans,
                _id: cur_ele._id,
              };
              faqDatas.push(updateSection);
              indexfaqDec += 1;
            }
            if (faqValDec.length == faqDatas.length) {
              setFaqs(faqDatas);
            }
          }
        }
      } else {
        toast.warning(ResDynamic.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  useEffect(() => {
    getCases();
  }, []);
  return (
    <div className="post_main_container_div">
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
      {/* =============== Toggle button ================ */}
      <div className="form-check form-switch">
        <p style={{ color: "#222235" }}>Detail Page</p>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          <input
            className="form-check-input"
            type="checkbox"
            checked={toggle}
            id="flexSwitchCheckDefault"
            onChange={() => setToggle(!toggle)}
          />
        </label>
      </div>
      {/* ================ Dashboard ============== */}
      {toggle ? (
        <div className="post_main_container">
          {/* ============== section name with button ============= */}
          <div
            id={`${herfLink == "home" && herfLink}`}
            className="post_main_home-div"
          >
            <h1 className="post_Feature_update">Home</h1>
            <button
              className="post_button_container_div"
              onClick={handleHomeContent}
            >
              Save
            </button>
          </div>
          <div className="row">
            {/* ========== H1 editing =========== */}
            <div className="col-lg-8">
              {/* ========== section 1 - heading editing =========== */}
              <div className="post_head_container_div">
                <h3 className="post_heading_div">Heading</h3>
                <Richtext
                  setStateData={setHeading}
                  stateData={heading}
                  htmlContent={
                    heading &&
                    EditorState.createWithContent(
                      ContentState.createFromBlockArray(
                        convertFromHTML(heading)
                      )
                    )
                  }
                  currentFeatureState={"Home"}
                />
              </div>
              {/* ========== section 2 - description editing =========== */}
              <div className="post_head_container_div">
                <h3 className="post_heading_div">Description</h3>
                <Richtext
                  setStateData={setDescription}
                  stateData={description}
                  htmlContent={
                    description &&
                    EditorState.createWithContent(
                      ContentState.createFromBlockArray(
                        convertFromHTML(description)
                      )
                    )
                  }
                  currentFeatureState={"Description"}
                />
              </div>
              {/* ========== section 3 - Quote editing =========== */}
              <div className="post_head_container_div">
                <h3 className="post_heading_div">Quote</h3>
                <Richtext
                  setStateData={setQuote}
                  stateData={quote}
                  htmlContent={
                    quote &&
                    EditorState.createWithContent(
                      ContentState.createFromBlockArray(convertFromHTML(quote))
                    )
                  }
                />
              </div>
            </div>
            {/* ========== Slider image editing =========== */}
            <div className="col-lg-4">
              <h3 className="post_slider_heading_div">Slider Images</h3>
              {/* ========== first 3 images =================== */}
              <div className="post_slider_image_div">
                <ImportImgFile
                  image={
                    sliderImage[0].img
                      ?
                      //  configData.COMMON_MEDIA_LINK_URL +
                      //   "/dynamichomepage/" +
                        sliderImage[0].img
                      : pics3
                  }
                  id="slider1"
                  editIconStyle={editIconStyle}
                  handleSliderImages={handleSliderImages}
                  index={0}
                  LableImg={pics4}
                  htmlFor="sliderinputimage_1"
                />

                <ImportImgFile
                  image={
                    sliderImage[1].img
                      ? 
                      // configData.COMMON_MEDIA_LINK_URL +
                      //   "/dynamichomepage/" +
                        sliderImage[1].img
                      : pics3
                  }
                  id="slider2"
                  editIconStyle={editIconStyle}
                  handleSliderImages={handleSliderImages}
                  index={1}
                  LableImg={pics4}
                  htmlFor="sliderinputimagetwo"
                />

                <ImportImgFile
                  image={
                    sliderImage[2].img
                      ?
                      //  configData.COMMON_MEDIA_LINK_URL +
                      //   "/dynamichomepage/" +
                        sliderImage[2].img
                      : pics3
                  }
                  id="slider3"
                  editIconStyle={editIconStyle}
                  handleSliderImages={handleSliderImages}
                  index={2}
                  LableImg={pics4}
                  htmlFor="sliderinputimagethree"
                />
              </div>
              {/* ========== Another 3 images =================== */}
              <div className="post_slider_image_div">
                <ImportImgFile
                  image={
                    sliderImage[3].img
                      ?
                      //  configData.COMMON_MEDIA_LINK_URL +
                      //   "/dynamichomepage/" +
                        sliderImage[3].img
                      : pics3
                  }
                  id="slider4"
                  editIconStyle={editIconStyle}
                  handleSliderImages={handleSliderImages}
                  index={3}
                  LableImg={pics4}
                  htmlFor="sliderinputimagefour"
                />

                <ImportImgFile
                  image={
                    sliderImage[4].img
                      ?
                      //  configData.COMMON_MEDIA_LINK_URL +
                      //   "/dynamichomepage/" +
                        sliderImage[4].img
                      : pics3
                  }
                  id="slider5"
                  editIconStyle={editIconStyle}
                  handleSliderImages={handleSliderImages}
                  index={4}
                  LableImg={pics4}
                  htmlFor="sliderinputimagefive"
                />

                <ImportImgFile
                  image={
                    sliderImage[5].img
                      ? 
                      // configData.COMMON_MEDIA_LINK_URL +
                      //   "/dynamichomepage/" +
                        sliderImage[5].img
                      : pics3
                  }
                  id="slider6"
                  editIconStyle={editIconStyle}
                  handleSliderImages={handleSliderImages}
                  index={5}
                  LableImg={pics4}
                  htmlFor="sliderinputimagesix"
                />
              </div>
              {/* ========== Static images =================== */}
              <h3 className="post_slider_heading_div">Image 2</h3>
              <ImportImgFile
                image={
                  seccondaryImage
                    ?
                    //  configData.COMMON_MEDIA_LINK_URL +
                    //   "/dynamichomepage/" +
                      seccondaryImage
                    : pics3
                }
                id="slider7"
                editIconStyle={editIconStyle}
                handleSliderImages={handleSlidersec}
                index={6}
                LableImg={pics4}
                htmlFor="sliderinputimageseven"
              />
            </div>
          </div>
          <hr style={{ backgroundColor: "black" }} />
          <br />
          {/* ================= feature section ============== */}
          <div
            id={`${herfLink == "feature" && herfLink}`}
            className="post_Feature_container_div"
          >
            <div className="post_Feature_div">
              <div className="post_main_div">
                <h1 className="post_Feature_update">Feature</h1>
                <button
                  className="post_Feature_button"
                  onClick={handleSaveFeature}
                >
                  Save
                </button>
              </div>
              {/* ======= Featured Image Upload ========== */}
              <div className="post_Feature_upload">
                <h5 className="post_slider_heading_div">Upload Images</h5>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  id="featureinputimageone"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleBigImageFeature(e, "featuresImg");
                  }}
                />
                <div className="post_feature_upload_div">
                  {/* {featureBigImage ? (
                    <img
                      src={featureBigImage}
                      alt="Features"
                      id="featuresImg"
                    />
                  ) : ( */}
                  <img
                    src={
                      featureBigImage
                        ? 
                        // configData.COMMON_MEDIA_LINK_URL +
                        //   "/dynamichomepage/" +
                          featureBigImage
                        : pics5
                    }
                    alt="Features"
                    id="featuresImg"
                  />
                  {/* )} */}

                  <label htmlFor="featureinputimageone">
                    <img src={pics4} alt="edit-icon" />
                  </label>
                </div>
              </div>
            </div>
            {/* ======= Featured heading / description Changes  ====== */}
            <div className="post_Feature3">
              <div className="post_Feature3_desc-div">
                <h3 className="post_Feature3-h3-div">Head Description</h3>
                <Richtext
                  setStateData={setFeatureDec}
                  //  index={index}
                  stateData={featureDec}
                  htmlContent={
                    featureDec &&
                    EditorState.createWithContent(
                      ContentState.createFromBlockArray(
                        convertFromHTML(featureDec)
                      )
                    )
                  }
                  //  editor="Question"
                  //  current="feature2"
                />
              </div>
              <label htmlFor="faqs"></label>

              {featureadd.map((singleQuestion, index) => (
                <div key={index}>
                  <ImportIconImg
                    image={
                      // isValidUrl(singleQuestion.iconPath)
                      //   ? singleQuestion.iconPath
                      //   : URL.createObjectURL(singleQuestion.iconPath)
                      singleQuestion.iconPath
                        ? 
                        // configData.COMMON_MEDIA_LINK_URL +
                        //   "/dynamichomepage/" +
                          singleQuestion.iconPath
                        : pics6
                    }
                    id={"feature" + index}
                    index={index}
                    handleimageupdate={handleimagefeature}
                    LableImg={pics4}
                    htmlFor={"featureinput" + index}
                  />

                  <div className="post_Feature3_desc-div">
                    <h3 className="post_Feature3-h3-div">Description</h3>
                    <Richtext
                      setStateData={setfeatureadd}
                      index={index}
                      stateData={featureadd}
                      htmlContent={
                        singleQuestion.featureDescription &&
                        EditorState.createWithContent(
                          ContentState.createFromBlockArray(
                            convertFromHTML(singleQuestion.featureDescription)
                          )
                        )
                      }
                      //  editor="Question"
                      current="feature1"
                    />
                    <br />
                    <ButtonAddRemove
                      handleAdd={handleFeature}
                      handleRemove={handleFeatureDelete}
                      initialState={featureadd}
                      index={index}
                    />
                  </div>
                  {featureadd.length - 1 === index ? null : <hr />}
                </div>
              ))}
            </div>
          </div>
          <hr style={{ backgroundColor: "black" }} />
          <br />
          {/* =========== Update section =============== */}
          <div
            id={`${herfLink == "update" && herfLink}`}
            className="post_Feature_container_div"
          >
            <div className="post_Feature_div">
              <div className="post_main_div">
                <h1 className="post_Feature_update">UPDATES</h1>
                <button
                  className="post_Feature_button"
                  onClick={handleSaveUpdate}
                >
                  Save
                </button>
              </div>
              <div className="post_Feature2">
                <h5 className="post_slider_heading_div">Update Images</h5>
                <div>
                  <ImportImgFile
                    image={
                      updateImage[0].img
                        ?
                        //  configData.COMMON_MEDIA_LINK_URL +
                        //   "/dynamichomepage/" +
                          updateImage[0].img
                        : pics3
                    }
                    id="UpdateImg1"
                    editIconStyle={editIconStyle}
                    handleSliderImages={handleimageUpdatebig}
                    index={0}
                    LableImg={pics4}
                    htmlFor="updateinputimageone"
                  />

                  <ImportImgFile
                    image={
                      updateImage[1].img
                        ? 
                        // configData.COMMON_MEDIA_LINK_URL +
                        //   "/dynamichomepage/" +
                          updateImage[1].img
                        : pics3
                    }
                    id="UpdateImg2"
                    editIconStyle={editIconStyle}
                    handleSliderImages={handleimageUpdatebig}
                    index={1}
                    LableImg={pics4}
                    htmlFor="updateinputimagetwo"
                  />

                  <ImportImgFile
                    image={
                      updateImage[2].img
                        ?
                        //  configData.COMMON_MEDIA_LINK_URL +
                        //   "/dynamichomepage/" +
                          updateImage[2].img
                        : pics3
                    }
                    id="UpdateImg3"
                    editIconStyle={editIconStyle}
                    handleSliderImages={handleimageUpdatebig}
                    index={2}
                    LableImg={pics4}
                    htmlFor="updateinputimagethree"
                  />
                </div>
              </div>
            </div>
            {/* ============================================ */}
            <div className="post_Feature3">
              <label htmlFor="faqs"></label>
              {updateadd.map((singleQuestion, index) => (
                <div key={index}>
                  <ImportIconImg
                    image={
                      singleQuestion.iconPath
                        ? 
                        // configData.COMMON_MEDIA_LINK_URL +
                        //   "/dynamichomepage/" +
                          singleQuestion.iconPath
                        : pics6
                    }
                    id={"update" + index}
                    index={index}
                    handleimageupdate={handleimageupdate}
                    LableImg={pics4}
                    htmlFor={"updateinputimagethree" + index}
                  />

                  <div className="post_Feature3_desc-div">
                    <h3 className="post_Feature3-h3-div">Description</h3>
                    <Richtext
                      setStateData={setUpdateadd}
                      index={index}
                      stateData={updateadd}
                      //  editor="Question"
                      htmlContent={
                        singleQuestion.updateDescription &&
                        EditorState.createWithContent(
                          ContentState.createFromBlockArray(
                            convertFromHTML(singleQuestion.updateDescription)
                          )
                        )
                      }
                      current="update"
                    />
                    <br />
                    <ButtonAddRemove
                      handleAdd={handleUpdate}
                      handleRemove={handleUpdateDelete}
                      initialState={updateadd}
                      index={index}
                    />
                  </div>
                  {updateadd.length - 1 === index ? null : <hr />}
                </div>
              ))}
            </div>
          </div>
          <hr style={{ backgroundColor: "black" }} />
          <br />
          {/* ========= Services Section start ============== */}
          <div
            id={`${herfLink == "service" && herfLink}`}
            className="post_Feature_container_div"
          >
            <div className="post_Feature_div">
              <div className="post_main_div">
                <h1 className="post_Feature_update">Services</h1>
                <button
                  className="post_Feature_button"
                  onClick={handleSaveService}
                >
                  Save
                </button>
              </div>
              <div className="post_Feature_upload">
                <h5 className="post_slider_heading_div">Upload Images</h5>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  id="serviceinputimageone"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleimageservicebig(e, "serviceImage");
                  }}
                />
                <div className=" d-flex post_feature_upload_div">
                  {/* {isValidUrl(serviceBigImg) ? (
                    <img src={serviceBigImg} alt="services" id="serviceImage" />
                  ) : ( */}
                  <img
                    src={
                      // serviceBigImg
                      //   ? URL.createObjectURL(serviceBigImg)
                      //   : pics7
                      serviceBigImg
                        ? 
                        // configData.COMMON_MEDIA_LINK_URL +
                        //   "/dynamichomepage/" +
                          serviceBigImg
                        : pics7
                    }
                    alt="services"
                    id="serviceImage"
                  />
                  {/* )} */}

                  <label htmlFor="serviceinputimageone">
                    <img src={pics4} alt="edit-icon" />
                  </label>
                </div>
              </div>
            </div>
            <div className="post_Feature3">
              <label htmlFor="faqs"></label>
              {servicadd.map((singleQuestion, index) => (
                <div key={index}>
                  <ImportIconImg
                    image={
                      singleQuestion.iconPath
                        ?
                        //  configData.COMMON_MEDIA_LINK_URL +
                        //   "/dynamichomepage/" +
                          singleQuestion.iconPath
                        : pics6
                    }
                    id={"seerviceIcon" + index}
                    index={index}
                    handleimageupdate={handleimageservice}
                    LableImg={pics4}
                    htmlFor={"serviceinputimag" + index}
                  />

                  <div className="post_Feature3_desc-div">
                    <h3 className="post_Feature3-h3-div">Description</h3>
                    <Richtext
                      setStateData={setServicadd}
                      index={index}
                      stateData={servicadd}
                      htmlContent={
                        singleQuestion.serviceTitle &&
                        EditorState.createWithContent(
                          ContentState.createFromBlockArray(
                            convertFromHTML(singleQuestion.serviceTitle)
                          )
                        )
                      }
                      current="service"
                    />
                    <br />
                    <ButtonAddRemove
                      handleAdd={handleServic}
                      handleRemove={handleServicDelete}
                      initialState={servicadd}
                      index={index}
                    />
                  </div>
                  {servicadd.length - 1 === index ? null : <hr />}
                </div>
              ))}
            </div>
          </div>
          <hr style={{ backgroundColor: "black" }} />
          {/* ============ Testimonial section =============== */}
          <br />
          <div
            id={`${herfLink == "testimonials" && herfLink}`}
            className="post_Feature_container_div"
          >
            <div className="post_Feature_div">
              <div className="post_main_div">
                <h1 className="post_Feature_update">Testimony</h1>
                <button
                  className="post_Feature_button"
                  onClick={handleSaveTestimony}
                >
                  Save
                </button>
              </div>
              <div className="post_Feature_upload">
                <h5 className="post_slider_heading_div">Upload Images</h5>
                <label htmlFor="faqs"></label>
                {testiadd.map((singleQuestion, index) => (
                  <div key={index}>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      id={"testinputimage" + index}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleimagetesti(
                          e,
                          "testimonial_profile_" + index,
                          index
                        );
                      }}
                    />
                    <div style={{ marginBottom: "130px" }}>
                      {/* {isValidUrl(singleQuestion.testimonyImagePath) ? (
                        <img
                          src={singleQuestion.testimonyImagePath}
                          id={"testimonial_profile_" + index}
                          alt="Testimonial_Image"
                          className="post_feature_uploadcircle_div"
                        />
                      ) : ( */}
                      <img
                        src={
                          // singleQuestion.testimonyImagePath === ""
                          //   ? URL.createObjectURL(
                          //       singleQuestion.testimonyImagePath
                          //     )
                          //   : pics8

                          singleQuestion.testimonyImagePath
                            ?
                            //  configData.COMMON_MEDIA_LINK_URL +
                            //   "/dynamichomepage/" +
                              singleQuestion.testimonyImagePath
                            : pics8
                        }
                        id={"testimonial_profile_" + index}
                        alt="Testimonial_Image"
                        className="post_feature_uploadcircle_div"
                      />
                      {/* )} */}
                      {/* <img
                        src={
                          singleQuestion.testimonyImagePath
                            ? singleQuestion.testimonyImagePath
                            : pics8
                        }
                        id={"testimonial_profile_" + index}
                        alt="Testimonial_Image"
                        className="post_feature_uploadcircle_div"
                      /> */}
                      <label htmlFor={"testinputimage" + index}>
                        <img
                          src={pics4}
                          alt="edit-icon"
                          style={{
                            width: "30px",
                            position: "absolute",
                            margin: "45px 0px 0px -45px",
                            borderRadius: "5px",
                          }}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="post_Feature3">
              <label htmlFor="faqs"></label>
              {testiadd.map((singleQuestion, index) => (
                <div key={index}>
                  <div className="post_Feature3_desc-div">
                    <h3 className="post_Feature3-h3-div">Description</h3>
                    <Richtext
                      setStateData={setTestiadd}
                      index={index}
                      stateData={testiadd}
                      htmlContent={
                        singleQuestion.testimonyDescription &&
                        EditorState.createWithContent(
                          ContentState.createFromBlockArray(
                            convertFromHTML(singleQuestion.testimonyDescription)
                          )
                        )
                      }
                      current="Testimony"
                    />
                    <br />
                    <ButtonAddRemove
                      handleAdd={handleTesti}
                      handleRemove={handleTestiDelete}
                      initialState={testiadd}
                      index={index}
                    />
                  </div>
                  {testiadd.length - 1 === index ? null : <hr />}
                </div>
              ))}
            </div>
          </div>
          <hr style={{ backgroundColor: "black" }} />
          {/* =============== FAQ start ==================== */}
          <br />
          <div
            id={`${herfLink == "faq" && herfLink}`}
            className="post_Feature_container_div"
          >
            <div className="post_Feature_div">
              <div className="post_main_div">
                <h1 className="post_Feature_update">FAQs</h1>
                <button
                  className="post_Feature_button"
                  onClick={handleSaveFaqs}
                >
                  Save
                </button>
              </div>
              <div className="post_Feature_upload">
                <h5 className="post_slider_heading_div">Upload Images</h5>
              </div>
            </div>
            <div className="post_Feature3">
              <label htmlFor="faqs"></label>
              {faq.map((singleQuestion, index) => (
                <div key={index}>
                  <div className="post_Feature3_desc-div">
                    <h3 className="post_Feature3-h3-div">Question</h3>
                    <Richtext
                      setStateData={setFaqs}
                      index={index}
                      stateData={faq}
                      editor="Question"
                      current="faqs"
                      htmlContent={
                        singleQuestion.Qus &&
                        EditorState.createWithContent(
                          ContentState.createFromBlockArray(
                            convertFromHTML(singleQuestion.Qus)
                          )
                        )
                      }
                    />
                    <br />
                  </div>
                  <div className="post_Feature3_desc-div">
                    <h3 className="post_Feature3-h3-div">Answers</h3>
                    <Richtext
                      setStateData={setFaqs}
                      index={index}
                      stateData={faq}
                      editor="Answer"
                      current="faqs"
                      htmlContent={
                        singleQuestion.Ans &&
                        EditorState.createWithContent(
                          ContentState.createFromBlockArray(
                            convertFromHTML(singleQuestion.Ans)
                          )
                        )
                      }
                    />
                    <br />
                    <ButtonAddRemove
                      handleAdd={handleFaqAdd}
                      handleRemove={handleFaqAddDelete}
                      initialState={faq}
                      index={index}
                    />
                  </div>
                  {faq.length - 1 === index ? null : <hr />}
                </div>
              ))}
            </div>
          </div>
          <hr />
        </div>
      ) : (
        <h3 style={{ margin: "30px 0px" }}>
          If you want to Edit the Home Page Then turn ON the Toggle button!
        </h3>
      )}
    </div>
  );
};

export default Post;
