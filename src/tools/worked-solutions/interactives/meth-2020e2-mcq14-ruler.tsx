// 2020 Methods Exam 2 MCQ 14 — X ~ N(2σ, σ²) drawn on the standard (z) scale, with the X scale as a
// ruler underneath: x = 2σ + σz. Because the mean is 2σ, the X value 0 always sits at z = −2, two
// standard deviations below the mean, whatever σ is; only the 5.2 mark moves, to z = 5.2/σ − 2.
// Pr(X > 5.2) = 0.9 needs 5.2 to cut off the bottom 10%, at z = invNorm(0.1) = −1.2816 (dashed
// green). Slide σ until the red 5.2 line meets it: σ = 5.2/(2 − 1.2816) ≈ 7.238, option A. The
// option buttons show the others: D (1.585) puts 5.2 at z = +1.28, above the mean, so only 10% is
// to its right; B (14.476) and E (3.169) are the means 2σ that go with A and D. Pr is computed
// from Φ (Abramowitz–Stegun 7.1.26, error < 2 × 10⁻⁷); the numbers match scipy's normal cdf.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

const Z_STAR = -1.2815515655446004 // invNorm(0.1)
const RY = -0.2 // height of the X ruler under the z axis
const ZMIN = -3.5
const ZMAX = 3.5

/** z tick numbers from −3 to 3 (±4 would be cut in half at the edges). */
const zTicks = (v: number) => (Math.abs(v) <= 3.01 ? String(Math.round(v)).replace('-', '−') : '')

const phi = (z: number) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI)

/** Standard normal cdf, from erf by Abramowitz & Stegun 7.1.26. */
function Phi(z: number): number {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const poly = ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t
  const erf = 1 - poly * Math.exp(-x * x)
  return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf)
}

const OPTIONS: { letter: string; sigma: number }[] = [
  { letter: 'A', sigma: 7.238 },
  { letter: 'B', sigma: 14.476 },
  { letter: 'C', sigma: 3.327 },
  { letter: 'D', sigma: 1.585 },
  { letter: 'E', sigma: 3.169 },
]

