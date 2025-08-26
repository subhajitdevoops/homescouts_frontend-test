import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import photo from "../../../assets/statusimg/img2.jpg";

const StatusImage = ({ item, val }) => {
  return (
    <img
      src={item.imgstatus}
      alt="image ... "
      // <img src={photo} alt='image ... '
      className="statusmodle_image_contaier"
    />
  );
};
const ModelStatus = ({
  modalIsOpen,
  setModalIsOpen,
  lists,
  val,
  closeModal,
}) => {
  return (
    <div>
      {modalIsOpen === true && (
        <div className=" statusmodule_main_div">
          <div className="flex_c react_model_content_div">
            <div className="react_model_content">
              {/* <img src={photo} alt='image ... '
             className='statusmodle_image_contaier' /> */}
              {lists.map((item, index) => {
                if (item && item.imgstatus) {
                  return <StatusImage item={item} key={index} val={val} />;
                }
              })}
            </div>
          </div>
          <div className="statusmodule_button_div">
            <AiOutlineCloseCircle
              className="h1"
              style={{ color: "pink" }}
              onClick={() => closeModal()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelStatus;
