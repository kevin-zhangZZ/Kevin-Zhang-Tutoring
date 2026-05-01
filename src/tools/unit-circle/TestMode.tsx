import { useState, useEffect, useRef, useCallback } from 'react'
import { angles, shiftedAngleTex } from './data'
import Katex from '../../components/Katex'

type TrigFn   = 'sin' | 'cos' | 'tan' | 'cosec' | 'sec' | 'cot'
type AngleRange = 'pos' | 'neg' | 'both'
type FnMode   = 'methods' | 'specialist'

// LaTeX command for each function (cosec → \csc is the standard LaTeX name)
const FN_TEX: Record<TrigFn, string> = {
  sin: '\\sin', cos: '\\cos', tan: '\\tan',
  cosec: '\\csc', sec: '\\sec', cot: '\\cot',
}

// ── Answer grid ─────────────────────────────────────────────────────────────
// Row 1: -1, 0, 1, undefined
// Row 2: -½, -√2/2, -√3/2        (sin/cos negatives)
// Row 3:  ½,  √2/2,  √3/2        (sin/cos positives)
// Row 4: -√3/3, -1, -√3          (tan/cot negatives)
// Row 5:  √3/3,  1,  √3          (tan/cot positives)
// Row 6: -2√3/3, -√2, -2         (cosec/sec negatives — specialist only)
// Row 7:  2√3/3,  √2,  2         (cosec/sec positives — specialist only)

const METHODS_ROWS: Array<Array<{ label: string; tex: string }>> = [
  [
    { label: '–1',    tex: '-1' },
    { label: '0',     tex: '0' },
    { label: '1',     tex: '1' },
    { label: 'undef', tex: '\\text{undefined}' },
  ],
  [
    { label: '–1/2',  tex: '-\\dfrac{1}{2}' },
    { label: '–√2/2', tex: '-\\dfrac{\\sqrt{2}}{2}' },
    { label: '–√3/2', tex: '-\\dfrac{\\sqrt{3}}{2}' },
  ],
  [
    { label: '1/2',   tex: '\\dfrac{1}{2}' },
    { label: '√2/2',  tex: '\\dfrac{\\sqrt{2}}{2}' },
    { label: '√3/2',  tex: '\\dfrac{\\sqrt{3}}{2}' },
  ],
  [
    { label: '–√3/3', tex: '-\\dfrac{\\sqrt{3}}{3}' },
    { label: '–1',    tex: '-1' },
    { label: '–√3',   tex: '-\\sqrt{3}' },
  ],
  [
    { label: '√3/3',  tex: '\\dfrac{\\sqrt{3}}{3}' },
    { label: '1',     tex: '1' },
    { label: '√3',    tex: '\\sqrt{3}' },
  ],
]

const SPECIALIST_EXTRA_ROWS: Array<Array<{ label: string; tex: string }>> = [
  [
    { label: '–2√3/3', tex: '-\\dfrac{2\\sqrt{3}}{3}' },
    { label: '–√2',    tex: '-\\sqrt{2}' },
    { label: '–2',     tex: '-2' },
  ],
  [
    { label: '2√3/3',  tex: '\\dfrac{2\\sqrt{3}}{3}' },
    { label: '√2',     tex: '\\sqrt{2}' },
    { label: '2',      tex: '2' },
  ],
]

// ── Question generation ──────────────────────────────────────────────────────

interface Question {
  angleTex: string
  fn: TrigFn
  correctLabel: string
  correctTex: string
}

function generateQuestion(range: AngleRange, fnMode: FnMode): Question {
  const a   = angles[Math.floor(Math.random() * angles.length)]
  const fns: TrigFn[] = fnMode === 'specialist'
    ? ['sin', 'cos', 'tan', 'cosec', 'sec', 'cot']
    : ['sin', 'cos', 'tan']
  const fn  = fns[Math.floor(Math.random() * fns.length)]
  const k   = [-2, -1, 0, 1][Math.floor(Math.random() * 4)]

  let angleTex: string
  if (a.piN === 0) {
    angleTex = '0'
  } else if (range === 'pos') {
    angleTex = shiftedAngleTex(a.piN, a.piD, 0)
  } else if (range === 'neg') {
    angleTex = shiftedAngleTex(a.piN, a.piD, -1)
  } else {
    angleTex = Math.random() < 0.5
      ? shiftedAngleTex(a.piN, a.piD, 0)
      : shiftedAngleTex(a.piN, a.piD, -1)
  }
  // k only used for methods mode to vary the displayed angle beyond ±2π
  void k

  const [correctLabel, correctTex] =
    fn === 'sin'   ? [a.sinLabel,   a.sinTex]
    : fn === 'cos' ? [a.cosLabel,   a.cosTex]
    : fn === 'tan' ? [a.tanLabel,   a.tanTex]
    : fn === 'cosec' ? [a.cosecLabel, a.cosecTex]
    : fn === 'sec'   ? [a.secLabel,   a.secTex]
    : [a.cotLabel, a.cotTex]

  return { angleTex, fn, correctLabel, correctTex }
}

