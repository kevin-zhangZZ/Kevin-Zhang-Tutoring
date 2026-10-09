// Year by Year: the same marks scored against each year, newest first. Each row is one line (a
// dot on a strip, the study score, the share of the state behind you) and opens to a detail
// line with each exam's rank on its own and the number of students who sat it.
//
// The strip is zoomed to the dots: one set of marks moves only a few points across the years,
// which a fixed 10–50 axis squashes into a few pixels on a phone.

import { useId, useMemo, useRef, useState } from 'react'
import { OLD_COURSE_UP_TO, SUBJECTS, type Subject } from '../data.ts'
import { aheadOf } from '../format.ts'
import { MEAN, type Projection } from '../model.ts'
import { CARD, H2, SUB } from '../shared.tsx'
import { WIDE, mediaMatches } from './useMedia.ts'

// ── Axis window ────────────────────────────────────────────────────────────────────────────

interface Span {
  lo: number
  hi: number
}

/** A window snapped to 5s with at least a point of room past every dot, at least 10 wide
 *  (widened toward the state average), and never past 50. */
function windowFor(xs: number[]): Span {
  let lo = Math.floor((Math.min(...xs) - 1) / 5) * 5
  let hi = Math.ceil((Math.max(...xs) + 1) / 5) * 5
  if (hi - lo < 10) {
    if (Math.abs(MEAN - lo) < Math.abs(MEAN - hi)) lo -= 5
    else hi += 5
  }
  if (hi > 50) {
    hi = 50
    lo = Math.min(lo, 40)
  }
  if (lo < 0) {
    lo = 0
    hi = Math.max(hi, 10)
  }
  return { lo, hi }
}

/** Tick labels: the ends and the middle of a window a multiple of 10 wide, else every 5. */
function ticksFor({ lo, hi }: Span): number[] {
  if ((hi - lo) % 10 === 0) return [lo, (lo + hi) / 2, hi]
  const out: number[] = []
  for (let t = lo; t <= hi; t += 5) out.push(t)
  return out
}

// Row tracks, shared by the header and every row so the columns line up.
const GRID = 'grid grid-cols-[2.5rem_minmax(0,1fr)_2rem_6rem_12px] gap-x-2 sm:grid-cols-[3rem_minmax(0,1fr)_2.5rem_7.5rem_12px] sm:gap-x-3'

// ── Card ───────────────────────────────────────────────────────────────────────────────────

export default function YearByYear({ subject, marks, rows }: { subject: Subject; marks: number[]; rows: Projection[] }) {
  const id = useId()
  const { name, exams } = SUBJECTS[subject]
  const newest = rows[rows.length - 1].year
  // The newest year starts open on wider screens, where the detail line costs little room.
  const [open, setOpen] = useState<number | null>(() => (mediaMatches(WIDE) ? newest : null))

  // Keep the current window while every dot stays half a point inside it, so dragging a slider
  // doesn't make the axis jump back and forth.
  const held = useRef<Span | null>(null)
  const span = useMemo(() => {
    const xs = rows.map(r => r.exact)
    const prev = held.current
    const next = prev && xs.every(x => x >= prev.lo + 0.5 && x <= prev.hi - 0.5) ? prev : windowFor(xs)
    held.current = next
    return next
  }, [rows])
  const ticks = ticksFor(span)
  const at = (x: number) => `${((Math.min(span.hi, Math.max(span.lo, x)) - span.lo) / (span.hi - span.lo)) * 100}%`
  const meanShown = MEAN >= span.lo && MEAN <= span.hi

  // Newest first; Specialist and Chemistry split at the change of study design.
  const newestFirst = [...rows].reverse()
  const last = OLD_COURSE_UP_TO[subject]
  const groups: { label: string | null; rows: Projection[] }[] =
    last === null
      ? [{ label: null, rows: newestFirst }]
      : [
          { label: 'Current Course', rows: newestFirst.filter(r => r.year > last) },
          { label: 'Previous Course', rows: newestFirst.filter(r => r.year <= last) },
        ].filter(g => g.rows.length > 0)

  const what = exams.length > 1 ? exams.map((e, i) => `${marks[i]}/${e.rawMax} on ${e.label}`).join(' and ') : `${marks[0]}/${exams[0].rawMax} on the exam`

  return (
    <section aria-labelledby={id} className={CARD}>
      <h2 id={id} className={H2}>
        Year by Year
      </h2>
      <p className={`${SUB} mt-0.5 mb-4 max-w-2xl`}>
        {name}, {what}. Each row is the study score {exams.length > 1 ? 'these marks' : 'this mark'} would have earned that year, and the share of the state
        you would have finished ahead of.
      </p>

      <div className="text-[13px]">
        <div aria-hidden className={`${GRID} items-end pb-1.5 text-[12px] font-semibold text-gray-500 dark:text-gray-400`}>
          <span>Year</span>
          <span className="relative h-4">
            {ticks.map((t, i) => (
              <span
                key={t}
                className={`absolute top-0 font-normal tabular-nums ${i === 0 ? '' : i === ticks.length - 1 ? '-translate-x-full' : '-translate-x-1/2'}`}
                style={{ left: at(t) }}
              >
                {t}
              </span>
            ))}
          </span>
          <span className="text-right">Score</span>
          <span className="hidden sm:block">Ahead of the State</span>
          <span />
        </div>

        {groups.map(g => (
          <YearGroup key={g.label ?? 'all'} label={g.label} rows={g.rows} subject={subject} open={open} onToggle={y => setOpen(o => (o === y ? null : y))} ticks={ticks} at={at} meanShown={meanShown} />
        ))}
      </div>

      <p className="mt-2 flex items-center gap-2 text-[12px] text-gray-500 dark:text-gray-400">
        {meanShown ? (
          <>
            <span aria-hidden className="flex-none w-0.5 h-3 rounded-sm bg-gray-300 dark:bg-gray-600" />
            Darker line: the state average, {MEAN}.
          </>
        ) : (
          `The state average, ${MEAN}, is ${span.lo > MEAN ? 'below' : 'above'} this range.`
        )}
      </p>
    </section>
  )
}

