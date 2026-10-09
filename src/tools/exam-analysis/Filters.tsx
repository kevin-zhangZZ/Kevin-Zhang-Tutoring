// The analysis page's filters: one bar above the charts (sticky on wide screens) that scopes
// everything below it — subject, years, exam, question type, and topics or subtopics.

import { useId, type ReactNode } from 'react'
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

function Bar({ children }: { children: ReactNode }) {
  return (
    <div className="xl:sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2.5 bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur border-y xl:border-t-0 border-gray-200 dark:border-gray-800">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">{children}</div>
    </div>
  )
}

export function FilterBar(p: FilterProps) {
  return (
    <Bar>
      <Seg value={p.f.subject} options={SUBJECTS} onChange={p.onSubject} />
      <YearSelects f={p.f} onChange={p.onChange} />
      <Presets f={p.f} onChange={p.onChange} />
      <Seg label="Exam" value={p.f.exam} options={EXAMS} onChange={exam => p.onChange({ exam })} />
      <Seg label="Questions" value={p.f.type} options={TYPES} onChange={type => p.onChange({ type })} />
      <Seg label="Show" value={p.level} options={LEVELS} onChange={p.onLevel} />
    </Bar>
  )
}
