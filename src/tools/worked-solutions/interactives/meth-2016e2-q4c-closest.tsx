// 2016 Methods Exam 2 Q4c — the point P on f(x) = (2x+1)/(x+2) closest to the origin. Slide P
// along the branch shown in the figure (x > −2) with a circle centred at O through P: wherever
// the circle cuts the curve, part of the curve is inside it and so closer to O. At x = √3 − 2 the
// circle just touches the curve, D = 2√2 − √6 ≈ 0.379. A toggle shows the second CAS solution
// x = −2 − √3, the closest point on the OTHER branch (D ≈ 5.28) — not P, which is the domain
// trap the report describes.

import { useState } from 'react'
import { Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const f = (x: number) => (2 * x + 1) / (x + 2)
const C_EXACT = Math.sqrt(3) - 2
const D_MIN = 2 * Math.SQRT2 - Math.sqrt(6)
const X_OTHER = -2 - Math.sqrt(3)

export default function Closest() {
  const [x, setX] = useState(0.6)
  const [other, setOther] = useState(false)
  const y = f(x)
  const D = Math.hypot(x, y)
  const atMin = Math.abs(x - C_EXACT) < 0.02

  let notice
  if (other) {
    notice = (
      <Notice tone="warn">
        Without <M>{'x>-2'}</M>, the CAS also returns <M>{'x=-2-\\sqrt3\\approx-3.73'}</M>: the point{' '}
        <M>{'(-3.73,\\ 3.73)'}</M> on the <b>other branch</b>, about <M>5.28</M> from <M>O</M>. It is the closest point on that
        branch, but <M>P</M> in the figure is on the right-hand branch, so this value is rejected.
      </Notice>
    )
  } else if (atMin) {
    notice = (
      <Notice tone="good">
        <b>The circle just touches the curve.</b> No point of this branch is inside it, so this is the closest point:{' '}
        <M>{'c=\\sqrt3-2\\approx-0.268'}</M>, <M>{'d=2-\\sqrt3'}</M>, <M>{'D=2\\sqrt2-\\sqrt6\\approx0.379'}</M>. It sits on the line{' '}
        <M>y=-x</M>. Now turn on the other branch.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The circle through <M>P</M> centred at <M>O</M> <b>cuts the curve</b>, so some of the curve lies inside it, closer to{' '}
        <M>O</M> than <M>P</M> is. Slide <M>x</M> {x > C_EXACT ? 'left' : 'right'} until the circle only touches the curve.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-4.5, 2.5]} y={[-2.5, 4.5]} equalScale height={360}>
        <Plot.OfX y={f} domain={[-4.5, -2.05]} color={other ? C.f : C.guide} weight={other ? 3 : 2} />
        <Plot.OfX y={f} domain={[-1.95, 2.5]} color={C.f} weight={3} />
        <Line.Segment point1={[-2, -2.5]} point2={[-2, 4.5]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[-2.5, 2.5]} point2={[2.5, -2.5]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[1.6, -1.6]} color={C.guide} attach="e">y = −x</Label>
        <Circle center={[0, 0]} radius={D} color={atMin ? C.good : C.g} fillOpacity={0.06} strokeStyle="dashed" />
        <Line.Segment point1={[0, 0]} point2={[x, y]} color={atMin ? C.good : C.g} weight={2} />
        <Point x={x} y={y} color={atMin ? C.good : C.g} />
        <Label at={[x, y]} color={atMin ? C.good : C.g} attach={x < 0 ? 'nw' : 'se'}>P</Label>
        {other && (
          <>
            <Line.Segment point1={[0, 0]} point2={[X_OTHER, f(X_OTHER)]} color={C.bad} weight={2} style="dashed" />
            <Point x={X_OTHER} y={f(X_OTHER)} color={C.bad} />
            <Label at={[X_OTHER, f(X_OTHER)]} color={C.bad} attach="e">x = −2 − √3</Label>
          </>
        )}
        <Label at={[2.2, f(2.2)]} color={C.f} attach="n">f</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={-1.6} max={2} step={0.002} format={v => v.toFixed(3)} />
        <Buttons>
          <Toggle label="Show the other CAS solution" checked={other} onChange={setOther} />
        </Buttons>
        <Readouts>
          <Readout color={atMin ? C.good : C.g} tex={`P = (${x.toFixed(3)},\\ ${y.toFixed(3)})`} />
          <Readout tex={`D = OP \\approx ${D.toFixed(3)}`} />
          {atMin && <Readout color={C.good} tex={`2\\sqrt2-\\sqrt6 \\approx ${D_MIN.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
