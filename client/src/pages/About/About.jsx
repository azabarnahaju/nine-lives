import Icons from "../../components/About/Icons";
import "./About.css";
import {Link} from "react-router-dom";
import { IconContext } from "react-icons/lib";
import {AiFillHome} from "react-icons/ai";
import {BiSolidUser} from "react-icons/bi";

export default function About() {
  return (
    <div className="main-div">
      <Link to="/home">
        <IconContext.Provider
          value={{ color: "#554231", size: "4rem", className: "login-icon" }}
        >
          <AiFillHome />
        </IconContext.Provider>
      </Link>
      <Link to="/login">
        <IconContext.Provider
          value={{ color: "#554231", size: "3rem", className: "user-icon" }}
        >
          <div className="user-icon-container">
            <BiSolidUser />
          </div>
        </IconContext.Provider>
      </Link>
      <h1>How it works?</h1>
      <Icons />
    </div>
  );
}
