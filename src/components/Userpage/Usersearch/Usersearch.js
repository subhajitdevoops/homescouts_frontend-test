import React, { useState, useEffect } from "react";
import "./Usersearch.css";
import { ImCross, ImLocation2 } from "react-icons/im";
import { MdKeyboardVoice } from "react-icons/md";
import { FcSearch } from "react-icons/fc";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Link } from "react-router-dom";
import Gif from "./gif1 (2).gif";
import Selects from "../../Home/SelectObject/Selects";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "../../Home/Buysearch/Buysearch.css";
import { BiCurrentLocation } from "react-icons/bi";
import { getLocations } from "../../../config/Helper";

const Usersearch = ({
  handleSearchButtons,
  setDataTranscript,
  dataTranscript,
  mobileSearch,
  setLocationData,
  placeholder,
  searchSelect,
  Allocations,
  clearLocations,
}) => {
  const options = ["One", "Two", "Three", "Four", "Five"];
  const [opValue, setOpValue] = useState("All Residential");
  // const [text, setText] = useState("");
  // speech to text function
  const value = useContext(AuthContext);

  const [select, setSelect] = useState(false);
  const [selectValue, setSelectValue] = useState(value.selectSearch);

  const { transcript, resetTranscript } = useSpeechRecognition("");
  const [openVoice, setOpenVoice] = useState(false);
  const handleSpeectToText = () => {
    SpeechRecognition.startListening();
    setOpenVoice(true);
    setDataTranscript(transcript);
  };
  // -----------------------------------
  const handleselectOption = (val) => {
    // setBuy(val);
    value.setTypeOfBusiness(val);
    if (val == "sell") {
      setSelectValue("Buy");
    } else if (val == "rent/lease") {
      setSelectValue("Rent");
    } else {
      setSelectValue("PG/Co-living");
    }
    value.setSelectSearch("");
    setSelect(!select);
  };
  // ----------------------------------------------------
  const handleSelectOptions = (val) => {
    // setBuy(val);
    value.setSelectSearch(val);
    value.setTypeOfBusiness("");
    setSelectValue(val);
    setSelect(!select);
  };
  // -------- Geolocation (JS) Code for getting latitude and longitude ----------
  const getLocation = async () => {
    if (value.geoLocations && value.geoLocations.length > 0) {
      setLocationData(value.geoLocations[0].city);
    } else {
      let newlocation = await getLocations();
      console.log("newlocation ==>", newlocation);
      if (newlocation) {
        setLocationData(newlocation[0].city);
        value.setGeoLocations(newlocation);
      }
    }
  };
  // closing for voice page
  //-----------------select box-----------------------
  useEffect(() => {
    if (transcript) {
      setDataTranscript(transcript);
    }
    if (value.typeOfBusiness == "sell") {
      setSelectValue("Buy");
    } else if (value.typeOfBusiness == "rent/lease") {
      setSelectValue("Rent");
    } else {
      setSelectValue("PG/Co-living");
    }
  }, [transcript]);

  useEffect(() => {
    const timer = setTimeout(() => setOpenVoice(false), 4000);
    return () => clearTimeout(timer);
  }, [handleSpeectToText]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  console.log("Allocations=>", Allocations);
  return (
    <>
      {openVoice === true && (
        <div className="Usersearch_search_transcript_container_div">
          <div className="b_r Usersearch_search_transcript_div">
            <p>
              <i>Say Something ...</i>
            </p>
            <img src={Gif} alt="gif..." />
            <h3>
              <i>{transcript}</i>{" "}
            </h3>
          </div>
        </div>
      )}

      <div className="Usersearch_main_container_div">
        <div className="Usersearch_container_div">
          <div className="Usersearch_search_container_div">
            {searchSelect == true ? (
              <>
                <div
                  className="Usersearch_searchSelect_container_div"
                  onClick={() => setSelect(!select)}
                >
                  <p style={{ paddingLeft: "3px" }}>{selectValue}</p>
                  {select ? (
                    <IoIosArrowUp fontSize={15} />
                  ) : (
                    <IoIosArrowDown fontSize={15} />
                  )}
                </div>
                {/* </div> */}
                {select ? (
                  <div className="sw Usersearch_property_Mobilecontainer_div">
                    <div
                      className="UsersearchMobile_property_container_button"
                      id={value.typeOfBusiness == "sell" && "option"}
                      onClick={() => handleselectOption("sell")}
                    >
                      <a>Buy</a>
                    </div>

                    <div
                      className="UsersearchMobile_property_container_button"
                      onClick={() => handleselectOption("rent/lease")}
                      id={value.typeOfBusiness == "rent/lease" && "option"}
                    >
                      <a>Rent</a>
                    </div>
                    <div
                      className="UsersearchMobile_property_container_button"
                      onClick={() => handleselectOption("pg")}
                      id={value.typeOfBusiness == "pg" && "option"}
                    >
                      <a>PG/Co-living</a>
                    </div>
                    <div
                      className="UsersearchMobile_property_container_button"
                      onClick={() => handleSelectOptions("Firesale")}
                      id={value.selectSearch == "Firesale" && "option"}
                    >
                      <a>
                        Firesale <span id="Usersearch_span">New</span>
                      </a>
                    </div>
                    <div
                      className="UsersearchMobile_property_container_button"
                      onClick={() => handleSelectOptions("Office Space")}
                      id={value.selectSearch == "Office Space" && "option"}
                    >
                      <a>Office Space</a>
                    </div>
                    <div
                      className="UsersearchMobile_property_container_button"
                      onClick={() => handleSelectOptions("Flatmate")}
                      id={value.selectSearch == "Flatmate" && "option"}
                    >
                      <a>Flatmate</a>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="sideborder">|</div>
              </>
            ) : (
              ""
            )}
            {/* <div className="Usersearch_select_container_div"></div> */}
            <input
              type="text"
              value={dataTranscript}
              className="Usersearch_input"
              placeholder={placeholder}
              onChange={(e) => {
                setDataTranscript(e.target.value);
              }}
            />
            <div className="Usersearch_getlocation_container_div">
              {Allocations ? (
                <div className="Buysearch_getlocation_container_div">
                  <div
                    className="sw Buysearch_getlocation_Select"
                    title={Allocations}
                  >
                    <BiCurrentLocation
                      className=" Buysearch_locationicon"
                      onClick={getLocation}
                      title={Allocations}
                    />
                    <p>{Allocations && Allocations.slice(0, 15)}</p>
                  </div>
                  <ImCross
                    className="sw Buysearch_locationiconImCross"
                    onClick={() => clearLocations("")}
                  />
                </div>
              ) : (
                <>
                  <BiCurrentLocation
                    className=" Buysearch_locationicon"
                    onClick={getLocation}
                    title={Allocations}
                  />
                </>
              )}
            </div>
            <div className="sideborder">|</div>
            <MdKeyboardVoice
              onClick={handleSpeectToText}
              className=" c_blue Usersearch_voiceicon"
            />
            <div className="sideborder">|</div>
            <button
              type="button"
              className="btn btn-primary btm-sm Usersearch_searchbutton"
              onClick={() => handleSearchButtons()}
            >
              Search
            </button>
          </div>
        </div>
        {mobileSearch === true ? (
          <div className="b_r Usersearch_search_mobile_container_div">
            <input
              type="search"
              placeholder={placeholder}
              value={dataTranscript}
              onChange={(e) => {
                setDataTranscript(e.target.value);
              }}
              title={placeholder}
            />
            <a class="btn btn-primary" href="#" role="button">
              <FcSearch className="h3" onClick={() => handleSearchButtons()} />
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Usersearch;
