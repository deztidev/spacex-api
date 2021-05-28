import React, { Component } from "react";

import Card from "../components/Card";
import Modal from "../components/Modal";

class Rockets extends Component {
  state = {
    rockets: [
      {
        height: {},
      },
    ],
    rocketIsOpen: false,
  };

  async componentDidMount() {
    const response = await fetch("https://api.spacexdata.com/v4/rockets");
    const rockets = await response.json();
    this.setState({ rockets: rockets });
    console.log(this.state.rockets.height);
  }

  handleRocket = i => {
    this.setState(state => ({
      rocketIsOpen: !state.rocketIsOpen,
      index: i,
    }));
  };

  render() {
    return (
      <>
        <div className="cards-container">
          {this.state.rockets.map((rocket, i) => (
            <Card key={i}>
              <img
                className={`container__image`}
                src={rocket.flickr_images}
                alt={`${rocket.name} image`}
              />
              <div className="container__info">
                <h2 className="container__title">{rocket.name}</h2>
                <p className="container__paragraph">{rocket.description}</p>
                <button
                  className="container__button"
                  onClick={() => this.handleRocket(i)}
                >
                  View More
                </button>
              </div>
            </Card>
          ))}
        </div>
        {this.state.rocketIsOpen ? (
          <Modal handleClick={this.handleRocket}>
            <h2>{this.state.rockets.name}</h2>
            <img
              className={"modal__image"}
              src={this.state.rockets.flickr_images}
              alt={`${this.state.rockets.name} image`}
            />
            <div className="info-container" style={{ flexWrap: "wrap" }}>
              <span className="info-container__items">
                <h3>Height</h3>
                {this.state.rockets.height} meters
              </span>
              <span className="info-container__items">
                <h3>Diameter</h3>
                {this.state.rockets.diameter} meters
              </span>
              <span className="info-container__items">
                <h3>Mass</h3>
                {this.state.rockets.mass} kg
              </span>
              <span className="info-container__items">
                <h3>First Flight</h3>
                {this.state.rockets.first_flight}
              </span>
              <span className="info-container__items">
                <h3>Active</h3>{" "}
                {this.state.rockets.active ? (
                  <span role="image" aria-label="true icon">
                    ✅
                  </span>
                ) : (
                  <span role="image" aria-label="false icon">
                    ❌
                  </span>
                )}
              </span>
              <span className="info-container__items">
                <h3>Cost per Launch</h3>$
                {this.state.rockets.cost_per_launch / 1000000} millions
              </span>
            </div>
            <p className="modal__paragraph">{this.state.rockets.description}</p>
            <button className="modal__link-button">
              Learn More on Wikipedia
            </button>
          </Modal>
        ) : null}
      </>
    );
  }
}

export default Rockets;
