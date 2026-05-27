import { useState, useEffect, useRef, useCallback } from 'react'
import Katex from '../../components/Katex'

// ── PRNG ──────────────────────────────────────────────────────────────────────
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}
function makeRng(s: string): () => number {
  const n = parseInt(s.trim(), 10)
  return s.trim() === '' ? Math.random : mulberry32(isNaN(n) ? 42 : n)
}

// ── Types ──────────────────────────────────────────────────────────────────────
type Depth = 'light' | 'medium' | 'heavy'
type DiceMode = 'die1' | 'dice2' | 'coin'
type SimId = 'intro' | 'buffon' | 'dartboard' | 'dice' | 'walk' | 'reflection'
interface CP { n: number; estimate: number }
type DiceOutcome =
  | { type: 'die1'; v: number }
  | { type: 'dice2'; d1: number; d2: number }
  | { type: 'coin'; h: boolean }

// ── Helpers ───────────────────────────────────────────────────────────────────
const getDark = () => document.documentElement.classList.contains('dark')

// ── StatsPanel ────────────────────────────────────────────────────────────────
function StatsPanel({ n, estimate, trueValue, label }: {
  n: number; estimate: number; trueValue: number; label: string
}) {
  const abs = Math.abs(estimate - trueValue)
  const rel = trueValue !== 0 ? (abs / Math.abs(trueValue)) * 100 : 0
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
      {[
        { l: 'n', v: n.toLocaleString() },
        { l: label, v: n === 0 ? '—' : estimate.toFixed(5) },
        { l: 'True value', v: trueValue.toFixed(5) },
        { l: '|error|', v: n === 0 ? '—' : abs.toFixed(5) },
        { l: '% error', v: n === 0 ? '—' : rel.toFixed(2) + '%' },
      ].map(s => (
        <div key={s.l} className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{s.l}</p>
          <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white">{s.v}</p>
        </div>
      ))}
    </div>
  )
}

