// 2016 Specialist Exam 2 Q2d — the major segment of |z − 1| = 3 cut off by y = x + 2, built up
// the way a teacher would on the board: find the piece, join the centre to the ends of the chord
// (one radius points straight left, the other straight up: a right angle), cut the piece into a
// three-quarter sector plus a right-angled triangle, then check by "circle minus minor segment" —
// where dropping the bracket (a sign error, which the report mentions) gives an impossible answer.

import { C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts, StepNav, useSteps } from './kit'

const CX = 1
const R = 3
const P1: [number, number] = [-2, 0] // −2, at angle π from the centre
const P2: [number, number] = [1, 3] // 1 + 3i, at angle π/2 from the centre
const O: [number, number] = [CX, 0]

// Points on the circle from angle a to angle b (radians, measured at the centre).
function arc(a: number, b: number, n = 120): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const t = a + ((b - a) * i) / n
    pts.push([CX + R * Math.cos(t), R * Math.sin(t)])
  }
  return pts
}

// Major segment: the long way round from −2 (angle π) to 1 + 3i (angle 5π/2), closed by the chord.
const MAJOR = arc(Math.PI, 2.5 * Math.PI)
// Minor segment: the short arc from 1 + 3i (π/2) to −2 (π), closed by the chord.
const MINOR = arc(Math.PI / 2, Math.PI, 60)
// Three-quarter sector: the centre plus the major arc.
const SECTOR: [number, number][] = [O, ...MAJOR]
const TRIANGLE: [number, number][] = [O, P1, P2]
const QUARTER: [number, number][] = [O, ...MINOR]
const RIGHT_ANGLE: [number, number][] = [O, [CX - 0.35, 0], [CX - 0.35, 0.35], [CX, 0.35]]

const SECTOR_AREA = (27 * Math.PI) / 4
const TRI_AREA = 4.5
const MINOR_AREA = (9 * Math.PI) / 4 - 4.5
const CIRCLE_AREA = 9 * Math.PI

