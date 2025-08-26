import React from "react";
import { NavLink } from "react-router-dom";

const NewEmailSignin = () => {
  return (
    <div className="ChangeEmail_main_container_div">
      <div className="ChangeEmail_container_div">
        <div className="flex_c ChangeEmail_tittle_div">
          <h2 style={{color:'#1aa217',fontWeight:600}}>Congratulations!</h2>
        </div>
        <hr />
        <div className="ChangeEmail_Email_div">
          <h6 style={{color:'#5c6369',fontSize:'0.9rem'}}>
            You Have successfully changed Your Email ! please Login with your
            New Email.
          </h6>
          <NavLink to='/login'>
            <button className="NewEmailSignin_button">Login &rarr;</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NewEmailSignin;
