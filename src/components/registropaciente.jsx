import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function RegistroPaciente({
  nombre, setNombre,
  rut, setRut,
  fecha, setFecha,
  comentario, setComentario,
  sintomasSeleccionados, setSintomasSeleccionados,
  onSubmit,
  editandoId
}) {
  const { t } = useTranslation();
  const [sintomaInput, setSintomaInput] = useState('');

  const agregarSintoma = () => {
    const sintoma = sintomaInput.trim();
    if (sintoma && !sintomasSeleccionados.includes(sintoma)) {
      setSintomasSeleccionados([...sintomasSeleccionados, sintoma]);
      setSintomaInput('');
    }
  };

  const eliminarSintoma = (sintomaAEliminar) => {
    setSintomasSeleccionados(
      sintomasSeleccionados.filter(s => s !== sintomaAEliminar)
    );
  };

  return (
    <section className="formulario">
      <h2 className="titulo-seccion">
        {editandoId ? t('editar_paciente') : t('registro')}
      </h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={t('nombre_completo')}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="RUT (ej: 12345678-9)"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          required
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <textarea
          placeholder={t('comentario_medico')}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <div className="campo-sintomas">
          <label>{t('agregar_sintoma')}</label>
          <input
            type="text"
            placeholder={t('ej_sintoma')}
            value={sintomaInput}
            onChange={(e) => setSintomaInput(e.target.value)}
          />
          <button type="button" onClick={agregarSintoma}>
            {t('agregar')}
          </button>
        </div>

        {sintomasSeleccionados.length > 0 && (
          <ul className="lista-sintomas">
            {sintomasSeleccionados.map((sintoma, index) => (
              <li key={index}>
                {sintoma}
                <button
                  type="button"
                  onClick={() => eliminarSintoma(sintoma)}
                  style={{ marginLeft: '10px' }}
                >
                  {t('eliminar')}
                </button>
              </li>
            ))}
          </ul>
        )}

        <button type="submit">
          {editandoId ? t('actualizar') : t('registrar')}
        </button>
      </form>
    </section>
  );
}

export default RegistroPaciente;
