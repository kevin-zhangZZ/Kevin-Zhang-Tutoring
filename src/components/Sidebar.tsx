import { NavLink } from 'react-router-dom'
import { tools } from '../tools/registry'

interface SidebarProps {
  dark: boolean
  onToggleDark: () => void
  onClose?: () => void
}

export default function Sidebar({ dark, onToggleDark, onClose }: SidebarProps) {
  return (
    <nav className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-60 flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <span className="font-semibold text-gray-900 dark:text-white text-sm tracking-tight">
          Math Practice
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close sidebar"
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto py-3 px-3">
        <NavLink
          to="/"
          end
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            }`
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Home
        </NavLink>

        <div className="mt-3 mb-1 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Tools
        </div>

        {tools.map(tool => (
          <NavLink
            key={tool.id}
            to={tool.route}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                  : tool.id === 'contact-me'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-gray-600 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/70 hover:text-gray-900 dark:hover:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            <span className="w-[15px] flex-shrink-0 inline-flex items-center justify-center text-sm leading-none">{tool.icon}</span>
            {tool.name}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
