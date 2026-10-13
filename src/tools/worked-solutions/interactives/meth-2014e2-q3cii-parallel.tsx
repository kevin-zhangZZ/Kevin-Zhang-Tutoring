// 2014 Methods Exam 2 Q3c(ii) — "instantaneous rate = average rate" means the tangent is
// parallel to the chord over [2/3, 3]. Slide a tangent along c(t) = (5/2)t·e^(-3t/2): it matches
// the chord's gradient (−0.22706…) twice, at t ≈ 0.900 and t ≈ 2.118. A toggle shows the report's
// trap — solving with the rounded −0.23 moves the answers to 0.905 and 2.102 (→ 0.91, 2.10),
// the second one most because the gradient changes slowly out on the tail.
// Numbers checked with sympy: c(2/3) = 5/(3e), c(3) = 7.5e^(-4.5), c'(4/3) = −5/(2e²).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, tick } from './kit'

const c = (t: number) => 2.5 * t * Math.exp(-1.5 * t)
const dc = (t: number) => 2.5 * Math.exp(-1.5 * t) * (1 - 1.5 * t)
const T0 = 2 / 3
const T3 = 3
const AVG = (c(T3) - c(T0)) / (T3 - T0) // −0.227063…
const EXACT_T = [0.900362, 2.117709]
const ROUNDED_T = [0.905057, 2.101787]
const HALF = 0.45

export default function ParallelTangent() {
  const [t, setT] = useState(1.5)
  const [rounded, setRounded] = useState(false)

  const g = dc(t)
  const match = EXACT_T.find(r => Math.abs(t - r) < (r < 1.5 ? 0.012 : 0.03))
  const steeper = g < AVG
  const tanColor = match !== undefined ? C.good : C.violet
  const y = (x: number) => c(t) + g * (x - t)

  let notice
  if (rounded) {
    notice = (
      <Notice tone="warn">
        Solving <M>c'(t) = -0.23</M> instead gives the red points, <M>t \approx 0.905</M> and <M>t \approx 2.102</M>,
        which round to <b>0.91 and 2.10</b> — both wrong. The second moves furthest: on the tail the curve is nearly
        straight, so its gradient changes slowly and a tiny change in the target gradient shifts the time a long way.
      </Notice>
    )
  } else if (match !== undefined) {
    notice = (
      <Notice tone="good">
        <b>The tangent is parallel to the chord</b> at <M>{`t \\approx ${match.toFixed(3)}`}</M>, so here the
        instantaneous rate equals the average rate. {match < 1.5 ? 'Now slide right to find the second one.' : 'Slide left to find the first one.'}
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here the tangent is <b>{steeper ? 'steeper' : 'less steep'}</b> than the orange chord (
        <M>{`c'(t) = ${g.toFixed(3)}`}</M>). Slide <M>t</M> until the two lines are parallel — it happens twice, once
        either side of <M>t = \tfrac43</M>, where the curve is steepest. Then turn on the rounded gradient.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 3.2]} xLabels={v => (v > 3.01 ? "" : tick(v))} y={[-0.05, 0.75]} xStep={0.5} yStep={0.1} height={320} xLabel="t" yLabel="c" yLabels={v => v.toFixed(1)}>
        <Plot.OfX y={c} domain={[0, 3.2]} color={C.f} weight={3} />
        <Line.Segment point1={[T0, c(T0)]} point2={[T3, c(T3)]} color={C.g} weight={2.5} />
        <Point x={T0} y={c(T0)} color={C.g} />
        <Point x={T3} y={c(T3)} color={C.g} />
        <Label at={[2.5, c(T0) + AVG * (2.5 - T0)]} color={C.g} attach="ne">chord</Label>
        <Line.Segment point1={[t - HALF, y(t - HALF)]} point2={[t + HALF, y(t + HALF)]} color={tanColor} weight={2.5} />
        <Point x={t} y={c(t)} color={tanColor} />
        <Label at={[t, c(t)]} color={tanColor} attach="sw">tangent</Label>
        {rounded &&
          EXACT_T.map(r => <Point key={`e${r}`} x={r} y={c(r)} color={C.good} />)}
        {rounded &&
          ROUNDED_T.map(r => <Point key={`r${r}`} x={r} y={c(r)} color={C.bad} />)}
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0.67} max={3} step={0.005} format={v => v.toFixed(3)} />
        <Toggle label="Use the rounded gradient −0.23" checked={rounded} onChange={setRounded} />
        <Readouts>
          <Readout color={tanColor} tex={`c'(${t.toFixed(3)}) = ${g.toFixed(4)}`} />
          <Readout color={C.g} tex={`\\text{chord gradient} = ${AVG.toFixed(4)}`} />
          {rounded && <Readout color={C.good} tex="c'(t) = -0.22706\ldots \Rightarrow t \approx 0.900,\ 2.118" />}
          {rounded && <Readout color={C.bad} tex="c'(t) = -0.23 \Rightarrow t \approx 0.905,\ 2.102" />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
