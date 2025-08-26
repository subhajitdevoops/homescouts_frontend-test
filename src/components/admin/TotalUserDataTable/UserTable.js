import React from "react";
import img1 from "../../../assets/services/Ellipse 31 (1).png";
import img2 from "../../../assets/services/Ellipse 31.png";
import { NavLink } from "react-router-dom"; 
import Avatar from '../../../assets/services/avatar.png'




const UserTable = ({ list }) => {
  const arr=list.Service.slice(0, 3);
  return (
  <div  className="UserTable_maincontainerDiv">
    <NavLink
     to='/user-overview' 
     className="UserTable_trow"
    >
      <div className="UserTable_UserNameDiv">
        <img src={list.userImg} alt="image ..." />
        <p>{list.name}</p>
      </div>
      <div>{list.email} </div>
      <div> {list.phone} </div>
      <div> {list.AdsPost} </div>
      <div className="UserTable_imageList">
        <div className="UserTable_imageLi">
          <div class="avatar-group">
            {arr.map((img, index) => (
              <div key={index} class="avatar">
                <img src={img} />
              </div>
            ))}
            {list.Service.length > 3 && <div class="hidden-avatars">+{list.Service.length-3}</div>}
          </div>
        </div>
      </div>
      <div> <span className={`c_t UserTable_AccountType ${list.AccountType==='business'? 'buss': undefined}`}>{list.AccountType}</span>  </div>
   
    </NavLink>
    <div className="UserTable_maintooglediv">
        <div className="form-check form-switch  UserTable_toggleSwitch">
          <label
            className="form-check-label form-check-label-color:red sw"
            htmfor="flexSwitchCheckDefault"
          >
            <input
              className="form-check-input  sw  "
              type="checkbox"
              id="flexSwitchCheckDefault"
              
              // checked={list.Active}
              // onClick={() => setDe_active(!de_active)}
            />
          </label>
           {/* <label className="switch sw">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label> */}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
