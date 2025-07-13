import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarioConsultas({ pacientes }) {
  const fechas = pacientes.flatMap(p => p.consultas || []);

  const marcarFechas = ({ date, view }) => {
    if (view === 'month') {
      const fechaStr = date.toISOString().split('T')[0];
      return fechas.includes(fechaStr) ? 'bg-green-200 rounded-full' : null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">📆 Calendario de Consultas</h2>
      <Calendar tileClassName={marcarFechas} />
    </div>
  );
}

export default CalendarioConsultas;
