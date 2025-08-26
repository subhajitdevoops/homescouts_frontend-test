import React, { useState } from "react";
import Selects from "../../Home/SelectObject/Selects";

const SearchDetails = ({
  setOpValue,
  headValue,
  options,
  shorted,
  handleSelectValue,
  data,
  setData,
  avaFor,
}) => {
  const [select, setSelect] = useState([]);
  const [selectPg, setSelectPg] = useState("");

  const pgData = ["For boy", "For girl", "Any"];
  // ------------------select multiple value---------------------------
  const handleSelectFill = (short) => {
    if (select.indexOf(short) !== -1) {
      const servicelist = select.filter((sem) => sem !== short);
      setSelect(servicelist);
      console.log(" match");
    } else {
      setSelect([...select, short]);
    }

    if (select.indexOf(short) !== -1) {
      const RemoveValue = select.filter((sem) => sem !== short);
      setSelect(RemoveValue);
    } else {
      setSelect([...select, short]);
    }

    // ------------------------------------
    if (short == "feature") {
      const featureTrue = data.is_feacher[0] === true ? false : true;
      setData((oldData) => {
        return {
          ...oldData,
          is_feacher: [featureTrue],
        };
      });
    }
    if (short == "verified") {
      const verifiedTrue = data.is_verified[0] === true ? false : true;

      setData((oldData) => {
        return {
          ...oldData,
          is_verified: [verifiedTrue],
        };
      });
    }
  };
  const handleSelectFillPg = (short) => {
    if (selectPg == short) {
      setSelectPg("");
      setData((oldData) => {
        return {
          ...oldData,
          availableFor: [],
        };
      });
    } else {
      setSelectPg(short);
      if (short == "For boy") {
        setData((oldData) => {
          return {
            ...oldData,
            availableFor: ['boys'],
          };
        });
      } else if (short == "For girl") {
        setData((oldData) => {
          return {
            ...oldData,
            availableFor: ['girls'],
          };
        });
      } else {
        setData((oldData) => {
          return {
            ...oldData,
            availableFor: ["any"],
          };
        });
      }
    }
  };
  //availableFor:["boys","girls"],
  // is_verified:[false],
  // verified","feature

  return (
    <div className="flex_c SearchDetails_main_container_div">
      <div className="SearchDetails_highlits">
        <div className="SearchDetails_highlits_short">
          {shorted &&
            shorted.map((short, index) => (
              <p
                key={index}
                className={`sw c_t SearchDetails_pragraph ${
                  select.indexOf(short) !== -1 && "select"
                }`}
                onClick={(e) => handleSelectFill(short)}
              >
                {short.charAt(0).toUpperCase() + short.slice(1, short.length)}
              </p>
            ))}
          {avaFor &&
            pgData.map((short, index) => (
              <p
                key={index}
                className={`sw c_t SearchDetails_pragraph ${
                  selectPg == short && "select"
                }`}
                onClick={(e) => handleSelectFillPg(short)}
              >
                {short.charAt(0).toUpperCase() + short.slice(1, short.length)}
              </p>
            ))}
        </div>
      </div>
      <div
        className="b_r sw c_t SearchDetails_Details"
        style={{ width: "150px" }}
      >
        <Selects
          headValue={headValue}
          options={options}
          setOpValue={setOpValue}
          handleSelectValue={handleSelectValue}
        />
      </div>
    </div>
  );
};

export default SearchDetails;
