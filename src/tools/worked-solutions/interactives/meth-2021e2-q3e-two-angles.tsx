// 2021 Methods Exam 2 Q3e — why θ = 60° has TWO solutions. Drag P = (a, p(a)) along
// p(x) = e^(−2x) − 2e^(−x) + 1 for −0.85 ≤ a ≤ 0. The tangent at P (gradient m = p′(a) =
// 2e^(−a) − 2e^(−2a)) meets y = x + 2 at Q, where the acute angle θ is marked. The readouts give the
// tangent's angle α with the positive x-axis (m = tan α, 0° ≤ α < 180°) — the Methods way of
// finding θ, since the line itself sits at 45°. As a increases the tangent turns from nearly
// vertical to horizontal (α from about 99° to 180°), so θ climbs from about 54° to 90° (α = 135°,
// m = −1, a ≈ −0.312) and falls back to 45° at a = 0: it passes 60° on the way up (α = 45° + 60° =
// 105°, a ≈ −0.6702) and again on the way down (α = 165°, the same line as 45° − 60° = −15°,
// a ≈ −0.1130). Taking only the 45° + 60° case finds just one of them (the report notes some found "either
// a = −0.67 or a = −0.11 but not both"). The small graph plots θ against a, crossing 60° twice.
// Roots from scipy.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider,
  clamp, num, tick,
} from './kit'

const p = (x: number) => Math.exp(-2 * x) - 2 * Math.exp(-x) + 1
const dp = (x: number) => 2 * Math.exp(-x) - 2 * Math.exp(-2 * x)
const A_MIN = -0.85
const A_MAX = 0
const R1 = -0.6702144519538602 // p′(a) = tan 105°, θ = 60°
const R2 = -0.11302224323676528 // p′(a) = tan 165°, θ = 60°
const RP = -0.3119053581824343 // p′(a) = −1: tangent perpendicular to the line, θ = 90°
const DEG = 180 / Math.PI

/** The angle (degrees, 0 ≤ α < 180) a line of gradient m makes with the positive x-axis. */
function incl(m: number) {
  const t = Math.atan(m) * DEG
  return t < 0 ? t + 180 : t
}

/** The acute angle (degrees) between a line of gradient m and y = x + 2 (which sits at 45°). */
function theta(m: number) {
  const t = Math.abs(incl(m) - 45)
  return t > 90 ? 180 - t : t
}

const THETA_CURVE = (a: number) => theta(dp(a))

