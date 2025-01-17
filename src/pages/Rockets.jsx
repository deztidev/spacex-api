import React, { Component } from "react";

import Loader from "../components/Loader.jsx";
import Card from "../components/Card.jsx";
import Modal from "../components/Modal.jsx";

class Rockets extends Component {
  state = {
    rockets: [{ flickr_images: [] }],
    rocketIsOpen: false,
    index: 0,
    indexImage: 0,
  };

  async componentDidMount() {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch("https://api.spacexdata.com/v4/rockets");
      const rockets = await response.json();
      this.setState({ loading: false, rockets: rockets });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  handleRocket = i => {
    this.setState(state => ({
      rocketIsOpen: !state.rocketIsOpen,
      index: i,
    }));
  };

  handlePreviousImage = length => {
    if (this.state.indexImage == 0) {
      this.setState(state => ({
        indexImage: (state.indexImage = length - 1),
      }));
    } else {
      this.setState(state => ({
        indexImage: state.indexImage - 1,
      }));
    }
  };

  handleNextImage = length => {
    if (this.state.indexImage == length - 1) {
      this.setState(() => ({
        indexImage: 0,
      }));
    } else {
      this.setState(state => ({
        indexImage: state.indexImage + 1,
      }));
    }
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <>
        <div className="cards-container less-margin">
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
            <h2>{this.state.rockets[this.state.index].name}</h2>
            <span
              onClick={() =>
                this.handlePreviousImage(
                  this.state.rockets[this.state.index].flickr_images.length
                )
              }
              className="modal__arrows"
              id="left-arrow"
            >
              &#8249;
            </span>
            <img
              className={"modal__image"}
              src={
                this.state.rockets[this.state.index].flickr_images[
                  this.state.indexImage
                ]
              }
              alt={`${this.state.rockets[this.state.index].name} image`}
            />
            <span
              onClick={() =>
                this.handleNextImage(
                  this.state.rockets[this.state.index].flickr_images.length
                )
              }
              className="modal__arrows"
              id="right-arrow"
            >
              &#8250;
            </span>
            <div className="info-container" style={{ flexWrap: "wrap" }}>
              <span className="info-container__items">
                <h3>Height</h3>
                {this.state.rockets[this.state.index].height.meters} meters
              </span>
              <span className="info-container__items">
                <h3>Diameter</h3>
                {this.state.rockets[this.state.index].diameter.meters} meters
              </span>
              <span className="info-container__items">
                <h3>Mass</h3>
                {this.state.rockets[this.state.index].mass.kg} kg
              </span>
              <span className="info-container__items">
                <h3>First Flight</h3>
                {this.state.rockets[this.state.index].first_flight}
              </span>
              <span className="info-container__items">
                <h3>Active</h3>{" "}
                {this.state.rockets[this.state.index].active ? (
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
                {this.state.rockets[this.state.index].cost_per_launch / 1000000}{" "}
                millions
              </span>
            </div>
            <p className="modal__paragraph">
              {this.state.rockets[this.state.index].description}
            </p>
            <a
              href={this.state.rockets[this.state.index].wikipedia}
              target="_blank"
            >
              <button className="modal__link-button">
                Learn More on Wikipedia
              </button>
            </a>
          </Modal>
        ) : null}
      </>
    );
  }
}

export default Rockets;
