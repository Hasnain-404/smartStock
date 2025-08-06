import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LiveDataProvider } from '../context/LiveDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <LiveDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LiveDataProvider>,
)
