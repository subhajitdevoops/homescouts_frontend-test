import React, { useContext, useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import Userchat from "../Home/UserChat/Userchat";
import Side from "./Side/Side";
import "./UserMainpage.css";
import SearchAllList from "./Searchlist/SearchAllList";
import Nav from "../Home/Nav/Nav";
import MobileBottomMenu from "../Home/MobileBottomMenu/MobileBottomMenu";
import AuthContext from "../../context/AuthProvider";
import { API_REQ_GET } from "../../config/API";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Warning from "../Home/Warning/Warning";

const UserMainpage = () => {
  const value = useContext(AuthContext);
  const [getAllData, setGetAllData] = useState([]);
  const [pagenation, setPagenation] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectPg, setSetselectPg] = useState(false);
  const [avaFor, setAvaFor] = useState(false);
  const [searchName, setSearchName] = useState("");
  console.log("searchName==>", searchName);
  const navigate = useNavigate();

  // console.log("getAllData=======>", getAllData);

  const FiresaleData = value.selectSearch
    ? value.selectSearch == "Firesale"
      ? []
      : [value.selectSearch]
    : [];
  const firesale = value.selectSearch == "Firesale" ? [true] : [];

  const [data, setData] = useState({
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
    catagory: [...FiresaleData],
    subCatagory: [],
    typeOfBusiness: [],
    is_verified: [false],
    firesaleOrNot: [...firesale],
    // is_feacher
  });
  console.log("data==>", data);

  // -----------------------------------------------------------------------
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);

  const handleSearchButton = () => {
    getAllProperty();
    // console.log("123");
    // let ApiRes = await API_REQ_GET(
    //   configData.GET_ALL_PROPERTY_URL +
    //     `?page=${pageNumber}&limit=10&searchQuery=${value.searchQuary}&typeOfBusiness=${value.typeOfBusiness}&location=${value.locations}`,
    //   userToken
    // );
    // console.log("handleSearchButtoss===>", ApiRes);
    // if (ApiRes) {
    //   if (ApiRes.success === true) {
    //     // toast.success(ApiRes.message);
    //     console.log("searchQuery is working", ApiRes);
    //     setGetAllData(ApiRes.property);
    //     setPagenation(ApiRes.Pagination);
    //     navigate("/search/property", { replace: true });
    //     value.setSearchQuary("");
    //     // value.setLocations("");
    //   } else {
    //     toast.warning(ApiRes.message);
    //   }
    // } else {
    //   toast.error("Please Check Your Internet connection !");
    // }
  };

  const newFilterData = `${JSON.stringify(data)}`;
  // console.log("newFilterData=>", newFilterData);

  // -----------------------------Api get request-------------------------------------------
  const getAllProperty = async () => {
    let ApiRes = await API_REQ_GET(
      configData.GET_ALL_PROPERTY_URL +
        `?page=${pageNumber}&limit=10&searchQuery=${
          value.searchQuary
        }&typeOfBusiness=${value.typeOfBusiness}&location=${
          data.location.length > 0 ? "" : value.locations
        }&filterdata=${newFilterData}`,
      userToken
    );

    // console.log("ApiRes all property response==>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        console.log("from here warning");
        // toast.success(ApiRes.message);
        setGetAllData(ApiRes.property);
        setPagenation(ApiRes.Pagination);
        navigate(
          `/search/property?typeOfBusiness=${
            value.typeOfBusiness
              ? `${
                  value.typeOfBusiness === "sale" ? "buy" : value.typeOfBusiness
                }`
              : `${value.selectSearch}`
          }${value.locations && `&location=${value.locations}`}`,
          { replace: true }
        );
        // ---------------------when pg select --------------------------
        if (value.typeOfBusiness == "pg") {
          setAvaFor(true);
        } else {
          setAvaFor(false);
        }
        if (value.typeOfBusiness == "sell") {
          setSearchName("Buy");
        } else if (value.typeOfBusiness == "rent/lease") {
          setSearchName("Rent");
        } else if (value.typeOfBusiness == "pg") {
          setSearchName("PG/Co-living");
        } else {
          setSearchName(value.selectSearch);
        }
        // value.setLocations("");
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    getAllProperty();
    // console.log('this is running');

  }, [pageNumber, data, selectPg]);
  console.log("locations==>", value.locations);

  return (
    <div className=" usermainpage_main_container_div">
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
      <Nav
        userSearchProperty={true}
        postpropertyBtnVeiw={true}
        handleSearchButton={handleSearchButton}
        setDataTranscript={value.setSearchQuary}
        dataTranscript={value.searchQuary}
        MobileViewSearch={true}
        // MobileViewSearch={true}
        searchSelect={true}
        setLocationData={value.setLocations}
        Allocations={value.locations}
        clearLocations={()=>value.setLocations("")}
        placeholder={`Search "Property for ${
          value.typeOfBusiness
            ? `${
                value.typeOfBusiness === "sale" ? "buy" : value.typeOfBusiness
              }`
            : `${value.selectSearch}`
        }${value.locations && " in "}${value.locations}"`}
      />
      <div className="usermainpage_container_div">
        <div className="usermainpage_filter_div">
          <Filter
            data={data}
            setData={setData}
            setSetselectPg={setSetselectPg}
            selectPg={selectPg}
            avaFor={avaFor}
          />
        </div>
        <div className="usermainpage_searchlist_div">
          <SearchAllList
            getAllData={getAllData}
            pagenation={pagenation}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            data={data}
            setData={setData}
            setSetselectPg={setSetselectPg}
            selectPg={selectPg}
            avaFor={avaFor}
            searchName={searchName}
          />
        </div>
      </div>
      <Warning />
      {/* <Userchat /> */}
      <MobileBottomMenu Highlight="home" />
    </div>
  );
};

export default UserMainpage;
