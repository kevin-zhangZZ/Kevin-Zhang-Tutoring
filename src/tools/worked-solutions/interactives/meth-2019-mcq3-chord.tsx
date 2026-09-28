// 2019 Methods Exam 2 MCQ 3 — the average rate of change of f(x) = a/(x − 4) from x = 6 to x = 8
// is the gradient of the chord joining (6, a/2) and (8, a/4): rise f(8) − f(6) = −a/4 over run 2,
// so −a/8 whatever a is (option E). The a slider redraws the curve and the rise/run triangle with
// the live numbers; stopping at the rise gives −a/4 (option D). A toggle shows the tempting mix-up
// with average VALUE: the shaded area ∫₆⁸ a/(x − 4) dx = a log_e 2 (option A) and the average
// height (a/2) log_e 2 (option B), both positive heights/areas, while the curve is falling.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle } from './kit'

const d = (v: number) => {
  const r = Math.round(v * 100) / 100
  return (Object.is(r, -0) ? 0 : r).toString().replace('-', '−')
}
const t = (v: number) => d(v).replace('−', '-')

export default function Chord() {
  const [a, setA] = useState(4)
  const [avg, setAvg] = useState(false)
  const f = (x: number) => a / (x - 4)
  const y6 = a / 2
  const y8 = a / 4
  const rise = y8 - y6
  const grad = rise / 2
  const area = a * Math.log(2)
  const mean = area / 2

  return (
    <div>
      <Plane x={[0, 10]} y={[-2, 5]} xStep={1} yStep={1} height={320}>
        <Line.Segment point1={[4, -2.5]} point2={[4, 5.5]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[0, 4 - a / 2.4]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[4 + a / 5.5, 10]} color={C.f} weight={3} />

        {avg && (
          <>
            <Region top={f} bottom={() => 0} from={6} to={8} color={C.violet} opacity={0.3} />
            <Label at={[7, y8 / 2]} attach="c" color={C.violet} size={12}>A: area</Label>
            <Line.Segment point1={[6, mean]} point2={[8, mean]} color={C.bad} style="dashed" weight={2} />
            <Label at={[6, mean]} attach="w" color={C.bad} size={12}>B: average height</Label>
          </>
        )}

        {!avg && (
          <>
            <Line.Segment point1={[6, y6]} point2={[8, y6]} color={C.g} weight={2} />
            <Line.Segment point1={[8, y6]} point2={[8, y8]} color={C.violet} weight={2} />
            <Label at={[7, y6]} attach="n" color={C.g} size={12}>run = 2</Label>
            <Label at={[8, (y6 + y8) / 2]} attach="e" color={C.violet} size={12}>{`rise = ${d(rise)}`}</Label>
          </>
        )}

        <Line.Segment point1={[6, y6]} point2={[8, y8]} color={C.good} weight={3} />
        <Point x={6} y={y6} color={C.good} />
        <Point x={8} y={y8} color={C.good} />
        <Label at={[6, y6]} attach={avg ? 'ne' : 'sw'} color={C.good} size={12}>{`(6, ${d(y6)})`}</Label>
        <Label at={[8, y8]} attach={avg ? 'ne' : 's'} color={C.good} size={12}>{`(8, ${d(y8)})`}</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={1} max={8} step={0.5} format={d} />
        <Buttons>
          <Toggle label="Average value instead (options A and B)" checked={avg} onChange={setAvg} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`f(6) = \\tfrac{a}{2} = ${t(y6)}, \\quad f(8) = \\tfrac{a}{4} = ${t(y8)}`} />
          <Readout color={C.good} tex={`\\text{chord gradient} = \\tfrac{${t(y8)} - ${t(y6)}}{2} = -\\tfrac{a}{8} = ${t(grad)}`} />
          {avg && <Readout color={C.violet} tex={`\\text{area} = a\\log_e 2 \\approx ${t(area)}`} />}
          {avg && <Readout color={C.bad} tex={`\\text{average value} = \\tfrac{a}{2}\\log_e 2 \\approx ${t(mean)}`} />}
        </Readouts>
        {avg ? (
          <Notice tone="warn">
            The shaded area is <M>{'\\int_6^8 \\frac{a}{x-4}\\,dx = a\\log_e 2'}</M> (option A), and dividing by the width{' '}
            <M>2</M> gives the average <em>value</em> <M>{'\\tfrac{a}{2}\\log_e 2'}</M> (option B): the height of the red
            line. Both say how <em>high</em> the curve is, and both are positive. But the curve is falling from{' '}
            <M>x = 6</M> to <M>x = 8</M>, so its rate of change must be negative. Rate of change is a slope: the green chord.
          </Notice>
        ) : (
          <Notice>
            An average rate of change only looks at the two endpoints: it is the gradient of the green chord joining them.
            Rise <M>{`= f(8) - f(6) = \\tfrac{a}{4} - \\tfrac{a}{2} = -\\tfrac{a}{4}`}</M> <M>{`(${t(rise)})`}</M>, run{' '}
            <M>= 8 - 6 = 2</M>, so the gradient is <M>{`-\\tfrac{a}{8}\\ (${t(grad)})`}</M>. Drag <M>a</M>: the chord is always
            downhill and its gradient is always <M>a</M> divided by <M>-8</M>. The rise alone, <M>{'-\\tfrac{a}{4}'}</M>, is
            option D.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
