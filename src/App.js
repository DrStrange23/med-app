import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Landing_Page from './components/Landing_Page/Landing_Page';
import Login from './components/Login/Login';
import Sign_Up from './components/Sign_Up/Sign_Up';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import BookingConsultation from './components/BookingConsultation';

function App() {
  return (
    <div className="App">
        {/* Configurar BrowserRouter para enrutamiento */}
        <BrowserRouter>
          {/* Mostrar el componente Navbar */}
          <Navbar/>
          {/* Configurar las Rutas para diferentes páginas */}
          <Routes>
            {/* Definir componentes Route individuales para diferentes páginas */}
            <Route path="/" element={<Landing_Page />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Login />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/BookingConsultation" element={<BookingConsultation />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
