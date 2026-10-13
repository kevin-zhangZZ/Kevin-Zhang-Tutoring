// 2014 Methods Exam 2 Q5e — two points on y = x⁴ − 8x with gradients m and −m. Slide m: the
// points u (gradient m, from 4u³ − 8 = m) and v (gradient −m, from 4v³ − 8 = −m) move, but the
// readout u³ + v³ stays at 4 for every m, because adding the two gradient equations cancels m
// (part e.i.). Part e.ii. is the one m where also u + v = 1: m = 4√5 ≈ 8.94, giving
// u = (1 + √5)/2 and v = (1 − √5)/2. The slider snaps there. Swapping u and v is impossible:
// the point with the positive gradient is always the one to the right of the minimum.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const g = (x: number) => x ** 4 - 8 * x
const M_E2 = 4 * Math.sqrt(5)
const HALF = 0.45 // half-width of each tangent segment, in x

export default function Gradients() {
  const [m, setM] = useState(12)
  const u = Math.cbrt((8 + m) / 4)
  const v = Math.cbrt((8 - m) / 4)
  const atE2 = Math.abs(m - M_E2) < 1e-9
  const onChange = (val: number) => setM(Math.abs(val - M_E2) < 0.25 ? M_E2 : val)

  const seg = (x0: number, k: number, color: string) => (
    <Line.Segment point1={[x0 - HALF, g(x0) - k * HALF]} point2={[x0 + HALF, g(x0) + k * HALF]} color={color} weight={3} />
  )

  return (
    <div>
      <Plane x={[-2, 2.5]} y={[-10, 18]} xStep={1} yStep={4} height={300}>
        <Plot.OfX y={g} domain={[-2, 2.5]} color={C.guide} weight={2} />
        {seg(u, m, C.f)}
        {seg(v, -m, C.g)}
        <Point x={u} y={g(u)} color={C.f} />
        <Point x={v} y={g(v)} color={C.g} />
        <Label at={[u, g(u)]} color={C.f} attach="se">u</Label>
        <Label at={[v, g(v)]} color={C.g} attach="sw">v</Label>
      </Plane>
      <Controls>
        <Slider label="m" value={m} onChange={onChange} min={0.5} max={16} step={0.1} />
        <Readouts>
          <Readout color={C.f} tex={`u^3 = \\tfrac{8+m}{4} = ${(u ** 3).toFixed(2)}`} />
          <Readout color={C.g} tex={`v^3 = \\tfrac{8-m}{4} = ${(v ** 3).toFixed(2)}`} />
          <Readout color={C.good} tex={`u^3+v^3 = ${(u ** 3 + v ** 3).toFixed(2)}`} />
          <Readout color={atE2 ? C.good : undefined} tex={`u+v = ${(u + v).toFixed(2)}`} />
        </Readouts>
        {atE2 ? (
          <Notice tone="good">
            <b>Part e.ii.: here <M>u + v = 1</M>.</b> This happens at <M>{'m = 4\\sqrt5 \\approx 8.94'}</M>, with{' '}
            <M>{'u = \\tfrac{1+\\sqrt5}{2} \\approx 1.62'}</M> and <M>{'v = \\tfrac{1-\\sqrt5}{2} \\approx -0.62'}</M>. The
            other pair from the quadratic swaps them, but then the point at <M>u</M> would sit on the falling side of the
            curve with a negative gradient, so it is rejected.
          </Notice>
        ) : (
          <Notice>
            Slide <M>m</M>: both points move, yet <M>{'u^3 + v^3'}</M> stays at <M>4</M>. That is part e.i.: adding{' '}
            <M>{'4u^3 - 8 = m'}</M> and <M>{'4v^3 - 8 = -m'}</M> cancels <M>m</M>. The point <M>u</M> (positive gradient)
            is always right of the minimum. Now find the <M>m</M> where <M>u + v = 1</M> (part e.ii.).
          </Notice>
        )}
      </Controls>
    </div>
  )
}
