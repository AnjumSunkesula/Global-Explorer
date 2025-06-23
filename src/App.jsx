import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from "./components/welcome"
import Login from "./components/login";
import './App.css'
import Home from './pages/home';
import CountryDetails from "./components/CountryDetails";
import SavedCountries from "./components/SavedCountries";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; // NEW

function App() {
  return (
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
  )
}
export default App;