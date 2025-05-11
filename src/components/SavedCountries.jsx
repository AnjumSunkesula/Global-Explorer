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
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container my-5  flex-fill overflow-auto">
        <h2 className="text-center mt-5 mb-4">Saved Countries</h2>

        {savedCountries.length === 0 ? (
          <div className="alert alert-info text-center">No saved countries yet.</div>
        ) : (
          <div className="row g-4">
            {savedCountries.map((country) => (
              <div className="col-md-5 col-lg-4 countries-col" key={country.cca3}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={country.flags?.png || country.flags?.svg}
                    alt={`${country.name.common} flag`}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{country.name.common}</h5>
                    <p className="card-text mb-2"><strong>Capital:</strong> {country.capital || "N/A"}</p>
                    <p className="card-text"><strong>Region:</strong> {country.region}</p>
                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => removeCountry(country.cca3)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedCountries;
