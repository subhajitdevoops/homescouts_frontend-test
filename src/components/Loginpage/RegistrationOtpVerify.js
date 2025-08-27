import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/Logo.svg"; // Adjust path if needed
import "../../assets/signup/Signup.css";
import { API_REQ_POST } from "../../config/API";
import configData from "../../config/config.json";

const OTP_LENGTH = 6;

const RegistrationOtpVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [counter, setCounter] = useState(40);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // Handle OTP input
  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    let newOtp = [...otp];
    newOtp[idx] = value[0];
    setOtp(newOtp);
    // Move to next input
    if (idx < OTP_LENGTH - 1 && value) {
      inputRefs.current[idx + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      let newOtp = [...otp];
      newOtp[idx - 1] = "";
      setOtp(newOtp);
      inputRefs.current[idx - 1].focus();
    }
  };

  // Submit OTP
  const handleRegisterAccount = async () => {
    const verifyOtp = otp.join("");
    if (verifyOtp.length !== OTP_LENGTH) {
      toast.warning("Please enter the full OTP.");
      return;
    }
    setLoading(true);
    const invidual_data_otp = {
      otp: verifyOtp,
      email: email,
    };
    let ResInvidualOtp = await API_REQ_POST(
      configData.REGISTRATION_INDIVIDUAL_OTP_URL,
      invidual_data_otp
    );
    setLoading(false);
    if (ResInvidualOtp) {
      if (ResInvidualOtp.success === true) {
        toast.success(ResInvidualOtp.message);
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      } else {
        toast.warning(ResInvidualOtp.message);
      }
    } else {
      toast.error("Something went wrong! Please check your internet.");
    }
  };

  // Resend OTP
  const handleResetTime = async () => {
    if (counter === 0) {
      setCounter(40);
      try {
        const resendData = { email };
        const resendResponse = await API_REQ_POST(
          configData.RESEND_OTP_URL || configData.REGISTRATION_INDIVIDUAL_OTP_RESEND_URL,
          resendData
        );
        if (resendResponse && resendResponse.success) {
          toast.success(resendResponse.message || "OTP resent successfully");
        } else {
          toast.warning(resendResponse?.message || "Failed to resend OTP");
        }
      } catch (err) {
        toast.error("Error resending OTP");
      }
    }
  };

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => setCounter((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [counter]);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6fd" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex_c" style={{ minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: 400,
            width: "100%",
            margin: "auto",
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="Logo" style={{ width: 90, marginBottom: 18 }} />
          <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 8, color: "#222" }}>
            Verify <span style={{ color: "#ff9800" }}>OTP</span>
          </h2>
          <div style={{ marginBottom: 18, fontSize: 15, color: "#333", textAlign: "center" }}>
            Enter the 6-digit code sent to <b>{email}</b>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => (inputRefs.current[idx] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                className="input_box"
                style={{
                  width: 40,
                  height: 48,
                  fontSize: 22,
                  textAlign: "center",
                  borderRadius: 8,
                  border: "1px solid #e0e0e0",
                  outline: "none",
                  background: "#f9f9f9",
                }}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
            <button
              className="btn btn-primary"
              style={{
                minWidth: 110,
                marginRight: 12,
                background: counter === 0 ? "#ff9800" : "#e0e0e0",
                color: counter === 0 ? "#fff" : "#888",
                cursor: counter === 0 ? "pointer" : "not-allowed",
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 15,
                padding: "8px 0",
                transition: "background 0.2s",
              }}
              disabled={counter !== 0}
              onClick={handleResetTime}
            >
              Resend OTP
            </button>
            <span style={{ fontSize: 15, color: "#666" }}>
              {counter > 0
                ? `00:${counter < 10 ? `0${counter}` : counter}`
                : "00:00"}
            </span>
          </div>
          <button
            className="btn btn-primary"
            style={{
              width: "100%",
              background: "#0066ff",
              color: "#fff",
              fontWeight: 700,
              fontSize: 17,
              borderRadius: 8,
              padding: "12px 0",
              marginBottom: 10,
              border: "none",
              transition: "background 0.2s",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={handleRegisterAccount}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 18, textAlign: "center" }}>
            Didn’t get the code? Check your spam folder.<br />
            We respect your privacy and won’t spam.
          </div>
          <button
            className="btn"
            style={{
              width: "100%",
              background: "#fff",
              color: "#0066ff",
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 8,
              padding: "10px 0",
              border: "1px solid #0066ff",
              transition: "background 0.2s",
              marginBottom: 0,
            }}
            onClick={() => navigate(-1)}
          >
            &#8592; Back to edit details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationOtpVerify;
