import React from "react";
export default function Input({ objValue, onChange, index }) {
  const { label, value } = objValue;
  
  return (
    <div className="input-group">
      <label htmlFor={label}>{label}</label>
      <div className="input">
        <input
          type="text"
          id={index}
          value={value || ""}
          onChange={(e) => onChange(e, index)}
        />
      </div>
    </div>
  );
}