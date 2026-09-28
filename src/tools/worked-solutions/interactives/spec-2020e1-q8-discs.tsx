// 2020 Specialist Exam 1 Q8 — why the volume of revolution is π∫y² dx. Rotating the graph of
// y = 2√((x² + x + 1)/((x + 1)(x² + 1))) about the x-axis over [0, √3] sweeps out a solid, drawn here
// in a side view with its circular cross-sections seen at a slight angle (as ellipses). Slice it into
// n discs: each is a thin cylinder whose radius is the curve's height y at the middle of the disc and
// whose thickness is Δx = √3/n, so its volume is πy²Δx. The sum settles on
// π∫₀^√3 y² dx = 2π(log_e(2 + 2√3) + π/3) ≈ 17.25 as n grows (midpoint radii: n = 1 gives ≈ 17.44,
// n = 6 ≈ 17.26, n ≥ 16 rounds to 17.25). A toggle shows the two cylinders that bound the solid —
// radius y(√3) ≈ 1.45 inside, radius y(0) = 2 outside — the sanity check 11.4 < V < 21.8 in the
// working's last line.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Polyline, Readout, Readouts, Slider, Toggle, num,
  type vec,
} from './kit'

const B = Math.sqrt(3)
const y2 = (x: number) => (4 * (x * x + x + 1)) / ((x + 1) * (x * x + 1))
const y = (x: number) => Math.sqrt(y2(x))
const V = 2 * Math.PI * (Math.log(2 + 2 * B) + Math.PI / 3) // ≈ 17.2498
const R0 = y(0) // 2, the widest cross-section
const R1 = y(B) // ≈ 1.4485, the narrowest
const INNER = Math.PI * R1 * R1 * B // ≈ 11.42
const OUTER = Math.PI * R0 * R0 * B // ≈ 21.77
// A circle of radius r in the plane at x, seen slightly from the side, is an ellipse this many
// x-units wide per unit of radius (either side of its centre).
const K = 0.075

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
const SAMPLES = Array.from({ length: 81 }, (_, i) => (B * i) / 80)
const SILHOUETTE: vec.Vector2[] = [
  ...ring(0, R0, Math.PI / 2, (3 * Math.PI) / 2),
  ...SAMPLES.map(x => [x, -y(x)] as vec.Vector2),
  ...ring(B, R1, -Math.PI / 2, Math.PI / 2),
  ...[...SAMPLES].reverse().map(x => [x, y(x)] as vec.Vector2),
]

