import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import UserTable from "./UserTable";
import img1 from "../../../assets/services/Ellipse 31 (1).png";
import img2 from "../../../assets/services/Ellipse 31.png";
import { FcSearch } from "react-icons/fc";
import { TiArrowUnsorted } from "react-icons/ti";

const ShowService = ({ selectedService, setselectedService }) => {
  const service = [
    {
      id: 1,
      img: img1,
      name: "Home Tiffin",
    },
    {
      id: 2,
      img: img1,
      name: "Electrician ",
    },
    {
      id: 3,
      img: img1,
      name: "Furniture",
    },
  ];
  // select service
  console.log(selectedService);

  const handleSelectService = (index) => {
    console.log(index);
    if (selectedService.indexOf(index) !== -1) {
      const servicelist = selectedService.filter((sem) => sem !== index);
      setselectedService(servicelist);
    } else {
      setselectedService([...selectedService, index]);
    }
  };
  return (
    <div className="ShowService_mainContainerDiv" style={{zIndex:'100'}}>
      {service.map((ser, index) => (
        <div
          key={index}
          className={`ShowService_containerDiv ${
            selectedService.indexOf(ser.id) !== -1
              ? "ShowService_Select"
              : undefined
          }`}
          onClick={(e) => handleSelectService(ser.id)}
        >
          <img src={ser.img} />
          <a>{ser.name}</a>
        </div>
      ))}
    </div>
  );
};

const AccountTypeFilter = ({ filter, selectedAcctype, setSelectedAccType }) => {
  const handleSelectAccType = (list) => {
    console.log(list);
    if (selectedAcctype.indexOf(list) !== -1) {
      const servicelist = selectedAcctype.filter((sem) => sem !== list);
      setSelectedAccType(servicelist);
    } else {
      setSelectedAccType([...selectedAcctype, list]);
    }
  };
  return (
    <div className="sw AccountTypeFilter_mainContainerDiv">
      {filter.map((list, index) => (
        <span
          onClick={() => handleSelectAccType(list)}
          className={`c_t UserTable_AccountType ${
            list === "business" ? "buss" : undefined
          } 
          ${
            selectedAcctype.indexOf(list) !== -1
              ? "ShowService_SelectActive"
              : undefined
          }
          `}
        >
          {list}
        </span>
      ))}
    </div>
  );
};
const ActiveFilter = ({ filter, shift, selectedActive, setSelectedActive }) => {
  const handleSelectAccType = (list) => {
    console.log(list);
    if (selectedActive.indexOf(list) !== -1) {
      const servicelist = selectedActive.filter((sem) => sem !== list);
      setSelectedActive(servicelist);
    } else {
      setSelectedActive([...selectedActive, list]);
    }
  };
  return (
    <div className="sw AccountTypeFilter_mainContainerDiv shift">
      {filter.map((list, index) => (
        <span
          className={`c_t UserTable_AccountType ${
            list === "active" ? "ActiveFilter" : "DeActiveFilter"
          }
          ${
            selectedActive.indexOf(list) !== -1
              ? "ShowService_SelectActive"
              : undefined
          }
           `}
          onClick={() => handleSelectAccType(list)}
        >
          {list}
        </span>
      ))}
    </div>
  );
};

const DataTable = () => {
  // -------------------Contact Owner-------------------------------
  const [lists, setLists] = useState([
    {
      id: 1,
      name: "Rahul",
      userImg: img2,
      email: "User@gmail.com",
      phone: "+91-6260745653",
      AdsPost: "04",
      Service: [img1, img2, img1, img2, img1, img2],
      AccountType: "personal",
      Active: true,
    },
    {
      id: 2,
      name: "Ram",
      userImg: img1,
      email: "User@gmail.com",
      phone: "+91-6260745653",
      AdsPost: "34",
      Service: [img1, img2, img1],
      AccountType: "business",
      Active: false,
    },
    {
      id: 3,
      name: "Rahul",
      userImg: img2,
      email: "User@gmail.com",
      phone: "+91-6260745653",
      AdsPost: "04",
      Service: [
        img1,
        img2,
        img1,
        img2,
        img1,
        img2,
        img1,
        img1,
        img2,
        img1,
        img2,
        img1,
        img2,
        img1,
      ],
      AccountType: "personal",
      Active: true,
    },
    {
      id: 4,
      name: "Ram",
      userImg: img1,
      email: "User@gmail.com",
      phone: "+91-6260745653",
      AdsPost: "34",
      Service: [img1, img2],
      AccountType: "business",
      Active: false,
    },
  ]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = lists
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((list) => {
      return (
        <>
          <UserTable list={list} />
        </>
      );
    });
  const pageCount = Math.ceil(lists.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // select service
  const [selectedService, setselectedService] = useState([]);
  const [selectedAcctype, setSelectedAccType] = useState([]);
  const [selectedActive, setSelectedActive] = useState([]);
  console.log(selectedActive);

  const Accountfilter = ["personal", "business"];
  const Activefilter = ["active", "deactive"];

  return (
    <>
      <div className="DataTable_mainContainerDiv">
        <div className="DataTable_SearchDiv">
          <div className="sw DataTable_Search">
            <input
              type="text"
              placeholder="Search user/ service/account type here"
            />
            <FcSearch className=" DataTable_FcSearch" />
          </div>
        </div>
        <div className="DataTable_ContainerDiv">
          <div className="DataTable_headingDiv">
            <div>User</div>
            <div>Email</div>
            <div>Phone No</div>
            <div>No of AD post</div>
            <div>
              <div
                className="DataTable_serviceOpt"
                style={
                  selectedService.length > 0 ? { color: "#2682D6" } : undefined
                }
              >
                Services opt
                <TiArrowUnsorted />
                {/* {selectedService.length > 0 && `${selectedService.length}`} */}
                <ShowService
                  selectedService={selectedService}
                  setselectedService={setselectedService}
                />
              </div>
            </div>
            <div>
              <div
                className="DataTable_AccountOpt"
                style={
                  selectedAcctype.length > 0 ? { color: "#2682D6" } : undefined
                }
              >
                Account Type
                <TiArrowUnsorted />
                {/* {selectedAcctype.length > 0 && `${selectedAcctype.length}`} */}
                <AccountTypeFilter
                  filter={Accountfilter}
                  selectedAcctype={selectedAcctype}
                  setSelectedAccType={setSelectedAccType}
                />
              </div>
            </div>
            <div>
              <div
                className="DataTable_ActiveOpt"
                style={
                  selectedActive.length > 0 ? { color: "#2682D6" } : undefined
                }
              >
                Active/ Deactive
                <TiArrowUnsorted />
                {/* {selectedActive.length > 0 && `${selectedActive.length}`} */}
                <ActiveFilter
                  filter={Activefilter}
                  shift="shift"
                  selectedActive={selectedActive}
                  setSelectedActive={setSelectedActive}
                />
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
      </div>
    </>
  );
};

export default DataTable;
