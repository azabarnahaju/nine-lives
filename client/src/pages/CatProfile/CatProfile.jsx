import Navbar from "../../components/Navbar/Navbar";
import "./CatProfile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileLogo from "../../components/ProfileLogo/ProfileLogo";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function CatProfile() {
  let { catID } = useParams();
  const [catData, setCatData] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchCatProfile(catID) {
      const res = await fetch(`http://localhost:4000/api/v1/cats/${catID}`);
      const data = await res.json();
      console.log(data);
      setCatData(data);
    }
    fetchCatProfile(catID);
  }, []);

  const newCatData = { ...catData };
  const catBirthYear =
    Math.floor((Date.now() - new Date(catData.birth)) / (1000 * 60 * 60 * 24 * 365));
  let genInfoFields = isEditing ? (
    <>
      <p>
        Name:
        <input value={catData.name} />
      </p>
      <p>
        Birth year:
        <input value={catBirthYear} />
      </p>
      <p>
        Breed:
        <input value={catData.breed} />
      </p>

      <p>
        Colour:
        <input value={catData.color} />
      </p>

      <p>
        Favourite toy:
        <input value={catData.fav_toy} />
      </p>
    </>
  ) : (
    <>
      <p>
        Name: <span>{catData.name}</span>
      </p>
      <p>
        Birth year:<span>{catBirthYear}</span>
      </p>
      <p>
        Breed:<span>{catData.breed}</span>
      </p>
      <p>
        Colour:<span>{catData.color}</span>
      </p>
      <p>
        Favourite toy:<span>{catData.fav_toy}</span>
      </p>
    </>
  );

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-page-container">
      <Navbar />
      <ProfileLogo />
      <PageTitle title="my cats" />
      <div className="catprofile-container">
        <h2>
          General information{" "}
          <button
            className="catprofile-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          {isEditing && (
            <button className="catprofile-save-btn" onClick={handleSave}>
              Save
            </button>
          )}
        </h2>
        <div className="catprofile-gen-info-container">
          <div className="editable-gen-info-container">{genInfoFields}</div>
          <div className="static-gen-info-container">
            <p>Currently vaccinated: {catData.curr_vacc ? "YES" : "NO"}</p>
            <p>Next vaccination due in</p>
            <p>Last visit to the vet: </p>
          </div>
        </div>
      </div>
    </div>
  );
}
