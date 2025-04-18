import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import { BsEyeFill } from "react-icons/bs";
function Login() {

  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidPassword = (password) => {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
  };

  const togglePassword = () => {
    setVisiblePassword(!visiblePassword);
  }

  const toggleConfirmPassword = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword);
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name required";
    if (!formData.lastName.trim()) errors.lastName = "Last name required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      errors.password = "Password must be 8+ characters with symbol, number, uppercase and lowercase.";
    }
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords must match";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
    // check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (userExists) {
      alert("An account with this email already exists. Please login.");
      return;
    }

    // save new user
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Registration successful!");
     localStorage.setItem("isAuthenticated", "true"); // set auth status
     navigate("/home");
  }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password.trim()) errors.password = "Password is required";

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = existingUsers.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (!matchedUser) {
      const userExists = existingUsers.some(
        (user) => user.email === formData.email
      );

      if (userExists) {
        alert("Incorrect password. Please try again.");
      } else {
        alert("No account found with this email. Please register first.");
        setIsRegister(true);
      }
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    navigate("/home");
  }
  };



  return (
    <div className="vh-100 d-flex flex-column p-3 flex-md-row align-items-md-center justify-content-start  justify-content-md-between gap-md-5">
      <div className="d-flex flex-column mb-3 ps-md-5">
        <div className="title text-uppercase">{isRegister ? "Create your own account" : "Welcome back! Log in to continue."}</div>
        <div className="title-caption">
          {isRegister ? (
            <>
              Already have an account?{" "} {/* to add space between span and heading */}
              <span onClick={() => setIsRegister(false)} className="text-capitalize text-primary" style={{cursor: 'pointer'}}>login</span>
            </>
          ) : (
            <> 
              Don't have an account?{" "} 
              <span onClick={() => setIsRegister(true)} className="text-capitalize text-primary" style={{cursor: 'pointer'}}>register</span>
            </>

          )}
        </div>
      </div>
      <div className="d-flex pe-md-5">
        <form onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}>
          {isRegister && (
            <div className="d-md-flex gap-2">
                <div className="mb-3 form-floating d-flex flex-column">
                  <input
                    type="text"
                    name="firstName"
                    className="form-inputs form-control"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    id="first-name"
                  />
                  <label for="first-name">First Name</label>
                  {formErrors.firstName && <small className="text-danger mt-1">{formErrors.firstName}</small>}
                </div>
                <div className="mb-3 form-floating d-flex flex-column">
                  <input
                    type="text"
                    name="lastName"
                    className="form-inputs form-control"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    id="last-name"
                  />
                  <label for="last-name">Last Name</label>
                  {formErrors.lastName && <small className="text-danger mt-1">{formErrors.lastName}</small>}
                </div>
            </div>
          )}

          <div className="mb-3 form-floating d-flex flex-column">
            <input
              type="email"
              name="email"
              className="form-inputs form-control email-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              id="email"
            />
            <label for="email">Email</label>
            {formErrors.email && <small className="text-danger mt-1">{formErrors.email}</small>}
          </div>

          <div className="d-md-flex gap-2">
            <div className="mb-3 d-flex flex-column">
              <div className="input-container form-floating">
                <input
                  type={visiblePassword ? "text" : "password"}
                  name="password"
                  className={`form-control form-inputs ${!isRegister ? 'login-password' : ''}`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                />
                <label for="password">Password</label>
                <span onClick={togglePassword} className="password-toggle-icon">
                  {visiblePassword ? <LuEyeClosed /> : <BsEyeFill />} 
                </span>
              </div>
              {formErrors.password && <div className="text-danger mt-1  d-block">{formErrors.password}</div>}
            </div>

            {isRegister && (
              <div className="mb-3 d-flex flex-column">
                <div className="input-container form-floating">
                  <input
                    type={visibleConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="form-inputs form-control"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    id="confirm-password"
                  />
                  <label for="confirm-password">Confirm Password</label>
                  <span
                    className="password-toggle-icon"
                    onClick={toggleConfirmPassword}
                  >
                    {visibleConfirmPassword ? <LuEyeClosed /> : <BsEyeFill />}
                  </span>
                </div>
                {formErrors.confirmPassword && <div className="text-danger mt-1">{formErrors.confirmPassword}</div>}
              </div>
            )}
          </div>


          <button type="submit" className="btn-custom text-center w-100">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        </div>
    </div>
  );
}

export default Login;
