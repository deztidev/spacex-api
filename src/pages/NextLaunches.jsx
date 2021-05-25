import React, { Component } from "react";
import Card from "../components/Card.jsx";

import logo from "../assets/images/SpaceX-Logo.png";

class NextLaunches extends Component {
  state = {
    upcoming: [
      {
        links: {
          patch: {},
        },
      },
    ],
  };

  async componentDidMount() {
    const response = await fetch(
      "https://api.spacexdata.com/v4/launches/upcoming"
    );
    const upcoming = await response.json();
    this.setState({ upcoming: upcoming });
  }

  render() {
    return (
      <div className="cards-container">
        {this.state.upcoming.map((upcoming, i) => (
          <Card key={i}>
            <img
              className={"container__image"}
              style={
                upcoming.links.patch.small
                  ? { objectFit: "contain" }
                  : {
                      position: "relative",
                      left: "2%",
                      filter: "brightness(0)",
                    }
              }
              src={
                upcoming.links.patch.small ? upcoming.links.patch.small : logo
              }
              alt={`${upcoming.name} image`}
            />
            <div style={{ display: "initial" }} className="container__info">
              <h2
                style={{ marginTop: 20, marginBottom: 20 }}
                className="container__title"
              >
                {upcoming.name}
              </h2>
              <p className="container__paragraph">
                Date UTC: {upcoming.date_utc} <br />
                Date precision: {upcoming.date_precision} <br />
                Flight Number: {upcoming.flight_number} <br />
                {upcoming.links.wikipedia && (
                  <>
                    Wikipedia:{" "}
                    <a href={upcoming.links.wikipedia}>
                      {upcoming.links.wikipedia}
                    </a>
                  </>
                )}
              </p>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

export default NextLaunches;
