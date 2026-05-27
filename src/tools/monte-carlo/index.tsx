import { useState, useEffect, useRef, useCallback } from 'react'
import Katex from '../../components/Katex'

// ── Seeded PRNG ───────────────────────────────────────────────────────────────

function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function makeRng(seedStr: string): () => number {
  const s = seedStr.trim()
  if (s === '') return Math.random
  const n = parseInt(s, 10)
  return mulberry32(isNaN(n) ? 42 : n)
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Depth = 'light' | 'medium' | 'heavy'
type DiceMode = 'die1' | 'dice2' | 'coin'

interface ConvergencePoint { n: number; estimate: number }

// ── Shared StatsPanel ─────────────────────────────────────────────────────────

function StatsPanel({
  n, estimate, trueValue, label,
}: { n: number; estimate: number; trueValue: number; label: string }) {
  const absErr = Math.abs(estimate - trueValue)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
      {[
        { label: 'n', value: n.toLocaleString() },
        { label, value: n === 0 ? '—' : estimate.toFixed(5) },
        { label: 'True value', value: trueValue.toFixed(5) },
        { label: '|error|', value: n === 0 ? '—' : absErr.toFixed(5) },
      ].map(s => (
        <div key={s.label} className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{s.label}</p>
          <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white">{s.value}</p>
        </div>
      ))}
    </div>
  )
}

// ── Depth Toggle ──────────────────────────────────────────────────────────────

