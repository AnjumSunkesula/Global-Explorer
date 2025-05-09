import React from "react";
import { useNavigate } from "react-router-dom";

function AuthModal({ show, onClose }) {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Authentication Required</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>You need to Login or Register to complete this action.</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-danger" onClick={onClose}>Cancel</button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                onClose();
                navigate("/login");
              }}
            >
              Unlock Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AuthModal;