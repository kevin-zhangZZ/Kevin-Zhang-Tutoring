// 2021 Methods Exam 1 Q9b.i — the dilation T stretches the tangent AP by q from the x-axis, and
// A(2, 0) sits on the x-axis, so the image line h(x) = (q/√3)(2 − x) pivots about A as q changes.
// Drag q: substituting h into x² + y² = 1 gives (3 + q²)x² − 4q²x + (4q² − 3) = 0 with discriminant
// Δ = 36(1 − q²) (the working, checked in sympy), so h meets the unit circle exactly when Δ ≥ 0,
// i.e. |q| ≤ 1. The dashed lines are the two tangents from A (q = ±1, Δ = 0). At q = 0 the notice
// explains why 0 must still be cut out of [−1, 1] — the report's named slip — even though the
// x-axis does cut the circle.

import { useState } from 'react'
import { C, Circle, Controls, tick, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider, num } from './kit'

const R3 = Math.sqrt(3)
const A: [number, number] = [2, 0]

/** Discriminant of (3 + q²)x² − 4q²x + (4q² − 3) = 0. */
const disc = (q: number) => 36 * (1 - q * q)

/** Intersections of h with x² + y² = 1: x = (2q² ± 3√(1 − q²))/(3 + q²). */
function hits(q: number): [number, number][] {
  if (Math.abs(q) > 1) return []
  const s = 3 * Math.sqrt(Math.max(0, 1 - q * q))
  const xs = Math.abs(q) === 1 ? [(2 * q * q) / (3 + q * q)] : [(2 * q * q + s) / (3 + q * q), (2 * q * q - s) / (3 + q * q)]
  return xs.map(x => [x, (q * (2 - x)) / R3])
}

/** A point on h up-left of A for the 'h' label, kept inside the view. */
function labelSpot(q: number): [number, number] {
  const len = Math.sqrt(1 + (q * q) / 3)
  const ux = -1 / len
  const uy = q / R3 / len
  const s = Math.min(3.1, Math.abs(uy) > 1e-9 ? 1.4 / Math.abs(uy) : 3.1)
  return [2 + s * ux, s * uy]
}

export default function Pivot() {
  const [raw, setRaw] = useState(0.6)

  const atZero = Math.abs(raw) < 0.006
  const atOne = Math.abs(Math.abs(raw) - 1) < 0.006
  const q = atZero ? 0 : atOne ? Math.sign(raw) : raw
  const D = atOne ? 0 : disc(q)
  const pts = atZero ? [[1, 0], [-1, 0]] as [number, number][] : hits(q)
  const dColor = atOne ? C.good : D < 0 ? C.bad : C.violet
  const hSpot = labelSpot(q)

  let notice
  if (atZero) {
    notice = (
      <Notice tone="warn">
        <b><M>q = 0</M> is not allowed.</b> The <M>x</M>-axis does cut the circle twice, but the question says{' '}
        <M>{'q\\in R\\setminus\\{0\\}'}</M>: with <M>q = 0</M>, <M>T</M> would flatten the whole plane onto the{' '}
        <M>x</M>-axis. So <M>0</M> has to be cut out of the answer, <M>{'[-1,0)\\cup(0,1]'}</M>; writing{' '}
        <M>{'[-1,1]'}</M> is the slip the report names.
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice tone="good">
        <b>At <M>q = \pm1</M> the line just touches the circle</b>: <M>\Delta = 0</M>, so exactly one intersection.{' '}
        <M>q = 1</M> gives back the original tangent at <M>P</M>; <M>q = -1</M> is its mirror image in the{' '}
        <M>x</M>-axis. These two dashed tangents are the steepest lines through <M>A</M> that still reach the circle, so{' '}
        <M>\pm1</M> are included.
      </Notice>
    )
  } else if (Math.abs(q) > 1) {
    notice = (
      <Notice tone="warn">
        Steeper than the dashed tangents, the line <b>misses</b> the circle: <M>{`\\Delta \\approx ${num(D, 2)} < 0`}</M>,
        so the quadratic has no real solutions and <M>{'|q| > 1'}</M> is out. Drag <M>q</M> back to{' '}
        <M>{q > 0 ? '1' : '-1'}</M> and watch <M>\Delta</M> rise to exactly <M>0</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>T</M> only stretches vertically, and <M>A(2, 0)</M> is on the <M>x</M>-axis, so{' '}
        <b><M>A</M> never moves: the line pivots about <M>A</M></b> as <M>q</M> changes. Here{' '}
        <M>{`\\Delta \\approx ${num(D, 2)} > 0`}</M>, so it cuts the circle twice.{' '}
        {q < 0 ? (
          <>Negative <M>q</M> just flips the line below the <M>x</M>-axis: the same picture, reflected.</>
        ) : (
          <>Drag <M>q</M> up past <M>1</M>, then down through <M>0</M> to the negative side.</>
        )}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.6, 2.6]} y={[-1.6, 1.6]} xStep={0.5} yStep={0.5} equalScale height={340} xLabels={v => (v > 2.2 ? '' : tick(v))} yLabels={v => (Math.abs(Math.abs(v) - 0.5) < 1e-9 ? '' : tick(v))}>
        <Circle center={[0, 0]} radius={1} color={C.f} fillOpacity={0.06} weight={2.5} />
        <Line.ThroughPoints point1={A} point2={[0, 2 / R3]} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={A} point2={[0, -2 / R3]} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={A} point2={[0, (2 * q) / R3]} color={C.g} weight={3} />
        {pts.map(([x, y], i) => (
          <Point key={i} x={x} y={y} color={C.good} svgCircleProps={{ r: 5.5 }} />
        ))}
        <Point x={A[0]} y={A[1]} color={C.ink} />
        <Label at={A} attach="ne">A</Label>
        <Label at={hSpot} color={C.g} attach={q > 0 ? 'ne' : q < 0 ? 'se' : 'n'}>h</Label>
      </Plane>
      <Controls>
        <Slider label="q" value={raw} onChange={setRaw} min={-2} max={2} step={0.01} />
        <Readouts>
          <Readout color={C.g} tex={`h(x) = \\frac{${num(q)}}{\\sqrt3}(2-x)`} />
          <Readout color={dColor} tex={`\\Delta = 36(1-q^2) ${atOne ? '= 0' : `\\approx ${num(D, 2)}`}`} />
          <Readout color={pts.length ? C.good : C.bad} tex={`\\text{intersections: } ${pts.length}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
