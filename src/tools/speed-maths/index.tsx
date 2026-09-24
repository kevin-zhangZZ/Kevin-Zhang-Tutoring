import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Op     = 'add' | 'sub' | 'mul' | 'div'
type Level  = 'easy' | 'medium' | 'hard'
type Pick   = Level | 'custom'
type Focus  = 'mixed' | 'tables' | 'addsub' | 'bigmul'
type Screen = 'settings' | 'game' | 'results'
type Flash  = 'correct' | 'wrong' | null

type Range = [number, number]
type Ops   = Record<Op, boolean>
/** + and − share one range. × uses mulA × mulB; ÷ shows (a×b) ÷ a, so mulA is the divisor and mulB the answer. */
interface Ranges { add: Range; mulA: Range; mulB: Range }

interface Config { ops: Ops; ranges: Ranges; duration: number }

/** What the settings screen remembers between rounds (and visits). */
interface Setup {
  focus:    Focus
  level:    Pick
  /** The last Easy / Medium / Hard picked — used again when switching focus. */
  base:     Level
  ops:      Ops
  /** Custom ranges are remembered per focus. */
  customs:  Partial<Record<Focus, { ranges: Ranges; ops: Ops }>>
  duration: number
}

interface Question { text: string; answer: number; op: Op }

interface Answered { text: string; answer: number; op: Op; ms: number }
interface WrongTry { text: string; answer: number; typed: number }

interface GameResult {
  correct:    number
  wrong:      number
  duration:   number
  /** Seconds actually played (less than `duration` if the round was ended early). */
  elapsed:    number
  endedEarly: boolean
  /** What was practised, e.g. "Times Tables · Hard". */
  label:      string
  /** Which best score this round counts towards. */
  bestKey:    string
  answered:   Answered[]
  wrongs:     WrongTry[]
}

// ── Presets ───────────────────────────────────────────────────────────────────

const OPS: Op[] = ['add', 'sub', 'mul', 'div']
const SYM: Record<Op, string> = { add: '+', sub: '−', mul: '×', div: '÷' }
const OP_NAME: Record<Op, string> = { add: 'Add', sub: 'Subtract', mul: 'Multiply', div: 'Divide' }
const onlyOps = (...on: Op[]): Ops => ({ add: on.includes('add'), sub: on.includes('sub'), mul: on.includes('mul'), div: on.includes('div') })
const ALL_ON = onlyOps('add', 'sub', 'mul', 'div')

const LEVELS: Level[] = ['easy', 'medium', 'hard']
const PICKS: Pick[] = ['easy', 'medium', 'hard', 'custom']
const PICK_LABEL: Record<Pick, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard', custom: 'Custom' }

const MIXED: Record<Level, Ranges> = {
  easy:   { add: [2, 100],  mulA: [2, 12],  mulB: [2, 100] },
  medium: { add: [50, 150], mulA: [7, 15],  mulB: [12, 100] },
  hard:   { add: [50, 250], mulA: [12, 25], mulB: [12, 100] },
}

// What to practise. Every focus has its own Easy / Medium / Hard; the ranges of operations a focus
// leaves switched off stay as Mixed's, so switching them back on gives sensible numbers.
const FOCUS: Record<Focus, { name: string; ops: Ops; levels: Record<Level, Ranges> }> = {
  mixed:  { name: 'Mixed', ops: ALL_ON, levels: MIXED },
  tables: { name: 'Times Tables', ops: onlyOps('mul', 'div'), levels: {
    easy:   { ...MIXED.easy,   mulA: [2, 10], mulB: [2, 10] },
    medium: { ...MIXED.medium, mulA: [2, 12], mulB: [2, 12] },
    hard:   { ...MIXED.hard,   mulA: [2, 15], mulB: [2, 15] },
  } },
  addsub: { name: 'Add & Subtract', ops: onlyOps('add', 'sub'), levels: {
    easy:   { ...MIXED.easy,   add: [2, 50] },
    medium: { ...MIXED.medium, add: [10, 99] },
    hard:   { ...MIXED.hard,   add: [100, 999] },
  } },
  bigmul: { name: 'Big Multiplication', ops: onlyOps('mul'), levels: {
    easy:   { ...MIXED.easy,   mulA: [11, 15], mulB: [11, 20] },
    medium: { ...MIXED.medium, mulA: [11, 20], mulB: [11, 50] },
    hard:   { ...MIXED.hard,   mulA: [12, 25], mulB: [12, 99] },
  } },
}
const FOCUSES: Focus[] = ['mixed', 'tables', 'addsub', 'bigmul']

