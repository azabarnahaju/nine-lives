import { useState, useEffect } from "react";
import Input from './Input.jsx';
import './HealthRecord.css';
import Navbar from "../../components/Navbar/Navbar.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import { ToastContainer, toast } from 'react-toastify';
import React, { Component } from 'react';





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
        console.log(allDiseases)
        
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
        console.log(allSymptoms) 
    }

    const handleChange = (e, index) => {
        const values = [...formValues];
        values[index].value = e.target.value;
        setFormValues(values);
        console.log(index)
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
        <Navbar />
        <PageTitle title={"New health record"} />
        <div className="form-container">
            <form onSubmit={handleSubmit} className="health-form">
                <div 
                    className="parent-div"
                > 
                {formValues.map((obj, index) => (
                    <Input
                        key={index}
                        objValue={obj}
                        onChange={handleChange}
                        index={index}
                    />
                ))}
                </div>
                    <div className="center">
                        <button className="add-btn" id="addInput" onClick={handleAddField}>Add new symptom</button>
                    </div>
                
                <button type="submit" className="submit-btn">Search</button>         
            </form>
        </div>
    </>
    :
    
       <div> <p>Loading</p></div>
    
    
    );





}










