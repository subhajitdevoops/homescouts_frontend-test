import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { MdChromeReaderMode, MdOutlineChromeReaderMode } from "react-icons/md";
import Avatar from "../../../../assets/services/avatar.png";

const Reports = ({ list, setReportDetails }) => {
  return (
    <div className="UserTable_maincontainerDiv">
      <div className="UserTable_trow">
        <div>{list.ReportId} </div>
        <div className="UserTable_UserNameDiv UserTable_UserNameDivs">
          <img
            src={list.InitiatorImg ? list.InitiatorImg : Avatar}
            alt="image ..."
          />
          <p>{list.InitiatorName}</p>
        </div>
        <div className="UserTable_UserNameDiv UserTable_UserNameDivs">
          <img
            src={list.AgainstImg ? list.AgainstImg : Avatar}
            alt="image ..."
          />
          <p>{list.AgainstName}</p>
        </div>
        <div> {list.RaisedDate} </div>
        <div>
          <AiFillEye
            className="h3 cursor"
            onClick={() => setReportDetails(true)}
          />
        </div>
        <div className="UserTable_UserNameDiv UserTable_UserNameDivs">
          <img
            src={list.InitiatorImg?list.InitiatorImg:Avatar}
            alt="image ..."
            className="Report_Statusimg"
          />
          <p className="Report_Status">{list.Status}</p>
        </div>
        <div className="UserTable_readUnread">
          {list.Read === true ? (
            <MdOutlineChromeReaderMode className="h3 reportRead cursor" />
          ) : (
            <MdChromeReaderMode className="h3 cursor" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
