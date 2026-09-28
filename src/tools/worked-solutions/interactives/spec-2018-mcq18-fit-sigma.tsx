// 2018 Specialist Exam 2 MCQ 18 — running a 95% confidence interval backwards. The given interval
// 58.42 < μ < 67.31 is drawn as two fixed dashed lines, centred on x̄ = 62.865. The slider sets the
// population standard deviation σ; the tall curve is the distribution of the mean of 36 dogs,
// N(x̄, (σ/6)²), with its middle 95% (x̄ ± 1.96σ/6) shaded. The shading fits the given interval
// exactly when σ ≈ 13.61 (option D). A faint wide curve shows one dog's heights, N(x̄, σ²), six
// times as spread. The toggle builds the interval as x̄ ± 1.96σ (forgetting the √36): it then fits
// at σ ≈ 2.27, option B — which is really σ/√n, the spread of the mean, not of the dogs.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const LO = 58.42
const HI = 67.31
const XBAR = (LO + HI) / 2 // 62.865
const MARGIN = (HI - LO) / 2 // 4.445
const Z = 1.96
const N = 36
const SIGMA = (MARGIN * Math.sqrt(N)) / Z // 13.6071
const XR: [number, number] = [48, 78]
const YTOP = 0.3

const pdf = (x: number, mu: number, sd: number) => Math.exp(-0.5 * ((x - mu) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI))
const cap = (y: number) => Math.min(y, YTOP * 1.04)
const f2 = (v: number) => v.toFixed(2)

export default function FitSigmaWidget() {
  const [sigma, setSigma] = useState(9)
  const [noRoot, setNoRoot] = useState(false)

  // The spread the interval is built from: σ/√36 (correct) or σ itself (the wrong idea).
  const sd = noRoot ? sigma : sigma / Math.sqrt(N)
  const margin = Z * sd
  const a = XBAR - margin
  const b = XBAR + margin
  const target = noRoot ? MARGIN / Z : SIGMA
  const fits = Math.abs(sigma - target) < 0.03
  const tooNarrow = !fits && margin < MARGIN

  const notice = fits ? (
    noRoot ? (
      <>
        It fits at <M>{`\\sigma \\approx ${f2(sigma)}`}</M>, option B. But this curve is the spread of the <em>average</em> of 36 dogs:
        an interval for <M>\mu</M> is always built from <M>{'\\tfrac{\\sigma}{\\sqrt n}'}</M>. So <M>2.27</M> is{' '}
        <M>{'\\tfrac{\\sigma}{6}'}</M>, and the dogs' own standard deviation is six times that. Turn the toggle off.
      </>
    ) : (
      <>
        The shaded 95% now matches the given interval: <M>{`\\sigma \\approx ${f2(sigma)}`}</M>, option D. Notice the tall curve has
        standard deviation <M>{`\\tfrac{\\sigma}{6} \\approx ${f2(sigma / 6)}`}</M> (options A and B), while one dog's heights (faint
        curve) spread six times as widely. The question asks for that population <M>\sigma</M>.
      </>
    )
  ) : (
    <>
      The shaded middle 95% is <M>{`\\bar x \\pm ${f2(margin)}`}</M>, {tooNarrow ? 'narrower' : 'wider'} than the given interval (dashed
      lines, <M>{'\\bar x \\pm 4.445'}</M>). {tooNarrow ? 'Increase' : 'Decrease'} <M>\sigma</M> until the edges line up: the width is{' '}
      <M>{noRoot ? '2 \\times 1.96\\,\\sigma' : '2 \\times 1.96\\,\\tfrac{\\sigma}{6}'}</M>, so it grows in step with <M>\sigma</M>.
    </>
  )

  return (
    <div>
      <Plane x={XR} y={[0, YTOP]} xStep={2} yStep={0.1} height={320} xLabel="" yLabel="" yLabels={false} xLabels={v => (v % 4 === 0 && v <= 76 ? String(v) : '')}>
        {/* One dog's heights: the population, six times as spread (correct mode only). */}
        {!noRoot && <Plot.OfX y={x => pdf(x, XBAR, sigma)} domain={XR} color={C.guide} weight={1.5} style="dashed" />}
        {!noRoot && <Label at={[51, pdf(51, XBAR, sigma)]} attach="n" color={C.guide} size={12} gap={8}>one dog</Label>}
        <Region top={x => cap(pdf(x, XBAR, sd))} bottom={() => 0} from={Math.max(a, XR[0])} to={Math.min(b, XR[1])} color={fits ? C.good : C.f} opacity={0.3} />
        <Plot.OfX y={x => cap(pdf(x, XBAR, sd))} domain={XR} color={noRoot ? C.bad : C.f} weight={2.5} />
        <Label at={[XBAR + 1.3 * sd, cap(pdf(XBAR + 1.3 * sd, XBAR, sd))]} attach="e" color={noRoot ? C.bad : C.f} size={12} gap={6}>
          {noRoot ? 'sd σ' : 'mean of 36 dogs'}
        </Label>
        {/* The given interval. */}
        <Line.Segment point1={[LO, 0]} point2={[LO, YTOP]} color={C.ink} style="dashed" weight={1.5} />
        <Line.Segment point1={[HI, 0]} point2={[HI, YTOP]} color={C.ink} style="dashed" weight={1.5} />
        <Label at={[LO, YTOP]} attach="w" size={12} gap={5}>58.42</Label>
        <Label at={[HI, YTOP]} attach="e" size={12} gap={5}>67.31</Label>
        <Line.Segment point1={[XBAR, 0]} point2={[XBAR, cap(pdf(XBAR, XBAR, sd))]} color={C.guide} weight={1} />
        <Label at={[XBAR, YTOP]} attach="s" size={12} gap={5}>x̄ = 62.865</Label>
      </Plane>
      <Controls>
        <Slider label="\sigma" value={sigma} onChange={setSigma} min={1.5} max={20} step={0.01} />
        <Readouts>
          <Readout tex={noRoot ? `\\text{spread used} = \\sigma = ${f2(sd)}` : `\\tfrac{\\sigma}{\\sqrt{36}} = ${f2(sd)}`} color={noRoot ? C.bad : C.f} />
          <Readout tex={`1.96 \\times ${f2(sd)} = ${f2(margin)}`} color={fits ? C.good : undefined} />
          <Readout tex="\text{target: } \tfrac{67.31 - 58.42}{2} = 4.445" />
        </Readouts>
        <Toggle label="Wrong idea: the margin is 1.96σ (no √n)" checked={noRoot} onChange={setNoRoot} />
        <Notice tone={fits ? (noRoot ? 'warn' : 'good') : 'neutral'}>{notice}</Notice>
      </Controls>
    </div>
  )
}
