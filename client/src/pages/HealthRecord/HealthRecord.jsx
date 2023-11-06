import { useState, useEffect } from "react";
import './HealthRecord.css';
import Navbar from "../../components/Navbar/Navbar.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import { ToastContainer, toast } from 'react-toastify';
import React, { Component } from 'react';
import AutocompleteInput from "./Suggestions.jsx";





export default function HealthRecord(){
    const [formValues, setFormValues] = useState([]);
    const [ counter, setCounter] = useState([]);
    const [ allDiseases, setAllDiseases] = useState([])
    const [ allSymptoms, setAllSymptoms ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    
    
    useEffect(() => {
        const getDiseases = async () => {
            try {
                const diseasData = await fetch(
                    'http://localhost:4000/api/v1/diseases'
                );
                const diseases = await diseasData.json();
                setAllDiseases(diseases);
                setIsLoading(false)
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

    if(!isLoading){
        const getSymptoms = async () => {
            allDiseases.forEach(disease => {
                disease.symptoms.forEach(symptom => {
                    if(!allSymptoms.includes(symptom)){
                        allSymptoms.push(symptom);
                    }
                })
            })
        }
        getSymptoms();

    }

    const handleChange = (e, index) => {
        const values = [...formValues];
        values[index].value = e.target.value;
        setFormValues(values);

    };

    const handleAddField = (e) => {
        e.preventDefault();

        const values = [...formValues];
        values.push({
          value: "",
        });
        
        setCounter(Number(counter+1));
        setFormValues(values);
      };
    const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log("Form data submitted:", formValues);
    };
    return (
    !isLoading?
        <>
        
        <PageTitle title={"New health record"} />
        <div className="health-form-container">
            <form onSubmit={handleSubmit} className="health-form">
                <div 
                    className="autocomplete-parent-div"
                > 
                {formValues.map((obj, index) => (
                    <AutocompleteInput />
                ))}
                </div>
                    <div className="center-search-button">
                        <button className="health-form-add-btn" onClick={handleAddField}>Add new symptom</button>
                    </div>
                    <div className="health-form-submit-btn-container" >
                        <button type="submit" className="health-form-submit-btn">Search</button>
                    </div>         
            </form>
        </div>
    </>
    :
    
       <div> <p>Loading</p></div>
    
    
    );





}










