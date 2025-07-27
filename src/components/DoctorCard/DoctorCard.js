import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [hasAppointment, setHasAppointment] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  // Mantener estado tras recarga
  useEffect(() => {
    const apps = JSON.parse(sessionStorage.getItem('appointments')) || [];
    const found = apps.find(a => a.doctor.name === name);
    if (found) {
      setHasAppointment(true);
      setCurrentAppointment(found);
    }
  }, [name]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleFormSubmit = (data) => {
    const id = uuidv4();
    const newApp = { id, doctor: { name, speciality, experience, ratings, profilePic }, ...data };
    const apps = JSON.parse(sessionStorage.getItem('appointments')) || [];
    const updated = [...apps, newApp];
    sessionStorage.setItem('appointments', JSON.stringify(updated));
    window.dispatchEvent(new Event('sessionStorageUpdated'));
    setCurrentAppointment(newApp);
    setHasAppointment(true);
    setShowModal(false);
  };

  const handleCancel = () => {
    const apps = JSON.parse(sessionStorage.getItem('appointments')) || [];
    const updated = apps.filter(a => a.doctor.name !== name);
    sessionStorage.setItem('appointments', JSON.stringify(updated));
    window.dispatchEvent(new Event('sessionStorageUpdated'));
    setHasAppointment(false);
    setCurrentAppointment(null);
    setShowModal(false);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>
      <div className="doctor-card-options-container">
        <Popup
          trigger={
            <button onClick={hasAppointment ? handleCancel : handleBooking} className={`book-appointment-btn ${hasAppointment ? 'cancel-appointment' : ''}`}>
              {hasAppointment ? 'Cancel Appointment' : 'Book Appointment'}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {close => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'auto' }}>
              {hasAppointment && currentAppointment ? (
                <div className="bookedInfo">
                  <h3>Appointment Details</h3>
                  <p>Name: {currentAppointment.name}</p>
                  <p>Phone Number: {currentAppointment.phoneNumber}</p>
                  <p><strong>Date:</strong> {currentAppointment.date}</p>
                  <p><strong>Time:</strong> {currentAppointment.time}</p>
                  <button onClick={handleCancel}>Cancel Appointment</button>
                </div>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;