// 2019 Specialist Exam 2 MCQ 18 — why a 98% confidence interval uses z = invNorm(0.99). The curve
// is the distribution of the sample mean, x̄ ~ N(65, (4/6)²). The shaded middle holds the
// confidence level and each tail holds half of what is left, so the upper cut-off has 98% + 1% =
// 99% of the area to its left. Slide the confidence level to see the tails shrink and z grow. The
// toggle uses option B's z = invNorm(0.98) instead: that leaves 2% in EACH tail, a 96% interval,
// (63.6, 66.4).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const MU = 65
const SE = 4 / 6
const X_MIN = 62.4
const X_MAX = 67.6
const pdf = (x: number) => Math.exp(-((x - MU) ** 2) / (2 * SE * SE)) / (SE * Math.sqrt(2 * Math.PI))

/** Inverse standard normal CDF (Acklam's rational approximation, relative error ~1e-9). */
function invNorm(p: number): number {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239]
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572]
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783]
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416]
  const tail = (q: number) =>
    (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  if (p < 0.02425) return tail(Math.sqrt(-2 * Math.log(p)))
  if (p > 1 - 0.02425) return -tail(Math.sqrt(-2 * Math.log(1 - p)))
  const q = p - 0.5
  const r = q * q
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
}

/** A percentage without trailing zeros: 1, 1.25, 97.5. */
const pc = (v: number) => String(+v.toFixed(2))

export default function Tails() {
  const [conf, setConf] = useState(98)
  const [wrong, setWrong] = useState(false)

  // Correct: area to the left of the upper cut-off = conf + tail. Wrong: invNorm(conf) directly.
  const leftArea = wrong ? conf / 100 : 1 - (100 - conf) / 200
  const z = invNorm(leftArea)
  const tailPc = (1 - leftArea) * 100
  const middlePc = 100 - 2 * tailPc
  const m = z * SE
  const lo = MU - m
  const hi = MU + m
  const at98 = Math.abs(conf - 98) < 1e-9

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{`\\operatorname{invNorm}(${pc(conf / 100)})`}</M> puts <M>{`${pc(conf)}\\%`}</M> of the area to the{' '}
        <b>left</b> of the upper cut-off, so only <M>{`${pc(tailPc)}\\%`}</M> is in the upper tail and, by symmetry,{' '}
        <M>{`${pc(tailPc)}\\%`}</M> in the lower tail too. The middle holds just <M>{`${pc(middlePc)}\\%`}</M>
        {at98 ? (
          <>
            : this is a <b>96%</b> interval, <M>(63.6,\ 66.4)</M>, which is option <b>B</b>.
          </>
        ) : (
          <>, not the <M>{`${pc(conf)}\\%`}</M> you asked for.</>
        )}{' '}
        Turn the toggle off to put the right amount in each tail.
      </Notice>
    )
  } else if (at98) {
    notice = (
      <Notice tone="good">
        The middle <M>98\%</M> leaves <M>2\%</M> outside, split <b><M>1\%</M> in each tail</b>. <M>{'\\operatorname{invNorm}'}</M>{' '}
        always measures area to the <b>left</b>, and left of the upper cut-off sits <M>98\% + 1\% = 99\%</M>, so{' '}
        <M>{'z = \\operatorname{invNorm}(0.99) \\approx 2.326'}</M>. Now turn on the toggle to see what{' '}
        <M>{'\\operatorname{invNorm}(0.98)'}</M> does instead.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`${pc(conf)}\\%`}</M> confidence each tail holds <M>{`${pc(tailPc)}\\%`}</M>, so{' '}
        <M>{`z = \\operatorname{invNorm}(${pc(leftArea)})`}</M>. More confidence means thinner tails, a larger{' '}
        <M>z</M> and a <b>wider</b> interval: to be surer you have caught <M>\mu</M>, you cast a wider net. Slide back
        to <M>98\%</M>.
      </Notice>
    )
  }

  const tailColor = wrong ? C.bad : C.g

  return (
    <div>
      <Plane
        x={[X_MIN, X_MAX]}
        y={[0, 0.68]}
        xStep={1}
        yStep={1}
        height={300}
        xLabel="x̄"
        yLabel=""
        xLabels={v => (v < X_MIN || v > X_MAX ? '' : String(v))}
        yLabels={false}
      >
        <Region top={pdf} bottom={() => 0} from={lo} to={hi} color={C.f} opacity={0.22} />
        <Region top={pdf} bottom={() => 0} from={X_MIN} to={lo} color={tailColor} opacity={0.55} />
        <Region top={pdf} bottom={() => 0} from={hi} to={X_MAX} color={tailColor} opacity={0.55} />
        <Plot.OfX y={pdf} domain={[X_MIN, X_MAX]} color={C.f} weight={3} />
        <Line.Segment point1={[lo, 0]} point2={[lo, 0.5]} color={tailColor} style="dashed" weight={2} />
        <Line.Segment point1={[hi, 0]} point2={[hi, 0.5]} color={tailColor} style="dashed" weight={2} />
        <Label at={[lo, 0.5]} attach="n" color={tailColor}>{lo.toFixed(2)}</Label>
        <Label at={[hi, 0.5]} attach="n" color={tailColor}>{hi.toFixed(2)}</Label>
        <Label at={[lo, 0.02]} attach="nw" color={tailColor} gap={10}>{`${pc(tailPc)}%`}</Label>
        <Label at={[hi, 0.02]} attach="ne" color={tailColor} gap={10}>{`${pc(tailPc)}%`}</Label>
        <Label at={[MU, 0.22]} attach="c" size={16} color={wrong ? C.bad : C.ink}>{`${pc(middlePc)}%`}</Label>
      </Plane>
      <Controls>
        <Slider
          label="\text{confidence}"
          value={conf}
          onChange={setConf}
          min={80}
          max={99.5}
          step={0.5}
          format={v => `${pc(v)}%`}
        />
        <Toggle label="Use z = invNorm(confidence), option B's slip" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={tailColor} tex={`\\text{each tail} = ${pc(tailPc)}\\%`} />
          <Readout tex={`z = \\operatorname{invNorm}(${pc(leftArea)}) \\approx ${z.toFixed(3)}`} />
          <Readout
            color={C.f}
            tex={`65 \\pm ${z.toFixed(3)} \\times \\tfrac{4}{6} \\approx (${lo.toFixed(1)},\\ ${hi.toFixed(1)})`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
