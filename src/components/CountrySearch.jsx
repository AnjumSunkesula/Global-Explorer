import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CountrySearch({ countries }) {
  const [search, setSearch] = useState('');

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
        className="row overflow-auto px-2"
        style={{ maxHeight: '500px' }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div
              key={country.cca3}
              className="col-sm-6 col-md-4 col-lg-3 mb-3"
            >
              <div className="card h-100">
                <img
                  src={country.flags.png}
                  className="card-img-top object-fit-fill"
                  alt={`${country.name.common} flag`}
                  style={{ height: '160px'}}
                />
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5 className="card-title">{country.name.common}</h5>
                  <div className="d-flex justify-content-center gap-2 mt-2">
                    <Link
                      to={`/country/${country.cca3}`}
                      className="btn-custom"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://en.wikipedia.org/wiki/${country.name.common}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-custom"
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
