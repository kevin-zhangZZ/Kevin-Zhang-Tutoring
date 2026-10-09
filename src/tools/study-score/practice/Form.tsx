// The one form for a practice paper, used to add a paper (under Your Attempts, or on its own on
// a first visit) and to edit one in place in the list: the paper, an optional date, the marks,
// and a line under them that says what's still needed or, once it's all in, what the paper
// projects to before it's saved.
//
// The form is controlled: what's typed lives with the caller as text (FormValues), so a
// half-typed mark survives the add form moving between cards, and editing a row never touches it.

import { useId, useMemo, useRef, type MutableRefObject, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SUBJECTS, currentCourseFrom, isOldCourse, type Subject } from '../data.ts'
import { aheadOf } from '../format.ts'
import { Announce } from '../shared.tsx'
import { today } from './dates.ts'
import { insertAttempt, recentAverage, replaceAttempt, scoreAttempts, yearsFor, type Attempt, type Draft } from './log.ts'

// ── Values ─────────────────────────────────────────────────────────────────────────────────

/** What's in the form, as typed. */
export interface FormValues {
  paper: number
  /** YYYY-MM-DD, or '' for no date. */
  date: string
  /** The date box holds a date that isn't finished (browsers report that as an empty value). */
  dateBad: boolean
  /** One per exam, as typed. */
  marks: string[]
}

export const blankMarks = (subject: Subject) => SUBJECTS[subject].exams.map(() => '')

export const valuesOf = (a: Attempt): FormValues => ({ paper: a.paper, date: a.date ?? '', dateBad: false, marks: a.marks.map(String) })

/** The newest paper not logged yet (the newest paper once all are): the add form's Paper. */
export function defaultPaper(subject: Subject, attempts: Attempt[]): number {
  const years = yearsFor(subject)
  return [...years].reverse().find(y => !attempts.some(a => a.paper === y)) ?? years[years.length - 1]
}

type Check = { tone: 'hint' | 'error'; text: string; focus: 'date' | number } | { tone: 'ok'; draft: Draft }

function markOf(s: string, max: number): number | null | 'bad' {
  if (s.trim() === '') return null
  const v = Number(s)
  return Number.isInteger(v) && v >= 0 && v <= max ? v : 'bad'
}

/** What's wrong or missing, first thing first, or the attempt ready to save. */
export function checkValues(subject: Subject, v: FormValues): Check {
  const exams = SUBJECTS[subject].exams
  const marks = exams.map((e, k) => markOf(v.marks[k] ?? '', e.rawMax))
  const bad = exams.findIndex((_, k) => marks[k] === 'bad')
  if (bad >= 0) {
    const text = exams
      .filter((_, k) => marks[k] === 'bad')
      .map(e => `${e.label} needs a whole number from 0 to ${e.rawMax}.`)
      .join(' ')
    return { tone: 'error', text, focus: bad }
  }
  if (v.dateBad) return { tone: 'error', text: 'That date isn’t finished. Complete it, or clear it.', focus: 'date' }
  if (v.date && v.date > today()) return { tone: 'error', text: 'That date is in the future.', focus: 'date' }
  const missing = exams.findIndex((_, k) => marks[k] === null)
  if (missing >= 0) {
    const none = marks.every(m => m === null)
    const text = none
      ? exams.length > 1
        ? `Enter your ${exams.map(e => e.label).join(' and ')} marks to see the score.`
        : 'Enter your exam mark to see the score.'
      : `Enter your ${exams[missing].label} mark.`
    return { tone: 'hint', text, focus: missing }
  }
  return { tone: 'ok', draft: { date: v.date || null, paper: v.paper, marks: marks as number[] } }
}

/** "This paper projects to 37 · ahead of 85% of the state · Recent Average 39 → 38", with the
 *  draft placed in the log where it would go. The Recent Average part only when it moves. */
function projectionLine(subject: Subject, attempts: Attempt[], draft: Draft, editId: number | undefined) {
  const { list, at } = editId === undefined ? insertAttempt(attempts, draft) : replaceAttempt(attempts, editId, draft)
  const scored = scoreAttempts(subject, list)
  const { proj } = scored[at]
  const now = recentAverage(scoreAttempts(subject, attempts))
  const then = recentAverage(scored)
  const move = now !== null && then !== null && Math.round(now) !== Math.round(then) ? ` · Recent Average ${Math.round(now)} → ${Math.round(then)}` : ''
  const rest = ` · ${aheadOf(proj.pct)} of the state${move}`
  return { score: proj.score, rest, text: `This paper projects to ${proj.score}${rest}` }
}

// ── Form ───────────────────────────────────────────────────────────────────────────────────

const LABEL = 'text-[12px] font-semibold text-gray-500 dark:text-gray-400'
/** One height for every control, a little taller under a finger. */
const HEIGHT = 'h-9 [@media(pointer:coarse)]:h-10'
const CONTROL = `${HEIGHT} rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-[14px] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`
const TEXT_BUTTON = `${HEIGHT} rounded-lg px-2 text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`