function DepthToggle({ depth, setDepth }: { depth: Depth; setDepth: (d: Depth) => void }) {
  const levels: Depth[] = ['light', 'medium', 'heavy']
  return (
    <div className="fixed top-4 right-4 z-50 flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
      {levels.map(l => (
        <button
          key={l}
          onClick={() => setDepth(l)}
          className={`px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
            depth === l
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

// ── Convergence Chart drawing ─────────────────────────────────────────────────

function drawConvergence(
  canvas: HTMLCanvasElement,
  data: ConvergencePoint[],
  trueValue: number,
  label: string,
  isDark: boolean,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const W = canvas.width, H = canvas.height
  ctx.clearRect(0, 0, W, H)

  const bg = isDark ? '#1f2937' : '#f9fafb'
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  if (data.length < 2) {
    ctx.fillStyle = isDark ? '#6b7280' : '#9ca3af'
    ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Run the simulation to see convergence', W / 2, H / 2)
    return
  }

  const pad = { top: 16, right: 16, bottom: 28, left: 44 }
  const pw = W - pad.left - pad.right
  const ph = H - pad.top - pad.bottom

  const estimates = data.map(d => d.estimate)
  const minE = Math.min(...estimates, trueValue)
  const maxE = Math.max(...estimates, trueValue)
  const span = maxE - minE || 1
  const yMin = minE - span * 0.1
  const yMax = maxE + span * 0.1

  const toX = (i: number) => pad.left + (i / (data.length - 1)) * pw
  const toY = (v: number) => pad.top + (1 - (v - yMin) / (yMax - yMin)) * ph

  // Grid lines
  ctx.strokeStyle = isDark ? '#374151' : '#e5e7eb'
  ctx.lineWidth = 1
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (i / 4) * ph
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + pw, y); ctx.stroke()
    const val = yMax - (i / 4) * (yMax - yMin)
    ctx.fillStyle = isDark ? '#9ca3af' : '#6b7280'
    ctx.font = '9px monospace'
    ctx.textAlign = 'right'
    ctx.fillText(val.toFixed(3), pad.left - 4, y + 3)
  }

  // True value dashed line
  const tyY = toY(trueValue)
  ctx.setLineDash([4, 3])
  ctx.strokeStyle = isDark ? '#fbbf24' : '#d97706'
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(pad.left, tyY); ctx.lineTo(pad.left + pw, tyY); ctx.stroke()
  ctx.setLineDash([])

  // Estimate line
  ctx.strokeStyle = '#3b82f6'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  data.forEach((pt, i) => {
    const x = toX(i), y = toY(pt.estimate)
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
  })
  ctx.stroke()

  // Axis label
  ctx.fillStyle = isDark ? '#9ca3af' : '#6b7280'
  ctx.font = '9px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(label, pad.left + pw / 2, H - 6)
}

// ══════════════════════════════════════════════════════════════════════════════
// Simulation A — Buffon's Needle
// ══════════════════════════════════════════════════════════════════════════════

function BuffonNeedle({ depth }: { depth: Depth }) {
  const [n, setN] = useState(0)
  const [crossings, setCrossings] = useState(0)
  const [convergence, setConvergence] = useState<ConvergencePoint[]>([])
  const [needleL, setNeedleL] = useState(40)
  const [spacing, setSpacing] = useState(60)
  const [seedStr, setSeedStr] = useState('')
  const rngRef = useRef<() => number>(Math.random)

  const simCanvas = useRef<HTMLCanvasElement>(null)
  const offscreen = useRef<HTMLCanvasElement | null>(null)
  const convCanvas = useRef<HTMLCanvasElement>(null)

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const estimate = n === 0 || crossings === 0 ? 0 : (2 * needleL * n) / (spacing * crossings)

  // Init offscreen canvas
  useEffect(() => {
    const oc = document.createElement('canvas')
    oc.width = 300; oc.height = 300
    offscreen.current = oc
    // Draw lines on offscreen
    const ctx = oc.getContext('2d')!
    ctx.fillStyle = isDark ? '#111827' : '#f9fafb'
    ctx.fillRect(0, 0, 300, 300)
    ctx.strokeStyle = isDark ? '#4b5563' : '#d1d5db'
    ctx.lineWidth = 1
    for (let y = spacing; y < 300; y += spacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(300, y); ctx.stroke()
    }
  }, [spacing, isDark])

  // Composite offscreen → display
  const composite = useCallback(() => {
    const sc = simCanvas.current; const oc = offscreen.current
    if (!sc || !oc) return
    const ctx = sc.getContext('2d')!
    ctx.clearRect(0, 0, 300, 300)
    ctx.drawImage(oc, 0, 0)
  }, [])

  const resetSim = useCallback(() => {
    setN(0); setCrossings(0); setConvergence([])
    rngRef.current = makeRng(seedStr)
    // Redraw blank offscreen
    const oc = offscreen.current
    if (!oc) return
    const ctx = oc.getContext('2d')!
    ctx.fillStyle = isDark ? '#111827' : '#f9fafb'
    ctx.fillRect(0, 0, 300, 300)
    ctx.strokeStyle = isDark ? '#4b5563' : '#d1d5db'
    ctx.lineWidth = 1
    for (let y = spacing; y < 300; y += spacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(300, y); ctx.stroke()
    }
    composite()
  }, [seedStr, spacing, isDark, composite])

  const runBatch = useCallback((count: number) => {
    const rng = rngRef.current
    const oc = offscreen.current
    if (!oc) return
    const ctx = oc.getContext('2d')!

    let localCrossings = 0
    for (let i = 0; i < count; i++) {
      const cy = rng() * 300
      const theta = rng() * Math.PI
      const halfY = (needleL / 2) * Math.sin(theta)
      const halfX = (needleL / 2) * Math.cos(theta)
      const y1 = cy - halfY, y2 = cy + halfY
      // Random x centre
      const cx = rng() * 300
      const crosses = Math.floor(y1 / spacing) !== Math.floor(y2 / spacing) ||
        y1 < 0 || y2 > 300 ||
        y1 % spacing === 0 || y2 % spacing === 0 ||
        (Math.floor(Math.min(y1, y2) / spacing) < Math.floor(Math.max(y1, y2) / spacing))
      if (crosses) localCrossings++

      ctx.strokeStyle = crosses ? '#f43f5e' : '#60a5fa'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(cx - halfX, y1)
      ctx.lineTo(cx + halfX, y2)
      ctx.stroke()
    }

    setN(prev => {
      const newN = prev + count
      setCrossings(prev2 => {
        const newC = prev2 + localCrossings
        const est = newC === 0 ? 0 : (2 * needleL * newN) / (spacing * newC)
        setConvergence(p => [...p, { n: newN, estimate: est }])
        return newC
      })
      return newN
    })
    composite()
  }, [needleL, spacing, composite])

  useEffect(() => {
    if (convCanvas.current) {
      drawConvergence(convCanvas.current, convergence, Math.PI, 'π estimate', isDark)
    }
  }, [convergence, isDark])

  useEffect(() => { composite() }, [composite])

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">A — Buffon's Needle</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        Drop needles randomly onto a ruled page. Surprisingly, the crossing rate lets us estimate π.
      </p>

      {depth !== 'light' && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
          <p className="mb-1">
            A needle of length <em>L</em> dropped on lines spaced <em>d</em> apart (with <em>L ≤ d</em>) crosses a line
            with probability <Katex tex="P = \dfrac{2L}{\pi d}" />.
          </p>
          <p className="mb-1">Rearranging: <Katex tex="\pi \approx \dfrac{2Ln}{d \times \text{crossings}}" /></p>
          {depth === 'heavy' && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              The derivation integrates over all positions and angles of the needle's centre, using the fact that
              the distance to the nearest line is uniform on [0, d/2] and the angle is uniform on [0, π].
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4 items-end">
        <div>
          <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">
            Needle L = {needleL}px
          </label>
          <input type="range" min={10} max={60} value={needleL}
            onChange={e => { setNeedleL(+e.target.value); resetSim() }}
            className="w-32" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">
            Spacing d = {spacing}px
          </label>
          <input type="range" min={30} max={80} value={spacing}
            onChange={e => { setSpacing(+e.target.value); resetSim() }}
            className="w-32" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">Seed</label>
          <input type="text" placeholder="empty = random" value={seedStr}
            onChange={e => setSeedStr(e.target.value)}
            className="w-28 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" />
        </div>
        {needleL > spacing && (
          <p className="text-xs text-amber-600 dark:text-amber-400 self-end">⚠ Valid only when L ≤ d</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {([1, 10, 100] as const).map(b => (
          <button key={b} onClick={() => runBatch(b)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm">
            +{b}
          </button>
        ))}
        <button onClick={resetSim}
          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg px-4 py-2 text-sm">
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Needle drops</p>
          <canvas ref={simCanvas} width={300} height={300}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Convergence to π</p>
          <canvas ref={convCanvas} width={300} height={200}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
      </div>

      <StatsPanel n={n} estimate={estimate} trueValue={Math.PI} label="π estimate" />

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {n > 0 && `After ${n} needle drops, π estimate is ${estimate.toFixed(4)}`}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Simulation B — Dartboard (π estimation)
// ══════════════════════════════════════════════════════════════════════════════

function Dartboard({ depth }: { depth: Depth }) {
  const [n, setN] = useState(0)
  const [inside, setInside] = useState(0)
  const [convergence, setConvergence] = useState<ConvergencePoint[]>([])
  const [ptSize, setPtSize] = useState(2)
  const [seedStr, setSeedStr] = useState('')
  const rngRef = useRef<() => number>(Math.random)

  const simCanvas = useRef<HTMLCanvasElement>(null)
  const offscreen = useRef<HTMLCanvasElement | null>(null)
  const convCanvas = useRef<HTMLCanvasElement>(null)

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const estimate = n === 0 ? 0 : (4 * inside) / n

  useEffect(() => {
    const oc = document.createElement('canvas')
    oc.width = 300; oc.height = 300
    offscreen.current = oc
    const ctx = oc.getContext('2d')!
    ctx.fillStyle = isDark ? '#111827' : '#f3f4f6'
    ctx.fillRect(0, 0, 300, 300)
    // Quarter circle arc
    ctx.strokeStyle = isDark ? '#6b7280' : '#9ca3af'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, 300, 300, -Math.PI / 2, 0)
    ctx.stroke()
  }, [isDark])

  const composite = useCallback(() => {
    const sc = simCanvas.current; const oc = offscreen.current
    if (!sc || !oc) return
    const ctx = sc.getContext('2d')!
    ctx.clearRect(0, 0, 300, 300)
    ctx.drawImage(oc, 0, 0)
  }, [])

  const resetSim = useCallback(() => {
    setN(0); setInside(0); setConvergence([])
    rngRef.current = makeRng(seedStr)
    const oc = offscreen.current
    if (!oc) return
    const ctx = oc.getContext('2d')!
    ctx.fillStyle = isDark ? '#111827' : '#f3f4f6'
    ctx.fillRect(0, 0, 300, 300)
    ctx.strokeStyle = isDark ? '#6b7280' : '#9ca3af'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, 300, 300, -Math.PI / 2, 0)
    ctx.stroke()
    composite()
  }, [seedStr, isDark, composite])

  const runBatch = useCallback((count: number) => {
    const rng = rngRef.current
    const oc = offscreen.current
    if (!oc) return
    const ctx = oc.getContext('2d')!

    let localInside = 0
    for (let i = 0; i < count; i++) {
      const x = rng(), y = rng()
      const isIn = x * x + y * y <= 1
      if (isIn) localInside++
      const px = x * 300, py = (1 - y) * 300
      ctx.fillStyle = isIn ? '#34d399' : '#f87171'
      ctx.beginPath()
      ctx.arc(px, py, ptSize, 0, Math.PI * 2)
      ctx.fill()
    }

    setN(prev => {
      const newN = prev + count
      setInside(prev2 => {
        const newI = prev2 + localInside
        const est = (4 * newI) / newN
        setConvergence(p => [...p, { n: newN, estimate: est }])
        return newI
      })
      return newN
    })
    composite()
  }, [ptSize, composite])

  useEffect(() => {
    if (convCanvas.current) {
      drawConvergence(convCanvas.current, convergence, Math.PI, 'π estimate', isDark)
    }
  }, [convergence, isDark])

  useEffect(() => { composite() }, [composite])

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">B — Dartboard</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        Throw random darts at a unit square. The fraction landing inside the quarter circle estimates π/4.
      </p>

      {depth !== 'light' && (
        <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
          <p>
            Area of quarter circle = <Katex tex="\tfrac{\pi r^2}{4}" />, area of enclosing square = <Katex tex="r^2" />.
            The ratio is <Katex tex="\tfrac{\pi}{4}" />, so <Katex tex="\pi \approx 4 \times \dfrac{\text{inside}}{n}" />.
          </p>
          {depth === 'heavy' && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              We use a quarter circle (rather than a full circle) because it is easy to generate uniform points in a unit
              square, and the quarter circle fits exactly inside it with radius 1.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4 items-end">
        <div>
          <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">
            Point size = {ptSize}px
          </label>
          <input type="range" min={1} max={4} value={ptSize}
            onChange={e => setPtSize(+e.target.value)}
            className="w-24" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">Seed</label>
          <input type="text" placeholder="empty = random" value={seedStr}
            onChange={e => setSeedStr(e.target.value)}
            className="w-28 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {([1, 10, 100] as const).map(b => (
          <button key={b} onClick={() => runBatch(b)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm">
            +{b}
          </button>
        ))}
        <button onClick={resetSim}
          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg px-4 py-2 text-sm">
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Dart throws</p>
          <canvas ref={simCanvas} width={300} height={300}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Convergence to π</p>
          <canvas ref={convCanvas} width={300} height={200}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
      </div>

      <StatsPanel n={n} estimate={estimate} trueValue={Math.PI} label="π estimate" />

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {n > 0 && `After ${n} dart throws, π estimate is ${estimate.toFixed(4)}`}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Simulation C — Dice & Coins
// ══════════════════════════════════════════════════════════════════════════════

function diceModeLabel(mode: DiceMode) {
  if (mode === 'die1') return 'P(6)'
  if (mode === 'dice2') return 'P(sum=7)'
  return 'P(heads)'
}

function diceTrueValue(mode: DiceMode, pHeads: number) {
  if (mode === 'die1') return 1 / 6
  if (mode === 'dice2') return 6 / 36
  return pHeads
}

function drawBarChart(
  canvas: HTMLCanvasElement,
  counts: number[],
  labels: string[],
  trueProbs: number[],
  n: number,
  isDark: boolean,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const W = canvas.width, H = canvas.height
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = isDark ? '#1f2937' : '#f9fafb'
  ctx.fillRect(0, 0, W, H)

  const numBars = labels.length
  const pad = { top: 12, right: 12, bottom: 32, left: 36 }
  const pw = W - pad.left - pad.right
  const ph = H - pad.top - pad.bottom
  const barW = pw / numBars - 4

  const maxFreq = n === 0 ? 1 : Math.max(...counts, 1)
  const maxProb = Math.max(...trueProbs)
  // normalise: bar height by relative frequency, dashed line by true prob
  const toBarH = (c: number) => (c / (n || 1)) * ph / maxProb
  const toDashH = (p: number) => (p / maxProb) * ph

  ctx.font = '9px monospace'

  for (let i = 0; i < numBars; i++) {
    const x = pad.left + i * (pw / numBars) + 2
    const barH = Math.min(toBarH(counts[i]), ph)
    const dashH = toDashH(trueProbs[i])

    // Bar
    ctx.fillStyle = i === Math.floor(numBars / 2) && numBars > 2
      ? (isDark ? '#6366f1' : '#818cf8')
      : (isDark ? '#3b82f6' : '#60a5fa')
    ctx.fillRect(x, pad.top + ph - barH, barW, barH)

    // True prob dashed line
    ctx.setLineDash([3, 2])
    ctx.strokeStyle = isDark ? '#fbbf24' : '#d97706'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(x, pad.top + ph - dashH)
    ctx.lineTo(x + barW, pad.top + ph - dashH)
    ctx.stroke()
    ctx.setLineDash([])

    // Label
    ctx.fillStyle = isDark ? '#9ca3af' : '#6b7280'
    ctx.textAlign = 'center'
    ctx.fillText(labels[i], x + barW / 2, H - 8)

    // Frequency label above bar
    if (counts[i] > 0) {
      ctx.fillStyle = isDark ? '#d1d5db' : '#374151'
      ctx.fillText(counts[i].toString(), x + barW / 2, pad.top + ph - barH - 2)
    }
  }

  // Y-axis label
  ctx.fillStyle = isDark ? '#9ca3af' : '#6b7280'
  ctx.textAlign = 'right'
  ctx.fillText('freq', pad.left - 4, pad.top + 8)
}

function DiceCoins({ depth }: { depth: Depth }) {
  const [mode, setMode] = useState<DiceMode>('die1')
  const [n, setN] = useState(0)
  const [counts, setCounts] = useState<number[]>(Array(6).fill(0))
  const [pHeads, setPHeads] = useState(0.5)
  const [convergence, setConvergence] = useState<ConvergencePoint[]>([])
  const [seedStr, setSeedStr] = useState('')
  const rngRef = useRef<() => number>(Math.random)

  const barCanvas = useRef<HTMLCanvasElement>(null)
  const convCanvas = useRef<HTMLCanvasElement>(null)

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  function getLabels(): string[] {
    if (mode === 'die1') return ['1', '2', '3', '4', '5', '6']
    if (mode === 'dice2') return ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    return ['Tails', 'Heads']
  }

  function getTrueProbs(): number[] {
    if (mode === 'die1') return Array(6).fill(1 / 6)
    if (mode === 'dice2') {
      // Number of ways to make sum s with 2d6
      return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(s => {
        let ways = 0
        for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) ways++
        return ways / 36
      })
    }
    return [1 - pHeads, pHeads]
  }

  const trueValue = diceTrueValue(mode, pHeads)
  const targetIdx = mode === 'die1' ? 5 : mode === 'dice2' ? 5 : 1  // index of target outcome
  const estimate = n === 0 ? 0 : counts[targetIdx] / n

  const resetSim = useCallback(() => {
    const labels = mode === 'die1' ? Array(6).fill(0)
      : mode === 'dice2' ? Array(11).fill(0)
      : Array(2).fill(0)
    setN(0); setCounts(labels); setConvergence([])
    rngRef.current = makeRng(seedStr)
  }, [mode, seedStr])

  useEffect(() => { resetSim() }, [mode])

  const runBatch = useCallback((count: number) => {
    const rng = rngRef.current
    const newCounts = [...counts]
    let targetHits = 0

    for (let i = 0; i < count; i++) {
      if (mode === 'die1') {
        const face = Math.floor(rng() * 6)
        newCounts[face]++
        if (face === 5) targetHits++
      } else if (mode === 'dice2') {
        const sum = Math.floor(rng() * 6) + Math.floor(rng() * 6) + 2
        const idx = sum - 2
        newCounts[idx]++
        if (sum === 7) targetHits++
      } else {
        const heads = rng() < pHeads ? 1 : 0
        newCounts[heads]++
        if (heads === 1) targetHits++
      }
    }

    const newN = n + count
    const newEst = newCounts[targetIdx] / newN
    setN(newN)
    setCounts(newCounts)
    setConvergence(p => [...p, { n: newN, estimate: newEst }])
  }, [counts, n, mode, pHeads, targetIdx])

  useEffect(() => {
    if (barCanvas.current) {
      drawBarChart(barCanvas.current, counts, getLabels(), getTrueProbs(), n, isDark)
    }
  }, [counts, n, mode, pHeads, isDark])

  useEffect(() => {
    if (convCanvas.current) {
      drawConvergence(convCanvas.current, convergence, trueValue, diceModeLabel(mode), isDark)
    }
  }, [convergence, trueValue, mode, isDark])

  const modes: { key: DiceMode; label: string }[] = [
    { key: 'die1', label: '1d6' },
    { key: 'dice2', label: '2d6' },
    { key: 'coin', label: 'Coin' },
  ]

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">C — Dice &amp; Coins</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        Roll dice or flip coins to watch relative frequencies converge to theoretical probabilities.
      </p>

      {/* Mode selector */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 w-fit mb-4">
        {modes.map(m => (
          <button key={m.key} onClick={() => setMode(m.key)}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors ${
              mode === m.key
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}>
            {m.label}
          </button>
        ))}
      </div>

      {depth !== 'light' && (
        <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
          {mode === 'die1' && <p>Rolling a fair die: <Katex tex="P(6) = \tfrac{1}{6} \approx 0.1\overline{6}" /></p>}
          {mode === 'dice2' && <p>Two dice: <Katex tex="P(\text{sum}=7) = \tfrac{6}{36} = \tfrac{1}{6}" /> — the most likely sum.</p>}
          {mode === 'coin' && <p>Biased coin: adjust <em>p</em> below. True <Katex tex="P(\text{heads}) = p" />.</p>}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4 items-end">
        {mode === 'coin' && (
          <div>
            <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">
              P(heads) = {pHeads.toFixed(1)}
            </label>
            <input type="range" min={0.1} max={0.9} step={0.1} value={pHeads}
              onChange={e => { setPHeads(+e.target.value); resetSim() }}
              className="w-32" />
          </div>
        )}
        <div>
          <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">Seed</label>
          <input type="text" placeholder="empty = random" value={seedStr}
            onChange={e => setSeedStr(e.target.value)}
            className="w-28 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {([1, 10, 100] as const).map(b => (
          <button key={b} onClick={() => runBatch(b)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm">
            +{b}
          </button>
        ))}
        <button onClick={resetSim}
          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg px-4 py-2 text-sm">
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Outcome frequencies</p>
          <canvas ref={barCanvas} width={300} height={300}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            Convergence of {diceModeLabel(mode)}
          </p>
          <canvas ref={convCanvas} width={300} height={200}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
      </div>

      <StatsPanel n={n} estimate={estimate} trueValue={trueValue} label={diceModeLabel(mode)} />

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {n > 0 && `After ${n} rolls, ${diceModeLabel(mode)} estimate is ${estimate.toFixed(4)}`}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Simulation D — Random Walk
// ══════════════════════════════════════════════════════════════════════════════

function drawWalks(
  canvas: HTMLCanvasElement,
  traces: number[][],
  N: number,
  isDark: boolean,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const W = canvas.width, H = canvas.height
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = isDark ? '#111827' : '#f9fafb'
  ctx.fillRect(0, 0, W, H)

  if (traces.length === 0) {
    ctx.fillStyle = isDark ? '#6b7280' : '#9ca3af'
    ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Run the simulation to see walks', W / 2, H / 2)
    return
  }

  // Determine y range
  const allVals = traces.flat()
  const maxAbs = Math.max(Math.abs(Math.min(...allVals)), Math.abs(Math.max(...allVals)), 1)

  const pad = { top: 12, right: 12, bottom: 8, left: 12 }
  const pw = W - pad.left - pad.right
  const ph = H - pad.top - pad.bottom

  const toX = (step: number) => pad.left + (step / N) * pw
  const toY = (pos: number) => pad.top + ph / 2 - (pos / (maxAbs * 2)) * ph

  // Zero line
  ctx.strokeStyle = isDark ? '#374151' : '#e5e7eb'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 3])
  const zy = toY(0)
  ctx.beginPath(); ctx.moveTo(pad.left, zy); ctx.lineTo(pad.left + pw, zy); ctx.stroke()
  ctx.setLineDash([])

  // Draw traces
  traces.forEach((walk, wi) => {
    const alpha = Math.max(0.15, 1 - wi * 0.04)
    ctx.strokeStyle = isDark ? `rgba(96,165,250,${alpha})` : `rgba(59,130,246,${alpha})`
    ctx.lineWidth = 1
    ctx.beginPath()
    walk.forEach((pos, step) => {
      const x = toX(step), y = toY(pos)
      if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    })
    ctx.stroke()
  })
}

function RandomWalk({ depth }: { depth: Depth }) {
  const [completedWalks, setCompletedWalks] = useState(0)
  const [walkN, setWalkN] = useState(100)
  const [traces, setTraces] = useState<number[][]>([])
  const [finalPositions, setFinalPositions] = useState<number[]>([])
  const [convergence, setConvergence] = useState<ConvergencePoint[]>([])
  const [seedStr, setSeedStr] = useState('')
  const rngRef = useRef<() => number>(Math.random)

  const walkCanvas = useRef<HTMLCanvasElement>(null)
  const convCanvas = useRef<HTMLCanvasElement>(null)

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const trueValue = Math.sqrt(2 * walkN / Math.PI)
  const estimate = finalPositions.length === 0 ? 0
    : finalPositions.reduce((s, v) => s + Math.abs(v), 0) / finalPositions.length

  const resetSim = useCallback(() => {
    setCompletedWalks(0); setTraces([]); setFinalPositions([]); setConvergence([])
    rngRef.current = makeRng(seedStr)
  }, [seedStr])

  const runBatch = useCallback((count: number) => {
    const rng = rngRef.current
    const newWalks: number[][] = []
    const newFinals: number[] = []

    for (let i = 0; i < count; i++) {
      const walk: number[] = [0]
      let pos = 0
      for (let step = 0; step < walkN; step++) {
        pos += rng() < 0.5 ? 1 : -1
        walk.push(pos)
      }
      newWalks.push(walk)
      newFinals.push(pos)
    }

    setTraces(prev => {
      const all = [...prev, ...newWalks]
      return all.slice(-20)  // keep last 20 traces for display
    })
    setFinalPositions(prev => {
      const allFinals = [...prev, ...newFinals]
      const newN = allFinals.length
      const runMean = allFinals.reduce((s, v) => s + Math.abs(v), 0) / newN
      setConvergence(p => [...p, { n: newN, estimate: runMean }])
      setCompletedWalks(newN)
      return allFinals
    })
  }, [walkN])

  useEffect(() => {
    if (walkCanvas.current) {
      drawWalks(walkCanvas.current, traces, walkN, isDark)
    }
  }, [traces, walkN, isDark])

  useEffect(() => {
    if (convCanvas.current) {
      drawConvergence(convCanvas.current, convergence, trueValue, 'E(|Sₙ|)', isDark)
    }
  }, [convergence, trueValue, isDark])

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">D — Random Walk</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        Each step is ±1 with equal probability. We estimate the expected absolute displacement after <em>N</em> steps.
      </p>

      {depth !== 'light' && (
        <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
          <p className="mb-1">
            For a symmetric ±1 random walk of length <em>N</em>, the expected absolute final position satisfies:
          </p>
          <Katex display tex="E(|S_N|) \approx \sqrt{\frac{2N}{\pi}}" className="block my-2" />
          {depth === 'heavy' && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              This is an asymptotic result: it becomes exact as N → ∞. For small N there is meaningful deviation.
              The formula follows from the central limit theorem applied to the distribution of S_N.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4 items-end">
        <div>
          <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">
            Walk length N = {walkN}
          </label>
          <input type="range" min={10} max={500} value={walkN}
            onChange={e => { setWalkN(+e.target.value); resetSim() }}
            className="w-40" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">Seed</label>
          <input type="text" placeholder="empty = random" value={seedStr}
            onChange={e => setSeedStr(e.target.value)}
            className="w-28 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {([1, 10, 100] as const).map(b => (
          <button key={b} onClick={() => runBatch(b)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm">
            +{b}
          </button>
        ))}
        <button onClick={resetSim}
          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg px-4 py-2 text-sm">
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Walk traces (last 20)</p>
          <canvas ref={walkCanvas} width={300} height={300}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            Convergence of E(|S_N|)
          </p>
          <canvas ref={convCanvas} width={300} height={200}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
        </div>
      </div>

      <StatsPanel n={completedWalks} estimate={estimate} trueValue={trueValue} label="E(|Sₙ|)" />

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {completedWalks > 0 && `After ${completedWalks} walks, E(|Sₙ|) estimate is ${estimate.toFixed(4)}`}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Reflection Section (heavy only)
// ══════════════════════════════════════════════════════════════════════════════

const conceptQuestions = [
  {
    q: 'Why does the estimate become more accurate as n grows? Which theorem justifies this?',
    a: 'The Law of Large Numbers guarantees that relative frequency converges to the true probability as n → ∞. With more samples, random fluctuations cancel out and the average stabilises near the true value.',
  },
  {
    q: 'For the dartboard simulation, why do we use a quarter circle rather than a full circle?',
    a: "We can easily generate uniform random points in a unit square. A quarter circle of radius 1 fits exactly inside it, so the ratio of areas gives π/4 directly — no need for a full circle.",
  },
  {
    q: "In Buffon's Needle, why is the estimator only valid when L ≤ d?",
    a: 'When L > d, a single needle can cross more than one line simultaneously. The derivation of P(crossing) = 2L/(πd) assumes at most one crossing, so the formula breaks down for long needles.',
  },
  {
    q: 'The random walk E(|S_N|) ≈ √(2N/π) is an asymptotic result. What does this mean?',
    a: 'It means the formula becomes increasingly accurate as N grows large, but for small N the actual expected value can differ noticeably. The approximation is derived via the Central Limit Theorem, which itself is asymptotic.',
  },
]

const examQuestions = [
  {
    q: "A student drops 500 needles on a page with lines 6 cm apart. The needles are 4 cm long and 210 cross a line. Estimate π using Buffon's formula.",
    a: 'Using π ≈ 2Ln/(d × crossings) = (2 × 4 × 500) / (6 × 210) = 4000 / 1260 ≈ 3.175.',
  },
  {
    q: 'Describe how you would use Monte Carlo simulation to estimate P(X + Y > 1.5) where X, Y ~ Uniform(0, 1).',
    a: 'Generate a large number of pairs (x, y) with x and y each sampled independently from Uniform(0, 1). Count the fraction of pairs where x + y > 1.5. That relative frequency estimates the probability. (The true value is 0.125.)',
  },
]

function ReflectionSection() {
  const [conceptRevealed, setConceptRevealed] = useState<boolean[]>(conceptQuestions.map(() => false))
  const [examRevealed, setExamRevealed] = useState<boolean[]>(examQuestions.map(() => false))

  const toggle = (arr: boolean[], idx: number, set: (v: boolean[]) => void) => {
    const next = [...arr]; next[idx] = !next[idx]; set(next)
  }

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reflection</h2>

      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Conceptual questions</p>
      <div className="space-y-3 mb-6">
        {conceptQuestions.map((cq, i) => (
          <div key={i} className="rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
            <button
              onClick={() => toggle(conceptRevealed, i, setConceptRevealed)}
              className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 flex justify-between items-start gap-2"
            >
              <span>{cq.q}</span>
              <span className="text-gray-400 shrink-0 mt-0.5">{conceptRevealed[i] ? '▲' : '▼'}</span>
            </button>
            {conceptRevealed[i] && (
              <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">
                {cq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Exam-style questions</p>
      <div className="space-y-3">
        {examQuestions.map((eq, i) => (
          <div key={i} className="rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
            <button
              onClick={() => toggle(examRevealed, i, setExamRevealed)}
              className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 flex justify-between items-start gap-2"
            >
              <span>{eq.q}</span>
              <span className="text-gray-400 shrink-0 mt-0.5">{examRevealed[i] ? '▲' : '▼'}</span>
            </button>
            {examRevealed[i] && (
              <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">
                {eq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Main Page
// ══════════════════════════════════════════════════════════════════════════════

export default function MonteCarlo() {
  const [depth, setDepth] = useState<Depth>(() => {
    const saved = localStorage.getItem('mc-depth')
    return (saved === 'light' || saved === 'medium' || saved === 'heavy') ? saved : 'medium'
  })

  useEffect(() => { localStorage.setItem('mc-depth', depth) }, [depth])

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <DepthToggle depth={depth} setDepth={setDepth} />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Monte Carlo Simulations</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Using repeated random sampling to estimate quantities that are hard to compute analytically.
        </p>
      </div>

      {/* Intro card */}
      <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What is Monte Carlo?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Monte Carlo methods are named after the casino in Monaco — they harness <em>randomness</em> to solve
          deterministic problems. The idea: run a random experiment many times, then use the results to
          approximate a quantity you care about.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          <strong className="text-gray-900 dark:text-white">Real-life uses: </strong>
          particle physics (CERN simulations), finance (option pricing), epidemiology (disease spread modelling),
          and AI (AlphaGo's tree search).
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">VCE Methods connection: </strong>
          Monte Carlo is <em>relative frequency at scale</em>. As you run more trials, the relative frequency
          of an event approaches its theoretical probability — exactly what you study in probability.
        </p>

        {depth !== 'light' && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
            <strong>Law of Large Numbers: </strong>
            As the number of trials <em>n</em> → ∞, the sample mean converges to the true expected value.
            This is the mathematical guarantee underlying every Monte Carlo simulation — more samples always
            means a better estimate (on average).
          </div>
        )}
      </section>

      {/* Simulations */}
      <div className="space-y-6">
        <BuffonNeedle depth={depth} />
        <Dartboard depth={depth} />
        <DiceCoins depth={depth} />
        <RandomWalk depth={depth} />
        {depth === 'heavy' && <ReflectionSection />}
      </div>
    </div>
  )
}
