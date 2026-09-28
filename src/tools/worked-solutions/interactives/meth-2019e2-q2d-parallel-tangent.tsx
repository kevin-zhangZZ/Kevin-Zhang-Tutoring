// 2019 Methods Exam 2 Q2d — the average gradient of the hill over [10, 30] is the gradient of the
// chord from (10, 6) to (30, 0), namely −3/10. The question's x-values are where a tangent to the
// cable h(x) = 3x(x − 30)²/2000 + 3 runs parallel to that chord: x = 20 ∓ 10√3/3 ≈ 14.23 and 25.77,
// one on each side of the steepest point x = 20. A toggle adds the hill's tangent at the same x to
// show that lifting the hill 3 m changes no gradient, so h′(x) = dy/dx.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const f = (x: number) => (3 * x * (x - 30) ** 2) / 2000
const h = (x: number) => f(x) + 3
const hp = (x: number) => (9 * (x - 30) * (x - 10)) / 2000
const AVG = -0.3
const X1 = 20 - (10 * Math.sqrt(3)) / 3
const X2 = 20 + (10 * Math.sqrt(3)) / 3

/** Segment of the line through (x0, y0) with gradient m, for x in [x0 − 5, x0 + 5] ∩ [0, 30]. */
function seg(x0: number, y0: number, m: number): [[number, number], [number, number]] {
  const a = Math.max(0, x0 - 5)
  const b = Math.min(30, x0 + 5)
  return [
    [a, y0 + m * (a - x0)],
    [b, y0 + m * (b - x0)],
  ]
}

export default function ParallelTangent() {
  const [x0, setX0] = useState(18)
  const [showHill, setShowHill] = useState(false)

  const m = hp(x0)
  const parallel = Math.abs(m - AVG) < 0.006
  const tanColor = parallel ? C.good : C.violet
  const [c1, c2] = seg(x0, h(x0), m)
  const [t1, t2] = seg(x0, f(x0), m)

  let notice
  if (parallel) {
    notice = (
      <Notice tone="good">
        <b>Parallel.</b> Here the cable&apos;s tangent has gradient exactly <M>{'-\\tfrac{3}{10}'}</M>, the same as the
        orange chord. {x0 < 20 ? 'There is a second such point on the other side of x = 20; press the other button.' : 'Its partner is on the other side of x = 20; press the other button.'}{' '}
        The two answers <M>{'20 \\pm \\tfrac{10\\sqrt3}{3}'}</M> sit symmetrically about <M>x = 20</M> because the gradient
        function is a parabola with its vertex there.
      </Notice>
    )
  } else if (m > AVG) {
    notice = (
      <Notice>
        Here the cable is <b>flatter</b> than the chord: <M>{`h'(x) = ${m.toFixed(3)}`}</M> is closer to <M>0</M> than{' '}
        <M>{'-0.3'}</M>. The cable&apos;s gradient starts at <M>0</M> at the peak, gets as steep as{' '}
        <M>{'-\\tfrac{9}{20}'}</M> at <M>x = 20</M>, and eases back to <M>0</M> at <M>x = 30</M>, so it must pass{' '}
        <M>{'-0.3'}</M> once on each side of <M>20</M>. Slide until the tangent turns green.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here the cable is <b>steeper</b> than the chord: <M>{`h'(x) = ${m.toFixed(3)}`}</M> is below <M>{'-0.3'}</M>. The chord&apos;s gradient is
        an average: somewhere the tangent is steeper than it (like here) and somewhere flatter, so in between it must
        match exactly. Slide left or right until the tangent turns green.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 30]} y={[0, 10.4]} xStep={5} yStep={2} height={290}>
        <Plot.OfX y={f} domain={[0, 30]} color={C.f} weight={3} />
        <Plot.OfX y={h} domain={[10, 30]} color={C.f} weight={2.5} style="dashed" />
        <Line.Segment point1={[10, 6]} point2={[30, 0]} color={C.g} weight={3} />
        <Point x={10} y={6} color={C.g} />
        <Point x={30} y={0} color={C.g} />
        {showHill && <Line.Segment point1={t1} point2={t2} color={tanColor} weight={2} style="dashed" />}
        <Line.Segment point1={c1} point2={c2} color={tanColor} weight={3} />
        <Point x={x0} y={h(x0)} color={tanColor} />
        {showHill && <Point x={x0} y={f(x0)} color={tanColor} />}
        <Label at={[6, f(6)]} color={C.f} attach="se">hill</Label>
        <Label at={[27, h(27)]} color={C.f} attach="ne">cable</Label>
        <Label at={[22, 2.4]} color={C.g} attach="ne">chord</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={10} max={30} step={0.05} />
        <Buttons>
          <ActionButton label="x ≈ 14.23" onClick={() => setX0(X1)} />
          <ActionButton label="x ≈ 25.77" onClick={() => setX0(X2)} />
          <Toggle label="Tangent to the hill too" checked={showHill} onChange={setShowHill} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex="\text{average gradient} = \dfrac{0-6}{30-10} = -\dfrac{3}{10}" />
          <Readout color={tanColor} tex={`h'(${x0.toFixed(2)}) = ${m.toFixed(3)}`} />
        </Readouts>
        {notice}
        {showHill && (
          <Notice>
            The dashed tangent to the hill at the same <M>x</M> is parallel to the cable&apos;s. Lifting a graph{' '}
            <M>3</M> m moves every point up but tilts nothing, so <M>{"h'(x) = \\tfrac{dy}{dx}"}</M>: the cable and the
            hill have the same gradient at every <M>x</M> in <M>[a, 30]</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
