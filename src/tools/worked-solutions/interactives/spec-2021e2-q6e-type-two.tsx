// 2021 Specialist Exam 2 Q6e — a Type II error needs TWO curves. The cut-off is set by H₀:
// X̄ ~ N(60 000, (5000/√14)²) (blue), the 95th percentile at the 5% level, 62 198.03. But the
// sales really come from μ = 63 000 (orange), and H₀ is wrongly accepted when x̄ lands left of
// the cut-off: the orange area, 0.274. Slide the significance level α: at 1% the cut-off is part
// d's 63 108.71 and the Type II probability rises to 0.532; a bigger α shrinks it. Values checked
// in scipy (α = 0.5%, 1%, 5%, 10%, 20% give 0.630, 0.532, 0.274, 0.168, 0.080).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider } from './kit'

const MU0 = 60000
const MU1 = 63000
const SE = 5000 / Math.sqrt(14) // 1336.31
const X0 = 55500
const X1 = 67500
const PEAK = 1 / (SE * Math.sqrt(2 * Math.PI))
const YTOP = PEAK * 1.25

// Numerical Recipes erfc (relative error under 1.2e-7).
function erfc(x: number) {
  const z = Math.abs(x)
  const t = 1 / (1 + 0.5 * z)
  const r =
    t *
    Math.exp(
      -z * z - 1.26551223 +
        t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
    )
  return x >= 0 ? r : 2 - r
}
const cdf = (x: number, mu: number) => 0.5 * erfc(-(x - mu) / (SE * Math.SQRT2))
// invNorm(1 − α, 60000, SE) by bisection: the cut-off with α of the H₀ curve to its right.
function cutOff(alpha: number) {
  let lo = MU0
  let hi = MU0 + 10 * SE
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2
    if (1 - cdf(mid, MU0) > alpha) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}
const pdf = (mu: number) => (x: number) => PEAK * Math.exp(-0.5 * ((x - mu) / SE) ** 2)
const h0 = pdf(MU0)
const h1 = pdf(MU1)
const thousands = (v: number, dp = 0) => {
  const [i, d] = v.toFixed(dp).split('.')
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (d ? `.${d}` : '')
}
const tex = (s: string) => s.replace(/ /g, '\\,')

export default function TypeTwo() {
  const [pct, setPct] = useState(5)

  const alpha = pct / 100
  const c = cutOff(alpha)
  const beta = cdf(c, MU1)
  const at5 = Math.abs(pct - 5) < 0.01
  const at1 = Math.abs(pct - 1) < 0.01

  let notice
  if (at5) {
    notice = (
      <Notice tone="good">
        <b>Step 1, on the blue curve (<M>{'H_0'}</M>):</b> at the 5% level the cut-off is its 95th percentile,{' '}
        <M>{'62\\,198.03'}</M>, because &ldquo;reject&rdquo; is decided assuming <M>{'H_0'}</M>.{' '}
        <b>Step 2, on the orange curve:</b> sales really have <M>{'\\mu = 63\\,000'}</M>, and <M>{'H_0'}</M> is wrongly
        accepted whenever <M>{'\\bar x'}</M> falls left of the cut-off. That orange area is <M>0.274</M>. Now slide{' '}
        <M>\alpha</M> to 1%.
      </Notice>
    )
  } else if (at1) {
    notice = (
      <Notice tone="warn">
        At the 1% level the cut-off moves out to <M>{'63\\,108.7'}</M>, part d&apos;s critical value, which is past the
        true mean. Now more than half the orange curve is left of it: a real rise to 63 000 would be missed about 53% of
        the time. The question uses 5%, so slide back.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        {pct < 5 ? 'A smaller' : 'A bigger'} <M>\alpha</M> moves the cut-off {pct < 5 ? 'right' : 'left'}, so the orange
        area {pct < 5 ? 'grows' : 'shrinks'}: with 14 days of data, making one error rarer makes the other more likely.
        The cut-off always comes from the blue curve; the Type II probability is always read off the orange one. Slide
        back to 5%.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[X0, X1]}
        y={[0, YTOP]}
        xStep={2000}
        yStep={1}
        xLabel=""
        yLabel=""
        yLabels={false}
        xLabels={v => (v >= 56000 && v <= 66000 ? thousands(v) : '')}
        height={300}
      >
        <Region top={h1} bottom={() => 0} from={X0} to={c} color={C.g} opacity={0.4} />
        <Region top={h0} bottom={() => 0} from={c} to={X1} color={C.f} opacity={0.55} />
        <Plot.OfX y={h0} domain={[X0, X1]} color={C.f} weight={3} />
        <Plot.OfX y={h1} domain={[X0, X1]} color={C.g} weight={3} />
        <Label at={[MU0, PEAK]} attach="nw" color={C.f} size={12}>H₀: μ = 60 000</Label>
        <Label at={[MU1, PEAK]} attach="ne" color={C.g} size={12}>true: μ = 63 000</Label>
        <Line.Segment point1={[c, 0]} point2={[c, PEAK * 1.18]} color={C.violet} style="dashed" weight={2} />
        <Label at={[c, PEAK * 1.18]} attach={c > 64500 ? 'w' : 'e'} color={C.violet} size={12}>{`cut-off ${thousands(c, at5 || at1 ? 2 : 0)}`}</Label>
        <Label at={[c - 0.75 * SE, PEAK * 0.12]} attach="w" color={C.g} size={12}>{`Type II ${beta.toFixed(3)}`}</Label>
      </Plane>
      <Controls>
        <Slider label="\alpha" value={pct} onChange={setPct} min={0.5} max={20} step={0.5} format={v => `${v.toFixed(1)}%`} />
        <Buttons>
          <ActionButton label="5% (this question)" onClick={() => setPct(5)} />
          <ActionButton label="1% (part d)" onClick={() => setPct(1)} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`\\text{cut-off} = \\operatorname{invNorm}(${(1 - alpha).toFixed(3).replace(/0+$/, '')},\\ 60\\,000,\\ \\tfrac{5000}{\\sqrt{14}}) \\approx ${tex(thousands(c, 2))}`} />
          <Readout color={C.f} tex={`\\Pr(\\bar X > \\text{cut-off} \\mid \\mu = 60\\,000) = ${(alpha).toFixed(3).replace(/0+$/, '')}`} />
          <Readout color={C.g} tex={`\\Pr(\\bar X < \\text{cut-off} \\mid \\mu = 63\\,000) \\approx ${beta.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
