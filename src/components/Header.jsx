import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/SpaceX-Logo.png";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__navbar">
        <Link className="header__link-logo" to="/">
          <img className="header__logo" src={logo} alt="SpaceX logo" />
        </Link>
        <ul className="header__ul">
          <li className="header__items">
            <Link to="">PREVIOUS LAUNCHES</Link>
          </li>
          <li className="header__items">
            <Link to="">ROCKETS</Link>
          </li>
          <li className="header__items">
            <Link to="">NEXT LAUNCHES</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
