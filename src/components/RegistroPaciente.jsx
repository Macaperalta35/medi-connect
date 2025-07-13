import React from 'react';

function RegistroPaciente({
  nombre, setNombre,
  rut, setRut,
  fecha, setFecha,
  comentario, setComentario,
  onSubmit,
  editandoId
}) {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        {editandoId ? '✏️ Editar Paciente' : '➕ Registrar Paciente'}
      </h2>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="RUT (12345678-9)"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <textarea
          className="border p-2 rounded col-span-1 md:col-span-2"
          placeholder="Observación médica inicial"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-1 md:col-span-2"
        >
          {editandoId ? '💾 Guardar Cambios' : 'Registrar Paciente'}
        </button>
      </form>
    </div>
  );
}

export default RegistroPaciente;
