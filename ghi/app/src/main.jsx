import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


async function loadAttendees() {
  const response = await fetch('http://localhost:8001/api/attendees/');
  if (response.ok) {
    const data = await response.json()
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App attendees={data.attendees} />
      </StrictMode>,
    )
  } else {
    console.error(response)
  }
}
loadAttendees()