function formatTime(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`
}

// ── Component ────────────────────────────────────────────────────────────────

type FlashState = 'correct' | 'wrong' | null

export default function TestMode() {
  const [fnMode,        setFnMode]        = useState<FnMode>('methods')
  const [range,         setRange]         = useState<AngleRange>('pos')
  const [question,      setQuestion]      = useState<Question>(() => generateQuestion('pos', 'methods'))
  const [correct,       setCorrect]       = useState(0)
  const [wrong,         setWrong]         = useState(0)
  const [elapsed,       setElapsed]       = useState(0)
  const [timerRunning,  setTimerRunning]  = useState(true)
  const [flash,         setFlash]         = useState<FlashState>(null)
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!timerRunning) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [timerRunning])

  const next = useCallback((r: AngleRange = range, m: FnMode = fnMode) => {
    setFlash(null)
    setSelectedLabel(null)
    setTimerRunning(true)
    setQuestion(generateQuestion(r, m))
  }, [range, fnMode])

  const handleAnswer = useCallback((label: string) => {
    if (flash) return
    const isCorrect = label === question.correctLabel
    setSelectedLabel(label)
    if (isCorrect) {
      setCorrect(c => c + 1)
      setFlash('correct')
      setTimeout(next, 500)
    } else {
      setWrong(w => w + 1)
      setFlash('wrong')
      setTimerRunning(false)
    }
  }, [flash, question.correctLabel, next])

  const handleRangeChange = useCallback((r: AngleRange) => {
    setRange(r)
    setFlash(null)
    setSelectedLabel(null)
    setTimerRunning(true)
    setQuestion(generateQuestion(r, fnMode))
  }, [fnMode])

  const handleModeChange = useCallback((m: FnMode) => {
    setFnMode(m)
    setFlash(null)
    setSelectedLabel(null)
    setTimerRunning(true)
    setQuestion(generateQuestion(range, m))
  }, [range])

  const reset = useCallback(() => {
    setCorrect(0)
    setWrong(0)
    setElapsed(0)
    setFlash(null)
    setSelectedLabel(null)
    setTimerRunning(true)
    setQuestion(generateQuestion(range, fnMode))
  }, [range, fnMode])

  const accuracy = correct + wrong === 0 ? '—' : `${Math.round(correct / (correct + wrong) * 100)}%`
  const rows = fnMode === 'specialist'
    ? [...METHODS_ROWS, ...SPECIALIST_EXTRA_ROWS]
    : METHODS_ROWS
  const allLabels = rows.flat()

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

      {/* Controls row */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4 flex flex-wrap gap-6">
        {/* Function set */}
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">Function Set</p>
          <div className="flex gap-1">
            <button
              onClick={() => handleModeChange('methods')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                fnMode === 'methods'
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Methods
              <span className="ml-1.5 text-gray-400 dark:text-gray-500 font-normal">sin, cos, tan</span>
            </button>
            <button
              onClick={() => handleModeChange('specialist')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                fnMode === 'specialist'
                  ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Specialist
              <span className="ml-1.5 text-gray-400 dark:text-gray-500 font-normal">+ cosec, sec, cot</span>
            </button>
          </div>
        </div>

        {/* Angle range */}
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">Angle Range</p>
          <div className="flex gap-1">
            {(['pos', 'neg', 'both'] as AngleRange[]).map(opt => (
              <button
                key={opt}
                onClick={() => handleRangeChange(opt)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  range === opt
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {opt === 'pos' ? '[0, 2π]' : opt === 'neg' ? '[−2π, 0]' : '[−2π, 2π]'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Question card */}
      <div className={`relative flex flex-col items-center justify-center min-h-[130px] rounded-xl border-2 transition-colors duration-200 px-6 py-8 ${
        flash === 'correct' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
        : flash === 'wrong'  ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40'
        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
      }`}>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">What is</p>

        <div className="text-2xl">
          <Katex tex={`${FN_TEX[question.fn]}\\!\\left(${question.angleTex}\\right)`} />
        </div>

        {flash === 'correct' && (
          <p className="mt-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">Correct!</p>
        )}

        {flash === 'wrong' && (
          <div className="mt-4 text-center">
            <p className="text-sm text-rose-600 dark:text-rose-400 mb-1">
              You chose: <Katex tex={allLabels.find(a => a.label === selectedLabel)?.tex ?? ''} className="font-medium" />
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Correct: <Katex tex={question.correctTex} className="font-semibold" />
            </p>
          </div>
        )}

        {flash === 'wrong' && (
          <button
            onClick={() => next()}
            className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Next →
          </button>
        )}
      </div>

      {/* Answer grid */}
      <div className="flex flex-col gap-2">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2">
            {row.map(({ label, tex }) => {
              const isCorrect  = label === question.correctLabel
              const isSelected = label === selectedLabel

              let cls = 'flex-1 py-4 px-1 rounded-lg border text-sm font-medium transition-all duration-150 flex items-center justify-center min-h-[64px] '
              if (!flash) {
                cls += 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer'
              } else if (isCorrect) {
                cls += 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
              } else if (isSelected) {
                cls += 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
              } else {
                cls += 'border-gray-200 dark:border-gray-700 opacity-30 cursor-default'
              }

              return (
                <button
                  key={`${rowIdx}-${label}`}
                  onClick={() => handleAnswer(label)}
                  disabled={!!flash}
                  className={cls}
                >
                  <Katex tex={tex} />
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
