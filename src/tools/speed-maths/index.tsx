import { useState, useEffect, useRef, useCallback } from 'react'
import { ref, push, query, orderByChild, limitToLast, onValue } from 'firebase/database'
import { db } from '../../lib/firebase'

// ── Types ─────────────────────────────────────────────────────────────────────

type Op         = 'add' | 'sub' | 'mul' | 'div'
type Difficulty = 'easy' | 'medium' | 'hard'
type Screen     = 'name' | 'settings' | 'game' | 'results'
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

interface LeaderboardEntry {
  id?:        string
  name:       string
  score:      number
  ppm:        number       // correct/min — sort key
  duration:   number
  difficulty: Difficulty
  timestamp:  number
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

// Readable description shown on the difficulty cards
const DIFF_META: Record<Difficulty, {
  label: string
  addDesc: string
  mulDesc: string
  active: string
  idle: string
}> = {
  easy: {
    label:   'Easy',
    addDesc: '+/−  2 – 100',
    mulDesc: '×/÷  2–12  ×  2–100',
    active:  'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200',
    idle:    'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60',
  },
  medium: {
    label:   'Medium',
    addDesc: '+/−  50 – 150',
    mulDesc: '×/÷  7–15  ×  12–100',
    active:  'border-blue-400 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200',
    idle:    'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60',
  },
  hard: {
    label:   'Hard',
    addDesc: '+/−  50 – 250',
    mulDesc: '×/÷  12–25  ×  12–100',
    active:  'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200',
    idle:    'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60',
  },
}

const DURATIONS = [30, 60, 90, 120, 180, 300]
const NAME_KEY  = 'sm-player-name'

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

function fmtDuration(s: number) { return s < 60 ? `${s}s` : `${s / 60}m` }

// ── Firebase ──────────────────────────────────────────────────────────────────

async function submitScore(entry: Omit<LeaderboardEntry, 'id'>): Promise<void> {
  if (!db) return
  try { await push(ref(db, `leaderboard/${entry.difficulty}`), entry) }
  catch (e) { console.warn('Failed to submit score:', e) }
}

function useLeaderboard(difficulty: Difficulty) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setEntries([])
    if (!db) { setLoading(false); return }
    const q = query(
      ref(db, `leaderboard/${difficulty}`),
      orderByChild('ppm'),
      limitToLast(10),
    )
    const unsub = onValue(
      q,
      snap => {
        const rows: LeaderboardEntry[] = []
        snap.forEach(c => rows.push({ id: c.key ?? '', ...c.val() as LeaderboardEntry }))
        setEntries(rows.reverse())   // highest ppm first
        setLoading(false)
      },
      () => setLoading(false),
    )
    return () => unsub()
  }, [difficulty])

  return { entries, loading }
}

// ── Leaderboard component ─────────────────────────────────────────────────────

