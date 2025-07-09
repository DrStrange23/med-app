import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import './DoctorCard.css';
import { v4 as uuidv4 } from 'uuid';


const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  
  const handleBookingClick = () => {
    setShowModal(true);
  };

  const handleFormSubmit = (appointmentData) => {
    setAppointments((prev) => [
      ...prev,
      { id: uuidv4(), ...appointmentData }
    ]);
    setShowModal(false);
  };

  const handleCancel = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card__info">
        <img 
          src={profilePic || '/placeholder-profile.png'}
          alt={`${name} profile`} 
          className="doctor-card__avatar" 
        />
        <div className="doctor-card__details">
          <h2 className="doctor-card__name">{name}</h2>
          <p className="doctor-card__speciality">{speciality}</p>
          <p className="doctor-card__experience">{experience} years experience</p>
          <p className="doctor-card__ratings">Ratings: {ratings}</p>
        </div>
        {/* Acción rápida: Book Appointment */}
        <div>
          <button className="book-appointment-btn">
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
          </button>
        </div>
      </div>

      <div className="doctor-card__actions">
        <Popup
          trigger={
            <button
              className={`btn ${appointments.length ? 'btn--cancel' : 'btn--book'}`}
              onClick={handleBookingClick}
            >
              {appointments.length ? 'Cancel Appointment' : 'Book Appointment'}
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="modal">
              <button className="modal__close" onClick={close}>×</button>
              <div className="modal__header">
                <h3>{name}</h3>
                <p>{speciality}</p>
              </div>

              {appointments.length > 0 ? (
                <div className="modal__content">
                  <h4>Appointment Booked!</h4>
                  {appointments.map((appt) => (
                    <div className="appointment" key={appt.id}>
                      <p><strong>Name:</strong> {appt.name}</p>
                      <p><strong>Phone:</strong> {appt.phoneNumber}</p>
                      <button 
                        className="btn btn--cancel"
                        onClick={() => handleCancel(appt.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <AppointmentForm
                  doctorName={name}
                  doctorSpeciality={speciality}
                  onSubmit={handleFormSubmit}
                />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;