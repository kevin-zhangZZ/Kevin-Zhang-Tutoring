// 2020 Methods Exam 2 Q4d.i — slide the point of contact p along f(x) = 2x·e^(1−x²) and watch the
// tangent there (gradient f′(p) = 2(1 − 2p²)e^(1−p²), part c) against the fixed tangent at x = 1
// (gradient −2, part a). The product of the gradients and the angle between the lines update live;
// they are perpendicular only at p = 0.65525… (checked with scipy), where f′(p) = ½ and the product
// is −1. At that moment the two slope triangles are drawn at the crossing: the tangent at x = 1's
// "1 across, 2 up (going left)" turned through 90° becomes "2 across, 1 up", which is why a
// perpendicular gradient is the negative reciprocal. A button jumps to the report's wrong equation
// f′(p) = 2 (p ≈ 0.511): gradients 2 and −2 give mirror-image lines meeting at ≈ 53.13°, not 90°.
// Past the peak (p > 1/√2) both tangents slope downhill, so the product is positive and no right
// angle is possible. Equal-scale plane, so right angles look right.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Polygon, Polyline,
  Readout, Readouts, Slider, clamp, num, type vec,
} from './kit'

const f = (x: number) => 2 * x * Math.exp(1 - x * x)
const df = (x: number) => 2 * (1 - 2 * x * x) * Math.exp(1 - x * x)
const P_STAR = 0.6552517893797571 // f′(p) = ½
const P_WRONG = 0.5110430205651891 // f′(p) = 2, the report's slip
const PEAK = Math.SQRT1_2
const M1 = -2
const SNAP = 0.006
const DEG = 180 / Math.PI

