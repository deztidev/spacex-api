import React from "react";

import "../assets/styles/pages/_NotFound.scss";

const NotFound = () => {
  return (
    <div className="404-container">
      <h1 className="404-container__title">404</h1>
      <span className="404-container__message">
        Looks like you lost in space
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
