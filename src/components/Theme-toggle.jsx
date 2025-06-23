import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

function Toggle() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    if (savedMode !== null) {
      setDarkMode(savedMode);
    }
  }, []);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return(
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
  );
}
export default Toggle;