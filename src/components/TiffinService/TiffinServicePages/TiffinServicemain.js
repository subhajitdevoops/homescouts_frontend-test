import React, { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import { BiMenuAltRight } from "react-icons/bi";
import MyService from "../../Profile/MyService/MyServiceCom/MyService";
import TiffinServiceFilter from "./TiffinServiceFilter";
import { API_REQ_GET } from "../../../config/API";
import configData from "../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "../../../config/Helper";
import AuthContext from "../../../context/AuthProvider";
import imgNotFound from "../../../assets/pageNotfound/No data image for admin.jpg";

const TiffinServicemain = ({
  serviceData,
  pageNumber,
  setPageNumber,
  pagenation,
  changePage,
  applyFilter,
  handleSelectOption,
  serviceList,
  serviceLocation,
  searchName,
}) => {
  // console.log("query=>", query.get("id"));
  // console.log("pagenation==>", pagenation);
  let query = useQuery();

  const value = useContext(AuthContext);

  // -------------------Contact Owner-------------------------------
  const displayUsers =
    serviceData &&
    serviceData.map((list, index) => (
      <div key={index}>
        <MyService ForUser={true} service={list} />
        {pagenation && pagenation.TotalDocuments === 0 ? (
          <h1>No such Type Of Data Found !</h1>
        ) : (
          ""
        )}
      </div>
    ));

  // --------------------- SearchDetails -----------------------------
  // const options = ["One", "Two", "Three", "Four", "Five"];
  // const [opValue, setOpValue] = useState("sort");
  // const [shorted, setShorted] = useState([
  //   "Owner",
  //   "Verified",
  //   "Ready to move",
  //   "Listed by dealer",
  // ]);
  // ------------------Mobile View Filters---------------------
  const [mobFil, setMobFil] = useState(false);
  const [filter, setFilter] = useState(false);

  return (
    <div className="SearchAllList_MainContainerDiv">
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
      <div className="SearchAllList_MainContainer_Div">
        <div className="c_t SearchAllList_allresultsdata">
          <h5>
            {pagenation && pagenation.TotalDocuments} Results |{" "}
            {`Service for ${
              query.get("serviceName")
                ? query.get("serviceName")
                : value.serviceSearchQuary
                ? searchName
                : "..."
            }${serviceLocation && " in "}${serviceLocation}`}
          </h5>
        </div>
        <div className="SearchAllList_allresultsdata">
          {/* <SearchDetails
          headValue={opValue}
          options={options}
          setOpValue={setOpValue}
          shorted={shorted}
        /> */}
        </div>
        <div className="SearchAllList_MobileViewAllResults">
          <div className="c_t SearchAllList_MobileViewHeading">
            <h5>
              {pagenation && pagenation.TotalDocuments} Results |{" "}
              {`Service for ${query.get("serviceName")}${
                serviceLocation && " in "
              }${serviceLocation}`}
            </h5>
          </div>
          <div className="SearchAllList_MobileViewMenu">
            <BiMenuAltRight
              className=" c_t SearchAllList_BiMenuAltRight"
              style={mobFil === true ? { color: "#0d6efd" } : null}
              onClick={() => setMobFil(!mobFil)}
            />
          </div>
        </div>

        {mobFil === true ? (
          <>
            <div className="SearchAllList_MobileButtons">
              <a
                className={`SearchAllList_MobileSort  SearchAllList_MobileSorts${
                  filter === true ? "SearchAllList_FilterSelect" : undefined
                }`}
                onClick={() => setFilter(true)}
                style={{ width: "100%" }}
              >
                Filter
              </a>
            </div>
            <TiffinServiceFilter
              applyFilter={applyFilter}
              handleSelectOption={handleSelectOption}
              serviceList={serviceList}
            />
          </>
        ) : (
          <>
            {serviceData.length > 0 ? (
              <>{displayUsers}</>
            ) : (
              <div className="b_r bg_w sw PropertyNotFound ">
                <img src={imgNotFound} alt="property not found ..." />
                <h5>
                  There are no service providers available in your area for this
                  service!
                </h5>
                <p>
                  If you'd like to connect with any available experts, try
                  removing the location. Alternatively, consider exploring other
                  services.🌟🛠️
                </p>
              </div>
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
    </div>
  );
};

export default TiffinServicemain;
