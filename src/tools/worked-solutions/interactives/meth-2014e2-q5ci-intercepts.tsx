// 2014 Methods Exam 2 Q5c — counting the POSITIVE x-intercepts of y = f(x + d). Slide d: the
// intercepts 1 − d and 3 − d move left together. Positive intercepts are green, the others grey.
// The key moments are the end points the report says students got wrong: at d = 1 the left
// intercept sits ON the origin (0 is not positive, so one positive intercept remains and d = 1 is
// included), and at d = 3 the right one reaches the origin (none left, so 3 is excluded). Also
// serves part c.ii. (two positive intercepts exactly when d < 1).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const f = (x: number) => (x - 3) * (x - 1) * (x * x + 3)
const XLOW = 1 + Math.cbrt(2) // f's minimum

export default function Intercepts() {
  const [d, setD] = useState(0)
  const xs = [1 - d, 3 - d]
  const count = xs.filter(x => x > 1e-9).length
  const atOne = Math.abs(d - 1) < 1e-9
  const atThree = Math.abs(d - 3) < 1e-9
  const tone = (x: number) => (x > 1e-9 ? C.good : C.guide)

  let notice
  if (atOne) {
    notice = (
      <Notice tone="good">
        <b>At <M>d = 1</M> the left intercept is exactly at <M>x = 0</M>.</b> Zero is not positive, so only <M>x = 2</M>{' '}
        counts: one positive intercept. That is why <M>1</M> belongs in the c.i. answer, <M>[1, 3)</M>, and why{' '}
        <M>(1, 3)</M> lost the mark. It is also why c.ii. needs <M>d &lt; 1</M> strictly.
      </Notice>
    )
  } else if (atThree) {
    notice = (
      <Notice tone="warn">
        <b>At <M>d = 3</M> the right intercept has reached <M>x = 0</M></b> and the other is at <M>-2</M>: no positive
        intercepts. So <M>3</M> is excluded from the c.i. answer.
      </Notice>
    )
  } else if (count === 2) {
    notice = (
      <Notice>
        Both intercepts are positive: this is part c.ii.&apos;s case, which holds for every <M>d &lt; 1</M>. Slide{' '}
        <M>d</M> up to exactly <M>1</M> and watch the left intercept land on the origin.
      </Notice>
    )
  } else if (count === 1) {
    notice = (
      <Notice>
        One positive intercept, at <M>x = {(3 - d).toFixed(2)}</M>; the other is negative. This holds until the right
        intercept reaches the origin. Try <M>d = 3</M>.
      </Notice>
    )
  } else {
    notice = <Notice tone="warn">Both intercepts are at or left of the origin: no positive intercepts.</Notice>
  }

  return (
    <div>
      <Plane x={[-3, 4.5]} y={[-10, 14]} xStep={1} yStep={4} height={300}>
        <Line.Segment point1={[0, -10]} point2={[0, 14]} color={C.violet} weight={2} style="dashed" />
        <Label at={[0, 10.3]} color={C.violet} attach="e">positive x →</Label>
        <Plot.OfX y={x => f(x + d)} domain={[-3, 4.5]} color={C.f} weight={3} />
        {xs.map((x, i) => (x > -3 && x < 4.5 ? <Point key={i} x={x} y={0} color={tone(x)} /> : null))}
        {xs.map((x, i) => (x > -3 && x < 4.5 ? <Label key={`l${i}`} at={[x, 1.2]} color={tone(x)} attach={i === 0 ? 'nw' : 'ne'}>{num1(x)}</Label> : null))}
        <Label at={[XLOW - d, f(XLOW)]} color={C.f} attach="s">y = f(x + d)</Label>
      </Plane>
      <Controls>
        <Slider label="d" value={d} onChange={setD} min={-1.5} max={4} step={0.25} />
        <Readouts>
          <Readout color={tone(1 - d)} tex={`x = 1-d = ${(1 - d).toFixed(2)}`} />
          <Readout color={tone(3 - d)} tex={`x = 3-d = ${(3 - d).toFixed(2)}`} />
          <Readout tex={`\\text{positive intercepts: } ${count}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}

function num1(x: number): string {
  const s = Number.isInteger(x) ? String(x) : x.toFixed(2)
  return s.replace('-', '−')
}
