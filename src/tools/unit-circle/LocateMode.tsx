import { useState, useEffect, useRef, useCallback } from 'react'
import { angles, shiftedAngleTex, shiftedAngleDegTex, RANGE_LABEL, type AngleUnit, type AngleData } from './data'
import Katex from '../../components/Katex'
import { useSession, type SessionMode } from './session'
import { SessionBar, Choice, WeakSpotCircle, RoundResults } from './SessionParts'
import { useStoredState, readBest, saveBest, useCoarsePointer, type Best } from './storage'

type Domain = 'pos' | 'neg' | 'both'
type Unit = AngleUnit
type FlashState = 'correct' | 'wrong' | null

const CX = 280, CY = 280, R = 210, VB = 560
const DOT_R       = 10   // visible dot radius
const HIT_R       = 27   // invisible hit-target radius (neighbouring points are 55 apart, so this is the most they can have)
const LABEL_R     = R + 42

const COLOR_DEFAULT = 'currentColor'
const COLOR_CORRECT = '#10b981'  // emerald
const COLOR_WRONG   = '#f43f5e'  // rose
const OPACITY_DIM   = 0.15

// ── Question generation ─────────────────────────────────────────────────────

interface LocateQuestion {
  angleIdx: number   // index into angles[]
  angleTex: string   // LaTeX string to display
  negative: boolean  // shown as the negative version (−11π/6 rather than π/6)
}

function genQuestion(domain: Domain, unit: Unit, prev: LocateQuestion | null): LocateQuestion {
  let idx = 0
  for (let tries = 0; tries < 12; tries++) {
    idx = Math.floor(Math.random() * angles.length)
    if (!prev || prev.angleIdx !== idx) break
  }
  const a = angles[idx]

  const shift = unit === 'rad'
    ? (k: number) => shiftedAngleTex(a.piN, a.piD, k)
    : (k: number) => shiftedAngleDegTex(a.deg, k)

  if (a.piN === 0) return { angleIdx: idx, angleTex: '0', negative: false }
  const negative = domain === 'neg' || (domain === 'both' && Math.random() < 0.5)
  return { angleIdx: idx, angleTex: shift(negative ? -1 : 0), negative }
}

/** The angle as plain text, matching how the question was shown (for labels on the circle). */
function plainLabel(a: AngleData, unit: Unit, negative: boolean) {
  if (a.piN === 0) return unit === 'rad' ? '0' : '0°'
  if (unit === 'deg') return negative ? `−${360 - a.deg}°` : a.degLabel
  return negative ? a.negRadLabel.replace('–', '−') : a.radLabel
}

const angleOf = (q: LocateQuestion) => q.angleIdx

// ── Component ───────────────────────────────────────────────────────────────

interface Settings {
  unit: Unit
  domain: Domain
  mode: SessionMode
}

