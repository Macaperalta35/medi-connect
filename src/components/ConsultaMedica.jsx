import React from 'react';

function ConsultaMedica({ pacientes }) {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">🧾 Resumen Médico</h2>

      {pacientes.length === 0 ? (
        <p className="text-gray-500">No hay pacientes para mostrar.</p>
      ) : (
        <ul className="space-y-3">
          {pacientes.map((p) => (
            <li key={p.id} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
              <p className="font-bold text-blue-800">👤 {p.nombre}</p>
              <p className="text-sm text-gray-600">RUT: {p.rut} — Fecha: {p.fecha}</p>
              <p className="mt-1 text-sm text-gray-700">
                {p.comentarios && p.comentarios.length > 0
                  ? `📝 Última observación: ${p.comentarios[p.comentarios.length - 1]}`
                  : 'Sin observaciones registradas.'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ConsultaMedica;
