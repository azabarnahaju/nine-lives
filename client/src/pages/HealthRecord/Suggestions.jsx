import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import "./HealthRecord.css"

export default function AutocompleteInput({ onUpdate, className, userInput, setUserInput }) {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [allDiseases, setAllDiseases] = useState([]);
  const [startInput, setStartInput] = useState("");

  useEffect(() => {
    const getDiseases = async () => {
      try {
        const diseasData = await fetch("http://localhost:4000/api/v1/diseases");
        const diseasesVar = await diseasData.json();
        setAllDiseases(diseasesVar);
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

  useEffect(() => {
    if (!isLoading) {
      const symptoms = [];
      allDiseases.forEach((disease) => {
        disease.symptoms.forEach((symptom) => {
          if (!symptoms.includes(symptom)) {
            symptoms.push(symptom);
          }
        });
      });
      setAllSymptoms(symptoms);
      setSuggestions(symptoms);
    }
  }, [allDiseases, isLoading]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setUserInput(inputValue);
    setStartInput(inputValue);
    setFilteredSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
    setStartInput(suggestion);
    onUpdate(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <>
      <div>
        <div className="suggestion-sidebar">
          <ul>
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            className={className}
            type="text"
            value={startInput}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
}
