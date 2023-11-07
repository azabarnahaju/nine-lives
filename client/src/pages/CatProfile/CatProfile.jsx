import Navbar from "../../components/Navbar/Navbar";
import "./CatProfile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileLogo from "../../components/ProfileLogo/ProfileLogo";
import PageTitle from "../../components/PageTitle/PageTitle";

const url = "http://localhost:4000/api/v1/cats"
const catBirthYear = (birth) => Math.floor(new Date(birth).getFullYear());
const catAge = (birth) => Math.floor((Date.now() - new Date(birth)) / (1000 * 60 * 60 * 24 * 365));
const lastVisitDate = (vet_visit) => {
  const lastVisit = vet_visit.reduce((acc, curr) => {
    return new Date(acc.date) > new Date(curr.date) ? acc : curr;
  });
  return new Date(lastVisit.date);
}
const daysUntilNextVacc = (lastVisit) =>  365 - (Date.now() - lastVisit) / (1000 * 60 * 60 * 24);
const patchCatProfile = async (body, catData) => {
  console.log(catData._id)
  try {
    const response = await fetch(`${url}/${catData._id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(body),
    });
    console.log(response);
    if (response.ok) {
      alert(`${catData.name}'s profile update was successful!`)
    } else {
      throw new Error("Error updating the cat profile.")
    }
  } catch (error) {
    console.log(error)
  }
}

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
  }, [isEditing]);

  let genInfoFields;
  const handleInfoChange = (e) => {
    e.target.setAttribute("hasChanged", true)
    e.target.setAttribute("value", e.target.value)
  };

  if (catData) {
    genInfoFields = isEditing ? (
      <>
        <tr>
          <td>
            <b>Name:</b>
          </td>
          <td>
            <input
              defaultValue={catData.name}
              key="name"
              id="name"
              onChange={handleInfoChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <b> Birth year:</b>
          </td>
          <td>
            <input
              defaultValue={catBirthYear(catData.birth)}
              key="birth"
              id="birth"
              onChange={handleInfoChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <b>Breed:</b>
          </td>
          <td>
            <input
              value={catData.breed}
              key="breed"
              id="breed"
              onChange={handleInfoChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <b>Colour:</b>
          </td>
          <td>
            <input
              value={catData.color}
              key="color"
              id="color"
              onChange={handleInfoChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <b>Favourite toy:</b>
          </td>
          <td>
            <input
              value={catData.fav_toy}
              key="fav_toy"
              id="fav_toy"
              onChange={handleInfoChange}
            />
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
            {catBirthYear(catData.birth)} ({catAge(catData.birth)} years old)
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
  }

  const handleSave = () => {
    setIsEditing(false);
    const profileForm = document.querySelector(".editable-gen-info-container");
    const inputs = profileForm.querySelectorAll("input");
    const body = {};
    inputs.forEach(i => {
      if (i.getAttribute("hasChanged")) {
        body[i.id] = i.value;
        i.setAttribute("hasChanged", false)
      };
    });
  patchCatProfile(body, catData);
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
            disabled={isEditing ? true : false}
          >
            Edit
          </button>
          {isEditing && (
            <button type="submit" className="catprofile-save-btn" onClick={handleSave}>
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
                  {Math.floor(
                    daysUntilNextVacc(lastVisitDate(catData.vet_visit)) / 30
                  )}{" "}
                  months,{" "}
                  {Math.floor(
                    daysUntilNextVacc(lastVisitDate(catData.vet_visit)) % 30
                  )}{" "}
                  days
                </td>
              </tr>
              <tr>
                <td>
                  <b>Last visit to the vet:</b>
                </td>
                <td>
                  {lastVisitDate(catData.vet_visit).getDate()}/
                  {lastVisitDate(catData.vet_visit).getMonth()}/
                  {lastVisitDate(catData.vet_visit).getFullYear()}
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
              {catData.health_rec.length <= 3
                ? catData.health_rec.map((rec) => (
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
                : catData.health_rec.splice(0, 3).map((rec) => (
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
              {catData.vet_visit.length <= 3
                ? catData.vet_visit.map((rec) => (
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
                : catData.vet_visit.splice(0, 3).map((rec) => (
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
          Vaccination records<button className="new-vr-btn">ADD NEW</button>
        </h2>
        <div className="catprofile-vr-container">
          <table className="vr-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Expiration</th>
                <th>Type</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {catData.vaccination.length <= 3
                ? catData.vaccination.map((rec) => (
                    <tr>
                      <td>{rec.get_date}</td>
                      <td>{rec.exp_date}</td>
                      <td>{rec.type}</td>
                      <td>{rec.comment}</td>
                      <td>
                        <button>EDIT</button>
                        <button>DELETE</button>
                      </td>
                    </tr>
                  ))
                : catData.vaccination.splice(0, 3).map((rec) => (
                    <>
                      <tr>
                        <td>{rec.get_date}</td>
                        <td>{rec.exp_date}</td>
                        <td>{rec.type}</td>
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
