// 2019 Specialist Exam 2 Q6a — why the sample mean of n packets is far more likely to land in
// 370–375 g than a single packet is. Slide the sample size n: the curve of X̄ ~ N(375, 15²/n)
// narrows (sd 15/√n) and the shaded area Pr(370 < X̄ < 375) grows from 0.1306 (n = 1, i.e.
// wrongly using σ = 15) to 0.4908 at n = 50 (part a) and 0.4996 at n = 100. The faint dashed
// curve is one packet, N(375, 15²), for comparison. Values checked in scipy.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider } from './kit'

const MU = 375
const SIGMA = 15
// Abramowitz & Stegun 7.1.26, good to about 1e-7.
function erf(z: number) {
  const s = Math.sign(z)
  const a = Math.abs(z)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const pdf = (x: number, sd: number) => Math.exp(-0.5 * ((x - MU) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI))
const cdf = (x: number, sd: number) => 0.5 * (1 + erf((x - MU) / (sd * Math.SQRT2)))
const X0 = 357
const X1 = 393

export default function Narrow() {
  const [n, setN] = useState(50)
  const sd = SIGMA / Math.sqrt(n)
  const prob = cdf(375, sd) - cdf(370, sd)

  let notice
  if (n === 1) {
    notice = (
      <Notice tone="warn">
        With <M>n = 1</M> this is just one packet, <M>{'X \\sim N(375, 15^2)'}</M>: only about <M>13\%</M> of packets
        weigh between <M>370</M> and <M>375</M> g. Using <M>\sigma = 15</M> in part a gives this curve by mistake. Now
        slide <M>n</M> up to <M>50</M>.
      </Notice>
    )
  } else if (n === 50) {
    notice = (
      <Notice tone="good">
        This is part a: the mean of <M>50</M> packets has sd <M>{'\\tfrac{15}{\\sqrt{50}} \\approx 2.12'}</M>, so{' '}
        <M>{'\\Pr(370 < \\overline{X} < 375) \\approx 0.4908'}</M>. Heavy and light packets in the same sample cancel
        out, so the average hugs <M>375</M>. Slide <M>n</M> to <M>100</M> to see the sample used in parts c–f.
      </Notice>
    )
  } else if (n >= 90) {
    notice = (
      <Notice>
        At <M>{`n = ${n}`}</M> the sd is only <M>{`\\tfrac{15}{\\sqrt{${n}}} \\approx ${sd.toFixed(2)}`}</M>, so almost the
        whole left half of the curve lies between <M>370</M> and <M>375</M> and the area is nearly <M>0.5</M>. A curve this
        narrow is why a mean of <M>372</M> from <M>100</M> packets is surprising (parts d–f).
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The centre stays at <M>375</M>; only the spread changes, as <M>{'\\tfrac{\\sigma}{\\sqrt n}'}</M>. The larger the
        sample, the more of the curve is squeezed into <M>370</M> to <M>375</M>. Try <M>n = 1</M> and <M>n = 50</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, 0.3]} xStep={5} yStep={1} xLabels={v => (v >= 360 && v <= 390 ? String(v) : '')} yLabels={false} xLabel="" yLabel="" height={290}>
        <Region top={x => pdf(x, sd)} bottom={() => 0} from={370} to={375} color={C.f} opacity={0.4} />
        {n > 1 && <Plot.OfX y={x => pdf(x, SIGMA)} domain={[X0, X1]} color={C.guide} weight={2} style="dashed" />}
        <Plot.OfX y={x => pdf(x, sd)} domain={[X0, X1]} color={C.f} weight={3} />
        <Line.Segment point1={[370, 0]} point2={[370, 0.285]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[375, 0]} point2={[375, 0.285]} color={C.guide} style="dashed" weight={1} />
        <Label at={[372.5, 0.285]} attach="c" size={12}>370 to 375</Label>
        {n > 1 && <Label at={[386, pdf(386, SIGMA)]} attach="n" color={C.guide} size={11} gap={6}>one packet</Label>}
        <Label at={[MU + 1.2 * sd, pdf(MU + 1.2 * sd, sd)]} attach="ne" color={C.f} size={12} gap={4}>{n === 1 ? 'X' : 'X̄'}</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={100} step={1} format={v => String(Math.round(v))} />
        <Buttons>
          <ActionButton label="n = 1 (one packet)" onClick={() => setN(1)} />
          <ActionButton label="n = 50" onClick={() => setN(50)} />
          <ActionButton label="n = 100" onClick={() => setN(100)} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\operatorname{sd}\\left(\\overline{X}\\right) = \\tfrac{15}{\\sqrt{${n}}} \\approx ${sd.toFixed(3)}`} />
          <Readout color={C.f} tex={`\\Pr\\left(370 < \\overline{X} < 375\\right) \\approx ${prob.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
