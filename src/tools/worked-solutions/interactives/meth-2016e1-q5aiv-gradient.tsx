// 2016 Methods Exam 1 Q5a.iv — the stationary point of h(x) = logₑ(x² + 1). Slide a tangent
// along the curve and watch h'(x) = 2x/(x² + 1): its sign is the sign of the numerator 2x, since
// the denominator is always positive, so the gradient goes − → 0 → + through x = 0: a minimum.
// The steepest points (h' = ±1) are at x = ±1; those are the points of inflection
// (h''(x) = −2(x − 1)(x + 1)/(x² + 1)² = 0), not the stationary point.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const h = (x: number) => Math.log(x * x + 1)
const dh = (x: number) => (2 * x) / (x * x + 1)

export default function Gradient() {
  const [x0, setX0] = useState(-2)
  const m = dh(x0)
  const y0 = h(x0)
  const tangent = (x: number) => y0 + m * (x - x0)
  const atZero = Math.abs(x0) < 0.05
  const atInfl = Math.abs(Math.abs(x0) - 1) < 0.05
  const colour = atZero ? C.good : m < 0 ? C.bad : C.f

  let notice
  if (atZero) {
    notice = (
      <Notice tone="good">
        <b>Gradient zero.</b> The numerator <M>2x</M> is <M>0</M>, and the denominator <M>{'x^2 + 1 = 1'}</M> is not, so{' '}
        <M>{"h'(0) = 0"}</M>. The gradient was negative just before and is positive just after: a <b>minimum</b> at{' '}
        <M>(0, 0)</M>.
      </Notice>
    )
  } else if (atInfl) {
    notice = (
      <Notice tone="warn">
        <b>The steepest point</b>, gradient <M>{x0 > 0 ? '1' : '-1'}</M>. The curve changes from bending{' '}
        {x0 > 0 ? 'up to bending down' : 'down to bending up'} here, so <M>{x0 > 0 ? 'x = 1' : 'x = -1'}</M> is a point of inflection, and its gradient is not zero. The stationary
        point at <M>x = 0</M> is a different point, and it is a minimum.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The denominator <M>{'x^2 + 1'}</M> is always positive, so the sign of <M>{"h'(x)"}</M> is the sign of the numerator{' '}
        <M>2x</M>: {m < 0 ? <b>negative for x &lt; 0</b> : <b>positive for x &gt; 0</b>}. Slide to <M>x = 0</M> to see where it
        changes sign, then try <M>x = \pm 1</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.5, 3.5]} y={[-1, 3]} xStep={1} yStep={1} height={300} xLabels={(v) => (Math.abs(v) > 3 ? '' : String(v))} label="Graph of y = logₑ(x² + 1) with a moving tangent">
        <Plot.OfX y={h} domain={[-3.5, 3.5]} color={C.f} weight={3} />
        <Plot.OfX y={tangent} domain={[x0 - 1.2, x0 + 1.2]} color={colour} weight={2.5} />
        <Point x={x0} y={y0} color={colour} />
        <Point x={-1} y={Math.log(2)} color={C.violet} />
        <Point x={1} y={Math.log(2)} color={C.violet} />
        <Label at={[3, h(3)]} color={C.f} attach="nw">h</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-3} max={3} step={0.05} />
        <Readouts>
          <Readout color={colour} tex={`h'(x) = \\dfrac{2x}{x^2+1} = \\dfrac{${(2 * x0).toFixed(2)}}{${(x0 * x0 + 1).toFixed(2)}} = ${m.toFixed(2)}`} />
          <Readout color={C.violet} tex={'\\text{inflection points: } x = \\pm 1'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
