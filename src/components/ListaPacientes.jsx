import React from 'react';
import { useTranslation } from 'react-i18next';

function ListaPacientes({ pacientes, onEditar, onEliminar, onAgendar }) {
  const { t } = useTranslation();

  return (
    <section className="formulario">
      <h2 className="titulo-seccion">{t('pacientes')}</h2>
      {pacientes.length === 0 ? (
        <p>{t('no_hay_pacientes')}</p>
      ) : (
        <ul>
          {pacientes.map(p => (
            <li key={p.id}>
              <p><strong>{p.nombre}</strong> - RUT: {p.rut} - 📅 {p.fecha}</p>
              {p.comentario && <p><em>📝 {t('comentario')}:</em> {p.comentario}</p>}
              {p.sintomas && p.sintomas.length > 0 && (
                <p>🩺 {t('sintomas')}:{' '}
                  <span>{p.sintomas.join(', ')}</span>
                </p>
              )}
              {p.consultas && p.consultas.length > 0 && (
                <p>📆 {t('consultas')}: {p.consultas.join(', ')}</p>
              )}
              <button onClick={() => onEditar(p)}>{t('editar')}</button>
              <button onClick={() => onEliminar(p.id)}>{t('eliminar')}</button>
              <button onClick={() => onAgendar(p.id)}>{t('agendar_consulta')}</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ListaPacientes;
