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
              <button className="container__button">View More</button>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

export default PreviousLaunches;
