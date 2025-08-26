import React from "react";
import img1 from "../img7.svg";
import img2 from "../img1.svg";
// import img3 from "../img2.svg";
// import img4 from "../img3.svg";
// import img5 from "../img4.png";
// import img6 from "../img5.png";
// import img7 from "../img8.svg";
// import DataTable from "../../TotalUserDataTable/DataTable";
import { NavLink } from "react-router-dom";
import configData from "../../../../config/config.json";

const TotalUserbox = ({
  Tittle,
  img1,
  img2,
  userNumOne,
  userNumTwo,
  subTittleone,
  subTittletwo,
  Tittletwo,
}) => {
  return (
    <div className="TotalUserbox_main_container_div">
      <div className="TotalUserbox_Tittle">
        <p className="c_t">{Tittle}</p>
        <p className="c_t">{Tittletwo}</p>
      </div>

      <div className="TotalUserbox_PersonalBusiness">
        <div className="TotalUserbox_Personal">
          <div>{img1 && <img src={img1} alt="iconImage..." />}</div>

          <h3>{userNumOne}</h3>
          <p>{subTittleone}</p>
        </div>
        <div className="TotalUserbox_Business">
          <img src={img2} alt="iconImage..." />
          <h3>{userNumTwo}</h3>
          <p>{subTittletwo}</p>
        </div>
      </div>
    </div>
  );
};

const TotalUser = ({ totalData }) => {
  return (
    <div className="TotleUser_main_container_div">
      <div className="TotleUser_container_div">
        <h6>User Insight</h6>
        <div className="TotleUser_userType">
          <NavLink to="/totaluser-data">
            <TotalUserbox
              Tittle="Total Users"
              img1={img1}
              img2={img2}
              userNumOne={totalData && totalData.personalUsers}
              userNumTwo={totalData && totalData.businessUsers}
              subTittleone="Personal"
              subTittletwo="Business"
            />
          </NavLink>
          {/* <a>
          <TotalUserbox
            Tittle="User Approval"
            img1={img3}
            img2={img4}
            userNumOne={totalData&&totalData.businessUsers}
            userNumTwo={totalData&&totalData.businessUsers}
            subTittleone="Pending"
            subTittletwo="Approved"
          />
          </a> */}
        </div>
      </div>
      <div className="TotleUser_container_div">
        <h6>ADS on platform</h6>
        <div className="TotleUser_userType">
          <a>
            <TotalUserbox
              Tittle="Total Ads On Platform"
              img1={img1}
              img2={img2}
              userNumOne={totalData && totalData.businessProperties}
              userNumTwo={totalData && totalData.personalProperties}
              subTittleone="Personal"
              subTittletwo="Business"
            />
          </a>
          <a>
            <TotalUserbox
              Tittle="Featured Ads"
              img1={img1}
              img2={img2}
              userNumOne={
                totalData &&
                totalData.feactureproperty &&
                totalData.feactureproperty[0]
              }
              userNumTwo={
                totalData &&
                totalData.feactureproperty &&
                totalData.feactureproperty[1]
              }
              subTittleone="Personal"
              subTittletwo="Business"
            />
          </a>
        </div>
      </div>
      <div className="TotleUser_container_div">
        <h6>Service Providers</h6>
        <div className="TotleUser_userType">
          {totalData &&
            totalData.serviceCounts&&
            totalData.serviceCounts.map((ele, index) => (
              <a>
                <TotalUserbox
                  Tittletwo={ele._id}
                  img2={
                    ele &&
                    // configData.COMMON_MEDIA_LINK_URL +
                    //   "/serviceSettings/" +
                      ele.serviceSettings[0]
                  }
                  userNumOne={ele.count}
                  subTittleone="Total service providers"
                />
              </a>
            ))}
          {/* <a>
            <TotalUserbox
              Tittletwo="Home Tiffin"
              img2={img5}
              userNumOne="2,75,000"
              subTittleone="Total service providers"
            />
          </a>
          <a>
            <TotalUserbox
              Tittletwo="Furniture"
              img2={img6}
              userNumOne="27,500"
              subTittleone="Total service providers"
            />
          </a> */}
          {/* <DataTable /> */}
        </div>
      </div>
    </div>
  );
};

export default TotalUser;
