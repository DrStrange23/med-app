import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const location = useLocation();

  const loadAppointments = () => {
    const stored = JSON.parse(sessionStorage.getItem('appointments')) || [];
    setAppointments(stored);
  };

  // Carga inicial y al cambiar de ruta
  useEffect(() => {
    loadAppointments();
  }, [location]);

  // Escucha eventos de actualización
  useEffect(() => {
    window.addEventListener('sessionStorageUpdated', loadAppointments);
    return () => window.removeEventListener('sessionStorageUpdated', loadAppointments);
  }, []);

  return (
    <>
      <Navbar />
      {children}
      {visible && appointments.length > 0 && (
        <div className="appointment-card">
          <button
            className="appointment-card__close"
            onClick={() => setVisible(false)}
            aria-label="Close notification"
          >
            ×
          </button>
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Your Appointments</h3>
            {appointments.map(app => (
              <div key={app.id} className="appointment-card__message">
                <p><strong>Doctor:</strong> {app.doctor.name} ({app.doctor.speciality})</p>
                <p><strong>Name:</strong> {app.name}</p>
                <p><strong>Phone:</strong> {app.phoneNumber}</p>
                <p><strong>Date:</strong> {app.date}</p>
                <p><strong>Time:</strong> {app.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;