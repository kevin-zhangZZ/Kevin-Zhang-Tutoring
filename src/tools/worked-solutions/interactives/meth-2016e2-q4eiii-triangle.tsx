// 2016 Methods Exam 2 Q4e.iii — the triangle XYZ as k changes. The base YZ (on y = x) is fixed
// at 2√2; the apex X slides along y = −x, so the height is OX = √2(k − √(k²−1)). Raising k pulls X
// in towards O and shrinks the triangle; s(k) = (area)² drops through 1 exactly at k = 5/4, where
// X = (−½, ½) (part e.ii). Sliding k down towards 1 sends X towards (−1, 1) and s towards 4, but
// k = 1 itself is excluded — the report's 1 ≤ k ≤ 5/4 slip.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider } from './kit'

export default function Triangle() {
  const [k, setK] = useState(2)
  const g = (x: number) => (k * x + 1) / (x + k)
  const h = k - Math.sqrt(k * k - 1)
  const X: [number, number] = [-h, h]
  const area = 2 * h
  const s = area * area
  const ok = s >= 1 - 1e-9
  const atEdge = Math.abs(k - 1.25) < 0.006
  const nearOne = k < 1.03
  const tone = atEdge ? C.good : ok ? C.good : C.g

  let notice
  if (atEdge) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'k=\\tfrac54'}</M>, <M>{'X=\\left(-\\tfrac12,\\tfrac12\\right)'}</M></b>, the point from part e.ii. The area is
        exactly <M>1</M>, so <M>{'s=1'}</M>: this end is included. Any larger <M>k</M> pulls <M>X</M> closer to <M>O</M> and{' '}
        <M>s</M> drops below <M>1</M>.
      </Notice>
    )
  } else if (nearOne) {
    notice = (
      <Notice tone="warn">
        As <M>k</M> approaches <M>1</M>, <M>X</M> heads for <M>(-1,\ 1)</M> and <M>s</M> heads for <M>4</M>. But <M>k=1</M> itself is
        not allowed (the question gives <M>{'k>1'}</M>), so the answer is <M>{'1<k\\le\\tfrac54'}</M>, not{' '}
        <M>{'1\\le k\\le\\tfrac54'}</M>.
      </Notice>
    )
  } else if (ok) {
    notice = (
      <Notice>
        Here <M>{'s(k)\\ge1'}</M>. The base <M>YZ</M> never changes, so the area depends only on the height <M>OX</M>. Slide{' '}
        <M>k</M> up and find exactly where <M>s</M> drops to <M>1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here <M>{'s(k)<1'}</M>: <M>X</M> is too close to <M>O</M>. The base <M>YZ=2\sqrt2</M> is fixed and the height is{' '}
        <M>OX</M>, along <M>y=-x</M>. Slide <M>k</M> down to make the triangle bigger, and find where <M>s</M> reaches{' '}
        <M>1</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.5, 1.5]} y={[-1.5, 1.5]} xStep={0.5} yStep={0.5} equalScale height={360}>
        <Polygon points={[X, [1, 1], [-1, -1]]} color={tone} fillOpacity={0.2} weight={2} />
        <Plot.OfX y={g} domain={[Math.max(-1.5, -k + 0.02), 1.5]} color={C.f} weight={3} />
        <Line.Segment point1={[-1.5, -1.5]} point2={[1.5, 1.5]} color={C.guide} weight={1.5} />
        <Line.Segment point1={[-1.5, 1.5]} point2={[1.5, -1.5]} color={C.guide} weight={1.5} style="dashed" />
        <Line.Segment point1={[0, 0]} point2={X} color={C.violet} weight={2.5} />
        <Point x={X[0]} y={X[1]} color={tone} />
        <Label at={X} color={tone} attach="nw">X</Label>
        <Point x={1} y={1} color={C.ink} />
        <Label at={[1, 1]} attach="se">Y</Label>
        <Point x={-1} y={-1} color={C.ink} />
        <Label at={[-1, -1]} attach="se">Z</Label>
        <Label at={[1.2, g(1.2)]} color={C.f} attach="n">g</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={1.01} max={3} step={0.005} format={v => v.toFixed(3)} />
        <Readouts>
          <Readout color={C.violet} tex={`OX = \\sqrt2\\left(k-\\sqrt{k^2-1}\\right) \\approx ${(Math.SQRT2 * h).toFixed(3)}`} />
          <Readout tex={`\\text{area} \\approx ${area.toFixed(3)}`} />
          <Readout color={tone} tex={`s(k) \\approx ${s.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
