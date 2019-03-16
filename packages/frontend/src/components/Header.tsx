import * as React from "react";
import { FaEdit } from "react-icons/fa";
import logoSvg from "../logo.svg";

const Header = () => (
  <header className="App-header">
    <img src={logoSvg} className="App-logo" alt="logo" />
    <div className="title">Readable</div>
    <div className={"new-post-icon"}>
      <FaEdit />
    </div>
  </header>
);

export default Header;
