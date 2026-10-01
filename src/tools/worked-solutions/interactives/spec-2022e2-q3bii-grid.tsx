// 2022 Specialist Exam 2 Q3b.ii — the sketch of x = log_e(tan⁻¹(2t) + 1) on VCAA's own grid
// (t from 0 to 10.5 in squares of 0.5, x from 0 to 1.05 in squares of 0.05). Slide along the
// curve and read the gap to the asymptote in grid squares: the curve leaves O with gradient 2
// (almost vertical on this grid), is within about 2 squares of the asymptote by t = 2, and at
// t = 10 sits less than half a square below it, at (10, 0.92). That is the precision a sketch on
// this grid needs.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const CAP = Math.log(Math.PI / 2 + 1)
const X = (t: number) => Math.log(Math.atan(2 * t) + 1)
const V = (t: number) => 2 / ((1 + 4 * t * t) * (Math.atan(2 * t) + 1))
const SQUARE = 0.05

const fmt = (v: number) => String(Number(v.toFixed(2)))
const evenOnly = (v: number) => (Math.abs(v / 2 - Math.round(v / 2)) < 1e-9 ? String(Math.round(v)) : '')

export default function Grid() {
  const [t, setT] = useState(10)
  const x = X(t)
  const gap = CAP - x
  const squares = gap / SQUARE
  const pct = Math.round((x / CAP) * 100)

  let notice
  if (Math.abs(t - 10) < 0.01) {
    notice = (
      <Notice tone="good">
        At <M>t = 10</M>, <M>{'x = \\log_e\\left(\\tan^{-1}(20)+1\\right) \\approx 0.9246'}</M>, so plot and label{' '}
        <M>(10,\ 0.92)</M>. It is only <M>0.0196</M> below the asymptote, less than half a grid square, so the point
        and the curve through it sit just under the dashed line, never on it or above it. Drag <M>t</M> back
        towards <M>0</M> to see how the curve gets there.
      </Notice>
    )
  } else if (t < 0.5) {
    notice = (
      <Notice>
        At <M>t = 0</M> the gradient is <M>{'\\tfrac{dx}{dt} = 2'}</M>. One square across is <M>0.5</M> and one
        square up is <M>0.05</M>, so a gradient of 2 climbs 20 squares for every square across: the curve leaves{' '}
        <M>O</M> almost vertically, not as a gentle ramp. Drag <M>t</M> out to about <M>2</M>.
      </Notice>
    )
  } else if (t < 3) {
    notice = (
      <Notice>
        By <M>{`t = ${fmt(t)}`}</M> the particle is already at <M>{`x \\approx ${x.toFixed(2)}`}</M>, about {pct}% of
        the way to the asymptote, which is now {squares.toFixed(1)} squares above. The steep climb is over in the
        first couple of seconds, so the sketch should bend sharply here. Now drag to <M>t = 10</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The curve keeps rising, because <M>{'\\tfrac{dx}{dt} > 0'}</M>, but more and more slowly, creeping towards the
        dashed line without reaching it. The gap is now <M>{gap.toFixed(4)}</M>, which is {squares.toFixed(1)}{' '}
        squares. Drag to <M>t = 10</M> for the point the question asks for.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.5, 10.5]} y={[0, 1.05]} xStep={0.5} yStep={0.05} height={330} xLabel="t" yLabel="x" xLabels={evenOnly} yLabels={false}>
        {/* The x-axis numbers go to the left of the axis (the plane starts at t = -0.5 to make room): on the right, the steep start of the curve would run over them. */}
        {[0.2, 0.4, 0.6, 0.8, 1].map(v => (
          <Label key={v} at={[0, v]} attach="w" size={12} bold={false} gap={5}>
            {v.toFixed(1)}
          </Label>
        ))}
        <Line.Segment point1={[0, CAP]} point2={[10.5, CAP]} color={C.violet} style="dashed" weight={2} />
        <Label at={[5.25, CAP]} attach="n" color={C.violet} gap={5}>
          x = logₑ(π/2 + 1) ≈ 0.944
        </Label>
        <Plot.OfX y={X} domain={[0, 10.5]} color={C.f} weight={3} />
        <Line.Segment point1={[t, 0]} point2={[t, x]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[t, x]} point2={[t, CAP]} color={C.g} weight={4} />
        <Point x={t} y={x} color={C.f} />
        <Label at={[t, x]} attach={t > 8 ? 'sw' : 'se'} color={C.f}>
          {`(${fmt(t)}, ${x.toFixed(2)})`}
        </Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={10.5} step={0.05} />
        <Readouts>
          <Readout color={C.f} tex={`x \\approx ${x.toFixed(4)}`} />
          <Readout tex={`\\tfrac{dx}{dt} \\approx ${V(t).toFixed(3)}`} />
          <Readout color={C.g} tex={`\\text{gap} \\approx ${gap.toFixed(4)} = ${squares.toFixed(1)}\\text{ squares}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
