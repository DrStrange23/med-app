import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BestServices.css';

const services = [
  { title: "Instant Consultation", img: "/img/consultation.svg", path: "/instant-consultation"  },
  { title: "Book an Appointment", img: "/img/Instant.svg", path: "/BookingConsultation" },
  { title: "Self Checkup", img: "/img/SelfCheckOut.svg" },
  { title: "Health Tips and Guidance", img: "/img/CheckUp.svg" }
];

export default function BestServices() {
  
    const navigate = useNavigate();

    const handleClick = (path) => {
      navigate(path);
    };
    return (
        <div className="best-services">
          <h2>Best Services</h2>
          <p>Love yourself enough to live a healthy lifestyle.</p>
          <div className="service-grid">
            {services.map((s, i) => (
              <div
                className="service-card"
                key={i}
                onClick={() => handleClick(s.path)}
                style={{ cursor: 'pointer' }}
              >
                <img src={s.img} alt={s.title} />
                <h4>{s.title}</h4>
              </div>
            ))}
          </div>
        </div>
      );
    }