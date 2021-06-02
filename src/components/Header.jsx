import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/spacex-logo.png";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="header__navbar">
          <Link className="header__link-logo" to="/">
            <img className="header__logo" src={logo} alt="SpaceX logo" />
          </Link>
          <ul className="header__ul">
            <li className="header__items">
              <Link to="/previous-launches" id="previous">
                PREVIOUS LAUNCHES
              </Link>
            </li>
            <li className="header__items">
              <Link to="/rockets" id="rockets">
                ROCKETS
              </Link>
            </li>
            <li className="header__items">
              <Link to="/next-launches" id="next">
                NEXT LAUNCHES
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
