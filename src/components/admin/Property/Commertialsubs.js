import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsFillSaveFill } from "react-icons/bs";
import CommertialElem from "./CommertialElem";
import { BiReset } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";

const Commertialsubs = ({
  deleteButton,
  handleDelete,
  handleUpdateAll,
  commertialData,
  text,
  setText,
  handleAddItems,
  handleSelectItem,
  subCommertialType,
  handleUpdateEle,
  elemName,
  subTitle
}) => {
  return (
    <div className="container m-3 residential_main_container_div">
      <div className="residential_container_div">
        <div className="d-flex residential_main_div">
          <p style={{ marginTop: "7px", width: "127px" }}>Commertial type</p>
          <input
            type="text"
            placeholder="Name Property"
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
                marginRight:"5px",
              }}
            />
            <span>Add</span>
          </button>
        </div>
        <hr />
        <div className=" residential_container_elelment_div">
          {commertialData.map((curElem, index) => {
            return (
              <div key={index}>
                <CommertialElem
                  index={index}
                  curElem={curElem.name}
                  eleId={curElem._id}
                  subItems={curElem.subCatagory}
                  handleDelete={handleDelete}
                  handleSelectItem={handleSelectItem}
                  subCommertialType={subCommertialType}
                  items={commertialData && commertialData}
                  handleUpdateEle={handleUpdateEle}
                  elemName={elemName}
                  subTitle={subTitle}
                />
              </div>
            );
          })}
        </div>
        {deleteButton === true && (
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
        )}
      </div>
    </div>
  );
};

export default Commertialsubs;
