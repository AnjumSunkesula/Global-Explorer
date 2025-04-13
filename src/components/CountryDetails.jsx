import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
const [error, setError] = useState(null);

  // Fetch country details based on the country code
  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!response.ok) {
          throw new Error("Country not found");
        }
        const data = await response.json();
        setCountry(data[0]); // Set the country data to state
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
      }
    };

    fetchCountryDetails(); // Call the function when the component mounts or code changes
  }, [code]); // Run again if the `code` changes (i.e., if the user navigates to a different country)

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetching fails
  }

  if (!country) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Languages: {Object.values(country.languages || {}).join(', ')}</p>
      <img src={country.flags[1]} alt="flag" />
    </div>
  );
}

export default CountryDetails;
