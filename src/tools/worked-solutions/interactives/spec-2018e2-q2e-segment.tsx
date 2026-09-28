// 2018 Specialist Exam 2 Q2e — the minor segment cut off the circle |z − (1 + 2i)| = 2 by the
// line Re(z) = 2, built up the way a teacher would on the board: the sliver itself; join the
// centre to the ends of the chord and drop the perpendicular, which makes the 1 : √3 : 2
// triangle (so the HALF-angle is π/3 and the angle at the centre is 2π/3); the sector of angle
// 2π/3; then take away the isosceles triangle. A toggle shows the common slip of using π/3 as
// the sector angle: that sector doesn't even reach the ends of the chord.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts, StepNav, Toggle, useSteps } from './kit'

type V = [number, number]
const O: V = [1, 2]
const R = 2
const S3 = Math.sqrt(3)
const TOP: V = [2, 2 + S3]
const BOT: V = [2, 2 - S3]
const FOOT: V = [2, 2]

function arc(a: number, b: number, r = R, n = 80): V[] {
  const pts: V[] = []
  for (let k = 0; k <= n; k++) {
    const t = a + ((b - a) * k) / n
    pts.push([O[0] + r * Math.cos(t), O[1] + r * Math.sin(t)])
  }
  return pts
}

const SEGMENT = arc(-Math.PI / 3, Math.PI / 3)
const SECTOR: V[] = [O, ...arc(-Math.PI / 3, Math.PI / 3)]
const WRONG_SECTOR: V[] = [O, ...arc(-Math.PI / 6, Math.PI / 6)]
const TRIANGLE: V[] = [O, BOT, TOP]
const RIGHT_TRI: V[] = [O, FOOT, TOP]

const SECTOR_AREA = (4 * Math.PI) / 3
const TRI_AREA = S3
const SEG_AREA = SECTOR_AREA - TRI_AREA
const WRONG_AREA = 2 * (Math.PI / 3 - Math.sin(Math.PI / 3))

const STEPS = 4

