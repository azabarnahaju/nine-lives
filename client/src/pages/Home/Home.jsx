import LearnMoreBtn from '../../components/LearnMoreBtn/LearnMoreBtn';
import SignupBtn from '../../components/SignupBtn/SignupBtn';
import { BiSolidUser } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
      <div>
        <Link to="/login">
          <IconContext.Provider
            value={{
              color: "#554231",
              size: "4rem",
              className: "user-icon",
            }}
          >
            <div className="user-icon-container">
              <BiSolidUser />
            </div>
          </IconContext.Provider>
        </Link>
        <div className="home-container">
          <div className="home-text-container">
            <img
              className="home-logo"
              src="https://media.giphy.com/media/4TnHlUBm55QMzBLvq6/giphy.gif"
            />
            <h1 className="home-title">nine lives</h1>
            <h4 className="home-motto">Caring for cats one click at a time</h4>
            <div className='home-page-buttons-container'>
              <Link to="/about">
                <LearnMoreBtn />
              </Link>
              <SignupBtn />
            </div>
          </div>
          <img
            className="home-img"
            src="https://i.pinimg.com/564x/70/ca/d0/70cad0fa8f57a426ce7ca29b35d4bc6b.jpg"
            alt="cat"
          />
        </div>
      </div>
    );
}
