// 2018 Methods Exam 2 Q1h.iii — p(x) = 0 has no solutions exactly when the lowest point of p is
// above the axis. For a > 1 the only stationary point is the minimum at x = 1, so the condition is
// p(1) = a² − 6a − 5 > 0. Top: the graph of p for the chosen a, with its x-intercepts. Bottom: the
// minimum height p(1) plotted against a — an upward parabola with roots 3 ± √14, with a ≤ 1 greyed
// out (more than one stationary point, part h.i.). Only a > 3 + √14 survives both conditions. Trying
// a = −1 shows why the branch a < 3 − √14 is rejected: p(1) > 0 there, yet the graph still cuts the
// axis, because x = 1 is no longer the lowest point.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider } from './kit'

const p = (x: number, a: number) => 3 * x ** 4 + 4 * x ** 3 + 6 * (a - 2) * x ** 2 - 12 * a * x + a * a
const m = (a: number) => a * a - 6 * a - 5
const A_HI = 3 + Math.sqrt(14)
const A_LO = 3 - Math.sqrt(14)

/** Real solutions of p(x) = 0: sign changes by bisection, plus x = 1 when the minimum touches. */
function roots(a: number): number[] {
  const g = (x: number) => p(x, a)
  const out: number[] = []
  const N = 1800
  const lo = -5
  const hi = 4
  let x1 = lo
  let y1 = g(x1)
  for (let i = 1; i <= N; i++) {
    const x2 = lo + ((hi - lo) * i) / N
    const y2 = g(x2)
    if (y1 * y2 < 0) {
      let s = x1
      let t = x2
      for (let k = 0; k < 50; k++) {
        const mid = (s + t) / 2
        if (g(s) * g(mid) <= 0) t = mid
        else s = mid
      }
      out.push((s + t) / 2)
    }
    x1 = x2
    y1 = y2
  }
  if (Math.abs(g(1)) < 1e-6) return [...out.filter(r => Math.abs(r - 1) > 0.01), 1].sort((u, v) => u - v)
  return out.sort((u, v) => u - v)
}

export default function Clear() {
  const [a, setA] = useState(4)
  const rs = roots(a)
  const min1 = m(a)
  const touching = Math.abs(a - A_HI) < 1e-6
  const oneSP = a > 1 + 1e-6
  const others = a < 1 - 1e-6 ? [-1 - Math.sqrt(1 - a), -1 + Math.sqrt(1 - a)] : []
  const P = (x: number) => p(x, a)
  const dot = oneSP ? (min1 > 1e-6 ? C.good : C.bad) : C.guide

  let notice
  if (!oneSP && min1 > 0) {
    notice = (
      <Notice tone="warn">
        Here <M>{`p(1) = ${min1.toFixed(2)} > 0`}</M>, yet the graph still cuts the axis <b>{rs.length}</b> times. With{' '}
        <M>{'a \\le 1'}</M>, <M>p</M> has three stationary points and the lowest is at{' '}
        <M>{'x = -1 - \\sqrt{1-a}'}</M>, not <M>x = 1</M>. So <M>{'p(1) > 0'}</M> proves nothing here, and the
        branch <M>{'a < 3 - \\sqrt{14}'}</M> is rejected: it breaks the &ldquo;only one stationary point&rdquo;
        condition.
      </Notice>
    )
  } else if (!oneSP) {
    notice = (
      <Notice>
        <M>{'a \\le 1'}</M> is ruled out by the first condition: <M>p</M> has more than one stationary point (grey
        zone). Slide <M>a</M> above <M>1</M>, where <M>x = 1</M> is the only turning point and so the minimum.
      </Notice>
    )
  } else if (touching) {
    notice = (
      <Notice tone="warn">
        <b>At <M>{'a = 3 + \\sqrt{14}'}</M></b> the minimum sits exactly on the axis: <M>p(1) = 0</M>, so{' '}
        <M>p(x) = 0</M> has one solution, <M>x = 1</M>. This value is excluded, so the inequality is strict.
      </Notice>
    )
  } else if (min1 < 0) {
    notice = (
      <Notice>
        Only one stationary point, the minimum at <M>x = 1</M>, but it is below the axis:{' '}
        <M>{`p(1) = a^2 - 6a - 5 = ${min1.toFixed(2)}`}</M>. So <M>p(x) = 0</M> has <b>two</b> solutions. Every{' '}
        <M>a</M> between <M>1</M> and <M>{'3 + \\sqrt{14}'}</M> is like this, so the answer can&apos;t be{' '}
        <M>{'a < \\sqrt{14} + 3'}</M>. Slide <M>a</M> up to raise the minimum.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>{`p(1) = ${min1.toFixed(2)} > 0`}</M>: the lowest point of the graph is above the axis, so every point is,
        and <M>p(x) = 0</M> has no solutions. On the lower graph, this is the green arm of the parabola: both
        conditions hold only for <M>{'a > 3 + \\sqrt{14} \\approx 6.74'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.4, 2.5]} y={[-30, 40]} xStep={1} yStep={10} height={250}>
        <Plot.OfX y={P} domain={[-4, 2.8]} color={C.f} weight={3} />
        {others.map(s => (
          <Point key={s.toFixed(4)} x={s} y={P(s)} color={C.violet} />
        ))}
        <Line.Segment point1={[1, 0]} point2={[1, P(1)]} color={dot} style="dashed" weight={2} />
        <Point x={1} y={P(1)} color={dot} />
        {P(1) < 0 && (<Label at={[1, P(1)]} attach="se" color={dot} size={12}>
          {`p(1) = ${min1.toFixed(2).replace('-', '−')}`}
        </Label>)}
        {rs.map(r => (
          <Point key={`r${r.toFixed(4)}`} x={r} y={0} color={C.g} />
        ))}
      </Plane>
      <Plane
        x={[-2.5, 9.5]}
        y={[-16, 24]}
        xStep={1}
        yStep={8}
        height={210}
        xLabel="a"
        yLabel=""
        xLabels={v => (v === -1 || v === -2 || v === -3 ? '' : String(v))}
      >
        <Polygon points={[[-3.5, -19], [1, -19], [1, 27], [-3.5, 27]]} color={C.guide} fillOpacity={0.18} weight={0} />
        <Label at={[-0.75, 20]} attach="c" color={C.guide} size={11}>a ≤ 1</Label>
        <Plot.OfX y={m} domain={[-3.5, 10]} color={C.g} weight={2.5} />
        <Plot.OfX y={m} domain={[A_HI, 10]} color={C.good} weight={5} />
        <Point x={A_LO} y={0} color={C.ink} />
        <Point x={A_HI} y={0} color={C.ink} />
        <Label at={[A_LO, 0]} attach="sw" size={11}>3 − √14</Label>
        <Label at={[A_HI, 0]} attach="nw" size={11}>3 + √14</Label>
        <Label at={[5.2, m(5.2)]} attach="se" color={C.g} size={12}>p(1) = a² − 6a − 5</Label>
        <Point x={a} y={min1} color={dot} />
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-1.5} max={9} step={0.05} format={v => v.toFixed(2)} />
        <Buttons>
          <ActionButton label="a = 3 + √14" onClick={() => setA(A_HI)} />
          <ActionButton label="a = −1" onClick={() => setA(-1)} />
        </Buttons>
        <Readouts>
          <Readout color={dot} tex={`p(1) = a^2 - 6a - 5 = ${touching ? '0' : min1.toFixed(2)}`} />
          <Readout color={C.g} tex={`\\text{solutions of } p(x) = 0\\text{: } ${rs.length}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
