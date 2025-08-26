import React, { useState, useCallback, useEffect } from "react";
import StepProgressBar from "./RhombusBar/StepProgressBar";
import BasicDetails from "./BasicDetails";
import LocationDetails from "./LocationDetails";
import PropertyPhoto from "./PropertyPhoto";
import PricingAndOthers from "./PricingAndOthers";
import PropertyProfile from "./propertyProfileComponents/PropertyProfile";
import PGpricingAndOthers from "./PGpricingAndOthers";
import Nav from "../Home/Nav/Nav";
import PRS from "./css/PostPropertyStyle.module.css";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose } from "react-icons/ai";
import Discart from "./propertyProfileComponents/Discart";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../config/API";
import { ToastContainer, toast } from "react-toastify";
import configData from "../../config/config.json";
import { Base64, imageKit, useQuery } from "../../config/Helper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostProperty() {
  // ----------- RhombusBar Component States and Actions ------------------

  const [currentStep, updateCurrentStep] = useState(1);
  const [discard, setDiscart] = useState(false);
  const [basicRes, setBasicRes] = useState("");
  const [inCom, setInCom] = useState("");
  const [typeOfProperty, setTypeOfProperty] = useState("");
  console.log("====basicRes=======>", basicRes);
  let query = useQuery();

  // ---------------------------getAdminToken------------------------------------
  const adminGetToken = JSON.parse(localStorage.getItem("accessToken"));
  // const _id = adminGetToken && adminGetToken.response._id;
  const token = adminGetToken && adminGetToken.response.token;
  // console.log("basicRes,token-----------------", basicRes);
  // console.log("AdminToken-----------------", _id);
  const navigate = useNavigate();

  const labelArray = [
    "Basic Details",
    "Location Details",
    "Property Profile",
    "Photos",
    "Pricing & Others",
  ];
  // ------ default object for property_profile_info in state
  let property_profile_info = {
    room_details: {
      no_of_bedrooms: "0",
      no_of_bathrooms: "0",
      no_of_balconies: "0",
    },
    area_details: {
      carpet_area: "",
      area_unit: "",
    },
    other_rooms_details: [],

    furnishing_details: {
      furnishing_type: "",
      furnishing_items: [
        // { name: "Light", count: 0, isAvilable: null },
        // { name: "AC", count: null, isAvilable: true },
        // { name: "Beds", count: 0, isAvilable: null },
        // { name: "Geyser", count: 0, isAvilable: null },
        // { name: "Fans", count: 0, isAvilable: null },
        // { name: "Wardrobe", count: 0, isAvilable: null },
        // { name: "Stove", count: 0, isAvilable: null },
        // { name: "Washing Machine", count: null, isAvilable: true },
        // { name: "Sofa", count: null, isAvilable: true },
        // { name: "Dinning Table", count: null, isAvilable: false },
        // { name: "Modular Kitchen", count: null, isAvilable: true },
      ],
    },

    parking_details: {
      cover_parking: 0,
      open_parking: 0,
    },
    floor_details: {
      total_no_floor: "",
      property_on_floor: "",
    },
    availibility_details: {
      availibility_status: "",
      // adding dynamically -> age of property or -> expected by time
    },
  };

  // default object for pricing and others section----------------
  const pricing_and_others_details = {
    ownership_details: "",
    price_details: {
      expected_price: "",
      price_per_sqrft: "",
      all_inclusive_price: true,
      tax_gov_charges_excluded: false,
      price_negotiable: false,
    },
    additional_pricing_details: {
      maintenance_details: {
        maintenance_price: "",
        maintenance_duration: "",
      },
      booking_price: "",
      annual_dues_payable: "",
    },
    some_house_rules: {
      pets_allow: "",
      visitors_allow: "",
      smaoking_allow: "",
      alcohol_allow: "",
      party_allow: "",
      last_entry_time: "",
      another_rule: "",
    },
    property_unique_description: "",
    firesale: false,
    reraNumber: "",
  };

  // --------------------------- All Component States ---------------------
  const [postPropertyInfo, setPostPropertyInfo] = useState({
    basic_details: {
      idd: "",
      purpose_of_listing: "",
      property_type: "",
      property_type_value: "",
      property_sub_type: "",
    },
    // --------------------------
    user_address: {
      apartmentAndSociety: "",
      area: "",
      city: "",
      district: "",
      formatted_address: "",
      houseName: "",
      houseNumber: "",
      lat: "",
      lng: "",
      locality: "",
      pincode: "",
      poi: "",
      poi_dist: "",
      state: "",
      street: "",
      street_dist: "",
      subDistrict: "",
      subLocality: "",
      subSubLocality: "",
      village: "",
    },
    // -----------------------------
    property_profile_info: property_profile_info,
    // ---------------------------------------

    list_of_images: [
      {
        image: "",
        image_type: "",
        cover_image: false,
      },
    ],

    // ----------------------------------------------
    pricing_and_others_details: {
      ...pricing_and_others_details,
    },
  });
  console.log("postPropertyInfo==========>", postPropertyInfo);
  let updateStep = (step) => {
    if (query.get("propertyId")) {
      if (step >= 2 && step <= 5) {
        updateCurrentStep(step);
      }
      if (step == 1) {
        toast.warning("Sorry,You cannot able to edit basic details");
      }
    } else {
      if (step >= 1 && step <= 5) {
        updateCurrentStep(step);
      }
    }
  };
  let updateStepProgress = (step) => {
    if (query.get("propertyId")) {
      if (step >= 2 && step <= 5) {
        updateCurrentStep(step);
      }
      if (step == 1) {
        toast.warning("Sorry,You cannot able to edit basic details");
      }
    } else {
      if (currentStep > 1) {
        if (step >= 1 && step <= 5) {
          updateCurrentStep(step);
        }
      } else {
        toast.warning("Please select all basic details and click on Continue");
      }
    }
  };

  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!query.get("propertyId")) {
      if (postPropertyInfo.basic_details.purpose_of_listing === "PG") {
        setPostPropertyInfo((olditems) => {
          return {
            ...olditems,
            property_profile_info: {
              room_details: {
                no_of_bedrooms: "0",
                no_of_bathrooms: "0",
                no_of_balconies: "0",
              },
              room_type: "",
              no_of_room_partners: "",
              //dynamically adding no. of people in sharing rooms.
              capacity_and_availability: {
                total_no_of_beds: "",
                no_of_beds_available: "",
                attached_bathroom: false,
                attached_balcony: false,
              },
              other_rooms_details: [],
              furnishing_details: {
                furnishing_type: "",
                furnishing_items: [
                  ...property_profile_info.furnishing_details.furnishing_items,
                ],
              },
              parking_details: {
                cover_parking: 0,
                open_parking: 0,
              },
              floor_details: {
                total_no_floor: "",
                property_on_floor: "",
              },
              available_for: "",
              suitable_for: {
                students: false,
                working_professionals: false,
              },
            },
            pricing_and_others_details: {
              pg_rent: "",
              security_deposite: {
                security_deposite_type: "",
                //amount value adding according to type choosen by user at runtime
              },
              food_details: {
                food_availability: "",
                // all information addind according to user choosen at runtime
              },
              available_for: "",
              some_house_rules: {
                pets_allow: "",
                visitors_allow: "",
                smaoking_allow: "",
                alcohol_allow: "",
                party_allow: "",
                last_entry_time: "",
                another_rule: "",
              },
              property_unique_description: "",
              firesale: false,
            },
          };
        });
      } else {
        setPostPropertyInfo((olditems) => {
          return {
            ...olditems,
            property_profile_info: {
              ...postPropertyInfo.property_profile_info,
            },
            pricing_and_others_details: {
              ...pricing_and_others_details,
            },
          };
        });
      }
    }
  }, [postPropertyInfo.basic_details.purpose_of_listing]);

  // ------------------ Property photo component State and action -----------------
  const [list_of_images, set_list_of_images] = useState([]);
  const [list_of_images_upload, set_list_of_images_upload] = useState([]);
  const [updateImg, setUpdateImg] = useState([
    // {
    //     isCoverImage: false,
    //     name: "",
    //     propertyImage:  "https://ik.imagekit.io/ramcoder/PostProperty/Screenshot_from_2023-07-25_11-24-03_cMPHJZotY.png",
    // },
  ]);

  const [manageDrag, setManageDrag] = useState(true);
  const [coverImage, setCoverImage] = useState("");
  const [imagesInfo, setImageInfo] = useState([]);
  const [priceUnit, setPriceUnit] = useState("");
  console.log("updateImg", updateImg);
  console.log("coverImage===>", coverImage);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);

  const [storeImg, setStoreImg] = useState([
    { propertyImage: "", name: "", isCoverImage: false },
  ]);

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      // console.log("-----------------------------------------", file);

      uploadImage(file);

      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        // console.log("binaryStr=========>", binaryStr);

        set_list_of_images((i) => [...i, binaryStr]);
        setManageDrag(false);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  // console.log("onDrop==============================>",onDrop);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const uploadImage = async (file) => {
    const folderPath = "PostProperty";
    let imagekitresponse = await imageKit(file, folderPath);
    if (imagekitresponse) {
      set_list_of_images_upload((i) => [...i, imagekitresponse]);
      const ImageInformation = {
        isCoverImage: false,
        name: "",
        propertyImage: imagekitresponse,
      };
      setUpdateImg((i) => [...i, ImageInformation]);
    }
  };

  const propertyPhotoRes = async () => {
    // const UploadImgs = [];
    const AllData = [...updateImg];
    AllData.forEach((ele, index) => {
      if (coverImage === index) {
        AllData[index].isCoverImage = true;
      } else {
        AllData[index].isCoverImage = false;
      }
    });
    console.log("AllData=>", AllData);
    // let imgIndex = 0;
    // for (let cur_ele of AllData) {
    //   let imgDet = {
    //     propertyImage: cur_ele.propertyImage,
    //     name: cur_ele.name,
    //     isCoverImage: cur_ele.isCoverImage,
    //   };
    //   UploadImgs.push(imgDet);
    //   imgIndex += 1;
    // }
    // console.log(UploadImg);
    // // const formData = new FormData();
    const ProfileData = {
      _id: basicRes,
      step: "uploadImages",
      uploadImages: AllData,
    };
    console.log(ProfileData);
    // formData.append("data", JSON.stringify(ProfileData));

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.POST_PROPERTY_POST_DETAILS_URL,
      ProfileData,
      token
    );
    console.log(ResBasic);
    if (ResBasic) {
      if (ResBasic.success === true) {
        toast.success(ResBasic.message);
        updateStep(5);
        // setBasicRes(ResBasic.res&&ResBasic.res._id);
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };

  // console.log("getRootProps====>", isDragActive);
  //----------------------handle  Discart------------------

  const handleDiscart = async () => {
    setDiscart(false);
    updateCurrentStep(1);
    let resDiscart = await API_REQ_POST_WITH_TOKEN(
      configData.DISCART_POSTPROPERTY_URL,
      { _id: inCom && inCom._id },
      token
    );
    console.log(resDiscart);
    if (resDiscart) {
      if (resDiscart.success === true) {
        setDiscart(false);
        updateCurrentStep(1);
        toast.success(resDiscart.message);
      } else {
        toast.warning(resDiscart.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  const handleContinue = async () => {
    if (inCom.step === "basicdetails") {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          basic_details: {
            purpose_of_listing:
              inCom.basicdetails.typeOfBusiness.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfBusiness.slice(1),
            property_type:
              inCom.basicdetails.typeOfProperty.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfProperty.slice(1),
            property_type_value:
              inCom.basicdetails.catagory.charAt(0).toUpperCase() +
              inCom.basicdetails.catagory.slice(1),
            property_sub_type: inCom.basicdetails.subCatagory,
          },
        };
      });
      updateCurrentStep(2);
      setBasicRes(inCom._id);
      setDiscart(false);
    } else if (inCom.step === "location") {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          basic_details: {
            purpose_of_listing:
              inCom.basicdetails.typeOfBusiness.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfBusiness.slice(1),
            property_type:
              inCom.basicdetails.typeOfProperty.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfBusiness.slice(1),
            property_type_value:
              inCom.basicdetails.catagory.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfBusiness.slice(1),
            property_sub_type: inCom.basicdetails.subCatagory,
          },
          user_address: {
            apartmentAndSociety: inCom.location.apartmentAndSocity,
            area: "",
            city: inCom.location.city,
            district: "",
            formatted_address: "",
            houseName: "",
            houseNumber: inCom.location.houseNumber,
            lat: "",
            lng: "",
            locality: inCom.location.locality,
            pincode: "",
            poi: "",
            poi_dist: "",
            state: "",
            street: "",
            street_dist: "",
            subDistrict: "",
            subLocality: inCom.location.subLocality,
            subSubLocality: "",
            village: "",
          },
        };
      });

      updateCurrentStep(3);
      setBasicRes(inCom._id);
      setDiscart(false);
    } else if (inCom.step === "aboutproperty") {
      const property_profile = {
        room_details: {
          no_of_bedrooms: inCom.aboutproperty.roomDetails.noOfBedRooms,
          no_of_bathrooms: inCom.aboutproperty.roomDetails.noOfBathRooms,
          no_of_balconies: inCom.aboutproperty.roomDetails.noOfBalconies,
        },
        area_details: {
          carpet_area: inCom.aboutproperty.carpetArea,
          area_unit: inCom.aboutproperty.areaMessurementUnit,
        },
        other_rooms_details: inCom.aboutproperty.othersRoom,

        furnishing_details: {
          furnishing_type: inCom.aboutproperty.furnishingType,
          furnishing_items: inCom.aboutproperty.option,
        },
        parking_details: {
          cover_parking:
            inCom.aboutproperty.reservedParking.CoveredParking.noOfParking,
          open_parking:
            inCom.aboutproperty.reservedParking.OpenParking.noOfParking,
        },
        floor_details: {
          total_no_floor: inCom.aboutproperty.FloorDetails.totalNoOfFloor,
          property_on_floor: inCom.aboutproperty.FloorDetails.whichFloor,
        },
        availibility_details: {
          availibility_status: inCom.aboutproperty.availability.status,
          age_of_property: inCom.aboutproperty.availability.ageOfProperty
            ? inCom.aboutproperty.availability.ageOfProperty
            : "",
          expected_by: inCom.aboutproperty.availability.possessionBy
            ? inCom.aboutproperty.availability.possessionBy
            : "",
        },
      };
      console.log("property_profile_info----------->", property_profile);
      // -------------------------------------------------------------------------
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          basic_details: {
            purpose_of_listing:
              inCom.basicdetails.typeOfBusiness.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfBusiness.slice(1),
            property_type:
              inCom.basicdetails.typeOfProperty.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfBusiness.slice(1),
            property_type_value:
              inCom.basicdetails.catagory.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfBusiness.slice(1),
            property_sub_type: inCom.basicdetails.subCatagory,
          },
          // ------------------------------------
          user_address: {
            apartmentAndSociety: inCom.location.apartmentAndSocity,
            area: "",
            city: inCom.location.city,
            district: "",
            formatted_address: "",
            houseName: "",
            houseNumber: inCom.location.houseNumber,
            lat: "",
            lng: "",
            locality: inCom.location.locality,
            pincode: "",
            poi: "",
            poi_dist: "",
            state: "",
            street: "",
            street_dist: "",
            subDistrict: "",
            subLocality: inCom.location.subLocality,
            subSubLocality: "",
            village: "",
          },
          // ------------------------------------------
          property_profile_info: property_profile,
        };
      });

      updateCurrentStep(4);
      setBasicRes(inCom._id);
      setDiscart(false);
    } else if (inCom.step === "uploadImages") {
      let property_profile_info = {
        room_details: {
          no_of_bedrooms: inCom.aboutproperty.roomDetails.noOfBedRooms,
          no_of_bathrooms: inCom.aboutproperty.roomDetails.noOfBathRooms,
          no_of_balconies: inCom.aboutproperty.roomDetails.noOfBalconies,
        },
        area_details: {
          carpet_area: inCom.aboutproperty.carpetArea,
          area_unit: inCom.aboutproperty.areaMessurementUnit,
        },
        other_rooms_details: inCom.aboutproperty.othersRoom,

        furnishing_details: {
          furnishing_type: inCom.aboutproperty.furnishingType,
          furnishing_items: inCom.aboutproperty.option,
        },
        parking_details: {
          cover_parking:
            inCom.aboutproperty.reservedParking.CoveredParking.noOfParking,
          open_parking:
            inCom.aboutproperty.reservedParking.OpenParking.noOfParking,
        },
        floor_details: {
          total_no_floor: inCom.aboutproperty.FloorDetails.totalNoOfFloor,
          property_on_floor: inCom.aboutproperty.FloorDetails.whichFloor,
        },
        availibility_details: {
          availibility_status: inCom.aboutproperty.availability.status,
          age_of_property: inCom.aboutproperty.availability.ageOfProperty
            ? inCom.aboutproperty.availability.ageOfProperty
            : "",
          expected_by: inCom.aboutproperty.availability.possessionBy
            ? inCom.aboutproperty.availability.possessionBy
            : "",
        },
      };
      console.log(property_profile_info);
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          basic_details: {
            purpose_of_listing:
              inCom.basicdetails.typeOfBusiness.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfBusiness.slice(1),
            property_type:
              inCom.basicdetails.typeOfProperty.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfBusiness.slice(1),
            property_type_value:
              inCom.basicdetails.catagory.charAt(0).toUpperCase() +
              inCom.basicdetails.typeOfBusiness.slice(1),
            property_sub_type: inCom.basicdetails.subCatagory,
          },
          // ------------------------------------
          user_address: {
            apartmentAndSociety: inCom.location.apartmentAndSocity,
            area: "",
            city: inCom.location.city,
            district: "",
            formatted_address: "",
            houseName: "",
            houseNumber: inCom.location.houseNumber,
            lat: "",
            lng: "",
            locality: inCom.location.locality,
            pincode: "",
            poi: "",
            poi_dist: "",
            state: "",
            street: "",
            street_dist: "",
            subDistrict: "",
            subLocality: inCom.location.subLocality,
            subSubLocality: "",
            village: "",
          },
          // ------------------------------------------
          property_profile_info: {
            ...property_profile_info,
            // ...postPropertyInfo.property_profile_info,
            // room_details: {
            //   no_of_bedrooms: "",
            //   no_of_bathrooms: "",
            //   no_of_balconies: "",
            // },
            // area_details: {
            //   carpet_area: inCom.aboutproperty.carpetArea,
            //   area_unit: inCom.aboutproperty.areaMessurementUnit,
            // },
            // other_rooms_details: inCom.aboutproperty.othersRoom,

            // furnishing_details: {
            //   furnishing_type: inCom.aboutproperty.furnishingType,
            //   furnishing_items: inCom.aboutproperty.option,
            // },
            // parking_details: {
            //   cover_parking:
            //     inCom.aboutproperty.reservedParking.CoveredParking.noOfParking,
            //   open_parking:
            //     inCom.aboutproperty.reservedParking.OpenParking.noOfParking,
            // },
            // floor_details: {
            //   total_no_floor: inCom.aboutproperty.FloorDetails.totalNoOfFloor,
            //   property_on_floor: inCom.aboutproperty.FloorDetails.whichFloor,
            // },
            // availibility_details: {
            //   availibility_status: inCom.aboutproperty.availability.status,
            //   age_of_property: inCom.aboutproperty.availability.ageOfProperty
            //     ? inCom.aboutproperty.availability.ageOfProperty
            //     : "",
            //   expected_by: inCom.aboutproperty.availability.possessionBy
            //     ? inCom.aboutproperty.availability.possessionBy
            //     : "",
            // },
          },
        };
      });
      // setStoreImg(inCom.uploadImages);
      updateCurrentStep(5);
      setBasicRes(inCom._id);
      setDiscart(false);
    }
  };
  // ------------------get property by id------------------------------
  const getCasesPropertyId = async () => {
    if (query.get("propertyId")) {
      let ApiRes = await API_REQ_GET(
        configData.GET_ALL_PROPERTY_BY_PROPERTY_ID_URL +
          `/${query.get("propertyId")}`,
        userToken
      );
      console.log(ApiRes);
      if (ApiRes) {
        if (ApiRes.success === "true") {
          // toast.success(ApiRes.message);
          setBasicRes(ApiRes.property._id);
          const alldata = [...ApiRes.property.uploadImages];
          setUpdateImg(ApiRes.property.uploadImages);
          alldata.forEach((ele, index) => {
            if (ele.isCoverImage === true) {
              setCoverImage(index);
            }
          });
          let imageName = [];
          for (let ele of alldata) {
            const ImageName = ele.name;
            imageName.push(ImageName);
          }
          setImageInfo(imageName);
          updateCurrentStep(2);

          if (ApiRes && ApiRes.property.basicdetails.typeOfBusiness === "pg") {
            const basicDetails = {
              idd: ApiRes.property._id,
              purpose_of_listing:
                ApiRes.property.basicdetails.typeOfBusiness.toUpperCase(),
              property_type:
                ApiRes.property.basicdetails.typeOfProperty
                  .charAt(0)
                  .toUpperCase() +
                ApiRes.property.basicdetails.typeOfProperty.slice(1),
              property_type_value: ApiRes.property.basicdetails.catagory,
              property_sub_type: ApiRes.property.basicdetails.subCatagory,
              _id: ApiRes.property._id,
            };

            //---------------------------------
            const property_profile_infoo = {
              room_details: {
                no_of_bedrooms:
                  ApiRes &&
                  ApiRes.property.aboutproperty.roomDetails.noOfBedRooms
                    ? ApiRes.property.aboutproperty.roomDetails.noOfBedRooms
                    : 0,
                no_of_bathrooms: ApiRes.property.aboutproperty.roomDetails
                  .noOfBathRooms
                  ? ApiRes.property.aboutproperty.roomDetails.noOfBathRooms
                  : 0,
                no_of_balconies: ApiRes.property.aboutproperty.roomDetails
                  .noOfBalconies
                  ? ApiRes.property.aboutproperty.roomDetails.noOfBalconies
                  : 0,
              },
              room_type: ApiRes.property.aboutproperty.roomDetails.roomTypes
                ? ApiRes.property.aboutproperty.roomDetails.roomTypes
                : "",
              no_of_room_partners: `${ApiRes.property.aboutproperty.roomDetails.howManyPeople}`,
              capacity_and_availability: {
                total_no_of_beds:
                  ApiRes.property.aboutproperty.capacityAndAvailability.noOfBed,
                no_of_beds_available:
                  ApiRes.property.aboutproperty.capacityAndAvailability
                    .noOfBedsAvailable,
                attached_bathroom:
                  ApiRes.property.aboutproperty.attachedBathroom,
                attached_balcony: ApiRes.property.aboutproperty.attachedBalcony,
              },
              other_rooms_details: ApiRes.property.aboutproperty.othersRoom,
              furnishing_details: {
                furnishing_type:
                  ApiRes.property.aboutproperty.furnishingType
                    .charAt(0)
                    .toUpperCase() +
                  ApiRes.property.aboutproperty.furnishingType.slice(1),
                furnishing_items: ApiRes.property.aboutproperty.option,
              },
              parking_details: {
                cover_parking:
                  ApiRes.property.aboutproperty.reservedParking.CoveredParking
                    .noOfParking,
                open_parking:
                  ApiRes.property.aboutproperty.reservedParking.OpenParking
                    .noOfParking,
              },
              floor_details: {
                total_no_floor:
                  ApiRes.property.aboutproperty.FloorDetails.totalNoOfFloor,
                property_on_floor:
                  ApiRes.property.aboutproperty.FloorDetails.whichFloor,
              },
              available_for: ApiRes.property.aboutproperty.availableFor,
              suitable_for: {
                students: true,
                students:
                  ApiRes.property.aboutproperty.suitablefor[0] == "student"
                    ? true
                    : false,
                working_professionals:
                  ApiRes.property.aboutproperty.suitablefor[1] == "working prof"
                    ? true
                    : false,
              },
            };
            //-------------------------------------------

            console.log(
              "property_profile_infooxxxxxxxxxxx=>>>",
              property_profile_infoo
            );

            const pricing_and_others_detail = {
              pg_rent: ApiRes.property.pricinganddetails.rentDetails,
              security_deposite: {
                security_deposite_type:
                  ApiRes.property.pricinganddetails.securityDepositeScheme,
                fixed_deposite_value: ApiRes.property.pricinganddetails
                  .securityDepositeAmmount
                  ? ApiRes.property.pricinganddetails.securityDepositeAmmount
                  : "",
                no_of_months: ApiRes.property.pricinganddetails.noOfMonths
                  ? ApiRes.property.pricinganddetails.noOfMonths
                  : "",
                //amount value adding according to type choosen by user at runtime
              },
              food_details: {
                food_availability: ApiRes.property.pricinganddetails.foodDetails
                  ? ApiRes.property.pricinganddetails.foodDetails
                  : "",
                meal_availability_on_weekdays:
                  ApiRes.property.pricinganddetails
                    .availabilityOfMealOnWeekdays,
                meal_availability_on_weekends:
                  ApiRes.property.pricinganddetails
                    .availabilityOfMealOnWeekends,
                meal_type: ApiRes.property.pricinganddetails.mealTypes
                  ? ApiRes.property.pricinganddetails.mealTypes
                  : "",

                // all information addind according to user choosen at runtime
              },
              some_house_rules: {
                pets_allow:
                  ApiRes.property.pricinganddetails.someHouseRules
                    .petsAllowed === true
                    ? "yes"
                    : "no",
                visitors_allow:
                  ApiRes.property.pricinganddetails.someHouseRules
                    .visitorsAllowed === true
                    ? "yes"
                    : "no",
                smoking_allow:
                  ApiRes.property.pricinganddetails.someHouseRules
                    .smokingAllowed === true
                    ? "yes"
                    : "no",
                alcohol_allow:
                  ApiRes.property.pricinganddetails.someHouseRules
                    .alcoholAllowed === true
                    ? "yes"
                    : "no",
                party_allow:
                  ApiRes.property.pricinganddetails.someHouseRules
                    .partyAllowed === true
                    ? "yes"
                    : "no",
                last_entry_time: ApiRes.property.pricinganddetails.lastEntry,
                another_rule: ApiRes.property.pricinganddetails.haveAnyOtherRule
                  ? ApiRes.property.pricinganddetails.haveAnyOtherRule
                  : "ram",
              },
              property_unique_description:
                ApiRes.property.pricinganddetails.uniqueDescription,
              firesale: ApiRes.property.pricinganddetails.firesaleOrNot,
            };
            //--------------------------------------------
            setPostPropertyInfo((olditems) => {
              return {
                ...olditems,
                basic_details: basicDetails,
                // ------------------------------------
                user_address: {
                  apartmentAndSociety:
                    ApiRes.property.location.apartmentAndSocity,
                  area: "",
                  city: ApiRes.property.location.city,
                  district: "",
                  formatted_address: "",
                  houseName: "",
                  houseNumber: ApiRes.property.location.houseNumber,
                  lat: "",
                  lng: "",
                  locality: ApiRes.property.location.locality,
                  pincode: "",
                  poi: "",
                  poi_dist: "",
                  state: "",
                  street: "",
                  street_dist: "",
                  subDistrict: "",
                  subLocality: ApiRes.property.location.subLocality,
                  subSubLocality: "",
                  village: "",
                },
                // ------------------------------------------
                property_profile_info: property_profile_infoo,
                // ----------------------------------
                pricing_and_others_details: {
                  ...pricing_and_others_detail,
                },
              };
            });
          } else {
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx----->>> not pg");

            const basicDetails = {
              idd: ApiRes.property._id,
              purpose_of_listing:
                ApiRes.property.basicdetails.typeOfBusiness
                  .charAt(0)
                  .toUpperCase() +
                ApiRes.property.basicdetails.typeOfBusiness.slice(1),
              property_type:
                ApiRes.property.basicdetails.typeOfProperty
                  .charAt(0)
                  .toUpperCase() +
                ApiRes.property.basicdetails.typeOfProperty.slice(1),
              property_type_value: ApiRes.property.basicdetails.catagory,
              property_sub_type: ApiRes.property.basicdetails.subCatagory,
              _id: ApiRes.property._id,
            };
            //---------------------------------------------
            const property_profile_infoo = {
              room_details: {
                no_of_bedrooms:
                  ApiRes.property.aboutproperty.roomDetails.noOfBedRooms,
                no_of_bathrooms:
                  ApiRes.property.aboutproperty.roomDetails.noOfBathRooms,
                no_of_balconies:
                  ApiRes.property.aboutproperty.roomDetails.noOfBalconies,
              },
              area_details: {
                carpet_area: ApiRes.property.aboutproperty.carpetArea,
                area_unit: ApiRes.property.aboutproperty.areaMessurementUnit,
              },
              other_rooms_details: ApiRes.property.aboutproperty.othersRoom,

              furnishing_details: {
                furnishing_type:
                  ApiRes.property.aboutproperty.furnishingType
                    .charAt(0)
                    .toUpperCase() +
                  ApiRes.property.aboutproperty.furnishingType.slice(1),
                furnishing_items: ApiRes.property.aboutproperty.option,
              },
              parking_details: {
                cover_parking:
                  ApiRes.property.aboutproperty.reservedParking.CoveredParking
                    .noOfParking,
                open_parking:
                  ApiRes.property.aboutproperty.reservedParking.OpenParking
                    .noOfParking,
              },
              floor_details: {
                total_no_floor:
                  ApiRes.property.aboutproperty.FloorDetails.totalNoOfFloor,
                property_on_floor:
                  ApiRes.property.aboutproperty.FloorDetails.whichFloor,
              },
              availibility_details: {
                availibility_status:
                  ApiRes.property.aboutproperty.availability.status
                    .charAt(0)
                    .toUpperCase() +
                  ApiRes.property.aboutproperty.availability.status.slice(1),
                age_of_property: ApiRes.property.aboutproperty.availability
                  .ageOfProperty
                  ? ApiRes.property.aboutproperty.availability.ageOfProperty
                  : "",
                expected_by: ApiRes.property.aboutproperty.availability
                  .possessionBy
                  ? ApiRes.property.aboutproperty.availability.possessionBy
                  : "",
              },
            };
            //------------------------------------------------
            const pricing_and_others_detail = {
              ownership_details:
                ApiRes.property.pricinganddetails.ownership
                  .charAt(0)
                  .toUpperCase() +
                ApiRes.property.pricinganddetails.ownership.slice(1),
              price_details: {
                expected_price:
                  ApiRes.property.pricinganddetails.pricingDetails
                    .expectedPrice,
                price_per_sqrft:
                  ApiRes.property.pricinganddetails.pricingDetails
                    .pricePerSqrft,
                all_inclusive_price:
                  ApiRes.property.pricinganddetails.allInclusivePrice === "yes"
                    ? true
                    : false,
                tax_gov_charges_excluded:
                  ApiRes.property.pricinganddetails
                    .taxandGovtChargesExcluded === "yes"
                    ? true
                    : false,
                price_negotiable:
                  ApiRes.property.pricinganddetails.priceNegotiable === "yes"
                    ? true
                    : false,
              },
              additional_pricing_details: {
                maintenance_details: {
                  maintenance_price:
                    ApiRes.property.pricinganddetails.additionalPricingDetails
                      .Maintenance,
                  maintenance_duration: "",
                },
                booking_price:
                  ApiRes.property.pricinganddetails.additionalPricingDetails
                    .BookingPrice,
                annual_dues_payable:
                  ApiRes.property.pricinganddetails.additionalPricingDetails
                    .AnnualDuesPayable,
              },
              some_house_rules: {
                pets_allow:
                  ApiRes.property.pricinganddetails.someHouseRules
                    .petsAllowed === true
                    ? "yes"
                    : "no",
                visitors_allow:
                  ApiRes.property.pricinganddetails.someHouseRules
                    .visitorsAllowed === true
                    ? "yes"
                    : "no",
                smoking_allow:
                  ApiRes.property.pricinganddetails.someHouseRules
                    .smokingAllowed === true
                    ? "yes"
                    : "no",
                alcohol_allow:
                  ApiRes.property.pricinganddetails.someHouseRules
                    .alcoholAllowed === true
                    ? "yes"
                    : "no",
                party_allow:
                  ApiRes.property.pricinganddetails.someHouseRules
                    .partyAllowed === true
                    ? "yes"
                    : "no",
                last_entry_time: false,
                another_rule: false,
              },
              available_for: ApiRes.property.pricinganddetails.idealFor,
              property_unique_description:
                ApiRes.property.pricinganddetails.uniqueDescription,
              firesale: ApiRes.property.pricinganddetails.firesaleOrNot,
            };
            //-----------------------------------------------------------
            setPostPropertyInfo((olditems) => {
              return {
                ...olditems,
                basic_details: basicDetails,
                // ------------------------------------
                user_address: {
                  apartmentAndSociety:
                    ApiRes.property.location.apartmentAndSocity,
                  area: "",
                  city: ApiRes.property.location.city,
                  district: "",
                  formatted_address: "",
                  houseName: "",
                  houseNumber: ApiRes.property.location.houseNumber,
                  lat: "",
                  lng: "",
                  locality: ApiRes.property.location.locality,
                  pincode: "",
                  poi: "",
                  poi_dist: "",
                  state: "",
                  street: "",
                  street_dist: "",
                  subDistrict: "",
                  subLocality: ApiRes.property.location.subLocality,
                  subSubLocality: "",
                  village: "",
                },
                // ------------------------------------------
                property_profile_info: {
                  ...property_profile_infoo,
                },
                // ----------------------------------
                pricing_and_others_details: {
                  ...pricing_and_others_detail,
                },
              };
            });
            console.log(
              "xxxxxxxxxxxxxxxxxxxxxxxxxxxx----->>>",
              pricing_and_others_detail
            );
          }

          // setStoreImg(ApiRes.property.uploadImages);
        } else {
          toast.warning(ApiRes.message);
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
    // console.log("getCasesVerifyPhone==>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
      } else {
        toast.warning(ApiRes.message);
        setTimeout(() => {
          navigate("/Profile-setting", { replace: true });
        }, 2000);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  // ----------------------------------------------------
  const getCasesResidental = async () => {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_PROPERTY_SETTING_GET_URL,
      userToken
    );
    // console.log("getCasesResidental==>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        if (ApiRes.response && ApiRes.response.length > 0) {
          setTypeOfProperty(
            ApiRes?.response[0]?.typeOfProperty &&
              ApiRes?.response[0]?.typeOfProperty
          );
          for (let cur_ele of ApiRes.response[0]?.typeOfProperty) {
            if (cur_ele.name === "residential") {
              // setItems(cur_ele.catagory);
            }
          }
        }
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  const getINCOMPLETE_POSTPROPERTY = async () => {
    let ApiRes = await API_REQ_GET(
      configData.COUNTINUE_INCOMPLETE_POSTPROPERTY_URL,
      token
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        if (ApiRes.pendingData.length != 0) {
          console.log(ApiRes.pendingData);
          // console.log("data found");
          setDiscart(true);
          setInCom(ApiRes.pendingData[0]);
        } else {
          setDiscart(false);
          // console.log("no data");
          // console.log(ApiRes.pendingData.length);
        }
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    if (list_of_images.length === 0) {
      setManageDrag(true);
    }
  }, [list_of_images]);
  useEffect(() => {
    getINCOMPLETE_POSTPROPERTY();
    getCasesResidental();
    getCasesVerifyPhone();
    getCasesPropertyId();
  }, []);

  // ----------------------------------- JSX ---------------------------------------
  return (
    <div className={`min-vh-100 bg-white`}>
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
      {/* <NavBar></NavBar> */}
      <Nav postpropertyBtnVeiw={false} setDataTranscript={""}></Nav>
      {/* ----------------------------------------------------- */}
      {/* PRS means PropertyRegisStyle.module.css file */}
      {/* <Discart /> */}
      <div className={`${PRS.MainContainer}`}>
        {/* ------------------------------------------- */}
        {discard === true && (
          <Discart
            handleDiscart={handleDiscart}
            handleContinue={handleContinue}
          />
        )}

        <div className={`${PRS.section1}`}>
          {" "}
          <StepProgressBar
            currentStep={currentStep}
            updateStep={updateStepProgress}
            labelArray={labelArray}
            complete={true}
          />
        </div>
        {/* ---------------------------------------------------- */}
        <div className={`${PRS.section2}`}>
          {(() => {
            if (currentStep === 1) {
              return (
                <BasicDetails
                  updateStep={updateStep}
                  // ------------------------------------
                  postPropertyInfo={postPropertyInfo}
                  setPostPropertyInfo={setPostPropertyInfo}
                  setBasicRes={setBasicRes}
                  typeOfProperty={typeOfProperty}
                  query={query}
                />
              );
            } else if (currentStep === 2) {
              return (
                <LocationDetails
                  updateStep={updateStep}
                  // ------------------------------------
                  postPropertyInfo={postPropertyInfo}
                  setPostPropertyInfo={setPostPropertyInfo}
                  basicRes={basicRes}
                />
              );
            } else if (currentStep === 3) {
              return (
                <PropertyProfile
                  updateStep={updateStep}
                  postPropertyInfo={postPropertyInfo}
                  setPostPropertyInfo={setPostPropertyInfo}
                  basicRes={basicRes}
                  setPriceUnit={setPriceUnit}
                />
              );
              // }
            } else if (currentStep === 4) {
              return (
                <PropertyPhoto
                  updateStep={updateStep}
                  list_of_images={list_of_images}
                  set_list_of_images={set_list_of_images}
                  updateImg={updateImg}
                  manageDrag={manageDrag}
                  setManageDrag={setManageDrag}
                  coverImage={coverImage}
                  setCoverImage={setCoverImage}
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  isDragActive={isDragActive}
                  // ------------------------------
                  postPropertyInfo={postPropertyInfo}
                  setPostPropertyInfo={setPostPropertyInfo}
                  basicRes={basicRes}
                  setImageInfo={setImageInfo}
                  propertyPhotoRes={propertyPhotoRes}
                  setUpdateImg={setUpdateImg}
                />
              );
            } else if (currentStep === 5) {
              if (postPropertyInfo.basic_details.purpose_of_listing === "PG") {
                return (
                  <PGpricingAndOthers
                    updateStep={updateStep}
                    postPropertyInfo={postPropertyInfo}
                    setPostPropertyInfo={setPostPropertyInfo}
                    basicRes={basicRes}
                  />
                );
              } else {
                return (
                  <PricingAndOthers
                    updateStep={updateStep}
                    postPropertyInfo={postPropertyInfo}
                    setPostPropertyInfo={setPostPropertyInfo}
                    basicRes={basicRes}
                    priceUnit={priceUnit}
                  />
                );
              }
            }
          })()}
        </div>
        <br />
      </div>
    </div>
  );
}

export default PostProperty;
