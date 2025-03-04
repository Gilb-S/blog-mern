import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/app.css'
import App from './App.jsx'
import UserProvider from './context/UserContext.jsx'
import PostProvider from './context/PostContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PostProvider>

  </StrictMode>,
)
