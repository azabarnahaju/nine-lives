import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import './VetVisit.css';
import Navbar from "../../components/Navbar/Navbar.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import { ToastContainer, toast } from 'react-toastify';
import AutocompleteInput from '../HealthRecord/Suggestions.jsx';
import BackBtn from '../../components/BackBtn/BackBtn.jsx';



export default function HealthRecord() {
    let { catID } = useParams();
    const [catData, setCatData] = useState(false);
    const [newLog, setNewLog] = useState({
        date: new Date(),
        symptoms: [],
        result: "",
        comment: ""
    })
    const dateInputRef = useRef(null);
    
    useEffect(() => {
        async function fetchCatProfile(catID) {
          try {
            const res = await fetch(`http://localhost:4000/api/v1/cats/${catID}`);
            const data = await res.json();
            if (data) {
              setCatData(data);
            }
          } catch (err) {
            console.log(err);
          }
        }
        fetchCatProfile(catID);        
      }, []);

    
    const handleDateChange = () => {
        setNewLog({
          ...newLog,
          date: dateInputRef.current.valueAsDate,
        });
      };
    
      const handleSymptomsChange = (event) => {
        
        const elements = event.target.value.split(',')
        setNewLog({
          ...newLog,
          symptoms: elements,
        });
      };
    
      const handleResultChange = (event) => {
        setNewLog({
          ...newLog,
          result: event.target.value,
        });
      };
    
      const handleCommentChange = (event) => {
        setNewLog({
          ...newLog,
          comment: event.target.value,
        });
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const updatedVetVisits =  [newLog];
        console.log(updatedVetVisits)
        const dataToSend = {_id: catData._id, vet_visit: updatedVetVisits}
        console.log(dataToSend)
        
        const dataToPush = {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
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
            console.log('Cat data updated successfully:', data);
            })
            .catch((error) => {
            console.error('Error updating cat data:', error);
            });
            
    };
    
      return (<>
        <Navbar />
        <PageTitle title={"New Vet visit"} />
        <BackBtn path={`/mycats/${catID}`} />
        <div className='new-vet-visit-container'>
        <form className='new-vet-visit-form' onSubmit={handleSubmit}>
          <div className='new-vet-visit-inputs-container' >
          <input
            type='date'
            className='new-vet-visit-date-input'
            onChange={handleDateChange}
            ref={dateInputRef}
            required={true}
          />
          
          <input
            type='text'
            className='new-vet-visit-input-text'
            value={newLog.symptoms}
            onChange={handleSymptomsChange}
            required={true}
          />
          
          <input
            type='text'
            className='new-vet-visit-input-text'
            value={newLog.result}
            onChange={handleResultChange}
            required={true}
          />
          
          <input
            type='text'
            className='new-vet-visit-input-text'
            value={newLog.comment}
            onChange={handleCommentChange}
          />
          </div>
          <div className='new-vet-visit-save-button-container'>
            <button type='submit' className='new-vet-visit-submit-button'>Save</button>
          </div>
        </form>
        </div>
        </>
      );
    }












