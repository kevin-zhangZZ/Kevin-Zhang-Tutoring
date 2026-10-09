// "My Practice Papers" mode: a log of the past papers a student has sat. Each attempt is a
// paper year, the date it was sat (today by default) and the two marks; a retake is just
// another attempt. Each is projected against the cohort that sat that paper, and the chart
// leads with a running average of the last three, since single papers jump around by a few
// points depending on how kind the year was.
//
// The log lives in the URL (?mode=papers&a=20260712-2019-27-55.20260719-2018-26-52: date, paper,
// then one mark per exam, so a Chemistry entry is 20260712-2019-84) so the page
// can be bookmarked or sent to a tutor; it's also remembered on this device, per subject, but
// only when the student edits it, so opening someone else's link never overwrites your own.

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import SegmentedControl from '../../components/ui/SegmentedControl'
import { DISTRIBUTIONS, SUBJECTS, type ExamInfo, type Subject } from './data'
import { projectYear, type Projection } from './model'
import { examShares, marksText, topShare } from './format'

// ── Attempts: parsing, encoding, storage ───────────────────────────────────────────────────

export interface Attempt {
  /** Position in the log; stable while the page is open. */
  id: number
  /** YYYY-MM-DD */
  date: string
  paper: number
  /** Raw marks, one per exam of the subject. */
  marks: number[]
}

const YEARS = DISTRIBUTIONS.methods.map(d => d.year)
const NEWEST = YEARS[YEARS.length - 1]

const byDate = (a: Attempt, b: Attempt) => a.date.localeCompare(b.date) || a.id - b.id

export function decodeAttempts(s: string, subject: Subject): Attempt[] {
  const exams = SUBJECTS[subject].exams
  const out: Attempt[] = []
  for (const part of s.split('.')) {
    const [d, paper, ...marks] = part.split('-')
    if (!/^\d{8}$/.test(d ?? '') || marks.length !== exams.length || !marks.every(m => /^\d{1,3}$/.test(m))) continue
    const date = `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}`
    const a = { id: out.length, date, paper: Number(paper), marks: marks.map(Number) }
    if (Number.isNaN(Date.parse(date)) || !YEARS.includes(a.paper) || a.marks.some((m, k) => m > exams[k].rawMax)) continue
    out.push(a)
  }
  return out.sort(byDate)
}

export function encodeAttempts(list: Attempt[]): string {
  return [...list]
    .sort(byDate)
    .map(a => [a.date.replace(/-/g, ''), a.paper, ...a.marks].join('-'))
    .join('.')
}

const STORE_KEY = 'study-score-attempts'

export function loadAttempts(subject: Subject): string {
  try {
    const all = JSON.parse(localStorage.getItem(STORE_KEY) ?? '{}')
    return typeof all[subject] === 'string' ? all[subject] : ''
  } catch {
    return ''
  }
}

function saveAttempts(subject: Subject, encoded: string) {
  try {
    const all = JSON.parse(localStorage.getItem(STORE_KEY) ?? '{}')
    localStorage.setItem(STORE_KEY, JSON.stringify({ ...all, [subject]: encoded }))
  } catch {
    // Private windows and blocked storage: the URL still holds the log.
  }
}

// ── Dates ──────────────────────────────────────────────────────────────────────────────────

const DAY = 86_400_000
const dayOf = (iso: string) => Date.parse(`${iso}T00:00:00Z`) / DAY

