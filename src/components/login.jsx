import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import { BsEyeFill } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"; 




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

  const validateField = (name, value, allValues = {}) => {
    let error = "";
  
    if (name === "firstName" || name === "lastName") {
      if (!value.trim()) {
        error = `${name === "firstName" ? "First" : "Last"} name required`;
      }
    }
    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email";
      }
    }
    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (!isValidPassword(value)) {
        error = "Password must be 8+ characters, symbol, number, upper & lower case";
      }
    }
    if (name === "confirmPassword") {
      if (value !== allValues.password) {
        error = "Passwords must match";
      }
    }
    return error;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update formData state
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };
      const error = validateField(name, value, updatedForm);
      setFormErrors((errors) => ({ ...errors, [name]: error }));
      return updatedForm;
    });
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

    for (const field of ["firstName", "lastName", "email", "password", "confirmPassword"]) {
      const error = validateField(field, formData[field], formData);
      if (error) errors[field] = error;
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

    for (const field of ["email", "password"]) {
      const error = validateField(field, formData[field], formData);
      if (error) errors[field] = error;
    }
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
                      className={`form-inputs ${!isMobile ? 'form-control' : 'mobile-inputs'} ${formData.firstName ? formErrors.firstName ? 'border border-danger': 'border border-success': ''}`} 
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      id="first-name"
                    />
                    
                    {!isMobile && <label htmlFor="first-name">First Name</label>}

                    {formData.firstName && (
                      <span className='position-absolute fs-5 end-0 top-50 translate-middle-y pe-3'>
                        {formErrors.firstName ? (
                          <AiOutlineClose className="text-danger" />
                        ) : (
                          <AiOutlineCheck className="text-success" />
                        )}
                      </span>
                    )}
                  </div>
                  <div className={`${!isMobile ? 'mb-3 form-floating' : 'input-wrapper'}  d-flex flex-column`}>
                    <input
                      type="text"
                      name="lastName"
                      className={`form-inputs ${!isMobile ? 'form-control' : 'mobile-inputs'} ${formData.lastName ? formErrors.lastName ? 'border border-danger': 'border border-success': ''}`}
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      id="last-name"
                    />

                    {!isMobile && <label htmlFor="last-name">Last Name</label>}

                    {formData.lastName && (
                      <span className='position-absolute fs-5 end-0 top-50 translate-middle-y pe-3'>
                        {formErrors.lastName ? (
                          <AiOutlineClose className="text-danger" />
                        ) : (
                          <AiOutlineCheck className="text-success" />
                        )}
                      </span>
                    )}
                  </div>
              </div>
            )}

            <div className={`${!isMobile ? 'mb-3 form-floating' : 'input-wrapper'} d-flex flex-column position-relative`}>
              <input
                type="email"
                name="email"
                className={`form-inputs email-input ${!isMobile ? 'form-control' : 'mobile-inputs'} ${formData.email ? formErrors.email ? 'border border-danger': 'border border-success': ''}`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                id="email"
              />

              {!isMobile && <label htmlFor="email">Email</label>}

              {formData.email && (
                <span className={`position-absolute fs-5 end-0 translate-middle-y pe-3 ${formErrors.email ? 'icon-x' : 'top-50'}`}>
                  {formErrors.email ? (
                    <AiOutlineClose className="text-danger" />
                  ) : (
                    <AiOutlineCheck className="text-success" />
                  )}
                </span>
              )}

              {formErrors.email && <small className="text-danger mt-1">{formErrors.email}</small>}
            </div>


            <div className="d-md-flex gap-2" >
              <div className={`${!isMobile ? 'mb-3 form-floating' : 'input-wrapper'} d-flex flex-column position-relative`} style={{ width: 'min-content'}}>
                <input
                  type={visiblePassword ? "text" : "password"}
                  name="password"
                  className={`form-inputs position-relative ${!isMobile ? 'form-control' : 'mobile-inputs'}  ${!isRegister ? 'login-password' : ''} ${formErrors.password ? 'border border-danger' : formData.password ? 'border border-success' : ''}`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                />
                {!isMobile && <label htmlFor="password">Password</label>}
                <div className={`icon-wrapper ${formErrors.password ? 'error' : 'valid'}`}>
                  {formData.password && (
                    <span className={`validation-icon ${formErrors.password ? 'text-danger' : 'text-success'}`}>
                      {formErrors.password ? <AiOutlineClose /> : <AiOutlineCheck />}
                    </span>
                  )}
                  <span className="password-toggle-icon" onClick={() => setVisiblePassword(!visiblePassword)}>
                    {visiblePassword ? <LuEyeClosed /> : <BsEyeFill />}
                  </span>
                </div>


                {formErrors.password && <small className="text-danger mt-1" style={{width: '100%'}}>{formErrors.password}</small>}
              </div>

              {isRegister && (
                <div className={`${!isMobile ? 'mb-3 form-floating' : 'input-wrapper'} d-flex flex-column position-relative`}>
                  <input
                    type={visibleConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className={`form-inputs ${!isMobile ? 'form-control' : 'mobile-inputs'} ${formErrors.confirmPassword ? 'border border-danger' : formData.confirmPassword ? 'border border-success' : ''}`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    id="confirm-password"
                  />
                  {!isMobile && <label htmlFor="confirm-password">Confirm Password</label>}
                  <div className={`icon-wrapper ${formErrors.password ? 'error' : 'valid'}`}>
                    {formData.confirmPassword && (
                      <span className={`validation-icon ${formErrors.confirmPassword ? 'text-danger' : 'text-success'}`}>
                        {formErrors.confirmPassword ? <AiOutlineClose /> : <AiOutlineCheck />}
                      </span>
                    )}
                    <span className="password-toggle-icon" onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)}>
                      {visibleConfirmPassword ? <LuEyeClosed /> : <BsEyeFill />}
                    </span>
                </div>

                  {formErrors.confirmPassword && <small className="text-danger mt-1">{formErrors.confirmPassword}</small>}
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
