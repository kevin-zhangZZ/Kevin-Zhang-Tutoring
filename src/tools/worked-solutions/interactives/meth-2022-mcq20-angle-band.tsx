// 2022 Methods Exam 2 MCQ 20 — "more than 40 m" is a middle band of angles, not one cut-off:
// d = 50 sin(2θ) rises to 50 m at θ = 45° and falls again, so d > 40 exactly when
// 26.57° < θ < 63.43°. The lower panel is the bell for θ ~ N(42, 8²) with that band shaded: the
// mean sits well inside it, so only the thin tails miss and the answer is near 1 (0.969, A). The
// left tail alone is 0.027 (option E). The toggle redraws the bell with σ = 64, the variance entered
// as the standard deviation, which gives 0.226 (option C) and puts about half the probability on
// impossible angles below 0° or past 90°. A slider changes the distance to show the band is always
// centred on 45°. Only 30% of students chose A.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const MU = 42
const rad = (deg: number) => (deg * Math.PI) / 180
const dist = (t: number) => 50 * Math.sin(rad(2 * t))

/** Standard normal cdf (Abramowitz and Stegun 7.1.26, error below 2 × 10⁻⁷). */
function Phi(z: number): number {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const erf = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)
  return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf)
}

export default function AngleBand() {
  const [d, setD] = useState(40)
  const [wide, setWide] = useState(false)

  const sigma = wide ? 64 : 8
  const pdf = (t: number) => Math.exp(-(((t - MU) / sigma) ** 2) / 2) / (sigma * Math.sqrt(2 * Math.PI))
  const cdf = (t: number) => Phi((t - MU) / sigma)

  const lo = (Math.asin(d / 50) * 180) / Math.PI / 2
  const hi = 90 - lo
  const pLow = cdf(lo)
  const pMid = cdf(hi) - cdf(lo)
  const pHigh = 1 - cdf(hi)
  const pReal = cdf(90) - cdf(0)
  const atForty = d === 40

  let notice
  if (wide) {
    notice = (
      <Notice tone="warn">
        With <M>\sigma = 64</M> the bell is so flat it barely rises off the axis: only about{' '}
        <M>{pReal.toFixed(2)}</M> of its probability lies between <M>0^\circ</M> and <M>90^\circ</M>, and the rest is on
        impossible kicks (into the ground or past vertical).
        {atForty ? (
          <>
            {' '}That is how option C&apos;s <M>0.226</M> arises.
          </>
        ) : null}{' '}
        The question gives the standard deviation, <M>8^\circ</M>; <M>64 = 8^2</M> is the variance, the second number in
        the report&apos;s <M>{'\\mathrm{N}(42^\\circ, 64^\\circ)'}</M>. Turn the toggle off.
      </Notice>
    )
  } else if (atForty) {
    notice = (
      <Notice>
        A kick goes more than 40 m only for angles in the green band, <M>{'26.57^\\circ < \\theta < 63.43^\\circ'}</M>:
        too low <b>or</b> too high and it falls short, so there are two cut-offs, not one. The bell for{' '}
        <M>\theta</M> is centred at <M>42^\circ</M>, well inside the band, so only its thin red tails miss and the answer
        must be close to 1: about <M>0.969</M>. The left tail alone, <M>0.027</M>, is option E. Now try the toggle.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The band is always centred on <M>45^\circ</M>, where <M>\sin(2\theta) = 1</M> and the kick is longest (50 m).
        A longer distance narrows the band, more of the bell falls outside it, and the probability drops. Set the
        distance back to 40 m for the question&apos;s answer.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 90]} y={[0, 55]} xStep={15} yStep={10} height={210} xLabel="θ" yLabel="" yLabels={v => (v > 55 ? '' : String(v))}>
        <Label at={[1.5, 55]} attach="e" size={14} italic>
          d
        </Label>
        <Line.Segment point1={[0, d]} point2={[90, d]} color={C.bad} style="dashed" weight={2} />
        <Label at={[82, d]} attach="n" color={C.bad} size={13}>
          {`d = ${d}`}
        </Label>
        <Line.Segment point1={[lo, 0]} point2={[lo, d]} color={C.good} style="dashed" weight={1.5} />
        <Line.Segment point1={[hi, 0]} point2={[hi, d]} color={C.good} style="dashed" weight={1.5} />
        <Plot.OfX y={dist} domain={[0, 90]} color={C.f} weight={2} />
        <Plot.OfX y={dist} domain={[lo, hi]} color={C.good} weight={4} />
        <Label at={[lo, d * 0.4]} attach="w" color={C.good} size={13}>
          {`${lo.toFixed(1)}°`}
        </Label>
        <Label at={[hi, d * 0.4]} attach="e" color={C.good} size={13}>
          {`${hi.toFixed(1)}°`}
        </Label>
      </Plane>
      <Plane x={[0, 90]} y={[-0.005, 0.055]} xStep={15} yStep={0.01} height={170} xLabel="θ" yLabel="" yLabels={false}>
        <Region top={pdf} bottom={() => 0} from={0} to={lo} color={C.bad} opacity={0.25} />
        <Region top={pdf} bottom={() => 0} from={lo} to={hi} color={C.good} opacity={0.35} />
        <Region top={pdf} bottom={() => 0} from={hi} to={90} color={C.bad} opacity={0.25} />
        <Line.Segment point1={[lo, 0]} point2={[lo, 0.055]} color={C.good} style="dashed" weight={1.5} />
        <Line.Segment point1={[hi, 0]} point2={[hi, 0.055]} color={C.good} style="dashed" weight={1.5} />
        <Plot.OfX y={pdf} domain={[0, 90]} color={C.violet} weight={2.5} />
        <Label at={[MU, pdf(MU)]} attach="n" color={C.violet} size={13}>
          {wide ? 'σ = 64' : 'σ = 8'}
        </Label>
      </Plane>
      <Controls>
        <Slider label="d" value={d} onChange={setD} min={20} max={49} step={1} format={v => `${v} m`} />
        <Toggle label="Use σ = 64 (the variance)" checked={wide} onChange={setWide} />
        <Readouts>
          <Readout color={C.bad} tex={`\\text{too low: } \\Pr(\\theta < ${lo.toFixed(2)}) \\approx ${pLow.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\Pr(${lo.toFixed(2)} < \\theta < ${hi.toFixed(2)}) \\approx ${pMid.toFixed(3)}`} />
          <Readout color={C.bad} tex={`\\text{too high: } \\Pr(\\theta > ${hi.toFixed(2)}) \\approx ${pHigh.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
