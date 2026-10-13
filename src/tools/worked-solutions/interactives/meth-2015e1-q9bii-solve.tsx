// 2015 Methods Exam 1 Q9b.ii — part (b)(i)'s answer is a function of p,
// Pr(B | W) = (1 − p)/(2p + 1), and part (b)(ii) asks which p makes it 0.3. Slide p along the
// curve until it meets the line y = 0.3, at p = 7/16 = 0.4375. The report says many students
// missed this connection with the previous part. Readouts checked with sympy
// (p = 0.2 gives 4/7 ≈ 0.571; p = 7/16 gives exactly 0.3).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const f = (p: number) => (1 - p) / (2 * p + 1)
const P_STAR = 7 / 16

export default function SolveForP() {
  const [p, setP] = useState(0.2)
  const y = f(p)
  const hit = Math.abs(p - P_STAR) < 0.001

  return (
    <div>
      <Plane x={[0, 1]} y={[0, 1]} xStep={0.25} yStep={0.25} xLabel="p" yLabel="" height={300}>
        <Line.Segment point1={[0, 0.3]} point2={[1, 0.3]} color={C.bad} style="dashed" weight={2} />
        <Label at={[0.98, 0.3]} attach="nw" color={C.bad}>0.3</Label>
        <Plot.OfX y={f} domain={[0, 1]} color={C.f} weight={3} />
        <Label at={[0.32, f(0.32)]} attach="ne" color={C.f}>(1 − p)/(2p + 1)</Label>
        <Line.Segment point1={[p, 0]} point2={[p, y]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={p} y={y} color={hit ? C.good : C.f} />
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={setP} min={0} max={1} step={0.0025} format={v => v.toFixed(4)} />
        <Readouts>
          <Readout color={hit ? C.good : C.f} tex={`\\Pr(B\\mid W) = \\tfrac{1-p}{2p+1} = ${y.toFixed(3)}`} />
          {hit && <Readout color={C.good} tex={'p = \\tfrac{7}{16} = 0.4375\\ \\checkmark'} />}
        </Readouts>
        {hit ? (
          <Notice tone="good">
            <b>The curve meets <M>0.3</M> at <M>{'p = \\tfrac{7}{16}'}</M>.</b> That is all part (b)(ii) is: set part (b)(i)&apos;s
            expression equal to <M>0.3</M> and solve. Only one <M>p</M> in <M>[0, 1]</M> works, because the curve only falls.
          </Notice>
        ) : (
          <Notice>
            Part (b)(i) gave <M>{'\\Pr(B\\mid W)'}</M> for <b>every</b> <M>p</M>; this is its graph. A bigger <M>p</M> means more eggs
            from farm A, so a white egg is less likely to be from farm B. Slide <M>p</M> until the point sits on the red
            line at <M>0.3</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
