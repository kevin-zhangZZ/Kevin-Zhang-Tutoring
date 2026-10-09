// Study Score Projection: type in your exam marks (Exam 1 and Exam 2 for Methods and Specialist,
// the one exam for Chemistry) and see the study score they would have earned in each year
// 2016–2025, from VCAA's published grade distributions (data.ts; the method is in model.ts).
//
// A second mode, My Practice Papers (practice.tsx), is a log of the past papers a student has
// sat — paper, date and marks, retakes included — charted as a trend over time.
//
// Subject is in the path (#/study-score/chemistry); the mode and marks are in the query string
// (?e1=32&e2=61 — Chemistry uses e1 alone — or ?mode=papers&a=…), so a result can be bookmarked
// or sent.

import { useEffect, useId, useMemo, useState, type ReactNode } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SegmentedControl from '../../components/ui/SegmentedControl'
import { MEAN, RHO, RHO_RANGE, project, type Projection } from './model'
import { DISTRIBUTIONS, SUBJECTS, SUBJECT_IDS, type Subject } from './data'
import { examShares, topShare } from './format'
import PracticeMode, { loadAttempts } from './practice'

const TOOL = '/study-score'
/** Marks a first visit starts on: 75% of each paper. */
const DEFAULT_SHARE = 0.75

type Mode = 'single' | 'papers'

const markKey = (i: number) => `e${i + 1}`

function readMarks(q: URLSearchParams, subject: Subject): number[] {
  return SUBJECTS[subject].exams.map((e, i) => {
    const v = Number(q.get(markKey(i)))
    return q.has(markKey(i)) && Number.isFinite(v) ? Math.min(e.rawMax, Math.max(0, Math.round(v))) : Math.round(e.rawMax * DEFAULT_SHARE)
  })
}

function marksQuery(marks: number[]): URLSearchParams {
  return new URLSearchParams(marks.map((m, i) => [markKey(i), String(m)]))
}

/** The same marks on another subject's papers: kept if the papers match, else the same overall share. */
function carryMarks(from: Subject, to: Subject, marks: number[]): number[] {
  const a = SUBJECTS[from].exams
  const b = SUBJECTS[to].exams
  if (a.length === b.length && a.every((e, i) => e.rawMax === b[i].rawMax)) return marks
  const share = marks.reduce((s, m) => s + m, 0) / a.reduce((s, e) => s + e.rawMax, 0)
  return b.map(e => Math.round(e.rawMax * share))
}

// ── Page ───────────────────────────────────────────────────────────────────────────────────

export default function StudyScore() {
  const navigate = useNavigate()
  const rest = useParams()['*'] ?? ''
  const subject: Subject = SUBJECT_IDS.find(s => s === rest.split('/')[0]) ?? 'methods'
  const [params, setParams] = useSearchParams()
  const mode: Mode = params.get('mode') === 'papers' ? 'papers' : 'single'
  const marks = readMarks(params, subject)
  const exams = SUBJECTS[subject].exams

  const setMark = (i: number, v: number) => setParams(marksQuery(marks.map((m, k) => (k === i ? v : m))), { replace: true })
  // Practice-paper marks come from the link if it has them, else from this device.
  const papersQuery = (a: string) => {
    const q = new URLSearchParams({ mode: 'papers' })
    if (a) q.set('a', a)
    return q
  }
  const setAttempts = (a: string) => setParams(papersQuery(a), { replace: true })
  const goMode = (m: Mode) => {
    if (m === 'papers') setParams(papersQuery(loadAttempts(subject)), { replace: true })
    else setParams(marksQuery(marks), { replace: true })
  }
  const goSubject = (s: Subject) => {
    const q = mode === 'papers' ? papersQuery(loadAttempts(s)) : marksQuery(carryMarks(subject, s, marks))
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

  const marksKey = marks.join('-')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rows = useMemo(() => project(subject, marks), [subject, marksKey])

  return (
    <div className="px-4 sm:px-6 pt-6 sm:pt-10 pb-16 max-w-5xl mx-auto">
      <header className="mb-5">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Study Score Projection</h1>
        <p className="mt-2 max-w-3xl text-[15px] text-gray-600 dark:text-gray-300">
          {mode === 'single'
            ? `Enter your ${exams.length > 1 ? 'Exam 1 and Exam 2 marks' : 'exam mark'} to see the study score ${exams.length > 1 ? 'they' : 'it'} would have earned in each year from 2016 to 2025, based on where ${exams.length > 1 ? 'they' : 'it'} would have ranked in the state that year.`
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
            options={SUBJECT_IDS.map(s => ({ value: s, label: SUBJECTS[s].label, ariaLabel: SUBJECTS[s].name }))}
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
            <div className={`grid gap-5 sm:gap-8 ${exams.length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-md'}`}>
              {exams.map((e, i) => (
                <MarkInput key={`${subject}-${e.label}`} label={e.label} max={e.rawMax} value={marks[i]} onChange={v => setMark(i, v)} />
              ))}
            </div>
          )}
        </section>

        {mode === 'papers' ? (
          <PracticeMode subject={subject} encoded={params.get('a') ?? ''} onChange={setAttempts} />
        ) : (
          <SingleMode subject={subject} marks={marks} rows={rows} />
        )}

        <AboutNumbers subject={subject} />
      </div>
    </div>
  )
}

