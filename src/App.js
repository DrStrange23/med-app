import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Landing_Page from './components/Landing_Page/Landing_Page';

function App() {
  return (
    <div className="App">
        {/* Configurar BrowserRouter para enrutamiento */}
        <BrowserRouter>
          {/* Mostrar el componente Navbar */}
          <Navbar/>
          <Landing_Page />
          {/* Configurar las Rutas para diferentes páginas */}
          <Routes>
            {/* Definir componentes Route individuales para diferentes páginas */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
