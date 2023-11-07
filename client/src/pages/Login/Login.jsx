/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
import { useState } from 'react';
import { useUserContext } from '../../contexts/userContext';

export default function Login() {
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);
    const { currUser, setCurrUser } = useUserContext();
    const navigate = useNavigate();
    const fetchUser = async () => {
        try {
            const userData = await fetch(
                `http://localhost:4000/api/v1/users/${username}`
            );
            const user = await userData.json();
            if (user) {
                setCurrUser(user);
                navigate('/mycats');
            }
        } catch (err) {
            console.log(err);
        }
    };
    const setUser = (e) => {
        e.preventDefault();
        fetchUser();
    };

    return (
      <div>
        <div className="login-home-icon">
          <Link to="/home">
            <IconContext.Provider
              value={{
                color: "#554231",
                size: "4rem",
              }}
            >
              <AiFillHome />
            </IconContext.Provider>
          </Link>
        </div>
        <form className="login-form">
          <IconContext.Provider
            value={{
              color: "#554231",
              size: "8rem",
              className: "login-icon",
            }}
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
          <button className="login-btn" onClick={setUser}>
            Log in
          </button>
        </form>
      </div>
    );
}
