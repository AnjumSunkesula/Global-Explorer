import React, { useState, useEffect } from 'react';
import Navbar from './navbar';


function SavedCountries() {
  const [savedCountries, setSavedCountries] = useState(
    JSON.parse(localStorage.getItem('savedCountries')) || []
  );

  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("savedCountries")) || [];
  setSavedCountries(saved);
}, []);


  const removeCountry = (countryCode) => {
    const updatedCountries = savedCountries.filter(
      (country) => country.cca3 !== countryCode
    );
    setSavedCountries(updatedCountries);
    localStorage.setItem('savedCountries', JSON.stringify(updatedCountries));
  };

  return (
    <div>
      <Navbar/>
      <h1>Saved Countries</h1>
      <ul>
        {savedCountries.map((country) => (
          <li key={country.cca3}>
            {country.name.common} 
            <button onClick={() => removeCountry(country.cca3)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedCountries;
