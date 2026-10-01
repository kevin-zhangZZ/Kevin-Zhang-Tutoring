// 2022 Methods Exam 2 Q2c — the combined population r(t) + f(t) peaks at 5339, not at
// 4200 + 2500 = 6700. Slide t through one 160-week cycle and read off r, f and their sum: the
// rabbits peak at t = 40 and the foxes at t = 100, so the two maxima never happen together and
// the violet total curve tops out in between (t ≈ 53.7). The toggle draws the "add the two
// maxima" line from the report's common incorrect approach, which the total never reaches.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const r = (t: number) => 1700 * Math.sin((Math.PI * t) / 80) + 2500
const f = (t: number) => 900 * Math.sin((Math.PI * (t - 60)) / 80) + 1600
const P = (t: number) => r(t) + f(t)
const T_MAX = 53.7306 // where P peaks in 0 ≤ t ≤ 160 (fMax)
const P_MAX = P(T_MAX) // 5339.456…

export default function OutOfPhase() {
  const [t, setT] = useState(40)
  const [both, setBoth] = useState(false)

  const atTop = Math.abs(t - T_MAX) < 1.2
  const atRabbitPeak = Math.abs(t - 40) < 1.2
  const atFoxPeak = Math.abs(t - 100) < 1.2

  let notice
  if (both) {
    notice = (
      <Notice tone="warn">
        <M>4200 + 2500 = 6700</M> would need <b>both</b> populations at their maximum at the same moment. The
        rabbits peak at <M>t = 40</M> and the foxes at <M>t = 100</M>, 60 weeks apart, so the violet total never
        touches the red line. Slide <M>t</M> to find how high the total really gets.
      </Notice>
    )
  } else if (atTop) {
    notice = (
      <Notice tone="good">
        <b>The total peaks here</b>: <M>{`r + f = ${(Math.floor(P_MAX * 1000) / 1000).toFixed(3)}\\ldots`}</M> at <M>t \approx 53.7</M>. That is
        between the rabbit peak (<M>t = 40</M>) and the fox peak (<M>t = 100</M>), nearer the rabbits because their
        swing is bigger. To the nearest whole number it is 5339: the decimal part .456 is less than .5, so round
        down, not up to 5340.
      </Notice>
    )
  } else if (atRabbitPeak) {
    notice = (
      <Notice>
        At <M>t = 40</M> the rabbits are at their maximum, 4200, but the foxes are only at about 964, so the total is
        about 5164. Slide right a little: for a while the foxes rise faster than the rabbits fall, so the total
        keeps climbing.
      </Notice>
    )
  } else if (atFoxPeak) {
    notice = (
      <Notice>
        At <M>t = 100</M> the foxes are at their maximum, 2500, but the rabbits have dropped to about 1298, so the
        total is only about 3798. A peak in one population is not a peak in the total.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Slide <M>t</M> and watch the violet total. Its highest point is the answer to part c. Then turn on
        &ldquo;Add the two maxima&rdquo; to see why <M>4200 + 2500</M> is never reached.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 320]} y={[0, 7000]} xStep={40} yStep={1000} height={320} xLabel="t" yLabel="P">
        {both && (
          <>
            <Line.Segment point1={[0, 6700]} point2={[320, 6700]} color={C.bad} style="dashed" weight={2} />
            <Label at={[320, 6700]} color={C.bad} attach="sw">4200 + 2500 = 6700</Label>
            <Line.Segment point1={[40, 0]} point2={[40, 4200]} color={C.f} style="dashed" weight={1.5} />
            <Line.Segment point1={[100, 0]} point2={[100, 2500]} color={C.g} style="dashed" weight={1.5} />
          </>
        )}
        <Plot.OfX y={r} domain={[0, 320]} color={C.f} weight={2.5} />
        <Plot.OfX y={f} domain={[0, 320]} color={C.g} weight={2.5} />
        <Plot.OfX y={P} domain={[0, 320]} color={C.violet} weight={3} />
        <Line.Segment point1={[t, 0]} point2={[t, P(t)]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={t} y={r(t)} color={C.f} />
        <Point x={t} y={f(t)} color={C.g} />
        <Point x={t} y={P(t)} color={atTop ? C.good : C.violet} />
        <Label at={[200, r(200)]} color={C.f} attach="n">r</Label>
        <Label at={[260, f(260)]} color={C.g} attach="n">f</Label>
        <Label at={[213.7, P(213.7)]} color={C.violet} attach="n">r + f</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={160} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          <Toggle label="Add the two maxima" checked={both} onChange={setBoth} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`r(t) \\approx ${r(t).toFixed(0)}`} />
          <Readout color={C.g} tex={`f(t) \\approx ${f(t).toFixed(0)}`} />
          <Readout color={atTop ? C.good : C.violet} tex={`r(t) + f(t) \\approx ${P(t).toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
