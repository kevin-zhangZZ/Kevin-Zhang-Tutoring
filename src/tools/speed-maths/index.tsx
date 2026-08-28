import { useState, useEffect, useRef, useCallback } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Op         = 'add' | 'sub' | 'mul' | 'div'
type Difficulty = 'easy' | 'medium' | 'hard'
type Screen     = 'settings' | 'game' | 'results'
type Flash      = 'correct' | 'wrong' | null

// All 4 ops are always enabled — Config only holds numeric ranges + duration.
interface Config {
  addMin1: number; addMax1: number
  addMin2: number; addMax2: number
  mulMin1: number; mulMax1: number
  mulMin2: number; mulMax2: number
  duration: number
}

interface Question { text: string; answer: number }

interface GameResult {
  correct:    number
  wrong:      number
  duration:   number
  difficulty: Difficulty
}

// ── Presets ───────────────────────────────────────────────────────────────────

type RangeConfig = Omit<Config, 'duration'>

const RANGE_CONFIGS: Record<Difficulty, RangeConfig> = {
  easy: {
    addMin1: 2,   addMax1: 100,
    addMin2: 2,   addMax2: 100,
    mulMin1: 2,   mulMax1: 12,
    mulMin2: 2,   mulMax2: 100,
  },
  medium: {
    addMin1: 50,  addMax1: 150,
    addMin2: 50,  addMax2: 150,
    mulMin1: 7,   mulMax1: 15,
    mulMin2: 12,  mulMax2: 100,
  },
  hard: {
    addMin1: 50,  addMax1: 250,
    addMin2: 50,  addMax2: 250,
    mulMin1: 12,  mulMax1: 25,
    mulMin2: 12,  mulMax2: 100,
  },
}

const DIFF_META: Record<Difficulty, { label: string; active: string; idle: string }> = {
  easy: {
    label:  'Easy',
    active: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200',
    idle:   'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60',
  },
  medium: {
    label:  'Medium',
    active: 'border-blue-400 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200',
    idle:   'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60',
  },
  hard: {
    label:  'Hard',
    active: 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200',
    idle:   'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60',
  },
}

// ── Range display variants ────────────────────────────────────────────────────

