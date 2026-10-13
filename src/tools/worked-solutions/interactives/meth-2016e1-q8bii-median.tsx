// 2016 Methods Exam 1 Q8b.ii — where is the median of f(x) = −4x·logₑ(x) on (0, 1]?
// Slide a cut point c along the (true-scale) density: the area right of c is
// Pr(X > c) = 1 + c²(2·logₑ(c) − 1) (from part a. with k = 2). At c = 1/e it is 1 − 3/e² ≈ 0.594,
// more than half, so the cut must move right to halve the area: the median is ≈ 0.432 > 1/e.
// Jumping to c = ½ (the middle of the interval) gives Pr(X > ½) ≈ 0.403 < ½, so the median sits
// between 1/e and ½ — which is why the report's misconception "1/e < 2/5 < 1/2, so
// Pr(X > 1/e) > 1/2" decides nothing: being left of the interval's midpoint says nothing about area.
// Values checked with sympy (median solves 1 + m²(2 ln m − 1) = ½, m ≈ 0.43207).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider,
} from './kit'

const f = (x: number) => (x > 0 && x <= 1 ? -4 * x * Math.log(x) : 0)
const right = (c: number) => (c <= 0 ? 1 : 1 + c * c * (2 * Math.log(c) - 1))
const INV_E = 1 / Math.E
const MEDIAN = 0.43207
const zero = () => 0

export default function Median() {
  const [c, setC] = useState(INV_E)
  const pr = right(c)
  const atE = Math.abs(c - INV_E) < 0.006
  const atHalf = Math.abs(c - 0.5) < 0.006
  const atMedian = Math.abs(c - MEDIAN) < 0.006

  let notice
  if (atMedian) {
    notice = (
      <Notice tone="good">
        <b>Here the area is split in half</b>: <M>{'\\Pr(X>c)=\\tfrac12'}</M> at <M>c\approx 0.432</M>. That is the
        median, and it is to the right of <M>{'\\tfrac1e\\approx 0.368'}</M>. In the exam you never need this number,
        only which side of <M>{'\\tfrac1e'}</M> it is on.
      </Notice>
    )
  } else if (atE) {
    notice = (
      <Notice>
        <b>At <M>{'c=\\tfrac1e'}</M>, the orange area is <M>{'1-\\tfrac{3}{e^2}\\approx 0.594,'}</M></b> more than
        half. To leave only half on the right, the cut has to move <b>right</b>. Drag <M>c</M> until the orange area
        drops to <M>0.5</M>.
      </Notice>
    )
  } else if (atHalf) {
    notice = (
      <Notice tone="warn">
        <M>{'x=\\tfrac12'}</M> is the middle of the interval, but only about <M>0.403</M> of the probability lies to its
        right, so the median is <b>left</b> of <M>{'\\tfrac12'}</M>. Knowing <M>{'\\tfrac1e<\\tfrac12'}</M> tells you
        nothing about which side of <M>{'\\tfrac1e'}</M> the median is on. Only the area does.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        As <M>c</M> moves right, the orange area <M>{'\\Pr(X>c)'}</M> only ever shrinks. The median is the one place
        where it equals <M>{'\\tfrac12'}</M>. Try the buttons to compare <M>{'\\tfrac1e'}</M>, the median and{' '}
        <M>{'\\tfrac12'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1.08]} y={[0, 1.7]} xStep={0.25} yStep={0.5} height={300} label="Graph of the density f(x) = −4x logₑ(x), split at x = c">
        <Region top={f} bottom={zero} from={0.0005} to={c} color={C.f} opacity={0.22} />
        <Region top={f} bottom={zero} from={c} to={1} color={C.g} opacity={0.3} />
        <Plot.OfX y={f} domain={[0.0005, 1]} color={C.f} weight={3} />
        <Line.Segment point1={[INV_E, 0]} point2={[INV_E, f(INV_E)]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[INV_E, 1.55]} color={C.guide} attach="w">1/e</Label>
        <Line.Segment point1={[0.5, 0]} point2={[0.5, 1.6]} color={C.bad} style="dashed" weight={1.5} />
        <Label at={[0.5, 1.55]} color={C.bad} attach="e">middle</Label>
        <Line.Segment point1={[c, 0]} point2={[c, Math.max(f(c), 0.05)]} color={C.ink} weight={2.5} />
        <Label at={[0.82, f(0.82)]} color={C.f} attach="ne">f</Label>
        <Label at={[c, 0.15]} color={C.ink} attach={c < 0.5 ? 'w' : 'e'}>c</Label>
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={0.05} max={0.95} step={0.002} format={v => v.toFixed(3)} />
        <Buttons>
          <ActionButton label={<M>{'c=\\tfrac1e'}</M>} onClick={() => setC(INV_E)} />
          <ActionButton label="c = median" onClick={() => setC(MEDIAN)} />
          <ActionButton label={<M>{'c=\\tfrac12'}</M>} onClick={() => setC(0.5)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\Pr(X<c) \\approx ${(1 - pr).toFixed(3)}`} />
          <Readout color={C.g} tex={`\\Pr(X>c) = 1+c^2\\left(2\\log_e(c)-1\\right) \\approx ${pr.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
