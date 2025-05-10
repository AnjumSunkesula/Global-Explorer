import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import { BsEyeFill } from "react-icons/bs";





function useIsMobile(breakpoint = 426) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}




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
      localStorage.setItem("currentUser", formData.email);
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

      const matchedUser = existingUsers.find((user) =>user.email === formData.email && user.password === formData.password);

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
      localStorage.setItem("currentUser", formData.email);
      navigate("/home");
    }
  };

  const isMobile = useIsMobile();




  return (
    <div className="vh-100 d-flex justify-content-center align-items-center login-container">
      <div className="login-box">
        <div className="d-flex flex-column mb-3 ps-md-4 title-box">
          <div className="title text-uppercase">{isRegister ? "Create your own account" : "Welcome back! Log in to continue."}</div>
          <div className="title-caption">
            {isRegister ? (
              <>
                Already have an account?{" "} {/* to add space between span and heading */}
                <span onClick={() => setIsRegister(false)} className="text-capitalize">login</span>
              </>
            ) : (
              <> 
                Don't have an account?{" "} 
                <span onClick={() => setIsRegister(true)} className="text-capitalize">register</span>
              </>
            )}
          </div>
        </div>
        <div className="d-flex flex-column pe-md-4 form-container">
          <form onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}>
            {isRegister && (
              <div className="d-md-flex gap-2">
                  <div className={`${!isMobile ? 'mb-3 form-floating' : 'input-wrapper'}  d-flex flex-column`}>
                    <input
                      type="text"
                      name="firstName"
                      className={`form-inputs ${!isMobile ? 'form-control' : 'mobile-inputs'}`} 
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      id="first-name"
                    />
                    {!isMobile && <label htmlFor="first-name">First Name</label>}
                    {formErrors.firstName && <small className="text-danger mt-1">{formErrors.firstName}</small>}
                  </div>
                  <div className={`${!isMobile ? 'mb-3 form-floating' : 'input-wrapper'}  d-flex flex-column`}>
                    <input
                      type="text"
                      name="lastName"
                      className={`form-inputs ${!isMobile ? 'form-control' : 'mobile-inputs'}`}
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      id="last-name"
                    />
                    {!isMobile && <label htmlFor="last-name">Last Name</label>}
                    {formErrors.lastName && <small className="text-danger mt-1">{formErrors.lastName}</small>}
                  </div>
              </div>
            )}

            <div className={`${!isMobile ? 'mb-3 form-floating' : 'input-wrapper'}  d-flex flex-column`}>
              <input
                type="email"
                name="email"
                className={`form-inputs ${!isMobile ? 'form-control' : 'mobile-inputs'} email-input`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                id="email"
              />
            {!isMobile && <label htmlFor="email">Email</label>}
              {formErrors.email && <small className="text-danger mt-1">{formErrors.email}</small>}
            </div>

            <div className="d-md-flex gap-2">
              <div className=" d-flex flex-column">
                <div className={`input-container ${!isMobile ? 'mb-3 form-floating' : 'input-wrapper'}`}>
                  <input
                    type={visiblePassword ? "text" : "password"}
                    name="password"
                    className={`${!isMobile ? 'form-control' : 'mobile-inputs'} form-inputs ${!isRegister ? 'login-password' : ''}`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    id="password"
                  />
                  {!isMobile && <label htmlFor="password">Password</label>}
                  <span onClick={() => setVisiblePassword(!visiblePassword)} className="password-toggle-icon">
                    {visiblePassword ? <LuEyeClosed /> : <BsEyeFill />} 
                  </span>
                </div>
                {formErrors.password && <div className="text-danger mt-1">{formErrors.password}</div>}
              </div>

              {isRegister && (
                <div className=" d-flex flex-column">
                  <div className={`input-container ${!isMobile ? 'mb-3 form-floating' : 'input-wrapper'}`}>
                    <input
                      type={visibleConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className={`form-inputs ${!isMobile ? 'form-control' : 'mobile-inputs'}`}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      id="confirm-password"
                    />
                    {!isMobile && <label htmlFor="confirm-password">Confirm Password</label>}
                    <span
                      className="password-toggle-icon"
                      onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)}
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
          <div className="d-flex align-items-center divider">
            <hr className="flex-grow-1"/>
            <span className="mx-2">OR</span>
            <hr className="flex-grow-1"/>
          </div>
          <div className="text-center text-capitalize guest-mode" onClick={() => navigate('/home')}>continue as guest</div>
        </div>
      </div>
    </div>
  );
}
export default Login;
