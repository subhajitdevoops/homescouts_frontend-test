import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import './index.css';
import "./ResponsiveApp.css";
import Dashbord from "./components/Dashbord/Dashbord";
import Admin from "./components/admin/Admin";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/admin/Signup";
import Signin from "./components/admin/Signin";
import Contacttable from "./components/admin/Contacttable";
import ServiceMasterMain from "./components/admin/ServiceMasterMain";
import Property from "./components/admin/Property/Property";
import FurnishedMain from "./components/admin/Furnished/FurnishedMain";
import Signup1 from "./components/Loginpage/Signup";
import SignupIndividual from "./components/Loginpage/SignupIndividual";
import SignupBusiness from "./components/Loginpage/SignupBusiness";
import Login from "./components/Loginpage/Login";
import ResetPasswordMain from "./components/Loginpage/ResetPasswordMain";
import Home from "./components/Home/Home";
import UserMainpage from "./components/Userpage/UserMainpage";
import PostProperty from "./components/postProperty/PostProperty";
import UserChatFullScreen from "./components/Home/UserChat/UserChatFullScreen";
import MyAdsMain from "./components/Profile/MyAds/MyAdsMain";
import ProfileSettingMain from "./components/Profile/ProfileSettingPage/ProfileSettingMain";
import AccountChangeMain from "./components/Profile/AccountChange/AccountChangeMain";
import ServiceProviderMain from "./components/Profile/ServiceProvider/ServiceProviderMain";
import NotificationsMain from "./components/Profile/Notifications/NotificationsMain";
import PropertyMainPageDetails from "./components/PropertiePageDetails/PropertieMainPageDetails";
import UserMainOverview from "./components/admin/UserProfileVerify/UserMainOverview";
import UserDetailsMain from "./components/admin/UserDetails/UserDetailsMain";
import TotalUserDataTable from "./components/admin/TotalUserDataTable/TotalUserDataTable";
import LikePropertyMain from "./components/Profile/LikePropertys/LikePropertyMain";
import ReportMain from "./components/admin/Report/ReportMain";
import MyServiceMain from "./components/Profile/MyService/MyServiceMain";
import TiffinServiceMainPage from "./components/TiffinService/TiffinServiceMainPage";
import AdminChangePassword from "./components/Loginpage/adminLogin/AdminChangePassword";
import AdminLogin from "./components/Loginpage/adminLogin/AdminLogin";
import PostPropertyRequestMain from "./components/admin/PendingRequest/PostPropertyRequest/PostPropertyRequestMain";
import ServiceRequestMain from "./components/admin/PendingRequest/ServiceRequest/ServiceRequestMain";
import LikeServiceMain from "./components/Profile/LikeService/LikeServiceMain";
import TermAndCondition from "./components/Term&Condition/TermAndCondition";
import ScrollToTop from "./context/ScrollToTop";
import PrivacyPolicy from "./components/Term&Condition/PrivacyPolicy";
import Userchat from "./components/Home/UserChat/Userchat";
import AuthContext from "./context/AuthProvider";
import Page404 from "./404Page/Page404";
// import { NavLink, useNavigate } from "react-router-dom";

// https://ik.imagekit.io/ramcoder/path/to/myimage.jpg

