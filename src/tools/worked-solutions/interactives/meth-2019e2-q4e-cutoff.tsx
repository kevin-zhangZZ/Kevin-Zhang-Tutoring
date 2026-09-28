// 2019 Methods Exam 2 Q4e — "the smallest 5%" is the LEFT tail holding 5% of the area under the
// wingspan curve L ~ N(14.1, 2.1²). Slide the cut-off ℓ and read the tail area. It starts at the
// report's common wrong answer 9.9 = μ − 2σ, whose tail is only about 2.3%: the 95% rule puts 95%
// within two standard deviations, so the other 5% is split between BOTH tails. The cut-off with 5%
// in the left tail alone is invNorm(0.05, 14.1, 2.1) ≈ 10.6458, which is 1.645σ below the mean.
// A toggle draws the two-tailed 95% picture. Values checked in scipy.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

const MU = 14.1
const SIGMA = 2.1
const ANSWER = 10.645807383401907 // invNorm(0.05, 14.1, 2.1)
const pdf = (x: number) => Math.exp(-0.5 * ((x - MU) / SIGMA) ** 2) / (SIGMA * Math.sqrt(2 * Math.PI))
// Abramowitz & Stegun 7.1.26, good to about 1e-7.
function erf(z: number) {
  const s = Math.sign(z)
  const a = Math.abs(z)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const cdf = (x: number) => 0.5 * (1 + erf((x - MU) / (SIGMA * Math.SQRT2)))
const X0 = 6.5
const X1 = 21.7

export default function Cutoff() {
  const [l, setL] = useState(9.9)
  const [rule, setRule] = useState(false)

  const tail = cdf(l)
  const z = (l - MU) / SIGMA
  const atWrong = Math.abs(l - 9.9) < 0.03
  const atAnswer = Math.abs(l - ANSWER) < 0.03
  const colour = atAnswer ? C.good : atWrong ? C.bad : C.g
  const pct = (tail * 100).toFixed(1)

  let notice
  if (atAnswer) {
    notice = (
      <Notice tone="good">
        <b><M>{'\\ell \\approx 10.6'}</M>: exactly <M>5\%</M> of wingspans are smaller.</b> This is{' '}
        <M>{'\\operatorname{invNorm}(0.05,\\ 14.1,\\ 2.1) \\approx 10.6458'}</M>, which sits{' '}
        <M>1.645</M> standard deviations below the mean, not <M>2</M>. Any butterfly with a wingspan up to here is
        &ldquo;very small&rdquo;, so this is the greatest such wingspan.
      </Notice>
    )
  } else if (atWrong) {
    notice = (
      <Notice tone="warn">
        <b><M>{'\\ell = 9.9 = 14.1 - 2(2.1)'}</M></b>, two standard deviations below the mean, is the report&apos;s common
        wrong answer. The left tail here holds only about <M>2.3\%</M>, not <M>5\%</M>. Turn on the 95% rule to see
        why: its leftover <M>5\%</M> is shared between <em>both</em> tails. Now drag <M>\ell</M> right.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        About <M>{`${pct}\\%`}</M> of wingspans are below <M>{`\\ell = ${num(l, 2)}`}</M>:{' '}
        {tail < 0.05 ? 'too few, so move the cut-off right' : 'more than 5%, so move the cut-off left'}. You want the
        left tail alone to hold <M>5\%</M> of the area.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, 0.215]} xStep={2} yStep={1} xLabels={v => (v >= 8 && v <= 20 ? String(v) : "")} yLabels={false} xLabel="L" yLabel="" height={280}>
        {rule && (
          <>
            <Region top={pdf} bottom={() => 0} from={X0} to={MU - 2 * SIGMA} color={C.violet} opacity={0.35} />
            <Region top={pdf} bottom={() => 0} from={MU + 2 * SIGMA} to={X1} color={C.violet} opacity={0.35} />
            <Label at={[MU + 2 * SIGMA + 0.9, 0.028]} attach="n" color={C.violet} size={11}>≈ 2.3%</Label>
            <Label at={[MU, 0.06]} attach="c" color={C.violet} size={12}>95%</Label>
            <Line.Segment point1={[MU + 2 * SIGMA, 0]} point2={[MU + 2 * SIGMA, 0.1]} color={C.violet} style="dashed" weight={1.5} />
          </>
        )}
        <Region top={pdf} bottom={() => 0} from={X0} to={l} color={colour} opacity={0.45} />
        <Plot.OfX y={pdf} domain={[X0, X1]} color={C.f} weight={3} />
        <Line.Segment point1={[MU, 0]} point2={[MU, 0.2]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[MU, 0.2]} attach="ne" size={12} gap={4}>μ = 14.1</Label>
        <Line.Segment point1={[l, 0]} point2={[l, 0.2]} color={colour} style="dashed" weight={2} />
        <Label at={[l, 0.2]} attach="nw" color={colour} size={12} gap={4}>{`ℓ = ${num(l, 2)}`}</Label>
        <Label at={[l - 0.2, pdf(l) + 0.004]} attach="nw" color={colour} size={12}>{`${pct}%`}</Label>
      </Plane>
      <Controls>
        <Slider label="\ell" value={l} onChange={setL} min={8} max={14} step={0.05} />
        <Buttons>
          <Toggle label="Show the 95% rule" checked={rule} onChange={setRule} />
          <ActionButton label="invNorm(0.05, 14.1, 2.1)" onClick={() => setL(ANSWER)} />
          <ActionButton label="Back to 9.9" onClick={() => setL(9.9)} />
        </Buttons>
        <Readouts>
          <Readout color={colour} tex={`\\Pr(L < ${num(l, atAnswer ? 4 : 2)}) \\approx ${num(tail, 4)}`} />
          <Readout tex={`z = \\dfrac{\\ell - 14.1}{2.1} \\approx ${z.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
