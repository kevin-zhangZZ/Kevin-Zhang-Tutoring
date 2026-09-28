// 2017 Specialist Exam 1 Q10b — f(x) = √(arccos(x/2)) built in two layers. Drag x: the grey
// dashed curve is arccos(x/2), the blue curve is its square root. Past x = ±2 there is nothing to
// take the arccos of (domain [−2, 2], endpoints included because arccos(±1) exists), and the
// tallest grey value π becomes √π on the blue curve (range [0, √π], not [0, π]).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const inner = (x: number) => Math.acos(Math.max(-1, Math.min(1, x / 2)))
const f = (x: number) => Math.sqrt(inner(x))
const RP = Math.sqrt(Math.PI)
const CROSS = 2 * Math.cos(1) // where arccos(x/2) = 1, so the root equals the value

export default function Root() {
  const [x0, setX0] = useState(-1.2)

  const outside = Math.abs(x0) > 2.0001
  const atLeft = !outside && x0 < -1.97
  const atRight = !outside && x0 > 1.97
  const g0 = inner(x0)
  const f0 = f(x0)

  let notice
  if (outside) {
    notice = (
      <Notice tone="warn">
        Here <M>{`\\tfrac{x}{2} = ${(x0 / 2).toFixed(2)}`}</M>, which is outside <M>{'[-1, 1]'}</M>, so{' '}
        <M>{'\\arccos\\left(\\tfrac{x}{2}\\right)'}</M> does not exist and there is nothing to take the square root of.
        Slide back to exactly <M>{x0 > 0 ? 'x = 2' : 'x = -2'}</M>: the function <b>is</b> defined there, which is why
        the domain is the closed interval <M>{'[-2, 2]'}</M>.
      </Notice>
    )
  } else if (atLeft) {
    notice = (
      <Notice tone="good">
        At <M>x = -2</M>, <M>{'\\arccos(-1) = \\pi'}</M>, the largest value <M>\arccos</M> can give (the grey
        point). The square root then brings it down to <M>{'\\sqrt{\\pi} \\approx 1.77'}</M> (the blue point), and
        that is the top of the range. Answering <M>{'[0, \\pi]'}</M> means reading the grey curve and forgetting the root.
      </Notice>
    )
  } else if (atRight) {
    notice = (
      <Notice tone="good">
        At <M>x = 2</M>, <M>{'\\arccos(1) = 0'}</M> and <M>{'\\sqrt{0} = 0'}</M>. A square root of zero is
        perfectly fine, so <M>x = 2</M> is in the domain and <M>0</M> is the bottom of the range. Now drag past{' '}
        <M>x = 2</M> to see where <M>f</M> stops existing.
      </Notice>
    )
  } else if (x0 > CROSS) {
    notice = (
      <Notice>
        Here <M>{'\\arccos\\left(\\tfrac{x}{2}\\right) < 1'}</M>, and the square root of a number below <M>1</M> is{' '}
        <b>bigger</b> (<M>{'\\sqrt{0.25} = 0.5'}</M>), so the blue curve sits above the grey one. The root does
        not change where the values start and end, though: <M>{'\\sqrt0 = 0'}</M> at <M>x = 2</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The square root needs what is <b>inside</b> it to be <M>{'\\ge 0'}</M>, and the inside is{' '}
        <M>{'\\arccos\\left(\\tfrac{x}{2}\\right)'}</M>, never <M>x</M> itself, so negative <M>x</M> values are fine.
        The only restriction is the one <M>\arccos</M> brings. Drag to <M>x = -2</M> to find the top of the range,
        then past <M>x = \pm 2</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.8, 2.9]} y={[-0.3, 3.6]} xStep={1} yStep={1} height={300}>
        {/* the two ranges as bars on the right */}
        <Line.Segment point1={[-2, Math.PI]} point2={[2.62, Math.PI]} color={C.guide} style="dashed" weight={1} />
        <Line.Segment point1={[-2, RP]} point2={[2.32, RP]} color={C.f} style="dashed" weight={1} />
        <Line.Segment point1={[2.62, 0]} point2={[2.62, Math.PI]} color={C.guide} weight={5} />
        <Line.Segment point1={[2.32, 0]} point2={[2.32, RP]} color={C.f} weight={5} />
        <Label at={[2.62, Math.PI]} attach="n" color={C.guide}>π</Label>
        <Label at={[2.32, RP]} attach="n" color={C.f}>√π</Label>

        <Plot.OfX y={inner} domain={[-2, 2]} color={C.guide} style="dashed" weight={2} />
        <Plot.OfX y={f} domain={[-2, 2]} color={C.f} weight={3} />
        <Label at={[-1.35, inner(-1.35)]} attach="ne" color={C.guide}>arccos(x/2)</Label>
        <Label at={[-0.9, f(-0.9)]} attach="sw" color={C.f}>f(x)</Label>

        {/* closed endpoints */}
        <Point x={-2} y={Math.PI} color={C.guide} />
        <Point x={-2} y={RP} color={C.f} />
        <Point x={2} y={0} color={C.f} />

        {outside ? (
          <Line.Segment point1={[x0, -0.3]} point2={[x0, 3.6]} color={C.bad} style="dashed" weight={2} />
        ) : (
          <>
            <Line.Segment point1={[x0, 0]} point2={[x0, Math.max(g0, f0)]} color={C.guide} style="dashed" weight={1} />
            <Line.Segment point1={[x0, g0]} point2={[x0, f0]} color={C.violet} weight={3} />
            <Point x={x0} y={g0} color={C.guide} />
            <Point x={x0} y={f0} color={C.f} />
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-2.6} max={2.6} step={0.01} />
        <Readouts>
          {outside ? (
            <Readout color={C.bad} tex={`\\arccos(${(x0 / 2).toFixed(2)})\\ \\text{is undefined}`} />
          ) : (
            <>
              <Readout color={C.guide} tex={`\\arccos\\left(\\tfrac{x}{2}\\right) = ${g0.toFixed(3)}`} />
              <Readout color={C.f} tex={`f(x) = \\sqrt{${g0.toFixed(3)}} = ${f0.toFixed(3)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