function today(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function fmtDate(iso: string, withYear = iso.slice(0, 4) !== today().slice(0, 4)): string {
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', ...(withYear ? { year: 'numeric' } : {}) })
}

const ORDINAL = ['', '1st', '2nd', '3rd']
const nth = (n: number) => ORDINAL[n] ?? `${n}th`

// ── Mode ───────────────────────────────────────────────────────────────────────────────────

interface Scored extends Attempt {
  proj: Projection
  /** 1 for the first sitting of this paper, 2 for the first retake… */
  sitting: number
}

/** The running average of the last three attempts, from the third attempt on. */
const WINDOW = 3

export default function PracticeMode({ subject, encoded, onChange }: { subject: Subject; encoded: string; onChange: (a: string) => void }) {
  const attempts = useMemo(() => decodeAttempts(encoded, subject), [encoded, subject])
  const scored: Scored[] = useMemo(() => {
    const seen = new Map<number, number>()
    return attempts.map(a => {
      const sitting = (seen.get(a.paper) ?? 0) + 1
      seen.set(a.paper, sitting)
      const d = DISTRIBUTIONS[subject].find(x => x.year === a.paper)!
      return { ...a, sitting, proj: projectYear(subject, d, a.marks) }
    })
  }, [subject, attempts])

  const [editing, setEditing] = useState<number | null>(null)
  // Bumped after each add so the form starts empty again.
  const [added, setAdded] = useState(0)
  useEffect(() => setEditing(null), [subject])

  const commit = (list: Attempt[]) => {
    const next = encodeAttempts(list)
    saveAttempts(subject, next)
    onChange(next)
  }
  const save = (draft: Omit<Attempt, 'id'>) => {
    if (editing === null) {
      commit([...attempts, { ...draft, id: attempts.length }])
      setAdded(n => n + 1)
    } else commit(attempts.map(a => (a.id === editing ? { ...draft, id: a.id } : a)))
    setEditing(null)
  }
  const remove = (id: number) => {
    commit(attempts.filter(a => a.id !== id))
    setEditing(null)
  }
  const clearAll = () => {
    if (!window.confirm(`Clear all your ${SUBJECTS[subject].name} attempts?`)) return
    commit([])
    setEditing(null)
  }

  return (
    <>
      <ProgressTiles scored={scored} />

      <ProgressChart subject={subject} scored={scored} />

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-3">
          <div className="min-w-0">
            <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Your Attempts</h2>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 max-w-2xl">
              Add each paper as you sit it. Saved on this device; use Copy Link to send your log to someone.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CopyLink />
            <button
              type="button"
              onClick={clearAll}
              disabled={!attempts.length}
              className="rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-[13px] font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Clear All
            </button>
          </div>
        </div>
        <AttemptForm
          key={editing ?? `new-${added}`}
          exams={SUBJECTS[subject].exams}
          initial={editing === null ? null : attempts.find(a => a.id === editing) ?? null}
          defaultPaper={YEARS.slice().reverse().find(y => !attempts.some(a => a.paper === y)) ?? NEWEST}
          onSave={save}
          onCancel={() => setEditing(null)}
          onRemove={editing === null ? undefined : () => remove(editing)}
        />
        <AttemptList subject={subject} scored={scored} editing={editing} onEdit={setEditing} />
      </section>
    </>
  )
}

// ── Tiles ──────────────────────────────────────────────────────────────────────────────────

function ProgressTiles({ scored }: { scored: Scored[] }) {
  const tile = (label: string, value: ReactNode, sub: ReactNode, tone = '') => (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 min-w-0 text-center">
      <span className="block text-[12px] font-semibold text-gray-500 dark:text-gray-400">{label}</span>
      <span className={`block font-display text-2xl sm:text-3xl font-bold leading-tight mt-0.5 tabular-nums ${tone || 'text-gray-900 dark:text-white'}`}>{value}</span>
      <span className="block text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{sub}</span>
    </div>
  )
  const n = scored.length
  const avg = (xs: Scored[]) => xs.reduce((s, a) => s + a.proj.exact, 0) / xs.length
  const recent = n ? avg(scored.slice(-WINDOW)) : null
  const change = n > WINDOW ? avg(scored.slice(-WINDOW)) - avg(scored.slice(0, WINDOW)) : null
  const best = n ? scored.reduce((a, b) => (b.proj.exact > a.proj.exact ? b : a)) : null
  const sign = (x: number) => (x > 0.05 ? '+' : x < -0.05 ? '−' : '±')

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {tile(
        'Recent Form',
        recent === null ? '—' : recent.toFixed(1),
        n === 0 ? 'Add a paper below' : n >= WINDOW ? `Average of your last ${WINDOW} papers` : `Average of your ${n === 1 ? 'first paper' : `${n} papers`}`,
      )}
      {tile(
        'Change',
        change === null ? '—' : `${sign(change)}${Math.abs(change).toFixed(1)}`,
        change === null ? `Shows after ${WINDOW + 1} papers` : `Since your first ${WINDOW} papers`,
        change === null || Math.abs(change) < 0.05 ? '' : change > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400',
      )}
      {tile('Best', best ? best.proj.score : '—', best ? `${best.paper} paper, ${fmtDate(best.date)}` : '—')}
      {tile('Papers Sat', n, n ? `Since ${fmtDate(scored[0].date)}` : 'None yet')}
    </div>
  )
}

