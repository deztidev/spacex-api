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
          <Card
            key={i}
            image={
              upcoming.links.patch.small ? upcoming.links.patch.small : logo
            }
            title={upcoming.name}
            details={
              <>
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
              </>
            }
            class={
              upcoming.links.patch.small ? "contained-image" : "logo-image"
            }
          />
        ))}
      </div>
    );
  }
}

export default NextLaunches;
