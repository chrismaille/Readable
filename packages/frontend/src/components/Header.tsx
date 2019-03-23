import * as React from "react";
import { FaEdit, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const Header: React.FC = () => (
  <header className="App-header">
    <ReactTooltip />
    <a className="home-icon" href="/">
      <FaHome data-tip={"Go to Home"} />
    </a>
    <div className="title">Readable</div>
    <Link className="new-post-icon" to="/new">
      <FaEdit data-tip={"Create new post"} />
    </Link>
  </header>
);

export default Header;
