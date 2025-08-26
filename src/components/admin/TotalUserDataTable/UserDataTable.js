import React, { useState, useMemo, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { FcSearch } from "react-icons/fc";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import img1 from "../../../assets/services/Ellipse 31 (1).png";
import { TiArrowUnsorted } from "react-icons/ti";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import configData from "../../../config/config.json";
import Avatar from "../../../assets/services/avatar.png";
import CheckOutSideClick from "../../../config/CheckOutSideClick";

const ShowService = ({
  selectedService,
  handleSelectService,
  setSelectOpt,
  serviceList,
}) => {
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
  // console.log(selectedService);

  // const handleSelectService = (index) => {
  //   console.log(index);
  //   if (selectedService.indexOf(index) !== -1) {
  //     const servicelist = selectedService.filter((sem) => sem !== index);
  //     setselectedService(servicelist);
  //   } else {
  //     setselectedService([...selectedService, index]);
  //   }
  // };
  const myRef = useRef(null);
  const closeInputFild = () => {
    setSelectOpt(false);
  };
  return (
    <CheckOutSideClick onClickOutSide={closeInputFild}>
      <div
        className="ShowService_mainContainerDiv"
        ref={myRef}
        style={{ zIndex: "10000" }}
      >
        {serviceList &&
          serviceList.map((ser, index) => (
            <div
              key={index}
              className={`ShowService_containerDiv ${
                selectedService.indexOf(ser.name) !== -1
                  ? "ShowService_Select"
                  : undefined
              }`}
              onClick={(e) => handleSelectService(ser.name)}
            >
              <img src={ser.serviceIcon} />
              <a>{ser.name.charAt(0).toUpperCase() + ser.name.slice(1)}</a>
            </div>
          ))}
      </div>
    </CheckOutSideClick>
  );
};

const Service = ({ list }) => {
  const arr = list.slice(0, 3);
  return (
    <div className="UserTable_imageList">
      <div className="UserTable_imageLi">
        <div class="avatar-group">
          {arr.map((img, index) => (
            <div key={index} class="avatar">
              <img src={img} />
            </div>
          ))}
          {list.length > 3 && (
            <div class="hidden-avatars">+{list.length - 3}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const UserDataTable = () => {
  const [data, setData] = useState([]);
  console.log("user data list =", data);
  const [selectedService, setselectedService] = useState("");
  const [selectOpt, setSelectOpt] = useState(false);
  const [serviceList, setServiceList] = useState("");
  const [pagenation, setPagenation] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  // console.log('serviceList=>',serviceList);

  const myRef = useRef();
  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);
  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setSelectOpt(false);
    }
  };
  const handleClickInside = () => {
    setSelectOpt(true);
  };
  // ----------------------select service for filter -------------------
  const handleSelectService = (selected) => {
    if (selected == selectedService) {
      setselectedService("");
      getUserList();
    } else {
      setselectedService(selected);
      getUserList(selected);
    }
  };
  const handleActiveInactive = async (id, isactive) => {
    console.log("id=>", id);
    console.log("isactive=>", isactive);

    const isActive = {
      id: id,
      is_active: isactive === true ? false : true,
    };
    let ApiRes = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_ACTIVE_INACTIVE_BY_USER_ID_POST_URL,
      isActive,
      adminToken
    );
    // console.log("=>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        console.log("user listing Details result=>", ApiRes);
        const AllVal = [...data];
        AllVal.forEach((element, ind) => {
          if (element._id == id) {
            AllVal[ind].is_active = element.is_active === true ? false : true;
          }
        });
        console.log("AllVal result=>", AllVal);

        setData(AllVal);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  const columns = [
    {
      name: "User",
      selector: "name",
      sortable: true,
      grow: 2,
      hide: "md",
      cell: (row) => (
        <>
          <NavLink
            to={`/user-overview?userId=${row._id}`}
            className="navlinks "
          >
            <div className="UserTable_UserNameDiv">
              <img
                src={
                  // configData.COMMON_MEDIA_LINK_URL +
                  // "/applyforservice/" +

                  row.avatar ? row.avatar : Avatar
                }
                alt="image ..."
              />
              <p>{row.name}</p>
            </div>
          </NavLink>
        </>
      ),
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      grow: 3,
      hide: "sm",
      cell: (row) => (
        <>
          <NavLink
            to={`/user-overview?userId=${row._id}`}
            className="navlinks "
          >
            <p>{row.email}</p>
          </NavLink>
        </>
      ),
    },
    {
      name: "Phone No",
      selector: "mobilenumber",
      sortable: true,
      cell: (row) => (
        <>
          <NavLink
            to={`/user-overview?userId=${row._id}`}
            className="navlinks "
          >
            <p>{row.mobilenumber}</p>
          </NavLink>
        </>
      ),
    },
    {
      name: "No of AD post",
      selector: "AdsPost",
      // sortable: true,
      grow: 0,
      hide: "sm",
      cell: (row) => (
        <>
          <NavLink
            to={`/user-overview?userId=${row._id}`}
            className="navlinks "
          >
            <p>{row.add_offer} </p>
          </NavLink>
        </>
      ),
    },
    {
      name: (
        <div>
          <div
            // onClick={()=>setSelectOpt(!selectOpt)}
            ref={myRef}
            onClick={handleClickInside}
            className="DataTable_serviceOpt"
            style={
              selectedService.length > 0 ? { color: "#2682D6" } : undefined
            }
          >
            Services opt
            <TiArrowUnsorted />
            {/* {selectedService.length > 0 && `${selectedService.length}`} */}
            {/* <ShowService
          selectedService={selectedService}
          setselectedService={setselectedService}
        /> */}
          </div>
        </div>
      ),
      selector: "Service",
      // sortable: true,
      // hide: "md",
      cell: (row) => (
        <>
          <NavLink
            to={`/user-overview?userId=${row._id}`}
            className="navlinks "
          >
            <Service list={row.services_offer} />
          </NavLink>
        </>
      ),
    },
    {
      name: "Account Type",
      selector: "user_type",
      sortable: true,
      grow: 0,
      hide: "md",
      cell: (row) => (
        <>
          <NavLink
            to={`/user-overview?userId=${row._id}`}
            className="navlinks "
          >
            <div>
              <span
                className={`c_t UserTable_AccountType ${
                  row.user_type === "individual" ? undefined : "buss"
                }`}
              >
                {row.user_type}
              </span>
            </div>
          </NavLink>
        </>
      ),
    },
    {
      name: "Active/ Deactive",
      selector: "is_active",
      grow: 0,
      sortable: true,
      cell: (row) => (
        <>
          <div className="UserTable_maintooglediv">
            <div className="form-check form-switch  UserTable_toggleSwitch">
              <label
                className="form-check-label form-check-label-color:red sw"
                for="flexSwitchCheckDefault"
              >
                <input
                  className="form-check-input  sw redforToggleButton "
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={row.is_active === true ? true : false}
                  onChange={() => handleActiveInactive(row._id, row.is_active)}
                />
              </label>
            </div>
          </div>
        </>
      ),
    },
  ];

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data.filter(
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
    const handleSearchData = () => {
      if (filterText.length > 0) {
        getUserList(filterText);
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
            <FcSearch
              className=" DataTable_FcSearch"
              onClick={handleSearchData}
            />
          </div>
        </div>
      </>
    );
  }, [filterText, resetPaginationToggle]);
  const changePage = async ({ selected }) => {
    setPageNumber(selected + 1);
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_GET_USER_LIST_GET_URL +
        `?limit=10&page=${selected + 1}`,
      adminToken
    );
    console.log("=>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        console.log("user listing Details result=>", ApiRes.result);
        // toast.success(ApiRes.message);
        const val = [];
        for (let ele of ApiRes.result) {
          let imageData = [];
          for (let subEle of ele.services_offer) {
            const imgData =
              // configData.COMMON_MEDIA_LINK_URL +
              // "/applyforservice/" +
              subEle.snapsort_offering[0];
            imageData.push(imgData);
          }
          let value = {
            add_offer: ele.add_offer,
            avatar: ele.avatar,
            email: ele.email,
            is_active: ele.is_active,
            mobilenumber: ele.mobilenumber,
            name: ele.name,
            services_offer: imageData,
            user_type: ele.user_type,
            _id: ele._id,
          };
          val.push(value);
        }
        setData(val);
        setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  // ---------------------------------------------------
  const getUserList = async (text) => {
    // value.setServiceSearchQuary(query.get('serviceName'))
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_GET_USER_LIST_GET_URL +
        `?limit=10&page=1&searchQuery=${text ? text : ""}`,
      adminToken
    );
    console.log("=>", ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("user listing Details result=>", ApiRes.result);
        // toast.success(ApiRes.message);
        const val = [];
        for (let ele of ApiRes.result) {
          let imageData = [];
          for (let subEle of ele.services_offer) {
            const imgData = subEle.snapsort_offering[0];
            imageData.push(imgData);
          }
          let value = {
            add_offer: ele.add_offer,
            avatar: ele.avatar,
            email: ele.email,
            is_active: ele.is_active,
            mobilenumber: ele.mobilenumber,
            name: ele.name,
            services_offer: imageData,
            user_type: ele.user_type,
            _id: ele._id,
          };
          val.push(value);
        }
        setData(val);
        setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  //-----------------------------service list----------------------------------
  const getServiceList = async () => {
    // if (userToken) {
    let ApiRes = await API_REQ_GET(configData.ADMIN_SERVICE_PIN_MENU_GET_URL);
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("THIS IS service listing menu result=>", ApiRes.result);
        // toast.success(ApiRes.message);
        setServiceList(ApiRes.result);
      } else {
        if (adminToken) {
          toast.warning(ApiRes.message);
        }
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
    // }
  };
  useEffect(() => {
    getUserList();
    getServiceList();
  }, []);
  return (
    <>
      <div className="DataTable_mainContainerDiv">
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
        <DataTable
          //   title="Contact List"
          columns={columns}
          data={data}
          defaultSortField="name"
          //   striped
          //   pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
        {selectOpt === true && (
          <ShowService
            serviceList={serviceList}
            selectedService={selectedService}
            handleSelectService={handleSelectService}
            setSelectOpt={setSelectOpt}
          />
        )}
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
        {/* {reportDetails === true && (
            <ReportDetails setReportDetails={setReportDetails} />
          )} */}
      </div>
    </>
  );
};

export default UserDataTable;
