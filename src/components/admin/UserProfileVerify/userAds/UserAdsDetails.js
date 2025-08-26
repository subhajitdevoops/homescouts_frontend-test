import React, { useState } from "react";
import Amenities from "../../../PropertiePageDetails/PropertyDetails/Amenities/Amenities";
import OverView from "../../../PropertiePageDetails/PropertyDetails/OverView/OverView";
import OwnerDetails from "../../../PropertiePageDetails/PropertyDetails/OwnerDetails/OwnerDetails";
import PropertyPriceDetails from "../../../PropertiePageDetails/PropertyDetails/PropertyPriceDetails/PropertyPriceDetails";
import { MobileSearchListList } from "../../../Userpage/Searchlist/Searchlist";

const UserAdsDetails = ({ getAllData, setAdsDetails, handleChangeStaus }) => {
  const [overV, setOverV] = useState(false);
  const [overView, setOverView] = useState(true);
  const [ownerDetails, setOwnerDetails] = useState(false);
  const [amenities, setAmenities] = useState(false);
  const [windowHeigh, setWindowHeigh] = useState();
  const [ownerCont, setOwnerCont] = useState(false);
  // console.log(windowHeigh);

  const changeStatus = () => {
    if (window.scrollY < 300) {
      setOverV(false);
    }

    setWindowHeigh(window.scrollY);
  };
  window.addEventListener("scroll", changeStatus);
  return (
    <div>
      <div
        className="PropertiePageDetails_container_div"
        style={{ backgroundColor: "#fff" }}
      >
        <PropertyPriceDetails
          UpToDate={true}
          ToggleButton={true}
          VeriIconChange={true}
          user={getAllData}
          setAdsDetails={setAdsDetails}
          backButton={true}
          handleChangeStaus={handleChangeStaus}
        />

        <MobileSearchListList
          user={getAllData}
          setOwnerCont={setOwnerCont}
          ownerCont={ownerCont}
          AgentRERA={getAllData?.user?.rera_number}
        />
        <div className="PropertiePageDetails_Atag_div">
          <div className="PropertiePageDetails_Atag">
            <a
              href="#Overviews"
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
              href="#Amenitiess"
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

      <div
        id="Overviews"
        className={`container containers  ${
          overV === true ? "selectAnchorTag" : undefined
        } `}
      >
        <OverView user={getAllData} />
      </div>
      <div
        id="Amenitiess"
        className={`container containers ${
          amenities === true ? "selectAnchorTag" : undefined
        } `}
      >
        <Amenities
          user={getAllData}
          //  mediaLink={true} phase2
          AgentRERA={getAllData?.user?.rera_number}
        />
      </div>
    </div>
  );
};

export default UserAdsDetails;
