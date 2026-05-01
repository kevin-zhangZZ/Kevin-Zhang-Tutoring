import { useState, useEffect, useRef, useCallback } from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

type Op = 'add' | 'sub' | 'mul' | 'div'
type Screen = 'settings' | 'game' | 'results'
type Flash = 'correct' | 'wrong' | null

interface Config {
  ops: Set<Op>
  addMin1: number; addMax1: number
  addMin2: number; addMax2: number
  mulMin1: number; mulMax1: number
  mulMin2: number; mulMax2: number
  duration: number
}

interface Question {
  text: string
  answer: number
}

// ── Question generation ──────────────────────────────────────────────────────

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function genQuestion(cfg: Config): Question {
  const ops = [...cfg.ops]
  const op = ops[Math.floor(Math.random() * ops.length)] as Op

  if (op === 'add') {
    const a = randInt(cfg.addMin1, cfg.addMax1)
    const b = randInt(cfg.addMin2, cfg.addMax2)
    return { text: `${a} + ${b}`, answer: a + b }
  }
  if (op === 'sub') {
    const a = randInt(cfg.addMin1, cfg.addMax1)
    const b = randInt(cfg.addMin2, cfg.addMax2)
    const big = Math.max(a, b), small = Math.min(a, b)
    return { text: `${big} − ${small}`, answer: big - small }
  }
  if (op === 'mul') {
    const a = randInt(cfg.mulMin1, cfg.mulMax1)
    const b = randInt(cfg.mulMin2, cfg.mulMax2)
    return { text: `${a} × ${b}`, answer: a * b }
  }
  // div
  const a = randInt(cfg.mulMin1, cfg.mulMax1)
  const b = randInt(cfg.mulMin2, cfg.mulMax2)
  return { text: `${a * b} ÷ ${a}`, answer: b }
}

// ── Settings screen ──────────────────────────────────────────────────────────

const DURATIONS = [30, 60, 90, 120, 180, 300]

interface NumInputProps {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}
function NumInput({ value, onChange, min = 1, max = 9999 }: NumInputProps) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={e => {
        const v = parseInt(e.target.value)
        if (!isNaN(v) && v >= min && v <= max) onChange(v)
      }}
      className="w-16 text-center text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1.5 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  )
}

const OP_META: Record<Op, { label: string; color: string }> = {
  add: { label: 'Addition',       color: 'blue'   },
  sub: { label: 'Subtraction',    color: 'violet' },
  mul: { label: 'Multiplication', color: 'orange' },
  div: { label: 'Division',       color: 'rose'   },
}

