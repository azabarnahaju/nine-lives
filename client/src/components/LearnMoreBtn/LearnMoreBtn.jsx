import { Link } from "react-router-dom";
import "./LearnMoreBtn.css";

export default function LearnMoreBtn() {
    return (
      <Link to="/about">
        <button className="learn-more-btn" Link>
          Learn More
        </button>
      </Link>
    );
}