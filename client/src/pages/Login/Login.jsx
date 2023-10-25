import {Link} from "react-router-dom";
import "./Login.css";
import { AiFillHome } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { useState } from "react";

export default function Login(){
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);

    return (
      <div>
        <Link to="/home">
          <IconContext.Provider
            value={{ color: "#554231", size: "4rem", className: "login-icon" }}
          >
            <AiFillHome />
          </IconContext.Provider>
        </Link>

        <form className="login-form">
          <IconContext.Provider
            value={{ color: "#554231", size: "8rem", className: "login-icon" }}
          >
            <BiSolidUser />
          </IconContext.Provider>
          <div className="input-container">
            <input
              className="username-input"
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="password-input"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-btn">Log in</button>
        </form>
      </div>
    );
}
