import React, { useContext, useEffect } from "react";
import "./TiffinService.css";
import Nav from "../Home/Nav/Nav";
import Filter from "../Userpage/Filter/Filter";
import SearchAllList from "../Userpage/Searchlist/SearchAllList";
import Userchat from "../Home/UserChat/Userchat";
import MobileBottomMenu from "../Home/MobileBottomMenu/MobileBottomMenu";
import TiffinServiceFilter from "./TiffinServicePages/TiffinServiceFilter";
import TiffinServicemain from "./TiffinServicePages/TiffinServicemain";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../../context/AuthProvider";
import { useQuery } from "../../config/Helper";
import { API_REQ_GET } from "../../config/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Warning from "../Home/Warning/Warning";

const TiffinServiceMainPage = () => {
  const value = useContext(AuthContext);
  let query = useQuery();
  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pagenation, setPagenation] = useState();
  const [searchName,setSearchName]=useState('')
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  console.log(
    "value.serviceLocation------------------------------------>",
    value.serviceLocation
  );
  // ----------------------------------------------------------------
  const [applyFilter, setApplyFilter] = useState("");
  console.log("applyFilter", applyFilter);

  const [serviceList, setServiceList] = useState([]);
  const [serviceLocation, setServiceLocation] = useState([]);

  const handleSelectOption = (name) => {
    value.setServiceSearchQuary('')
    if (applyFilter === name) {
      setApplyFilter("");
    } else {
      setApplyFilter(name);
      getSearchList();
    }
  };

  const handleSearchButton = async () => {
    getSearchList();
  };
  //------------------------------for pagination change page number----------------------------------
  const changePage = async ({ selected }) => {
    setPageNumber(selected + 1);
    getSearchList();
  };
  //--------------------------choose service from nav Menu ------------------------------------
  const handleServiceMenu = async (serviceName) => {
    getSearchList();
  };
  const getServiceList = async () => {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_PIN_MENU_GET_URL,
      userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        setServiceList(ApiRes.result);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  const getSearchList = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_SERVICE_LISTING_DETAILS_GET_URL +
        `?searchQuery=${
          value.serviceSearchQuary
            ? value.serviceSearchQuary
            : query.get("serviceName")?query.get("serviceName"):""
        }&location=${value.serviceLocation}&limit=10&page=${pageNumber}`,
      userToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      setSearchName(value.serviceSearchQuary)
      if (ApiRes.success === true) {
        console.log("service listing Details result=>", ApiRes.result);
        // toast.success(ApiRes.message);
        setServiceData(ApiRes.result);
        setPagenation(ApiRes.Pagination);
        setServiceLocation(value.serviceLocation);
        if (value.serviceSearchQuary) {
          navigate(`/service`, {
            replace: true,
          });
        }
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  useEffect(() => {
    getServiceList();
    getSearchList();
    value.setCurrentUserType('user')

  }, [query.get("serviceName")]);


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
        MobileViewSearch={true}
        postpropertyBtnVeiw={true}
        handleSearchButton={handleSearchButton}
        setDataTranscript={value.setServiceSearchQuary}
        dataTranscript={value.serviceSearchQuary}
        setLocationData={value.setServiceLocation}
        Allocations={value.serviceLocation}
        clearLocations={() => value.setServiceLocation("")}
        handleServiceMenu={handleServiceMenu}
        placeholder={`Search "Service for ${query.get("serviceName")?query.get("serviceName"):'...'}${
          value.serviceLocation && " in "
        }${value.serviceLocation}"`}
      />
      <div className="usermainpage_container_div">
        <div className="usermainpage_filter_div">
          {/* <Filter /> */}
          <TiffinServiceFilter
            applyFilter={applyFilter}
            handleSelectOption={handleSelectOption}
            serviceList={serviceList}
          />
          {/* filter */}
        </div>
        <div className="usermainpage_searchlist_div">
          {/* <SearchAllList /> */}
          <TiffinServicemain
            serviceData={serviceData}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pagenation={pagenation}
            changePage={changePage}
            applyFilter={applyFilter}
            handleSelectOption={handleSelectOption}
            serviceList={serviceList}
            serviceLocation={serviceLocation}
            searchName={searchName}
          />
          {/* service */}
        </div>
      </div>
      {/* <Userchat /> */}
      <Warning />
      <MobileBottomMenu Highlight="home" />
    </div>
  );
};

export default TiffinServiceMainPage;
