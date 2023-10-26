import { bubble as Menu } from "react-burger-menu";
import "./Navbar.css";

export default function Navbar() {
  return (
      <div id="menu-wrapper">
        <Menu outerContainerId={"menu-wrapper"}>
          <a id="profile" className="menu-item" href="/">
            Profile
          </a>
          <a id="mycats" className="menu-item" href="/mycats">
            MY cats
          </a>
          <a id="Browsebreeds" className="menu-item" href="/contact">
            Browse breeds
          </a>
        </Menu>
      </div>
  );
}
