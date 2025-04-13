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
import Navbar from './components/navbar';



// import "./index.css"
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
      <button onClick={toggleTheme} className="theme-toggle-button">
        {darkMode ? '☀️' : '🌙'}&nbsp;&nbsp;{darkMode ? 'Light Mode' : 'Dark Mode'}

      </button>
      <Router>
        <Routes>
          <Route exact path='/' Component={WelcomePage}/>
          <Route path='/login' Component={Login} />  

          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/country/:code" element={
            <ProtectedRoute>
              <CountryDetails />
            </ProtectedRoute>
          } />
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
