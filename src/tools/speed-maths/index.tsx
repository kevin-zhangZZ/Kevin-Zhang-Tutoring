import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { ref, push, query, orderByChild, limitToLast, onValue } from 'firebase/database'
import { db } from '../../lib/firebase'

// ── Types ─────────────────────────────────────────────────────────────────────

type Op     = 'add' | 'sub' | 'mul' | 'div'
type Screen = 'name' | 'settings' | 'game' | 'results'
type Flash  = 'correct' | 'wrong' | null

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

interface GameResult {
  correct: number
  wrong: number
  duration: number
  ops: string       // formatted label stored in Firebase
}

interface LeaderboardEntry {
  id?: string
  name: string
  score: number     // raw correct count
  ppm: number       // correct per minute (sort key)
  duration: number  // seconds played
  ops: string       // e.g. "+/−/×/÷"
  timestamp: number
}

// ── Constants ─────────────────────────────────────────────────────────────────

const NAME_KEY = 'sm-player-name'
const DURATIONS = [30, 60, 90, 120, 180, 300]

const OP_SYMBOLS: Record<Op, string> = {
  add: '+', sub: '−', mul: '×', div: '÷',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function genQuestion(cfg: Config): Question {
  const ops = [...cfg.ops]
  const op  = ops[Math.floor(Math.random() * ops.length)] as Op
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
  const a = randInt(cfg.mulMin1, cfg.mulMax1), b = randInt(cfg.mulMin2, cfg.mulMax2)
  return { text: `${a * b} ÷ ${a}`, answer: b }
}

function formatOps(ops: Set<Op>): string {
  return (['add', 'sub', 'mul', 'div'] as Op[])
    .filter(o => ops.has(o))
    .map(o => OP_SYMBOLS[o])
    .join('/')
}

function fmtDuration(s: number): string {
  return s < 60 ? `${s}s` : `${s / 60}m`
}

// ── Firebase leaderboard ──────────────────────────────────────────────────────

async function submitScore(entry: Omit<LeaderboardEntry, 'id'>): Promise<void> {
  if (!db) return
  try {
    await push(ref(db, 'leaderboard'), entry)
  } catch (e) {
    console.warn('Failed to submit score:', e)
  }
}

function useLeaderboard(): { entries: LeaderboardEntry[]; loading: boolean } {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) { setLoading(false); return }
    const q = query(ref(db, 'leaderboard'), orderByChild('ppm'), limitToLast(10))
    const unsub = onValue(
      q,
      snap => {
        const rows: LeaderboardEntry[] = []
        snap.forEach(child => {
          rows.push({ id: child.key ?? '', ...child.val() as LeaderboardEntry })
        })
        // reverse so highest ppm is first
        setEntries(rows.reverse())
        setLoading(false)
      },
      () => setLoading(false),
    )
    return () => unsub()
  }, [])

  return { entries, loading }
}

// ── NumInput ──────────────────────────────────────────────────────────────────