// ── Depth Toggle ──────────────────────────────────────────────────────────────
function DepthToggle({ depth, setDepth }: { depth: Depth; setDepth: (d: Depth) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
      {(['light', 'medium', 'heavy'] as Depth[]).map(l => (
        <button key={l} onClick={() => setDepth(l)}
          className={`px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
            depth === l
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >{l}</button>
      ))}
    </div>
  )
}

// ── Collapsible parameters ────────────────────────────────────────────────────
function Params({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mb-4">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        <span className={`transition-transform duration-200 inline-block text-[10px] ${open ? 'rotate-90' : ''}`}>▶</span>
        Parameters
      </button>
      {open && (
        <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 items-end">
          {children}
        </div>
      )}
    </div>
  )
}

// ── Shared label style ────────────────────────────────────────────────────────
function PLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">{children}</label>
}

// ── Convergence chart ─────────────────────────────────────────────────────────
function drawConvergence(canvas: HTMLCanvasElement, data: CP[], trueValue: number, label: string) {
  const dk = getDark()
  const ctx = canvas.getContext('2d')!
  const W = canvas.width, H = canvas.height
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = dk ? '#1f2937' : '#f9fafb'; ctx.fillRect(0, 0, W, H)

  if (data.length < 2) {
    ctx.fillStyle = dk ? '#6b7280' : '#9ca3af'; ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('Run the simulation to see convergence', W / 2, H / 2); return
  }

  const pad = { t: 16, r: 16, b: 28, l: 48 }
  const pw = W - pad.l - pad.r, ph = H - pad.t - pad.b
  const ests = data.map(d => d.estimate)
  const minE = Math.min(...ests, trueValue), maxE = Math.max(...ests, trueValue)
  const span = maxE - minE || 1
  const yMin = minE - span * 0.12, yMax = maxE + span * 0.12
  const toX = (i: number) => pad.l + (i / (data.length - 1)) * pw
  const toY = (v: number) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * ph

  ctx.strokeStyle = dk ? '#374151' : '#e5e7eb'; ctx.lineWidth = 1
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (i / 4) * ph
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + pw, y); ctx.stroke()
    ctx.fillStyle = dk ? '#9ca3af' : '#6b7280'; ctx.font = '9px monospace'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'
    ctx.fillText((yMax - (i / 4) * (yMax - yMin)).toFixed(3), pad.l - 4, y)
  }

  const ty = toY(trueValue)
  ctx.setLineDash([4, 3]); ctx.strokeStyle = dk ? '#fbbf24' : '#d97706'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(pad.l, ty); ctx.lineTo(pad.l + pw, ty); ctx.stroke()
  ctx.setLineDash([])

  ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.5; ctx.beginPath()
  data.forEach((pt, i) => { const x = toX(i), y = toY(pt.estimate); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y) })
  ctx.stroke()

  ctx.fillStyle = dk ? '#9ca3af' : '#6b7280'; ctx.font = '9px sans-serif'
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  ctx.fillText(label, pad.l + pw / 2, H - 6)
}

// ── Die / coin drawing ────────────────────────────────────────────────────────
const DIE_DOTS: [number, number][][] = [
  [],
  [[.5, .5]],
  [[.3, .3], [.7, .7]],
  [[.3, .3], [.5, .5], [.7, .7]],
  [[.3, .3], [.7, .3], [.3, .7], [.7, .7]],
  [[.3, .3], [.7, .3], [.5, .5], [.3, .7], [.7, .7]],
  [[.3, .2], [.7, .2], [.3, .5], [.7, .5], [.3, .8], [.7, .8]],
]

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath()
}

function drawDie(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, v: number, hi: boolean, dk: boolean) {
  rrect(ctx, x, y, w, h, Math.min(w, h) * 0.18)
  ctx.fillStyle = hi ? (dk ? '#1e3a5f' : '#dbeafe') : (dk ? '#374151' : '#fff')
  ctx.strokeStyle = hi ? (dk ? '#60a5fa' : '#2563eb') : (dk ? '#6b7280' : '#e5e7eb')
  ctx.lineWidth = hi ? 2 : 1; ctx.fill(); ctx.stroke()
  const dr = Math.min(w, h) * 0.1
  ctx.fillStyle = dk ? '#e5e7eb' : '#111827'
  for (const [fx, fy] of (DIE_DOTS[v] ?? [])) {
    ctx.beginPath(); ctx.arc(x + fx * w, y + fy * h, dr, 0, Math.PI * 2); ctx.fill()
  }
}

function drawCoin(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, heads: boolean, dk: boolean) {
  const cx = x + w / 2, cy = y + h / 2, r = Math.min(w, h) / 2 - 2
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = heads ? (dk ? '#b45309' : '#fef08a') : (dk ? '#4b5563' : '#f3f4f6')
  ctx.fill(); ctx.strokeStyle = dk ? '#6b7280' : '#d1d5db'; ctx.lineWidth = 1; ctx.stroke()
  ctx.fillStyle = dk ? '#f9fafb' : '#374151'
  const fs = Math.max(8, Math.floor(Math.min(w, h) * 0.42))
  ctx.font = `bold ${fs}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(heads ? 'H' : 'T', cx, cy)
}

function drawDiceDiagram(canvas: HTMLCanvasElement, outcomes: DiceOutcome[]) {
  const dk = getDark()
  const ctx = canvas.getContext('2d')!
  const W = canvas.width, H = canvas.height
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = dk ? '#1f2937' : '#f9fafb'; ctx.fillRect(0, 0, W, H)
  if (!outcomes.length) {
    ctx.fillStyle = dk ? '#6b7280' : '#9ca3af'; ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('Press +1, +10, or +100 to roll', W / 2, H / 2); return
  }
  const n = outcomes.length
  const isDice2 = outcomes[0].type === 'dice2'
  const cols = n === 1 ? 1 : isDice2 ? Math.min(5, n) : Math.min(10, n)
  const rows = Math.ceil(n / cols)
  const cw = Math.floor(W / cols), ch = Math.floor(H / rows)
  const pd = Math.max(2, Math.floor(Math.min(cw, ch) * 0.08))
  outcomes.forEach((o, i) => {
    const c = i % cols, r = Math.floor(i / cols)
    const x = c * cw, y = r * ch
    if (o.type === 'die1') {
      drawDie(ctx, x + pd, y + pd, cw - pd * 2, ch - pd * 2, o.v, o.v === 6, dk)
    } else if (o.type === 'dice2') {
      const half = Math.floor((cw - pd * 3) / 2)
      const hi = o.d1 + o.d2 === 7
      drawDie(ctx, x + pd, y + pd, half, ch - pd * 2, o.d1, hi, dk)
      drawDie(ctx, x + pd * 2 + half, y + pd, half, ch - pd * 2, o.d2, hi, dk)
    } else {
      drawCoin(ctx, x + pd, y + pd, cw - pd * 2, ch - pd * 2, o.h, dk)
    }
  })
}

// ── Bar chart ─────────────────────────────────────────────────────────────────
function drawBarChart(canvas: HTMLCanvasElement, counts: number[], labels: string[], trueProbs: number[], n: number) {
  const dk = getDark()
  const ctx = canvas.getContext('2d')!
  const W = canvas.width, H = canvas.height
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = dk ? '#1f2937' : '#f9fafb'; ctx.fillRect(0, 0, W, H)
  const num = labels.length
  const pad = { t: 12, r: 8, b: 28, l: 8 }
  const pw = W - pad.l - pad.r, ph = H - pad.t - pad.b
  const bw = pw / num - 3
  const maxP = Math.max(...trueProbs, 0.001)
  const toH = (p: number) => (p / maxP) * ph

  for (let i = 0; i < num; i++) {
    const x = pad.l + i * (pw / num) + 1.5
    const freq = n === 0 ? 0 : counts[i] / n
    const bh = Math.min(toH(freq), ph)
    const dashH = toH(trueProbs[i])
    ctx.fillStyle = dk ? '#3b82f6' : '#60a5fa'
    ctx.fillRect(x, pad.t + ph - bh, bw, bh)
    ctx.setLineDash([3, 2]); ctx.strokeStyle = dk ? '#fbbf24' : '#d97706'; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(x, pad.t + ph - dashH); ctx.lineTo(x + bw, pad.t + ph - dashH); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = dk ? '#9ca3af' : '#6b7280'; ctx.font = '9px monospace'
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
    ctx.fillText(labels[i], x + bw / 2, H - 8)
    if (counts[i] > 0) {
      ctx.fillStyle = dk ? '#d1d5db' : '#374151'
      ctx.textBaseline = 'alphabetic'
      ctx.fillText(counts[i].toString(), x + bw / 2, pad.t + ph - bh - 2)
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Sim A — Buffon's Needle
// ══════════════════════════════════════════════════════════════════════════════
function BuffonNeedle({ depth }: { depth: Depth }) {
  const [n, setN] = useState(0)
  const [estimate, setEstimate] = useState(0)
  const [convergence, setConvergence] = useState<CP[]>([])
  const [needleL, setNeedleL] = useState(40)
  const [spacing, setSpacing] = useState(60)
  const [seedStr, setSeedStr] = useState('')

  const nRef = useRef(0)
  const crossRef = useRef(0)
  const rngRef = useRef<() => number>(Math.random)
  const simCanvas = useRef<HTMLCanvasElement>(null)
  const offscreen = useRef<HTMLCanvasElement | null>(null)
  const convCanvas = useRef<HTMLCanvasElement>(null)

  const initOff = useCallback((sp: number) => {
    if (!offscreen.current) offscreen.current = document.createElement('canvas')
    const oc = offscreen.current
    oc.width = 300; oc.height = 300
    const dk = getDark()
    const ctx = oc.getContext('2d')!
    ctx.fillStyle = dk ? '#111827' : '#f9fafb'; ctx.fillRect(0, 0, 300, 300)
    ctx.strokeStyle = dk ? '#4b5563' : '#d1d5db'; ctx.lineWidth = 1
    for (let y = sp; y <= 300; y += sp) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(300, y); ctx.stroke()
    }
  }, [])

  const composite = useCallback(() => {
    const sc = simCanvas.current, oc = offscreen.current
    if (!sc || !oc) return
    sc.getContext('2d')!.drawImage(oc, 0, 0)
  }, [])

  // mount
  useEffect(() => { initOff(spacing); composite() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const resetSim = useCallback((l = needleL, sp = spacing, seed = seedStr) => {
    nRef.current = 0; crossRef.current = 0
    setN(0); setEstimate(0); setConvergence([])
    rngRef.current = makeRng(seed)
    initOff(sp); composite()
  }, [needleL, spacing, seedStr, initOff, composite])

  const runBatch = useCallback((count: number) => {
    const rng = rngRef.current, oc = offscreen.current
    if (!oc) return
    const ctx = oc.getContext('2d')!
    const L = needleL, d = spacing
    let local = 0
    for (let i = 0; i < count; i++) {
      const cy = rng() * 300
      const theta = rng() * Math.PI
      const hy = (L / 2) * Math.sin(theta)
      const hx = (L / 2) * Math.cos(theta)
      const cx = rng() * 300
      const y1 = cy - hy, y2 = cy + hy
      // crosses when endpoints span a line boundary (lines at multiples of d)
      const cross = Math.floor(y1 / d) !== Math.floor(y2 / d)
      if (cross) local++
      ctx.strokeStyle = cross ? '#f43f5e' : '#60a5fa'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(cx - hx, y1); ctx.lineTo(cx + hx, y2); ctx.stroke()
    }
    nRef.current += count; crossRef.current += local
    const newN = nRef.current, newC = crossRef.current
    const est = newC === 0 ? 0 : (2 * L * newN) / (d * newC)
    setN(newN); setEstimate(est)
    setConvergence(p => [...p, { n: newN, estimate: est }])
    composite()
  }, [needleL, spacing, composite])

  useEffect(() => { if (convCanvas.current) drawConvergence(convCanvas.current, convergence, Math.PI, 'π estimate') }, [convergence])

  const CTRL = 'bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm'
  const RST = 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg px-4 py-2 text-sm'

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">A — Buffon's Needle</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Drop needles randomly onto a ruled page. The crossing rate estimates π.
      </p>
      {depth !== 'light' && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
          <p className="mb-1">Needle length <em>L</em>, line spacing <em>d</em> (with L ≤ d): <Katex tex="P(\text{cross}) = \dfrac{2L}{\pi d}" /></p>
          <p>Rearranging: <Katex tex="\pi \approx \dfrac{2Ln}{d \cdot \text{crossings}}" /></p>
          {depth === 'heavy' && <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Derived by integrating over needle positions and angles — the perpendicular distance from the centre to the nearest line is uniform on [0, d/2].</p>}
        </div>
      )}
      <Params>
        <div>
          <PLabel>Needle L = {needleL}px</PLabel>
          <input type="range" min={10} max={58} value={needleL} className="w-32"
            onChange={e => { const v = +e.target.value; setNeedleL(v); resetSim(v, spacing, seedStr) }} />
        </div>
        <div>
          <PLabel>Spacing d = {spacing}px</PLabel>
          <input type="range" min={30} max={80} value={spacing} className="w-32"
            onChange={e => { const v = +e.target.value; setSpacing(v); resetSim(needleL, v, seedStr) }} />
        </div>
        <div>
          <PLabel>Seed</PLabel>
          <input type="text" placeholder="empty = random" value={seedStr}
            onChange={e => setSeedStr(e.target.value)}
            className="w-28 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" />
        </div>
        {needleL > spacing && <p className="text-xs text-amber-600 dark:text-amber-400 self-end">⚠ Valid only when L ≤ d</p>}
      </Params>
      <div className="flex flex-wrap gap-2 mb-4">
        {([1, 10, 100] as const).map(b => <button key={b} onClick={() => runBatch(b)} className={CTRL}>+{b}</button>)}
        <button onClick={() => resetSim()} className={RST}>Reset</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Needle drops</p>
          <canvas ref={simCanvas} width={300} height={300} className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Convergence to π</p>
          <canvas ref={convCanvas} width={300} height={200} className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
      </div>
      <StatsPanel n={n} estimate={estimate} trueValue={Math.PI} label="π estimate" />
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {n > 0 && `After ${n} needles, π estimate is ${estimate.toFixed(4)}`}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Sim B — Dartboard
// ══════════════════════════════════════════════════════════════════════════════
function Dartboard({ depth }: { depth: Depth }) {
  const [n, setN] = useState(0)
  const [estimate, setEstimate] = useState(0)
  const [convergence, setConvergence] = useState<CP[]>([])
  const [ptSize, setPtSize] = useState(2)
  const [seedStr, setSeedStr] = useState('')

  const nRef = useRef(0)
  const insideRef = useRef(0)
  const rngRef = useRef<() => number>(Math.random)
  const simCanvas = useRef<HTMLCanvasElement>(null)
  const offscreen = useRef<HTMLCanvasElement | null>(null)
  const convCanvas = useRef<HTMLCanvasElement>(null)

  const initOff = useCallback(() => {
    if (!offscreen.current) offscreen.current = document.createElement('canvas')
    const oc = offscreen.current; oc.width = 300; oc.height = 300
    const dk = getDark(); const ctx = oc.getContext('2d')!
    ctx.fillStyle = dk ? '#111827' : '#f3f4f6'; ctx.fillRect(0, 0, 300, 300)
    ctx.strokeStyle = dk ? '#6b7280' : '#9ca3af'; ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(0, 300, 300, -Math.PI / 2, 0); ctx.stroke()
  }, [])

  const composite = useCallback(() => {
    const sc = simCanvas.current, oc = offscreen.current
    if (!sc || !oc) return; sc.getContext('2d')!.drawImage(oc, 0, 0)
  }, [])

  useEffect(() => { initOff(); composite() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const resetSim = useCallback((seed = seedStr) => {
    nRef.current = 0; insideRef.current = 0
    setN(0); setEstimate(0); setConvergence([])
    rngRef.current = makeRng(seed); initOff(); composite()
  }, [seedStr, initOff, composite])

  const runBatch = useCallback((count: number) => {
    const rng = rngRef.current, oc = offscreen.current
    if (!oc) return; const ctx = oc.getContext('2d')!
    let local = 0
    for (let i = 0; i < count; i++) {
      const x = rng(), y = rng()
      const inside = x * x + y * y <= 1
      if (inside) local++
      ctx.fillStyle = inside ? '#34d399' : '#f87171'
      ctx.beginPath(); ctx.arc(x * 300, (1 - y) * 300, ptSize, 0, Math.PI * 2); ctx.fill()
    }
    nRef.current += count; insideRef.current += local
    const newN = nRef.current, newI = insideRef.current
    const est = newN === 0 ? 0 : (4 * newI) / newN
    setN(newN); setEstimate(est)
    setConvergence(p => [...p, { n: newN, estimate: est }])
    composite()
  }, [ptSize, composite])

  useEffect(() => { if (convCanvas.current) drawConvergence(convCanvas.current, convergence, Math.PI, 'π estimate') }, [convergence])

  const CTRL = 'bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm'
  const RST = 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg px-4 py-2 text-sm'

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">B — Dartboard</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Throw random darts at a unit square. The fraction inside the quarter circle estimates π/4.
      </p>
      {depth !== 'light' && (
        <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
          <p>Quarter-circle area = <Katex tex="\tfrac{\pi}{4}" />, square area = <Katex tex="1" />. Ratio gives <Katex tex="\pi \approx 4 \times \dfrac{\text{inside}}{n}" />.</p>
          {depth === 'heavy' && <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">We use a quarter circle (not full circle) because it fits exactly inside the unit square, making uniform sampling trivial.</p>}
        </div>
      )}
      <Params>
        <div>
          <PLabel>Point size = {ptSize}px</PLabel>
          <input type="range" min={1} max={5} value={ptSize} onChange={e => setPtSize(+e.target.value)} className="w-24" />
        </div>
        <div>
          <PLabel>Seed</PLabel>
          <input type="text" placeholder="empty = random" value={seedStr} onChange={e => setSeedStr(e.target.value)}
            className="w-28 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" />
        </div>
      </Params>
      <div className="flex flex-wrap gap-2 mb-4">
        {([1, 10, 100] as const).map(b => <button key={b} onClick={() => runBatch(b)} className={CTRL}>+{b}</button>)}
        <button onClick={() => resetSim()} className={RST}>Reset</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Dart throws</p>
          <canvas ref={simCanvas} width={300} height={300} className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Convergence to π</p>
          <canvas ref={convCanvas} width={300} height={200} className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
      </div>
      <StatsPanel n={n} estimate={estimate} trueValue={Math.PI} label="π estimate" />
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {n > 0 && `After ${n} darts, π estimate is ${estimate.toFixed(4)}`}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Sim C — Dice & Coins
// ══════════════════════════════════════════════════════════════════════════════
function diceTrueValue(mode: DiceMode, p: number) {
  return mode === 'die1' ? 1 / 6 : mode === 'dice2' ? 6 / 36 : p
}
function diceLabel(mode: DiceMode) {
  return mode === 'die1' ? 'P(6)' : mode === 'dice2' ? 'P(sum=7)' : 'P(heads)'
}

function DiceCoins({ depth }: { depth: Depth }) {
  const [mode, setMode] = useState<DiceMode>('die1')
  const [n, setN] = useState(0)
  const [estimate, setEstimate] = useState(0)
  const [counts, setCounts] = useState<number[]>(Array(6).fill(0))
  const [pHeads, setPHeads] = useState(0.5)
  const [lastOutcomes, setLastOutcomes] = useState<DiceOutcome[]>([])
  const [seedStr, setSeedStr] = useState('')

  const nRef = useRef(0)
  const targetRef = useRef(0)
  const countsRef = useRef<number[]>(Array(6).fill(0))
  const rngRef = useRef<() => number>(Math.random)
  const barCanvas = useRef<HTMLCanvasElement>(null)
  const diagCanvas = useRef<HTMLCanvasElement>(null)

  function numBuckets() { return mode === 'die1' ? 6 : mode === 'dice2' ? 11 : 2 }
  function getLabels() {
    if (mode === 'die1') return ['1', '2', '3', '4', '5', '6']
    if (mode === 'dice2') return ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    return ['T', 'H']
  }
  function getTrueProbs() {
    if (mode === 'die1') return Array(6).fill(1 / 6)
    if (mode === 'dice2') return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(s => {
      let w = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) w++; return w / 36
    })
    return [1 - pHeads, pHeads]
  }

  const resetSim = useCallback(() => {
    const k = mode === 'die1' ? 6 : mode === 'dice2' ? 11 : 2
    nRef.current = 0; targetRef.current = 0
    countsRef.current = Array(k).fill(0)
    setN(0); setEstimate(0); setCounts(Array(k).fill(0)); setLastOutcomes([])
    rngRef.current = makeRng(seedStr)
  }, [mode, seedStr])

  useEffect(() => { resetSim() }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps

  const runBatch = useCallback((count: number) => {
    const rng = rngRef.current
    const nc = [...countsRef.current]
    const batch: DiceOutcome[] = []
    let hits = 0

    for (let i = 0; i < count; i++) {
      if (mode === 'die1') {
        const v = Math.floor(rng() * 6) + 1
        nc[v - 1]++; if (v === 6) hits++
        batch.push({ type: 'die1', v })
      } else if (mode === 'dice2') {
        const d1 = Math.floor(rng() * 6) + 1
        const d2 = Math.floor(rng() * 6) + 1
        nc[d1 + d2 - 2]++; if (d1 + d2 === 7) hits++
        batch.push({ type: 'dice2', d1, d2 })
      } else {
        const h = rng() < pHeads
        nc[h ? 1 : 0]++; if (h) hits++
        batch.push({ type: 'coin', h })
      }
    }

    countsRef.current = nc
    nRef.current += count; targetRef.current += hits
    const newN = nRef.current
    const est = newN === 0 ? 0 : targetRef.current / newN
    setN(newN); setEstimate(est); setCounts([...nc]); setLastOutcomes(batch)
  }, [mode, pHeads])

  useEffect(() => {
    if (barCanvas.current) drawBarChart(barCanvas.current, counts, getLabels(), getTrueProbs(), n)
  }, [counts, n, mode, pHeads]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (diagCanvas.current) drawDiceDiagram(diagCanvas.current, lastOutcomes)
  }, [lastOutcomes])

  const trueValue = diceTrueValue(mode, pHeads)
  const label = diceLabel(mode)
  const CTRL = 'bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm'
  const RST = 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg px-4 py-2 text-sm'

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">C — Dice &amp; Coins</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Roll dice or flip coins — watch relative frequencies converge to theoretical probabilities.
      </p>
      <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 w-fit mb-4">
        {([['die1', '1d6'], ['dice2', '2d6'], ['coin', 'Coin']] as [DiceMode, string][]).map(([k, lbl]) => (
          <button key={k} onClick={() => setMode(k)}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors ${
              mode === k
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}>{lbl}</button>
        ))}
      </div>
      {depth !== 'light' && (
        <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
          {mode === 'die1' && <p>Fair die: <Katex tex="P(6) = \tfrac{1}{6} \approx 0.1\overline{6}" /></p>}
          {mode === 'dice2' && <p>Two dice: <Katex tex="P(\text{sum}=7) = \tfrac{6}{36} = \tfrac{1}{6}" /> — the most likely sum. Highlighted pairs sum to 7.</p>}
          {mode === 'coin' && <p>Biased coin: adjust <em>p</em> below. <Katex tex="P(\text{heads}) = p" />. Heads shown in gold.</p>}
        </div>
      )}
      <Params>
        {mode === 'coin' && (
          <div>
            <PLabel>P(heads) = {pHeads.toFixed(1)}</PLabel>
            <input type="range" min={0.1} max={0.9} step={0.1} value={pHeads}
              onChange={e => { setPHeads(+e.target.value); resetSim() }} className="w-32" />
          </div>
        )}
        <div>
          <PLabel>Seed</PLabel>
          <input type="text" placeholder="empty = random" value={seedStr} onChange={e => setSeedStr(e.target.value)}
            className="w-28 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" />
        </div>
      </Params>
      <div className="flex flex-wrap gap-2 mb-4">
        {([1, 10, 100] as const).map(b => <button key={b} onClick={() => runBatch(b)} className={CTRL}>+{b}</button>)}
        <button onClick={resetSim} className={RST}>Reset</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            Outcome frequencies <span className="normal-case font-normal">(— theoretical)</span>
          </p>
          <canvas ref={barCanvas} width={300} height={300} className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Last roll / flip outcomes</p>
          <canvas ref={diagCanvas} width={300} height={300} className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
      </div>
      <StatsPanel n={n} estimate={estimate} trueValue={trueValue} label={label} />
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {n > 0 && `After ${n} rolls, ${label} estimate is ${estimate.toFixed(4)}`}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Sim D — Random Walk
// ══════════════════════════════════════════════════════════════════════════════
function drawWalks(canvas: HTMLCanvasElement, traces: number[][], N: number) {
  const dk = getDark()
  const ctx = canvas.getContext('2d')!
  const W = canvas.width, H = canvas.height
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = dk ? '#111827' : '#f9fafb'; ctx.fillRect(0, 0, W, H)
  if (!traces.length) {
    ctx.fillStyle = dk ? '#6b7280' : '#9ca3af'; ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('Run the simulation to see walks', W / 2, H / 2); return
  }
  const allVals = traces.flat()
  const maxAbs = Math.max(Math.abs(Math.min(...allVals)), Math.abs(Math.max(...allVals)), 1)
  const pad = { t: 12, r: 12, b: 8, l: 12 }
  const pw = W - pad.l - pad.r, ph = H - pad.t - pad.b
  const toX = (s: number) => pad.l + (s / N) * pw
  const toY = (p: number) => pad.t + ph / 2 - (p / (maxAbs * 2 + 1)) * ph

  ctx.strokeStyle = dk ? '#374151' : '#e5e7eb'; ctx.lineWidth = 1; ctx.setLineDash([4, 3])
  ctx.beginPath(); ctx.moveTo(pad.l, toY(0)); ctx.lineTo(pad.l + pw, toY(0)); ctx.stroke()
  ctx.setLineDash([])

  const total = traces.length
  traces.forEach((walk, wi) => {
    const alpha = total <= 20 ? 0.7 : Math.max(0.05, Math.min(0.7, 15 / total))
    ctx.strokeStyle = dk ? `rgba(96,165,250,${alpha})` : `rgba(59,130,246,${alpha})`
    ctx.lineWidth = total > 50 ? 0.8 : 1
    ctx.beginPath()
    walk.forEach((pos, step) => { step === 0 ? ctx.moveTo(toX(step), toY(pos)) : ctx.lineTo(toX(step), toY(pos)) })
    ctx.stroke()
    void wi
  })
}

function RandomWalk({ depth }: { depth: Depth }) {
  const [walks, setWalks] = useState(0)
  const [estimate, setEstimate] = useState(0)
  const [walkN, setWalkN] = useState(100)
  const [traces, setTraces] = useState<number[][]>([])
  const [convergence, setConvergence] = useState<CP[]>([])
  const [seedStr, setSeedStr] = useState('')

  const walksRef = useRef(0)
  const sumAbsRef = useRef(0)
  const rngRef = useRef<() => number>(Math.random)
  const walkCanvas = useRef<HTMLCanvasElement>(null)
  const convCanvas = useRef<HTMLCanvasElement>(null)

  const trueValue = Math.sqrt(2 * walkN / Math.PI)

  const resetSim = useCallback((wn = walkN, seed = seedStr) => {
    walksRef.current = 0; sumAbsRef.current = 0
    setWalks(0); setEstimate(0); setTraces([]); setConvergence([])
    rngRef.current = makeRng(seed)
    void wn
  }, [walkN, seedStr])

  const runBatch = useCallback((count: number) => {
    const rng = rngRef.current
    const newTraces: number[][] = []
    let sumAbs = 0
    for (let i = 0; i < count; i++) {
      const walk: number[] = [0]; let pos = 0
      for (let s = 0; s < walkN; s++) { pos += rng() < 0.5 ? 1 : -1; walk.push(pos) }
      newTraces.push(walk); sumAbs += Math.abs(pos)
    }
    walksRef.current += count; sumAbsRef.current += sumAbs
    const newW = walksRef.current
    const est = newW === 0 ? 0 : sumAbsRef.current / newW
    setWalks(newW); setEstimate(est)
    setTraces(prev => [...prev, ...newTraces])
    setConvergence(p => [...p, { n: newW, estimate: est }])
  }, [walkN])

  useEffect(() => { if (walkCanvas.current) drawWalks(walkCanvas.current, traces, walkN) }, [traces, walkN])
  useEffect(() => { if (convCanvas.current) drawConvergence(convCanvas.current, convergence, trueValue, 'E(|Sₙ|)') }, [convergence, trueValue])

  const CTRL = 'bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm'
  const RST = 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg px-4 py-2 text-sm'

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">D — Random Walk</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Each step is ±1 with equal probability. Estimate the expected absolute displacement after <em>N</em> steps.
      </p>
      {depth !== 'light' && (
        <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
          <Katex display tex="E(|S_N|) \approx \sqrt{\dfrac{2N}{\pi}}" className="block my-2" />
          {depth === 'heavy' && <p className="text-xs text-gray-500 dark:text-gray-400">Asymptotic result via CLT — accurate for large N. For small N, expect meaningful deviation.</p>}
        </div>
      )}
      <Params>
        <div>
          <PLabel>Walk length N = {walkN}</PLabel>
          <input type="range" min={10} max={500} value={walkN} className="w-40"
            onChange={e => { const v = +e.target.value; setWalkN(v); resetSim(v, seedStr) }} />
        </div>
        <div>
          <PLabel>Seed</PLabel>
          <input type="text" placeholder="empty = random" value={seedStr} onChange={e => setSeedStr(e.target.value)}
            className="w-28 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" />
        </div>
      </Params>
      <div className="flex flex-wrap gap-2 mb-4">
        {([1, 10, 100] as const).map(b => <button key={b} onClick={() => runBatch(b)} className={CTRL}>+{b}</button>)}
        <button onClick={() => resetSim()} className={RST}>Reset</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            Walk traces ({walks} total)
          </p>
          <canvas ref={walkCanvas} width={300} height={300} className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Convergence of E(|S_N|)</p>
          <canvas ref={convCanvas} width={300} height={200} className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
      </div>
      <StatsPanel n={walks} estimate={estimate} trueValue={trueValue} label="E(|Sₙ|)" />
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {walks > 0 && `After ${walks} walks, E(|Sₙ|) estimate is ${estimate.toFixed(4)}`}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Reflection (heavy only)
// ══════════════════════════════════════════════════════════════════════════════
const CQ = [
  { q: 'Why does the estimate become more accurate as n grows? Which theorem justifies this?', a: 'The Law of Large Numbers: as n → ∞ the sample mean converges to the true expected value. Random fluctuations cancel out and the average stabilises near the true value.' },
  { q: 'For the dartboard simulation, why use a quarter circle rather than a full circle?', a: 'We generate uniform points in a unit square. A quarter circle of radius 1 fits exactly inside it, giving the ratio π/4 directly — no need for a full circle.' },
  { q: "In Buffon's Needle, why is the estimator only valid when L ≤ d?", a: 'When L > d a single needle can cross more than one line simultaneously. The derivation assumes at most one crossing, so the formula breaks down for long needles.' },
  { q: 'The random walk formula E(|S_N|) ≈ √(2N/π) is asymptotic. What does that mean?', a: 'It becomes increasingly accurate as N grows large; for small N the actual expected value deviates noticeably. The approximation is derived via the Central Limit Theorem, which is itself asymptotic.' },
]
const EQ = [
  { q: "A student drops 500 needles on a page with lines 6 cm apart. The needles are 4 cm long and 210 cross a line. Estimate π.", a: 'π ≈ 2Ln/(d × crossings) = (2 × 4 × 500)/(6 × 210) = 4000/1260 ≈ 3.175.' },
  { q: 'Describe how you would use Monte Carlo simulation to estimate P(X + Y > 1.5) where X, Y ~ Uniform(0, 1).', a: 'Generate many pairs (x, y) uniformly from [0,1]². Count the fraction with x + y > 1.5. That relative frequency estimates the probability. (True value = 0.125.)' },
]

function ReflectionSection() {
  const [cRev, setCRev] = useState(CQ.map(() => false))
  const [eRev, setERev] = useState(EQ.map(() => false))
  const tog = (arr: boolean[], i: number, set: (v: boolean[]) => void) => { const n = [...arr]; n[i] = !n[i]; set(n) }
  const Item = ({ q, a, revealed, onToggle }: { q: string; a: string; revealed: boolean; onToggle: () => void }) => (
    <div className="rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
      <button onClick={onToggle} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 flex justify-between items-start gap-2">
        <span>{q}</span><span className="text-gray-400 shrink-0 mt-0.5">{revealed ? '▲' : '▼'}</span>
      </button>
      {revealed && <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">{a}</div>}
    </div>
  )
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reflection</h2>
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Conceptual questions</p>
      <div className="space-y-2 mb-6">{CQ.map((q, i) => <Item key={i} {...q} revealed={cRev[i]} onToggle={() => tog(cRev, i, setCRev)} />)}</div>
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Exam-style questions</p>
      <div className="space-y-2">{EQ.map((q, i) => <Item key={i} {...q} revealed={eRev[i]} onToggle={() => tog(eRev, i, setERev)} />)}</div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Main page
// ══════════════════════════════════════════════════════════════════════════════
const NAV: { id: SimId; label: string; heavy?: true }[] = [
  { id: 'intro',      label: '⬩ Introduction' },
  { id: 'buffon',     label: "A — Buffon's Needle" },
  { id: 'dartboard',  label: 'B — Dartboard' },
  { id: 'dice',       label: 'C — Dice & Coins' },
  { id: 'walk',       label: 'D — Random Walk' },
  { id: 'reflection', label: '✦ Reflection', heavy: true },
]

export default function MonteCarlo() {
  const [depth, setDepth] = useState<Depth>(() => {
    const s = localStorage.getItem('mc-depth')
    return (s === 'light' || s === 'medium' || s === 'heavy') ? s : 'medium'
  })
  const [active, setActive] = useState<SimId>('intro')

  useEffect(() => { localStorage.setItem('mc-depth', depth) }, [depth])
  useEffect(() => { if (depth !== 'heavy' && active === 'reflection') setActive('intro') }, [depth, active])

  const navItems = NAV.filter(n => !n.heavy || depth === 'heavy')

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <DepthToggle depth={depth} setDepth={setDepth} />

      <div className="mb-6 pr-36">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Monte Carlo Simulations</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Using repeated random sampling to estimate hard-to-compute quantities.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Side nav ── */}
        <nav className="lg:w-52 flex-shrink-0">
          <div className="lg:sticky lg:top-6">
            {/* mobile: horizontal scroll */}
            <div className="flex lg:hidden gap-1 overflow-x-auto pb-1 mb-4 scrollbar-none">
              {navItems.map(item => (
                <button key={item.id} onClick={() => setActive(item.id)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-shrink-0 ${
                    active === item.id
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
                  }`}>{item.label}</button>
              ))}
            </div>
            {/* desktop: vertical */}
            <p className="hidden lg:block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Simulations</p>
            <div className="hidden lg:flex flex-col gap-0.5">
              {navItems.map(item => (
                <button key={item.id} onClick={() => setActive(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active === item.id
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}>{item.label}</button>
              ))}
            </div>
          </div>
        </nav>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">

          {/* Introduction */}
          <div className={active === 'intro' ? '' : 'hidden'}>
            <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What is Monte Carlo?</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Monte Carlo methods are named after the casino in Monaco — they harness <em>randomness</em> to solve
                deterministic problems. Run a random experiment many times, then use the results to approximate
                a quantity you care about.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                <strong className="text-gray-900 dark:text-white">Real-life uses: </strong>
                particle physics (CERN), finance (option pricing), epidemiology (disease spread), and AI (AlphaGo).
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">VCE Methods connection: </strong>
                Monte Carlo is <em>relative frequency at scale</em>. As you run more trials, the relative frequency
                approaches the theoretical probability — exactly what the Law of Large Numbers guarantees.
              </p>
              {depth !== 'light' && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                  <strong>Law of Large Numbers: </strong>
                  As the number of trials <em>n</em> → ∞, the sample mean converges to the true expected value.
                  More samples always means a better estimate — on average.
                </div>
              )}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {NAV.filter(n => n.id !== 'intro' && n.id !== 'reflection').map(n => (
                  <button key={n.id} onClick={() => setActive(n.id)}
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-left transition-colors group">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300">{n.label}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sims — kept mounted to preserve state */}
          <div className={active === 'buffon'    ? '' : 'hidden'}><BuffonNeedle depth={depth} /></div>
          <div className={active === 'dartboard' ? '' : 'hidden'}><Dartboard    depth={depth} /></div>
          <div className={active === 'dice'      ? '' : 'hidden'}><DiceCoins    depth={depth} /></div>
          <div className={active === 'walk'      ? '' : 'hidden'}><RandomWalk   depth={depth} /></div>
          {depth === 'heavy' && <div className={active === 'reflection' ? '' : 'hidden'}><ReflectionSection /></div>}
        </div>
      </div>
    </div>
  )
}
