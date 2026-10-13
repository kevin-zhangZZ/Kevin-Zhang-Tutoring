import { useEffect, useRef, useState } from 'react'
import { angles } from '../../tools/unit-circle/data'
import { useInView, useReducedMotion } from '../../components/motion/Reveal'

// Small live versions of each tool for the Home grid. Each one is the tool's own idea in miniature
// (not a picture of it), loops only while on screen, and holds still for reduced-motion visitors.

const minus = (s: string) => s.replace(/–/g, '−')
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

/** Runs `step` every `ms` while the element is on screen and motion is allowed. */
function useTicker(ms: number) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduce = useReducedMotion()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!inView || reduce) return
    const id = setInterval(() => setTick(t => t + 1), ms)
    return () => clearInterval(id)
  }, [inView, reduce, ms])
  return [ref, tick] as const
}

// ── Unit Circle: the radius hops between key angles, with cos and sin drawn on the axes ──

const UC_ORDER = [2, 5, 7, 9, 12, 14, 1, 4, 6, 10, 13, 15, 3, 8, 11, 0]

export function UnitCirclePreview() {
  const [wrap, tick] = useTicker(1800)
  const reduce = useReducedMotion()
  const a = angles[UC_ORDER[(reduce ? 0 : tick) % UC_ORDER.length]]
  const S = 200, c = S / 2, R = 72
  // The point glides to the new angle; the geometry is drawn from refs, not React state.
  const radius = useRef<SVGLineElement>(null), cosLine = useRef<SVGLineElement>(null), sinLine = useRef<SVGLineElement>(null)
  const dot = useRef<SVGCircleElement>(null), arc = useRef<SVGPathElement>(null)
  const from = useRef(a.rad)
  useEffect(() => {
    const target = a.rad
    let start = from.current
    // Always turn anticlockwise, the way angles are measured.
    if (target < start) start -= 2 * Math.PI
    const t0 = performance.now(), dur = reduce ? 0 : 700
    let raf = 0
    const draw = (now: number) => {
      const k = dur ? Math.min(1, (now - t0) / dur) : 1
      const th = start + (target - start) * ease(k)
      const x = c + R * Math.cos(th), y = c - R * Math.sin(th)
      radius.current?.setAttribute('x2', `${x}`); radius.current?.setAttribute('y2', `${y}`)
      dot.current?.setAttribute('cx', `${x}`); dot.current?.setAttribute('cy', `${y}`)
      cosLine.current?.setAttribute('x2', `${x}`)
      sinLine.current?.setAttribute('x1', `${x}`); sinLine.current?.setAttribute('x2', `${x}`); sinLine.current?.setAttribute('y2', `${y}`)
      const th0 = ((th % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
      const r = 20, ex = c + r * Math.cos(th0), ey = c - r * Math.sin(th0)
      arc.current?.setAttribute('d', th0 < 0.01 ? '' : `M ${c + r} ${c} A ${r} ${r} 0 ${th0 > Math.PI ? 1 : 0} 0 ${ex} ${ey}`)
      if (k < 1) raf = requestAnimationFrame(draw)
      else from.current = target
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [a, reduce]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={wrap} className="flex items-center gap-5">
      <svg viewBox={`0 0 ${S} ${S}`} className="w-40 sm:w-44 shrink-0 text-gray-900 dark:text-gray-100" aria-hidden>
        <line x1={10} y1={c} x2={S - 10} y2={c} stroke="currentColor" strokeOpacity="0.15" />
        <line x1={c} y1={10} x2={c} y2={S - 10} stroke="currentColor" strokeOpacity="0.15" />
        <circle cx={c} cy={c} r={R} fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
        {angles.map((p, i) => <circle key={i} cx={c + R * p.cosN} cy={c - R * p.sinN} r={2.2} fill="currentColor" fillOpacity="0.35" />)}
        <path ref={arc} fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
        <line ref={cosLine} x1={c} y1={c} x2={c} y2={c} stroke="var(--color-cos)" strokeWidth="3" strokeLinecap="round" />
        <line ref={sinLine} x1={c} y1={c} x2={c} y2={c} stroke="var(--color-sin)" strokeWidth="3" strokeLinecap="round" />
        <line ref={radius} x1={c} y1={c} x2={c} y2={c} stroke="currentColor" strokeWidth="1.6" />
        <circle ref={dot} cx={c} cy={c} r={5} className="fill-blue-600 dark:fill-blue-400" />
      </svg>
      <dl className="min-w-0 font-mono text-sm leading-7 tabular-nums whitespace-nowrap" aria-hidden>
        <div className="text-2xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-1 whitespace-nowrap">θ = {a.radLabel}</div>
        <div><dt className="inline font-semibold" style={{ color: 'var(--color-cos)' }}>cos θ</dt> <dd className="inline text-gray-700 dark:text-gray-300">= {minus(a.cosLabel)}</dd></div>
        <div><dt className="inline font-semibold" style={{ color: 'var(--color-sin)' }}>sin θ</dt> <dd className="inline text-gray-700 dark:text-gray-300">= {minus(a.sinLabel)}</dd></div>
      </dl>
    </div>
  )
}

// ── Speed Maths: a question, an answer typed in, a tick, the next question ──

const SPEED = ['7 × 8', '144 ÷ 12', '63 + 59', '91 − 38', '13 × 14', '84 ÷ 7', '125 + 76', '15 × 6']
const solve = (q: string) => {
  const [a, op, b] = q.split(' ')
  const x = Number(a), y = Number(b)
  return op === '×' ? x * y : op === '÷' ? x / y : op === '+' ? x + y : x - y
}

export function SpeedPreview() {
  // Each question takes 6 ticks: shown, then the answer typed digit by digit, then a tick mark.
  const [wrap, tick] = useTicker(260)
  const reduce = useReducedMotion()
  const n = reduce ? 0 : Math.floor(tick / 7)
  const phase = reduce ? 6 : tick % 7
  const q = SPEED[n % SPEED.length]
  const ans = String(solve(q))
  const typed = ans.slice(0, Math.max(0, phase - 1))
  const done = phase >= 5 && typed === ans
  return (
    <div ref={wrap} className="flex flex-col items-center justify-center gap-2 py-2" aria-hidden>
      <div key={n} className="slide-up-in font-display text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums">
        {q} =
      </div>
      <div className={`min-w-[5ch] text-center font-display text-3xl font-bold tabular-nums border-b-2 pb-0.5 transition-colors ${done ? 'border-emerald-400 text-emerald-300' : 'border-blue-400 text-white'}`}>
        {typed || <span className="opacity-30">?</span>}
        {done && <span className="ml-2 text-emerald-300">✓</span>}
      </div>
    </div>
  )
}

// ── Exam Analysis: marks by topic, the bars growing in as it scrolls into view ──

// Illustrative bar lengths only (no numbers are shown): the tool itself has the real figures.
const TOPICS: Array<[string, number]> = [['Calculus', 38], ['Functions', 27], ['Probability', 22], ['Algebra', 13]]

export function AnalysisPreview() {
  const [wrap, inView] = useInView<HTMLDivElement>()
  const max = Math.max(...TOPICS.map(t => t[1]))
  return (
    <div ref={wrap} className="flex flex-col gap-2" aria-hidden>
      {TOPICS.map(([name, v], i) => (
        <div key={name} className="grid grid-cols-[5.5rem_1fr] items-center gap-3 text-xs">
          <span className="text-gray-600 dark:text-gray-400">{name}</span>
          <span className="h-3 rounded-full bg-blue-600 dark:bg-blue-500 origin-left transition-transform duration-1000 ease-out"
            style={{ width: `${(v / max) * 100}%`, transform: inView ? 'scaleX(1)' : 'scaleX(0.05)', transitionDelay: `${i * 90}ms` }} />
        </div>
      ))}
    </div>
  )
}

// ── Study Score: two exam marks become one score on the distribution ──

export function StudyScorePreview() {
  const [wrap, inView] = useInView<HTMLDivElement>()
  const reduce = useReducedMotion()
  const W = 220, H = 80
  const y = (x: number) => H - 6 - (H - 16) * Math.exp(-Math.pow((x - 0.5) / 0.17, 2))
  const d = Array.from({ length: 41 }, (_, i) => i / 40).map((x, i) => `${i ? 'L' : 'M'} ${x * W} ${y(x)}`).join(' ')
  // The marker glides back and forth along the curve: x eases between the tails, and the dot's
  // height is the curve's at that x on every frame, so it rides the curve rather than cutting across.
  const line = useRef<SVGLineElement>(null), dot = useRef<SVGCircleElement>(null)
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const place = (x: number) => {
      const px = `${x * W}`
      line.current?.setAttribute('x1', px); line.current?.setAttribute('x2', px)
      dot.current?.setAttribute('cx', px); dot.current?.setAttribute('cy', `${y(x)}`)
    }
    const draw = (now: number) => {
      place(0.52 + 0.33 * Math.sin((now - t0) / 1600 + 0.5))
      if (inView && !reduce) raf = requestAnimationFrame(draw)
    }
    if (reduce) place(0.68)
    else raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div ref={wrap} aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20 text-gray-900 dark:text-gray-100 overflow-visible">
        <path d={`${d} L ${W} ${H} L 0 ${H} Z`} className="fill-blue-600/10 dark:fill-blue-400/15" />
        <path d={d} fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
        <line ref={line} x1={0.68 * W} x2={0.68 * W} y1={0} y2={H} className="stroke-blue-600/40 dark:stroke-blue-400/40" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle ref={dot} cx={0.68 * W} cy={y(0.68)} r={5.5} className="fill-blue-600 dark:fill-blue-400 stroke-white dark:stroke-gray-950" strokeWidth="2" />
      </svg>
      <div className="flex justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-1"><span>lower</span><span>higher</span></div>
    </div>
  )
}

// ── Skip Guide: a paper's questions, the ones to skip greyed out ──

const SKIP: Array<'ok' | 'skip' | 'tip'> = ['ok', 'ok', 'skip', 'ok', 'tip', 'ok', 'ok', 'skip', 'ok', 'ok', 'ok', 'tip', 'ok', 'skip', 'ok', 'ok', 'ok', 'ok', 'tip', 'ok']

export function SkipPreview() {
  return (
    <div className="grid grid-cols-5 gap-1.5" aria-hidden>
      {SKIP.map((s, i) => (
        <span key={i} className={`grid place-items-center h-8 rounded-md text-[11px] font-semibold tabular-nums ${
          s === 'skip' ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-400 dark:text-rose-500 line-through'
          : s === 'tip' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
        }`}>
          {i + 1}
        </span>
      ))}
    </div>
  )
}

// ── Demonstrations: a square pyramid turning slowly, with its prism outline ──

const PYR: Array<[number, number, number]> = [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1], [0, 1, 0]]
const PYR_EDGES: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [2, 4], [3, 4]]
const BOX: Array<[number, number, number]> = [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1], [-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]]
const BOX_EDGES: Array<[number, number]> = [[4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]

export function DemoPreview() {
  const [wrap, inView] = useInView<HTMLDivElement>()
  const reduce = useReducedMotion()
  const pyr = useRef<SVGPathElement>(null), box = useRef<SVGPathElement>(null)
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const draw = (now: number) => {
      const th = 0.6 + (reduce ? 0 : (now - t0) / 3200)
      const cos = Math.cos(th), sin = Math.sin(th), tilt = 0.42
      const P = ([x, y, z]: [number, number, number]) => {
        const rx = x * cos - z * sin, rz = x * sin + z * cos
        const ry = y * Math.cos(tilt) - rz * Math.sin(tilt)
        return [100 + rx * 52, 82 - ry * 52]
      }
      const path = (pts: Array<[number, number, number]>, edges: Array<[number, number]>) =>
        edges.map(([a, b]) => { const p = P(pts[a]), q = P(pts[b]); return `M ${p[0]} ${p[1]} L ${q[0]} ${q[1]}` }).join(' ')
      pyr.current?.setAttribute('d', path(PYR, PYR_EDGES))
      box.current?.setAttribute('d', path(BOX, [...PYR_EDGES.slice(0, 4), ...BOX_EDGES]))
      if (inView && !reduce) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce])
  return (
    <div ref={wrap} aria-hidden>
      <svg viewBox="0 0 200 170" className="w-full max-w-[220px] mx-auto text-gray-900 dark:text-gray-100">
        <path ref={box} fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="4 4" />
        <path ref={pyr} fill="none" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
