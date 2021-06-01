import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__main">Made with &#9829; by Martiniano Sanchi</p>
      <div>
        <a className="footer__icons" href="https://deztidev.github.io/SpaceX/">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          className="footer__icons"
          href="https://www.linkedin.com/in/martiniano-sanchi/"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
