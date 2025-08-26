import React, { useContext, useEffect, useState } from "react";
import { MobileSearchListList } from "../../Userpage/Searchlist/Searchlist";
import Amenities from "./Amenities/Amenities";
import OverView from "./OverView/OverView";
import OwnerDetails from "./OwnerDetails/OwnerDetails";
import "./PropertyDetails.css";
import PropertyPriceDetails from "./PropertyPriceDetails/PropertyPriceDetails";
import MobileBottomMenu from "../../Home/MobileBottomMenu/MobileBottomMenu";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from "../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "../../../config/Helper";
import TermAndCondition from "../../Term&Condition/TermAndCondition";
import MetaTages from "../../../helper/MetaTages";

const PropertyDetails = () => {
  const [overV, setOverV] = useState(false);
  const [overView, setOverView] = useState(true);
  const [ownerDetails, setOwnerDetails] = useState(false);
  const [amenities, setAmenities] = useState(false);
  const [windowHeigh, setWindowHeigh] = useState("");
  const [sellerDetails, setSellerDetails] = useState("");
  const [shortList, setShortList] = useState();
  const [propertyView, setPropertyView] = useState();
  const [ownerCont, setOwnerCont] = useState(false);
  // const [ownerContact,setOwnerContact]=useState();

  // console.log(windowHeigh);

  const [getAllData, setGetAllData] = useState("");
  const [imageLink, setImageLink] = useState("");
  console.log("getAllData=======>", getAllData);

  let query = useQuery();

  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);

  const metaDesc = ` 
  Discover an exquisite ${
    getAllData &&
    getAllData.basicdetails &&
    getAllData.basicdetails.typeOfBusiness === "pg"
      ? ` ${getAllData && getAllData.basicdetails.typeOfBusiness.toUpperCase()}`
      : `${
          getAllData &&
          getAllData.basicdetails.typeOfProperty.charAt(0).toUpperCase() +
            getAllData.basicdetails.typeOfProperty.slice(1)
        }`
  } property in ${
    getAllData && getAllData.location && getAllData.location.city
  }. Withexcellent connectivity and accessible routes. Amazing deal atjust ₹${
    getAllData &&
    getAllData.basicdetails &&
    getAllData.basicdetails.typeOfBusiness === "pg"
      ? `${
          getAllData &&
          getAllData.pricinganddetails.rentDetails &&
          getAllData.pricinganddetails.rentDetails
        }`
      : `${
          getAllData &&
          getAllData.pricinganddetails.pricingDetails &&
          getAllData.pricinganddetails.pricingDetails.expectedPrice
        }`
  }. Contact the owner now for this fantastic opportunity.`;
  // console.log("metaDesc===>", metaDesc);
  const changeStatus = () => {
    if (window.scrollY < 300) {
      setOverV(false);
    }

    setWindowHeigh(window.scrollY);
  };
  window.addEventListener("scroll", changeStatus);
  useEffect(() => {
    if (windowHeigh && windowHeigh >= 0 && windowHeigh < 500) {
      setOverView(true);
      setOwnerDetails(false);
      setAmenities(false);
    }
    if (windowHeigh > 500 && windowHeigh < 800) {
      setOverView(false);
      setOwnerDetails(true);
      setAmenities(false);
    }
    if (windowHeigh > 1000) {
      setOverView(false);
      setOwnerDetails(false);
      setAmenities(true);
    }
  });

  const handleShortListProperty = async (id) => {
    // console.log("123");
    const shortListPropertyId = {
      id: id,
    };

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.USER_SERVICE_PROPERTY_SHORTLIST_URL,
      shortListPropertyId,
      userToken
    );

    if (ResBasic) {
      if (ResBasic.success === true) {
        setGetAllData((old) => {
          return {
            ...old,
            sortliststatus: ResBasic && ResBasic.sortlist,
          };
        });
        if (ResBasic.sortlist === true) {
          setShortList(id);
        } else {
          setShortList("");
        }
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };

  // -----------------------------Api get request-------------------------------------------
  const getPropertyByUserId = async () => {
    let ApiRes = await API_REQ_GET(
      configData.GET_ALL_PROPERTY_BY_PROPERTY_ID_URL + "/" + query.get("_id"),
      userToken
    );
    console.log("GET_ALL_PROPERTY_BY_PROPERTY_ID_URL==>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === "true") {
        // toast.success(ApiRes.message);
        console.log("ApiRes.property==>", ApiRes.property.uploadImages);
        setGetAllData(ApiRes.property);
        setSellerDetails(ApiRes.sellerdetails);
        setPropertyView(ApiRes.property.views);
        if (ApiRes.property.sortliststatus === true) {
          setShortList(ApiRes.property._id);
        }
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }
      }
      // if (userToken && ApiRes?.property?.viewed === false) {
      //   console.log('viewed=>viewedviewedviewed');
      //   viewed();
      // }
      for (let ele of ApiRes.property.uploadImages) {
        if (ele.isCoverImage === true) {
          setImageLink(ele.propertyImage);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  const viewed = async () => {
    // ------------------------------------------------------------
    console.log("view poperty");
    let VisRes = await API_REQ_GET(
      configData.VISITOR_COUNTER_BY_ID_URL + query.get("_id"),
      userToken
    );
    console.log(VisRes);
    if (VisRes) {
      if (VisRes.success === true) {
        // toast.success(VisRes.message);
      } else {
        // toast.warning(VisRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  useEffect(() => {
    getPropertyByUserId();
    viewed();
  }, []);
  // useEffect(() => {
  //   // if (userToken && viewed == true) {
  //     // viewed();
  //   // }
  // }, [propertyView]);

  return (
    <div>
      <MetaTages
        productDescription={metaDesc}
        // productName={"NewBuilding"}
        productImageUrl={imageLink}
      />
      <div className="PropertiePageDetails_container_div">
        <PropertyPriceDetails
          user={getAllData && getAllData}
          sellerDetails={sellerDetails}
          userToken={userToken}
          handleShortListProperty={handleShortListProperty}
          shortList={shortList}
        />
        <MobileSearchListList
          user={getAllData && getAllData}
          sellerDetails={sellerDetails}
          userToken={userToken}
          handleShortListProperty={handleShortListProperty}
          Address={true}
          heart={shortList}
          setOwnerCont={setOwnerCont}
          ownerCont={ownerCont}
          detailsPage={true}
          contactDetails={true}
          AgentRERA={sellerDetails?.rera_number}
        />
        <div className="PropertiePageDetails_Atag_div">
          <div className="PropertiePageDetails_Atag">
            <a
              href="#Overview"
              className={overView === true && "selectelement"}
              onClick={() => {
                setOverView(true);
                setOwnerDetails(false);
                setAmenities(false);
                setOverV(true);
              }}
            >
              Overview
            </a>
            <a
              href="#OwnerDetails"
              className={ownerDetails === true && "selectelement"}
              onClick={() => {
                setOverView(false);
                setOwnerDetails(true);
                setAmenities(false);
              }}
            >
              Owner Details
            </a>
            <a
              href="#Amenities"
              className={amenities === true && "selectelement"}
              onClick={() => {
                setOverView(false);
                setOwnerDetails(false);
                setAmenities(true);
              }}
            >
              Amenities
            </a>
          </div>
          <hr className="PropertiePageDetails_hr" />
        </div>
      </div>
      <div>
        <div
          id="Overview"
          className={`container
         ${overV === true ? "selectAnchorTag" : undefined} `}
        >
          <OverView user={getAllData && getAllData} />
        </div>
        <div
          id="OwnerDetails"
          style={{ width: "100%", backgroundColor: "#F5F7FA" }}
        >
          <div
            className={`container 
              //${ownerDetails === true ? "selectAnchorTag" : undefined}
            `}
          >
            <OwnerDetails
              user={getAllData && getAllData}
              sellerDetails={sellerDetails && sellerDetails}
            />
          </div>
        </div>
        <div
          id="Amenities"
          className={`container 
            //${amenities === true ? "selectAnchorTag" : undefined}
           `}
        >
          <Amenities
            user={getAllData && getAllData}
            mediaLink={true}
            urlToShare={window.location.href}
            titleToShare={
              getAllData &&
              getAllData.pricinganddetails &&
              getAllData.pricinganddetails.uniqueDescription
            }
            AgentRERA={sellerDetails?.rera_number}
          />
        </div>
      </div>
      <MobileBottomMenu Highlight="home" />
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
  );
};

export default PropertyDetails;
