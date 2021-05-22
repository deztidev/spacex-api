import React from "react";

const Card = props => {
  return (
    <div className="container">
      <img
        className={`container__image ${props.class}`}
        src={props.image}
        alt=""
      />
      <div className="container__info">
        <h2 className="container__title">{props.title}</h2>
        <p className="container__paragraph">{props.details}</p>
        <button className="container__button">View More</button>
      </div>
    </div>
  );
};

export default Card;
