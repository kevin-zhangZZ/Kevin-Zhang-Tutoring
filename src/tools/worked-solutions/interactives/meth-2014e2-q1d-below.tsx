// 2014 Methods Exam 2 Q1d — the population n(t) = 1200 + 400cos(πt/3) dips below a level twice in
// the 12 months, because the period is 6 months. A slider moves the level (start: n(10) = 1000);
// the shaded dips, the crossing times, the total time below and the fraction of the year are read
// off live. At 1000 the crossings are t = 2, 4, 8, 10, giving 4 months, i.e. 1/3 of the year —
// the two things the report says students missed (the second dip, and turning 4 months into a fraction).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider } from './kit'

const n = (t: number) => 1200 + 400 * Math.cos((Math.PI * t) / 3)
const fmt = (v: number) => (Math.abs(v - Math.round(v)) < 0.005 ? String(Math.round(v)) : v.toFixed(2))

export default function BelowLevel() {
  const [L, setL] = useState(1000)
  const c = (L - 1200) / 400
  // In each 6-month period n < L for t in (t1, 6 − t1), where t1 = 3·arccos(c)/π.
  const t1 = (3 * Math.acos(c)) / Math.PI
  const dips: [number, number][] = [
    [t1, 6 - t1],
    [6 + t1, 12 - t1],
  ]
  const below = 2 * (6 - 2 * t1)
  const frac = below / 12
  const crossings = [t1, 6 - t1, 6 + t1, 12 - t1]
  const at1000 = Math.abs(L - 1000) < 1

  return (
    <div>
      <Plane x={[0, 12.6]} y={[0, 1750]} xStep={2} yStep={400} height={300} xLabel="t" yLabel="n">
        {dips.map(([a, b]) => (
          <Region key={a} top={() => L} bottom={n} from={a} to={b} color={C.bad} opacity={0.3} />
        ))}
        {dips.map(([a, b]) => (
          <Line.Segment key={`bar${a}`} point1={[a, 0]} point2={[b, 0]} color={C.bad} weight={6} />
        ))}
        <Plot.OfX y={n} domain={[0, 12]} color={C.f} weight={3} />
        <Line.Segment point1={[0, L]} point2={[12, L]} color={C.g} style="dashed" weight={2} />
        <Label at={[0.1, L]} color={C.g} attach="se">{`n = ${Math.round(L)}`}</Label>
        {crossings.map(t => (
          <Line.Segment key={`v${t}`} point1={[t, 0]} point2={[t, L]} color={C.guide} style="dashed" weight={1} />
        ))}
      </Plane>
      <Controls>
        <Slider label="\text{level}" value={L} onChange={setL} min={820} max={1580} step={10} format={v => v.toFixed(0)} />
        <Readouts>
          <Readout tex={`n(t) = ${Math.round(L)} \\text{ at } t = ${crossings.map(fmt).join(',\\ ')}`} />
          <Readout color={C.bad} tex={`\\text{time below} = ${fmt(below)} \\text{ months}`} />
          <Readout color={at1000 ? C.good : undefined} tex={`\\text{fraction} = \\tfrac{${fmt(below)}}{12} \\approx ${frac.toFixed(3)}`} />
        </Readouts>
        {at1000 ? (
          <Notice tone="good">
            <b>Two dips, not one.</b> The period is 6 months, so the population is below 1000 on{' '}
            <M>(2,4)</M> <em>and</em> again on <M>(8,10)</M>: <M>{'2+2=4'}</M> months, and{' '}
            <M>{'\\tfrac{4}{12}=\\tfrac13'}</M> of the year. Move the level up to 1200 — the dips widen to half the year.
          </Notice>
        ) : (
          <Notice>
            Whatever the level, the 12 months hold two full periods, so there are always two equal dips and four
            crossings. The fraction is the red time on the <M>t</M>-axis divided by 12. Set the level back to 1000
            to see the answer to part (d).
          </Notice>
        )}
      </Controls>
    </div>
  )
}
