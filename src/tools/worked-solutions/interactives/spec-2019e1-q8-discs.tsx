// 2019 Specialist Exam 1 Q8 — why the volume of revolution is π∫y² dx, and why the square root
// disappears. Rotating y = √((1 + 2x)/(1 + x²)) about the x-axis over [0, 1] sweeps out a solid,
// drawn here in a side view with its circular cross-sections seen at a slight angle (as ellipses).
// Slice it into n discs: each is a thin cylinder whose radius is the curve's height y at the middle
// of the disc and whose thickness is Δx = 1/n, so its volume is πy²Δx = π(1 + 2x)/(1 + x²)·Δx — the
// radius goes in squared, so the root never has to be integrated. The sum settles on
// π∫₀¹ y² dx = π²/4 + π log_e 2 ≈ 4.645 as n grows (midpoint radii: n = 1 gives 1.6π ≈ 5.03,
// n = 6 ≈ 4.654, n = 40 ≈ 4.645).
// A toggle shows the two cylinders that bound the solid: radius y(0) = 1 inside (volume π ≈ 3.14)
// and radius √φ ≈ 1.272 outside, the widest cross-section, at x = (√5 − 1)/2 ≈ 0.618 where y² peaks
// at φ = (1 + √5)/2 (volume πφ ≈ 5.08).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Polyline, Readout, Readouts, Slider, Toggle, num,
  type vec,
} from './kit'

const y2 = (x: number) => (1 + 2 * x) / (1 + x * x)
const y = (x: number) => Math.sqrt(y2(x))
const V = (Math.PI * Math.PI) / 4 + Math.PI * Math.log(2) // ≈ 4.6450
const PHI = (1 + Math.sqrt(5)) / 2
const XMAX = PHI - 1 // ≈ 0.618, where y² (and so y) is largest
const R_IN = 1 // y(0), the narrowest cross-section
const R_OUT = Math.sqrt(PHI) // ≈ 1.272, the widest
const INNER = Math.PI * R_IN * R_IN // ≈ 3.14
const OUTER = Math.PI * PHI // ≈ 5.08
// A circle of radius r in the plane at x, seen slightly from the side, is an ellipse this many
// x-units wide per unit of radius (either side of its centre).
const K = 0.07

/** Points on the side view of the circle of radius r at x, for angles a0 → a1 (0 = towards the
 *  viewer's right, π/2 = the top). */
function ring(x: number, r: number, a0: number, a1: number, n = 28): vec.Vector2[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n
    return [x + K * r * Math.cos(a), r * Math.sin(a)] as vec.Vector2
  })
}

/** A cylinder from x0 to x1 of radius r: its body (back half of the left rim, then the front half of
 *  the right rim) and its right-hand face, the one that faces the viewer. */
function cylinder(x0: number, x1: number, r: number) {
  const body = [...ring(x0, r, Math.PI / 2, (3 * Math.PI) / 2), ...ring(x1, r, -Math.PI / 2, Math.PI / 2)]
  const face = ring(x1, r, 0, 2 * Math.PI)
  return { body, face }
}

// The solid's outline: the curve, its mirror image below the axis, the hidden left end (only its
// back half shows past the solid) and the visible right end.
const R1 = y(1)
const SAMPLES = Array.from({ length: 81 }, (_, i) => i / 80)
const SILHOUETTE: vec.Vector2[] = [
  ...ring(0, R_IN, Math.PI / 2, (3 * Math.PI) / 2),
  ...SAMPLES.map(x => [x, -y(x)] as vec.Vector2),
  ...ring(1, R1, -Math.PI / 2, Math.PI / 2),
  ...[...SAMPLES].reverse().map(x => [x, y(x)] as vec.Vector2),
]

