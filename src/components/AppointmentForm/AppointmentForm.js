import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    date: '',
    time: ''
  });

  // Actualiza cualquier campo
  const handleChange = ({ target: { name, value } }) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Envía todos los datos
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', phoneNumber: '', date: '', time: '' });
  };

  // Fecha mínima (hoy) para bloquear fechas pasadas
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form" noValidate>
      <h4 className="appointment-form__header">
        Cita con Dr. {doctorName} ({doctorSpeciality})
      </h4>

      {/* Nombre del paciente */}
      <div className="appointment-form__group">
        <label htmlFor="name" className="appointment-form__label">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          className="appointment-form__input"
          placeholder="Tu nombre completo"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Teléfono */}
      <div className="appointment-form__group">
        <label htmlFor="phoneNumber" className="appointment-form__label">Teléfono</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          className="appointment-form__input"
          placeholder="e.g. 1234567890"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      {/* Fecha de la cita */}
      <div className="appointment-form__group">
        <label htmlFor="date" className="appointment-form__label">Fecha</label>
        <input
          id="date"
          name="date"
          type="date"
          className="appointment-form__input"
          value={form.date}
          onChange={handleChange}
          required
          min={today}
        />
      </div>

      {/* Hora de la cita */}
      <div className="appointment-form__group">
        <label htmlFor="time" className="appointment-form__label">Hora</label>
        <input
          id="time"
          name="time"
          type="time"
          className="appointment-form__input"
          value={form.time}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="appointment-form__btn">
        Reservar Cita
      </button>
    </form>
  );
};

export default AppointmentForm;