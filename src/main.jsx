// src/main.jsx
import React ,{useContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css';
import { UserDetailsProvider } from './contexts/UserContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserDetailsProvider  >
      <App />
    </UserDetailsProvider>
  </React.StrictMode>
);
