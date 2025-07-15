import { Link } from 'react-router-dom';
import React from 'react';
import './style.css'; // Usamos el style.css general que definimos

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>MediConnect</h2>
      {/* Si tienes un logo, puedes agregarlo aquí */}
      {/* <img src="/ruta-a-logo.png" alt="Logo MediConnect" /> */}

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/registro">Registrar Paciente</Link>
        <Link to="/pacientes">Lista de Pacientes</Link>
        <Link to="/calendario">Calendario</Link>
        <Link to="/diagnostico">Diagnóstico</Link>
        <Link to="/consultas">Consultas</Link>
        <Link to="/estadisticas">Estadísticas</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
