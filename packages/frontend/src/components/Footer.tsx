import * as React from "react";
import { FaGithub } from "react-icons/fa";
import logoSvg from "../logo.svg";

const Footer = () => (
  <section className="footer">
    <div className="footer-line">
      <img src={logoSvg} className="App-logo" alt="react logo" />
      <span>Made with React</span>
    </div>
    <div className="footer-line">
      <FaGithub className="footer-icon" />
      <a href={"https://github.com/chrismaille/Readable"}>Github page</a>
    </div>
  </section>
);
export default Footer;
