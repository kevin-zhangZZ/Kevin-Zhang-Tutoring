// 2022 Methods Exam 2 Q2e — the average value of the combined population over the first
// 300 weeks is the level h at which the curve's area above the line equals its area below:
// (1/300)∫₀³⁰⁰ (g(t) + r(t)) dt = 4142, where g(t) = 900 sin(π(t − 60)/90) + 1600 is the fox
// model from the transformation Q. Slide h until the green and red areas balance. The toggle
// shows the report's "average rate of change" mix-up: the chord from t = 0 to t = 300 has
// gradient ≈ 1.19 animals per week, a slope, not a population.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, integrate } from './kit'

const r = (t: number) => 1700 * Math.sin((Math.PI * t) / 80) + 2500
const g = (t: number) => 900 * Math.sin((Math.PI * (t - 60)) / 90) + 1600
const P = (t: number) => g(t) + r(t)
const AVG = integrate(P, 0, 300, 1200) / 300 // 4142.26…
const RATE = (P(300) - P(0)) / 300 // ≈ 1.19

export default function AverageLevel() {
  const [h, setH] = useState(3500)
  const [rate, setRate] = useState(false)

  const above = integrate(t => Math.max(P(t) - h, 0), 0, 300, 600)
  const below = integrate(t => Math.max(h - P(t), 0), 0, 300, 600)
  const balanced = Math.abs(h - AVG) < 4

  let notice
  if (rate) {
    notice = (
      <Notice tone="warn">
        The red chord joins the start, <M>{`P(0) \\approx ${P(0).toFixed(0)}`}</M>, to the end,{' '}
        <M>{`P(300) \\approx ${P(300).toFixed(0)}`}</M>. Its gradient,{' '}
        <M>{`\\tfrac{P(300) - P(0)}{300} \\approx ${RATE.toFixed(2)}`}</M>, is an <b>average rate of change</b> in
        animals per week. It ignores everything between the ends, so it says nothing about how many animals there
        typically are. Turn the toggle off and balance the areas instead.
      </Notice>
    )
  } else if (balanced) {
    notice = (
      <Notice tone="good">
        <b>Balanced at <M>h \approx 4142</M></b>: the green area above the line equals the red area below it. So a
        rectangle of height 4142 and width 300 holds the same area as the region under the curve, which is exactly
        what <M>{'\\tfrac{1}{300}\\int_0^{300}\\bigl(g(t) + r(t)\\bigr)\\,dt'}</M> calculates.
      </Notice>
    )
  } else if (h < AVG) {
    notice = (
      <Notice>
        The green area above the line is bigger than the red area below it, so <M>{`h = ${h.toFixed(0)}`}</M> is
        too low to be the average. Raise <M>h</M> until the two areas match.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the red area below the line is bigger than the green area above it, so <M>{`h = ${h.toFixed(0)}`}</M>{' '}
        is too high. Lower <M>h</M> until the two areas match.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 300]} y={[0, 6000]} xStep={50} yStep={1000} height={320} xLabel="t" yLabel="P">
        {!rate && (
          <>
            <Region top={t => Math.max(P(t), h)} bottom={() => h} from={0} to={300} color={C.good} opacity={0.3} samples={300} />
            <Region top={() => h} bottom={t => Math.min(P(t), h)} from={0} to={300} color={C.bad} opacity={0.3} samples={300} />
          </>
        )}
        <Plot.OfX y={P} domain={[0, 300]} color={C.violet} weight={3} />
        {!rate && (
          <>
            <Line.Segment point1={[0, h]} point2={[300, h]} color={balanced ? C.good : C.ink} weight={2} />
            <Label at={[300, h]} attach="ne" color={balanced ? C.good : C.ink}>h</Label>
          </>
        )}
        {rate && (
          <>
            <Line.Segment point1={[0, P(0)]} point2={[300, P(300)]} color={C.bad} weight={2.5} />
            <Point x={0} y={P(0)} color={C.bad} />
            <Point x={300} y={P(300)} color={C.bad} />
          </>
        )}
        <Label at={[52, P(52)]} color={C.violet} attach="n">P = g + r</Label>
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={2500} max={5500} step={2} format={v => v.toFixed(0)} />
        <Buttons>
          <Toggle label="Average rate of change instead" checked={rate} onChange={setRate} />
        </Buttons>
        <Readouts>
          {rate ? (
            <Readout color={C.bad} tex={`\\text{gradient} \\approx ${RATE.toFixed(2)}\\ \\text{per week}`} />
          ) : (
            <>
              <Readout color={C.good} tex={`\\text{area above} \\approx ${Math.round(above).toLocaleString('en-AU').replace(/,/g, '\\,')}`} />
              <Readout color={C.bad} tex={`\\text{area below} \\approx ${Math.round(below).toLocaleString('en-AU').replace(/,/g, '\\,')}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
