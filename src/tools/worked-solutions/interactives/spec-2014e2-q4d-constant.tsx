// 2014 Specialist Exam 2 Q4d — why the integration constant matters. The correct depth
// x = ∛(2.4t + 8) − 2 starts at 0 and reaches the brim (x = 1) at t = 95/12 ≈ 7.92 min, rising
// more slowly as the bucket widens (dx/dt = 0.8/(x+2)²: 0.2 at the bottom, ≈0.089 at the top).
// A toggle adds the curve with c left out, x = ∛(2.4t) − 2, which starts at a depth of −2 m.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const x = (t: number) => Math.cbrt(2.4 * t + 8) - 2
const xNoC = (t: number) => Math.cbrt(2.4 * t) - 2
const T_FULL = 95 / 12

export default function Constant() {
  const [t, setT] = useState(2)
  const [noC, setNoC] = useState(false)
  const depth = x(t)
  const rate = 0.8 / (depth + 2) ** 2

  let notice
  if (noC) {
    notice = (
      <Notice tone="warn">
        Without <M>+c</M>, <M>{'t = \\tfrac{(x+2)^3}{2.4}'}</M> rearranges to the red curve <M>{'x = \\sqrt[3]{2.4t} - 2'}</M>, which
        says the depth at <M>t = 0</M> is <M>-2</M> m. Substituting <M>x = 0</M> at <M>t = 0</M> is what fixes{' '}
        <M>{'c = -\\tfrac{8}{2.4}'}</M> and lifts the curve to start at 0.
      </Notice>
    )
  } else if (t > T_FULL - 0.05) {
    notice = (
      <Notice tone="good">
        The tank is full (<M>x = 1</M>) at <M>{'t = \\tfrac{27 - 8}{2.4} = \\tfrac{95}{12} \\approx 7.92'}</M> min, so the rule only
        applies up to then. Now turn on the toggle to see the answer with <M>c</M> left out.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The curve starts at <M>x = 0</M> because <M>c</M> was found from the empty start. It bends over: the bucket widens
        towards the top, so the same inflow raises the level more slowly. Slide <M>t</M> to the brim, <M>x = 1</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.6, 8.6]} y={(noC ? [-2.3, 1.4] : [-0.5, 1.4]) as [number, number]} xStep={1} yStep={0.5} height={320} xLabel="t" yLabel="x">
        <Line.Segment point1={[0.5, 1]} point2={[8.6, 1]} color={C.guide} style="dashed" weight={2} />
        <Label at={[2.5, 1]} color={C.guide} attach="n">brim, x = 1</Label>
        <Plot.OfX y={x} domain={[0, T_FULL]} color={C.f} weight={3} />
        {noC && <Plot.OfX y={xNoC} domain={[0, T_FULL]} color={C.bad} weight={3} />}
        {noC && <Label at={[1.2, xNoC(1.2)]} color={C.bad} attach="se">no +c</Label>}
        <Point x={t} y={depth} color={C.f} />
        <Label at={[5, x(5)]} color={C.f} attach="se">with c</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={T_FULL} step={0.01} />
        <Buttons>
          <Toggle label="Leave out +c?" checked={noC} onChange={setNoC} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`x = \\sqrt[3]{2.4(${t.toFixed(2)}) + 8} - 2 \\approx ${depth.toFixed(3)}\\ \\text{m}`} />
          <Readout tex={`\\tfrac{dx}{dt} = \\tfrac{0.8}{(x+2)^2} \\approx ${rate.toFixed(3)}\\ \\text{m/min}`} />
          {noC && <Readout color={C.bad} tex={`\\sqrt[3]{2.4(${t.toFixed(2)})} - 2 \\approx ${xNoC(t).toFixed(3)}\\ \\text{m}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
