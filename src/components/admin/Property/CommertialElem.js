import React, { useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";

const CommertialElem = ({
  curElem,
  handleDelete,
  eleId,
  handleSelectItem,
  subCommertialType,
  subItems,
  index,
  items,
  handleUpdateEle,
  elemName,
  subTitle
}) => {
  // console.log("index", index);

  // console.log("items[index].name--->", items[index].name);
  const [updateElem, setUpdateElem] = useState(false);

  const myRef = useRef();
  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setUpdateElem(false);
    }
  };
  const handleClickInside = () => {
    setUpdateElem(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div
      style={{ position: "relative" }}
      ref={myRef}
      onClick={handleClickInside}
    >
      <div
        className={`residential_container_details_div ${
          subCommertialType && subCommertialType.name == curElem
            ? "residential_selectItem"
            : undefined
        }`}
        onClick={() => handleSelectItem(subItems, curElem,subTitle)}
      >
        {updateElem === true ? (
          <input
            value={items[index].name}
            className={`residential_InputFild ${
              subCommertialType && subCommertialType._id === eleId
                ? "residential_selectItem"
                : undefined
            }`}
            onChange={(e) => handleUpdateEle(e, eleId, elemName)}
          />
        ) : (
          <span>{curElem}</span>
        )}
      </div>
      <MdCancel
        className={`residential_hover_div ${
          subCommertialType && subCommertialType._id == eleId
            ? "residential_hover_divs"
            : undefined
        }`}
        onClick={() => handleDelete(curElem)}
      />
    </div>
  );
};

export default CommertialElem;
// residential_selectItem
