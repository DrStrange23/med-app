import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { API_URL } from "../../config";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setIsSubmitting(true);
    setTouched({ email: true, password: true });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();

        if (res.ok && data.authtoken) {
          sessionStorage.setItem("auth-token", data.authtoken);
          // volvemos a la raíz y recargamos, como en tu flujo original
          navigate("/");
          window.location.reload();
        } else {
          setServerError(data.message || "Credenciales inválidas.");
        }
      } catch (err) {
        setServerError("No se pudo conectar al servidor.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({ email: "", password: "" });
    setErrors({});
    setTouched({ email: false, password: false });
    setServerError("");
    setIsSubmitting(false);
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
          {serverError && (
            <div className="server-error">
              <small className="error">{serverError}</small>
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className={`form-control${
                errors.email && (touched.email || isSubmitting)
                  ? " error-input"
                  : ""
              }`}
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
              className={`form-control${
                errors.password && (touched.password || isSubmitting)
                  ? " error-input"
                  : ""
              }`}
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
              type="button"
              className="btn btn-danger"
              onClick={handleReset}
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