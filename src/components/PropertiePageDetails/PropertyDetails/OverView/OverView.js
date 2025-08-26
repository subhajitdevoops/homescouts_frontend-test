import React, { useState } from "react";
import "./OverView.css";
import img1 from "../../../../assets/statusimg/img2.jpg";
import OverViewAllDetails from "./OverViewAllDetails";
import { FcAreaChart } from "react-icons/fc";
import { AiOutlinePropertySafety } from "react-icons/ai";
import { GiPriceTag, GiDirectionSign, GiHotMeal, GiSofa } from "react-icons/gi";
import { BiDirections } from "react-icons/bi";
import { RiHotelLine } from "react-icons/ri";
import { FaBirthdayCake, FaRestroom } from "react-icons/fa";
import ImageData from "../../../Home/Nav/StatusData";
import { MdMeetingRoom } from "react-icons/md";
import { GrRestroomMen } from "react-icons/gr";
import configData from "../../../../config/config.json";
import { useEffect } from "react";

const OverView = ({ user }) => {
  const [showImage, setShowImage] = useState("");
  console.log("showImage===>", showImage);

  useEffect(() => {
    if (user) {
      setShowImage(
        user && user.uploadImages && user.uploadImages[0].propertyImage
      );
    }
  }, [user]);
  return (
    <div className="OverView_main_container_div">
      <div className="OverView_property_image">
        <img src={showImage} alt="property image..." />
        <div className="OverView_property_smallimage">
          <div>
            {user &&
              user.uploadImages &&
              user.uploadImages.map((images, index) => (
                <img
                  src={
                    // configData.COMMON_MEDIA_LINK_URL +
                    // "/postproperty/" +
                    images.propertyImage
                  }
                  alt="property image..."
                  onClick={() =>
                    setShowImage(
                      // configData.COMMON_MEDIA_LINK_URL +
                      //   "/postproperty/" +
                      images.propertyImage
                    )
                  }
                />
              ))}
          </div>
        </div>
      </div>
      <div className="OverView_proertyAll_overView">
        <OverViewAllDetails
          details={
            user &&
            user.basicdetails &&
            user.basicdetails.typeOfBusiness === "pg"
              ? [
                  {
                    id: 1,
                    icon: MdMeetingRoom,
                    iconColor: "#88992C",
                    name: "Room",
                    feature:
                      user?.aboutproperty?.roomDetails?.roomTypes == "Private"
                        ? "Private"
                        : `Sharing:  ${
                            user?.aboutproperty?.roomDetails?.howManyPeople ===
                            ""
                              ? "Not Sharing"
                              : `with ${user.aboutproperty.roomDetails.howManyPeople} member`
                          }`,
                    length:
                      user?.aboutproperty?.roomDetails?.roomTypes == "Private"
                        ? ""
                        : `${
                            user?.aboutproperty?.capacityAndAvailability
                              ? user.aboutproperty.capacityAndAvailability
                                  ?.noOfBed
                              : ""
                          }Bed in Room, ${
                            user?.aboutproperty?.capacityAndAvailability
                              ? user.aboutproperty.capacityAndAvailability
                                  ?.noOfBedsAvailable
                              : ""
                          } is Availabel.`,
                  },
                  {
                    id: 2,
                    icon: AiOutlinePropertySafety,
                    iconColor: "#88992C",
                    name: "Property",
                    feature: `  
                      ${
                        user &&
                        user.aboutproperty &&
                        user.aboutproperty.roomDetails &&
                        user.aboutproperty.roomDetails.noOfBedRooms
                      } Bedrooms, ${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.roomDetails &&
                      user.aboutproperty.roomDetails.noOfBathRooms
                    } BathRooms, ${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.roomDetails &&
                      user.aboutproperty.roomDetails.noOfBalconies
                    } Balconies, ${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.othersRoom &&
                      user.aboutproperty.othersRoom
                    }
                    `,
                    length: "",
                  },
                  {
                    id: 3,
                    icon: GiPriceTag,
                    iconColor: "#DE9D3E",
                    name: "Price",
                    feature: `₹ ${
                      user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.rentDetails
                        ? user.pricinganddetails.rentDetails.toLocaleString(
                            "en-IN"
                          )
                        : ""
                    } `,
                    length: `@ ${
                      user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.securityDepositeScheme == "Fixed"
                        ? user.pricinganddetails.securityDepositeScheme
                        : ""
                    } ${
                      user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.securityDepositeScheme == "Fixed"
                        ? `₹${user.pricinganddetails.securityDepositeAmmount} Security Deposite`
                        : `${user.pricinganddetails.noOfMonths}`
                    }`,
                  },
                  {
                    id: 4,
                    icon: BiDirections,
                    iconColor: "#8C3D13",
                    name: "Address",
                    feature: ` in ${user?.location?.city + `,`} 
                      ${user?.location?.locality + `,`}
                      ${user?.location?.subLocality + `,`}
                      ${
                        user?.location?.apartmentAndSocity
                          ? user?.location?.apartmentAndSocity + `,`
                          : ""
                      }
                      ${
                        user?.location?.houseNumber
                          ? user?.location?.houseNumber + `,`
                          : ""
                      }`,
                    length: "",
                  },
                  {
                    id: 5,
                    icon: RiHotelLine,
                    iconColor: "#FE0000",
                    name: "Total Floors",
                    feature: `${user?.aboutproperty?.FloorDetails?.totalNoOfFloor} Floors`,
                    length: `@ on ${user?.aboutproperty?.FloorDetails?.whichFloor} Floor`,
                  },
                  {
                    id: 6,
                    icon: GiHotMeal,
                    iconColor: "#15C05D",
                    name: "Food",
                    feature: `${
                      user?.pricinganddetails?.foodDetails
                        ? user.pricinganddetails.foodDetails
                        : ""
                    }`,
                    length: `${
                      user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.mealTypes
                    }`,
                  },
                  {
                    id: 7,
                    icon: FaBirthdayCake,
                    iconColor: "#FFA9BA",
                    name: "Allowed",
                    feature: `${
                      user?.pricinganddetails?.someHouseRules
                        ?.alcoholAllowed === true
                        ? "Alcohol, "
                        : ""
                    } ${
                      user?.pricinganddetails?.someHouseRules?.partyAllowed ===
                      true
                        ? "Party, "
                        : ""
                    }${
                      user?.pricinganddetails?.someHouseRules?.petsAllowed ===
                      true
                        ? "Pets, "
                        : ""
                    }${
                      user?.pricinganddetails?.someHouseRules
                        ?.smokingAllowed === true
                        ? "Smoking, "
                        : ""
                    }${
                      user?.pricinganddetails?.someHouseRules
                        ?.visitorsAllowed === true
                        ? "visitors, "
                        : ""
                    }`,
                    length: `${
                      user?.aboutproperty?.availability ? (
                        <>
                          {user.aboutproperty.availability.ageOfProperty
                            ? ""
                            : user.aboutproperty.availability.possessionBy}
                        </>
                      ) : (
                        ""
                      )
                    } `,
                  },
                  {
                    id: 8,
                    icon: FaRestroom,
                    iconColor: "#DE9D3E",
                    name: "Available For",
                    feature: `${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.availableFor &&
                      user.aboutproperty.availableFor
                    } `,
                  },
                ]
              : [
                  {
                    id: 1,
                    icon: FcAreaChart,
                    iconColor: "#88992C",
                    name: "Area",
                    feature: `Carepet area: ${
                      user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.pricingDetails
                        ? user.pricinganddetails.pricingDetails.pricePerSqrft
                        : ""
                    } ${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.areaMessurementUnit
                    }`,
                    length: `${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.carpetArea
                    } ${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.areaMessurementUnit
                    }`,
                  },
                  {
                    id: 2,
                    icon: AiOutlinePropertySafety,
                    iconColor: "#88992C",
                    name: "Property",
                    feature: `${user?.aboutproperty?.roomDetails?.noOfBedRooms} Bedrooms, ${user?.aboutproperty?.roomDetails?.noOfBathRooms} BathRooms, ${user?.aboutproperty?.roomDetails?.noOfBalconies} Balconies, ${user?.aboutproperty?.othersRoom}`,
                    length: "",
                  },
                  {
                    id: 3,
                    icon: GiPriceTag,
                    iconColor: "#DE9D3E",
                    name: "Price",
                    feature: `₹ ${
                      user?.pricinganddetails?.pricingDetails &&
                      user?.pricinganddetails?.pricingDetails?.expectedPrice.toLocaleString(
                        "en-IN"
                      )
                    }  ${
                      user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.allInclusivePrice === "yes"
                        ? "All Inclusive Price"
                        : ""
                    } ${
                      user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.taxandGovtChargesExcluded === "yes"
                        ? "Govt Charges & Tax"
                        : ""
                    } `,
                    length: `@  ${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.carpetArea
                    } per ${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.areaMessurementUnit
                    }. ${
                      user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.priceNegotiable === "yes"
                        ? "(Negotiable)"
                        : ""
                    } `,
                  },
                  {
                    id: 4,
                    icon: BiDirections,
                    iconColor: "#8C3D13",
                    name: "Address",
                    feature: ` in ${user?.location?.city + `,`} 
                    ${user?.location?.locality + `,`}
                    ${user?.location?.subLocality + `,`}
                    ${
                      user?.location?.apartmentAndSocity
                        ? user?.location?.apartmentAndSocity + `,`
                        : ""
                    }
                    ${
                      user?.location?.houseNumber
                        ? user?.location?.houseNumber + `,`
                        : ""
                    }`,
                    length: "",
                  },
                  {
                    id: 5,
                    icon: RiHotelLine,
                    iconColor: "#FE0000",
                    name: "Total Floors",
                    feature: `${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.FloorDetails &&
                      user.aboutproperty.FloorDetails.totalNoOfFloor
                    } Floors`,
                    length: `@ on ${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.FloorDetails &&
                      user.aboutproperty.FloorDetails.whichFloor
                    } Floor`,
                  },
                  {
                    id: 6,
                    icon: GiSofa,
                    iconColor: "#15C05D",
                    name: "Furnishing Type  ",
                    feature: ` ${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.furnishingType &&
                      user.aboutproperty.furnishingType
                    }`,
                    length: "",
                  },
                  {
                    id: 7,
                    icon: FaBirthdayCake,
                    iconColor: "#FFA9BA",
                    name: "Property Age",
                    feature: `${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.availability
                        ? user.aboutproperty.availability.ageOfProperty
                          ? user.aboutproperty.availability.ageOfProperty
                          : user.aboutproperty.availability.status
                        : ""
                    } `,
                    length: `${
                      user &&
                      user.aboutproperty &&
                      user.aboutproperty.availability
                        ? user.aboutproperty.availability.ageOfProperty
                          ? ""
                          : user.aboutproperty.availability.possessionBy
                        : ""
                    } `,
                  },
                  {
                    id: 8,
                    icon: GrRestroomMen,
                    iconColor: "#DE9D3E",
                    name: "owner ship",
                    feature: `${
                      user &&
                      user.pricinganddetails &&
                      user.pricinganddetails.ownership &&
                      user.pricinganddetails.ownership
                    } `,
                  },
                ]
          }
        />
      </div>
    </div>
  );
};

export default OverView;
