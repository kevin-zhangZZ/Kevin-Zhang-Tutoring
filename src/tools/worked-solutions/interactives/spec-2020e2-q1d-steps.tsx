// 2020 Specialist Exam 2 Q1d — the distance travelled from t = 0 to t = π/6 along x = 2sin(2t),
// y = 3cos(t) as a sum of short straight steps. Split the time into n equal pieces Δt; each step has
// length √(Δx² + Δy²) ≈ √((dx/dt)² + (dy/dt)²)·Δt, and adding them up tends to the integral
// ∫₀^{π/6} √((4cos2t)² + (−3sin t)²) dt ≈ 1.804. With n = 1 the "sum" is the straight chord from
// (0, 3) to (√3, 3√3/2), about 1.778 — the displacement, not the distance travelled.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, integrate, num } from './kit'

const X = (t: number) => 2 * Math.sin(2 * t)
const Y = (t: number) => 3 * Math.cos(t)
const SPEED = (t: number) => Math.hypot(4 * Math.cos(2 * t), 3 * Math.sin(t))
const T1 = Math.PI / 6
const ARC = integrate(SPEED, 0, T1, 400)
const tex = (v: number, dp = 3) => num(v, dp).replace('−', '-').replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')

export default function ArcSteps() {
  const [n, setN] = useState(3)
  const [legs, setLegs] = useState(true)
  const dt = T1 / n
  const pts: [number, number][] = Array.from({ length: n + 1 }, (_, k) => [X(k * dt), Y(k * dt)])
  const lengths = pts.slice(1).map((p, k) => Math.hypot(p[0] - pts[k][0], p[1] - pts[k][1]))
  const total = lengths.reduce((s, v) => s + v, 0)
  // the step whose Δx, Δy triangle is drawn: the middle one
  const m = Math.floor(n / 2)
  const [p0, p1] = [pts[m], pts[m + 1]]

  let notice
  if (n === 1) {
    notice = (
      <Notice tone="warn">
        One step is just the straight line from <M>(0,3)</M> to <M>{'\\left(\\sqrt3,\\tfrac{3\\sqrt3}{2}\\right)'}</M>:
        about <M>1.778</M> m. That is how far the particle ends up from where it started, not how far it travelled — the
        path bends, so the true distance is longer. Increase <M>n</M>.
      </Notice>
    )
  } else if (n >= 16) {
    notice = (
      <Notice tone="good">
        With {n} steps the sum is {num(total, 4)}, within {num(ARC - total, 4)} of the integral. As{' '}
        <M>{'\\Delta t\\to0'}</M> the sum of <M>{'\\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2}\\,\\Delta t'}</M>{' '}
        becomes <M>{'\\int_0^{\\pi/6}\\!\\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2}\\,dt\\approx1.804'}</M>.
        The <M>dt</M> is what is left of <M>{'\\Delta t'}</M> — leave it off and the integral has lost its steps.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each step lasts <M>{'\\Delta t'}</M>, moving <M>{'\\Delta x\\approx\\tfrac{dx}{dt}\\Delta t'}</M> across and{' '}
        <M>{'\\Delta y\\approx\\tfrac{dy}{dt}\\Delta t'}</M> down. By Pythagoras its length is about{' '}
        <M>{'\\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2}\\,\\Delta t'}</M>: speed × time. Add
        more steps and watch the total approach the integral.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.25, 2.25]} y={[1.9, 3.3]} xStep={0.5} yStep={0.5} equalScale height={340}>
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[T1, Math.PI / 3]} color={C.guide} weight={1.5} style="dashed" />
        <Plot.Parametric xy={s => [X(s), Y(s)]} domain={[0, T1]} color={C.f} weight={3.5} opacity={0.6} />
        {legs && (
          <>
            <Line.Segment point1={p0} point2={[p1[0], p0[1]]} color={C.violet} style="dashed" weight={2} />
            <Line.Segment point1={[p1[0], p0[1]]} point2={p1} color={C.violet} style="dashed" weight={2} />
            {n <= 4 && (
              <>
                <Label at={[(p0[0] + p1[0]) / 2, p0[1]]} attach="n" color={C.violet} size={12}>Δx</Label>
                <Label at={[p1[0], (p0[1] + p1[1]) / 2]} attach="e" color={C.violet} size={12}>Δy</Label>
              </>
            )}
          </>
        )}
        {pts.slice(1).map((p, k) => (
          <Line.Segment key={k} point1={pts[k]} point2={p} color={n === 1 ? C.bad : C.g} weight={2.5} />
        ))}
        {pts.map((p, k) => (
          <Point key={k} x={p[0]} y={p[1]} color={n === 1 ? C.bad : C.g} />
        ))}
        <Label at={pts[0]} attach="n" color={C.ink} size={12}>t = 0</Label>
        <Label at={pts[n]} attach="sw" color={C.ink} size={12}>t = π/6</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={24} step={1} format={v => `${v}`} />
        <Toggle label="Show one step's Δx and Δy" checked={legs} onChange={setLegs} />
        <Readouts>
          <Readout tex={`\\Delta t=\\tfrac{\\pi/6}{${n}}\\approx${tex(dt)}`} />
          <Readout color={n === 1 ? C.bad : C.g} tex={`\\text{sum of ${n} step${n === 1 ? '' : 's'}}\\approx${num(total, 4).replace('−', '-')}`} />
          <Readout color={C.f} tex={`\\text{integral}\\approx${tex(ARC)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
