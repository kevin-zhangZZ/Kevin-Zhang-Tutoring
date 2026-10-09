// 2022 Specialist Exam 2 MCQ 10 — slide the point (1, m) up and down the line x = 1 beside the
// curve 5x²y − 3xy + y² = 10 (drawn as its two branches y = (−(5x² − 3x) ± √((5x² − 3x)² + 40))/2).
// The gradient formula −7m/(2(1 + m)) gives a number for almost every m, and it is negative for
// m < −1 or m > 0 (option A, chosen by 38%) — but the point is only ON the curve when
// m² + 2m = 10, i.e. m = −1 ± √11. Anywhere else there is no tangent at all (the red line is just
// the formula's slope through a point off the curve). At both on-curve points the tangent's gradient is negative (≈ −2.44 and ≈ −4.56): E.
// A toggle shades option A's set of m on the line x = 1.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num, tick } from './kit'

const XR: [number, number] = [-1, 2.5]
const YR: [number, number] = [-7, 5]
const R11 = Math.sqrt(11)
const M_UP = R11 - 1 // ≈ 2.32
const M_DOWN = -R11 - 1 // ≈ −4.32
const SNAP = 0.05

const a = (x: number) => 5 * x * x - 3 * x
const upper = (x: number) => (-a(x) + Math.sqrt(a(x) ** 2 + 40)) / 2
const lower = (x: number) => (-a(x) - Math.sqrt(a(x) ** 2 + 40)) / 2
/** The gradient formula from the working, at x = 1, y = m. */
const grad = (m: number) => (-7 * m) / (2 * (1 + m))

export default function OnCurve() {
  const [m, setM] = useState(1)
  const [showA, setShowA] = useState(false)

  const onUp = m === M_UP
  const onDown = m === M_DOWN
  const onCurve = onUp || onDown
  const lhs = m * m + 2 * m
  const undef = Math.abs(1 + m) < 1e-9
  const s = undef ? NaN : grad(m)
  // Keep the drawn tangent short enough to stay on the plane however steep it is.
  const dx = undef ? 0 : Math.min(0.55, 1.8 / Math.max(Math.abs(s), 1e-9))
  const lineColor = onCurve ? C.good : C.bad

  const snap = (v: number) => (Math.abs(v - M_UP) < SNAP ? M_UP : Math.abs(v - M_DOWN) < SNAP ? M_DOWN : v)

  return (
    <div>
      <Plane
        x={XR}
        y={YR}
        xStep={0.5}
        yStep={1}
        height={330}
        // Skip the half-cut ticks past the range, and −3, which the lower branch runs over.
        yLabels={v => (v > 5.01 || v < -7.01 || Math.abs(v + 3) < 1e-6 ? '' : tick(v))}
      >
        <Line.ThroughPoints point1={[1, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[1, 4.55]} color={C.guide} attach="w">x = 1</Label>
        {showA && (
          <>
            <Line.Segment point1={[1, YR[0]]} point2={[1, -1]} color={C.g} weight={9} opacity={0.35} />
            <Line.Segment point1={[1, 0]} point2={[1, YR[1]]} color={C.g} weight={9} opacity={0.35} />
            <Label at={[1, -5.9]} color={C.g} attach="w">option A&apos;s m</Label>
          </>
        )}
        <Plot.OfX y={upper} domain={XR} color={C.f} weight={3} />
        <Plot.OfX y={lower} domain={XR} color={C.f} weight={3} />
        <Label at={[1, 4.55]} color={C.f} attach="e">5x²y − 3xy + y² = 10</Label>
        {!undef && (
          <Line.Segment
            point1={[1 - dx, m - dx * s]}
            point2={[1 + dx, m + dx * s]}
            color={lineColor}
            weight={onCurve ? 3 : 2}
            style={onCurve ? 'solid' : 'dashed'}
          />
        )}
        <Point x={1} y={m} color={lineColor} />
        <Label at={[1, m]} color={lineColor} attach={s > 0 ? 'nw' : 'ne'}>(1, m)</Label>
      </Plane>
      <Controls>
        <Slider label="m" value={m} onChange={v => setM(snap(v))} min={-6} max={4} step={0.01} format={v => num(v)} />
        <Toggle label="Shade option A's values of m" checked={showA} onChange={setShowA} />
        <Readouts>
          <Readout color={onCurve ? C.good : C.bad} tex={`m^2 + 2m ${onCurve ? '=' : '\\approx'} ${onCurve ? '10' : num(lhs)}`} />
          <Readout
            color={lineColor}
            tex={undef ? `\\dfrac{-7m}{2(1+m)}\\ \\text{undefined}` : `\\dfrac{-7m}{2(1+m)} \\approx ${num(s)}`}
          />
        </Readouts>
        {onUp ? (
          <Notice tone="good">
            Now <M>m^2 + 2m = 10</M>, so <M>(1, m)</M> really is on the curve, at <M>{'m = \\sqrt{11} - 1 \\approx 2.32'}</M>.
            The tangent&apos;s gradient is <M>{'\\frac{-7m}{2(1+m)} \\approx -2.44'}</M>, which is negative. The line{' '}
            <M>x = 1</M> meets the curve at only one other point: drag down to <M>{'m = -\\sqrt{11} - 1'}</M> and check it
            too.
          </Notice>
        ) : onDown ? (
          <Notice tone="good">
            <M>{'m = -\\sqrt{11} - 1 \\approx -4.32'}</M> is the other point of the curve on <M>x = 1</M>. Here <M>m</M> and{' '}
            <M>1 + m</M> are both negative, so <M>{'\\frac{-7m}{2(1+m)} \\approx -4.56'}</M> is negative too. Both possible
            points give a negative gradient, so the answer is these two values (option E), not an interval.
          </Notice>
        ) : !undef && s < 0 ? (
          <Notice tone="warn">
            The formula gives <M>{`\\frac{-7m}{2(1+m)} \\approx ${num(s)}`}</M>, a negative number, so option A counts{' '}
            <M>{`m = ${num(m)}`}</M>. But <M>{`m^2 + 2m \\approx ${num(lhs)}`}</M>, not <M>10</M>: this point is not on the
            curve, so there is no tangent here at all. The red line is just the formula&apos;s slope drawn through a point
            that isn&apos;t on the curve. Drag <M>m</M> until the point lands on the blue curve.
          </Notice>
        ) : (
          <Notice>
            For <M>{'-1 \\le m \\le 0'}</M> the formula is positive, zero or undefined, which is why option A leaves this
            interval out. It doesn&apos;t matter: <M>{`m^2 + 2m \\approx ${num(lhs)}`}</M>, not <M>10</M>, so the point
            isn&apos;t on the curve here either. Drag <M>m</M> until the point lands on the blue curve.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
