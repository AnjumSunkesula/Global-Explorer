import React, { useState, useEffect } from 'react';

function SavedCountries() {
  const [savedCountries, setSavedCountries] = useState(
    JSON.parse(localStorage.getItem('savedCountries')) || []
  );

  const removeCountry = (countryCode) => {
    const updatedCountries = savedCountries.filter(
      (country) => country.cca3 !== countryCode
    );
    setSavedCountries(updatedCountries);
    localStorage.setItem('savedCountries', JSON.stringify(updatedCountries));
  };

  return (
    <div>
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
