import { useState, useEffect, useRef, useCallback } from 'react'
import { angles, shiftedAngleTex, shiftedAngleDegTex, RANGE_LABEL, type AngleUnit } from './data'
import Katex from '../../components/Katex'

type Domain = 'pos' | 'neg' | 'both'
type Unit = AngleUnit
type FlashState = 'correct' | 'wrong' | null

const CX = 280, CY = 280, R = 210, VB = 560
const DOT_R       = 10   // visible dot radius
const HIT_R       = 22   // invisible hit-target radius

const COLOR_DEFAULT = 'currentColor'
const COLOR_CORRECT = '#34d399'  // emerald
const COLOR_WRONG   = '#f87171'  // rose
const OPACITY_DIM   = 0.15

// ── Question generation ─────────────────────────────────────────────────────

interface LocateQuestion {
  angleIdx: number   // index into angles[]
  angleTex: string   // LaTeX string to display
}

function genQuestion(domain: Domain, unit: Unit): LocateQuestion {
  const idx = Math.floor(Math.random() * angles.length)
  const a   = angles[idx]

  const shift = unit === 'rad'
    ? (k: number) => shiftedAngleTex(a.piN, a.piD, k)
    : (k: number) => shiftedAngleDegTex(a.deg, k)

  let angleTex: string
  if (a.piN === 0) {
    angleTex = '0'
  } else if (domain === 'pos') {
    angleTex = shift(0)
  } else if (domain === 'neg') {
    angleTex = shift(-1)
  } else {
    // both: randomly pick positive or negative display
    angleTex = Math.random() < 0.5 ? shift(0) : shift(-1)
  }

  return { angleIdx: idx, angleTex }
}

