// The analysis page's filters: one floating card above the charts that follows the page as it
// scrolls and scopes everything below it — subject, years, exam, question type, and topics or
// subtopics. Below lg, once it's following the page it folds into a one-line summary of the
// filters that opens the full set on tap, so it never covers half a phone screen.

import { useEffect, useId, useRef, useState } from 'react'
import SegmentedControl from '../../components/ui/SegmentedControl'
import { ALL_YEARS, FIRST_YEAR, LAST_YEAR, STUDY_DESIGN_YEAR, type ExamFilter, type Filters, type Level, type TypeFilter } from './model'
import type { AnalysisSubject } from './taxonomy'

export interface FilterProps {
  f: Filters
  level: Level
  onSubject: (s: AnalysisSubject) => void
  onChange: (patch: Partial<Filters>) => void
  onLevel: (l: Level) => void
}

const SUBJECTS: { id: AnalysisSubject; label: string }[] = [
  { id: 'methods', label: 'Methods' },
  { id: 'specialist', label: 'Specialist' },
]

const PRESETS: { label: string; from: number; to: number }[] = [
  { label: 'All Years', from: FIRST_YEAR, to: LAST_YEAR },
  { label: `Since ${STUDY_DESIGN_YEAR}`, from: STUDY_DESIGN_YEAR, to: LAST_YEAR },
  { label: `2016–${STUDY_DESIGN_YEAR - 1}`, from: 2016, to: STUDY_DESIGN_YEAR - 1 },
  { label: 'Last 5', from: LAST_YEAR - 4, to: LAST_YEAR },
]

const EXAMS: { id: ExamFilter; label: string }[] = [
  { id: 'all', label: 'Both' },
  { id: 'Exam 1', label: 'Exam 1' },
  { id: 'Exam 2', label: 'Exam 2' },
]

const TYPES: { id: TypeFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mc', label: 'MCQ' },
  { id: 'sa', label: 'Short' },
]

const LEVELS: { id: Level; label: string }[] = [
  { id: 'topic', label: 'Topics' },
  { id: 'sub', label: 'Subtopics' },
]

function Seg<T extends string>({ label, value, options, onChange }: { label?: string; value: T; options: { id: T; label: string }[]; onChange: (v: T) => void }) {
  const id = useId()
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span id={id} className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">
          {label}
        </span>
      )}
      <SegmentedControl
        aria-labelledby={label ? id : undefined}
        aria-label={label ? undefined : 'Subject'}
        value={value}
        onChange={onChange}
        options={options.map(o => ({ value: o.id, label: o.label }))}
      />
    </div>
  )
}

function YearSelects({ f, onChange }: { f: Filters; onChange: FilterProps['onChange'] }) {
  const sel = 'bg-gray-100 dark:bg-gray-800 rounded-full px-2.5 py-1 [@media(pointer:coarse)]:py-3 text-[12.5px] font-medium text-gray-800 dark:text-gray-100 border-0 focus:ring-2 focus:ring-sky-500'
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">Years</span>
      <select aria-label="From" value={f.from} onChange={e => onChange({ from: +e.target.value, to: Math.max(+e.target.value, f.to) })} className={sel}>
        {ALL_YEARS.map(y => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <span className="text-gray-400">–</span>
      <select aria-label="To" value={f.to} onChange={e => onChange({ to: +e.target.value, from: Math.min(+e.target.value, f.from) })} className={sel}>
        {ALL_YEARS.map(y => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  )
}

function Presets({ f, onChange }: { f: Filters; onChange: FilterProps['onChange'] }) {
  return (
    <div className="flex flex-wrap gap-1 [@media(pointer:coarse)]:gap-y-4">
      {PRESETS.map(p => {
        const on = f.from === p.from && f.to === p.to
        return (
          <button
            key={p.label}
            type="button"
            aria-pressed={on}
            onClick={() => onChange({ from: p.from, to: p.to })}
            className={`relative px-2.5 py-1 rounded-full text-[12px] font-medium border after:absolute after:-inset-y-0.5 after:-inset-x-px [@media(pointer:coarse)]:after:-inset-y-2 ${
              on ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400'
            }`}
          >
            {p.label}
          </button>
        )
      })}
    </div>
  )
}

/** True once the element has scrolled past the top of the page's scroll area. */
function useStuck() {
  const ref = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const el = ref.current
    const main = document.getElementById('main-content')
    if (!el || !main) return
    const check = () => setStuck(el.getBoundingClientRect().top < main.getBoundingClientRect().top)
    check()
    main.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      main.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])
  return [ref, stuck] as const
}

function summary(p: FilterProps): string {
  const years = p.f.from === p.f.to ? String(p.f.from) : `${p.f.from}–${p.f.to}`
  return [
    SUBJECTS.find(x => x.id === p.f.subject)?.label,
    years,
    p.f.exam === 'all' ? 'Both exams' : p.f.exam,
    p.f.type === 'all' ? null : TYPES.find(x => x.id === p.f.type)?.label,
    p.level === 'sub' ? 'Subtopics' : null,
  ]
    .filter(Boolean)
    .join(' · ')
}

export function FilterBar(p: FilterProps) {
  const [sentinel, stuck] = useStuck()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!stuck) setOpen(false)
  }, [stuck])
  const folded = stuck && !open

  // Folding shrinks the card; a matching bottom margin keeps its footprint in the page the same
  // size, so the content below doesn't jump up when it folds.
  const card = useRef<HTMLDivElement>(null)
  const [h, setH] = useState(0)
  const full = useRef(0)
  useEffect(() => {
    const el = card.current
    if (!el) return
    const ro = new ResizeObserver(() => setH(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  if (!folded && h) full.current = h
  const makeUp = folded && full.current > h ? full.current - h : 0

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-px -mb-px" />
      <div className="sticky top-2 sm:top-3 z-30" style={{ marginBottom: makeUp }}>
        <div
          ref={card}
          className={`rounded-2xl border px-3.5 sm:px-4 py-2.5 backdrop-blur transition-shadow duration-200 ${
            stuck
              ? 'bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-700 shadow-lg shadow-gray-900/[0.06] dark:shadow-black/40'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
          }`}
        >
          {folded && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={false}
              className="lg:hidden w-full flex items-center justify-between gap-3 text-left [@media(pointer:coarse)]:py-1"
            >
              <span className="min-w-0 truncate text-[13px] font-semibold text-gray-800 dark:text-gray-100">{summary(p)}</span>
              <span className="flex-none rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1 text-[12px] font-semibold">Filters</span>
            </button>
          )}
          <div className={`${folded ? 'hidden lg:flex' : 'flex'} flex-wrap items-center gap-x-5 gap-y-2`}>
            <Seg value={p.f.subject} options={SUBJECTS} onChange={p.onSubject} />
            <YearSelects f={p.f} onChange={p.onChange} />
            <Presets f={p.f} onChange={p.onChange} />
            <Seg label="Exam" value={p.f.exam} options={EXAMS} onChange={exam => p.onChange({ exam })} />
            <Seg label="Questions" value={p.f.type} options={TYPES} onChange={type => p.onChange({ type })} />
            <Seg label="Show" value={p.level} options={LEVELS} onChange={p.onLevel} />
            {stuck && open && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-expanded
                className="lg:hidden ml-auto rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3.5 py-1 [@media(pointer:coarse)]:py-2 text-[12px] font-semibold"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
