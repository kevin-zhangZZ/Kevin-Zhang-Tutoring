// Study Score Projection: type in an Exam 1 and Exam 2 mark and see the study score those
// marks would have earned in each year 2016–2025, from VCAA's published grade distributions
// (data.ts; the method is in model.ts).
//
// A second mode, My Practice Papers (practice.tsx), is a log of the past papers a student has
// sat — paper, date and marks, retakes included — charted as a trend over time.
//
// Subject is in the path (#/study-score/specialist); the mode and marks are in the query string
// (?e1=32&e2=61, or ?mode=papers&a=…), so a result can be bookmarked or sent.

import { useEffect, useId, useMemo, useState, type ReactNode } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SegmentedControl from '../../components/ui/SegmentedControl'
import { MEAN, RAW_MAX, RHO, RHO_RANGE, project, type Projection } from './model'
import { DISTRIBUTIONS, type Subject } from './data'
import { SUBJECT_NAME, topShare } from './format'
import PracticeMode, { loadAttempts } from './practice'

const TOOL = '/study-score'
const DEFAULT = { e1: 30, e2: 60 }

type Mode = 'single' | 'papers'

function readMark(q: URLSearchParams, key: 'e1' | 'e2'): number {
  const v = Number(q.get(key))
  return q.has(key) && Number.isFinite(v) ? Math.min(RAW_MAX[key], Math.max(0, Math.round(v))) : DEFAULT[key]
}

// ── Page ───────────────────────────────────────────────────────────────────────────────────

