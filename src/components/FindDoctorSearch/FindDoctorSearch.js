import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindDoctorSearch.css';

const INIT_SPECIALITIES = [
  'Dentist',
  'Gynecologist/Obstetrician',
  'General Physician',
  'Dermatologist',
  'ENT Specialist',
  'Homeopath',
  'Ayurveda',
];

export default function FindDoctorSearch() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [specialities] = useState(INIT_SPECIALITIES);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleSelect = (speciality) => {
    setQuery(speciality);
    setShowResults(false);
    navigate(`/BookingConsultation?speciality=${encodeURIComponent(speciality)}`);
    window.location.reload();
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="finddoctor" ref={containerRef}>
      <h1>Find a doctor and Consult instantly</h1>
      <div className="finddoctor__icon">
        <i className="fa fa-user-md" aria-hidden="true" />
      </div>

      <div className="home-search-container">
        <div className="doctor-search-box">
          <input
            type="text"
            className="search-doctor-input-box"
            placeholder="Search doctors, clinics, hospitals, etc."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowResults(true)}
          />

          <div className="findiconimg">
            <img
              className="findIcon"
              src={`${process.env.PUBLIC_URL}/images/search.svg`}
              alt="search icon"
            />
          </div>

          <div
            className="search-doctor-input-results"
            hidden={!showResults}
          >
            {specialities
              .filter((s) =>
                s.toLowerCase().includes(query.toLowerCase())
              )
              .map((speciality) => (
                <div
                  key={speciality}
                  className="search-doctor-result-item"
                  onMouseDown={() => handleSelect(speciality)}
                >
                  <span>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/search.svg`}
                      alt=""
                      width="12"
                      height="12"
                    />
                  </span>
                  <span>{speciality}</span>
                  <span className="result-label">SPECIALITY</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}