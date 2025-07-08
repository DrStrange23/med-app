import React, { useState, useEffect } from "react";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const errs = {};
    if (!emailRegex.test(form.email)) {
      errs.email = "Email inválido.";
    }
    if (!form.password) {
      errs.password = "La contraseña es obligatoria.";
    } else if (form.password.length < 6) {
      errs.password = "Debe tener al menos 6 caracteres.";
    }
    return errs;
  };

  useEffect(() => {
    const validationErrors = validate();
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTouched({ email: true, password: true });
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Lógica de login (API)
      console.log("Autenticando:", form);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="login-text">
        <h1>Login</h1>
      </div>
      <div className="login-text">
        Are you a new member?{" "}
        <a href="/signup" style={{ color: "#2190FF" }}>
          Sign Up Here
        </a>
      </div>

      <div className="login-form">
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className={`form-control${errors.email && (touched.email || isSubmitting) ? " error-input" : ""}`}
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.email || isSubmitting) && errors.email && (
              <small className="error">{errors.email}</small>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className={`form-control${errors.password && (touched.password || isSubmitting) ? " error-input" : ""}`}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.password || isSubmitting) && errors.password && (
              <small className="error">{errors.password}</small>
            )}
          </div>

          {/* Botones */}
          <div className="btn-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Login"}
            </button>
            <button
              type="reset"
              className="btn btn-danger"
              onClick={() => {
                setForm({ email: "", password: "" });
                setErrors({});
                setTouched({ email: false, password: false });
                setIsSubmitting(false);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;