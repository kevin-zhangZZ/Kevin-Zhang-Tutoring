// 2022 Specialist NHT Exam 1 Q8 — standard deviations of independent variables combine like
// perpendicular sides, by Pythagoras. Legs 40 (Standard, orange) and 30 (Deluxe, violet) make a
// 3–4–5 triangle whose hypotenuse is sd(S + D) = 50 (part a.). A third leg σ_E (green), drawn
// perpendicular to that hypotenuse, gives sd(S + D + E) = √(50² + σ_E²) (part b.). The red arc is
// radius 60: the tip stays inside it exactly while σ_E ≤ √1100 = 10√11 ≈ 33.17.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider, num, type vec } from './kit'

const LIMIT = Math.sqrt(1100)

export default function SdPythagoras() {
  const [s, setS] = useState(20)
  const O: vec.Vector2 = [0, 0]
  const A: vec.Vector2 = [40, 0]
  const B: vec.Vector2 = [40, 30]
  // Perpendicular to OB (direction (0.8, 0.6)), turning left.
  const T: vec.Vector2 = [40 - 0.6 * s, 30 + 0.8 * s]
  const total = Math.hypot(50, s)
  const inside = s <= LIMIT + 1e-9

  return (
    <div>
      <Plane x={[-10, 70]} y={[0, 72]} xStep={10} yStep={10} equalScale height={340} xLabel="" yLabel="" labels={false}>
        <Circle center={O} radius={60} color={C.bad} strokeStyle="dashed" fillOpacity={0} weight={1.5} />
        <Line.Segment point1={O} point2={A} color={C.g} weight={3} />
        <Line.Segment point1={A} point2={B} color={C.violet} weight={3} />
        <Line.Segment point1={O} point2={B} color={C.guide} weight={2} style="dashed" />
        {s > 0.5 && <Line.Segment point1={B} point2={T} color={C.good} weight={3} />}
        <Line.Segment point1={O} point2={T} color={C.f} weight={3} />
        <Point x={T[0]} y={T[1]} color={inside ? C.f : C.bad} />
        <Label at={[20, 0]} attach="s" color={C.g}>40</Label>
        <Label at={[40, 15]} attach="e" color={C.violet}>30</Label>
        <Label at={[20, 15]} attach="se" color={C.guide}>50</Label>
        {s > 6 && <Label at={[(B[0] + T[0]) / 2, (B[1] + T[1]) / 2]} attach="ne" color={C.good}>σ</Label>}
        <Label at={[30, 51.96]} attach="ne" color={C.bad}>radius 60</Label>
      </Plane>
      <Controls>
        <Slider label="\sigma_E" value={s} onChange={setS} min={0} max={50} step={0.25} format={v => v.toFixed(2)} />
        <Readouts>
          <Readout color={C.guide} tex="\text{sd}(S+D)=\sqrt{40^2+30^2}=50" />
          <Readout color={C.f} tex={`\\text{sd}(S+D+E)=\\sqrt{50^2+\\sigma_E^2}\\approx ${num(total)}`} />
        </Readouts>
        {inside ? (
          <Notice tone="good">
            The variances add, so the standard deviations combine like perpendicular sides:{' '}
            <M>{'\\text{sd}(S+D+E)=\\sqrt{50^2+\\sigma_E^2}'}</M>. The tip is inside the radius-60 arc, so the sd is at most
            60. It stays inside until <M>{'\\sigma_E=\\sqrt{60^2-50^2}=\\sqrt{1100}\\approx33.17'}</M>.
          </Notice>
        ) : (
          <Notice tone="warn">
            Now <M>{`\\sqrt{50^2+\\sigma_E^2}\\approx${num(total)}`}</M>, more than 60: the tip is outside the arc. The largest
            allowed value is <M>{'\\sigma_E=\\sqrt{1100}=10\\sqrt{11}\\approx33.17'}</M>, where the tip sits exactly on it.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