export default function Ruler() {
  const [sigma, setSigma] = useState(4)
  const mean = 2 * sigma
  const z5 = 5.2 / sigma - 2
  const p = 1 - Phi(z5)
  const hit = p.toFixed(3) === '0.900'
  const near = (v: number) => Math.abs(sigma - v) < 0.0005

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <b>Exactly 90% of the curve is right of 5.2.</b> The red line has met the dashed one: 5.2 is <M>1.28</M> standard deviations{' '}
        <i>below</i> the mean. On the ruler, 0 is <M>2</M> standard deviations below the mean, so the short gap from 0 to 5.2 is{' '}
        <M>{'2 - 1.2816 = 0.7184'}</M> of a standard deviation: <M>{'5.2 = 0.7184\\sigma'}</M>, <M>{'\\sigma \\approx 7.238'}</M>.
      </Notice>
    )
  } else if (near(1.585)) {
    notice = (
      <Notice tone="warn">
        <b>Option D puts 5.2 above the mean</b> (the mean is <M>2\sigma = 3.17</M>), at <M>z = +1.28</M>. Only 10% of the curve is to
        its right, so <M>{'\\Pr(X > 5.2) = 0.1'}</M>, the opposite of what we need. That is what <M>{'\\text{invNorm}(0.9) = +1.2816'}</M>{' '}
        gives: the value with 90% to its <i>left</i>.
      </Notice>
    )
  } else if (near(14.476)) {
    notice = (
      <Notice tone="warn">
        <b>Option B, 14.476, is twice the answer.</b> It is the <i>mean</i> of the right distribution (<M>{'2 \\times 7.238'}</M>), not
        its standard deviation. Used as <M>\sigma</M>, it pushes 5.2 too far down: about 95% of the curve is now to its right.
      </Notice>
    )
  } else if (near(3.169)) {
    notice = (
      <Notice tone="warn">
        <b>Option E, 3.169, is <M>{'2 \\times 1.585'}</M></b>: the mean that goes with option D&apos;s wrong-sign <M>z</M>. As a standard
        deviation it leaves 5.2 only a little below the mean, with about 64% of the curve to its right.
      </Notice>
    )
  } else if (z5 > 0) {
    notice = (
      <Notice tone="warn">
        5.2 is <b>above</b> the mean <M>{`2\\sigma = ${num(mean, 2)}`}</M>, so less than half the curve is to its right. We need 90% to
        its right, which means 5.2 must be <i>below</i> the mean and its <M>z</M>-score negative. Make <M>\sigma</M> bigger.
      </Notice>
    )
  } else if (p < 0.9) {
    notice = (
      <Notice>
        The X value 0 stays put at <M>z = -2</M> whatever <M>\sigma</M> is: the mean <M>2\sigma</M> is always exactly two standard
        deviations above 0. 5.2 is below the mean now, but only {Math.round(p * 1000) / 10}% of the curve is to its right. Make{' '}
        <M>\sigma</M> bigger: each standard deviation gets longer, and the 5.2 mark slides towards 0.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Too far: {Math.round(p * 1000) / 10}% of the curve is right of 5.2. With <M>\sigma</M> this big, 5.2 is only{' '}
        {num(5.2 / sigma, 2)} of a standard deviation above 0, so it sits too close to <M>z = -2</M>. Make <M>\sigma</M> smaller.
      </Notice>
    )
  }

  // Keep the 5.2 label clear of the ruler's end and its "X" name.
  const labelZ = Math.min(z5, 3.1)

  return (
    <div>
      <Plane x={[ZMIN, ZMAX]} y={[-0.3, 0.45]} xStep={1} yStep={1} height={300} xLabel="z" yLabel="" xLabels={zTicks} yLabels={false}>
        <Region top={phi} bottom={() => 0} from={z5} to={ZMAX} color={C.f} opacity={0.3} />
        <Plot.OfX y={phi} domain={[ZMIN, ZMAX]} color={C.f} weight={3} />
        {/* The target: 10% of the area to the left of z = invNorm(0.1). */}
        <Line.Segment point1={[Z_STAR, 0]} point2={[Z_STAR, 0.4]} color={C.good} style="dashed" weight={2} />
        <Label at={[Z_STAR, 0.36]} color={C.good} attach="w" size={12}>z = −1.28</Label>
        {/* The X ruler: x = 2σ + σz. */}
        <Line.Segment point1={[ZMIN, RY]} point2={[ZMAX, RY]} color={C.ink} weight={1.5} />
        {[-3, -2, -1, 0, 1, 2, 3].map(z => (
          <Line.Segment key={z} point1={[z, RY - 0.012]} point2={[z, RY + 0.012]} color={C.ink} weight={1.5} />
        ))}
        <Line.Segment point1={[-2, RY]} point2={[0, RY]} color={C.violet} weight={4} />
        <Label at={[ZMAX, RY]} attach="e" size={14} italic>X</Label>
        <Label at={[-2, RY]} attach="n" size={12}>0</Label>
        <Label at={[-1, RY]} color={C.violet} attach="n" size={12}>2σ</Label>
        <Label at={[0, RY]} attach="ne" size={12}>{`μ = ${num(mean, 2)}`}</Label>
        {/* 5.2, wherever it falls. */}
        <Line.Segment point1={[z5, RY - 0.02]} point2={[z5, phi(z5)]} color={C.bad} weight={2.5} />
        <Label at={[labelZ, RY]} color={C.bad} attach="s" size={12} gap={8}>5.2</Label>
      </Plane>
      <Controls>
        <Slider label="\sigma" value={sigma} onChange={setSigma} min={1} max={16} step={0.001} format={v => v.toFixed(3)} />
        <Buttons>
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Try an option:</span>
          {OPTIONS.map(o => (
            <Toggle key={o.letter} label={`${o.letter}: ${o.sigma}`} checked={near(o.sigma)} onChange={() => setSigma(o.sigma)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout tex={`\\mu = 2\\sigma = ${num(mean, 3).replace('−', '-')}`} />
          <Readout color={C.bad} tex={`z = \\tfrac{5.2 - 2\\sigma}{\\sigma} = ${num(z5, 3).replace('−', '-')}`} />
          <Readout color={hit ? C.good : C.f} tex={`\\Pr(X > 5.2) \\approx ${p.toFixed(3)}${hit ? '\\ \\checkmark' : ''}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
