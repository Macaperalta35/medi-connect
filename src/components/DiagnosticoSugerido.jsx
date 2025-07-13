import React, { useState } from 'react';

const posiblesDiagnosticos = {
  fiebre: 'Infección viral o bacteriana',
  tos: 'Gripe o COVID-19',
  dolor: 'Inflamación o lesión muscular',
  cansancio: 'Anemia o estrés',
  náuseas: 'Problemas gastrointestinales'
};

function DiagnosticoSugerido() {
  const [seleccionados, setSeleccionados] = useState([]);

  const toggleSintoma = (s) => {
    setSeleccionados(seleccionados.includes(s)
      ? seleccionados.filter(x => x !== s)
      : [...seleccionados, s]
    );
  };

  const diagnosticos = seleccionados.map(s => posiblesDiagnosticos[s]);

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">🧠 Diagnóstico Sugerido</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        {Object.keys(posiblesDiagnosticos).map((s, i) => (
          <label key={i} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={seleccionados.includes(s)}
              onChange={() => toggleSintoma(s)}
              className="accent-blue-600"
            />
            <span className="capitalize">{s}</span>
          </label>
        ))}
      </div>

      <div>
        <p className="font-semibold text-green-700">Diagnósticos posibles:</p>
        {diagnosticos.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {diagnosticos.map((d, i) => (
              <li key={i}>🧾 {d}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">Selecciona síntomas para ver sugerencias.</p>
        )}
      </div>
    </div>
  );
}

export default DiagnosticoSugerido;
