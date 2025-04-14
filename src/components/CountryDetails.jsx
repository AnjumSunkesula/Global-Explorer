import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';

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
  if (!country) return <div> Loading...</div>;

  return (
    <div>
      <Navbar/>
      <div className="card shadow-lg container">
        <div className="row g-0">
          {/* Flag */}
          <div className="col-md-4 text-center p-4">
            <img
              src={country.flags?.png || country.flags?.svg}
              alt={`${country.name.common} flag`}
              className="img-fluid rounded"
              style={{ maxHeight: "250px", objectFit: "contain" }}
            />
          </div>

          {/* Info */}
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title mb-3">{country.name.common}</h2>
              <p className="card-text"><strong>Capital:</strong> {country.capital || "N/A"}</p>
              <p className="card-text"><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p className="card-text">
                <strong>Languages:</strong>{" "}
                {Object.values(country.languages || {}).join(", ") || "N/A"}
              </p>
              <p className="card-text"><strong>Region:</strong> {country.region}</p>
              <p className="card-text"><strong>Subregion:</strong> {country.subregion || "N/A"}</p>

              <button
                onClick={handleSaveCountry}
                disabled={isSaved}
                className={`btn btn-${isSaved ? 'success' : 'primary'} mt-3`}
              >
                {isSaved ? 'Saved ✅' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
