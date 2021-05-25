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
          <Card key={i}>
            <img
              className={`container__image`}
              src={rocket.flickr_images}
              alt={`${rocket.name} image`}
            />
            <div className="container__info">
              <h2 className="container__title">{rocket.name}</h2>
              <p className="container__paragraph">{rocket.description}</p>
              <button className="container__button">View More</button>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

export default Rockets;
