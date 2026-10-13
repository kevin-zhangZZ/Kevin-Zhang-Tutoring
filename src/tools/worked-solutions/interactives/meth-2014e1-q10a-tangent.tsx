// 2014 Methods Exam 1 Q10a — U(6, 0) is on the tangent line, not on the parabola. Every parabola
// y = ax² + bx through Q(2, 4) has b = 2 − 2a; slide a and watch where its tangent at Q meets the
// x-axis (at x = 2 − 2/(a + 1)). Only a = −3/2 (b = 5) sends the tangent through U(6, 0). A toggle
// shows the report's common error: forcing (6, 0) onto the parabola gives a = −1/2, b = 3, whose
// graph cuts the line UQ at Q and at U instead of touching it (its gradient at Q is +1, not −1).

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const parab = (a: number) => (x: number) => a * x * x + (2 - 2 * a) * x

export default function Tangent() {
  const [a, setA] = useState(-2.5)
  const [trap, setTrap] = useState(false)

  const b = 2 - 2 * a
  const m = 2 * a + 2
  const xInt = 2 - 2 / (a + 1)
  const hit = Math.abs(a + 1.5) < 0.03
  const tangent = (x: number) => 4 + m * (x - 2)

  let notice
  if (trap) {
    notice = (
      <Notice tone="warn">
        Putting <M>(6,0)</M> on the parabola gives <M>{'a=-\\tfrac12,\\ b=3'}</M>. This red parabola does pass through{' '}
        <M>U</M>, but it <b>cuts</b> the line <M>UQ</M> at two points instead of touching it at <M>Q</M>: its gradient at{' '}
        <M>Q</M> is <M>+1</M>, not <M>-1</M>. <M>U</M> is a point on the <b>tangent</b>, not on the curve.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'a=-\\tfrac32'}</M>, <M>b=5</M></b> the tangent at <M>Q</M> has gradient <M>-1</M> and reaches the
        x-axis exactly at <M>U(6,0)</M>. Notice the parabola itself meets the x-axis at <M>{'x=\\tfrac{10}{3}'}</M>, nowhere
        near <M>U</M>. Now turn on the common error.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Every one of these parabolas passes through <M>Q(2,4)</M>, so that condition alone can&apos;t fix <M>a</M>. The
        second condition is about the <b>tangent</b>: slide <M>a</M> until the orange tangent reaches the x-axis at{' '}
        <M>U(6,0)</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.5, 8]} y={[-1, 8]} height={320}>
        {trap ? (
          <>
            <Plot.OfX y={parab(-0.5)} domain={[-0.5, 6.8]} color={C.bad} weight={3} />
            <Plot.OfX y={x => 6 - x} domain={[-0.5, 7]} color={C.g} weight={2.5} />
            <Label at={[4.6, parab(-0.5)(4.6)]} color={C.bad} attach="n">{'y = −½x² + 3x'}</Label>
          </>
        ) : (
          <>
            <Plot.OfX y={parab(a)} domain={[-0.5, 8]} color={C.f} weight={3} />
            <Plot.OfX y={tangent} domain={[-0.5, 8]} color={hit ? C.good : C.g} weight={2.5} />
            {xInt > -0.5 && xInt < 8 && <Point x={xInt} y={0} color={hit ? C.good : C.g} />}
          </>
        )}
        <Point x={6} y={0} color={C.ink} />
        <Label at={[6, 0]} attach="n">U(6, 0)</Label>
        <Point x={2} y={4} color={C.ink} />
        <Label at={[2, 4]} attach="ne">Q(2, 4)</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={v => setA(v)} min={-3} max={-1.2} step={0.05} />
        <Toggle label="Common error: put (6, 0) on the parabola" checked={trap} onChange={setTrap} />
        <Readouts>
          {trap ? (
            <>
              <Readout color={C.bad} tex={'a=-\\tfrac12,\\ b=3'} />
              <Readout color={C.bad} tex={"\\text{gradient at } Q = +1"} />
            </>
          ) : (
            <>
              <Readout tex={`b = 2-2a = ${b.toFixed(2)}`} />
              <Readout color={hit ? C.good : C.g} tex={`\\text{tangent gradient} = 4a+b = ${m.toFixed(2)}`} />
              <Readout color={hit ? C.good : C.g} tex={`\\text{tangent meets x-axis at } x = ${xInt.toFixed(2)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
