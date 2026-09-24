// Sidebar Settings (#/worked-solutions/settings): every visitor can lay the question list out
// the way they like, with a live preview of the real sidebar beside the switches. Changes
// apply straight away and are remembered on the device (sidebarPrefs.tsx).

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { QUESTIONS, SUBJECTS, type SubjectId } from './data'
import { DEFAULT_PREFS, useSidebarPrefs, type SidebarPrefs } from './sidebarPrefs'
import { QuestionSidebar } from './QuestionSidebar'
import { useStudyMode } from './studyMode'
import { TOOL_PATH, questionPath } from './routes'

// Each option: [value, button text, what it does].
type Option = [value: string, text: string, description: string]

interface Control {
  key: keyof SidebarPrefs
  label: string
  options: Option[]
}

const GROUPS: { title: string; controls: Control[] }[] = [
  {
    title: 'Layout',
    controls: [
      {
        key: 'yearNav',
        label: 'Choosing a year',
        options: [
          ['rail', 'Rail', 'Years down the left. Every year is one click away, but the list is a little narrower.'],
          ['stepper', 'Stepper', '‹ 2023 › above the list, with a dropdown. The list gets the full width.'],
          ['chips', 'Chips', 'A scrolling row of years above the list. Full width, but only a few years show at once.'],
        ],
      },
      {
        key: 'examLayout',
        label: 'Exams within a year',
        options: [
          ['stacked', 'Stacked', 'Exam 1 then Exam 2 in one list. Longest, but nothing is hidden.'],
          ['tabs', 'Tabs', 'Exam 1 | Exam 2 tabs, one exam at a time. Much shorter lists.'],
          ['collapsible', 'Fold away', 'Each exam folds away with its question count; the open question’s exam starts open.'],
        ],
      },
      {
        key: 'typeFold',
        label: 'Multiple Choice and Short Answer',
        options: [
          ['fold', 'Fold away', 'Each group folds away. With a question open, its group starts open and the other folded.'],
          ['open', 'Always open', 'Both groups always showing.'],
        ],
      },
      {
        key: 'skipped',
        label: 'Questions left out',
        options: [
          ['row', 'Greyed row', 'A greyed row where the question would be, with the reason (e.g. Mechanics).'],
          ['note', 'Note', 'One line under the exam listing what was left out and why.'],
          ['off', 'Hidden', 'Nothing — the numbering just skips.'],
        ],
      },
      {
        key: 'links',
        label: 'Paper and report',
        options: [
          ['buttons', 'Buttons', 'Two small buttons beside each exam, both opening a PDF.'],
          ['links', 'Text links', 'Two quieter text links.'],
        ],
      },
    ],
  },
  {
    title: 'Rows',
    controls: [
      {
        key: 'diff',
        label: 'How hard each question was',
        options: [
          ['bar', 'Bar + %', 'A small bar and the percentage; amber below 40%.'],
          ['pct', '% only', 'Just the percentage; amber below 40%.'],
          ['pips', 'Pips', 'One to three pips, with the number when you hover.'],
        ],
      },
      {
        key: 'density',
        label: 'Row spacing',
        options: [
          ['comfortable', 'Comfortable', 'Roomier rows, easier to tap.'],
          ['compact', 'Compact', 'Tighter rows, so a whole exam fits without scrolling.'],
        ],
      },
      {
        key: 'parts',
        label: 'Parts under the open question',
        options: [
          ['show', 'Show', 'The open question’s parts, with marks and VCAA’s average. Click one to jump to it.'],
          ['off', 'Off', 'No parts in the list; the bar at the top of the solution still has them.'],
        ],
      },
    ],
  },
  {
    title: 'Moving between questions',
    controls: [
      {
        key: 'pager',
        label: 'Previous and next, on a laptop',
        options: [
          ['off', 'Off', 'Nothing extra; the list beside the question is the way to move on.'],
          ['end', 'End', 'Previous / next cards at the end of every question.'],
          ['float', 'Floating', 'A small ↑ ‹ Q7 › control in the bottom-right corner while you scroll.'],
        ],
      },
      {
        key: 'backBar',
        label: 'Back bar, on a phone',
        options: [
          ['on', 'On', 'A ‹ back to the list bar above the solution, with where you are in it.'],
          ['off', 'Off', 'Only the bottom bar; Questions opens the list.'],
        ],
      },
      {
        key: 'sheet',
        label: 'Questions list, on a phone',
        options: [
          ['sheet', 'Sheet', 'Slides up over the solution; tap outside to close.'],
          ['full', 'Full screen', 'Takes the whole screen, giving the list more room.'],
        ],
      },
    ],
  },
]

