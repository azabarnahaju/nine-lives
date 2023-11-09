import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProfileLogo from '../../components/ProfileLogo/ProfileLogo';
import PageTitle from '../../components/PageTitle/PageTitle';
import './Breed.css';
import BackBtn from '../../components/BackBtn/BackBtn';
import Navbar from '../../components/Navbar/Navbar';
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
        temperament,
        wikipedia_url,
    } = catBreedDetails.breeds[0];
    console.log(adaptability);
    const makeStars = (number) => {
        let stars = '';
        for (let i = 0; i < Number(number); i++) {
            stars += '⭐';
        }
        return stars;
    };
    return (
      <>
        <Navbar />
        <BackBtn path={"/breeds"} />
        <div className="home-text-container">
          <ProfileLogo />
          <PageTitle title={name} />
          <span>{alt_names ? alt_names : ""}</span>
        </div>
        <div className="breed-profile-container">
          <div className="img-rating-container">
            <img src={catBreedDetails.url} width="400" height="400" />
            <div className="breed-profile-ratings">
              <h5 className="breed-title">Ratings</h5>
              <ul>
                {adaptability ? (
                  <li>
                    Adaptability:{" "}
                    <span className="star-icons">
                      {makeStars(adaptability)}
                    </span>
                  </li>
                ) : (
                  ""
                )}
                {affection_level ? (
                  <li>
                    Affection level:{" "}
                    <span className="star-icons">
                      {makeStars(affection_level)}
                    </span>
                  </li>
                ) : (
                  ""
                )}
                {child_friendly ? (
                  <li>
                    Child friendly:{" "}
                    <span className="star-icons">
                      {makeStars(child_friendly)}
                    </span>
                  </li>
                ) : (
                  ""
                )}
                {dog_friendly ? (
                  <li>
                    Dog friendly:{" "}
                    <span className="star-icons">
                      {makeStars(dog_friendly)}
                    </span>
                  </li>
                ) : (
                  ""
                )}
                {energy_level ? (
                  <li>
                    Energy level:{" "}
                    <span className="star-icons">
                      {makeStars(energy_level)}
                    </span>
                  </li>
                ) : (
                  ""
                )}
                {experimental ? (
                  <li>
                    Experimental:{" "}
                    <span className="star-icons">
                      {makeStars(experimental)}
                    </span>
                  </li>
                ) : (
                  ""
                )}
                {grooming ? (
                  <li>
                    Grooming:{" "}
                    <span className="star-icons">{makeStars(grooming)}</span>
                  </li>
                ) : (
                  ""
                )}
                {hairless ? (
                  <li>
                    Hairless:{" "}
                    <span className="star-icons">{makeStars(hairless)}</span>
                  </li>
                ) : (
                  ""
                )}
                {health_issues ? (
                  <li>
                    Health issues:{" "}
                    <span className="star-icons">
                      {makeStars(health_issues)}
                    </span>
                  </li>
                ) : (
                  ""
                )}
                {hypoallergenic ? (
                  <li>
                    Hypoallergenic:{" "}
                    <span className="star-icons">
                      {makeStars(hypoallergenic)}
                    </span>
                  </li>
                ) : (
                  ""
                )}
                {indoor ? (
                  <li>
                    {" "}
                    Indoor:{" "}
                    <span className="star-icons">
                      {" "}
                      {makeStars(indoor)}{" "}
                    </span>{" "}
                  </li>
                ) : (
                  ""
                )}{" "}
                {intelligence ? (
                  <li>
                    {" "}
                    Intelligence:{" "}
                    <span className="star-icons">
                      {" "}
                      {makeStars(intelligence)}{" "}
                    </span>{" "}
                  </li>
                ) : (
                  ""
                )}{" "}
                {natural ? (
                  <li>
                    {" "}
                    Natural:{" "}
                    <span className="star-icons">
                      {" "}
                      {makeStars(natural)}{" "}
                    </span>{" "}
                  </li>
                ) : (
                  ""
                )}{" "}
                {rare ? (
                  <li>
                    {" "}
                    Rare:{" "}
                    <span className="star-icons"> {makeStars(rare)} </span>{" "}
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
          <div className="breed-profile-description">
            <h5 className="breed-title">Description</h5>
            <span>{description}</span>
            <span>Temperament: {temperament}</span>
            <span> Origin: {origin}</span> <span>Life span: {life_span}</span>
            <span>
              More information: <a href={wikipedia_url}>{wikipedia_url}</a>{" "}
            </span>
          </div>
        </div>
      </>
    );
}
