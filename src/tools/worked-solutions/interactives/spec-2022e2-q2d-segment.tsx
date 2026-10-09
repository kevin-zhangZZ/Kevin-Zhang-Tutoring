// 2022 Specialist Exam 2 Q2d — the minor segment cut off |z| = 2 by the chord from
// v = √2 − √2i to u = √3 + i, built up in three steps: the sliver itself (part arc, part slanted
// chord, which is why the report says the integral route usually led to error), the sector
// Ouv with angle α = 5π/12, then the triangle Ouv (two radii with α between them, so ½·2·2·sin α)
// taken away. What is left is ½r²(α − sin α) ≈ 0.69, the formula in the working.

import { C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Polyline, Readout, Readouts, StepNav, tick, useSteps } from './kit'

const R = 2
const A_U = Math.PI / 6
const A_V = -Math.PI / 4
const ALPHA = A_U - A_V // 5π/12
const U: [number, number] = [Math.sqrt(3), 1]
const V: [number, number] = [Math.SQRT2, -Math.SQRT2]
const O: [number, number] = [0, 0]

function arc(a: number, b: number, r: number, n = 80): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const t = a + ((b - a) * i) / n
    pts.push([r * Math.cos(t), r * Math.sin(t)])
  }
  return pts
}

const SEGMENT = arc(A_V, A_U, R) // the polygon closes itself along the chord u → v
const SECTOR: [number, number][] = [O, ...arc(A_V, A_U, R)]
const TRIANGLE: [number, number][] = [O, V, U]
const SECTOR_AREA = 0.5 * R * R * ALPHA
const TRI_AREA = 0.5 * R * R * Math.sin(ALPHA)
const SEG_AREA = SECTOR_AREA - TRI_AREA

export default function Segment() {
  const s = useSteps(3)

  const notices = [
    <Notice key={0}>
      The minor segment (shaded orange) is the sliver between the chord and the arc of <M>|z| = 2</M>. The dashed line
      marks where an integral would have to be split. Instead, build the segment from two shapes with known areas.
      Press Next.
    </Notice>,
    <Notice key={1}>
      Join <M>O</M> to <M>u</M> and <M>v</M>. The sector between them (blue) has angle{' '}
      <M>{'\\alpha = \\tfrac{\\pi}{6} - \\left(-\\tfrac{\\pi}{4}\\right) = \\tfrac{5\\pi}{12}'}</M>, so its area is{' '}
      <M>{'\\tfrac12 r^2\\alpha = \\tfrac12(2)^2\\left(\\tfrac{5\\pi}{12}\\right) = \\tfrac{5\\pi}{6}'}</M>, with{' '}
      <M>\alpha</M> in radians. The sector is the segment plus the triangle <M>Ouv</M>.
    </Notice>,
    <Notice key={2} tone="good">
      Take away triangle <M>Ouv</M> (violet). Two of its sides are radii of length 2 with the angle <M>\alpha</M>{' '}
      between them, so its area is <M>{'\\tfrac12(2)(2)\\sin(\\alpha)'}</M>, with no height needed. What is left is the
      segment: <M>{'\\tfrac12 r^2\\bigl(\\alpha - \\sin(\\alpha)\\bigr) \\approx 0.69'}</M>.
    </Notice>,
  ]

  return (
    <div>
      <Plane x={[-0.6, 2.6]} y={[-2, 1.6]} equalScale height={340} xLabel="Re" yLabel="Im" xLabels={v => (v < 0 ? '' : tick(v))}>
        {s.step === 0 && <Polygon points={SEGMENT} color={C.g} fillOpacity={0.65} weight={0} strokeOpacity={0} />}
        {s.step === 0 && (
          <Line.Segment point1={[Math.sqrt(3), -1.9]} point2={[Math.sqrt(3), 1.5]} color={C.guide} weight={1.5} style="dashed" />
        )}
        {s.step >= 1 && <Polygon points={SECTOR} color={C.f} fillOpacity={0.22} weight={0} strokeOpacity={0} />}
        {s.step === 2 && (
          <>
            <Polygon points={TRIANGLE} color={C.violet} fillOpacity={0.3} weight={0} strokeOpacity={0} />
            <Polygon points={SEGMENT} color={C.g} fillOpacity={0.65} weight={0} strokeOpacity={0} />
          </>
        )}
        <Circle center={O} radius={R} color={C.guide} fillOpacity={0} weight={1.5} />
        <Polyline points={arc(A_V, A_U, R)} color={C.f} weight={3} />
        <Line.Segment point1={U} point2={V} color={C.g} weight={3} />
        {s.step >= 1 && (
          <>
            <Line.Segment point1={O} point2={U} color={C.ink} weight={2} style="dashed" />
            <Line.Segment point1={O} point2={V} color={C.ink} weight={2} style="dashed" />
            <Polyline points={arc(A_V, A_U, 0.45, 30)} color={C.ink} weight={2} />
            <Label at={[0.62 * Math.cos(-Math.PI / 24), 0.62 * Math.sin(-Math.PI / 24)]} attach="e" gap={4}>α</Label>
            <Label at={[0.5 * U[0], 0.5 * U[1]]} attach="nw">2</Label>
            <Label at={[0.5 * V[0], 0.5 * V[1]]} attach="sw">2</Label>
          </>
        )}
        <Point x={U[0]} y={U[1]} color={C.ink} />
        <Point x={V[0]} y={V[1]} color={C.ink} />
        <Point x={0} y={0} color={C.ink} />
        <Label at={U} attach="ne">u</Label>
        <Label at={V} attach="se">v</Label>
        <Label at={O} attach="sw">O</Label>
        {s.step === 0 && (
          <Label at={[Math.sqrt(3), -1.9]} color={C.guide} attach="e" size={12}>x = √3</Label>
        )}
      </Plane>
      <Controls>
        <StepNav step={s.step} count={3} onBack={s.back} onNext={s.next} />
        {s.step >= 1 && (
          <Readouts>
            <Readout color={C.f} tex={`\\text{sector} = \\tfrac{5\\pi}{6} \\approx ${SECTOR_AREA.toFixed(4)}`} />
            {s.step === 2 && (
              <>
                <Readout color={C.violet} tex={`\\text{triangle} = 2\\sin\\!\\left(\\tfrac{5\\pi}{12}\\right) \\approx ${TRI_AREA.toFixed(4)}`} />
                <Readout color={C.g} tex={`\\text{segment} \\approx ${SEG_AREA.toFixed(4)} \\approx ${SEG_AREA.toFixed(2)}`} />
              </>
            )}
          </Readouts>
        )}
        {notices[s.step]}
      </Controls>
    </div>
  )
}
