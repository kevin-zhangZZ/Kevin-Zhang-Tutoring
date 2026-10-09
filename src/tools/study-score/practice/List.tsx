// Your Attempts' list: every paper logged, latest first. A row opens in place to edit it (one at
// a time), and a removed row leaves an Undo line where it was.
//
// The header and every row share one set of fixed grid tracks, so headings sit over their
// numbers whatever is in a row. Narrow cards put the rank (and a retake's "2nd try") on a second
// line; from @3xl each mark and the rank get their own column. It's a plain list: each row's
// visible cells are hidden from screen readers, which hear one sentence per paper instead.

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { SUBJECTS, type Subject } from '../data.ts'
import { aheadOf, examShares } from '../format.ts'
import { fmtDate, nth, today } from './dates.ts'
import { attemptName, type Attempt, type Draft, type Scored } from './log.ts'
import AttemptForm, { valuesOf, type FormValues } from './Form.tsx'

// ── Undo ───────────────────────────────────────────────────────────────────────────────────

/** "Removed your 2019 paper from 13 Sept. Undo" — focus is moved to Undo by the caller, and the
 *  button is described by the line so it's read out with it. */
export function UndoLine({ text, onUndo, className = '' }: { text: string; onUndo: () => void; className?: string }) {
  const id = useId()
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-gray-50 dark:bg-gray-800/60 px-3 py-2 text-[13px] text-gray-600 dark:text-gray-300 ${className}`}>
      <span id={id}>{text}</span>
      <button
        type="button"
        data-undo
        onClick={onUndo}
        aria-describedby={id}
        className="relative rounded font-semibold text-sky-700 dark:text-sky-400 hover:underline after:absolute after:-inset-x-2 after:-inset-y-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Undo
      </button>
    </div>
  )
}

// ── List ───────────────────────────────────────────────────────────────────────────────────

// Tracks: Date (as wide as the widest date shown, --dw) | Paper | marks | Score | Edit, and from
// @3xl Date | Paper | each mark | Score | Ahead of the State | Edit.
const COLS = {
  two: 'grid-cols-[var(--dw)_minmax(0,1fr)_4.25rem_2rem_2.75rem] @3xl:grid-cols-[var(--dw)_6.5rem_4.5rem_4.5rem_2.5rem_minmax(0,1fr)_2.75rem]',
  one: 'grid-cols-[var(--dw)_minmax(0,1fr)_3.5rem_2rem_2.75rem] @3xl:grid-cols-[var(--dw)_6.5rem_5.5rem_2.5rem_minmax(0,1fr)_2.75rem]',
}
const WIDE = 'hidden @3xl:block'
const NARROW = '@3xl:hidden'

const PILL = 'rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-[11px] font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap'

export default function AttemptList({
  subject,
  scored,
  editing,
  flash,
  removed,
  onEdit,
  onSave,
  onRemove,
  onUndo,
}: {
  subject: Subject
  scored: Scored[]
  /** The row open for editing. */
  editing: number | null
  /** A row just added (or moved by an edit), tinted for a moment. */
  flash: number | null
  /** A paper just removed: its Undo line goes where it was (`at` is its old place in the log). */
  removed: { at: number; text: string } | null
  onEdit: (id: number | null) => void
  onSave: (id: number, draft: Draft) => void
  onRemove: (id: number) => void
  onUndo: () => void
}) {
  const listRef = useRef<HTMLUListElement>(null)
  const exams = SUBJECTS[subject].exams
  const cols = exams.length > 1 ? COLS.two : COLS.one
  // Dates from another year carry it ("12 July 2025"), so the column widens only when one does.
  const year = today().slice(0, 4)
  const dw = scored.some(a => a.date !== null && a.date.slice(0, 4) !== year) ? '5.75rem' : '3.75rem'

  const focusEdit = (id: number) =>
    requestAnimationFrame(() => listRef.current?.querySelector<HTMLElement>(`[data-edit="${id}"]`)?.focus())
  const close = (id: number) => {
    onEdit(null)
    focusEdit(id)
  }

  const undoRow = removed && (
    <li key="undo" className="-mx-2 py-1.5 border-t border-gray-100 dark:border-gray-800">
      <UndoLine text={removed.text} onUndo={onUndo} />
    </li>
  )
  // Latest first, with the Undo line slotted in where the removed paper was.
  const rows: ReactNode[] = []
  for (let i = scored.length - 1; i >= 0; i--) {
    if (removed && removed.at === i + 1) rows.push(undoRow)
    rows.push(
      <Row
        key={`${i}-${scored[i].paper}`}
        subject={subject}
        a={scored[i]}
        all={scored}
        cols={cols}
        open={editing === i}
        flash={flash === i}
        onToggle={() => onEdit(editing === i ? null : i)}
        onSave={d => onSave(i, d)}
        onCancel={() => close(i)}
        onRemove={() => onRemove(i)}
      />,
    )
  }
  if (removed && removed.at === 0) rows.push(undoRow)

  return (
    <div className="@container text-[13px]" style={{ '--dw': dw } as CSSProperties}>
      <div aria-hidden className={`grid ${cols} gap-x-3 pb-1.5 text-[12px] font-semibold text-gray-500 dark:text-gray-400`}>
        <span>Date Sat</span>
        <span>Paper</span>
        <span className={`${NARROW} text-right whitespace-nowrap`}>{exams.map(e => e.short).join(' · ')}</span>
        {exams.map(e => (
          <span key={e.label} className={WIDE}>
            {e.label}
          </span>
        ))}
        <span className="text-right">Score</span>
        <span className={WIDE}>Ahead of the State</span>
        <span />
      </div>
      <ul ref={listRef} aria-label="Your papers, latest first">
        {rows}
      </ul>
    </div>
  )
}

// ── Row ────────────────────────────────────────────────────────────────────────────────────

function Row({
  subject,
  a,
  all,
  cols,
  open,
  flash,
  onToggle,
  onSave,
  onCancel,
  onRemove,
}: {
  subject: Subject
  a: Scored
  all: Attempt[]
  cols: string
  open: boolean
  flash: boolean
  onToggle: () => void
  onSave: (d: Draft) => void
  onCancel: () => void
  onRemove: () => void
}) {
  const editorId = useId()
  const exams = SUBJECTS[subject].exams
  const retake = a.sitting > 1 ? `${nth(a.sitting)} try` : null
  const shares = examShares(subject, a.proj)
  // The per-exam ranks wide rows show, joined with commas (a middle dot can be read as "dot").
  const perExam = exams.length > 1 ? ` ${exams.map((e, k) => `${e.label} ${aheadOf(a.proj.pctExams[k])}`).join(', ')}.` : ''
  const said = `Your ${attemptName(a)}${retake ? ` (${retake})` : ''}: ${exams
    .map((e, k) => `${e.label} ${a.marks[k]} out of ${e.rawMax}`)
    .join(', ')}. Projects to ${a.proj.score}, ${aheadOf(a.proj.pct)} of the state.${perExam}`

  return (
    <li
      data-row={a.id}
      className={`relative -mx-2 px-2 rounded-lg border-t border-gray-100 dark:border-gray-800 transition-colors duration-1000 motion-reduce:transition-none ${
        open ? 'bg-sky-50/70 dark:bg-sky-950/30' : flash ? 'bg-sky-50 dark:bg-sky-950/50' : ''
      }`}
    >
      <span className="sr-only">{said}</span>
      <div className={`grid ${cols} gap-x-3 items-center py-1.5`}>
        <span aria-hidden className={`tabular-nums whitespace-nowrap ${a.date ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
          {a.date ? fmtDate(a.date) : 'No date'}
        </span>
        <span aria-hidden className="min-w-0 flex items-center gap-1.5 font-semibold text-gray-700 dark:text-gray-200 tabular-nums">
          {a.paper}
          {retake && <span className={`${PILL} ${WIDE}`}>{retake}</span>}
        </span>
        <span aria-hidden className={`${NARROW} text-right text-[12.5px] tabular-nums text-gray-600 dark:text-gray-300 whitespace-nowrap`}>
          {a.marks.join(' · ')}
        </span>
        {exams.map((e, k) => (
          <span key={e.label} aria-hidden className={`${WIDE} tabular-nums text-gray-700 dark:text-gray-200 whitespace-nowrap`}>
            {a.marks[k]}
            <span className="text-[12px] text-gray-500 dark:text-gray-400"> / {e.rawMax}</span>
          </span>
        ))}
        <span aria-hidden className="text-right font-display text-base font-bold text-gray-900 dark:text-white tabular-nums">
          {a.proj.score}
        </span>
        <span
          aria-hidden
          className="order-last @3xl:order-none col-start-2 col-span-3 @3xl:col-auto -mt-0.5 @3xl:mt-0 flex flex-wrap items-center gap-x-1.5 text-[12px] @3xl:text-[12.5px] leading-snug text-gray-500 dark:text-gray-400 tabular-nums"
        >
          {retake && <span className={`${PILL} ${NARROW}`}>{retake}</span>}
          <span className="font-medium text-gray-700 dark:text-gray-200">{aheadOf(a.proj.pct)}</span>
          {shares && <span className={WIDE}>· {shares}</span>}
        </span>
        <span className="flex justify-end">
          <button
            type="button"
            data-edit={a.id}
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={open ? editorId : undefined}
            aria-label={`Edit your ${attemptName(a)}`}
            className="relative inline-flex items-center h-7 px-1.5 -mr-1.5 rounded-md text-[12.5px] font-medium text-sky-700 dark:text-sky-400 hover:underline after:absolute after:-inset-x-1.5 after:-inset-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Edit
          </button>
        </span>
      </div>
      {open && <RowEditor id={editorId} subject={subject} a={a} all={all} onSave={onSave} onCancel={onCancel} onRemove={onRemove} />}
    </li>
  )
}

/** The open row's form: starts from the paper as logged, Paper focused, and the page stays put. */
function RowEditor({
  id,
  subject,
  a,
  all,
  onSave,
  onCancel,
  onRemove,
}: {
  id: string
  subject: Subject
  a: Attempt
  all: Attempt[]
  onSave: (d: Draft) => void
  onCancel: () => void
  onRemove: () => void
}) {
  const [values, setValues] = useState<FormValues>(() => valuesOf(a))
  const paperRef = useRef<HTMLSelectElement | null>(null)
  useEffect(() => paperRef.current?.focus({ preventScroll: true }), [])
  return (
    <div id={id} className="pt-1 pb-3">
      <AttemptForm
        subject={subject}
        attempts={all}
        values={values}
        onValues={setValues}
        onSubmit={onSave}
        editId={a.id}
        onCancel={onCancel}
        onRemove={onRemove}
        paperRef={paperRef}
      />
    </div>
  )
}
