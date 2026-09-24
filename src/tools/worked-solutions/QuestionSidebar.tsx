// The question list: pick a year (or a topic), then a question. Its layout follows the
// visitor's Sidebar Settings (sidebarPrefs.tsx); what it lists, and in what order, comes
// from sidebarModel.ts. The same component renders the desktop panel, the phone's Questions
// sheet, and the live preview on the settings page.

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SUBJECT_NAME, QUESTION_TYPE_LABEL, type QuestionMeta, type QuestionType, type SubjectId } from './data'
import { examSourceFor } from './examSources'
import type { ListSort, ListView, SidebarPrefs } from './sidebarPrefs'
import {
  EXAMS,
  HARD_BELOW,
  EASY_FROM,
  difficulty,
  difficultyBand,
  type DifficultyBand,
  examItems,
  examTypes,
  mainCode,
  omittedFor,
  partsOf,
  topicGroups,
  topicOf,
  topicQuestions,
  yearsFor,
} from './sidebarModel'
import type { OmittedQuestion } from './omitted'

export interface SidebarNav {
  /** Given in the real sidebar: rows and years become links to these paths. */
  questionHref?: (q: QuestionMeta) => string
  yearHref?: (year: number) => string
  /** Called when a question is chosen (after navigation, when there are hrefs). */
  onQuestion?: (q: QuestionMeta) => void
  /** Called when a year is chosen from the stepper's dropdown or arrows (and, without
   *  hrefs, from the rail or chips). */
  onYear: (year: number) => void
  onPart?: (letter: string) => void
}

// The question the list opens around: the open one, or — back on the phone's list screen —
// the one just left (`recent`), which also gets a light outline so you can see where you were.
const AnchorCtx = createContext<{ anchor: QuestionMeta | null; recentId: string | null }>({ anchor: null, recentId: null })

