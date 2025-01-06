import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Authprovider } from './Components/Header/ContextApi/Authcontext/Authcontext/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Authprovider>
    <App />
    </Authprovider>
    </BrowserRouter>
  </StrictMode>,
)
