import { useContext, useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { FcSearch } from "react-icons/fc";
import { ImCross, ImLocation2 } from "react-icons/im";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { Link } from "react-router-dom";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { getLocations } from "../../../config/Helper";
import AuthContext from "../../../context/AuthProvider";
import "./Buysearch.css";

// import e from "express";

const Buysearch = ({ setOpenVoice, setText, text }) => {
  const [select, setSelect] = useState(false);
  // const { transcript, resetTranscript } = useSpeechRecognition();
  const { transcript, listening, startListening, stopListening } =
    useSpeechRecognition({
      onEnd: () => {
        stopListening();
      },
    });

  console.log("transcript==>", transcript);
  const value = useContext(AuthContext);
  useEffect(() => {
    if (window.SpeechRecognition && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          // Permission granted
          stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
          console.log("Microphone permission granted");
        })
        .catch((err) => {
          // Permission denied
          console.log("Microphone permission denied", err);
        });
    }
  }, []);

  const handleSpeectToText = () => {
    SpeechRecognition.startListening();
    setText(transcript);
    value.setSearchQuary(transcript);
    setOpenVoice(true);
    // if (!listening) {
    //   startListening({ continuous: true });
    //   console.log("transcript=======>", transcript);
    // }
  };

  const getLocation = async () => {
    if (value.geoLocations && value.geoLocations.length > 0) {
      value.setLocations(value.geoLocations[0].city);
    } else {
      let newlocation = await getLocations();
      console.log("newlocation ==>", newlocation);
      if (newlocation) {
        value.setLocations(newlocation[0].city);
        value.setGeoLocations(newlocation);
      }
    }
  };

  const handleselectOption = (val) => {
    // setBuy(val);
    value.setTypeOfBusiness(val);
    value.setSelectSearch("");
    setSelect(!select);
  };
  const handleSelectOptions = (val) => {
    // setBuy(val);
    value.setSelectSearch(val);
    value.setTypeOfBusiness("");
    setSelect(!select);
  };

  // -------- Geolocation (JS) Code for getting latitude and longitude ----------

  useEffect(() => {
    if (transcript) {
      value.setSearchQuary(transcript);
    }
    setText(transcript);
  }, [transcript]);
  useEffect(() => {
    const timer = setTimeout(() => setOpenVoice(false), 3000);
    return () => clearTimeout(timer);
  }, [handleSpeectToText]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <>
      <div className="Buysearch_main_container_div">
        <div className="Buysearch_container_div">
          <div className="Buysearch_property_container_div">
            <div
              className="Buysearch_property_container_button"
              style={{ borderRadius: "10px 0px 0px 0px" }}
              id={value.typeOfBusiness == "sell" && "option"}
              onClick={() => handleselectOption("sell")}
            >
              <a>Buy</a>
            </div>

            <div
              className="Buysearch_property_container_button"
              onClick={() => handleselectOption("rent/lease")}
              id={value.typeOfBusiness == "rent/lease" && "option"}
            >
              <a>Rent</a>
            </div>
            <div
              className="Buysearch_property_container_button"
              onClick={() => handleselectOption("pg")}
              id={value.typeOfBusiness == "pg" && "option"}
            >
              <a>PG/Co-living</a>
            </div>
            <div
              className="Buysearch_property_container_button"
              onClick={() => handleSelectOptions("Firesale")}
              id={value.selectSearch == "Firesale" && "option"}
            >
              <a>
                Firesale <span id="Buysearch_span">New</span>
              </a>
            </div>
            {/* <div
            className="Buysearch_property_container_button"
             onClick={()=>handleselectOption('5')} id={value.typeOfBusiness == '5' && "option"}>
              <a>Office Space</a>
            </div>
            <div 
            className="Buysearch_property_container_button"
            onClick={()=>handleselectOption('6')} id={value.typeOfBusiness == '6' && "option"}>
              <a>new</a>
            </div> */}
            <div
              className="Buysearch_property_container_button"
              onClick={() => handleSelectOptions("Office Space")}
              id={value.selectSearch == "Office Space" && "option"}
            >
              <a>Office Space</a>
            </div>
            <div
              className="Buysearch_property_container_button"
              onClick={() => handleSelectOptions("Flatmate")}
              id={value.selectSearch == "Flatmate" && "option"}
              style={{ borderRadius: "0px 10px 0px 0px" }}
            >
              <a>Flatmate</a>
            </div>
          </div>
          <div className="Buysearch_search_container_div">
            {/* <SelectObject /> */}
            {/* <div className="sideborder">|</div> */}
            <input
              type="search"
              value={value.searchQuary}
              // list="search-List"
              list
              placeholder={`Search "Property for ${
                value.typeOfBusiness
                  ? `${
                      value.typeOfBusiness === "sale"
                        ? "buy"
                        : value.typeOfBusiness
                    }`
                  : `${value.selectSearch}`
              }${value.locations && " in "}${value.locations}"`}
              onChange={(e) => {
                value.setSearchQuary(e.target.value);
              }}
              className="Buysearch_input"
            />
            {/* <datalist id="search-List">
              <option value='1 BHK' />
              <option value='2 BHK' />
              <option value='3 BHK' />
              <option value='4 BHK' />
              <option value='1rk room' />
              <option value='4 rooms' />
              <option value='4bhk near me' />
              <option value='4 bhk in kolkata' />
            </datalist> */}
            <div className=" Buysearch_getlocation_containerDiv">
              {value.locations ? (
                <div className="Buysearch_getlocation_container_div">
                  <div
                    className="sw Buysearch_getlocation_Select"
                    title={value.locations}
                  >
                    <BiCurrentLocation
                      className=" Buysearch_locationicon"
                      onClick={getLocation}
                      title={value.locations}
                    />
                    <p>{value.locations.slice(0, 15)}</p>
                  </div>
                  <ImCross
                    className="sw Buysearch_locationiconImCross"
                    onClick={() => value.setLocations("")}
                  />
                </div>
              ) : (
                <>
                  <BiCurrentLocation
                    className=" Buysearch_locationicon"
                    onClick={getLocation}
                    title={value.locations}
                  />
                </>
              )}
              <div className="sideborder">|</div>
              <MdKeyboardVoice
                onClick={handleSpeectToText}
                className=" c_blue Buysearch_voiceicon"
              />
              <div className="sideborder">|</div>
              <Link to="/search/property">
                <button
                  type="button"
                  className="btn btn-primary btm-sm Buysearch_searchbutton"
                  // onClick={getLocationss}
                >
                  Search
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className=" Buysearch_search_mobile_container_div">
          {/* <div> */}
          {select ? (
            <IoIosArrowUp
              fontSize={25}
              onClick={() => setSelect(false)}
              color="#42526e"
            />
          ) : (
            <IoIosArrowDown
              fontSize={25}
              onClick={() => setSelect(true)}
              color="#42526e"
            />
          )}
          {/* </div> */}
          {select ? (
            <div className="sw Buysearch_property_Mobilecontainer_div">
              <div
                className="BuysearchMobile_property_container_button"
                id={value.typeOfBusiness == "sell" && "option"}
                onClick={() => handleselectOption("sell")}
              >
                <a>Buy</a>
              </div>

              <div
                className="BuysearchMobile_property_container_button"
                onClick={() => handleselectOption("rent/lease")}
                id={value.typeOfBusiness == "rent/lease" && "option"}
              >
                <a>Rent</a>
              </div>
              <div
                className="BuysearchMobile_property_container_button"
                onClick={() => handleselectOption("pg")}
                id={value.typeOfBusiness == "pg" && "option"}
              >
                <a>PG/Co-living</a>
              </div>
              <div
                className="BuysearchMobile_property_container_button"
                onClick={() => handleSelectOptions("Firesale")}
                id={value.selectSearch == "Firesale" && "option"}
              >
                <a>
                  Firesale <span id="Buysearch_span">New</span>
                </a>
              </div>
              <div
                className="BuysearchMobile_property_container_button"
                onClick={() => handleSelectOptions("Office Space")}
                id={value.selectSearch == "Office Space" && "option"}
              >
                <a>Office Space</a>
              </div>
              <div
                className="BuysearchMobile_property_container_button"
                onClick={() => handleSelectOptions("Flatmate")}
                id={value.selectSearch == "Flatmate" && "option"}
              >
                <a>Flatmate</a>
              </div>
            </div>
          ) : (
            ""
          )}
          <input
            type="search"
            placeholder={`Search "Property for  ${
              value.typeOfBusiness
                ? `${
                    value.typeOfBusiness === "sale"
                      ? "buy"
                      : value.typeOfBusiness
                  }`
                : `${value.selectSearch}`
            }${value.locations && " in "}${value.locations}"`}
            onChange={(e) => {
              value.setSearchQuary(e.target.value);
            }}
          />
          <div className="Buysearch_getlocation_container_div">
            <ImLocation2
              className=" Buysearch_locationicon"
              onClick={getLocation}
              title={value.locations}
            />
          </div>
          <div className="sideborder">|</div>
          <MdKeyboardVoice
            onClick={handleSpeectToText}
            className=" c_blue Buysearch_voiceicon"
          />
          <div className="sideborder">|</div>
          <Link to="/search/property">
            <a role="button">
              <FcSearch className="h3 FcSearchSearch" />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Buysearch;
