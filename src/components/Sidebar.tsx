import { NavLink } from 'react-router-dom'
import { tools, contactTool } from '../tools/registry'

// Home + Tools nav links — shared between the desktop rail (collapsible) and
// the mobile dropdown banner in Layout.tsx, so both stay in sync.
export function NavLinks({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  return (
    <>
      <NavLink
        to="/"
        end
        onClick={onNavigate}
        title={collapsed ? 'Home' : undefined}
        className={({ isActive }) =>
          `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${collapsed ? 'justify-center' : ''} ${
            isActive
              ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
          }`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        {!collapsed && 'Home'}
      </NavLink>

      {!collapsed && (
        <div className="mt-3 mb-1 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider">
          Tools
        </div>
      )}

      {tools.filter(tool => tool.section !== 'contact').map(tool => (
        <NavLink
          key={tool.id}
          to={tool.route}
          onClick={onNavigate}
          title={collapsed ? tool.name : undefined}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${collapsed ? 'justify-center' : ''} ${
              isActive
                ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            }`
          }
        >
          <span className="w-[15px] flex-shrink-0 inline-flex items-center justify-center text-sm leading-none">{tool.icon}</span>
          {!collapsed && tool.name}
        </NavLink>
      ))}
    </>
  )
}

// Getting in touch isn't a tool, so it sits apart from the list: a small prompt pinned to the
// bottom of the menu (the desktop rail, and the phone dropdown). Collapsed, it's just an icon.
export function ContactPrompt({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  if (!contactTool) return null
  if (collapsed) {
    return (
      <NavLink
        to={contactTool.route}
        onClick={onNavigate}
        title={contactTool.name}
        aria-label={contactTool.name}
        className={({ isActive }) =>
          `flex items-center justify-center px-3 py-2 rounded-md text-sm transition-colors ${
            isActive
              ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
              : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
          }`
        }
      >
        <span className="text-sm leading-none">{contactTool.icon}</span>
      </NavLink>
    )
  }
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-3">
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">Want help with Methods, Specialist or Chemistry?</p>
      <NavLink
        to={contactTool.route}
        onClick={onNavigate}
        className="mt-2 block text-center text-[13px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md py-1.5 transition-colors"
      >
        Contact me
      </NavLink>
    </div>
  )
}

interface SidebarProps {
  dark: boolean
  onToggleDark: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export default function Sidebar({ dark, onToggleDark, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <nav
      className={`flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 transition-[width] duration-200 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center border-b border-gray-200 dark:border-gray-800 ${collapsed ? 'flex-col gap-2 px-2 py-4' : 'justify-between gap-2 pl-4 pr-3 py-4'}`}>
        {!collapsed && (
          <span className="font-semibold text-gray-900 dark:text-white text-[13px] tracking-tight leading-tight whitespace-nowrap">
            Kevin Zhang Tutoring
          </span>
        )}
        <div className={`flex items-center gap-1 ${collapsed ? 'flex-col' : ''}`}>
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${collapsed ? 'rotate-180' : ''}`}>
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
            </svg>
          </button>
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
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-3">
        <NavLinks collapsed={collapsed} />
      </div>

      <div className={collapsed ? 'px-3 pb-3' : 'p-3'}>
        <ContactPrompt collapsed={collapsed} />
      </div>
    </nav>
  )
}
