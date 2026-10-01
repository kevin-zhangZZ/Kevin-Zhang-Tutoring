// 2021 Specialist Exam 2 Q2c.ii — the minor segment cut off the circle |z − 3i| = 1 by the ray
// Arg(z − z₄) = 5π/6 (z₄ = √3 + i), built up the way a teacher would on the board: the sliver itself,
// between the chord from A = 2i to B = −√3/2 + 5i/2 and the arc; the triangle with vertices 3i, A, B,
// whose sides are two radii (1) and the chord AB = |B − A| = 1, so it is equilateral and the angle at
// the centre is θ = π/3; the sector of angle π/3; then take away the triangle. A toggle shows what
// θ = π/6 would mean: that sector doesn't even reach the ends of the chord, and the formula gives
// π/12 − 1/4 ≈ 0.012 instead of ≈ 0.091.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts, StepNav, Toggle, useSteps } from './kit'

type V = [number, number]
const S3 = Math.sqrt(3)
const O: V = [0, 3]
const A: V = [0, 2] // t = 2 along the ray: angle 3π/2 from the centre
const B: V = [-S3 / 2, 5 / 2] // t = 3 along the ray: angle 7π/6 from the centre
const Z4: V = [S3, 1]
const rayAt = (t: number): V => [S3 - (t * S3) / 2, 1 + t / 2]
const mid = (P: V, Q: V): V => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]

function arc(a: number, b: number, r = 1, n = 60): V[] {
  const pts: V[] = []
  for (let k = 0; k <= n; k++) {
    const t = a + ((b - a) * k) / n
    pts.push([O[0] + r * Math.cos(t), O[1] + r * Math.sin(t)])
  }
  return pts
}
const polarO = (r: number, a: number): V => [O[0] + r * Math.cos(a), O[1] + r * Math.sin(a)]

const TB = (7 * Math.PI) / 6
const TA = (3 * Math.PI) / 2
const TM = (4 * Math.PI) / 3
const SEGMENT = arc(TB, TA)
const SECTOR: V[] = [O, ...arc(TB, TA)]
const WRONG_SECTOR: V[] = [O, ...arc(TM - Math.PI / 12, TM + Math.PI / 12)]
const TRIANGLE: V[] = [O, A, B]

const SECTOR_AREA = Math.PI / 6
const TRI_AREA = S3 / 4
const SEG_AREA = SECTOR_AREA - TRI_AREA
const WRONG_AREA = 0.5 * (Math.PI / 6 - Math.sin(Math.PI / 6))

const STEPS = 4

