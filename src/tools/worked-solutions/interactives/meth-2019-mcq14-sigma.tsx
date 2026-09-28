// 2019 Methods Exam 2 MCQ 14 — X ~ N(200, σ²) and Pr(X > 190) = 0.97. Slide σ (or jump to each
// option's value): a narrower bell puts 190 more standard deviations below the mean, so more of the
// area sits above 190. The shaded area is exactly 0.97 only at σ ≈ 5.317, where 190 is 1.8808
// standard deviations below 200 — the z-value invNorm(0.03). Every other option's σ gives the wrong
// area, shown live.
import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider,
} from './kit'

const MU = 200
const X0 = 190
const SIGMA = 5.316904500664282 // −10 / invNorm(0.03)

// Abramowitz & Stegun 7.1.26 (|error| < 1.5e-7) — plenty for 3 d.p. readouts.
function erf(x: number) {
  const s = Math.sign(x)
  const a = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const Phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2))

const OPTIONS: [string, number][] = [
  ['A', 3.3],
  ['B', 5.3],
  ['C', 6.1],
  ['D', 9.4],
  ['E', 12.1],
]

export default function Sigma() {
  const [sigma, setSigma] = useState(8)
  const pdf = (x: number) => Math.exp(-((x - MU) ** 2) / (2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI))
  const z = (X0 - MU) / sigma
  const upper = 1 - Phi(z)
  const lower = 1 - upper
  const hit = Math.abs(upper - 0.97) < 0.0006
  const opt = OPTIONS.find(([, v]) => Math.abs(v - sigma) < 0.005)
  const areaColor = hit ? C.good : C.f
  const yTop = 0.13

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <b>97% of the area is above 190</b> (to 3 d.p.). That needs 190 to sit exactly as many standard
        deviations below the mean as the <M>z</M>-value with 3% of the standard normal below it:{' '}
        <M>{'\\operatorname{invNorm}(0.03)\\approx -1.8808'}</M>. So <M>{'\\tfrac{10}{\\sigma} = 1.8808'}</M>, giving{' '}
        <M>{'\\sigma \\approx 5.317 \\approx 5.3'}</M>, option <b>B</b>.
      </Notice>
    )
  } else if (upper > 0.97) {
    notice = (
      <Notice>
        <b>Too narrow{opt ? ` (option ${opt[0]})` : ''}.</b> With <M>{`\\sigma = ${sigma.toFixed(2)}`}</M>, the
        gap of 10 g is <M>{`${(-z).toFixed(2)}`}</M> standard deviations, so only{' '}
        <M>{`${(lower * 100).toFixed(1)}\\%`}</M> of packets are lighter than 190 g, fewer than 3%. Increase{' '}
        <M>\sigma</M> to spread the bell and push more area past 190.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>Too spread out{opt ? ` (option ${opt[0]})` : ''}.</b> With <M>{`\\sigma = ${sigma.toFixed(2)}`}</M>, the
        gap of 10 g is only <M>{`${(-z).toFixed(2)}`}</M> standard deviations, so{' '}
        <M>{`${(lower * 100).toFixed(1)}\\%`}</M> of packets are lighter than 190 g, more than 3%. Decrease{' '}
        <M>\sigma</M> until the red tail holds exactly 3%.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[165, 235]} y={[0, yTop]} xStep={10} yStep={0.02} height={300} yLabels={false} yLabel="" xLabels={v => (v < 168 || v > 232 ? "" : String(v))}>
        <Region top={pdf} bottom={() => 0} from={165} to={X0} color={C.bad} opacity={0.35} />
        <Region top={pdf} bottom={() => 0} from={X0} to={235} color={areaColor} opacity={0.3} />
        <Plot.OfX y={pdf} domain={[165, 235]} color={C.ink} weight={2.5} />
        <Line.Segment point1={[X0, 0]} point2={[X0, yTop]} color={C.bad} style="dashed" weight={2} />
        <Line.Segment point1={[MU, 0]} point2={[MU, yTop]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[MU, yTop]} color={C.guide} attach="e" size={12}>μ = 200</Label>
        <Label at={[X0, yTop]} color={C.bad} attach="w" size={12}>190</Label>
        <Label at={[MU + 0.8 * sigma, pdf(MU + 0.8 * sigma) * 0.4]} color={areaColor} attach="c" size={13}>
          {upper.toFixed(3)}
        </Label>
        <Label at={[X0 - 2, pdf(X0 - 2) + 0.004]} color={C.bad} attach="nw" size={12}>
          {lower.toFixed(3)}
        </Label>
      </Plane>
      <Controls>
        <Slider label="\sigma" value={sigma} onChange={setSigma} min={3.1} max={13} step={0.01} format={v => v.toFixed(2)} />
        <Buttons>
          {OPTIONS.map(([l, v]) => (
            <ActionButton key={l} label={`${l}: ${v}`} onClick={() => setSigma(v)} />
          ))}
          <ActionButton label="Exact σ" onClick={() => setSigma(Math.round(SIGMA * 100) / 100)} />
        </Buttons>
        <Readouts>
          <Readout color={areaColor} tex={`\\Pr(X > 190) \\approx ${upper.toFixed(3)}`} />
          <Readout color={C.bad} tex={`z = \\dfrac{190-200}{\\sigma} \\approx ${z.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