// Colour per pick: the selector segment, its dot, and the selected focus tile.
const TONE: Record<Pick, { seg: string; dot: string; tile: string; title: string }> = {
  easy: {
    seg:   'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 ring-[1.5px] ring-inset ring-emerald-400',
    dot:   'bg-emerald-400',
    tile:  'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40',
    title: 'text-emerald-800 dark:text-emerald-200',
  },
  medium: {
    seg:   'bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 ring-[1.5px] ring-inset ring-blue-400',
    dot:   'bg-blue-400',
    tile:  'border-blue-400 bg-blue-50 dark:bg-blue-950/40',
    title: 'text-blue-800 dark:text-blue-200',
  },
  hard: {
    seg:   'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 ring-[1.5px] ring-inset ring-rose-400',
    dot:   'bg-rose-400',
    tile:  'border-rose-400 bg-rose-50 dark:bg-rose-950/40',
    title: 'text-rose-800 dark:text-rose-200',
  },
  custom: {
    seg:   'bg-violet-50 dark:bg-violet-950/50 text-violet-800 dark:text-violet-200 ring-[1.5px] ring-inset ring-violet-400',
    dot:   'bg-violet-400',
    tile:  'border-violet-400 bg-violet-50 dark:bg-violet-950/40',
    title: 'text-violet-800 dark:text-violet-200',
  },
}

// The biggest number a range can take, so every answer fits the game's 6-digit answer box.
const MAX_ADD = 9999
const MAX_FACTOR = 999

const DURATIONS = [30, 60, 90, 120, 180, 300]
const durationLabel = (d: number) => (d < 60 ? `${d}s` : `${d / 60}m`)

const DEFAULT_SETUP: Setup = { focus: 'mixed', level: 'easy', base: 'easy', ops: ALL_ON, customs: {}, duration: 120 }

const glyphs = (o: Ops) => OPS.filter(op => o[op]).map(op => SYM[op]).join(' ')
const sameOps = (a: Ops, b: Ops) => OPS.every(o => a[o] === b[o])

function rangesOf(s: Setup): Ranges {
  const custom = s.level === 'custom' ? s.customs[s.focus] : undefined
  return custom ? custom.ranges : FOCUS[s.focus].levels[s.level === 'custom' ? s.base : s.level]
}

/** e.g. "Hard", "Times Tables · Medium", "Easy (+ − ×)" when an operation was switched off. */
function setupLabel(s: Setup) {
  const f = FOCUS[s.focus]
  const name = s.focus === 'mixed' ? PICK_LABEL[s.level] : `${f.name} · ${PICK_LABEL[s.level]}`
  return s.level !== 'custom' && !sameOps(s.ops, f.ops) ? `${name} (${glyphs(s.ops)})` : name
}

// Best scores are kept per exact setup + duration. Mixed at a preset keeps the "easy|120" style of key.
function setupBestKey(s: Setup) {
  const on = OPS.filter(o => s.ops[o]).join('+')
  if (s.level === 'custom') {
    const r = rangesOf(s)
    return `custom:${on}:${r.add}:${r.mulA}:${r.mulB}|${s.duration}`
  }
  const head = s.focus === 'mixed' ? s.level : `${s.focus}:${s.level}`
  return `${head}${sameOps(s.ops, FOCUS[s.focus].ops) ? '' : `:${on}`}|${s.duration}`
}

// ── Per-device memory: last settings, and the best score for each setup ──

