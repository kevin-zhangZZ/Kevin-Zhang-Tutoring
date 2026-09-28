// 2018 Specialist Exam 2 Q6g — a higher confidence level needs a wider interval. Slide the level:
// z = invNorm(0.5 + level/2) grows, so the interval 145 ± z·15/√50 widens (shaded: the middle
// "level" of a normal curve with sd 15/√50 centred on the observed x̄ = 145). At 99% it is
// (139.5, 150.5) and contains the claimed 150; at 95% — the slip the report describes — it is
// (140.8, 149.2) and does not. 150 enters once the level passes 98.16%, i.e. 1 − 2 × 0.0092.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider } from './kit'

const SE = 15 / Math.sqrt(50)
const pdf = (x: number) => Math.exp(-0.5 * ((x - 145) / SE) ** 2) / (SE * Math.sqrt(2 * Math.PI))

/** Inverse standard normal (Acklam's rational approximation, relative error < 1.2e-9). */
function invNorm(p: number): number {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239]
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572]
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783]
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416]
  const lo = 0.02425
  if (p < lo) {
    const q = Math.sqrt(-2 * Math.log(p))
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  }
  if (p > 1 - lo) return -invNorm(1 - p)
  const q = p - 0.5
  const r = q * q
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
}

const X0 = 135
const X1 = 155
const BAR = 0.225

export default function Confidence() {
  const [level, setLevel] = useState(99)
  const upper = 0.5 + level / 200
  const z = invNorm(upper)
  const margin = z * SE
  const lo = 145 - margin
  const hi = 145 + margin
  const has150 = hi >= 150
  const at99 = Math.abs(level - 99) < 0.05
  const at95 = Math.abs(level - 95) < 0.05
  const set = (v: number) => setLevel(Math.round(v * 10) / 10)

  let notice
  if (at99) {
    notice = (
      <Notice tone="good">
        At <M>{'99\\%'}</M> only <M>{'0.5\\%'}</M> is left in each tail, so <M>z = 2.5758</M> and the interval is{' '}
        <M>145 \pm 5.46 = (139.5,\ 150.5)</M>. It contains <M>150</M>: at this level of confidence, <M>150</M> is still a
        plausible mean. Press <M>{'95\\%'}</M> to see what happens with the wrong level.
      </Notice>
    )
  } else if (at95) {
    notice = (
      <Notice tone="warn">
        At <M>{'95\\%'}</M>, <M>z = 1.96</M> gives <M>(140.8,\ 149.2)</M>: narrower, and now <M>150</M> is outside. The
        report says some students appeared to use <M>{'95\\%'}</M> instead of the required <M>{'99\\%'}</M>. Same data,
        different level, different interval, so read the level in the question.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        More confidence needs a wider net: as the level rises, <M>z</M> grows and so does the interval. The claimed{' '}
        <M>150</M> enters once the level passes about <M>{'98.16\\%'}</M>, because{' '}
        <M>{'1 - 0.9816 = 0.0184 = 2 \\times 0.0092'}</M>, twice the one-tailed <M>p</M> value from part c.
        {has150 ? ' Here it is inside.' : ' Here it is outside.'}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, 0.26]} xStep={5} yStep={1} yLabels={false} xLabel="" yLabel="" height={290}>
        <Region top={pdf} bottom={() => 0} from={lo} to={hi} color={C.violet} opacity={0.25} />
        <Plot.OfX y={pdf} domain={[X0, X1]} color={C.f} weight={3} />
        <Label at={[145, 0.07]} attach="c" color={C.violet} size={13}>{`middle ${level.toFixed(1)}%`}</Label>
        <Line.Segment point1={[150, 0]} point2={[150, 0.245]} color={has150 ? C.good : C.bad} style="dashed" weight={2} />
        <Label at={[150, 0.245]} attach="ne" color={has150 ? C.good : C.bad} size={12}>claimed 150</Label>
        <Line.Segment point1={[lo, BAR]} point2={[hi, BAR]} color={C.violet} weight={4} />
        <Line.Segment point1={[lo, BAR - 0.008]} point2={[lo, BAR + 0.008]} color={C.violet} weight={3} />
        <Line.Segment point1={[hi, BAR - 0.008]} point2={[hi, BAR + 0.008]} color={C.violet} weight={3} />
        <Point x={145} y={BAR} color={C.violet} />
        <Label at={[145, BAR]} attach="n" color={C.violet} size={12}>x̄ = 145</Label>
        <Label at={[lo, BAR]} attach="sw" color={C.violet} size={12}>{lo.toFixed(1)}</Label>
        <Label at={[hi, BAR]} attach="se" color={C.violet} size={12}>{hi.toFixed(1)}</Label>
      </Plane>
      <Controls>
        <Slider label="\text{level } (\%)" value={level} onChange={set} min={80} max={99.9} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          <ActionButton label="90%" onClick={() => set(90)} />
          <ActionButton label="95%" onClick={() => set(95)} />
          <ActionButton label="99%" onClick={() => set(99)} />
        </Buttons>
        <Readouts>
          <Readout tex={`z = \\operatorname{invNorm}(${upper.toFixed(4)}) \\approx ${z.toFixed(4)}`} />
          <Readout tex={`z \\times \\tfrac{15}{\\sqrt{50}} \\approx ${margin.toFixed(4)}`} />
          <Readout color={C.violet} tex={`(${lo.toFixed(1)},\\ ${hi.toFixed(1)})`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
