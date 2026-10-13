// 2015 Methods Exam 1 Q10a — T on the circle centred C(2, 0), radius 2. The right triangle at C
// (hypotenuse CT = 2, angle θ) gives the displacement from C: 2cos θ across, 2sin θ up. The
// x-coordinate of T is the distance O→C (2) PLUS that 2cos θ — the +2 that 80% of students
// missed. A toggle plots the common wrong answer (2cos θ, 2sin θ): it lies on a circle centred
// at the ORIGIN, not on the given circle.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider, Toggle, tick } from './kit'

export default function PlusTwo() {
  const [th, setTh] = useState(0.9)
  const [wrong, setWrong] = useState(false)
  const cx = 2 * Math.cos(th)
  const sy = 2 * Math.sin(th)
  const T: [number, number] = [2 + cx, sy]
  const foot: [number, number] = [2 + cx, 0]
  const deg = Math.round((th * 180) / Math.PI)

  return (
    <div>
      <Plane x={[-2.4, 4.6]} y={[-0.6, 2.6]} equalScale height={300} minHeight={160} xLabels={v => (v < -2 || v > 4 || v === 2 ? "" : tick(v))} yLabels={v => (v < 0 || v > 2 ? "" : tick(v))}>
        <Circle center={[2, 0]} radius={2} color={C.guide} fillOpacity={0} weight={2} />
        {wrong && <Circle center={[0, 0]} radius={2} color={C.bad} fillOpacity={0} weight={1.5} strokeStyle="dashed" />}
        <Line.Segment point1={[0, 0]} point2={[2, 0]} color={C.g} weight={5} />
        <Line.Segment point1={[2, 0]} point2={foot} color={C.f} weight={5} />
        <Line.Segment point1={foot} point2={T} color={C.violet} weight={3} />
        <Line.Segment point1={[2, 0]} point2={T} color={C.ink} weight={2} />
        <Point x={0} y={0} color={C.ink} />
        <Point x={2} y={0} color={C.ink} />
        <Point x={T[0]} y={T[1]} color={C.good} />
        <Label at={[0, 0]} attach="sw">O</Label>
        <Label at={[2, 0]} attach="nw">C</Label>
        <Label at={T} attach="ne" color={C.good}>T</Label>
        <Label at={[1, 0]} attach="n" color={C.g}>2</Label>
        <Label at={[2 + cx / 2, 0]} attach="s" color={C.f}>2cos θ</Label>
        <Label at={[2 + cx, sy / 2]} attach="e" color={C.violet}>2sin θ</Label>
        {wrong && (
          <>
            <Point x={cx} y={sy} color={C.bad} />
            <Label at={[cx, sy]} attach="nw" color={C.bad}>(2cos θ, 2sin θ)</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="\theta" value={th} onChange={setTh} min={0.05} max={Math.PI / 2} step={0.01} format={v => `${v.toFixed(2)} (${Math.round((v * 180) / Math.PI)}°)`} />
        <Toggle label="Show the answer without the +2" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.good} tex={`x_T = \\underbrace{2}_{OC} + \\underbrace{2\\cos\\theta}_{CT\\text{ across}} = 2 + ${cx.toFixed(2)} = ${T[0].toFixed(2)}`} />
          <Readout color={C.violet} tex={`y_T = 2\\sin\\theta = ${sy.toFixed(2)}`} />
          {wrong && <Readout color={C.bad} tex={`(2\\cos\\theta,\\ 2\\sin\\theta) = (${cx.toFixed(2)},\\ ${sy.toFixed(2)})`} />}
        </Readouts>
        {wrong ? (
          <Notice tone="warn">
            The red point is <b>2 units to the left of <M>T</M></b> at every <M>\theta</M>: it lies on the dashed circle
            centred at the origin, not on the given circle. The rule <M>(2\cos\theta,\ 2\sin\theta)</M> measures from the origin;
            here the angle is measured at <M>C</M>, so add <M>C</M>&apos;s coordinates.
          </Notice>
        ) : (
          <Notice>
            At <M>{`\\theta \\approx ${deg}^\\circ`}</M>, <M>T</M>&apos;s <M>x</M>-coordinate is the orange <M>2</M> (from <M>O</M> to{' '}
            <M>C</M>) plus the blue <M>2\cos\theta</M>. Drag <M>\theta</M> towards <M>0</M>: <M>T</M> approaches <M>E(4,0)</M>, which only
            works with the <M>+2</M>. Then turn on the toggle.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
