// 2016 Specialist Exam 2 Q4b — each ship's path is a ray that starts at midday (t = 0), not the
// whole cartesian line. Slide t: the ships move from A(5, 3) and B(−8, −2) along their solid rays,
// each with its velocity arrow (−5, 3) and (4, 5). Slide below t = 0 and the ship turns red and the
// dashed red part of the line appears — the "incorrect domain" the report says many students plotted.
// Values: r_A = (5 − 5t, 3 + 3t), r_B = (4t − 8, 5t − 2); A leaves the grid at y = 10 (t = 7/3),
// B at y = 10 (t = 2.4); for t < 0, B reaches x = −10 at t = −0.5, so the slider stops there (A(−0.5) = (7.5, 1.5)).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider, Vector, num } from './kit'

const A = (t: number): [number, number] => [5 - 5 * t, 3 + 3 * t]
const B = (t: number): [number, number] => [4 * t - 8, 5 * t - 2]
const VA: [number, number] = [-5, 3]
const VB: [number, number] = [4, 5]
const S = 0.3 // arrow scale

export default function Rays() {
  const [t, setT] = useState(0.5)
  const before = t < -0.001
  const a = A(t)
  const b = B(t)
  const colA = before ? C.bad : C.f
  const colB = before ? C.bad : C.g

  return (
    <div>
      <Plane x={[-10, 10]} y={[-6, 10]} xStep={2} yStep={2} equalScale height={400}>
        {before && (
          <>
            <Line.Segment point1={A(-0.5)} point2={A(0)} color={C.bad} style="dashed" weight={2.5} />
            <Line.Segment point1={B(-0.5)} point2={B(0)} color={C.bad} style="dashed" weight={2.5} />
          </>
        )}
        <Line.Segment point1={A(0)} point2={A(7 / 3)} color={C.f} weight={3} />
        <Line.Segment point1={B(0)} point2={B(2.4)} color={C.g} weight={3} />
        <Point x={5} y={3} color={C.f} />
        <Point x={-8} y={-2} color={C.g} />
        <Label at={[5, 3]} color={C.f} attach="se">A at t = 0</Label>
        <Label at={[-8, -2]} color={C.g} attach="e">B at t = 0</Label>
        <Vector tail={a} tip={[a[0] + S * VA[0], a[1] + S * VA[1]]} color={colA} weight={3} />
        <Vector tail={b} tip={[b[0] + S * VB[0], b[1] + S * VB[1]]} color={colB} weight={3} />
        <Point x={a[0]} y={a[1]} color={colA} />
        <Point x={b[0]} y={b[1]} color={colB} />
        <Label at={a} color={colA} attach="ne">A</Label>
        <Label at={b} color={colB} attach="se">B</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={-0.5} max={2.3} step={0.01} format={v => `${num(v, 2)} h`} />
        <Readouts>
          <Readout color={colA} tex={`\\underset{\\sim}{r}_A = (${num(a[0], 2)},\\ ${num(a[1], 2)})`} />
          <Readout color={colB} tex={`\\underset{\\sim}{r}_B = (${num(b[0], 2)},\\ ${num(b[1], 2)})`} />
        </Readouts>
        {before ? (
          <Notice tone="warn">
            <b>Negative <M>t</M> is before midday, which the question doesn&apos;t describe.</b> The red dashed pieces
            lie on the cartesian lines but are <em>not</em> part of either path. The report notes many students plotted
            the paths over incorrect domains.
          </Notice>
        ) : (
          <Notice>
            <b>Each path starts where the ship is at midday.</b> Slide <M>t</M> back to <M>0</M>: <M>A</M> stops at{' '}
            <M>(5,3)</M> and <M>B</M> at <M>(-8,-2)</M>, and the arrows (the velocities) show which way each moves. Now
            slide below <M>0</M> to see what plotting the whole line would add.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
