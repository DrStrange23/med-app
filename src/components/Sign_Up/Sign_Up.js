import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./Sign_Up.css";

const Sign_Up = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const validators = {
    name: (val) => (val.trim() ? null : "El nombre es obligatorio."),
    phone: (val) =>
      /^\d{10}$/.test(val) ? null : "El teléfono debe tener 10 dígitos.",
    email: (val) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : "Email inválido.",
    password: (val) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(val)
        ? null
        : "La contraseña debe tener ≥8 carac., mayúscula, min., dígito y especial.",
    confirmPassword: (val) =>
      val === form.password ? null : "Las contraseñas no coinciden.",
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleBlur = ({ target: { name } }) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  useEffect(() => {
    const validationErrors = Object.keys(validators).reduce((acc, field) => {
      const error = validators[field](form[field]);
      if (error) acc[field] = error;
      return acc;
    }, {});
    setErrors(validationErrors);
  }, [form]);

  const register = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.authtoken) {
        sessionStorage.setItem("auth-token", data.authtoken);
        ["name", "phone", "email"].forEach((k) =>
          sessionStorage.setItem(k, form[k])
        );
        navigate("/");
        window.location.reload();
      } else {
        setServerError(
          data.errors?.map((e) => e.msg).join(" ") ||
            data.error ||
            "Error desconocido."
        );
      }
    } catch {
      setServerError("No se pudo conectar al servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError("");
    setIsSubmitting(true);
    setTouched(
      Object.keys(form).reduce((acc, f) => ({ ...acc, [f]: true }), {})
    );
    if (Object.keys(errors).length === 0) {
      register();
    } else {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setTouched({});
    setErrors({});
    setServerError("");
    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <div className="signup-text">
        <h1>Sign Up</h1>
      </div>
      <div className="signup-text1">
        Already a member? <Link to="/login" className="link-text">Login</Link>
      </div>
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        {serverError && <div className="error server-error">{serverError}</div>}
        {Object.keys(form).map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              type={
                field.toLowerCase().includes("password") ? "password" : "text"
              }
              className={`form-control${
                errors[field] && touched[field] ? " error-input" : ""
              }`}
              placeholder={`Enter your ${field}`}
              value={form[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              {...(field === "phone" && { inputMode: "numeric", maxLength: 10 })}
            />
            {touched[field] && errors[field] && (
              <small className="error">{errors[field]}</small>
            )}
          </div>
        ))}
        <div className="btn-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            {isSubmitting ? "Enviando..." : "Submit"}
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
  );
};

export default Sign_Up;