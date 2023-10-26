import "./Icons.css";
import {HiOutlineDocumentText} from "react-icons/hi"
import { IconContext } from "react-icons/lib";
import { BsHeartPulseFill } from "react-icons/bs";
import {HiMagnifyingGlassCircle} from "react-icons/hi2";
import { FaCat, FaPaw, FaSyringe } from "react-icons/fa";


const icon = function (text, iconUrl) {
  return (
    <div className="icon-container">
      <div className="icon-bg">
        <IconContext.Provider value={{ color: "#554231", size: "4rem" }}>
          {iconUrl}
        </IconContext.Provider>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default function Icons() {
  return (
    <div class="icons-container">
        {icon(
          "Create a profile for all of your cats",
          <HiOutlineDocumentText />
        )}
        {icon("Monitor health records and conditions", <BsHeartPulseFill />)}
        {icon("Log symptoms for early detection", <HiMagnifyingGlassCircle />)}
        {icon(
          "Explore detailed breed profiles and learn about potential health risks",
          <FaCat />
        )}
        {icon(" Track vet visits", <FaPaw />)}
        {icon(
          "Ensure your cat's continued health with a simple vaccination and treatment management system",
          <FaSyringe />
        )}
    </div>
  );
}
