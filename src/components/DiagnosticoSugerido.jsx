import React from 'react';
import { useTranslation } from 'react-i18next';

function DiagnosticoSugerido({ pacientes }) {
  const { t } = useTranslation();

  return (
    <section className="formulario">
      <h2 className="titulo-seccion">{t('diagnostico')}</h2>
      <p>{t('diagnostico_info')}</p>
      <ul>
        {pacientes.map(p => (
          <li key={p.id}>
            <strong>{p.nombre}</strong>: 🩺 {p.sintomas?.join(', ') || t('sin_sintomas')}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DiagnosticoSugerido;
