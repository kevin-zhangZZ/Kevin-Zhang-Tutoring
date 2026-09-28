// 2020 Specialist Exam 2 Q2e — the centre of the circle through u = −2 − i, v = −4 − 3i and −5i
// is the one point the same distance from all three. Drag a candidate centre z_c = m + ni: the
// circle is drawn centred at z_c through −5i, and the distances to u and v are measured against
// its radius. Each equation in the working is a straight line of candidate centres, the
// perpendicular bisector of two of the points: m − 2n = 5 (u and −5i are equally far) and
// n = 2m (v and −5i are equally far). The centre is where they cross, (−5/3, −10/3), with
// r = 5√2/3. A toggle adds part a.'s line y = −x − 5, which passes through the same point.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, Toggle,
  clamp, num, tick,
} from './kit'

type P = [number, number]
const U: P = [-2, -1]
const V: P = [-4, -3]
const W: P = [0, -5]
const Z: P = [-5 / 3, -10 / 3]
const dist = (p: P, q: P) => Math.hypot(p[0] - q[0], p[1] - q[1])
const X0 = -7
const X1 = 2
const Y0 = -7
const Y1 = 1

// The two lines of the working, as a·m + b·n = c, and part a.'s line.
const L1 = { a: 1, b: -2, c: 5 } // m − 2n = 5  (|z_c − u| = |z_c + 5i|)
const L2 = { a: 2, b: -1, c: 0 } // n = 2m      (|z_c − v| = |z_c + 5i|)
const L3 = { a: 1, b: 1, c: -5 } // n = −m − 5  (|z_c − u| = |z_c − v|)
type L = typeof L1
const gap = (l: L, p: P) => Math.abs(l.a * p[0] + l.b * p[1] - l.c) / Math.hypot(l.a, l.b)
const foot = (l: L, p: P): P => {
  const k = (l.a * p[0] + l.b * p[1] - l.c) / (l.a * l.a + l.b * l.b)
  return [p[0] - k * l.a, p[1] - k * l.b]
}

