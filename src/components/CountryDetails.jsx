import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import AuthModal from './AuthModal';
import { getUserSavedCountries, addCountryToSaved} from "../utils/storageUtils";


function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false); 

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
    const saved = getUserSavedCountries();
    const alreadySaved = saved.some((item) => item.cca3 === country.cca3);
    setIsSaved(alreadySaved);
  };

  const handleSaveCountry = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (!isSaved) {
      addCountryToSaved(country);
      setIsSaved(true);
      alert(`${country.name.common} saved!`);
    } else {
      alert(`${country.name.common} is already saved.`);
    }
  };

  if (error) return <div>Error: {error}</div>;
    if (!country) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <div>Loading...Please wait</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
      <div className="shadow-lg container card-container" style={{ marginTop: '75px'}}>
        <div className="row g-0 ">
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
          <div className="col-md-8 py-3">
            <div className="card-body">
              <h2 className="mb-3">{country.name.common}</h2>
              <p><strong>Capital:</strong> {country.capital || "N/A"}</p>
              <p>
                <strong>Nationality:</strong>{" "}
                {country.demonyms?.eng ? `${country.demonyms.eng.m} / ${country.demonyms.eng.f}` : "N/A"}
              </p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p>
                <strong>Languages:</strong>{" "}
                {Object.values(country.languages || {}).join(", ") || "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {country.currencies? Object.entries(country.currencies).map(([code, { name, symbol }]) => `${name} (${symbol || code})`).join(", "): "N/A"}
              </p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Subregion:</strong> {country.subregion || "N/A"}</p>
              <p>
                <strong>Borders:</strong>{" "}
                {country.borders && country.borders.length > 0? country.borders.join(", "): "None"}
              </p>
              <p>
                <strong>Coordinates:</strong>{" "}
                {country.latlng ? `${country.latlng[0]}, ${country.latlng[1]}` : "N/A"}
              </p>
              <p><strong>ISO Codes:</strong> {country.cca2} / {country.cca3} / {country.ccn3}</p>
              <p><strong>UN Member:</strong> {country.unMember ? "Yes" : "No"}</p>
              <p><strong>Independent:</strong> {country.independent ? "Yes" : "No"}</p>
              <div className="d-flex align-items-center gap-3 mt-3">
                <button
                  onClick={handleSaveCountry}
                  disabled={isSaved}
                  className={`btn px-4 btn-${isSaved ? 'success' : 'primary'}`}
                >
                  {isSaved ? 'Saved ✅' : 'Save'}
                </button>
                <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
                <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                  ⬅ Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CountryDetails;