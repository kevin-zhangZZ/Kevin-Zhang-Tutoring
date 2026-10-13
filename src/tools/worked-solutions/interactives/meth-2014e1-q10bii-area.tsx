// 2014 Methods Exam 1 Q10b(ii) — the shaded area as the line pivots about Q(2, 4). Slide u over
// [5/2, 6]: the top plane shows the line V(0, v)–U(u, 0) with v = 4u/(u − 2), the rectangle OPQR and
// the two shaded triangles; the bottom plane traces A(u) = 2u²/(u − 2) − 8. The start state u = 6
// is the part a tangent (A = 10) — the report says some students simply assumed u = 6. The minimum
// is the stationary point (4, 8); the maximum is NOT a stationary point but the endpoint (5/2, 17),
// which is the b(iii) trap. Values checked with sympy: A(5/2) = 17, A(4) = 8, A(6) = 10.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider } from './kit'

const vOf = (u: number) => (4 * u) / (u - 2)
const area = (u: number) => (2 * u * u) / (u - 2) - 8

export default function AreaPivot() {
  const [u, setU] = useState(6)
  const v = vOf(u)
  const A = area(u)
  const t1 = v - 4 // triangle VRQ: ½ · 2 · (v − 4)
  const t2 = 2 * (u - 2) // triangle QPU: ½ · (u − 2) · 4
  const atMin = Math.abs(u - 4) < 0.06
  const atLeft = u < 2.56
  const atRight = u > 5.94

  let notice
  if (atMin) {
    notice = (
      <Notice tone="good">
        <b>Minimum: <M>A=8</M> at <M>u=4</M>.</b> The A-graph is flat here, so <M>{"A'(u)=0"}</M>. Both triangles have area{' '}
        <M>4</M>. Now drag <M>u</M> all the way left.
      </Notice>
    )
  } else if (atLeft) {
    notice = (
      <Notice tone="warn">
        <b>Maximum: <M>A=17</M> at the endpoint <M>{'u=\\tfrac52'}</M>.</b> The graph is not flat here, so{' '}
        <M>{"A'(u)=0"}</M> would never find it. On a closed interval the maximum can sit at an endpoint, which is what most
        students missed in b(iii).
      </Notice>
    )
  } else if (atRight) {
    notice = (
      <Notice>
        <M>u=6</M> is the part a tangent, with area <M>10</M>. It is just one end of the interval, not the minimum. Slide{' '}
        <M>u</M> left and watch <M>A</M> fall, then rise again.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The line always pivots about <M>Q(2,4)</M>: as <M>u</M> shrinks, <M>v</M> shoots up. One triangle grows while the
        other shrinks, so the total has a lowest point in between. Find it, then try both ends.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 6.5]} y={[0, 21]} yStep={4} height={300}>
        <Polygon points={[[0, 4], [0, v], [2, 4]]} color={C.g} fillOpacity={0.35} weight={1} />
        <Polygon points={[[2, 0], [2, 4], [u, 0]]} color={C.g} fillOpacity={0.35} weight={1} />
        <Polygon points={[[0, 0], [2, 0], [2, 4], [0, 4]]} color={C.guide} fillOpacity={0.12} weight={1.5} />
        <Plot.OfX y={x => v * (1 - x / u)} domain={[0, u]} color={C.f} weight={3} />
        <Point x={2} y={4} color={C.ink} />
        <Label at={[2, 4]} attach="ne">Q(2, 4)</Label>
        <Point x={u} y={0} color={C.f} />
        <Label at={[u, 0]} attach="n" color={C.f}>U</Label>
        <Point x={0} y={v} color={C.f} />
        <Label at={[0.25, v]} attach="e" color={C.f}>V</Label>
      </Plane>
      <Plane x={[2.5, 6]} y={[0, 18]} xStep={0.5} yStep={4} height={220} xLabel="u" yLabel="A">
        <Plot.OfX y={area} domain={[2.5, 6]} color={C.violet} weight={3} />
        <Point x={4} y={8} color={C.good} />
        <Label at={[4, 8]} attach="s" color={C.good}>min (4, 8)</Label>
        <Point x={2.5} y={17} color={C.bad} />
        <Label at={[2.5, 17]} attach="e" color={C.bad}>max (5/2, 17)</Label>
        <Point x={6} y={10} color={C.f} />
        <Label at={[6, 10]} attach="nw" color={C.f}>(6, 10)</Label>
        <Point x={u} y={A} color={C.ink} />
      </Plane>
      <Controls>
        <Slider label="u" value={u} onChange={setU} min={2.5} max={6} step={0.05} />
        <Readouts>
          <Readout color={C.f} tex={`v = \\tfrac{4u}{u-2} = ${v.toFixed(2)}`} />
          <Readout color={C.g} tex={`\\triangle VRQ + \\triangle QPU = ${t1.toFixed(2)} + ${t2.toFixed(2)}`} />
          <Readout color={C.violet} tex={`A = ${A.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
