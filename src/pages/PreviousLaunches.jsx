import React, { Component } from "react";

import Card from "../components/Card";
import Modal from "../components/Modal";

class PreviousLaunches extends Component {
  state = {
    previous: [
      {
        links: {
          patch: {},
        },
        date_utc: "",
      },
    ],
    rockets: [],
    previousRocket: [{ flickr_images: [] }],
    index: 0,
    previousLaunchIsOpen: false,
  };

  async componentDidMount() {
    const response = await fetch("https://api.spacexdata.com/v4/launches/past");
    const previous = await response.json();
    this.setState({ previous: previous.reverse() });

    const rocketsResponse = await fetch(
      "https://api.spacexdata.com/v4/rockets"
    );
    const rockets = await rocketsResponse.json();
    this.setState({ rockets: rockets });

    const past = this.state.previous.map(past => past.rocket);

    const previousRocket = this.state.rockets.find(
      rocket => rocket.id == past[0]
    );
    this.setState({ previousRocket: previousRocket });

    console.log(this.state.previousRocket);
  }

  handlePreviousLaunch = i => {
    this.setState(state => ({
      previousLaunchIsOpen: !state.previousLaunchIsOpen,
      index: i,
    }));
  };

  render() {
    return (
      <>
        <div className="cards-container">
          {this.state.previous.map((previous, i) => (
            <Card key={i}>
              <img
                className={`container__image`}
                style={{ objectFit: "contain" }}
                src={previous.links.patch.small}
                alt={`${previous.name} image`}
              />
              <div className="container__info">
                <h2 className="container__title">{previous.name}</h2>
                <p className="container__paragraph">{previous.details}</p>
                <button
                  className="container__button"
                  onClick={() => this.handlePreviousLaunch(i)}
                >
                  View More
                </button>
              </div>
            </Card>
          ))}
        </div>
        {this.state.previousLaunchIsOpen ? (
          <Modal handleClick={this.handlePreviousLaunch}>
            <h2>{this.state.previous[this.state.index].name}</h2>
            <img
              className="modal__image"
              style={{ objectFit: "contain" }}
              src={this.state.previous[this.state.index].links.patch.small}
              alt={`${this.state.previous[this.state.index].name} image`}
            />
            <div className="info-container">
              <span className="info-container__items">
                <h3>Date</h3>
                {this.state.previous[this.state.index].date_utc.slice(0, 10)}
              </span>
              <span className="info-container__items">
                <h3>Success</h3>{" "}
                {this.state.previous[this.state.index].success ? (
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
                <h3>Flight Number</h3>
                {this.state.previous[this.state.index].flight_number}
              </span>
              <span className="info-container__items">
                <h3>Rocket</h3>
                {this.state.previousRocket}
              </span>
            </div>
            <p className="modal__paragraph">
              {this.state.previous[this.state.index].details}
            </p>
            <a
              href={this.state.previous[this.state.index].links.webcast}
              target="_blank"
            >
              <button className="modal__link-button">
                Watch it on youtube
              </button>
            </a>
          </Modal>
        ) : null}
      </>
    );
  }
}

export default PreviousLaunches;