function SettingsScreen({ onStart }: { onStart: (cfg: Config) => void }) {
  const [cfg, setCfg] = useState<Config>({
    ops: new Set(['add', 'sub', 'mul', 'div']),
    addMin1: 2,  addMax1: 100,
    addMin2: 2,  addMax2: 100,
    mulMin1: 2,  mulMax1: 12,
    mulMin2: 2,  mulMax2: 100,
    duration: 120,
  })

  const toggleOp = (op: Op) => {
    setCfg(c => {
      const next = new Set(c.ops)
      if (next.has(op) && next.size === 1) return c
      next.has(op) ? next.delete(op) : next.add(op)
      return { ...c, ops: next }
    })
  }

  const set = <K extends keyof Config>(k: K, v: Config[K]) =>
    setCfg(c => ({ ...c, [k]: v }))

  return (
    <div className="flex flex-col gap-6">
      {/* Operations */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
        {(['add', 'sub', 'mul', 'div'] as Op[]).map((op, i) => {
          const on = cfg.ops.has(op)
          const { label, color } = OP_META[op]
          const colorMap: Record<string, string> = {
            blue:   'bg-blue-500',
            violet: 'bg-violet-500',
            orange: 'bg-orange-500',
            rose:   'bg-rose-500',
          }
          return (
            <div key={op} className={`flex flex-col gap-3 px-5 py-4 ${i === 0 ? 'rounded-t-xl' : ''} ${i === 3 ? 'rounded-b-xl' : ''}`}>
              <div className="flex items-center gap-3">
                {/* Toggle */}
                <button
                  role="switch" aria-checked={on}
                  onClick={() => toggleOp(op)}
                  className={`relative flex-shrink-0 w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none ${on ? colorMap[color] : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${on ? 'translate-x-4' : ''}`} />
                </button>
                <span className={`text-sm font-semibold transition-colors ${on ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
                  {label}
                </span>
              </div>

              {on && (op === 'add') && (
                <div className="ml-12 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Range:</span>
                  <span>(</span>
                  <NumInput value={cfg.addMin1} onChange={v => set('addMin1', v)} />
                  <span>to</span>
                  <NumInput value={cfg.addMax1} onChange={v => set('addMax1', v)} />
                  <span>)</span>
                  <span className="font-bold text-gray-400">+</span>
                  <span>(</span>
                  <NumInput value={cfg.addMin2} onChange={v => set('addMin2', v)} />
                  <span>to</span>
                  <NumInput value={cfg.addMax2} onChange={v => set('addMax2', v)} />
                  <span>)</span>
                </div>
              )}
              {on && (op === 'sub') && (
                <p className="ml-12 text-xs text-gray-400 dark:text-gray-500">Uses addition range (larger − smaller, always positive).</p>
              )}
              {on && (op === 'mul') && (
                <div className="ml-12 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Range:</span>
                  <span>(</span>
                  <NumInput value={cfg.mulMin1} onChange={v => set('mulMin1', v)} />
                  <span>to</span>
                  <NumInput value={cfg.mulMax1} onChange={v => set('mulMax1', v)} />
                  <span>)</span>
                  <span className="font-bold text-gray-400">×</span>
                  <span>(</span>
                  <NumInput value={cfg.mulMin2} onChange={v => set('mulMin2', v)} />
                  <span>to</span>
                  <NumInput value={cfg.mulMax2} onChange={v => set('mulMax2', v)} />
                  <span>)</span>
                </div>
              )}
              {on && (op === 'div') && (
                <p className="ml-12 text-xs text-gray-400 dark:text-gray-500">Uses multiplication range (always divides evenly).</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Duration */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Duration</p>
        <div className="flex flex-wrap gap-1.5">
          {DURATIONS.map(d => (
            <button
              key={d}
              onClick={() => set('duration', d)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                cfg.duration === d
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {d < 60 ? `${d}s` : `${d / 60}m`}
            </button>
          ))}
        </div>
      </div>

      {/* Start */}
      <button
        onClick={() => onStart(cfg)}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-sm"
      >
        Start
      </button>
    </div>
  )
}

// ── Game screen ──────────────────────────────────────────────────────────────

interface GameResult {
  correct: number
  wrong: number
  duration: number
}

function GameScreen({ cfg, onDone }: { cfg: Config; onDone: (r: GameResult) => void }) {
  const [timeLeft,  setTimeLeft]  = useState(cfg.duration)
  const [question,  setQuestion]  = useState<Question>(() => genQuestion(cfg))
  const [input,     setInput]     = useState('')
  const [flash,     setFlash]     = useState<Flash>(null)
  const [correct,   setCorrect]   = useState(0)
  const [wrong,     setWrong]     = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const doneRef  = useRef(false)

  // Timer
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // End when time runs out
  useEffect(() => {
    if (timeLeft === 0 && !doneRef.current) {
      doneRef.current = true
      // Read the latest correct/wrong via callback form
      setCorrect(c => { setWrong(w => { onDone({ correct: c, wrong: w, duration: cfg.duration }); return w }); return c })
    }
  }, [timeLeft, cfg.duration, onDone])

  const nextQuestion = useCallback(() => {
    setInput('')
    setFlash(null)
    setQuestion(genQuestion(cfg))
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [cfg])

  const handleInput = useCallback((val: string) => {
    setInput(val)
    const parsed = parseInt(val)
    if (isNaN(parsed)) return
    if (parsed === question.answer) {
      setCorrect(c => c + 1)
      setFlash('correct')
      setTimeout(nextQuestion, 300)
    }
  }, [question.answer, nextQuestion])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsed = parseInt(input)
      if (!isNaN(parsed) && parsed !== question.answer) {
        setWrong(w => w + 1)
        setFlash('wrong')
        setTimeout(() => setFlash(null), 400)
      }
    }
  }, [input, question.answer])

  const pct = timeLeft / cfg.duration
  const barColor = pct > 0.5 ? 'bg-emerald-500' : pct > 0.25 ? 'bg-amber-500' : 'bg-rose-500'

  const mm = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const ss = (timeLeft % 60).toString().padStart(2, '0')

  return (
    <div className="flex flex-col gap-6">
      {/* Stats bar */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-3.5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-lg font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
            {mm}:{ss}
          </span>
          <div className="flex gap-4 text-sm font-semibold tabular-nums">
            <span className="text-emerald-600 dark:text-emerald-400">✓ {correct}</span>
            <span className="text-rose-500 dark:text-rose-400">✗ {wrong}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
            style={{ width: `${pct * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className={`flex flex-col items-center justify-center gap-6 min-h-[220px] rounded-xl border-2 transition-colors duration-150 px-8 py-10 ${
        flash === 'correct' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
        : flash === 'wrong'  ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30'
        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
      }`}>
        <p className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white select-none">
          {question.text} =
        </p>
        <input
          ref={inputRef}
          autoFocus
          type="number"
          value={input}
          onChange={e => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="?"
          className={`w-36 text-center text-2xl font-bold bg-transparent border-b-2 transition-colors duration-150 focus:outline-none py-1 ${
            flash === 'correct' ? 'border-emerald-400 text-emerald-600 dark:text-emerald-400'
            : flash === 'wrong'  ? 'border-rose-400 text-rose-600 dark:text-rose-400'
            : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500'
          }`}
        />
      </div>

      <p className="text-xs text-center text-gray-400 dark:text-gray-600">
        Correct answer auto-advances · Press Enter to flag a wrong attempt
      </p>
    </div>
  )
}

// ── Results screen ───────────────────────────────────────────────────────────

function ResultsScreen({ result, onRestart }: { result: GameResult; onRestart: () => void }) {
  const total = result.correct + result.wrong
  const accuracy = total === 0 ? 0 : Math.round(result.correct / total * 100)
  const ppm = (result.correct / result.duration * 60).toFixed(1)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-6 py-8 text-center">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Time's up!</p>
        <p className="text-6xl font-bold text-gray-900 dark:text-white mb-1">{result.correct}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">correct answers</p>
      </div>

      <div className="w-full grid grid-cols-3 gap-3">
        {[
          { label: 'Wrong',    value: result.wrong.toString(), color: 'text-rose-500 dark:text-rose-400' },
          { label: 'Accuracy', value: `${accuracy}%`,          color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Per min',  value: ppm,                     color: 'text-violet-600 dark:text-violet-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-sm"
      >
        Play Again
      </button>
    </div>
  )
}

// ── Root component ───────────────────────────────────────────────────────────

export default function SpeedMaths() {
  const [screen, setScreen] = useState<Screen>('settings')
  const [cfg,    setCfg]    = useState<Config | null>(null)
  const [result, setResult] = useState<GameResult | null>(null)

  const handleStart = useCallback((c: Config) => {
    setCfg(c)
    setResult(null)
    setScreen('game')
  }, [])

  const handleDone = useCallback((r: GameResult) => {
    setResult(r)
    setScreen('results')
  }, [])

  const handleRestart = useCallback(() => {
    setResult(null)
    setScreen('settings')
  }, [])

  return (
    <div className="max-w-lg mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Speed Maths</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Solve as many arithmetic problems as you can before time runs out.
        </p>
      </div>

      {screen === 'settings' && <SettingsScreen onStart={handleStart} />}
      {screen === 'game'     && cfg    && <GameScreen    key={Date.now()} cfg={cfg} onDone={handleDone} />}
      {screen === 'results'  && result && <ResultsScreen result={result} onRestart={handleRestart} />}
    </div>
  )
}
