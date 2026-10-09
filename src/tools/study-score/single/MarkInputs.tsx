// The mark inputs in the page's top card (Check My Marks): a number box and a slider per exam.
// A box keeps whatever is typed, but only a valid mark reaches the results. While a box holds
// something else (45 in a box out of 40, or nothing at all), it says what's wrong and the
// results dim, so the box and the results never disagree without saying so. Leaving the box
// puts the last valid mark back.

import { useCallback, useEffect, useId, useState, type Ref } from 'react'
import { SUBJECTS, type Subject } from '../data.ts'

/** What's wrong with a typed mark: null when it's fine, '' when the box is empty (nothing to
 *  say while someone is retyping), else a sentence. */
function problemOf(text: string, label: string, max: number): string | null {
  if (text.trim() === '') return ''
  const v = Number(text)
  if (!Number.isFinite(v) || v < 0 || !Number.isInteger(v)) return `${label} needs a whole number from 0 to ${max}.`
  if (v > max) return `${label} is out of ${max}.`
  return null
}

// ── The inputs ─────────────────────────────────────────────────────────────────────────────

/**
 * One input per exam. `boxRef` is the wrapper the sticky mark bar watches (and searches for a
 * box to focus: each number box carries `data-mark={exam index}`). `onBusy` is told whenever
 * any box holds something that isn't a valid mark.
 */
export default function MarkInputs({
  subject,
  marks,
  onMark,
  onBusy,
  boxRef,
}: {
  subject: Subject
  marks: number[]
  onMark: (i: number, v: number) => void
  onBusy: (busy: boolean) => void
  boxRef: Ref<HTMLDivElement>
}) {
  const exams = SUBJECTS[subject].exams
  const [bad, setBad] = useState<boolean[]>(() => exams.map(() => false))
  const setValid = useCallback((i: number, ok: boolean) => setBad(b => (b[i] === !ok ? b : b.map((x, k) => (k === i ? !ok : x)))), [])

  useEffect(() => onBusy(bad.some(Boolean)), [bad, onBusy])
  // Gone (a mode or subject switch): nothing is half-typed any more.
  useEffect(() => () => onBusy(false), [onBusy])

  return (
    <div ref={boxRef} className={`grid gap-5 sm:gap-8 ${exams.length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-md'}`}>
      {exams.map((e, i) => (
        <MarkInput key={e.label} index={i} label={e.label} max={e.rawMax} value={marks[i]} onChange={v => onMark(i, v)} onValid={setValid} />
      ))}
    </div>
  )
}

function MarkInput({
  index,
  label,
  max,
  value,
  onChange,
  onValid,
}: {
  index: number
  label: string
  max: number
  value: number
  onChange: (v: number) => void
  onValid: (i: number, ok: boolean) => void
}) {
  const id = useId()
  const errId = `${id}-problem`
  const [text, setText] = useState(String(value))
  /** Said (to screen readers only) when leaving the box puts the last valid mark back. */
  const [note, setNote] = useState('')
  useEffect(() => {
    setText(String(value))
    setNote('')
  }, [value])

  const problem = problemOf(text, label, max)
  const ok = problem === null
  useEffect(() => onValid(index, ok), [index, ok, onValid])

  const commit = (s: string) => {
    setText(s)
    setNote('')
    if (problemOf(s, label, max) === null) onChange(Number(s))
  }
  const leave = () => {
    if (!ok) setNote(`${label} set back to ${value}.`)
    setText(String(value))
  }
  const pct = Math.round((value / max) * 100)

  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </label>
        <span className={`text-[12.5px] text-gray-500 dark:text-gray-400 tabular-nums transition-opacity motion-reduce:transition-none ${ok ? '' : 'opacity-50'}`}>{pct}%</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-baseline gap-1.5 flex-none">
          <input
            id={id}
            data-mark={index}
            type="number"
            inputMode="numeric"
            min={0}
            max={max}
            step={1}
            value={text}
            aria-invalid={!ok || undefined}
            aria-describedby={problem ? errId : undefined}
            onChange={e => commit(e.target.value)}
            onBlur={leave}
            className="w-[4.5rem] rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-2.5 py-1.5 font-display text-xl font-bold text-gray-900 dark:text-white tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-[15px] text-gray-500 dark:text-gray-400">/ {max}</span>
        </div>
        <input
          type="range"
          aria-label={`${label} mark`}
          aria-valuetext={`${value} out of ${max}, ${pct}%`}
          min={0}
          max={max}
          step={1}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="flex-1 min-w-0 accent-sky-600 dark:accent-sky-400 h-8 [@media(pointer:coarse)]:h-10 cursor-pointer"
        />
      </div>
      {/* Always mounted as a live region, so a screen reader hears the problem (and the quiet
          put-back on leaving the box) as it happens. Hidden visually when there's nothing wrong. */}
      <p id={errId} aria-live="polite" className={problem ? '-mt-1 text-[12px] text-rose-600 dark:text-rose-400' : 'sr-only'}>
        {problem || note}
      </p>
    </div>
  )
}
