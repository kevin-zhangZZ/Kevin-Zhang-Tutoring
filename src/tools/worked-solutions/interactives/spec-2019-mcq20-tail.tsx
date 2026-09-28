// 2019 Specialist Exam 2 MCQ 20 — the p value is a tail area under the H₀ curve for the sample
// mean. Assuming H₀ (μ = 0.5), the mean of 100 random numbers is approximately N(0.5, 0.02887²);
// the shaded left tail (H₁ is μ < 0.5) is the chance a working calculator gives a sample mean at
// or below x̄. Slide x̄: at 0.4725 the tail is 0.1704 (option B); it drops below 0.05 only once x̄
// is under about 0.4525. The toggle uses σ = 0.2887 as the spread of x̄ (option C's slip): the
// curve is almost flat and the tail left of 0.4725 becomes 0.4621, most of it off the left edge.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const MU = 0.5
const SIGMA = 0.2887
const SE = SIGMA / Math.sqrt(100)
const X_MIN = 0.3
const X_MAX = 0.7

/** Standard normal CDF via erf (Abramowitz & Stegun 7.1.26, absolute error below 1.5e-7). */
function Phi(z: number): number {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const erf = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)
  return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf)
}

const pdfWith = (sd: number) => (x: number) => Math.exp(-((x - MU) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI))
const pdfRight = pdfWith(SE)
const pdfWrong = pdfWith(SIGMA)

export default function Tail() {
  const [xbar, setXbar] = useState(0.4725)
  const [wrong, setWrong] = useState(false)

  const x = Math.round(xbar * 10000) / 10000
  const sd = wrong ? SIGMA : SE
  const pdf = wrong ? pdfWrong : pdfRight
  const z = (x - MU) / sd
  const p = Phi(z)
  const atExam = Math.abs(x - 0.4725) < 1e-9
  const tailColor = wrong ? C.bad : C.g

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{'\\sigma=0.2887'}</M> is the spread of <b>single</b> random numbers, which are scattered evenly from{' '}
        <M>0</M> to <M>1</M>. With it the curve is nearly flat and the tail left of <M>{`${x.toFixed(4)}`}</M> is{' '}
        <M>{`${p.toFixed(4)}`}</M>
        {atExam ? <>, option <b>C</b></> : null} (most of it runs off the left edge). But <M>{'\\overline{x}'}</M> is
        the mean of <M>100</M> numbers, and averages vary far less: their spread is{' '}
        <M>{'\\tfrac{0.2887}{\\sqrt{100}}=0.02887'}</M>, ten times smaller. Turn the toggle off.
      </Notice>
    )
  } else if (atExam) {
    notice = (
      <Notice tone="good">
        Assume <M>{'H_0'}</M>: a working calculator&apos;s sample means pile up around <M>0.5</M> with standard
        deviation <M>0.02887</M>. <M>{'H_1:\\mu<0.5'}</M> points left, so the p value is the shaded left tail: the
        chance of a mean of <M>0.4725</M> <b>or less</b>. It is <M>0.1704</M> (option <b>B</b>): about one sample
        in six from a perfectly good calculator is this low. Drag <M>{'\\overline{x}'}</M> down to see how low it
        must be before <M>p</M> drops below <M>0.05</M>, then try the toggle.
      </Notice>
    )
  } else if (p < 0.05) {
    notice = (
      <Notice tone="good">
        Now <M>{`p\\approx${p.toFixed(4)}`}</M>, below <M>0.05</M>: fewer than <M>{'5\\%'}</M> of samples from a
        working calculator have a mean this low, so this would be evidence against <M>{'H_0'}</M>. The cut-off is
        about <M>0.4525</M>, which is <M>1.645</M> standard deviations below <M>0.5</M>. The real sample,{' '}
        <M>0.4725</M>, is only <M>0.95</M> standard deviations below. Slide back to it.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The further <M>{'\\overline{x}'}</M> sits below <M>0.5</M>, the thinner the tail and the stronger the
        evidence that the calculator is faulty. Here <M>{`z\\approx${z.toFixed(2)}`}</M> and{' '}
        <M>{`p\\approx${p.toFixed(4)}`}</M>. Keep going until <M>p</M> falls below <M>0.05</M>, or slide to the
        exam&apos;s <M>0.4725</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[X_MIN, X_MAX]}
        y={[0, 15]}
        xStep={0.1}
        yStep={5}
        height={300}
        xLabel="x̄"
        yLabel=""
        xLabels={v => (v > 0.65 ? '' : v.toFixed(1))}
        yLabels={false}
      >
        <Region top={pdf} bottom={() => 0} from={X_MIN} to={x} color={tailColor} opacity={0.5} />
        {wrong && <Plot.OfX y={pdfRight} domain={[X_MIN, X_MAX]} color={C.guide} style="dashed" weight={2} />}
        <Plot.OfX y={pdf} domain={[X_MIN, X_MAX]} color={wrong ? C.bad : C.f} weight={3} />
        <Line.Segment point1={[x, 0]} point2={[x, 14.4]} color={C.ink} style="dashed" weight={2} />
        <Label at={[x, 14.4]} attach="w" color={C.ink}>{`x̄ = ${x.toFixed(4)}`}</Label>
        <Label at={[MU, pdfRight(MU)]} attach="e" color={wrong ? C.guide : C.f}>μ = 0.5 (H₀)</Label>
        <Label at={[x - 0.003, wrong ? 0.55 : 1.0]} attach="w" color={tailColor} size={15}>p</Label>
      </Plane>
      <Controls>
        <Slider
          label="\overline{x}"
          value={xbar}
          onChange={setXbar}
          min={0.42}
          max={0.5}
          step={0.0025}
          format={v => v.toFixed(4)}
        />
        <Toggle label="Use σ = 0.2887 as the spread of x̄ (option C)" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout
            tex={wrong ? '\\text{sd} = 0.2887' : '\\text{sd}(\\overline{X}) = \\tfrac{0.2887}{\\sqrt{100}} = 0.02887'}
          />
          <Readout tex={`z = \\tfrac{${x.toFixed(4)} - 0.5}{${wrong ? '0.2887' : '0.02887'}} \\approx ${z.toFixed(4)}`} />
          <Readout color={tailColor} tex={`p = \\Pr(\\overline{X} \\le ${x.toFixed(4)}) \\approx ${p.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
