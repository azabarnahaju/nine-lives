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
      try {
        const res = await fetch(`http://localhost:4000/api/v1/cats/${catID}`);
        const data = await res.json();
        console.log(data);
        if (data) {
          setCatData(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchCatProfile(catID);
  }, []);

  let catBirthYear;
  let catAge;
  let lastVisitDate;
  let genInfoFields;
  let monthsTillNextVacc;
  let daysTillNextVacc;
  let healthRecords;
  let vetRecords;

  if (catData) {
    catBirthYear = Math.floor(new Date(catData.birth).getFullYear());
    catAge = Math.floor(
      (Date.now() - new Date(catData.birth)) / (1000 * 60 * 60 * 24 * 365)
    );

    const lastVisit = catData.vet_visit.reduce((acc, curr) => {
      return new Date(acc.date) > new Date(curr.date) ? acc : curr;
    });
    console.log(new Date(lastVisit.date));
    lastVisitDate = new Date(lastVisit.date);

    genInfoFields = isEditing ? (
      <>
        <tr>
          <td>
            <b>Name:</b>
          </td>
          <td>
            <input value={catData.name} key="name" />
          </td>
        </tr>
        <tr>
          <td>
            <b> Birth year:</b>
          </td>
          <td>
            <input value={catBirthYear} key="birth" />
          </td>
        </tr>
        <tr>
          <td>
            <b>Breed:</b>
          </td>
          <td>
            <input value={catData.breed} key="breed" />
          </td>
        </tr>
        <tr>
          <td>
            <b>Colour:</b>
          </td>
          <td>
            <input value={catData.color} key="color" />
          </td>
        </tr>
        <tr>
          <td>
            <b>Favourite toy:</b>
          </td>
          <td>
            <input value={catData.fav_toy} key="fav_toy" />
          </td>
        </tr>
      </>
    ) : (
      <>
        <tr>
          <td>
            <b>Name:</b>
          </td>
          <td>{catData.name}</td>
        </tr>
        <tr>
          <td>
            <b> Birth year:</b>
          </td>
          <td>
            {catBirthYear} ({catAge} years old)
          </td>
        </tr>
        <tr>
          <td>
            <b>Breed:</b>
          </td>
          <td>{catData.breed}</td>
        </tr>
        <tr>
          <td>
            <b>Colour:</b>
          </td>
          <td>{catData.color}</td>
        </tr>
        <tr>
          <td>
            <b>Favourite toy:</b>
          </td>
          <td>{catData.fav_toy}</td>
        </tr>
      </>
    );

    const remainingDays =
      365 - (Date.now() - lastVisitDate) / (1000 * 60 * 60 * 24);
    monthsTillNextVacc = Math.floor(remainingDays / 30);
    daysTillNextVacc = Math.floor(remainingDays % 30);

    healthRecords = catData.health_rec;
    vetRecords = catData.vet_visit;
  }

  const handleSave = () => {
    setIsEditing(false);
  };

  return catData ? (
    <div className="profile-page-container">
      <Navbar />
      <ProfileLogo />
      <PageTitle title="my cats" />
      <div className="catprofile-container">
        <h2>
          General information
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
          <div className="catprofile-gen-info-text-container">
            <table className="editable-gen-info-container">
              {genInfoFields}
            </table>
            <table className="static-gen-info-container">
              <tr>
                <td>
                  <b>Currently vaccinated:</b>
                </td>
                <td>{catData.curr_vacc ? "YES" : "NO"}</td>
              </tr>
              <tr>
                <td>
                  <b>Next vaccination due in</b>
                </td>
                <td>
                  {monthsTillNextVacc} months, {daysTillNextVacc} days
                </td>
              </tr>
              <tr>
                <td>
                  <b>Last visit to the vet:</b>
                </td>
                <td>
                  {lastVisitDate.getDate()}/{lastVisitDate.getMonth()}/
                  {lastVisitDate.getFullYear()}
                </td>
              </tr>
            </table>
          </div>
          <div className="catprofile-pic-container">
            <img className="cat-profile-pic" src={catData.image} />
          </div>
        </div>
        <h2>
          Health records<button className="new-hr-btn">ADD NEW</button>
        </h2>
        <div className="catprofile-hr-container">
          <table className="hr-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Result</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {healthRecords.length <= 3
                ? healthRecords.map((rec) => (
                    <tr>
                      <td>{rec.date}</td>
                      <td>{rec.symptoms.join(", ")}</td>
                      <td>{rec.result}</td>
                      <td>{rec.comment}</td>
                      <td>
                        <button>EDIT</button>
                        <button>DELETE</button>
                      </td>
                    </tr>
                  ))
                : healthRecords.splice(0, 3).map((rec) => (
                    <>
                      <tr>
                        <td>{rec.date}</td>
                        <td>{rec.symptoms.join(", ")}</td>
                        <td>{rec.result}</td>
                        <td>{rec.comment}</td>
                        <td>
                          <button>EDIT</button>
                          <button>DELETE</button>
                        </td>
                      </tr>
                      <button>LOAD MORE</button>
                    </>
                  ))}
            </tbody>
          </table>
        </div>
        <h2>
          Vet records<button className="new-hr-btn">ADD NEW</button>
        </h2>
        <div className="catprofile-vr-container">
          <table className="vr-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Result</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {vetRecords.length <= 3
                ? vetRecords.map((rec) => (
                    <tr>
                      <td>{rec.date}</td>
                      <td>{rec.symptoms.join(", ")}</td>
                      <td>{rec.result}</td>
                      <td>{rec.comment}</td>
                      <td>
                        <button>EDIT</button>
                        <button>DELETE</button>
                      </td>
                    </tr>
                  ))
                : vetRecords.splice(0, 3).map((rec) => (
                    <>
                      <tr>
                        <td>{rec.date}</td>
                        <td>{rec.symptoms.join(", ")}</td>
                        <td>{rec.result}</td>
                        <td>{rec.comment}</td>
                        <td>
                          <button>EDIT</button>
                          <button>DELETE</button>
                        </td>
                      </tr>
                      <button>LOAD MORE</button>
                    </>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
}
