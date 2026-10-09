// 2020 Specialist Exam 2 MCQ 12 — Euler's method, one step at a time: each step runs 0.1 across
// and rises 0.1 × (the gradient where the step STARTS). Stepping from (0, e) with
// dy/dx = e^{cos(x)}, the three steps read the gradient at x = 0, 0.1 and 0.2 and land on
// y₃ = e + 0.1(e + e^{cos 0.1} + e^{cos 0.2}) ≈ 3.5270 (option C); the exact solution
// y = e + ∫₀ˣ e^{cos t} dt is drawn for comparison (y(0.3) ≈ 3.5218). The method buttons rebuild
// the staircase the way each popular wrong option does it, checked numerically against the options:
// D (17%) reads each gradient at the END of its step (≈ 3.5152), E takes a fourth step, so it is y₄
// (≈ 3.7870), and B uses 1 for e^{cos 0} (≈ 3.3552). The violet tangent marks where the latest
// step's gradient was read. Underneath, a zoomed graph of the gradient e^{cos x} shows each step's
// gradient as a bar held flat across the step: C's bars start on the curve (left end), D's end on it,
// E's fourth bar sits past x₃ = 0.3, and B's first bar (1) is far below.

import { useState, type ReactNode } from 'react'
import { C, Controls, Katex, Label, Line, M, Notice, Plane, Plot, Point, StepNav, Toggle, integrate, num } from './kit'

const H = 0.1
const E = Math.E
const f = (x: number) => Math.exp(Math.cos(x))
// The exact solution through (0, e), tabulated once: y(x) = e + ∫₀ˣ e^{cos t} dt.
const TABLE = Array.from({ length: 441 }, (_, i) => E + integrate(f, 0, i / 1000, 40))
const exact = (x: number) => {
  const i = Math.max(0, Math.min(439, Math.floor(x * 1000)))
  const r = x * 1000 - i
  return TABLE[i] + (TABLE[i + 1] - TABLE[i]) * r
}

type Method = 'C' | 'D' | 'E' | 'B'
const STEPS: Record<Method, number> = { C: 3, D: 3, E: 4, B: 3 }
/** Where step n reads its gradient. */
const readAt = (m: Method, n: number) => (m === 'D' ? (n + 1) * H : n * H)
/** The gradient step n uses (option B takes e^{cos 0} as 1). */
const grad = (m: Method, n: number) => (m === 'B' && n === 0 ? 1 : f(readAt(m, n)))
/** The term step n adds inside the bracket, as TeX. */
const term = (m: Method, n: number) => {
  if (m === 'B' && n === 0) return '1'
  const x = readAt(m, n)
  return x === 0 ? 'e' : `e^{\\cos(${num(x, 1)})}`
}
const gradTex = (m: Method, n: number) => {
  if (m === 'B' && n === 0) return '1'
  const x = readAt(m, n)
  return x === 0 ? 'e^{\\cos(0)} = e' : `e^{\\cos(${num(x, 1)})}`
}

function path(m: Method): { x: number; y: number }[] {
  const pts = [{ x: 0, y: E }]
  for (let n = 0; n < STEPS[m]; n++) {
    const p = pts[n]
    pts.push({ x: p.x + H, y: p.y + H * grad(m, n) })
  }
  return pts
}

const Y0 = 2.7
const Y1 = 3.8
const X_TICKS = [0.1, 0.2, 0.3, 0.4]
const Y_TICKS = [2.8, 3.0, 3.2, 3.4, 3.6]
const SUB = ['₀', '₁', '₂', '₃', '₄']
// The gradient graph underneath is zoomed in: e^{cos x} only falls from 2.718 to 2.512 on [0, 0.4].
const G0 = 2.45
const G1 = 2.78
const G_TICKS = [2.5, 2.6, 2.7]

/** The rows of a wrong method's table where it departs from Euler's method. */
const wrongRow = (m: Method, k: number) => m === 'D' || (m === 'B' && k === 0) || (m === 'E' && k === 3)

const METHODS: { m: Method; label: ReactNode }[] = [
  { m: 'C', label: 'Euler (C)' },
  { m: 'D', label: 'Gradient at the end (D)' },
  { m: 'E', label: 'Four steps (E)' },
  { m: 'B', label: <>e<sup>cos 0</sup> taken as 1 (B)</> },
]

