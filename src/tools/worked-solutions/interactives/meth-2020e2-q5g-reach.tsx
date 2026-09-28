// 2020 Methods Exam 2 Q5g — can the tangent to p(x) = x³ + wx at x = t (t > 0) reach back to (−t, 0)?
// Sliders for w and t; the tangent at T = (t, p(t)), where it meets the x-axis
// (x = 2t³/(3t² + w)), and the target (−t, 0). For w ≥ 0 the curve only rises and bends upward
// right of the origin, so the tangent at t > 0 always lands between 0 and t and can never reach −t.
// For each w < 0 exactly one t works, t = √(−w/5) (from w = −5t²), so the answer is the whole set
// w < 0. With w = −1 (part a.'s f) that t is √5/5, part e.'s answer. Checked with sympy.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num,
} from './kit'

const X: [number, number] = [-2, 2]
const Y: [number, number] = [-2, 2]
const intTicks = (v: number) => (Number.isInteger(v) ? String(v) : '')

export default function Reach() {
  const [w, setW] = useState(-1)
  const [t, setT] = useState(0.3)

  const p = (x: number) => x ** 3 + w * x
  const pt = p(t)
  const m = 3 * t * t + w
  const flat = Math.abs(m) < 1e-9
  const x0 = flat ? NaN : (2 * t ** 3) / m
  const tStar = w < 0 ? Math.sqrt(-w / 5) : NaN
  const hit = w < 0 && Math.abs(t - tStar) < 1e-9
  const x0On = !flat && x0 > X[0] && x0 < X[1]
  const col = hit ? C.good : C.g

  let notice
  if (w >= 0) {
    notice = (
      <Notice tone="warn">
        <b>With <M>w \ge 0</M> it can&apos;t be done.</b> The gradient <M>p&apos;(x) = 3x^2 + w</M> is never negative, so the
        curve only rises, and right of the origin it bends upward (concave up). A tangent at <M>t &gt; 0</M> then sits below the
        curve and meets the axis between <M>0</M> and <M>t</M>: its <M>x</M>-intercept{' '}
        <M>{`\\tfrac{2t^3}{3t^2 + w} \\approx ${num(x0, 2)}`}</M> is positive. It never gets across to <M>-t</M>, however you
        move <M>t</M>. Now drag <M>w</M> below zero.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        <b>It lands on <M>(-t, 0)</M>.</b> Here <M>{`t = \\sqrt{-w/5} \\approx ${num(t, 3)}`}</M>, which is the condition{' '}
        <M>w = -5t^2</M> read the other way round. Every negative <M>w</M> has its own <M>t</M> like this (move <M>w</M> and
        press the button again), and no <M>w \ge 0</M> has one, so the answer is the whole set <M>w &lt; 0</M>, not the
        formula. {Math.abs(w + 1) < 1e-9 && <>With <M>w = -1</M>, <M>p</M> is part a.&apos;s <M>f</M> and{' '}
        <M>{'t = \\tfrac{\\sqrt5}{5}'}</M>: exactly part e.&apos;s answer, where the tangent at <M>a</M> lands at <M>b = -a</M>.</>}
      </Notice>
    )
  } else if (flat) {
    notice = (
      <Notice>
        At this <M>t</M> the point is a turning point of <M>p</M>: the tangent is horizontal and has no <M>x</M>-intercept at
        all. Move <M>t</M> a little.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The tangent at <M>t</M> lands at <M>{`x \\approx ${num(x0, 3)}`}</M>, but it needs to land at{' '}
        <M>{`-t = ${num(-t, 3)}`}</M>. Setting <M>{'\\tfrac{2t^3}{3t^2 + w} = -t'}</M> gives <M>w = -5t^2</M>, so for this{' '}
        <M>w</M> the right point is <M>{`t = \\sqrt{-w/5} \\approx ${num(tStar, 3)}`}</M>. Drag <M>t</M> there, or press the
        button.
      </Notice>
    )
  }

  // x-range of p inside the view, so the curve stops at the edge instead of running into the padding.
  const inView = (x: number) => p(x) >= Y[0] - 0.3 && p(x) <= Y[1] + 0.3
  let lo = X[0]
  while (lo < 0 && !inView(lo)) lo += 0.01
  let hi = X[1]
  while (hi > 0 && !inView(hi)) hi -= 0.01

  return (
    <div>
      <Plane x={X} y={Y} xStep={0.5} yStep={0.5} height={300} xLabels={intTicks} yLabels={intTicks}>
        <Plot.OfX y={p} domain={[lo, hi]} color={C.f} weight={3} />
        {flat ? (
          <Line.Segment point1={[X[0] - 1, pt]} point2={[X[1] + 1, pt]} color={C.g} weight={2.5} />
        ) : (
          <Line.PointSlope point={[t, pt]} slope={m} color={col} weight={2.5} />
        )}
        <Line.Segment point1={[t, 0]} point2={[t, pt]} color={C.guide} style="dashed" weight={1.5} />
        {/* The target (−t, 0): a red ring, filled green once the tangent reaches it. */}
        <Point x={-t} y={0} color={hit ? C.good : C.bad} svgCircleProps={hit ? undefined : { r: 6, style: { fill: 'var(--mafs-bg)', stroke: C.bad, strokeWidth: 2.5 } }} />
        <Label at={[-t, 0]} color={hit ? C.good : C.bad} attach={pt > 0 ? 'n' : 's'} size={12}>
          −t
        </Label>
        <Label at={[t, 0]} attach={pt > 0 ? 's' : 'n'} size={12}>
          t
        </Label>
        {x0On && !hit && <Point x={x0} y={0} color={C.g} />}
        {!flat && !x0On && (
          <Label at={[x0 > 0 ? X[1] : X[0], 0]} color={C.g} attach={x0 > 0 ? 'nw' : 'ne'} size={12}>
            {x0 > 0 ? `lands at ${num(x0, 1)} →` : `← lands at ${num(x0, 1)}`}
          </Label>
        )}
        <Point x={t} y={pt} color={col} />
        <Label at={[hi - 0.1, p(hi - 0.1)]} color={C.f} attach="w">p</Label>
      </Plane>
      <Controls>
        <Slider label="w" value={w} onChange={setW} min={-3} max={2} step={0.05} format={v => num(v, 2)} />
        <Slider
          label="t"
          value={t}
          onChange={v => setT(w < 0 && Math.abs(v - Math.sqrt(-w / 5)) < 0.004 ? Math.sqrt(-w / 5) : v)}
          min={0.05}
          max={1.5}
          step={0.005}
          format={v => num(v, 3)}
        />
        <Buttons>
          <ActionButton label="Choose t = √(−w/5)" onClick={() => { if (w < 0) setT(Math.sqrt(-w / 5)) }} />
          <ActionButton label="w = −1 (part a.'s f)" onClick={() => setW(-1)} />
        </Buttons>
        <Readouts>
          <Readout color={col} tex={flat ? "p'(t) = 0" : `\\text{tangent lands at } x = \\tfrac{2t^3}{3t^2+w} \\approx ${num(x0, 3)}`} />
          <Readout color={hit ? C.good : C.bad} tex={`-t = ${num(-t, 3)}`} />
          <Readout tex={`-5t^2 = ${num(-5 * t * t, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
