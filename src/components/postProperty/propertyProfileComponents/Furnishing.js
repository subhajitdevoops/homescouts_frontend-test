import React, { useState, useEffect, useRef } from "react";

import PPS from "../css/propertyProfile.module.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { API_REQ_GET } from "../../../config/API";
import configData from "../../../config/config.json";
import { toast } from "react-toastify";

function Furnishing(props) {
  const [select, setSelect] = useState(false);
  const [furnishDetails, setFurnishDetails] = useState("");
  console.log("furnishDetailsin in postProperty", furnishDetails);
  console.log("furnishDetailsin in number", 3+ +3);

  const furnishing_details = props.property_profile_info.furnishing_details;
  const furnishing_items =
    props.property_profile_info.furnishing_details.furnishing_items;
  const setPostPropertyInfo = props.setPostPropertyInfo;
  // console.log(furnishing_items);
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);
  const countIncrement = (name) => {
    for (let cur_elem of furnishing_items) {
      if (cur_elem.name === name) {
        cur_elem.count = cur_elem.count + 1;
      }
    }
    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          furnishing_details: {
            ...furnishing_details,
            furnishing_items: [...furnishing_items],
          },
        },
      };
    });
  };
  const countDecrement = (name, count) => {
    if (count > 0) {
      for (let cur_elem of furnishing_items) {
        if (cur_elem.name === name) {
          cur_elem.count = cur_elem.count - 1;
        }
      }
      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            furnishing_details: {
              ...furnishing_details,
              furnishing_items: [...furnishing_items],
            },
          },
        };
      });
    }
  };
  // ---------------------------------------------------------
  const handleSelect = (e) => {
    if (e.target.value !== "unfurnished") {
      if (furnishing_details.furnishing_type != e.target.value) {
        for (let cur_elem of furnishing_items) {
          if (cur_elem.count === null) {
            cur_elem.isAvilable = false;
          } else {
            if (cur_elem.count > 0) {
              cur_elem.count = 0;
            }
          }
        }
      }
    }
    setSelect(true);

    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          furnishing_details:
            e.target.value === "Un-furnished"
              ? {
                  furnishing_type: e.target.value,
                  furnishing_items: [...furnishing_items],
                }
              : {
                  furnishing_type: e.target.value,
                  furnishing_items: [...furnishing_items],
                },
        },
      };
    });

    if (e.target.value == "Furnished") {
      const furnishedData =
        furnishDetails &&
        furnishDetails.furnishingDetails &&
        furnishDetails.furnishingDetails[0].amenities;

      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,

            furnishing_details: {
              furnishing_type: e.target.value,
              furnishing_items: furnishedData,
            },
          },
        };
      });
    }
    if (e.target.value == "Semifurnished") {
      const furnishedData =
        furnishDetails &&
        furnishDetails.furnishingDetails &&
        furnishDetails.furnishingDetails[1].amenities;

      setPostPropertyInfo((olditems) => {
        return {
          ...olditems,
          property_profile_info: {
            ...props.property_profile_info,
            furnishing_details: {
              furnishing_type: e.target.value,
              furnishing_items: furnishedData,
            },
          },
        };
      });
    }
    console.log(e.target.value);
  };
  const handleCheckBox = (name, Avl) => {
    const objIndex = furnishing_items.findIndex((obj) => obj.name == name);
    furnishing_items[objIndex].isAvilable = !Avl;

    setPostPropertyInfo((olditems) => {
      return {
        ...olditems,
        property_profile_info: {
          ...props.property_profile_info,
          furnishing_details: {
            ...furnishing_details,
            furnishing_items: [...furnishing_items],
          },
        },
      };
    });
  };
  // -----------------------------------------------------------
  //outside click then close components-----

  // const myRef = useRef();
  // const handleClickOutside = (e) => {
  //   if (!myRef.current.contains(e.target)) {
  //     setSelect(false)
  //   }
  // };
  // const handleClickInside = () => {
  //   setSelect(true)
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // });
  const getGetFurnished = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_SERVICE_FURNISHED_GET_URL,
      userToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        if (ApiRes.result) {
          setFurnishDetails(ApiRes.result);
        }
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  useEffect(() => {
    getGetFurnished();
  }, []);
  return (
    <div>
      <h5 className="pt-1 pb-2 mb-1">
        Furnishing <span className={`${PPS.span}`}>(Optional)</span>
      </h5>
      <div
        className={`d-flex flex-row justify-content-start align-items-center pt-1 pb-1 flex-wrap ${PPS.gap}`}
      >
        <input
          className={`${PPS.inputBtn2} ${
            furnishing_details.furnishing_type === "Furnished"
              ? `${PPS.Selected}`
              : ""
          }`}
          type="button"
          value="Furnished"
          onClick={(e) => {
            handleSelect(e);
          }}
        />
        <input
          className={`${PPS.inputBtn2} ${
            furnishing_details.furnishing_type === "Semifurnished"
              ? `${PPS.Selected}`
              : ""
          }`}
          type="button"
          value="Semifurnished"
          onClick={(e) => {
            handleSelect(e);
          }}
        />
        <input
          className={`${PPS.inputBtn2} ${
            furnishing_details.furnishing_type === "unfurnished"
              ? `${PPS.Selected}`
              : ""
          }`}
          type="button"
          value="unfurnished"
          onClick={(e) => {
            handleSelect(e);
          }}
        />
      </div>
      {/* -----------Furnishing Items Div------------- */}
      {select === true && (
        <>
          {furnishing_details.furnishing_type === "Furnished" ||
          furnishing_details.furnishing_type === "Semifurnished" ? (
            <div
              className={`d-flex flex-row justify-content-between align-items-start ${PPS.gap} ${PPS.FurnishingItemContainer}`}
            >
              {/* button div */}
              <div className={`${PPS.buttonItemsDiv}`}>
                {furnishing_items.map((items, index) => {
                  return (
                    <div className={`${PPS.buttonItem}`} key={index}>
                      {items.count === null ? (
                        <div className="w-25 px-2">
                          <input
                            type="checkbox"
                            checked={items.isAvilable}
                            className="border border-primary"
                            onChange={() =>
                              handleCheckBox(items.name, items.isAvilable)
                            }
                          />
                        </div>
                      ) : (
                        <div
                          className={`d-flex flex-row justify-content-start align-items-center`}
                          key={index + "innerDiv"}
                        >
                          <AiOutlineMinusCircle
                            className={`${PPS.PlusCircle}`}
                            onClick={() => {
                              countDecrement(items.name, items.count);
                            }}
                            key={index + "minus"}
                          />
                          <span className={`${PPS.splSpan}`}>
                            {items.count}
                          </span>
                          <AiOutlinePlusCircle
                            className={`${PPS.PlusCircle}`}
                            onClick={() => {
                              countIncrement(items.name, items.count);
                            }}
                            key={index + "plus"}
                          />
                        </div>
                      )}
                      <p
                        style={{
                          fontSize: "12px",
                          marginLeft: "12px",
                          userSelect: "none",
                        }}
                        className={`p-1 w-100`}
                        key={index + "para"}
                      >
                        {items.name}
                      </p>
                    </div>
                  );
                })}
              </div>
              <MdClose
                onClick={() => setSelect(false)}
                className={`${PPS.MdCloses}`}
              />
            </div>
          ) : (
            ""
          )}{" "}
        </>
      )}
    </div>
  );
}

export default Furnishing;
