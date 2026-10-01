// 2023 Methods Exam 2 Q4f — "more than 99% grade A" means squeezing the normal curve into the
// window 6.54 < D < 6.86, which sits 0.16 cm either side of the mean 6.7. Drag σ down and watch
// BOTH red tails shrink: the 1% allowed to miss grade A is shared between two tails, so each must
// hold less than 0.5%, giving σ < 0.0621. A button jumps to σ = 0.0688, the common
// Pr(D < 6.86) = 0.99 approach: the upper tail is then 1%, but the lower tail is another 1%, so
// only 98% are grade A.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider } from './kit'

const MU = 6.7
const LO = 6.54
const HI = 6.86
const S_RIGHT = 0.0621 // 0.16 / invNorm(0.995) = 0.06211…
const S_WRONG = 0.0688 // 0.16 / invNorm(0.99) = 0.06877…
const X0 = 6.4
const X1 = 7.0

/** Standard normal cdf (Abramowitz & Stegun 7.1.26; error below 2 × 10⁻⁷). */
function phi(z: number) {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))))
  const erf = 1 - poly * Math.exp(-x * x)
  return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf)
}

export default function TwoTails() {
  const [s, setS] = useState(0.1)

  const pdf = (x: number) => Math.exp(-0.5 * ((x - MU) / s) ** 2) / (s * Math.sqrt(2 * Math.PI))
  const lower = phi((LO - MU) / s)
  const upper = 1 - phi((HI - MU) / s)
  const gradeA = 1 - lower - upper
  const pct = (p: number) => `${(100 * p).toFixed(2)}%`

  const atWrong = Math.abs(s - S_WRONG) < 0.00005
  const atRight = Math.abs(s - S_RIGHT) < 0.00005

  let notice
  if (atWrong) {
    notice = (
      <Notice tone="warn">
        <b>This is the common approach</b>, <M>{'\\Pr(D<6.86)=0.99'}</M> with <M>z = 2.3263</M>, giving{' '}
        <M>\sigma \approx 0.0688</M>. The upper tail is now exactly 1%, but the curve is symmetric, so the lower tail
        holds another 1%: only <M>{gradeA.toFixed(4)}</M> are grade A. Keep dragging <M>\sigma</M> down.
      </Notice>
    )
  } else if (atRight) {
    notice = (
      <Notice tone="good">
        <b>Each tail now holds 0.5%</b>, so grade A is just over 99%. This is where{' '}
        <M>{'\\tfrac{0.16}{\\sigma} = \\text{invNorm}(0.995) = 2.5758'}</M>, i.e. <M>\sigma = 0.0621</M>. Any smaller{' '}
        <M>\sigma</M> also works; check <M>\sigma = 0.06</M>, the answer to two decimal places.
      </Notice>
    )
  } else if (s > S_WRONG) {
    notice = (
      <Notice>
        With <M>{`\\sigma = ${s.toFixed(4)}`}</M>, only <M>{gradeA.toFixed(4)}</M> of balls are grade A: the red tails
        on <b>both</b> sides miss the window. Drag <M>\sigma</M> down to squeeze the curve into the window, or try the
        common approach with the first button.
      </Notice>
    )
  } else if (s > S_RIGHT) {
    notice = (
      <Notice tone="warn">
        The upper tail is under 1% now, but grade A is still under 99%, because the lower tail loses just as much. Less
        than 1% may miss <b>in total</b>, so each tail must be under 0.5%. Keep going down.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>More than 99% are grade A</b>: each tail is below 0.5%. The condition is <M>{'\\sigma < 0.0621'}</M>, so to two
        decimal places <M>\sigma = 0.06</M>, which gives <M>{'\\Pr(6.54<D<6.86) = 0.9923'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, 9]} xStep={0.1} yStep={10} height={300} xLabel="d" yLabels={false} xLabels={v => v.toFixed(1)}>
        <Region top={pdf} bottom={() => 0} from={X0} to={LO} color={C.bad} opacity={0.4} />
        <Region top={pdf} bottom={() => 0} from={LO} to={HI} color={C.good} opacity={0.22} />
        <Region top={pdf} bottom={() => 0} from={HI} to={X1} color={C.bad} opacity={0.4} />
        <Line.Segment point1={[LO, 0]} point2={[LO, 8.8]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[HI, 0]} point2={[HI, 8.8]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={pdf} domain={[X0, X1]} color={C.f} weight={3} />
        <Label at={[LO, 8.8]} attach="w" size={12}>6.54</Label>
        <Label at={[HI, 8.8]} attach="e" size={12}>6.86</Label>
        <Label at={[MU, 8.8]} attach="c" color={C.good} size={12}>grade A</Label>
        <Label at={[(X0 + LO) / 2, 2.2]} attach="c" color={C.bad} size={12}>{pct(lower)}</Label>
        <Label at={[(HI + X1) / 2, 2.2]} attach="c" color={C.bad} size={12}>{pct(upper)}</Label>
      </Plane>
      <Controls>
        <Slider label="\sigma" value={s} onChange={setS} min={0.05} max={0.1} step={0.0001} format={v => v.toFixed(4)} />
        <Buttons>
          <ActionButton label="Common approach: Pr(D < 6.86) = 0.99" onClick={() => setS(S_WRONG)} />
          <ActionButton label="Split the 1%: 0.5% per tail" onClick={() => setS(S_RIGHT)} />
        </Buttons>
        <Readouts>
          <Readout color={C.bad} tex={`\\Pr(D<6.54) = ${lower.toFixed(4)}`} />
          <Readout color={C.good} tex={`\\Pr(6.54<D<6.86) = ${gradeA.toFixed(4)}`} />
          <Readout color={C.bad} tex={`\\Pr(D>6.86) = ${upper.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