interface NumInputProps {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}
function NumInput({ value, onChange, min = 1, max = 9999 }: NumInputProps) {
  const [raw, setRaw] = useState(String(value))
  useEffect(() => { setRaw(String(value)) }, [value])
  return (
    <input
      type="number"
      value={raw}
      min={min}
      max={max}
      onChange={e => {
        const s = e.target.value
        setRaw(s)
        const v = parseInt(s)
        if (!isNaN(v) && v >= min && v <= max) onChange(v)
      }}
      onBlur={() => {
        const v = parseInt(raw)
        if (isNaN(v) || v < min || v > max) setRaw(String(value))
      }}
      className="w-16 text-center text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1.5 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  )
}

// ── Difficulty presets ────────────────────────────────────────────────────────

type Difficulty = 'easy' | 'medium' | 'hard'

const PRESETS: Record<Difficulty, Config> = {
  easy: {
    ops:     new Set(['add', 'sub'] as Op[]),
    addMin1: 1,  addMax1: 20,
    addMin2: 1,  addMax2: 20,
    mulMin1: 2,  mulMax1: 5,
    mulMin2: 2,  mulMax2: 5,
    duration: 60,
  },
  medium: {
    ops:     new Set(['add', 'sub', 'mul', 'div'] as Op[]),
    addMin1: 2,  addMax1: 50,
    addMin2: 2,  addMax2: 50,
    mulMin1: 2,  mulMax1: 12,
    mulMin2: 2,  mulMax2: 10,
    duration: 60,
  },
  hard: {
    ops:     new Set(['add', 'sub', 'mul', 'div'] as Op[]),
    addMin1: 10, addMax1: 999,
    addMin2: 10, addMax2: 999,
    mulMin1: 3,  mulMax1: 15,
    mulMin2: 3,  mulMax2: 15,
    duration: 60,
  },
}

function cfgMatchesPreset(cfg: Config, preset: Config): boolean {
  if (cfg.duration !== preset.duration) return false
  if (cfg.ops.size !== preset.ops.size) return false
  for (const op of preset.ops) if (!cfg.ops.has(op)) return false
  for (const op of cfg.ops) if (!preset.ops.has(op)) return false
  const keys: (keyof Config)[] = ['addMin1','addMax1','addMin2','addMax2','mulMin1','mulMax1','mulMin2','mulMax2']
  return keys.every(k => cfg[k] === preset[k])
}

const OP_META: Record<Op, { label: string; color: string }> = {
  add: { label: 'Addition',       color: 'blue'   },
  sub: { label: 'Subtraction',    color: 'violet' },
  mul: { label: 'Multiplication', color: 'orange' },
  div: { label: 'Division',       color: 'rose'   },
}

// ── Leaderboard component ─────────────────────────────────────────────────────

function Leaderboard({ playerName }: { playerName: string }) {
  const { entries, loading } = useLeaderboard()

  if (!db) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
          🏆 Leaderboard
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Configure Firebase in <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">src/lib/firebase.ts</code> to enable the leaderboard.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          🏆 Leaderboard — Top 10
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">Ranked by /min</p>
      </div>

      {loading ? (
        <div className="px-5 py-6 space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-7 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <p className="px-5 py-6 text-sm text-center text-gray-400 dark:text-gray-500">
          No scores yet — be the first!
        </p>
      ) : (
        <div>
          {/* Header row */}
          <div className="grid grid-cols-[2rem_1fr_3.5rem_3.5rem_3.5rem] gap-x-3 px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
            <span>#</span>
            <span>Name</span>
            <span className="text-right">/min</span>
            <span className="text-right">Score</span>
            <span className="text-right">Time</span>
          </div>
          {entries.map((e, i) => {
            const isMe = e.name.toLowerCase() === playerName.toLowerCase()
            return (
              <div
                key={e.id ?? i}
                className={`grid grid-cols-[2rem_1fr_3.5rem_3.5rem_3.5rem] gap-x-3 px-4 py-2.5 text-sm items-center ${
                  i < entries.length - 1 ? 'border-b border-gray-50 dark:border-gray-800/60' : ''
                } ${isMe ? 'bg-blue-50 dark:bg-blue-950/30' : ''}`}
              >
                <span className={`font-semibold tabular-nums ${
                  i === 0 ? 'text-amber-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {i + 1}
                </span>
                <span className={`font-medium truncate ${isMe ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'}`}>
                  {e.name}{isMe && <span className="ml-1.5 text-xs font-normal opacity-60">you</span>}
                </span>
                <span className="text-right font-mono font-semibold tabular-nums text-violet-600 dark:text-violet-400">
                  {e.ppm.toFixed(1)}
                </span>
                <span className="text-right font-mono tabular-nums text-gray-600 dark:text-gray-400">
                  {e.score}
                </span>
                <span className="text-right text-xs text-gray-400 dark:text-gray-500">
                  {fmtDuration(e.duration)}
                </span>
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
    const trimmed = name.trim()
    if (!trimmed) return
    localStorage.setItem(NAME_KEY, trimmed)
    onDone(trimmed)
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">What's your name?</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {db ? 'Your name will appear on the leaderboard.' : 'Used to track your personal scores.'}
        </p>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={e => setName(e.target.value.slice(0, 20))}
        onKeyDown={e => e.key === 'Enter' && submit()}
        placeholder="Enter your name…"
        maxLength={20}
        className="w-full text-center text-xl font-semibold bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none transition-colors"
      />

      <button
        onClick={submit}
        disabled={!name.trim()}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-40 text-white font-semibold rounded-xl transition-colors text-sm"
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
  playerName: string
  onStart: (cfg: Config) => void
  onChangeName: () => void
}) {
  const [cfg, setCfg] = useState<Config>(PRESETS.medium)

  const toggleOp = (op: Op) =>
    setCfg(c => {
      const next = new Set(c.ops)
      if (next.has(op) && next.size === 1) return c
      next.has(op) ? next.delete(op) : next.add(op)
      return { ...c, ops: next }
    })

  const set = <K extends keyof Config>(k: K, v: Config[K]) =>
    setCfg(c => ({ ...c, [k]: v }))

  const activeDifficulty = useMemo<Difficulty | null>(() => {
    for (const [d, p] of Object.entries(PRESETS) as [Difficulty, Config][]) {
      if (cfgMatchesPreset(cfg, p)) return d
    }
    return null
  }, [cfg])

  const DIFF_STYLE: Record<Difficulty, { active: string; idle: string; label: string; sub: string }> = {
    easy:   { active: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700', idle: 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800', label: 'Easy',   sub: '+/− up to 20' },
    medium: { active: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700',                   idle: 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800', label: 'Medium', sub: 'All ops, ×tables' },
    hard:   { active: 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700',                   idle: 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800', label: 'Hard',   sub: 'Large numbers' },
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Player identity */}
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

      {/* Difficulty presets */}
      <div className="grid grid-cols-3 gap-3">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => {
          const s = DIFF_STYLE[d]
          const isActive = activeDifficulty === d
          return (
            <button
              key={d}
              onClick={() => setCfg({ ...PRESETS[d], ops: new Set(PRESETS[d].ops) })}
              className={`rounded-xl border px-3 py-3 text-left transition-colors ${isActive ? s.active : s.idle}`}
            >
              <p className="text-sm font-semibold">{s.label}</p>
              <p className="text-xs mt-0.5 opacity-70">{s.sub}</p>
            </button>
          )
        })}
      </div>

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
              {on && op === 'add' && (
                <div className="ml-12 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Range:</span><span>(</span>
                  <NumInput value={cfg.addMin1} onChange={v => set('addMin1', v)} />
                  <span>to</span>
                  <NumInput value={cfg.addMax1} onChange={v => set('addMax1', v)} />
                  <span>)</span><span className="font-bold text-gray-400">+</span><span>(</span>
                  <NumInput value={cfg.addMin2} onChange={v => set('addMin2', v)} />
                  <span>to</span>
                  <NumInput value={cfg.addMax2} onChange={v => set('addMax2', v)} />
                  <span>)</span>
                </div>
              )}
              {on && op === 'sub' && (
                <p className="ml-12 text-xs text-gray-400 dark:text-gray-500">Uses addition range (larger − smaller, always positive).</p>
              )}
              {on && op === 'mul' && (
                <div className="ml-12 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Range:</span><span>(</span>
                  <NumInput value={cfg.mulMin1} onChange={v => set('mulMin1', v)} />
                  <span>to</span>
                  <NumInput value={cfg.mulMax1} onChange={v => set('mulMax1', v)} />
                  <span>)</span><span className="font-bold text-gray-400">×</span><span>(</span>
                  <NumInput value={cfg.mulMin2} onChange={v => set('mulMin2', v)} />
                  <span>to</span>
                  <NumInput value={cfg.mulMax2} onChange={v => set('mulMax2', v)} />
                  <span>)</span>
                </div>
              )}
              {on && op === 'div' && (
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

      {/* Leaderboard */}
      <Leaderboard playerName={playerName} />
    </div>
  )
}

// ── Game screen ───────────────────────────────────────────────────────────────

function GameScreen({ cfg, onDone }: { cfg: Config; onDone: (r: GameResult) => void }) {
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
      onDone({
        correct:  correctRef.current,
        wrong:    wrongRef.current,
        duration: cfg.duration,
        ops:      formatOps(cfg.ops),
      })
    }
  }, [timeLeft, cfg.duration, cfg.ops, onDone])

  const nextQuestion = useCallback(() => {
    setInput(''); setFlash(null)
    setQuestion(genQuestion(cfg))
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [cfg])

  const handleInput = useCallback((val: string) => {
    setInput(val)
    const parsed = parseInt(val)
    if (isNaN(parsed)) return
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

function ResultsScreen({
  result,
  playerName,
  onRestart,
}: {
  result: GameResult
  playerName: string
  onRestart: () => void
}) {
  const total    = result.correct + result.wrong
  const accuracy = total === 0 ? 0 : Math.round(result.correct / total * 100)
  const ppm      = result.correct / result.duration * 60

  const [submitState, setSubmitState] = useState<'idle' | 'done' | 'error'>('idle')
  const [rank, setRank] = useState<number | null>(null)

  useEffect(() => {
    if (!db) { setSubmitState('idle'); return }

    const entry: Omit<LeaderboardEntry, 'id'> = {
      name:      playerName,
      score:     result.correct,
      ppm:       parseFloat(ppm.toFixed(2)),
      duration:  result.duration,
      ops:       result.ops,
      timestamp: Date.now(),
    }

    submitScore(entry)
      .then(() => {
        setSubmitState('done')
        // Check rank: read top 10 once to find position
        const q = query(ref(db!, 'leaderboard'), orderByChild('ppm'), limitToLast(10))
        onValue(q, snap => {
          const rows: number[] = []
          snap.forEach(child => { rows.push(child.val().ppm as number) })
          const sorted = rows.sort((a, b) => b - a)
          const pos = sorted.findIndex(p => p <= entry.ppm) + 1
          if (pos > 0 && pos <= 10) setRank(pos)
        }, { onlyOnce: true })
      })
      .catch(() => setSubmitState('error'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-6 py-8 text-center">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Time's up!</p>
        <p className="text-6xl font-bold text-gray-900 dark:text-white mb-1">{result.correct}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">correct answers</p>

        {/* Leaderboard submission feedback */}
        {db && (
          <div className="mt-4">
            {submitState === 'idle' && (
              <p className="text-xs text-gray-400 dark:text-gray-500">Submitting score…</p>
            )}
            {submitState === 'done' && rank !== null && (
              <p className="text-sm font-semibold text-amber-500">🏆 You ranked #{rank} on the leaderboard!</p>
            )}
            {submitState === 'done' && rank === null && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400">✓ Score submitted</p>
            )}
            {submitState === 'error' && (
              <p className="text-xs text-rose-500">Could not submit score — check your connection.</p>
            )}
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-3 gap-3">
        {[
          { label: 'Wrong',    value: result.wrong.toString(),      color: 'text-rose-500 dark:text-rose-400' },
          { label: 'Accuracy', value: `${accuracy}%`,               color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Per min',  value: ppm.toFixed(1),               color: 'text-violet-600 dark:text-violet-400' },
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
  const [playerName, setPlayerName] = useState<string>(
    () => localStorage.getItem(NAME_KEY) ?? ''
  )
  const [screen, setScreen] = useState<Screen>(
    () => localStorage.getItem(NAME_KEY) ? 'settings' : 'name'
  )
  const [cfg,    setCfg]    = useState<Config | null>(null)
  const [result, setResult] = useState<GameResult | null>(null)

  const handleName = useCallback((name: string) => {
    setPlayerName(name)
    setScreen('settings')
  }, [])

  const handleStart = useCallback((c: Config) => {
    setCfg(c); setResult(null); setScreen('game')
  }, [])

  const handleDone = useCallback((r: GameResult) => {
    setResult(r); setScreen('results')
  }, [])

  const handleRestart = useCallback(() => {
    setResult(null); setScreen('settings')
  }, [])

  const handleChangeName = useCallback(() => {
    setScreen('name')
  }, [])

  return (
    <div className="max-w-lg mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Speed Maths</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Solve as many arithmetic problems as you can before time runs out.
        </p>
      </div>

      {screen === 'name'     && <NameScreen     initial={playerName} onDone={handleName} />}
      {screen === 'settings' && <SettingsScreen playerName={playerName} onStart={handleStart} onChangeName={handleChangeName} />}
      {screen === 'game'     && cfg    && <GameScreen    key={Date.now()} cfg={cfg} onDone={handleDone} />}
      {screen === 'results'  && result && <ResultsScreen result={result} playerName={playerName} onRestart={handleRestart} />}
    </div>
  )
}
