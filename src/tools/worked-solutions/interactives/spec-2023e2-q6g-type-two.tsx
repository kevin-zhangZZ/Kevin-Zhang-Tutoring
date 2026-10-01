// 2023 Specialist Exam 2 Q6g — a Type II error needs TWO curves. The cut-off comes from H₀:
// X̄ ~ N(12, (1/√40)²) (blue), whose 1st percentile is part f's 11.632. But the masses really come
// from μ = 11.4 (orange), and H₀ is wrongly kept when x̄ lands right of the cut-off: the orange
// area, 0.071. Two buttons shade the tempting wrong areas: the same side under H₀'s curve (0.990,
// the chance of correctly keeping a true H₀) and the other side under the true curve (0.929, the
// chance of correctly rejecting). The correct picture is also what the invalidated part h asked
// for. Values checked in scipy (0.07100, 0.99000, 0.92900).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Toggle } from './kit'

const MU0 = 12
const MU1 = 11.4
const SE = 1 / Math.sqrt(40) // 0.15811
const X0 = 10.8
const X1 = 12.6
const PEAK = 1 / (SE * Math.sqrt(2 * Math.PI))

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
// invNorm(0.01, 12, 1/√40) by bisection: the cut-off with 1% of the H₀ curve to its left.
function cutOff() {
  let lo = MU0 - 10 * SE
  let hi = MU0
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2
    if (cdf(mid, MU0) < 0.01) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}
const CUT = cutOff() // 11.632
const pdf = (mu: number) => (x: number) => PEAK * Math.exp(-0.5 * ((x - mu) / SE) ** 2)
const h0 = pdf(MU0)
const h1 = pdf(MU1)
const zero = () => 0

type Mode = 'right' | 'h0' | 'left'

export default function TypeTwo() {
  const [mode, setMode] = useState<Mode>('right')

  const beta = 1 - cdf(CUT, MU1)
  const keepTrue = 1 - cdf(CUT, MU0)
  const power = cdf(CUT, MU1)

  let notice
  if (mode === 'right') {
    notice = (
      <Notice tone="good">
        <b>Step 1, on the blue curve (<M>{'H_0'}</M>):</b> the 1% cut-off is part f.&apos;s <M>11.632</M>, so{' '}
        <M>{'H_0'}</M> is kept whenever <M>{'\\bar x \\ge 11.632'}</M>. <b>Step 2, on the orange curve:</b> the true
        mean is <M>11.4</M>, so <M>{'H_0'}</M> is false and keeping it is a Type II error. That orange area is about{' '}
        <M>0.071</M>. Try the other two buttons to see the two tempting wrong areas.
      </Notice>
    )
  } else if (mode === 'h0') {
    notice = (
      <Notice tone="warn">
        This red area is under <M>{'H_0'}</M>&apos;s curve: <M>{'0.990 = 1 - 0.01'}</M>, the chance of keeping{' '}
        <M>{'H_0'}</M> when <M>{'H_0'}</M> is true. That is a correct decision, not an error. A Type II error can only
        happen when <M>{'H_0'}</M> is false, so its probability must come from the true curve, centred at{' '}
        <M>11.4</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Left of <M>11.632</M> is where <M>{'H_0'}</M> is rejected. Under the true mean that happens with probability{' '}
        <M>0.929</M>: the test correctly detects that the mean is below 12. A Type II error is the opposite (keeping{' '}
        <M>{'H_0'}</M>), so it is <M>{'1 - 0.929 = 0.071'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[X0, X1]}
        y={[0, PEAK * 1.4]}
        xStep={0.25}
        yStep={1}
        xLabel=""
        yLabel=""
        yLabels={false}
        xLabels={v => (Math.abs(2 * v - Math.round(2 * v)) < 1e-9 ? String(v) : '')}
        height={300}
      >
        {mode === 'right' && <Region top={h1} bottom={zero} from={CUT} to={X1} color={C.g} opacity={0.5} />}
        {mode === 'h0' && <Region top={h0} bottom={zero} from={CUT} to={X1} color={C.bad} opacity={0.3} />}
        {mode === 'left' && <Region top={h1} bottom={zero} from={X0} to={CUT} color={C.bad} opacity={0.3} />}
        <Plot.OfX y={h0} domain={[X0, X1]} color={C.f} weight={3} />
        <Plot.OfX y={h1} domain={[X0, X1]} color={C.g} weight={3} />
        <Label at={[MU0 + 1.2 * SE, h0(MU0 + 1.2 * SE)]} attach="e" color={C.f} size={12}>H₀: μ = 12</Label>
        <Label at={[MU1 - 1.2 * SE, h1(MU1 - 1.2 * SE)]} attach="w" color={C.g} size={12}>true: μ = 11.4</Label>
        <Line.Segment point1={[CUT, 0]} point2={[CUT, PEAK * 1.2]} color={C.violet} style="dashed" weight={2} />
        <Label at={[CUT, PEAK * 1.2]} attach="n" color={C.violet} size={12}>{`cut-off ${CUT.toFixed(3)}`}</Label>
        <Label at={[CUT, PEAK * 1.08]} attach="w" color={C.violet} size={12}>reject H₀</Label>
        <Label at={[CUT, PEAK * 1.08]} attach="e" color={C.violet} size={12}>keep H₀</Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Type II area" checked={mode === 'right'} onChange={() => setMode('right')} />
          <Toggle label="Use H₀'s curve?" checked={mode === 'h0'} onChange={() => setMode('h0')} />
          <Toggle label="Use the other side?" checked={mode === 'left'} onChange={() => setMode('left')} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`\\text{cut-off} = \\operatorname{invNorm}\\!\\left(0.01,\\ 12,\\ \\tfrac{1}{\\sqrt{40}}\\right) \\approx ${CUT.toFixed(3)}`} />
          {mode === 'right' && <Readout color={C.g} tex={`\\Pr(\\bar X \\ge 11.632 \\mid \\mu = 11.4) \\approx ${beta.toFixed(3)}`} />}
          {mode === 'h0' && <Readout color={C.bad} tex={`\\Pr(\\bar X \\ge 11.632 \\mid \\mu = 12) \\approx ${keepTrue.toFixed(3)}`} />}
          {mode === 'left' && <Readout color={C.bad} tex={`\\Pr(\\bar X < 11.632 \\mid \\mu = 11.4) \\approx ${power.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
