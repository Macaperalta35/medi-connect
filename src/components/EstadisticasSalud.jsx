import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

function CovidEstadisticas() {
  const [datos, setDatos] = useState(null);
  const [pais, setPais] = useState('Chile');

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/countries/${pais}`)
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.error('Error al obtener datos:', err));
  }, [pais]);

  const datosGrafico = datos ? [
    { name: 'Casos', value: datos.cases },
    { name: 'Muertes', value: datos.deaths },
    { name: 'Recuperados', value: datos.recovered },
    { name: 'Vacunados', value: datos.population && datos.population > 0 ? datos.tests : 0 },
  ] : [];

  return (
    <div className="formulario">
      <h2 className="text-2xl font-bold mb-4">📊 Estadísticas COVID-19: {pais}</h2>

      <select
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="Chile">Chile</option>
        <option value="Argentina">Argentina</option>
        <option value="Brazil">Brasil</option>
        <option value="Spain">España</option>
        <option value="USA">Estados Unidos</option>
        <option value="France">Francia</option>
        <option value="Germany">Alemania</option>
      </select>

      {datos ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white shadow rounded">
              <p className="text-gray-600">Casos totales</p>
              <p className="text-xl font-bold text-blue-600">{datos.cases.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <p className="text-gray-600">Muertes</p>
              <p className="text-xl font-bold text-red-600">{datos.deaths.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <p className="text-gray-600">Recuperados</p>
              <p className="text-xl font-bold text-green-600">{datos.recovered.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <p className="text-gray-600">Test realizados</p>
              <p className="text-xl font-bold text-purple-600">{datos.tests.toLocaleString()}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">📈 Visualización gráfica</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosGrafico} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(tick) => tick.toLocaleString()} />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Bar dataKey="value" fill="#3182ce" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p className="text-gray-500">Cargando datos...</p>
      )}
    </div>
  );
}

export default CovidEstadisticas;
