// 2021 Specialist Exam 2 Q6d — the critical value is the sample mean whose p-value is exactly
// 0.01, and EVERY sample mean beyond it has a smaller p-value, so the answer is a range. Under H₀,
// X̄ ~ N(60 000, (5000/√14)²); drag x̄ and the shaded right tail is its p-value. It starts at
// part c's x̄ = 63 500 (p = 0.0044, reject). The boundary is invNorm(0.99, 60000, 5000/√14) =
// 63 108.71, and the green ray x̄ ≥ 63 109 is the rejection region the report says students
// stopped short of. Values checked in scipy: p(63 108) = 0.01001, p(63 109) = 0.00999.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider } from './kit'

const MU = 60000
const SE = 5000 / Math.sqrt(14) // 1336.31
const CRIT = 63108.713109682416 // invNorm(0.99, 60000, 5000/√14)
const OBS = 63500
const X0 = 55000
const X1 = 66000
const PEAK = 1 / (SE * Math.sqrt(2 * Math.PI))
const YTOP = PEAK * 1.15

// Numerical Recipes erfc (relative error under 1.2e-7): good to 5 decimal places in the tail.
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
const pValue = (x: number) => 0.5 * erfc((x - MU) / (SE * Math.SQRT2))
const pdf = (x: number) => PEAK * Math.exp(-0.5 * ((x - MU) / SE) ** 2)
const thousands = (v: number) => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export default function RejectRegion() {
  const [x, setX] = useState(OBS)

  const p = pValue(x)
  const atCrit = Math.abs(x - CRIT) < 0.5
  const reject = x >= CRIT - 1e-6
  const colour = reject ? C.good : C.g
  const shown = atCrit ? x.toFixed(1) : thousands(x)

  let notice
  if (atCrit) {
    notice = (
      <Notice tone="good">
        <b>
          At <M>{'\\bar x \\approx 63\\,108.7'}</M> the <M>p</M>-value is exactly <M>0.01</M>.
        </b>{' '}
        That number is only the boundary, not the answer. Every <M>{'\\bar x'}</M> to its right has a smaller tail, so it
        rejects <M>{'H_0'}</M> too: the answer is the whole green range, <M>{'\\bar x \\ge 63\\,109'}</M> to the nearest
        integer.
      </Notice>
    )
  } else if (reject) {
    notice = (
      <Notice tone="good">
        <M>{`p \\approx ${p.toFixed(5)} \\le 0.01`}</M>, so reject <M>{'H_0'}</M>. Drag <M>{'\\bar x'}</M> further right: the
        tail only shrinks, so every larger sample mean rejects as well. Now drag it left and find where rejecting stops.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{`p \\approx ${p.toFixed(5)} > 0.01`}</M>, so there is not enough evidence to reject <M>{'H_0'}</M>. Drag{' '}
        <M>{'\\bar x'}</M> right until the shaded tail is down to <M>1\%</M>, or press the invNorm button.
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
        height={280}
      >
        <Region top={pdf} bottom={() => 0} from={x} to={X1} color={colour} opacity={0.5} />
        <Plot.OfX y={pdf} domain={[X0, X1]} color={C.f} weight={3} />
        <Label at={[MU - 1.2 * SE, pdf(MU - 1.2 * SE)]} attach="nw" color={C.f} size={12}>H₀: μ = 60 000</Label>
        <Line.Segment point1={[x, 0]} point2={[x, PEAK * 0.55]} color={colour} weight={2.5} />
        <Label at={[x, PEAK * 0.55]} attach={x > 64600 ? 'nw' : 'ne'} color={colour} size={12}>{`x̄ = ${shown}`}</Label>
        {/* The rejection region: a thick green ray along the axis from the critical value. Its
            labels come after the x̄ marker so their halos sit over the marker line. */}
        <Line.Segment point1={[CRIT, 0]} point2={[X1, 0]} color={C.good} weight={6} />
        <Line.Segment point1={[CRIT, 0]} point2={[CRIT, PEAK * 0.95]} color={C.good} style="dashed" weight={2} />
        <Label at={[CRIT, PEAK * 0.95]} attach="ne" color={C.good} size={12}>reject H₀</Label>
        <Label at={[CRIT, PEAK * 0.95]} attach="se" color={C.good} size={12}>x̄ ≥ 63 109</Label>
      </Plane>
      <Controls>
        <Slider label="\bar x" value={x} onChange={setX} min={60000} max={66000} step={1} format={v => thousands(v)} />
        <Buttons>
          <ActionButton label="invNorm(0.99, 60000, 5000/√14)" onClick={() => setX(CRIT)} />
          <ActionButton label="63 108" onClick={() => setX(63108)} />
          <ActionButton label="63 109" onClick={() => setX(63109)} />
          <ActionButton label="Part c: 63 500" onClick={() => setX(OBS)} />
        </Buttons>
        <Readouts>
          <Readout color={colour} tex={`p = \\Pr(\\bar X \\ge ${atCrit ? '63\\,108.7' : thousands(x).replace(' ', '\\,')} \\mid \\mu = 60\\,000) \\approx ${p.toFixed(5)}`} />
          <Readout color={colour} tex={reject ? 'p \\le 0.01 \\implies \\text{reject } H_0' : 'p > 0.01 \\implies \\text{do not reject } H_0'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
