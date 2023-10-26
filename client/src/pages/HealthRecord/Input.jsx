
 import AutocompleteInput from "./Suggestions";

export default function Input({ objValue, onChange, index }) {
  const { label, value } = objValue;
 
  return (     
        
       
            <div className="grid-child-div">
                <label htmlFor={label}>{label}</label>
                    <div>
                        <AutocompleteInput />
                    </div>
            </div>
      
    
  )
}


