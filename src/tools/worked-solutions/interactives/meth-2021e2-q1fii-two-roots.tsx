// 2021 Methods Exam 2 Q1f.ii — V = x(h − 2x)(2h − 2x) has two stationary points,
// x = h(3 ± √3)/6, and only one of them is a box. The graph is drawn in units of h (x-axis) and
// h³ (V-axis), so it is the same picture for every h. Drag P along the cubic: inside the domain
// (0, h/2) from part f.i. all three dimensions are positive and the turning point there is the
// maximum √3h³/9; past h/2 the width h − 2x is negative, and the second root x = h(3 + √3)/6 is the
// cubic's local minimum with V = −√3h³/9 — the negative volume the examiners' report says some
// students gave.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, clamp } from './kit'

const V = (t: number) => t * (1 - 2 * t) * (2 - 2 * t)
const X1 = (3 - Math.sqrt(3)) / 6 // ≈ 0.211, the maximum
const X2 = (3 + Math.sqrt(3)) / 6 // ≈ 0.789, the local minimum
const VMAX = Math.sqrt(3) / 9 // ≈ 0.192
const NEAR = 0.008
const T_MIN = 0.01
const T_MAX = 1

const hTick = (v: number) => ['', 'h/4', 'h/2', '3h/4', 'h'][Math.round(v * 4)] ?? ''
// Only ±0.2h³ is labelled: the curve runs over the y-axis numbers at ±0.1.
const vTick = (v: number) => (Math.abs(Math.abs(v) - 0.2) < 1e-9 ? `${v < 0 ? '−' : ''}0.2h³` : '')
const f3 = (v: number) => (Math.abs(v) < 5e-4 ? 0 : v).toFixed(3)

export default function TwoRoots() {
  const [t, setT] = useState(X2)
  const v = V(t)
  const width = 1 - 2 * t
  const length = 2 - 2 * t
  const atMax = Math.abs(t - X1) < NEAR
  const atMin = Math.abs(t - X2) < NEAR
  const atEdge = Math.abs(t - 0.5) < 0.006
  const inside = t < 0.5 && !atEdge
  const pColor = atMax ? C.good : inside ? C.f : C.bad

  let notice
  if (atMax) {
    notice = (
      <Notice tone="good">
        <b>This is the root inside the domain</b>, <M>{'x = \\tfrac{h(3-\\sqrt3)}{6} \\approx 0.211h'}</M>. All three
        dimensions are positive and <M>V</M> rises then falls through here, so it is the maximum:{' '}
        <M>{'V = \\tfrac{\\sqrt3\\,h^3}{9} \\approx 0.192h^3'}</M>. With <M>h = 25</M> that is part d.&apos;s{' '}
        <M>{'3007\\ \\text{cm}^3'}</M>.
      </Notice>
    )
  } else if (atMin) {
    notice = (
      <Notice tone="warn">
        <b>This is the other solution of <M>V&apos; = 0</M></b>, <M>{'x = \\tfrac{h(3+\\sqrt3)}{6} \\approx 0.789h'}</M>, the
        one some students chose. It is past <M>{'\\tfrac h2'}</M>, so the width <M>{'h - 2x \\approx -0.577h'}</M> is
        negative and no box exists. The formula still gives <M>{'V = -\\tfrac{\\sqrt3\\,h^3}{9}'}</M>, a local minimum of
        the cubic. Now go to <M>{'x = \\tfrac{h(3-\\sqrt3)}{6}'}</M>, the root inside the domain.
      </Notice>
    )
  } else if (atEdge) {
    notice = (
      <Notice>
        At <M>{'x = \\tfrac h2'}</M> the width <M>h - 2x</M> is zero: the top and bottom cuts meet, the box is flat and{' '}
        <M>V = 0</M>. Because <M>{'V_{\\text{box}} > 0'}</M>, the domain is the open interval{' '}
        <M>{'\\left(0, \\tfrac h2\\right)'}</M>, and only a stationary point inside it can be the answer.
      </Notice>
    )
  } else if (inside) {
    notice = (
      <Notice>
        Inside the domain <M>{'\\left(0, \\tfrac h2\\right)'}</M> every dimension is positive, so this is a real box. Drag{' '}
        <M>x</M>: <M>V</M> climbs to the green maximum and falls back to 0 at <M>{'\\tfrac h2'}</M>. Then keep going
        past the dashed line.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Past <M>{'x = \\tfrac h2'}</M> the width <M>h - 2x</M> is negative, so no box exists, even though the cubic
        carries on (dashed). Its turning point out here, at <M>{'x \\approx 0.789h'}</M>, is a minimum with{' '}
        <M>{'V < 0'}</M>. The domain from part f.i. is what rules it out.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1]} y={[-0.25, 0.25]} xStep={0.25} yStep={0.1} height={320} xLabels={hTick} yLabels={vTick} yLabel="V">
        <Polygon points={[[0, -0.25], [0.5, -0.25], [0.5, 0.25], [0, 0.25]]} color={C.good} fillOpacity={0.09} weight={0} />
        <Line.Segment point1={[0.5, -0.25]} point2={[0.5, 0.25]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, 0]} point2={[0.5, 0]} color={C.good} weight={5} />
        <Label at={[0.25, -0.1]} color={C.good} attach="c">
          {'domain: 0 < x < h/2'}
        </Label>
        <Plot.OfX y={V} domain={[0, 0.5]} color={C.f} weight={3} />
        <Plot.OfX y={V} domain={[0.5, 1]} color={C.guide} weight={2.5} style="dashed" />
        <Point x={X1} y={VMAX} color={C.good} />
        <Label at={[X1, VMAX]} color={C.good} attach="n" gap={16}>
          max
        </Label>
        <Point x={X2} y={-VMAX} color={C.bad} />
        <Label at={[X2, -VMAX]} color={C.bad} attach="s" gap={18}>
          {'V < 0'}
        </Label>
        <Line.Segment point1={[t, 0]} point2={[t, v]} color={pColor} style="dashed" weight={1.5} />
        <MovablePoint point={[t, v]} onMove={([mx]) => setT(clamp(mx, T_MIN, T_MAX))} color={pColor} />
      </Plane>
      <Controls>
        <Slider label="x" value={t} onChange={setT} min={T_MIN} max={T_MAX} step={0.005} format={x => `${x.toFixed(3)}h`} />
        <Buttons>
          <ActionButton label={<>Go to <M>{'x = \\tfrac{h(3-\\sqrt3)}{6}'}</M></>} onClick={() => setT(X1)} />
          <ActionButton label={<>Go to <M>{'x = \\tfrac{h(3+\\sqrt3)}{6}'}</M></>} onClick={() => setT(X2)} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\text{height } x = ${f3(t)}h`} />
          <Readout color={width < -5e-4 ? C.bad : undefined} tex={`\\text{width } h-2x = ${f3(width)}h`} />
          <Readout tex={`\\text{length } 2h-2x = ${f3(length)}h`} />
          <Readout color={pColor} tex={`V = ${f3(v)}h^3`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
