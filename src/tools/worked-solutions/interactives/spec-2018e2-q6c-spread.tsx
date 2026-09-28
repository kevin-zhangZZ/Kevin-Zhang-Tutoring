// 2018 Specialist Exam 2 Q6c — why a 5 cm shortfall matters for a sample MEAN. Slide the sample
// size n: the distribution of X̄ ~ N(150, (15/√n)²) narrows as n grows, so the tail at or below
// the observed 145 (the p value, shaded) shrinks. At n = 50 it is 0.0092 (parts b and c). At
// n = 1 — one buffalo, which is what putting σ = 15 into normCdf silently assumes — it is 0.3694.
// The dashed grey curve is one buffalo's height, N(150, 15²), for comparison.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider } from './kit'

function erf(x: number) {
  // Abramowitz & Stegun 7.1.26, |error| < 1.5e-7 — plenty for four decimal places.
  const s = Math.sign(x)
  const a = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const cdf = (x: number, m: number, s: number) => 0.5 * (1 + erf((x - m) / (s * Math.SQRT2)))
const pdf = (x: number, m: number, s: number) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI))

const X0 = 130
const X1 = 170
const YTOP = 0.28

export default function Spread() {
  const [n, setN] = useState(50)
  const sd = 15 / Math.sqrt(n)
  const z = (145 - 150) / sd
  const p = cdf(145, 150, sd)
  const sig = p < 0.05

  let notice
  if (n === 50) {
    notice = (
      <Notice tone="good">
        With <M>n = 50</M> the sample mean has standard deviation <M>{'\\tfrac{15}{\\sqrt{50}} \\approx 2.12'}</M>, so{' '}
        <M>145</M> sits <M>2.36</M> of them below <M>150</M>. Only <M>0.0092</M> of the curve lies at or below it: that
        barely visible orange sliver is the <M>p</M> value of part c. Drag <M>n</M> down to <M>1</M> to see why the <M>15</M> must be
        divided by <M>{'\\sqrt{50}'}</M>.
      </Notice>
    )
  } else if (n === 1) {
    notice = (
      <Notice tone="warn">
        With <M>n = 1</M> this is just one buffalo&apos;s height, and a <M>145</M> cm buffalo is ordinary:{' '}
        <M>{'\\Pr(X \\le 145) \\approx 0.3694'}</M>. That is the number you get by putting <M>{'\\sigma = 15'}</M> into
        normCdf. It answers a question about one animal, not about the average of fifty. Now slide <M>n</M> back up.
      </Notice>
    )
  } else if (n < 50) {
    notice = (
      <Notice>
        Fewer buffaloes means the average wobbles more, so a mean of <M>145</M> is less surprising and the tail is bigger.
        The same <M>145</M> only becomes significant at the <M>{'5\\%'}</M> level once <M>{'n \\ge 25'}</M>
        {sig ? ' (it is here).' : ' (it is not here).'} Try <M>n = 24</M> and <M>n = 25</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        More buffaloes, narrower curve: tall and short animals cancel out even better in the average. A mean of{' '}
        <M>145</M> would then be even harder to explain by chance if the true mean were <M>150</M>, so <M>p</M> keeps
        shrinking. Press &ldquo;Back to <M>n = 50</M>&rdquo; for the exam&apos;s sample.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, YTOP]} xStep={5} yStep={1} yLabels={false} xLabel="" yLabel="" height={300}>
        <Plot.OfX y={x => pdf(x, 150, 15)} domain={[X0, X1]} color={C.guide} weight={2} style="dashed" />
        <Region top={x => pdf(x, 150, sd)} bottom={() => 0} from={X0} to={145} color={C.g} opacity={0.45} />
        <Plot.OfX y={x => pdf(x, 150, sd)} domain={[X0, X1]} color={C.f} weight={3} />
        <Line.Segment point1={[150, 0]} point2={[150, 0.25]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[145, 0]} point2={[145, 0.25]} color={C.g} style="dashed" weight={2} />
        <Label at={[150, 0.25]} attach="ne" color={C.f} size={12}>μ = 150</Label>
        <Label at={[145, 0.25]} attach="nw" color={C.g} size={12}>x̄ = 145</Label>
        <Label at={[135, pdf(135, 150, 15)]} attach="n" color={C.guide} size={12}>one buffalo</Label>
        {n >= 3 && (
          <Label at={[150 + 1.1 * sd, pdf(150 + 1.1 * sd, 150, sd)]} attach="e" color={C.f} size={12}>
            {`mean of ${n}`}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={100} step={1} format={v => String(Math.round(v))} />
        <Buttons>
          <ActionButton label="n = 1 (one buffalo)" onClick={() => setN(1)} />
          <ActionButton label="Back to n = 50" onClick={() => setN(50)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\operatorname{sd}(\\overline{X}) = \\tfrac{15}{\\sqrt{${n}}} \\approx ${sd.toFixed(4)}`} />
          <Readout tex={`z = \\tfrac{145-150}{${sd.toFixed(3)}} \\approx ${z.toFixed(2)}`} />
          <Readout color={C.g} tex={`p = \\Pr(\\overline{X} \\le 145 \\mid \\mu = 150) \\approx ${p.toFixed(4)}`} />
          <Readout color={sig ? C.good : C.bad} tex={sig ? 'p < 0.05' : 'p \\ge 0.05'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
