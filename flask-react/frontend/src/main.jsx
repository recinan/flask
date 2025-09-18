import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.jsx'
import { ContactsProvider } from './contexts/ContactsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactsProvider>
      <App />
    </ContactsProvider>
  </StrictMode>,
)
