import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Landing_Page from './components/Landing_Page/Landing_Page';
import Login from './components/Login/Login';
import Sign_Up from './components/Sign_Up/Sign_Up';
import BestServices from './components/BestServices/BestServices';
import ProtectedRoute from './components/ProtectedRoute';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import BookingConsultation from './components/BookingConsultation';
import Notification from './components/Notification/Notification';
import ReviewForm from './components/ReviewForm/ReviewForm';
import ProfileForm from "./components/ProfileForm/ProfileForm";
import ReportsLayout from './components/ReportsLayout/ReportsLayout';


function App() {

  const handleCreateAppointment = async (formData) => {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) console.error('Error creando cita');
  };

  return (
    <div className="App">
        {/* Configurar BrowserRouter para enrutamiento */}
        <BrowserRouter>
          <Navbar/>
          <Notification />
          <Routes>
            {/* Definir componentes Route individuales para diferentes páginas */}
            <Route path="/" element={<Landing_Page />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<BestServices />} />
            <Route path="/instant-consultation" element={<ProtectedRoute><InstantConsultation /></ProtectedRoute>} />
            <Route path="/BookingConsultation" element={<ProtectedRoute><BookingConsultation doctorName="Dr. X" doctorSpeciality="Y" onSubmit={handleCreateAppointment} /></ProtectedRoute>} />
            <Route path="/reviews" element={<ProtectedRoute><ReviewForm /></ProtectedRoute>} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/reports" element={<ReportsLayout />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
