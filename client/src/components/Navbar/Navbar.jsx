import { bubble as Menu } from 'react-burger-menu';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/userContext';

export default function Navbar() {
    const { currUser, setCurrUser } = useUserContext();
    return (
        <div id='menu-wrapper'>
            <Menu outerContainerId={'menu-wrapper'}>
                <Link to={`/profile/${currUser._id}`} className='menu-item'>
                    Profile
                </Link>
                <Link to={`/mycats`} className='menu-item'>
                    MY cats
                </Link>
                <Link to={`/breeds`} className='menu-item'>
                    Browse breeds
                </Link>
            </Menu>
        </div>
    );
}
