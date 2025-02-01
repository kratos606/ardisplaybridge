import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Changed import
import './index.css'
import App from './App.jsx'
import Model from './Model.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/*  Wrapped with BrowserRouter */}
      <Routes> {/*  Used Routes component */}
        <Route path="/:id/view" element={<Model />} /> {/* Route for /:id/view */}
        <Route path="/:id" element={<App />} /> {/* Route for /:id */}
      </Routes> {/*  Closing Routes */}
    </BrowserRouter> {/*  Closing BrowserRouter */}
  </StrictMode>,
)