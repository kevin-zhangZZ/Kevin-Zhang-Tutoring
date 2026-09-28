// 2020 Methods Exam 1 Q8a — drag P along f(x) = x·log_e(x) and watch its tangent, whose gradient is
// f′(x) = log_e(x) + 1: negative left of Q, zero at x = 1/e (the tangent lies flat at the minimum
// Q(1/e, −1/e)), positive after it (and exactly 1 at the intercept x = 1, used again in d.ii).
// The toggle "What if I multiply the derivatives?" adds the line of gradient 1 × 1/x that you get
// by differentiating each factor and multiplying: it cuts across the curve instead of touching it,
// and since 1/x is never 0 it could never find Q.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, clamp, tick } from './kit'

const A = 1 / Math.E
const f = (x: number) => x * Math.log(x)
const fp = (x: number) => Math.log(x) + 1
const X_MIN = 0.05
const X_MAX = 1.45
const SNAP = 0.025

// Snap the dragged point to the nearest point of f — near O the curve is steep, so snapping by x
// alone would ignore a mostly vertical drag.
const SAMPLES = Array.from({ length: 701 }, (_, i) => X_MIN + ((X_MAX - X_MIN) * i) / 700)
function nearestOnF([mx, my]: [number, number]): number {
  let best = SAMPLES[0]
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = (x - mx) ** 2 + (f(x) - my) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return Math.abs(best - A) < SNAP ? A : best
}

/** A short piece of the line through p with gradient m, at most `half` either side in x and
 *  about `rise` either side in y, so a steep line doesn't shoot off the plane. */
function piece(p: [number, number], m: number, half = 0.32, rise = 0.3): [[number, number], [number, number]] {
  const dx = Math.min(half, rise / Math.max(Math.abs(m), 1e-9))
  // Stop at the y-axis: the domain is x > 0, and past it the line would run over the tick numbers.
  const left = Math.max(0, p[0] - dx)
  return [
    [left, p[1] - m * (p[0] - left)],
    [p[0] + dx, p[1] + m * dx],
  ]
}

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

const fmt = (v: number) => v.toFixed(2).replace('-', '−')

export default function FlatWidget() {
  const [x, setX] = useState(0.22)
  const [wrong, setWrong] = useState(false)
  const P: [number, number] = [x, f(x)]
  const m = fp(x)
  const atQ = x === A
  const [t1, t2] = piece(P, m)
  const [w1, w2] = piece(P, 1 / x)
  const tanColor = atQ ? C.good : C.g

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Differentiating each factor and multiplying gives <M>{'1 \\times \\tfrac1x = \\tfrac1x'}</M>, and the red line
        is a line through P with that gradient (<M>\approx {fmt(1 / x)}</M>). It <b>cuts across</b> the curve instead of
        touching it, so it is not the tangent. Worse, <M>{'\\tfrac1x'}</M> is positive for every <M>x &gt; 0</M> and is
        never 0, so it would say the curve has no turning point at all, although the graph clearly dips to Q. The
        product rule differentiates one factor at a time:{' '}
        <M>{"(x)'\\log_e(x) + x\\left(\\log_e(x)\\right)' = \\log_e(x) + 1"}</M>, the orange tangent.
      </Notice>
    )
  } else if (atQ) {
    notice = (
      <Notice tone="good">
        <b>The tangent is flat: <M>f&apos;(x) = 0</M>.</b> <M>\log_e(x) + 1 = 0</M> gives <M>\log_e(x) = -1</M>, so{' '}
        <M>{'x = e^{-1} = \\tfrac1e \\approx 0.37'}</M>. A log <i>can</i> be negative: only its input <M>x</M> has to
        be positive. Then <M>{'f\\left(\\tfrac1e\\right) = \\tfrac1e \\log_e\\left(e^{-1}\\right) = \\tfrac1e \\times (-1) = -\\tfrac1e'}</M>,
        so <M>{'Q = \\left(\\tfrac1e, -\\tfrac1e\\right) \\approx (0.37, -0.37)'}</M>.
      </Notice>
    )
  } else if (x < A) {
    notice = (
      <Notice>
        Left of Q the curve is falling, so the tangent slopes down: <M>f&apos;(x) = \log_e(x) + 1</M> is negative here,
        because <M>\log_e(x) &lt; -1</M> when <M>{'x < \\tfrac1e'}</M>. Drag P to the right and watch the gradient
        climb towards 0.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Right of Q the curve is rising: <M>f&apos;(x) = \log_e(x) + 1 &gt; 0</M>. The gradient went from negative to
        positive, so somewhere in between it was 0, and that is Q. Drag P back until the tangent is flat. (At the
        intercept <M>x = 1</M> the gradient is exactly <M>\log_e(1) + 1 = 1</M>: part d.ii uses that.)
      </Notice>
    )
  }

  return (
    <div>
      {/* y numbers at ±1/2 only: ±1/4 sat under P and its tangent near the y-axis. */}
      <Plane x={[0, 1.5]} y={[-0.5, 0.6]} xStep={0.25} yStep={0.25} height={300} yLabels={v => (Math.abs(Math.abs(v) - 0.5) < 1e-9 ? tick(v) : '')}>
        <Plot.OfX y={f} domain={[1e-6, 1.5]} color={C.f} weight={3} />
        <OpenPoint x={0} y={0} color={C.f} />
        <Label at={[1.4, f(1.4)]} color={C.f} attach="nw">f</Label>
        {wrong && <Line.Segment point1={w1} point2={w2} color={C.bad} style="dashed" weight={2.5} />}
        <Line.Segment point1={t1} point2={t2} color={tanColor} weight={2.5} />
        {!atQ && <Point x={A} y={-A} color={C.ink} opacity={0.5} />}
        {/* Above Q, inside the bowl: below it the tangent from P runs past. Further up when P sits
            on Q, clear of the drag ring. */}
        <Label at={[A, -A]} attach="n" gap={atQ ? 20 : 11} size={12}>Q</Label>
        <MovablePoint point={P} onMove={p => setX(clamp(nearestOnF(p), X_MIN, X_MAX))} color={atQ ? C.good : C.f} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.f} tex={`P \\approx (${fmt(x)},\\ ${fmt(f(x))})`} />
          <Readout color={tanColor} tex={`f'(x) = \\log_e(x) + 1 \\approx ${atQ ? '0' : fmt(m)}`} />
          {wrong && <Readout color={C.bad} tex={`\\tfrac1x \\approx ${fmt(1 / x)}`} />}
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the blue point P along the curve.</p>
        <div className="flex flex-wrap items-center gap-2">
          <Toggle label="What if I multiply the derivatives?" checked={wrong} onChange={setWrong} />
        </div>
        {notice}
      </Controls>
    </div>
  )
}