export default function Segment() {
  const st = useSteps(STEPS)
  const [wrong, setWrong] = useState(false)
  const showWrong = wrong && st.step >= 2

  let notice
  if (showWrong) {
    notice = (
      <Notice tone="warn">
        <b>With <M>{'\\theta = \\tfrac{\\pi}{6}'}</M> the sector is too thin.</b> Its edges (red) stop short of A and B,
        so taking away a triangle can no longer leave the shaded sliver. <M>{'\\tfrac{\\pi}{6}'}</M> is an easy angle to
        grab here (<M>{'z_4 = 2\\operatorname{cis}\\left(\\tfrac{\\pi}{6}\\right)'}</M>, and the ray is{' '}
        <M>{'30^\\circ'}</M> above the negative real direction), but <M>\theta</M> must be the angle between the radii
        to the ends of the chord. The formula would give <M>{'\\tfrac{\\pi}{12}-\\tfrac14 \\approx 0.012'}</M>, about an
        eighth of the real answer.
      </Notice>
    )
  } else if (st.step === 0) {
    notice = (
      <Notice>
        <b>The piece we want</b> is the thin sliver on the far side of the ray from the centre <M>3i</M>. Solving the
        ray with the circle gives its ends, <M>A = 2i</M> and <M>{'B = -\\tfrac{\\sqrt3}{2} + \\tfrac52 i'}</M>. The
        sliver is not a sector (one edge is the chord <M>AB</M>, not two radii), so first we need the angle at the
        centre between the radii to <M>A</M> and <M>B</M>. Press Next.
      </Notice>
    )
  } else if (st.step === 1) {
    notice = (
      <Notice>
        <b>The triangle with vertices <M>3i</M>, A and B.</b> Two of its sides are radii, so they are 1. The third
        is the chord: <M>{'AB = \\left|-\\tfrac{\\sqrt3}{2}+\\tfrac12 i\\right| = 1'}</M>. All three sides are 1, so the
        triangle is equilateral and the angle at the centre is <M>{'\\theta = \\tfrac{\\pi}{3}'}</M>.
      </Notice>
    )
  } else if (st.step === 2) {
    notice = (
      <Notice>
        <b>The sector</b> with angle <M>{'\\tfrac{\\pi}{3}'}</M> is a sixth of the circle, so its area is{' '}
        <M>{'\\tfrac12 r^2\\theta = \\tfrac12(1)^2\\tfrac{\\pi}{3} = \\tfrac{\\pi}{6}'}</M>. It is the sliver plus the orange
        triangle. Turn on the toggle to see what <M>{'\\theta = \\tfrac{\\pi}{6}'}</M> would look like.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>Sector minus triangle.</b> The equilateral triangle has area{' '}
        <M>{'\\tfrac12(1)^2\\sin\\tfrac{\\pi}{3} = \\tfrac{\\sqrt3}{4}'}</M>, so the sliver is{' '}
        <M>{'\\tfrac{\\pi}{6}-\\tfrac{\\sqrt3}{4} \\approx 0.091'}</M>. That is about 3% of the whole circle (area{' '}
        <M>\pi</M>), which matches the thin piece in the picture.
      </Notice>
    )
  }

  const showTri = st.step >= 1 && !showWrong

  return (
    <div>
      <Plane x={[-1.8, 1.3]} y={[1.5, 4.2]} equalScale height={420} labels={false} xLabel="" yLabel="">
        <Label at={[0, 4.2]} attach="e" size={14} italic>
          Im(z)
        </Label>
        <Circle center={O} radius={1} color={C.ink} fillOpacity={0} weight={2} />

        {/* The target sliver: always visible; it is the answer being built. */}
        <Polygon points={SEGMENT} color={C.f} fillOpacity={st.step === 3 ? 0.6 : 0.4} weight={0} strokeOpacity={0} />

        {st.step >= 2 && !showWrong && <Polygon points={SECTOR} color={C.violet} fillOpacity={0.12} weight={2} />}
        {showTri && (
          <Polygon points={TRIANGLE} color={C.g} fillOpacity={st.step === 1 ? 0.3 : st.step === 3 ? 0.4 : 0.15} weight={2} />
        )}
        {showWrong && <Polygon points={WRONG_SECTOR} color={C.bad} fillOpacity={0.2} weight={2.5} />}

        {/* The two radii to the ends of the chord */}
        {showTri && <Line.Segment point1={O} point2={A} color={C.violet} weight={2.5} />}
        {showTri && <Line.Segment point1={O} point2={B} color={C.violet} weight={2.5} />}

        {/* Step 1: all three sides are 1 */}
        {st.step === 1 && (
          <>
            <Label at={mid(O, A)} color={C.violet} attach="e" size={13}>
              1
            </Label>
            <Label at={mid(O, B)} color={C.violet} attach="nw" size={13}>
              1
            </Label>
            <Label at={mid(A, B)} color={C.g} attach="ne" size={13} gap={10}>
              1
            </Label>
          </>
        )}

        {showTri && (
          <>
            <Polygon points={arc(TB, TA, 0.2, 24).concat([O])} color={C.violet} fillOpacity={0.4} weight={0} strokeOpacity={0} />
            <Label at={polarO(0.4, TM)} color={C.violet} attach="c" size={12}>
              π/3
            </Label>
          </>
        )}
        {showWrong && (
          <Label at={polarO(0.42, TM)} color={C.bad} attach="c" size={12}>
            π/6 ?
          </Label>
        )}

        {/* The ray Arg(z − z₄) = 5π/6, whose chord AB cuts off the sliver */}
        <Line.Segment point1={Z4} point2={rayAt(5)} color={C.ink} weight={2} />
        <Label at={rayAt(1.25)} attach="ne" size={12}>
          ray
        </Label>

        <Point x={O[0]} y={O[1]} color={C.violet} />
        <Point x={A[0]} y={A[1]} color={C.good} />
        <Point x={B[0]} y={B[1]} color={C.good} />
        <Label at={O} color={C.violet} attach="ne">
          3i
        </Label>
        <Label at={A} color={C.good} attach="sw">
          A (2i)
        </Label>
        <Label at={B} color={C.good} attach="sw">
          B
        </Label>
      </Plane>
      <Controls>
        <StepNav step={st.step} count={STEPS} onBack={st.back} onNext={st.next} />
        {st.step >= 2 && <Toggle label="Try θ = π/6 instead" checked={wrong} onChange={setWrong} />}
        <Readouts>
          {st.step >= 1 && (
            <Readout
              color={showWrong ? C.bad : C.violet}
              tex={showWrong ? '\\theta = \\tfrac{\\pi}{6}\\ \\text{(wrong)}' : '\\theta = \\tfrac{\\pi}{3}\\ \\text{(equilateral triangle)}'}
            />
          )}
          {st.step >= 2 && !showWrong && (
            <Readout color={C.violet} tex={`\\text{sector} = \\tfrac12(1)^2\\tfrac{\\pi}{3} \\approx ${SECTOR_AREA.toFixed(3)}`} />
          )}
          {st.step >= 3 && !showWrong && (
            <Readout color={C.g} tex={`\\text{triangle} = \\tfrac12(1)^2\\sin\\tfrac{\\pi}{3} \\approx ${TRI_AREA.toFixed(3)}`} />
          )}
          {st.step >= 3 && !showWrong && (
            <Readout color={C.f} tex={`\\text{segment} = \\tfrac{\\pi}{6}-\\tfrac{\\sqrt3}{4} \\approx ${SEG_AREA.toFixed(3)}`} />
          )}
          {showWrong && (
            <Readout color={C.bad} tex={`\\tfrac12(1)^2\\left(\\tfrac{\\pi}{6}-\\sin\\tfrac{\\pi}{6}\\right) \\approx ${WRONG_AREA.toFixed(3)}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
