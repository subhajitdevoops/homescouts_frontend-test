import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Homescouts from "../../../assets/Logo.svg";
import ImageStstus2 from "../../../assets/services/avatar.png";
import { BiMessageDetail } from "react-icons/bi";
import { RiKeyboardBoxFill } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import HomeSlider from "./HomeSlider/HomeSlider";
import ModelStatus from "./ModelStatus";
import data from "./StatusData";
import NavMenu from "./NavMenu.js/NavMenu";
import NavProfile from "./NavProfile/NavProfile";
import "../../../assets/admin/Home/Home.css";
import Buysearch from "../../Home/Buysearch/Buysearch";
import PostPropertyButton from "../../postProperty/PostPropertyButton";
import Usersearch from "../../Userpage/Usersearch/Usersearch";
import { MdSearch } from "react-icons/md";
import { HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";
import StatusStories from "./StatusStory/StatusStories";
import SideBarMobileView from "./SideBarMobileView";
import configData from "../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import CheckOutSideClick from "../../../config/CheckOutSideClick";

import { RxDotFilled } from "react-icons/rx";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { getLocations, imageKit } from "../../../config/Helper";
import view from "../../../assets/BottomMenu/View Status_Clicked.png";
// -----------------------------------------

const MobileSearchBar = ({
  slide,
  setDataTranscript,
  dataTranscript,
  // handleSearchButton,
}) => {
  return (
    <>
      {/* {slide === true ? ( */}
      <div className="HomeNav_serachMobile">
        <input
          type="search"
          value={dataTranscript}
          onChange={(e) => {
            setDataTranscript(e.target.value);
          }}
          placeholder="Enter cities or place name ..."
          className="Buysearch_input"
        />
        <MdSearch
          className="HomeNav_serachMobileIcon"
          // onClick={handleSearchButton}
        />
      </div>
      {/* ) : null} */}
    </>
  );
};

const Nav = ({
  setOpenVoice,
  transcript,
  postpropertyBtnVeiw,
  text,
  setText,
  userSearchProperty,
  handleSearchButton,
  setDataTranscript,
  dataTranscript,
  MobileViewSearch,
  style,
  showStatus,
  setLocationData,
  handleServiceMenu,
  placeholder,
  searchSelect,
  Allocations,
  clearLocations,
}) => {
  // const [lists, setLists] = useState([]); //-------------All data from the list
  // data.statusData
  // const [selectImg, setSelectImg] = useState([]); //-----------stored select image from status bar by clicking
  // const [modalIsOpen, setModalIsOpen] = useState(false); //------------ model open and close to show selecting image as a status in the middle fo the screen
  const [nevMenu, setNavMenu] = useState(false); //--------------------this is for app menu or nevmenu open close
  //--------------------------- hide status bar from navbar while scrolling down
  const [slide, setSlider] = useState(false);
  const [buylable, setBuylable] = useState(false);
  const [rightStatus, setRightStatus] = useState(false);
  const [menuHem, setMenuHem] = useState(false);
  const [userImg, setUserImg] = useState(ImageStstus2);
  const [notification, setNotification] = useState(false);
  const [geoloc, setGeoloc] = useState("");
  const [statusLoader, setStatusLoader] = useState(false);

  // console.log("lists==>", lists);
  const value = useContext(AuthContext);

  // ------------------------show status bar--------------------
  // const [showstatus, setShowStatus] = useState();
  // const [sliderInterval, setSliderInter] = useState();
  // const defaultStatusId = lists.length > 0 ? lists[0].id : null; //minimize state while scrolling the screen from top to bottom

  // const [counter, setCounter] = useState(0);
  // const [openStory, setOpenStory] = useState(false);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);

  const handleshowStatus = (id, index) => {
    // console.log("handleshowStatus id=", id);
    // console.log("handleshowStatus index=", index);
    if (value.noOfStatus > 0) {
      value.setCounter(index);
      value.setOpenStory(true);
    }

    // setShowStatus(id);
    // let cur_index = 0;
    // let cur_img = [];
    // lists.map((li, index) => {
    //   if (li.id == id) {
    //     cur_img.push(li);
    //     cur_index = index;
    //   }
    // });

    // if (id && id != "" && cur_img.length > 0) {
    //   setSelectImg(cur_img);
    //   setModalIsOpen(true);
    //   let sliderInterval = setInterval(async () => {
    //     setSliderInter(sliderInterval);
    //     if (cur_index != lists.length) {
    //       setModalIsOpen(false);
    //       cur_index++;
    //       cur_img = lists[cur_index];
    //       setSelectImg([]);
    //       setSelectImg([cur_img]);
    //       setModalIsOpen(true);
    //     } else {
    //       closeModal();
    //     }
    //   }, 5000);
    // }
  };

  // const closeModal = () => {
  //   clearInterval(sliderInterval);
  //   setModalIsOpen(false);
  // };
  // --------------------Scroll get width--------------------------------------
  const changeStatus = () => {
    if (window.scrollY > 350) {
      setSlider(true);
      setBuylable(false);
      setRightStatus(true);
      setMenuHem(false);
    } else {
      setSlider(false);
      setBuylable(true);
      setRightStatus(false);
      setMenuHem(false);
    }
  };
  window.addEventListener("scroll", changeStatus);
  // ----------------------nev profile details and tiffen menu-------------------------------
  const [editprofile, setEditProfile] = useState(false);
  const [servicePin, setServicePin] = useState([]);

  const handleProfilePic = () => {
    setEditProfile(!editprofile);
  };

  const myRef = useRef(null);
  // const handleClickOutside = (e) => {
  //   if (!myRef.current.contains(e.target)) {
  //     setMenuHem(false);
  //   }
  // };
  // const handleClickInside = () => {
  //   setMenuHem(true);
  // };
  const closeInputFild = () => {
    setMenuHem(false);
  };

  // ------------ MapMyIndia API code for getting Address using latitude and longitude --------
  const getLocation = async () => {
    if (value.geoLocations && value.geoLocations.length > 0) {
      setGeoloc(value.geoLocations[0].city);
    } else {
      let newlocation = await getLocations();
      console.log("newlocation ==>", newlocation);
      if (newlocation) {
        setGeoloc(newlocation[0].city);
        value.setGeoLocations(newlocation);
      }
    }
  };
  // ---------------------------------Adding Status Images---------------------------------------------

  const handleAddStatusImage = async (e) => {
    if (userToken) {
      const file = e.target.files[0];
      console.log("file====>", file);
      if (file) {
        setStatusLoader(true);
      }
      const folderPath = "ServiceProvider";
      if (file) {
        let imagekitresponse = await imageKit(file, folderPath);
        if (imagekitresponse) {
          let medialinkData = {
            media: [
              {
                name: "mountain view1",
                link: imagekitresponse,
              },
            ],
            location: geoloc,
          };
          setStatusLoader(false);
          let resServiceMaster = await API_REQ_POST_WITH_TOKEN(
            configData.USER_STATUS_UPDATE_DATA_POST_URL,
            medialinkData,
            userToken
          );
          // console.log(resServiceMaster);
          if (resServiceMaster) {
            if (resServiceMaster.success === true) {
              toast.success(resServiceMaster.message);
              getCasesStatus();
              console.log("image ready to display on screen");
            } else {
              toast.warning(resServiceMaster.message);
            }
          } else {
            toast.error("Please Cheak Your Internet !");
          }
        }
      }
    } else {
      toast.warning("Please log in first before uploading your status.");
    }
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // });
  // -----------------------------status Api get request-------------------------------------------

  const getCasesStatus = async () => {
    // if (userToken) {
    let ApiRes = await API_REQ_GET(
      configData.USER_GET_STATUS_BY_LOCATION_GET_URL + `?location=${geoloc}`,
      userToken
    );

    if (ApiRes) {
      if (ApiRes.success === "true") {
        // toast.success(ApiRes.message);
        // console.log("status image=>", ApiRes);

        const val = [];
        for (let ele of ApiRes.status) {
          let imageData = [];
          for (let subEle of ele.media) {
            const imgData =
              // configData.COMMON_MEDIA_LINK_URL + "/status/" +
              subEle.link;
            imageData.push(imgData);
          }
          let value = {
            createdAt: ele.createdAt,
            is_active: ele.is_active,
            location: ele.location,
            media: imageData,
            updatedAt: ele.updatedAt,
            userId: ele.userId,
            viewers: ele.viewers,
            __v: ele.__v,
            _id: ele._id,
          };
          val.push(value);
        }
        value.setLists(val);
        value.setNoOfStatus(val.length);
        console.log("val.length", val.length);
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
    // }
  };
  console.log("value.length", value.noOfStatus);

  // -----------------------------Api get request for Avatar image-------------------------------------------
  const getCasesAvatar = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_GET_USER_PROFILE_URL,
      userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        // setResp(ApiRes.result);
        // setUserService(ApiRes.result);
        // console.log("PROFILE details", ApiRes);
        // setProfileRes(ApiRes.result);
        if (
          ApiRes.result &&
          ApiRes.result.avatar &&
          ApiRes.result.avatar.length > 0
        ) {
          setUserImg(ApiRes.result.avatar && ApiRes.result.avatar);
        }
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  // -----------------------------Api get request notification dot in profile section-------------------------------------------
  const getNotification = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_NOTIFICATION_GET_URL,
      userToken
    );
    // console.log("ApiRes",ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        // console.log('notification navProfile=>',ApiRes);
        // setResp(ApiRes.result);
        for (let ele of ApiRes.notification) {
          if (ele.viewsOrNot === false) {
            setNotification(true);
          }
        }
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  //-----------------------------service pinMenu----------------------------------
  const getCasesService = async () => {
    // if (userToken) {
    let ApiRes = await API_REQ_GET(configData.ADMIN_SERVICE_PIN_MENU_GET_URL);
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("THIS IS service listing menu result=>", ApiRes.result);
        // toast.success(ApiRes.message);
        setServicePin(ApiRes.result);
      } else {
        if (userToken) {
          toast.warning(ApiRes.message);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
    // }
  };
  useEffect(() => {
    // getCasesStatus();
    if (userToken) {
      getCasesAvatar();
      getNotification();
    }
    getCasesService();
    getLocation();
  }, []);
  useEffect(() => {
    getCasesStatus();
  }, [geoloc]);

  return (
    <div className="nav_mainContainer">
      <CheckOutSideClick onClickOutSide={closeInputFild}>
        <div
          className={`nav_sideBarMenu ${
            menuHem === true ? "nav_sideBarMenus" : undefined
          }`}
          ref={myRef}
          // onClick={handleClickInside}
        >
          {menuHem === true && <SideBarMobileView servicePin={servicePin} />}
        </div>
      </CheckOutSideClick>
      <nav className={`bg_ligreen HomeNav_Main_container_div`} style={style}>
        <div className="container d-flex p-1 HomeNavbar_Main_container_div">
          <div className="flex_c HomeNavbar_homescouts_logo_div ">
            {menuHem === true ? (
              <HiMenuAlt2
                className=" HomeNavbar_sideMenu"
                onClick={() => setMenuHem(!menuHem)}
              />
            ) : (
              <HiMenuAlt3
                className=" HomeNavbar_sideMenu"
                onClick={() => setMenuHem(!menuHem)}
              />
            )}

            <NavLink to="/">
              <img
                src={Homescouts}
                alt="homescouts img..."
                className="HomeNavbar_homescoutsImg"
              />
            </NavLink>
          </div>
          {/* -----------------------show and hide  status through ------------------------------------ */}
          <div className="flex_c HomeNavbar_status_container_div">
            {/* <MobileSearchBar /> */}

            <div>
              {showStatus && (
                <>
                  {slide === true ? (
                    <>
                      <div className="hiddenone ">
                        <Buysearch
                          setOpenVoice={setOpenVoice}
                          // transcript={transcript}
                          setText={setText}
                          text={text}
                        />
                      </div>
                      {/* <MobileSearchBar /> */}
                    </>
                  ) : (
                    <div className="HomeNavbar_status_show">
                      <HomeSlider
                        id="ststusbar"
                        lists={value.lists}
                        // setModalIsOpen={setModalIsOpen}
                        handleshowStatus={handleshowStatus}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <div>
              {userSearchProperty === true ? (
                <Usersearch
                  handleSearchButtons={handleSearchButton}
                  setDataTranscript={setDataTranscript}
                  dataTranscript={dataTranscript}
                  mobileSearch={true}
                  setLocationData={setLocationData}
                  placeholder={placeholder}
                  searchSelect={searchSelect}
                  Allocations={Allocations}
                  clearLocations={clearLocations}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="MobileSearchBar_search">
            {MobileViewSearch === true ? (
              <>
                <div className="HomeNav_serachMobile">
                  <input
                    type="search"
                    value={dataTranscript}
                    onChange={(e) => {
                      setDataTranscript(e.target.value);
                    }}
                    placeholder={placeholder}
                    className="Buysearch_input"
                    title={placeholder}
                  />
                  <MdSearch
                    className="HomeNav_serachMobileIcon"
                    onClick={() => handleSearchButton()}
                  />
                </div>
                {/* ) : null} */}
              </>
            ) : (
              // <MobileSearchBar
              //   // slide={true}
              //   handleSearchButton={handleSearchButton}
              //   setDataTranscript={setDataTranscript}
              //   dataTranscript={dataTranscript}
              //   // ScrollMobileSearchBar={true}
              // />
              ""
            )}
          </div>
          <div className="flex_c HomeNavbar_loginlogout_container_div">
            <div
              className="flex_c c_w "
              data-toggle="tooltip"
              data-placement="bottom"
              title="Post Proporty"
            >
              {postpropertyBtnVeiw ? (
                <PostPropertyButton></PostPropertyButton>
              ) : (
                false
              )}
            </div>
            <div className="flex_c c_w HomeNavbar_message_container_div">
              <div
                className="lds-dual-ring"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Add status"
              >
                <label htmlFor="statusImage">
                  {statusLoader === true ? (
                    <AiOutlinePlusCircle className="Nav-Loaders HomeNavbar_react_nev_icon" />
                  ) : (
                    <AiOutlinePlusCircle className="HomeNavbar_react_nev_icon" />
                  )}
                </label>
              </div>
              {statusLoader === false && (
                <input
                  type="file"
                  htmlFor="statusImage"
                  accept=".png, .jpg, .jpeg"
                  id="statusImage"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    getLocation();
                    handleAddStatusImage(e);
                  }}
                />
              )}
            </div>
            <div
              className="flex_c c_w HomeNavbar_message_container_div"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Service Provider"
            >
              <div className={nevMenu === true ? "selectnavMenu" : undefined}>
                <div>
                  <RiKeyboardBoxFill
                    className=" HomeNavbar_react_nev_icon "
                    onClick={() => setNavMenu(!nevMenu)}
                  />
                </div>
              </div>
            </div>
            <NavMenu nevMenu={nevMenu} handleServiceMenu={handleServiceMenu} />
            <div
              className="flex_c c_w HomeNavbar_message_container_div"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Chats"
            >
              <div>
                <div>
                  <NavLink to="/message">
                    <BiMessageDetail className="HomeNavbar_react_nev_icon" />
                  </NavLink>
                </div>
              </div>
            </div>
            <div
              className="HomeNavbar_profile_image"
              data-toggle="tooltip"
              data-placement="bottom"
              title="See Profile"
            >
              <div className="HomeNavbar_profileNotification">
                <img
                  src={userImg}
                  alt="user img..."
                  onClick={handleProfilePic}
                  className="HomeNavbar_profile_imageHover"
                />
                {notification === true && (
                  <RxDotFilled className="HomeNavbar_profile_RxDotFilled" />
                )}
              </div>

              <div className="HomeNavbar_profile_menu">
                <NavProfile />
              </div>
            </div>

            {/* {editprofile && <NavProfile />} */}
          </div>
        </div>
        {/*  -----------------------home dashbord scroll down to show Right sidebar status menu---------------------------------------- */}
        {showStatus && (
          <>
            {rightStatus === true && (
              <>
                {userToken && (
                  <div
                    title={
                      value.noOfStatus > 0
                        ? "Status "
                        : " No status available know"
                    }
                    className={` HomeNavbar_scroll_status_container_div ${
                      value.noOfStatus > 0 && "HomeNavbarStatus_containerDiv"
                    }`}
                  >
                    <img
                      src={view}
                      alt="image"
                      onClick={() =>
                        handleshowStatus(value.counter, value.counter)
                      }
                      htmlfor="ststusbar"
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
        {value.openStory === true && (
          <StatusStories
            data={value.lists}
            counter={value.counter}
            setCounter={value.setCounter}
            setOpenStory={value.setOpenStory}
          />
        )}
      </nav>
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

export default Nav;
