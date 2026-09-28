// 2017 Methods Exam 2 MCQ 6 — a curve shaped like VCAA's f (steep, flattening onto the x-axis at
// a positive x-intercept, then a gentle straight line) and its reflection in y = x. Drag P along f:
// its mirror image P′ swaps the coordinates and lands on f⁻¹, and the gradient triangle at P turns
// over at P′ (run 1, rise m becomes rise 1, run m), giving the reciprocal gradient: steep becomes
// gentle, gentle becomes steep, straight stays straight and increasing stays increasing. A toggle draws the reflection in the x-axis instead, which is
// option A, falling instead of rising. The question gives no rule for f; the model is
// f(x) = −1.5(0.6 − x)² for x ≤ 0.6 and 0.4(x − 0.6) for x ≥ 0.6.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Toggle, clamp } from './kit'

const A = 0.6 // x-intercept of f
const K = 1.5
const MLINE = 0.4 // gradient of the straight part
const T0 = -0.4
const T1 = 2

const f = (x: number) => (x <= A ? -K * (A - x) ** 2 : MLINE * (x - A))
const df = (x: number) => (x < A ? 2 * K * (A - x) : MLINE)

const SAMPLES = Array.from({ length: 1001 }, (_, i) => T0 + ((T1 - T0) * i) / 1000)
function nearestOnF([mx, my]: [number, number]): number {
  let best = T0
  let bestD = Infinity
  for (const t of SAMPLES) {
    const d = (t - mx) ** 2 + (f(t) - my) ** 2
    if (d < bestD) {
      bestD = d
      best = t
    }
  }
  return best
}

const n2 = (v: number) => (Math.abs(v) < 0.005 ? '0.00' : v.toFixed(2))

