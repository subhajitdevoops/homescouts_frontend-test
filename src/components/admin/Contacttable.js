import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Nav from "./Nav";
import "../../assets/admin/css/style.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { API_REQ_GET } from "../../config/API";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../../context/AuthProvider";

const Contacttable = () => {
  const [lists, setLists] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pagenation, setPagenation] = useState("");

  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken =
    adminTokenAvilable &&
    adminTokenAvilable.response &&
    // adminTokenAvilable.response.token &&
    adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);

  // -------------------Contact Owner-------------------------------

  const displayUsers =
    lists &&
    lists.map((list) => {
      return (
        <tr className="Contacttable_tr">
          <td>{list.name}</td>
          <td>{list.email}</td>
          <td>{list.subject}</td>
          {/* <td>web developer</td> */}
          <td>{list.company}</td>
          <td title={list.message}>
            {list &&
              list.message.slice(0, 20) }
                {list &&
              list.message.length>20&&'...' }
          </td>
        </tr>
      );
    });
  // const pageCount = Math.ceil(lists.length / usersPerPage);
  const changePage = async ({ selected }) => {
    setPageNumber(selected + 1);
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_CONTACT_GET_URL +
        `?limit=10&page=${selected + 1}`,
      adminToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        toast.success(ApiRes.message);
        setLists(ApiRes.result);
        setPagenation(ApiRes.Pagination);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };
  // -----------------------------Api get request-------------------------------------------
  const getCases = async () => {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_CONTACT_GET_URL + `?limit=10&page=1`,
      adminToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        toast.success(ApiRes.message);
        setLists(ApiRes.result);
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
  const value = useContext(AuthContext);
  useEffect(()=>{
    value.setCurrentUserType('admin')
  },[])

  return (
    <>
      <div className="d-flex">
        <Header sideActive="contact" />
        <div className="col">
          <Nav />
          <div className="Dashboard_mainContainerDiv">
            <div
              className="Dashboard_ContainerDiv"
              style={{ whiteSpace: "normal" }}
            >
              <div className="mt-3 app-container">
                <table>
                  <thead>
                    <tr>
                      <th className="Contacttable_thead">Name</th>
                      <th className="Contacttable_thead">Email</th>
                      <th className="Contacttable_thead">Subject</th>
                      {/* <th className="Contacttable_thead">Service</th>
                       */}
                      <th className="Contacttable_thead">Company</th>
                      <th className="Contacttable_thead">Message</th>
                    </tr>
                  </thead>
                  <tbody>{displayUsers}</tbody>
                </table>
                <>
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
                </>
              </div>
            </div>
          </div>
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
      </div>
    </>
  );
};

export default Contacttable;
