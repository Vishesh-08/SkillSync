// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css';
import { RegistrationProvider } from './contexts/RegistrationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  </React.StrictMode>
);
