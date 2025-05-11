// Get the currently logged-in user's email
export const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};

// Get saved countries for the current user
export const getUserSavedCountries = () => {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  const allSaved = JSON.parse(localStorage.getItem("userSavedCountries")) || {};
  return Array.isArray(allSaved[currentUser]) ? allSaved[currentUser] : [];
};

// Save a list of countries for the current user
export const saveUserSavedCountries = (countriesArray) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const allSaved = JSON.parse(localStorage.getItem("userSavedCountries")) || {};
  allSaved[currentUser] = countriesArray;
  localStorage.setItem("userSavedCountries", JSON.stringify(allSaved));
};

// Add a country to the current user's saved countries
export const addCountryToSaved = (country) => {
  const saved = getUserSavedCountries();
  const exists = saved.some((c) => c.cca3 === country.cca3);
  if (!exists) {
    const updated = [...saved, country];
    saveUserSavedCountries(updated);
  }
};

// Remove a country from the current user's saved countries
export const removeCountryFromSaved = (countryCode) => {
  const saved = getUserSavedCountries();
  const updated = saved.filter((country) => country.cca3 !== countryCode);
  saveUserSavedCountries(updated);
};