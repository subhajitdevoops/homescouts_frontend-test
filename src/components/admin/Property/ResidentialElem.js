import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { MdCancel } from "react-icons/md";

const ResidentialElem = ({
  curElem,
  handleDelete,
  id,
  handleUpdateEle,
  items,
  index,
}) => {
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
    <div style={{ position: "relative" }}>
      <div
        className="residential_container_details_div"
        ref={myRef}
        onClick={handleClickInside}
      >
        {updateElem === true ? (
          <input
            value={items[index].name}
            className="residential_InputFild"
            onChange={(e) => handleUpdateEle(e, id)}
          />
        ) : (
          <span>{curElem}</span>
        )}
      </div>
      <MdCancel
        className="residential_hover_div"
        onClick={() => handleDelete(id)}
      />
    </div>
  );
};

export default ResidentialElem;
