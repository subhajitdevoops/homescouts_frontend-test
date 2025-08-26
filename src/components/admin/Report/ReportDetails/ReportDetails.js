import React, { useState } from "react";
import "./ReportDetails.css";
import { MessageBox } from "react-chat-elements";
import { MdClose } from "react-icons/md";
import { API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import { toast } from "react-toastify";
import configData from "../../../../config/config.json";

const ReportDetails = ({ setReportDetails, chatId, setDataList, dataList }) => {
  const [select, setSelect] = useState(
    chatId.adminAction === "pending" ? "" : chatId.adminAction
  );

  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken =
    adminTokenAvilable &&
    adminTokenAvilable.response &&
    // adminTokenAvilable.response.token &&
    adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);

  const handleselectSuspend = async (suspent, reportid) => {
    const reportData = {
      _id: reportid,
      adminAction: suspent,
      // adminComment: "dont use that",
    };
    console.log("reportData===>", reportData);
    let ResBasic = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_STATUS_CHANGE_REPORT_URL,
      reportData,
      adminToken
    );

    if (ResBasic) {
      if (ResBasic.success === true) {
        toast.success(ResBasic.message);
        setSelect(suspent);
        const AllData = [...dataList];
        AllData.forEach((ele, indx) => {
          if (ele._id === chatId._id) {
            AllData[indx].adminAction = suspent;
          }
        });
      } else {
        toast.warning(ResBasic.message);
      }
    } else {
      toast.error("Please Check Your Internet !");
    }
  };
  return (
    <div className="ReportDetails_mainOuterDiv">
      <div className="ReportDetails_maindivCon">
        <MdClose
          className="ReportDetails_MdClose"
          onClick={() => setReportDetails(false)}
        />
        <div className="ReportDetails_messageBox">
          {chatId &&
            chatId.conversation.map((msg, index) => (
              <MessageBox
                position={chatId.personId === msg.user_id ? "left" : "right"}
                type={"text"}
                title={
                  chatId.personId === msg.user_id
                    ? chatId.againstId.name
                    : chatId.reportedUser.name
                }
                text={msg.message}
              />
            ))}
        </div>
        {/* <div className="ReportDetails_messageStatus">
          <div
            className="UserTable_UserNameDiv UserTable_UserNameDivs ReportDetails_userTable"
            onClick={(e) =>
              handleselectSuspend("Suspend permanently", chatId._id)
            }
          >
            <img
              src="https://pbs.twimg.com/profile_images/1185852580980674561/Qv-lCmbz_400x400.jpg"
              alt="image ..."
              className="Report_Statusimg"
            />
            <p
              className={`Report_Status ${
                select == "Suspend permanently"
                  ? "selectRepoetStatus"
                  : undefined
              }`}
            >
              Suspend permanently
            </p>
          </div>
          <div
            className="UserTable_UserNameDiv UserTable_UserNameDivs ReportDetails_userTable"
            onClick={(e) =>
              handleselectSuspend("Suspend for 30 Days", chatId._id)
            }
          >
            <img
              src="https://pbs.twimg.com/profile_images/1185852580980674561/Qv-lCmbz_400x400.jpg"
              alt="image ..."
              className="Report_Statusimg"
            />
            <p
              className={`Report_Status ${
                select == "Suspend for 30 Days"
                  ? "selectRepoetStatus"
                  : undefined
              }`}
            >
              Suspend for 30 Days
            </p>
          </div>
          <div
            className="UserTable_UserNameDiv UserTable_UserNameDivs ReportDetails_userTable"
            onClick={(e) => handleselectSuspend("Reject report", chatId._id)}
          >
            <img
              src="https://pbs.twimg.com/profile_images/1185852580980674561/Qv-lCmbz_400x400.jpg"
              alt="image ..."
              className="Report_Statusimg"
            />
            <p
              className={`Report_Status ${
                select == "Reject report" ? "selectRepoetStatus" : undefined
              }`}
            >
              Reject report
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ReportDetails;