export default function LocateMode() {
  const [settings, setSettings] = useStoredState<Settings>('uc-locate', { unit: 'rad', domain: 'pos', mode: 'practice' })
  const { unit, domain, mode } = settings
  const set = (patch: Partial<Settings>) => setSettings(s => ({ ...s, ...patch }))
  const coarse = useCoarsePointer()

  const [flash,      setFlash]      = useState<FlashState>(null)
  const [clickedIdx, setClickedIdx] = useState<number | null>(null)
  const [best,       setBest]       = useState<Best | undefined>()
  const [newBest,    setNewBest]    = useState(false)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Locate Test has no one-angle drill: the answer would always be the same point.
  const generate = useCallback((_only: number | null, prev: LocateQuestion | null) => genQuestion(domain, unit, prev), [domain, unit])
  const resetKey = `${unit}|${domain}`
  const bestId = `locate|${resetKey}`
  const session = useSession<LocateQuestion>({ mode, generate, angleOf, resetKey })
  const { question } = session
  const summary = `${unit === 'rad' ? 'Radians' : 'Degrees'} · ${RANGE_LABEL[unit][domain]}`

  const clearFeedback = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    setFlash(null)
    setClickedIdx(null)
  }, [])
  useEffect(clearFeedback, [resetKey, mode, clearFeedback])
  useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current) }, [])

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

  const handleDotClick = (idx: number) => {
    if (flash || session.finished) return
    setClickedIdx(idx)
    if (idx === question.angleIdx) {
      session.record(true)
      setFlash('correct')
      advanceTimer.current = setTimeout(next, 600)
    } else {
      session.record(false, plainLabel(angles[idx], unit, question.negative))
      setFlash('wrong')
    }
  }

  const restart = (retry?: LocateQuestion[]) => { clearFeedback(); session.restart(retry) }
  const verb = coarse ? 'Tap' : 'Click'

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
          <Choice label="Angle Unit" value={unit} onChange={v => set({ unit: v })} options={[{ id: 'rad', label: 'Radians' }, { id: 'deg', label: 'Degrees' }]} />
          <Choice
            label="Angle Range"
            value={domain}
            onChange={v => set({ domain: v })}
            options={(['pos', 'neg', 'both'] as Domain[]).map(d => ({ id: d, label: RANGE_LABEL[unit][d] }))}
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
              prompt: <Katex tex={m.question.angleTex} />,
              detail: <>you {verb === 'Tap' ? 'tapped' : 'clicked'} <b className="text-rose-600 dark:text-rose-400">{m.given}</b></>,
            }))}
            onRetry={() => restart(session.misses.map(m => m.question))}
            onNew={() => restart()}
          />
        </div>
      ) : (
        <>
          {/* Question card */}
          <div className={`lg:col-start-1 flex flex-col items-center justify-center min-h-[104px] rounded-xl border-2 transition-colors duration-200 px-5 py-4 ${
            flash === 'correct' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
            : flash === 'wrong'  ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40'
            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
          }`}>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1.5">{verb} the angle</p>
            <div className="text-2xl">
              <Katex tex={question.angleTex} />
            </div>
            {/* Feedback area — both messages occupy the same space, so the card doesn't jump. */}
            <div className="mt-2 grid text-center">
              <p className={`col-start-1 row-start-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 ${flash === 'correct' ? '' : 'invisible'}`}>
                Correct!
              </p>
              <div className={`col-start-1 row-start-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 ${flash === 'wrong' ? '' : 'invisible'}`}>
                <p className="text-sm text-rose-600 dark:text-rose-400">Not quite: the answer is shown in green.</p>
                {flash === 'wrong' && (
                  <button
                    onClick={next}
                    autoFocus
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Unit circle — the points are the answers */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-3 w-full lg:max-w-[calc(100vh-170px)] lg:mx-auto">
            <svg
              viewBox={`0 0 ${VB} ${VB}`}
              className="w-full h-auto"
              style={{ cursor: flash ? 'default' : 'crosshair' }}
              role="group"
              aria-label="Unit circle: choose the point for this angle"
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
                    {/* Enlarged hit target, also reachable with Tab and Enter. The label doesn't
                        name the angle, so it doesn't give the answer away. */}
                    <circle
                      cx={cx} cy={cy} r={HIT_R}
                      fill="transparent"
                      stroke="transparent"
                      strokeWidth={3}
                      role="button"
                      tabIndex={flash ? -1 : 0}
                      aria-label={`Point ${i + 1} of 16, counting anticlockwise from the positive x-axis`}
                      className="outline-none focus-visible:stroke-blue-500"
                      onClick={() => handleDotClick(i)}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDotClick(i) } }}
                      style={{ cursor: flash ? 'default' : 'pointer' }}
                    />
                  </g>
                )
              })}

              {/* After a wrong answer, name both points so the mix-up is clear. */}
              {flash === 'wrong' && clickedIdx !== null && [clickedIdx, question.angleIdx].map(i => {
                const a = angles[i]
                const good = i === question.angleIdx
                return (
                  <text
                    key={`lbl-${i}`}
                    x={CX + LABEL_R * a.cosN}
                    y={CY - LABEL_R * a.sinN + 7}
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="700"
                    fill={good ? COLOR_CORRECT : COLOR_WRONG}
                    fontFamily="Inter, sans-serif"
                  >
                    {plainLabel(a, unit, question.negative)}
                  </text>
                )
              })}

              {/* Axis labels */}
              <text x={VB - 24} y={CY - 6} fontSize="12" textAnchor="middle"
                fill="currentColor" fillOpacity="0.3" fontFamily="Inter, sans-serif">x</text>
              <text x={CX + 8}  y={24}      fontSize="12" textAnchor="start"
                fill="currentColor" fillOpacity="0.3" fontFamily="Inter, sans-serif">y</text>
            </svg>
            <p className="text-xs text-center text-gray-400 dark:text-gray-500 pb-2">
              {verb} the point for this angle{coarse ? '' : ', or use Tab and Enter'}
            </p>
          </div>
        </>
      )}

      {mode === 'practice' && (
        <div className="lg:col-start-1">
          <WeakSpotCircle perAngle={session.perAngle} unit={unit} />
        </div>
      )}
    </div>
  )
}
