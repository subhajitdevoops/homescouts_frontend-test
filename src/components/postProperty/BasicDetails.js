import React, { useState, useEffect } from "react";
import BDS from "./css/BasicDetails.module.css";
import {
  API_REQ_GET,
  API_REQ_POST,
  API_REQ_POST_WITH_TOKEN,
} from "../../config/API";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "../../config/Helper";

export default function BasicDetails(props) {
  const {
    purpose_of_listing,
    property_type,
    property_type_value,
    property_sub_type,
    idd,
  } = props.postPropertyInfo.basic_details;
  const setPostPropertyInfo = props.setPostPropertyInfo;
  // ---------------------------------------getToken-----------------------------------------------------
  let query = useQuery();
  // ---- Below function:- Update State value after checking condition and erase relative state data. because if user changes previous data then next all data will be erased because views data are dependend on each other in basic details section ------
  const handleBasicDetailsState = (e) => {
    if (
      purpose_of_listing.length !== 0 &&
      e.target.name === "purpose_of_listing"
    ) {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          basic_details: {
            purpose_of_listing: e.target.value,
            property_type: "",
            property_type_value: "",
            property_sub_type: "",
          },
        };
      });
    } else if (
      property_type.length !== 0 &&
      e.target.name === "property_type"
    ) {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          basic_details: {
            ...props.postPropertyInfo.basic_details,
            property_type: e.target.value,
            property_type_value: "",
            property_sub_type: "",
          },
        };
      });
    } else if (
      property_type_value.length !== 0 &&
      e.target.name === "property_type_value"
    ) {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          basic_details: {
            ...props.postPropertyInfo.basic_details,
            property_type_value: e.target.value,
            property_sub_type: "",
          },
        };
      });
    } else {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          basic_details: {
            ...props.postPropertyInfo.basic_details,
            [e.target.name]: e.target.value,
          },
        };
      });
    }
  };

  // -----------------------------------------------------------------------------
  const [isDisable, setIsDisable] = useState(false);
  const [userName, setUserName] = useState("");

  // ------------------------------------------------------------------------------
  const [error, setError] = useState({});
  // // ------------------------------------------------------------------------------
  // const getToken = JSON.parse(localStorage.getItem("accessToken"));
  // const _id = getToken && getToken.response._id;
  // const token = getToken && getToken.response.token;
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);
  let id = null;

  useEffect(() => {
    if (purpose_of_listing === "PG") {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
    setError({});
  }, [
    purpose_of_listing,
    property_type,
    property_type_value,
    property_sub_type,
  ]);
  // // ----------------------------------------------------------------
  // // form details validate:-
  const BasicDetailsValidate = () => {
    const errorDetails = {};
    if (purpose_of_listing === "") {
      errorDetails.purpose_of_listing_error = "Please select purpose of post.";
    }

    if (property_type === "") {
      errorDetails.property_type_error =
        "Please select property type (residential/commercial/PG).";
    }
    if (property_type.length !== 0 && property_type_value === "") {
      errorDetails.property_type_value_error =
        "Please select Kind of property type value.";
    }
    if (
      property_type_value.length !== 0 &&
      property_sub_type === "" &&
      property_type === "Commercial"
    ) {
      errorDetails.KOPCsubItemerror =
        "Please select type of property do you have.";
    }
    if (Object.keys(errorDetails).length === 0) {
      Validate();
    } else {
      setError(errorDetails);
    }
  };
  const Validate = async () => {
    // const formData = new FormData();
    const basicData = {
      _id: props.query.get("propertyId") ? props.query.get("propertyId") : "",
      step: "basicdetails",
      basicdetails: {
        typeOfBusiness: `${purpose_of_listing}`.toLowerCase(),
        typeOfProperty: `${property_type}`.toLowerCase(),
        catagory: `${property_type_value}`.toLowerCase(),
        subCatagory: `${property_sub_type}`.toLowerCase(),
      },
    };
    console.log(basicData);
    // formData.append("data", JSON.stringify(basicData));

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.POST_PROPERTY_POST_DETAILS_URL,
      basicData,
      userToken
    );
    console.log(ResBasic);
    if (ResBasic) {
      if (ResBasic.success === true) {
        toast.success(ResBasic.message);
        props.updateStep(2);
        if (query.get("propertyId")) {
          console.log('step1');
        } else {
          console.log('step2');
          props.setBasicRes(ResBasic && ResBasic.res && ResBasic.res._id);
        }
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };

  // -----------------------------Api get request for Avatar image-------------------------------------------
  const getCasesAvatar = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_GET_USER_PROFILE_URL,
      userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        // setResp(ApiRes.result);
        // setUserService(ApiRes.result);
        // console.log("PROFILE details", ApiRes);
        // setProfileRes(ApiRes.result);
        if (ApiRes.result&&ApiRes.result.name && ApiRes.result.name.length > 0) {
          setUserName(ApiRes.result.name);
        }
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    if (userToken) {
      getCasesAvatar();
    }
  }, []);
  return (
    <div className={`${BDS.bdContainer}`}>
      <h1 className={`p-1 `}>Welcome Back {userName.split(" ")[0]},</h1>
      <br />
      <h5 className={`p-1`}>Fill out basic details</h5>
      <br />
      <p className={`p-1`}>I'm posting for</p>
      {/* error message */}
      <span className={`${BDS.error}`}>{error.purpose_of_listing_error}</span>

      <div className={`p-1  d-flex `}>
        <input
          className={`${BDS.sell}  ${
            purpose_of_listing === "Sell" ? `${BDS.Sell}` : `${BDS.input}`
          } `}
          type="button"
          name="purpose_of_listing"
          value="Sell"
          onClick={(e) => {
            handleBasicDetailsState(e);
          }}
        />
        <input
          className={`  ${
            purpose_of_listing === "Rent/lease" ? `${BDS.Rent}` : `${BDS.input}`
          }`}
          type="button"
          name="purpose_of_listing"
          value="Rent/lease"
          onClick={(e) => {
            handleBasicDetailsState(e);
          }}
        />
        <input
          className={`  ${
            purpose_of_listing === "PG" ? `${BDS.PG}` : `${BDS.input}`
          }`}
          type="button"
          name="purpose_of_listing"
          value="PG"
          onClick={(e) => handleBasicDetailsState(e)}
        />
      </div>
      {purpose_of_listing === "PG" && (
        <>
          <br />
          <h5>What kind of PG do you have?</h5>
          <br />
        </>
      )}
      {/* -----------------------PG Item----------------------- */}
      {purpose_of_listing === "PG" ? (
        <div>
          <div className={`d-flex flex-wrap flex-row `}>
            {props.typeOfProperty &&
              props.typeOfProperty[2].catagory.map((item, index) => {
                return (
                  <input
                    className={`${BDS.input} ${
                      property_type_value === `${item.name.toLowerCase()}`
                        ? `${BDS.selected}`
                        : ``
                    }`}
                    type="button"
                    name="property_type_value"
                    value={item.name.toLowerCase()}
                    key={index}
                    onClick={(e) => {
                      handleBasicDetailsState(e);
                    }}
                  />
                );
              })}
          </div>
          {/* error message */}
          <span className={`${BDS.error}`}>
            {error.property_type_value_error}
          </span>
        </div>
      ) : (
        ""
      )}
      {/* -------------------------------------------------------------------------- */}

      <br />
      {/* -----------------------------Property type Section----------------------------*/}
      {purpose_of_listing === "Sell" || purpose_of_listing === "Rent/lease" ? (
        <div className={``}>
          <h5>What kind of property do you have?</h5>
          {/* error message */}
          <span className={`${BDS.error}`}>{error.property_type_error}</span>
          {/* --------------------------------Radio buttons-------------------------- */}
          <div className={`d-flex flex-row  mt-3 mb-2`}>
            <div className="d-flex flex-row">
              <input
                className={`p-1  `}
                type="radio"
                id="r"
                checked={property_type === "Residential"}
                value="Residential"
                name="property_type"
                onChange={(e) => handleBasicDetailsState(e)}
                disabled={isDisable}
              />
              <label
                style={{ marginRight: "20px" }}
                className="mt-auto mb-auto"
                htmlFor="r"
              >
                Residential
              </label>
            </div>

            <div className="d-flex flex-row">
              <input
                className={`p-1 `}
                type="radio"
                id="c"
                checked={property_type === "Commercial"}
                value="Commercial"
                name="property_type"
                onChange={(e) => handleBasicDetailsState(e)}
                disabled={isDisable}
              />
              <label
                style={{ marginRight: "20px" }}
                className="mt-auto mb-auto ml-auto mr-0"
                htmlFor="c"
              >
                Commercial
              </label>
            </div>
            {/* 
            <div className="d-flex flex-row">
              <input
                className={`p-1 `}
                type="radio"
                id="p"
                checked={property_type === "PG"}
                value="PG"
                name="property_type"
                onChange={(e) => handleBasicDetailsState(e)}
                disabled={isDisable}
              />
              <label className="mt-auto mb-auto ml-auto mr-0" htmlFor="p">
                PG
              </label>
            </div> */}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* ----------------Kind of property------------- */}
      {/* -----------------------Residential Item----------------------- */}
      {property_type === "Residential" ? (
        <div>
          <div className={`d-flex flex-wrap flex-row `}>
            {props.typeOfProperty &&
              props.typeOfProperty[0].catagory.map((item, index) => {
                // console.log("catagory==>", item);

                return (
                  <input
                    className={`${BDS.input} ${
                      property_type_value === `${item.name}`
                        ? `${BDS.selected}`
                        : ``
                    }`}
                    type="button"
                    name="property_type_value"
                    value={item.name}
                    key={index}
                    onClick={(e) => {
                      handleBasicDetailsState(e);
                    }}
                  />
                );
              })}
          </div>
          {/* error message */}
          <span className={`${BDS.error}`}>
            {error.property_type_value_error}
          </span>
        </div>
      ) : (
        ""
      )}

      {/* -------------------Commercial items------------------ */}
      {(property_type === "Commercial") & !isDisable ? (
        <div>
          <div className={`d-flex flex-wrap flex-row `}>
            {props.typeOfProperty &&
              props.typeOfProperty[1].catagory.map((item, index) => {
                return (
                  <input
                    className={`${BDS.input} ${
                      property_type_value === `${item.name}`
                        ? `${BDS.selected}`
                        : ``
                    }`}
                    type="button"
                    name="property_type_value"
                    value={item.name}
                    key={index}
                    onClick={(e) => {
                      handleBasicDetailsState(e);
                    }}
                  />
                );
              })}
          </div>
          {/* error message */}
          <span className={`${BDS.error}`}>
            {error.property_type_value_error}
          </span>
        </div>
      ) : (
        ""
      )}
      {/* --------------------Commertial Sub items----------------------- */}
      {(property_type === "Commercial") &
      !isDisable &
      (property_type_value.length > 0) ? (
        <div>
          <div className={`d-flex flex-column `}>
            <br />
            <h5>What type of {property_type_value} do you have?</h5>
            <br />
            <div className={`d-flex flex-wrap flex-row `}>
              {props.typeOfProperty &&
                props.typeOfProperty[1].catagory
                  .filter((item) => item && item.name === property_type_value)
                  .flatMap((item) => item.subCatagory)

                  .map((item, index) => {
                    return (
                      <input
                        className={`${BDS.input} ${
                          property_sub_type === `${item.name}`
                            ? `${BDS.selected}`
                            : ``
                        }`}
                        type="button"
                        name="property_sub_type"
                        value={item.name.toLowerCase()}
                        key={index}
                        onClick={(e) => {
                          handleBasicDetailsState(e);
                        }}
                      />
                    );
                  })}
            </div>
          </div>
          {/* error message */}
          <span className={`${BDS.error}`}>{error.KOPCsubItemerror}</span>
        </div>
      ) : (
        ""
      )}
      {/* -----------------------PG Item----------------------- */}
      {property_type === "PG" ? (
        <div>
          <div className={`d-flex flex-wrap flex-row `}>
            {props.typeOfProperty &&
              props.typeOfProperty[2].catagory.map((item, index) => {
                return (
                  <input
                    className={`${BDS.input} ${
                      property_type_value === `${item.name.toLowerCase()}`
                        ? `${BDS.selected}`
                        : ``
                    }`}
                    type="button"
                    name="property_type_value"
                    value={item.name.toLowerCase()}
                    key={index}
                    onClick={(e) => {
                      handleBasicDetailsState(e);
                    }}
                  />
                );
              })}
          </div>
          {/* error message */}
          <span className={`${BDS.error}`}>
            {error.property_type_value_error}
          </span>
        </div>
      ) : (
        ""
      )}
      {/* -------------------------------------------------------------------------- */}

      <br />
      <button
        className="btn btn-primary"
        onClick={() => {
          BasicDetailsValidate();
          if (purpose_of_listing === "PG") {
            Validate();
          }
        }}
      >
        Continue
      </button>
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
}
