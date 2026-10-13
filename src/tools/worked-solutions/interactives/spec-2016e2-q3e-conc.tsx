// 2016 Specialist Exam 2 Q3e — "when does the concentration reach 0.095 kg/L" needs the
// concentration curve c(t) = (t² + 20t + 900)/(60(10 + t)²), not dy/dt. c starts at 0.15, falls
// towards the inflow's 1/60 ≈ 0.017 and meets 0.095 once, at t = √(800/4.7) − 10 ≈ 3.05. The
// report's common error, dy/dt = 0.095, uses a rate in kg/min: dy/dt = (t² + 20t − 700)/(6(10 + t)²)
// starts at −7/6, is 0 at t = √800 − 10 ≈ 18.28 and reaches 0.095 at t ≈ 33.13 — a different
// question with a different answer. All values checked with sympy.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const conc = (t: number) => (t * t + 20 * t + 900) / (60 * (10 + t) ** 2)
const rate = (t: number) => (t * t + 20 * t - 700) / (6 * (10 + t) ** 2)
const T_ANS = Math.sqrt(800 / 4.7) - 10
const T_WRONG = 33.1331

export default function Concentration() {
  const [t, setT] = useState(8)
  const [wrong, setWrong] = useState(false)
  const c = conc(t)
  const r = rate(t)

  return (
    <div>
      <Plane x={[0, 40]} y={wrong ? [-0.1, 0.16] : [-0.02, 0.16]} xStep={5} yStep={0.04} height={320} xLabel="t" yLabel="">
        <Line.Segment point1={[0, 0.095]} point2={[40, 0.095]} color={C.guide} weight={2} style="dashed" />
        <Label at={[20, 0.095]} attach="n" color={C.guide}>0.095</Label>
        <Line.Segment point1={[0, 1 / 60]} point2={[40, 1 / 60]} color={C.guide} weight={1} style="dashed" opacity={0.6} />
        <Plot.OfX y={conc} domain={[0, 40]} color={C.f} weight={3} />
        <Label at={[27, conc(27)]} attach="n" color={C.f}>concentration (kg/L)</Label>
        <Point x={T_ANS} y={0.095} color={C.good} />
        <Label at={[T_ANS + 5, 0.095]} attach="n" color={C.good}>t ≈ 3.05</Label>
        <Point x={t} y={c} color={C.f} />
        {wrong && (
          <>
            <Plot.OfX y={rate} domain={[0, 40]} color={C.g} weight={3} />
            <Label at={[12, rate(12)]} attach="se" color={C.g}>dy/dt (kg/min)</Label>
            <Point x={T_WRONG} y={0.095} color={C.bad} />
            <Label at={[T_WRONG, 0.095]} attach="n" color={C.bad}>t ≈ 33.13</Label>
            <Point x={t} y={r} color={C.g} />
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={40} step={0.1} format={v => v.toFixed(1)} />
        <Toggle label={<>Show the common error: <M>{'\\tfrac{dy}{dt} = 0.095'}</M></>} checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.f} tex={`\\text{concentration} = ${num(c, 4)}\\ \\text{kg/L}`} />
          {wrong && <Readout color={C.g} tex={`\\dfrac{dy}{dt} = ${num(r, 4)}\\ \\text{kg/min}`} />}
        </Readouts>
        {wrong ? (
          <Notice tone="warn">
            <b>The orange curve is a rate, in kg/min</b>: how fast the amount of salt changes. It equals 0.095 at{' '}
            <M>{'t \\approx 33.13'}</M>, when the salt is <em>increasing</em> by 0.095 kg each minute, while the
            concentration (blue) is down near 0.024 kg/L. The question asks about kilograms per <b>litre</b>, so only the
            blue curve answers it.
          </Notice>
        ) : (
          <Notice>
            The concentration starts at <M>{'\\tfrac{15}{100} = 0.15'}</M> kg/L and falls towards the incoming
            solution&apos;s <M>{'\\tfrac1{60} \\approx 0.017'}</M> (lower dashed line). It crosses 0.095 just once, at{' '}
            <M>{'t \\approx 3.05'}</M>. Slide <M>t</M> back to about 3 to see it, then turn on the common error.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