export default function AttemptForm({
  subject,
  attempts,
  values,
  onValues,
  onSubmit,
  editId,
  onCancel,
  onRemove,
  formRef,
  firstMarkRef,
  paperRef,
  className = '',
}: {
  subject: Subject
  /** The log as it is, for the preview line. */
  attempts: Attempt[]
  values: FormValues
  onValues: (v: FormValues) => void
  onSubmit: (draft: Draft) => void
  /** Editing this attempt (in place in the list); otherwise it's the add form. */
  editId?: number
  onCancel?: () => void
  onRemove?: () => void
  formRef?: MutableRefObject<HTMLFormElement | null>
  firstMarkRef?: MutableRefObject<HTMLInputElement | null>
  paperRef?: MutableRefObject<HTMLSelectElement | null>
  className?: string
}) {
  const uid = useId()
  const exams = SUBJECTS[subject].exams
  const editing = editId !== undefined
  const markRefs = useRef<(HTMLInputElement | null)[]>([])
  const dateRef = useRef<HTMLInputElement | null>(null)

  const check = checkValues(subject, values)
  const draftKey = check.tone === 'ok' ? `${check.draft.date}-${check.draft.paper}-${check.draft.marks.join('-')}` : ''
  const line = useMemo(
    () => (check.tone === 'ok' ? projectionLine(subject, attempts, check.draft, editId) : null),
    // The draft is in draftKey.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subject, attempts, draftKey, editId],
  )
  const said = line ? line.text : check.tone === 'ok' ? '' : check.text
  // The hint with nothing typed yet isn't worth reading out (it's also the line right after an
  // add), but an error is, even before any marks (a date in the future).
  const announce = check.tone === 'error' || values.marks.some(m => m.trim() !== '') ? said : ''
  /** The line under the form says what's wrong with the date: the date box is described by it. */
  const dateError = check.tone === 'error' && check.focus === 'date'

  const set = (patch: Partial<FormValues>) => onValues({ ...values, ...patch })
  const setMark = (k: number, s: string) => set({ marks: exams.map((_, i) => (i === k ? s : (values.marks[i] ?? ''))) })

  const submit = () => {
    // Chrome doesn't report a half-typed date until the box loses focus, so look again now.
    const dateBad = dateRef.current?.validity.badInput ?? false
    const now = dateBad === values.dateBad ? check : checkValues(subject, { ...values, dateBad })
    if (dateBad !== values.dateBad) set({ dateBad })
    if (now.tone === 'ok') return onSubmit(now.draft)
    const target = now.focus === 'date' ? dateRef.current : markRefs.current[now.focus]
    target?.focus()
  }

  // Paper: grouped by course where the Skip Guide matters (Specialist, Chemistry).
  const years = [...yearsFor(subject)].reverse()
  const from = currentCourseFrom(subject)
  const options = (ys: number[]) =>
    ys.map(y => (
      <option key={y} value={y}>
        {y}
      </option>
    ))

  const hasDate = values.date !== '' || values.dateBad
  const previewId = `${uid}-preview`

  return (
    <form
      ref={el => {
        if (formRef) formRef.current = el
      }}
      noValidate
      onSubmit={e => {
        e.preventDefault()
        submit()
      }}
      onKeyDown={e => {
        if (editing && e.key === 'Escape') {
          e.preventDefault()
          onCancel?.()
        }
      }}
      aria-label={editing ? 'Edit this paper' : 'Add a paper'}
      className={className}
    >
      <div className="flex flex-wrap items-end gap-x-3 gap-y-3">
        <div className="flex flex-col gap-1">
          <label htmlFor={`${uid}-paper`} className={LABEL}>
            Paper
          </label>
          {/* Little right padding: the native arrow brings its own room, and more would clip the year. */}
          <select
            id={`${uid}-paper`}
            ref={el => {
              if (paperRef) paperRef.current = el
            }}
            value={values.paper}
            onChange={e => set({ paper: Number(e.target.value) })}
            className={`${CONTROL} w-[5.75rem] pl-2.5 pr-1.5 font-semibold tabular-nums`}
          >
            {from === null ? (
              options(years)
            ) : (
              <>
                <optgroup label="Current Course">{options(years.filter(y => y >= from))}</optgroup>
                <optgroup label="Previous Course">{options(years.filter(y => y < from))}</optgroup>
              </>
            )}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${uid}-date`} className={LABEL}>
            Date Sat <span className="font-normal">(Optional)</span>
          </label>
          <div className="flex items-center gap-1">
            <input
              id={`${uid}-date`}
              ref={dateRef}
              type="date"
              value={values.date}
              max={today()}
              aria-invalid={dateError || undefined}
              aria-describedby={dateError ? previewId : undefined}
              onChange={e => set({ date: e.target.value, dateBad: e.target.validity.badInput })}
              onBlur={e => {
                if (e.target.validity.badInput !== values.dateBad) set({ dateBad: e.target.validity.badInput })
              }}
              className={`${CONTROL} w-[9rem] px-2 font-medium tabular-nums [&::-webkit-date-and-time-value]:text-left`}
            />
            <button
              type="button"
              onClick={() => {
                if (hasDate && dateRef.current) dateRef.current.value = ''
                set({ date: hasDate ? '' : today(), dateBad: false })
              }}
              aria-label={hasDate ? 'Clear the date' : 'Set the date to today'}
              className={`${TEXT_BUTTON} text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/50`}
            >
              {hasDate ? 'Clear' : 'Today'}
            </button>
          </div>
        </div>

        {exams.map((e, k) => (
          <div key={e.label} className="flex flex-col gap-1">
            <label htmlFor={`${uid}-mark-${k}`} className={LABEL}>
              {e.label}
              <span className="sr-only">, out of {e.rawMax}</span>
            </label>
            <span className="flex items-center gap-1.5">
              <input
                id={`${uid}-mark-${k}`}
                ref={el => {
                  markRefs.current[k] = el
                  if (k === 0 && firstMarkRef) firstMarkRef.current = el
                }}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={values.marks[k] ?? ''}
                aria-invalid={check.tone === 'error' && check.focus === k ? true : undefined}
                aria-describedby={previewId}
                onChange={ev => setMark(k, ev.target.value)}
                className={`${CONTROL} w-[4rem] px-2 font-semibold tabular-nums`}
              />
              <span aria-hidden className="text-[12.5px] text-gray-500 dark:text-gray-400 tabular-nums">
                / {e.rawMax}
              </span>
            </span>
          </div>
        ))}

        <div className={`flex items-center gap-2 ${editing ? 'flex-1' : ''}`}>
          <button
            type="submit"
            aria-disabled={check.tone !== 'ok' || undefined}
            aria-describedby={previewId}
            className={`${HEIGHT} rounded-lg bg-sky-700 dark:bg-sky-500 px-3.5 text-[13px] font-semibold text-white dark:text-gray-950 whitespace-nowrap hover:bg-sky-800 dark:hover:bg-sky-400 aria-disabled:opacity-40 aria-disabled:cursor-not-allowed aria-disabled:hover:bg-sky-700 dark:aria-disabled:hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900`}
          >
            {editing ? 'Save Changes' : 'Add Attempt'}
          </button>
          {editing && (
            <>
              <button type="button" onClick={onCancel} className={`${TEXT_BUTTON} text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`}>
                Cancel
              </button>
              <button type="button" onClick={onRemove} className={`${TEXT_BUTTON} ml-auto text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800`}>
                Remove
              </button>
            </>
          )}
        </div>
      </div>

      <p
        id={previewId}
        className={`mt-2.5 text-[13px] leading-snug ${
          check.tone === 'error' ? 'text-rose-600 dark:text-rose-400' : line ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {line ? (
          <>
            This paper projects to <b className="font-semibold text-gray-900 dark:text-white tabular-nums">{line.score}</b>
            {line.rest}
          </>
        ) : (
          said
        )}
      </p>
      <Announce text={announce} />

      <OldCourseHint subject={subject} paper={values.paper} />

      {!editing && <p className="mt-1.5 text-[12px] text-gray-500 dark:text-gray-400">No date? It’s added as your latest paper.</p>}
    </form>
  )
}

// ── Old-course papers ──────────────────────────────────────────────────────────────────────

/** The papers the Skip Guide has a page for (PICKER_YEARS in exam-skip-guide/auditView.ts; not
 *  imported, since that module brings Exam Explanations' question data with it). */
const SKIP_GUIDE_YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]

