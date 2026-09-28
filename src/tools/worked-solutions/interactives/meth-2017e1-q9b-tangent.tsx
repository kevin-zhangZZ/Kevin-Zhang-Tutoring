// 2017 Methods Exam 1 Q9b — reading the gradient formula f'(x) = (1 − 3x)/(2√x) off the curve
// f(x) = √x(1 − x). Slide the point of contact: the numerator 1 − 3x sets the sign (zero at the
// peak x = 1/3), the denominator 2√x → 0 makes the tangent near-vertical at the origin, and the
// gradient keeps falling to exactly −1 at x = 1, the steepest downhill tangent (needed in part c).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'

const f = (x: number) => Math.sqrt(Math.max(0, x)) * (1 - x)
const fp = (x: number) => (1 - 3 * x) / (2 * Math.sqrt(x))

export default function Tangent() {
  const [x0, setX0] = useState(0.6)
  const m = fp(x0)
  const nearPeak = x0 === 1 / 3
  const atEnd = x0 > 0.999
  const nearZero = x0 < 0.06

  let notice
  if (nearZero) {
    notice = (
      <Notice>
        Close to the origin the denominator <M>{'2\\sqrt x'}</M> is tiny, so the gradient blows up (here about{' '}
        <M>{num(m, 1)}</M>). That is why VCAA&apos;s graph leaves the origin almost vertically. The numerator{' '}
        <M>1-3x</M> is still positive, so the tangent climbs.
      </Notice>
    )
  } else if (nearPeak) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'x=\\tfrac13'}</M> the numerator <M>1-3x</M> is zero</b>, so the gradient is <M>0</M>: the tangent is
        horizontal, and this is the top of the hump.
      </Notice>
    )
  } else if (x0 < 1 / 3) {
    notice = (
      <Notice>
        Left of <M>{'x=\\tfrac13'}</M>, <M>{'1-3x>0'}</M> and <M>{'2\\sqrt x>0'}</M>, so the gradient is positive and the
        tangent climbs. Slide right: where does the numerator become zero?
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="good">
        <b>At <M>x=1</M> the gradient is <M>{'\\tfrac{1-3}{2\\sqrt1}=-1'}</M></b>, so the tangent runs through{' '}
        <M>(1,0)</M> at <M>45^\circ</M> downhill. The gradient fell the whole way from the peak, so <M>-1</M> is the
        steepest downhill tangent anywhere on the graph. Part c needs exactly this tangent.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Right of <M>{'x=\\tfrac13'}</M>, <M>{'1-3x<0'}</M> while <M>{'2\\sqrt x>0'}</M>, so the gradient is negative and
        the tangent runs downhill, more steeply as <M>x</M> grows. Slide to <M>x=1</M> to see how steep it gets.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.3, 1.25]} y={[-0.2, 0.6]} xStep={0.5} yStep={0.25} height={340} equalScale yLabels={false}>
        <Line.Segment point1={[1 / 3, 0]} point2={[1 / 3, f(1 / 3)]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[0, 1]} color={C.f} weight={3} />
        <Line.PointSlope point={[x0, f(x0)]} slope={m} color={C.g} weight={2.5} />
        <Point x={x0} y={f(x0)} color={C.g} />
        <Label at={[1 / 3, 0]} color={C.guide} attach="s">1/3</Label>
        <Label at={[0.8, f(0.8)]} color={C.f} attach="sw">y = f(x)</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => setX0(Math.abs(v - 1 / 3) < 0.004 ? 1 / 3 : v)}
          min={0.005}
          max={1}
          step={0.005}
          format={v => (v === 1 / 3 ? '1/3' : v.toFixed(3))}
        />
        <Readouts>
          <Readout tex={`1-3x = ${num(1 - 3 * x0, 3)}`} />
          <Readout tex={`2\\sqrt{x} = ${num(2 * Math.sqrt(x0), 3)}`} />
          <Readout color={C.g} tex={`f'(x) = \\frac{1-3x}{2\\sqrt{x}} = ${nearPeak ? '0' : num(m, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
