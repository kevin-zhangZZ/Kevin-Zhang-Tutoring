// Exam Timetable: the 2026 VCE written exams (data.ts) on a calendar, filtered to the subjects a
// student picks. A first visit starts on DEFAULT_IDS; the pick is kept in the URL (?s=english,eal)
// so it can be sent, and in localStorage so the menu link brings it back. ?s= with nothing after it
// is a cleared pick, which is different from no ?s at all (the defaults).
//
// From 640px up the exam weeks are a Monday–Friday grid; on phones the same exams are a list of
// days. Two picked exams in overlapping sessions are flagged as a clash.

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Toggle, { CHIP_BASE, CHIP_OFF } from '../../components/ui/Toggle'
import { stagger } from '../../components/motion/Reveal'
import {
  ALTERNATIVES, CATEGORIES, DEFAULT_IDS, HOLIDAYS, SESSIONS, SOURCE_URL, SUBJECTS, SUBJECT_BY_ID, YEAR,
  type Session, type Subject,
} from './data'

const STORE_KEY = 'exam-timetable:subjects'
const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900'
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

// ── Dates ──────────────────────────────────────────────────────────────────────────────────

const toDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const mondayOf = (d: Date) => addDays(d, -((d.getDay() + 6) % 7))

function time12(hm: string) {
  const [h, m] = hm.split(':').map(Number)
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')}${h < 12 ? 'am' : 'pm'}`
}
const dayLabel = (iso: string) =>
  toDate(iso).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })
const shortDay = (iso: string) => toDate(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })

// ── The pick ───────────────────────────────────────────────────────────────────────────────

function readStored(): string[] | null {
  try {
    const v = localStorage.getItem(STORE_KEY)
    return v === null ? null : v.split(',').filter(Boolean)
  } catch {
    return null
  }
}

function useSelection() {
  const [params, setParams] = useSearchParams()
  const fromUrl = params.get('s')
  const ids = useMemo(() => {
    const raw = fromUrl !== null ? fromUrl.split(',') : readStored() ?? DEFAULT_IDS
    return new Set(raw.filter(id => SUBJECT_BY_ID.has(id)))
  }, [fromUrl])

  const key = [...ids].sort().join(',')
  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, key)
    } catch {
      /* private window: the URL still holds the pick */
    }
    if (params.get('s') !== key) {
      const next = new URLSearchParams(params)
      next.set('s', key)
      setParams(next, { replace: true })
    }
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (next: Iterable<string>) => {
    const q = new URLSearchParams(params)
    q.set('s', [...new Set(next)].sort().join(','))
    setParams(q, { replace: true })
  }
  return { ids, set }
}

interface Shown {
  session: Session
  exams: Session['exams']
}

/** The picked exams, session by session, with any session that overlaps another picked one marked. */
function useShown(ids: Set<string>) {
  return useMemo(() => {
    const shown: Shown[] = SESSIONS
      .map(session => ({ session, exams: session.exams.filter(e => ids.has(e.subject.id)) }))
      .filter(s => s.exams.length > 0)
    const clashes = new Set<Shown>()
    shown.forEach((a, i) => {
      const studies = new Set(a.exams.map(e => ALTERNATIVES.find(g => g.includes(e.subject.id))?.[0] ?? e.subject.id))
      if (studies.size > 1) clashes.add(a)
      shown.slice(i + 1).forEach(b => {
        if (a.session.date === b.session.date && a.session.start < b.session.end && b.session.start < a.session.end) {
          clashes.add(a)
          clashes.add(b)
        }
      })
    })
    return { shown, clashes }
  }, [ids])
}

// ── Page ───────────────────────────────────────────────────────────────────────────────────

