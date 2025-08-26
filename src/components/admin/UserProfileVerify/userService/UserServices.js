import React, { useState } from "react";
import "./UserServices.css";
import img1 from "../../UserDetails/img4.png";
import img2 from "../../UserDetails/img5.png";
import img3 from "../../UserDetails/img8.svg";
import img4 from "./Vector (1).svg";
import img5 from "./Vector (2).svg";
import img6 from "./Vector.svg";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { VscFilePdf } from "react-icons/vsc";
import { RiDeleteBinFill } from "react-icons/ri";
import { API_REQ_POST_WITH_TOKEN } from "../../../../config/API";
import configData from "../../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import DocumentViewer from "../../../DocumentViewer/DocumentViewer";
import pdfs from "../../../DocumentViewer/test.pdf";
import ReactPaginate from "react-paginate";
import noDaFounds from "../../../../assets/pageNotfound/No data image for admin.jpg"

const UserServices = ({
  dataList,
  setDataList,
  setChange,
  change,
  changePage,
  pagenation,
}) => {
  const [expendArrow, setExpendArrow] = useState();
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);

  const handleExpend = (_id) => {
    if (_id === expendArrow) {
      setExpendArrow();
    } else {
      setExpendArrow(_id);
    }
  };
  const handleChangeStaus = async (status, id) => {
    for (let cur_ele of dataList) {
      if (cur_ele._id === id) {
        console.log("working");
        cur_ele.admin_approval = status;
      }
    }
    setDataList([...dataList]);

    //--------------------------------------------------

    const pendingServiceData = {
      _id: id,
      admin_approval: status,
    };

    let ApiRes = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_PENDING_LIST_POST_URL,
      pendingServiceData,
      adminToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // console.log("from here warning");
        toast.success(ApiRes.message);
        //   setPagenation(ApiRes.Pagination);
        setChange(change + 1);
      } else {
        toast.warning(ApiRes.message);
      }
    } else {
      toast.error("Please Check Your Internet connection !");
    }
  };

  return (
    <div className="UserServices_main_container_div">
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
      {dataList ? (
        dataList.map((data, index) => (
          <div>
            <div
              key={index}
              className={`UserServices_container_div ${
                expendArrow != data._id ? "borderRadious" : undefined
              }`}
            >
              <div className="UserServices_service_div">
                <p>
                  {data &&
                    data.select_your_offering &&
                    data.select_your_offering}
                </p>
                <div>
                  <img
                    src={
                      data &&
                      data.serviceSettings &&
                      // configData.COMMON_MEDIA_LINK_URL +
                      // "/serviceSettings/" +
                      data.serviceSettings[0].serviceIcon
                    }
                  />
                </div>
              </div>
              <div className="UserServices_Approve_div">
                <div
                  className="UserServices_expend"
                  onClick={() => handleExpend(data._id)}
                >
                  {expendArrow === data._id ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </div>
                <div className="UserServices_Approve">
                  {data.admin_approval && data.admin_approval === "pending" && (
                    <img src={img4} />
                  )}
                  {data.admin_approval &&
                    data.admin_approval === "approved" && <img src={img6} />}
                  {data.admin_approval &&
                    data.admin_approval === "rejected" && <img src={img5} />}
                  <p>{data.admin_approval && data.admin_approval}</p>
                </div>
              </div>
            </div>
            {expendArrow === data._id ? (
              <div className="UserServices_Expend_container_div">
                <div className="UserServices_Expend_container">
                  <h6>Service offering title</h6>
                  <div>
                    {data.service_offering_title && (
                      <p>
                        {data &&
                          data.service_offering_title &&
                          data.service_offering_title}
                      </p>
                    )}
                  </div>
                </div>
                <div className="UserServices_Expend_container">
                  <h6>Sevice Owner Contact </h6>
                  <div>
                    {data.user && (
                      <p>
                        {data &&
                        data.user &&
                        // data.user.length > 0 &&
                        // data &&
                        // data.user &&
                        data.user.mobilenumber
                          ? data.user.mobilenumber
                          : "This user dis'n have contact"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="UserServices_citiesCertificate_container">
                  <div className="UserServices_Certificate_container">
                    {data &&
                      data.documents_details &&
                      data.documents_details.map((list, index) => (
                        <>
                          {/* <PDFS Doc={
                             configData.COMMON_MEDIA_LINK_URL+"/applyforservice/" +list.documents
                            } /> */}
                          <a
                            href={
                              // configData.COMMON_MEDIA_LINK_URL +
                              // "/applyforservice/" +
                              list.documents
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            <label
                              htmlFor="adhar"
                              className="UserServices_FSSAICertificate_container"
                            >
                              <VscFilePdf className="UserServices_VscFilePdf" />
                              <p>{list.name} </p>
                            </label>
                          </a>
                        </>
                      ))}
                  </div>
                  <div className="UserServices_cities_container">
                    <div>
                      {data.add_offering_location &&
                        data.add_offering_location.map((list, index) => (
                          <div
                            key={index}
                            className="UserServices_city_container"
                          >
                            <p>{list} </p>
                            {/* <RiDeleteBinFill className="UserServices_RiDeleteBinFill" /> */}
                          </div>
                        ))}
                    </div>

                    <div className="UserServices_image_container">
                      {data.snapsort_offering &&
                        data.snapsort_offering.map((list, index) => (
                          <>
                            <img
                              src={
                                // configData.COMMON_MEDIA_LINK_URL +
                                // "/applyforservice/" +
                                list
                              }
                            />
                          </>
                        ))}
                      {/* <img src={img2} />
                      <img src={img3} />
                      <img src={img2} /> */}
                    </div>

                    <div className="UserServices_adminApproved_container">
                      <div className="UserServices_adminApproved">
                        <div className="UserServices_ChangeStatus">
                          <h5>change Status</h5>
                        </div>
                        <div className="UserServices_Approve">
                          {data.admin_approval &&
                            data.admin_approval === "pending" && (
                              <img src={img4} />
                            )}
                          {data.admin_approval &&
                            data.admin_approval === "approved" && (
                              <img src={img6} />
                            )}
                          {data.admin_approval &&
                            data.admin_approval === "rejected" && (
                              <img src={img5} />
                            )}
                          <p>{data.admin_approval && data.admin_approval} </p>
                        </div>
                        <div className="UserServices_ApproveMenu">
                          <div
                            className="UserServices_Approve"
                            onClick={() =>
                              handleChangeStaus("pending", data._id)
                            }
                          >
                            <img src={img4} />
                            <p>Pending </p>
                          </div>
                          <div
                            className="UserServices_Approve"
                            onClick={() =>
                              handleChangeStaus("approved", data._id)
                            }
                          >
                            <img src={img6} />
                            <p>Approved </p>
                          </div>
                          <div
                            className="UserServices_Approve"
                            onClick={() =>
                              handleChangeStaus("rejected", data._id)
                            }
                          >
                            <img src={img5} />
                            <p>Rejected </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : undefined}
          </div>
        ))
      ) : 
       ''
      }

      {dataList.length === 0 ? <>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    flexDirection: "column",
                  }}
                >
                  <img src={noDaFounds} alt="nodata found ..." width={400} />
                  <h5
                    style={{
                      color: "#42526e",
                      padding:'10px'
                    }}
                  >
                    No Data Found!
                  </h5>
                </div>
              </> : ""}
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
  );
};

export default UserServices;
