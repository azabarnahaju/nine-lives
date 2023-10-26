import { useState } from "react";
import Input from './Input.jsx';
import './HealthRecord.css';





export default function HealthRecord(){
    const [formValues, setFormValues] = useState([]);

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
        
        setFormValues(values);
      };
    const handleSubmit = (event) => {
    event.preventDefault();
    //Sending data to server
    console.log("Form data submitted:", formValues);
    };
    return (
        

        
        
        <div className="healthrecord-main-div">
            <form onSubmit={handleSubmit}>
                {formValues.map((obj, index) => (
                    <Input
                        key={index}
                        objValue={obj}
                        onChange={handleChange}
                        index={index}
                    />
                ))}
            <div className="center">
                <button className="add-btn" id="addInput" onClick={handleAddField}>
                Add new symptom
                </button>
          </div>
        <button type="submit" className="submit-btn">
          Search
        </button>
      </form>
        </div>
    );





}