const SETUP_KEY = 'sm-setup'
const OLD_SETTINGS_KEY = 'sm-settings'
const BEST_KEY = 'sm-best'

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback
  } catch {
    return fallback
  }
}
function writeJSON(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* not remembered */ }
}
const readBest = (key: string): number | undefined => readJSON<Record<string, number>>(BEST_KEY, {})[key]

function readSetup(): Setup {
  // Carry over the difficulty + duration saved by the previous version of this page.
  const old = readJSON<{ difficulty?: Level; duration?: number }>(OLD_SETTINGS_KEY, {})
  const fallback: Setup = {
    ...DEFAULT_SETUP,
    ...(old.difficulty && LEVELS.includes(old.difficulty) ? { level: old.difficulty, base: old.difficulty } : {}),
    ...(old.duration && DURATIONS.includes(old.duration) ? { duration: old.duration } : {}),
  }
  const s = readJSON<Setup>(SETUP_KEY, fallback)
  const valid = s.focus in FOCUS && PICKS.includes(s.level) && LEVELS.includes(s.base) && DURATIONS.includes(s.duration)
    && !!s.ops && OPS.some(o => s.ops[o]) && !!s.customs
  if (!valid) return fallback
  return s.level === 'custom' && !s.customs[s.focus] ? { ...s, level: s.base } : s
}

// ── Question generation ───────────────────────────────────────────────────────

function randInt([lo, hi]: Range) {
  const min = Math.min(lo, hi), max = Math.max(lo, hi)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function genQuestion(cfg: Config): Question {
  const on = OPS.filter(o => cfg.ops[o])
  const op = on[Math.floor(Math.random() * on.length)]
  const r = cfg.ranges
  if (op === 'add') {
    const a = randInt(r.add), b = randInt(r.add)
    return { text: `${a} + ${b}`, answer: a + b, op }
  }
  if (op === 'sub') {
    const a = randInt(r.add), b = randInt(r.add)
    const big = Math.max(a, b), small = Math.min(a, b)
    return { text: `${big} − ${small}`, answer: big - small, op }
  }
  if (op === 'mul') {
    const a = randInt(r.mulA), b = randInt(r.mulB)
    return { text: `${a} × ${b}`, answer: a * b, op }
  }
  // div — never by 0
  const a = Math.max(1, randInt(r.mulA)), b = randInt(r.mulB)
  return { text: `${a * b} ÷ ${a}`, answer: b, op }
}

/** True on touch screens, which get the on-screen keypad instead of the phone's own keyboard. */
function useCoarsePointer() {
  const [coarse, setCoarse] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const on = () => setCoarse(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return coarse
}

// ── Settings screen ───────────────────────────────────────────────────────────

// A number you tap to change: reads as text with a dashed underline, and becomes a field when focused.
function NumField({ value, max, label, onChange }: {
  value:    number
  max:      number
  label:    string
  onChange: (n: number) => void
}) {
  const [text, setText] = useState(String(value))
  const focused = useRef(false)
  useEffect(() => { if (!focused.current) setText(String(value)) }, [value])
  return (
    <input
      type="text" inputMode="numeric" autoComplete="off" aria-label={label} value={text}
      style={{ width: `${Math.max(1, text.length) + 0.6}ch` }}
      onFocus={e => { focused.current = true; const el = e.currentTarget; requestAnimationFrame(() => el.select()) }}
      onBlur={() => { focused.current = false; setText(String(value)) }}
      onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur() }}
      onChange={e => {
        const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, String(max).length)
        setText(digits)
        if (digits !== '' && Number(digits) <= max) onChange(Number(digits))
      }}
      className="font-mono text-sm text-center tabular-nums bg-transparent text-gray-900 dark:text-gray-100 border-b-[1.5px] border-dashed border-gray-300 dark:border-gray-600 rounded-t px-px py-0.5 cursor-text hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-blue-100 dark:focus:bg-blue-900/50 focus:border-solid focus:border-blue-500"
    />
  )
}

