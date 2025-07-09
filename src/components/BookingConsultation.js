import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';
import

const BookingConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  // 1) Carga inicial de doctores
  useEffect(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 2) Si viene ?speciality= en la URL, filtramos automáticamente
  useEffect(() => {
    const speciality = searchParams.get('speciality');
    if (speciality && doctors.length) {
      const filtered = doctors.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  }, [searchParams, doctors]);

  // 3) Handler manual desde el componente de búsqueda
  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }

    const filtered = doctors.filter((doc) =>
      doc.speciality.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  // 4) Si no está logueado, redirigir
  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    if (!token) navigate('/login');
  }, [navigate]);

  return (
    <div className="searchpage-container">
      <FindDoctorSearch onSearch={handleSearch} />

      {isSearched && (
        <div className="search-results-container">
          <h2>
            {filteredDoctors.length} doctor
            {filteredDoctors.length !== 1 ? 's' : ''} available
          </h2>
          <h3>Book appointments with minimum wait-time & verified details</h3>

          {filteredDoctors.length > 0 ? (
            <div className="doctor-list">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  className="doctorcard"
                  key={doctor.name}
                  {...doctor}
                />
              ))}
            </div>
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingConsultation;