import React, { useState, useEffect } from "react";
import CountrySearch from "../components/CountrySearch";
import Navbar from "../components/navbar";

function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  return (
     <div className="d-flex flex-column min-vh-100">
      <Navbar />
      {/* Hero Section */}
      <section className="hero text-white text-center py-5  mt-5">
        <div className="container">
          <h1 className="display-4 mb-3">Explore the World</h1>
          <p className="lead mb-4">
            Discover countries, cultures, and fascinating facts all in one place.
          </p>
        </div>
      </section>

      {/* Search Section */}
       <main className="flex-fill py-4">
        <div className="container">
          <h2 className="text-center mb-4">Search Countries</h2>
          <CountrySearch countries={countries} />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="footer text-center py-4 mt-auto fixed-bottom">
        <div className="container">
          <p className="mb-0">Explore the world with us! Discover countries, cultures, and much more.</p>
          <p className="mb-0">Created by Anjum | All Rights Reserved &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
      
    </div>
  );
}

export default Home;
