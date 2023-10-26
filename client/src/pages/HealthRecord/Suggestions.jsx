import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


export default function AutocompleteInput(){
    const [ isLoading, setIsLoading ] = useState(true)
    const [ allSymptoms, setAllSymptoms ] = useState([])
    
    
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
        console.log(allSymptoms) 
    }


class AutocompleteInput extends Component {
    constructor() {
      super();
      this.state = {
        userInput: '',
        suggestions: allSymptoms,
        filteredSuggestions: [],
      };
    }

    handleInputChange = (e) => {
        const inputValue = e.target.value;
        const filteredSuggestions = this.state.suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase())
        );
    
        this.setState({
          userInput: inputValue,
          filteredSuggestions,
        });
      }
    
      handleSuggestionClick = (suggestion) => {
        this.setState({
          userInput: suggestion,
          filteredSuggestions: [],
        });
      }
    
      render() {
        return (
          <div>
            <input
              className='symptom-input'
              type="text"
              value={this.state.userInput}
              onChange={this.handleInputChange}
            />
            <ul>
              {this.state.filteredSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => this.handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
    }
    

}




