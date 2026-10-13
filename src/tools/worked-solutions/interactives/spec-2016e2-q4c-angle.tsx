// 2016 Specialist Exam 2 Q4c — the angle between the paths is the angle between the velocity
// (direction) vectors (−5, 3) and (4, 5), which never changes: 97.7° (the acute angle at the same
// crossing is 180° − 97.7° = 82.3°). A toggle draws the position vectors OA and OB at a chosen t —
// the report's error — and their angle changes as t moves (53.1° at t = 1, 29.1° at t = 2).
// Values checked with sympy: cos θ = −5/√1394 ≈ −0.1339, θ = 97.696°; paths cross at
// (−40/37, 246/37) ≈ (−1.08, 6.65), which A reaches at t = 45/37 and B at t = 64/37.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider, Toggle, Vector, num } from './kit'

const A = (t: number): [number, number] => [5 - 5 * t, 3 + 3 * t]
const B = (t: number): [number, number] => [4 * t - 8, 5 * t - 2]
const P: [number, number] = [-40 / 37, 246 / 37]
const L = 4
const uA: [number, number] = [-5 / Math.sqrt(34), 3 / Math.sqrt(34)]
const uB: [number, number] = [4 / Math.sqrt(41), 5 / Math.sqrt(41)]
const OBTUSE = (Math.acos(-5 / Math.sqrt(1394)) * 180) / Math.PI
const at = (u: [number, number], k: number): [number, number] => [P[0] + k * u[0], P[1] + k * u[1]]
const unit = (v: [number, number]): [number, number] => {
  const n = Math.hypot(v[0], v[1])
  return [v[0] / n, v[1] / n]
}
const bisObtuse = unit([uA[0] + uB[0], uA[1] + uB[1]])
const bisAcute = unit([uB[0] - uA[0], uB[1] - uA[1]])

export default function Angle() {
  const [trap, setTrap] = useState(false)
  const [t, setT] = useState(1)
  const a = A(t)
  const b = B(t)
  const posAngle = (Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180) / Math.PI

  return (
    <div>
      <Plane x={[-8, 6]} y={[-2, 12]} xStep={2} yStep={2} equalScale height={420}>
        <Line.Segment point1={A(0)} point2={A(7 / 3)} color={C.f} weight={2} />
        <Line.Segment point1={B(0)} point2={B(2.4)} color={C.g} weight={2} />
        <Line.Segment point1={P} point2={at(uA, -L)} color={C.guide} style="dashed" weight={2} />
        <Vector tail={P} tip={at(uA, L)} color={C.f} weight={3.5} />
        <Vector tail={P} tip={at(uB, L)} color={C.g} weight={3.5} />
        <Label at={at(uA, L)} color={C.f} attach="w">(−5, 3)</Label>
        <Label at={at(uB, L)} color={C.g} attach="e">(4, 5)</Label>
        <Label at={at(bisObtuse, 2.6)} color={C.good} attach="c">97.7°</Label>
        <Label at={at(bisAcute, 3.2)} color={C.guide} attach="c" size={12}>82.3°</Label>
        {trap && (
          <>
            <Vector tail={[0, 0]} tip={a} color={C.bad} weight={2.5} />
            <Vector tail={[0, 0]} tip={b} color={C.bad} weight={2.5} />
            <Point x={a[0]} y={a[1]} color={C.f} />
            <Point x={b[0]} y={b[1]} color={C.g} />
            <Label at={a} color={C.f} attach="e">A</Label>
            <Label at={b} color={C.g} attach="w">B</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Toggle label="Show position vectors (the trap)" checked={trap} onChange={setTrap} />
        {trap && <Slider label="t" value={t} onChange={setT} min={0.2} max={2.3} step={0.01} format={v => `${num(v, 2)} h`} />}
        <Readouts>
          <Readout color={C.good} tex={`\\text{angle between velocities} = ${OBTUSE.toFixed(1)}^\\circ`} />
          {trap && <Readout color={C.bad} tex={`\\text{angle } \\angle AOB \\text{ at } t = ${num(t, 2)}: ${posAngle.toFixed(1)}^\\circ`} />}
        </Readouts>
        {trap ? (
          <Notice tone="warn">
            <b>The angle between position vectors depends on when you look.</b> Slide <M>t</M>: <M>\angle AOB</M> keeps
            changing, but the paths are fixed lines, so the angle between them can&apos;t depend on <M>t</M>. That is why
            the velocity vectors, which point along the paths, are the right ones to use.
          </Notice>
        ) : (
          <Notice>
            <b>The velocity vectors point along the paths</b>, so the angle between them is the angle between the paths:{' '}
            <M>97.7^\circ</M>. Now turn on the toggle to see what goes wrong with position vectors.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