export default function EulerWidget() {
  const [method, setMethod] = useState<Method>('C')
  const [step, setStep] = useState(1)
  const count = STEPS[method] + 1
  const s = Math.min(step, count - 1)
  const pts = path(method)
  const right = method === 'C'
  const col = right ? C.g : C.bad
  const last = s === count - 1

  // The gradient being shown: the latest step's (or, before any step, the first one's).
  const n = Math.max(0, s - 1)
  const xr = readAt(method, n)
  const g = grad(method, n)
  const tangentY = method === 'B' && n === 0 ? E : exact(xr)
  const L = 0.055

  const bracket = Array.from({ length: s }, (_, k) => term(method, k)).join(' + ')
  const yNow = pts[s].y

  let notice
  if (method === 'C') {
    if (s === 0) {
      notice = (
        <Notice>
          Start at <M>{'(x_0, y_0) = (0, e)'}</M>. Euler&apos;s method moves using the one gradient you can be sure of: the one
          where you are standing. At <M>x_0 = 0</M>, <M>{'\\tfrac{dy}{dx} = e^{\\cos(0)} = e^1 = e \\approx 2.718'}</M> (the
          violet tangent). Press Next to take one step of 0.1.
        </Notice>
      )
    } else if (s === 1) {
      notice = (
        <Notice>
          Step 1: run 0.1 across, rise <M>{'0.1 \\times e^{\\cos(0)} = 0.1e'}</M>. So <M>{'y_1 = e + 0.1e \\approx 2.990'}</M>.
          The orange step runs parallel to the violet tangent at the start: Euler follows the tangent for one step. The
          next step starts at <M>x_1 = 0.1</M>. Which gradient will it use? (Below, the orange bar is that gradient, held flat
          for the step: it starts on the curve at <M>x = 0</M>.)
        </Notice>
      )
    } else if (s === 2) {
      notice = (
        <Notice>
          Step 2 starts at <M>x_1 = 0.1</M>, so it uses the gradient there, <M>{'e^{\\cos(0.1)} \\approx 2.705'}</M> (the violet
          tangent has moved along to 0.1): <M>{'y_2 = y_1 + 0.1e^{\\cos(0.1)} \\approx 3.261'}</M>. One more step.
        </Notice>
      )
    } else {
      notice = (
        <Notice tone="good">
          Step 3 starts at <M>x_2 = 0.2</M>, uses <M>{'e^{\\cos(0.2)} \\approx 2.665'}</M>, and lands on{' '}
          <M>{'y_3 \\approx 3.527'}</M> at <M>x_3 = 0.3</M>. <b>Three steps, three gradients, read at 0, 0.1 and 0.2.</b> The
          gradient at 0.3 is never used: you arrive there, you don&apos;t set off from there. That is option C. The exact{' '}
          <M>y(0.3) \approx 3.522</M>. Below, every bar <b>starts</b> on the gradient curve, and the last one stops at the
          dashed line <M>x_3</M>. The curve falls under each bar, which is why Euler lands a little high. Now try the wrong
          options&apos; methods.
        </Notice>
      )
    }
  } else if (method === 'D') {
    notice =
      s === 0 ? (
        <Notice>
          Option D starts at <M>(0, e)</M> too, but reads each gradient at the <b>end</b> of its step. Press Next and watch where
          the violet tangent is.
        </Notice>
      ) : !last ? (
        <Notice tone="warn">
          Step {s} ran from <M>{`x = ${num((s - 1) * H, 1)}`}</M> to <M>{`${num(s * H, 1)}`}</M>, but its gradient was read at{' '}
          <M>{`x = ${num(readAt('D', s - 1), 1)}`}</M> (the violet tangent), where the step <i>finishes</i>. Euler&apos;s rule{' '}
          <M>{'y_{n+1} = y_n + h\\,f(x_n)'}</M> uses <M>x_n</M>, where the step starts. Below, D&apos;s red bars <b>end</b> on the
          curve instead of starting on it.
        </Notice>
      ) : (
        <Notice tone="warn">
          D&apos;s bracket holds <M>{'e^{\\cos(0.1)}'}</M>, <M>{'e^{\\cos(0.2)}'}</M> and <M>{'e^{\\cos(0.3)}'}</M>: the first
          gradient, <M>{'e^{\\cos(0)} = e'}</M>, is missing, and the gradient at 0.3, the point you finish at, has crept in. It
          lands on about 3.515 instead of 3.527. The gap is small because <M>{'e^{\\cos(x)}'}</M> hardly changes here, which is
          exactly why the method has to be right: the picture can&apos;t tell you.
        </Notice>
      )
  } else if (method === 'E') {
    notice = last ? (
      <Notice tone="warn">
        Option E takes a <b>fourth</b> step, from <M>x_3 = 0.3</M> to 0.4, using <M>{'e^{\\cos(0.3)}'}</M>: the red bar past
        the dashed line. So it is{' '}
        <M>{'y_4 \\approx 3.787'}</M>, not <M>y_3</M>. The subscript counts steps: <M>y_3</M> is three steps from{' '}
        <M>x_0</M>, so three terms go in the bracket.
      </Notice>
    ) : (
      <Notice>
        Option E starts exactly like Euler&apos;s method and uses the right gradients. Keep pressing Next: the trouble is
        where it stops.
      </Notice>
    )
  } else {
    notice =
      s === 0 ? (
        <Notice tone="warn">
          Option B uses 1 as the first gradient, <M>{'e^{\\cos(0)}'}</M>. But <M>\cos(0) = 1</M>, so{' '}
          <M>{'e^{\\cos(0)} = e^1 = e \\approx 2.718'}</M>; it is <M>e^0</M> that equals 1. Press Next to see the first step.
        </Notice>
      ) : (
        <Notice tone="warn">
          With a gradient of 1 instead of <M>e</M>, the first red step is far flatter than the curve (below, its bar is off the
          bottom of the zoomed scale), and every later step
          starts from that wrong point, so B lands on about 3.355, not 3.527. (Option A makes the same slip and stops after
          two steps.)
        </Notice>
      )
  }

  return (
    <div>
      <Plane x={[-0.06, 0.42]} y={[Y0, Y1]} xStep={0.1} yStep={0.1} height={280} labels={false} xLabel="" yLabel="">
        {X_TICKS.map(v => (
          <Label key={v} at={[v, Y0]} attach="s" gap={5} size={12} bold={false}>
            {num(v, 1)}
          </Label>
        ))}
        <Label at={[0, Y0]} attach="sw" gap={5} size={12} bold={false}>0</Label>
        <Label at={[0.42, Y0]} attach="e" gap={6} size={14} italic>x</Label>
        {Y_TICKS.map(v => (
          <Label key={v} at={[0, v]} attach="w" gap={5} size={12} bold={false}>
            {num(v, 1)}
          </Label>
        ))}
        <Label at={[0, Y1]} attach="n" gap={6} size={14} italic>y</Label>

        {/* the exact solution curve */}
        <Plot.OfX y={exact} domain={[0, 0.43]} color={C.f} weight={2.5} />

        {/* the steps taken so far */}
        {pts.slice(0, s).map((p, k) => {
          const q = pts[k + 1]
          return (
            <g key={k}>
              <Line.Segment point1={[p.x, p.y]} point2={[q.x, p.y]} color={C.guide} style="dashed" weight={1.5} />
              <Line.Segment point1={[q.x, p.y]} point2={[q.x, q.y]} color={col} weight={2} opacity={0.7} />
              <Line.Segment point1={[p.x, p.y]} point2={[q.x, q.y]} color={col} weight={3.2} />
              {q.x < 0.35 && (
                <Label at={[q.x, (p.y + q.y) / 2]} attach="e" gap={5} size={11} color={col}>
                  {`0.1 × ${num(grad(method, k), 3)}`}
                </Label>
              )}
            </g>
          )
        })}

        {/* where the latest gradient is read: a short tangent of that slope */}
        <Line.Segment point1={[xr - L, tangentY - L * g]} point2={[xr + L, tangentY + L * g]} color={C.violet} weight={2.5} />
        <Point x={xr} y={tangentY} color={C.violet} />

        {pts.slice(0, s + 1).map((p, k) => (
          <g key={`p${k}`}>
            <Point x={p.x} y={p.y} color={k === s ? col : C.ink} />
            {k > 0 && (
              <Label at={[p.x, p.y]} attach="nw" gap={9} size={12} color={k === s ? col : C.ink}>
                {`y${SUB[k]}`}
              </Label>
            )}
          </g>
        ))}
      </Plane>
      <p className="mt-3 mb-1 text-[12.5px] text-gray-600 dark:text-gray-300">
        The gradient <M>{'\\tfrac{dy}{dx} = e^{\\cos(x)}'}</M>, zoomed in. Each bar is the gradient one step uses, held flat
        for the whole step; the violet dot is where it was read.
      </p>
      <Plane x={[-0.06, 0.42]} y={[G0 - 0.04, G1]} xStep={0.1} yStep={0.05} height={190} labels={false} xLabel="" yLabel="">
        {X_TICKS.map(v => (
          <Label key={v} at={[v, G0]} attach="s" gap={5} size={12} bold={false}>
            {num(v, 1)}
          </Label>
        ))}
        <Label at={[0, G0]} attach="sw" gap={5} size={12} bold={false}>0</Label>
        <Label at={[0.42, G0]} attach="e" gap={6} size={14} italic>x</Label>
        {G_TICKS.map(v => (
          <Label key={v} at={[0, v]} attach="w" gap={5} size={12} bold={false}>
            {String(v)}
          </Label>
        ))}
        <Line.Segment point1={[0, G0]} point2={[0.42, G0]} color={C.guide} weight={1.5} />
        {/* y₃ is reached at x₃ = 0.3: a bar to the right of this line is a fourth step */}
        <Line.Segment point1={[0.3, G0]} point2={[0.3, G1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[0.3, G1]} attach="se" gap={5} size={12} color={C.guide}>x₃</Label>
        <Plot.OfX y={f} domain={[0, 0.43]} color={C.f} weight={2.5} />
        <Label at={[0.36, f(0.36)]} attach="sw" gap={6} size={12} color={C.f}>dy/dx</Label>
        {Array.from({ length: s }, (_, k) => {
          const x0 = k * H
          const gk = grad(method, k)
          const barCol = wrongRow(method, k) ? C.bad : C.g
          const w = k === s - 1 ? 4 : 2.5
          if (gk < G0) {
            return (
              <g key={k}>
                <Line.Segment point1={[x0, G0 + 0.006]} point2={[x0 + H, G0 + 0.006]} color={C.bad} weight={w} style="dashed" />
                <Label at={[x0, G0 + 0.006]} attach="ne" gap={6} size={11} color={C.bad}>1 is far below</Label>
              </g>
            )
          }
          const xr = readAt(method, k)
          return (
            <g key={k}>
              <Line.Segment point1={[x0, gk]} point2={[x0 + H, gk]} color={barCol} weight={w} />
              <Line.Segment point1={[x0, G0]} point2={[x0, gk]} color={barCol} weight={1} opacity={0.5} />
              <Line.Segment point1={[x0 + H, G0]} point2={[x0 + H, gk]} color={barCol} weight={1} opacity={0.5} />
              <Point x={xr} y={f(xr)} color={C.violet} />
            </g>
          )
        })}
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          {METHODS.map(({ m, label }) => (
            <Toggle
              key={m}
              label={label}
              checked={method === m}
              onChange={() => {
                setMethod(m)
                setStep(Math.min(step, STEPS[m]))
              }}
            />
          ))}
        </div>
        <StepNav step={s} count={count} onBack={() => setStep(Math.max(0, s - 1))} onNext={() => setStep(Math.min(count - 1, s + 1))} />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px] text-gray-700 dark:text-gray-300">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                <th className="px-1.5 py-1 text-left font-normal">step</th>
                <th className="px-1.5 py-1 text-left font-normal">from <Katex tex="x_n" /></th>
                <th className="px-1.5 py-1 text-left font-normal">gradient used</th>
                <th className="px-1.5 py-1 text-left font-normal"><Katex tex="y_{n+1}" /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: s }, (_, k) => (
                <tr key={k} className={k === s - 1 ? 'bg-emerald-50 dark:bg-emerald-950/40' : ''}>
                  <td className="px-1.5 py-1">{k + 1}</td>
                  <td className="px-1.5 py-1"><Katex tex={num(k * H, 1)} /></td>
                  <td className="px-1.5 py-1" style={{ color: wrongRow(method, k) ? C.bad : undefined }}>
                    <Katex tex={gradTex(method, k)} />
                  </td>
                  <td className="px-1.5 py-1"><Katex tex={`\\approx ${num(pts[k + 1].y, 3)}`} /></td>
                </tr>
              ))}
              {s === 0 && (
                <tr>
                  <td colSpan={4} className="px-1.5 py-1 text-gray-500 dark:text-gray-400">No steps yet: <Katex tex="y_0 = e" /></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {s > 0 && (
          <div className="text-[13px] overflow-x-auto" style={{ color: right ? undefined : C.bad }}>
            <Katex tex={`y_{${s}} = e + 0.1\\left(${bracket}\\right) \\approx ${num(yNow, 3)}`} />
          </div>
        )}
        {notice}
      </Controls>
    </div>
  )
}
