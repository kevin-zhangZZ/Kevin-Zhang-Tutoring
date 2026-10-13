// 2016 Methods Exam 2 Q2c.ii — the length AE, built up the way a teacher would on the board:
// (1) the line AC is perpendicular to the tangent at A; (2) the tangent at D is parallel to that
// tangent, and E is where it meets AC (a point on a TANGENT, not on the curve); (3) A to E runs
// along AC, whose gradient is 3/4, so the run, rise and length are in the ratio 4 : 3 : 5 —
// AE = 5/4 × 27/25 = 27/20, the same as the distance formula. Because AC is at right angles to
// both parallel tangents, AE is also the shortest gap between them.
// Numbers checked with sympy: A(2, 1/3), D(−1, 25/12), E(23/25, −143/300), AE = 27/20.

import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, StepNav, useSteps } from './kit'

const g = (x: number) => -(x ** 4) / 12 + x ** 2 / 2 - (2 * x) / 3 + 1
const tanA = (x: number) => 3 - (4 * x) / 3
const tanD = (x: number) => -(4 * x) / 3 + 3 / 4

const A: [number, number] = [2, 1 / 3]
const D: [number, number] = [-1, 25 / 12]
const E: [number, number] = [23 / 25, -143 / 300]
const CORNER: [number, number] = [2, -143 / 300] // right-angle corner of the run/rise triangle

// Small square marking the right angle between AC and the tangent at A.
function rightAngle(at: [number, number], u: [number, number], v: [number, number], s = 0.22): [number, number][] {
  return [at, [at[0] + s * u[0], at[1] + s * u[1]], [at[0] + s * (u[0] + v[0]), at[1] + s * (u[1] + v[1])], [at[0] + s * v[0], at[1] + s * v[1]]]
}
// Unit directions: along AC towards E (−4, −3)/5, along the tangent at A towards B (−3, 4)/5.
const SQ_A = rightAngle(A, [-0.8, -0.6], [-0.6, 0.8])
const SQ_E = rightAngle(E, [0.8, 0.6], [-0.6, 0.8])

export default function Gap() {
  const s = useSteps(3)

  const notices = [
    <Notice key={0}>
      The blue line is the tangent at <M>A</M>, gradient <M>{'-\\tfrac43'}</M>. The orange line <M>AC</M> is
      perpendicular to it, gradient <M>{'\\tfrac34'}</M> (part b.ii). Keep both in mind: <M>E</M> will lie on the orange
      line. Press Next.
    </Notice>,
    <Notice key={1}>
      The tangent at <M>D</M> (dashed) has the same gradient <M>{'-\\tfrac43'}</M>, so it is parallel to the tangent at{' '}
      <M>A</M>. <M>E</M> is where this <b>tangent</b> crosses <M>AC</M>, not where <M>AC</M> meets the curve. Solving
      the two line equations together gives <M>{'E\\left(\\tfrac{23}{25},-\\tfrac{143}{300}\\right)'}</M>. Press Next.
    </Notice>,
    <Notice key={2} tone="good">
      From <M>E</M> to <M>A</M> you go <M>{'\\tfrac{27}{25}'}</M> across and <M>{'\\tfrac{81}{100}'}</M> up. Gradient{' '}
      <M>{'\\tfrac34'}</M> means across : up : along <M>{'= 4 : 3 : 5'}</M>, so{' '}
      <M>{'AE = \\tfrac54 \\times \\tfrac{27}{25} = \\tfrac{27}{20}'}</M>, matching the distance formula. And because{' '}
      <M>AC</M> meets both parallel tangents at right angles, <M>AE</M> is the gap between them.
    </Notice>,
  ]

  return (
    <div>
      <Plane x={[-2.6, 2.9]} y={[-1.6, 3.6]} equalScale height={360} label="Graph of y = g(x) with the tangents at A and D and the line AC">
        <Plot.OfX y={g} domain={[-2.6, 2.75]} color={C.guide} weight={2.5} />
        <Plot.OfX y={tanA} domain={[0, 2.9]} color={C.f} weight={2.5} />
        <Line.ThroughPoints point1={[0, -7 / 6]} point2={A} color={C.g} weight={2.5} />
        {s.step === 0 && <Polygon points={SQ_A} color={C.ink} fillOpacity={0} weight={1.5} />}
        {s.step >= 1 && (
          <>
            <Plot.OfX y={tanD} domain={[-2, 1.6]} color={C.f} weight={2.5} style="dashed" />
            <Point x={D[0]} y={D[1]} color={C.ink} />
            <Label at={D} attach="ne">D</Label>
            <Point x={E[0]} y={E[1]} color={C.bad} />
            <Label at={E} attach="sw" color={C.bad}>E</Label>
          </>
        )}
        {s.step === 1 && <Polygon points={SQ_E} color={C.ink} fillOpacity={0} weight={1.5} />}
        {s.step === 2 && (
          <>
            <Polygon points={[E, CORNER, A]} color={C.good} fillOpacity={0.18} weight={0} strokeOpacity={0} />
            <Line.Segment point1={E} point2={CORNER} color={C.good} weight={2} style="dashed" />
            <Line.Segment point1={CORNER} point2={A} color={C.good} weight={2} style="dashed" />
            <Line.Segment point1={E} point2={A} color={C.good} weight={4} />
            <Label at={[1.46, -0.48]} attach="s" color={C.good}>27/25</Label>
            <Label at={[1.95, -0.3]} attach="w" color={C.good}>81/100</Label>
          </>
        )}
        <Point x={A[0]} y={A[1]} color={C.ink} />
        <Point x={0} y={3} color={C.ink} />
        <Label at={[0, 3]} attach="w">B</Label>
        <Point x={0} y={-7 / 6} color={C.ink} />
        <Label at={[0, -7 / 6]} attach="nw">C</Label>
        <Label at={A} attach="ne">A</Label>
        <Label at={[-2.15, 1.85]} attach="c" color={C.guide}>y = g(x)</Label>
      </Plane>
      <Controls>
        <StepNav step={s.step} count={3} onBack={s.back} onNext={s.next} />
        {s.step === 2 && (
          <Readouts>
            <Readout color={C.good} tex={'\\text{across} = \\tfrac{27}{25} = 1.08'} />
            <Readout color={C.good} tex={'\\text{up} = \\tfrac{81}{100} = 0.81'} />
            <Readout color={C.good} tex={'AE = \\tfrac{27}{20} = 1.35'} />
          </Readouts>
        )}
        {notices[s.step]}
      </Controls>
    </div>
  )
}
