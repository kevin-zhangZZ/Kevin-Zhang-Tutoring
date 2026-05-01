import { HashRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import { tools } from './tools/registry'

export default function App() {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <HashRouter>
      <Layout dark={dark} onToggleDark={() => setDark(d => !d)}>
        <Routes>
          <Route path="/" element={<Home />} />
          {tools.map(tool => (
            <Route key={tool.id} path={tool.route} element={<tool.component />} />
          ))}
        </Routes>
      </Layout>
    </HashRouter>
  )
}
