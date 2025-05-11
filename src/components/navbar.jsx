import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

function Navbar () {

  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const currentUserEmail = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  
  const isGuest = !currentUserEmail || !users.some(user => user.email === currentUserEmail);

  const handleDeleteAccount = () => {
    // Remove saved countries for current user
    const allSaved = JSON.parse(localStorage.getItem("userSavedCountries")) || {};
    
    if (allSaved[currentUserEmail]) {
      delete allSaved[currentUserEmail]; // remove user-specific entry
      localStorage.setItem("userSavedCountries", JSON.stringify(allSaved));
      console.log("Deleted saved countries for:", currentUserEmail);
    }

    // Remove user from users list
    const updatedUsers = users.filter(user => user.email !== currentUserEmail);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.removeItem(`savedCountries_${currentUserEmail}`);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");

    alert("Your account has been deleted. You will need to register again to log in.");
    navigate("/login");
  };


  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Global Explorer</Link>

        {/* Offcanvas Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas Menu */}
        <div className='offcanvas offcanvas-end custom-offcanvas' tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-start"
                  onClick={() => {
                    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
                    if (!isAuthenticated) {
                      setShowAuthModal(true);
                    } else {
                      navigate("/saved");
                    }
                  }}
                >
                  Saved Countries
                </button>
              </li>
              <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)}/>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <button 
                  type='button'
                  className={`nav-link ${isGuest ? "disabled" : ""}`}
                  data-bs-toggle='modal'
                  data-bs-target="#deleteAccountModalLabel"
                  disabled={isGuest}
                >
                  Delete Account
                </button>
              </li>
              {/* modal */}
            </ul>
              <div className='modal fade' id='deleteAccountModalLabel' data-bs-backdrop='static' data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className='modal-dialog modal-dialog-centered'>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className='modal-title text-capitalize ' id='deleteAccountModalLabel'>confirm deletion</h5>
                      <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className="modal-body"> Are you sure you want to permanently delete your account? This cannot be undone.</div>
                    <div className="modal-footer">
                       <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">
                          Cancel
                        </button>
                        <button type="button" className="btn btn-outline-success" onClick={handleDeleteAccount} data-bs-dismiss="modal">
                          Yes, Delete My Account
                        </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="custom-offcanvas-backdrop"></div>
    </nav>
  );
};
export default Navbar;