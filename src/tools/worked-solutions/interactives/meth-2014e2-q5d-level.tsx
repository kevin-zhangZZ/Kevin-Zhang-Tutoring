// 2014 Methods Exam 2 Q5d — the solutions of g(x) = n are where the horizontal line y = n meets
// y = x⁴ − 8x. Slide n: above the minimum there are two meeting points, below it none, and only at
// the minimum, n = −6∛2 ≈ −7.56, is there exactly one. The slider snaps onto the minimum so the
// one-solution case can be reached. The readout separates the answer n (a height) from the
// x-value ∛2, which the report says some students gave instead.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const g = (x: number) => x ** 4 - 8 * x
const XMIN = Math.cbrt(2)
const NMIN = g(XMIN) // −6∛2

/** Root of g(x) = n on [a, b], where g − n changes sign once. */
function bisect(n: number, a: number, b: number): number {
  let lo = a
  let hi = b
  const sLo = Math.sign(g(lo) - n)
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (Math.sign(g(mid) - n) === sLo) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

export default function Level() {
  const [n, setN] = useState(4)
  const atMin = Math.abs(n - NMIN) < 1e-9
  const xs = atMin ? [XMIN] : n > NMIN ? [bisect(n, -10, XMIN), bisect(n, XMIN, 10)] : []
  const col = atMin ? C.good : xs.length ? C.g : C.bad

  const onChange = (v: number) => setN(Math.abs(v - NMIN) < 0.3 ? NMIN : v)

  let notice
  if (atMin) {
    notice = (
      <Notice tone="good">
        <b>Exactly one solution: the line touches the minimum.</b> The answer is the height,{' '}
        <M>{'n = -6\\sqrt[3]{2} \\approx -7.56'}</M>, written exactly. The <M>x</M>-value <M>{'\\sqrt[3]{2}'}</M> only says{' '}
        <em>where</em> the minimum is; it is not <M>n</M>.
      </Notice>
    )
  } else if (xs.length === 2) {
    notice = (
      <Notice>
        The line <M>y = n</M> crosses the U-shaped curve twice, so <M>g(x) = n</M> has two solutions. Lower <M>n</M>{' '}
        and watch the two meeting points close in on each other.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The line is below the lowest point of the curve: no solutions. Raise <M>n</M> back to the minimum.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2, 3]} y={[-12, 16]} xStep={1} yStep={4} height={300}>
        <Plot.OfX y={g} domain={[-2, 3]} color={C.f} weight={3} />
        <Line.Segment point1={[-2, n]} point2={[3, n]} color={col} weight={2} />
        {xs.map((x, i) => (
          <Point key={i} x={x} y={n} color={col} />
        ))}
        <Label at={[-1.95, n]} color={col} attach="ne">y = n</Label>
        <Label at={[-1.3, g(-1.3)]} color={C.f} attach="e">y = g(x)</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={onChange} min={-11} max={14} step={0.1} />
        <Readouts>
          <Readout color={col} tex={`\\text{solutions: } ${xs.length}`} />
          {xs.length > 0 && <Readout tex={`x \\approx ${xs.map(x => x.toFixed(2)).join(',\\ ')}`} />}
          <Readout tex={`\\text{minimum: } \\bigl(\\sqrt[3]{2},\\ -6\\sqrt[3]{2}\\bigr) \\approx (1.26,\\ ${NMIN.toFixed(2)})`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
