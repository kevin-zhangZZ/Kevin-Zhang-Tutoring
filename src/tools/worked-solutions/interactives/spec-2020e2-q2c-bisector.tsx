// 2020 Specialist Exam 2 Q2c — |z − u| = |z − v| read as two distances. Drag z: its distances to
// u = −2 − i and v = −4 − 3i are drawn and measured live. They are equal exactly when z is on the
// line y = −x − 5, which crosses the segment uv at its midpoint (−3, −2) at right angles, so the
// locus is the perpendicular bisector of the segment joining u and v. Off the line, z is closer
// to whichever point is on its side.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Polyline, Readout, Readouts, clamp, num } from './kit'

type P = [number, number]
const U: P = [-2, -1]
const V: P = [-4, -3]
const MID: P = [-3, -2]
const dist = (p: P, q: P) => Math.hypot(p[0] - q[0], p[1] - q[1])
/** Foot of the perpendicular from p to the line x + y + 5 = 0. */
const project = (p: P): P => {
  const k = (p[0] + p[1] + 5) / 2
  return [p[0] - k, p[1] - k]
}
const X0 = -7
const X1 = 1.5
const Y0 = -6.5
const Y1 = 1.5

// Right-angle mark where the line meets segment uv: one side along uv (towards u), one along the line.
const S = 0.32
const A = [1 / Math.SQRT2, 1 / Math.SQRT2]
const B = [1 / Math.SQRT2, -1 / Math.SQRT2]
const RIGHT: P[] = [
  [MID[0] + S * A[0], MID[1] + S * A[1]],
  [MID[0] + S * (A[0] + B[0]), MID[1] + S * (A[1] + B[1])],
  [MID[0] + S * B[0], MID[1] + S * B[1]],
]

export default function Bisector() {
  const [z, setZ] = useState<P>([-1, -4])

  const move = (p: P) => {
    let q: P = [clamp(p[0], X0, X1), clamp(p[1], Y0, Y1)]
    const off = Math.abs(q[0] + q[1] + 5) / Math.SQRT2
    if (off < 0.15) q = project(q)
    setZ(q)
  }

  const du = dist(z, U)
  const dv = dist(z, V)
  const equal = Math.abs(du - dv) < 0.01
  const nearU = du < dv

  let notice
  if (equal) {
    notice = (
      <Notice tone="good">
        <b>
          <M>{`|z-u| = |z-v| \\approx ${num(du)}`}</M>
        </b>
        : this <M>z</M> is the same distance from <M>u</M> and <M>v</M>, and it sits on <M>y=-x-5</M>. Drag it along the
        line: both lengths change, but they stay equal. The line cuts the dashed segment <M>uv</M> at its midpoint{' '}
        <M>(-3,-2)</M> at right angles, which is exactly what &ldquo;the perpendicular bisector of the segment joining{' '}
        <M>u</M> and <M>v</M>&rdquo; means.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now <M>z</M> is closer to <M>{nearU ? 'u' : 'v'}</M> (<M>{`${num(nearU ? du : dv)} < ${num(nearU ? dv : du)}`}</M>),
        so it does not satisfy <M>|z-u|=|z-v|</M>. Every point on {nearU ? 'the upper-right' : 'the lower-left'} side of the
        line is closer to <M>{nearU ? 'u' : 'v'}</M>. Drag <M>z</M> until the two lengths match: you land on the line
        every time.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} equalScale height={420} xLabel="" yLabel="">
        <Label at={[X1, 0]} attach="nw" italic>
          Re(z)
        </Label>
        <Label at={[0, Y1]} attach="sw" italic>
          Im(z)
        </Label>
        <Line.ThroughPoints point1={[-5, 0]} point2={[0, -5]} color={equal ? C.good : C.guide} weight={equal ? 3 : 2} />
        <Line.Segment point1={U} point2={V} color={C.guide} style="dashed" weight={1.5} />
        <Polyline points={RIGHT} color={C.ink} weight={1.5} />
        <Point x={MID[0]} y={MID[1]} color={C.ink} />
        <Label at={[-5.8, 0.8]} attach="e" color={equal ? C.good : C.guide}>
          y = −x − 5
        </Label>
        <Line.Segment point1={z} point2={U} color={C.f} weight={3} />
        <Line.Segment point1={z} point2={V} color={C.g} weight={3} />
        <Point x={U[0]} y={U[1]} color={C.f} />
        <Point x={V[0]} y={V[1]} color={C.g} />
        <Label at={U} attach="n" color={C.f}>
          u
        </Label>
        <Label at={V} attach="w" color={C.g}>
          v
        </Label>
        <MovablePoint point={z} onMove={p => move([p[0], p[1]])} color={equal ? C.good : C.violet} />
        <Label at={z} attach="se" color={equal ? C.good : C.violet} gap={12}>
          z
        </Label>
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.f} tex={`|z-u| = ${num(du)}`} />
          <Readout color={C.g} tex={`|z-v| = ${num(dv)}`} />
          <Readout tex={`z = ${num(z[0])} ${z[1] < 0 ? '-' : '+'} ${num(Math.abs(z[1]))}i`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
