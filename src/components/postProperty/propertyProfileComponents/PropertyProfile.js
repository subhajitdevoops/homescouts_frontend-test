import React, { useState, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import PPS from "../css/propertyProfile.module.css";
import RoomDetails from "./RoomDetails";
import AreaDetails from "./AreaDetails";
import OthersRoom from "./OthersRoom";
import Furnishing from "./Furnishing";
import ReserveParking from "./ReserveParking";
import FloorDetails from "./FloorDetails";
import AvailablityStatus from "./AvailablityStatus";

// ------- Some Extra Component import for only PG choosen section ---------
import RoomType from "./PGpropertyProfileComponents/PGRoomType";
import CapacityAndAvailability from "./PGpropertyProfileComponents/CapacityAndAvailability";
import AvailableFor from "./PGpropertyProfileComponents/AvailableFor";
import SuitableFor from "./PGpropertyProfileComponents/SuitableFor";
import { API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from "../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";

function PropertyProfile(props) {
  const property_profile_info = props.postPropertyInfo.property_profile_info;
  const setPostPropertyInfo = props.setPostPropertyInfo;


  console.log("props.basicRes------------------------------>", props.basicRes);

  //  for PG - conditions checking --------
  const purpose_of_listing =
    props.postPropertyInfo.basic_details.purpose_of_listing;

  // ---------------------- Validation ---------------
  const errorRef = useRef(null);
  const scrollError = () => errorRef.current.scrollIntoView();
  const [error, setError] = useState({});
  const property_profile_validation = () => {
    const error_msg = {};
    if (property_profile_info.room_details.no_of_bedrooms === "") {
      scrollError();
      error_msg.no_of_bedrooms_error = " Please select no. of bedrooms.";
    }
    if (property_profile_info.room_details.no_of_bathrooms === "") {
      scrollError();
      error_msg.no_of_bathrooms_error = " Please select no. of bathrooms.";
    }
    if (property_profile_info.room_details.no_of_balconies === "") {
      scrollError();
      error_msg.no_of_balconies_error = " Please select no. of balconies.";
    }

    if (
      property_profile_info.floor_details.total_no_floor &&
      property_profile_info.floor_details.total_no_floor.length === 0
    ) {
      error_msg.total_no_floor_error = " Please enter total no. of floors.";
    }
    if (
      property_profile_info.floor_details.property_on_floor &&
      property_profile_info.floor_details.property_on_floor.length === 0
    ) {
      error_msg.property_on_floor_error = " Please select floor of property.";
    }
    // ----------- this error only for Sell and Rent/Lease property Section-------------------
    if (purpose_of_listing !== "PG") {
      if (property_profile_info.area_details.carpet_area.length === 0) {
        scrollError();
        error_msg.carpet_area_error = " Please enter carpet area of property.";
      }
      if (property_profile_info.area_details.area_unit.length === 0) {
        scrollError();
        error_msg.area_unit_error = " Please choose area measurement unit.";
      }
      if (
        property_profile_info.availibility_details.availibility_status &&
        property_profile_info.availibility_details.availibility_status
          .length === 0
      ) {
        error_msg.availibility_status_error =
          " Please select availibilty status";
      }
      if (
        property_profile_info.availibility_details.availibility_status ===
          "Ready to move" &&
        property_profile_info.availibility_details.age_of_property &&
        property_profile_info.availibility_details.age_of_property.length === 0
      ) {
        error_msg.age_of_property_error = " Please select age of property";
      }
      if (
        property_profile_info.availibility_details.availibility_status ===
          "Under construction" &&
        property_profile_info.availibility_details.expected_by &&
        property_profile_info.availibility_details.expected_by.length === 0
      ) {
        error_msg.expected_by_error = " Please select expected time";
      }
    }
    // -------- this error only for PG section --------------
    if (purpose_of_listing === "PG") {
      if (
        property_profile_info.room_type &&
        property_profile_info.room_type.length === 0
      ) {
        error_msg.room_type_error = " Please select PG room type...";
        scrollError();
      }
      if (
        property_profile_info.room_type == ""
      ) {
        error_msg.no_of_room_partners_error =
          " Please select room type";
        scrollError();
      }
      if (
        property_profile_info.room_type == "Sharing" &&
        property_profile_info.no_of_room_partners==''
      ) {
        error_msg.no_of_room_partners_error =
          " Please select no. of room partners";
        scrollError();
      }
      if (
        property_profile_info.available_for &&
        property_profile_info.available_for.length === 0
      ) {
        error_msg.available_for_error = " Please select availability";
      }
      if (
        property_profile_info.suitable_for.students === false &&
        property_profile_info.suitable_for.working_professionals === false
      ) {
        error_msg.suitable_for_error = " Please select suitable for option";
      }
    }
    if (Object.keys(error_msg).length === 0) {
      Validation();
    } else {
      setError(error_msg);
    }
  };

  // -------------------------getUser Token -----------------------
  const getToken = JSON.parse(localStorage.getItem("accessToken"));
  const _id = getToken && getToken.response._id;
  const token = getToken && getToken.response.token;
  console.log("userToken------------------------------------>", token);
  const Validation = async () => {
    // const formData = new FormData();
   
    const post_aboutData = {
      _id: props.basicRes,
      step: "aboutproperty",
      aboutproperty:
        props.postPropertyInfo.basic_details.purpose_of_listing === "PG"
          ? {
              roomDetails: {
                noOfBedRooms: property_profile_info.room_details.no_of_bedrooms,
                noOfBathRooms:
                  property_profile_info.room_details.no_of_bathrooms,
                noOfBalconies:
                  property_profile_info.room_details.no_of_balconies,
                roomTypes: property_profile_info.room_type,
                howManyPeople:
                  property_profile_info.room_type === "Sharing"
                    ? property_profile_info.no_of_room_partners
                    : null,
              },
              capacityAndAvailability: {
                noOfBed:
                  property_profile_info.capacity_and_availability
                    .total_no_of_beds,
                noOfBedsAvailable:
                  property_profile_info.capacity_and_availability
                    .no_of_beds_available,
              },
              attachedBathroom:
                property_profile_info.capacity_and_availability
                  .attached_bathroom,
              attachedBalcony:
                property_profile_info.capacity_and_availability
                  .attached_balcony,
              othersRoom: property_profile_info.other_rooms_details,
              furnishingType:
                property_profile_info.furnishing_details.furnishing_type.toLowerCase(),
              option: property_profile_info.furnishing_details.furnishing_items,
              reservedParking: {
                CoveredParking: {
                  noOfParking:
                    property_profile_info.parking_details.cover_parking,
                },
                OpenParking: {
                  noOfParking:
                    property_profile_info.parking_details.open_parking,
                },
              },
              FloorDetails: {
                totalNoOfFloor:
                  property_profile_info.floor_details.total_no_floor,
                whichFloor:
                  property_profile_info.floor_details.property_on_floor.toLowerCase(),
              },
              availableFor: property_profile_info?.available_for.toLowerCase(),
              suitablefor: [
                property_profile_info.suitable_for.students === true &&
                  "student",
                property_profile_info.suitable_for.working_professionals ===
                  true && "working prof",
              ],
            }
          : {
              roomDetails: {
                noOfBedRooms: property_profile_info.room_details.no_of_bedrooms,
                noOfBathRooms:
                  property_profile_info.room_details.no_of_bathrooms,
                noOfBalconies:
                  property_profile_info.room_details.no_of_balconies,
              },
              carpetArea: property_profile_info.area_details.carpet_area,
              areaMessurementUnit:
                `${property_profile_info.area_details.area_unit}`.toLowerCase(),
              othersRoom: property_profile_info.other_rooms_details,
              furnishingType:
                property_profile_info.furnishing_details.furnishing_type.toLowerCase(),
              option: property_profile_info.furnishing_details.furnishing_items,
              reservedParking: {
                CoveredParking: {
                  noOfParking:
                    property_profile_info.parking_details.cover_parking,
                },
                OpenParking: {
                  noOfParking:
                    property_profile_info.parking_details.open_parking,
                },
              },
              FloorDetails: {
                totalNoOfFloor:
                  property_profile_info.floor_details.total_no_floor,
                whichFloor:
                  property_profile_info.floor_details.property_on_floor.toLowerCase(),
              },
              availability: {
                status:
                  property_profile_info.availibility_details.availibility_status.toLowerCase(),
                ageOfProperty:
                  property_profile_info.availibility_details.age_of_property,
                possessionBy:
                  property_profile_info.availibility_details.expected_by,
              },
            },
    };
    console.log(post_aboutData);
    // formData.append("data", JSON.stringify(post_aboutData));
    let resPostPropertyData = await API_REQ_POST_WITH_TOKEN(
      configData.POST_PROPERTY_POST_DETAILS_URL,
      post_aboutData,
      token
    );
    console.log(resPostPropertyData);
    if (resPostPropertyData) {
      if (resPostPropertyData.success === true) {
        toast.success(resPostPropertyData.message);
        props.updateStep(4);
      } else {
        toast.warning(resPostPropertyData.message);
      }
    } else {
      toast.error("please check Your Internet connection !");
    }
  };
  // console.table(error);
  // ------------------------ JSX ------------------------------------
  return (
    <div className={`${PPS.container}`}>
      {/*---------------------------- Back Button ---------------------------*/}
      <button
        ref={errorRef}
        className="p-1 btn btn-secondary"
        onClick={() => {
          props.updateStep(2);
        }}
      >
        <BiArrowBack style={{ margin: "0 3px" }} />
        Back
      </button>
      {/* -------------------------------------------------------------------- */}
      <br />
      <br />
      <h1 className="">Tell us about your property</h1>
      <br />
      <RoomDetails
        property_profile_info={property_profile_info}
        setPostPropertyInfo={setPostPropertyInfo}
        error={error}
        // errorRef={errorRef}
      />
      <br />
      {purpose_of_listing === "PG" && (
        <RoomType
          property_profile_info={property_profile_info}
          setPostPropertyInfo={setPostPropertyInfo}
          error={error}
        />
      )}
      {purpose_of_listing === "PG" && (
        <CapacityAndAvailability
          property_profile_info={property_profile_info}
          setPostPropertyInfo={setPostPropertyInfo}
        />
      )}
      {purpose_of_listing !== "PG" && (
        <AreaDetails
          property_profile_info={property_profile_info}
          setPostPropertyInfo={setPostPropertyInfo}
          error={error}
          setPriceUnit={props.setPriceUnit}
        />
      )}
      <br />

      <OthersRoom
        property_profile_info={property_profile_info}
        setPostPropertyInfo={setPostPropertyInfo}
      />
      <br />
      <Furnishing
        property_profile_info={property_profile_info}
        setPostPropertyInfo={setPostPropertyInfo}
      />

      <br />
      <ReserveParking
        property_profile_info={property_profile_info}
        setPostPropertyInfo={setPostPropertyInfo}
      />
      <br />
      <FloorDetails
        property_profile_info={property_profile_info}
        setPostPropertyInfo={setPostPropertyInfo}
        error={error}
      />
      <br />
      {purpose_of_listing !== "PG" && (
        <AvailablityStatus
          property_profile_info={property_profile_info}
          setPostPropertyInfo={setPostPropertyInfo}
          error={error}
        />
      )}
      {purpose_of_listing === "PG" && (
        <AvailableFor
          property_profile_info={property_profile_info}
          setPostPropertyInfo={setPostPropertyInfo}
          error={error}
        />
      )}
      {purpose_of_listing === "PG" && (
        <SuitableFor
          property_profile_info={property_profile_info}
          setPostPropertyInfo={setPostPropertyInfo}
          error={error}
        />
      )}
      <br />
      {/*---------------------------- Continue Button ---------------------------*/}
      <button
        className="btn btn-primary"
        onClick={() => {
          // props.updateStep(4);
          property_profile_validation();
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default PropertyProfile;
