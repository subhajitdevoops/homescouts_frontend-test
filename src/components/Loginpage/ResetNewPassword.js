import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import configData from "../../config/config.json";
import { API_REQ_POST, API_REQ_POST_WITH_TOKEN } from "../../config/API";
import { ToastContainer, toast } from "react-toastify";

const emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Password =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

const ResetNewPassword = ({ changenewpas, setChangenewpas,resId }) => {
  const [first, setFirst] = useState("");
  const [firstre, setFirstre] = useState("");
  // setChangenewpas(!changenewpas)
  const handleSetNewPassword = async() => {
    if (Password.test(first) && firstre === first) {
      const NewPasswordData = {
        password: first,
        confirmpassword: firstre,
        _id:resId._id
      };
      console.log(NewPasswordData);
      let resNewPassword =await API_REQ_POST(
        configData.SET_NEW_PASSWORD_URL,
        NewPasswordData
      );
      console.log(resNewPassword);

      if (resNewPassword.success===true) {
        toast.success(resNewPassword.message);
        console.log(resNewPassword.message);
        setChangenewpas(!changenewpas);
      } else {
        console.log(resNewPassword.message);
        toast.error(resNewPassword.message);
      }
    } else {
      toast.warning("Please check Your Password !");
    }
  };
  return (
    <>
      <div className="flex_c login_Prosonal_account_div">
        <div className="signupind_password_account_div">
          <label className="h3p c_br">
            New Password
            {first !== "" && !Password.test(first) ? (
              <span>
                {" "}
                (Should contain a lowercase, a special
                <br /> character, a number and min 10 digit 💪){" "}
              </span>
            ) : null}
          </label>
          <div className="flex_c signupind_password_div">
            <div
              className="my-3 flex_c signupind_Register_account_div resetpassword_enpassword_div"
              style={{ position: "relative",width:'100%' }}
            >
              <input
                type="password"
                value={first}
                require
                placeholder="Enter Password"
                onChange={(e) => setFirst(e.target.value)}
              />
              <span>
                {first !== "" && !Password.test(first) ? (
                  <AiFillCloseCircle className="h6 text-danger mx-2 mt-1 resetpassword_redcross" />
                ) : (
                  <AiFillCheckCircle className="h6 text-success mx-2 mt-1 resetpassword_redcross" />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="signupind_password_account_div">
          <label className="h3p c_br">
            Re-Enter password
            {firstre === first ? null : (
              <span>
                {" "}
                (Should match the above enter password ,<br /> Not matched 😔){" "}
              </span>
            )}
          </label>
          <div className="flex_c signupind_password_div">
            <div
              className="my-3 flex_c signupind_Register_account_div resetpassword_enpassword_div"
              style={{ position: "relative",width:'100%' }}
            >
              <input
                type="password"
                value={firstre}
                require
                placeholder="Enter Password"
                onChange={(e) => setFirstre(e.target.value)}
              />
              <span>
                {firstre === first ? (
                  <AiFillCheckCircle className="h6 text-success mx-2 mt-1 resetpassword_redcross" />
                ) : (
                  <AiFillCloseCircle className="h6 text-danger mx-2 mt-1 resetpassword_redcross" />
                )}
              </span>
            </div>
          </div>
        </div>
        {/* {!Password.test(first) && firstre ===first  ? (
          <button
            className="bg_blue c_w resetfillotp_verify_button "
            // onClick={() => setChangenewpas(!changenewpas)}
          >
            Update My Password
          </button>
        ) : ( */}
        <button
          className="bg_blue c_w resetfillotp_verify_button "
          onClick={() => handleSetNewPassword()}
        >
          Update My Password
        </button>
        {/* )} */}
      </div>
    </>
  );
};

export default ResetNewPassword;
