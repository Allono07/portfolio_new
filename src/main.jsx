import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import { KindleProvider } from './context/KindleContext.js';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <KindleProvider>
        <App />
      </KindleProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
