import { Link } from "react-router-dom";
import "./Signup.css";
import { AiFillHome } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { IconContext } from "react-icons/lib";

export default function Login() {
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
          />
          <input
            className="password-input"
            type="password"
            placeholder="password"
          />
          <input
            className="email-input"
            type="email"
            placeholder="email"
          />
        </div>
        <button className="signup-submit-btn">Sign up</button>
      </form>
    </div>
  );
}
