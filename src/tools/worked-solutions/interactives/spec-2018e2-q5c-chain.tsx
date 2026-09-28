// 2018 Specialist Exam 2 Q5c — why a = v dv/dx. The curve is part c.'s answer,
// x = −v + 4.9 logₑ(4.9/(4.9 − v)), drawn as speed v against distance x. Slide a point along it:
// the slope dv/dx is speed gained per METRE; in one second the suitcase covers about v metres, so
// per SECOND it gains v × dv/dx. That product (measured from the curve) always equals the given
// a = (g − 2v)/2 = 4.9 − v, so the triangle's top lands on v = 4.9. A toggle shows the slope on its
// own (a 1-metre step) is not the acceleration.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const K = 4.9 // g/2 with g = 9.8
const X = (v: number) => -v + K * Math.log(K / (K - v)) // part c's answer
/** v as a function of x, by bisection (X is increasing on [0, 4.9)). */
function V(x: number) {
  let lo = 0
  let hi = K - 1e-12
  for (let i = 0; i < 70; i++) {
    const mid = (lo + hi) / 2
    if (X(mid) < x) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}
const XMAX = 16
const VMAX = V(XMAX)

export default function ChainRule() {
  const [x0, setX0] = useState(2)
  const [slopeOnly, setSlopeOnly] = useState(false)

  const v0 = V(x0)
  const h = 1e-3
  const slope = (V(x0 + h) - V(x0 - h)) / (2 * h) // measured from the curve, not from the DE
  const perSecond = v0 * slope
  const a = K - v0

  let notice
  if (slopeOnly) {
    notice = (
      <Notice tone="warn">
        The red step is <b>1 metre</b> long, so its rise is <M>{`\\tfrac{dv}{dx}\\approx ${slope.toFixed(2)}`}</M>: speed
        gained per <em>metre</em>. But acceleration is speed gained per <em>second</em>, and here{' '}
        <M>{`a = ${a.toFixed(2)}`}</M>. They would only agree if the suitcase covered exactly 1 metre each second
        (<M>v = 1</M>). That missing factor of <M>v</M> is why the form is <M>{'v\\tfrac{dv}{dx}'}</M>.
      </Notice>
    )
  } else if (x0 < 1.2) {
    notice = (
      <Notice>
        Near the top the curve is <b>steep</b>: each metre adds a lot of speed (
        <M>{`\\tfrac{dv}{dx}\\approx ${slope.toFixed(2)}`}</M>). But the suitcase is slow, covering only about{' '}
        <M>{`${v0.toFixed(2)}`}</M> m in the next second, so per second it gains <M>{'v\\times\\tfrac{dv}{dx}'}</M>, the green
        rise. Drag <M>x</M> further down the ramp and watch the two readouts stay equal.
      </Notice>
    )
  } else if (x0 < 6) {
    notice = (
      <Notice tone="good">
        The curve is flattening, so each metre adds less speed, yet the suitcase covers more metres each second (the
        violet run is the <M>v</M> metres covered in one second). The product <M>{'v\\tfrac{dv}{dx}'}</M>, the green rise
        measured from the curve, still equals <M>{'a = 4.9 - v'}</M>: part c.&apos;s
        answer really does satisfy <M>{'v\\tfrac{dv}{dx} = \\tfrac{g-2v}{2}'}</M>. Notice the green rise always ends on the
        dashed line <M>v = 4.9</M>, because <M>a</M> is exactly the gap below <M>4.9</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Further down, <M>{`a = 4.9 - v \\approx ${a.toFixed(2)}`}</M> is small: the resistance of <M>v</M> N per kg nearly
        cancels the <M>4.9</M> N per kg pulling the suitcase down the ramp. The curve levels off towards{' '}
        <M>v = 4.9</M> without reaching it. Turn on &ldquo;Why not just dv/dx?&rdquo; to see why the <M>v</M> matters.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, XMAX]} y={[0, 5.8]} xStep={2} yStep={1} height={300} xLabel="x" yLabel="v">
        <Line.Segment point1={[0, K]} point2={[XMAX, K]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[XMAX - 0.2, K]} color={C.guide} attach="nw">v = 4.9</Label>
        <Plot.Parametric xy={t => [X(t), t]} domain={[0, VMAX]} color={C.f} weight={3} />
        <Line.PointSlope point={[x0, v0]} slope={slope} color={C.guide} weight={1.5} />
        {/* one second of travel: run v metres, rise v·dv/dx */}
        <Line.Segment point1={[x0, v0]} point2={[x0 + v0, v0]} color={C.violet} weight={2.5} />
        <Line.Segment point1={[x0 + v0, v0]} point2={[x0 + v0, v0 + perSecond]} color={C.good} weight={4} />
        <Label at={[x0 + v0 / 2, v0]} color={C.violet} attach="s">v m</Label>
        <Label at={[x0 + v0, v0 + perSecond / 2]} color={C.good} attach="e">v·dv/dx</Label>
        {slopeOnly && (
          <>
            <Line.Segment point1={[x0, v0 - 0.02]} point2={[x0 + 1, v0 - 0.02]} color={C.bad} weight={2.5} />
            <Line.Segment point1={[x0 + 1, v0]} point2={[x0 + 1, v0 + slope]} color={C.bad} weight={4} />
            <Label at={[x0 + 1, v0 + slope]} color={C.bad} attach="nw">dv/dx</Label>
          </>
        )}
        <Point x={x0} y={v0} color={C.f} />
        <Label at={[11, V(11)]} color={C.f} attach="s">part c.</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={0.3} max={10} step={0.05} />
        <Toggle label="Why not just dv/dx?" checked={slopeOnly} onChange={setSlopeOnly} />
        <Readouts>
          <Readout color={C.f} tex={`v \\approx ${v0.toFixed(2)}`} />
          <Readout color={slopeOnly ? C.bad : undefined} tex={`\\tfrac{dv}{dx} \\approx ${slope.toFixed(3)}`} />
          <Readout color={C.good} tex={`v\\tfrac{dv}{dx} \\approx ${perSecond.toFixed(3)}`} />
          <Readout color={C.good} tex={`a = 4.9 - v \\approx ${a.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
