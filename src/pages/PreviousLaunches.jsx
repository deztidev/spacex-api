import React, { Component } from "react";
import Card from "../components/Card.jsx";

class PreviousLaunches extends Component {
  state = {
    previous: [
      {
        links: {
          patch: {},
        },
      },
    ],
  };

  async componentDidMount() {
    const response = await fetch("https://api.spacexdata.com/v4/launches/past");
    const previous = await response.json();
    this.setState({ previous: previous.reverse() });
  }

  render() {
    return (
      <div className="cards-container">
        {this.state.previous.map((previous, i) => (
          <Card
            key={i}
            image={previous.links.patch.small}
            title={previous.name}
            details={previous.details}
            class="contained-image"
          />
        ))}
      </div>
    );
  }
}

export default PreviousLaunches;
