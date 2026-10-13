// 2016 Specialist Exam 2 Q4d — the distance between the ships is the length of the displacement
// r_A − r_B = (13 − 9t, 5 − 2t), so D(t) = √(85t² − 254t + 194). Slide t on the map: the green
// segment AB is that displacement, and the graph below tracks D(t), smallest at t = 127/85 ≈ 1.494
// with D = √(361/85) = 19/√85 ≈ 2.06 km. A toggle shows the report's error, |r_A| − |r_B| (how much
// farther A is from the lighthouse than B): it is 0 at t = (26 − √438)/7 ≈ 0.725, yet there the ships
// are 7.39 km apart. Values checked with sympy.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const A = (t: number): [number, number] => [5 - 5 * t, 3 + 3 * t]
const B = (t: number): [number, number] => [4 * t - 8, 5 * t - 2]
const D = (t: number) => Math.sqrt(85 * t * t - 254 * t + 194)
const diffMag = (t: number) => Math.abs(Math.hypot(...A(t)) - Math.hypot(...B(t)))
const TMIN = 127 / 85

export default function Closest() {
  const [t, setT] = useState(0.5)
  const [trap, setTrap] = useState(false)
  const a = A(t)
  const b = B(t)
  const d = D(t)
  const near = Math.abs(t - TMIN) < 0.012

  return (
    <div>
      <Plane x={[-10, 10]} y={[-6, 10]} xStep={2} yStep={2} equalScale height={360}>
        <Line.Segment point1={A(0)} point2={A(7 / 3)} color={C.f} weight={2} />
        <Line.Segment point1={B(0)} point2={B(2.4)} color={C.g} weight={2} />
        {trap && (
          <>
            <Line.Segment point1={[0, 0]} point2={a} color={C.violet} style="dashed" weight={2} />
            <Line.Segment point1={[0, 0]} point2={b} color={C.violet} style="dashed" weight={2} />
            <Label at={[0, 0]} color={C.violet} attach="sw">O</Label>
          </>
        )}
        <Line.Segment point1={a} point2={b} color={C.good} weight={3.5} />
        <Point x={a[0]} y={a[1]} color={C.f} />
        <Point x={b[0]} y={b[1]} color={C.g} />
        <Label at={a} color={C.f} attach="ne">A</Label>
        <Label at={b} color={C.g} attach="se">B</Label>
      </Plane>
      <Plane x={[0, 3]} y={[0, 15]} xStep={0.5} yStep={5} height={220} xLabel="t" yLabel="">
        <Plot.OfX y={D} domain={[0, 3]} color={C.good} weight={3} />
        {trap && <Plot.OfX y={diffMag} domain={[0, 3]} color={C.violet} weight={2.5} />}
        <Line.Segment point1={[t, 0]} point2={[t, d]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={t} y={d} color={C.good} />
        <Label at={[2.6, D(2.6)]} color={C.good} attach="se" size={12}>D(t)</Label>
        {trap && <Label at={[2.2, diffMag(2.2)]} color={C.violet} attach="n" size={12}>difference of distances from O</Label>}
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={2.33} step={0.002} format={v => `${num(v, 3)} h`} />
        <Toggle label={<>Compare <M>{'|\\underset{\\sim}{r}_A| - |\\underset{\\sim}{r}_B|'}</M> (the trap)</>} checked={trap} onChange={setTrap} />
        <Readouts>
          <Readout color={C.good} tex={`D = |\\underset{\\sim}{r}_A - \\underset{\\sim}{r}_B| = ${num(d, 3)}\\text{ km}`} />
          {trap && (
            <Readout
              color={C.violet}
              tex={`\\bigl||\\underset{\\sim}{r}_A| - |\\underset{\\sim}{r}_B|\\bigr| = ${num(diffMag(t), 3)}\\text{ km}`}
            />
          )}
        </Readouts>
        {trap ? (
          <Notice tone="warn">
            <b><M>{'|\\underset{\\sim}{r}_A| - |\\underset{\\sim}{r}_B|'}</M> only compares each ship&apos;s distance from
            the lighthouse.</b> Slide to where the violet curve touches <M>0</M>: the green segment shows the ships
            are still far apart. The gap between the ships is the
            length of <M>{'\\underset{\\sim}{r}_A - \\underset{\\sim}{r}_B'}</M>.
          </Notice>
        ) : near ? (
          <Notice tone="good">
            <b>Closest at <M>t = \tfrac{127}{85} \approx 1.494</M></b>, the bottom of the green graph, where{' '}
            <M>{'D = \\sqrt{\\tfrac{361}{85}} \\approx 2.06'}</M> km. Either side, the green segment gets longer again.
          </Notice>
        ) : (
          <Notice>
            <b>The green segment is the displacement <M>{'\\underset{\\sim}{r}_A - \\underset{\\sim}{r}_B'}</M></b>, and its
            length is the distance between the ships, graphed below. Slide <M>t</M> to find the bottom of the graph,
            then try the toggle.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
