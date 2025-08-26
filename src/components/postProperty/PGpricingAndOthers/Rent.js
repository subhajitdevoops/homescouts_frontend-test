import React from "react";
import LDS from "../css/locationDetails.module.css";
import BDS from "../css/BasicDetails.module.css";
import PPHS from "../css/propertyPhoto.module.css";
// import PGPOS from "../css/PGpricingAndOthers.module.css";

function Rent(props) {
  const pg_rent = props.pricing_and_others_details.pg_rent;
  const security_deposite = props.pricing_and_others_details.security_deposite;
  const setPostPropertyInfo = props.setPostPropertyInfo;
  const basicDetails=props.basic_details


  const error = props.error;
  // ------------------------------------------------------------
  const handleChange = (e) => {
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
  // ------------------------------------------------------------
  const handleChange2 = (e) => {
    if (e.target.value === "Fixed") {
      setPostPropertyInfo((olditem) => {
        return {
          ...olditem,
          pricing_and_others_details: {
            ...props.pricing_and_others_details,
            security_deposite: {
              [e.target.name]: e.target.value,
              fixed_deposite_value: "",
            },
          },
        };
      });
    } else if (e.target.value === "Multiple of Rent") {
      setPostPropertyInfo((olditem) => {
        return {
          ...olditem,
          pricing_and_others_details: {
            ...props.pricing_and_others_details,
            security_deposite: {
              [e.target.name]: e.target.value,
              no_of_months: "",
            },
          },
        };
      });
    } else if (e.target.value === "None") {
      setPostPropertyInfo((olditem) => {
        return {
          ...olditem,
          pricing_and_others_details: {
            ...props.pricing_and_others_details,
            security_deposite: {
              [e.target.name]: e.target.value,
            },
          },
        };
      });
    } else {
      setPostPropertyInfo((olditem) => {
        return {
          ...olditem,
          pricing_and_others_details: {
            ...props.pricing_and_others_details,
            security_deposite: {
              ...security_deposite,
              [e.target.name]: e.target.value,
            },
          },
        };
      });
    }
  };

  // ------------------- JSX --------------------
  return (
    <div>
      <h5 className="pt-1 pb-2 mb-1">
        Rent details {basicDetails&&basicDetails.purpose_of_listing=="PG"&& "Per Bed"} <sapn style={{color:'red'}}>*</sapn>
        <span className={`${BDS.error}`} style={{ display: "inline" }}>
          {error.pg_rent_error}
        </span>
      </h5>
      <div className={`${LDS.inputAddressContainer}gap-0`}>
        {" "}
        <div className={`${LDS.inpContainer}`}>
          <input
            type="number"
            id="rent"
            name="pg_rent"
            value={pg_rent}
            onChange={handleChange}
            className={`${LDS.inputAdd}`}
            autoComplete="off"
            placeholder="  "
          />
          <label htmlFor="rent" className={`${LDS.label}`}>
            &#x20b9; Expected Rent
          </label>
        </div>
      </div>
      {/* ---------- Security deposite section ---------------- */}
      <br />
      <div>
        <h5 className="pt-1 pb-2 mb-1">
          Security Deposite <span className={`${PPHS.span}`}>(Optional)</span>
        </h5>

        <div className="d-flex flex-row">
          {["Fixed", "Multiple of Rent", "None"].map((item, index) => {
            return (
              <input
                type="button"
                className={`${
                  security_deposite.security_deposite_type === item
                    ? `${BDS.selected}`
                    : `${BDS.input}`
                }`}
                name="security_deposite_type"
                value={item}
                key={index}
                onClick={handleChange2}
              />
            );
          })}
        </div>
        <div className="mt-3 mb-2">
          {security_deposite.security_deposite_type === "Fixed" ? (
            <div className={`${LDS.inpContainer}`}>
              <input
                type="number"
                id="deposite_value"
                name="fixed_deposite_value"
                value={security_deposite.fixed_deposite_value}
                onChange={handleChange2}
                className={`${LDS.inputAdd}`}
                autoComplete="off"
                placeholder="  "
              />
              <label htmlFor="deposite_value" className={`${LDS.label}`}>
                &#x20b9; Deposite Value
              </label>
            </div>
          ) : (
            ""
          )}

          {security_deposite.security_deposite_type === "Multiple of Rent" ? (
            <div className={`${LDS.inpContainer}`}>
              <input
                type="number"
                id="no_of_months_value"
                name="no_of_months"
                value={security_deposite.no_of_month}
                onChange={handleChange2}
                className={`${LDS.inputAdd}`}
                autoComplete="off"
                placeholder="  "
              />
              <label htmlFor="no_of_months_value" className={`${LDS.label}`}>
                &#x20b9; No. of Months (Max-12)
              </label>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Rent;
