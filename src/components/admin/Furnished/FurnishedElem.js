import React, { useState } from "react";
import { RiDeleteBin6Line, RiDeleteBinFill } from "react-icons/ri";
import CheckOutSideClick from "../../../config/CheckOutSideClick";
import { useRef } from "react";
import { useEffect } from "react";

const FurnishedElem = ({
  handleDelete,
  curElem,
  count,
  handleUpdateEle,
  items,
  index,
  itemsFurnished,
  setItemsFurnished,
}) => {
  const [check, setCheck] = useState(true);
  console.log("state change", check);
  const [updateElem, setUpdateElem] = useState(false);
  const [elem, setEle] = useState(false);
  const myRef = useRef(null);
  const closeInputFild = () => {
    setUpdateElem(false);
  };

  const handleCountCheck = (ele) => {
    setEle(true);

    setCheck(true);
    console.log("handleCountCheck");
  };

  const handleAvilableCheck = (ele) => {
    setEle(true);
    setCheck(false);
    console.log("handleAvilableCheck");
  };
  useEffect(() => {
    // console.log("working here",check);

    if (elem === true) {
      const AllVal = [...itemsFurnished];

      AllVal.forEach((element, index) => {
        if (element.name === curElem) {
          // console.log("working here",check);

          if (check === true) {
            AllVal[index].count = 0;
            AllVal[index].isAvilable = null;
            console.log("count");
          } else {
            AllVal[index].count = null;
            AllVal[index].isAvilable = false;
            console.log("isAvilable");
          }
        }
      });
      setItemsFurnished(AllVal);
    }
  }, [check,elem]);
  return (
    <>
      <tr>
        <CheckOutSideClick onClickOutSide={closeInputFild}>
          <th scope="row" ref={myRef} onClick={() => setUpdateElem(true)}>
            {updateElem === true ? (
              <input
                value={items[index].name}
                className="FurnishedElem_InputFild"
                onChange={(e) => handleUpdateEle(e, curElem)}
              />
            ) : (
              <span>{curElem}</span>
            )}
          </th>
        </CheckOutSideClick>
        <td>
          <input
            type="checkbox"
            onChange={() => handleCountCheck(curElem)}
            checked={count === 0 ? true : false}
          />{" "}
        </td>
        <td>
          <input
            type="checkbox"
            onChange={() => handleAvilableCheck(curElem)}
            checked={count === 0 ? false : true}
          />{" "}
        </td>
        <td>
          <RiDeleteBin6Line
            id="furnised-delete-div"
            onClick={() => handleDelete(index)}
          />{" "}
        </td>
      </tr>
    </>
  );
};

export default FurnishedElem;
