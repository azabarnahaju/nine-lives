import React, { useState, useEffect } from "react";
import "./HealthRecord.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import { ToastContainer, toast } from "react-toastify";
import AutocompleteInput from "./Suggestions.jsx";
import DiseaseResults from "./DiseaseResults.jsx";
import { useParams, useNavigate } from "react-router-dom";
import BackBtn from "../../components/BackBtn/BackBtn.jsx";

export default function HealthRecord() {
  const [formValues, setFormValues] = useState([]);
  const [allDiseases, setAllDiseases] = useState([]);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [newLog, setNewLog] = useState({
    date: new Date(),
    symptoms: [],
    result: "",
    comment: "",
  });
  const [matchingDiseasesState, setMatchingDiseasesState] = useState([]);
  const [userInput, setUserInput] = useState("");
  const { catID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDiseases = async () => {
      try {
        const diseasData = await fetch("http://localhost:4000/api/v1/diseases");
        const diseases = await diseasData.json();
        setAllDiseases(diseases);
        setIsLoading(false);
      } catch (err) {
        toast.error(err, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };

    getDiseases();
  }, []);

  const handleAddField = (e) => {
    e.preventDefault();

    const values = [...formValues];
    values.push("");
    setFormValues(values);
  };

  const handleSearch = async (event) => {
    const newInputs = [...formValues];
    for (let i = 0; i < event.target.firstChild.childElementCount; i++) {
      newInputs[i] =
        event.target.firstChild.children[i].children[1].firstChild.value;
    }
    setFormValues(newInputs);
    setSearched(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const diseaseList = matchingDiseasesState.map((d) => d.name);

    const newLog = {
      date: Date.now(),
      symptoms: formValues,
      result: diseaseList,
    };

    const dataToSend = { health_rec: newLog };

    const dataToPush = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch(`http://localhost:4000/api/v1/cats/${catID}`, dataToPush)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update cat data: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Cat data updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating cat data:", error);
      });

      navigate(-1);
  };

  const updateFormValue = (index, value) => {
    const newFormValues = [...formValues];
    newFormValues[index] = value;
    setFormValues(newFormValues);
  };

  return !isLoading ? (
    <>
      <Navbar />
      <div className="health-record-pagetitle">
        <PageTitle title={"New health record"} />
        <BackBtn path={`/mycats/${catID}`} />
      </div>
      <div className="health-form-container">
        <form onSubmit={handleSubmit} className="health-form">
          <div className="autocomplete-parent-div">
            {formValues.map((value, index) => (
              <AutocompleteInput
                key={index}
                onUpdate={(newValue) => updateFormValue(index, newValue)}
                className={"symptom-input"}
                userInput={userInput}
                setUserInput={setUserInput}
              />
            ))}
          </div>
          <div className="center-search-button">
            <button className="health-form-add-btn" onClick={handleAddField}>
              Add new symptom
            </button>
          </div>
          <div className="health-form-submit-btn-container">
            <button
              type="button"
              className="health-form-submit-btn"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="health-record-save-btn"
              type="submit"
              disabled={!searched}
            >
              SAVE
            </button>
          </div>
        </form>
        {searched && (
          <div className="diseases-container-div">
            <DiseaseResults
              allDiseases={allDiseases}
              symptoms={formValues}
              matchingDiseasesState={matchingDiseasesState}
              setMatchingDiseasesState={setMatchingDiseasesState}
            />
          </div>
        )}
      </div>
    </>
  ) : (
    <div>
      <p>Loading</p>
    </div>
  );
}
