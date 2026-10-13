import { Fragment, useState, type ReactNode } from 'react'
import { angles, type AngleUnit } from './data'
import { formatTime, type SessionMode, type Tally } from './session'
import { useStoredState, type Best } from './storage'
import SegmentedControl from '../../components/ui/SegmentedControl'

// Pieces shared by Values Test and Locate Test.

// ── Stats + settings bar ────────────────────────────────────────────────────
// Two rows: the score, time and restart on top; Practice/Test and the settings below. Once a
// test is running its settings don't change, so they fold into a summary button
// ("Methods | rad | [0, 2π] ▾") that opens the full settings. Changing any of them starts over.

interface SessionBarProps {
  correct: number
  wrong: number
  elapsed: number
  mode: SessionMode
  onMode: (m: SessionMode) => void
  /** Test mode: "Question 7 of 20". */
  progress?: string
  /** The settings in short, one part each ("Methods", "rad", "[0, 2π]"). */
  summary: string[]
  onRestart: () => void
  children: ReactNode
}

export function SessionBar({ correct, wrong, elapsed, mode, onMode, progress, summary, onRestart, children }: SessionBarProps) {
  const [open, setOpen] = useState(false)
  return (
    <div data-session-bar className="card">
      <div className="flex items-center gap-x-4 px-3 sm:px-4 pt-3 pb-2">
        <div className="flex items-center gap-3.5 text-sm font-semibold tabular-nums whitespace-nowrap">
          <span className="text-emerald-700 dark:text-emerald-400"><span aria-hidden>✓ </span>{correct}<span className="sr-only"> right</span></span>
          <span className="text-rose-600 dark:text-rose-400"><span aria-hidden>✗ </span>{wrong}<span className="sr-only"> wrong</span></span>
          <span className="font-mono font-normal text-gray-500 dark:text-gray-400">{formatTime(elapsed)}</span>
        </div>
        {progress && <span className="min-w-0 truncate text-sm text-gray-500 dark:text-gray-400">{progress}</span>}
        <button
          onClick={onRestart}
          aria-label="Start again"
          title="Start again"
          className="relative ml-auto p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors after:absolute after:-inset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 px-3 sm:px-4 pb-3">
        <SegmentedControl
          aria-label="Practice or Test"
          value={mode}
          onChange={onMode}
          options={[
            { value: 'practice', label: 'Practice' },
            { value: 'test', label: 'Test' },
          ]}
        />
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-label={`Settings: ${summary.join(', ')}`}
          className="relative inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap transition-colors after:absolute after:-inset-y-1.5 after:inset-x-0"
        >
          {summary.map((part, i) => (
            <Fragment key={i}>
              {i > 0 && <span aria-hidden className="h-3 w-px bg-gray-300 dark:bg-gray-600" />}
              {part}
            </Fragment>
          ))}
          <span aria-hidden className="text-gray-400">{open ? '▴' : '▾'}</span>
        </button>
      </div>
      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex flex-wrap gap-x-6 gap-y-3 items-end">
          {children}
          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
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
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider mb-1.5">{label}</p>
      <SegmentedControl aria-label={label} value={value} onChange={onChange} options={options.map(o => ({ value: o.id, label: o.label }))} />
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
  // Angle labels can be hidden, to test yourself on where the points are. Remembered on this device.
  const [{ labels }, setPrefs] = useStoredState('uc-weakspot', { labels: true })
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Your Circle So Far</p>
        <div className="flex items-center gap-3">
          {drill !== null && onPick && (
            <button onClick={() => onPick(null)} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Back to every angle
            </button>
          )}
          <button
            onClick={() => setPrefs({ labels: !labels })}
            aria-pressed={labels}
            aria-label={labels ? 'Hide angle labels' : 'Show angle labels'}
            title={labels ? 'Hide angle labels' : 'Show angle labels'}
            className="relative -m-1 p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors after:absolute after:-inset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
              {!labels && <path d="M4 4l16 16" />}
            </svg>
          </button>
        </div>
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
              {labels && (
                <text x={lx} y={ly + 3.5} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity={picked ? 1 : 0.6} fontWeight={picked ? 700 : 400} fontFamily="Inter, sans-serif">
                  {label}
                </text>
              )}
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
  summary: string[]
  best?: Best
  newBest: boolean
  retry: boolean
  misses: MissRow[]
  onRetry: () => void
  onNew: () => void
}

export function RoundResults({ correct, total, elapsed, summary, best, newBest, retry, misses, onRetry, onNew }: RoundResultsProps) {
  const pct = total ? Math.round((correct / total) * 100) : 0
  const stats: Array<[string, ReactNode]> = [
    ['Time', formatTime(elapsed)],
    ['Score', `${pct}%`],
  ]
  if (!retry && best) stats.push(['Best', newBest ? <span className="text-emerald-700 dark:text-emerald-400">New best!</span> : `${best.score} / ${best.total}`])
  return (
    <div className="card px-5 py-6 sm:px-7">
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{retry ? 'Practice Round Complete' : 'Round Complete'}: {summary.join(', ')}</p>
        <p className="font-display text-5xl font-bold text-gray-900 dark:text-white mt-3 leading-none tabular-nums">
          {correct}<span className="text-2xl text-gray-500 dark:text-gray-400 font-semibold"> / {total}</span>
        </p>
        <dl className="mt-4 flex justify-center gap-8 text-sm">
          {stats.map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs text-gray-500 dark:text-gray-400">{k}</dt>
              <dd className="font-semibold text-gray-900 dark:text-gray-100 tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      {misses.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Work on these</p>
          {/* Two columns once there's room, so a long list of misses stays short. */}
          <div className="grid gap-2 sm:grid-cols-2">
            {misses.map((m, i) => (
              <div key={i} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 text-sm">
                <span className="text-gray-900 dark:text-gray-100">{m.prompt}</span>
                <span className="text-gray-500 dark:text-gray-400">{m.detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-2 mt-6 max-w-md mx-auto">
        {misses.length > 0 && (
          <button onClick={onRetry} className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold active:scale-[0.98] transition-[background-color,transform]">
            Practise {misses.length === 1 ? 'this one' : `these ${misses.length}`}
          </button>
        )}
        <button
          onClick={onNew}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold active:scale-[0.98] transition-[background-color,transform] ${
            misses.length ? 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          New round
        </button>
      </div>
    </div>
  )
}

// ── Round track: one segment per question in a test round, coloured as it's answered ──

export function RoundTrack({ history, total }: { history: boolean[]; total: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${history.length} of ${total} answered, ${history.filter(Boolean).length} right`}>
      {Array.from({ length: total }, (_, i) => {
        const h = history[i]
        return (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              h === true ? 'bg-emerald-500' : h === false ? 'bg-rose-500' : i === history.length ? 'bg-blue-400 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-800'
            }`}
          />
        )
      })}
    </div>
  )
}

// ── Streak: appears at 3 right in a row, and pops each time it grows ──

export function StreakBadge({ streak }: { streak: number }) {
  if (streak < 3) return null
  return (
    <span key={streak} className="pop inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:text-amber-300 tabular-nums">
      {streak} in a row
    </span>
  )
}
