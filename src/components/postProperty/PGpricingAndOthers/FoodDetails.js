import React from "react";
import BDS from "../css/BasicDetails.module.css";
// import PPHS from "../css/propertyPhoto.module.css";
// import LDS from "../css/locationDetails.module.css";
import PPS from "../css/propertyProfile.module.css";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

function FoodDetails(props) {
  const food_details = props.pricing_and_others_details.food_details;
  const setPostPropertyInfo = props.setPostPropertyInfo;
  const meal_availability_on_weekdays =
    props.pricing_and_others_details.food_details.meal_availability_on_weekdays;
  const meal_availability_on_weekends =
    props.pricing_and_others_details.food_details.meal_availability_on_weekends;

  const error = props.error;

  // -----------------------------------------------------
  const handleChange = (e) => {
    if (e.target.value === "Available") {
      setPostPropertyInfo((olditem) => {
        return {
          ...olditem,
          pricing_and_others_details: {
            ...props.pricing_and_others_details,
            food_details: {
              [e.target.name]: e.target.value,
              meal_type: "",
              meal_availability_on_weekdays: [],
              meal_availability_on_weekends: [],
            },
          },
        };
      });
    } else if (e.target.name === "meal_type") {
      setPostPropertyInfo((olditem) => {
        return {
          ...olditem,
          pricing_and_others_details: {
            ...props.pricing_and_others_details,
            food_details: {
              ...food_details,
              meal_type: e.target.value,
              meal_availability_on_weekdays: [],
              meal_availability_on_weekends: [],
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
            food_details: {
              [e.target.name]: e.target.value,
            },
          },
        };
      });
    }
  };
  // ------------------------------------------
  const handleClickIcon = (items) => {
    if (meal_availability_on_weekdays.indexOf(items) === -1) {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          pricing_and_others_details: {
            ...props.pricing_and_others_details,
            food_details: {
              ...food_details,
              meal_availability_on_weekdays: [
                ...meal_availability_on_weekdays,
                items,
              ],
            },
          },
        };
      });
    } else {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          pricing_and_others_details: {
            ...props.pricing_and_others_details,
            food_details: {
              ...food_details,
              meal_availability_on_weekdays:
                meal_availability_on_weekdays.filter((item, index) => {
                  return item !== items;
                }),
            },
          },
        };
      });
    }
  };
  //-------------------------------------
  const handleClickIcon2 = (items) => {
    if (meal_availability_on_weekends.indexOf(items) === -1) {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          pricing_and_others_details: {
            ...props.pricing_and_others_details,
            food_details: {
              ...food_details,
              meal_availability_on_weekends: [
                ...meal_availability_on_weekends,
                items,
              ],
            },
          },
        };
      });
    } else {
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          pricing_and_others_details: {
            ...props.pricing_and_others_details,
            food_details: {
              ...food_details,
              meal_availability_on_weekends:
                meal_availability_on_weekends.filter((item, index) => {
                  return item !== items;
                }),
            },
          },
        };
      });
    }
  };
  // ----------------------- JSX ---------------------------------
  return (
    <div>
      <br />
      <h5 className="pb-2 mb-1 pt-1">
        Food Details<sapn style={{color:'red'}}>*</sapn>
        <span className={`${BDS.error}`} style={{ display: "inline" }}>
          {error.food_availability_error}
        </span>
      </h5>
      <div className="d-flex flex-row">
        {["Available", "Not Available"].map((item, index) => {
          return (
            <input
              type="button"
              className={`${
                food_details.food_availability === item
                  ? `${BDS.selected}`
                  : `${BDS.input}`
              }`}
              name="food_availability"
              value={item}
              key={index}
              onClick={handleChange}
            />
          );
        })}
      </div>

      {/* --------------------------------------------------- */}
      {food_details.food_availability === "Available" ? (
        <div className="">
          <h6 className="pb-1 mt-2 pt-1">
            Meal types <span className={`${PPS.span}`}>(Optional)</span>
          </h6>
          <div className="d-flex flex-row">
            {["Only Veg", "Veg & Non-Veg"].map((item, index) => {
              return (
                <input
                  type="button"
                  className={`${
                    food_details.meal_type === item
                      ? `${BDS.selected}`
                      : `${BDS.input}`
                  }`}
                  name="meal_type"
                  value={item}
                  key={index}
                  onClick={handleChange}
                />
              );
            })}
          </div>
          <div className="mt-2 mb-2">
            <h6 className="pt-1 pb-2 mb-1">
              Availability of meal on weekdays
              <span className={`${PPS.span}`}>(Optional)</span>
            </h6>

            <div
              className={`d-flex flex-row justify-content-start align-items-center flex-wrap pt-1 pb-1 ${PPS.gap}`}
            >
              {" "}
              {["Breakfast", "Lunch", "Dinner"].map((item, index) => {
                return (
                  <div
                    className={`d-flex flex-row justify-content-between align-items-center  ${
                      PPS.inputDiv
                    }
              ${
                meal_availability_on_weekdays.indexOf(item) !== -1
                  ? `${PPS.selected}`
                  : ""
              }`}
                    key={index}
                  >
                    {meal_availability_on_weekdays.indexOf(item) !== -1 ? (
                      <AiOutlineCheck
                        style={{
                          display: "block",
                          transition: "inherit !important",
                          transitionDelay: "inherit !important",
                        }}
                        onClick={() => {
                          handleClickIcon(item);
                        }}
                      />
                    ) : (
                      <AiOutlinePlus
                        style={{
                          display: "block",
                          transition: "inherit !important",
                          transitionDelay: "inherit !important",
                        }}
                        onClick={() => {
                          handleClickIcon(item);
                        }}
                      />
                    )}

                    <input
                      className={`${PPS.inputBtn}`}
                      type="button"
                      value={item}
                      onClick={() => {
                        handleClickIcon(item);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* --------------------------------------- */}
          <div>
            <h6 className="pt-1 pb-2 mb-1">
              Availability of meal on weekends
              <span className={`${PPS.span}`}>(Optional)</span>
            </h6>

            <div
              className={`d-flex flex-row justify-content-start align-items-center flex-wrap pt-1 pb-1 ${PPS.gap}`}
            >
              {" "}
              {["Breakfast", "Lunch", "Dinner"].map((item, index) => {
                return (
                  <div
                    className={`d-flex flex-row justify-content-between align-items-center  ${
                      PPS.inputDiv
                    }
              ${
                meal_availability_on_weekends.indexOf(item) !== -1
                  ? `${PPS.selected}`
                  : ""
              }`}
                    key={index}
                  >
                    {meal_availability_on_weekends.indexOf(item) !== -1 ? (
                      <AiOutlineCheck
                        style={{
                          display: "block",
                          transition: "inherit !important",
                          transitionDelay: "inherit !important",
                        }}
                        onClick={() => {
                          handleClickIcon2(item);
                        }}
                      />
                    ) : (
                      <AiOutlinePlus
                        style={{
                          display: "block",
                          transition: "inherit !important",
                          transitionDelay: "inherit !important",
                        }}
                        onClick={() => {
                          handleClickIcon2(item);
                        }}
                      />
                    )}

                    <input
                      className={`${PPS.inputBtn}`}
                      type="button"
                      value={item}
                      onClick={() => {
                        handleClickIcon2(item);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        ``
      )}
    </div>
  );
}

export default FoodDetails;
