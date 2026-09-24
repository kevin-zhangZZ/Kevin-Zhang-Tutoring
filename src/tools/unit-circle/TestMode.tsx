import { useState, useEffect, useRef, useCallback } from 'react'
import { angles, shiftedAngleTex, shiftedAngleDegTex, RANGE_LABEL, type AngleUnit } from './data'
import Katex from '../../components/Katex'
import { useSession, type SessionMode } from './session'
import { SessionBar, Choice, WeakSpotCircle, RoundResults } from './SessionParts'
import { useStoredState, readBest, saveBest, type Best } from './storage'
import WrongExplanation from './WrongExplanation'

type TrigFn   = 'sin' | 'cos' | 'tan' | 'cosec' | 'sec' | 'cot'
type AngleRange = 'pos' | 'neg' | 'both'
type FnMode   = 'methods' | 'specialist'
type Unit     = AngleUnit

// LaTeX command for each function (cosec → \csc is the standard LaTeX name)
const FN_TEX: Record<TrigFn, string> = {
  sin: '\\sin', cos: '\\cos', tan: '\\tan',
  cosec: '\\csc', sec: '\\sec', cot: '\\cot',
}

// ── Answer grid ─────────────────────────────────────────────────────────────
// Every value appears once:
// Row 1: -1, 0, 1, undefined
// Row 2: -½, -√2/2, -√3/2        (sin/cos negatives)
// Row 3:  ½,  √2/2,  √3/2        (sin/cos positives)
// Row 4: -√3/3, -√3              (tan/cot negatives; ±1 are in row 1)
// Row 5:  √3/3,  √3              (tan/cot positives)
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
    { label: '–√3',   tex: '-\\sqrt{3}' },
  ],
  [
    { label: '√3/3',  tex: '\\dfrac{\\sqrt{3}}{3}' },
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
  angleIdx: number
  angleTex: string
  fn: TrigFn
  correctLabel: string
  correctTex: string
}

function generateQuestion(range: AngleRange, fnMode: FnMode, unit: Unit, onlyAngle: number | null, prev: Question | null): Question {
  const fns: TrigFn[] = fnMode === 'specialist'
    ? ['sin', 'cos', 'tan', 'cosec', 'sec', 'cot']
    : ['sin', 'cos', 'tan']
  let idx = 0
  let fn: TrigFn = 'sin'
  // Never the same question twice in a row.
  for (let tries = 0; tries < 12; tries++) {
    idx = onlyAngle ?? Math.floor(Math.random() * angles.length)
    fn = fns[Math.floor(Math.random() * fns.length)]
    if (!prev || prev.angleIdx !== idx || prev.fn !== fn) break
  }
  const a = angles[idx]

  const shift = unit === 'rad'
    ? (kk: number) => shiftedAngleTex(a.piN, a.piD, kk)
    : (kk: number) => shiftedAngleDegTex(a.deg, kk)

  let angleTex: string
  if (a.piN === 0) {
    angleTex = '0'
  } else if (range === 'pos') {
    angleTex = shift(0)
  } else if (range === 'neg') {
    angleTex = shift(-1)
  } else {
    angleTex = Math.random() < 0.5 ? shift(0) : shift(-1)
  }

  const [correctLabel, correctTex] =
    fn === 'sin'   ? [a.sinLabel,   a.sinTex]
    : fn === 'cos' ? [a.cosLabel,   a.cosTex]
    : fn === 'tan' ? [a.tanLabel,   a.tanTex]
    : fn === 'cosec' ? [a.cosecLabel, a.cosecTex]
    : fn === 'sec'   ? [a.secLabel,   a.secTex]
    : [a.cotLabel, a.cotTex]

  return { angleIdx: idx, angleTex, fn, correctLabel, correctTex }
}

const questionTex = (q: Question) => `${FN_TEX[q.fn]}\\!\\left(${q.angleTex}\\right)`
const angleOf = (q: Question) => q.angleIdx

// ── Component ────────────────────────────────────────────────────────────────

type FlashState = 'correct' | 'wrong' | null

interface Settings {
  fnMode: FnMode
  unit: Unit
  range: AngleRange
  mode: SessionMode
}

