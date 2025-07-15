import React from 'react';
import { useTranslation } from 'react-i18next';

function CalendarioConsultas({ pacientes }) {
  const { t } = useTranslation();

  return (
    <section className="formulario">
      <h2 className="titulo-seccion">{t('calendario')}</h2>
      {pacientes.length === 0 ? (
        <p>{t('no_hay_pacientes')}</p>
      ) : (
        <ul>
          {pacientes.map(p => (
            <li key={p.id}>
              <strong>{p.nombre}</strong>
              {p.consultas && p.consultas.length > 0 ? (
                <ul>
                  {p.consultas.map((fecha, i) => (
                    <li key={i}>📅 {fecha}</li>
                  ))}
                </ul>
              ) : (
                <p>{t('sin_consultas')}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CalendarioConsultas;
