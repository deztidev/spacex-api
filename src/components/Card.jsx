import React from "react";

import background from "../assets/images/background-big.png";

const Card = () => {
  return (
    <div className="container">
      <img className="container__image" src={background} alt="" />
      <h2 className="container__title">Title</h2>
      <p className="container__paragraph">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error quia
        etur adipisicing elit. Error quia etur adipisicing elit. Error quiaetur
        adipisicing elit. Error quia
      </p>
      <button className="container__button">View More</button>
    </div>
  );
};

export default Card;
