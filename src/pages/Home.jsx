import React, { Component } from "react";

import Loader from "../components/Loader.jsx";
import Card from "../components/Card.jsx";
import Modal from "../components/Modal.jsx";

import logo from "../assets/images/spacex-logo.png";

class Home extends Component {
  state = {
    latest: {
      links: {
        patch: {},
      },
    },
    next: {
      links: {
        patch: {},
      },
      date_utc: "",
    },
    rockets: [],
    latestRocket: [{ flickr_images: [] }],
    nextRocket: [{ flickr_images: [] }],
    latestLaunchIsOpen: false,
    latestRocketIsOpen: false,
    nextRocketIsOpen: false,
  };

  async componentDidMount() {
    this.setState({ loading: true, error: null });

    try {
      const latestResponse = await fetch(
        "https://api.spacexdata.com/v4/launches/latest"
      );
      const latest = await latestResponse.json();
      this.setState({ latest: latest });

      const nextResponse = await fetch(
        "https://api.spacexdata.com/v4/launches/next"
      );
      const next = await nextResponse.json();
      this.setState({ next: next });

      const rocketsResponse = await fetch(
        "https://api.spacexdata.com/v4/rockets"
      );
      const rockets = await rocketsResponse.json();
      this.setState({ rockets: rockets });

      const latestRocket = this.state.rockets.find(
        rocket => rocket.id == this.state.latest.rocket
      );
      this.setState({ latestRocket: latestRocket });

      const nextRocket = this.state.rockets.find(
        rocket => rocket.id == this.state.next.rocket
      );
      this.setState({ loading: false, nextRocket: nextRocket });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  handleLatestLaunch = () => {
    this.setState(state => ({
      latestLaunchIsOpen: !state.latestLaunchIsOpen,
    }));
  };

  handleLatestRocket = () => {
    this.setState(state => ({
      latestRocketIsOpen: !state.latestRocketIsOpen,
    }));
  };

  handleNextRocket = () => {
    this.setState(state => ({
      nextRocketIsOpen: !state.nextRocketIsOpen,
    }));
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    } else if (this.state.error) {
      return <h1>{this.state.error.message}</h1>;
    }
    return (
      <div className="cards-container">
        <h1 className="cards-container__titles cards-container__titles--titles1">
          Latest Launch
        </h1>
        <Card>
          <img
            className={`container__image`}
            style={{ objectFit: "contain" }}
            src={this.state.latest.links.patch.small}
            alt={`${this.state.latest.name} image`}
          />
          <div className="container__info">
            <h2 className="container__title">{this.state.latest.name}</h2>
            <p className="container__paragraph">{this.state.latest.details}</p>
            <button
              className="container__button"
              onClick={this.handleLatestLaunch}
            >
              View More
            </button>
          </div>
        </Card>
        {this.state.latestLaunchIsOpen ? (
          <Modal handleClick={this.handleLatestLaunch}>
            <h2>{this.state.latest.name}</h2>
            <img
              className="modal__image"
              style={{ objectFit: "contain" }}
              src={this.state.latest.links.patch.small}
              alt={`${this.state.latest.name} image`}
            />
            <div className="info-container">
              <span className="info-container__items">
                <h3>Date</h3>
                {this.state.latest.date_utc.slice(0, 10)}
              </span>
              <span className="info-container__items">
                <h3>Success</h3>{" "}
                {this.state.latest.success ? (
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
                {this.state.latest.flight_number}
              </span>
              <span className="info-container__items">
                <h3>Rocket</h3>
                {this.state.latestRocket.name}
              </span>
            </div>
            <p className="modal__paragraph">{this.state.latest.details}</p>
            <a href={this.state.latest.links.webcast} target="_blank">
              <button className="modal__link-button">
                Watch it on youtube
              </button>
            </a>
          </Modal>
        ) : null}
        <h1 className="cards-container__titles cards-container__titles--titles2">
          Next Launch
        </h1>
        <Card>
          <img
            className={`container__image`}
            style={
              this.state.next.links.patch.small
                ? { objectFit: "contain" }
                : {
                    objectFit: "contain",
                    position: "relative",
                    left: "2%",
                    filter: "brightness(0)",
                  }
            }
            src={
              this.state.next.links.patch.small
                ? this.state.next.links.patch.small
                : logo
            }
            alt={`${this.state.next.name} image`}
          />
          <div style={{ display: "initial" }} className="container__info">
            <h2
              style={{ marginTop: 20, marginBottom: 20 }}
              className="container__title"
            >
              {this.state.next.name}
            </h2>
            <p className="container__paragraph">
              Date UTC: {this.state.next.date_utc.slice(0, 19)} <br />
              Date Precision: {this.state.next.date_precision} <br />
              Flight Number: {this.state.next.flight_number} <br />
              {this.state.next.links.wikipedia && (
                <>
                  Wikipedia:{" "}
                  <a href={this.state.next.links.wikipedia} target="_blank">
                    {this.state.next.links.wikipedia}
                  </a>{" "}
                  <br />
                </>
              )}
              {this.state.next.links.webcast && (
                <>
                  Webcast:{" "}
                  <a href={this.state.next.links.webcast} target="_blank">
                    {this.state.next.links.webcast}
                  </a>
                </>
              )}
            </p>
          </div>
        </Card>
        <h1 className="cards-container__titles cards-container__titles--titles3">
          Latest Rocket Launched
        </h1>
        <Card>
          <img
            className={`container__image`}
            src={this.state.latestRocket.flickr_images}
            alt={`${this.state.latestRocket.name} image`}
          />
          <div className="container__info">
            <h2 className="container__title">{this.state.latestRocket.name}</h2>
            <p className="container__paragraph">
              {this.state.latestRocket.description}
            </p>
            <button
              className="container__button"
              onClick={this.handleLatestRocket}
            >
              View More
            </button>
          </div>
        </Card>
        {this.state.latestRocketIsOpen ? (
          <Modal handleClick={this.handleLatestRocket}>
            <h2>{this.state.latestRocket.name}</h2>
            <img
              className={"modal__image"}
              src={this.state.latestRocket.flickr_images}
              alt={`${this.state.latestRocket.name} image`}
            />
            <div className="info-container" style={{ flexWrap: "wrap" }}>
              <span className="info-container__items">
                <h3>Height</h3>
                {this.state.latestRocket.height.meters} meters
              </span>
              <span className="info-container__items">
                <h3>Diameter</h3>
                {this.state.latestRocket.diameter.meters} meters
              </span>
              <span className="info-container__items">
                <h3>Mass</h3>
                {this.state.latestRocket.mass.kg} kg
              </span>
              <span className="info-container__items">
                <h3>First Flight</h3>
                {this.state.latestRocket.first_flight}
              </span>
              <span className="info-container__items">
                <h3>Active</h3>{" "}
                {this.state.latestRocket.active ? (
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
                {this.state.latestRocket.cost_per_launch / 1000000} millions
              </span>
            </div>
            <p className="modal__paragraph">
              {this.state.latestRocket.description}
            </p>
            <a href={this.state.latestRocket.wikipedia} target="_blank">
              <button className="modal__link-button">
                Learn More on Wikipedia
              </button>
            </a>
          </Modal>
        ) : null}
        <h1 className="cards-container__titles cards-container__titles--titles4">
          Next Rocket to be launched
        </h1>
        <Card>
          <img
            className={`container__image`}
            src={this.state.nextRocket.flickr_images}
            alt={`${this.state.nextRocket.name} image`}
          />
          <div className="container__info">
            <h2 className="container__title">{this.state.nextRocket.name}</h2>
            <p className="container__paragraph">
              {this.state.nextRocket.description}
            </p>
            <button
              className="container__button"
              onClick={this.handleNextRocket}
            >
              View More
            </button>
          </div>
        </Card>
        {this.state.nextRocketIsOpen ? (
          <Modal handleClick={this.handleNextRocket}>
            <h2>{this.state.nextRocket.name}</h2>
            <img
              className={"modal__image"}
              src={this.state.nextRocket.flickr_images}
              alt={`${this.state.nextRocket.name} image`}
            />
            <div className="info-container" style={{ flexWrap: "wrap" }}>
              <span className="info-container__items">
                <h3>Height</h3>
                {this.state.nextRocket.height.meters} meters
              </span>
              <span className="info-container__items">
                <h3>Diameter</h3>
                {this.state.nextRocket.diameter.meters} meters
              </span>
              <span className="info-container__items">
                <h3>Mass</h3>
                {this.state.nextRocket.mass.kg} kg
              </span>
              <span className="info-container__items">
                <h3>First Flight</h3>
                {this.state.nextRocket.first_flight}
              </span>
              <span className="info-container__items">
                <h3>Active</h3>{" "}
                {this.state.nextRocket.active ? (
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
                {this.state.nextRocket.cost_per_launch / 1000000} millions
              </span>
            </div>
            <p className="modal__paragraph">
              {this.state.nextRocket.description}
            </p>
            <a href={this.state.nextRocket.wikipedia} target="_blank">
              <button className="modal__link-button">
                Learn More on Wikipedia
              </button>
            </a>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Home;
