import React, { Component } from "react";
import Card from "../components/Card";

class Rockets extends Component {
  state = {
    rockets: [
      {
        flickr_images: [],
      },
    ],
  };

  async componentDidMount() {
    const response = await fetch("https://api.spacexdata.com/v4/rockets");
    const rockets = await response.json();
    this.setState({ rockets: rockets });
    console.log(this.state.rockets);
  }

  render() {
    return (
      <div className="cards-container">
        {this.state.rockets.map((rocket, i) => (
          <Card
            key={i}
            title={rocket.name}
            details={rocket.description}
            image={rocket.flickr_images}
          />
        ))}
      </div>
    );
  }
}

export default Rockets;
