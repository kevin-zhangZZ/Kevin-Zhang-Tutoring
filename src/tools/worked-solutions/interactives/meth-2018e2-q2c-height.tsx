// 2018 Methods Exam 2 Q2c — the average value of b on [0, 6] is the height of the rectangle with the
// same area as under the curve. Drag a level h: the blue bits of curve poking above the line and the
// orange gaps below it balance exactly at h = (1/6)∫₀⁶ b(t) dt ≈ 255.85. A toggle shows the report's
// wrong method — (b(0) + b(1) + … + b(6))/6 ≈ 265.10, seven hourly readings divided by six.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Point, Plot, Readout, Readouts, Region, Slider, Toggle, integrate, num, tick,
} from './kit'

const A = 4500 / 7
const b = (t: number) => A * (Math.exp(-t / 5) - Math.exp(-0.9 * t))
const AREA = integrate(b, 0, 6, 600)
const AVG = AREA / 6
const HOURS = [0, 1, 2, 3, 4, 5, 6]
const HOURLY = HOURS.reduce((s, k) => s + b(k), 0) / 6

export default function Height() {
  const [h, setH] = useState(150)
  const [hourly, setHourly] = useState(false)

  const above = integrate(t => Math.max(b(t) - h, 0), 0, 6, 600)
  const below = integrate(t => Math.max(h - b(t), 0), 0, 6, 600)
  const balanced = Math.abs(h - AVG) < 1.5
  const lineColor = balanced ? C.good : C.violet

  let notice
  if (hourly) {
    notice = (
      <Notice tone="warn">
        The red dots are the seven readings <M>{'b(0),\\dots,b(6)'}</M>. Adding them and dividing by <M>6</M> gives{' '}
        <M>{`${num(HOURLY, 2)}`}</M>: seven values over six, and only seven instants of a curve that changes all the
        time. The average value uses <em>every</em> instant, which is what the integral adds up. Switch this off and
        balance the line instead.
      </Notice>
    )
  } else if (balanced) {
    notice = (
      <Notice tone="good">
        <b>Balanced.</b> The blue curve poking above the line exactly fills the orange gaps below it, so a rectangle{' '}
        <M>6</M> wide and <M>{`${num(AVG, 2)}`}</M> tall has the same area, <M>{`${num(AREA, 1)}`}</M>, as under the
        curve. That height is the average value, <M>{'\\frac16\\int_0^6 b(t)\\,dt\\approx256'}</M> mg.
      </Notice>
    )
  } else if (h < AVG) {
    notice = (
      <Notice>
        There is more curve above the line (blue, <M>{`${num(above, 0)}`}</M>) than gap below it (orange,{' '}
        <M>{`${num(below, 0)}`}</M>), so this level is <b>too low</b> to be the average. Raise <M>h</M> until the two
        areas match.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the orange gaps below the line (<M>{`${num(below, 0)}`}</M>) outweigh the blue curve above it (
        <M>{`${num(above, 0)}`}</M>), so the level is <b>too high</b>. Lower <M>h</M> until they balance.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 6.6]} y={[0, 370]} xStep={1} yStep={100} height={320} xLabel="t" yLabel="y" yLabels={v => (v > 350 ? "" : tick(v))}>
        {!hourly && (
          <>
            <Region top={t => Math.max(b(t), h)} bottom={() => h} from={0} to={6} color={C.f} opacity={0.35} />
            <Region top={() => h} bottom={t => Math.min(b(t), h)} from={0} to={6} color={C.g} opacity={0.35} />
          </>
        )}
        <Plot.OfX y={b} domain={[0, 6]} color={C.f} weight={3} />
        {!hourly && (
          <>
            <Line.Segment point1={[0, h]} point2={[6, h]} color={lineColor} weight={3} />
            <Label at={[6, h]} color={lineColor} attach="e">h</Label>
          </>
        )}
        {hourly && (
          <>
            {HOURS.map(k => (
              <Line.Segment key={k} point1={[k, 0]} point2={[k, b(k)]} color={C.bad} weight={2} />
            ))}
            {HOURS.map(k => (
              <Point key={`p${k}`} x={k} y={b(k)} color={C.bad} />
            ))}
            <Line.Segment point1={[0, HOURLY]} point2={[6, HOURLY]} color={C.bad} weight={2.5} style="dashed" />
            <Line.Segment point1={[0, AVG]} point2={[6, AVG]} color={C.good} weight={2.5} />
            <Label at={[6, HOURLY]} color={C.bad} attach="ne">{num(HOURLY, 1)}</Label>
            <Label at={[6, AVG]} color={C.good} attach="se">{num(AVG, 1)}</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={0} max={350} step={0.5} format={v => v.toFixed(1)} />
        <Buttons>
          <Toggle label="Average the hourly readings instead" checked={hourly} onChange={setHourly} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\int_0^6 b(t)\\,dt \\approx ${num(AREA, 1)}`} />
          {!hourly && <Readout color={lineColor} tex={`6h = ${num(6 * h, 1)}`} />}
          {!hourly && <Readout tex={`\\text{above} - \\text{below} = ${num(above - below, 1)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