const SKIP_LINK = 'font-medium text-sky-700 dark:text-sky-400 hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'

/** A paper from the previous study design reads low if skipped questions were left at zero:
 *  say so, and link to that paper's list of what to skip. */
function OldCourseHint({ subject, paper }: { subject: Subject; paper: number }) {
  if (!isOldCourse(subject, paper)) return null
  const exams = SUBJECTS[subject].exams
  const base = `/exam-skip-guide/${subject}`
  const inGuide = SKIP_GUIDE_YEARS.includes(paper)
  const slug = (label: string) => label.toLowerCase().replace(/\s+/g, '-')

  let links: ReactNode
  if (inGuide && exams.length > 1) {
    links = (
      <>
        What to skip:{' '}
        {exams.map((e, k) => (
          <span key={e.label}>
            {k > 0 && ' · '}
            <Link to={`${base}/${paper}/${slug(e.label)}`} aria-label={`What to skip on ${paper} ${e.label}`} className={SKIP_LINK}>
              {e.label}
              {k === exams.length - 1 && ' →'}
            </Link>
          </span>
        ))}
      </>
    )
  } else {
    links = (
      <Link to={inGuide ? `${base}/${paper}/${slug(exams[0].label)}` : base} aria-label={`What to skip on the ${paper} paper`} className={SKIP_LINK}>
        What to skip →
      </Link>
    )
  }

  return (
    <p className="mt-1.5 text-[12.5px] leading-snug text-gray-600 dark:text-gray-300 max-w-3xl">
      <b className="font-semibold text-gray-700 dark:text-gray-200">Old-course paper.</b> If you skipped questions that are no longer on the course, add the
      marks you think you’d have got on them, or this paper will read a few points low. <span className="whitespace-nowrap">{links}</span>
    </p>
  )
}
