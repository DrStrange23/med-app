import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState('');

  // Prevent selecting past dates
  const today = new Date().toISOString().split('T')[0];

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, date, time: selectedSlot });
    setName('');
    setPhoneNumber('');
    setDate('');
    setSelectedSlot(null);
  };

  // Example time slots
  const slots = ['09:00', '10:00', '11:00', '14:00', '15:00'];

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h4 className="appointment-form__header">
        Book with Dr. {doctorName} ({doctorSpeciality})
      </h4>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
          required
        />
      </div>

      <div className="form-group">
        <label>Time Slot:</label>
        <div className="slots-container">
          {slots.map((slot) => (
            <button
              key={slot}
              type="button"
              className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
              onClick={() => handleSlotSelection(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!selectedSlot || !date}
      >
        Book Now
      </button>
    </form>
  );
};

export default AppointmentForm;