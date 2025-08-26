import React, { useState, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import Rent from "./PGpricingAndOthers/Rent";
import FoodDetails from "./PGpricingAndOthers/FoodDetails";
import SomeRules from "./PGpricingAndOthers/SomeRules";
import { API_REQ_POST_WITH_TOKEN } from "../../config/API";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PGpricingAndOthers(props) {
  const pricing_and_others_details =
    props.postPropertyInfo.pricing_and_others_details;
  const setPostPropertyInfo = props.setPostPropertyInfo;

    // ------------------------FIRESHALE -------------------------------
    const handleFireSale = () => {
      console.log("working------------");
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          pricing_and_others_details: {
            ...props.postPropertyInfo.pricing_and_others_details,
            firesale:
              props.postPropertyInfo.pricing_and_others_details.firesale === true
                ? false
                : true,
          },
        };
      });
    };

  // -------------------------------------------------------------------
  const errorRef = useRef(null);
  const scrollError = () => errorRef.current.scrollIntoView();
  const [error, setError] = useState({});
  const PGpricingAndOthers_Validation = () => {
    const error_msg = {};
    if (
      pricing_and_others_details.pg_rent &&
      pricing_and_others_details.pg_rent.length === 0
    ) {
      error_msg.pg_rent_error = " Please enter monthly rent of PG.";
      scrollError();
    }
    if (
      pricing_and_others_details.food_details.food_availability &&
      pricing_and_others_details.food_details.food_availability.length === 0
    ) {
      error_msg.food_availability_error =
        " Please select food available or not.";
      scrollError();
    }
    if (
      pricing_and_others_details.property_unique_description &&
      pricing_and_others_details.property_unique_description.length === 0
    ) {
      error_msg.property_unique_description_error =
        " Please give unique features of your PG";
    }
    if (
      pricing_and_others_details.property_unique_description &&
      pricing_and_others_details.property_unique_description.length !== 0 &&
      pricing_and_others_details.property_unique_description.match(/(\w+)/g)
        .length < 20
    ) {
      error_msg.short_unique_description_error =
        " Please give description in atleast 20 words.";
    }
    // ------------------
    if (Object.keys(error_msg).length === 0) {
      // props.updateStep(4);
      Validate();
    }
    setError(error_msg);
  };
  // -------------------------getUser Token -----------------------
  const navigate = useNavigate();

  const getToken = JSON.parse(localStorage.getItem("accessToken"));
  const _id = getToken && getToken.response._id;
  const token = getToken && getToken.response.token;
  console.log("userToken------------------------------------>", token);
  //  --------------------------------------------------------------------------
  const Validate = async () => {
    // const formData = new FormData();

    const post_PgPriceAndOthersData = {
      _id: props.basicRes,
      step: "pricinganddetails",
      pricinganddetails: {
        rentDetails: pricing_and_others_details.pg_rent,
        securityDepositeScheme:
          pricing_and_others_details.security_deposite
            .security_deposite_type === "Multiple of Rent"
            ? "Monthly"
            : "Fixed",
        securityDepositeAmmount:
          pricing_and_others_details.security_deposite.fixed_deposite_value,
        noOfMonths:
          pricing_and_others_details.security_deposite.no_of_months > 0
            ? pricing_and_others_details.security_deposite.no_of_months
            : 0,
        foodDetails: pricing_and_others_details.food_details.food_availability,
        mealTypes:
          pricing_and_others_details.food_details.food_availability ===
          "Not Available"
            ? ""
            : pricing_and_others_details.food_details.meal_type,
        someHouseRules: {
          petsAllowed:
            pricing_and_others_details.some_house_rules.pets_allow === "yes"
              ? true
              : false,
          visitorsAllowed:
            pricing_and_others_details.some_house_rules.visitors_allow === "yes"
              ? true
              : false,
          smokingAllowed:
            pricing_and_others_details.some_house_rules.smoking_allow === "yes"
              ? true
              : false,
          alcoholAllowed:
            pricing_and_others_details.some_house_rules.alcohol_allow === "yes"
              ? true
              : false,
          partyAllowed:
            pricing_and_others_details.some_house_rules.party_allow === "yes"
              ? true
              : false,
        },
        availabilityOfMealOnWeekdays:
          pricing_and_others_details.food_details.food_availability ===
          "Not Available"
            ? ""
            : pricing_and_others_details.food_details
                .meal_availability_on_weekdays,
        availabilityOfMealOnWeekends:
          pricing_and_others_details.food_details.food_availability ===
          "Not Available"
            ? ""
            : pricing_and_others_details.food_details
                .meal_availability_on_weekdays,
        lastEntry: pricing_and_others_details.some_house_rules.last_entry_time,
        haveAnyOtherRule:
          pricing_and_others_details.some_house_rules.another_rule,
        uniqueDescription:
          pricing_and_others_details.property_unique_description,
        firesaleOrNot: pricing_and_others_details.firesale,

      },
    };
    console.log(post_PgPriceAndOthersData);
    // formData.append("data", JSON.stringify(post_PgPriceAndOthersData));

    let resPGPriceAndOther = await API_REQ_POST_WITH_TOKEN(
      configData.POST_PROPERTY_POST_DETAILS_URL,
      post_PgPriceAndOthersData,
      token
    );
    console.log(resPGPriceAndOther);
    if (resPGPriceAndOther) {
      if (resPGPriceAndOther.success === true) {
        toast.success(resPGPriceAndOther.message);
        // props.updateStep(4);
        setTimeout(() => {
          navigate("/", { replace: true });
          // navigate(-1)
        }, 1000);
      } else {
        toast.warning(resPGPriceAndOther.message);
      }
    } else {
      toast.error("please check Your Internet connection !");
    }
  };
  // console.table(error);
  // ------------------------------ JSX ---------------------------------
  return (
    <div style={{ padding: "1% 3%", width: "100%" }}>
      <button
        ref={errorRef}
        className="p-1 btn btn-secondary"
        onClick={() => {
          props.updateStep(4);
        }}
      >
        <BiArrowBack style={{ margin: "0 3px" }} />
        Back
      </button>
      <br />
      <br />
      <h1>Add pricing and details...</h1>
      <br />
      <Rent
        pricing_and_others_details={pricing_and_others_details}
        setPostPropertyInfo={setPostPropertyInfo}
        error={error}
        basic_details={props.postPropertyInfo.basic_details}
      />
      <FoodDetails
        pricing_and_others_details={pricing_and_others_details}
        setPostPropertyInfo={setPostPropertyInfo}
        error={error}
      />
      {/*  ----------- Some rules and description all component in SomeRules Component ---------- */}
      <SomeRules
        pricing_and_others_details={pricing_and_others_details}
        setPostPropertyInfo={setPostPropertyInfo}
        error={error}
        someDetails={true}
      />
      {/* ----------------------FireSale Option---------------------------- */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          id="Firesale"
          // style={{ display: "none" }}
          checked={props.postPropertyInfo.pricing_and_others_details.firesale}
          onChange={() => handleFireSale()}
        />
        <span className="d-block pt-1 pb-1 px-3">
          Firesale
        </span>
      </div>
      <br />
      <button
        className="btn btn-primary"
        onClick={() => {
          PGpricingAndOthers_Validation();
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

export default PGpricingAndOthers;