export function QuestionSidebar({
  subject,
  year,
  selected,
  recent = null,
  activePart,
  prefs,
  view,
  sort,
  onView,
  onSort,
  nav,
  settingsHref,
}: {
  subject: SubjectId
  year: number | null
  selected: QuestionMeta | null
  recent?: QuestionMeta | null
  activePart: string | null
  prefs: SidebarPrefs
  view: ListView
  sort: ListSort
  onView: (v: ListView) => void
  onSort: (s: ListSort) => void
  nav: SidebarNav
  settingsHref?: string
}) {
  return (
    <AnchorCtx.Provider value={{ anchor: selected ?? recent, recentId: selected ? null : recent?.id ?? null }}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-2 mt-1 mb-2 ml-1.5">
          <span className="font-display text-[13px] font-bold text-gray-900 dark:text-white">{SUBJECT_NAME[subject]}</span>
          {settingsHref && (
            <Link
              to={settingsHref}
              title="Sidebar settings"
              aria-label="Sidebar settings"
              className="w-7 h-7 grid place-items-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
                <circle cx="16" cy="6" r="2" />
                <circle cx="10" cy="12" r="2" />
                <circle cx="18" cy="18" r="2" />
              </svg>
            </Link>
          )}
        </div>

        {/* One row that never wraps, so the switches stay put whatever the list below them does.
            The list switch takes only what it needs; the order switch, with the longer labels,
            gets the rest. */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-1.5 mb-3">
          <Segmented
            label="List by"
            value={view}
            onChange={onView}
            options={[
              ['year', 'Year'],
              ['topic', 'Topic'],
            ]}
          />
          <Segmented
            label="Order"
            value={sort}
            onChange={onSort}
            options={[
              ['exam', 'Exam order'],
              ['hard', 'Hardest first'],
            ]}
          />
        </div>

        {view === 'year' ? (
          <YearView subject={subject} year={year} selected={selected} activePart={activePart} prefs={prefs} sort={sort} nav={nav} />
        ) : (
          <TopicView subject={subject} selected={selected} activePart={activePart} prefs={prefs} sort={sort} nav={nav} />
        )}
      </div>
    </AnchorCtx.Provider>
  )
}

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T
  onChange: (v: T) => void
  options: [T, string][]
}) {
  return (
    <div role="group" aria-label={label} className="grid grid-flow-col auto-cols-fr gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
      {options.map(([v, text]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={`px-2.5 py-1.5 rounded-md text-[11.5px] font-medium whitespace-nowrap transition-colors ${
            value === v
              ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ By Year */

function YearView({
  subject,
  year,
  selected,
  activePart,
  prefs,
  sort,
  nav,
}: {
  subject: SubjectId
  year: number | null
  selected: QuestionMeta | null
  activePart: string | null
  prefs: SidebarPrefs
  sort: ListSort
  nav: SidebarNav
}) {
  const years = yearsFor(subject)
  const content = (
    <YearContent subject={subject} year={year} selected={selected} activePart={activePart} prefs={prefs} sort={sort} nav={nav} />
  )

  if (prefs.yearNav === 'rail') {
    return (
      <div className="flex gap-2">
        <div className="flex-none flex flex-col gap-0.5 pt-0.5">
          {years.map(y => (
            <NavItem
              key={y}
              href={nav.yearHref?.(y)}
              onClick={nav.yearHref ? undefined : () => nav.onYear(y)}
              current={y === year}
              className={`w-10 text-center font-display text-[11.5px] font-bold py-1.5 rounded-lg transition-colors ${
                y === year
                  ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              {y}
            </NavItem>
          ))}
        </div>
        <div className="flex-1 min-w-0 border-l border-gray-100 dark:border-gray-800 pl-2.5 flex flex-col">{content}</div>
      </div>
    )
  }

  if (prefs.yearNav === 'stepper') {
    const i = year === null ? -1 : years.indexOf(year)
    const prev = i > 0 ? years[i - 1] : null
    const next = i === -1 ? years[years.length - 1] : i < years.length - 1 ? years[i + 1] : null
    const arrow =
      'w-8 h-8 flex-none grid place-items-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
    return (
      <>
        <div className="flex items-center gap-1.5 mb-3">
          {prev !== null ? (
            <NavItem href={nav.yearHref?.(prev)} onClick={nav.yearHref ? undefined : () => nav.onYear(prev)} className={arrow} label="Previous year">
              ‹
            </NavItem>
          ) : (
            <span className={`${arrow} opacity-30`} aria-hidden>
              ‹
            </span>
          )}
          <select
            aria-label="Year"
            value={year ?? ''}
            onChange={e => e.target.value && nav.onYear(Number(e.target.value))}
            className="flex-1 min-w-0 h-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 font-display text-[13px] font-bold text-gray-900 dark:text-white text-center [text-align-last:center]"
          >
            {year === null && <option value="">Choose a year</option>}
            {years.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {next !== null ? (
            <NavItem href={nav.yearHref?.(next)} onClick={nav.yearHref ? undefined : () => nav.onYear(next)} className={arrow} label="Next year">
              ›
            </NavItem>
          ) : (
            <span className={`${arrow} opacity-30`} aria-hidden>
              ›
            </span>
          )}
        </div>
        {content}
      </>
    )
  }

  return (
    <>
      <YearChips years={years} year={year} nav={nav} />
      {content}
    </>
  )
}

function YearChips({ years, year, nav }: { years: number[]; year: number | null; nav: SidebarNav }) {
  const rowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const row = rowRef.current
    const on = row?.querySelector<HTMLElement>('[aria-current]')
    if (row && on) row.scrollLeft = on.offsetLeft - row.clientWidth / 2 + on.clientWidth / 2
  }, [year])
  return (
    <div ref={rowRef} className="relative flex gap-1 overflow-x-auto scrollbar-quiet pb-1.5 mb-2">
      {years.map(y => (
        <NavItem
          key={y}
          href={nav.yearHref?.(y)}
          onClick={nav.yearHref ? undefined : () => nav.onYear(y)}
          current={y === year}
          className={`flex-none px-2.5 py-1 rounded-full font-display text-[11.5px] font-bold transition-colors ${
            y === year
              ? 'bg-sky-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          {y}
        </NavItem>
      ))}
    </div>
  )
}

function YearContent({
  subject,
  year,
  selected,
  activePart,
  prefs,
  sort,
  nav,
}: {
  subject: SubjectId
  year: number | null
  selected: QuestionMeta | null
  activePart: string | null
  prefs: SidebarPrefs
  sort: ListSort
  nav: SidebarNav
}) {
  const exams = EXAMS[subject]
  const { anchor } = useContext(AnchorCtx)
  const selectedExam = anchor && anchor.subject === subject && anchor.year === year ? anchor.exam : null
  // Tabs follow the open question (so previous / next across exams switches tab), until the
  // visitor picks a tab themselves.
  const [tabChoice, setTabChoice] = useState<string | null>(null)
  useEffect(() => setTabChoice(null), [anchor?.id, year, subject])
  const [folded, setFolded] = useState<Record<string, boolean>>({})

  if (year === null) return <StartHere pointing={prefs.yearNav === 'rail' ? 'left' : 'up'} />

  const section = (exam: string, first: boolean, inTabs: boolean) => (
    <ExamSection
      key={exam}
      subject={subject}
      year={year}
      exam={exam}
      first={first}
      inTabs={inTabs}
      selected={selected}
      activePart={activePart}
      prefs={prefs}
      sort={sort}
      nav={nav}
      folded={folded}
      setFolded={(k, v) => setFolded(f => ({ ...f, [k]: v }))}
      defaultOpen={selectedExam ? selectedExam === exam : first}
    />
  )

  if (prefs.examLayout === 'tabs' && exams.length > 1) {
    const current = tabChoice ?? selectedExam ?? exams[0]
    return (
      <>
        <div role="tablist" aria-label="Exam" className="grid grid-flow-col auto-cols-fr gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 mb-2">
          {exams.map(e => (
            <button
              key={e}
              type="button"
              role="tab"
              aria-selected={e === current}
              onClick={() => setTabChoice(e)}
              className={`py-1 rounded-md text-[11.5px] font-semibold transition-colors ${
                e === current ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {e}
            </button>
          ))}
        </div>
        {section(current, true, true)}
        <Legend prefs={prefs} />
      </>
    )
  }
  return (
    <>
      {exams.map((e, i) => section(e, i === 0, false))}
      <Legend prefs={prefs} />
    </>
  )
}

// Difficulty colours: grey → amber, deeper amber = harder. Numbers stay grey apart from the
// hardest band, which is amber and bold.
const BAND_FILL: Record<DifficultyBand, string> = {
  hard: 'bg-amber-600 dark:bg-amber-400',
  medium: 'bg-amber-300 dark:bg-amber-700',
  easy: 'bg-gray-300 dark:bg-gray-600',
}
const BAND_NUMBER: Record<DifficultyBand, string> = {
  hard: 'font-extrabold text-amber-700 dark:text-amber-400',
  medium: 'font-bold text-gray-500 dark:text-gray-400',
  easy: 'font-bold text-gray-500 dark:text-gray-400',
}
const BAND_LABEL: Record<DifficultyBand, string> = {
  hard: `under ${HARD_BELOW}%`,
  medium: `${HARD_BELOW}–${EASY_FROM - 1}%`,
  easy: `${EASY_FROM}% or more`,
}

// The key to the percentages — only once there are percentages on screen (a year, or a
// topic, is open).
function Legend({ prefs }: { prefs: SidebarPrefs }) {
  return (
    <div className="text-[10.5px] text-gray-400 dark:text-gray-500 leading-snug px-1 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
      {prefs.diff !== 'pct' && (
        <p className="flex flex-wrap gap-x-3 gap-y-1 mb-1.5">
          {(['hard', 'medium', 'easy'] as DifficultyBand[]).map(b => (
            <span key={b} className="inline-flex items-center gap-1">
              <span className={`w-2 h-2 rounded-sm ${BAND_FILL[b]}`} aria-hidden />
              {BAND_LABEL[b]}
            </span>
          ))}
        </p>
      )}
      <p>Percentages are students who got an MCQ right, or the average mark on a short answer or part, from VCAA’s reports.</p>
    </div>
  )
}

// Before a year is chosen: a small speech bubble pointing at the year control, gently bobbing
// (still, for visitors who prefer reduced motion).
function StartHere({ pointing }: { pointing: 'up' | 'left' }) {
  return (
    <div
      role="note"
      className={`relative w-fit max-w-[190px] mt-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl px-3.5 py-2 text-[12.5px] font-semibold leading-snug shadow-lg ${
        pointing === 'up' ? 'mx-auto animate-[bob-y_1.6s_ease-in-out_infinite]' : 'ml-2 animate-[bob-x_1.6s_ease-in-out_infinite]'
      }`}
    >
      <span
        aria-hidden
        className={`absolute w-3 h-3 rotate-45 bg-gray-900 dark:bg-white ${pointing === 'up' ? '-top-1.5 left-1/2 -ml-1.5' : '-left-1.5 top-3'}`}
      />
      <span className="relative flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-none" />
        Start here: choose a year
      </span>
    </div>
  )
}

function ExamSection({
  subject,
  year,
  exam,
  first,
  inTabs,
  selected,
  activePart,
  prefs,
  sort,
  nav,
  folded,
  setFolded,
  defaultOpen,
}: {
  subject: SubjectId
  year: number
  exam: string
  first: boolean
  inTabs: boolean
  selected: QuestionMeta | null
  activePart: string | null
  prefs: SidebarPrefs
  sort: ListSort
  nav: SidebarNav
  folded: Record<string, boolean>
  setFolded: (key: string, folded: boolean) => void
  defaultOpen: boolean
}) {
  const examKey = `${subject}-${year}-${exam}`
  const collapsible = prefs.examLayout === 'collapsible'
  const open = !collapsible || !(folded[examKey] ?? !defaultOpen)
  const types = examTypes(subject, year, exam)
  const source = examSourceFor(subject, year, exam)
  const count = types.reduce((n, t) => n + examItems(subject, year, exam, t, 'exam', false).length, 0)
  const omitted = omittedFor(subject, year, exam)
  const showOmittedRows = prefs.skipped === 'row' && sort === 'exam'
  const showOmittedNote = omitted.length > 0 && (prefs.skipped === 'note' || (prefs.skipped === 'row' && sort === 'hard'))
  const { anchor } = useContext(AnchorCtx)
  const selectedHere = anchor && anchor.subject === subject && anchor.year === year && anchor.exam === exam ? anchor : null

  return (
    <div className={`flex flex-col gap-1 ${first ? '' : 'mt-3'}`}>
      <div className="flex items-center justify-between gap-2 px-1 min-h-[26px]">
        {collapsible ? (
          <button
            type="button"
            onClick={() => setFolded(examKey, open)}
            aria-expanded={open}
            className="flex items-center gap-1.5 text-[11.5px] font-bold text-gray-900 dark:text-white"
          >
            <Chevron open={open} />
            {exam}
            {!open && <span className="font-medium text-gray-400 dark:text-gray-500">· {count} questions</span>}
          </button>
        ) : inTabs ? (
          <span className="text-[11px] text-gray-400 dark:text-gray-500">Original PDFs</span>
        ) : (
          <span className="text-[11.5px] font-bold text-gray-900 dark:text-white">{exam}</span>
        )}
        {source && <SourceLinks paper={source.paper} report={source.reportPdf ?? source.report} style={prefs.links} />}
      </div>

      {subject === 'chemistry' && (
        <p className="text-[11px] text-gray-500 dark:text-gray-400 px-1 leading-snug mb-0.5">
          The multiple-choice questions students found hardest, plus any VCAA later flagged.
        </p>
      )}

      {open && (
        <>
          {types.length === 0 && <p className="text-[11.5px] text-gray-400 dark:text-gray-500 px-1">No worked solutions here yet.</p>}
          {types.map(type => {
            const typeKey = `${examKey}-${type}`
            const foldable = prefs.typeFold === 'fold' && types.length > 1
            // With a question open in this exam, its group starts open and the other folded.
            const typeDefaultOpen = selectedHere ? selectedHere.type === type : true
            const typeOpen = !foldable || !(folded[typeKey] ?? !typeDefaultOpen)
            const items = examItems(subject, year, exam, type, sort, showOmittedRows)
            return (
              <div key={type} className="flex flex-col gap-0.5">
                {types.length > 1 &&
                  (foldable ? (
                    <button
                      type="button"
                      onClick={() => setFolded(typeKey, typeOpen)}
                      aria-expanded={typeOpen}
                      className="flex items-center gap-1.5 bg-slate-200 dark:bg-slate-800/40 hover:bg-slate-300/70 dark:hover:bg-slate-800/70 rounded-lg px-2.5 py-1.5 my-0.5 text-left"
                    >
                      <Chevron open={typeOpen} />
                      <span className="font-display text-[10.5px] font-bold leading-none text-slate-700 dark:text-slate-300 tracking-wide">
                        {QUESTION_TYPE_LABEL[type as QuestionType]}
                      </span>
                      <span className="ml-auto font-display text-[10.5px] font-bold leading-none text-slate-500 dark:text-slate-400">
                        {items.filter(it => it.kind === 'question').length}
                      </span>
                    </button>
                  ) : (
                    <div className="flex items-center bg-slate-200 dark:bg-slate-800/40 rounded-lg px-2.5 py-1.5 my-0.5">
                      <span className="font-display text-[10.5px] font-bold leading-none text-slate-700 dark:text-slate-300 tracking-wide">
                        {QUESTION_TYPE_LABEL[type as QuestionType]}
                      </span>
                    </div>
                  ))}
                {typeOpen &&
                  items.map(it =>
                    it.kind === 'question' ? (
                      <QuestionRow key={it.q.id} q={it.q} selected={selected} activePart={activePart} prefs={prefs} nav={nav} />
                    ) : (
                      <OmittedRow key={it.o.code} o={it.o} />
                    ),
                  )}
              </div>
            )
          })}
          {showOmittedNote && (
            <p className="text-[11px] text-gray-400 dark:text-gray-500 italic px-1 mt-1 leading-snug">
              Left out: {omitted.map(o => `${o.code} (${o.reason})`).join(', ')}.
            </p>
          )}
        </>
      )}
    </div>
  )
}

function SourceLinks({ paper, report, style }: { paper: string; report: string; style: SidebarPrefs['links'] }) {
  const cls =
    style === 'buttons'
      ? 'text-[10.5px] font-semibold px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      : 'text-[10.5px] font-semibold text-sky-700 dark:text-sky-400 hover:underline'
  return (
    <span className={`flex ${style === 'buttons' ? 'gap-1' : 'gap-2.5'}`}>
      <a href={paper} target="_blank" rel="noreferrer" className={cls}>
        Paper
      </a>
      <a href={report} target="_blank" rel="noreferrer" className={cls}>
        Report
      </a>
    </span>
  )
}

function OmittedRow({ o }: { o: OmittedQuestion }) {
  const redacted = /redacted/i.test(o.reason)
  // The Skip Guide explains why, and opens on this paper.
  const why = `/exam-skip-guide/${o.subject}/${o.year}/${o.exam.trim().toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 ml-2.5">
      <span className="flex-none w-[52px] font-display text-[11.5px] font-bold text-gray-300 dark:text-gray-600">{o.code}</span>
      <span className="flex-1 min-w-0 text-[11.5px] text-gray-400 dark:text-gray-500 italic leading-snug">
        {o.reason}
        {!redacted && (
          <>
            {' · not in the current study design · '}
            <Link to={why} className="not-italic font-semibold text-sky-700 dark:text-sky-400 hover:underline whitespace-nowrap">
              Why?
            </Link>
          </>
        )}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ By Topic */

function TopicView({
  subject,
  selected,
  activePart,
  prefs,
  sort,
  nav,
}: {
  subject: SubjectId
  selected: QuestionMeta | null
  activePart: string | null
  prefs: SidebarPrefs
  sort: ListSort
  nav: SidebarNav
}) {
  // null = follow the open question's topic; '' = the visitor closed every topic.
  const [openTopic, setOpenTopic] = useState<string | null>(null)
  const { anchor } = useContext(AnchorCtx)
  const auto = anchor && anchor.subject === subject ? topicOf(anchor) : ''
  const open = openTopic ?? auto
  return (
    <div className="flex flex-col gap-1">
      {topicGroups(subject).map(([topic, qs]) => {
        const isOpen = topic === open
        return (
          <div key={topic} className="flex flex-col gap-0.5">
            <button
              type="button"
              onClick={() => setOpenTopic(isOpen ? '' : topic)}
              aria-expanded={isOpen}
              className={`w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold text-left transition-colors ${
                isOpen
                  ? 'bg-slate-200 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                  : 'bg-gray-50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Chevron open={isOpen} />
              {topic}
              <span className="ml-auto font-display text-[10.5px] font-bold text-gray-400 dark:text-gray-500">{qs.length}</span>
            </button>
            {isOpen &&
              topicQuestions(subject, topic, sort).map(q => (
                <QuestionRow
                  key={q.id}
                  q={q}
                  inTopic
                  selected={selected}
                  activePart={activePart}
                  prefs={prefs}
                  nav={nav}
                />
              ))}
          </div>
        )
      })}
      {open && <Legend prefs={prefs} />}
    </div>
  )
}

