
import React, { useState, useEffect } from 'react';
import './HealthRecord.css';
import Navbar from "../../components/Navbar/Navbar.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import { ToastContainer, toast } from 'react-toastify';
import AutocompleteInput from "./Suggestions.jsx";
import DiseaseResults from "./DiseaseResults.jsx";

export default function HealthRecord() {
    const [formValues, setFormValues] = useState([]);
    const [allDiseases, setAllDiseases] = useState([]);
    const [allSymptoms, setAllSymptoms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        const getDiseases = async () => {
            try {
                const diseasData = await fetch('http://localhost:4000/api/v1/diseases');
                const diseases = await diseasData.json();
                setAllDiseases(diseases);
                setIsLoading(false);
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

        getDiseases();
    }, []);

    const handleAddField = (e) => {
        e.preventDefault();

        const values = [...formValues];
        values.push("");
        setFormValues(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newInputs = [...formValues];
        for(let i = 0; i < event.target.firstChild.childElementCount; i++){
            newInputs[i] = event.target.firstChild.children[i].children[1].firstChild.value;
        }
        setFormValues(newInputs);
        setSearched(true);
    };

    const updateFormValue = (index, value) => {
        const newFormValues = [...formValues];
        newFormValues[index] = value;
        setFormValues(newFormValues);
      };

    return (
        !isLoading ? (
            <>
                <Navbar />
                <PageTitle title={"New health record"} />
                <div className="health-form-container">
                    <form onSubmit={handleSubmit} className="health-form">
                        <div className="autocomplete-parent-div">
                            {formValues.map((value, index) => (
                                <AutocompleteInput
                                key={index}
                                onUpdate={(newValue) => updateFormValue(index, newValue)}
                                className={"symptom-input"}
                                />
                            ))}
                        </div>
                        <div className="center-search-button">
                            <button className="health-form-add-btn" onClick={handleAddField}>Add new symptom</button>
                        </div>
                        <div className="health-form-submit-btn-container">
                            <button type="submit" className="health-form-submit-btn">Search</button>
                        </div>
                    </form>
                    {searched && (
                    <div className="diseases-container-div">
                        <DiseaseResults
                            allDiseases={allDiseases}
                            symptoms={formValues} 
                        />
                    </div>
                )}
                </div>
            </>
        ) : (
            <div> <p>Loading</p></div>
        )
    );
}

