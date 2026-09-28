// 2018 Specialist Exam 2 Q6e — the smallest sample mean that keeps H₀ is where the p value
// equals 0.05. Drag the observed sample mean x̄ along the axis under X̄ ~ N(150, (15/√50)²): its
// p value (orange tail) is compared with the fixed 5% rejection region (red). The verdict flips
// at invNorm(0.05, 150, 15/√50) = 146.5107…; buttons jump to 146.51 (p = 0.04996, still just
// rejected) and 146.52 (p = 0.0505, kept) — why VCAA accepted both. A toggle shows the two-tailed
// slip (2.5% per tail, boundary 145.84).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle,
  clamp,
} from './kit'

function erf(x: number) {
  // Abramowitz & Stegun 7.1.26, |error| < 1.5e-7.
  const s = Math.sign(x)
  const a = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const SE = 15 / Math.sqrt(50)
const cdf = (x: number) => 0.5 * (1 + erf((x - 150) / (SE * Math.SQRT2)))
const pdf = (x: number) => Math.exp(-0.5 * ((x - 150) / SE) ** 2) / (SE * Math.sqrt(2 * Math.PI))

const CRIT1 = 150 - 1.6448536269514722 * SE // 146.5107…
const CRIT2 = 150 - 1.959963984540054 * SE // 145.8423… (two-tailed, lower boundary)
const X0 = 140
const X1 = 156
const LO = 141
const HI = 155

export default function Boundary() {
  const [xbar, setXbar] = useState(145)
  const [two, setTwo] = useState(false)
  const set = (v: number) => setXbar(Math.round(clamp(v, LO, HI) * 100) / 100)

  const tail = cdf(xbar)
  const p = two ? Math.min(1, 2 * Math.min(tail, 1 - tail)) : tail
  const reject = p < 0.05
  const crit = two ? CRIT2 : CRIT1
  // Edge of the shaded p-value tail; two-tailed shades both tails beyond |x̄ − 150|.
  const lower = two ? Math.min(xbar, 300 - xbar) : xbar
  const at51 = Math.abs(xbar - 146.51) < 0.005
  const at52 = Math.abs(xbar - 146.52) < 0.005

  let notice
  if (two) {
    notice = (
      <Notice tone="warn">
        A two-tailed test splits the <M>{'5\\%'}</M> into <M>{'2.5\\%'}</M> in each tail, which moves the boundary to{' '}
        <M>145.84</M> and doubles every <M>p</M> value. But the question says <b>one-tailed</b>, with{' '}
        <M>{'H_1: \\mu < 150'}</M>, so the whole <M>{'5\\%'}</M> sits in the lower tail. Turn the toggle off.
      </Notice>
    )
  } else if (at51) {
    notice = (
      <Notice tone="warn">
        At <M>{'\\overline{x} = 146.51'}</M>, <M>p \approx 0.04996</M>: just under <M>0.05</M>, so strictly{' '}
        <M>H_0</M> is still (only just) rejected. The exact boundary is <M>146.5107\ldots</M>, which rounds to{' '}
        <M>146.51</M>, but the smallest two-decimal sample mean that is <b>not</b> rejected is <M>146.52</M>. The
        report accepted both.
      </Notice>
    )
  } else if (at52) {
    notice = (
      <Notice tone="good">
        At <M>{'\\overline{x} = 146.52'}</M>, <M>p \approx 0.0505 \ge 0.05</M>, so <M>H_0</M> is not rejected. The orange
        tail has just grown past the red <M>{'5\\%'}</M> region. Compare with 146.51.
      </Notice>
    )
  } else if (reject) {
    notice = (
      <Notice>
        The orange tail (the <M>p</M> value) fits inside the red <M>{'5\\%'}</M> region, so <M>p &lt; 0.05</M> and{' '}
        <M>H_0</M> is rejected. Drag the point right: the tail grows, and the verdict flips exactly when it fills the red
        region, when <M>p = 0.05</M>. That edge is the answer to part e.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Now the orange tail is bigger than the red <M>{'5\\%'}</M> region, so <M>p &gt; 0.05</M> and <M>H_0</M> is kept.
        Any sample mean right of the dashed line keeps <M>H_0</M>. The smallest one is where the two edges meet:{' '}
        <M>{'\\operatorname{invNorm}(0.05,\\ 150,\\ \\tfrac{15}{\\sqrt{50}}) \\approx 146.51'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, 0.22]} xStep={2} yStep={1} yLabels={false} xLabel="" yLabel="" height={290}>
        <Region top={pdf} bottom={() => 0} from={X0} to={crit} color={C.bad} opacity={0.3} />
        {two && <Region top={pdf} bottom={() => 0} from={300 - crit} to={X1} color={C.bad} opacity={0.3} />}
        <Region top={pdf} bottom={() => 0} from={X0} to={lower} color={C.g} opacity={0.65} />
        {two && <Region top={pdf} bottom={() => 0} from={300 - lower} to={X1} color={C.g} opacity={0.65} />}
        <Plot.OfX y={pdf} domain={[X0, X1]} color={C.f} weight={3} />
        <Line.Segment point1={[crit, 0]} point2={[crit, 0.2]} color={C.bad} style="dashed" weight={2} />
        <Label at={[crit, 0.2]} attach="nw" color={C.bad} size={12}>{crit.toFixed(2)}</Label>
        <Label at={[crit, pdf(crit)]} attach="nw" color={C.bad} size={12}>{two ? '2.5%' : '5%'}</Label>
        <Line.Segment point1={[xbar, 0]} point2={[xbar, Math.max(pdf(xbar), 0.02)]} color={C.g} weight={2} />
        <Label at={[150, pdf(150)]} attach="ne" color={C.f} size={12}>μ = 150</Label>
        <MovablePoint point={[xbar, 0]} onMove={pt => set(pt[0])} constrain={pt => [clamp(pt[0], LO, HI), 0]} color={reject ? C.bad : C.good} />
      </Plane>
      <Controls>
        <Slider label="\overline{x}" value={xbar} onChange={set} min={LO} max={HI} step={0.01} format={v => v.toFixed(2)} />
        <Buttons>
          <ActionButton label="x̄ = 145" onClick={() => setXbar(145)} />
          <ActionButton label="x̄ = 146.51" onClick={() => setXbar(146.51)} />
          <ActionButton label="x̄ = 146.52" onClick={() => setXbar(146.52)} />
          <Toggle label="Two-tailed? (wrong here)" checked={two} onChange={setTwo} />
        </Buttons>
        <Readouts>
          <Readout
            color={C.g}
            tex={`p = ${two ? '2' : ''}\\Pr(\\overline{X} ${two && xbar > 150 ? '\\ge' : '\\le'} ${xbar.toFixed(2)} \\mid \\mu = 150) \\approx ${p.toFixed(p > 0.045 && p < 0.055 ? 5 : 4)}`}
          />
          <Readout color={reject ? C.bad : C.good} tex={reject ? 'p < 0.05 \\Rightarrow \\text{reject } H_0' : 'p \\ge 0.05 \\Rightarrow \\text{do not reject } H_0'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
