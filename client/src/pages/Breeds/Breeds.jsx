import { useEffect, useState } from 'react';
import './Breeds.css';
import ProfileLogo from '../../components/ProfileLogo/ProfileLogo';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useNavigate,Link } from 'react-router-dom';
import BackBtn from '../../components/BackBtn/BackBtn';
import Navbar from '../../components/Navbar/Navbar';
export default function Breeds() {
    const [catBreeds, setCatBreeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await fetch(
                    'https://api.thecatapi.com/v1/breeds'
                );
                const catBreedsData = await response.json();
                setCatBreeds(catBreedsData);
                setIsLoading(!isLoading);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBreeds();
    }, []);

    if (isLoading) return <h1>Loading...</h1>;

    return (
        <>
            <Navbar />
            <BackBtn path={'/mycats'} />
            <div className='home-text-container'>
                <ProfileLogo />
                <PageTitle title={'Breeds'} />
            </div>{' '}
            <div className='breed-container'>
                {catBreeds.map((breed) => {
                    return (
                        <button
                            key={breed.id}
                            onClick={() => navigate(`/breeds/${breed.id}`)}
                            className='breed-card'
                        >
                            <img
                                src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`}
                                width='250'
                                height='250'
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        'https://cdn2.thecatapi.com/images/dN6eoeLjY.jpg';
                                }}
                            />
                            <h1>{breed.name}</h1>
                        </button>
                    );
                })}
            </div>
        </>
    );
}
