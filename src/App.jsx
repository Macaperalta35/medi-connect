import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';                 
import RegistroPaciente from './components/RegistroPaciente';
import ListaPacientes from './components/ListaPacientes';
import CalendarioConsultas from './components/CalendarioConsultas';
import DiagnosticoSugerido from './components/DiagnosticoSugerido';
import ConsultaMedica from './components/ConsultaMedica';
import EstadisticasSalud from './components/EstadisticasSalud';
import './style.css';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  const [pacientes, setPacientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [fecha, setFecha] = useState('');
  const [comentario, setComentario] = useState('');
  const [sintomas, setSintomas] = useState([]);
  const [sintomasSeleccionados, setSintomasSeleccionados] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('pacientes');
    if (datosGuardados) {
      setPacientes(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!nombre || !rut || !fecha) return;

    const nuevoPaciente = {
      id: editandoId || Date.now(),
      nombre,
      rut,
      fecha,
      comentario,
      sintomas: sintomasSeleccionados,
      consultas: editandoId
        ? pacientes.find(p => p.id === editandoId).consultas
        : []
    };

    if (editandoId) {
      setPacientes(pacientes.map(p => (p.id === editandoId ? nuevoPaciente : p)));
      setEditandoId(null);
    } else {
      setPacientes([...pacientes, nuevoPaciente]);
    }

    setNombre('');
    setRut('');
    setFecha('');
    setComentario('');
    setSintomasSeleccionados([]);
  };

  const handleEliminar = id => {
    setPacientes(pacientes.filter(p => p.id !== id));
  };

  const handleEditar = id => {
    const paciente = pacientes.find(p => p.id === id);
    setNombre(paciente.nombre);
    setRut(paciente.rut);
    setFecha(paciente.fecha);
    setComentario(paciente.comentario);
    setSintomasSeleccionados(paciente.sintomas || []);
    setEditandoId(id);
  };

  const handleAgendarConsulta = id => {
    const fechaConsulta = prompt(t('ingresa_fecha_consulta') || 'Ingresa la fecha de la consulta:');
    if (!fechaConsulta) return;
    setPacientes(pacientes.map(p =>
      p.id === id
        ? { ...p, consultas: [...(p.consultas || []), fechaConsulta] }
        : p
    ));
  };

  return (
    <>
      <Sidebar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="app-section">
                <h1 className="section-title">MediConnect</h1>
                <p>
                  MediConnect es una plataforma diseñada para facilitar el registro, seguimiento y atención de pacientes mediante herramientas digitales intuitivas y seguras.
                </p>
                <p>
                  Aquí podrás registrar pacientes, gestionar consultas, visualizar estadísticas de salud y mucho más.
                </p>
                <h3>Contacto</h3>
                <p>Email: soporte@mediconnect.com</p>
                <p>Teléfono: +56 9 1234 5678</p>
                <p>Dirección: Av. Salud 1234, Santiago, Chile</p>
              </section>
            }
          />
          <Route
            path="/registro"
            element={
              <RegistroPaciente
                nombre={nombre}
                setNombre={setNombre}
                rut={rut}
                setRut={setRut}
                fecha={fecha}
                setFecha={setFecha}
                comentario={comentario}
                setComentario={setComentario}
                sintomas={sintomas}
                sintomasSeleccionados={sintomasSeleccionados}
                setSintomasSeleccionados={setSintomasSeleccionados}
                onSubmit={handleSubmit}
                editandoId={editandoId}
              />
            }
          />
          <Route
            path="/pacientes"
            element={
              <ListaPacientes
                pacientes={pacientes}
                onEliminar={handleEliminar}
                onEditar={handleEditar}
                onAgendar={handleAgendarConsulta}
              />
            }
          />
          <Route path="/calendario" element={<CalendarioConsultas pacientes={pacientes} />} />
          <Route path="/diagnostico" element={<DiagnosticoSugerido pacientes={pacientes} />} />
          <Route path="/consultas" element={<ConsultaMedica pacientes={pacientes} />} />
          <Route path="/estadisticas" element={<EstadisticasSalud pacientes={pacientes} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
