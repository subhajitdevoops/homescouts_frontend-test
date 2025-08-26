import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Searchlist from "../../../Userpage/Searchlist/Searchlist";
import configData from "../../../../config/config.json";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import { ToastContainer } from "react-bootstrap";
import UserAds from "../../UserProfileVerify/userAds/UserAds";
import UserAdsDetails from "../../UserProfileVerify/userAds/UserAdsDetails";
import ReactPaginate from "react-paginate";
import noDaFounds from "../../../../assets/pageNotfound/No data image for admin.jpg";

const PostPropertyRequest = () => {
  const [getAllData, setGetAllData] = useState("");
  const [detailsPage, setDetailsPage] = useState(true);
  const [adsDeails, setAdsDetails] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [pagenation, setPagenation] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  console.log("pageNumber------------------------------------>", pageNumber);
  // -----------------------------Api get request-------------------------------------------

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
      admin_approval: status,
    };

    let ApiRes = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_PENDING_PROPERTY_POST_URL,
      pendingPostPropertyData,
      adminToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        console.log("from here warning");
        toast.success(ApiRes.message);
        //   setPagenation(ApiRes.Pagination);
        getPENDING_PROPERTY();
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  // -----------------------------------pagination-------------------------------------------------
  const changePage = async ({ selected }) => {
    setPageNumber(selected + 1);
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_PENDING_PROPERTY_GET_URL +
      `?limit=10&page=${selected + 1}`,
      adminToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        console.log("from here warning");
        // toast.success(ApiRes.message);
        setGetAllData(ApiRes.pendingproperty);
        //   setPagenation(ApiRes.Pagination);
        adsDeails(false);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  const getPENDING_PROPERTY = async () => {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_PENDING_PROPERTY_GET_URL +
      `?limit=10&page=${pageNumber}`,
      adminToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("from here warning");
        // toast.success(ApiRes.message);
        setGetAllData(ApiRes.pendingproperty);
        setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  useEffect(() => {
    getPENDING_PROPERTY();
  }, []);
  return (
    <>
      <div className="PostPropertyRequest_mainDiv">
        {adsDeails === true ? (
          // <div>hi</div>
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
                        setPotential={setDetailsPage}
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
                  <img src={noDaFounds} alt="nodata found ..." width={400} />
                  <h5
                    style={{
                      color: "#42526e",
                      padding: '10px'
                    }}
                  >
                    No Data Found!
                  </h5>
                </div>
              </>
            )}

            <div className="SearchAllList_ReactPaginate">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pagenation && pagenation.TotalPages}
                onPageChange={changePage}
                containerClassName={"paginationcontainer"}
                pageClassName={"page_item"}
                pageLinkClassName={"pageLinkClassName"}
                previousClassName={"previousClassName"}
                previousLinkClassName={"previousLinkClassName"}
                nextClassName={"nextClassName"}
                nextLinkClassName={"nextLinkClassName"}
                disabledClassName={"pageinationDisable"}
                activeClassName={" activeClassName"}
              />
            </div>
          </>
        )}
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
    </>
  );
};

export default PostPropertyRequest;
