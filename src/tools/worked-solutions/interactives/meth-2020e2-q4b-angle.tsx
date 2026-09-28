// 2020 Methods Exam 2 Q4b — which angle is "the angle the tangent makes with the positive direction
// of the horizontal axis"? Built up in four steps on an equal-scale plane, so every angle drawn is
// its true size. (1) The tangent at x = 1, y = −2x + 4 (part a's gradient −2), and its slope
// triangle down to the axis: 2 up for every 1 across. (2) The acute angle between the line and the
// axis, tan⁻¹(2) ≈ 63.43° — the report's common wrong answer 63°. (3) The calculator's
// tan⁻¹(−2) ≈ −63.43°, measured clockwise to the lower half of the line — the other wrong answer.
// (4) The angle asked for, anticlockwise from the positive x-direction: 180° − 63.43° ≈ 116.57°,
// which rounds to 117°; the two angles at the crossing sit on a straight line, so they add to 180°.

import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Polyline, Readout, Readouts, StepNav, useSteps, type vec } from './kit'

const f = (x: number) => 2 * x * Math.exp(1 - x * x)
const DEG = 180 / Math.PI
const ACUTE = Math.atan(2) // ≈ 63.43°, the acute angle between the tangent and the axis
const THETA = Math.PI - ACUTE // ≈ 116.57°, measured anticlockwise from the positive x-direction
const A: vec.Vector2 = [2, 0] // where the tangent y = −2x + 4 crosses the x-axis

function arc(c: vec.Vector2, r: number, a0: number, a1: number, n = 40): vec.Vector2[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n
    return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)] as vec.Vector2
  })
}
const polar = (c: vec.Vector2, r: number, a: number): vec.Vector2 => [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]

/** A filled angle wedge with its arc. */
function Angle({ r, from, to, color, fill = 0.2 }: { r: number; from: number; to: number; color: string; fill?: number }) {
  return (
    <>
      <Polygon points={[A, ...arc(A, r, from, to)]} color={color} fillOpacity={fill} weight={0} strokeOpacity={0} />
      <Polyline points={arc(A, r, from, to)} color={color} weight={2.5} />
    </>
  )
}