// Design 1 — Spec card: labelled table rows inside a subtle card
function RangeDisplayA({ d }: { d: Difficulty }) {
  const r = RANGE_CONFIGS[d]
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
      {[
        { sym: '+  /  −', range: `${r.addMin1} – ${r.addMax1}` },
        { sym: '×  /  ÷', range: `${r.mulMin1}–${r.mulMax1}   ×   ${r.mulMin2}–${r.mulMax2}` },
      ].map((row, i) => (
        <div key={row.sym} className={`flex items-center gap-5 px-5 py-3 ${i > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}>
          <span className="w-16 text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest">{row.sym}</span>
          <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{row.range}</span>
        </div>
      ))}
    </div>
  )
}

// Design 2 — Inline caption: no box, just quiet text directly below the buttons
function RangeDisplayB({ d }: { d: Difficulty }) {
  const r = RANGE_CONFIGS[d]
  return (
    <div className="flex flex-col gap-1.5 px-1">
      <div className="flex items-baseline gap-3 text-sm">
        <span className="w-8 font-semibold text-gray-400 dark:text-gray-500 text-xs tracking-wide">+/−</span>
        <span className="font-mono text-gray-600 dark:text-gray-400">{r.addMin1} – {r.addMax1}</span>
      </div>
      <div className="flex items-baseline gap-3 text-sm">
        <span className="w-8 font-semibold text-gray-400 dark:text-gray-500 text-xs tracking-wide">×/÷</span>
        <span className="font-mono text-gray-600 dark:text-gray-400">{r.mulMin1}–{r.mulMax1} &nbsp;×&nbsp; {r.mulMin2}–{r.mulMax2}</span>
      </div>
    </div>
  )
}

// Design 3 — Chip row: each operation as its own pill badge
function RangeDisplayC({ d }: { d: Difficulty }) {
  const r = RANGE_CONFIGS[d]
  const chips = [
    { op: '+', range: `${r.addMin1} – ${r.addMax1}` },
    { op: '−', range: `${r.addMin1} – ${r.addMax1}` },
    { op: '×', range: `${r.mulMin1}–${r.mulMax1} × ${r.mulMin2}–${r.mulMax2}` },
    { op: '÷', range: `${r.mulMin1}–${r.mulMax1} × ${r.mulMin2}–${r.mulMax2}` },
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map(c => (
        <div key={c.op} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400 w-3.5 text-center">{c.op}</span>
          <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{c.range}</span>
        </div>
      ))}
    </div>
  )
}

const DURATIONS = [30, 60, 90, 120, 180, 300]

// ── Question generation ───────────────────────────────────────────────────────

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const ALL_OPS: Op[] = ['add', 'sub', 'mul', 'div']

function genQuestion(cfg: Config): Question {
  const op = ALL_OPS[Math.floor(Math.random() * 4)]
  if (op === 'add') {
    const a = randInt(cfg.addMin1, cfg.addMax1), b = randInt(cfg.addMin2, cfg.addMax2)
    return { text: `${a} + ${b}`, answer: a + b }
  }
  if (op === 'sub') {
    const a = randInt(cfg.addMin1, cfg.addMax1), b = randInt(cfg.addMin2, cfg.addMax2)
    const big = Math.max(a, b), small = Math.min(a, b)
    return { text: `${big} − ${small}`, answer: big - small }
  }
  if (op === 'mul') {
    const a = randInt(cfg.mulMin1, cfg.mulMax1), b = randInt(cfg.mulMin2, cfg.mulMax2)
    return { text: `${a} × ${b}`, answer: a * b }
  }
  // div
  const a = randInt(cfg.mulMin1, cfg.mulMax1), b = randInt(cfg.mulMin2, cfg.mulMax2)
  return { text: `${a * b} ÷ ${a}`, answer: b }
}

// ── Settings screen ───────────────────────────────────────────────────────────

function SettingsScreen({
  onStart,
}: {
  onStart: (cfg: Config, difficulty: Difficulty) => void
}) {
  const [difficulty,    setDifficulty]    = useState<Difficulty>('easy')
  const [duration,      setDuration]      = useState(120)
  const [designVariant, setDesignVariant] = useState<1 | 2 | 3>(1)

  const handleStart = () => {
    onStart({ ...RANGE_CONFIGS[difficulty], duration }, difficulty)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Temporary design switcher (remove before deploy) ── */}
      <div className="flex items-center gap-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2">
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Range display:</span>
        {([1, 2, 3] as const).map(n => (
          <button
            key={n}
            onClick={() => setDesignVariant(n)}
            className={`px-2.5 py-0.5 rounded text-xs font-semibold transition-colors ${
              designVariant === n
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Difficulty cards */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-3">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => {
            const m = DIFF_META[d]
            const active = difficulty === d
            return (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-xl border-2 px-3 py-4 text-center transition-colors ${active ? m.active : m.idle}`}
              >
                <p className="text-sm font-bold">{m.label}</p>
              </button>
            )
          })}
        </div>

        {/* Range info — displayed separately, below the cards */}
        <div>
          {designVariant === 1 && <RangeDisplayA d={difficulty} />}
          {designVariant === 2 && <RangeDisplayB d={difficulty} />}
          {designVariant === 3 && <RangeDisplayC d={difficulty} />}
        </div>
      </div>

      {/* Duration */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Duration</p>
        <div className="flex flex-wrap gap-1.5">
          {DURATIONS.map(d => (
            <button
              key={d} onClick={() => setDuration(d)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                duration === d
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
        onClick={handleStart}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-sm"
      >
        Start
      </button>
    </div>
  )
}

// ── Game screen ───────────────────────────────────────────────────────────────

function GameScreen({ cfg, difficulty, onDone }: {
  cfg:        Config
  difficulty: Difficulty
  onDone:     (r: GameResult) => void
}) {
  const [timeLeft, setTimeLeft] = useState(cfg.duration)
  const [question, setQuestion] = useState<Question>(() => genQuestion(cfg))
  const [input,    setInput]    = useState('')
  const [flash,    setFlash]    = useState<Flash>(null)
  const [correct,  setCorrect]  = useState(0)
  const [wrong,    setWrong]    = useState(0)
  const inputRef   = useRef<HTMLInputElement>(null)
  const doneRef    = useRef(false)
  const correctRef = useRef(0)
  const wrongRef   = useRef(0)

  useEffect(() => { correctRef.current = correct }, [correct])
  useEffect(() => { wrongRef.current   = wrong    }, [wrong])

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(id); return 0 } return t - 1 })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (timeLeft === 0 && !doneRef.current) {
      doneRef.current = true
      onDone({ correct: correctRef.current, wrong: wrongRef.current, duration: cfg.duration, difficulty })
    }
  }, [timeLeft, cfg.duration, difficulty, onDone])

  const nextQuestion = useCallback(() => {
    setInput(''); setFlash(null)
    setQuestion(genQuestion(cfg))
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [cfg])

  const handleInput = useCallback((val: string) => {
    setInput(val)
    const parsed = parseInt(val); if (isNaN(parsed)) return
    if (parsed === question.answer) {
      setCorrect(c => c + 1); setFlash('correct')
      setTimeout(nextQuestion, 300)
    }
  }, [question.answer, nextQuestion])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsed = parseInt(input)
      if (!isNaN(parsed) && parsed !== question.answer) {
        setWrong(w => w + 1); setFlash('wrong')
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
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-3.5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-lg font-semibold text-gray-800 dark:text-gray-200 tabular-nums">{mm}:{ss}</span>
          <div className="flex gap-4 text-sm font-semibold tabular-nums">
            <span className="text-emerald-600 dark:text-emerald-400">✓ {correct}</span>
            <span className="text-rose-500 dark:text-rose-400">✗ {wrong}</span>
          </div>
        </div>
        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${barColor}`} style={{ width: `${pct * 100}%` }} />
        </div>
      </div>

      <div className={`flex flex-col items-center justify-center gap-6 min-h-[220px] rounded-xl border-2 transition-colors duration-150 px-8 py-10 ${
        flash === 'correct' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
        : flash === 'wrong'  ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30'
        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
      }`}>
        <p className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white select-none">{question.text} =</p>
        <input
          ref={inputRef} autoFocus type="number" value={input}
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

// ── Results screen ────────────────────────────────────────────────────────────

function ResultsScreen({ result, onRestart }: {
  result:    GameResult
  onRestart: () => void
}) {
  const total    = result.correct + result.wrong
  const accuracy = total === 0 ? 0 : Math.round(result.correct / total * 100)
  const ppm      = result.correct / result.duration * 60

  const diffLabel = DIFF_META[result.difficulty].label

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-6 py-8 text-center">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
          Time's up · {diffLabel}
        </p>
        <p className="text-6xl font-bold text-gray-900 dark:text-white mb-1">{result.correct}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">correct answers</p>
      </div>

      <div className="w-full grid grid-cols-3 gap-3">
        {[
          { label: 'Wrong',    value: result.wrong.toString(), color: 'text-rose-500 dark:text-rose-400' },
          { label: 'Accuracy', value: `${accuracy}%`,          color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Per min',  value: ppm.toFixed(1),          color: 'text-violet-600 dark:text-violet-400' },
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

// ── Root component ────────────────────────────────────────────────────────────

export default function SpeedMaths() {
  const [screen,     setScreen]     = useState<Screen>('settings')
  const [cfg,        setCfg]        = useState<Config | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [result,     setResult]     = useState<GameResult | null>(null)

  const handleStart = useCallback((c: Config, d: Difficulty) => {
    setCfg(c); setDifficulty(d); setResult(null); setScreen('game')
  }, [])

  const handleDone = useCallback((r: GameResult) => {
    setResult(r); setScreen('results')
  }, [])

  const handleRestart = useCallback(() => { setResult(null); setScreen('settings') }, [])

  return (
    <div className="max-w-lg mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Speed Maths</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Solve as many arithmetic problems as you can before time runs out.</p>
      </div>

      {screen === 'settings' && <SettingsScreen onStart={handleStart} />}
      {screen === 'game'     && cfg && <GameScreen key={Date.now()} cfg={cfg} difficulty={difficulty} onDone={handleDone} />}
      {screen === 'results'  && result && <ResultsScreen result={result} onRestart={handleRestart} />}
    </div>
  )
}
