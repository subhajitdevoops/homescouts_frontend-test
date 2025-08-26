import React, { useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsFillSaveFill } from "react-icons/bs";
import ResidentialElem from "./ResidentialElem";
import { BiReset } from "react-icons/bi";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from "../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

const Residential = () => {
  const [text, setText] = useState("");
  const [resp, setResp] = useState("");
  console.log("resp===>", resp);

  const [items, setItems] = useState([]);
  console.log(items);

  // ------------------------------------------------------------------------------
  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);

  const handleAddItems = () => {
    const idNewData = items.length;
    if (text.length > 2) {
      const data = {
        id: idNewData + 1,
        name: text,
      };
      setItems([...items, data]);
      setText("");
    }
  };
  const handleDelete = (id) => {
    const allData = [...items];
    const filterdata = allData.filter((item) => item._id !== id);
    setItems(filterdata);
  };

  // const handleUpdate = () => {
  //   setUpdateElem(true);
  // };

  const handleUpdateEle = (e, id) => {
    const AllVal = [...items];
    const val = e.target.value;
    AllVal.forEach((element, index) => {
      if (element._id == id) {
        AllVal[index].name = val;
      }
    });
    setItems(AllVal);
  };
  const handleUpdateAll = async () => {
    // const formData = new FormData();
    // setItems([]);
    const residential = {
      step: "residential",
      id: resp && resp._id,
      typeOfProperty: {
        name: "residential",
        catagory: items,
      },
    };
    // formData.append("data", JSON.stringify(residential));
    let resResidental = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_PROPERTY_SETTING_URL,
      residential,
      adminToken
    );
    console.log(resResidental);
    if (resResidental) {
      if (resResidental.success === true) {
        toast.success(resResidental.message);
      } else {
        toast.warning(resResidental.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };

  const getCases = async () => {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_PROPERTY_SETTING_GET_URL,
      adminToken
    );
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        if (ApiRes.response && ApiRes.response.length > 0) {
          setResp(ApiRes.response[0]);
          for (let cur_ele of ApiRes.response[0].typeOfProperty) {
            if (cur_ele.name === "residential") {
              setItems(cur_ele.catagory);
            }
          }
        }
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
    <div className="container m-3 residential_main_container_div">
      <div className="residential_container_div">
        <div className="d-flex residential_main_div">
          <p style={{ marginTop: "7px", width: "127px" }}>Residential type</p>
          <input
            type="text"
            placeholder="Enter Residential type"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <BiReset
            className="residential_reset_button"
            onClick={() => setText("")}
          />
          <button className="residential_save_button" onClick={handleAddItems}>
            <AiFillPlusCircle
              // BsFillSaveFill
              style={{
                color: "white",
                backgroundColor: "#0061F7",
                marginRight: "5px",
              }}
            />
            <span>Add</span>
          </button>
        </div>
        <hr />
        <div className=" residential_container_elelment_div">
          {items.map((curElem, index) => {
            return (
              <div key={index}>
                <ResidentialElem
                  index={index}
                  curElem={curElem.name}
                  id={curElem._id}
                  handleDelete={handleDelete}
                  // handleUpdate={handleUpdate}
                  handleUpdateEle={handleUpdateEle}
                  items={items}
                  // updateElem={updateElem}
                />
              </div>
            );
          })}
        </div>
        <div style={{ float: "right", marginTop: "-30px" }}>
          <button
            className="rounded-top servicemaster_delete_button"
            onClick={handleUpdateAll}
            style={{
              color: "white",
              backgroundColor: "#0061F7",
            }}
          >
            <BsFillSaveFill
              style={{
                color: "white",
                backgroundColor: "#0061F7",
                margin: "5px",
              }}
            />
            <span>Update</span>
          </button>
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
  );
};

export default Residential;
