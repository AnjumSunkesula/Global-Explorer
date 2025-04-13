import React, { useState } from "react";

function Login({ darkMode }) {
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
    if (!formData.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of Birth is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      errors.password =
        "Password must be 8+ characters with symbol, number, uppercase and lowercase.";
    }
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords must match";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Registration successful!");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password.trim()) errors.password = "Password is required";

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Login successful!");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center login-wrapper">

      <div className="card p-4 shadow-lg login-card" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">{isRegister ? "Register" : "Login"}</h3>

        <form onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}>
          {isRegister && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {formErrors.firstName && <small className="text-danger">{formErrors.firstName}</small>}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {formErrors.lastName && <small className="text-danger">{formErrors.lastName}</small>}
              </div>
              
            </>
          )}

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
          </div>

          <div className="mb-3">
            <input
              type={visiblePassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <small onClick={() => setVisiblePassword((v) => !v)} style={{ cursor: "pointer" }}>
              {visiblePassword ? "Hide" : "Show"} password
            </small>
            {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
          </div>

          {isRegister && (
            <div className="mb-3">
              <input
                type={visibleConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <small onClick={() => setVisibleConfirmPassword((v) => !v)} style={{ cursor: "pointer" }}>
                {visibleConfirmPassword ? "Hide" : "Show"} confirm password
              </small>
              {formErrors.confirmPassword && <div className="text-danger">{formErrors.confirmPassword}</div>}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="text-primary"
              role="button"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Register"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
