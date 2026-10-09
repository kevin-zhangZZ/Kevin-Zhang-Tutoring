import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// A tab left open across a deploy asks for hashed chunks that no longer exist. Vite fires
// this when a preload fails; reload once to pick up the new build (the timestamp guard stops
// a reload loop if the chunk is genuinely missing — the route error boundary then shows).
window.addEventListener('vite:preloadError', event => {
  try {
    const last = Number(sessionStorage.getItem('preloadReloadAt') || 0)
    if (Date.now() - last < 10_000) return
    sessionStorage.setItem('preloadReloadAt', String(Date.now()))
  } catch {
    return
  }
  event.preventDefault()
  window.location.reload()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