/* ------------------------------------------------------------------ Rows */

// In By Topic a row takes two lines: year, exam and question in aligned columns, then the
// topic underneath.
function QuestionRow({
  q,
  inTopic = false,
  selected,
  activePart,
  prefs,
  nav,
}: {
  q: QuestionMeta
  inTopic?: boolean
  selected: QuestionMeta | null
  activePart: string | null
  prefs: SidebarPrefs
  nav: SidebarNav
}) {
  const isSelected = q.id === selected?.id
  const isRecent = q.id === useContext(AnchorCtx).recentId
  const compact = prefs.density === 'compact'
  const parts = partsOf(q)
  return (
    <>
      <NavItem
        href={nav.questionHref?.(q)}
        onClick={() => nav.onQuestion?.(q)}
        current={isSelected}
        currentValue="page"
        dataQid={q.id}
        className={`flex items-center gap-2 text-left px-2 ${compact ? 'py-1' : 'py-1.5'} ml-2.5 w-[calc(100%-0.625rem)] rounded-xl transition-colors ${
          isSelected
            ? 'bg-sky-50 dark:bg-sky-950/40'
            : isRecent
              ? 'ring-1 ring-inset ring-sky-200 dark:ring-sky-800 hover:bg-gray-50 dark:hover:bg-gray-800/60'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
        }`}
      >
        {inTopic ? (
          <span className="flex-1 min-w-0 flex flex-col">
            <span className={`flex items-baseline gap-2 font-display ${compact ? 'text-[11px]' : 'text-[11.5px]'} font-bold whitespace-nowrap`}>
              <span className="flex-none w-[34px] tabular-nums text-gray-500 dark:text-gray-400">{q.year}</span>
              {q.exam !== 'Exam' && <span className="flex-none w-[46px] text-gray-400 dark:text-gray-500">{q.exam}</span>}
              <span className="text-sky-700 dark:text-sky-300">{mainCode(q.code)}</span>
            </span>
            <span className={`truncate ${compact ? 'text-[11.5px]' : 'text-[12px]'} text-gray-500 dark:text-gray-400 leading-snug`}>
              {topicOf(q)}
            </span>
          </span>
        ) : (
          <>
            <span
              className={`flex-none w-[52px] font-display ${compact ? 'text-[11px]' : 'text-[11.5px]'} font-bold text-sky-700 dark:text-sky-300 whitespace-nowrap`}
            >
              {mainCode(q.code)}
            </span>
            <span className={`flex-1 min-w-0 truncate ${compact ? 'text-[12px]' : 'text-[12.5px]'} text-gray-700 dark:text-gray-300`}>
              {topicOf(q)}
            </span>
          </>
        )}
        {q.flagged && (
          <span className="flex-none text-[11px]" title="VCAA-flagged: no single correct answer">
            ⚠️
          </span>
        )}
        {q.hasVideo && (
          <span
            className="flex-none flex items-center gap-0.5 font-display text-[10.5px] font-bold text-violet-600 dark:text-violet-400"
            title="Has a video walkthrough"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
            </svg>
            Video
          </span>
        )}
        <Difficulty q={q} mode={prefs.diff} />
      </NavItem>

      {isSelected && prefs.parts === 'show' && parts.length > 1 && (
        <div
          className={`${inTopic ? 'ml-[28px]' : 'ml-[72px]'} mr-1 mt-0.5 mb-1.5 flex flex-col border-l-2 border-sky-100 dark:border-sky-900/60`}
        >
          {parts.map(p => {
            const on = activePart === p.l
            const pct = p.a !== undefined ? Math.round((p.a / p.m) * 100) : null
            const hard = pct !== null && difficultyBand(pct) === 'hard'
            return (
              <button
                key={p.l}
                type="button"
                onClick={() => nav.onPart?.(p.l)}
                aria-current={on ? 'true' : undefined}
                className={`flex items-center gap-2 pl-2.5 pr-1 py-[3px] -ml-[2px] border-l-2 text-left text-[11.5px] transition-colors ${
                  on
                    ? 'border-sky-600 text-sky-700 dark:text-sky-300'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <span className={`w-6 flex-none ${on ? 'font-semibold' : ''}`}>{p.l}</span>
                <span className="flex-1 min-w-0 truncate" title={p.t}>
                  {p.t ?? `${p.m} mark${p.m === 1 ? '' : 's'}`}
                </span>
                {pct !== null && (
                  <span
                    className={`flex-none w-8 text-right font-display text-[10.5px] tabular-nums ${hard ? BAND_NUMBER.hard : 'font-bold text-gray-400 dark:text-gray-500'}`}
                    title={`VCAA average ${p.a} out of ${p.m}`}
                  >
                    {pct}%
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

function Difficulty({ q, mode }: { q: QuestionMeta; mode: SidebarPrefs['diff'] }) {
  const d = difficulty(q)
  const width = mode === 'bar' ? 'w-[62px]' : mode === 'pct' ? 'w-8' : 'w-[26px]'
  if (d === null) return <span className={`flex-none ${width}`} />
  const band = difficultyBand(d)
  const title = q.type === 'mc' ? `${d}% of students answered correctly` : `Students averaged ${d}% of the marks`
  const number = (
    <span className={`text-[10.5px] font-display tabular-nums ${BAND_NUMBER[band]}`}>
      {d}%
    </span>
  )
  if (mode === 'bar') {
    return (
      <span className={`flex-none ${width} flex items-center gap-1.5`} title={title}>
        <span className="flex-1 h-1 rounded-full bg-gray-100 dark:bg-gray-800">
          <span className={`block h-1 rounded-full ${BAND_FILL[band]}`} style={{ width: `${d}%` }} />
        </span>
        <span className="w-7 text-right">{number}</span>
      </span>
    )
  }
  if (mode === 'pct') {
    return (
      <span className={`flex-none ${width} text-right`} title={title}>
        {number}
      </span>
    )
  }
  const level = band === 'hard' ? 3 : band === 'medium' ? 2 : 1
  return (
    <span className={`flex-none ${width} flex items-center justify-end gap-[3px]`} title={title}>
      <span className="sr-only">{title}</span>
      {[1, 2, 3].map(i => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i <= level ? BAND_FILL[band] : 'bg-gray-200 dark:bg-gray-700'
          }`}
        />
      ))}
    </span>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`w-3 h-3 flex-none text-gray-400 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden>
      <path d="M7.5 5l5 5-5 5z" />
    </svg>
  )
}

// A link when there's somewhere to go (the real sidebar), a button otherwise (the settings
// preview, and the stepper's arrows when used without hrefs).
function NavItem({
  href,
  onClick,
  current,
  currentValue = 'true',
  dataQid,
  label,
  className,
  children,
}: {
  href?: string
  onClick?: () => void
  current?: boolean
  currentValue?: 'true' | 'page'
  dataQid?: string
  label?: string
  className: string
  children: ReactNode
}) {
  const common = {
    className,
    'aria-current': current ? currentValue : undefined,
    'aria-label': label,
    'data-qid': dataQid,
  }
  return href ? (
    <Link to={href} onClick={onClick} {...common}>
      {children}
    </Link>
  ) : (
    <button type="button" onClick={onClick} {...common}>
      {children}
    </button>
  )
}