export default function SidebarSettings() {
  const { prefs, setPref, resetPrefs, view, sort, setView, setSort } = useSidebarPrefs()
  const { hideAnswers, setHideAnswers } = useStudyMode()

  // The preview is fully clickable but has its own selection, so trying things out here
  // doesn't move the visitor's place in the real list.
  const start = lastQuestion() ?? QUESTIONS.find(q => q.id === 'spec-q2-2023-e2')!
  const [subject, setSubject] = useState<SubjectId>(start.subject)
  const [year, setYear] = useState<number | null>(start.year)
  const [selectedId, setSelectedId] = useState<string | null>(start.id)
  const [activePart, setActivePart] = useState<string | null>(null)
  const selected = QUESTIONS.find(q => q.id === selectedId) ?? null
  const back = lastQuestion()
  const isDefault = (Object.keys(DEFAULT_PREFS) as (keyof SidebarPrefs)[]).every(k => prefs[k] === DEFAULT_PREFS[k])

  return (
    <div className="px-4 sm:px-6 pt-6 sm:pt-10 pb-24 sm:pb-12">
      <Link
        to={back ? questionPath(back) : TOOL_PATH}
        className="inline-flex items-center gap-1 text-[13px] font-semibold text-sky-700 dark:text-sky-400 hover:underline"
      >
        ‹ Back to questions
      </Link>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mt-3">Sidebar Settings</h1>
      <p className="text-[14.5px] text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
        Choose how the question list looks. Changes apply straight away and are saved on this device.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,560px)_380px] items-start">
        <div className="flex flex-col gap-8">
          {GROUPS.map(group => (
            <section key={group.title} className="flex flex-col gap-5">
              <h2 className="font-display text-[13px] font-bold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-2">
                {group.title}
              </h2>
              {group.controls.map(c => (
                <Choice
                  key={c.key}
                  id={c.key}
                  label={c.label}
                  options={c.options}
                  value={prefs[c.key]}
                  onChange={v => setPref(c.key, v as SidebarPrefs[typeof c.key])}
                />
              ))}
            </section>
          ))}

          <section className="flex flex-col gap-5">
            <h2 className="font-display text-[13px] font-bold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-2">
              Practice
            </h2>
            <Choice
              id="answers"
              label="Answers"
              options={[
                ['show', 'Show answers', 'Answers and working show straight away.'],
                ['hide', 'Hide answers', 'Try each question first: choose an MCQ option to check it, and reveal short-answer working a step at a time.'],
              ]}
              value={hideAnswers ? 'hide' : 'show'}
              onChange={v => setHideAnswers(v === 'hide')}
            />
          </section>

          <button
            type="button"
            onClick={resetPrefs}
            disabled={isDefault}
            className="self-start text-[13px] font-semibold px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-default"
          >
            {isDefault ? 'Using the default layout' : 'Reset to the default layout'}
          </button>
        </div>

        <aside className="lg:sticky lg:top-4 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-[13px] font-bold text-gray-500 dark:text-gray-400">Preview</h2>
            <div className="grid grid-flow-col auto-cols-fr gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5" role="group" aria-label="Preview subject">
              {SUBJECTS.map(s => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={subject === s.id}
                  onClick={() => {
                    setSubject(s.id)
                    setSelectedId(null)
                    setActivePart(null)
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium ${
                    subject === s.id ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 lg:max-h-[calc(100vh-5rem)] overflow-y-auto [scrollbar-gutter:stable] scrollbar-quiet">
            <QuestionSidebar
              subject={subject}
              year={year}
              selected={selected}
              activePart={activePart}
              prefs={prefs}
              view={view}
              sort={sort}
              onView={setView}
              onSort={setSort}
              nav={{
                onYear: y => setYear(y),
                onQuestion: q => {
                  setSelectedId(q.id)
                  setYear(q.year)
                  setActivePart(null)
                },
                onPart: p => setActivePart(p),
              }}
            />
          </div>
          <p className="text-[12px] text-gray-400 dark:text-gray-500">
            The preview works like the real list. The phone settings apply below laptop width.
          </p>
        </aside>
      </div>
    </div>
  )
}

function Choice({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string
  label: string
  options: Option[]
  value: string
  onChange: (v: string) => void
}) {
  const current = options.find(o => o[0] === value)
  return (
    <div className="flex flex-col gap-2">
      <span id={`pref-${id}`} className="font-display text-[14px] font-semibold text-gray-900 dark:text-white">
        {label}
      </span>
      <div
        role="group"
        aria-labelledby={`pref-${id}`}
        className="grid grid-flow-col auto-cols-fr gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1"
      >
        {options.map(([v, text]) => (
          <button
            key={v}
            type="button"
            aria-pressed={v === value}
            onClick={() => onChange(v)}
            className={`px-2 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              v === value
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {text}
          </button>
        ))}
      </div>
      {current && <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">{current[2]}</p>}
    </div>
  )
}

function lastQuestion() {
  try {
    const id = localStorage.getItem('ws-last-question')
    return id ? QUESTIONS.find(q => q.id === id) : undefined
  } catch {
    return undefined
  }
}
