// 2016 Specialist Exam 1 Q2 — the interval uses the spread of the MEAN of 25 peaches, not of one
// peach. Two normal curves centred on 105 g: one peach, X ~ N(105, 4²), and the mean of n peaches,
// X̄ ~ N(105, (4/√n)²). Slide n: at n = 1 the curves coincide; as n grows the mean's curve narrows
// by a factor of √n. The violet bar is 105 ± 2 × 4/√n — at n = 25 it is 105 ± 1.6 = (103.4, 106.6),
// the answer. The red bar (toggle) is the report's flagged error of using sd 4: 105 ± 8 = (97, 113),
// five times too wide. Shaded: the middle of the mean's curve within 2 sd, area Pr(|Z| < 2) ≈ 0.9545
// — why "an integer multiple" gives 2 for an approximate 95%.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const MU = 105
const SIGMA = 4
const normal = (sd: number) => (x: number) => Math.exp(-0.5 * ((x - MU) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI))
const onePeach = normal(SIGMA)

const X0 = 93
const X1 = 117
const BAR_OK = 0.8
const BAR_BAD = 0.9

function bar(lo: number, hi: number, y: number, color: string) {
  return (
    <>
      <Line.Segment point1={[lo, y]} point2={[hi, y]} color={color} weight={4} />
      <Line.Segment point1={[lo, y - 0.02]} point2={[lo, y + 0.02]} color={color} weight={3} />
      <Line.Segment point1={[hi, y - 0.02]} point2={[hi, y + 0.02]} color={color} weight={3} />
    </>
  )
}

export default function MeanSpread() {
  const [n, setN] = useState(25)
  const [showWrong, setShowWrong] = useState(false)
  const sdMean = SIGMA / Math.sqrt(n)
  const ofMean = normal(sdMean)
  const lo = MU - 2 * sdMean
  const hi = MU + 2 * sdMean

  let notice
  if (showWrong) {
    notice = (
      <Notice tone="warn">
        The red bar uses <M>{'\\sigma = 4'}</M>, the spread of a <em>single</em> peach: <M>105 \pm 8 = (97,\ 113)</M>. That
        is where about <M>{'95\\%'}</M> of individual peaches lie, not where the farm's mean probably lies. The report
        flags this error. Turn it off and compare with the violet bar.
      </Notice>
    )
  } else if (n === 25) {
    notice = (
      <Notice tone="good">
        With <M>n = 25</M>, the mean's sd is <M>{'\\tfrac{4}{\\sqrt{25}} = \\tfrac45'}</M>, so the interval is{' '}
        <M>105 \pm 1.6 = (103.4,\ 106.6)</M>. The shaded band, within 2 sd of 105, holds about <M>{'95.45\\%'}</M> of the area under the mean's curve. Slide <M>n</M> down to <M>1</M>, then show the wrong interval.
      </Notice>
    )
  } else if (n === 1) {
    notice = (
      <Notice>
        At <M>n = 1</M> the "mean" is just one peach, so the two curves coincide: sd <M>4</M>, interval{' '}
        <M>(97,\ 113)</M>. Averaging more peaches cancels out the heavy and light ones, so the mean's curve narrows by a
        factor of <M>{'\\sqrt n'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The mean of <M>{`${n}`}</M> peaches has sd <M>{`\\tfrac{4}{\\sqrt{${n}}} \\approx ${sdMean.toFixed(3)}`}</M>.
        Quadrupling <M>n</M> only halves the width. Press <M>n = 25</M> for the question's sample.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, 0.95]} xStep={3} yStep={1} yLabels={false} xLabel="" yLabel="" height={300}>
        <Region top={ofMean} bottom={() => 0} from={lo} to={hi} color={C.violet} opacity={0.25} />
        <Plot.OfX y={onePeach} domain={[X0, X1]} color={C.g} weight={2.5} />
        <Plot.OfX y={ofMean} domain={[X0, X1]} color={C.violet} weight={3} />
        <Label at={[108.5, onePeach(108.5)]} attach="ne" color={C.g} size={12}>one peach: sd 4</Label>
        {n > 1 && (
          <Label at={[MU + sdMean, ofMean(MU + sdMean)]} attach="e" color={C.violet} size={12}>
            {`mean of ${n}: sd ${sdMean.toFixed(2)}`}
          </Label>
        )}
        {bar(lo, hi, BAR_OK, C.violet)}
        <Label at={[lo, BAR_OK]} attach="w" color={C.violet} size={12}>{lo.toFixed(1)}</Label>
        <Label at={[hi, BAR_OK]} attach="e" color={C.violet} size={12}>{hi.toFixed(1)}</Label>
        {showWrong && (
          <>
            {bar(97, 113, BAR_BAD, C.bad)}
            <Label at={[97, BAR_BAD]} attach="w" color={C.bad} size={12}>97</Label>
            <Label at={[113, BAR_BAD]} attach="e" color={C.bad} size={12}>113</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={50} step={1} format={v => v.toFixed(0)} />
        <Buttons>
          <ActionButton label="n = 1" onClick={() => setN(1)} />
          <ActionButton label="n = 25" onClick={() => setN(25)} />
        </Buttons>
        <Toggle label="Show the interval using sd 4 (wrong)" checked={showWrong} onChange={setShowWrong} />
        <Readouts>
          <Readout tex={`\\operatorname{sd}(\\bar X) = \\tfrac{4}{\\sqrt{${n}}} \\approx ${sdMean.toFixed(3)}`} />
          <Readout color={C.violet} tex={`105 \\pm 2 \\times ${sdMean.toFixed(3)} = (${lo.toFixed(2)},\\ ${hi.toFixed(2)})`} />
          <Readout tex={`\\text{shaded area} = \\Pr(-2 < Z < 2) \\approx 0.9545`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
