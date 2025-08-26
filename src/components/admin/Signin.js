import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Signin = () => {
  const url = "http://localhost:9000/admin/login";
  const [responseData, setResponseData] = useState({});
  const [adminLoginInfo, setAdminLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (responseData.success) {
      localStorage.setItem("adminInfo", JSON.stringify(responseData));
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 3000);
    }
  }, [responseData, navigate]);
  // ------------------------------------------------------
  const handleFormChange = (e) => {
    setAdminLoginInfo((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  };

  const formSubmission = (e) => {
    e.preventDefault();
    Axios.post(url, adminLoginInfo)
      .then((res) => {
        setResponseData(res.data); //<<---------
        if (res.data.success) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseonhover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseonhover: false,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseonhover: false,
          draggable: true,
          progress: undefined,
        });
      });
  };
  // ------------------------------------------------------------
  return (
    <div>
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
      <main className="page-center">
        <article className="sign-up">
          <h1 className="sign-up__title">Welcome back!</h1>
          <p className="sign-up__subtitle">
            Sign in to your account to continue
          </p>
          <form className="sign-up-form form" onSubmit={formSubmission}>
            <label className="form-label-wrapper">
              <p className="form-label">Email</p>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleFormChange}
                value={adminLoginInfo.email}
                required
              />
            </label>
            <label className="form-label-wrapper">
              <p className="form-label">Password</p>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleFormChange}
                value={adminLoginInfo.password}
                required
              />
            </label>
            <label className="form-checkbox-wrapper">
              <input className="form-checkbox" type="checkbox" />
              <span className="form-checkbox-label">Remember me next time</span>
            </label>
            <button
              type="submit"
              className="form-btn primary-default-btn transparent-btn"
            >
              Sign in
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Signin;
