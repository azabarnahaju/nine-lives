
import Navbar from "../../components/Navbar/Navbar";
import "./CatProfile.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileLogo from "../../components/ProfileLogo/ProfileLogo";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Link } from "react-router-dom";
import CatProfileDataForm from "../../components/CatProfileDataForm/CatProfileDataForm";
import CatProfileData from "../../components/CatProfileData/CatProfileData";
import { getLastDate, getTimeUntilNextVacc } from "../../utils/CatData";

const url = 'http://localhost:4000/api/v1/cats';

const patchCatProfile = async (body, catData, setNeedReload, needReload) => {
  try {
    const response = await fetch(`${url}/${catData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    setNeedReload(!needReload);
    if (response.ok) {
      alert(`${catData.name}'s profile update was successful!`);
    } else {
      throw new Error("Error updating the cat profile.");
    }
  } catch (error) {
    console.log(error);
  }
};

export default function CatProfile() {

  let { catID } = useParams();
  const [catData, setCatData] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [recordToEdit, setRecordToEdit] = useState(false);
  const [recordName, setRecordName] = useState('');
  const [needReload, setNeedReload] = useState(false)

  useEffect(() => {
      async function fetchCatProfile(catID) {
          try {
              const res = await fetch(
                  `http://localhost:4000/api/v1/cats/${catID}`
              );
              const data = await res.json();
              if (data) {
                  setCatData(data);
              }
          } catch (err) {
              console.log(err);
          }
      }
      fetchCatProfile(catID);
  }, [needReload]);

  const handleInfoChange = (e) => {
      e.target.setAttribute('hasChanged', true);
      e.target.setAttribute('value', e.target.value);
  };

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

    patchCatProfile(body, catData, setNeedReload, needReload);
  };

  const handleDeleteHealthRecord = async (recordName, recordID) => {
    const response = await fetch(`/api/v1/cats/${catID}/${recordName}/${recordID}`, {method: "DELETE"});
    if (response.ok) {
      console.log("Successfully deleted");
      setNeedReload(!needReload);
    } else {
      console.log(response.status);
    }
  }

  // const handleEditHealthRecord = async (recordName, rec) => {
  //   setRecordName(recordName);
  //   setRecordToEdit(rec);
  // };

  // const updateHealtRecord = async (editedHealthRecord, recordName, recordID) => {
  //   const response = await fetch(`/api/v1/cats/${catID}/${recordName}/${recordID}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(editedHealthRecord )
  //   });
    
  //   if (response.ok) {
  //     console.log("Successfully edited!");
  //     setIsEditing(false);
  //   } else {
  //     alert("Editing has failed.")
  //   }
  // };

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
            <button
              type="submit"
              className="catprofile-save-btn"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </h2>
        <div className="catprofile-gen-info-container">
          <div className="catprofile-gen-info-text-container">
            <table className="editable-gen-info-container">
              {isEditing ? (
                <CatProfileDataForm
                  catData={catData}
                  handleInfoChange={handleInfoChange}
                />
              ) : (
                <CatProfileData catData={catData} />
              )}
            </table>
            <table className="static-gen-info-container">
              <tr>
                <td>
                  <b>Currently vaccinated:</b>
                </td>
                <td>{(getTimeUntilNextVacc(catData.vaccination) === "" || getTimeUntilNextVacc(catData.vaccination) === "Right meow! (ASAP)") ? "NO" : "YES"}</td>
              </tr>
              <tr>
                <td>
                  <b>Next vaccination due in</b>
                </td>
                <td>
                  {getTimeUntilNextVacc(catData.vaccination)}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Last visit to the vet:</b>
                </td>
                {catData.vet_visit.length > 0 ? (
                  <td>
                    {getLastDate(catData.vet_visit).getDate()}/
                    {getLastDate(catData.vet_visit).getMonth() + 1}/
                    {getLastDate(catData.vet_visit).getFullYear()}
                  </td>
                ) : (
                  <td>No vet visits</td>
                )}
              </tr>
            </table>
          </div>
          <div className="cat-profile-pic-container">
            <img className="cat-profile-pic" src={`http://localhost:4000/assets/cat_pfp/${catData.image}`} />
          </div>
        </div>

        <h2>
          Health records{" "}
          <Link to={`/newhealthrecord/${catID}`}>
            <button className="new-hr-btn">ADD NEW</button>
          </Link>
        </h2>
        <div className="catprofile-hr-container">
          <table className="hr-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {catData.health_rec.map((rec) => (
                <tr>
                  <td>{`${
                    rec.date ? String(rec.date).slice(0, -14) : "-"
                  }`}</td>
                  <td>{rec.symptoms.join(", ")}</td>
                  <td>{rec.result.join(", ")}</td>
                  <td>
                    <button
                      className="new-hr-btn"
                      onClick={() =>
                        handleDeleteHealthRecord("health_rec", rec._id)
                      }
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2>
          Vet records
          <Link to={`/mycats/newvetvisit/${catID}`}>
            <button className="new-hr-btn">ADD NEW</button>
          </Link>
        </h2>
        <div className="catprofile-vr-container">
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
              {catData.vet_visit.map((rec) => (
                <tr>
                  <td>{`${
                    rec.date ? String(rec.date).slice(0, -14) : "-"
                  }`}</td>
                  <td>{rec.symptoms.join(", ")}</td>
                  <td>{rec.result}</td>
                  <td>{rec.comment}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDeleteHealthRecord("vet_visit", rec._id)
                      }
                      className="new-hr-btn"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2>
          Vaccination records
          <Link to={`/newvaccination/${catID}`}>
            <button className="new-hr-btn">ADD NEW</button>
          </Link>
        </h2>
        <div className="catprofile-vr-container">
          <table className="hr-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Expiration</th>
                <th>Type</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {catData.vaccination.map((rec) => (
                <tr>
                  <td>{`${
                    rec.get_date ? String(rec.get_date).slice(0, -14) : "-"
                  }`}</td>
                  <td>{`${
                    rec.exp_date ? String(rec.exp_date).slice(0, -14) : "-"
                  }`}</td>
                  <td>{rec.name}</td>
                  <td>{rec.comment}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDeleteHealthRecord("vaccination", rec._id)
                      }
                      className="new-hr-btn"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
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

