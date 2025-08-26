import React, { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import AuthContext from "../../../context/AuthProvider";
import { useEffect } from "react";
import { parse } from "@fortawesome/fontawesome-svg-core";

const FilterCom = ({
  heading,
  dataOption,
  data,
  setData,
  topicValue,
  setTopicValue,
  KeyNames,
  setOpValueMin,
  setOpValueMax,
  cancelButton,
  setFiltersData,
  FiltersData,
  setSetselectPg,
  catagorys,
  setCatagorys,
  subcatagorys,
  setSubCatagorys,
  selectPg,
}) => {
  const value = useContext(AuthContext);
  const handleSelectOption = (val) => {
    //value.typeOfBusiness
    const selectValue = val;
    //----------------------------noOfBedRooms-------------------------------------
    if (KeyNames === "noOfBedRooms") {
      if (topicValue.indexOf(selectValue) !== -1) {
        const RemoveValue = topicValue.filter((sem) => sem !== selectValue);
        setTopicValue(RemoveValue);
        const sp = selectValue.split(" ");
        const newSV= parseInt(sp[0], 10)

        const dataValue = data.noOfBedRooms.filter((sem) => sem !== newSV);
        setData((olddata) => {
          return {
            ...olddata,
            noOfBedRooms: [...dataValue],
          };
        });
      } else {
        setTopicValue([...topicValue, selectValue]);
        const sp = selectValue.split(" ");
        const newSV= parseInt(sp[0], 10)


        setData((olddata) => {
          return {
            ...olddata,
            noOfBedRooms: [...data.noOfBedRooms,newSV],
          };
        });
      }
    } else if (KeyNames === "typeOfProperty") {
      if (topicValue.indexOf(selectValue) !== -1) {
        const RemoveValue = topicValue.filter((sem) => sem !== selectValue);
        setSetselectPg(!selectPg);
        setTopicValue(RemoveValue);
        //------------------------------------------
        if (selectValue == "pg") {
          // value.setTypeOfBusiness("sell");
          setData((olddata) => {
            return {
              ...olddata,
              typeOfBusiness: [],
            };
          });
          setSetselectPg(!selectPg);
        } else {
          const dataValue = data.typeOfProperty.filter(
            (sem) => sem !== selectValue
          );
          setData((olddata) => {
            return {
              ...olddata,
              typeOfProperty: [...dataValue],
            };
          });
        }
        //---------------------------------------------
        // console.log('FiltersData.subCatagoryData',FiltersData.subCatagoryData);
        // if (!FiltersData.subCatagoryData) {
        for (let outElem of FiltersData.subCatagoryData) {
          if (RemoveValue.indexOf(outElem.name) !== -1) {
            const RemoveValues = RemoveValue.filter(
              (sem) => sem !== outElem.name
            );
            setTopicValue(RemoveValues);
          }
        }
        // }
        setFiltersData((oldData) => {
          return {
            ...oldData,
            catagory: [],
            subCatagory: [],
          };
        });
        // ------------------------------------------------------------
        for (let outerEle of FiltersData.dynamicData.typeOfProperty) {
          if (outerEle.name == selectValue) {
            setFiltersData((olddata) => {
              return {
                ...olddata,
                // subCatagoryData: [],
                subCatagory: [],
              };
            });
          }
        }
        setFiltersData((olddata) => {
          return {
            ...olddata,
            catagory: [],
          };
        });
      } else {
        if (selectValue == "residential") {
          if (
            topicValue.indexOf("commertial") !== -1 ||
            topicValue.indexOf("pg") !== -1
          ) {
            let RemoveValue = topicValue.filter(
              (sem) =>
                sem !== "commertial" &&
                sem !== "pg" &&
                !catagorys.includes(value) &&
                subcatagorys.includes(value)
            );
            RemoveValue.push("residential");
            setTopicValue(RemoveValue);
            setFiltersData((oldData) => {
              return {
                ...oldData,
                catagory: [],
                subCatagory: [],
              };
            });
            setData((olddata) => {
              return {
                ...olddata,
                catagory: [],
                subCatagory: [],
                typeOfBusiness: [],
                typeOfProperty: ["residential"],
              };
            });
            setSetselectPg(!selectPg);
          } else {
            console.log("this is 0 state");

            if (topicValue.indexOf("residential") !== -1) {
              console.log("this is 1");
              const RemoveValue = topicValue.filter(
                (sem) => sem !== selectValue
              );
              setTopicValue(RemoveValue);
              setSetselectPg(!selectPg);
              setData((olddata) => {
                return {
                  ...olddata,

                  typeOfProperty: [selectValue],
                };
              });
            } else {
              console.log("this is 2");

              setSetselectPg(!selectPg);
              setTopicValue([...topicValue, selectValue]);
              setData((olddata) => {
                return {
                  ...olddata,

                  typeOfProperty: [selectValue],
                };
              });
            }
          }
        }

        // ---------------------------------------
        if (selectValue == "commertial") {
          if (
            topicValue.indexOf("residential") !== -1 ||
            topicValue.indexOf("pg") !== -1
          ) {
            let RemoveValue = topicValue.filter(
              (sem) =>
                sem !== "residential" &&
                sem !== "pg" &&
                !catagorys.includes(value) &&
                subcatagorys.includes(value)
            );
            RemoveValue.push("commertial");
            setTopicValue(RemoveValue);

            setFiltersData((oldData) => {
              return {
                ...oldData,
                catagory: [],
                subCatagory: [],
              };
            });
            setData((olddata) => {
              return {
                ...olddata,
                catagory: [],
                subCatagory: [],
                typeOfBusiness: [],
                typeOfProperty: ["commertial"],
              };
            });
            setSetselectPg(!selectPg);
          } else {
            setSetselectPg(!selectPg);
            setTopicValue([...topicValue, selectValue]);
            setData((olddata) => {
              return {
                ...olddata,
                typeOfProperty: [],
              };
            });
          }
        }

        if (selectValue == "pg") {
          let RemoveValue = topicValue.filter(
            (sem) =>
              sem !== "residential" &&
              sem !== "commertial" &&
              !catagorys.includes(value) &&
              subcatagorys.includes(value)
          );
          RemoveValue.push("pg");
          setTopicValue(RemoveValue);
          // value.setTypeOfBusiness(selectValue);
          setSetselectPg(!selectPg);
          // setTopicValue([...topicValue, selectValue]);
          setData((olddata) => {
            return {
              ...olddata,
              catagory: [],
              subCatagory: [],
              typeOfBusiness: [selectValue],
              typeOfProperty: [],
            };
          });
        }

        // ------------------------------------------------------------
        const catagory = [];
        for (let outerEle of FiltersData.dynamicData.typeOfProperty) {
          if (outerEle.name == selectValue) {
            for (let innerEle of outerEle.catagory) {
              catagory.push(innerEle.name);
            }
            setFiltersData((olddata) => {
              return {
                ...olddata,
                subCatagoryData: outerEle.catagory,
              };
            });
          }
        }
        // console.log("residential===>", catagory);
        setFiltersData((olddata) => {
          return {
            ...olddata,
            catagory: catagory,
          };
        });
      }
    } else if (KeyNames === "catagory") {
      if (topicValue.indexOf(selectValue) !== -1) {
        const RemoveValue = topicValue.filter((sem) => sem !== selectValue);
        setTopicValue(RemoveValue);
        const dataValue = data.catagory.filter((sem) => sem !== selectValue);
        setData((olddata) => {
          return {
            ...olddata,
            catagory: [...dataValue],
          };
        });
        // ------------------------------------------------------------
        setFiltersData((olddata) => {
          return {
            ...olddata,
            subCatagory: [],
          };
        });
      } else {
        setTopicValue([...topicValue, selectValue]);
        setCatagorys([...topicValue, selectValue]);
        setData((olddata) => {
          return {
            ...olddata,
            catagory: [...data.catagory, selectValue],
          };
        });
        // console.log("subCatagoryData===>", subCatagoryData);
        console.log(
          "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx===>"
        );

        // ------------------------------------------------------------
        const sub_Catagory = [];
        for (let outerEle of FiltersData.subCatagoryData) {
          if (outerEle.name == selectValue) {
            for (let innerEle of outerEle.subCatagory) {
              sub_Catagory.push(innerEle.name);
            }
          }
        }
        setFiltersData((olddata) => {
          return {
            ...olddata,
            subCatagory: sub_Catagory,
          };
        });
      }
    } else if (KeyNames === "subCatagory") {
      if (topicValue.indexOf(selectValue) !== -1) {
        const RemoveValue = topicValue.filter((sem) => sem !== selectValue);
        setTopicValue(RemoveValue);
        const dataValue = data.subCatagory.filter((sem) => sem !== selectValue);
        setData((olddata) => {
          return {
            ...olddata,
            subCatagory: [...dataValue],
          };
        });
      } else {
        setTopicValue([...topicValue, selectValue]);
        setData((olddata) => {
          return {
            ...olddata,
            subCatagory: [...data.subCatagory, selectValue],
          };
        });
      }
    } else if (KeyNames === "ownership") {
      if (topicValue.indexOf(selectValue) !== -1) {
        const RemoveValue = topicValue.filter((sem) => sem !== selectValue);
        setTopicValue(RemoveValue);
        const dataValue = data.ownership.filter((sem) => sem !== selectValue);
        setData((olddata) => {
          return {
            ...olddata,
            ownership: [...dataValue],
          };
        });
      } else {
        setTopicValue([...topicValue, selectValue]);
        setData((olddata) => {
          return {
            ...olddata,
            ownership: [...data.ownership, selectValue],
          };
        });
      }
    } else if (KeyNames === "furnishingType") {
      if (topicValue.indexOf(selectValue) !== -1) {
        const RemoveValue = topicValue.filter((sem) => sem !== selectValue);
        setTopicValue(RemoveValue);
        const dataValue = data.furnishingType.filter(
          (sem) => sem !== selectValue
        );
        setData((olddata) => {
          return {
            ...olddata,
            furnishingType: [...dataValue],
          };
        });
      } else {
        setTopicValue([...topicValue, selectValue]);
        setData((olddata) => {
          return {
            ...olddata,
            furnishingType: [...data.furnishingType, selectValue],
          };
        });
      }
    } else if (KeyNames === "availableFor") {
      if (topicValue.indexOf(selectValue) !== -1) {
        const RemoveValue = topicValue.filter((sem) => sem !== selectValue);
        setTopicValue(RemoveValue);
        const dataValue = data.availableFor.filter(
          (sem) => sem !== selectValue
        );
        setData((olddata) => {
          return {
            ...olddata,
            availableFor: [...dataValue],
          };
        });
      } else {
        setTopicValue([...topicValue, selectValue]);
        setData((olddata) => {
          return {
            ...olddata,
            availableFor: [...data.availableFor, selectValue],
          };
        });
      }
    } else if (KeyNames === "ageOfProperty") {
      if (topicValue.indexOf(selectValue) !== -1) {
        console.log('ageofproperty',selectValue);

        const RemoveValue = topicValue.filter((sem) => sem !== selectValue);
        setTopicValue(RemoveValue);
        const dataValue = data.ageOfProperty.filter(
          (sem) => sem !== selectValue
        );
        setData((olddata) => {
          return {
            ...olddata,
            ageOfProperty: [...dataValue],
          };
        });
      } else {
        console.log('ageofproperty',selectValue);
        setTopicValue([...topicValue, selectValue]);
        setData((olddata) => {
          return {
            ...olddata,
            ageOfProperty: [...data.ageOfProperty, selectValue],
          };
        });
      }
    } else if (KeyNames === "location") {
      if (topicValue.indexOf(selectValue) !== -1) {
        const RemoveValue = topicValue.filter((sem) => sem !== selectValue);
        setTopicValue(RemoveValue);
        const dataValue = data.location.filter((sem) => sem !== selectValue);
        setData((olddata) => {
          return {
            ...olddata,
            location: [...dataValue],
          };
        });
      } else {
        setTopicValue([...topicValue, selectValue]);
        setData((olddata) => {
          return {
            ...olddata,
            location: [...data.location, selectValue],
          };
        });
      }
    } else if (KeyNames === "budgetFilterdata") {
      setTopicValue([]);
      setData((olddata) => {
        return {
          ...olddata,
          expectedPrice: [],
        };
      });
    } else if (KeyNames === "carpetFilterdata") {
      setTopicValue([]);
      setOpValueMin("Min Area");
      setOpValueMax("Max Area");
      setData((olddata) => {
        return {
          ...olddata,
          carpetArea: [],
        };
      });
    } else if (KeyNames === "allFilterdata") {
      if (topicValue.indexOf(selectValue) !== -1) {
        const RemoveValue = topicValue.filter((sem) => sem !== selectValue);
        setTopicValue(RemoveValue);
        // ---------noOfBedRooms--------
        const sp = selectValue.split(" ");
        const newSV= parseInt(sp[0], 10)


        if (data.noOfBedRooms.indexOf(newSV) !== -1) {
          const dataValue = data.noOfBedRooms.filter((sem) => sem !== newSV);
          setData((olddata) => {
            return {
              ...olddata,
              noOfBedRooms: [...dataValue],
            };
          });
        }

        // ---------typeOfProperty--------

        console.log("here some changes need to do", data, selectValue);
        if (data.typeOfProperty.indexOf(selectValue) !== -1) {
          const dataValue = data.typeOfProperty.filter(
            (sem) => sem !== selectValue
          );
          setData((olddata) => {
            return {
              ...olddata,
              typeOfProperty: [...dataValue],
            };
          });
          //-----------------------------------------------------
        }
        // ---------ownership--------
        if (data.ownership.indexOf(selectValue) !== -1) {
          const dataValue = data.ownership.filter((sem) => sem !== selectValue);
          setData((olddata) => {
            return {
              ...olddata,
              ownership: [...dataValue],
            };
          });
        }
        // furnishingType
        if (data.furnishingType.indexOf(selectValue) !== -1) {
          const dataValue = data.furnishingType.filter(
            (sem) => sem !== selectValue
          );
          setData((olddata) => {
            return {
              ...olddata,
              furnishingType: [...dataValue],
            };
          });
        }
        // ---------availableFor--------
        if (data.availableFor.indexOf(selectValue) !== -1) {
          const dataValue = data.availableFor.filter(
            (sem) => sem !== selectValue
          );
          setData((olddata) => {
            return {
              ...olddata,
              availableFor: [...dataValue],
            };
          });
        }
        // ---------ageOfProperty--------
        if (data.ageOfProperty.indexOf(selectValue) !== -1) {
          const dataValue = data.ageOfProperty.filter(
            (sem) => sem !== selectValue
          );
          setData((olddata) => {
            return {
              ...olddata,
              ageOfProperty: [...dataValue],
            };
          });
        }
        // ---------location--------
        if (data.location.indexOf(selectValue) !== -1) {
          const dataValue = data.location.filter((sem) => sem !== selectValue);
          setData((olddata) => {
            return {
              ...olddata,
              location: [...dataValue],
            };
          });
        }
        // ---------typeOfBusiness--------
        if (data.typeOfBusiness.indexOf(selectValue) !== -1) {
          const dataValue = data.typeOfBusiness.filter(
            (sem) => sem !== selectValue
          );
          setData((olddata) => {
            return {
              ...olddata,
              typeOfBusiness: [...dataValue],
            };
          });
        }
        // ---------catagory--------
        if (data.catagory.indexOf(selectValue) !== -1) {
          const dataValue = data.catagory.filter((sem) => sem !== selectValue);
          setData((olddata) => {
            return {
              ...olddata,
              catagory: [...dataValue],
            };
          });
        } // ---------subCatagory--------
        if (data.subCatagory.indexOf(selectValue) !== -1) {
          const dataValue = data.subCatagory.filter(
            (sem) => sem !== selectValue
          );
          setData((olddata) => {
            return {
              ...olddata,
              subCatagory: [...dataValue],
            };
          });
        }
      }
    } else {
      console.log("nothings");
    }
  };
  useEffect(() => {}, [topicValue]);
  return (
    <div className="filter_proporty_main_container_div">
      <div>
        <h4 className="c_t filter_proporty_heading">{heading} </h4>
      </div>
      <div className="filter_proporty_container_div ">
        {dataOption &&
          dataOption.map((option, index) => (
            <>
              {option ? (
                <div style={{ position: "relative" }}>
                  <option
                    key={index}
                    value={`${option}`}
                    onClick={(e) => handleSelectOption(e.target.value)}
                    className={`sw c_t option_box ${
                      topicValue.indexOf(option) !== -1 && "filerproperty"
                    }`}
                  >
                    {/* {option} */}
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                  {cancelButton === true ? (
                    <MdCancel
                      className="Filter_MdOutlineCancel"
                      onClick={() => handleSelectOption(option)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default FilterCom;
