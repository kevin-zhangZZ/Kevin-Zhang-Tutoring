// 2016 Specialist Exam 2 Q2a — |z − 1| = |z + 2 − 3i| read as distances. Drag a point P and
// watch its distance to 1 (blue) and to −2 + 3i (violet). They are equal exactly when P is on
// the orange line y = x + 2, which crosses the dashed segment joining the two points at right
// angles through its midpoint (−1/2, 3/2): the perpendicular bisector. Shows why the gradient is
// +1 (the segment's is −1) — the report's most common error was a negative gradient.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Polygon, Readout, Readouts, clamp, num } from './kit'

const A: [number, number] = [1, 0] // the point 1
const B: [number, number] = [-2, 3] // the point −2 + 3i
const MID: [number, number] = [-0.5, 1.5]
// Equal spans, so a phone shows exactly this window; the positive ends sit between ticks so the
// axis names don't land on a tick number.
const X: [number, number] = [-4, 3.5]
const Y: [number, number] = [-2, 5.5]

const dist = (p: [number, number], q: [number, number]) => Math.hypot(p[0] - q[0], p[1] - q[1])

// Snap onto y = x + 2 when the drag passes close to it, so the "equal" state can be reached with a
// finger. Distance from (x, y) to x − y + 2 = 0 is |x − y + 2|/√2; the foot of the perpendicular
// is P − ((x − y + 2)/2)(1, −1).
function snap([x, y]: [number, number]): [number, number] {
  const px = clamp(x, X[0], X[1])
  const py = clamp(y, Y[0], Y[1])
  const k = px - py + 2
  if (Math.abs(k) / Math.SQRT2 < 0.12) return [px - k / 2, py + k / 2]
  return [px, py]
}

// A small square marking the right angle at the midpoint, with sides along the segment direction
// (−1, 1)/√2 and the line direction (1, 1)/√2.
const S = 0.28 / Math.SQRT2
const RIGHT_ANGLE: [number, number][] = [
  MID,
  [MID[0] - S, MID[1] + S],
  [MID[0], MID[1] + 2 * S],
  [MID[0] + S, MID[1] + S],
]

function complexLabel([x, y]: [number, number]): string {
  const re = num(x)
  const im = num(Math.abs(y))
  return y < 0 ? `${re} - ${im}i` : `${re} + ${im}i`
}

export default function Bisector() {
  const [p, setP] = useState<[number, number]>([1, 3])
  const d1 = dist(p, A)
  const d2 = dist(p, B)
  const onLine = Math.abs(p[0] - p[1] + 2) < 1e-6
  const atMid = dist(p, MID) < 0.08

  let notice
  if (onLine && atMid) {
    notice = (
      <Notice tone="good">
        <b>P is the midpoint <M>{'\\left(-\\tfrac12,\\ \\tfrac32\\right)'}</M></b> of the dashed segment, so of course it is
        the same distance from both ends. But the midpoint is only one point of the locus: slide P along the orange line
        and the two distances stay equal, however far you go.
      </Notice>
    )
  } else if (onLine) {
    notice = (
      <Notice tone="good">
        <b>Equal distances:</b> <M>{`|z-1| = |z+2-3i| \\approx ${num(d1)},`}</M> so P is on the locus. Every point like this
        is on the orange line{' '}
        <M>y = x + 2</M>, which cuts the dashed segment in half at right angles: the <b>perpendicular bisector</b>.
        The segment has gradient <M>{'\\tfrac{3-0}{-2-1} = -1'}</M>, so the bisector has gradient <M>+1</M>. A line of
        gradient <M>-1</M> would run <i>parallel</i> to the segment instead of across it; a negative gradient was the
        report&apos;s most common error. Now drag P off the line.
      </Notice>
    )
  } else if (d1 < d2) {
    notice = (
      <Notice>
        P is <b>closer to 1</b> than to <M>-2 + 3i</M> (the blue distance is shorter), so <M>{'|z-1| < |z+2-3i|'}</M> and P is
        not on the locus. Every point on this side of the orange line is nearer to 1. Drag P until the blue and violet
        lengths match; it will click onto the line.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        P is <b>closer to <M>-2 + 3i</M></b> than to 1 (the violet distance is shorter), so <M>{'|z-1| > |z+2-3i|'}</M> and P
        is not on the locus. Drag P towards the orange line: the two distances even out exactly as P reaches it.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={X} y={Y} equalScale height={330} xLabel="Re" yLabel="Im">
        <Line.ThroughPoints point1={[0, 2]} point2={[1, 3]} color={C.g} weight={3} />
        <Line.Segment point1={A} point2={B} color={C.guide} style="dashed" weight={2} />
        <Polygon points={RIGHT_ANGLE} color={C.guide} fillOpacity={0} weight={1.5} />
        <Line.Segment point1={p} point2={A} color={C.f} weight={3} />
        <Line.Segment point1={p} point2={B} color={C.violet} weight={3} />
        <Point x={A[0]} y={A[1]} color={C.f} />
        <Point x={B[0]} y={B[1]} color={C.violet} />
        <Point x={MID[0]} y={MID[1]} color={C.guide} />
        <Label at={A} color={C.f} attach="ne">1</Label>
        <Label at={B} color={C.violet} attach="w">−2 + 3i</Label>
        <Label at={[-3.3, -1.3]} color={C.g} attach="e">y = x + 2</Label>
        <Label at={p} color={onLine ? C.good : C.ink} attach="se">P</Label>
        <MovablePoint point={p} onMove={q => setP(snap(q))} color={onLine ? C.good : C.ink} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout tex={`z = ${complexLabel(p)}`} />
          <Readout color={C.f} tex={`|z-1| \\approx ${num(d1)}`} />
          <Readout color={C.violet} tex={`|z+2-3i| \\approx ${num(d2)}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the point P anywhere on the plane.</p>
        {notice}
      </Controls>
    </div>
  )
}
