import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ContextProvider } from './context/Context.tsx';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; 
createRoot(document.getElementById('root')!).render(
  <BrowserRouter> 
    <ContextProvider>
      <StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StrictMode>
    </ContextProvider>
  </BrowserRouter>
);
