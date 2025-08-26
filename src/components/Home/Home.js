import React, { useState } from "react";
import Nav from "./Nav/Nav";
import "../../assets/admin/Home/Home.css";
import Homefram from "./Homefram/Homefram";
import Buysearch from "./Buysearch/Buysearch";
import Explor from "./Explore/Explor";
import Cities from "./Cities/Cities";
import Handpick from "./Handpick/Handpick";
import Footer from "./Footer/Footer";
import Dreamhome from "./Dreamhome/Dreamhome";
import "../../assets/admin/Home/Home.css";
import Userchat from "../Home/UserChat/Userchat";
import Speechtotaxt from "./Speechtotaxt";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import MobileBottomMenu from "./MobileBottomMenu/MobileBottomMenu";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Warning from "./Warning/Warning";

const Home = () => {
  // hide status bar from navbar while scrolling down
  const [slide, setSlider] = useState(true);
  const [buylable, setBuylable] = useState(false);
  const [rightStatus, setRightStatus] = useState(false);
  // const { transcript, resetTranscript } = useSpeechRecognition();
  const [openVoice, setOpenVoice] = useState(false);
  const [text, setText] = useState("");

  // const getToken = JSON.parse(localStorage.getItem("accessToken"));
  // const token=getToken && getToken
  // console.log("getToken>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",token)

  const changeStatus = () => {
    if (window.scrollY >= 100) {
      setSlider(false);
    } else {
      setSlider(true);
    }
  };
  window.addEventListener("scroll", changeStatus);
  const value = useContext(AuthContext);

  useEffect(() => {
    value.setProductId('');
    value.setSearchQuary('');
    value.setLocations('');
    value.setServiceLocation('');
    value.setServiceSearchQuary('');
    value.setCurrentUserType('user')
  }, []);

  return (
    <div className="bg_w ">
      {openVoice === true && <Speechtotaxt transcript={text} />}

      <Nav
        slide={slide}
        buylable={buylable}
        rightStatus={rightStatus}
        setOpenVoice={setOpenVoice}
        // transcript={transcript}
        postpropertyBtnVeiw={true}
        showStatus={true}
        userSearchProperty={false}
        // MobileViewSearch={true}
        setText={setText}
        text={text}
        setDataTranscript={""}
      />
      <Homefram />
      <Buysearch setOpenVoice={setOpenVoice} setText={setText} text={text} />

      <Explor />
      <Cities />
      {/* <Handpick /> phase2*/}
      {/* <Dreamhome /> phase2 */}
      <Warning />
      <Footer />
       {/* <Userchat /> */}  
      <MobileBottomMenu  Highlight='home' />
    </div>
  );
};

export default Home;
