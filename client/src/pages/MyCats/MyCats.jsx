import { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { bubble as Menu } from 'react-burger-menu';
import './MyCats.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Logout from '../../components/LogoutBtn/Logout';
import PageTitle from '../../components/PageTitle/PageTitle';
import ProfileLogo from '../../components/ProfileLogo/ProfileLogo';
import AddACatBtn from '../../components/AddACatBtn/AddACatBtn';

export default function MyCats() {
    // eslint-disable-next-line no-unused-vars
    const { currUser, setCurrUser } = useUserContext();
    const [userCats, setUserCats] = useState(false);
    useEffect(() => {
        const getCats = async () => {
            try {
                const catData = await fetch(
                    'http://localhost:4000/api/v1/cats'
                );
                const cats = await catData.json();
                setUserCats(cats);
            } catch (err) {
                toast.error(err, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        };
        getCats();
    }, []);
    return (
        <div className='cats-parent-container'>
            <AddACatBtn />
            <Logout />
            <ToastContainer
                position='top-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />

            <div className='home-text-container'>
                <PageTitle />
            </div>
            <Navbar />
            {userCats ? (
                <div className='cats-container'>
                    {userCats.map((cat) => (
                        <div key={cat._id} className='cat-modal'>
                            <h1>{cat.name}</h1>
                            <span>
                                {Math.floor(
                                    (Date.now() - new Date(cat.birth)) /
                                        (1000 * 60 * 60 * 24 * 365)
                                )}{' '}
                                years old
                            </span>
                            <hr></hr>
                            <Link to={`/mycats/${cat._id}`}>
                                Show Cat Profile
                            </Link>
                            <Link to='/catprofile'>Log Vet Visit</Link>
                            <Link to='/catprofile'>Log Health Record</Link>
                        </div>
                    ))}
                </div>
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    );
}