function formatTime(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`
}

// ── Component ───────────────────────────────────────────────────────────────

export default function LocateMode() {
  const [domain,       setDomain]       = useState<Domain>('pos')
  const [unit,         setUnit]         = useState<Unit>('rad')
  const [question,     setQuestion]     = useState<LocateQuestion>(() => genQuestion('pos', 'rad'))
  const [correct,      setCorrect]      = useState(0)
  const [wrong,        setWrong]        = useState(0)
  const [elapsed,      setElapsed]      = useState(0)
  const [timerRunning, setTimerRunning] = useState(true)
  const [flash,        setFlash]        = useState<FlashState>(null)
  const [clickedIdx,   setClickedIdx]   = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!timerRunning) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [timerRunning])

  const next = useCallback((dom: Domain = domain, u: Unit = unit) => {
    setFlash(null)
    setClickedIdx(null)
    setTimerRunning(true)
    setQuestion(genQuestion(dom, u))
  }, [domain, unit])

  const handleDotClick = useCallback((idx: number) => {
    if (flash) return
    setClickedIdx(idx)
    if (idx === question.angleIdx) {
      setCorrect(c => c + 1)
      setFlash('correct')
      setTimeout(() => next(), 600)
    } else {
      setWrong(w => w + 1)
      setFlash('wrong')
      setTimerRunning(false)
    }
  }, [flash, question.angleIdx, next])

  const handleDomainChange = useCallback((d: Domain) => {
    setDomain(d)
    setFlash(null)
    setClickedIdx(null)
    setTimerRunning(true)
    setQuestion(genQuestion(d, unit))
  }, [unit])

  const handleUnitChange = useCallback((u: Unit) => {
    setUnit(u)
    setFlash(null)
    setClickedIdx(null)
    setTimerRunning(true)
    setQuestion(genQuestion(domain, u))
  }, [domain])

  const reset = useCallback(() => {
    setCorrect(0)
    setWrong(0)
    setElapsed(0)
    setFlash(null)
    setClickedIdx(null)
    setTimerRunning(true)
    setQuestion(genQuestion(domain, unit))
  }, [domain, unit])

  const accuracy = correct + wrong === 0 ? '—' : `${Math.round(correct / (correct + wrong) * 100)}%`

  return (
    <div className="flex flex-col gap-5">
      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-3.5">
        <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-mono text-sm tabular-nums">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {formatTime(elapsed)}
        </span>
        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-4 text-sm font-semibold tabular-nums">
          <span className="text-emerald-600 dark:text-emerald-400">✓ {correct}</span>
          <span className="text-rose-600 dark:text-rose-400">✗ {wrong}</span>
          <span className="text-gray-500 dark:text-gray-400">{accuracy}</span>
        </div>
        <button
          onClick={reset}
          className="ml-auto text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Unit + domain selector */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4 flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">
            Angle Unit
          </p>
          <div className="flex gap-1">
            {(['rad', 'deg'] as Unit[]).map(u => (
              <button
                key={u}
                onClick={() => handleUnitChange(u)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  unit === u
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {u === 'rad' ? 'Radians' : 'Degrees'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">
            Angle Range
          </p>
          <div className="flex gap-1">
            {(['pos', 'neg', 'both'] as Domain[]).map(d => (
              <button
                key={d}
                onClick={() => handleDomainChange(d)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  domain === d
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {RANGE_LABEL[unit][d]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Question card */}
      <div className={`relative flex flex-col items-center justify-center min-h-[110px] rounded-xl border-2 transition-colors duration-200 px-6 py-6 ${
        flash === 'correct' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
        : flash === 'wrong'  ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40'
        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
      }`}>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Click on the angle</p>
        <div className="text-2xl">
          <Katex tex={question.angleTex} />
        </div>
        {/* Feedback area — both messages always occupy the same space (stacked via grid)
            so the card's height stays constant whether or not feedback is showing. */}
        <div className="mt-3 grid text-center">
          <p className={`col-start-1 row-start-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 ${flash === 'correct' ? '' : 'invisible'}`}>
            Correct!
          </p>
          <p className={`col-start-1 row-start-1 text-sm text-rose-600 dark:text-rose-400 ${flash === 'wrong' ? '' : 'invisible'}`}>
            Incorrect — the correct point is shown in green.
          </p>
        </div>

        {/* Next button — bottom-right, only on wrong */}
        {flash === 'wrong' && (
          <button
            onClick={() => next()}
            className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Next →
          </button>
        )}
      </div>

      {/* Unit circle — clickable dots, no labels */}
      <div className="w-full">
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          className="w-full h-auto"
          style={{ cursor: flash ? 'default' : 'crosshair' }}
        >
          {/* Axes */}
          <line x1={30} y1={CY} x2={VB - 30} y2={CY}
            stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
          <line x1={CX} y1={30} x2={CX} y2={VB - 30}
            stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

          {/* Circle */}
          <circle cx={CX} cy={CY} r={R}
            fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />

          {/* Dots + hit targets */}
          {angles.map((a, i) => {
            const cx = CX + R * a.cosN
            const cy = CY - R * a.sinN

            let fill    = COLOR_DEFAULT
            let opacity = 0.65

            if (flash) {
              if (i === question.angleIdx) {
                fill    = COLOR_CORRECT
                opacity = 1
              } else if (i === clickedIdx) {
                fill    = COLOR_WRONG
                opacity = 1
              } else {
                opacity = OPACITY_DIM
              }
            }

            return (
              <g key={i}>
                {/* Visible dot */}
                <circle
                  cx={cx} cy={cy} r={DOT_R}
                  fill={fill}
                  fillOpacity={opacity}
                  style={{ transition: 'fill 0.2s, fill-opacity 0.2s' }}
                />
                {/* Invisible enlarged hit target */}
                <circle
                  cx={cx} cy={cy} r={HIT_R}
                  fill="transparent"
                  onClick={() => handleDotClick(i)}
                  style={{ cursor: flash ? 'default' : 'pointer' }}
                />
              </g>
            )
          })}

          {/* Axis labels */}
          <text x={VB - 24} y={CY - 6} fontSize="12" textAnchor="middle"
            fill="currentColor" fillOpacity="0.3" fontFamily="Inter, sans-serif">x</text>
          <text x={CX + 8}  y={24}      fontSize="12" textAnchor="start"
            fill="currentColor" fillOpacity="0.3" fontFamily="Inter, sans-serif">y</text>
        </svg>
      </div>

      <p className="text-xs text-center text-gray-400 dark:text-gray-600 pb-2">
        Click the correct point on the unit circle
      </p>
    </div>
  )
}
