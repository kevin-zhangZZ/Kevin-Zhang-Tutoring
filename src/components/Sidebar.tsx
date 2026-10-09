import { NavLink } from 'react-router-dom'
import { Fragment } from 'react'
import { tools, toolGroups, contactTool } from '../tools/registry'
import ToolIcon, { ToolIconName } from './ToolIcon'

// One menu row. Icons sit muted until the row is hovered or current, so the names lead and
// the current page is the one thing in colour.
function NavItem({ to, end, icon, label, collapsed, onNavigate }: {
  to: string
  end?: boolean
  icon: ToolIconName
  label: string
  collapsed?: boolean
  onNavigate?: () => void
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      aria-label={collapsed ? label : undefined}
      className={({ isActive }) =>
        `group flex items-center gap-3 h-9 [@media(pointer:coarse)]:h-11 px-2.5 rounded-lg text-[13.5px] transition-colors ${collapsed ? 'justify-center' : ''} ${
          isActive
            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-semibold'
            : 'text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:text-gray-950 dark:hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <ToolIcon
            name={icon}
            className={`transition-colors ${
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200'
            }`}
          />
          {!collapsed && <span className="truncate">{label}</span>}
        </>
      )}
    </NavLink>
  )
}

// Home + the tools, grouped by what they're for — shared between the desktop rail
// (collapsible) and the mobile dropdown banner in Layout.tsx, so both stay in sync.
export function NavLinks({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-0.5">
      <NavItem to="/" end icon="home" label="Home" collapsed={collapsed} onNavigate={onNavigate} />

      {toolGroups.map(group => {
        const items = tools.filter(t => t.group === group)
        if (!items.length) return null
        return (
          <Fragment key={group}>
            {collapsed ? (
              <div className="my-2 mx-2 border-t border-gray-200 dark:border-gray-800" aria-hidden="true" />
            ) : (
              <div className="mt-5 mb-1 px-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">{group}</div>
            )}
            {items.map(tool => (
              <NavItem
                key={tool.id}
                to={tool.route}
                icon={tool.icon}
                label={tool.navName ?? tool.name}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </Fragment>
        )
      })}
    </div>
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
        <ToolIcon name={contactTool.icon} />
      </NavLink>
    )
  }
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-3">
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">Want help with Methods, Specialist or Chemistry?</p>
      <NavLink
        to={contactTool.route}
        onClick={onNavigate}
        className="mt-2 block text-center text-[13px] font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md py-1.5 transition-colors"
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
  // Touch targets for the two header buttons. Collapsed (w-16), they stack and fit 44px
  // padding. Expanded (w-60), the title plus two 44px buttons would overflow the 212px row,
  // so they keep their size and an invisible hit layer reaches 44px tall and 36px wide,
  // with the gap widened so the two layers just meet rather than overlap.
  const headerBtnHit = collapsed
    ? 'p-1.5 [@media(pointer:coarse)]:p-3.5'
    : 'relative p-1.5 after:absolute after:inset-0 [@media(pointer:coarse)]:after:-inset-y-2 [@media(pointer:coarse)]:after:-inset-x-1'
  return (
    <nav
      aria-label="Main"
      className={`flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 transition-[width] duration-200 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center border-b border-gray-200 dark:border-gray-800 ${collapsed ? 'flex-col gap-2 px-2 py-4' : 'justify-between gap-2 pl-4 pr-3 py-4'}`}>
        {!collapsed && (
          <span className="font-semibold text-gray-900 dark:text-white text-[13px] tracking-tight leading-tight min-w-0 truncate">
            Kevin Zhang Tutoring
          </span>
        )}
        <div className={`flex items-center gap-1 ${collapsed ? 'flex-col' : '[@media(pointer:coarse)]:gap-2'}`}>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`${headerBtnHit} rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform ${collapsed ? 'rotate-180' : ''}`}>
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`${headerBtnHit} rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