export default function Discs() {
  const [n, setN] = useState(6)
  const [bounds, setBounds] = useState(false)

  const h = 1 / n
  const mids = Array.from({ length: n }, (_, i) => (i + 0.5) * h)
  const sum = mids.reduce((s, m) => s + Math.PI * y2(m) * h, 0)
  const pick = Math.floor(n / 2) // the green disc
  const xPick = mids[pick]
  const rPick = y(xPick)
  const xFace = (pick + 1) * h

  let notice
  if (bounds) {
    notice = (
      <Notice tone="good">
        <b>A quick check on the answer.</b> The narrowest cross-section is at <M>x = 0</M>, where <M>y = 1</M>; the
        widest is near <M>x \approx 0.62</M>, where <M>y \approx 1.27</M>. So the solid contains a cylinder of radius 1
        and fits inside one of radius about 1.272, both of length 1: <M>{'3.14 < V < 5.08'}</M>. The exact{' '}
        <M>V \approx 4.64</M> sits between them. An answer outside this range (say one missing its <M>\pi</M>,{' '}
        <M>\approx 1.48</M>) is wrong.
      </Notice>
    )
  } else if (n === 1) {
    notice = (
      <Notice>
        <b>One disc.</b> A single cylinder of length 1, whose radius is the curve&apos;s height at the middle,{' '}
        <M>{'y\\left(\\tfrac12\\right) = \\sqrt{1.6} \\approx 1.26'}</M>. Its volume <M>{'\\pi r^2 h = 1.6\\pi \\approx 5.03'}</M>{' '}
        is in the right area, but the solid is thinner near <M>x = 0</M> and one cylinder can&apos;t follow that. Drag{' '}
        <M>n</M> up.
      </Notice>
    )
  } else if (n < 16) {
    notice = (
      <Notice>
        Each disc is a thin cylinder: its radius is <M>y</M>, the height of the curve at the middle of the disc, and
        its thickness is <M>{'\\Delta x = \\tfrac{1}{n}'}</M>, so its volume is <M>{'\\pi y^2\\,\\Delta x'}</M>. The
        green disc is one of them. The radius goes in <b>squared</b>, so the square root in <M>y</M> is gone before
        you integrate anything: its face has area <M>{'\\pi \\cdot \\tfrac{1+2x}{1+x^2}'}</M>. Keep increasing{' '}
        <M>n</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        With {n} thin discs the total is <M>{`\\approx ${num(sum, 3)}`}</M>, and it hardly changes as the discs get
        thinner still. In the limit the sum <M>{'\\sum \\pi y^2\\,\\Delta x'}</M> becomes the integral{' '}
        <M>{'V = \\pi\\int_0^1 \\frac{1+2x}{1+x^2}\\,dx \\approx 4.645'}</M>. That limit is what the volume formula
        means.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.15, 1.28]} y={[-1.5, 1.6]} xStep={0.5} yStep={1} height={320} labels={false} yLabel="">
        <Polygon points={SILHOUETTE} color={C.f} fillOpacity={0.12} weight={0} strokeOpacity={0} />
        <Polyline points={ring(0, R_IN, Math.PI / 2, (3 * Math.PI) / 2)} color={C.f} weight={1.5} />
        <Plot.OfX y={x => -y(x)} domain={[0, 1]} color={C.f} weight={1.5} style="dashed" />
        {!bounds &&
          mids.map((m, i) => {
            const { body, face } = cylinder(i * h, (i + 1) * h, y(m))
            const col = i === pick ? C.good : C.g
            // Thinner rims once the discs are thin, or forty overlapping outlines turn into a blur.
            const rim = i === pick ? 1.5 : n > 12 ? 0.5 : 1
            return (
              <g key={i}>
                <Polygon points={body} color={col} fillOpacity={0.28} weight={rim} />
                <Polygon points={face} color={col} fillOpacity={i === pick ? 0.6 : n > 12 ? 0.25 : 0.4} weight={rim} />
              </g>
            )
          })}
        {bounds && (
          <>
            <Polygon points={cylinder(0, 1, R_OUT).body} color={C.bad} fillOpacity={0.06} weight={1.5} />
            <Polyline points={cylinder(0, 1, R_OUT).face} color={C.bad} weight={1.5} />
            <Polygon points={cylinder(0, 1, R_IN).body} color={C.good} fillOpacity={0.14} weight={1.5} />
            <Polyline points={cylinder(0, 1, R_IN).face} color={C.good} weight={1.5} />
            <Line.Segment point1={[XMAX, 0]} point2={[XMAX, R_OUT]} color={C.bad} weight={1.5} style="dashed" />
            <Label at={[0.3, R_OUT]} color={C.bad} attach="n" size={12}>radius ≈ 1.27</Label>
            <Label at={[0.3, R_IN]} color={C.good} attach="s" size={12}>radius 1</Label>
          </>
        )}
        <Polyline points={ring(1, R1, 0, 2 * Math.PI)} color={C.f} weight={1.5} />
        <Plot.OfX y={y} domain={[0, 1]} color={C.f} weight={3} />
        {!bounds && (
          <>
            <Line.Segment point1={[xFace, 0]} point2={[xFace, y(xPick)]} color={C.ink} weight={2} />
            <Label at={[xFace + K * 0.5, rPick * 0.55]} attach="e" size={13} italic>y</Label>
          </>
        )}
        {/* Left of the y-axis, which runs through the solid's left end and would cross the text. */}
        <Label at={[0, -R_IN]} attach="sw" size={12}>x = 0</Label>
        <Label at={[1, -R1]} attach="s" size={12}>x = 1</Label>
        {!bounds && <Label at={[XMAX, R_OUT]} color={C.f} attach="n" size={12}>graph of y</Label>}
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={40} step={1} format={v => String(Math.round(v))} />
        <Buttons>
          <Toggle label="Show the bounding cylinders" checked={bounds} onChange={setBounds} />
        </Buttons>
        <Readouts>
          {bounds ? (
            <>
              <Readout color={C.good} tex={`\\pi(1)^2(1) \\approx ${num(INNER, 2)}`} />
              <Readout color={C.bad} tex={`\\pi(1.272)^2(1) \\approx ${num(OUTER, 2)}`} />
              <Readout color={C.f} tex={`V \\approx ${num(V, 3)}`} />
            </>
          ) : (
            <>
              <Readout color={C.good} tex={`\\text{green face: } \\pi y^2 = \\pi\\cdot\\tfrac{1+2x}{1+x^2} \\approx ${num(Math.PI * y2(xPick), 2)}`} />
              <Readout color={C.g} tex={`\\textstyle\\sum \\pi y^2\\,\\Delta x \\approx ${num(sum, 3)}`} />
              <Readout color={C.f} tex={`V = \\pi\\!\\int_0^1\\! y^2\\,dx \\approx ${num(V, 3)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
