import React, { Component } from "react";

import Card from "../components/Card.jsx";
import Modal from "../components/Modal.jsx";

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
    },
    rockets: [],
    latestRocket: [{ flickr_images: [] }],
    nextRocket: [{ flickr_images: [] }],
    latestLaunchIsOpen: false,
    latestRocketIsOpen: false,
    nextRocketIsOpen: false,
  };

  async componentDidMount() {
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

    this.setState({ nextRocket: nextRocket });
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
              className={"modal__image"}
              src={this.state.latest.links.patch.small}
              alt={`${this.state.latest.name} image`}
            />
            <p>{this.state.latest.details}</p>
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
                    position: "relative",
                    left: "2%",
                    filter: "brightness(0)",
                  }
            }
            src={this.state.next.links.patch.small}
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
              Date UTC: {this.state.next.date_utc} <br />
              Date precision: {this.state.next.date_precision} <br />
              Flight Number: {this.state.next.flight_number} <br />
              {this.state.next.links.wikipedia && (
                <>
                  Wikipedia:{" "}
                  <a href={this.state.next.links.wikipedia}>
                    {this.state.next.links.wikipedia}
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
            <h2>{this.state.latest.name}</h2>
            <img
              className={"modal__image"}
              src={this.state.latest.links.patch.small}
              alt={`${this.state.latest.name} image`}
            />
            <p>{this.state.latest.details}</p>
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
            <h2>{this.state.latest.name}</h2>
            <img
              className={"modal__image"}
              src={this.state.latest.links.patch.small}
              alt={`${this.state.latest.name} image`}
            />
            <p>{this.state.latest.details}</p>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Home;