function RangeField({ range, max, label, onChange }: {
  range:    Range
  max:      number
  label:    string
  onChange: (r: Range) => void
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <NumField value={range[0]} max={max} label={`${label}, from`} onChange={n => onChange([n, range[1]])} />
      <span className="text-gray-400 dark:text-gray-500">–</span>
      <NumField value={range[1]} max={max} label={`${label}, to`} onChange={n => onChange([range[0], n])} />
    </span>
  )
}

function SettingsScreen({
  initial,
  onStart,
}: {
  initial: Setup
  onStart: (s: Setup) => void
}) {
  const [s, setS] = useState<Setup>(initial)
  const [blocked, setBlocked] = useState<Op | null>(null)
  const blockTimer = useRef<number>()
  useEffect(() => () => window.clearTimeout(blockTimer.current), [])

  const ranges = rangesOf(s)
  const best = readBest(setupBestKey(s))

  const pickLevel = (level: Pick) => setS(p => {
    if (level !== 'custom') return { ...p, level, base: level }
    const c = p.customs[p.focus] ?? { ranges: rangesOf(p), ops: p.ops }
    return { ...p, level, ops: c.ops, customs: { ...p.customs, [p.focus]: c } }
  })
  const pickFocus = (focus: Focus) => setS(p => (focus === p.focus ? p : { ...p, focus, ops: FOCUS[focus].ops, level: p.base }))
  const toggleOp = (op: Op) => {
    const ops = { ...s.ops, [op]: !s.ops[op] }
    if (!OPS.some(o => ops[o])) {
      setBlocked(op)
      window.clearTimeout(blockTimer.current)
      blockTimer.current = window.setTimeout(() => setBlocked(null), 1600)
      return
    }
    setS(p => ({ ...p, ops, customs: p.level === 'custom' ? { ...p.customs, [p.focus]: { ranges: rangesOf(p), ops } } : p.customs }))
  }
  // Changing a number makes this focus Custom.
  const editRange = (patch: Partial<Ranges>) => setS(p => ({
    ...p, level: 'custom', customs: { ...p.customs, [p.focus]: { ranges: { ...rangesOf(p), ...patch }, ops: p.ops } },
  }))

  // A sample question on each focus tile, at the level currently picked.
  const tileLevel = s.level === 'custom' ? s.base : s.level
  const examples = useMemo(() => Object.fromEntries(FOCUSES.map(f => [f, f === s.focus
    ? genQuestion({ ops: s.ops, ranges, duration: 0 }).text
    : genQuestion({ ops: FOCUS[f].ops, ranges: FOCUS[f].levels[tileLevel], duration: 0 }).text,
  ])) as Record<Focus, string>, [s.focus, s.ops, ranges, tileLevel])

  return (
    <div className="flex flex-col gap-5">

      {/* How hard */}
      <div role="radiogroup" aria-label="Difficulty" className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        {PICKS.map(l => {
          const on = s.level === l
          return (
            <button
              key={l}
              role="radio"
              aria-checked={on}
              onClick={() => pickLevel(l)}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-[9px] text-sm font-semibold transition-colors ${
                on ? TONE[l].seg : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className={`hidden min-[400px]:block w-2 h-2 rounded-full ${TONE[l].dot}`} />
              {PICK_LABEL[l]}
            </button>
          )
        })}
      </div>

      {/* What to practise */}
      <div>
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider mb-3">What to Practise</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {FOCUSES.map(f => {
            const on = s.focus === f
            return (
              <button
                key={f}
                onClick={() => pickFocus(f)}
                aria-pressed={on}
                className={`flex flex-col gap-1 min-h-[88px] rounded-xl border-2 px-3 py-2.5 text-left transition-colors ${
                  on ? TONE[s.level].tile : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <span className={`text-[13.5px] font-bold leading-tight ${on ? TONE[s.level].title : 'text-gray-900 dark:text-gray-100'}`}>{FOCUS[f].name}</span>
                <span className="text-[13px] font-bold tracking-[0.14em] text-gray-400 dark:text-gray-500">{glyphs(FOCUS[f].ops)}</span>
                <span className="mt-auto font-mono text-xs tabular-nums text-gray-500 dark:text-gray-400">{examples[f]}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Ranges: tap a symbol to switch that operation off, tap a number to change it */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        {([['add', 'sub'], ['mul', 'div']] as const).map((pair, i) => (
          <div key={pair[0]} className={`flex items-center gap-5 px-5 py-3 ${i > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}>
            <span className="flex gap-1.5 w-16 shrink-0">
              {pair.map(op => (
                <button
                  key={op}
                  onClick={() => toggleOp(op)}
                  aria-pressed={s.ops[op]}
                  aria-label={OP_NAME[op]}
                  title={`${OP_NAME[op]}: ${s.ops[op] ? 'on' : 'off'}`}
                  className={`w-[29px] h-[29px] grid place-items-center rounded-lg border-[1.5px] text-base font-bold leading-none transition-colors ${
                    blocked === op ? 'animate-[shake_0.32s]' : ''
                  } ${
                    s.ops[op]
                      ? 'border-transparent bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : 'border-dashed border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {SYM[op]}
                </button>
              ))}
            </span>
            <span className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm transition-opacity ${!s.ops[pair[0]] && !s.ops[pair[1]] ? 'opacity-40' : ''}`}>
              {i === 0 ? (
                <RangeField range={ranges.add} max={MAX_ADD} label="Numbers to add and subtract" onChange={add => editRange({ add })} />
              ) : (
                <>
                  <RangeField range={ranges.mulA} max={MAX_FACTOR} label="First factor" onChange={mulA => editRange({ mulA })} />
                  <span className="text-gray-400 dark:text-gray-500">×</span>
                  <RangeField range={ranges.mulB} max={MAX_FACTOR} label="Second factor" onChange={mulB => editRange({ mulB })} />
                </>
              )}
            </span>
          </div>
        ))}
        <p className={`px-5 py-2.5 border-t border-gray-100 dark:border-gray-800 text-xs ${blocked ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'}`}>
          {blocked ? 'Keep at least one operation switched on.' : 'Tap a symbol to switch it off. Tap a number to change it.'}
        </p>
      </div>

      {/* Duration */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider mb-3">Duration</p>
        <div className="flex flex-wrap gap-1.5">
          {DURATIONS.map(d => (
            <button
              key={d} onClick={() => setS(p => ({ ...p, duration: d }))}
              aria-pressed={s.duration === d}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                s.duration === d
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {durationLabel(d)}
            </button>
          ))}
        </div>
      </div>

      {/* Start */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onStart(s)}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          Start
        </button>
        {best !== undefined && (
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Your best on {setupLabel(s)} · {durationLabel(s.duration)}: <b className="text-gray-700 dark:text-gray-300">{best}</b>
          </p>
        )}
      </div>
    </div>
  )
}

// ── Game screen ───────────────────────────────────────────────────────────────

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'check'] as const

function GameScreen({ cfg, label, bestKey, onDone }: {
  cfg:     Config
  label:   string
  bestKey: string
  onDone:  (r: GameResult) => void
}) {
  const coarse = useCoarsePointer()
  const [timeLeft, setTimeLeft] = useState(cfg.duration)
  const [question, setQuestion] = useState<Question>(() => genQuestion(cfg))
  const [input,    setInput]    = useState('')
  const [flash,    setFlash]    = useState<Flash>(null)
  const [message,  setMessage]  = useState('')
  const [shakeKey, setShakeKey] = useState(0)
  const [correct,  setCorrect]  = useState(0)
  const [wrong,    setWrong]    = useState(0)
  const inputRef   = useRef<HTMLInputElement>(null)
  const doneRef    = useRef(false)
  const busyRef    = useRef(false)
  const shownAt    = useRef(performance.now())
  const log        = useRef<{ answered: Answered[]; wrongs: WrongTry[] }>({ answered: [], wrongs: [] })
  const counts     = useRef({ correct: 0, wrong: 0 })

  useEffect(() => { counts.current = { correct, wrong } }, [correct, wrong])

  const finish = useCallback((endedEarly: boolean, left: number) => {
    if (doneRef.current) return
    doneRef.current = true
    onDone({
      correct: counts.current.correct, wrong: counts.current.wrong,
      duration: cfg.duration, elapsed: cfg.duration - left, endedEarly, label, bestKey,
      answered: log.current.answered, wrongs: log.current.wrongs,
    })
  }, [cfg.duration, label, bestKey, onDone])

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(id); return 0 } return t - 1 })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) finish(false, 0)
  }, [timeLeft, finish])

  const nextQuestion = useCallback(() => {
    setInput(''); setFlash(null); setMessage('')
    // Avoid an immediate repeat — but only try a few times, since a tiny custom range may have just one question.
    setQuestion(q => { let n = genQuestion(cfg); for (let i = 0; i < 20 && n.text === q.text; i++) n = genQuestion(cfg); return n })
    shownAt.current = performance.now()
    busyRef.current = false
    if (!coarse) setTimeout(() => inputRef.current?.focus(), 0)
  }, [cfg, coarse])

  // A right answer moves on as soon as it's typed.
  const handleInput = useCallback((val: string) => {
    if (busyRef.current) return
    const digits = val.replace(/[^0-9]/g, '').slice(0, 6)
    setInput(digits)
    if (digits !== '' && Number(digits) === question.answer) {
      busyRef.current = true
      log.current.answered.push({ text: question.text, answer: question.answer, op: question.op, ms: performance.now() - shownAt.current })
      setCorrect(c => c + 1); setFlash('correct'); setMessage('')
      setTimeout(nextQuestion, 300)
    }
  }, [question, nextQuestion])

  // Enter (or Check) marks a wrong answer: it counts, the card shakes, and the box clears.
  const check = useCallback(() => {
    if (busyRef.current || input === '') return
    const typed = Number(input)
    if (typed === question.answer) return
    log.current.wrongs.push({ text: question.text, answer: question.answer, typed })
    setWrong(w => w + 1); setFlash('wrong'); setMessage(`Not ${typed}. Try again`)
    setShakeKey(k => k + 1)
    setInput('')
    setTimeout(() => setFlash(f => (f === 'wrong' ? null : f)), 450)
  }, [input, question])

  const pressKey = (k: typeof KEYS[number]) => {
    if (k === 'check') { check(); return }
    if (k === 'del') { if (!busyRef.current) setInput(v => v.slice(0, -1)); return }
    handleInput(input + k)
  }

  const pct = timeLeft / cfg.duration
  const barColor = pct > 0.5 ? 'bg-emerald-500' : pct > 0.25 ? 'bg-amber-500' : 'bg-rose-500'
  const mm = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const ss = (timeLeft % 60).toString().padStart(2, '0')

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-3.5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-lg font-semibold text-gray-800 dark:text-gray-200 tabular-nums">{mm}:{ss}</span>
          <div className="flex items-center gap-4 text-sm font-semibold tabular-nums">
            <span className="text-emerald-600 dark:text-emerald-400">✓ {correct}</span>
            <span className="text-rose-500 dark:text-rose-400">✗ {wrong}</span>
          </div>
        </div>
        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${barColor}`} style={{ width: `${pct * 100}%` }} />
        </div>
      </div>

      <div
        key={shakeKey}
        className={`flex flex-col items-center justify-center gap-4 sm:gap-5 ${coarse ? 'min-h-[150px] py-6' : 'min-h-[220px] py-10'} rounded-xl border-2 transition-colors duration-150 px-8 ${
          shakeKey ? 'animate-[shake_0.32s]' : ''
        } ${
          flash === 'correct' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
          : flash === 'wrong'  ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30'
          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
        }`}
      >
        <p className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white select-none">{question.text} =</p>
        {coarse ? (
          // Touch screens: the on-screen keypad types here, so the phone's keyboard stays closed.
          <p
            aria-live="polite"
            aria-label={`Your answer: ${input || 'empty'}`}
            className={`w-36 text-center text-2xl font-bold border-b-2 py-1 min-h-[44px] ${
              flash === 'correct' ? 'border-emerald-400 text-emerald-600 dark:text-emerald-400'
              : flash === 'wrong'  ? 'border-rose-400'
              : 'border-blue-500 text-gray-900 dark:text-white'
            }`}
          >
            {input || <span className="text-gray-300 dark:text-gray-600">?</span>}
          </p>
        ) : (
          <input
            ref={inputRef} autoFocus type="text" inputMode="numeric" autoComplete="off" value={input}
            aria-label="Your answer"
            onChange={e => handleInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') check() }}
            placeholder="?"
            className={`w-36 text-center text-2xl font-bold bg-transparent border-b-2 transition-colors duration-150 focus:outline-none py-1 ${
              flash === 'correct' ? 'border-emerald-400 text-emerald-600 dark:text-emerald-400'
              : flash === 'wrong'  ? 'border-rose-400 text-rose-600 dark:text-rose-400'
              : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500'
            }`}
          />
        )}
        <p className="text-sm h-5 text-rose-600 dark:text-rose-400 font-medium" aria-live="polite">{message}</p>
      </div>

      {coarse && (
        <div className="grid grid-cols-3 gap-2">
          {KEYS.map(k => (
            <button
              key={k}
              onClick={() => pressKey(k)}
              aria-label={k === 'del' ? 'Delete' : k === 'check' ? 'Check' : k}
              className={`h-14 rounded-xl text-xl font-semibold select-none active:scale-[0.97] transition-transform ${
                k === 'check' ? 'bg-blue-600 active:bg-blue-700 text-white text-base'
                : k === 'del' ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-base'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              {k === 'del' ? '⌫' : k === 'check' ? 'Check' : k}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
        <span>{coarse ? 'A right answer moves on by itself · Check marks a wrong one' : 'A right answer moves on by itself · Enter marks a wrong one'}</span>
        <button onClick={() => finish(true, timeLeft)} className="font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 whitespace-nowrap">
          End round
        </button>
      </div>
    </div>
  )
}

