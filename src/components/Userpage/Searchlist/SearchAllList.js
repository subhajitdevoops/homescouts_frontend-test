import React, { useState } from "react";
import Searchlist from "./Searchlist";
import ReactPaginate from "react-paginate";
import "./Searchlist.css";
import SearchDetails from "./SearchDetails";
import { BiMenuAltRight } from "react-icons/bi";
import Filter from "../Filter/Filter";
import { useEffect } from "react";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from "../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import imgNotFound from "../../../assets/services/NotFound.png";

const Short = ({ opValue, setOpValue }) => {
  const [short, setShort] = useState();
  return (
    <div className="c_t Short_mainContainer">
      {/* <div className=""> */}
      <a
        id="1"
        onClick={(e) => setOpValue("High To Low")}
        className={opValue == "High To Low" ? "SelectShortFilter" : undefined}
      >
        Budget &nbsp; <b> High </b> &nbsp; to low
      </a>
      <a
        id="2"
        onClick={(e) => setOpValue("Low To High")}
        className={opValue == "Low To High" ? "SelectShortFilter" : undefined}
      >
        Budget &nbsp; <b> low </b> &nbsp; to high
      </a>
      <a
        id="3"
        onClick={(e) => setOpValue("Sort")}
        className={opValue == "Sort" ? "SelectShortFilter" : undefined}
      >
        Newly posted
      </a>
      {/* </div> */}
    </div>
  );
};

const SearchAllList = ({
  getAllData,
  pagenation,
  setPageNumber,
  pageNumber,
  data,
  setData,
  setSetselectPg,
  selectPg,
  avaFor,
  searchName,
}) => {
  const value = useContext(AuthContext);
  // console.log(value.searchQuary);
  // console.log("getAllData=======>", getAllData);
  // console.log(pagenation && pagenation.TotalDocuments);
  // -------------------Contact Owner-------------------------------

  // console.log("pagenation=>", pagenation);
  const ownerNo = "1234567890";

  // const [heart, setHeart] = useState(true);
  // console.log("pageNumber==>", pageNumber);

  // --------------------- SearchDetails -----------------------------
  const options = ["Low To High", "High To Low"];
  const [opValue, setOpValue] = useState("Sort");
  const [shorted, setShorted] = useState(["verified", "feature"]);
  // ------------------Mobile View Filters---------------------
  const [mobFil, setMobFil] = useState(false);
  const [filter, setFilter] = useState(false);
  const handleSelectValue = (e, item) => {
    setOpValue(e.target.value);
  };

  const displayUsers =
    getAllData &&
    (opValue == "Sort"
      ? getAllData
      : getAllData.slice().sort((a, b) => {
          const aPrice =
            a.pricinganddetails.pricingDetails?.expectedPrice ??
            a.pricinganddetails.rentDetails;
          const bPrice =
            b.pricinganddetails.pricingDetails?.expectedPrice ??
            b.pricinganddetails.rentDetails;
          if (opValue == "High To Low") {
            return bPrice - aPrice;
          } else {
            return aPrice - bPrice;
          }
        })
    ).map((list, i) => {
      return (
        <div key={i}>
          <Searchlist
            user={list && list}
            // heart={heart}
            // setHeart={setHeart}
            ownerNo={ownerNo}
            Verified="Verified"
            shortListButton={true}
          />
        </div>
      );
    });
  const changePage = ({ selected }) => {
    setPageNumber(selected + 1);
  };

  return (
    <>
      <div className="SearchAllList_MainContainerDiv">
        <div className="SearchAllList_MainContainer_Div">
          <div className="c_t SearchAllList_allresultsdata">
            <h5>
              {pagenation && pagenation.TotalDocuments} Results of Property for{" "}
              {`${searchName}${value.locations && " in "}${value.locations}`}
            </h5>
          </div>
          <div className="SearchAllList_allresultsdata">
            <SearchDetails
              headValue={opValue}
              options={options}
              setOpValue={setOpValue}
              shorted={shorted}
              handleSelectValue={handleSelectValue}
              data={data}
              setData={setData}
              avaFor={avaFor}
            />
          </div>
          <div className="SearchAllList_MobileViewAllResults">
            <div className="c_t SearchAllList_MobileViewHeading">
              <h5>
                {pagenation && pagenation.TotalDocuments} Results of Property
                for{" "}
                {`${
                  value.typeOfBusiness
                    ? `${
                        value.typeOfBusiness === "sale"
                          ? "buy"
                          : value.typeOfBusiness
                      }`
                    : `${value.selectSearch}`
                }${value.locations && " in "}${value.locations}`}
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
                  className={`SearchAllList_MobileSort ${
                    filter === false ? "SearchAllList_FilterSelect" : undefined
                  }`}
                  onClick={() => setFilter(false)}
                >
                  Sort
                </a>
                <a
                  className={`SearchAllList_MobileSort ${
                    filter === true ? "SearchAllList_FilterSelect" : undefined
                  }`}
                  onClick={() => setFilter(true)}
                >
                  Filter
                </a>
              </div>
              {filter === true ? (
                <Filter
                  data={data}
                  setData={setData}
                  setSetselectPg={setSetselectPg}
                  selectPg={selectPg}
                  avaFor={avaFor}
                />
              ) : (
                <Short opValue={opValue} setOpValue={setOpValue} />
              )}
            </>
          ) : (
            <>
              {getAllData.length > 0 ? (
                <>{displayUsers}</>
              ) : (
                <div className="b_r bg_w sw PropertyNotFound ">
                  <img src={imgNotFound} alt="property not found ..." />
                  <h5>
                    Property unicorns on vacation! No matching posts. Expand
                    your search or ditch filters for a wilder ride!
                  </h5>
                  <p>
                    Psst! We're matchmakers for properties, and it's totally
                    free! Give your pals a nudge to unleash their homes on
                    HomeScouts.in. Let the property party begin! 🏠🎉
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

export default SearchAllList;
