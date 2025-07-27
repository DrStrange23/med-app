import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    date: '',
    time: '',
  });

  // No permitir fechas pasadas
  const today = new Date().toISOString().split('T')[0];

  // Franjas horarias de ejemplo
  const slots = ['09:00', '10:00', '11:00', '14:00', '15:00'];

  const handleChange = ({ target: { name, value } }) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // ← Aquí guardamos en sessionStorage justo al confirmar
    sessionStorage.setItem(
      'doctorData',
      JSON.stringify({
        name: doctorName,
        speciality: doctorSpeciality
      })
    );
    sessionStorage.setItem(
      'appointmentData',
      JSON.stringify({
        date: form.date,
        time: form.time
      })
    );

    // Ahora llamamos al onSubmit que crea la cita en el backend
    onSubmit(form);

    // Limpiamos el formulario
    setForm({ name: '', phoneNumber: '', date: '', time: '' });
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h4 className="appointment-form__header">
        Book with Dr. {doctorName} ({doctorSpeciality})
      </h4>

      {/* Nombre */}
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Teléfono */}
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      {/* Fecha */}
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          min={today}
          required
        />
      </div>

      {/* Menú desplegable de franjas horarias */}
      <div className="form-group">
        <label htmlFor="time">Time Slot:</label>
        <select
          id="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a time
          </option>
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!form.date || !form.time}
      >
        Book Now
      </button>
    </form>
  );
};

export default AppointmentForm;