export default function Segment() {
  const s = useSteps(STEPS)
  const [wrong, setWrong] = useState(false)
  const showWrong = wrong && s.step >= 2

  let notice
  if (showWrong) {
    notice = (
      <Notice tone="warn">
        <b>With <M>{'\\theta = \\tfrac{\\pi}{3}'}</M> the sector is too thin.</b> Its edges (red) stop well short
        of the ends of the chord, so &ldquo;sector minus triangle&rdquo; no longer leaves the shaded sliver. The{' '}
        <M>{'\\tfrac{\\pi}{3}'}</M> from the right-angled triangle is only <em>half</em> the angle at the
        centre. The formula would give <M>{'\\tfrac{2\\pi}{3}-\\sqrt3 \\approx 0.362'}</M>, a seventh of the real answer.
      </Notice>
    )
  } else if (s.step === 0) {
    notice = (
      <Notice>
        <b>The piece we want</b> is the thin sliver to the right of <M>{'\\operatorname{Re}(z)=2'}</M>. It is not a
        sector (its straight edge is a chord, not two radii), so there&apos;s no direct formula for it yet. Press Next
        to join the centre to the ends of the chord.
      </Notice>
    )
  } else if (s.step === 1) {
    notice = (
      <Notice>
        <b>The right-angled triangle.</b> The perpendicular from the centre to the line is <M>2-1=1</M> long, the
        radius is <M>2</M>, so the half-chord is <M>{'\\sqrt{2^2-1^2}=\\sqrt3'}</M>. Sides <M>{'1:\\sqrt3:2'}</M> make
        the exact-value triangle: the angle <M>{'\\alpha'}</M> at the centre has <M>{'\\cos\\alpha=\\tfrac12'}</M>, so <M>{'\\alpha=\\tfrac{\\pi}{3}'}</M>. But this
        is only the top half. The angle at the centre is <M>{'\\theta = 2\\alpha = \\tfrac{2\\pi}{3}'}</M>.
      </Notice>
    )
  } else if (s.step === 2) {
    notice = (
      <Notice>
        <b>The sector</b> with angle <M>{'\\tfrac{2\\pi}{3}'}</M> is a third of the circle, so its area is{' '}
        <M>{'\\tfrac13\\times4\\pi = \\tfrac12 r^2\\theta = \\tfrac{4\\pi}{3}'}</M>. It is the sliver plus the orange
        triangle. Turn on the toggle to see what happens with <M>{'\\theta=\\tfrac{\\pi}{3}'}</M> instead.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>Sector minus triangle.</b> The triangle has base <M>{'2\\sqrt3'}</M> (the chord) and height <M>1</M>, so
        its area is <M>{'\\sqrt3'}</M>, the same as <M>{'\\tfrac12 r^2\\sin\\theta'}</M>. The sliver is{' '}
        <M>{'\\tfrac{4\\pi}{3}-\\sqrt3\\approx 2.46'}</M>, about a fifth of the circle, which matches the picture.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1, 4]} y={[-0.5, 4.5]} equalScale height={380} xLabel="" yLabel="Im">
        <Label at={[4, 0]} attach="n" size={14} italic>Re</Label>
        <Circle center={O} radius={R} color={C.ink} fillOpacity={0} weight={2} />
        <Line.Segment point1={[2, -0.5]} point2={[2, 4.5]} color={C.guide} weight={1.5} style="dashed" />

        {/* The target sliver: always visible; it is the answer being built. */}
        <Polygon points={SEGMENT} color={C.f} fillOpacity={s.step === 3 ? 0.55 : 0.35} weight={0} strokeOpacity={0} />

        {s.step >= 2 && !showWrong && (
          <Polygon points={SECTOR} color={C.violet} fillOpacity={0.12} weight={2} />
        )}
        {s.step >= 2 && !showWrong && (
          <Polygon points={TRIANGLE} color={C.g} fillOpacity={s.step === 3 ? 0.4 : 0.15} weight={2} />
        )}
        {showWrong && <Polygon points={WRONG_SECTOR} color={C.bad} fillOpacity={0.2} weight={2.5} />}

        {s.step === 1 && (
          <>
            <Polygon points={RIGHT_TRI} color={C.g} fillOpacity={0.3} weight={2.5} />
            <Polygon points={arc(0, Math.PI / 3, 0.4, 20).concat([O])} color={C.violet} fillOpacity={0.35} weight={0} strokeOpacity={0} />
            <Label at={[1.5, 2]} color={C.g} attach="s">1</Label>
            <Label at={[2, 2 + S3 / 2]} color={C.g} attach="e">√3</Label>
            <Label at={[1.5, 2 + S3 / 2]} color={C.g} attach="nw">2</Label>
            <Label at={[O[0] + 0.45 * Math.cos(Math.PI / 6), O[1] + 0.45 * Math.sin(Math.PI / 6)]} color={C.violet} attach="e" size={12}>π/3</Label>
          </>
        )}
        {s.step >= 1 && !showWrong && (
          <>
            <Line.Segment point1={O} point2={TOP} color={C.violet} weight={2.5} />
            <Line.Segment point1={O} point2={BOT} color={C.violet} weight={2.5} />
          </>
        )}
        {s.step >= 2 && !showWrong && (
          <>
            <Polygon points={arc(-Math.PI / 3, Math.PI / 3, 0.25, 24).concat([O])} color={C.violet} fillOpacity={0.4} weight={0} strokeOpacity={0} />
            <Label at={[O[0] + 0.55, O[1]]} color={C.violet} attach="c" size={12}>2π/3</Label>
          </>
        )}
        {showWrong && <Label at={[O[0] + 0.5, O[1]]} color={C.bad} attach="c" size={12}>π/3 ?</Label>}

        <Point x={O[0]} y={O[1]} color={C.violet} />
        <Point x={TOP[0]} y={TOP[1]} color={C.good} />
        <Point x={BOT[0]} y={BOT[1]} color={C.good} />
        <Label at={TOP} color={C.good} attach="ne">(2, 2 + √3)</Label>
        <Label at={BOT} color={C.good} attach="e" gap={10}>(2, 2 − √3)</Label>
      </Plane>
      <Controls>
        <StepNav step={s.step} count={STEPS} onBack={s.back} onNext={s.next} />
        {s.step >= 2 && <Toggle label="Use θ = π/3 instead (common slip)" checked={wrong} onChange={setWrong} />}
        <Readouts>
          {s.step >= 1 && <Readout color={C.violet} tex={showWrong ? '\\theta = \\tfrac{\\pi}{3}\\ \\text{(wrong)}' : '\\theta = 2\\times\\tfrac{\\pi}{3} = \\tfrac{2\\pi}{3}'} />}
          {s.step >= 2 && !showWrong && <Readout color={C.violet} tex={`\\text{sector} = \\tfrac12(2)^2\\tfrac{2\\pi}{3} \\approx ${SECTOR_AREA.toFixed(3)}`} />}
          {s.step >= 3 && !showWrong && <Readout color={C.g} tex={`\\text{triangle} = \\tfrac12(2)^2\\sin\\tfrac{2\\pi}{3} \\approx ${TRI_AREA.toFixed(3)}`} />}
          {s.step >= 3 && !showWrong && <Readout color={C.f} tex={`\\text{segment} = \\tfrac{4\\pi}{3}-\\sqrt3 \\approx ${SEG_AREA.toFixed(3)}`} />}
          {showWrong && <Readout color={C.bad} tex={`\\tfrac12(2)^2\\left(\\tfrac{\\pi}{3}-\\sin\\tfrac{\\pi}{3}\\right) \\approx ${WRONG_AREA.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
