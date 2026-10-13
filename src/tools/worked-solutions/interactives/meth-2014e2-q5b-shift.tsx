// 2014 Methods Exam 2 Q5b — y = f(x + h) is y = f(x) moved h units LEFT. Slide h from 0: the
// graph of f(x) = (x − 3)(x − 1)(x² + 3) slides left as h grows, and at h = 1 it lands exactly on
// g(x) = x⁴ − 8x (dashed). The intercepts 1 − h and 3 − h make the direction visible: + inside the
// bracket moves the graph towards negative x, the sign trap the report describes.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const f = (x: number) => (x - 3) * (x - 1) * (x * x + 3)
const g = (x: number) => x ** 4 - 8 * x
const XLOW = 1 + Math.cbrt(2) // f's minimum

export default function Shift() {
  const [h, setH] = useState(0)
  const atG = Math.abs(h - 1) < 1e-9
  const col = atG ? C.good : C.f

  let notice
  if (atG) {
    notice = (
      <Notice tone="good">
        <b>At <M>h = 1</M> the graph sits exactly on <M>g</M>.</b> <M>f(x+1)</M> moved the intercepts from <M>1</M> and{' '}
        <M>3</M> to <M>0</M> and <M>2</M>: one unit in the <b>negative</b> direction of the <M>x</M>-axis, even though the
        bracket says <M>+1</M>.
      </Notice>
    )
  } else if (h > 0) {
    notice = (
      <Notice>
        With <M>h &gt; 0</M> the graph has moved <b>left</b> by <M>h</M>. Keep going until it lands on the dashed{' '}
        <M>g</M>.
      </Notice>
    )
  } else if (h < 0) {
    notice = (
      <Notice tone="warn">
        With <M>h &lt; 0</M> the graph moves <b>right</b>, away from <M>g</M>. This is the &ldquo;positive direction&rdquo;
        answer: it can never match <M>g</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        This is <M>y = f(x)</M>, with intercepts <M>1</M> and <M>3</M>. The dashed curve is <M>y = g(x)</M>. Increase{' '}
        <M>h</M> to graph <M>y = f(x+h)</M> and watch which way it moves.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.5, 4.5]} y={[-12, 20]} xStep={1} yStep={4} height={320}>
        <Plot.OfX y={g} domain={[-2.5, 4.5]} color={C.g} weight={2} style="dashed" />
        <Plot.OfX y={x => f(x + h)} domain={[-2.5, 4.5]} color={col} weight={3} />
        <Point x={1 - h} y={0} color={col} />
        <Point x={3 - h} y={0} color={col} />
        <Label at={[-1.4, g(-1.4)]} color={C.g} attach="e">y = g(x)</Label>
        <Label at={[XLOW - h, f(XLOW)]} color={col} attach="s">y = f(x + h)</Label>
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={-1.5} max={2} step={0.25} />
        <Readouts>
          <Readout color={col} tex={`x = 1-h = ${(1 - h).toFixed(2)}`} />
          <Readout color={col} tex={`x = 3-h = ${(3 - h).toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
