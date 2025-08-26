import React, { useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsFillSaveFill } from "react-icons/bs";
import PgElem from "./PgElem";
import { BiReset } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from "../../../config/config.json";
import { useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

const Pg = () => {
  const [text, setText] = useState("");
  const [resp, setResp] = useState("");
  console.log("resp===>", resp);

  const [items, setItems] = useState([]);
  console.log("items===>", items);
  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  console.log("adminToken------------------------------------>", adminToken);
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
    const resPgData = {
      step: "pg",
      id: resp && resp._id,
      typeOfProperty: {
        name: "pg",
        catagory: items,
      },
    };
    // formData.append("data", JSON.stringify(resPgData));
    let resPg = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_PROPERTY_SETTING_URL,
      resPgData,
      adminToken
    );
    console.log(resPg);
    if (resPg) {
      if (resPg.success === true) {
        toast.success(resPg.message);
      } else {
        toast.warning(resPg.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };
  const getCases = async () => {
    let ApiPg = await API_REQ_GET(
      configData.ADMIN_SERVICE_PROPERTY_SETTING_GET_URL,
      adminToken
    );
    console.log(ApiPg);
    if (ApiPg) {
      if (ApiPg.success === true) {
        // toast.success(ApiPg.message);
        if (ApiPg.response && ApiPg.response.length > 0) {
          setResp(ApiPg.response[0]);
          for (let cur_ele of ApiPg.response[0].typeOfProperty) {
            if (cur_ele.name === "pg") {
              setItems(cur_ele.catagory);
            }
          }
        }
      } else {
        toast.warning(ApiPg.message);
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
          <p style={{ marginTop: "7px", width: "127px" }}>PG type</p>
          <input
            type="text"
            placeholder="Name PG Type "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <BiReset
            className="residential_reset_button"
            onClick={() => setText("")}
          />
          <button className="residential_save_button" onClick={handleAddItems}>
            <AiFillPlusCircle
              style={{
                color: "white",
                backgroundColor: "#0061F7",
                marginRight: " 5px",
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
                <PgElem
                  index={index}
                  curElem={curElem.name}
                  id={curElem._id}
                  handleDelete={handleDelete}
                  handleUpdateEle={handleUpdateEle}
                  items={items}
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

export default Pg;
