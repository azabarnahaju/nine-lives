import React, { useEffect, useState } from 'react';

function DiseaseResults({ allDiseases, symptoms }) {
    const [matchingDiseasesState, setMatchingDiseasesState] = useState([]);
    const [isShowed, setIsShowed] = useState(false);
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        const diseaseCard = (disease) => (
            <div className="disease-card-container" key={disease.id}>
                <div className='disease-card-container-name'><p>Name: {disease.name}</p></div>
                <p>Shortened identifier: {disease.id}</p>
                <p>All symptoms:</p>
                    
                        {disease.symptoms.map((symptom, index) => (
                            <li key={index}>{symptom}</li>
                        ))}
                    
                
            </div>
        );

        const displayedDiseases = matchingDiseasesState.map(disease => diseaseCard(disease));
        setDiseases(displayedDiseases);

    }, [matchingDiseasesState]);

    useEffect(() => {
        const matchingDiseases = (symptoms) => {
            const results = allDiseases.filter(disease => {
                let acc = 0;
                symptoms.forEach(symptom => {
                    if (disease.symptoms.includes(symptom)) {
                        acc++;
                    }
                });
                return acc >= 2;
            });
            setMatchingDiseasesState(results);
        };

        matchingDiseases(symptoms);

    }, [symptoms, allDiseases]);

    return <>
        <h1>It could be:</h1>
        <p>(These are just possible diseases, and do not count as a visit to the vet)</p>
        <div className='all-disease-card-container'>
            {diseases}
        </div>
        </>
}

export default DiseaseResults;
