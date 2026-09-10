import { useState, useEffect, useRef } from 'react'
import Sidebar, { NavLinks } from './Sidebar'

interface LayoutProps {
  dark: boolean
  onToggleDark: () => void
  children: React.ReactNode
}

// Shown once the page's own scroll container (see `main` below — this app scrolls inside
// it, not the window) has been scrolled down past this many pixels.
const BACK_TO_TOP_THRESHOLD = 400

export default function Layout({ dark, onToggleDark, children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [collapsed, setCollapsed] = useState<boolean>(() => localStorage.getItem('sidebarCollapsed') === 'true')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(collapsed))
  }, [collapsed])

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    const onScroll = () => setShowBackToTop(el.scrollTop > BACK_TO_TOP_THRESHOLD)
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar — collapsible to an icon-only rail */}
      <div className="hidden md:flex">
        <Sidebar dark={dark} onToggleDark={onToggleDark} collapsed={collapsed} onToggleCollapse={() => setCollapsed(c => !c)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="flex-shrink-0 flex md:hidden items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            )}
          </button>
          <span className="font-semibold text-sm text-gray-900 dark:text-white">Kevin Zhang Tutoring</span>
          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>
        </header>

        {/* Mobile nav — a dropdown banner that expands below the top bar, pushing
            content down (not an overlay), and collapses back on link tap. */}
        {menuOpen && (
          <nav className="flex-shrink-0 md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 max-h-[70vh] overflow-y-auto">
            <div className="py-2 px-3">
              <NavLinks onNavigate={() => setMenuOpen(false)} />
            </div>
          </nav>
        )}

        {/* Page content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {children}

          <button
            onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            title="Back to top"
            className={`fixed bottom-6 right-6 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 shadow-lg hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
              showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </main>
      </div>
    </div>
  )
}
