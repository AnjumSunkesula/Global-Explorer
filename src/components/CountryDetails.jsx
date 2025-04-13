import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!response.ok) {
          throw new Error("Country not found");
        }
        const data = await response.json();
        setCountry(data[0]);
        checkIfSaved(data[0]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCountryDetails();
  }, [code]);

  const checkIfSaved = (country) => {
    const saved = JSON.parse(localStorage.getItem("savedCountries")) || [];
    const alreadySaved = saved.some((item) => item.cca3 === country.cca3);
    setIsSaved(alreadySaved);
  };

  const handleSaveCountry = () => {
    const saved = JSON.parse(localStorage.getItem("savedCountries")) || [];
    if (!isSaved) {
      saved.push(country);
      localStorage.setItem("savedCountries", JSON.stringify(saved));
      setIsSaved(true);
      alert(`${country.name.common} saved!`);
    } else {
      alert(`${country.name.common} is already saved.`);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!country) return <div>Loading...</div>;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Languages: {Object.values(country.languages || {}).join(', ')}</p>
      <img src={country.flags?.png || country.flags?.svg} alt={`${country.name.common} flag`} width="150" />
      
      <button onClick={handleSaveCountry} disabled={isSaved} className="save-button">
        {isSaved ? 'Saved ✅' : 'Save'}
      </button>
    </div>
  );
}

export default CountryDetails;
