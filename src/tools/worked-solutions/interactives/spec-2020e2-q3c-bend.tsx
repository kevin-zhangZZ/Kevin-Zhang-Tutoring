// 2020 Specialist Exam 2 Q3c — the shape of y = x²e^(−x). Drag a tangent along the curve,
// which is coloured by concavity (sky where f'' > 0, orange where f'' < 0). The tangent is flat
// at the stationary points x = 0 and x = 2, and at x = 2 ± √2 (where f'' changes sign) it
// crosses the curve: the points of inflection. A toggle redraws everything on VCAA's own grid
// (x −5 to 5, y −3 to 3) to show how steep the second-quadrant branch is — the shape the
// examiner's report says cost marks.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle,
  clamp,
} from './kit'

const f = (x: number) => x * x * Math.exp(-x)
const d1 = (x: number) => (2 * x - x * x) * Math.exp(-x)
const d2 = (x: number) => (x * x - 4 * x + 2) * Math.exp(-x)
const P1 = 2 - Math.SQRT2
const P2 = 2 + Math.SQRT2
const MIN_X = -1
const MAX_X = 7

export default function Bend() {
  const [x0, setX0] = useState(1.2)
  const [vcaa, setVcaa] = useState(false)

  const xr: [number, number] = vcaa ? [-5, 5] : [-1.5, 7]
  const yr: [number, number] = vcaa ? [-3, 3] : [-0.3, 1]
  const y0 = f(x0)
  const m = d1(x0)
  const k = d2(x0)
  const w = vcaa ? 1.6 : 1.3
  const near = (a: number) => Math.abs(x0 - a) < 0.05

  let notice
  if (near(P1) || near(P2)) {
    const first = near(P1)
    notice = (
      <Notice tone="good">
        <b>A point of inflection.</b> Here <M>{"f''(x) = 0"}</M> and it changes sign, so the curve switches from bending{' '}
        {first ? 'up to bending down' : 'down to bending up'}. Look at the tangent: it <b>crosses</b> the curve, and it is the{' '}
        {first ? 'steepest uphill' : 'steepest downhill'} tangent anywhere nearby. <M>{first ? 'x = 2-\\sqrt2 = 0.5857\\ldots' : 'x = 2+\\sqrt2 = 3.414\\ldots'}</M>
        {first ? ', which rounds up to 0.59, not 0.58.' : '.'}
      </Notice>
    )
  } else if (Math.abs(x0) < 0.05) {
    notice = (
      <Notice>
        The tangent is flat: <M>{"f'(0) = 0"}</M>, and <M>{"f''(0) = 2 > 0"}</M>, so the origin is a <b>local minimum</b>.
        The graph touches the <M>x</M>-axis here and goes back up; it doesn&apos;t cross it, because <M>{'x^2e^{-x} \\ge 0'}</M>.
      </Notice>
    )
  } else if (near(2)) {
    notice = (
      <Notice tone="good">
        The tangent is flat: <M>{"f'(2) = 0"}</M>, and the curve is bending down (orange), so this is the <b>local maximum</b>{' '}
        <M>{'\\left(2, \\tfrac{4}{e^2}\\right) \\approx (2, 0.54)'}</M>. Now drag on to <M>{'x \\approx 3.41'}</M> and watch the colour change.
      </Notice>
    )
  } else if (x0 < 0) {
    notice = (
      <Notice tone="warn">
        Left of the origin the curve falls steeply and bends up. It is steeper than it looks here:{' '}
        <M>{'f(-1) = e \\approx 2.72'}</M> and <M>{'f(-2) = 4e^2 \\approx 29.6'}</M>. Turn on &ldquo;VCAA&apos;s grid&rdquo;: the
        branch leaves the top of the grid just left of <M>x = -1</M>, almost vertically. That second-quadrant shape is where the
        report says marks were lost.
      </Notice>
    )
  } else if (x0 < P1) {
    notice = (
      <Notice>
        Rising and <b>bending up</b> (sky): each tangent is steeper than the last, so <M>{"f'"}</M> is increasing and{' '}
        <M>{"f'' > 0"}</M>. The tangent sits <em>below</em> the curve. Drag towards <M>{'x \\approx 0.59'}</M>, where the steepening stops.
      </Notice>
    )
  } else if (x0 < 2) {
    notice = (
      <Notice>
        Still rising but now <b>bending down</b> (orange): the tangents are getting flatter, so <M>{"f'' < 0"}</M>, and the
        tangent sits <em>above</em> the curve. The slope reaches zero at <M>x = 2</M>. Use the buttons to jump to the exact inflection points.
      </Notice>
    )
  } else if (x0 < P2) {
    notice = (
      <Notice>
        Falling and still <b>bending down</b>: each tangent is steeper downhill than the last. That steepening stops at{' '}
        <M>{'x = 2+\\sqrt2 \\approx 3.41'}</M>, the second point of inflection.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Falling but <b>bending up</b> again: the tangents flatten out as <M>{'e^{-x}'}</M> overpowers <M>{'x^2'}</M>. The
        curve creeps down towards the asymptote <M>y = 0</M> but never reaches it, since <M>{'f(x) > 0'}</M> for every{' '}
        <M>{'x > 0'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={xr}
        y={yr}
        xStep={1}
        yStep={vcaa ? 1 : 0.25}
        height={vcaa ? 340 : 300}
        equalScale={vcaa}
        yLabels={vcaa ? undefined : v => (Math.abs(v - 0.5) < 1e-9 ? '0.5' : Math.abs(v - 1) < 1e-9 ? '1' : '')}
      >
        <Plot.OfX y={f} domain={[xr[0], P1]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[P1, P2]} color={C.g} weight={3} />
        <Plot.OfX y={f} domain={[P2, xr[1]]} color={C.f} weight={3} />
        <Plot.OfX y={x => y0 + m * (x - x0)} domain={[x0 - w, x0 + w]} color={C.violet} weight={2} />
        <Point x={0} y={0} color={C.ink} />
        <Point x={2} y={f(2)} color={C.ink} />
        <Point x={P1} y={f(P1)} color={C.good} />
        <Point x={P2} y={f(P2)} color={C.good} />
        {!vcaa && (
          <>
            <Label at={[2, f(2)]} attach="n" gap={9}>(2, 0.54)</Label>
            <Label at={[P1, f(P1)]} attach="se" color={C.good}>(0.59, 0.19)</Label>
            <Label at={[P2, f(P2)]} attach="ne" color={C.good}>(3.41, 0.38)</Label>
          </>
        )}
        <MovablePoint point={[x0, y0]} onMove={p => setX0(clamp(p[0], MIN_X, MAX_X))} color={C.violet} />
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={MIN_X} max={MAX_X} step={0.01} />
        <Buttons>
          <ActionButton label="Jump to x = 2 − √2" onClick={() => setX0(P1)} />
          <ActionButton label="Jump to x = 2 + √2" onClick={() => setX0(P2)} />
          <Toggle label="VCAA's grid" checked={vcaa} onChange={setVcaa} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`f'(${x0.toFixed(2)}) \\approx ${m.toFixed(3)}`} />
          <Readout
            color={Math.abs(k) < 0.01 ? C.good : k > 0 ? C.f : C.g}
            tex={`f''(${x0.toFixed(2)}) \\approx ${k.toFixed(3)}\\ ${Math.abs(k) < 0.01 ? '' : k > 0 ? '\\text{(bends up)}' : '\\text{(bends down)}'}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
