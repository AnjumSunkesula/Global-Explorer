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
    <div>
      <Navbar/>
      <h1>Explore the World</h1>
      <CountrySearch countries={countries} />
    </div>
  );
}

export default Home;
