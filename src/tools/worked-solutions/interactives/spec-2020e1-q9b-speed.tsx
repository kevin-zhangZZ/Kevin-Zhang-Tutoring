// 2020 Specialist Exam 1 Q9b — what the arc-length integral adds up. A point travels along
// x = arcsin(t), y = log_e(1 + t) + ¼log_e(1 − t) as t runs from 0 to ½ (drawn to scale, equal
// axes). At the point, a right triangle shows its velocity: dx/dt across (orange), dy/dt up
// (violet), drawn for a step of 0.2 in t, so the hypotenuse (green) is the speed
// √((dx/dt)² + (dy/dt)²) by Pythagoras. The readouts show that speed equal to
// P + Q = 1/(1 + t) + 1/(4(1 − t)) at every t (the next widget shows why), and the distance
// travelled so far — a numerical ∫√((dx/dt)² + (dy/dt)²) dt — reaching s ≈ 0.579 at t = ½, a
// little more than the straight chord (≈ 0.573). At t = 0 the triangle is 1, ¾, 5/4 (a 3–4–5).

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polyline, Readout, Readouts, Slider, Vector,
  integrate, num, usePlayer, type vec,
} from './kit'

const X = (t: number) => Math.asin(t)
const Y = (t: number) => Math.log(1 + t) + 0.25 * Math.log(1 - t)
const dX = (t: number) => 1 / Math.sqrt(1 - t * t)
const dY = (t: number) => 1 / (1 + t) - 1 / (4 * (1 - t))
const speed = (t: number) => Math.hypot(dX(t), dY(t))
const Pf = (t: number) => 1 / (1 + t)
const Qf = (t: number) => 1 / (4 * (1 - t))
/** The triangle shows where the point would go in the next 0.2 of t at its current velocity. */
const K = 0.2
const END: vec.Vector2 = [X(0.5), Y(0.5)]

const tickLabel = (v: number) => {
  const r = Math.round(v * 10)
  return r % 2 === 0 ? (r / 10).toFixed(1) : ''
}

export default function SpeedTriangle() {
  const [t, setT] = useState(0)
  const player = usePlayer(setT, { min: 0, max: 0.5, seconds: 6 })

  const A: vec.Vector2 = [X(t), Y(t)]
  const B: vec.Vector2 = [A[0] + K * dX(t), A[1]]
  const T: vec.Vector2 = [B[0], A[1] + K * dY(t)]
  const r = 0.018
  const showCorner = K * dY(t) > 0.05
  const travelled = integrate(speed, 0, t)
  const chord = Math.hypot(A[0], A[1])
  const atEnd = t > 0.495

  let notice
  if (t < 0.005) {
    notice = (
      <Notice>
        <b>The triangle is the point&apos;s velocity.</b> In the next <M>0.2</M> of <M>t</M> the point moves about{' '}
        <M>{'0.2\\times\\tfrac{dx}{dt}'}</M> across (orange) and <M>{'0.2\\times\\tfrac{dy}{dt}'}</M> up (violet). By
        Pythagoras it covers about <M>{'0.2\\times\\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2}'}</M>{' '}
        along the curve (green). So the square root in the formula is the <b>speed</b>, and the arc length adds up speed
        × time. At <M>t = 0</M> the velocity is <M>1</M> across and <M>{'\\tfrac34'}</M> up, so the speed is{' '}
        <M>{'\\tfrac54'}</M>: a 3–4–5 triangle, scaled down.
        Press play.
      </Notice>
    )
  } else if (!atEnd) {
    notice = (
      <Notice>
        The green side is the speed right now, <M>{`\\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2} \\approx ${num(speed(t), 3)}`}</M>.
        The arc length adds up speed × time along the way:{' '}
        <M>{'{s = \\int_0^{1/2}\\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2}\\,dt}'}</M>. Watch
        the readouts: the speed always equals <M>{'{P + Q = \\tfrac{1}{1+t} + \\tfrac{1}{4(1-t)}}'}</M>, with no square
        root. The next diagram shows why.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>At <M>{'t = \\tfrac12'}</M> the point has travelled <M>{'s \\approx 0.579'}</M></b>, which is{' '}
        <M>{'\\log_e\\left(\\tfrac32\\right) + \\tfrac14\\log_e(2)'}</M>. The straight chord from the start (dashed) is
        about <M>0.573</M>. The curve bends only a little, so its length should be only a little more than the chord.
        That is a good check on the answer.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 0.9]} y={[0, 0.35]} xStep={0.1} yStep={0.1} equalScale height={300} xLabels={v => (v < 0 ? '' : tickLabel(v))} yLabels={v => (v < 0 || v > 0.36 ? '' : v.toFixed(1))}>
        <Plot.Parametric xy={u => [X(u), Y(u)]} domain={[0, 0.78]} color={C.f} weight={2} opacity={0.35} />
        {t > 0.002 && <Plot.Parametric xy={u => [X(u), Y(u)]} domain={[0, t]} color={C.f} weight={4} />}
        {t > 0.05 && <Line.Segment point1={[0, 0]} point2={A} color={C.guide} style="dashed" weight={1.5} />}
        <Point x={END[0]} y={END[1]} color={C.ink} />
        {/* High enough above the end point that the velocity arrow (tip never above y ≈ 0.26 near
            here) passes underneath it. */}
        <Label at={END} attach="n" gap={16}>t = ½</Label>
        <Label at={[0, 0]} attach="se">t = 0</Label>
        <Line.Segment point1={A} point2={B} color={C.g} weight={2.5} />
        <Line.Segment point1={B} point2={T} color={C.violet} weight={2.5} />
        {showCorner && <Polyline points={[[B[0] - r, B[1]], [B[0] - r, B[1] + r], [B[0], B[1] + r]]} color={C.ink} weight={1.2} />}
        <Vector tail={A} tip={T} color={C.good} weight={2.5} />
        <Point x={A[0]} y={A[1]} color={C.f} />
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={0.5}
          step={0.005}
          format={v => v.toFixed(3)}
        />
        <div className="flex flex-wrap items-center gap-2">
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Travel from t = 0 to ½" />
        </div>
        <Readouts>
          <Readout color={C.g} tex={`\\tfrac{dx}{dt} = \\tfrac{1}{\\sqrt{1-t^2}} \\approx ${num(dX(t), 3)}`} />
          <Readout color={C.violet} tex={`\\tfrac{dy}{dt} \\approx ${num(dY(t), 3)}`} />
          <Readout color={C.good} tex={`\\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2} \\approx ${num(speed(t), 3)}`} />
          <Readout tex={`P + Q \\approx ${num(Pf(t), 3)} + ${num(Qf(t), 3)} = ${num(Pf(t) + Qf(t), 3)}`} />
        </Readouts>
        <Readouts>
          <Readout color={C.f} tex={`\\text{distance travelled} \\approx ${num(travelled, 3)}`} />
          <Readout color={C.guide} tex={`\\text{chord} \\approx ${num(chord, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
