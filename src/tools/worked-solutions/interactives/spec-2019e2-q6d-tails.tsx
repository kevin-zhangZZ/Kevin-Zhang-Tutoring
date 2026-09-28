// 2019 Specialist Exam 2 Q6d–e — the p value as the area of BOTH tails. Under H₀ the mean of 100
// packets is X̄ ~ N(375, 1.5²). Slide the observed mean x̄: the lower tail below it and the
// mirror-image upper tail (as far above 375) are shaded, and p = 2 Pr(X̄ < x̄) (or 2 Pr(X̄ > x̄)).
// At the observed 372, p ≈ 0.0455 < 0.05, so H₀ is rejected (part e); p reaches 0.05 at
// x̄ ≈ 372.06 (part f). A toggle shows the one-tailed slip (only the observed side): p ≈ 0.0228.
// Values checked in scipy.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const MU = 375
const SD = 1.5
// Abramowitz & Stegun 7.1.26, good to about 1e-7.
function erf(z: number) {
  const s = Math.sign(z)
  const a = Math.abs(z)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const pdf = (x: number) => Math.exp(-0.5 * ((x - MU) / SD) ** 2) / (SD * Math.sqrt(2 * Math.PI))
const cdf = (x: number) => 0.5 * (1 + erf((x - MU) / (SD * Math.SQRT2)))
const X0 = 369
const X1 = 381
const CRIT = 372.06005402318993 // invNorm(0.025, 375, 1.5)

export default function Tails() {
  const [xb, setXb] = useState(372)
  const [oneTail, setOneTail] = useState(false)

  const lowSide = xb <= MU
  const lo = Math.min(xb, 2 * MU - xb)
  const hi = Math.max(xb, 2 * MU - xb)
  const tail = cdf(lo) // each tail's area
  const p = oneTail ? tail : 2 * tail
  const boundary = !oneTail && Math.abs(p - 0.05) < 0.0003
  const reject = p < 0.05 && !boundary
  const colour = boundary ? C.g : reject ? C.bad : C.good
  const mirror = 2 * MU - xb
  const atObs = Math.abs(xb - 372) < 0.015
  const atCrit = Math.abs(xb - CRIT) < 0.015
  const pTex = lowSide ? `\\Pr\\left(\\overline{X} < ${xb.toFixed(2)}\\right)` : `\\Pr\\left(\\overline{X} > ${xb.toFixed(2)}\\right)`

  let notice
  if (oneTail) {
    notice = (
      <Notice tone="warn">
        Only the tail on the observed side is counted, so <M>{`p \\approx ${tail.toFixed(4)}`}</M>: that is a one-tailed
        test, <M>{lowSide ? 'H_1: \\mu < 375' : 'H_1: \\mu > 375'}</M>. But this test asks whether the machine is working <b>properly</b>, so a mean as
        far on the <b>other</b> side of <M>375</M> (here <M>{mirror.toFixed(2)}</M>) is equally strong evidence against <M>H_0</M>. Its
        tail must be counted too.
      </Notice>
    )
  } else if (atObs) {
    notice = (
      <Notice tone="warn">
        At the observed <M>{'\\overline{x} = 372'}</M> each tail holds <M>{'\\approx 0.0228'}</M>, so{' '}
        <M>{'p \\approx 0.0455 < 0.05'}</M>: a mean this far from <M>375</M> would be rare if the machine were fine, so
        reject <M>H_0</M> (part e). Now slide <M>{'\\overline{x}'}</M> slowly towards <M>375</M> and watch <M>p</M>.
      </Notice>
    )
  } else if (atCrit) {
    notice = (
      <Notice tone="good">
        At <M>{'\\overline{x} \\approx 372.06'}</M> the two tails total exactly <M>0.05</M>: this is the boundary between
        rejecting and not rejecting, which is part f. Any sample mean between <M>372.06</M> and <M>377.94</M> gives{' '}
        <M>{'p \\ge 0.05'}</M>.
      </Notice>
    )
  } else if (reject) {
    notice = (
      <Notice tone="warn">
        <M>{`\\overline{x} = ${xb.toFixed(2)}`}</M> is <M>{`${Math.abs(xb - MU).toFixed(2)}`}</M> g from <M>375</M>, so
        the tails beyond <M>{lo.toFixed(2)}</M> and <M>{hi.toFixed(2)}</M> are small: <M>{`p \\approx ${p.toFixed(4)} < 0.05`}</M>,
        reject <M>H_0</M>. Try <M>{'\\overline{x} \\approx 372.06'}</M>, where <M>p</M> becomes <M>0.05</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>{`\\overline{x} = ${xb.toFixed(2)}`}</M> is close enough to <M>375</M> that results at least this extreme are
        common (<M>{`p \\approx ${p.toFixed(3)} \\ge 0.05`}</M>), so there is no evidence against <M>H_0</M>. The two
        tails are always mirror images, because <M>{'H_1: \\mu \\ne 375'}</M> treats too heavy and too light alike.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, 0.32]} xStep={1} yStep={1} xLabels={v => ([370, 372, 375, 378, 380].includes(v) ? String(v) : '')} yLabels={false} xLabel="x̄" yLabel="" height={290}>
        <Region top={pdf} bottom={() => 0} from={X0} to={lo} color={oneTail && !lowSide ? C.guide : colour} opacity={oneTail && !lowSide ? 0.2 : 0.45} />
        <Region top={pdf} bottom={() => 0} from={hi} to={X1} color={oneTail && lowSide ? C.guide : colour} opacity={oneTail && lowSide ? 0.2 : 0.45} />
        <Plot.OfX y={pdf} domain={[X0, X1]} color={C.f} weight={3} />
        <Line.Segment point1={[MU, 0]} point2={[MU, 0.285]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[MU, 0.285]} attach="n" size={12} gap={2}>μ = 375 under H₀</Label>
        <Line.Segment point1={[xb, 0]} point2={[xb, 0.2]} color={colour} weight={2.5} />
        <Label at={[xb, 0.2]} attach={lowSide ? 'nw' : 'ne'} color={colour} size={12} gap={3}>{`x̄ = ${xb.toFixed(2)}`}</Label>
        <Line.Segment point1={[mirror, 0]} point2={[mirror, 0.14]} color={oneTail ? C.guide : colour} style="dashed" weight={2} />
        <Label at={[mirror, 0.14]} attach={lowSide ? 'ne' : 'nw'} color={oneTail ? C.guide : colour} size={11} gap={3}>{`mirror ${mirror.toFixed(2)}`}</Label>
      </Plane>
      <Controls>
        <Slider label="\overline{x}" value={xb} onChange={setXb} min={369.5} max={380.5} step={0.01} />
        <Buttons>
          <ActionButton label="Observed: 372" onClick={() => setXb(372)} />
          <ActionButton label="372.06" onClick={() => setXb(372.06)} />
          <Toggle label="Only the observed tail" checked={oneTail} onChange={setOneTail} />
        </Buttons>
        <Readouts>
          <Readout tex={`${pTex} \\approx ${tail.toFixed(4)}`} />
          <Readout color={colour} tex={`p ${oneTail ? '' : '= 2\\times' + tail.toFixed(4)} \\approx ${p.toFixed(4)} ${boundary ? '\\approx 0.05' : reject ? '< 0.05' : '\\ge 0.05'}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