// ── Chart ──────────────────────────────────────────────────────────────────────────────────

/** A callback ref and the element's width, kept current as it resizes. */
function useWidth() {
  const [w, setW] = useState(0)
  const ro = useRef<ResizeObserver | null>(null)
  const ref = useCallback((el: HTMLElement | null) => {
    ro.current?.disconnect()
    ro.current = null
    if (!el) return
    setW(el.clientWidth)
    ro.current = new ResizeObserver(() => setW(el.clientWidth))
    ro.current.observe(el)
  }, [])
  return [ref, w] as const
}

type ChartView = 'time' | 'paper'

const H = 240
const PAD = { top: 18, right: 16, bottom: 28, left: 34 }
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** x-axis ticks for a span of days: month starts, thinned to fit; weeks if under two months. */
function timeTicks(d0: number, d1: number, maxTicks: number): { day: number; label: string }[] {
  const start = new Date(d0 * DAY)
  const months: { day: number; label: string }[] = []
  for (let y = start.getUTCFullYear(), m = start.getUTCMonth() + 1; ; m++) {
    if (m > 11) {
      y++
      m = 0
    }
    const day = Date.UTC(y, m, 1) / DAY
    if (day > d1) break
    months.push({ day, label: m === 0 ? `Jan ${String(y).slice(2)}` : MONTHS[m] })
  }
  if (months.length >= 2) {
    const step = Math.ceil(months.length / maxTicks)
    return months.filter((_, i) => i % step === 0)
  }
  const weeks: { day: number; label: string }[] = []
  const step = 7 * Math.ceil((d1 - d0) / 7 / maxTicks || 1)
  for (let day = Math.ceil(d0); day <= d1; day += step) {
    const d = new Date(day * DAY)
    weeks.push({ day, label: `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}` })
  }
  return weeks
}

