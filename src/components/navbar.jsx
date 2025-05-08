import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function Navbar () {

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/login"); // or whatever your login route is
    }
  }, [navigate]);

  const handleDeleteAccount = () => {

     const confirmDelete = window.confirm("Are you sure you want to delete your account permanently?");
  if (!confirmDelete) return;
  const currentUserEmail = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = users.filter(user => user.email !== currentUserEmail);
  localStorage.setItem("users", JSON.stringify(updatedUsers));

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
        <div className="offcanvas offcanvas-end custom-offcanvas" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
                <Link className="nav-link" to="/saved">Saved Countries</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <button 
                  type='button'
                  className='nav-link'
                  data-bs-toggle='modal'
                  data-bs-target="#deleteAccountModalLabel"
                >
                  Delete button
                </button>
                {/* <Link className="nav-link" to="/login" onClick={handleDeleteAccount}>delete accouhnt</Link> */}
              </li>
              {/* modal */}
            </ul>
              <div className='modal fade' id='deleteAccountModalLabel' data-bs-backdrop='static' data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className='modal-dialog modal-dialog-centered responsive-modal'>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className='modal-title' id='deleteAccountModalLabel'>confirm</h5>
                      <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className="modal-body"> Are you sure you want to permanently delete your account? This cannot be undone.</div>
                    <div className="modal-footer">
                       <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                          Cancel
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDeleteAccount} data-bs-dismiss="modal">
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