export default function Segment() {
  const s = useSteps(4)

  const notices = [
    <Notice key={0}>
      The chord is the part of the line <M>y = x + 2</M> inside the circle, from <M>-2</M> to <M>1 + 3i</M> (part b). It
      cuts the disc into a small <b>minor segment</b> (grey, top left) and a big <b>major segment</b> (blue), the piece
      that contains the centre. The major one is what we need. Its curved edge isn&apos;t a shape with a formula, so we
      have to cut it into pieces that are. Press Next.
    </Notice>,
    <Notice key={1}>
      <b>Join the centre <M>1</M> to both ends of the chord.</b> To reach <M>-2</M> you go 3 units straight left; to
      reach <M>1 + 3i</M> you go 3 units straight up. Left and up are at right angles, so the chord subtends{' '}
      <M>{'\\tfrac{\\pi}{2}'}</M> at the centre. That is the fact that makes this question easy: the minor segment sits
      in exactly one quarter of the circle.
    </Notice>,
    <Notice key={2} tone="good">
      Cut along the two radii. The major segment is the <b>three-quarter sector</b> (blue,{' '}
      <M>{'\\tfrac34 \\times \\pi \\times 3^2 = \\tfrac{27\\pi}{4}'}</M>) <b>plus the right-angled triangle</b> (orange,{' '}
      <M>{'\\tfrac12 \\times 3 \\times 3 = \\tfrac92'}</M>), whose two short sides are both radii. Total{' '}
      <M>{'\\tfrac{27\\pi}{4} + \\tfrac92 \\approx 25.71'}</M>, the report&apos;s easiest route.
    </Notice>,
    <Notice key={3} tone="warn">
      <b>Check it another way:</b> whole circle minus the minor segment (red). The minor segment is the quarter circle
      minus the triangle, <M>{'\\tfrac{9\\pi}{4} - \\tfrac92 \\approx 2.57'}</M>, so the major segment is{' '}
      <M>{'9\\pi - \\left(\\tfrac{9\\pi}{4} - \\tfrac92\\right) = \\tfrac{27\\pi}{4} + \\tfrac92'}</M>, the same. Keep the
      bracket: without it you get <M>{'\\tfrac{27\\pi}{4} - \\tfrac92 \\approx 16.71'}</M>, which is smaller than the
      three-quarter sector on its own (<M>{'\\approx 21.21'}</M>, step 3), so it can&apos;t be right.
    </Notice>,
  ]

  return (
    <div>
      <Plane x={[-3, 4.5]} y={[-3.5, 4]} equalScale height={330} xLabel="Re" yLabel="Im">
        {s.step === 0 && (
          <>
            <Polygon points={MAJOR} color={C.f} fillOpacity={0.28} weight={0} strokeOpacity={0} />
            <Polygon points={MINOR} color={C.guide} fillOpacity={0.3} weight={0} strokeOpacity={0} />
          </>
        )}
        {s.step === 1 && <Polygon points={MAJOR} color={C.f} fillOpacity={0.18} weight={0} strokeOpacity={0} />}
        {s.step === 2 && (
          <>
            <Polygon points={SECTOR} color={C.f} fillOpacity={0.3} weight={0} strokeOpacity={0} />
            <Polygon points={TRIANGLE} color={C.g} fillOpacity={0.35} weight={0} strokeOpacity={0} />
          </>
        )}
        {s.step === 3 && (
          <>
            <Circle center={O} radius={R} color={C.f} fillOpacity={0.12} weight={0} strokeOpacity={0} />
            <Polygon points={MINOR} color={C.bad} fillOpacity={0.45} weight={0} strokeOpacity={0} />
            <Polygon points={QUARTER} color={C.bad} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
          </>
        )}
        <Circle center={O} radius={R} color={C.f} fillOpacity={0} weight={2.5} />
        <Line.ThroughPoints point1={P1} point2={P2} color={C.g} weight={1.5} opacity={0.45} />
        <Line.Segment point1={P1} point2={P2} color={C.g} weight={3} />
        {s.step >= 1 && (
          <>
            <Line.Segment point1={O} point2={P1} color={C.ink} weight={2} style="dashed" />
            <Line.Segment point1={O} point2={P2} color={C.ink} weight={2} style="dashed" />
            <Polygon points={RIGHT_ANGLE} color={C.ink} fillOpacity={0} weight={1.5} />
            <Label at={[-0.5, 0]} attach="n">3</Label>
            <Label at={[1, 1.5]} attach="e">3</Label>
          </>
        )}
        <Point x={P1[0]} y={P1[1]} color={C.ink} />
        <Point x={P2[0]} y={P2[1]} color={C.ink} />
        <Point x={O[0]} y={O[1]} color={C.ink} />
        {/* mafs draws a Label's vertical attach flipped ("s" sits above the point), so "1 + 3i" reads
            above-right on screen. "−2" is anchored just above and left of its point, so it clears the
            real axis and the tick number −2 underneath. */}
        <Label at={[-2.1, 0.32]} attach="w">−2</Label>
        <Label at={P2} attach="ne">1 + 3i</Label>
        {s.step === 0 && <Label at={[2.2, -1.2]} color={C.f}>major</Label>}
        {s.step === 0 && <Label at={[-1.35, 2.35]} color={C.guide} attach="sw">minor</Label>}
      </Plane>
      <Controls>
        <StepNav step={s.step} count={4} onBack={s.back} onNext={s.next} />
        {s.step === 2 && (
          <Readouts>
            <Readout color={C.f} tex={`\\tfrac{27\\pi}{4} \\approx ${SECTOR_AREA.toFixed(2)}`} />
            <Readout color={C.g} tex={`\\tfrac92 = ${TRI_AREA.toFixed(2)}`} />
            <Readout color={C.good} tex={`\\text{major} \\approx ${(SECTOR_AREA + TRI_AREA).toFixed(2)}`} />
          </Readouts>
        )}
        {s.step === 3 && (
          <Readouts>
            <Readout tex={`9\\pi \\approx ${CIRCLE_AREA.toFixed(2)}`} />
            <Readout color={C.bad} tex={`\\text{minor} \\approx ${MINOR_AREA.toFixed(2)}`} />
            <Readout color={C.good} tex={`9\\pi - \\text{minor} \\approx ${(CIRCLE_AREA - MINOR_AREA).toFixed(2)}`} />
          </Readouts>
        )}
        {notices[s.step]}
      </Controls>
    </div>
  )
}