export default function Reflect() {
  const [t, setT] = useState(-0.3)
  const [showA, setShowA] = useState(false)

  const P: [number, number] = [t, f(t)]
  const Q: [number, number] = [f(t), t] // P′
  const s = df(t)
  // Gradient triangles on the tangents: at P a rise of s·d (the "m" side) then a run of d (the "1"
  // side); reflected in y = x, at P′ the m side is horizontal and the 1 side vertical. Drawn on the
  // side of each tangent away from its curve (f is concave down, f⁻¹ concave up).
  const d = 0.75 / Math.hypot(1, s)
  const P1: [number, number] = [P[0], P[1] + s * d]
  const P2: [number, number] = [P[0] + d, P[1] + s * d]
  const Q1: [number, number] = [Q[0] + s * d, Q[1]]
  const Q2: [number, number] = [Q[0] + s * d, Q[1] + d]
  const showM = s * d > 0.15
  const straight = t >= A
  const nearFlat = !straight && s < 0.05
  const recip = nearFlat ? '\\text{vertical}' : `\\tfrac{1}{${n2(s)}}=${n2(1 / s)}`

  let notice
  if (showA) {
    notice = (
      <Notice tone="warn">
        The red dashed curve is <M>{'y=-f(x)'}</M>, the reflection in the <M>x</M>-axis, and it has the shape of option A.
        It <em>falls</em> from left to right. An inverse swaps <M>x</M> and <M>y</M>, which reflects in{' '}
        <M>y=x</M>, and that never turns an uphill graph into a downhill one: the orange <M>{'f^{-1}'}</M> still
        rises. Switch the toggle off and drag P.
      </Notice>
    )
  } else if (straight) {
    notice = (
      <Notice tone="good">
        On the straight part the gradient is <M>0.4</M> everywhere, so on <M>{'f^{-1}'}</M> it is{' '}
        <M>{'\\tfrac{1}{0.4}=2.5'}</M> everywhere: still a straight line, now steep. Put together,{' '}
        <M>{'f^{-1}'}</M> rises, is gentle on the left and steep and straight on the right, and crosses the <M>x</M>-axis
        left of the origin and the <M>y</M>-axis above it. Only option C looks like that. Now switch on the option A toggle.
      </Notice>
    )
  } else if (s < 1) {
    notice = (
      <Notice>
        Near its <M>x</M>-intercept this <M>f</M> flattens out (gradient <M>{n2(s)}</M>), so there{' '}
        <M>{'f^{-1}'}</M> is steep{nearFlat ? ', almost vertical' : <> (gradient <M>{recip}</M>)</>}, heading towards vertical at the intercept. The <M>x</M>-intercept <M>{'(0.6,\\ 0)'}</M> of <M>f</M> becomes the{' '}
        <M>y</M>-intercept <M>{'(0,\\ 0.6)'}</M> of <M>{'f^{-1}'}</M>, above the origin, where the gentle and steep
        pieces of <M>{'f^{-1}'}</M> join. Now drag P onto the straight part.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At P the graph of <M>f</M> is steep: its gradient triangle has run <M>1</M> and rise <M>{`m=${n2(s)}`}</M>.
        Reflecting in <M>y=x</M> turns the triangle over, so the run becomes a rise and the rise becomes a run: the
        gradient at P′ is <M>{recip}</M>, gentle. That is why the steep lower-left part of{' '}
        <M>f</M> turns into the gentle left-hand part of <M>{'f^{-1}'}</M>. Drag P up towards the <M>x</M>-axis.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.6, 2.05]} y={[-1.6, 2.05]} xStep={0.5} yStep={0.5} equalScale height={460} labels={false}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[1.95, 1.95]} color={C.guide} attach="w">
          y = x
        </Label>
        {showA && <Plot.OfX y={x => -f(x)} domain={[T0, T1]} color={C.bad} weight={2.5} style="dashed" />}
        {showA && (
          <Label at={[1.55, -f(1.55)]} color={C.bad} attach="s" gap={10}>
            option A: y = −f(x)
          </Label>
        )}
        <Plot.OfX y={f} domain={[T0, T1]} color={C.f} weight={3} />
        <Plot.Parametric xy={u => [f(u), u]} domain={[T0, T1]} color={C.g} weight={3} />
        <Label at={[1.75, f(1.75)]} color={C.f} attach="se">
          f
        </Label>
        <Label at={[f(1.55), 1.55]} color={C.g} attach="w" gap={9}>
          f⁻¹
        </Label>
        <Line.Segment point1={P} point2={Q} color={C.guide} style="dashed" weight={1.5} />
        <Point x={(P[0] + Q[0]) / 2} y={(P[1] + Q[1]) / 2} color={C.guide} />
        <Polygon points={[P, P1, P2]} color={C.f} fillOpacity={0.15} weight={1} />
        <Polygon points={[Q, Q1, Q2]} color={C.g} fillOpacity={0.15} weight={1} />
        <Line.Segment point1={P} point2={P1} color={C.ink} weight={3.5} />
        <Line.Segment point1={P1} point2={P2} color={C.violet} weight={3.5} />
        <Line.Segment point1={Q} point2={Q1} color={C.ink} weight={3.5} />
        <Line.Segment point1={Q1} point2={Q2} color={C.violet} weight={3.5} />
        <Label at={[P[0] + d / 2, P1[1]]} attach="n" color={C.violet} size={12} gap={4}>
          1
        </Label>
        <Label at={[Q1[0], Q[1] + d / 2]} attach="e" color={C.violet} size={12} gap={4}>
          1
        </Label>
        {showM && (
          <Label at={[P[0], P[1] + (s * d) / 2]} attach="w" size={12} gap={5}>
            m
          </Label>
        )}
        {showM && (
          <Label at={[Q[0] + (s * d) / 2, Q[1]]} attach="s" size={12} gap={5}>
            m
          </Label>
        )}
        <Point x={Q[0]} y={Q[1]} color={C.g} />
        <Label at={Q} color={C.g} attach="nw">
          P′
        </Label>
        <Label at={P} color={C.f} attach="se">
          P
        </Label>
        <MovablePoint point={P} onMove={pt => setT(clamp(nearestOnF(pt), T0, T1))} color={C.f} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.f} tex={`P(${n2(P[0])},\\ ${n2(P[1])}):\\ \\text{gradient } ${n2(s)}`} />
          <Readout color={C.g} tex={`P'(${n2(Q[0])},\\ ${n2(Q[1])}):\\ \\text{gradient } ${recip}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Drag the blue point P along <i>f</i>. The shaded triangles show rise over run at P and P′.
        </p>
        <Toggle label="Reflect in the x-axis instead (option A)" checked={showA} onChange={setShowA} />
        {notice}
      </Controls>
    </div>
  )
}
