import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from "./components/welcome"
import Login from "./components/login";
import { useState,useEffect } from 'react';
import './App.css'
import Home from './pages/home';
import CountryDetails from "./components/CountryDetails";
import SavedCountries from "./components/SavedCountries";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; // NEW
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';


function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <>
      <div className="theme-toggle-wrapper">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={toggleTheme} 
          />
          <span className="slider">
             <FontAwesomeIcon icon={faSun} className="icon-left" />
             <FontAwesomeIcon icon={faMoon} className="icon-right" />
          </span>
        </label>
      </div>
      <Router>
        <Routes>
          <Route exact path='/' Component={WelcomePage}/>
          <Route path='/login' Component={Login} />  

          <Route path="/home" Component={Home} />
          <Route path="/country/:code" Component={CountryDetails} />
          <Route path="/saved" element={
            <ProtectedRoute>
              <SavedCountries />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}
export default App;