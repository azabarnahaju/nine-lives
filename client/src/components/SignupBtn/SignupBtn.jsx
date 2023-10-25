import { Link } from "react-router-dom";
import "./SignupBtn.css";

export default function SignupBtn() {
  return (
    <Link to="/signup">
      <button className="signup-btn">Sign up</button>
    </Link>
  );
}
