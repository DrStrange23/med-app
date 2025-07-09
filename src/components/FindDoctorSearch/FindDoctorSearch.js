import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindDoctorSearch.css';

const SPECIALITIES = [
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
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleSelect = (speciality) => {
    setQuery(speciality);
    setShowResults(false);
    navigate(`/instant-consultation?speciality=${encodeURIComponent(speciality)}`);
  };

  const filtered = SPECIALITIES.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="find-doctor" ref={containerRef}>
      <h1 className="find-doctor__title">Find a doctor and consult instantly</h1>
      <div className="find-doctor__icon">
        <i className="fa fa-user-md" aria-hidden="true" />
      </div>
      <div className="find-doctor__search">
        <input
          type="text"
          className="find-doctor__input"
          placeholder="Search doctors, clinics, hospitals, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        <div
          className="find-doctor__results"
          hidden={!showResults || filtered.length === 0}
        >
          {filtered.map((speciality) => (
            <div
              key={speciality}
              className="find-doctor__result-item"
              onMouseDown={() => handleSelect(speciality)}
            >
              <div className="find-doctor__result-icon">
                🔍
              </div>
              <span className="find-doctor__result-main">{speciality}</span>
              <span className="find-doctor__result-sub">SPECIALITY</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