// Snap a drag to the nearest point of f on [0, 3], measured on the (equal-scale) plane.
const SAMPLES = Array.from({ length: 1201 }, (_, i) => (3 * i) / 1200)
function nearestOnF([mx, my]: vec.Vector2): number {
  let best = 0
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = (x - mx) ** 2 + (f(x) - my) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

function snap(p: number): number {
  if (Math.abs(p - P_STAR) < SNAP) return P_STAR
  if (Math.abs(p - P_WRONG) < SNAP) return P_WRONG
  return p
}

export default function PerpendicularWidget() {
  const [p, setP] = useState(0.35)
  const m2 = df(p)
  const product = M1 * m2
  const perp = Math.abs(p - P_STAR) < 1e-9
  const wrong = Math.abs(p - P_WRONG) < 1e-9
  // The acute angle between the two tangents.
  let between = Math.abs(Math.atan(m2) - Math.atan(M1)) * DEG
  if (between > 90) between = 180 - between
  // Where the tangents cross: −2x + 4 = m2·x + (f(p) − m2·p).
  const c2 = f(p) - m2 * p
  const parallel = Math.abs(m2 - M1) < 0.05
  const rx = parallel ? NaN : (c2 - 4) / (M1 - m2)
  const R: vec.Vector2 = [rx, M1 * rx + 4]
  const showR = !parallel && R[0] > -0.2 && R[0] < 3.1 && R[1] > -0.2 && R[1] < 3.3
  const pColor = perp ? C.good : wrong ? C.bad : C.g

  // At the right angle: the violet slope triangle (0.5 left, 1 up) and the same triangle turned
  // through −90° about R (1 right, 0.5 up), both above R, clear of the curve.
  const k = 0.5
  const violetTri: vec.Vector2[] = [R, [R[0] - k, R[1]], [R[0] - k, R[1] + 2 * k]]
  const orangeTri: vec.Vector2[] = [R, [R[0], R[1] + k], [R[0] + 2 * k, R[1] + k]]
  // Right-angle mark, opening upwards between the two lines.
  const u1: vec.Vector2 = [-1 / Math.sqrt(5), 2 / Math.sqrt(5)]
  const u2: vec.Vector2 = [2 / Math.sqrt(5), 1 / Math.sqrt(5)]
  const q = 0.13
  const mark: vec.Vector2[] = [
    [R[0] + q * u1[0], R[1] + q * u1[1]],
    [R[0] + q * (u1[0] + u2[0]), R[1] + q * (u1[1] + u2[1])],
    [R[0] + q * u2[0], R[1] + q * u2[1]],
  ]

  let notice
  if (perp) {
    notice = (
      <Notice tone="good">
        <b>Perpendicular: <M>{'f\'(p) = \\tfrac12'}</M> at <M>p \approx 0.655</M>.</b> Look at the two triangles at the
        crossing. The violet tangent goes 1 left and 2 up (gradient <M>-2</M>). Turn that triangle through a right
        angle and it becomes 2 across and 1 up (gradient <M>{'\\tfrac12'}</M>): the numbers swap over (reciprocal) and
        the direction flips (sign). That is why <M>{'m_1 m_2 = (-2)\\left(\\tfrac12\\right) = -1'}</M>.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>This is <M>{'f\'(p) = 2'}</M>, the equation the report says some students solved.</b> Gradients{' '}
        <M>2</M> and <M>-2</M> make mirror-image lines, equally steep but leaning opposite ways. They cross at about{' '}
        <M>{'53^\\circ'}</M>, not <M>{'90^\\circ'}</M>, and <M>{'(-2)(2) = -4'}</M>, not <M>-1</M>. Changing the sign
        isn&apos;t enough; you must also flip the fraction: <M>{'-\\tfrac{1}{-2} = \\tfrac12'}</M>.
      </Notice>
    )
  } else if (p > PEAK) {
    notice = (
      <Notice>
        Past the peak at <M>{'x = \\tfrac{1}{\\sqrt2} \\approx 0.71'}</M> the orange tangent slopes <i>downhill</i>, just
        like the violet one, so <M>{'m_1 m_2'}</M> is{' '}
        {Math.abs(p - 1) < 0.01 ? 'positive (here they are the same line)' : 'positive'}. Two lines that both fall to the
        right can never meet at a right angle. A line perpendicular to one falling 2 must <i>rise</i>, so slide{' '}
        <M>p</M> back left of the peak.
      </Notice>
    )
  } else if (m2 > 0.5) {
    notice = (
      <Notice>
        The orange tangent is <b>too steep</b>: <M>{`m_1 m_2 \\approx ${num(product, 2)}`}</M>, which is below{' '}
        <M>-1</M>, and the lines meet at about <M>{`${between.toFixed(0)}^\\circ`}</M>. The curve flattens as it
        climbs towards its peak, so slide <M>p</M> to the <b>right</b>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the orange tangent is <b>not steep enough</b>: <M>{`m_1 m_2 \\approx ${num(product, 2)}`}</M>, between{' '}
        <M>-1</M> and <M>0</M>, and the angle between the lines is about <M>{`${between.toFixed(0)}^\\circ`}</M>. Slide{' '}
        <M>p</M> back a little to the <b>left</b>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.2, 3.1]} y={[-0.2, 3.3]} xStep={1} yStep={1} equalScale height={360}>
        <Plot.OfX y={f} domain={[0, 3]} color={C.f} weight={3} />
        <Label at={[1.6, f(1.6)]} color={C.f} attach="ne">f</Label>
        {/* The fixed tangent at x = 1. */}
        <Line.PointSlope point={[1, 2]} slope={M1} color={C.violet} weight={2.5} />
        <Point x={1} y={2} color={C.violet} />
        <Label at={[1, 2]} color={C.violet} attach="e" size={12}>x = 1</Label>
        {/* The tangent at x = p. */}
        <Line.PointSlope point={[p, f(p)]} slope={m2} color={pColor} weight={2.5} />
        {showR && <Point x={R[0]} y={R[1]} color={perp ? C.good : C.guide} />}
        {perp && (
          <>
            <Polygon points={violetTri} color={C.violet} fillOpacity={0.18} weight={1.5} />
            <Polygon points={orangeTri} color={C.good} fillOpacity={0.18} weight={1.5} />
            <Polyline points={mark} color={C.ink} weight={1.5} />
            <Label at={[R[0] - k / 2, R[1]]} color={C.violet} attach="n" size={11}>1</Label>
            <Label at={[R[0] - k, R[1] + k]} color={C.violet} attach="e" size={11}>2</Label>
            <Label at={[R[0], R[1] + k / 2]} color={C.good} attach="e" size={11}>1</Label>
            <Label at={[R[0] + k, R[1] + k]} color={C.good} attach="n" size={11}>2</Label>
          </>
        )}
        {/* Before the point, so the label never sits on top of the drag target. Left of the point
            on the rising side of the curve, right of it past the peak. */}
        {!perp && (
          <Label at={[p, f(p)]} color={pColor} attach={p < PEAK ? 'nw' : 'ne'} gap={12} size={12}>x = p</Label>
        )}
        <MovablePoint point={[p, f(p)]} onMove={pt => setP(snap(clamp(nearestOnF(pt), 0, 3)))} color={pColor} />
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={v => setP(snap(v))} min={0} max={3} step={0.001} format={v => v.toFixed(3)} />
        <Buttons>
          <ActionButton label="Solve f′(p) = ½" onClick={() => setP(P_STAR)} />
          <ActionButton label="What if I solve f′(p) = 2?" onClick={() => setP(P_WRONG)} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex="m_1 = f'(1) = -2" />
          <Readout color={pColor} tex={`m_2 = f'(p) \\approx ${num(m2, 3)}`} />
          <Readout color={perp ? C.good : undefined} tex={`m_1 m_2 \\approx ${num(product, 3)}`} />
          <Readout tex={`\\text{angle between} \\approx ${Math.abs(p - 1) < 0.002 ? '0' : between.toFixed(1)}^\\circ`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the orange point along the curve, or use the slider.</p>
        {notice}
      </Controls>
    </div>
  )
}