export default function ExamTimetable() {
  const { ids, set } = useSelection()
  const { shown, clashes } = useShown(ids)
  const today = toIso(new Date())

  const byDay = useMemo(() => {
    const m = new Map<string, Shown[]>()
    shown.forEach(s => m.set(s.session.date, [...(m.get(s.session.date) ?? []), s]))
    return m
  }, [shown])

  // The weeks to draw: the main written exam period, stretched to take in any earlier picked exam.
  const weeks = useMemo(() => {
    const first = shown[0]?.session.date ?? '2026-10-27'
    const start = mondayOf(toDate(first < '2026-10-27' ? first : '2026-10-27'))
    const end = mondayOf(toDate('2026-11-18'))
    const out: string[][] = []
    for (let w = start; w <= end; w = addDays(w, 7)) {
      out.push(WEEKDAYS.map((_, i) => toIso(addDays(w, i))))
    }
    return out
  }, [shown])

  const examCount = shown.reduce((n, s) => n + s.exams.length, 0)
  const last = shown[shown.length - 1]?.session.date

  return (
    <div className="px-4 sm:px-6 pt-6 sm:pt-10 pb-16 max-w-6xl mx-auto">
      <header className="mb-6 sm:mb-8 rise-in" style={stagger(0)}>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-[-0.03em]">
          Exam Timetable
        </h1>
        <p className="mt-2 max-w-3xl text-[0.9375rem] sm:text-base text-gray-600 dark:text-gray-300">
          The {YEAR} VCE written exams on a calendar. Pick your subjects to see just your exams. Times include
          reading time; arrive at least 30 minutes before the start.
        </p>
      </header>

      <div className="rise-in" style={stagger(1)}>
        <SubjectFilter ids={ids} set={set} />
      </div>

      <section className="rise-in mt-8" style={stagger(2)} aria-labelledby="tt-cal">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
          <h2 id="tt-cal" className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Your Exams
          </h2>
          <p className="text-[13px] text-gray-500 dark:text-gray-400" aria-live="polite">
            {examCount === 0
              ? 'No subjects picked'
              : `${examCount} exam${examCount === 1 ? '' : 's'}${last ? ` · last on ${shortDay(last)}` : ''}${clashes.size ? ' · clash' : ''}`}
          </p>
        </div>

        {clashes.size > 0 && (
          <p className="mb-3 text-[13px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-2">
            Some of your exams are in the same session. VCAA schedules clashing exams for you; check with
            your school’s VCE coordinator.
          </p>
        )}

        <CalendarGrid weeks={weeks} byDay={byDay} clashes={clashes} today={today} />
        <AgendaList byDay={byDay} clashes={clashes} today={today} />

        <p className="mt-6 text-[12.5px] text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
          From the{' '}
          <a href={SOURCE_URL} target="_blank" rel="noreferrer" className={`underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-200 ${FOCUS}`}>
            VCAA examination timetable
          </a>
          . Oral, performance and Extended Investigation assessments aren’t shown: VCAA sends each student
          their own time on an advice slip.
        </p>
      </section>
    </div>
  )
}

// ── Filter ─────────────────────────────────────────────────────────────────────────────────

