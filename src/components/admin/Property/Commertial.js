import React, { useState } from "react";
import Commertialsubs from "./Commertialsubs";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from "../../../config/config.json";
import { useEffect } from "react";

const Commertial = () => {
  const [text, setText] = useState("");
  const [textSub, setTextSub] = useState("");
  const [subCommertialType, setSubCommertialType] = useState();
  console.log("subCommertialType==>", subCommertialType);
  const [subCommertialData, setSubCommertialData] = useState([]);
  console.log("subCommertialData=>", subCommertialData);
  const [resp, setResp] = useState("");

  const [commertialData, setCommertialData] = useState([]);
  console.log("=commertialData=>", commertialData);

  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);
  const handleAddItems = () => {
    if (text.length > 2) {
      const data = {
        name: text,
        subCatagory: [],
      };
      setCommertialData([...commertialData, data]);
      setText("");
    }
  };

  const handleDelete = (elename) => {
    const allData = [...commertialData];
    const filterdata = allData.filter((item) => item.name !== elename);
    setCommertialData(filterdata);

    if (subCommertialType.name == elename) {
      setSubCommertialType();
      setSubCommertialData([]);
    }
  };
  //--------------------------------select commertial data
  const handleSelectItem = (subItems, curElem, subtitle) => {
    if (subtitle === true) {
    } else {
      setSubCommertialData(subItems);
      setSubCommertialType({
        name: curElem,
        subCatagory: subItems,
      });
    }
  };
  // ------------------------- sub commertial data --------------------------
  const handleAddSubItems = () => {
    const data = {
      name: textSub,
    };
    if (textSub.length > 2) {
      setSubCommertialData([...subCommertialData, data]);
      setTextSub("");
    }

    if (subCommertialType) {
      const update = commertialData.findIndex(
        (obj) => obj.name == subCommertialType.name
      );
      commertialData[update].subCatagory = [...subCommertialData, data];
      setTextSub("");
    }
  };

  const handleUpdateEle = (e, elemId, elemName) => {
    if (elemName === "commertialType") {
      const AllVal = [...commertialData];
      const val = e.target.value;
      AllVal.forEach((element, index) => {
        if (element._id === elemId) {
          AllVal[index].name = val;
        }
      });
      setCommertialData(AllVal);
    } else if (elemName === "subCommertialType") {
      const AllVal = [...subCommertialData];
      const val = e.target.value;
      AllVal.forEach((element, index) => {
        if (element._id === elemId) {
          AllVal[index].name = val;
        }
      });
      setSubCommertialType(AllVal);
    }
  };
  const handleUpdateAll = async () => {
    // const formData = new FormData();
    // setItems([]);
    const commertialDatada = {
      step: "commertial",
      id: resp && resp._id,
      typeOfProperty: {
        name: "commertial",
        catagory: commertialData,
      },
    };
    // formData.append("data", JSON.stringify(commertialDatada));
    let resCommertial = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_PROPERTY_SETTING_URL,
      commertialDatada,
      adminToken
    );
    console.log(resCommertial);
    if (resCommertial) {
      if (resCommertial.success === true) {
        toast.success(resCommertial.message);
      } else {
        toast.warning(resCommertial.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };

  const handleDeleteSub = (curElem) => {
    const update = commertialData.findIndex(
      (obj) => obj.curElem == subCommertialType.curElem
    );
    const filterdata = [...subCommertialData].filter(
      (item) => item.name !== curElem
    );
    commertialData[update].subCatagory = [filterdata];
    setSubCommertialData(filterdata);
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
            if (cur_ele.name === "commertial") {
              setCommertialData(cur_ele.catagory);
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
    <div>
      <Commertialsubs
        elemName="commertialType"
        commertialData={commertialData}
        handleDelete={handleDelete}
        // handleRemoveAll={handleRemoveAll}
        text={text}
        setText={setText}
        handleAddItems={handleAddItems}
        handleSelectItem={handleSelectItem}
        subCommertialType={subCommertialType}
        handleUpdateEle={handleUpdateEle}
      />
      {subCommertialType && (
        <>
          <p className="Commertial_paragraph">
            Add sub types (Select the tag above to add a sub type)
          </p>
          <Commertialsubs
            elemName="subCommertialType"
            deleteButton={true}
            commertialData={subCommertialData}
            handleDelete={handleDeleteSub}
            handleUpdateAll={handleUpdateAll}
            handleSelectItem={handleSelectItem}
            subTitle={true}
            text={textSub}
            setText={setTextSub}
            handleAddItems={handleAddSubItems}
            handleUpdateEle={handleUpdateEle}
          />{" "}
        </>
      )}
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

export default Commertial;
