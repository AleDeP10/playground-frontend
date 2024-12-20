import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Ottieni il nodo radice del DOM
const container = document.getElementById('root');

// Crea il root con `createRoot`
const root = createRoot(container);

// Renderizza l'applicazione
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se il reportWebVitals è opzionale, lo puoi lasciare com'è o rimuovere
reportWebVitals();
