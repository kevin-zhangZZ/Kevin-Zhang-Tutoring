// 2018 Specialist Exam 1 Q5 — why the middle branch of f(x) = (x + 1)/(x² − 4) never flattens.
// By partial fractions f(x) = 1/(4(x + 2)) + 3/(4(x − 2)): two hyperbolas that each fall on every
// interval. Slide x along the middle branch: the two ordinates stack to give f(x), both gradient
// readouts stay negative, so f′(x), their sum, can never be 0. The least steep point (x ≈ −0.36,
// the non-stationary point of inflection) still has gradient ≈ −0.23. A toggle draws the flat
// tangent a stationary point of inflection would need (the report's error) against the real one.

import { useState } from 'react'
import { C, Controls, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const g1 = (x: number) => 1 / (4 * (x + 2))
const g2 = (x: number) => 3 / (4 * (x - 2))
const f = (x: number) => g1(x) + g2(x)
const d1 = (x: number) => -1 / (4 * (x + 2) ** 2)
const d2 = (x: number) => -3 / (4 * (x - 2) ** 2)
const df = (x: number) => d1(x) + d2(x)
/** Real root of x³ + 3x² + 12x + 4 = 0, where f''(x) = 0 (checked with sympy). */
const XI = -0.362165747
const X = 4
const Y = 3
const EPS = 0.02

const t = (v: number, dp = 2) => (Math.abs(v) < 0.5 * 10 ** -dp ? (0).toFixed(dp) : v.toFixed(dp))
const cl = (v: number) => Math.max(-Y - 0.3, Math.min(Y + 0.3, v))

/** A tangent segment of fixed on-screen-ish length through (a, f(a)). */
function tangent(a: number, m: number, half = 0.9) {
  const dx = half / Math.sqrt(1 + m * m)
  return { p1: [a - dx, f(a) - m * dx] as [number, number], p2: [a + dx, f(a) + m * dx] as [number, number] }
}

export default function NoFlatSpot() {
  const [x0, setX0] = useState(-1.5)
  const [spoi, setSpoi] = useState(false)

  const a = x0
  const m = df(a)
  const tan = tangent(a, m, spoi ? 1.6 : 0.9)
  const nearXI = Math.abs(a - XI) < 0.05

  let notice
  if (spoi) {
    notice = (
      <Notice tone="warn">
        The red flat line is what a <b>stationary point of inflection</b> would need: <M>{"f'(x) = 0"}</M>. But{' '}
        <M>{"f'(x) = -\\frac{1}{4(x+2)^2} - \\frac{3}{4(x-2)^2}"}</M> is two negatives added, so it is never{' '}
        <M>0</M>. Even here, at the least steep point, the real tangent (solid line) slopes down with gradient about{' '}
        <M>-0.23</M>. It is a point of inflection, just not a stationary one: draw the branch sloping through the
        axes, never flat.
      </Notice>
    )
  } else if (nearXI) {
    notice = (
      <Notice tone="good">
        This is the <b>least steep</b> the middle branch ever gets: <M>{"f'(x) \\approx -0.23"}</M>. It is also where
        the curve switches from concave up to concave down, a point of inflection. It is not a <em>stationary</em>{' '}
        point, because the gradient is not <M>0</M>. Turn on the toggle to compare with a flat spot.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The orange and violet bars stack to make <M>f(x)</M>: each dashed hyperbola <b>falls on every interval</b>,
        so both gradient readouts are negative wherever you put <M>x</M>. Their sum, <M>{"f'(x)"}</M>, is a sum of
        two negatives, so it can never be <M>0</M>: no turning points and no flat spot. Slide towards{' '}
        <M>x \approx -0.36</M> to find where the middle branch is least steep.
      </Notice>
    )
  }

  const b1 = g1(a)
  const b2 = f(a)

  return (
    <div>
      <Plane x={[-X, X]} y={[-Y, Y]} height={320}>
        <Line.Segment point1={[-2, -Y - 0.3]} point2={[-2, Y + 0.3]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[2, -Y - 0.3]} point2={[2, Y + 0.3]} color={C.guide} style="dashed" weight={1.5} />
        {/* The two partial fractions, dashed. */}
        <Plot.OfX y={g1} domain={[-X, -2 - EPS]} color={C.g} weight={2} style="dashed" />
        <Plot.OfX y={g1} domain={[-2 + EPS, X]} color={C.g} weight={2} style="dashed" />
        <Plot.OfX y={g2} domain={[-X, 2 - EPS]} color={C.violet} weight={2} style="dashed" />
        <Plot.OfX y={g2} domain={[2 + EPS, X]} color={C.violet} weight={2} style="dashed" />
        {/* Their sum, f. */}
        <Plot.OfX y={f} domain={[-X, -2 - EPS / 2]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[-2 + EPS / 2, 2 - EPS / 2]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[2 + EPS / 2, X]} color={C.f} weight={3} />
        {/* The ordinates stacked at x: 1/(4(x+2)) up from the axis, then 3/(4(x−2)) from there. */}
        <Line.Segment point1={[a - 0.05, 0]} point2={[a - 0.05, cl(b1)]} color={C.g} weight={4} />
        <Line.Segment point1={[a + 0.05, cl(b1)]} point2={[a + 0.05, cl(b2)]} color={C.violet} weight={4} />
        {spoi && (
          <Line.Segment point1={[a - 1.6, f(a)]} point2={[a + 1.6, f(a)]} color={C.bad} style="dashed" weight={2.5} />
        )}
        <Line.Segment point1={tan.p1} point2={tan.p2} color={C.ink} weight={2.5} />
        <Point x={a} y={f(a)} color={C.f} />
      </Plane>
      <Controls>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-gray-600 dark:text-gray-400">
          <span>
            <span style={{ color: C.f }}>━</span> <M>{'f(x) = \\frac{x+1}{x^2-4}'}</M>
          </span>
          <span>
            <span style={{ color: C.g }}>╍</span> <M>{'\\frac{1}{4(x+2)}'}</M>
          </span>
          <span>
            <span style={{ color: C.violet }}>╍</span> <M>{'\\frac{3}{4(x-2)}'}</M>
          </span>
        </div>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            setSpoi(false)
            setX0(v)
          }}
          min={-1.9}
          max={1.9}
          step={0.01}
        />
        <Toggle label="Draw a stationary point of inflection" checked={spoi} onChange={v => {
            setSpoi(v)
            if (v) setX0(-0.36)
          }} />
        <Readouts>
          <Readout color={C.g} tex={`\\text{gradient of } \\tfrac{1}{4(x+2)} = ${t(d1(a))}`} />
          <Readout color={C.violet} tex={`\\text{gradient of } \\tfrac{3}{4(x-2)} = ${t(d2(a))}`} />
          <Readout color={C.f} tex={`f'(${t(a)}) = ${t(m)}`} />
          {spoi && <Readout color={C.bad} tex={`\\text{red flat line: gradient } 0`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