export default function Discs() {
  const [n, setN] = useState(6)
  const [bounds, setBounds] = useState(false)

  const h = B / n
  const radii = Array.from({ length: n }, (_, i) => y((i + 0.5) * h))
  const sum = radii.reduce((s, r) => s + Math.PI * r * r * h, 0)
  const pick = Math.floor(n / 2) // the green disc
  const rPick = radii[pick]
  const xFace = (pick + 1) * h

  let notice
  if (bounds) {
    notice = (
      <Notice tone="good">
        <b>A quick check on the answer.</b> The widest cross-section is at <M>x = 0</M>, where <M>y = 2</M>; the
        narrowest is at <M>x = \sqrt3</M>, where <M>y \approx 1.45</M>. So the solid fits inside a cylinder of radius 2
        and contains one of radius 1.45, both of length <M>\sqrt3</M>: <M>{'11.4 < V < 21.8'}</M>. The exact{' '}
        <M>V \approx 17.25</M> sits between them.
      </Notice>
    )
  } else if (n === 1) {
    notice = (
      <Notice>
        <b>One disc.</b> A single cylinder of length <M>\sqrt3</M>, whose radius is the curve&apos;s height at the
        middle, <M>{'y\\left(\\tfrac{\\sqrt3}{2}\\right) \\approx 1.79'}</M>. Its volume{' '}
        <M>{'\\pi r^2 h \\approx 17.44'}</M> is close, but the solid narrows from left to right and one cylinder
        can&apos;t follow that. Drag <M>n</M> up.
      </Notice>
    )
  } else if (n < 16) {
    notice = (
      <Notice>
        Each disc is a thin cylinder: its radius is <M>y</M>, the height of the curve at the middle of the disc, and
        its thickness is <M>{'\\Delta x = \\tfrac{\\sqrt3}{n}'}</M>, so its volume is <M>{'\\pi y^2\\,\\Delta x'}</M>.
        The green disc is one of them. The radius goes in <b>squared</b>, which is why the formula needs{' '}
        <M>y^2</M>, and squaring <M>{'y = 2\\sqrt{\\cdots}'}</M> turns the 2 into 4 and removes the root. The
        question was built for that. Keep increasing <M>n</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        With {n} thin discs the total is <M>{`\\approx ${num(sum, 2)}`}</M>, and it hardly changes as the discs get
        thinner still. In the limit the sum <M>{'\\sum \\pi y^2\\,\\Delta x'}</M> becomes the integral{' '}
        <M>{'V = \\pi\\int_0^{\\sqrt3} y^2\\,dx \\approx 17.25'}</M>. That limit is what the volume formula means.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.2, 1.95]} y={[-2.25, 2.25]} xStep={0.5} yStep={1} height={320} labels={false} yLabel="">
        <Polygon points={SILHOUETTE} color={C.f} fillOpacity={0.12} weight={0} strokeOpacity={0} />
        <Polyline points={ring(0, R0, Math.PI / 2, (3 * Math.PI) / 2)} color={C.f} weight={1.5} />
        <Plot.OfX y={x => -y(x)} domain={[0, B]} color={C.f} weight={1.5} style="dashed" />
        {!bounds &&
          radii.map((r, i) => {
            const { body, face } = cylinder(i * h, (i + 1) * h, r)
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
            <Polygon points={cylinder(0, B, R0).body} color={C.bad} fillOpacity={0.06} weight={1.5} />
            <Polyline points={cylinder(0, B, R0).face} color={C.bad} weight={1.5} />
            <Polygon points={cylinder(0, B, R1).body} color={C.good} fillOpacity={0.14} weight={1.5} />
            <Polyline points={cylinder(0, B, R1).face} color={C.good} weight={1.5} />
            <Label at={[0.55, R0]} color={C.bad} attach="n" size={12}>radius 2</Label>
            <Label at={[0.5, R1]} color={C.good} attach="s" size={12}>radius ≈ 1.45</Label>
          </>
        )}
        <Polyline points={ring(B, R1, 0, 2 * Math.PI)} color={C.f} weight={1.5} />
        <Plot.OfX y={y} domain={[0, B]} color={C.f} weight={3} />
        {!bounds && (
          <>
            <Line.Segment point1={[xFace, 0]} point2={[xFace, rPick]} color={C.ink} weight={2} />
            <Label at={[xFace + K * 0.5, rPick * 0.55]} attach="e" size={13} italic>y</Label>
          </>
        )}
        {/* Left of the y-axis, which runs through the solid's left end and would cross the text. */}
        <Label at={[0, -R0]} attach="sw" size={12}>x = 0</Label>
        <Label at={[B, -R1]} attach="s" size={12}>x = √3</Label>
        {!bounds && <Label at={[1.45, y(1.45)]} color={C.f} attach="ne" size={12}>graph of y</Label>}
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={40} step={1} format={v => String(Math.round(v))} />
        <Buttons>
          <Toggle label="Show the bounding cylinders" checked={bounds} onChange={setBounds} />
        </Buttons>
        <Readouts>
          {bounds ? (
            <>
              <Readout color={C.good} tex={`\\pi(1.45)^2\\sqrt3 \\approx ${num(INNER, 2)}`} />
              <Readout color={C.bad} tex={`\\pi(2)^2\\sqrt3 \\approx ${num(OUTER, 2)}`} />
              <Readout color={C.f} tex={`V \\approx ${num(V, 2)}`} />
            </>
          ) : (
            <>
              <Readout tex={`\\Delta x = \\tfrac{\\sqrt3}{${n}} \\approx ${num(h, 3)}`} />
              <Readout color={C.g} tex={`\\textstyle\\sum \\pi y^2\\,\\Delta x \\approx ${num(sum, 2)}`} />
              <Readout color={C.f} tex={`V = \\pi\\!\\int_0^{\\sqrt3}\\! y^2\\,dx \\approx ${num(V, 2)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
