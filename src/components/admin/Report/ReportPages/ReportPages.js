import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { FcSearch } from "react-icons/fc";
import data from "./Date";
import { AiFillEye } from "react-icons/ai";
import "../Report.css";
import { MdChromeReaderMode, MdOutlineChromeReaderMode } from "react-icons/md";
import ReportDetails from "../ReportDetails/ReportDetails";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import img1 from "../../../../assets/services/Ellipse 31 (1).png";

// import img1 from '../../../assets/services/Ellipse 31 (1).png';
import img2 from "../../../../assets/services/Ellipse 31.png";
import configData from "../../../../config/config.json";
import { API_REQ_GET } from "../../../../config/API";
import { ToastContainer } from "react-bootstrap";
// import { useEffect } from "react";

const ReportPages = () => {
  const [reportDetails, setReportDetails] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pagenation, setPagenation] = useState("");
  const [dataList, setDataList] = useState([]);
  const [chatId, setChatId] = useState("");
  console.log("chatId===>", chatId);

  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);
  const changePage = async ({ selected }) => {
    setPageNumber(selected + 1);
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_REPORT_LIST_GET_URL +
        `?limit=10&page=${selected + 1}`,
      adminToken
    );
    console.log("=>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        console.log("user listing Details result=>", ApiRes.result);
        // toast.success(ApiRes.message);
        setDataList(ApiRes.result);
        setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  const handleViewReport = (id) => {
    setReportDetails(true);
    for (let ele of dataList) {
      if (ele._id === id) {
        setChatId(ele);
      }
    }
  };

  const columns = [
    {
      name: "Report ID",
      selector: "_id",
      sortable: true,
      grow: 0,
      hide: "sm",
      //   hide: "md",
      //   button: true,
      cell: (row) => (
        <>
          {/* <div > */}
          {row._id && "REP" + row._id.slice(-7).toUpperCase()}
          {/* </div> */}
        </>
      ),
    },
    {
      name: "Initiator",
      // selector: "initiator.initiatorName",
      sortable: true,
      hide: "sm",
      cell: (row) => (
        <>
          <div className="UserTable_UserNameDiv UserTable_UserNameDivs">
            <img
              src={
                row.reportedUser &&
                // configData.COMMON_MEDIA_LINK_URL +
                //   "/avatar/" +
                  row.reportedUser.avatar
              }
              alt="image ..."
            />
            <p>{row.reportedUser && row.reportedUser.name}</p>
          </div>
        </>
      ),
    },
    {
      name: "Against",
      // selector: "against.againstName",
      sortable: true,
      cell: (row) => (
        <>
          <div className="UserTable_UserNameDiv UserTable_UserNameDivs">
            <img
              src={
                row.againstId &&
                // configData.COMMON_MEDIA_LINK_URL +
                //   "/avatar/" +
                  row.againstId.avatar
              }
              alt="image ..."
            />
            <p>{row.againstId && row.againstId.name}</p>
          </div>
        </>
      ),
    },
    {
      name: "Raised Date",
      // selector: "raisedDate",
      sortable: true,
      hide: "md",
      cell: (row) => (
        <>
          <div>
            {row.createdAt &&
              new Date(row.createdAt).toLocaleDateString("en-GB")}
          </div>
        </>
      ),
    },
    {
      name: "Details",
      // selector: "company.name",
      // sortable: true,
      // hide: "md",
      grow: 0,
      cell: (row) => (
        <>
          <div>
            <AiFillEye
              className="h3 cursor"
              onClick={() => handleViewReport(row._id)}
            />
          </div>
        </>
      ),
    },
    // {
    //   name: "Status",
    //   // selector: "address.city",
    //   sortable: true,
    //   hide: "md",
    //   cell: (row) => (
    //     <>
    //       <div className="UserTable_UserNameDiv UserTable_UserNameDivs">
    //         <img
    //           src={
    //             row.againstId &&
    //             // configData.COMMON_MEDIA_LINK_URL +
    //             //   "/avatar/" +
    //               row.againstId.avatar
    //           }
    //           alt="image ..."
    //           className="Report_Statusimg"
    //         />
    //         <p className="Report_Status">
    //           {row.adminAction && row.adminAction}
    //         </p>
    //       </div>
    //     </>
    //   ),
    // },
    {
      name: "Read/ Unread",
      // selector: "read",
      sortable: true,
      grow: 0,

      cell: (row) => (
        <>
          <div className="UserTable_readUnread">
            {row.adminAction && row.adminAction !== "pending" ? (
              <MdOutlineChromeReaderMode className="h3 reportRead cursor" />
            ) : (
              <MdChromeReaderMode className="h3 cursor" />
            )}
          </div>
        </>
      ),
    },
  ];

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = dataList.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        {/* <FilterComponent
        //   onFilter=
        //   onClear={handleClear}
        //   filterText={filterText}
        /> */}
        <div className="DataTable_SearchDiv">
          <div className="sw DataTable_Search">
            <input
              type="text"
              placeholder="Search report ID/  Initiator/ Against/ Date"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <FcSearch className=" DataTable_FcSearch" />
          </div>
        </div>
      </>
    );
  }, [filterText, resetPaginationToggle]);

  const getCases = async () => {
    // value.setServiceSearchQuary(query.get('serviceName'))
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_REPORT_LIST_GET_URL + `?limit=10&page=1`,
      adminToken
    );
    console.log("=>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("user listing Details result=>", ApiRes.result);
        // toast.success(ApiRes.message);
        setDataList(ApiRes.result);
        setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  useEffect(() => {
    getCases();
  }, []);
  return (
    <>
      <div className="DataTable_mainContainerDiv">
        <DataTable
          //   title="Contact List"
          columns={columns}
          data={filteredItems}
          defaultSortField="name"
          //   striped
          //   pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
        <div className="SearchAllList_ReactPaginate">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pagenation && pagenation.TotalPages}
            onPageChange={changePage}
            containerClassName={"paginationcontainer"}
            pageClassName={"page_item"}
            pageLinkClassName={"pageLinkClassName"}
            previousClassName={"previousClassName"}
            previousLinkClassName={"previousLinkClassName"}
            nextClassName={"nextClassName"}
            nextLinkClassName={"nextLinkClassName"}
            disabledClassName={"pageinationDisable"}
            activeClassName={" activeClassName"}
          />
        </div>
        {/* <h1>{pageNumber + 1}</h1> */}
        {reportDetails === true && (
          <ReportDetails
            setReportDetails={setReportDetails}
            chatId={chatId}
            setDataList={setDataList}
            dataList={dataList}
          />
        )}
      </div>
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
    </>
  );
};

export default ReportPages;
