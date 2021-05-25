import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__container">
        <button className="modal__close-button" onClick={props.handleClick}>
          X
        </button>
        {props.children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
