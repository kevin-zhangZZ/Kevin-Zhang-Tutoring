// 2018 Methods Exam 1 Q4b — standardising only relabels the axis. The bell for X ~ N(6, 2²) is drawn
// once, with a second (violet) ruler under the x-axis marking z = (x − 6)/2. Slide the cut-off x: the
// shaded tail is Pr(X > x) and Pr(Z > z) at the same time, and x = 7 lines up with z = ½. The mistake
// toggle divides by the variance 4 instead: the ruler's ticks spread 4 apart, 7 reads as z = ¼, but
// that ruler belongs to the wider dashed bell N(6, 4²), whose tail beyond 7 is 0.401, not 0.309.
import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle } from './kit'

const MU = 6
const X_MIN = -0.5
const X_MAX = 12.5
const RULER = -0.05 // height of the z-ruler, below the x-axis numbers

// Abramowitz & Stegun 7.1.26 (|error| < 1.5e-7) — plenty for 3 d.p. readouts.
function erf(x: number) {
  const s = Math.sign(x)
  const a = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const Phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2))
const normal = (sd: number) => (x: number) => Math.exp(-((x - MU) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI))
const pdf2 = normal(2)
const pdf4 = normal(4)

const fmtZ = (z: number) => {
  const r = Math.round(z * 100) / 100
  return (r < 0 ? '-' : '') + Math.abs(r).toFixed(2)
}

export default function Rulers() {
  const [c, setC] = useState(7)
  const [wrong, setWrong] = useState(false)

  const sd = wrong ? 4 : 2
  const z = (c - MU) / sd
  const trueTail = 1 - Phi((c - MU) / 2)
  const claimed = 1 - Phi(z)
  const at7 = Math.abs(c - 7) < 0.02
  const rulerColor = wrong ? C.bad : C.violet
  const ticks: number[] = []
  for (let k = -4; k <= 4; k++) {
    const x = MU + sd * k
    if (Math.abs(x - MU) <= 5.5) ticks.push(k) // keep clear of the y-axis at x = 0
  }

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>Dividing by the variance.</b> With <M>\sigma = 4</M> the ruler&apos;s ticks are 4 apart, so{' '}
        <M>x = {c.toFixed(2)}</M> reads as <M>z = {fmtZ(z)}</M>. But a ruler with that spacing belongs to the red
        dashed bell <M>{'N(6,\\,4^2)'}</M>, a different, wider distribution: its tail is{' '}
        <M>{claimed.toFixed(3)}</M>, while the real tail (blue) is <M>{trueTail.toFixed(3)}</M>. At <M>x = 7</M>{' '}
        this is exactly how the report&apos;s wrong answer <M>{'b = -\\tfrac14'}</M> arises.
      </Notice>
    )
  } else if (at7) {
    notice = (
      <Notice tone="good">
        <b>
          <M>x = 7</M> sits directly above <M>{'z = \\tfrac12'}</M>
        </b>
        : 7 is 1 unit above the mean, and 1 unit is half of <M>\sigma = 2</M>. The shaded area doesn&apos;t care which
        ruler you read it on, so <M>{'\\Pr(X > 7) = \\Pr\\left(Z > \\tfrac12\\right)'}</M>. Now turn on the mistake to
        see what dividing by 4 does.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Every <M>x</M> has a partner directly below it on the violet ruler: <M>{'z = \\frac{x - 6}{2}'}</M>, the number
        of standard deviations from the mean. Here <M>x = {c.toFixed(2)}</M> matches <M>z = {fmtZ(z)}</M>, and one
        shaded area is both <M>{`\\Pr(X > ${c.toFixed(2)})`}</M> and <M>{`\\Pr(Z > ${fmtZ(z)})`}</M>. Slide back to{' '}
        <M>x = 7</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X_MIN, X_MAX]} y={[-0.07, 0.22]} xStep={1} yStep={0.1} height={300} yLabels={false} yLabel="">
        {wrong && <Region top={pdf4} bottom={() => 0} from={c} to={X_MAX} color={C.bad} opacity={0.14} />}
        <Region top={pdf2} bottom={() => 0} from={c} to={X_MAX} color={C.f} opacity={0.3} />
        {wrong && <Plot.OfX y={pdf4} domain={[X_MIN, X_MAX]} color={C.bad} weight={2.5} style="dashed" />}
        <Plot.OfX y={pdf2} domain={[X_MIN, X_MAX]} color={C.f} weight={3} />
        <Label at={[8.3, pdf2(8.3)]} color={C.f} attach="ne" size={12}>
          σ = 2
        </Label>
        {wrong && (
          <Label at={[11.4, pdf4(11.4)]} color={C.bad} attach="n" size={12}>
            σ = 4
          </Label>
        )}

        {/* the z-ruler */}
        <Line.Segment point1={[X_MIN, RULER]} point2={[X_MAX, RULER]} color={rulerColor} weight={2} />
        {ticks.map(k => (
          <Line.Segment
            key={k}
            point1={[MU + sd * k, RULER - 0.006]}
            point2={[MU + sd * k, RULER + 0.006]}
            color={rulerColor}
            weight={2}
          />
        ))}
        {ticks.map(k => (
          <Label key={`l${k}`} at={[MU + sd * k, RULER - 0.006]} color={rulerColor} attach="s" size={12} gap={4}>
            {k < 0 ? `−${-k}` : `${k}`}
          </Label>
        ))}
        <Label at={[X_MAX, RULER]} color={rulerColor} attach="e" size={14} italic>
          z
        </Label>

        {/* the cut-off, carried straight down from the curve to both rulers */}
        <Line.Segment point1={[c, RULER]} point2={[c, pdf2(c)]} color={C.g} style="dashed" weight={2} />
        <Point x={c} y={0} color={C.g} />
        <Point x={c} y={RULER} color={rulerColor} />
      </Plane>
      <Controls>
        <Slider label="x" value={c} onChange={setC} min={1} max={11} step={0.05} />
        <Toggle label="Mistake: divide by the variance (σ = 4)" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.g} tex={`x = ${c.toFixed(2)}`} />
          <Readout color={rulerColor} tex={`z = \\frac{${c.toFixed(2)} - 6}{${sd}} = ${fmtZ(z)}`} />
          <Readout color={C.f} tex={`\\Pr(X > ${c.toFixed(2)}) \\approx ${trueTail.toFixed(3)}`} />
          {wrong && <Readout color={C.bad} tex={`\\Pr(Z > ${fmtZ(z)}) \\approx ${claimed.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
