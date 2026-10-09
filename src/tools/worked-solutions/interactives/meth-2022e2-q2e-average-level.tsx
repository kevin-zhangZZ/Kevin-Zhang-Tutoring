// 2022 Methods Exam 2 Q2e — the average value of the combined population over the first
// 300 weeks is the level h at which the curve's area above the line equals its area below:
// (1/300)∫₀³⁰⁰ (g(t) + r(t)) dt = 4142, where g(t) = 900 sin(π(t − 60)/90) + 1600 is the fox
// model from the transformation Q. Slide h until the green and red areas balance. Two toggles
// show the report's mistakes: "Leave out r(t)" averages the fox curve alone, which balances at
// exactly 1600 (the report's common incorrect answer) while the combined curve never drops below
// about 3107; "Average rate of change instead" draws the chord from t = 0 to t = 300, whose
// gradient ≈ 1.19 animals per week is a slope, not a population.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, integrate } from './kit'

const r = (t: number) => 1700 * Math.sin((Math.PI * t) / 80) + 2500
const g = (t: number) => 900 * Math.sin((Math.PI * (t - 60)) / 90) + 1600
const P = (t: number) => g(t) + r(t)
const AVG = integrate(P, 0, 300, 1200) / 300 // 4142.26…
const AVG_G = integrate(g, 0, 300, 1200) / 300 // exactly 1600
const RATE = (P(300) - P(0)) / 300 // ≈ 1.19

export default function AverageLevel() {
  const [h, setH] = useState(3500)
  const [foxes, setFoxes] = useState(false)
  const [rate, setRate] = useState(false)

  const F = foxes ? g : P
  const target = foxes ? AVG_G : AVG
  const above = integrate(t => Math.max(F(t) - h, 0), 0, 300, 600)
  const below = integrate(t => Math.max(h - F(t), 0), 0, 300, 600)
  const balanced = Math.abs(h - target) < 4
  const curve = foxes ? 'fox curve' : 'curve'

  const pickFoxes = (v: boolean) => {
    setFoxes(v)
    if (v) setRate(false)
  }
  const pickRate = (v: boolean) => {
    setRate(v)
    if (v) setFoxes(false)
  }

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
  } else if (foxes && balanced) {
    notice = (
      <Notice tone="warn">
        <b>Balanced at <M>h = 1600</M></b>, the report&apos;s common incorrect answer. But this is the average of
        the <b>foxes alone</b>. The faint violet curve, foxes plus rabbits, never drops below about 3107 in these 300
        weeks, so its average can&apos;t be 1600. Turn &ldquo;Leave out <M>r(t)</M>&rdquo; off and balance the
        combined curve.
      </Notice>
    )
  } else if (balanced) {
    notice = (
      <Notice tone="good">
        <b>Balanced at <M>h \approx 4142</M></b>: the green area above the line equals the red area below it. So a
        rectangle of height 4142 and width 300 holds the same area as the region under the curve, which is exactly
        what <M>{'\\tfrac{1}{300}\\int_0^{300}\\bigl(g(t) + r(t)\\bigr)\\,dt'}</M> calculates. Now try &ldquo;Leave
        out <M>r(t)</M>&rdquo; to see where the report&apos;s 1600 came from.
      </Notice>
    )
  } else if (h < target) {
    notice = (
      <Notice>
        The green area above the line is bigger than the red area below it, so <M>{`h = ${h.toFixed(0)}`}</M> is
        too low to be the average of the {curve}. Raise <M>h</M> until the two areas match.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the red area below the line is bigger than the green area above it, so <M>{`h = ${h.toFixed(0)}`}</M>{' '}
        is too high to be the average of the {curve}. Lower <M>h</M> until the two areas match.
      </Notice>
    )
  }

  const fmt = (v: number) => Math.round(v).toLocaleString('en-AU').replace(/,/g, '\\,')

  return (
    <div>
      {/* y numbers sit left of the axis (custom Labels) so the steep start of the curve doesn't run through them */}
      <Plane x={[-48, 300]} y={[0, 6000]} xStep={50} yStep={1000} height={320} xLabel="t" yLabel="P" yLabels={false} xLabels={v => (v < 0 ? '' : String(v))}>
        {[1000, 2000, 3000, 4000, 5000, 6000].map(v => (
          <Label key={v} at={[-2, v]} attach="w" size={12}>{String(v)}</Label>
        ))}
        {!rate && (
          <>
            <Region top={t => Math.max(F(t), h)} bottom={() => h} from={0} to={300} color={C.good} opacity={0.3} samples={300} />
            <Region top={() => h} bottom={t => Math.min(F(t), h)} from={0} to={300} color={C.bad} opacity={0.3} samples={300} />
          </>
        )}
        <Plot.OfX y={P} domain={[0, 300]} color={C.violet} weight={foxes ? 2 : 3} opacity={foxes ? 0.35 : 1} />
        {foxes && <Plot.OfX y={g} domain={[0, 300]} color={C.g} weight={3} />}
        {!rate && (
          <>
            <Line.Segment point1={[0, h]} point2={[300, h]} color={balanced ? (foxes ? C.bad : C.good) : C.ink} weight={2} />
            <Label at={[300, h]} attach="ne" color={balanced ? (foxes ? C.bad : C.good) : C.ink}>h</Label>
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
        {foxes && <Label at={[105, g(105)]} color={C.g} attach="n">g (foxes)</Label>}
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={500} max={5500} step={2} format={v => v.toFixed(0)} />
        <Buttons>
          <Toggle label={<>Leave out r(t)</>} checked={foxes} onChange={pickFoxes} />
          <Toggle label="Average rate of change instead" checked={rate} onChange={pickRate} />
        </Buttons>
        <Readouts>
          {rate ? (
            <Readout color={C.bad} tex={`\\text{gradient} \\approx ${RATE.toFixed(2)}\\ \\text{per week}`} />
          ) : (
            <>
              <Readout color={C.good} tex={`\\text{area above} \\approx ${fmt(above)}`} />
              <Readout color={C.bad} tex={`\\text{area below} \\approx ${fmt(below)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
