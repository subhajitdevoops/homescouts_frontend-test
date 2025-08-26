import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFillSaveFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import FurnishedElem from "./FurnishedElem";
import { API_REQ_GET, API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from "../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";

const Furnished = () => {
  const [text, setText] = useState("");
  const [respId, setRespId] = useState("");

  // console.log(check);
  const [itemsFurnished, setItemsFurnished] = useState([]);
  console.log(itemsFurnished);
  // ========================Admin Access Token =========================================
  const adminTokenAvilable = JSON.parse(
    localStorage.getItem("adminAccessToken")
  );
  const adminToken = adminTokenAvilable && adminTokenAvilable.response.token;
  // console.log('adminToken------------------------------------>',adminToken);

  const handleAddItems = () => {
    if (text.length < 2) {
      if (text === "") {
        toast.warning("Please Accessories Name");
      } else {
        toast.warning("Accessories Name Must be two letter");
      }
    } else {
      let val = {
        name: text,
        count: null,
        isAvilable: false,
      };

      setItemsFurnished([...itemsFurnished, val]);
      console.log("working this");
      setText("");
    }
  };
  const handleDelete = (id) => {
    setItemsFurnished((oldItems) => {
      return oldItems.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };

  const handleUpdateEle = (e, ele) => {
    const AllVal = [...itemsFurnished];
    const val = e.target.value;
    AllVal.forEach((element, index) => {
      if (element.name === ele) {
        AllVal[index].name = val;
        console.log("working");
      }
    });
    setItemsFurnished(AllVal);
  };

  const handleUpdate = async () => {
    // const formData = new FormData();
    // setItems([]);
    const furnishData = {
      id: respId && respId._id,
      step: "furnished",
      furnishingDetails: {
        type: "furnished",
        amenities: itemsFurnished,
      },
    };
    // formData.append("data", JSON.stringify(furnishData));
    let resFurnish = await API_REQ_POST_WITH_TOKEN(
      configData.ADMIN_SERVICE_ADD_FURNISHED_URL,
      furnishData,
      adminToken
    );
    console.log(resFurnish);
    if (resFurnish) {
      if (resFurnish.success === true) {
        toast.success(resFurnish.message);
      } else {
        toast.warning(resFurnish.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
  };

  const getCases = async () => {
    let ApiRes = await API_REQ_GET(
      configData.ADMIN_SERVICE_ADD_FURNISHED_GET_URL,
      adminToken
    );
    // console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success === true) {
        // toast.success(ApiRes.message);
        if (ApiRes.result) {
          setRespId(ApiRes.result);
          for (let cur_ele of ApiRes.result.furnishingDetails) {
            // console.log("cur_ele", cur_ele.type);

            if (cur_ele.type === "furnished") {
              setItemsFurnished(cur_ele.amenities);
              // console.log("cur_ele=======", cur_ele);
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
    <div className="container">
      <div className="furnished_main_table_container_div">
        <table className="table furnished_table_container_div">
          <thead>
            <tr>
              <th scope="col">Accessories</th>
              <th scope="col">Count</th>
              <th scope="col">Availability</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {itemsFurnished.map((curElem, index) => {
              return (
                <FurnishedElem
                  curElem={curElem.name}
                  key={index}
                  index={index}
                  handleDelete={handleDelete}
                  items={itemsFurnished}
                  handleUpdateEle={handleUpdateEle}
                  count={curElem.count}
                  itemsFurnished={itemsFurnished}
                  setItemsFurnished={setItemsFurnished}
                />
              );
            })}
          </tbody>
        </table>
        <div className="d-flex furnished_main_button_container_div">
          <input
            type="text"
            placeholder="Enter furnish name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="residential_save_button " onClick={handleAddItems}>
            <AiFillPlusCircle
              style={{
                color: "white",
                backgroundColor: "#0061F7",
                margin: "0px 5px",
              }}
            />
            <span>Add New</span>
          </button>
          <button className="residential_save_button " onClick={handleUpdate}>
            <BsFillSaveFill
              style={{
                color: "white",
                backgroundColor: "#0061F7",
                margin: "0px 5px",
              }}
            />
            <span>update</span>
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

export default Furnished;