export default function AngleWidget() {
  const steps = useSteps(4)
  const s = steps.step

  let notice
  if (s === 0) {
    notice = (
      <Notice>
        <b>Gradient <M>-2</M>: 1 across, 2 down.</b> The tangent at <M>x = 1</M> passes through <M>(1, 2)</M> with
        gradient <M>f&apos;(1) = -2</M>, so it reaches the <M>x</M>-axis 1 unit further right, at <M>(2, 0)</M>. The grey
        triangle is its slope triangle: height 2, base 1. The angles are measured where the line crosses the axis. Press{' '}
        <b>Next</b>.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice tone="warn">
        <b>This is the acute angle, 63.43°.</b> Inside the triangle, <M>{'\\tan(\\text{angle}) = \\tfrac{\\text{opposite}}{\\text{adjacent}} = \\tfrac21'}</M>,
        so the angle is <M>{'\\tan^{-1}(2) \\approx 63.43^\\circ'}</M>. It is an angle between the line and the axis, but
        it is measured from the <i>negative</i> <M>x</M>-direction (pointing left), and it isn&apos;t obtuse. The report
        lists <M>{'63^\\circ'}</M> as a common incorrect answer.
      </Notice>
    )
  } else if (s === 2) {
    notice = (
      <Notice tone="warn">
        <b>This is what the calculator gives: <M>{'\\tan^{-1}(-2) \\approx -63.43^\\circ'}</M>.</b> The calculator only
        ever returns angles between <M>{'-90^\\circ'}</M> and <M>{'90^\\circ'}</M>. The minus sign means it turned{' '}
        <i>clockwise</i> from the positive <M>x</M>-direction, down to the lower half of the line. Also not obtuse, and
        also a common incorrect answer in the report.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>The angle asked for: start on the positive <M>x</M>-direction and turn anticlockwise until you reach the
        line.</b> That sweeps past the vertical, so it is obtuse. The green and grey angles sit on the straight line of the{' '}
        <M>x</M>-axis, so they add to <M>{'180^\\circ'}</M>:{' '}
        <M>{'\\theta = 180^\\circ - 63.43^\\circ \\approx 116.57^\\circ'}</M>, which is <M>{'117^\\circ'}</M> to the nearest
        degree. Check: <M>{'\\tan 116.57^\\circ \\approx -2'}</M>, the gradient.
      </Notice>
    )
  }

  // Label positions for the angles, placed along each arc's middle direction.
  const greenAt = polar(A, 0.62, THETA / 2)
  const acuteAt = polar(A, 0.5, Math.PI - ACUTE / 2)
  const calcAt = polar(A, 0.62, -ACUTE / 2)

  return (
    <div>
      <Plane x={[-0.2, 3.4]} y={[-1.3, 2.6]} xStep={1} yStep={1} equalScale height={360}>
        {/* Step 1: the slope triangle (1, 2) → (1, 0) → (2, 0). */}
        <Polygon points={[[1, 2], [1, 0], A]} color={C.guide} fillOpacity={s === 0 ? 0.22 : 0.12} weight={1.5} strokeOpacity={0.8} />
        {s === 0 && (
          <>
            <Label at={[1, 1]} color={C.ink} attach="w" size={12}>2</Label>
            <Label at={[1.5, 0]} color={C.ink} attach="n" size={12}>1</Label>
          </>
        )}
        <Plot.OfX y={f} domain={[0, 3]} color={C.f} weight={3} />
        <Label at={[0.45, f(0.45)]} color={C.f} attach="nw">f</Label>
        <Line.PointSlope point={[1, 2]} slope={-2} color={C.g} weight={2.5} />
        <Label at={[2.55, -1.1]} color={C.g} attach="e" size={12}>y = −2x + 4</Label>
        <Point x={1} y={2} color={C.g} />
        <Label at={[1, 2]} color={C.g} attach="ne">(1, 2)</Label>
        {/* Step 2: the acute angle between the line and the negative x-direction. */}
        {(s === 1 || s === 3) && (
          <Angle r={0.36} from={THETA} to={Math.PI} color={s === 3 ? C.guide : C.violet} fill={s === 3 ? 0.18 : 0.25} />
        )}
        {(s === 1 || s === 3) && (
          <Label at={acuteAt} color={s === 3 ? C.guide : C.violet} attach="w" size={12}>63.43°</Label>
        )}
        {/* Step 3: the calculator's angle, clockwise below the axis. */}
        {s === 2 && (
          <>
            <Line.Segment point1={A} point2={[3.4, 0]} color={C.bad} weight={2} />
            <Angle r={0.45} from={-ACUTE} to={0} color={C.bad} />
            <Label at={calcAt} color={C.bad} attach="e" size={12}>−63.43°</Label>
          </>
        )}
        {/* Step 4: the angle asked for, anticlockwise from the positive x-direction. */}
        {s === 3 && (
          <>
            <Line.Segment point1={A} point2={[3.4, 0]} color={C.good} weight={2.5} />
            <Angle r={0.45} from={0} to={THETA} color={C.good} />
            <Label at={greenAt} color={C.good} attach="ne" size={12}>116.57°</Label>
          </>
        )}
        <Point x={A[0]} y={A[1]} color={C.ink} />
      </Plane>
      <Controls>
        <StepNav step={s} count={4} onBack={steps.back} onNext={steps.next} />
        <Readouts>
          {s === 0 && <Readout color={C.g} tex="f'(1) = -2" />}
          {s === 1 && <Readout color={C.violet} tex={`\\tan^{-1}(2) \\approx ${(ACUTE * DEG).toFixed(2)}^\\circ`} />}
          {s === 2 && <Readout color={C.bad} tex={`\\tan^{-1}(-2) \\approx -${(ACUTE * DEG).toFixed(2)}^\\circ`} />}
          {s === 3 && (
            <>
              <Readout color={C.good} tex={`\\theta = 180^\\circ - ${(ACUTE * DEG).toFixed(2)}^\\circ \\approx ${(THETA * DEG).toFixed(2)}^\\circ`} />
              <Readout tex={`\\tan\\theta \\approx ${Math.tan(THETA).toFixed(2)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
