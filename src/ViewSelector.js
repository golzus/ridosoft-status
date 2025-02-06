// ViewSelector.js
import React from "react";

const ViewSelector = ({ viewOption, setViewOption, options }) => {
  return (
    <div>
      <label>בחר תקופה:</label>
      <select value={viewOption} onChange={(e) => setViewOption(e.target.value)}>
        {Object.keys(options).map(option => (
          <option key={option} value={option}>{options[option]}</option>
        ))}
      </select>
    </div>
  );
};

export default ViewSelector;