export default function TestMode() {
  const [settings, setSettings] = useStoredState<Settings>('uc-values', { fnMode: 'methods', unit: 'rad', range: 'pos', mode: 'practice' })
  const { fnMode, unit, range, mode } = settings
  const set = (patch: Partial<Settings>) => setSettings(s => ({ ...s, ...patch }))

  const [flash,         setFlash]         = useState<FlashState>(null)
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
  const [best,          setBest]          = useState<Best | undefined>()
  const [newBest,       setNewBest]       = useState(false)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const generate = useCallback(
    (onlyAngle: number | null, prev: Question | null) => generateQuestion(range, fnMode, unit, onlyAngle, prev),
    [range, fnMode, unit],
  )
  const resetKey = `${fnMode}|${unit}|${range}`
  const bestId = `values|${resetKey}`
  const session = useSession<Question>({ mode, generate, angleOf, resetKey })
  const { question } = session

  const rows = fnMode === 'specialist' ? [...METHODS_ROWS, ...SPECIALIST_EXTRA_ROWS] : METHODS_ROWS
  const allLabels = rows.flat()
  const summary = `${fnMode === 'methods' ? 'Methods' : 'Specialist'} · ${unit === 'rad' ? 'rad' : 'deg'} · ${RANGE_LABEL[unit][range]}`

  // Any restart (new settings, mode, or round) clears the feedback on screen.
  const clearFeedback = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    setFlash(null)
    setSelectedLabel(null)
  }, [])
  useEffect(clearFeedback, [resetKey, mode, clearFeedback])
  useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current) }, [])

  // A finished Test round (not a "practise these" round) is checked against the best for these settings.
  useEffect(() => {
    if (!session.finished || mode !== 'test') return
    if (session.retry) { setNewBest(false); return }
    // The first round on these settings sets the best without being called one.
    const old = readBest(bestId)
    const beat = saveBest(bestId, { score: session.correct, total: session.total, seconds: session.elapsed })
    setNewBest(beat && !!old)
    setBest(old ? readBest(bestId) : undefined)
  }, [session.finished]) // eslint-disable-line react-hooks/exhaustive-deps

  const next = useCallback(() => {
    clearFeedback()
    session.advance()
  }, [clearFeedback, session])

  const handleAnswer = (label: string, tex: string) => {
    if (flash || session.finished) return
    setSelectedLabel(label)
    if (label === question.correctLabel) {
      session.record(true)
      setFlash('correct')
      advanceTimer.current = setTimeout(next, 500)
    } else {
      session.record(false, tex)
      setFlash('wrong')
    }
  }

  const restart = (retry?: Question[]) => { clearFeedback(); session.restart(retry) }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-6 lg:items-start">
      <div className="lg:col-start-1">
        <SessionBar
          correct={session.correct}
          wrong={session.wrong}
          elapsed={session.elapsed}
          mode={mode}
          onMode={m => set({ mode: m })}
          progress={mode === 'test' && !session.finished ? `Question ${session.answered + 1} of ${session.total}` : undefined}
          summary={summary}
          onRestart={() => restart()}
        >
          <Choice
            label="Function Set"
            value={fnMode}
            onChange={v => set({ fnMode: v })}
            options={[
              { id: 'methods', label: <>Methods <span className="ml-1 text-gray-400 dark:text-gray-500 font-normal">sin, cos, tan</span></> },
              { id: 'specialist', label: <>Specialist <span className="ml-1 text-gray-400 dark:text-gray-500 font-normal">+ cosec, sec, cot</span></> },
            ]}
          />
          <Choice label="Angle Unit" value={unit} onChange={v => set({ unit: v })} options={[{ id: 'rad', label: 'Radians' }, { id: 'deg', label: 'Degrees' }]} />
          <Choice
            label="Angle Range"
            value={range}
            onChange={v => set({ range: v })}
            options={(['pos', 'neg', 'both'] as AngleRange[]).map(r => ({ id: r, label: RANGE_LABEL[unit][r] }))}
          />
        </SessionBar>
      </div>

      {session.finished ? (
        <div className="lg:col-start-1">
          <RoundResults
            correct={session.correct}
            total={session.total}
            elapsed={session.elapsed}
            summary={summary}
            best={best}
            newBest={newBest}
            retry={session.retry}
            misses={session.misses.map(m => ({
              prompt: <Katex tex={questionTex(m.question)} />,
              detail: <>you said <Katex tex={m.given} />, it’s <b className="text-emerald-700 dark:text-emerald-400"><Katex tex={m.question.correctTex} /></b></>,
            }))}
            onRetry={() => restart(session.misses.map(m => m.question))}
            onNew={() => restart()}
          />
        </div>
      ) : (
        <>
          {/* Question card */}
          <div className={`lg:col-start-1 min-w-0 flex flex-col items-center justify-center min-h-[96px] sm:min-h-[112px] rounded-xl border-2 transition-colors duration-200 px-5 py-4 sm:py-5 ${
            flash === 'correct' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
            : flash === 'wrong'  ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40'
            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
          }`}>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">What is</p>
            <div className="text-2xl">
              <Katex tex={questionTex(question)} />
            </div>

            {flash === 'correct' && (
              <p className="mt-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400">Correct!</p>
            )}

            {flash === 'wrong' && (
              <div className="mt-3 w-full flex flex-col items-center gap-3 text-center">
                {/* Next stays up here, so it's in view however far the explanation opens. */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  <p className="text-sm">
                    <span className="text-rose-600 dark:text-rose-400">You chose <Katex tex={allLabels.find(a => a.label === selectedLabel)?.tex ?? ''} className="font-medium" /></span>
                    <span className="text-gray-400"> · </span>
                    <span className="text-emerald-600 dark:text-emerald-400">Answer <Katex tex={question.correctTex} className="font-semibold" /></span>
                  </p>
                  <button
                    onClick={next}
                    autoFocus
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Next →
                  </button>
                </div>
                <WrongExplanation
                  key={`${session.answered}-${question.angleIdx}-${question.fn}`}
                  angle={angles[question.angleIdx]}
                  fn={question.fn}
                  angleTex={question.angleTex}
                  unit={unit}
                />
              </div>
            )}
          </div>

          {/* Answer grid */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-3 flex flex-col gap-2">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-2">
                {row.map(({ label, tex }) => {
                  const isCorrect  = label === question.correctLabel
                  const isSelected = label === selectedLabel

                  let cls = 'flex-1 px-1 rounded-lg border text-sm font-medium transition-all duration-150 flex items-center justify-center min-h-[44px] sm:min-h-[56px] lg:min-h-[64px] '
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
                      onClick={() => handleAnswer(label, tex)}
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
        </>
      )}

      {mode === 'practice' && (
        <div className="lg:col-start-1">
          <WeakSpotCircle perAngle={session.perAngle} unit={unit} drill={session.drill} onPick={i => { clearFeedback(); session.setDrill(i) }} />
        </div>
      )}
    </div>
  )
}
