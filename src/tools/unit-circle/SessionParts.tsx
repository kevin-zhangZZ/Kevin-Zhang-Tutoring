import { useState, type ReactNode } from 'react'
import { angles, type AngleUnit } from './data'
import { formatTime, type SessionMode, type Tally } from './session'
import type { Best } from './storage'

// Pieces shared by Values Test and Locate Test.

// ── One-line stats + settings bar ───────────────────────────────────────────
// Once a test is running its settings don't change, so they fold into a summary button
// ("Methods · rad · [0, 2π] ▾") that opens the full settings. Changing any of them starts over.

interface SessionBarProps {
  correct: number
  wrong: number
  elapsed: number
  mode: SessionMode
  onMode: (m: SessionMode) => void
  /** Test mode: "Question 7 of 20". */
  progress?: string
  summary: string
  onRestart: () => void
  children: ReactNode
}

export function SessionBar({ correct, wrong, elapsed, mode, onMode, progress, summary, onRestart, children }: SessionBarProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2">
        <div className="flex items-center gap-3 text-sm font-semibold tabular-nums whitespace-nowrap">
          <span className="text-emerald-600 dark:text-emerald-400">✓ {correct}</span>
          <span className="text-rose-600 dark:text-rose-400">✗ {wrong}</span>
          <span className="font-mono font-normal text-gray-500 dark:text-gray-400">{formatTime(elapsed)}</span>
          {progress && <span className="font-normal text-gray-500 dark:text-gray-400">{progress}</span>}
        </div>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2 min-w-0">
          <div className="flex gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5" role="group" aria-label="Practice or Test">
            {(['practice', 'test'] as SessionMode[]).map(m => (
              <button
                key={m}
                onClick={() => onMode(m)}
                aria-pressed={mode === m}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  mode === m ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {m === 'practice' ? 'Practice' : 'Test'}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap transition-colors"
          >
            {summary} <span aria-hidden>{open ? '▴' : '▾'}</span>
          </button>
          <button
            onClick={onRestart}
            aria-label="Start again"
            title="Start again"
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex flex-wrap gap-x-6 gap-y-3 items-end">
          {children}
          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900"
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}

// ── A labelled row of choice buttons, used inside the settings panel ────────

interface ChoiceProps<T extends string> {
  label: string
  value: T
  options: Array<{ id: T; label: ReactNode }>
  onChange: (v: T) => void
}

export function Choice<T extends string>({ label, value, options, onChange }: ChoiceProps<T>) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1">
        {options.map(o => (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            aria-pressed={value === o.id}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              value === o.id
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Practice mode: the circle so far, coloured by how each angle has gone ───

const TALLY_COLOR = { none: '#D1D5DB', good: '#10b981', mixed: '#fbbf24', bad: '#f43f5e' }

function tallyColor(t?: Tally) {
  if (!t || t.right + t.wrong === 0) return TALLY_COLOR.none
  if (t.wrong === 0) return TALLY_COLOR.good
  return t.wrong >= t.right ? TALLY_COLOR.bad : TALLY_COLOR.mixed
}

interface WeakSpotProps {
  perAngle: Record<number, Tally>
  unit: AngleUnit
  /** When set, points can be tapped to practise just that angle. */
  onPick?: (angleIdx: number | null) => void
  drill?: number | null
}

export function WeakSpotCircle({ perAngle, unit, onPick, drill = null }: WeakSpotProps) {
  const S = 220, c = S / 2, R = 66, LR = 92
  const asked = Object.values(perAngle).some(t => t.right + t.wrong > 0)
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Your Circle So Far</p>
        {drill !== null && onPick && (
          <button onClick={() => onPick(null)} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Back to every angle
          </button>
        )}
      </div>
      <svg viewBox={`0 0 ${S} ${S}`} className="w-full max-w-[240px] mx-auto block" role="group" aria-label="How each angle has gone so far">
        <line x1={14} y1={c} x2={S - 14} y2={c} stroke="currentColor" strokeOpacity="0.12" />
        <line x1={c} y1={14} x2={c} y2={S - 14} stroke="currentColor" strokeOpacity="0.12" />
        <circle cx={c} cy={c} r={R} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
        {angles.map((a, i) => {
          const x = c + R * a.cosN, y = c - R * a.sinN
          const lx = c + LR * a.cosN, ly = c - LR * a.sinN
          const label = unit === 'rad' ? a.radLabel : a.degLabel
          const t = perAngle[i]
          const tip = !t || t.right + t.wrong === 0 ? 'not asked yet' : `${t.right} right, ${t.wrong} wrong`
          const picked = drill === i
          return (
            <g key={i}>
              {picked && <circle cx={x} cy={y} r={11} fill="#2563EB" fillOpacity="0.18" />}
              <circle
                cx={x} cy={y} r={7}
                fill={tallyColor(t)}
                stroke={picked ? '#2563EB' : 'none'} strokeWidth={2}
                className={onPick ? 'cursor-pointer outline-none focus-visible:stroke-blue-600' : ''}
                role={onPick ? 'button' : undefined}
                tabIndex={onPick ? 0 : undefined}
                aria-label={onPick ? `Practise ${label} only (${tip})` : undefined}
                onClick={onPick ? () => onPick(picked ? null : i) : undefined}
                onKeyDown={onPick ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(picked ? null : i) } } : undefined}
              >
                <title>{`${label}: ${tip}`}</title>
              </circle>
              <text x={lx} y={ly + 3.5} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity={picked ? 1 : 0.6} fontWeight={picked ? 700 : 400} fontFamily="Inter, sans-serif">
                {label}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-gray-500 dark:text-gray-400">
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: TALLY_COLOR.good }} />right every time</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: TALLY_COLOR.mixed }} />mixed</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: TALLY_COLOR.bad }} />mostly wrong</span>
      </div>
      {onPick && (
        <p className="text-[11px] text-center mt-1.5 text-gray-500 dark:text-gray-400">
          {drill !== null ? `Practising ${unit === 'rad' ? angles[drill].radLabel : angles[drill].degLabel} only` : asked ? 'Tap a point to practise just that angle' : 'Answer a few questions to fill this in'}
        </p>
      )}
    </div>
  )
}

// ── Test mode: the end of a round ───────────────────────────────────────────

export interface MissRow {
  prompt: ReactNode
  /** What went wrong, e.g. "you said √3, it’s −√3". */
  detail: ReactNode
}

interface RoundResultsProps {
  correct: number
  total: number
  elapsed: number
  summary: string
  best?: Best
  newBest: boolean
  retry: boolean
  misses: MissRow[]
  onRetry: () => void
  onNew: () => void
}

export function RoundResults({ correct, total, elapsed, summary, best, newBest, retry, misses, onRetry, onNew }: RoundResultsProps) {
  const pct = total ? Math.round((correct / total) * 100) : 0
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-5">
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">{retry ? 'Practice Round Complete' : 'Round Complete'} · {summary}</p>
        <p className="text-5xl font-bold text-gray-900 dark:text-white mt-2 leading-none">
          {correct}<span className="text-2xl text-gray-400 dark:text-gray-500 font-semibold"> / {total}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {formatTime(elapsed)} · {pct}%
          {!retry && best && (newBest ? <span className="ml-1.5 font-semibold text-emerald-600 dark:text-emerald-400">· New best!</span> : <> · best {best.score} / {best.total}</>)}
        </p>
      </div>
      {misses.length > 0 && (
        <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Work on these</p>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {misses.map((m, i) => (
              <div key={i} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-1.5 text-sm">
                <span className="text-gray-900 dark:text-gray-100">{m.prompt}</span>
                <span className="text-gray-500 dark:text-gray-400">{m.detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-2 mt-4">
        {misses.length > 0 && (
          <button onClick={onRetry} className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
            Practise {misses.length === 1 ? 'this one' : `these ${misses.length}`}
          </button>
        )}
        <button
          onClick={onNew}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            misses.length ? 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          New round
        </button>
      </div>
    </div>
  )
}
