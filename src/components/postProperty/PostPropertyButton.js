import React from "react";
import { NavLink } from "react-router-dom";
import './css/PostPropertyButton.css';

function PostPropertyButton() {
  return (
    <NavLink to="/postproperty" >
      <button className="btn PostPropertyButton_btn " >
        Post Property
      </button>
    </NavLink>
  );
}

export default PostPropertyButton;