export default function TwoAngles() {
  const [a, setA] = useState(-0.5)
  const P: [number, number] = [a, p(a)]
  const m = dp(a)
  const th = theta(m)
  const al = incl(m)

  // Q: where the tangent y = p(a) + m(x − a) meets y = x + 2.
  const qx = (2 - p(a) + m * a) / (m - 1)
  const Q: [number, number] = [qx, qx + 2]

  // Arc from the line's direction (45°) round to the tangent's, the acute way.
  const phiL = Math.PI / 4
  let d = Math.atan(m) - phiL
  if (d < -Math.PI / 2) d += Math.PI
  if (d > Math.PI / 2) d -= Math.PI
  const R = 0.3
  const arc: [number, number][] = [Q]
  for (let i = 0; i <= 40; i++) {
    const t = phiL + (d * i) / 40
    arc.push([Q[0] + R * Math.cos(t), Q[1] + R * Math.sin(t)])
  }
  const mid = phiL + d / 2
  const labelAt: [number, number] = [Q[0] + 0.19 * Math.cos(mid), Q[1] + 0.19 * Math.sin(mid)]

  const at60 = Math.abs(th - 60) < 0.6
  const at90 = th > 88.5
  const angleColor = at60 ? C.good : C.violet

  let notice
  if (at60 && a < RP) {
    notice = (
      <Notice tone="good">
        <b><M>\theta = 60^\circ</M> at <M>a \approx -0.67</M></b>: the tangent sits at <M>{'\\alpha = 105^\\circ = 45^\\circ + 60^\\circ'}</M>,
        turned <M>60^\circ</M> anticlockwise from the line, so <M>{"p'(a) = \\tan 105^\\circ \\approx -3.73"}</M>. It is easy to
        stop here with one answer. Press &ldquo;<M>a \approx -0.11</M>&rdquo; for the other one.
      </Notice>
    )
  } else if (at60) {
    notice = (
      <Notice tone="good">
        <b><M>\theta = 60^\circ</M> again, at <M>a \approx -0.11</M></b>: now the tangent sits at <M>{'\\alpha = 165^\\circ'}</M>, the
        same line as <M>{'45^\\circ - 60^\\circ = -15^\\circ'}</M>, turned <M>60^\circ</M> <em>clockwise</em> from the line. So{' '}
        <M>{"p'(a) = \\tan(-15^\\circ) \\approx -0.27"}</M>. Both values of <M>a</M> are answers: the report notes some students
        found only one of them.
      </Notice>
    )
  } else if (at90) {
    notice = (
      <Notice>
        <b>Here the tangent is perpendicular to the line</b>: <M>{'\\alpha = 135^\\circ = 45^\\circ + 90^\\circ'}</M>, so{' '}
        <M>{"p'(a) = -1"}</M> and <M>\theta = 90^\circ</M>, the largest the angle between two lines can be. Drag either way and{' '}
        <M>\theta</M> comes back down, so it must pass <M>60^\circ</M> once on each side of this point.
      </Notice>
    )
  } else if (a < R1) {
    notice = (
      <Notice>
        The tangent is nearly vertical here (<M>\alpha</M> just over <M>90^\circ</M>), so it makes less than <M>60^\circ</M> with
        the line, and further left it only gets steeper. Drag P to the right: as the tangent turns, <M>\theta</M> climbs
        through <M>60^\circ</M> and on towards <M>90^\circ</M>.
      </Notice>
    )
  } else if (a < R2) {
    notice = (
      <Notice>
        Between the two answers <M>\theta</M> is more than <M>60^\circ</M>. It rises to <M>90^\circ</M> where the tangent is
        perpendicular to the line (<M>a \approx -0.31</M>), then falls again. Drag P slowly across this stretch and watch the
        readout of <M>\theta</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>\theta</M> keeps shrinking to <M>45^\circ</M> at <M>a = 0</M>, where the tangent is horizontal. For <M>a</M> greater than
        0, <M>{"p'(a)"}</M> is between 0 and <M>{'\\tfrac12'}</M>, so <M>\theta</M> stays under <M>45^\circ</M>: there are no more
        solutions.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.25, 0.5]} y={[-0.3, 1.9]} xStep={0.5} yStep={0.5} height={430} equalScale
        xLabels={v => (v < -2 ? "" : tick(v))} yLabels={v => (v < 0 || v > 1.9 ? "" : tick(v))}>
        <Line.ThroughPoints point1={[-2, 0]} point2={[0, 2]} color={C.g} weight={2.5} />
        <Plot.OfX y={p} domain={[-0.89, 0.5]} color={C.f} weight={3} />
        <Line.PointSlope point={P} slope={m} color={C.violet} weight={2} />
        <Polygon points={arc} color={angleColor} fillOpacity={0.3} weight={1.5} />
        <Label at={labelAt} color={angleColor} attach="c" size={13}>θ</Label>
        <Label at={[-0.3, 1.7]} color={C.g} attach="nw">y = x + 2</Label>
        <Label at={[0.42, p(0.42)]} color={C.f} attach="n">p</Label>
        <Point x={Q[0]} y={Q[1]} color={C.ink} />
        <Label at={P} color={C.violet} attach={a > -0.3 ? 'ne' : 'e'}>P</Label>
        <MovablePoint point={P} onMove={([x]) => setA(clamp(x, A_MIN, A_MAX))} color={C.violet} />
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={A_MIN} max={A_MAX} step={0.002} format={v => num(v, 3)} />
        <Buttons>
          <ActionButton label={<M>a \approx -0.67</M>} onClick={() => setA(R1)} />
          <ActionButton label={<M>a \approx -0.31</M>} onClick={() => setA(RP)} />
          <ActionButton label={<M>a \approx -0.11</M>} onClick={() => setA(R2)} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`m = p'(a) \\approx ${num(m, 3)}`} />
          <Readout tex={`\\alpha \\approx ${num(al, 1)}^\\circ`} />
          <Readout color={angleColor} tex={`\\theta \\approx ${num(th, 1)}^\\circ`} />
        </Readouts>
        <Plane
          x={[-0.85, 0.08]}
          y={[-11, 100]}
          xStep={0.2}
          yStep={15}
          height={170}
          xLabel="a"
          yLabel="θ"
          xLabels={v => num(v, 1)}
          yLabels={v => (v < 0 || v > 90 ? "" : `${v}°`)}
        >
          <Line.Segment point1={[-0.85, 60]} point2={[0, 60]} color={C.good} style="dashed" weight={1.5} />
          <Plot.OfX y={THETA_CURVE} domain={[A_MIN, A_MAX]} color={C.violet} weight={2.5} />
          <Point x={R1} y={60} color={C.good} />
          <Point x={R2} y={60} color={C.good} />
          <Point x={a} y={th} color={angleColor} />
        </Plane>
        {notice}
      </Controls>
    </div>
  )
}
