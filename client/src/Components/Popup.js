import React from "react";
import "./Popup.css";

const Popup = (props) => {
  return (
    <div className={`popup-box ${props.className}`}>
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
