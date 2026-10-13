// 2015 Specialist Exam 2 Q2b.i — the roots of z² − 4cos(α)z + 4 = 0 are 2cos(α) ± 2i sin(α), and
// however α moves (0 < α < π/2) they stay on the circle |z| = 2, at angles ±α: that is 2cis(±α).
// The discriminant 16cos²(α) − 16 = −16sin²(α) is negative throughout, so the roots are always a
// conjugate pair (mirror images in the real axis). A toggle adds the 2√2cis(±α) points the report
// says some students wrote: they sit on a circle of radius 2√2 ≈ 2.83 and never meet the roots.
// α moves in steps of π/72; readouts checked with sympy (|2cos α + 2i sin α| = 2).

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const N = 72
const R2 = 2 * Math.SQRT2

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}
/** kπ/72 in lowest terms, as plain text for the slider. */
function fracText(k: number): string {
  const g = gcd(k, N)
  const n = k / g
  const d = N / g
  return `${n === 1 ? '' : n}π${d === 1 ? '' : `/${d}`}`
}

export default function RootsCircle() {
  const [k, setK] = useState(24)
  const [wrong, setWrong] = useState(false)

  const a = (k * Math.PI) / N
  const re = 2 * Math.cos(a)
  const im = 2 * Math.sin(a)
  const disc = 16 * Math.cos(a) ** 2 - 16

  return (
    <div>
      <Plane x={[-3.2, 3.2]} y={[-3.2, 3.2]} equalScale height={380} xLabel="" yLabel="Im">
        <Label at={[3.2, 0]} attach="nw" size={14} italic>Re</Label>
        <Circle center={[0, 0]} radius={2} color={C.guide} fillOpacity={0} strokeStyle="dashed" weight={1.5} />
        {wrong && <Circle center={[0, 0]} radius={R2} color={C.bad} fillOpacity={0} strokeStyle="dashed" weight={1.5} />}
        <Line.Segment point1={[0, 0]} point2={[re, im]} color={C.f} weight={2} />
        <Line.Segment point1={[0, 0]} point2={[re, -im]} color={C.g} weight={2} />
        <Line.Segment point1={[re, im]} point2={[re, -im]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.Parametric xy={t => [0.55 * Math.cos(t), 0.55 * Math.sin(t)]} domain={[0, a]} color={C.f} weight={2} />
        <Label at={[0.55 * Math.cos(a / 2), 0.55 * Math.sin(a / 2)]} color={C.f} attach="ne" size={13} italic>α</Label>
        <Point x={re} y={im} color={C.f} />
        <Point x={re} y={-im} color={C.g} />
        <Label at={[re, im]} color={C.f} attach="ne" size={14}>z₁</Label>
        <Label at={[re, -im]} color={C.g} attach="se" size={14}>z₂</Label>
        <Label at={[0, 2]} color={C.guide} attach="nw" size={12}>|z| = 2</Label>
        {wrong && (
          <>
            <Point x={R2 * Math.cos(a)} y={R2 * Math.sin(a)} color={C.bad} />
            <Point x={R2 * Math.cos(a)} y={-R2 * Math.sin(a)} color={C.bad} />
            <Label at={[-2, -2]} color={C.bad} attach="sw" size={12}>|z| = 2√2</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="\alpha" value={k} onChange={setK} min={1} max={N / 2 - 1} step={1} format={fracText} />
        <Toggle label="Show 2√2 cis(±α)" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout tex={`\\Delta = 16\\cos^2\\alpha - 16 = ${num(disc)}`} />
          <Readout color={C.f} tex={`z = ${num(re)} \\pm ${num(im)}i`} />
          <Readout tex={`|z| = \\sqrt{${num(re)}^2 + ${num(im)}^2} = ${num(Math.hypot(re, im))}`} />
        </Readouts>
        {wrong ? (
          <Notice tone="warn">
            <b>The red points never land on the roots.</b> <M>{'2\\sqrt2\\,\\mathrm{cis}(\\pm\\alpha)'}</M> sits on the red circle of
            radius <M>{'2\\sqrt2 \\approx 2.83'}</M>, while the true roots stay on radius 2 whatever <M>\alpha</M> is: the modulus is 2.
          </Notice>
        ) : (
          <Notice>
            <b>The discriminant is negative for every allowed <M>\alpha</M></b>, so the roots
            are a conjugate pair <M>{'2\\cos\\alpha \\pm 2i\\sin\\alpha'}</M>, mirror images in the real axis. Slide{' '}
            <M>\alpha</M>: they move, but always on the dashed circle of radius 2, at angles <M>\pm\alpha</M>. That is
            exactly <M>{'2\\,\\mathrm{cis}(\\pm\\alpha)'}</M>. Then turn on the toggle to see the wrong modulus.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
