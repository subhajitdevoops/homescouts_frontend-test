import React, { useContext, useEffect, useState } from "react";
import Selects from "../../Home/SelectObject/Selects";
// import RangeSliders from "./RangeSliders";
import "./Filter.css";
import FilterCom from "./FilterCom";
import Rangeslider from "./RangeSlider/Rangeslider";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_GET } from "../../../config/API";
import configData from "../../../config/config.json";
import AuthContext from "../../../context/AuthProvider";

const Filter = ({ data, setData, setSetselectPg, selectPg, avaFor }) => {
  const value = useContext(AuthContext);
  const filData = value.selectSearch ? [value.selectSearch] : [];
  const [topicValue, setTopicValue] = useState([...filData]); //----allFilter value store to display
  console.log("topicValue==>", topicValue);
  const [budgetValue, setBudgetValue] = useState([]);
  const [carpetValue, setCarpetValue] = useState([]);

  const [minValue, set_minValue] = useState(5);
  const [maxValue, set_maxValue] = useState(20);

  const [place, setPlace] = useState("");
  // const [dynamicValue, setDyanamicValue] = useState("");

  const [catagorys, setCatagorys] = useState([]);
  const [subcatagorys, setSubCatagorys] = useState([]);

  // --------------------------tests data object------------
  const [FiltersData, setFiltersData] = useState({
    noOfBedroom: [
      "1 RK/BHK",
      "2 BHK",
      "3 BHK",
      "4 BHK",
      "5 BHK",
      "6 BHK",
      "7 BHK",
      "8 BHK",
    ],
    typeOfProperty: [
      // "Residential Apartment",
      // "Independent House/Villa",
      // "Independent/Builder Floor",
      // "Farm House",
      // "Serviced Apartments",
    ],
    catagory: [],
    subCatagory: [],
    typesOfPosts: [
      // "Owner", "Builder", "Dealer", "Top Dealer"
    ],
    furnishingStatus: [
      // "Furnished", "Unfurnished", "Semifurnished"
    ],
    // subFurnishingData:[],
    subFurnishing: [
      // "Furnished", "Unfurnished", "Semifurnished"
    ],
    availableFor: [
      "family",
      "bachelors",
      "single men",
      "single women",
      "other",
    ],
    ageOfProperty: [
      // "0-1 years old",
      // "1-5 years old",
      // "5-10 years old",
      // "10+ years old",
      // "20+ years old",
    ],
    optionMin: [
      "100",
      "200",
      "300",
      "400",
      "500",
      "700",
      "800",
      "900",
      "1000",
      "1500",
      "2000",
      "2500",
    ],
    optionMax: [
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1700",
      "1800",
      "1900",
      "2000",
      "2500",
      "3000",
      "3500",
    ],
    dynamicData: [],
  });
  // console.log("FiltersData=>>", FiltersData);

  const [opValueMin, setOpValueMin] = useState("Min Area");
  const [opValueMax, setOpValueMax] = useState("Max Area");
  // ----------------------------budget select----------------------
  // const handleInputRangeSlider = (e) => {
  //   set_minValue(e.minValue);
  //   set_maxValue(e.maxValue);
  //   setData((oldData) => {
  //     return {
  //       ...oldData,
  //       expectedPrice: [e.minValue, e.maxValue],
  //     };
  //   });
  //   const val = `${e.minValue}-${e.maxValue}`;
  //   setBudgetValue([val]);
  // };

  // -------------------------select min max carpet Area----------------------------------

  const handleSelectValuemin = (e) => {
    const val = e.target.value;
    setOpValueMin(val);
    setCarpetValue([val, carpetValue[1]]);

    setData((oldData) => {
      return {
        ...oldData,
        carpetArea: [val, data.carpetArea[1]],
      };
    });
  };
  const handleSelectValuemax = (e) => {
    const val = e.target.value;
    setOpValueMax(val);
    // let dataVAl=`${carpetValue[0]}val`
    setCarpetValue([carpetValue[0], val]);

    setData((oldData) => {
      return {
        ...oldData,
        carpetArea: [data.carpetArea[0], val],
      };
    });
  };
  // -------------------------clear All Applyed Filters------------------------
  const handleClearAll = () => {
    setBudgetValue([]);
    setCarpetValue([]);
    setData({
      noOfBedRooms: [],
      ownership: [],
      furnishingType: [],
      availableFor: [],
      ageOfProperty: [],
      location: [],
      expectedPrice: [],
      carpetArea: [],
      is_feacher: [false],
      typeOfProperty: [],
      catagory: [],
      subCatagory: [],
      typeOfBusiness: [],
      is_verified: [false],
      firesaleOrNot: [],
    });
    setTopicValue([]);
    setOpValueMin("Min Area");
    setOpValueMax("Max Area");
  };

  // -----------------location--------------------
  const handlelocality = () => {
    if (data.location.indexOf(place) !== -1) {
      toast.warning(
        "This place is already given,please give some other place name"
      );
      setPlace("");
    } else {
      if (place.length > 2) {
        setTopicValue([...topicValue, place]);
        setData((olddata) => {
          return {
            ...olddata,
            location: [...data.location, place],
          };
        });
        setPlace("");
      } else {
        toast.warning("Atleast give 3 letter");
      }
    }
  };

  // -----------------------------Api get request-------------------------------------------
  const getDYNAMICFILTER = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_SERVICE_dYNAMICFILTER_OPTION_URL
    );

    console.log(
      "ApiRes USER_SERVICE_dYNAMICFILTER_OPTION_URL response==>",
      ApiRes
    );
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("from here warning");
        // toast.success(ApiRes.message);
        // setDyanamicValue(ApiRes);
        const typeOfProperty = [];
        const furnish = [];

        const newPropertyType =
          ApiRes.dynamicoption.length > 0 &&
          ApiRes.dynamicoption[0].typeOfProperty &&
          ApiRes.dynamicoption[0].typeOfProperty;

        const newFurnishType =
          ApiRes.dynamicoption.length > 0 &&
          ApiRes.dynamicoption[0].furnishingDetails &&
          ApiRes.dynamicoption[0].furnishingDetails;

        if (ApiRes.dynamicoption.length > 0) {
          for (let ele of newPropertyType) {
            typeOfProperty.push(ele.name);
          }
        }
        // if (ApiRes.filteroption.length > 0) {

        //   // for (let ele of newFurnishType) {
        //     furnish.push(ApiRes?.filteroption?.furnishingType );
        //   // }
        // }
        console.log("ApiRes.dynamicoption======>", ApiRes);
        // console.log("furnish======>", furnish);

        setFiltersData((oldData) => {
          return {
            ...oldData,
            ageOfProperty:
              ApiRes &&
              ApiRes.filteroption &&
              ApiRes.filteroption.ageOfProperty &&
              ApiRes.filteroption.ageOfProperty,
            dynamicData:
              ApiRes && ApiRes.dynamicoption && ApiRes.dynamicoption[0],
            typesOfPosts:
              ApiRes &&
              ApiRes.filteroption &&
              ApiRes.filteroption.ownership &&
              ApiRes.filteroption.ownership,
            typeOfProperty: typeOfProperty,
            furnishingStatus: ApiRes?.filteroption?.furnishingType,
          };
        });
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    getDYNAMICFILTER();
  }, []);
  useEffect(() => {
    const filData = value.selectSearch ? [value.selectSearch] : [];
    setTopicValue([...filData]);
  }, [value.selectSearch, value.typeOfBusiness]);

  return (
    <>
      <div className="filter_main_container_div">
        <div className="b_r filtermaincontainer_div ">
          <div className="c_t filter_ApplyAllfilter">
            <h6>Applied Filter </h6>
            {topicValue.length > 0 ||
            budgetValue.length > 0 ||
            carpetValue.length > 0 ? (
              <h6 className="Filter_clearAll" onClick={() => handleClearAll()}>
                Clear All{" "}
              </h6>
            ) : (
              <h6 className="c_t " style={{ opacity: ".5" }}>
                Clear All{" "}
              </h6>
            )}
          </div>
          <FilterCom
            FiltersData={FiltersData}
            setFiltersData={setFiltersData}
            // heading="Applied Filter"
            dataOption={carpetValue}
            KeyNames="carpetFilterdata"
            data={data}
            setData={setData}
            topicValue={carpetValue}
            setTopicValue={setCarpetValue}
            setOpValueMin={setOpValueMin}
            setOpValueMax={setOpValueMax}
            cancelButton={true}
            setSetselectPg={setSetselectPg}
            selectPg={selectPg}
            catagorys={catagorys}
            setCatagorys={setCatagorys}
            subcatagorys={subcatagorys}
            setSubCatagorys={setSubCatagorys}
          />
          <FilterCom
            FiltersData={FiltersData}
            setFiltersData={setFiltersData}
            // heading="Applied Filter"
            dataOption={topicValue}
            KeyNames="allFilterdata"
            data={data}
            setData={setData}
            topicValue={topicValue}
            setTopicValue={setTopicValue}
            cancelButton={true}
            setSetselectPg={setSetselectPg}
            selectPg={selectPg}
            catagorys={catagorys}
            setCatagorys={setCatagorys}
            subcatagorys={subcatagorys}
            setSubCatagorys={setSubCatagorys}
          />
          <FilterCom
            FiltersData={FiltersData}
            setFiltersData={setFiltersData}
            // heading="Applied Filter"
            dataOption={budgetValue}
            KeyNames="budgetFilterdata"
            data={data}
            setData={setData}
            topicValue={budgetValue}
            setTopicValue={setBudgetValue}
            cancelButton={true}
            setSetselectPg={setSetselectPg}
            selectPg={selectPg}
            catagorys={catagorys}
            setCatagorys={setCatagorys}
            subcatagorys={subcatagorys}
            setSubCatagorys={setSubCatagorys}
          />
          <hr />
          <div className="c_t px-2 filter_proporty_heading">
            <h5 className="c_t filter_proporty_heading">Budget</h5>
            <Rangeslider
              // handleInput={handleInputRangeSlider}
              // minValue={minValue}
              // maxValue={maxValue}
              // minPrice={1}
              // maxPrice={100}
              set_minValue={set_minValue}
              set_maxValue={set_maxValue}
              setData={setData}
              setBudgetValue={setBudgetValue}
            />
            {/* <RangeSliders /> */}
          </div>
          <FilterCom
            FiltersData={FiltersData}
            setFiltersData={setFiltersData}
            heading="No. of bedrooms"
            dataOption={FiltersData.noOfBedroom}
            KeyNames="noOfBedRooms"
            data={data}
            setData={setData}
            topicValue={topicValue}
            setTopicValue={setTopicValue}
          />
          <FilterCom
            FiltersData={FiltersData}
            setFiltersData={setFiltersData}
            heading="Type of property"
            dataOption={FiltersData.typeOfProperty}
            KeyNames="typeOfProperty"
            data={data}
            setData={setData}
            topicValue={topicValue}
            setTopicValue={setTopicValue}
            setSetselectPg={setSetselectPg}
            selectPg={selectPg}
            catagorys={catagorys}
            setCatagorys={setCatagorys}
            subcatagorys={subcatagorys}
            setSubCatagorys={setSubCatagorys}
          />
          {/* -------------------catagory-------------- */}
          {FiltersData.catagory.length > 0 && (
            <FilterCom
              FiltersData={FiltersData}
              setFiltersData={setFiltersData}
              heading="Property catagory"
              dataOption={FiltersData.catagory}
              KeyNames="catagory"
              data={data}
              setData={setData}
              topicValue={topicValue}
              setTopicValue={setTopicValue}
              catagorys={catagorys}
              setCatagorys={setCatagorys}
              subcatagorys={subcatagorys}
              setSubCatagorys={setSubCatagorys}
            />
          )}
          {/* -------------sub catagya--------------- */}
          {FiltersData.subCatagory.length > 0 && (
            <FilterCom
              FiltersData={FiltersData}
              setFiltersData={setFiltersData}
              heading="Property sub catagory"
              dataOption={FiltersData.subCatagory}
              KeyNames="subCatagory"
              data={data}
              setData={setData}
              topicValue={topicValue}
              setTopicValue={setTopicValue}
              catagorys={catagorys}
              setCatagorys={setCatagorys}
              subcatagorys={subcatagorys}
              setSubCatagorys={setSubCatagorys}
            />
          )}
          <FilterCom
            FiltersData={FiltersData}
            setFiltersData={setFiltersData}
            heading="Posted by"
            dataOption={FiltersData.typesOfPosts}
            KeyNames="ownership"
            data={data}
            setData={setData}
            topicValue={topicValue}
            setTopicValue={setTopicValue}
          />
          <FilterCom
            FiltersData={FiltersData}
            setFiltersData={setFiltersData}
            heading="Furnishing status"
            dataOption={FiltersData.furnishingStatus}
            KeyNames="furnishingType"
            data={data}
            setData={setData}
            topicValue={topicValue}
            setTopicValue={setTopicValue}
          />
          {/* subFurnishing */}
          {/* {FiltersData.subFurnishing.length > 0 && (
            <FilterCom
              FiltersData={FiltersData}
              setFiltersData={setFiltersData}
              heading="Furnishing status"
              dataOption={FiltersData.subFurnishing}
              KeyNames="subFurnishing"
              data={data}
              setData={setData}
              topicValue={topicValue}
              setTopicValue={setTopicValue}
            />
          )} */}
          {/* <div className="my-3 ">
            <h4 className="c_t filter_proporty_heading">Area of Property</h4>

            <div className="filter_proporty_container_div">
              <div className="sw c_t option_box" style={{ width: "140px" }}>
                <Selects
                  headValue={opValueMin}
                  options={FiltersData.optionMin}
                  // setOpValue={setOpValueMin}
                  unit="sq.ft"
                  handleSelectValue={handleSelectValuemin}
                />
              </div>
              <div className="sw c_t option_box" style={{ width: "150px" }}>
                <Selects
                  headValue={opValueMax}
                  options={FiltersData.optionMax}
                  // setOpValue={setOpValueMax}
                  unit="sq.ft"
                  handleSelectValue={handleSelectValuemax}
                />
              </div>
            </div>
          </div> */}
          {avaFor === false && (
            <FilterCom
              FiltersData={FiltersData}
              setFiltersData={setFiltersData}
              heading="Available for"
              dataOption={FiltersData.availableFor}
              KeyNames="availableFor"
              data={data}
              setData={setData}
              topicValue={topicValue}
              setTopicValue={setTopicValue}
            />
          )}
          <FilterCom
            FiltersData={FiltersData}
            setFiltersData={setFiltersData}
            heading="Localities"
            dataOption={data.location}
            KeyNames="location"
            data={data}
            setData={setData}
            topicValue={topicValue}
            setTopicValue={setTopicValue}
          />
          <div className="my-3 ">
            {/* <h4 className="c_t filter_proporty_heading">Localities</h4> */}
            <div className="filter_proporty_Localities_div">
              <input
                type="text"
                placeholder="Enter place name"
                className="filter_proporty_location"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
              {/* <button className="filter_enterPlaceButton">+Add</button> */}

              <div>
                <button
                  className="filter_proporty_btn_div  sw c_t "
                  onClick={handlelocality}
                >
                  +Add
                </button>
              </div>
            </div>
          </div>
          <FilterCom
            FiltersData={FiltersData}
            setFiltersData={setFiltersData}
            heading="Age of Property"
            dataOption={FiltersData.ageOfProperty}
            KeyNames="ageOfProperty"
            data={data}
            setData={setData}
            topicValue={topicValue}
            setTopicValue={setTopicValue}
          />
        </div>
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
    </>
  );
};

export default Filter;