export default function Centre() {
  const [c, setC] = useState<P>([1, -3])
  const [showA, setShowA] = useState(false)

  const move = (p: P) => {
    let q: P = [clamp(p[0], X0, X1), clamp(p[1], Y0, Y1)]
    if (dist(q, Z) < 0.2) q = Z
    else {
      const lines = showA ? [L1, L2, L3] : [L1, L2]
      const near = lines.find(l => gap(l, q) < 0.12)
      if (near) q = foot(near, q)
    }
    setC(q)
  }

  const r = dist(c, W)
  const du = dist(c, U)
  const dv = dist(c, V)
  const onU = Math.abs(du - r) < 0.01
  const onV = Math.abs(dv - r) < 0.01
  const onUV = showA && Math.abs(du - dv) < 0.01
  const done = onU && onV

  let notice
  if (done) {
    notice = (
      <Notice tone="good">
        <b>All three distances are equal</b>, so the circle through <M>-5i</M> also passes through <M>u</M> and <M>v</M>:{' '}
        <M>{'z_c=-\\tfrac53-\\tfrac{10}{3}i'}</M> and <M>{'r=\\tfrac{5\\sqrt2}{3}\\approx 2.36'}</M>. It is where the two lines
        cross, so solving the two equations simultaneously <em>is</em> finding this crossing.{' '}
        {showA ? 'Part a.’s line goes through it too.' : 'Turn on part a.’s line: it goes through the same point.'}
      </Notice>
    )
  } else if (onU) {
    notice = (
      <Notice>
        Here <M>{'|z_c-u|=|z_c+5i|'}</M>, so the circle through <M>-5i</M> also passes through <M>u</M>. Every point on the
        sky line does that: it is the first equation, <M>m-2n=5</M>. But <M>v</M> is off the circle. Slide along the sky
        line to where it meets the orange one.
      </Notice>
    )
  } else if (onV) {
    notice = (
      <Notice>
        Here <M>{'|z_c-v|=|z_c+5i|'}</M>, so the circle passes through <M>v</M>. Every point on the orange line does that:
        it is the second equation, <M>n=2m</M>. But <M>u</M> is off the circle. Slide along the orange line to where it
        meets the sky one.
      </Notice>
    )
  } else if (onUV) {
    notice = (
      <Notice>
        This point is the same distance from <M>u</M> and <M>v</M> (it is on part a.&apos;s line), but not from{' '}
        <M>-5i</M>, so no circle centred here passes through all three points. Slide along the dashed line to the crossing.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        A circle centred at <M>z_c</M> through <M>-5i</M> misses <M>u</M> and <M>v</M>: the centre must be the{' '}
        <b>same distance from all three points</b>. The sky line is every point as far from <M>u</M> as from{' '}
        <M>-5i</M>; the orange line is every point as far from <M>v</M> as from <M>-5i</M>. Drag <M>z_c</M> to where they
        cross.
      </Notice>
    )
  }

  const ring = done ? C.good : C.guide

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} equalScale height={440} xLabel="" yLabel="" yLabels={v => (Math.abs(v + 5) < 1e-9 ? '' : tick(v))}>
        <Label at={[X1, 0]} attach="nw" italic>
          Re(z)
        </Label>
        <Label at={[0, Y1]} attach="sw" italic>
          Im(z)
        </Label>
        <Line.ThroughPoints point1={[5, 0]} point2={[1, -2]} color={C.f} weight={2} />
        <Line.ThroughPoints point1={[0, 0]} point2={[-1, -2]} color={C.g} weight={2} />
        {showA && <Line.ThroughPoints point1={[-5, 0]} point2={[0, -5]} color={C.violet} weight={2} style="dashed" />}
        <Label at={[-5, -5]} attach="se" color={C.f}>
          m − 2n = 5
        </Label>
        <Label at={[-3.2, -6.4]} attach="e" color={C.g}>
          n = 2m
        </Label>
        {showA && (
          <Label at={[-6.2, 1.2]} attach="e" color={C.violet}>
            y = −x − 5
          </Label>
        )}
        <Circle center={c} radius={r} color={ring} fillOpacity={done ? 0.08 : 0} weight={done ? 3 : 2} />
        <Line.Segment point1={c} point2={U} color={C.f} weight={onU || done ? 3 : 1.5} style={onU || done ? 'solid' : 'dashed'} />
        <Line.Segment point1={c} point2={V} color={C.g} weight={onV || done ? 3 : 1.5} style={onV || done ? 'solid' : 'dashed'} />
        <Line.Segment point1={c} point2={W} color={C.ink} weight={1.5} />
        <Point x={U[0]} y={U[1]} color={C.f} />
        <Point x={V[0]} y={V[1]} color={C.g} />
        <Point x={W[0]} y={W[1]} color={C.ink} />
        <Label at={U} attach="ne" color={C.f}>
          u
        </Label>
        <Label at={V} attach="w" color={C.g}>
          v
        </Label>
        <Label at={W} attach="e" color={C.ink}>
          −5i
        </Label>
        <MovablePoint point={c} onMove={p => move([p[0], p[1]])} color={done ? C.good : C.violet} />
        <Label at={c} attach="n" color={done ? C.good : C.violet} gap={14}>
          centre
        </Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Add part a.'s line (u and v equally far)" checked={showA} onChange={setShowA} />
          <ActionButton label="Jump to the crossing" onClick={() => setC(Z)} />
        </Buttons>
        <Readouts>
          <Readout tex={`z_c = ${num(c[0])} ${c[1] < 0 ? '-' : '+'} ${num(Math.abs(c[1]))}i`} />
          <Readout color={C.f} tex={`|z_c-u| = ${num(du)}`} />
          <Readout color={C.g} tex={`|z_c-v| = ${num(dv)}`} />
          <Readout tex={`|z_c+5i| = ${num(r)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
