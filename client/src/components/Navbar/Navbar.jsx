import { bubble as Menu } from "react-burger-menu";
import "./Navbar.css";
import { useUserContext } from "../../contexts/userContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { currUser, setCurrUser } = useUserContext();
  return (
    <div id="menu-wrapper">
      <Menu>
        <Link to={`/profile/${currUser._id}`} className="menu-item">
          Profile
        </Link>
        <Link to={`/mycats`} className="menu-item">
          My cats
        </Link>
        <Link to={`/breeds`} className="menu-item">
          Browse breeds
        </Link>
      </Menu>
    </div>
  );
}
