import React from "react";

const NotFound = () => {
  return (
    <div className="error-container">
      <h1 className="error-container__title">404</h1>
      <span className="error-container__message">
        LOOKS LIKE YOU ARE <br /> <strong>LOST IN SPACE</strong>
      </span>
      <div className="box_astronaut">
        <img
          className="object_astronaut"
          src="http://salehriaz.com/404Page/img/astronaut.svg"
          width="140px"
        />
      </div>
      ;
    </div>
  );
};

export default NotFound;
