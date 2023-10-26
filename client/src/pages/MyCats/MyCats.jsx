import { useUserContext } from '../../contexts/userContext';
import { bubble as Menu } from 'react-burger-menu';
import './MyCats.css';
export default function MyCats() {
    // eslint-disable-next-line no-unused-vars
    const { currUser, setCurrUser } = useUserContext();
    console.log(currUser);
    return (
        <div>
            MyCats
            <div id='menu-wrapper'>
                <Menu outerContainerId={'menu-wrapper'}>
                    <a id='profile' className='menu-item' href='/'>
                        Profile
                    </a>
                    <a id='mycats' className='menu-item' href='/mycats'>
                        MY cats
                    </a>
                    <a id='Browsebreeds' className='menu-item' href='/contact'>
                        Browse breeds
                    </a>
                </Menu>
            </div>
        </div>
    );
}
