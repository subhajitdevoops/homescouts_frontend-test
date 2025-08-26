import React, { useContext, useState } from "react";
import LDS from "./css/locationDetails.module.css";
import { BiCurrentLocation, BiArrowBack } from "react-icons/bi";
import { API_REQ_POST, API_REQ_POST_WITH_TOKEN } from "../../config/API";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { getLocations } from "../../config/Helper";
import AuthContext from "../../context/AuthProvider";

export default function LocationDetails(props) {
  const user_address = props.postPropertyInfo.user_address;
  const setPostPropertyInfo = props.setPostPropertyInfo;
  const [clicked, setClicked] = useState(false);
  const value = useContext(AuthContext);

  // -------- Geolocation (JS) Code for getting latitude and longitude ----------
  const getLocation = async () => {
    if (value.geoLocations && value.geoLocations.length > 0) {
      setClicked(true);
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          user_address: {
            apartmentAndSociety: "",
            area: value.geoLocations[0].area,
            city: value.geoLocations[0]?.city.trim(),
            district: value.geoLocations[0]?.district,
            formatted_address: value.geoLocations[0]?.formatted_address,
            houseName: value.geoLocations[0]?.houseName,
            houseNumber: value.geoLocations[0]?.houseNumber,
            lat: value.geoLocations[0]?.lat,
            lng: value.geoLocations[0]?.lng,
            locality: value.geoLocations[0]?.locality.trim(),
            pincode: value.geoLocations[0]?.pincode,
            poi: value.geoLocations[0]?.poi,
            poi_dist: value.geoLocations[0]?.poi_dist,
            state: value.geoLocations[0]?.state,
            street: value.geoLocations[0]?.street,
            street_dist: value.geoLocations[0]?.street_dist,
            subDistrict: value.geoLocations[0]?.subLocality.trim(),
            subLocality: value.geoLocations[0]?.subDistrict.trim(),
            subSubLocality: value.geoLocations[0]?.subSubLocality,
            village: value.geoLocations[0]?.village,
          },
        };
      });
    } else {
      let newlocation = await getLocations();
      console.log("newlocation ==>", newlocation);
      if (newlocation) {
        value.setGeoLocations(newlocation);
        setClicked(true);
        setPostPropertyInfo((olditems) => {
          return {
            ...olditems,
            user_address: {
              apartmentAndSociety: "",
              area: newlocation[0]?.area,
              city: newlocation[0]?.city.trim(),
              district: newlocation[0]?.district,
              formatted_address: newlocation[0]?.formatted_address,
              houseName: newlocation[0]?.houseName,
              houseNumber: newlocation[0]?.houseNumber,
              lat: newlocation[0]?.lat,
              lng: newlocation[0]?.lng,
              locality: newlocation[0]?.locality.trim(),
              pincode: newlocation[0]?.pincode,
              poi: newlocation[0]?.poi,
              poi_dist: newlocation[0]?.poi_dist,
              state: newlocation[0]?.state,
              street: newlocation[0]?.street,
              street_dist: newlocation[0]?.street_dist,
              subDistrict: newlocation[0]?.subLocality.trim(),
              subLocality: newlocation[0]?.subDistrict.trim(),
              subSubLocality: newlocation[0]?.subSubLocality,
              village: newlocation[0]?.village,
            },
          };
        });
      }else{
        toast.warning(
          "❌ Automatic location can not detected at this moment, 👉 Please enter your location manually"
        );
      }
    }
  };

  // ------function used to getting data from onChange handler in input field and update it ----------
  const handleChange = (e) => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        user_address: {
          ...user_address,
          [e.target.name]: e.target.value,
        },
      };
    });
    setError({
      ...error,
      clicked: "",
      [e.target.name + "error"]: "",
    });
  };
  // -------------------------------------------
  const getToken = JSON.parse(localStorage.getItem("accessToken"));
  const _id = getToken && getToken.response._id;
  const token = getToken && getToken.response.token;
  // console.log("userToken------------------------------------>", token);
  // validation-----------
  const [error, setError] = useState({});
  const locationDetailsValidation = () => {
    const errorDetails = { clicked: "" };
    if (!clicked) {
      errorDetails.clicked =
        "Please tap this button to pick your location automatically.";
    }
    if (user_address.locality.length === 0) {
      errorDetails.localityerror = "Please enter locality name of property.";
    }
    if (!clicked && user_address.city.length === 0) {
      errorDetails.cityerror = "Please enter city name.";
    }
    if (!clicked && user_address.subLocality.length === 0) {
      errorDetails.subLocalityerror =
        "Please enter sublocality name of property.";
    }
    if (clicked && user_address.subDistrict.length === 0) {
      errorDetails.subDistricterror =
        "Please enter subDistrict name of property.";
    }
    if (clicked && user_address.district.length === 0) {
      errorDetails.districterror = "Please enter district name of property.";
    }

    if (
      (user_address.city.length !== 0 &&
        user_address.locality.length !== 0 &&
        user_address.subLocality.length !== 0) ||
      (user_address.district.length !== 0 &&
        user_address.locality.length !== 0 &&
        user_address.subDistrict.length !== 0)
    ) {
      validate();
    } else {
      setError(errorDetails);
      toast.warning('please fill correct location')
    }
  };
  const validate = async () => {
    // const formData = new FormData();

    const locationData = {
      // data: {
      _id: props.basicRes,
      step: "location",
      location: {
        apartmentAndSocity: `${user_address.apartmentAndSociety}`.toLowerCase(),
        houseNumber: `${user_address.houseNumber}`.toLowerCase(),
        locality: `${user_address.locality}`.toLowerCase(),
        subLocality: `${user_address.subLocality}`.toLowerCase(),
        city: `${user_address.city}`.toLowerCase(),
        // },
      },
    };
    console.log(locationData);
    // formData.append("data", JSON.stringify(locationData));

    let ResLocation = await API_REQ_POST_WITH_TOKEN(
      configData.POST_PROPERTY_POST_DETAILS_URL,
      locationData,
      token
    );
    console.log(ResLocation);
    if (ResLocation) {
      if (ResLocation.success === true) {
        toast.success(ResLocation.message);
        props.updateStep(3);
      } else {
        toast.warning(ResLocation.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };

  // ----------------------------- JSX ---------------------------
  return (
    <div className={`${LDS.ldContainer}`}>
      <button
        className="p-1 btn btn-secondary"
        onClick={() => {
          props.updateStep(1);
        }}
      >
        <BiArrowBack style={{ margin: "0 3px" }} />
        Back
      </button>
      <br />
      <br />
      <h1 className="p-1">Where is your property located?</h1>
      <br />
      <p className="p-1">
        An accurate location helps you connect with the right buyers...
      </p>
      {/*---------------- Location button ------------- */}
      <div>
        <div className={`${LDS.tooltip}`}>
          <div
            className={`mt-2 d-flex justify-content-between flex-row  ${LDS.inputContainer}`}
          >
            <button
              onClick={getLocation}
              className={`btn bg-transparent w-100 ${LDS.locationBtn}`}
            >
              <BiCurrentLocation style={{ transition: "none" }} />
              <p className="p-1" style={{ fontSize: "14px" }}>
                Pick my location
              </p>
            </button>
          </div>
          {/* Hover over me */}
          {error.clicked ? (
            <span className={`${LDS.tooltiptext} ${LDS.error}`}>
              {error.clicked}
            </span>
          ) : (
            <span className={`${LDS.tooltiptext}`}>
              Please tap this button to pick your location automatically.
            </span>
          )}
        </div>
      </div>

      {/* ------------------- Location Details View ------------------ */}
      <div className={`${LDS.inputAddressContainer}`}>
        {/*------------------------ Apartment & Society --------------- */}
        <div className={`${LDS.inpContainer}`}>
          <input
            type="text"
            id="ApartmentAndSociety"
            name="apartmentAndSociety"
            value={user_address.apartmentAndSociety}
            onChange={(e) => {
              handleChange(e);
            }}
            className={`${LDS.inputAdd}`}
            autoComplete="off"
            placeholder="  "
          />
          <label htmlFor="ApartmentAndSociety" className={`${LDS.label}`}>
            Apartment and Society (optional)
          </label>
        </div>
        {/* ----------------- House No. --------------------- */}
        <div className={`${LDS.inpContainer}`}>
          <input
            type="text"
            id="HouseNo"
            name="houseNumber"
            value={user_address.houseNumber}
            onChange={(e) => {
              handleChange(e);
            }}
            className={`${LDS.inputAdd}`}
            autoComplete="off"
            placeholder="   "
          />
          <label htmlFor="HouseNo" className={`${LDS.label}`}>
            House No.(optional)
          </label>
        </div>
        {/* --------------------- Locality --------------------- */}
        <div className={`${LDS.inpContainer}`}>
          <input
            type="text"
            id="Locality"
            name="locality"
            value={user_address.locality}
            onChange={(e) => {
              handleChange(e);
            }}
            className={`${LDS.inputAdd}`}
            autoComplete="off"
            placeholder="   "
          />
          <label htmlFor="Locality" className={`${LDS.label}`}>
            Locality<sup>*</sup>
          </label>
        </div>
        {/*--------------Locality error message ------------- */}
        {error.localityerror ? (
          <span className={`${LDS.inlineError}`}>{error.localityerror}</span>
        ) : (
          ""
        )}
        {/* ------------------ subLocality or subDistrict -------------------- */}
        {user_address.subLocality.length === 0 &&
        user_address.subDistrict.length !== 0 ? (
          <>
            <div className={`${LDS.inpContainer}`}>
              <input
                type="text"
                id="subDistrict"
                name="subDistrict"
                value={user_address.subDistrict}
                onChange={(e) => {
                  handleChange(e);
                }}
                className={`${LDS.inputAdd}`}
                autoComplete="off"
                placeholder="   "
              />
              <label htmlFor="subDistrict" className={`${LDS.label}`}>
                Sub District<sup>*</sup>
              </label>
            </div>
            {/*--------------subDistrict error message ------------- */}
            {error.subDistricterror ? (
              <span className={`${LDS.inlineError}`}>
                {error.subDistricterror}
              </span>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <div className={`${LDS.inpContainer}`}>
              <input
                type="text"
                id="subLocality"
                name="subLocality"
                value={user_address.subLocality}
                onChange={(e) => {
                  handleChange(e);
                }}
                className={`${LDS.inputAdd}`}
                autoComplete="off"
                placeholder="   "
              />
              <label htmlFor="subLocality" className={`${LDS.label}`}>
                Sub Locality<sup>*</sup>
              </label>
            </div>
            {/*--------------SubLocality error message ------------- */}
            {error.subLocalityerror ? (
              <span className={`${LDS.inlineError}`}>
                {error.subLocalityerror}
              </span>
            ) : (
              ""
            )}
          </>
        )}{" "}
        {/* -------- City or District --------------*/}
        {user_address.city.length === 0 &&
        user_address.district.length !== 0 ? (
          <>
            <div className={`${LDS.inpContainer}`}>
              <input
                type="text"
                id="district"
                name="district"
                value={`${user_address.district}`}
                onChange={(e) => {
                  handleChange(e);
                }}
                className={`${LDS.inputAdd}`}
                autoComplete="off"
                placeholder="  "
              />
              <label htmlFor="district" className={`${LDS.label}`}>
                District<sup>*</sup>
              </label>
            </div>
            {/*-------------- district error message ------------- */}
            {error.districterror ? (
              <span className={`${LDS.inlineError}`}>
                {error.districterror}
              </span>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <div className={`${LDS.inpContainer}`}>
              <input
                type="text"
                id="city"
                name="city"
                value={user_address.city}
                onChange={(e) => {
                  handleChange(e);
                }}
                className={`${LDS.inputAdd}`}
                autoComplete="off"
                placeholder="  "
              />
              <label htmlFor="city" className={`${LDS.label}`}>
                City<sup>*</sup>
              </label>
            </div>
            {error.cityerror ? (
              <span className={`${LDS.inlineError}`}>{error.cityerror}</span>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      {/*  ----------------------------------------------------------------------- */}
      <button
        className="btn mt-3 btn-primary"
        onClick={() => {
          locationDetailsValidation();
        }}
      >
        Continue
      </button>
    </div>
  );
}
