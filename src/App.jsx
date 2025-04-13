import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from "./components/welcome"
import Login from "./components/login";
import { useState,useEffect } from 'react';
import './App.css'
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
        </Routes>
      </Router>
    </>
  )
}

export default App;
