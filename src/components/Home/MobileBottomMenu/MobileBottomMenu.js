import { useContext, useState } from "react";
import img1 from "../../../assets/services/Ellipse 31.png";
import img2 from "../../../assets/BottomMenu/Home.png";
import HomeClicked from "../../../assets/BottomMenu/Home_Clicked.png";
import postStatus from "../../../assets/BottomMenu/Post status.png";
import postResp from "../../../assets/BottomMenu/Post status _Clicked.png";
import view from "../../../assets/BottomMenu/View Status.png";
import viewStorys from "../../../assets/BottomMenu/View Status_Clicked.png";
import avatarimg from "../../../assets/services/avatar.png";
import userImg from "../../../assets/BottomMenu/User.png";
import userViewImg from "../../../assets/BottomMenu/User_Clicked.png";



import img3 from "./Group 2300.svg";
import { GrHomeRounded } from "react-icons/gr";
import { FiPlus } from "react-icons/fi";
import { IoIosHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import NavProfile from "../Nav/NavProfile/NavProfile";
import Storydata from "../Nav/StatusData";
import StoryStories from "../Nav/StatusStory/StatusStories";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from "../../../config/config.json";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import AuthContext from "../../../context/AuthProvider";
import StatusStories from "../Nav/StatusStory/StatusStories";
import { useEffect } from "react";

const MobileBottomMenu = ({ Highlight }) => {
  const [selectMenu, setSelectMenu] = useState('');
  const [data, setData] = useState(Storydata.statusData);
  const [avatar, setAvatar] = useState("");
  const [viewStory, setViewStory] = useState(false);
  const [home, setHome] = useState(false);
  const [postStorty, setPostStorty] = useState(false);
  const value = useContext(AuthContext);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =UserTokenAvilable &&
  UserTokenAvilable.response &&
  UserTokenAvilable.response.token
  // console.log("userToken------------------------------------>", userToken);

  // const handleStories = () => {
  //   setOpenStory(true);
  // };
  const handleSelectMenu = (e) => {
    setSelectMenu(e.target.id);
    setHome(true);
  };
  const handleshowStatus = (id, index) => {
    //-----show status in mobile view
    if (value.noOfStatus > 0) {
      value.setCounter(index);
      value.setOpenStory(true);
      setViewStory(true);
    }
  };
  const handleAddStatusImage = async (e) => {
    const file = e.target.files[0];
    console.log("file====>", file);

    const formData = new FormData();

    formData.append("files", file);

    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.USER_COMMON_SERVICE_POST_URL + "?step=status",
      formData,
      userToken
    );

    if (ResBasic) {
      if (ResBasic.length !== 0) {
        let medialinkData = {
          media: [
            {
              name: "mountain view1",
              link: ResBasic[0].filename,
            },
          ],
          location: "tollygunge",
        };

        let resServiceMaster = await API_REQ_POST_WITH_TOKEN(
          configData.USER_STATUS_UPDATE_DATA_POST_URL,
          medialinkData,
          userToken
        );
        // console.log(resServiceMaster);
        if (resServiceMaster) {
          if (resServiceMaster.success === true) {
            toast.success(resServiceMaster.message);
            console.log("image ready to display on screen");
            setPostStorty(true);
          } else {
            toast.warning(resServiceMaster.message);
          }
        } else {
          toast.error("Please Cheak Your Internet !");
        }
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };

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
        if (ApiRes.result&&ApiRes.result.avatar && ApiRes.result.avatar.length > 0) {
          setAvatar(ApiRes.result.avatar);
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
  useEffect(() => {
    if (userToken) {
      getCasesAvatar();
    }
  }, []);
  return (
    <div className="MobileBottomMenu_mainContainerDiv">
      <div className="MobileBottomMenu_ContainerDiv">
        <NavLink
          className="MobileBottomMenu_menuhome"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
          to="/"
        >
          <div
            id="1"
            onClick={(e) => handleSelectMenu(e)}
            className={`MobileBottomMenu_ImageHome_div ${
              selectMenu == "1" ? "selectMenus" : undefined
            }`}
          >
            <img
              src={Highlight === "home" ? HomeClicked : img2}
              alt="image..."
              id="1"
              onClick={(e) => handleSelectMenu(e)}
              className="MobileBottomMenu_ImageHome"
            />
          </div>
          <p> Home</p>
        </NavLink>
        <label
          htmlFor="PostStatus"
          className="MobileBottomMenu_menu"
          // id='2' onClick={(e)=>setSelectMenu(e.target.id)}
        >
          <div
            id="2"
            onClick={(e) => setSelectMenu(e.target.id)}
            className={`MobileBottomMenu_Icons ${
              selectMenu == "2" ? "selectMenus" : undefined
            }`}
          >
            <img
              src={postStorty === true ? postResp : postStatus}
              alt="image..."
              id="2"
              onClick={(e) => setSelectMenu(e.target.id)}
              className="MobileBottomMenu_ImageHome"
            />
          </div>
          {/* <FiPlus
            id="2"
            onClick={(e) => setSelectMenu(e.target.id)}
            className={`MobileBottomMenu_Icons ${
              selectMenu == "2" ? "selectMenus" : undefined
            }`}
          /> */}
          <p>Post status</p>
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          id="PostStatus"
          onChange={(e) => handleAddStatusImage(e)}
        />

        <NavLink to="/postProperty" className="MobileBottomMenu_menuHome">
          <div className="MobileBottomMenu_IconsHome">
            <img src={img3} alt="image..." />
          </div>
        </NavLink>
        <a
          className="MobileBottomMenu_menu"
          // onClick={() => handleshowStatus(defaultStatusId)}
          // onClick={handleStories}
          onClick={() => handleshowStatus(value.counter, value.counter)}
        >
          <div
            className={`MobileBottomMenu_Icons ${
              selectMenu == "3" ? "selectMenus" : undefined
            }`}
          >
            <img
              src={viewStory === true ? viewStorys : view}
              id="3"
              alt="image..."
              className="MobileBottomMenu_ImageHome"
            />
          </div>
          {/* <img
            src={view}
            alt="image..."
            id="3"
            // onClick={() => handleshowStatus(counter, counter)}
            className={selectMenu == "3" ? "selectMenus" : undefined}
          /> */}
          <p> View nearby status</p>
        </a>

        {value.openStory === true && (
          <StatusStories
            data={value.lists}
            counter={value.counter}
            setCounter={value.setCounter}
            setOpenStory={value.setOpenStory}
          />
        )}
        <a className="MobileBottomMenu_menu ">
          {!avatar ? (
            <div
              className={`MobileBottomMenu_Icons ${
                selectMenu == "4" ? "selectMenus" : undefined
              }`}
            >
              <img
                src={Highlight === 'profile' ? userViewImg : userImg}
                alt="image..."
                id="4"
                className="MobileBottomMenu_ImageHome"
              />
            </div>
          ) : (
            <img
              src={avatar}
              alt="image..."
              id="4"
              // profile
              onClick={(e) => handleSelectMenu(e)}
              className={selectMenu == "4" ? "selectMenus" : undefined}
            />
          )}
          <p> Profile</p>
          <div className="HomeNavbar_profile_menu">
            <NavProfile />
          </div>
        </a>
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
  );
};

export default MobileBottomMenu;
