// 2018 Specialist Exam 1 Q9c — the examiner's report's other route: the solid is a hollowed-out
// solid. Step 1 rotates the region under the hyperbola y = √((x² − 1)/2) from x = 1 to x = 3 about the
// x-axis: V₁ = π∫₁³ (x² − 1)/2 dx = 10π/3 ≈ 10.472. Step 2 rotates the triangle under y = x − 1 (vertices
// (1, 0), (3, 0), (3, 2)): a cone with its tip at (1, 0), height 2 and base radius 2, V₂ = ⅓π(2²)(2) =
// 8π/3 ≈ 8.378, which fits exactly inside the first solid (both end in the circle of radius 2 at x = 3).
// Step 3 removes the cone: 10π/3 − 8π/3 = 2π/3, the same as the washer integral π∫(R² − r²) dx split
// into π∫R² dx − π∫r² dx. Side view as in the washer widget: the region, its mirror image (the other
// half of the solid) and the end circle at x = 3 seen slightly from the side.

import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Polyline, Readout, Readouts, Region, StepNav,
  useSteps, vec,
} from './kit'

const R = (x: number) => Math.sqrt(Math.max(0, (x * x - 1) / 2))
const r = (x: number) => x - 1
const zero = () => 0
const K = 0.08

function ring(x: number, rad: number, n = 64): vec.Vector2[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = (2 * Math.PI * i) / n
    return [x + K * rad * Math.cos(a), rad * Math.sin(a)] as vec.Vector2
  })
}

const V1 = (10 * Math.PI) / 3
const V2 = (8 * Math.PI) / 3

export default function Cone() {
  const { step, next, back } = useSteps(3)

  const fill = step === 0 ? C.f : step === 1 ? C.g : C.good
  const top = step === 1 ? r : R
  const bottom = step === 2 ? r : zero

  const notices = [
    <Notice key={0}>
      <b>Step 1.</b> Forget the line for a moment. Rotating the region under the hyperbola from <M>x = 1</M> to{' '}
      <M>x = 3</M> gives a solid that flares out to radius <M>2</M> at <M>x = 3</M>. Its volume is{' '}
      <M>{'\\pi\\int_1^3 y^2\\,dx'}</M> with <M>{'y^2 = \\tfrac{x^2-1}{2}'}</M>, which is{' '}
      <M>{'\\tfrac{\\pi}{2}\\left[\\tfrac{x^3}{3} - x\\right]_1^3 = \\tfrac{10\\pi}{3}'}</M>.
    </Notice>,
    <Notice key={1}>
      <b>Step 2.</b> The line runs from <M>(1, 0)</M> to <M>(3, 2)</M>, so the triangle under it spins into a{' '}
      <b>cone</b>: tip at <M>(1, 0)</M>, height <M>2</M>, base radius <M>2</M>. No integral needed:{' '}
      <M>{'\\tfrac13\\pi r^2 h = \\tfrac13\\pi(2)^2(2) = \\tfrac{8\\pi}{3}'}</M>. The cone sits inside the first solid, and
      both end in the same circle of radius <M>2</M> at <M>x = 3</M>.
    </Notice>,
    <Notice key={2} tone="good">
      <b>Step 3.</b> The region between the curves is the first region with the triangle taken out, so its solid is the
      first solid with the cone hollowed out: <M>{'\\tfrac{10\\pi}{3} - \\tfrac{8\\pi}{3} = \\tfrac{2\\pi}{3}'}</M>. This is
      the washer integral split in two: <M>{'\\pi\\int (R^2 - r^2)\\,dx = \\pi\\int R^2\\,dx - \\pi\\int r^2\\,dx'}</M>.
    </Notice>,
  ]

  return (
    <div>
      <Plane x={[0, 3.6]} y={[-2.3, 2.4]} xStep={1} yStep={1} height={290}>
        <Region top={top} bottom={bottom} from={1} to={3} color={fill} opacity={0.38} />
        <Region top={x => -bottom(x)} bottom={x => -top(x)} from={1} to={3} color={fill} opacity={0.14} />
        {step < 2 && <Polygon points={ring(3, 2)} color={fill} fillOpacity={0.18} weight={0} strokeOpacity={0} />}
        <Polyline points={ring(3, 2)} color={step === 1 ? C.g : C.f} weight={1.5} />
        <Plot.OfX y={x => -R(x)} domain={[1, 3.5]} color={C.f} weight={1.5} style="dashed" />
        <Plot.OfX y={x => -r(x)} domain={[1, 3]} color={C.g} weight={1.5} style="dashed" />
        <Plot.OfX y={r} domain={[0.6, 3.5]} color={C.g} weight={step === 0 ? 1.5 : 3} />
        <Plot.OfX y={R} domain={[1, 3.5]} color={C.f} weight={step === 1 ? 1.5 : 3} />
        <Point x={1} y={0} color={C.ink} />
        <Point x={3} y={2} color={C.ink} />
        <Label at={[3, 2]} attach="se" size={12} gap={12}>(3, 2)</Label>
        {step === 0 && (
          <Label at={[1.45, R(1.45)]} attach="nw" color={C.f} size={12}>x² − 2y² = 1</Label>
        )}
        {step === 1 && (
          <>
            <Label at={[1, 0]} attach="nw" size={12}>tip</Label>
            <Label at={[3, 1]} attach="e" color={C.g} size={12} gap={12}>radius 2</Label>
            <Line.Segment point1={[1, -2.15]} point2={[3, -2.15]} color={C.ink} weight={1} />
            <Line.Segment point1={[1, -2.05]} point2={[1, -2.25]} color={C.ink} weight={1} />
            <Line.Segment point1={[3, -2.05]} point2={[3, -2.25]} color={C.ink} weight={1} />
            <Label at={[2, -2.15]} attach="n" size={12}>height 2</Label>
          </>
        )}
        {step === 2 && (
          <Label at={[2.55, 0.5]} attach="c" color={C.g} size={11}>cone removed</Label>
        )}
      </Plane>
      <Controls>
        <StepNav step={step} count={3} onBack={back} onNext={next} />
        <Readouts>
          <Readout color={C.f} tex={`V_1 = \\pi\\int_1^3 \\tfrac{x^2-1}{2}\\,dx = \\tfrac{10\\pi}{3} \\approx ${V1.toFixed(3)}`} />
          {step >= 1 && <Readout color={C.g} tex={`V_2 = \\tfrac13\\pi(2)^2(2) = \\tfrac{8\\pi}{3} \\approx ${V2.toFixed(3)}`} />}
          {step === 2 && (
            <Readout color={C.good} tex={`V = V_1 - V_2 = \\tfrac{2\\pi}{3} \\approx ${(V1 - V2).toFixed(3)}`} />
          )}
        </Readouts>
        {notices[step]}
      </Controls>
    </div>
  )
}
