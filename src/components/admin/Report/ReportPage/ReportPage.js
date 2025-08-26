import React, { useState } from "react";
import ReactPaginate from "react-paginate";
// import UserTable from "./UserTable";
import img1 from "../../../../assets/services/Ellipse 31 (1).png";
import img2 from "../../../../assets/services/Ellipse 31.png";
import { FcSearch } from "react-icons/fc";
import { TiArrowUnsorted } from "react-icons/ti";
import Reports from "../Reports/Reports";
import ReportDetails from "../ReportDetails/ReportDetails";

const alldata = [
  {
    id: 1,
    ReportId: "REP0078USP",
    InitiatorName: "f",
    InitiatorImg: img2,
    AgainstName: "z",
    AgainstImg: img1,
    RaisedDate: "04/04/2016",
    Details: [123],
    Status: "Suspend permanently",
    Read: true,
  },
  {
    id: 2,
    ReportId: "REP0654USP",
    InitiatorName: "g",
    InitiatorImg: img1,
    AgainstName: "w",
    AgainstImg: img2,
    RaisedDate: "29/07/2013",
    Details: [123],
    Status: "Reject report",
    Read: false,
  },
  {
    id: 3,
    ReportId: "REP09774USP",
    InitiatorName: "a",
    InitiatorImg: img2,
    AgainstName: "m",
    AgainstImg: img1,
    RaisedDate: "02/08/2019",
    Details: [123],
    Status: "Suspend permanently",
    Read: true,
  },
  {
    id: 4,
    name: "Ram",
    ReportId: "REP0078USP",
    InitiatorName: "z",
    InitiatorImg: img2,
    AgainstName: "b",
    AgainstImg: img1,
    RaisedDate: "04/11/2022",
    Details: [123],
    Status: "...........",
    Read: false,
  },
];
const ReportPage = () => {
  // -------------------Contact Owner-------------------------------

  const [reportDetails, setReportDetails] = useState(false);
  const [lists, setLists] = useState(alldata);
  console.log("lists", lists);
  // const [short, setShort] = useState();

  const handleReportID = () => {
    const sort = alldata.sort((a, b) => a.ReportId - b.ReportId);
    setLists(sort);
    console.log("handleReportID", sort);
  };

  const handleInitiator = () => {
    const Initiatordata = alldata.sort((a, b) =>
      a.InitiatorName < b.InitiatorName ? -1 : 1
    );
    setLists(Initiatordata);
    console.log("handleInitiator", Initiatordata);
  };

  const handleAgainst = () => {
    const data = alldata.sort((a, b) =>
      a.AgainstName < b.AgainstName ? -1 : 1
    );
    setLists(data);
    console.log("handleAgainst", data);
  };
  const handleDate = () => {
    const  sortedDate = alldata.sort(
      (a, b) =>
        new Date(...a.RaisedDate.split("/").reverse()) -
        new Date(...b.RaisedDate.split("/").reverse())
    );
    setLists(sortedDate);
    console.log("handleDate", sortedDate);
  };
  const handleunRead = () => {
    const read = alldata.sort((x, y) => Number(x.Read) - Number(y.Read));
    setLists(read);
    console.log("handleunRead", read);
  };

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = lists
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((list) => {
      return (
        <>
          <Reports list={list} setReportDetails={setReportDetails} />
        </>
      );
    });

  const pageCount = Math.ceil(lists.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="DataTable_mainContainerDiv">
        <div className="DataTable_SearchDiv">
          <div className="sw DataTable_Search">
            <input
              type="text"
              placeholder="Search report ID/  Initiator/ Against/ Date"
            />
            <FcSearch className=" DataTable_FcSearch" />
          </div>
        </div>
        <div className="DataTable_ContainerDiv">
          <div className="DataTable_headingDiv">
            <div className="cursor" onClick={() => handleReportID()}>
              Report ID
              <TiArrowUnsorted />
            </div>
            <div className="cursor" onClick={handleInitiator}>
              Initiator
              <TiArrowUnsorted className="cursor" />
            </div>
            <div className="cursor" onClick={handleAgainst}>
              Against
              <TiArrowUnsorted className="cursor" />
            </div>
            <div className="cursor" onClick={() => handleDate()}>
              Raised Date
              <TiArrowUnsorted className="cursor" />
            </div>
            <div className="cursor">
              <div
                className="DataTable_serviceOpt cursor"
                // style={
                //   selectedService.length > 0 ? { color: "#2682D6" } : undefined
                // }
              >
                Details
              </div>
            </div>
            <div>
              <div
                className="DataTable_AccountOpt"
                // style={
                //   selectedAcctype.length > 0 ? { color: "#2682D6" } : undefined
                // }
              >
                Status
                {/* {selectedAcctype.length > 0 && `${selectedAcctype.length}`} */}
                {/* <AccountTypeFilter
                  filter={Accountfilter}
                  selectedAcctype={selectedAcctype}
                  setSelectedAccType={setSelectedAccType}
                /> */}
              </div>
            </div>
            <div>
              <div
                className="DataTable_ActiveOpt"
                // style={
                //   selectedActive.length > 0 ? { color: "#2682D6" } : undefined
                // }
                onClick={() => handleunRead()}
              >
                Read/ Unread
                <TiArrowUnsorted />
                {/* {selectedActive.length > 0 && `${selectedActive.length}`} */}
                {/* <ActiveFilter
                  filter={Activefilter}
                  shift="shift"
                  selectedActive={selectedActive}
                  setSelectedActive={setSelectedActive}
                /> */}
              </div>
            </div>
          </div>

          {displayUsers}
        </div>

        <div className="SearchAllList_ReactPaginate">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
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
        {reportDetails === true && (
          <ReportDetails setReportDetails={setReportDetails} />
        )}
      </div>
    </>
  );
};

export default ReportPage;