// ── Rows ───────────────────────────────────────────────────────────────────────────────────

function YearGroup({
  label,
  rows,
  subject,
  open,
  onToggle,
  ticks,
  at,
  meanShown,
}: {
  label: string | null
  rows: Projection[]
  subject: Subject
  open: number | null
  onToggle: (year: number) => void
  ticks: number[]
  at: (x: number) => string
  meanShown: boolean
}) {
  const id = useId()
  return (
    <>
      {label && (
        <p id={id} className="pt-2 pb-1 text-[11.5px] font-semibold text-gray-500 dark:text-gray-400">
          {label}
        </p>
      )}
      <ul aria-labelledby={label ? id : undefined}>
        {rows.map(r => (
          <YearRow key={r.year} subject={subject} r={r} open={open === r.year} onToggle={() => onToggle(r.year)} ticks={ticks} at={at} meanShown={meanShown} />
        ))}
      </ul>
    </>
  )
}

function YearRow({
  subject,
  r,
  open,
  onToggle,
  ticks,
  at,
  meanShown,
}: {
  subject: Subject
  r: Projection
  open: boolean
  onToggle: () => void
  ticks: number[]
  at: (x: number) => string
  meanShown: boolean
}) {
  const detailId = useId()
  const exams = SUBJECTS[subject].exams
  const rank = aheadOf(r.pct)
  const cohort = r.cohort.toLocaleString('en-AU')
  const detail =
    exams.length > 1
      ? `${exams.map((e, i) => `${e.label} alone: ${aheadOf(r.pctExams[i])}`).join(' · ')} · ${cohort} students sat ${exams[exams.length - 1].label}.`
      : `${cohort} students sat the exam.`

  return (
    <li className="-mx-2 border-t border-gray-100 dark:border-gray-800">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailId}
        aria-label={`${r.year}: study score ${r.score}, ${rank} of the state`}
        onClick={onToggle}
        className={`group ${GRID} w-full items-center px-2 py-1.5 [@media(pointer:coarse)]:min-h-[44px] text-left rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
      >
        <span className="font-semibold text-gray-700 dark:text-gray-200 tabular-nums">{r.year}</span>
        <span aria-hidden className="relative h-6">
          {ticks.map(t => (
            <span key={t} className="absolute inset-y-0 w-px bg-gray-100 dark:bg-gray-800" style={{ left: at(t) }} />
          ))}
          {meanShown && <span className="absolute inset-y-0 w-px bg-gray-300 dark:bg-gray-600" style={{ left: at(MEAN) }} />}
          <span
            className="absolute top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-600 dark:bg-sky-400 ring-2 ring-white dark:ring-gray-900 group-hover:scale-125 transition-transform motion-reduce:transition-none"
            style={{ left: at(r.exact) }}
          />
        </span>
        <span className="text-right font-display text-base font-bold text-gray-900 dark:text-white tabular-nums">{r.score}</span>
        <span className="whitespace-nowrap text-[12px] sm:text-[12.5px] text-gray-500 dark:text-gray-400 tabular-nums">
          ahead of <b className="font-medium text-gray-700 dark:text-gray-200">{rank.replace('ahead of ', '')}</b>
        </span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className={`w-3 h-3 text-gray-400 dark:text-gray-500 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
        >
          <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p id={detailId} hidden={!open} className="pl-[3.5rem] sm:pl-[4.25rem] pr-2 pb-2 text-[12.5px] leading-snug text-gray-500 dark:text-gray-400 tabular-nums">
        {detail}
      </p>
    </li>
  )
}
