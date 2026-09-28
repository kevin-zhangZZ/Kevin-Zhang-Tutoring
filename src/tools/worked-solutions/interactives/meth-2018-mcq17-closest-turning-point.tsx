// 2018 Methods Exam 2 MCQ 17 — as b changes, the turning point (b, 1 − b²) of y = x² − 2bx + 1
// rides along the dashed parabola y = 1 − x². A circle centred at O passes through the turning
// point: while the dashed path dips inside the circle, a closer turning point exists; the minimum
// distance is where the circle only touches the path (b = ±1/√2, D = √3/2). Starts at b = 0
// (option A, D = 1), where the path visibly goes inside the circle. The lower plot is
// D² = b⁴ − b² + 1 against b: b = 0 is the stationary point that is a hump (local max), not the min.
// Buttons jump to each option's b.

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, tick } from './kit'

const D2 = (b: number) => b ** 4 - b ** 2 + 1
const BEST = 1 / Math.SQRT2
const skipOne = (v: number) => (Math.abs(v - 1) < 1e-9 ? '' : tick(v))
const skipUnit = (v: number) => (Math.abs(Math.abs(v) - 1) < 1e-9 ? '' : tick(v))
const skipEnds = (v: number) => (Math.abs(Math.abs(v) - 1.5) < 1e-9 ? '' : tick(v))

const OPTIONS: { letter: string; b: number; tex: string }[] = [
  { letter: 'A', b: 0, tex: 'b=0' },
  { letter: 'B', b: 1, tex: 'b=1' },
  { letter: 'C', b: BEST, tex: 'b=\\tfrac{1}{\\sqrt2}' },
  { letter: 'D', b: 0.5, tex: 'b=\\tfrac12' },
  { letter: 'E', b: 0.25, tex: 'b=\\tfrac14' },
]

export default function ClosestTurningPoint() {
  const [b, setB] = useState(0)
  const tp: [number, number] = [b, 1 - b * b]
  const d2 = D2(b)
  const d = Math.sqrt(d2)
  const a = Math.abs(b)
  const atMin = Math.abs(a - BEST) < 0.012
  const atZero = a < 0.012
  const atOne = Math.abs(a - 1) < 0.012

  let notice
  if (atZero) {
    notice = (
      <Notice tone="warn">
        <M>{'b = 0'}</M> (option A) puts the turning point at <M>{'(0, 1)'}</M>, exactly <M>1</M> unit from <M>O</M>. But
        look at the violet circle: on both sides the dashed path of turning points <b>dips inside it</b>, so there are
        turning points closer to <M>O</M>. In the lower graph, <M>{'b = 0'}</M> is a stationary point of <M>{'D^2'}</M>{' '}
        at the top of a hump, a local <b>maximum</b>. Slide <M>b</M> to the right.
      </Notice>
    )
  } else if (atMin) {
    notice = (
      <Notice tone="good">
        Now the circle only <b>touches</b> the dashed path; no turning point lies inside it. This is the closest the
        turning point ever gets: <M>{'D^2 = \\tfrac34'}</M>, so <M>{'D = \\tfrac{\\sqrt3}{2} \\approx 0.866'}</M>, at{' '}
        <M>{'b = \\pm\\tfrac{1}{\\sqrt2} \\approx \\pm0.707'}</M> (option C). In the lower graph it&apos;s the bottom of a
        valley. Try <M>{'b = -\\tfrac{1}{\\sqrt2}'}</M> too: the picture is a mirror image.
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice>
        <M>{'b = \\pm1'}</M> (option B) puts the turning point on the <M>x</M>-axis at <M>{'(\\pm1, 0)'}</M>. Its height is
        zero, but it&apos;s still <M>1</M> unit from <M>O</M>, no closer than <M>{'b = 0'}</M>. Making <M>y</M> zero
        isn&apos;t the same as making the distance small; the dashed path still goes inside the circle.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        As <M>b</M> changes, the whole parabola slides and its turning point <M>{'(b,\\ 1-b^2)'}</M> rides along the dashed
        parabola <M>{'y = 1 - x^2'}</M>. The violet circle is centred at <M>O</M> and passes through the turning point.
        Whenever the dashed path goes inside the circle, a closer turning point exists. Find the <M>b</M> where the circle
        just touches the path.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2, 2]} y={[-1, 2.2]} xStep={1} yStep={1} height={360} equalScale xLabels={skipUnit} yLabels={skipUnit}>
        <Circle center={[0, 0]} radius={d} color={C.violet} fillOpacity={0.08} weight={1.5} />
        <Plot.OfX y={x => 1 - x * x} domain={[-4, 4]} color={C.guide} style="dashed" weight={2} />
        <Plot.OfX y={x => (x - b) ** 2 + 1 - b * b} domain={[-4, 4]} color={C.f} weight={3} />
        <Line.Segment point1={[0, 0]} point2={tp} color={C.violet} weight={2.5} />
        <Point x={0} y={0} color={C.ink} />
        <Point x={tp[0]} y={tp[1]} color={C.g} />
        <Label at={tp} color={C.g} attach={b >= 0 ? 'ne' : 'nw'}>turning point</Label>
        <Label at={[1.3, 1 - 1.3 * 1.3]} color={C.guide} attach="e">y = 1 − x²</Label>
      </Plane>
      <div className="mt-4">
      <Plane x={[-1.4, 1.4]} y={[-0.4, 2.2]} xStep={0.5} yStep={1} height={190} xLabel="b" yLabel="" yLabels={skipOne} xLabels={skipEnds}>
        <Plot.OfX y={D2} domain={[-1.4, 1.4]} color={C.violet} weight={2.5} />
        <Point x={BEST} y={0.75} color={C.good} />
        <Point x={-BEST} y={0.75} color={C.good} />
        <Label at={[0, 1]} color={C.bad} attach="n">local max</Label>
        <Label at={[0.06, 2.15]} color={C.violet} attach="e">D²</Label>
        <Label at={[BEST, 0.75]} color={C.good} attach="s">min</Label>
        <Label at={[-BEST, 0.75]} color={C.good} attach="s">min</Label>
        <Point x={b} y={d2} color={C.g} />
      </Plane>
      </div>
      <Controls>
        <Slider label="b" value={b} onChange={setB} min={-1.3} max={1.3} step={0.01} />
        <Buttons>
          {OPTIONS.map(o => (
            <ActionButton
              key={o.letter}
              label={
                <>
                  {o.letter}: <M>{o.tex}</M>
                </>
              }
              onClick={() => setB(o.b)}
            />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\text{TP} = (b,\\ 1-b^2) = (${b.toFixed(2)},\\ ${tp[1].toFixed(2)})`} />
          <Readout color={C.violet} tex={`D^2 = b^4 - b^2 + 1 = ${d2.toFixed(3)}`} />
          <Readout color={atMin ? C.good : undefined} tex={`D \\approx ${d.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
