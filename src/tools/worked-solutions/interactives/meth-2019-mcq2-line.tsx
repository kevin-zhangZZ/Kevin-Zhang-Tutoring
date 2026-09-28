// 2019 Methods Exam 2 MCQ 2 — x² + 2x − k = 0 rewritten as x² + 2x = k: the solutions are where
// the horizontal line y = k meets the parabola y = x² + 2x, whose lowest point is the vertex
// (−1, −1). Sliding k shows the number of solutions change at the critical value k = −1: two
// crossings above the vertex (Δ = 4 + 4k > 0, option B), one touching point at k = −1 (Δ = 0, the
// value option E wrongly includes and option D gives on its own), none below (Δ < 0: the set
// (−∞, −1), option C). Readouts give Δ and the crossings x = −1 ± √(1 + k) from the working.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const X0 = -4
const X1 = 2
const P = (x: number) => x * x + 2 * x

const d = (v: number) => {
  const r = Math.round(v * 100) / 100
  return (Object.is(r, -0) ? 0 : r).toString().replace('-', '−')
}
const t = (v: number) => d(v).replace('−', '-')

export default function LineMeetsParabola() {
  const [k, setK] = useState(2)
  const disc = 4 + 4 * k
  const n = Math.abs(disc) < 1e-9 ? 1 : disc > 0 ? 2 : 0
  const root = n === 2 ? Math.sqrt(1 + k) : 0
  const xs = n === 2 ? [-1 - root, -1 + root] : n === 1 ? [-1] : []
  const lineColor = n === 2 ? C.good : n === 1 ? C.g : C.bad

  let notice
  if (n === 2) {
    notice = (
      <Notice tone="good">
        Two crossings, so two solutions, and <M>{`\\Delta = 4 + 4k = ${t(disc)} > 0`}</M>. Adding <M>k</M> to both sides
        turns <M>{'x^2 + 2x - k = 0'}</M> into <M>{'x^2 + 2x = k'}</M>: the solutions are where the flat line{' '}
        <M>y = k</M> cuts the parabola. Push <M>k</M> as high as you like and there are still two (the parabola rises
        forever), so the answer runs to <M>\infty</M>. Now slide <M>k</M> down to <M>-1</M>.
      </Notice>
    )
  } else if (n === 1) {
    notice = (
      <Notice tone="warn">
        At <M>k = -1</M> the line just touches the vertex <M>(-1, -1)</M>: one solution, <M>x = -1</M>, and{' '}
        <M>\Delta = 0</M>. This is the boundary, but it gives <em>one</em> solution, not two, so <M>k = -1</M> is left out
        with a round bracket: <M>{'(-1, \\infty)'}</M>. Option E&apos;s square bracket, <M>{'[-1, \\infty)'}</M>, lets it in.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The line is below the vertex, the lowest point of the parabola, so it misses completely: no real solutions, and{' '}
        <M>{`\\Delta = ${t(disc)} < 0`}</M>. Every <M>k</M> in <M>{'(-\\infty, -1)'}</M> behaves like this. That is option C:
        the set of <M>k</M> with <em>no</em> solutions, the opposite of what was asked.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-3, 5]} xStep={1} yStep={1} height={320}>
        <Plot.OfX y={P} domain={[X0, X1]} color={C.f} weight={3} />
        <Line.Segment point1={[X0, k]} point2={[X1, k]} color={lineColor} weight={2.5} />
        <Label at={[X0, k]} attach={k < -2 ? 'ne' : 'se'} color={lineColor} size={13}>y = k</Label>
        {n !== 1 && <Point x={-1} y={-1} color={C.f} />}
        {n !== 1 && !(k < -1 && k > -1.8) && (
          <Label at={[-1, -1]} attach="s" color={C.f} size={12}>vertex (−1, −1)</Label>
        )}
        {xs.map(x => (
          <Point key={x} x={x} y={k} color={lineColor} />
        ))}
        {n === 1 && <Label at={[-1, -1]} attach="s" color={C.g} size={12}>touches: one solution</Label>}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={-3} max={4} step={0.25} format={d} />
        <Readouts>
          <Readout color={lineColor} tex={`\\Delta = 4 + 4k = ${t(disc)}`} />
          <Readout
            color={lineColor}
            tex={
              n === 2
                ? `x = -1 \\pm \\sqrt{1 + k} = ${t(xs[0])},\\ ${t(xs[1])}`
                : n === 1
                  ? 'x = -1 \\text{ only}'
                  : '\\text{no real } x'
            }
          />
          <Readout color={lineColor} tex={`\\text{solutions: } ${n}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
