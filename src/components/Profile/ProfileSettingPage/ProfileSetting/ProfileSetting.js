import React, { useRef, useState } from "react";
import ChangeEmail from "./ChangeEmail/ChangeEmail";
import "./ProfileSetting.css";
import img1 from "./Rectangle 107.svg";
import { RiPencilFill } from "react-icons/ri";
import { BsCameraFill } from "react-icons/bs";
import { MdOutlineCheck, MdVerifiedUser } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import img2 from "../../../../assets/services/Ellipse 31.png";
import avatar from "../../../../assets/services/avatar.png";
import ReUsableInput from "./ReUsableInput/ReUsableInput";
import { GoUnverified } from "react-icons/go";
import ChangePhone from "./ChangePhone/ChangePhone";
import ChangePassword from "./ChangePassword/ChangePassword";
import VerifyEmail from "./VerifyEmail/VerifyEmail";
import VerifyPhone from "./VerifyPhone/VerifyPhone";
import { useEffect } from "react";
import { toast } from "react-toastify";
import configData from "../../../../config/config.json";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import NewEmailSignin from "./ChangeEmail/NewEmailSignin";
import { imageKit } from "../../../../config/Helper";
import VerifyRera from "./ChangeRera/VerifyRera";
import { MdClose } from "react-icons/md";
import PPHS from "../../../postProperty/css/propertyPhoto.module.css";
import imgFile from "../../../../assets/services/file upload icon.svg";
import { PiEyeDuotone } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
const EmailPassPhoneEdit = ({
  Verify,
  handleVerify,
  handleEditOnclick,
  UserValue,
  Lable,
}) => {
  return (
    <div className="ReUsableInput_changeEmail">
      <div className="ReUsableInput_paragraph_div">
        <h6>{Lable}</h6>
      </div>
      <div className="EmailPassPhoneEdit_oldEmail_div">
        <p>{UserValue}</p>
        <RiPencilFill
          className="ReUsableInput_RiPencilFillicon"
          onClick={handleEditOnclick}
        />
      </div>
      <div className="ReUsableInput_error_div EmailPassPhoneEdit_error_div">
        {Verify === true ? (
          <MdVerifiedUser className="ReUsableInput_MdVerifiedUser" />
        ) : (
          <div onClick={handleVerify}>
            <GoUnverified className="ReUsableInput_GoUnverified" />
            <p className="ReUsableInput_ErrorVerifiedUser">Please Verify</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileSetting = () => {
  //--------verify email and phone
  const [profileRes, setProfileRes] = useState("");
  const [userImg, setUserImg] = useState(avatar);
  const [vriMail, setVriMail] = useState(false);
  const [vriPhone, setVriPhone] = useState(false);

  const [editName, setEditName] = useState(false);
  const [userName, setUserName] = useState("");
  const [reraNo, setReraNo] = useState("");
  const [loginWithNewMail, setLoginWithNewMail] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);

  const handleVerifyEmail = () => {
    setVriMail(true);
  };
  const handleVerifyPhone = () => {
    setVriPhone(true);
  };

  //---------------Edit Email,Phone , password
  const [editMail, setEditMail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [editRera, setEditRera] = useState(false);

  // =============================== user Access Token======================
  const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;
  // console.log("userToken------------------------------------>", userToken);

  const handleEditmail = () => {
    setEditMail(true);
  };
  const handleCancleEditmail = () => {
    setEditMail(false);
  };
  const handleEditPhone = () => {
    setEditPhone(true);
  };
  const handleCancleEditPhone = () => {
    setEditPhone(false);
  };
  const handleEditPass = () => {
    setEditPass(true);
  };
  const handleCancleEditPass = () => {
    setEditPass(false);
  };

  //------------Edit Rera no-------------------
  // const handleEditRera = async () => {
  //   setEditRera(false);

  //   let ResVerifyOtp = await API_REQ_POST_WITH_TOKEN(
  //     configData.USER_UPDATE_PROFILE_POST_URL,
  //     { rera_number: reraNo },
  //     userToken
  //   );
  //   console.log(ResVerifyOtp);

  //   if (ResVerifyOtp.success === true) {
  //     toast.success(ResVerifyOtp.message);
  //     setEditRera(false);
  //   } else {
  //     toast.warning(ResVerifyOtp.message);
  //   }
  // };
  // ----------edit profile Name--------------
  const handleEditName = async () => {
    let ResVerifyOtp = await API_REQ_POST_WITH_TOKEN(
      configData.USER_UPDATE_PROFILE_POST_URL,
      { name: userName },
      userToken
    );
    console.log(ResVerifyOtp);

    if (ResVerifyOtp.success === true) {
      toast.success(ResVerifyOtp.message);
      setEditName(false);
    } else {
      toast.warning(ResVerifyOtp.message);
    }
  };
  // ----------edit RERA file --------------

  const [fileName1, setFileName1] = useState("");
  const [fileName2, setFileName2] = useState("");

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFileChange1 = async (event) => {
    const selectedFile = event.target.files[0];
    let imagekitresponse = await imageKit(selectedFile);
    setFile1(imagekitresponse)
    // if (imagekitresponse) {
    //   let ResVerifyOtp = await API_REQ_POST_WITH_TOKEN(
    //     configData.USER_UPDATE_PROFILE_POST_URL,
    //     { avatar: imagekitresponse },
    //     userToken
    //   );
    //   console.log(ResVerifyOtp);
    //   if (ResVerifyOtp.success === true) {
    //     toast.success(ResVerifyOtp.message);
    //     setUserImg(imagekitresponse);
    //     setStatusLoader(false);
    //   } else {
    //     toast.warning(ResVerifyOtp.message);
    //   }
    // }

    // setFile1(selectedFile);
    setFileName1(selectedFile ? selectedFile.name : "");
  };

  const handleFileChange2 = async (event) => {
    const selectedFile = event.target.files[0];
    let imagekitresponse = await imageKit(selectedFile);
    setFile2(imagekitresponse)

    // if (imagekitresponse) {
    //   let ResVerifyOtp = await API_REQ_POST_WITH_TOKEN(
    //     configData.USER_UPDATE_PROFILE_POST_URL,
    //     { avatar: imagekitresponse },
    //     userToken
    //   );
    //   console.log(ResVerifyOtp);

    //   if (ResVerifyOtp.success === true) {
    //     toast.success(ResVerifyOtp.message);
    //     setUserImg(imagekitresponse);
    //     setStatusLoader(false);
    //   } else {
    //     toast.warning(ResVerifyOtp.message);
    //   }
    // }
    // setFile2(selectedFile);
    setFileName2(selectedFile ? selectedFile.name : "");
  };

  // RERA edit and file upload
  const handleEditRera = async () => {
    setEditRera(false);

    // const formData = new FormData();
    // formData.append("rera_number", reraNo);
    // if (file1) formData.append("file1", file1);
    // if (file2) formData.append("file2", file2);

    let ResVerifyOtp = await API_REQ_POST_WITH_TOKEN(
      configData.USER_UPDATE_PROFILE_POST_URL,
      // formData,
      { rera_number: reraNo ,
       rera_certificate: file1 ,
      rera_competency_certificate : file2},
      userToken
    );

    if (ResVerifyOtp.success === true) {
      toast.success(ResVerifyOtp.message);
      setEditRera(false);
    } else {
      toast.warning(ResVerifyOtp.message);
    }
    setFile1(null)
    setFile2(null)
    setFileName1("")
    setFileName2("")
  };


  const handleRemoveFile1 = () => {
    setFileName1("");
    document.getElementById("fileInput1").value = ""; // Clear input field
  };
  const handleRemoveFile2 = () => {
    setFileName2("");
    document.getElementById("fileInput2").value = ""; // Clear input field
  };


  // ------------------Upload profile images--------------------

  const handleSelectImage = async (e) => {
    const val = e.target.files[0];
    if (val) {
      setStatusLoader(true);
    }
    // --------------------------imagekit profile image-------
    const folderPath = "Profile";
    let imagekitresponse = await imageKit(val, folderPath);
    if (imagekitresponse) {
      let ResVerifyOtp = await API_REQ_POST_WITH_TOKEN(
        configData.USER_UPDATE_PROFILE_POST_URL,
        { avatar: imagekitresponse },
        userToken
      );
      console.log(ResVerifyOtp);

      if (ResVerifyOtp.success === true) {
        toast.success(ResVerifyOtp.message);
        setUserImg(imagekitresponse);
        setStatusLoader(false);
      } else {
        toast.warning(ResVerifyOtp.message);
      }
    }
  };

  // -------Api get request-----------

  const getProfileDetails = async () => {
    let ApiRes = await API_REQ_GET(
      configData.USER_GET_USER_PROFILE_URL,
      userToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        // setResp(ApiRes.result);
        // setUserService(ApiRes.result);
        console.log("PROFILE details", ApiRes);
        if (ApiRes.result) {
          setProfileRes(ApiRes.result);
        }
        if (ApiRes.result && ApiRes.result.avatar) {
          setUserImg(ApiRes.result.avatar);
        }
        if (ApiRes.result && ApiRes.result.name) {
          setUserName(ApiRes.result.name);
        }
        if (ApiRes.result?.rera_number) {
          setReraNo(ApiRes.result.rera_number);
        }
        if (ApiRes.result?.rera_certificate) {
          const reraCertificateUrl = ApiRes.result.rera_certificate;
          const extractedValue = reraCertificateUrl.replace("https://ik.imagekit.io/homescouts/", "");
          setFileName1(extractedValue);
        }
        if (ApiRes.result?.rera_competency_certificate) {
          const reraCertificateUrl = ApiRes.result.rera_competency_certificate;
          const extractedValue = reraCertificateUrl.replace("https://ik.imagekit.io/homescouts/", "");
          setFileName2(extractedValue);
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
    getProfileDetails();
  }, []);

  return (
    <div className="ProfileSetting_main_container_div">
      <div className="ProfileSetting_headdingImage">
        <img src={img1} alt="image..." />

        <div className="ProfileSetting_changeProfileImage">
          <div className="ProfileSetting_ProfileImage">
            {statusLoader == true && (
              <div className="Nav-Loaders LoadersDiv"></div>
            )}
            <img src={userImg && userImg} placeholder="profile Image..." />
            <label htmlFor="profileimg">
              <BsCameraFill className="ProfileSetting_BsCameraFill" />
            </label>
            <input
              type="file"
              id="profileimg"
              style={{ display: "none" }}
              onChange={(e) => handleSelectImage(e)}
            />
          </div>
          <div className="ProfileSetting_ProfileUserName">
            {editName === true ? (
              <div
                style={{ backgroundColor: "#fff" }}
                className="ProfileSettingt_EditUserName_div"
              >
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  style={{ backgroundColor: "#fff" }}
                />
                <MdOutlineCheck
                  className="ProfileSetting_RiPencilFillicon"
                  onClick={handleEditName}
                />
              </div>
            ) : (
              <div className="ProfileSettingt_EditUserName_div">
                <input
                  type="text"
                  value={userName}
                  //   onChange={handleInput}
                  required
                  readOnly
                />
                <RiPencilFill
                  className="ProfileSetting_RiPencilFillicon"
                  onClick={() => setEditName(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="ProfileSetting_changeEmailPassword">
        <EmailPassPhoneEdit
          handleVerify={handleVerifyEmail}
          handleEditOnclick={handleEditmail}
          Lable="Email"
          UserValue={profileRes.email}
          Verify={true}
        />
        <EmailPassPhoneEdit
          handleVerify={handleVerifyPhone}
          handleEditOnclick={handleEditPhone}
          Lable="Phone"
          UserValue={profileRes.mobilenumber && profileRes.mobilenumber}
          Verify={profileRes.mobilenumber && true}
        />
        <div className="ReUsableInput_changeEmail">
          <div className="ReUsableInput_paragraph_div">
            <h6>Password</h6>
          </div>
          <div className="EmailPassPhoneEdit_oldEmail_div">
            <p style={{ margin: "0px 0px -6px 0px" }}>**********</p>
            <RiPencilFill
              className="ReUsableInput_RiPencilFillicon"
              onClick={handleEditPass}
            />
          </div>
          <div className="ReUsableInput_error_div EmailPassPhoneEdit_error_div"></div>
        </div>



        {profileRes.user_type !== "individual" && (
          <div className="ReUsableInput_changeEmail" style={{ "marginTop": "2px", "marginBottom": "3px" }} >
            <div className="ReUsableInput_paragraph_div">
              <h6>Your RERA no.</h6>
            </div>
            <div className="EmailPassPhoneEdit_oldEmail_div" >
              {editRera ? (
                <div
                  style={{ backgroundColor: "#f0f2fa" }}
                  className="ProfileSettingt_EditUserName_div"
                >
                  <input
                    type="text"
                    value={reraNo}
                    onChange={(e) => setReraNo(e.target.value)}
                    required
                    style={{ backgroundColor: "#f0f2fa" }}
                    className="EditRERA"
                  />

                </div>
              ) : (
                <div className="ProfileSettingt_EditUserName_div">
                  <input
                    type="text"
                    value={reraNo}
                    readOnly
                    style={{ backgroundColor: "#fff" }}
                    className="EditRERA"
                  />
                  <RiPencilFill
                    className="ProfileSetting_RiPencilFillicon"
                    onClick={() => setEditRera(true)}
                  />
                </div>
              )}
            </div>
            <div className="ReUsableInput_error_div EmailPassPhoneEdit_error_div"></div>
          </div>

        )}


        {profileRes.user_type !== "individual" && (
          <>
            <div className="AttachDoc_mainContainer_div" style={{ marginBottom: "10px" }}>
              {/* RERA Certificate Input */}
              <div className="AttachDoc_name">
                <h6 style={{ "fontWeight": "bolder", "fontSize": "15px" }}>
                  Rera Certificate
                </h6>
              </div>
              <div className="file-input-box" style={{ position: "relative", }}>
                <label
                  htmlFor="fileInput1" // Unique ID for the first input
                  style={{
                    // display: "block",
                    // padding: "10px",
                    // backgroundColor: "#03a3d3",
                    // color: fileName1 ? "#ffff" : "#ffff",
                    // border: "1px solid #c7d2fe",
                    // borderRadius: "5px",
                    // cursor: "pointer",
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "space-between",
                    // "width": "300px",
                    width: "420px",
                    backgroundColor: "#ffffff",
                    border: "2px dashed #ed6823",
                    borderRadius: "10px",
                    padding: "10px 30px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "7%",
                    cursor: "pointer",
                    color: "gray",
                    "marginRight": "180px"
                  }}
                >
                  <img
                    src={imgFile}
                    alt="file..."
                    className="AttachDoc_PDFIcon"
                  />
                  {fileName1 || "doc should be less then 10 mb"}
                </label>
                <input
                  type="file"
                  id="fileInput1" // Unique ID for the first input
                  onChange={(e) => handleFileChange1(e)}
                  style={{ display: "none" }} // Hide the actual file input
                />
                {fileName1 && (
                  <button
                    type="button"
                    onClick={handleRemoveFile1}
                    style={{
                      position: "absolute",
                      top: "0", // Adjust as needed
                      right: "150px", // Position to the right of the input box
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "red",
                    }}
                  >
                    <MdClose size={20} />
                  </button>
                )}
              </div>
            </div>


            <div className="AttachDoc_mainContainer_div">

              <div className="AttachDoc_name">
                <h6>
                  RERA Competency Certificate
                </h6>
              </div>
              <div className="file-input-box" style={{ position: "relative", marginBottom: "10px" }}>
                <label
                  htmlFor="fileInput2" // Unique ID for the second input
                  style={{
                    width: "420px",
                    backgroundColor: "#ffffff",
                    border: "2px dashed #ed6823",
                    borderRadius: "10px",
                    padding: "10px 30px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "7%",
                    cursor: "pointer",
                    color: "gray",
                    "marginRight": "180px"
                  }}
                >
                  <img
                    src={imgFile}
                    alt="file..."
                    className="AttachDoc_PDFIcon"
                  />
                  {fileName2 || "doc should be less then 10 mb"}
                </label>
                <input
                  type="file"
                  id="fileInput2" // Unique ID for the second input
                  onChange={(e) => handleFileChange2(e)}
                  style={{ display: "none" }} // Hide the actual file input
                />
                {fileName2 && (
                  <button
                    type="button"
                    onClick={handleRemoveFile2}
                    style={{
                      position: "absolute",
                      top: "0", // Adjust as needed
                      right: "150px", // Position to the right of the input box
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "red",
                    }}
                  >
                    <MdClose size={20} />
                  </button>
                )}
              </div>
            </div>
          </>

        )}
      </div>

      {
        profileRes.user_type !== "individual" && (<div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', "marginBottom": "100px" }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={handleEditRera}
          >
            Submit for an approval
            <FaCheckCircle style={{ color: '#4CAF50' }}
            />
          </button>
        </div>
        )
      }


      {/* new design  */}


      {/*  */}

      {
        editMail === true && (
          <ChangeEmail
            handleCancleEditmail={handleCancleEditmail}
            oldEmail={profileRes && profileRes.email}
            setEditMail={setEditMail}
            setLoginWithNewMail={setLoginWithNewMail}
            getProfileDetails={getProfileDetails}
          />
        )
      }
      {
        editPhone === true && (
          <ChangePhone
            handleCancleEditPhone={handleCancleEditPhone}
            oldPhone={profileRes.mobilenumber && profileRes.mobilenumber}
            setEditPhone={setEditPhone}
            getProfileDetails={getProfileDetails}
          />
        )
      }
      {
        editPass === true && (
          <ChangePassword
            handleCancleEditPass={handleCancleEditPass}
            // Email={profileRes && profileRes.email}
            setEditPass={setEditPass}
          />
        )
      }
      {/* {editRera === true && (
        <VerifyRera
          handleCancleEditRera={handleCancleEditRera}
          oldRera={""}
          setEditRera={setEditRera}
          getProfileDetails={getProfileDetails}
        />
      )} */}
      {/* {vriMail === true && (
        <VerifyEmail handleCancle={handleCanclVerifyEmail} />
      )}
      {vriPhone === true && (
        <VerifyPhone handleCancle={handleCanclVerifyPhone} />
      )} */}
      {loginWithNewMail === true && <NewEmailSignin />}
    </div >
  );
};

export default ProfileSetting;
{
  /* <ChangeEmail /> */
}
