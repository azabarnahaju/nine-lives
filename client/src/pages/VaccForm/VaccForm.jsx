import PageTitle from "../../components/PageTitle/PageTitle";
import "./VaccForm.css"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../../components/BackBtn/BackBtn";

const addVaccLog = async (catID, vaccination) => {
  const response = await fetch(`/api/v1/cats/${catID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ vaccination: vaccination }),
  });

  if (response.ok) {
    return "Vaccination log was added successfully";
  } else {
    alert("Vaccination log has failed.");
  }
};

export default function VaccForm() {
  const [vaccName, setVaccName] = useState("");
  const [vaccDate, setVaccDate] = useState(); 
  const [expDate, setExpDate] = useState();
  const [vaccComment, setVaccComment] = useState("")
  const navigate = useNavigate();
  const { catID } = useParams();

  const handleVaccSubmit = async (e) => {
    e.preventDefault();

    const vaccination = {
      name: vaccName,
      get_date: new Date(vaccDate),
      exp_date: new Date(expDate),
      comment: vaccComment,
    };

    const response = await addVaccLog(catID, vaccination);
    console.log(response);
    navigate(-1);
  }

  return (
    <>
      <div className="vacc-title">
        <PageTitle title="New vaccination log" />
      </div>
      <BackBtn path={`/mycats/${catID}`} />
      <div className="vacc-form-container">
        <form id="vacc-form">
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={vaccName}
            onChange={(e) => setVaccName(e.target.value)}
          />
          <label>Date</label>
          <input
            type="date"
            name="get_date"
            value={vaccDate}
            onChange={(e) => setVaccDate(e.target.value)}
          />
          <label>Expiration date</label>
          <input
            name="exp_date"
            type="date"
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
          />
          <label>Comment</label>
          <textarea
            name="comment"
            rows="4"
            value={vaccComment}
            onChange={(e) => setVaccComment(e.target.value)}
          />
          <button
            className="save-btn-vacc"
            type="submit"
            onClick={handleVaccSubmit}
          >
            SAVE
          </button>
            <button className="save-btn-vacc" type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
        </form>
      </div>
    </>
  );
}