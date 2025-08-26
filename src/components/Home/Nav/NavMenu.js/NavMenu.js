import React, { useState } from "react";
import img from "../../../../assets/Logo.svg";
import "./NavMenu.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { API_REQ_GET } from "../../../../config/API";
import { ToastContainer, toast } from "react-toastify";
import configData from "../../../../config/config.json";
import {RiLogoutBoxRFill} from "react-icons/ri"


const NavMenu = ({ nevMenu, handleServiceMenu }) => {
  const [arr, setArr] = useState([]);
  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
    // console.log("pathname------------------------------------>", pathname);

  const getCases = async () => {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_PIN_MENU_GET_URL
      // userToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("THIS IS service listing menu result=>", ApiRes.result);
        // toast.success(ApiRes.message);
        setArr(ApiRes.result);
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
    getCases();
  }, []);
  return (
    <>
      {nevMenu === true && (
        <div className=" navmenu_main_container_div">
          <div className="navmenu_homsocute_div">
            <div className=" navmenu_image_div">
              <img
                src={img}
                alt="image ..."
                className="navmenu_homsocute_image"
              />
            </div>

            <div className="navmenu_container_div">
              {arr.map((List, index) => (
                <NavLink
                  to={`/Service?serviceName=${List.name}`}
                  className='navMenu_containers'
                >
                  <div
                    className="flex_c navmenu_app_container_div"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   handleServiceMenu(List && List.name);
                    // }}
                  >
                    <img
                      src={
                        // configData.COMMON_MEDIA_LINK_URL +
                        // "/serviceSettings/" +
                        List.serviceIcon
                      }
                      className="c_og  navmenu_MenuIcons"
                    />
                    <p className=" navmenu_menuPragraph">{List.name.charAt(0).toUpperCase()+List.name.slice(1)}</p>
                  </div>
                </NavLink>
              ))}
            </div>
            <hr className="navmenu_hr" />
            <div className=" navmenu_paragraph_div">
              <NavLink to="/Service-provider">
                <p className=" navmenu_paragraph">
                  Apply to be a service provider
                </p>
              </NavLink>
              <RiLogoutBoxRFill className="  navmenu_paralogo_div " />
            </div>
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
      )}
   
    </>
  );
};

export default NavMenu;
