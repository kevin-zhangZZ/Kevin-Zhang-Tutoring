// 2018 Methods Exam 2 Q4c.ii — a sample proportion can only take the values X/16. The bars are
// Bi(16, 0.1587) drawn at p̂ = 0, 1/16, 2/16, …; a movable cut-off p̂ = c colours the bars with
// p̂ > c. With c = 0.1 the cut falls between 1/16 = 0.0625 and 2/16 = 0.125, so P̂ > 0.1 ⇔ X ≥ 2 and
// the answer is 0.747 — and it stays 0.747 for any cut between those two bars. A toggle overlays
// the normal approximation N(0.1587, 0.1587·0.8413/16), whose area above 0.1 is 0.740 instead.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle,
} from './kit'

const N = 16
const P = 0.1587
const W = 1 / N

function choose(n: number, k: number) {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const PMF = Array.from({ length: N + 1 }, (_, k) => choose(N, k) * P ** k * (1 - P) ** (N - k))
const SD = Math.sqrt((P * (1 - P)) / N)
// Normal density for p̂, scaled by the bar width so its area over one bar matches a bar's probability.
const dens = (x: number) => (W * Math.exp(-(((x - P) / SD) ** 2) / 2)) / (SD * Math.sqrt(2 * Math.PI))

function normUpper(z: number) {
  // Pr(Z > z) via the complementary error function (Abramowitz–Stegun 7.1.26).
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const y = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-x * x)
  return z >= 0 ? y / 2 : 1 - y / 2
}

export default function PhatBars() {
  const [c, setC] = useState(0.1)
  const [normal, setNormal] = useState(false)

  const kMin = Math.floor(c * N + 1e-9) + 1 // smallest count with k/16 > c
  const exact = PMF.slice(kMin).reduce((a, b) => a + b, 0)
  const approx = normUpper((c - P) / SD)
  const between = c > 1 / 16 + 1e-9 && c < 2 / 16 - 1e-9

  let notice
  if (normal) {
    notice = (
      <Notice tone="warn">
        The violet curve is the <b>normal approximation</b>. It spreads probability smoothly over values{' '}
        <M>{'\\hat P'}</M> can never take, so its area above <M>{c.toFixed(3)}</M> is <M>{approx.toFixed(3)}</M>, not
        the exact <M>{exact.toFixed(3)}</M>. With only <M>16</M> people the count really is binomial: add up the bars.
      </Notice>
    )
  } else if (between) {
    notice = (
      <Notice tone="good">
        A sample of <M>16</M> can only give <M>{'\\hat P = 0, \\tfrac1{16}, \\tfrac2{16}, \\ldots'}</M>, so the bars
        sit at those values. The cut <M>{c.toFixed(3)}</M> falls between <M>{'\\tfrac1{16}=0.0625'}</M> and{' '}
        <M>{'\\tfrac2{16}=0.125'}</M>, so &ldquo;more than&rdquo; it means <b><M>{'X \\ge 2'}</M></b>. Slide the cut
        anywhere in that gap: the answer stays <M>0.747</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the cut is at <M>{c.toFixed(3)}</M>, so <M>{`\\hat P > ${c.toFixed(3)} \\iff X > ${(c * N).toFixed(2)} \\iff X \\ge ${kMin}`}</M>.
        The probability only jumps when the cut crosses a bar, because <M>{'\\hat P'}</M> jumps in steps of{' '}
        <M>{'\\tfrac1{16}'}</M>. Put it back on <M>0.1</M> for the question.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.05, 0.55]} y={[0, 0.32]} xStep={0.1} yStep={0.1} height={300} xLabel="p̂" yLabel="" xLabels={v => (v < 0 || v > 0.52 ? '' : v.toFixed(1))} yLabels={false}>
        {PMF.slice(0, 9).map((pr, k) => (
          <Polygon
            key={k}
            points={[[k * W - W * 0.35, 0], [k * W + W * 0.35, 0], [k * W + W * 0.35, pr], [k * W - W * 0.35, pr]]}
            color={k >= kMin ? C.good : C.guide}
            fillOpacity={k >= kMin ? 0.55 : 0.25}
            weight={1.5}
          />
        ))}
        {PMF.slice(0, 7).map((pr, k) => (
          <Label key={k} at={[k * W, pr]} attach={k === 0 ? 'ne' : 'n'} size={11} color={k >= kMin ? C.good : C.guide}>
            {`X=${k}`}
          </Label>
        ))}
        {normal && (
          <>
            <Region top={dens} bottom={() => 0} from={c} to={0.55} color={C.violet} opacity={0.25} />
            <Plot.OfX y={dens} domain={[-0.05, 0.55]} color={C.violet} weight={2.5} />
          </>
        )}
        <Line.Segment point1={[c, 0]} point2={[c, 0.32]} color={C.bad} style="dashed" weight={2} />
        <Label at={[c, 0.32]} attach="e" color={C.bad} size={12}>{`p̂ = ${c.toFixed(3)}`}</Label>
      </Plane>
      <Controls>
        <Slider label="\text{cut-off } c" value={c} onChange={setC} min={0} max={0.3} step={0.0025} format={v => v.toFixed(3)} />
        <Buttons>
          <Toggle label="Use the normal approximation instead" checked={normal} onChange={setNormal} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`\\Pr(\\hat P > ${c.toFixed(3)}) = \\Pr(X \\ge ${kMin}) = ${exact.toFixed(3)}`} />
          {normal && <Readout color={C.violet} tex={`\\text{normal approx.} \\approx ${approx.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
