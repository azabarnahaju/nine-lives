/* eslint-disable no-unused-vars */
import { useUserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { GrPower } from 'react-icons/gr';
import './Logout.css';
export default function Logout() {
    const { currUser, setCurrUser } = useUserContext();
    const navigate = useNavigate();
    const handleClick = () => {
        setCurrUser(null);
        navigate('/home');
    };

    return (
        <button className='logout-btn' onClick={handleClick}>
          Logout
        </button>
    );
}
