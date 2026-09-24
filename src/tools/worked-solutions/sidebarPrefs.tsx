// How the question sidebar is laid out. Every visitor can change these on the Sidebar Settings
// page (#/worked-solutions/settings); they're remembered per device. The defaults are the
// setup KZ picked from the prototype.
//
// The list's own two switches — Year / Topic and Exam order / Hardest first — are kept here
// too, for the length of a visit only: every visit starts on Year, in exam order.

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface SidebarPrefs {
  /** How years are chosen: a rail down the left, a ‹ year › stepper, or a row of chips. */
  yearNav: 'rail' | 'stepper' | 'chips'
  /** How a year's exams are shown: one after the other, as tabs, or each folding away. */
  examLayout: 'stacked' | 'tabs' | 'collapsible'
  /** Whether the Multiple Choice / Short Answer groups can fold away. */
  typeFold: 'fold' | 'open'
  /** Questions left out of the archive: a greyed row, one note under the exam, or nothing. */
  skipped: 'row' | 'note' | 'off'
  /** Paper / Report as small buttons or as text links (both PDFs). */
  links: 'buttons' | 'links'
  /** How difficulty shows on each row. */
  diff: 'bar' | 'pct' | 'pips'
  density: 'comfortable' | 'compact'
  /** The open question's parts listed under its row. */
  parts: 'show' | 'off'
  /** Desktop previous / next: none, cards at the end of a question, or a floating control. */
  pager: 'off' | 'end' | 'float'
  /** Phones: a ‹ back bar above the solution. */
  backBar: 'on' | 'off'
  /** Phones: the Questions list opens as a sheet or full screen. */
  sheet: 'sheet' | 'full'
}

export const DEFAULT_PREFS: SidebarPrefs = {
  yearNav: 'stepper',
  examLayout: 'tabs',
  typeFold: 'fold',
  skipped: 'row',
  links: 'buttons',
  diff: 'bar',
  density: 'comfortable',
  parts: 'show',
  pager: 'float',
  backBar: 'on',
  sheet: 'sheet',
}

export type ListView = 'year' | 'topic'
export type ListSort = 'exam' | 'hard'

const PREFS_KEY = 'ws-sidebar-prefs'

// Only keep stored values that are still valid options, so a stale or hand-edited entry can't
// break the sidebar.
const OPTIONS: { [K in keyof SidebarPrefs]: SidebarPrefs[K][] } = {
  yearNav: ['rail', 'stepper', 'chips'],
  examLayout: ['stacked', 'tabs', 'collapsible'],
  typeFold: ['fold', 'open'],
  skipped: ['row', 'note', 'off'],
  links: ['buttons', 'links'],
  diff: ['bar', 'pct', 'pips'],
  density: ['comfortable', 'compact'],
  parts: ['show', 'off'],
  pager: ['off', 'end', 'float'],
  backBar: ['on', 'off'],
  sheet: ['sheet', 'full'],
}

function readJson(key: string): Record<string, unknown> {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? 'null')
    return value && typeof value === 'object' ? value : {}
  } catch {
    return {}
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage blocked — settings still apply for this visit.
  }
}

function loadPrefs(): SidebarPrefs {
  const stored = readJson(PREFS_KEY)
  const prefs = { ...DEFAULT_PREFS }
  for (const key of Object.keys(OPTIONS) as (keyof SidebarPrefs)[]) {
    const v = stored[key]
    if ((OPTIONS[key] as unknown[]).includes(v)) (prefs as Record<string, unknown>)[key] = v
  }
  return prefs
}

interface SidebarPrefsState {
  prefs: SidebarPrefs
  setPref: <K extends keyof SidebarPrefs>(key: K, value: SidebarPrefs[K]) => void
  resetPrefs: () => void
  view: ListView
  setView: (v: ListView) => void
  sort: ListSort
  setSort: (s: ListSort) => void
}

const Ctx = createContext<SidebarPrefsState | null>(null)

export function SidebarPrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<SidebarPrefs>(loadPrefs)
  const [view, setView] = useState<ListView>('year')
  const [sort, setSort] = useState<ListSort>('exam')

  useEffect(() => writeJson(PREFS_KEY, prefs), [prefs])

  return (
    <Ctx.Provider
      value={{
        prefs,
        setPref: (key, value) => setPrefs(p => ({ ...p, [key]: value })),
        resetPrefs: () => setPrefs({ ...DEFAULT_PREFS }),
        view,
        setView,
        sort,
        setSort,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useSidebarPrefs(): SidebarPrefsState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSidebarPrefs must be used inside SidebarPrefsProvider')
  return ctx
}
