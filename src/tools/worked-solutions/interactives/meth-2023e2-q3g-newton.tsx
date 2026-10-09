// 2023 Methods Exam 2 Q3g — Newton's method follows the tangent at (x₀, h(x₀)) down to the
// x-axis, and that crossing is x₁. Drag x₀ along h(x) = 2^x − x²: from x₀ = 0 the tangent lands at
// x₁ = −1.443 (part f.); near a turning point the tangent flattens and x₁ is thrown far away; at
// a solution of log_e(2)·2^x − 2x = 0 (i.e. h'(x₀) = 0, x₀ ≈ 0.485 or 3.212) the tangent is
// horizontal, never meets the axis, and x₁ = x₀ − h(x₀)/h'(x₀) is undefined.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const h = (x: number) => 2 ** x - x * x
const dh = (x: number) => Math.LN2 * 2 ** x - 2 * x
// The two solutions of log_e(2)·2^x − 2x = 0 (sympy nsolve). The slider snaps to them from
// within 0.004, so the student can land exactly on a turning point.
const T1 = 0.485089636728563
const T2 = 3.21243252449849
const X_MIN = -2
const X_MAX = 5

export default function NewtonBreaks() {
  const [x0, setX0] = useState(0)

  const turning = x0 === T1 || x0 === T2
  const y0 = h(x0)
  const m = dh(x0)
  const x1 = turning ? NaN : x0 - y0 / m
  const onScreen = !turning && x1 >= X_MIN && x1 <= X_MAX
  const lineColor = turning ? C.bad : C.g

  const snap = (v: number) => (Math.abs(v - T1) < 0.004 ? T1 : Math.abs(v - T2) < 0.004 ? T2 : v)

  let notice
  if (turning) {
    notice = (
      <Notice tone="warn">
        <M>{`x_0 \\approx ${x0.toFixed(3)}`}</M> solves <M>{'\\log_e(2)\\times2^x - 2x = 0'}</M>, which is{' '}
        <M>{"h'(x_0) = 0"}</M>: a turning point of <M>h</M>. The tangent is horizontal at height{' '}
        <M>{`h(x_0) \\approx ${y0.toFixed(3)}`}</M>, parallel to the <span className="whitespace-nowrap"><M>x</M>-axis</span>, so it never meets it and there is no{' '}
        <M>x_1</M>. In the formula you would divide <M>{y0.toFixed(3)}</M> by 0, so{' '}
        <M>{"x_1 = x_0 - \\frac{h(x_0)}{h'(x_0)}"}</M> is undefined.
      </Notice>
    )
  } else if (!onScreen) {
    notice = (
      <Notice>
        Close to a turning point the tangent is nearly flat (gradient <M>{`\\approx ${m.toFixed(3)}`}</M>), so it meets the{' '}
        <span className="whitespace-nowrap"><M>x</M>-axis</span> far away: <M>{`x_1 \\approx ${x1.toFixed(2)}`}</M>, off the screen. The flatter the tangent, the further{' '}
        <M>x_1</M> is thrown. Keep dragging: exactly at the turning point it never lands at all.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Newton&apos;s method follows the tangent at <M>{'(x_0,\\ h(x_0))'}</M> to the <span className="whitespace-nowrap"><M>x</M>-axis</span>; where it
        crosses is the next estimate <M>x_1</M>. From <M>{`x_0 = ${x0.toFixed(3)}`}</M> it lands at{' '}
        <M>{`x_1 \\approx ${x1.toFixed(3)}`}</M>{x0 === 0 ? ', as in part f.' : '.'} Now drag <M>x_0</M> towards a turning
        point (<M>0.49</M> or <M>3.21</M>) and watch the tangent flatten.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X_MIN, X_MAX]} y={[-4, 5]} xStep={1} yStep={1} height={320}>
        <Plot.OfX y={h} domain={[X_MIN, X_MAX + 0.4]} color={C.f} weight={3} />
        <Label at={[-1.7, h(-1.7)]} color={C.f} attach="se">h</Label>
        <Line.PointSlope point={[x0, y0]} slope={m} color={lineColor} weight={2.5} />
        <Line.Segment point1={[x0, 0]} point2={[x0, y0]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={x0} y={y0} color={lineColor} />
        <Point x={x0} y={0} color={C.ink} />
        <Label at={[x0, 0]} attach={y0 > 0 ? 'se' : 'ne'}>x₀</Label>
        {onScreen && (
          <>
            <Point x={x1} y={0} color={C.violet} />
            <Label at={[x1, 0]} color={C.violet} attach={y0 > 0 ? 'nw' : 'sw'}>x₁</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="x_0" value={x0} onChange={v => setX0(snap(v))} min={-1.5} max={4.5} step={0.005} format={v => v.toFixed(3)} />
        <Buttons>
          <ActionButton label="x₀ = 0 (part f.)" onClick={() => setX0(0)} />
          <ActionButton label="x₀ = 0.485" onClick={() => setX0(T1)} />
          <ActionButton label="x₀ = 3.212" onClick={() => setX0(T2)} />
        </Buttons>
        <Readouts>
          <Readout tex={`h(x_0) \\approx ${y0.toFixed(3)}`} />
          <Readout color={lineColor} tex={`h'(x_0) ${turning ? '= 0' : `\\approx ${m.toFixed(3)}`}`} />
          <Readout color={C.violet} tex={turning ? 'x_1 \\text{ undefined}' : `x_1 \\approx ${x1.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
