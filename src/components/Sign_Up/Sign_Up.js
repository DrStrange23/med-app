// src/Sign_Up/Sign_Up.js
import React, { useState, useEffect } from "react";
import "./Sign_Up.css";

const Sign_Up = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Regex para validaciones
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const phoneRegex = /^\d{10}$/;

  // Actualiza campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Marca campo como tocado
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Valida todo el formulario
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = "El nombre es obligatorio.";
    }
    if (!phoneRegex.test(form.phone)) {
      errs.phone = "El teléfono debe tener exactamente 10 dígitos.";
    }
    if (!emailRegex.test(form.email)) {
      errs.email = "Email inválido.";
    }
    if (!passwordRegex.test(form.password)) {
      errs.password =
        "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 dígito y 1 carácter especial.";
    }
    if (form.confirmPassword !== form.password) {
      errs.confirmPassword = "Las contraseñas no coinciden.";
    }
    return errs;
  };

  // Efecto: valida en vivo
  useEffect(() => {
    const validationErrors = validate();
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Marcar todos como tocados
    setTouched({
      name: true,
      phone: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Lógica de registro
      console.log("Registrando usuario:", form);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="signup-text">
        <h1>Sign Up</h1>
      </div>
      <div className="signup-text1">
        Already a member?{' '}
        <a href="/login" className="link-text">
          Login
        </a>
      </div>
      <div className="signup-form">
        <form onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              type="text"
              className={`form-control${errors.name && (touched.name || isSubmitting) ? ' error-input' : ''}`}
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.name || isSubmitting) && errors.name && (
              <small className="error">{errors.name}</small>
            )}
          </div>

          {/* Teléfono */}
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              id="phone"
              type="text"
              inputMode="numeric"
              maxLength={10}
              className={`form-control${errors.phone && (touched.phone || isSubmitting) ? ' error-input' : ''}`}
              placeholder="1234567890"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.phone || isSubmitting) && errors.phone && (
              <small className="error">{errors.phone}</small>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className={`form-control${errors.email && (touched.email || isSubmitting) ? ' error-input' : ''}`}
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.email || isSubmitting) && errors.email && (
              <small className="error">{errors.email}</small>
            )}
          </div>

          {/* Contraseña */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className={`form-control${errors.password && (touched.password || isSubmitting) ? ' error-input' : ''}`}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.password || isSubmitting) && errors.password && (
              <small className="error">{errors.password}</small>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              className={`form-control${errors.confirmPassword && (touched.confirmPassword || isSubmitting) ? ' error-input' : ''}`}
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(touched.confirmPassword || isSubmitting) && errors.confirmPassword && (
              <small className="error">{errors.confirmPassword}</small>
            )}
          </div>

          {/* Botones */}
          <div className="btn-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Submit"}
            </button>
            <button
              type="reset"
              className="btn btn-danger"
              onClick={() => {
                setForm({ name: "", phone: "", email: "", password: "", confirmPassword: "" });
                setErrors({});
                setTouched({ name: false, phone: false, email: false, password: false, confirmPassword: false });
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

export default Sign_Up;
