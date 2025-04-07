import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ContextProvider } from './context/Context.tsx'
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  </ContextProvider>
)