export default function StudyScore() {
  const navigate = useNavigate()
  const rest = useParams()['*'] ?? ''
  const subject: Subject = rest.split('/')[0] === 'specialist' ? 'specialist' : 'methods'
  const [params, setParams] = useSearchParams()
  const mode: Mode = params.get('mode') === 'papers' ? 'papers' : 'single'
  const e1 = readMark(params, 'e1')
  const e2 = readMark(params, 'e2')

  const setMarks = (next: { e1?: number; e2?: number }) => {
    const q = new URLSearchParams({ e1: String(next.e1 ?? e1), e2: String(next.e2 ?? e2) })
    setParams(q, { replace: true })
  }
  // Practice-paper marks come from the link if it has them, else from this device.
  const papersQuery = (a: string) => {
    const q = new URLSearchParams({ mode: 'papers' })
    if (a) q.set('a', a)
    return q
  }
  const setAttempts = (a: string) => setParams(papersQuery(a), { replace: true })
  const goMode = (m: Mode) => {
    if (m === 'papers') setParams(papersQuery(loadAttempts(subject)), { replace: true })
    else setMarks({})
  }
  const goSubject = (s: Subject) => {
    const q = mode === 'papers' ? papersQuery(loadAttempts(s)) : params
    navigate(`${TOOL}/${s}?${q}`, { replace: true })
  }

  // Arriving in papers mode with no marks in the link: bring back this device's.
  useEffect(() => {
    if (mode === 'papers' && !params.has('a')) {
      const saved = loadAttempts(subject)
      if (saved) setAttempts(saved)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, subject])

  useEffect(() => {
    if (rest.split('/')[0] !== subject) navigate(`${TOOL}/${subject}${params.toString() ? `?${params}` : ''}`, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rows = useMemo(() => project(subject, e1, e2), [subject, e1, e2])

  return (
    <div className="px-4 sm:px-6 pt-6 sm:pt-10 pb-16 max-w-5xl mx-auto">
      <header className="mb-5">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Study Score Projection</h1>
        <p className="mt-2 max-w-3xl text-[15px] text-gray-600 dark:text-gray-300">
          {mode === 'single'
            ? 'Enter your Exam 1 and Exam 2 marks to see the study score they would have earned in each year from 2016 to 2025, based on where they would have ranked in the state that year.'
            : 'Log each past paper as you sit it to see the study score it projects to, scored against the students who sat that paper, and how your scores are trending.'}
        </p>
      </header>

      <div className="flex flex-col gap-5">
        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5 flex flex-col gap-5">
          <SegmentedControl
            aria-label="Subject"
            size="md"
            fill
            className="w-full sm:w-auto sm:max-w-md"
            value={subject}
            onChange={goSubject}
            options={[
              { value: 'methods', label: 'Mathematical Methods' },
              { value: 'specialist', label: 'Specialist Maths' },
            ]}
          />
          <div className="flex flex-col gap-1.5">
            <span id="ss-mode-label" className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">
              Mode
            </span>
            <SegmentedControl
              aria-labelledby="ss-mode-label"
              fill
              className="w-full sm:w-auto sm:max-w-md"
              value={mode}
              onChange={goMode}
              options={[
                { value: 'single', label: 'One Set of Marks' },
                { value: 'papers', label: 'My Practice Papers' },
              ]}
            />
          </div>
          {mode === 'single' && (
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-8">
              <MarkInput label="Exam 1" max={RAW_MAX.e1} value={e1} onChange={v => setMarks({ e1: v })} />
              <MarkInput label="Exam 2" max={RAW_MAX.e2} value={e2} onChange={v => setMarks({ e2: v })} />
            </div>
          )}
        </section>

        {mode === 'papers' ? (
          <PracticeMode subject={subject} encoded={params.get('a') ?? ''} onChange={setAttempts} />
        ) : (
          <SingleMode subject={subject} e1={e1} e2={e2} rows={rows} />
        )}

        <AboutNumbers subject={subject} />
      </div>
    </div>
  )
}

function SingleMode({ subject, e1, e2, rows }: { subject: Subject; e1: number; e2: number; rows: Projection[] }) {
  return (
    <>
      <Summary rows={rows} />

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5">
        <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Year by Year</h2>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 mb-4 max-w-2xl">
          {SUBJECT_NAME[subject]}, {e1}/{RAW_MAX.e1} on Exam 1 and {e2}/{RAW_MAX.e2} on Exam 2. Each row is the study score these marks would have
          earned that year, and the share of the state that would have been ahead of you.
        </p>
        <YearChart rows={rows} />
      </section>
    </>
  )
}

// ── Inputs ─────────────────────────────────────────────────────────────────────────────────

function MarkInput({ label, max, value, onChange }: { label: string; max: number; value: number; onChange: (v: number) => void }) {
  const id = useId()
  // The box keeps what's typed (even an empty box) until it's a valid mark.
  const [text, setText] = useState(String(value))
  useEffect(() => setText(String(value)), [value])

  const commit = (s: string) => {
    setText(s)
    const v = Number(s)
    if (s.trim() !== '' && Number.isFinite(v) && v >= 0 && v <= max) onChange(Math.round(v))
  }

  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </label>
        <span className="text-[12.5px] text-gray-500 dark:text-gray-400 tabular-nums">{Math.round((value / max) * 100)}%</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-baseline gap-1.5 flex-none">
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={0}
            max={max}
            step={1}
            value={text}
            onChange={e => commit(e.target.value)}
            onBlur={() => setText(String(value))}
            className="w-[4.5rem] rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-2.5 py-1.5 font-display text-xl font-bold text-gray-900 dark:text-white tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-[15px] text-gray-500 dark:text-gray-400">/ {max}</span>
        </div>
        <input
          type="range"
          aria-label={`${label} mark`}
          min={0}
          max={max}
          step={1}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="flex-1 min-w-0 accent-sky-600 dark:accent-sky-400 h-8 cursor-pointer"
        />
      </div>
    </div>
  )
}

// ── Results ────────────────────────────────────────────────────────────────────────────────

function Summary({ rows }: { rows: Projection[] }) {
  const scores = rows.map(r => r.score)
  const sorted = [...scores].sort((a, b) => a - b)
  const median = (sorted[4] + sorted[5]) / 2
  const best = rows.reduce((a, b) => (b.exact > a.exact ? b : a))
  const worst = rows.reduce((a, b) => (b.exact < a.exact ? b : a))
  const latest = rows[rows.length - 1]
  const tile = (label: string, value: ReactNode, sub: ReactNode) => (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 min-w-0 text-center">
      <span className="block text-[12px] font-semibold text-gray-500 dark:text-gray-400">{label}</span>
      <span className="block font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mt-0.5 tabular-nums">{value}</span>
      <span className="block text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{sub}</span>
    </div>
  )
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {tile('Typical Year', Number.isInteger(median) ? median : median.toFixed(1), `Median of 2016–${latest.year}`)}
      {tile(`In ${latest.year}`, latest.score, `${topShare(latest.pct)} of the state`)}
      {tile('Kindest Year', best.score, `${best.year}`)}
      {tile('Toughest Year', worst.score, `${worst.year}`)}
    </div>
  )
}

const LO = 10
const HI = 50
const TICKS = [10, 20, 30, 40, 50]
const xPct = (s: number) => `${((Math.min(HI, Math.max(LO, s)) - LO) / (HI - LO)) * 100}%`

function YearChart({ rows }: { rows: Projection[] }) {
  return (
    <div role="table" aria-label="Projected study score by year" className="text-[13px]">
      <div role="row" className="grid grid-cols-[3rem_1fr_2.5rem] sm:grid-cols-[3rem_1fr_2.5rem_15rem] gap-x-3 items-end pb-1.5 text-[12px] font-semibold text-gray-500 dark:text-gray-400">
        <span role="columnheader">Year</span>
        <span role="columnheader" className="relative h-4">
          {/* Axis labels sit above the track, centred on their ticks. */}
          {TICKS.map(t => (
            <span
              key={t}
              aria-hidden
              // Narrow phones drop the end labels, and the narrowest keep only the mean.
              className={`absolute -translate-x-1/2 tabular-nums font-normal ${
                t === LO || t === HI ? 'hidden min-[400px]:inline' : t !== MEAN ? 'hidden min-[340px]:inline' : ''
              }`}
              style={{ left: xPct(t) }}
            >
              {t}
            </span>
          ))}
          <span className="sr-only">Study score</span>
        </span>
        <span role="columnheader" className="text-right">Score</span>
        <span role="columnheader" className="hidden sm:block">Rank in the State</span>
      </div>
      {[...rows].reverse().map(r => (
        <YearRow key={r.year} r={r} />
      ))}
    </div>
  )
}

function YearRow({ r }: { r: Projection }) {
  const tip = `${r.year}: study score ${r.score}. Exam 1 ${topShare(r.pctE1)}, Exam 2 ${topShare(r.pctE2)}, both exams ${topShare(r.pct)}. ${r.cohort.toLocaleString()} students sat Exam 2.`
  return (
    <div
      role="row"
      title={tip}
      className="group grid grid-cols-[3rem_1fr_2.5rem] sm:grid-cols-[3rem_1fr_2.5rem_15rem] gap-x-3 items-center py-1.5 border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-2 px-2 rounded-md"
    >
      <span role="cell" className="font-semibold text-gray-700 dark:text-gray-200 tabular-nums">
        {r.year}
      </span>
      <span role="cell" className="relative h-6" aria-hidden>
        {TICKS.map(t => (
          <span key={t} className="absolute inset-y-0 w-px bg-gray-100 dark:bg-gray-800" style={{ left: xPct(t) }} />
        ))}
        {/* 30 is the state mean for every study. */}
        <span className="absolute inset-y-0 w-px bg-gray-300 dark:bg-gray-600" style={{ left: xPct(MEAN) }} />
        <span
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-600 dark:bg-sky-400 ring-2 ring-white dark:ring-gray-900 group-hover:scale-125 transition-transform motion-reduce:transition-none"
          style={{ left: xPct(r.exact) }}
        />
      </span>
      <span role="cell" className="text-right font-display text-base font-bold text-gray-900 dark:text-white tabular-nums">
        {r.score}
      </span>
      <span role="cell" className="col-start-2 col-span-2 sm:col-auto -mt-0.5 sm:mt-0 text-[12px] sm:text-[12.5px] text-gray-500 dark:text-gray-400 tabular-nums">
        <span className="text-gray-700 dark:text-gray-200 font-medium">{topShare(r.pct)}</span> · E1 {topShare(r.pctE1).replace('top ', '')} · E2{' '}
        {topShare(r.pctE2).replace('top ', '')}
      </span>
    </div>
  )
}

// ── Method ─────────────────────────────────────────────────────────────────────────────────

function AboutNumbers({ subject }: { subject: Subject }) {
  const rows = DISTRIBUTIONS[subject]
  return (
    <section className="text-[12.5px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl flex flex-col gap-2 px-1">
      <h2 className="font-display text-[15px] font-bold text-gray-700 dark:text-gray-200">How It Works</h2>
      <p>
        <b className="text-gray-700 dark:text-gray-300">Ranking each exam.</b> Every year VCAA publishes how many students got each grade (UG to A+) on Exam 1
        and Exam 2, and the score range for each grade. That gives the share of the state below each grade boundary; between boundaries the
        projection fills in a smooth curve.
      </p>
      <p>
        <b className="text-gray-700 dark:text-gray-300">Combining the exams.</b> VCAA adds the exams with Exam 2 counting twice as much as Exam 1 (out of 80 and 160 on
        its scale). It doesn’t publish how students’ Exam 1 and Exam 2 results line up, so the projection assumes a correlation of {RHO} between them —
        typical for two papers on the same course. Anything from {RHO_RANGE[0]} to {RHO_RANGE[1]} moves the result by a point or two at most, and mostly
        when the two exams went very differently.
      </p>
      <p>
        <b className="text-gray-700 dark:text-gray-300">Study score.</b> Study scores are scaled so the state has a mean of 30 and a standard deviation of 7, capped at
        50. Your combined rank is turned into a study score on that curve: the top 16% score about 37 or more, the top 2% about 44 or more, and
        roughly the top 0.2% get 50.
      </p>
      <p>
        <b className="text-gray-700 dark:text-gray-300">What it leaves out.</b> School-assessed coursework (SACs) also counts, but SAC marks are moderated against the
        exams, so a student whose SACs are in line with their exams keeps the same rank. This is a projection from published statistics, not
        VCAA’s calculation, so treat it as within a point or two. Near full marks, many students are tied, and VCAA separates them with their SACs.
      </p>
      <p>
        <b className="text-gray-700 dark:text-gray-300">Sources.</b> VCAA grade distributions:{' '}
        {[...rows].reverse().map((r, i) => (
          <span key={r.year}>
            <a href={r.source} target="_blank" rel="noreferrer" className="text-sky-700 dark:text-sky-400 hover:underline">
              {r.year}
            </a>
            {i < rows.length - 1 ? ', ' : '.'}
          </span>
        ))}
      </p>
    </section>
  )
}
