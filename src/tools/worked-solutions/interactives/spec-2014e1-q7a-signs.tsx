// 2014 Specialist Exam 1 Q7a — the range of f(x) = 3x·arctan(2x). Only 4% of students got it:
// most multiplied the ranges of the two "parts" and wrote answers like (−3π/2, 3π/2). Slide x
// along the axis: the two factors 3x and arctan(2x) are always the same sign (both zero at x = 0),
// so the product never goes below 0, and because 3x is unbounded the product has no ceiling.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const lin = (x: number) => 3 * x
const at = (x: number) => Math.atan(2 * x)
const f = (x: number) => 3 * x * Math.atan(2 * x)

export default function Signs() {
  const [x0, setX0] = useState(-1)
  const a = lin(x0)
  const b = at(x0)
  const y = f(x0)
  const zero = Math.abs(x0) < 0.02

  let notice
  if (zero) {
    notice = (
      <Notice tone="good">
        At <M>x = 0</M> <b>both factors are 0</b>, so <M>f(0) = 0</M>. This is the lowest point of the graph, and the
        value is actually reached, so the range is closed at 0: <M>{'[0, \\infty)'}</M>.
      </Notice>
    )
  } else if (x0 < 0) {
    notice = (
      <Notice>
        For <M>x &lt; 0</M> <b>both factors are negative</b> (orange and blue are both below the axis), so their product
        is positive. Slide to <M>x = 0</M>, then to the right.
      </Notice>
    )
  } else if (x0 < 2) {
    notice = (
      <Notice>
        For <M>x &gt; 0</M> <b>both factors are positive</b>, so the product is positive again. Now slide right to{' '}
        <M>x = 3</M> and watch whether <M>f</M> levels off.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{'\\arctan(2x)'}</M> levels off near <M>{'\\tfrac\\pi2'}</M>, but <M>3x</M> does not, so{' '}
        <M>{'f(x) \\approx \\tfrac{3\\pi}{2}x'}</M> keeps growing. Multiplying the two ranges, as many students did, gives
        the bounded <M>{'\\left(-\\tfrac{3\\pi}2,\\tfrac{3\\pi}2\\right)'}</M>, and <M>f</M> here is already{' '}
        {y.toFixed(1)}.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[-4, 10]} xStep={1} yStep={2} height={340} label="Graphs of y = 3x, y = arctan(2x) and their product">
        <Plot.OfX y={lin} color={C.g} weight={2} />
        <Plot.OfX y={at} color={C.f} weight={3} />
        <Plot.OfX y={f} color={C.violet} weight={3} />
        <Line.Segment point1={[x0, 0]} point2={[x0, Math.max(-4, Math.min(10, y))]} color={C.guide} style="dashed" weight={1.5} />
        {a > -4 && a < 10 && <Point x={x0} y={a} color={C.g} />}
        <Point x={x0} y={b} color={C.f} />
        {y < 10 && <Point x={x0} y={y} color={C.violet} />}
        <Label at={[2.3, f(2.3)]} color={C.violet} attach="w">y = f(x)</Label>
        <Label at={[2.6, lin(2.6)]} color={C.g} attach="e">3x</Label>
        <Label at={[2.2, at(2.2)]} color={C.f} attach="s">arctan(2x)</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-3} max={3} step={0.01} />
        <Readouts>
          <Readout color={C.g} tex={`3x = ${a.toFixed(2)}`} />
          <Readout color={C.f} tex={`\\arctan(2x) = ${b.toFixed(2)}`} />
          <Readout color={C.violet} tex={`f(x) = ${y.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
