// 2017 Methods Exam 2 Q1d(i) — solving g(x) = x for g(x) = x³ − kx gives three intersections,
// x = 0 and x = ±√(k + 1), all on the line y = x. The whole graph is drawn, with the part VCAA's
// diagram shows (x ≥ 0) left unshaded, so it is clear why a = √(k + 1) and not ±√(k + 1): the
// negative root is a genuine intersection, but in the third quadrant. Slide k to watch all three move.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle, num } from './kit'

export default function Intersections() {
  const [k, setK] = useState(2)
  const [both, setBoth] = useState(false)
  const g = (x: number) => x ** 3 - k * x
  const a = Math.sqrt(k + 1)

  return (
    <div>
      <Plane x={[-3, 3]} y={[-3, 3]} xStep={1} yStep={1} height={340} equalScale>
        <Polygon points={[[-10, -10], [0, -10], [0, 10], [-10, 10]]} color={C.guide} fillOpacity={0.12} weight={0} />
        <Label at={[-1.5, 2.6]} attach="c" color={C.guide} size={12}>not in the diagram</Label>
        <Plot.OfX y={x => x} domain={[-8, 8]} color={C.g} weight={2.5} />
        <Plot.OfX y={g} domain={[-8, 8]} color={C.f} weight={3} />
        <Point x={0} y={0} color={C.ink} />
        <Point x={a} y={a} color={C.good} />
        <Label at={[a, a]} attach="se" color={C.good}>(a, a)</Label>
        <Point x={-a} y={-a} color={both ? C.bad : C.guide} />
        {both && <Label at={[-a, -a]} attach="nw" color={C.bad}>a = −√(k+1)?</Label>}
        <Label at={[2.5, 2.5]} attach="se" color={C.g}>y = x</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.1} max={5} step={0.05} />
        <Buttons>
          <Toggle label="Keep the ± in the answer" checked={both} onChange={setBoth} />
        </Buttons>
        <Readouts>
          <Readout tex={`x\\left(x^2 - (k+1)\\right) = 0`} />
          <Readout tex={`x = 0 \\text{ or } x = \\pm\\sqrt{k+1} = \\pm${num(a)}`} />
          <Readout color={C.good} tex={`a = \\sqrt{k+1} \\approx ${num(a)}`} />
        </Readouts>
        {both ? (
          <Notice tone="warn">
            <M>{'x = -\\sqrt{k+1}'}</M> really is a solution of <M>g(x) = x</M> &mdash; the red point is on both graphs. But
            it is the point <M>{'\\left(-\\sqrt{k+1}, -\\sqrt{k+1}\\right)'}</M> in the third quadrant, in the shaded part
            VCAA&apos;s diagram leaves out. The question names <M>(a, a)</M> as the point to the right of the origin, so{' '}
            <M>a</M> is a single positive number.
          </Notice>
        ) : (
          <Notice>
            The equation <M>g(x) = x</M> has three solutions, one for each place the curve crosses the line. VCAA&apos;s
            diagram shows only <M>{'x \\ge 0'}</M> (unshaded), where there are two: the origin and{' '}
            <M>(a, a)</M>. Slide <M>k</M>: <M>a</M> always squares to <M>k + 1</M>. Then turn on &ldquo;Keep the ±&rdquo;
            to see where the third solution lives.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
