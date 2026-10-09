import { HashRouter, Routes, Route } from 'react-router-dom'
import { Suspense, useState, useEffect } from 'react'
import Layout from './components/Layout'
import RouteErrorBoundary from './components/RouteErrorBoundary'
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
        {/* Tool pages are lazy (registry.ts). While one downloads, hold the page's height
            with an empty, silent block — no spinner flash, no footer jumping up. */}
        <RouteErrorBoundary>
          <Suspense fallback={<div className="min-h-[100vh]" aria-busy="true" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* `/*` lets a tool keep its own state in the URL below its route (the worked
                  solutions put subject/year/question there so links open straight to a question). */}
              {tools.map(tool => (
                <Route key={tool.id} path={`${tool.route}/*`} element={<tool.component />} />
              ))}
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </Layout>
    </HashRouter>
  )
}
