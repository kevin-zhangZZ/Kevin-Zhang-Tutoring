// 2018 Specialist Exam 2 MCQ 6 — why the triangle z, iz, z + iz always has area |z|²/2. iz is z
// turned a quarter-turn anticlockwise with the same length, and z + iz completes the
// parallelogram, so 0, z, z + iz, iz is a square of side |z| and the (green) triangle is half of it.
// Drag z anywhere: the shoelace area of the actual triangle and |z|²/2 always agree. The toggle
// shows the wrong idea that the triangle is equilateral: an equilateral triangle on the same side
// z–iz (length √2|z|) has its apex (red) well beyond z + iz and area √3|z|²/2, option E.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Polygon, Readout, Readouts, Toggle, Vector, clamp, tick } from './kit'

type V = [number, number]
const XR: V = [-3, 3]
const YR: V = [-2.8, 2.8]

const add = (p: V, q: V): V => [p[0] + q[0], p[1] + q[1]]
const sub = (p: V, q: V): V => [p[0] - q[0], p[1] - q[1]]
const mul = (p: V, k: number): V => [p[0] * k, p[1] * k]
const len = (p: V) => Math.hypot(p[0], p[1])
const f2 = (v: number) => v.toFixed(2)

/** Keep |z| in [0.5, max] so every vertex stays on the plane (the equilateral apex reaches 1.93|z|, so max 1.4 then). */
function tidy([x, y]: V, max = 1.9): V {
  const r = Math.hypot(x, y) || 1
  const k = clamp(r, 0.5, max) / r
  return [x * k, y * k]
}

/** Label position pointing away from a centre point. */
function away(p: V, c: V): 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' {
  const [dx, dy] = sub(p, c)
  const ang = Math.atan2(dy, dx)
  const dirs = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se'] as const
  return dirs[((Math.round(ang / (Math.PI / 4)) % 8) + 8) % 8]
}

export default function HalfSquareWidget() {
  const [z, setZ] = useState<V>([1.5, -0.8])
  const [equi, setEqui] = useState(false)

  const iz: V = [-z[1], z[0]]
  const s = add(z, iz)
  const r = len(z)
  const centre = mul(s, 0.5)
  // Shoelace area of the triangle z, iz, z + iz.
  const area = Math.abs((iz[0] - z[0]) * (s[1] - z[1]) - (s[0] - z[0]) * (iz[1] - z[1])) / 2
  // Equilateral triangle on side z–iz, apex on the same side as z + iz.
  const m = mul(add(z, iz), 0.5)
  const u = mul(sub(s, m), 1 / len(sub(s, m)))
  const apex = add(m, mul(u, (Math.sqrt(3) / 2) * len(sub(z, iz))))

  // Right-angle markers: at 0 between z and iz, and at z + iz between the two sides.
  const e1 = mul(z, 0.22 / r)
  const e2 = mul(iz, 0.22 / r)
  const cornerO: V[] = [e1, add(e1, e2), e2]
  const cornerS: V[] = [sub(s, e1), sub(sub(s, e1), e2), sub(s, e2)]

  const notice = equi ? (
    <>
      If the triangle were equilateral, all three sides would equal <M>{'|z - iz| = \\sqrt2\\,|z|'}</M>, and its third corner would be the red
      point, well beyond <M>z + iz</M>. That triangle has area <M>{'\\tfrac{\\sqrt3}{4}\\big(\\sqrt2|z|\\big)^2 = \\tfrac{\\sqrt3|z|^2}{2}'}</M>, option
      E. The real triangle has sides <M>{'|z|,\\ |z|,\\ \\sqrt2|z|'}</M> and a right angle at <M>z + iz</M>.
    </>
  ) : (
    <>
      <M>iz</M> is always <M>z</M> turned a quarter-turn anticlockwise, with the same length. Adding them tip-to-tail completes a square of
      side <M>|z|</M>, and the diagonal from <M>z</M> to <M>iz</M> cuts it in half: the green triangle is one half. Drag <M>z</M> anywhere and
      check the two readouts agree.
    </>
  )

  return (
    <div>
      <Plane x={XR} y={YR} equalScale height={420} xLabel="" yLabel="Im" labels={v => (Math.abs(v) > 2.5 ? '' : tick(v))}>
        <Label at={[XR[1], 0]} attach="nw" size={14} gap={4} italic>Re</Label>
        {/* The square 0, z, z + iz, iz; the triangle asked about is the half away from 0. */}
        <Polygon points={[[0, 0], z, s, iz]} color={C.guide} fillOpacity={0.06} weight={1} />
        <Polygon points={[z, s, iz]} color={C.good} fillOpacity={0.3} weight={0} />
        <Line.Segment point1={z} point2={iz} color={C.good} weight={2.5} />
        {equi && (
          <>
            <Polygon points={[z, apex, iz]} color={C.bad} fillOpacity={0.08} weight={2} strokeStyle="dashed" />
            <Point x={apex[0]} y={apex[1]} color={C.bad} />
          </>
        )}
        <Vector tail={[0, 0]} tip={z} color={C.f} weight={2.5} />
        <Vector tail={[0, 0]} tip={iz} color={C.g} weight={2.5} />
        {/* Tip-to-tail: the triangle's other two sides are iz slid onto the tip of z (orange) and z
            slid onto the tip of iz (blue), so they have length |z| and meet at a right angle. */}
        <Line.Segment point1={z} point2={s} color={C.g} weight={2.5} />
        <Line.Segment point1={iz} point2={s} color={C.f} weight={2.5} />
        <Line.Segment point1={cornerO[0]} point2={cornerO[1]} color={C.ink} weight={1.2} />
        <Line.Segment point1={cornerO[1]} point2={cornerO[2]} color={C.ink} weight={1.2} />
        <Line.Segment point1={cornerS[0]} point2={cornerS[1]} color={C.good} weight={1.5} />
        <Line.Segment point1={cornerS[1]} point2={cornerS[2]} color={C.good} weight={1.5} />
        <Point x={s[0]} y={s[1]} color={C.good} />
        <Label at={s} attach={away(s, centre)} color={C.good} gap={9}>z + iz</Label>
        <Label at={iz} attach={away(iz, centre)} color={C.g} gap={9}>iz</Label>
        <Label at={z} attach={away(z, centre)} color={C.f} gap={12}>z</Label>
        <MovablePoint point={z} onMove={p => setZ(tidy(p as V, equi ? 1.4 : 1.9))} color={C.f} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout tex={`|z| = |iz| \\approx ${f2(r)}`} color={C.f} />
          <Readout tex={`\\text{triangle area} \\approx ${f2(area)}`} color={C.good} />
          <Readout tex={`\\tfrac{|z|^2}{2} \\approx ${f2((r * r) / 2)}`} color={C.good} />
          {equi && <Readout tex={`\\tfrac{\\sqrt3|z|^2}{2} \\approx ${f2((Math.sqrt(3) * r * r) / 2)}`} color={C.bad} />}
        </Readouts>
        <Toggle label="Wrong idea: the triangle is equilateral" checked={equi} onChange={v => { setEqui(v); if (v) setZ(tidy(z, 1.4)) }} />
        <Notice tone={equi ? 'warn' : 'neutral'}>{notice}</Notice>
      </Controls>
    </div>
  )
}
