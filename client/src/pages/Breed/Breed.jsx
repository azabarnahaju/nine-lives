import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProfileLogo from '../../components/ProfileLogo/ProfileLogo';
import PageTitle from '../../components/PageTitle/PageTitle';
import './Breed.css';
//https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=live_Rnqbekm4oLMUVmPAV6NnTVescxXXDjZwl9uMURztpfzWE2tUb7Ra6lhcfSWznKHJ
export default function Breed() {
    const [catBreedDetails, setCatBreedDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { breedname } = useParams();

    useEffect(() => {
        const fetchBreed = async () => {
            try {
                const response = await fetch(
                    `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${breedname}&api_key=live_Rnqbekm4oLMUVmPAV6NnTVescxXXDjZwl9uMURztpfzWE2tUb7Ra6lhcfSWznKHJ`
                );
                const catBreedData = await response.json();
                setCatBreedDetails(...catBreedData);
                setIsLoading(!isLoading);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBreed();
    }, []);
    if (isLoading) return <h1>Loading...</h1>;
    const {
        adaptability,
        affection_level,
        alt_names,
        child_friendly,
        description,
        dog_friendly,
        energy_level,
        experimental,
        grooming,
        hairless,
        health_issues,
        hypoallergenic,
        indoor,
        intelligence,
        life_span,
        natural,
        name,
        origin,
        rare,
        shedding_level,
        social_needs,
        stranger_friendly,
        temperament,
        vocalisation,
        wikipedia_url,
    } = catBreedDetails.breeds[0];
    return (
        <>
            <Link to={'/breeds'}> button</Link>
            <div className='home-text-container'>
                <ProfileLogo />
                <PageTitle title={name} />
                <span>{alt_names ? alt_names : ''}</span>
            </div>
            <div className='breed-profile-container'>
                <div className='img-rating-container'>
                    <img src={catBreedDetails.url} width='400' height='400' />
                    <div className='breed-profile-ratings'>
                        <h5>Ratings</h5>
                        <ul>
                            <li>Adaptability: {adaptability}/5</li>
                            <li>Affection level: {affection_level}/5</li>
                            <li>Child friendly: {child_friendly}/5</li>
                            <li>Dog friendly: {dog_friendly}/5</li>
                            <li>Energy level: {energy_level}/5</li>
                            <li>Experimental: {experimental}/5</li>
                            <li>Grooming: {grooming}/5</li>
                            <li>Hairless: {hairless}/5</li>
                            <li>Health issues: {health_issues}/5</li>
                            <li>Hypoallergenic: {hypoallergenic}/5</li>
                            <li>Indoor: {indoor}/5</li>
                            <li>Intelligence: {intelligence}/5</li>
                            <li>Natural: {natural}/5</li>
                            <li>Rare: {rare}/5</li>
                            <li>Shedding level: {shedding_level}/5</li>
                            <li>Social needs: {social_needs}/5</li>
                            <li>Stranger friendly: {stranger_friendly}/5</li>
                            <li>Vocalisation: {vocalisation}/5</li>
                        </ul>
                    </div>
                </div>
                <div className='breed-profile-description'>
                    <h5>Description</h5>
                    <span>{description}</span>
                    <span>Temperament: {temperament}</span>
                    <span> Origin: {origin}</span>{' '}
                    <span>Life span: {life_span}</span>
                    <span>
                        More information:{' '}
                        <a href={wikipedia_url}>{wikipedia_url}</a>{' '}
                    </span>
                </div>
            </div>
        </>
    );
}
