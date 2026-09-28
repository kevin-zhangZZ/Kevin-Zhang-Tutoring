// 2018 Methods Exam 2 Q1b — y = f(x) + b is f(x) = 3x⁴ + 4x³ − 12x² lifted by b. Slide b and
// count the x-intercepts: 4, 3, 2, … until only the deepest point M' = (−2, −32 + b) is left
// touching the axis at b = 32 (still one intercept), and none once b > 32. The count comes from
// the three turning values of f (−32, 0, −5), and the dots are the actual roots of f(x) + b = 0.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const f = (x: number) => 3 * x ** 4 + 4 * x ** 3 - 12 * x ** 2

/** Roots of f(x) + b = 0: sign changes found by bisection, plus the touching points when the
 *  shift lands a turning point (x = −2, 0, 1) exactly on the axis. */
function roots(b: number): number[] {
  const g = (x: number) => f(x) + b
  const out: number[] = []
  const N = 1400
  const lo = -4
  const hi = 3
  let x1 = lo
  let y1 = g(x1)
  for (let i = 1; i <= N; i++) {
    const x2 = lo + ((hi - lo) * i) / N
    const y2 = g(x2)
    if (y1 * y2 < 0) {
      let a = x1
      let c = x2
      for (let k = 0; k < 50; k++) {
        const m = (a + c) / 2
        if (g(a) * g(m) <= 0) c = m
        else a = m
      }
      out.push((a + c) / 2)
    }
    x1 = x2
    y1 = y2
  }
  const touch = [-2, 0, 1].filter(t => Math.abs(g(t)) < 1e-9)
  return [...out.filter(r => touch.every(t => Math.abs(r - t) > 0.01)), ...touch].sort((p, q) => p - q)
}

export default function Lift() {
  const [b, setB] = useState(20)
  const rs = roots(b)
  const low = -32 + b
  const at32 = Math.abs(b - 32) < 1e-9
  const above = b > 32 + 1e-9
  const mColor = above ? C.good : at32 ? C.g : C.bad

  let notice
  if (at32) {
    notice = (
      <Notice tone="warn">
        <b>Exactly at <M>b = 32</M></b> the lowest point sits <em>on</em> the axis: the curve touches it at{' '}
        <M>x = -2</M>. A touch is still an <M>x</M>-intercept, so <M>b = 32</M> gives one intercept, not none.
        That is why <M>{'b \\ge 32'}</M> is wrong. Nudge <M>b</M> up by the smallest amount.
      </Notice>
    )
  } else if (above) {
    notice = (
      <Notice tone="good">
        Now even the lowest point is above the axis: <M>{`-32 + b = ${low.toFixed(1)} > 0`}</M>, and every other
        point is higher still, so there are no <M>x</M>-intercepts. This works for <em>every</em>{' '}
        <M>{'b > 32'}</M>, including <M>b = 32.5</M>, which is why <M>{'[33, \\infty)'}</M> is too small an answer.
        The answer is about <M>b</M>, not <M>x</M>.
      </Notice>
    )
  } else if (b > 5 + 1e-9) {
    notice = (
      <Notice>
        The right-hand trough has cleared the axis, but the deep one at <M>M</M> is still below:{' '}
        <M>{`-32 + b = ${low.toFixed(1)}`}</M>. Lifting the curve only matters at its <b>lowest point</b>, so
        keep sliding until that point reaches the axis.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        With <M>{`b = ${b.toFixed(1)}`}</M> the curve meets the axis <b>{rs.length}</b> times. Each shift moves
        every point up by the same <M>b</M>, so the shape never changes; only its height does. Slide{' '}
        <M>b</M> up and watch the troughs leave the axis one at a time.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.2, 2.4]} y={[-40, 50]} xStep={1} yStep={10} height={320}>
        <Plot.OfX y={f} domain={[-3.4, 2.6]} color={C.guide} weight={1.5} style="dashed" />
        <Plot.OfX y={x => f(x) + b} domain={[-3.4, 2.6]} color={C.f} weight={3} />
        {Math.abs(b) > 0.5 && (
          <Line.Segment point1={[-2, -32]} point2={[-2, low]} color={mColor} style="dashed" weight={2} />
        )}
        <Point x={-2} y={-32} color={C.guide} />
        <Label at={[-2, -32]} attach="e" color={C.guide}>M</Label>
        {rs.map(r => (
          <Point key={r.toFixed(4)} x={r} y={0} color={C.g} />
        ))}
        <Point x={-2} y={low} color={mColor} />
        <Label at={[-2, low]} attach="sw" color={mColor}>M′</Label>
        <Label at={[-1.8, 45]} attach="e" color={C.f}>y = f(x) + b</Label>
        {Math.abs(b) > 3 && <Label at={[1.2, f(1.2)]} attach="se" color={C.guide} size={12}>y = f(x)</Label>}
      </Plane>
      <Controls>
        <Slider label="b" value={b} onChange={setB} min={-10} max={40} step={0.5} format={v => v.toFixed(1)} />
        <Buttons>
          <ActionButton label="b = 32" onClick={() => setB(32)} />
          <ActionButton label="b = 32.5" onClick={() => setB(32.5)} />
        </Buttons>
        <Readouts>
          <Readout color={mColor} tex={`\\text{lowest point } M' = (-2,\\ -32 + b) = (-2,\\ ${low.toFixed(1)})`} />
          <Readout color={C.g} tex={`x\\text{-intercepts: } ${rs.length}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
