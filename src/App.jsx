import React, { useState, useEffect } from 'react';
import sintomasReales from './sintomas.json';
import RegistroPaciente from './components/RegistroPaciente';
import ListaPacientes from './components/ListaPacientes';
import ConsultaMedica from './components/ConsultaMedica';
import CalendarioConsultas from './components/CalendarioConsultas';
import DiagnosticoSugerido from './components/DiagnosticoSugerido';

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [fecha, setFecha] = useState('');
  const [comentario, setComentario] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [sintomasAPI, setSintomasAPI] = useState([]);
  const [sintomasLocales, setSintomasLocales] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('pacientes')) || [];
    setPacientes(guardados);
  }, []);

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  useEffect(() => {
    setSintomasLocales(sintomasReales);
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(res => res.json())
      .then(data => {
        const titulos = data.map(item => item.title);
        setSintomasAPI(titulos);
      });
  }, []);

  const validarRUT = (rut) => /^[0-9]+-[0-9kK]{1}$/.test(rut);

  const agregarPaciente = (e) => {
    e.preventDefault();
    if (!nombre || !rut || !fecha) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    if (!validarRUT(rut)) {
      alert("RUT inválido. Formato esperado: 12345678-9");
      return;
    }

    if (pacientes.some(p => p.rut === rut && p.id !== editandoId)) {
      alert("Ya existe un paciente con ese RUT.");
      return;
    }

    if (editandoId) {
      setPacientes(pacientes.map(p =>
        p.id === editandoId
          ? { ...p, nombre, rut, fecha }
          : p
      ));
      setEditandoId(null);
    } else {
      const nuevoPaciente = {
        id: Date.now(),
        nombre,
        rut,
        fecha,
        comentarios: comentario ? [comentario] : [],
        consultas: []
      };
      setPacientes([...pacientes, nuevoPaciente]);
    }

    setNombre('');
    setRut('');
    setFecha('');
    setComentario('');
  };

  const eliminarPaciente = (id) => {
    if (confirm("¿Seguro que deseas eliminar este paciente?")) {
      setPacientes(pacientes.filter(p => p.id !== id));
    }
  };

  const editarPaciente = (paciente) => {
    setEditandoId(paciente.id);
    setNombre(paciente.nombre);
    setRut(paciente.rut);
    setFecha(paciente.fecha);
    setComentario('');
  };

  const agendarConsulta = (id) => {
    const nuevaConsulta = prompt("Ingresa la fecha de consulta (YYYY-MM-DD):");
    if (!nuevaConsulta) return;
    setPacientes(pacientes.map(p =>
      p.id === id
        ? { ...p, consultas: [...(p.consultas || []), nuevaConsulta] }
        : p
    ));
  };

  const agregarObservacion = (id) => {
    const obs = prompt("Nueva observación médica:");
    if (!obs) return;
    setPacientes(pacientes.map(p =>
      p.id === id
        ? { ...p, comentarios: [...(p.comentarios || []), obs] }
        : p
    ));
  };

  const pacientesFiltrados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.rut.toLowerCase().includes(filtro.toLowerCase())
  );

  const exportarJSON = () => {
    const blob = new Blob([JSON.stringify(pacientes)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pacientes.json';
    a.click();
  };

  const importarJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        setPacientes(data);
      } catch {
        alert("Archivo inválido");
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <header className="bg-blue-700 text-white shadow-md py-6 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-wide">🩺 MediConnect</h1>
        <p className="mt-1 text-lg">Sistema de gestión médica</p>
      </header>

      <div className="max-w-5xl mx-auto p-6 mt-6 bg-white rounded-xl shadow-lg space-y-6">
        <RegistroPaciente
          nombre={nombre} setNombre={setNombre}
          rut={rut} setRut={setRut}
          fecha={fecha} setFecha={setFecha}
          comentario={comentario} setComentario={setComentario}
          onSubmit={agregarPaciente}
          editandoId={editandoId}
        />

        <div className="bg-blue-50 p-4 rounded-md shadow-sm">
          <h2 className="text-blue-800 font-semibold mb-2 text-lg">📌 Buscar pacientes</h2>
          <input
            type="text"
            placeholder="Buscar por nombre o RUT"
            className="w-full border p-2 rounded"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        <ListaPacientes
          pacientes={pacientesFiltrados}
          onEditar={editarPaciente}
          onEliminar={eliminarPaciente}
          onAgendar={agendarConsulta}
          onObservacion={agregarObservacion}
        />

        <CalendarioConsultas pacientes={pacientes} />
        <ConsultaMedica pacientes={pacientes} />
        <DiagnosticoSugerido />

        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">🩺 Síntomas comunes</h2>
          <ul className="list-disc list-inside">
            {sintomasReales.map((s, i) => <li key={i}>✅ {s}</li>)}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">🧪 API externa simulada</h2>
          <ul className="list-disc list-inside">
            {sintomasAPI.map((s, i) => <li key={i}>🔸 {s}</li>)}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">📤 Exportar / 📥 Importar</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={exportarJSON}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              📤 Exportar JSON
            </button>
            <input
              type="file"
              accept=".json"
              onChange={importarJSON}
              className="border p-2 rounded bg-gray-50"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