// var socket = io.connect("http://localhost:9000/?type=anonymous");
function App() {
  const [adminTokens, setAdminToken] = useState(false);
  const [userTokens, setUserToken] = useState(false);
  const value = useContext(AuthContext);

  console.log("adminTokens====>", adminTokens);
  console.log("userTokens====>", userTokens);
  const adminTokenAvailable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const userTokenAvailable = JSON.parse(localStorage.getItem("accessToken"));
  const userToken =
    userTokenAvailable &&
    userTokenAvailable.response &&
    userTokenAvailable.response.token;

  const adminToken =
    adminTokenAvailable &&
    adminTokenAvailable.response &&
    adminTokenAvailable.response.token;

  console.log("adminToken==>", adminToken);
  console.log("userToken==>", userToken);

  useEffect(() => {
    if (
      adminTokenAvailable &&
      adminTokenAvailable.response &&
      adminTokenAvailable.response.token
    ) {
      setAdminToken(true);
    } else {
      setAdminToken(false);
    }

    if (
      userTokenAvailable &&
      userTokenAvailable.response &&
      userTokenAvailable.response.token
    ) {
      setUserToken(true);
    } else {
      setUserToken(false);
    }
  }, []);

  return (
    <div>
      <Router>
        {/* <ScrollToTop /> */}
        <Routes>
          {/* -------------------------------Admin --------------------------------- */}
          <Route path="/loginAdmin" element={<AdminLogin />} />
          <Route
            path="/admin-changepassword"
            element={
              adminToken ? (
                <AdminChangePassword />
              ) : (
                <Navigate to="/loginAdmin" />
              )
            }
          />
          <Route
            path="/admin"
            element={adminToken ? <Admin /> : <Navigate to="/loginAdmin" />}
          />
          <Route
            path="/contact-table"
            element={
              adminToken ? <Contacttable /> : <Navigate to="/loginAdmin" />
            }
          />
          <Route
            path="/property-type"
            element={adminToken ? <Property /> : <Navigate to="/loginAdmin" />}
          />
          <Route
            path="/service-master"
            element={
              adminToken ? <ServiceMasterMain /> : <Navigate to="/loginAdmin" />
            }
          />
          <Route
            path="/furnished-type"
            element={
              adminToken ? <FurnishedMain /> : <Navigate to="/loginAdmin" />
            }
          />
          <Route
            path="/user-overview"
            element={
              adminToken ? <UserMainOverview /> : <Navigate to="/loginAdmin" />
            }
          />
          <Route
            path="/Reports"
            element={
              adminToken ? <ReportMain /> : <Navigate to="/loginAdmin" />
            }
          />
          <Route
            path="/totaluser-data"
            element={
              adminToken ? (
                <TotalUserDataTable />
              ) : (
                <Navigate to="/loginAdmin" />
              )
            }
          />
          <Route
            path="/user-details"
            element={
              adminToken ? <UserDetailsMain /> : <Navigate to="/loginAdmin" />
            }
          />
          <Route
            path="/Property-Request"
            element={
              adminToken ? (
                <PostPropertyRequestMain />
              ) : (
                <Navigate to="/loginAdmin" />
              )
            }
          />
          <Route
            path="/service-Request"
            element={
              adminToken ? (
                <ServiceRequestMain />
              ) : (
                <Navigate to="/loginAdmin" />
              )
            }
          />

          {/* --------------------------User Without login -------------------------------------------*/}
          <Route path="/dashboard" element={<Dashbord />} />
          {/* <Route path="/admin-signin" element={<Signin />} /> */}
          {/* <Route path="/admin-signup" element={<Signup />} /> */}
          <Route path="/signup" element={<Signup1 />} />
          <Route path="/signup-individual" element={<SignupIndividual />} />
          <Route path="/signup-business" element={<SignupBusiness />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPasswordMain />} />
          <Route path="/" element={<Home />} />
          <Route path="/search/property" element={<UserMainpage />} />
          <Route
            path="/property-details"
            element={<PropertyMainPageDetails />}
          />
          <Route path="/term-condition" element={<TermAndCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* ---------------------User After Login -------------------------- */}
          <Route
            path="/postProperty"
            element={userToken ? <PostProperty /> : <Navigate to="/login" />}
          />
          <Route
            path="/message"
            element={
              userToken ? <UserChatFullScreen /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/Myads"
            element={userToken ? <MyAdsMain /> : <Navigate to="/login" />}
          />
          <Route
            path="/Profile-setting"
            element={
              userToken ? <ProfileSettingMain /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/Account-change"
            element={
              userToken ? <AccountChangeMain /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/Service-provider"
            element={
              userToken ? <ServiceProviderMain /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/Notifications"
            element={
              userToken ? <NotificationsMain /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/Like-Property"
            element={
              userToken ? <LikePropertyMain /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/MyService"
            element={userToken ? <MyServiceMain /> : <Navigate to="/login" />}
          />
          <Route
            path="/Service"
            element={
              userToken ? <TiffinServiceMainPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/Like-Service"
            element={userToken ? <LikeServiceMain /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
        {value.currentUserType == "user" && <Userchat />}
      </Router>
    </div>
  );
}

export default App;
