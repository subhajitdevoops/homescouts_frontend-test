import React, { useState, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import POS from "./css/pricingAndOthers.module.css";
import LDS from "./css/locationDetails.module.css";
import BDS from "./css/BasicDetails.module.css";
import PPHS from "./css/propertyPhoto.module.css";
import { API_REQ_POST_WITH_TOKEN } from "../../config/API";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SomeRules from "./PGpricingAndOthers/SomeRules";

function PricingAndOthers(props) {
  const {
    available_for,
    ownership_details,
    price_details,
    additional_pricing_details,
    property_unique_description,
    some_house_rules,
    firesale,
    reraNumber,
  } = props.postPropertyInfo.pricing_and_others_details;
  console.log("additional_pricing_details1",props);

  const setPostPropertyInfo = props.setPostPropertyInfo;
  const ownershipType = [
    "Freehold",
    "Leasehold",
    "Co-operative society",
    "Power of attorney",
  ];
  const [error, setError] = useState({});

  const AvailableFamily = [
    "Family",
    "Bachelors",
    "Single men",
    "Single women",
    "Other",
  ];

  const selectOwner = (e) => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        pricing_and_others_details: {
          ...props.postPropertyInfo.pricing_and_others_details,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  // const handleAvailableFamily = (e) => {
  //   setPostPropertyInfo((olditems) => {
  //     return {
  //       ...olditems,
  //       pricing_and_others_details: {
  //         ...props.postPropertyInfo.pricing_and_others_details,
  //         [e.target.name]: e.target.value,
  //       },
  //     };
  //   });      
  //   setError({});
  // };
  const [selectedItems, setSelectedItems] = useState([]); // For multiple selected items

  const handleAvailableFamily = (e, item) => {
    setPostPropertyInfo((oldItems) => {
      // Add or remove the item from the selected items array
      const updatedSelectedItems = selectedItems.includes(item.toLocaleLowerCase())
        ? selectedItems.filter((selected) => selected !== item.toLocaleLowerCase()) // Deselect if already selected
        : [...selectedItems, item.toLocaleLowerCase()]; // Select if not already selected

      // Update the selectedItems state
      setSelectedItems(updatedSelectedItems);

      // Return the updated property info with the new selected values
      return {
        ...oldItems,
        pricing_and_others_details: {
          ...props.postPropertyInfo.pricing_and_others_details,
          available_for: updatedSelectedItems, // Store the updated selected items
        },
      };
    });

    setError({}); // Clear error state if needed
  };
  const price_details_handleChange = (e) => {
    if (e.target.name === "expected_price") {
      const newValue = (
        e.target.value /
        props.postPropertyInfo.property_profile_info.area_details.carpet_area
      ).toFixed(2);
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          pricing_and_others_details: {
            ...props.postPropertyInfo.pricing_and_others_details,
            price_details: {
              ...price_details,
              [e.target.name]: e.target.value,
              price_per_sqrft: newValue,
            },
          },
        };
      });
    }
    if (e.target.name === "price_per_sqrft") {
      const newValue = (
        e.target.value *
        props.postPropertyInfo.property_profile_info.area_details.carpet_area
      ).toFixed(2);
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          pricing_and_others_details: {
            ...props.postPropertyInfo.pricing_and_others_details,
            price_details: {
              ...price_details,
              [e.target.name]: e.target.value,
              expected_price: newValue,
            },
          },
        };
      });
    }
  };
  // ----------advanceDeposit
  const [advanceDeposit, setAdvanceDeposit] = useState(
    props.postPropertyInfo.pricing_and_others_details.price_details.advanceDeposit || ""
  );

  const handleInputChange = (e) => {
    setAdvanceDeposit(e.target.value);
  };

  const additional_pricing_handleChange = (e) => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        pricing_and_others_details: {
          ...props.postPropertyInfo.pricing_and_others_details,
          additional_pricing_details: {
            ...additional_pricing_details,
            [e.target.name]: e.target.value,
          },
        },
      };
    });
  };
  const maintenance_details_handleChange = (e) => {
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        pricing_and_others_details: {
          ...props.postPropertyInfo.pricing_and_others_details,
          additional_pricing_details: {
            ...additional_pricing_details,
            maintenance_details: {
              ...additional_pricing_details.maintenance_details,
              [e.target.name]: e.target.value,
            },
          },
        },
      };
    });
  };
  const updateCheckbox = (e) => {
    if (e.target.name === "all_inclusive_price") {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          pricing_and_others_details: {
            ...props.postPropertyInfo.pricing_and_others_details,
            price_details: {
              ...price_details,
              all_inclusive_price: true,
              tax_gov_charges_excluded: false,
              price_negotiable: false,
            },
          },
        };
      });
    }
    if (e.target.name === "tax_gov_charges_excluded") {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          pricing_and_others_details: {
            ...props.postPropertyInfo.pricing_and_others_details,
            price_details: {
              ...price_details,
              tax_gov_charges_excluded: true,
              all_inclusive_price: false,
              price_negotiable: false,
            },
          },
        };
      });
    }
    if (e.target.name === "price_negotiable") {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          pricing_and_others_details: {
            ...props.postPropertyInfo.pricing_and_others_details,
            price_details: {
              ...price_details,
              price_negotiable: true,
              tax_gov_charges_excluded: false,
              all_inclusive_price: false,
            },
          },
        };
      });
    }
  };
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
  // ------------------------RERA NUmber -------------------------------
  const handleReraNumbetr = (e) => {
    console.log("working------------");
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        pricing_and_others_details: {
          ...props.postPropertyInfo.pricing_and_others_details,
          reraNumber: e.target.value,
        },
      };
    });
  };      
  // -------------------------------- VALIDATION ---------------------------
  const navigate = useNavigate();
  const errorRef = useRef(null);
  const scrollError = () => errorRef.current.scrollIntoView();
  const pricing_and_others_details_validation = () => {
    const error_msg = {};
    if (ownership_details && ownership_details.length === 0) {
      scrollError();
      error_msg.ownership_details_error =
        " Please select ownership of the property";
    }
    if (
      price_details.expected_price &&
      price_details.expected_price.length === 0
    ) {
      scrollError();
      error_msg.expected_price_error = " Please enter expected price";
    }
    if (
      price_details.price_per_sqrft &&
      price_details.price_per_sqrft.length === 0
    ) {
      scrollError();
      error_msg.price_per_sqrft_error = " Please enter price per sqare fit";
    }
    if (
      price_details.available_for &&
      price_details.available_for.length === 0
    ) {
      // scrollError();
      error_msg.idealFor = " Please select idealFor.";
    }
    // if (
    //   !price_details.all_inclusive_price
    // ) {
    //   scrollError();
    //   error_msg.all_inclusive_price_error =
    //     " Please select all inclusive price";
    // }
    // if (!price_details.tax_gov_charges_excluded) {
    //   scrollError();
    //   error_msg.all_inclusive_price_error =
    //     " Please select all inclusive price";
    // }
    // if (!price_details.price_negotiable) {
    //   scrollError();
    //   error_msg.all_inclusive_price_error =
    //     " Please select all inclusive price";
    // }
    if (
      property_unique_description &&
      property_unique_description.length === 0
    ) {
      error_msg.description_error = " Please enter description";
    }
    if (!AvailableFamily) {
      error_msg.idealFor = " Please Select Ideal For...";
    }

    if (props.postPropertyInfo?.basic_details?.purpose_of_listing === "Sell") {
      if (!reraNumber) {
        error_msg.reraNumber = " Please enter your reraNumber";
      }
    }
    if (
      property_unique_description &&
      property_unique_description.length !== 0 &&
      property_unique_description.match(/(\w+)/g).length < 20
    ) {
      error_msg.description_error =
        " Please enter atleast 20 words in description";
    }

    // ------------------
    if (Object.keys(error_msg).length === 0) {
      //  props.updateStep();
      validate();
      console.log("step 1", error_msg);
    } else {
      setError(error_msg);
      console.log("step 2", error_msg);
    }
  };
  // -------------------------getUser Token -----------------------
  const getToken = JSON.parse(localStorage.getItem("accessToken"));
  const _id = getToken && getToken.response._id;
  const token = getToken && getToken.response.token;
  // console.log("userToken------------------------------------>", token);
  // -----------------------------------------------------------------
  const validate = async () => {
    // const formData = new FormData();

    const post_priceAndOthersData = {
      // data: {
      _id: props.basicRes && props.basicRes,
      step: "pricinganddetails",
      pricinganddetails: {
        ownership: ownership_details.toLowerCase(),
        pricingDetails: {
          expectedPrice: price_details.expected_price,
          pricePerSqrft: price_details.price_per_sqrft,
          advanceDeposit: Number(advanceDeposit),
        },
        allInclusivePrice: `${price_details.all_inclusive_price === true ? "yes" : "no"
          }`,
        taxandGovtChargesExcluded: `${price_details.tax_gov_charges_excluded === true ? "yes" : "no"
          }`,
        priceNegotiable: `${price_details.price_negotiable === true ? "yes" : "no"
          }`,
        additionalPricingDetails: {
          // -----------------------add maintenance price and details---------
          Maintenance:
            additional_pricing_details.maintenance_details.maintenance_price,
          BookingPrice: additional_pricing_details.booking_price,
          AnnualDuesPayable: additional_pricing_details.annual_dues_payable,
        },

        uniqueDescription: property_unique_description,
        someHouseRules: {
          petsAllowed: some_house_rules.pets_allow === "yes" ? true : false,
          visitorsAllowed:
            some_house_rules.visitors_allow === "yes" ? true : false,
          smokingAllowed:
            some_house_rules.smoking_allow === "yes" ? true : false,
          alcoholAllowed:
            some_house_rules.alcohol_allow === "yes" ? true : false,
          partyAllowed: some_house_rules.party_allow === "yes" ? true : false,
        },
        idealFor: available_for && available_for,
        firesaleOrNot: firesale,
        rera_number: reraNumber,
        // },
      },
    };
    console.log(post_priceAndOthersData);
    // formData.append("data", JSON.stringify(post_priceAndOthersData));

    let resPriceAndOther = await API_REQ_POST_WITH_TOKEN(
      configData.POST_PROPERTY_POST_DETAILS_URL,
      post_priceAndOthersData,
      token
    );
    console.log("resPriceAndOther1",resPriceAndOther);
    if (resPriceAndOther) {
      if (resPriceAndOther.success === true) {
        toast.success(resPriceAndOther.message);

        setTimeout(() => {
          navigate("/", { replace: true });
          // navigate(-1)
        }, 1000);
      } else {
        toast.warning(resPriceAndOther.message);
      }
    } else {
      toast.error("please check Your Internet connection !");
    }
  };
  console.log("props.basicRes==>", props.basicRes);
  // ------------------------------- JSX ------------------------------------
  return (
    <div className={`${POS.container}`}>
      {/* ------------------------------Back Button------------------------------ */}
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
      {/* ---------------------------Heading--------------------------------- */}
      <div>
        <h1 className="pt-1 pb-1">Add pricing and Other details...</h1>
        <br />
        {/* -----------------------------OwnerShip Section------------------------------- */}
        <div>
          <h5 className="mb-2 pt-1 pb-1">
            Ownership<sapn style={{ color: "red" }}>*</sapn>{" "}
            <span className={`${BDS.error}`} style={{ display: "inline" }}>
              {error.ownership_details_error}
            </span>
          </h5>
          <div className="d-flex flex-row justify-content-start align-item-center flex-wrap">
            {ownershipType.map((item, index) => {
              return (
                <input
                  type="button"
                  className={`${BDS.input} ${ownership_details === item ? `${POS.ownerSelected}` : ``
                    }`}
                  value={item}
                  name="ownership_details"
                  key={index}
                  onClick={(e) => {
                    selectOwner(e);
                  }}
                />
              );
            })}
          </div>
        </div>
        <br />
        {/* -------------------------Pricing Details Section------------------------------------ */}
        <div>
          <h5 className="pt-2 pb-2 mb-2">
            Pricing Details<sapn style={{ color: "red" }}>*</sapn>
            <span className={`${BDS.error}`} style={{ display: "inline" }}>
              {error.expected_price_error
                ? `${error.expected_price_error}`
                : `${error.price_per_sqrft_error
                  ? `${error.price_per_sqrft_error}`
                  : `${error.all_inclusive_price_error
                    ? `${error.all_inclusive_price_error}`
                    : ``
                  }`
                }`}
            </span>
          </h5>
          <div
            className={`${POS.inputDivContainer} ${props.postPropertyInfo.basic_details.purpose_of_listing ==
              "Rent/lease" && `${POS.pricesPerMonth}`
              }`}
          >
            <div className={`${POS.inpContainer}`}>
              <input
                type="number"
                id="expected_price"
                name="expected_price"
                value={
                  props.postPropertyInfo.pricing_and_others_details
                    .price_details.expected_price
                }
                onChange={price_details_handleChange}
                className={`${LDS.inputAdd}`}
                autoComplete="off"
                placeholder="  "
                onWheel={(e) => e.target.blur()}
              />
              <label htmlFor="expected_price" className={`${LDS.label}`}>
                &#x20b9; Expected Price
              </label>
            </div>
            {props.postPropertyInfo.basic_details &&
              props.postPropertyInfo.basic_details.purpose_of_listing &&
              props.postPropertyInfo.basic_details.purpose_of_listing ==
              "Rent/lease" ? (
              <>
                <label htmlFor="price_per_sqrft">/Price per month</label>
              </>
            ) : (
              <>
                <div className={`${POS.inpContainer}`}>
                  <input
                    type="number"
                    id="price_per_sqrft"
                    name="price_per_sqrft"
                    value={
                      props.postPropertyInfo.pricing_and_others_details
                        .price_details.price_per_sqrft
                    }
                    onChange={price_details_handleChange}
                    className={`${LDS.inputAdd}`}
                    autoComplete="off"
                    placeholder="  "
                    onWheel={(e) => e.target.blur()}
                  />
                  <label htmlFor="price_per_sqrft" className={`${LDS.label}`}>
                    &#x20b9; Price per {props.priceUnit}
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* ---------------------Tax Related Section------------------------------ */}
        <div className={`${POS.checkBoxContainer}`}>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <input
              className={`${POS.checkbox}`}
              type="checkbox"
              name="all_inclusive_price"
              checked={price_details.all_inclusive_price}
              onChange={updateCheckbox}
              id="all_inclusive_price"
            />
            <label htmlFor="all_inclusive_price">All inclusive price</label>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <input
              className={`${POS.checkbox}`}
              type="checkbox"
              name="tax_gov_charges_excluded"
              checked={price_details.tax_gov_charges_excluded}
              onChange={updateCheckbox}
              id="tax_gov_charges_excluded"
            />
            <label htmlFor="tax_gov_charges_excluded">
              Tax and Govt. charges excluded
            </label>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <input
              className={`${POS.checkbox}`}
              type="checkbox"
              name="price_negotiable"
              checked={price_details.price_negotiable}
              onChange={updateCheckbox}
              id="price_negotiable"
            />
            <label htmlFor="price_negotiable">Price Negotiable</label>
          </div>
        </div>
        <br />
        {/*   ---------------Advance deposite */}
        <div>
          <h5 className="pt-0 pb-2 mb-2">
            Advance Deposite<sapn style={{ color: "red" }}>*</sapn>
            <span className={`${BDS.error}`} style={{ display: "inline" }}>
              {error.expected_price_error
                ? `${error.expected_price_error}`
                : `${error.price_per_sqrft_error
                  ? `${error.price_per_sqrft_error}`
                  : `${error.all_inclusive_price_error
                    ? `${error.all_inclusive_price_error}`
                    : ``
                  }`
                }`}
            </span>
          </h5>
          <div
            className={`${POS.inputDivContainer} ${props.postPropertyInfo.basic_details.purpose_of_listing ==
              "Rent/lease" && `${POS.pricesPerMonth}`
              }`}
          >
            <div className={`${POS.inpContainer}`}>
              <input
                type="number"
                id="advanceDeposit"
                name="advanceDeposit"
                value={
                  props.postPropertyInfo.pricing_and_others_details
                    .price_details.advanceDeposit
                }
                onChange={handleInputChange}
                className={`${LDS.inputAdd}`}
                autoComplete="off"
                placeholder="  "
                onWheel={(e) => e.target.blur()}
              />
              <label htmlFor="expected_price" className={`${LDS.label}`}>
                &#x20b9; Advance
              </label>
            </div>
            
          </div>
        </div>
        {/* ----------------------Additional Price Section---------------------------- */}
        <div
          className={`d-flex flex-column justify-content-start align-items-start  ${POS.gap}`}
        >
          <h5 className="pt-3 pb-1 mb-1">
            Additional Pricing Details{" "}
            <span className={`${PPHS.span}`}>(Optional)</span>
          </h5>

          <div
            className={`d-flex flex-column justify-content-start align-items-center  ${POS.maintenanceSelectDiv}  `}
          >
            <div className={`${POS.inpContainer} w-100`}>
              <input
                type="number"
                id="maintenance_price"
                name="maintenance_price"
                value={
                  additional_pricing_details.maintenance_details
                    .maintenance_price
                }
                onChange={maintenance_details_handleChange}
                className={`${LDS.inputAdd}`}
                autoComplete="off"
                placeholder="  "
                onWheel={(e) => e.target.blur()}
              />
              <label htmlFor="maintenance_price" className={`${LDS.label}`}>
                &#x20b9; Maintenance
              </label>
            </div>
            <select
              className={`${POS.maintenanceSelect}`}
              name="maintenance_duration"
              onChange={maintenance_details_handleChange}
              id=""
              value={
                additional_pricing_details.maintenance_details
                  .maintenance_duration
              }
            >
              <option value="" disabled>
                Select duration
              </option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className={`${POS.inpContainer} `}>
            <input
              type="number"
              id="booking_price"
              name="booking_price"
              value={additional_pricing_details.booking_price}
              onChange={additional_pricing_handleChange}
              className={`${LDS.inputAdd}`}
              autoComplete="off"
              placeholder="  "
              onWheel={(e) => e.target.blur()}
            />
            <label htmlFor="booking_price" className={`${LDS.label}`}>
              &#x20b9; Booking Price
            </label>
          </div>

          <div className={`${POS.inpContainer} `}>
            <input
              type="number"
              id="annual_dues_payable"
              name="annual_dues_payable"
              value={additional_pricing_details.annual_dues_payable}
              onChange={additional_pricing_handleChange}
              className={`${LDS.inputAdd}`}
              autoComplete="off"
              placeholder="  "
              onWheel={(e) => e.target.blur()}
            />
            <label htmlFor="annual_dues_payable" className={`${LDS.label}`}>
              &#x20b9; Annual dues payable
            </label>
          </div>
          {/* <p>Add more pricing details</p> */}
        </div>
        <br />
        {/*  ----------- Some rules and description all component in SomeRules Component ---------- */}
        <SomeRules
          pricing_and_others_details={
            props.postPropertyInfo.pricing_and_others_details
          }
          setPostPropertyInfo={setPostPropertyInfo}
          error={error}
        />
        <br />
        {/*  ----------- famliy member or single ---------- */}
        <h5 className="pt-1 pb-1 mb-1">
          Ideal For:<sapn style={{ color: "red" }}>*</sapn>
          <span
            className={`${BDS.error} `}
            style={{
              display: "inline",
            }}
          >
            {error.idealFor}
          </span>
        </h5>
        {/* <div className="d-flex flex-row justify-content-start align-item-center flex-wrap">
          {AvailableFamily.map((item, index) => {
            return (
              <input
                type="button"
                className={`${BDS.input} ${
                  available_for &&
                  available_for.toLocaleLowerCase() === item.toLocaleLowerCase()
                    ? `${POS.ownerSelected}`
                    : ``
                }`}
                value={item}
                name="available_for"
                key={index}
                onClick={(e) => {
                  handleAvailableFamily(e);
                }}
              />
            );
          })}
        </div> */}
        <div className="d-flex flex-row justify-content-start align-item-center flex-wrap">
          {AvailableFamily.map((item, index) => {
            return (
              <input
                type="button"
                className={`${BDS.input} ${selectedItems.includes(item.toLocaleLowerCase())
                  ? `${POS.ownerSelected}` // Apply selected class if item is selected
                  : ``
                  }`}
                value={item}
                name="available_for"
                key={index}
                onClick={(e) => handleAvailableFamily(e, item)}
              />
            );
          })}
        </div>
        <br />

        {/* --------------------------Property Unique Features Description-------------------------------------- */}
        <div>
          <h5 className="pt-1 pb-1 mb-1">
            What makes your property unique
            <sapn style={{ color: "red" }}>*</sapn>
            <span
              className={`${BDS.error} `}
              style={{
                display: "inline",
              }}
            >
              {error.description_error}
            </span>
          </h5>
          <span className="d-block pt-1 pb-1">
            Adding description will increase your listing visiblity
          </span>
          <textarea
            name="property_unique_description"
            value={property_unique_description}
            onChange={selectOwner}
            id=""
            placeholder="Enter best features of your property..."
            maxLength={5000}
            cols="50"
            rows="5"
            className="p-2"
          />
          <span className="d-block pt-1 pb-1">
            Minimun 20 words required<sapn style={{ color: "red" }}>*</sapn>
          </span>
        </div>
      </div>
      {/* ----------------------FireSale Option---------------------------- */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          id="Firesale"
          // style={{ display: "none" }}
          checked={props.postPropertyInfo.pricing_and_others_details.firesale}
          onChange={() => handleFireSale()}
        />
        <span className="d-block pt-1 pb-1 px-3">Firesale</span>
      </div>

      {/* ----------------------RERA Number---------------------------- */}
      {props.postPropertyInfo?.basic_details?.purpose_of_listing === "Sell" && (
        <>
          <div>
            <h5 className="pt-1 pb-1 mb-1">
              Enter project RERA number.
              <sapn style={{ color: "red" }}>*</sapn>
              <span
                className={`${BDS.error} `}
                style={{
                  display: "inline",
                }}
              >
                {error.reraNumber}
              </span>
            </h5>
          </div>
          <div className={`${POS.inpContainer} `}>
            <input
              type="text"
              id="reraNumber"
              name="reraNumber"
              value={
                props.postPropertyInfo.pricing_and_others_details.reraNumber
              }
              onChange={handleReraNumbetr}
              className={`${LDS.inputAdd}`}
              autoComplete="off"
              placeholder="  "
              onWheel={(e) => e.target.blur()}
            />
            <label htmlFor="reraNumber" className={`${LDS.label}`}>
              RERA Number
            </label>
          </div>
        </>
      )}
      <br />

      <button
        className="btn btn-primary"
        onClick={() => {
          pricing_and_others_details_validation();
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

export default PricingAndOthers;