function SingleMode({ subject, marks, rows }: { subject: Subject; marks: number[]; rows: Projection[] }) {
  const { name, exams } = SUBJECTS[subject]
  return (
    <>
      <Summary rows={rows} />

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5">
        <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Year by Year</h2>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 mb-4 max-w-2xl">
          {name}, {exams.map((e, i) => `${marks[i]}/${e.rawMax}${exams.length > 1 ? ` on ${e.label}` : ' on the exam'}`).join(' and ')}. Each row is the
          study score {exams.length > 1 ? 'these marks' : 'this mark'} would have earned that year, and the share of the state that would have been ahead of you.
        </p>
        <YearChart subject={subject} rows={rows} />
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

function YearChart({ subject, rows }: { subject: Subject; rows: Projection[] }) {
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
        <YearRow key={r.year} subject={subject} r={r} />
      ))}
    </div>
  )
}

function YearRow({ subject, r }: { subject: Subject; r: Projection }) {
  const exams = SUBJECTS[subject].exams
  const each = exams.length > 1 ? `${exams.map((e, i) => `${e.label} ${topShare(r.pctExams[i])}`).join(', ')}, both exams ` : 'The exam '
  const tip = `${r.year}: study score ${r.score}. ${each}${topShare(r.pct)}. ${r.cohort.toLocaleString()} students sat ${exams.length > 1 ? 'Exam 2' : 'the exam'}.`
  const shares = examShares(subject, r)
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
        <span className="text-gray-700 dark:text-gray-200 font-medium">{topShare(r.pct)}</span>
        {shares && ` · ${shares}`}
      </span>
    </div>
  )
}

// ── Method ─────────────────────────────────────────────────────────────────────────────────

function AboutNumbers({ subject }: { subject: Subject }) {
  const rows = DISTRIBUTIONS[subject]
  const one = SUBJECTS[subject].exams.length === 1
  return (
    <section className="text-[12.5px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl flex flex-col gap-2 px-1">
      <h2 className="font-display text-[15px] font-bold text-gray-700 dark:text-gray-200">How It Works</h2>
      <p>
        <b className="text-gray-700 dark:text-gray-300">{one ? 'Ranking the exam.' : 'Ranking each exam.'}</b> Every year VCAA publishes how many students got each
        grade (UG to A+) on {one ? 'the exam' : 'Exam 1 and Exam 2'}, and the score range for each grade. That gives the share of the state below each grade
        boundary; between boundaries the projection fills in a smooth curve.
      </p>
      {one ? (
        <p>
          <b className="text-gray-700 dark:text-gray-300">One exam.</b> Chemistry has a single end-of-year exam, out of 120 (240 on VCAA’s scale), so your rank on that
          exam is your projected rank. The 2024 and 2025 papers are on the current study design; earlier years are on the previous one, which covered
          some different content.
        </p>
      ) : (
        <p>
          <b className="text-gray-700 dark:text-gray-300">Combining the exams.</b> VCAA adds the exams with Exam 2 counting twice as much as Exam 1 (out of 80 and 160 on
          its scale). It doesn’t publish how students’ Exam 1 and Exam 2 results line up, so the projection assumes a correlation of {RHO} between them —
          typical for two papers on the same course. Anything from {RHO_RANGE[0]} to {RHO_RANGE[1]} moves the result by a point or two at most, and mostly
          when the two exams went very differently.
        </p>
      )}
      <p>
        <b className="text-gray-700 dark:text-gray-300">Study score.</b> Study scores are scaled so the state has a mean of 30 and a standard deviation of 7, capped at
        50. Your {one ? '' : 'combined '}rank is turned into a study score on that curve: the top 16% score about 37 or more, the top 2% about 44 or more, and
        roughly the top 0.2% get 50.
      </p>
      <p>
        <b className="text-gray-700 dark:text-gray-300">What it leaves out.</b> School-assessed coursework (SACs) also counts, but SAC marks are moderated against the
        {one ? ' exam' : ' exams'}, so a student whose SACs are in line with {one ? 'their exam' : 'their exams'} keeps the same rank. This is a projection from published statistics, not
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