function Leaderboard({ difficulty, playerName }: { difficulty: Difficulty; playerName: string }) {
  const { entries, loading } = useLeaderboard(difficulty)
  const m = DIFF_META[difficulty]

  if (!db) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">🏆 Leaderboard</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Configure Firebase in <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">src/lib/firebase.ts</code> to enable the leaderboard.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          🏆 {m.label} — Top 10
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">Ranked by /min</p>
      </div>

      {loading ? (
        <div className="px-5 py-5 space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-7 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <p className="px-5 py-6 text-sm text-center text-gray-400 dark:text-gray-500">
          No scores yet — be the first!
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-[2rem_1fr_3.5rem_3.5rem_3rem] gap-x-3 px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
            <span>#</span><span>Name</span>
            <span className="text-right">/min</span>
            <span className="text-right">Score</span>
            <span className="text-right">Time</span>
          </div>
          {entries.map((e, i) => {
            const isMe = e.name.toLowerCase() === playerName.toLowerCase()
            return (
              <div
                key={e.id ?? i}
                className={`grid grid-cols-[2rem_1fr_3.5rem_3.5rem_3rem] gap-x-3 px-4 py-2.5 text-sm items-center ${
                  i < entries.length - 1 ? 'border-b border-gray-50 dark:border-gray-800/60' : ''
                } ${isMe ? 'bg-blue-50 dark:bg-blue-950/30' : ''}`}
              >
                <span className={`font-semibold tabular-nums ${
                  i === 0 ? 'text-amber-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-gray-400 dark:text-gray-500'
                }`}>{i + 1}</span>
                <span className={`font-medium truncate ${isMe ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'}`}>
                  {e.name}{isMe && <span className="ml-1.5 text-xs font-normal opacity-60">you</span>}
                </span>
                <span className="text-right font-mono font-semibold tabular-nums text-violet-600 dark:text-violet-400">
                  {e.ppm.toFixed(1)}
                </span>
                <span className="text-right font-mono tabular-nums text-gray-600 dark:text-gray-400">{e.score}</span>
                <span className="text-right text-xs text-gray-400 dark:text-gray-500">{fmtDuration(e.duration)}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Name screen ───────────────────────────────────────────────────────────────

function NameScreen({ initial, onDone }: { initial: string; onDone: (name: string) => void }) {
  const [name, setName] = useState(initial)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { inputRef.current?.focus() }, [])

  const submit = () => {
    const t = name.trim(); if (!t) return
    localStorage.setItem(NAME_KEY, t); onDone(t)
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">What's your name?</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {db ? 'Your name will appear on the leaderboard.' : 'Used to track your scores.'}
        </p>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={e => setName(e.target.value.slice(0, 20))}
        onKeyDown={e => e.key === 'Enter' && submit()}
        placeholder="Enter your name…"
        className="w-full text-center text-xl font-semibold bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none transition-colors"
      />
      <button
        onClick={submit} disabled={!name.trim()}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-semibold rounded-xl transition-colors text-sm"
      >
        Let's go →
      </button>
    </div>
  )
}

// ── Settings screen ───────────────────────────────────────────────────────────

function SettingsScreen({
  playerName,
  onStart,
  onChangeName,
}: {
  playerName:   string
  onStart:      (cfg: Config, difficulty: Difficulty) => void
  onChangeName: () => void
}) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [duration,   setDuration]   = useState(120)

  const handleStart = () => {
    onStart({ ...RANGE_CONFIGS[difficulty], duration }, difficulty)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Player chip */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
            {playerName.charAt(0).toUpperCase()}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{playerName}</span>
        </div>
        <button
          onClick={onChangeName}
          className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Change name
        </button>
      </div>

      {/* Difficulty cards */}
      <div className="grid grid-cols-3 gap-3">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => {
          const m = DIFF_META[d]
          const active = difficulty === d
          return (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`rounded-xl border-2 px-3 py-3.5 text-left transition-colors ${active ? m.active : m.idle}`}
            >
              <p className="text-sm font-bold mb-2">{m.label}</p>
              <p className="text-xs leading-relaxed opacity-80 font-mono whitespace-pre-line">{m.addDesc}{'\n'}{m.mulDesc}</p>
            </button>
          )
        })}
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

      {/* Leaderboard */}
      <Leaderboard difficulty={difficulty} playerName={playerName} />
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

function ResultsScreen({ result, playerName, onRestart }: {
  result:     GameResult
  playerName: string
  onRestart:  () => void
}) {
  const total    = result.correct + result.wrong
  const accuracy = total === 0 ? 0 : Math.round(result.correct / total * 100)
  const ppm      = result.correct / result.duration * 60

  const [submitState, setSubmitState] = useState<'idle' | 'done' | 'error'>('idle')
  const [rank,        setRank]        = useState<number | null>(null)

  useEffect(() => {
    if (!db) { setSubmitState('idle'); return }
    const entry: Omit<LeaderboardEntry, 'id'> = {
      name:       playerName,
      score:      result.correct,
      ppm:        parseFloat(ppm.toFixed(2)),
      duration:   result.duration,
      difficulty: result.difficulty,
      timestamp:  Date.now(),
    }
    submitScore(entry)
      .then(() => {
        setSubmitState('done')
        const q = query(ref(db!, `leaderboard/${result.difficulty}`), orderByChild('ppm'), limitToLast(10))
        onValue(q, snap => {
          const ppms: number[] = []
          snap.forEach(c => ppms.push(c.val().ppm as number))
          const sorted = ppms.sort((a, b) => b - a)
          const pos = sorted.findIndex(p => p <= entry.ppm) + 1
          if (pos > 0 && pos <= 10) setRank(pos)
        }, { onlyOnce: true })
      })
      .catch(() => setSubmitState('error'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const diffLabel = DIFF_META[result.difficulty].label

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-6 py-8 text-center">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
          Time's up · {diffLabel}
        </p>
        <p className="text-6xl font-bold text-gray-900 dark:text-white mb-1">{result.correct}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">correct answers</p>
        {db && (
          <div className="mt-4">
            {submitState === 'idle' && <p className="text-xs text-gray-400">Submitting score…</p>}
            {submitState === 'done' && rank !== null && (
              <p className="text-sm font-semibold text-amber-500">🏆 #{rank} on the {diffLabel} leaderboard!</p>
            )}
            {submitState === 'done' && rank === null && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400">✓ Score submitted to {diffLabel} leaderboard</p>
            )}
            {submitState === 'error' && (
              <p className="text-xs text-rose-500">Could not submit — check your connection.</p>
            )}
          </div>
        )}
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
  const [playerName, setPlayerName] = useState(
    () => localStorage.getItem(NAME_KEY) ?? ''
  )
  const [screen,     setScreen]     = useState<Screen>(
    () => localStorage.getItem(NAME_KEY) ? 'settings' : 'name'
  )
  const [cfg,        setCfg]        = useState<Config | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [result,     setResult]     = useState<GameResult | null>(null)

  const handleName = useCallback((name: string) => {
    setPlayerName(name); setScreen('settings')
  }, [])

  const handleStart = useCallback((c: Config, d: Difficulty) => {
    setCfg(c); setDifficulty(d); setResult(null); setScreen('game')
  }, [])

  const handleDone = useCallback((r: GameResult) => {
    setResult(r); setScreen('results')
  }, [])

  const handleRestart  = useCallback(() => { setResult(null); setScreen('settings') }, [])
  const handleChangeName = useCallback(() => setScreen('name'), [])

  return (
    <div className="max-w-lg mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Speed Maths</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Solve as many arithmetic problems as you can before time runs out.</p>
      </div>

      {screen === 'name'     && <NameScreen     initial={playerName} onDone={handleName} />}
      {screen === 'settings' && <SettingsScreen playerName={playerName} onStart={handleStart} onChangeName={handleChangeName} />}
      {screen === 'game'     && cfg && <GameScreen key={Date.now()} cfg={cfg} difficulty={difficulty} onDone={handleDone} />}
      {screen === 'results'  && result && <ResultsScreen result={result} playerName={playerName} onRestart={handleRestart} />}
    </div>
  )
}
