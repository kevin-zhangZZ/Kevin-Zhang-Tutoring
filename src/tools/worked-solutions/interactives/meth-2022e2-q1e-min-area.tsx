// 2022 Methods Exam 2 Q1e — the shaded area is a function of b. Drawn for a = 1, so
// g(x) = x²/4: slide the tangent point x = −b and the normal, its second intersection
// x = 8/b + b and the shaded region all move, while the lower graph traces A(b) = (4 + b²)³/(3b³).
// Small b gives a steep normal and a tall region; large b a wide one — the minimum is in between,
// at b = 2 = 2a², where the A(b) graph is flat (dA/db = 0). A toggle shows the report's error of
// integrating yₙ alone: it adds the area under the parabola, and its minimum is at b ≈ 2.26 instead.
// Lower plane: y up to 110 so the wrong curve (102.5 at b = 1) stays on the chart; ticks above 100 hidden.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, tick,
} from './kit'

const g = (x: number) => (x * x) / 4
const tangent = (b: number) => (x: number) => -(b / 2) * x - (b * b) / 4
const normal = (b: number) => (x: number) => (2 / b) * x + 2 + (b * b) / 4
const xN = (b: number) => 8 / b + b
// Shaded area (yₙ − g integrated from −b to 8/b + b), simplified with a = 1.
const area = (b: number) => (4 + b * b) ** 3 / (3 * b ** 3)
// The wrong integral of yₙ alone over the same terminals, with a = 1.
const wrong = (b: number) => b ** 3 / 2 + 6 * b + 32 / b + 64 / b ** 3
const B_MIN = 2
const B_WRONG = 2.2586 // where wrong(b) is smallest (numerical)

export default function MinArea() {
  const [b, setB] = useState(1)
  const [noSubtract, setNoSubtract] = useState(false)

  const yn = normal(b)
  const x2 = xN(b)
  const A = area(b)
  const near = Math.abs(b - B_MIN) < 0.04
  const nearWrong = Math.abs(b - B_WRONG) < 0.04
  const xLabels = (v: number) => (Math.abs(v + b) < 1.1 ? '' : tick(v))

  let notice
  if (noSubtract) {
    notice = (
      <Notice tone="warn">
        <M>{'\\int y_n\\,dx'}</M> on its own (the report notes some students did this) also counts the{' '}
        <b>red area under the parabola</b>, down to the <M>x</M>-axis, which is not part of the shaded region.{' '}
        {nearWrong ? (
          <>
            This wrong &ldquo;area&rdquo; is smallest here, at <M>b \approx 2.26</M>, not at <M>b = 2</M>, so the final
            answer comes out wrong too.
          </>
        ) : (
          <>
            Its graph (red, lower plane) bottoms out near <M>b \approx 2.26</M>, not <M>b = 2</M>, so the final answer
            comes out wrong too.
          </>
        )}{' '}
        The integrand must be <M>{'y_n - g(x)'}</M>: line on top minus curve underneath.
      </Notice>
    )
  } else if (near) {
    notice = (
      <Notice tone="good">
        <b>Smallest area: <M>{'A \\approx 21.33'}</M> at <M>b = 2</M>.</b> On the lower graph the curve is flat here,
        so <M>{'\\tfrac{dA}{db} = 0'}</M>, the equation the working solves. With <M>a = 1</M>, the answer{' '}
        <M>{'b = 2a^2'}</M> gives <M>b = 2</M> ✓. Now turn on the toggle: what if you don&apos;t subtract{' '}
        <M>g(x)</M>?
      </Notice>
    )
  } else if (b < B_MIN) {
    notice = (
      <Notice>
        Dashed: the tangent at <M>x = -b</M>. Blue: the normal, the line perpendicular to it. With{' '}
        <M>{`b \\approx ${b.toFixed(2)}`}</M> the tangent point is close to the vertex, so the tangent is shallow
        and the normal is steep. The normal meets <M>g</M> again far out, at <M>{`x \\approx ${x2.toFixed(2)}`}</M>, so
        the region is tall. Drag <M>b</M> to the right and watch <M>A(b)</M> fall.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>b = 2</M> the area grows again: the tangent point climbs the left branch, so the region starts further
        left and gets wider. Too small or too large a <M>b</M> both give a big area, so the minimum is in between, where{' '}
        <M>{'\\tfrac{dA}{db} = 0'}</M>. Turn on the toggle to see a common wrong integral.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-6, 10]} y={[-2, 21]} xStep={2} yStep={5} height={300} xLabels={xLabels}>
        {noSubtract && <Region top={g} bottom={() => 0} from={-b} to={x2} color={C.bad} opacity={0.3} />}
        <Region top={yn} bottom={g} from={-b} to={x2} color={C.f} opacity={0.25} />
        <Plot.OfX y={g} color={C.ink} weight={2.5} />
        <Plot.OfX y={tangent(b)} color={C.guide} weight={2} style="dashed" />
        <Plot.OfX y={yn} color={C.f} weight={2.5} />
        <Line.Segment point1={[-b, 0]} point2={[-b, g(-b)]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={-b} y={g(-b)} color={C.f} />
        <Point x={x2} y={g(x2)} color={C.f} />
        <Label at={[-b, 0]} attach="s">−b</Label>
        <Label at={[7, g(7)]} attach="e">g</Label>
        <Label at={[(x2 - b) / 2, yn((x2 - b) / 2)]} attach="nw" color={C.f}>normal</Label>
      </Plane>
      <div className="mt-4" />
      <Plane x={[0, 5]} y={[-6, 110]} xStep={1} yStep={20} height={220} xLabel="b" yLabel="area" yLabels={(v) => (v > 100 ? '' : tick(v))}>
        {noSubtract && <Plot.OfX y={wrong} domain={[1, 4.5]} color={C.bad} weight={2.5} />}
        <Plot.OfX y={area} domain={[1, 4.5]} color={C.f} weight={2.5} />
        <Line.Segment point1={[B_MIN, 0]} point2={[B_MIN, area(B_MIN)]} color={C.good} style="dashed" weight={1.5} />
        {noSubtract && <Point x={b} y={wrong(b)} color={C.bad} />}
        <Point x={b} y={A} color={near ? C.good : C.f} />
        <Label at={[4.2, area(4.2)]} attach="se" color={C.f}>A(b)</Label>
      </Plane>
      <Controls>
        <Slider label="b" value={b} onChange={setB} min={1} max={4.5} step={0.01} />
        <Buttons>
          <Toggle label="What if I don't subtract g(x)?" checked={noSubtract} onChange={setNoSubtract} />
        </Buttons>
        <Readouts>
          <Readout tex="a = 1,\quad g(x) = \tfrac{x^2}{4}" />
          <Readout tex={`\\text{normal meets } g \\text{ again at } x = \\tfrac{8}{b} + b \\approx ${x2.toFixed(2)}`} />
          <Readout color={near ? C.good : C.f} tex={`A(b) \\approx ${A.toFixed(2)}`} />
          {noSubtract && <Readout color={C.bad} tex={`\\int y_n\\,dx \\approx ${wrong(b).toFixed(2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
