import { HashRouter, Routes, Route } from 'react-router-dom'
import { Suspense, useEffect, useRef, useState } from 'react'
import Layout from './components/Layout'
import RouteErrorBoundary from './components/RouteErrorBoundary'
import Home from './pages/Home'
import { tools } from './tools/registry'

/** The theme the visitor picked with the toggle, or null if they never have. */
function storedTheme(): string | null {
  try {
    return localStorage.getItem('theme')
  } catch {
    return null
  }
}

export default function App() {
  // index.html already applied the theme before the first paint; start from what it chose.
  const [dark, setDark] = useState<boolean>(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  }, [dark])

  // A press of the toggle this visit, remembered even where storage is blocked and can't keep it.
  const picked = useRef(false)

  // Until the visitor picks a theme, follow the device's setting as it changes (e.g. at night).
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const follow = (e: MediaQueryListEvent) => {
      if (!picked.current && !storedTheme()) setDark(e.matches)
    }
    mq.addEventListener('change', follow)
    return () => mq.removeEventListener('change', follow)
  }, [])

  // Only a press of the toggle is saved as the visitor's choice.
  const toggleDark = () => {
    const next = !dark
    picked.current = true
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // Blocked storage: the choice lasts for this visit.
    }
    setDark(next)
  }

  return (
    <HashRouter>
      <Layout dark={dark} onToggleDark={toggleDark}>
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