function SubjectFilter({ ids, set }: { ids: Set<string>; set: (ids: Iterable<string>) => void }) {
  const [query, setQuery] = useState('')
  const [browsing, setBrowsing] = useState(false)
  const q = query.trim().toLowerCase()
  const isDefault = ids.size === DEFAULT_IDS.length && DEFAULT_IDS.every(id => ids.has(id))

  const toggle = (s: Subject, on: boolean) => {
    const next = new Set(ids)
    if (on) next.add(s.id)
    else next.delete(s.id)
    set(next)
  }

  const matches = (s: Subject) => !q || s.name.toLowerCase().includes(q) || s.short.toLowerCase().includes(q)
  const picked = SUBJECTS.filter(s => ids.has(s.id))
  const showList = browsing || q !== ''

  return (
    <section
      aria-labelledby="tt-filter"
      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <h2 id="tt-filter" className="font-display text-lg font-bold text-gray-900 dark:text-white mr-auto">
          Subjects <span className="text-gray-500 dark:text-gray-400 font-medium text-[15px]">· {ids.size} picked</span>
        </h2>
        <button type="button" className={`${CHIP_BASE} ${CHIP_OFF}`} disabled={isDefault} onClick={() => set(DEFAULT_IDS)}>
          Defaults
        </button>
        <button type="button" className={`${CHIP_BASE} ${CHIP_OFF}`} disabled={ids.size === 0} onClick={() => set([])}>
          Clear Filter
        </button>
      </div>

      {picked.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Picked subjects">
          {picked.map(s => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => toggle(s, false)}
                aria-label={`Remove ${s.name}`}
                className={`${CHIP_BASE} bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-500 dark:border-emerald-500 dark:text-gray-950 dark:hover:bg-emerald-400 inline-flex items-center gap-1.5`}
              >
                {s.short}
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M2 2l6 6M8 2 2 8" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label className="relative flex-1 min-w-[12rem] max-w-sm">
          <span className="sr-only">Search subjects</span>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search subjects…"
            className={`w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-[14px] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 ${FOCUS}`}
          />
        </label>
        {!q && (
          <button
            type="button"
            aria-expanded={browsing}
            aria-controls="tt-subjects"
            onClick={() => setBrowsing(b => !b)}
            className={`text-[13px] font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-2 rounded ${FOCUS}`}
          >
            {browsing ? 'Hide all subjects' : `Browse all ${SUBJECTS.length} subjects`}
          </button>
        )}
      </div>

      {showList && (
        <div id="tt-subjects" className="mt-4 space-y-4">
          {CATEGORIES.map(cat => {
            const list = SUBJECTS.filter(s => s.category === cat && matches(s))
            if (!list.length) return null
            return (
              <fieldset key={cat}>
                <legend className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">{cat}</legend>
                <div className="flex flex-wrap gap-1.5">
                  {list.map(s => (
                    <Toggle key={s.id} label={s.name} checked={ids.has(s.id)} onChange={on => toggle(s, on)} />
                  ))}
                </div>
              </fieldset>
            )
          })}
          {q && !SUBJECTS.some(matches) && (
            <p className="text-[13px] text-gray-500 dark:text-gray-400">No subject matches “{query.trim()}”.</p>
          )}
        </div>
      )}
    </section>
  )
}

// ── Calendar ───────────────────────────────────────────────────────────────────────────────

interface ViewProps {
  byDay: Map<string, Shown[]>
  clashes: Set<Shown>
  today: string
}

function ExamBlock({ s, clash }: { s: Shown; clash: boolean }) {
  return (
    <div
      className={`rounded-md border px-2 py-1.5 ${clash
        ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40'
        : 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40'}`}
    >
      <p className="text-[11.5px] tabular-nums text-gray-600 dark:text-gray-400">
        {time12(s.session.start)}–{time12(s.session.end)}
      </p>
      {s.exams.map(e => (
        <p key={e.subject.id + (e.paper ?? '')} className="text-[13px] font-semibold leading-snug text-gray-900 dark:text-gray-100" title={e.subject.name}>
          {e.subject.short}{e.paper && <span className="font-medium text-gray-600 dark:text-gray-400"> {e.paper}</span>}
        </p>
      ))}
      {s.session.note && <p className="text-[11px] text-gray-500 dark:text-gray-400">{s.session.note}</p>}
      {clash && <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">Clash</p>}
    </div>
  )
}

function CalendarGrid({ weeks, byDay, clashes, today }: ViewProps & { weeks: string[][] }) {
  return (
    <div className="hidden sm:block rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden" role="table" aria-label={`${YEAR} exam calendar`}>
      <div className="grid grid-cols-5 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" role="row">
        {WEEKDAYS.map(d => (
          <div key={d} role="columnheader" className="px-3 py-2 text-[12px] font-semibold text-gray-500 dark:text-gray-400">{d}</div>
        ))}
      </div>
      {weeks.map(week => (
        <div key={week[0]} className="grid grid-cols-5 border-b last:border-b-0 border-gray-200 dark:border-gray-800" role="row">
          {week.map(iso => {
            const items = byDay.get(iso) ?? []
            const holiday = HOLIDAYS[iso]
            const past = iso < today
            const isToday = iso === today
            const d = toDate(iso)
            return (
              <div
                key={iso}
                role="cell"
                aria-label={dayLabel(iso)}
                className={`min-h-[7.5rem] p-2 border-r last:border-r-0 border-gray-200 dark:border-gray-800 ${past ? 'bg-gray-50/70 dark:bg-gray-900/40' : 'bg-white dark:bg-gray-950'}`}
              >
                <p className={`mb-1.5 text-[12px] font-semibold tabular-nums ${isToday ? 'text-emerald-700 dark:text-emerald-400' : past ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}`}>
                  {d.getDate() === 1 || iso === week[0] ? shortDay(iso) : d.getDate()}
                  {isToday && <span className="ml-1.5 font-semibold">Today</span>}
                </p>
                {holiday && <p className="text-[11.5px] italic text-gray-500 dark:text-gray-400">{holiday}</p>}
                <div className={`space-y-1.5 ${past ? 'opacity-55' : ''}`}>
                  {items.map(s => <ExamBlock key={s.session.date + s.session.start} s={s} clash={clashes.has(s)} />)}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function AgendaList({ byDay, clashes, today }: ViewProps) {
  const days = [...byDay.keys()].sort()
  if (!days.length) {
    return <p className="sm:hidden text-[14px] text-gray-500 dark:text-gray-400">Pick a subject to see its exams.</p>
  }
  return (
    <ol className="sm:hidden space-y-4">
      {days.map(iso => (
        <li key={iso} className={iso < today ? 'opacity-55' : ''}>
          <p className={`text-[13px] font-semibold mb-1.5 ${iso === today ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>
            {dayLabel(iso)}{iso === today && ' · Today'}
          </p>
          <div className="space-y-1.5">
            {byDay.get(iso)!.map(s => <ExamBlock key={s.session.start} s={s} clash={clashes.has(s)} />)}
          </div>
        </li>
      ))}
    </ol>
  )
}
