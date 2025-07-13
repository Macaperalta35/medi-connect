import React from 'react';

function ListaPacientes({ pacientes, onEditar, onEliminar, onAgendar, onObservacion }) {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">📋 Lista de Pacientes</h2>

      {pacientes.length === 0 ? (
        <p className="text-gray-500">No hay pacientes registrados.</p>
      ) : (
        <ul className="space-y-4">
          {pacientes.map((p) => (
            <li
              key={p.id}
              className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded-md shadow-sm"
            >
              <p><strong>👤 {p.nombre}</strong> — <span className="text-sm text-gray-600">RUT: {p.rut}</span></p>
              <p>📅 Fecha de nacimiento: {p.fecha}</p>

              <div className="mt-2">
                <p className="font-semibold">📝 Observaciones:</p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {(p.comentarios || []).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <p className="font-semibold">📅 Consultas:</p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {(p.consultas || []).map((c, i) => (
                    <li key={i}>📌 {c}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => onEditar(p)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => onEliminar(p.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  🗑️ Eliminar
                </button>
                <button
                  onClick={() => onAgendar(p.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  📅 Agendar Consulta
                </button>
                <button
                  onClick={() => onObservacion(p.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  ➕ Añadir Observación
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaPacientes;
