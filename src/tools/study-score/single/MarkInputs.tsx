// The mark inputs in the page's top card (Check My Marks): a number box and a slider per exam.
// A box keeps whatever is typed, but only a valid mark reaches the results. While a box holds
// something that isn't a mark (45 in a box out of 40) it says what's wrong; an empty box says
// nothing while someone retypes. Either way the results dim until the box holds a valid mark, so
// the box and the results never disagree unnoticed. Leaving the box puts the last valid mark
// back. Marks are read by parseMark, as in Track My Papers, so the same mistake reads the same
// way on both tabs.

import { useCallback, useEffect, useId, useState, type KeyboardEvent, type Ref } from 'react'
import { SUBJECTS, type Subject } from '../data.ts'
import { parseMark } from '../format.ts'
import { FOCUS } from '../shared.tsx'

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
    // Side by side once the top card (an @container) is wide enough for two full-length sliders.
    <div ref={boxRef} className={`grid gap-5 @xl:gap-8 ${exams.length > 1 ? '@xl:grid-cols-2' : 'sm:max-w-md'}`}>
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

  // An empty box is neither a mark nor a mistake: nothing to say while someone is retyping.
  const { mark, error } = parseMark(text, label, max)
  const ok = mark !== null
  useEffect(() => onValid(index, ok), [index, ok, onValid])

  const commit = (s: string) => {
    setText(s)
    setNote('')
    const m = parseMark(s, label, max).mark
    if (m !== null) onChange(m)
  }
  /** Up and Down step the mark, as they did when this was a number box. */
  const step = (e: KeyboardEvent<HTMLInputElement>) => {
    const d = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : 0
    if (!d) return
    e.preventDefault()
    commit(String(Math.min(max, Math.max(0, (mark ?? value) + d))))
  }
  const leave = () => {
    if (!ok) setNote(`${label} set back to ${value}.`)
    setText(String(value))
  }
  const pct = Math.round((value / max) * 100)

  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.8125rem] font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </label>
        <span className={`text-[0.78125rem] text-gray-500 dark:text-gray-400 tabular-nums transition-opacity motion-reduce:transition-none ${ok ? '' : 'opacity-50'}`}>{pct}%</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-baseline gap-1.5 flex-none">
          <input
            id={id}
            data-mark={index}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={text}
            aria-invalid={!ok || undefined}
            aria-describedby={error ? errId : undefined}
            onChange={e => commit(e.target.value)}
            onKeyDown={step}
            onBlur={leave}
            className="w-[4.5rem] rounded-lg border border-gray-500 dark:border-gray-500 bg-white dark:bg-gray-950 px-2.5 py-1.5 font-display text-xl font-bold text-gray-900 dark:text-white tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-[0.9375rem] text-gray-500 dark:text-gray-400">/ {max}</span>
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
          className={`flex-1 min-w-0 accent-sky-600 dark:accent-sky-400 h-8 [@media(pointer:coarse)]:h-10 cursor-pointer rounded ${FOCUS}`}
        />
      </div>
      {/* Always mounted as a live region, so a screen reader hears the problem (and the quiet
          put-back on leaving the box) as it happens. Hidden visually when there's nothing wrong. */}
      <p id={errId} aria-live="polite" className={error ? '-mt-1 text-xs text-rose-600 dark:text-rose-400' : 'sr-only'}>
        {error ?? note}
      </p>
    </div>
  )
}
