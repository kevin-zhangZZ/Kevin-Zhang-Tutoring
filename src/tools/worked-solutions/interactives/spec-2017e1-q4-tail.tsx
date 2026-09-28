// 2017 Specialist Exam 1 Q4 — where 295 mL sits on the distribution of the pack mean. The blue
// curve is X̄ ~ N(298, (3/√n)²) for a pack of n bottles; the orange tail is Pr(X̄ < 295) and the
// green band is the middle 95% (298 ± 2 sd). Since z = (295 − 298)/(3/√n) = −√n, at n = 1 (one
// bottle) 295 is one sd below (tail ≈ 0.16, the population-sd error), and at n = 4 the band's
// edge lands exactly on 295, so the tail is (1 − 0.95)/2 = 0.025 (exactly 0.0228).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, Buttons } from './kit'

const MU = 298
const SIGMA = 3
const LO = 287
const HI = 309

const pdf = (sd: number) => (x: number) => Math.exp(-0.5 * ((x - MU) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI))

// Abramowitz & Stegun 7.1.26 (error below 1.5e-7): plenty for 3 decimal places.
function erf(x: number) {
  const s = Math.sign(x)
  const a = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const Phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2))
const fmt = (v: number) => String(parseFloat(v.toFixed(3)))

const RULE: Record<number, string> = {
  1: '\\tfrac{1-0.68}{2} = 0.16',
  4: '\\tfrac{1-0.95}{2} = 0.025',
  9: '\\tfrac{1-0.997}{2} = 0.0015',
}

export default function Tail() {
  const [n, setN] = useState(4)
  const [band, setBand] = useState(true)

  const sd = SIGMA / Math.sqrt(n)
  const f = pdf(sd)
  const one = pdf(SIGMA)
  const z = (295 - MU) / sd
  const p = Phi(z)
  const bL = MU - 2 * sd
  const bR = MU + 2 * sd
  const zero = () => 0
  const name = n === 1 ? 'one bottle' : `mean of ${n}`

  let notice
  if (n === 4) {
    notice = (
      <Notice tone="good">
        For a pack of four, <M>{'\\mathrm{sd}(\\bar X) = 1.5'}</M>, so <M>295</M> is <b>two</b> standard deviations
        below <M>298</M>: the band&apos;s left edge lands exactly on the red line. The middle 95% leaves 5% for the
        two tails, split equally by symmetry, so <M>{'\\Pr(\\bar X < 295) \\approx 0.025'}</M> (exactly{' '}
        <M>0.0228</M>). Slide to <M>n = 1</M> to see the one-bottle answer.
      </Notice>
    )
  } else if (n === 1) {
    notice = (
      <Notice tone="warn">
        With one bottle the sd is <M>3</M>, so <M>295</M> is only <b>one</b> sd below <M>298</M>, well inside the
        95% band. The tail is about <M>{'\\tfrac{1-0.68}{2} = 0.16'}</M>. That is the answer from using the
        population sd, which the report says many students did. The question asks about the mean of four: slide back to{' '}
        <M>n = 4</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        More bottles per pack, narrower curve: <M>{'\\mathrm{sd}(\\bar X) = \\tfrac{3}{\\sqrt n}'}</M>, so{' '}
        <M>{'z = \\tfrac{295-298}{3/\\sqrt n} = -\\sqrt n'}</M>. Only at <M>n = 4</M> (<M>z = -2</M>) or{' '}
        <M>n = 9</M> (<M>z = -3</M>) does <M>295</M> land on a whole number of sds, where the 68–95–99.7 rule
        gives the tail without a calculator.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[LO, HI]}
        y={[0, 0.42]}
        xStep={1}
        yStep={0.1}
        xLabel=""
        yLabel=""
        yLabels={false}
        xLabels={v => ((Math.round(v) - MU) % 3 === 0 && v >= LO && v <= HI ? String(Math.round(v)) : '')}
        height={300}
      >
        {band && <Region top={f} bottom={zero} from={bL} to={bR} color={C.good} opacity={0.18} />}
        <Region top={f} bottom={zero} from={LO} to={295} color={C.g} opacity={0.5} />
        {band && (
          <>
            <Line.Segment point1={[bL, 0]} point2={[bL, f(bL)]} color={C.good} style="dashed" weight={2} />
            <Line.Segment point1={[bR, 0]} point2={[bR, f(bR)]} color={C.good} style="dashed" weight={2} />
            <Label at={[MU, f(MU) * 0.22]} attach="c" color={C.good} size={14}>95%</Label>
          </>
        )}
        <Line.Segment point1={[295, 0]} point2={[295, 0.42]} color={C.bad} style="dashed" weight={2} />
        {n > 1 && <Plot.OfX y={one} domain={[LO, HI]} color={C.guide} style="dashed" weight={2} />}
        {n > 1 && <Label at={[303.5, one(303.5)]} attach="ne" color={C.guide} size={12}>one bottle</Label>}
        <Plot.OfX y={f} domain={[LO, HI]} color={C.f} weight={3} />
        <Label at={[MU + 1.2 * sd, f(MU + 1.2 * sd)]} attach="ne" color={C.f}>{name}</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={setN} min={1} max={9} step={1} format={v => String(v)} />
        <Buttons>
          <Toggle label="Show the middle 95% (±2 sd)" checked={band} onChange={setBand} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\mathrm{sd}(\\bar X) = \\tfrac{3}{\\sqrt{${n}}} = ${fmt(sd)}`} />
          <Readout tex={`z = \\tfrac{295-298}{${fmt(sd)}} = ${z.toFixed(2)}`} />
          <Readout color={C.g} tex={`\\Pr(\\bar X < 295) = ${p.toFixed(4)}`} />
          {RULE[n] && <Readout color={C.good} tex={`\\text{rule: } ${RULE[n]}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
