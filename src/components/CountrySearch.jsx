import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CountrySearch() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
     <div className="search-container overflow-x-hidden">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Scrollable Grid */}
      <div
        className="row overflow-auto px-2 justify-content-between justify-content-md-between"
        style={{ maxHeight: '500px', gap: '1rem' }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div
              key={country.cca3}
              className="col-sm-6 col-md-5 col-lg-3 mb-3"
            >
              <div className="card shadow-sm h-100">
                <img
                  src={country.flags.png}
                  className="card-img-top"
                  alt={`${country.name.common} flag`}
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5 className="card-title">{country.name.common}</h5>
                  <div className="d-flex justify-content-center gap-2 mt-2">
                    <Link
                      to={`/country/${country.cca3}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://en.wikipedia.org/wiki/${country.name.common}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-12">No countries found</p>
        )}
      </div>
    </div>
  );
}

export default CountrySearch;
