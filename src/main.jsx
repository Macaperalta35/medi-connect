import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './style.css';

// Si ya no usas traducción, puedes eliminar esta línea
// import './i18n';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('⚠️ No se encontró #root en index.html');
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
