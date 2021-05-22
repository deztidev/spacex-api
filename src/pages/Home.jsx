import React, { Component } from "react";
import Card from "../components/Card.jsx";

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

  render() {
    return (
      <div className="cards-container">
        <h1 className="cards-container__titles cards-container__titles--titles1">
          Latest Launch
        </h1>
        <Card
          image={this.state.latest.links.patch.small}
          title={this.state.latest.name}
          details={this.state.latest.details}
          class={"contained-image"}
        />
        <h1 className="cards-container__titles cards-container__titles--titles2">
          Next Launch
        </h1>
        <Card
          image={this.state.next.links.patch.small}
          title={this.state.next.name}
          details={
            <>
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
            </>
          }
          class={"contained-image"}
        />
        <h1 className="cards-container__titles cards-container__titles--titles3">
          Latest Rocket Launched
        </h1>
        <Card
          image={this.state.latestRocket.flickr_images}
          title={this.state.latestRocket.name}
          details={this.state.latestRocket.description}
        />
        <h1 className="cards-container__titles cards-container__titles--titles4">
          Next Rocket to be launched
        </h1>
        <Card
          image={this.state.nextRocket.flickr_images}
          title={this.state.nextRocket.name}
          details={this.state.nextRocket.description}
        />
      </div>
    );
  }
}

export default Home;