function ProgressChart({ subject, scored }: { subject: Subject; scored: Scored[] }) {
  const [ref, width] = useWidth()
  const [view, setView] = useState<ChartView>('time')
  const [hover, setHover] = useState<number | null>(null)

  const header = (
    <div className="flex flex-col @2xl:flex-row @2xl:items-start @2xl:justify-between gap-2.5 mb-3">
      <div className="min-w-0">
        <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Your Progress</h2>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 max-w-2xl">
          {view === 'time'
            ? `Each paper’s projected study score by the date you sat it. The line is the average of your last ${WINDOW} papers.`
            : 'Each paper’s projected study score by the year the paper was set.'}
        </p>
      </div>
      <SegmentedControl
        aria-label="Chart order"
        className="self-start @2xl:flex-none"
        value={view}
        onChange={setView}
        options={[
          { value: 'time', label: 'Over Time' },
          { value: 'paper', label: 'By Paper Year' },
        ]}
      />
    </div>
  )

  if (!scored.length) {
    return (
      <section className="@container rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5">
        {header}
        <div className="h-40 grid place-items-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-[13px] text-gray-500 dark:text-gray-400 text-center px-4">
          Add a paper below and its projected study score shows up here.
        </div>
      </section>
    )
  }

  // Running average of the last WINDOW attempts, from the WINDOW-th attempt on.
  const rolling = scored.slice(WINDOW - 1).map((a, i) => ({
    a,
    v: scored.slice(i, i + WINDOW).reduce((s, b) => s + b.proj.exact, 0) / WINDOW,
  }))

  const values = [...scored.map(a => a.proj.exact), ...(view === 'time' ? rolling.map(r => r.v) : [])]
  // A 10-point window at least, on 5s, inside 0–50.
  let lo = Math.max(0, Math.floor((Math.min(...values) - 2) / 5) * 5)
  let hi = Math.min(50, Math.ceil((Math.max(...values) + 2) / 5) * 5)
  while (hi - lo < 10) {
    if (hi < 50) hi += 5
    else lo -= 5
  }
  const yTicks: number[] = []
  for (let t = lo; t <= hi; t += 5) yTicks.push(t)

  const iw = Math.max(0, width - PAD.left - PAD.right)
  const ih = H - PAD.top - PAD.bottom
  const y = (s: number) => PAD.top + (1 - (s - lo) / (hi - lo)) * ih

  // x: days for the time view (padded so end dots aren't on the edge), paper years otherwise.
  const days = scored.map(a => dayOf(a.date))
  const pad = Math.max(3, (Math.max(...days) - Math.min(...days)) * 0.04)
  const d0 = Math.min(...days) - pad
  const d1 = Math.max(...days) + pad
  const x =
    view === 'time'
      ? (a: Attempt) => PAD.left + ((dayOf(a.date) - d0) / (d1 - d0)) * iw
      : (a: Attempt) => PAD.left + ((a.paper - YEARS[0]) / (YEARS.length - 1)) * iw
  const xTicks =
    view === 'time'
      ? timeTicks(d0, d1, Math.max(2, Math.floor(iw / 70))).map(t => ({ x: PAD.left + ((t.day - d0) / (d1 - d0)) * iw, label: t.label }))
      : YEARS.filter((_, i) => iw >= 360 || i % 2 === 1).map(yr => ({ x: PAD.left + ((yr - YEARS[0]) / (YEARS.length - 1)) * iw, label: String(yr) }))

  const avg = scored.reduce((s, a) => s + a.proj.exact, 0) / scored.length
  const rollPath = rolling.map((r, i) => `${i ? 'L' : 'M'}${x(r.a).toFixed(1)},${y(r.v).toFixed(1)}`).join('')
  const lastRoll = rolling[rolling.length - 1]
  const hv = scored.find(a => a.id === hover)
  const anyRetake = scored.some(a => a.sitting > 1)

  return (
    <section className="@container rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5">
      {header}
      <div ref={ref} className="relative" onMouseLeave={() => setHover(null)}>
        {width > 0 && (
          <svg
            width={width}
            height={H}
            role="img"
            aria-label={`Projected study score by ${view === 'time' ? 'date sat' : 'paper year'}: ${scored.map(a => `${a.paper} paper on ${fmtDate(a.date)}, ${a.proj.score}`).join('; ')}`}
          >
            {yTicks.map(t => (
              <g key={t}>
                <line x1={PAD.left} x2={width - PAD.right} y1={y(t)} y2={y(t)} className="stroke-gray-100 dark:stroke-gray-800" />
                <text x={PAD.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-gray-500 dark:fill-gray-400 text-[11px] tabular-nums">
                  {t}
                </text>
              </g>
            ))}
            {xTicks.map(t => (
              <text key={t.label} x={t.x} y={H - 8} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[11px] tabular-nums">
                {t.label}
              </text>
            ))}

            {view === 'time' && rolling.length > 0 && (
              <g>
                {rolling.length > 1 && (
                  <path d={rollPath} fill="none" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" className="stroke-sky-600 dark:stroke-sky-400" />
                )}
                <text
                  x={Math.min(x(lastRoll.a) + 8, width - PAD.right)}
                  y={y(lastRoll.v) - 10}
                  textAnchor={x(lastRoll.a) + 40 > width - PAD.right ? 'end' : 'start'}
                  className="fill-gray-700 dark:fill-gray-200 text-[11px] font-semibold tabular-nums"
                >
                  {lastRoll.v.toFixed(1)}
                </text>
              </g>
            )}
            {view === 'paper' && scored.length > 1 && (
              <g>
                <line x1={PAD.left} x2={width - PAD.right} y1={y(avg)} y2={y(avg)} strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" />
                <text x={width - PAD.right} y={y(avg) - 6} textAnchor="end" className="fill-gray-500 dark:fill-gray-400 text-[11px]">
                  Average {avg.toFixed(1)}
                </text>
              </g>
            )}

            {scored.map(a => {
              const on = hover === a.id
              const retake = a.sitting > 1
              // In the time view single papers sit behind the trend line; retakes are hollow.
              const fill = retake
                ? 'fill-white dark:fill-gray-900 stroke-sky-600 dark:stroke-sky-400'
                : view === 'time'
                  ? 'fill-sky-200 dark:fill-sky-900 stroke-sky-600 dark:stroke-sky-400'
                  : 'fill-sky-600 dark:fill-sky-400 stroke-white dark:stroke-gray-900'
              return (
                <g key={a.id}>
                  <circle cx={x(a)} cy={y(a.proj.exact)} r={on ? 6.5 : 5} strokeWidth={retake ? 2.5 : view === 'time' ? 1.5 : 2} className={fill} />
                  {/* A bigger, invisible hit target for hover and tap. */}
                  <circle cx={x(a)} cy={y(a.proj.exact)} r={14} fill="transparent" onMouseEnter={() => setHover(a.id)} onClick={() => setHover(a.id)} />
                </g>
              )
            })}
          </svg>
        )}
        {hv && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-2.5 py-1.5 text-[12px] shadow-lg whitespace-nowrap"
            style={{ left: Math.min(Math.max(x(hv), 90), width - 90), top: y(hv.proj.exact) - 12 }}
          >
            <div className="font-semibold">
              {hv.paper} paper{hv.sitting > 1 ? ` (${nth(hv.sitting)} try)` : ''} · {hv.proj.score}
            </div>
            <div className="opacity-80 tabular-nums">
              {fmtDate(hv.date)} · {marksText(subject, hv.marks)} · {topShare(hv.proj.pct)}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[12px] text-gray-500 dark:text-gray-400">
        {view === 'time' && rolling.length > 1 && (
          <span className="inline-flex items-center gap-1.5">
            <span className="w-4 h-[3px] rounded-full bg-sky-600 dark:bg-sky-400" />
            Last-{WINDOW} average
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${view === 'time' ? 'bg-sky-200 dark:bg-sky-900 border border-sky-600 dark:border-sky-400' : 'bg-sky-600 dark:bg-sky-400'}`}
          />
          Single paper
        </span>
        {anyRetake && (
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-sky-600 dark:border-sky-400" />
            Retake
          </span>
        )}
        {view === 'time' && scored.length < WINDOW && <span>The average line starts at your {nth(WINDOW)} paper.</span>}
      </div>
    </section>
  )
}

// ── Add / edit ─────────────────────────────────────────────────────────────────────────────

const INPUT =
  'rounded-lg border bg-white dark:bg-gray-950 px-2 py-1.5 text-[14px] font-semibold text-gray-900 dark:text-white tabular-nums focus:outline-none focus:ring-2'
const LABEL = 'flex flex-col gap-1 text-[12px] font-semibold text-gray-500 dark:text-gray-400'

function AttemptForm({
  exams,
  initial,
  defaultPaper,
  onSave,
  onCancel,
  onRemove,
}: {
  exams: ExamInfo[]
  initial: Attempt | null
  defaultPaper: number
  onSave: (a: Omit<Attempt, 'id'>) => void
  onCancel: () => void
  onRemove?: () => void
}) {
  const [paper, setPaper] = useState(initial?.paper ?? defaultPaper)
  const [date, setDate] = useState(initial?.date ?? today())
  const [texts, setTexts] = useState<string[]>(() => exams.map((_, k) => (initial ? String(initial.marks[k]) : '')))
  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (initial) formRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mark = (s: string, max: number) => {
    const v = Number(s)
    return s.trim() !== '' && Number.isInteger(v) && v >= 0 && v <= max ? v : null
  }
  const marks = exams.map((e, k) => mark(texts[k], e.rawMax))
  const bad = exams.map((_, k) => texts[k].trim() !== '' && marks[k] === null)
  const setText = (k: number, v: string) => setTexts(ts => ts.map((t, i) => (i === k ? v : t)))
  const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(date)
  const ready = marks.every(m => m !== null) && dateOk

  const markBox = (label: string, value: string, set: (s: string) => void, max: number, bad: boolean) => (
    <label className={LABEL}>
      {label}
      <span className="flex items-baseline gap-1.5">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={max}
          step={1}
          value={value}
          aria-invalid={bad || undefined}
          onChange={e => set(e.target.value)}
          className={`w-[4rem] ${INPUT} ${bad ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'}`}
        />
        <span className="text-[12.5px] font-normal">/ {max}</span>
      </span>
    </label>
  )

  return (
    <form
      ref={formRef}
      onSubmit={e => {
        e.preventDefault()
        if (ready) onSave({ paper, date, marks: marks as number[] })
      }}
      className={`flex flex-wrap items-end gap-x-3 gap-y-3 rounded-xl border p-3 mb-4 ${
        initial ? 'border-sky-300 dark:border-sky-800 bg-sky-50/60 dark:bg-sky-950/30' : 'border-dashed border-gray-300 dark:border-gray-700'
      }`}
    >
      {initial && <p className="basis-full text-[12.5px] font-semibold text-sky-800 dark:text-sky-300 -mb-1">Editing your {initial.paper} paper from {fmtDate(initial.date)}</p>}
      <label className={LABEL}>
        Paper
        <select
          value={paper}
          onChange={e => setPaper(Number(e.target.value))}
          className={`${INPUT} border-gray-300 dark:border-gray-700 focus:ring-blue-500 pr-7`}
        >
          {YEARS.slice()
            .reverse()
            .map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
        </select>
      </label>
      <label className={LABEL}>
        Date Sat
        <input
          type="date"
          value={date}
          max={today()}
          onChange={e => setDate(e.target.value)}
          className={`${INPUT} border-gray-300 dark:border-gray-700 focus:ring-blue-500 font-medium`}
        />
      </label>
      {exams.map((e, k) => (
        <span key={e.label} className="contents">
          {markBox(e.label, texts[k], v => setText(k, v), e.rawMax, bad[k])}
        </span>
      ))}
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={!ready}
          className="rounded-lg bg-sky-600 dark:bg-sky-500 px-3.5 py-2 text-[13px] font-semibold text-white dark:text-gray-950 hover:bg-sky-700 dark:hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        >
          {initial ? 'Save Changes' : 'Add Attempt'}
        </button>
        {initial && (
          <>
            <button type="button" onClick={onCancel} className="rounded-lg px-3 py-2 text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Cancel
            </button>
            <button type="button" onClick={onRemove} className="rounded-lg px-3 py-2 text-[13px] font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40">
              Remove
            </button>
          </>
        )}
      </div>
      {bad.some(Boolean) && (
        <p className="basis-full text-[12.5px] text-rose-600 dark:text-rose-400 -mt-1">
          {exams
            .filter((_, k) => bad[k])
            .map(e => `${e.label} is out of ${e.rawMax}.`)
            .join(' ')}
        </p>
      )}
    </form>
  )
}

// ── Log ────────────────────────────────────────────────────────────────────────────────────

function AttemptList({
  subject,
  scored,
  editing,
  onEdit,
}: {
  subject: Subject
  scored: Scored[]
  editing: number | null
  onEdit: (id: number) => void
}) {
  const exams = SUBJECTS[subject].exams
  if (!scored.length) {
    return <p className="text-[13px] text-gray-500 dark:text-gray-400 px-1">No papers yet. Your first attempt will appear here.</p>
  }
  // Narrow cards put the rank on a second line; wide ones give each mark and the rank a column.
  const cols =
    exams.length > 1
      ? 'grid grid-cols-[4.5rem_1fr_auto_2.25rem_auto] @3xl:grid-cols-[5.5rem_7.5rem_4.5rem_4.5rem_2.5rem_1fr_auto] gap-x-3'
      : 'grid grid-cols-[4.5rem_1fr_auto_2.25rem_auto] @3xl:grid-cols-[5.5rem_7.5rem_5.5rem_2.5rem_1fr_auto] gap-x-3'
  const wide = 'hidden @3xl:block'
  const narrow = '@3xl:hidden'
  return (
    <div className="@container">
      <div role="table" aria-label="Your attempts, newest first" className="text-[13px]">
        <div role="row" className={`${cols} pb-1.5 text-[12px] font-semibold text-gray-500 dark:text-gray-400`}>
          <span role="columnheader">Date Sat</span>
          <span role="columnheader">Paper</span>
          {exams.map(e => (
            <span key={e.label} role="columnheader" className={wide}>
              {e.label}
            </span>
          ))}
          <span role="columnheader" className={narrow}>
            {exams.map(e => e.short).join(' · ')}
          </span>
          <span role="columnheader" className="text-right">
            Score
          </span>
          <span role="columnheader" className={wide}>
            Rank in the State
          </span>
          <span role="columnheader">
            <span className="sr-only">Edit</span>
          </span>
        </div>
        {[...scored].reverse().map(a => (
          <div
            key={a.id}
            role="row"
            className={`${cols} items-center py-1.5 border-t border-gray-100 dark:border-gray-800 -mx-2 px-2 rounded-md ${
              editing === a.id ? 'bg-sky-50 dark:bg-sky-950/40' : ''
            }`}
          >
            <span role="cell" className="text-gray-600 dark:text-gray-300 tabular-nums">
              {fmtDate(a.date)}
            </span>
            <span role="cell" className="font-semibold text-gray-700 dark:text-gray-200 tabular-nums whitespace-nowrap">
              {a.paper}
              {a.sitting > 1 && (
                <span className="ml-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                  {nth(a.sitting)} try
                </span>
              )}
            </span>
            {exams.map((e, k) => (
              <span key={e.label} role="cell" className={`${wide} tabular-nums text-gray-700 dark:text-gray-200`}>
                {a.marks[k]}
                <span className="text-gray-500 dark:text-gray-400 text-[12px]"> / {e.rawMax}</span>
              </span>
            ))}
            <span role="cell" className={`${narrow} tabular-nums text-gray-600 dark:text-gray-300 text-[12.5px] whitespace-nowrap`}>
              {a.marks.join(' · ')}
            </span>
            <span role="cell" className="text-right font-display text-base font-bold text-gray-900 dark:text-white tabular-nums">
              {a.proj.score}
            </span>
            <span
              role="cell"
              className="order-last @3xl:order-none col-start-2 col-span-3 @3xl:col-auto -mt-0.5 @3xl:mt-0 text-[12px] @3xl:text-[12.5px] text-gray-500 dark:text-gray-400 tabular-nums"
            >
              <span className="text-gray-700 dark:text-gray-200 font-medium">{topShare(a.proj.pct)}</span>
              {examShares(subject, a.proj) && ` · ${examShares(subject, a.proj)}`}
            </span>
            <span role="cell" className="flex justify-end">
              <button
                type="button"
                onClick={() => onEdit(a.id)}
                aria-label={`Edit your ${a.paper} paper from ${fmtDate(a.date)}`}
                className="relative text-[12.5px] font-medium text-sky-700 dark:text-sky-400 hover:underline after:absolute after:-inset-2"
              >
                Edit
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CopyLink() {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(window.location.href).then(
          () => setCopied(true),
          () => undefined,
        )
      }}
      className="rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-[13px] font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <span aria-live="polite">{copied ? 'Copied' : 'Copy Link'}</span>
    </button>
  )
}
