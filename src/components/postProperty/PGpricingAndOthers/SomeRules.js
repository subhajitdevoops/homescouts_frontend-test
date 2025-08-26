import React from "react";
import PPS from "../css/propertyProfile.module.css";
import BDS from "../css/BasicDetails.module.css";
function SomeRules(props) {
  const some_house_rules = props.pricing_and_others_details.some_house_rules;

  const setPostPropertyInfo = props.setPostPropertyInfo;
  const error = props.error;
  // -------------------------
  const SomeStyle = { width: "25%" };
  // ----------------------------------------------
  const handleRadioButton = (e) => {
    setPostPropertyInfo((olditem) => {
      return {
        ...olditem,
        pricing_and_others_details: {
          ...props.pricing_and_others_details,
          some_house_rules: {
            ...some_house_rules,
            [e.target.name]: e.target.value,
          },
        },
      };
    });
  };
  // --------------------- Unique description ------------------
  const descriptionHandler = (e) => {
    setPostPropertyInfo((olditem) => {
      return {
        ...olditem,
        pricing_and_others_details: {
          ...props.pricing_and_others_details,
          [e.target.name]: e.target.value,
        },
      };
    });
  };
  // ---------------------- JSX --------------------
  return (
    <div>
      <br />
      <h5 className="pt-1 pb-1 mb-3">
        Some House Rules <span className={`${PPS.span}`}>(Optional)</span>
      </h5>

      <div className="d-flex flex-column gap-2">
        {/* ---------------------------- */}
        <div className="d-flex flex-row justify-content-between">
          <p>Pets Allowed</p>
          <div
            className="d-flex flex-row justify-content-between"
            style={{ ...SomeStyle }}
          >
            <div className="d-flex flex-row">
              <input
                type="radio"
                value="yes"
                name="pets_allow"
                id="petsYes"
                onChange={handleRadioButton}
                checked={some_house_rules.pets_allow === "yes"}
              />
              <label htmlFor="petsYes">Yes</label>
            </div>
            <div className="d-flex flex-row">
              <input
                type="radio"
                value="no"
                name="pets_allow"
                id="petsNo"
                onChange={handleRadioButton}
                checked={some_house_rules.pets_allow === "no"}
              />
              <label htmlFor="petsNo">No</label>
            </div>
          </div>
        </div>

        {/* ---------------------- */}
        <div className="d-flex flex-row justify-content-between">
          <p>Visitors Allowed</p>
          <div
            className="d-flex flex-row justify-content-between"
            style={{ ...SomeStyle }}
          >
            <div className="d-flex flex-row">
              <input
                type="radio"
                value="yes"
                name="visitors_allow"
                id="visitorsYes"
                onChange={handleRadioButton}
                checked={some_house_rules.visitors_allow === "yes"}
              />
              <label htmlFor="visitorsYes">Yes</label>
            </div>
            <div className="d-flex flex-row">
              <input
                type="radio"
                value="no"
                name="visitors_allow"
                id="visitorsNo"
                onChange={handleRadioButton}
                checked={some_house_rules.visitors_allow === "no"}
              />
              <label htmlFor="visitorsNo">No</label>
            </div>
          </div>
        </div>
        {/* ------------------------- */}
        <div className="d-flex flex-row justify-content-between">
          <p>Smoking Allowed</p>
          <div
            className="d-flex flex-row justify-content-between"
            style={{ ...SomeStyle }}
          >
            <div className="d-flex flex-row">
              <input
                type="radio"
                value="yes"
                name="smoking_allow"
                id="smokingYes"
                onChange={handleRadioButton}
                checked={some_house_rules.smoking_allow === "yes"}
              />
              <label htmlFor="smokingYes">Yes</label>
            </div>
            <div className="d-flex flex-row">
              <input
                type="radio"
                value="no"
                name="smoking_allow"
                id="smokingNo"
                onChange={handleRadioButton}
                checked={some_house_rules.smoking_allow === "no"}
              />
              <label htmlFor="smokingNo">No</label>
            </div>
          </div>
        </div>
        {/* ------------------------------ */}
        <div className="d-flex flex-row justify-content-between">
          <p>Alcohol Allowed</p>
          <div
            className="d-flex flex-row justify-content-between"
            style={{ ...SomeStyle }}
          >
            <div className="d-flex flex-row">
              <input
                type="radio"
                value="yes"
                name="alcohol_allow"
                id="alcoholYes"
                onChange={handleRadioButton}
                checked={some_house_rules.alcohol_allow === "yes"}
              />
              <label htmlFor="alcoholYes">Yes</label>
            </div>
            <div className="d-flex flex-row">
              <input
                type="radio"
                value="no"
                name="alcohol_allow"
                id="alcoholNo"
                onChange={handleRadioButton}
                checked={some_house_rules.alcohol_allow === "no"}
              />
              <label htmlFor="alcoholNo">No</label>
            </div>
          </div>
        </div>
        {/* ----------------------- */}
        <div className="d-flex flex-row justify-content-between">
          <p>Party Allowed</p>
          <div
            className="d-flex flex-row justify-content-between"
            style={{ ...SomeStyle }}
          >
            <div className="d-flex flex-row">
              <input
                type="radio"
                value="yes"
                name="party_allow"
                id="partyYes"
                onChange={handleRadioButton}
                checked={some_house_rules.party_allow === "yes"}
              />
              <label htmlFor="partyYes">Yes</label>
            </div>
            <div className="d-flex flex-row">
              <input
                type="radio"
                value="no"
                name="party_allow"
                id="partyNo"
                onChange={handleRadioButton}
                checked={some_house_rules.party_allow === "no"}
              />
              <label htmlFor="partyNo">No</label>
            </div>
          </div>
        </div>
      </div>
      {props.someDetails === true && (
        <>
          {/* --------------- Last entry time ----------- */}
          <div className="mt-2 mb-2">
            <select
              name="last_entry_time"
              onChange={handleRadioButton}
              value={some_house_rules.last_entry_time}
              id=""
              className="w-50"
              style={{
                height: "45px",
                borderColor: "grey",
                outline: "none",
              }}
            >
              <option value="" disabled>
                Last Entry Time
              </option>
              {[
                "7 PM",
                "7:30 PM",
                "8 PM",
                "8:30 PM",
                "9 PM",
                "9:30 PM",
                "10 PM",
                "10:30 PM",
                "11 PM",
                "11:30 PM",
                "12 PM",
              ].map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          {/* --------- textarea for another rules --------- */}
          <div className="mt-2 mb-2">
            <h6 className="pb-2 pt-2">Have any other rule?</h6>
            <textarea
              name="another_rule"
              id=""
              placeholder="Type any other rules that should be follow…"
              onChange={handleRadioButton}
              value={some_house_rules.another_rule}
              style={{ width: "80%", height: "120px" }}
            ></textarea>
          </div>
          {/* --------------- unique description ----- */}
          <div>
            <h5 className="pt-1 pb-1 mb-1">
              What makes your property unique
              <span className={`${BDS.error}`} style={{ display: "inline" }}>
                {error.property_unique_description_error
                  ? error.property_unique_description_error
                  : `${
                      error.short_unique_description_error
                        ? error.short_unique_description_error
                        : ``
                    }`}
              </span>
            </h5>
            <span className="d-block pt-1 pb-1">
              Adding description will increase your listing visiblity?<sapn style={{color:'red'}}>*</sapn>
            </span>
            <textarea
              name="property_unique_description"
              value={
                props.pricing_and_others_details.property_unique_description
              }
              onChange={descriptionHandler}
              id=""
              placeholder="Enter best features of your property..."
              maxLength={5000}
              cols="50"
              rows="5"
              className="p-2"
            />
            <span className="d-block pt-1 pb-1">
              Minimun 20 words required*
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default SomeRules;
