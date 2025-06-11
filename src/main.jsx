import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ShiftDutyProvider } from "../pages/CreateShiftDutyContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShiftDutyProvider>
      <App />
    </ShiftDutyProvider>
  </StrictMode>,
)







