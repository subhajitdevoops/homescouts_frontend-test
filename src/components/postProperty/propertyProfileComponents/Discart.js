import React from "react";
import "../css/Discart.css";
import img1 from "../person.svg";
import img2 from "../Vector (3).svg";
import { FaLongArrowAltRight } from "react-icons/fa";

const Discart = ({handleDiscart,handleContinue}) => {
  return (
    <div className="DiscartMainContainerDiv">
      <div className="DiscartMainContainer">
        <div className="sw Discart_Tittle">
          <p>We knew you will be back</p>
          <img src={img1} alts="person..." />
        </div>
        <div className="Discart_Message">
          <p>
            Continue where you have left your property listing
            <br /> <br /> to discard or restart with another entry click discard
          </p>
        </div>
        <div className="sw Discart_button">
          <div className="Discart_discart"
          onClick={()=>handleDiscart()}>
            <div>
              <img src={img2} alts="person..." />
            </div>
            <p>Discard</p>
          </div>
          <div className="Discart_continue"
          onClick={()=>handleContinue()}>
            <FaLongArrowAltRight className="FaLongArrowAltRights" />
            <p>Continue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discart;
