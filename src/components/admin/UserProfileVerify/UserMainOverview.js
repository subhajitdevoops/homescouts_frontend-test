import React, { useContext, useState } from "react";
import Nav from "../Nav";
import Header from "../Header";
import "./UserMainOverview.css";
import Overview from "./userOverview/UserOverview";
import UserAds from "./userAds/UserAds";
import UserServices from "./userService/UserServices";
import PotentialBuyers from "../../Profile/PotentialBuyers/PotentialBuyers";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from "../../../config/config.json";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import { useQuery } from "../../../config/Helper";
import UserAdsDetails from "./userAds/UserAdsDetails";
import AuthContext from "../../../context/AuthProvider";
import noDaFounds from "../../../assets/pageNotfound/No data image for admin.jpg";

function UserMainOverview() {
  // =============== States =================
  let query = useQuery();
  const userId = query.get("userId");
  const [currentNav, setCurrentNav] = useState("overview");
  const [potential, setPotential] = useState(false);
  const [change, setChange] = useState("");
  const [userRes, setUserRes] = useState();
  const [userProperty, setUserProperty] = useState();

  const [dataList, setDataList] = useState([]);

  // console.log("dataList", dataList);
  // ------------------------user Ads ------------------------------

  const [adsDeails, setAdsDetails] = useState(false);
  const [getAllData, setGetAllData] = useState("");
  const [userDetails, setUserDetails] = useState("");

  console.log("getAllData admin side", getAllData);
  // console.log(
  //   "userDetails=======>",
  //   userDetails
  // );

  const navHandle = (e) => {
    // =============== Function =================
    setCurrentNav(e.target.value);
  };

  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);
  // ----------------------------- Api get request -------------------------------------------
  const handleChangeStaus = async (status, id) => {
    // setUserDetails

    setUserDetails((oldData) => {
      return {
        ...oldData,
        admin_approval: status,
      };
    });

    //--------------------------------------------------

    const pendingPostPropertyData = {
      _id: userDetails && userDetails._id,
      admin_approval: userDetails && userDetails.admin_approval,
    };

    let ApiRes = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_PENDING_PROPERTY_POST_URL,
      pendingPostPropertyData,
      adminToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("from here warning");
        toast.success(ApiRes.message);
        //   setPagenation(ApiRes.Pagination);
        // setResp('Approved')
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  const handleActiveInactive = async (id) => {
    const isActive = {
      id: id,
      is_active:
        userDetails && userDetails.user.is_active === true ? false : true,
    };
    let ApiRes = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_ACTIVE_INACTIVE_BY_USER_ID_POST_URL,
      isActive,
      adminToken
    );
    console.log("=>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        let ApiUserRes = await API_REQ_GET(
          configData.ADMIN_SERVICE_GET_USER_BY_ID_GET_URL + `?id=${userId}`,
          adminToken
        );
        // console.log(" for user response=>", ApiUserRes);
        if (ApiUserRes) {
          if (ApiUserRes.success === true) {
            // console.log(" for user response=>", ApiUserRes);
            // toast.success(ApiUserRes.message);
            setUserDetails(ApiUserRes);
            //   setPagenation(ApiUserRes.Pagination);
          } else {
            toast.warning(ApiUserRes.message);
          }
        } else {
          toast.error("Please Check Your Internet connection !");
        }
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  // ---------------------------- for user response ------------------------------

  const getCasesUser = async () => {
    let ApiUserRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_GET_USER_BY_ID_GET_URL + `?id=${userId}`,
      adminToken
    );
    // console.log(" for user response=>", ApiUserRes);
    if (ApiUserRes) {
      if (ApiUserRes.success === true) {
        // console.log(" for user response=>", ApiUserRes);
        // toast.success(ApiUserRes.message);
        setUserDetails(ApiUserRes);
        //   setPagenation(ApiUserRes.Pagination);
      } else {
        toast.warning(ApiUserRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  // ---------------------------- for Api Property response ------------------------------

  const getCasesProperty = async () => {
    let ApiPropertyRes = await API_REQ_GET(
      configData.ADMIN_GET_PROPERTY_USER_BY_ID_GET_URL + `?id=${userId}`,
      // configData.ADMIN_SERVICE_PENDING_PROPERTY_GET_URL,
      adminToken
    );
    if (ApiPropertyRes) {
      if (ApiPropertyRes.success === true) {
        // console.log("from here warning");
        // toast.success(ApiPropertyRes.message);
        // console.log("Api Property response=>", ApiPropertyRes);
        setGetAllData(ApiPropertyRes.property);
        //   setPagenation(ApiPropertyRes.Pagination);
      } else {
        toast.warning(ApiPropertyRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  // ---------------------------- for service response ------------------------------

  const getCasesService = async () => {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_LISTING_BY_ID_GET_URL +
        `?id=${userId}&limit=40&page=1`,
      adminToken
    );
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("from here warning");
        // console.log("USER service=>", ApiRes);
        // toast.success(ApiRes.message);
        setDataList(ApiRes.result);
        //   setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  useEffect(() => {
    getCasesUser();
    getCasesProperty();
    getCasesService();
  }, []);
  const value = useContext(AuthContext);
  useEffect(() => {
    value.setCurrentUserType("admin");
  }, []);
  return (
    <>
      <div className="page-flex">
        {potential === true && (
          <PotentialBuyers
            setPotentialBuyers={setPotential}
            margin0="margin0"
            contact={true}
            // contact={true}
          />
        )}

        <Header sideActive="user" />
        <div className="nav-sidebar-format">
          <Nav />
          {/* ========== USER PROFILE MAIN DIV ========== */}
          <div className="Dashboard_mainContainerDiv">
            <div className="Dashboard_ContainerDiv">
              <div className="user-profile-main">
                <div className="user-navigation-container">
                  <div
                    className={`user-navigation ${
                      currentNav === "overview" ? "active-user-navigation" : ""
                    }`}
                  >
                    <button value="overview" onClick={navHandle}>
                      Overview
                    </button>
                  </div>
                  <div
                    className={`user-navigation ${
                      currentNav === "ads" ? "active-user-navigation" : ""
                    }`}
                  >
                    <button value="ads" onClick={navHandle}>
                      Ads
                    </button>
                  </div>
                  <div
                    className={`user-navigation ${
                      currentNav === "service" ? "active-user-navigation" : ""
                    }`}
                  >
                    <button value="service" onClick={navHandle}>
                      Services
                    </button>
                  </div>
                </div>
                {/* ---------------- */}
                <div className="user-container">
                  {/* ======= */}
                  {currentNav === "overview" ? (
                    <Overview
                      userDetails={userDetails}
                      handleActiveInactive={handleActiveInactive}
                    />
                  ) : (
                    ""
                  )}
                  {currentNav === "ads" ? (
                    <>
                      {adsDeails === true ? (
                        <UserAdsDetails
                          getAllData={userDetails}
                          setAdsDetails={setAdsDetails}
                          handleChangeStaus={handleChangeStaus}
                        />
                      ) : (
                        <>
                          {getAllData.length > 0 ? (
                            getAllData
                              // .slice(pagesVisited, pagesVisited + usersPerPage)
                              .map((list, i) => {
                                return (
                                  <div key={i}>
                                    <UserAds
                                      // setPotential={setDetailsPage}
                                      userData={list && list}
                                      setAdsDetails={setAdsDetails}
                                      setUserDetails={setUserDetails}
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <>
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "#fff",
                                  borderRadius: "10px",
                                  flexDirection: "column",
                                }}
                              >
                                <img
                                  src={noDaFounds}
                                  alt="nodata found ..."
                                  width={400}
                                />
                                <h5
                                  style={{
                                    color: "#42526e",
                                    padding: "10px",
                                  }}
                                >
                                  No Data Found!
                                </h5>
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {/* <UserAds
                        setPotential={setPotential}
                        potentialByerButton={true}
                        userProperty
                      /> */}
                    </>
                  ) : (
                    ""
                  )}
                  {currentNav === "service" ? (
                    <UserServices
                      dataList={dataList && dataList}
                      setDataList={setDataList}
                      setChange={setChange}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* =========================================== */}
          {/* <Footer /> */}
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
}

export default UserMainOverview;