// ── Results screen ────────────────────────────────────────────────────────────

const OP_GROUP: Record<Op, 'addsub' | 'muldiv'> = { add: 'addsub', sub: 'addsub', mul: 'muldiv', div: 'muldiv' }
const fmt = (n: number) => n.toLocaleString('en-AU')
const secs = (ms: number) => `${(ms / 1000).toFixed(1)}s`

function ResultsScreen({ result, best, newBest, onReplay, onSettings }: {
  result:     GameResult
  best?:      number
  newBest:    boolean
  onReplay:   () => void
  onSettings: () => void
}) {
  const total    = result.correct + result.wrong
  const accuracy = total === 0 ? 0 : Math.round(result.correct / total * 100)
  const ppm      = result.elapsed > 0 ? result.correct / result.elapsed * 60 : 0
  const settingsLabel = `${result.label} · ${durationLabel(result.duration)}`

  // Review: each question answered wrong (first wrong try), the slowest one, and the average per operation type.
  const firstWrongs = result.wrongs.filter((w, i, all) => all.findIndex(x => x.text === w.text) === i)
  const slowest = result.answered.reduce<Answered | undefined>((s, a) => (!s || a.ms > s.ms ? a : s), undefined)
  const avg = (g: 'addsub' | 'muldiv') => {
    const xs = result.answered.filter(a => OP_GROUP[a.op] === g)
    return xs.length ? xs.reduce((t, a) => t + a.ms, 0) / xs.length : undefined
  }
  const addsub = avg('addsub'), muldiv = avg('muldiv')

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-6 py-8 text-center">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider mb-1">
          {result.endedEarly ? 'Round Ended' : 'Time’s Up'} · {settingsLabel}
        </p>
        <p className="text-6xl font-bold text-gray-900 dark:text-white mb-1">{result.correct}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">correct answers</p>
        {newBest ? (
          <p className="inline-block mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 rounded-full px-3 py-1">New best!</p>
        ) : best !== undefined ? (
          <p className="inline-block mt-3 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">Your best on {settingsLabel}: {best}</p>
        ) : null}
        {result.endedEarly && <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Rounds ended early don’t count towards your best.</p>}
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

      {(firstWrongs.length > 0 || slowest) && (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Review</p>
          <div className="flex flex-col gap-1.5 text-sm">
            {firstWrongs.map((w, i) => (
              <div key={i} className="flex justify-between gap-3">
                <span className="font-medium text-gray-900 dark:text-gray-100">{w.text} = {fmt(w.answer)}</span>
                <span className="text-rose-600 dark:text-rose-400">you typed {fmt(w.typed)}</span>
              </div>
            ))}
            {slowest && (
              <div className="flex justify-between gap-3">
                <span className="font-medium text-gray-900 dark:text-gray-100">{slowest.text} = {fmt(slowest.answer)}</span>
                <span className="text-amber-600 dark:text-amber-400">slowest · {secs(slowest.ms)}</span>
              </div>
            )}
            {(addsub !== undefined || muldiv !== undefined) && (
              <div className="flex justify-between gap-3 pt-1.5 mt-0.5 border-t border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">
                <span>Average time</span>
                <span>
                  {addsub !== undefined && <>+ and −: {secs(addsub)}</>}
                  {addsub !== undefined && muldiv !== undefined && ' · '}
                  {muldiv !== undefined && <>× and ÷: {secs(muldiv)}</>}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="w-full flex gap-3">
        <button
          onClick={onReplay}
          className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          Play again
        </button>
        <button
          onClick={onSettings}
          className="px-5 py-3.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold rounded-xl transition-colors text-sm"
        >
          Change settings
        </button>
      </div>
    </div>
  )
}

// ── Root component ────────────────────────────────────────────────────────────

export default function SpeedMaths() {
  const [screen,  setScreen]  = useState<Screen>('settings')
  const [setup,   setSetup]   = useState<Setup>(readSetup)
  const [round,   setRound]   = useState(0)
  const [result,  setResult]  = useState<GameResult | null>(null)
  const [best,    setBest]    = useState<number | undefined>()
  const [newBest, setNewBest] = useState(false)

  const start = useCallback((s: Setup) => {
    setSetup(s); writeJSON(SETUP_KEY, s)
    setResult(null); setRound(r => r + 1); setScreen('game')
  }, [])

  const handleDone = useCallback((r: GameResult) => {
    const old = readBest(r.bestKey)
    const beat = !r.endedEarly && r.correct > 0 && (old === undefined || r.correct > old)
    if (beat) writeJSON(BEST_KEY, { ...readJSON<Record<string, number>>(BEST_KEY, {}), [r.bestKey]: r.correct })
    // The first round on these settings sets the best without being called one.
    setBest(old === undefined ? undefined : beat ? r.correct : old)
    setNewBest(beat && old !== undefined)
    setResult(r); setScreen('results')
  }, [])

  const cfg = useMemo<Config>(() => ({ ops: setup.ops, ranges: rangesOf(setup), duration: setup.duration }), [setup])

  return (
    <div className="max-w-lg mx-auto px-5 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Speed Maths</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Solve as many arithmetic problems as you can before time runs out.</p>
      </div>

      {screen === 'settings' && <SettingsScreen initial={setup} onStart={start} />}
      {screen === 'game'     && <GameScreen key={round} cfg={cfg} label={setupLabel(setup)} bestKey={setupBestKey(setup)} onDone={handleDone} />}
      {screen === 'results'  && result && (
        <ResultsScreen
          result={result}
          best={best}
          newBest={newBest}
          onReplay={() => start(setup)}
          onSettings={() => setScreen('settings')}
        />
      )}
    </div>
  )
}
