// 2020 Methods Exam 2 Q1c.ii — "the minimum value of the graph of f′" is the steepest downhill
// point of f. Two aligned planes: f(x) = ¼(x² − 4)² on top with its tangent at x, and
// f′(x) = x³ − 4x below with the point (x, f′(x)). The tangent's gradient IS the height of the
// point below. Across (0, 2) f falls, most steeply at x = 2√3/3 ≈ 1.155 — where f″ = 0 and f′ has
// its lowest value, −16√3/9 ≈ −3.08. The readouts keep f(x) (a height: 16/9 ≈ 1.78 there) apart
// from f′(x) (a gradient), because substituting into f instead of f′ is the slip tutors warn about.
// Also shows c.i's check: f′ = 0 exactly at f's turning points x = −2, 0, 2; and why the interval
// matters — left of −2, f′ goes far lower than −3.08.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, clamp, num } from './kit'

const f = (x: number) => 0.25 * (x * x - 4) ** 2
const fp = (x: number) => x ** 3 - 4 * x
const XM = 2 / Math.sqrt(3)
const FMIN = fp(XM) // −16√3/9
const LO = -2.6
const HI = 2.6

export default function Steepest() {
  const [x, setX] = useState(0.5)
  const set = (v: number) => setX(Math.abs(v - XM) < 0.03 ? XM : clamp(v, LO, HI))
  const y = f(x)
  const m = fp(x)
  const atMin = Math.abs(x - XM) < 1e-9
  const turning = [-2, 0, 2].find(t => Math.abs(x - t) < 0.03)
  const inside = x > 0 && x < 2

  let notice
  if (atMin) {
    notice = (
      <Notice tone="good">
        <b>This is the steepest downhill point of <M>f</M> on <M>(0, 2)</M>.</b> The tangent is as steep as it gets, and
        its gradient, <M>{"f'\\left(\\tfrac{2\\sqrt3}{3}\\right) = -\\tfrac{16\\sqrt3}{9} \\approx -3.08"}</M>, is the lowest
        point of the <M>f&apos;</M> graph below. At the bottom of a trough the graph of <M>f&apos;</M> is flat, so its own
        gradient <M>f&apos;&apos;</M> is zero: that is why you solve <M>f&apos;&apos;(x) = 0</M>. The answer is this{' '}
        <i>gradient</i>. The height of the point on <M>f</M>, <M>{'f\\left(\\tfrac{2\\sqrt3}{3}\\right) = \\tfrac{16}{9}'}</M>,
        is not what was asked.
      </Notice>
    )
  } else if (turning !== undefined) {
    notice = (
      <Notice>
        <M>f</M> has a turning point at <M>{`x = ${turning}`}</M>: the tangent is flat, so <M>{`f'(${turning}) = 0`}</M>{' '}
        and the lower graph crosses the axis. That is why the printed <M>f&apos;</M> graph has its <M>x</M>-intercepts at{' '}
        <M>-2</M>, <M>0</M> and <M>2</M> (a check on part c.i: <M>x(x-2)(x+2)</M>).
      </Notice>
    )
  } else if (inside && x < XM) {
    notice = (
      <Notice>
        On <M>(0, 2)</M> the curve is going downhill, so <M>f&apos;(x)</M> is negative. Moving right, the tangent tilts
        further down with every step: <M>f</M> is getting <i>steeper</i>, so the point below keeps dropping. Keep dragging
        right and find where the tilt stops increasing.
      </Notice>
    )
  } else if (inside) {
    notice = (
      <Notice>
        Still going downhill, but less steeply than before: the tangent is flattening out, so <M>f&apos;(x)</M> is
        climbing back up towards <M>0</M> (reached at the minimum <M>x = 2</M>). The steepest point, the bottom of the{' '}
        <M>f&apos;</M> graph, is behind you. Press &ldquo;Go to the steepest point&rdquo;.
      </Notice>
    )
  } else if (x < -2) {
    notice = (
      <Notice tone="warn">
        Outside the interval. Left of <M>-2</M> the curve plunges down to its minimum, so steeply that{' '}
        <M>{`f'(${num(x)}) \\approx ${num(m)}`}</M>, far below <M>-3.08</M>, and it gets steeper still further left. On all of{' '}
        <M>R</M> the graph of <M>f&apos;</M> has no lowest point: that is why the question asks only about{' '}
        <M>{'x \\in (0, 2)'}</M>.
      </Notice>
    )
  } else if (x < 0) {
    notice = (
      <Notice>
        Between <M>-2</M> and <M>0</M>, <M>f</M> goes uphill, so <M>f&apos;</M> is positive. Its steepest <i>uphill</i>{' '}
        point, at <M>{'x = -\\tfrac{2\\sqrt3}{3}'}</M>, is the mirror image of the one we want (the graph of <M>f</M> is
        symmetric in the <M>y</M>-axis). Drag into <M>(0, 2)</M>, the shaded interval.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Right of <M>2</M>, <M>f</M> climbs more and more steeply, so <M>f&apos;</M> is positive and growing. This is
        outside <M>(0, 2)</M>. Drag back into the shaded interval.
      </Notice>
    )
  }

  const guide = <Line.Segment point1={[x, -10]} point2={[x, 10]} color={C.guide} style="dashed" weight={1} />

  return (
    <div>
      <Plane x={[-3, 3]} y={[-1, 5]} xStep={1} yStep={1} height={210} yLabels={v => (v % 2 === 0 ? String(v) : '')}>
        {guide}
        <Plot.OfX y={f} domain={[-2.9, 2.9]} color={C.f} weight={3} />
        <Line.PointSlope point={[x, y]} slope={m} color={C.g} weight={2.5} />
        <Label at={[2.75, f(2.75)]} color={C.f} attach="w">y = f(x)</Label>
        <MovablePoint point={[x, y]} onMove={p => set(p[0])} constrain={p => [clamp(p[0], LO, HI), f(clamp(p[0], LO, HI))]} color={C.f} />
      </Plane>
      <div className="mt-1">
        <Plane x={[-3, 3]} y={[-4, 4]} xStep={1} yStep={1} height={200} yLabels={v => (v % 2 === 0 ? String(v) : '')}>
          <Region top={() => 4} bottom={() => -4} from={0} to={2} color={C.good} opacity={0.08} />
          {guide}
          <Plot.OfX y={fp} domain={[-2.6, 2.6]} color={C.g} weight={3} />
          <Label at={[-2.45, fp(-2.45)]} color={C.g} attach="e">y = f′(x)</Label>
          <Point x={XM} y={FMIN} color={atMin ? C.good : C.guide} />
          {(atMin || x > 1.6 || x < 0.7) && (
            <Label at={[XM, FMIN]} color={atMin ? C.good : C.guide} attach="se" size={12}>
              (1.15, −3.08)
            </Label>
          )}
          <Point x={x} y={m} color={C.g} />
        </Plane>
      </div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        Top: <M>f</M> and its tangent. Bottom: the gradient of that tangent, plotted as a height. The green band is{' '}
        <M>{'x \\in (0, 2)'}</M>.
      </p>
      <Controls>
        <Slider label="x" value={x} onChange={set} min={LO} max={HI} step={0.005} />
        <Buttons>
          <ActionButton label="Go to the steepest point" onClick={() => setX(XM)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`f(x) \\approx ${num(y)} \\ \\text{(height)}`} />
          <Readout color={C.g} tex={`f'(x) \\approx ${num(m)} \\ \\text{(gradient)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
