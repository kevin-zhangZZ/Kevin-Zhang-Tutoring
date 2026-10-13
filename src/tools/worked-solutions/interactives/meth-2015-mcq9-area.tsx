// 2015 Methods Exam 2 MCQ 9 — the height 1/6 is fixed, so the total area (a − 2)/6 depends only on
// where the right edge a sits; the graph is a probability density function only when that area is 1,
// at a = 8. Slide a: the area readout and the balance point (2 + a)/2 move together. At a = 8 the
// balance point is E(X) = 5 (option B), not the right edge a = 8 (option A, 16%).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts, Slider } from './kit'

const H = 1 / 6

export default function Area() {
  const [a, setA] = useState(5)
  const area = (a - 2) * H
  const ok = Math.abs(a - 8) < 1e-9
  const mean = (2 + a) / 2
  const col = ok ? C.good : C.f

  let notice
  if (ok) {
    notice = (
      <Notice tone="good">
        <b>Area <M>= 6\times\tfrac16 = 1</M>: now it is a probability density function.</b> The rectangle balances at its
        middle, <M>\mathrm E(X) = 5</M>. The number 8 is where the rectangle <em>ends</em>, not its mean.
      </Notice>
    )
  } else if (a < 8) {
    notice = (
      <Notice tone="warn">
        Total area is only <M>{area.toFixed(2)}</M>, less than 1, so this is <b>not</b> a probability density
        function. The height is fixed at <M>\tfrac16</M>, so the only way to get area 1 is a wider rectangle. Slide{' '}
        <M>a</M> to the right.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Total area is <M>{area.toFixed(2)}</M>, more than 1: total probability can&apos;t exceed 1. Slide <M>a</M>{' '}
        back to the left.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 11]} y={[0, 0.25]} xStep={1} yStep={1 / 12} height={220} yLabels={v => (Math.abs(v - H) < 1e-9 ? '1/6' : '')}>
        <Polygon points={[[2, 0], [a, 0], [a, H], [2, H]]} color={col} fillOpacity={0.25} weight={2} />
        <Line.Segment point1={[mean, 0]} point2={[mean, H]} color={C.g} style="dashed" weight={2} />
        <Point x={mean} y={0} color={C.g} />
        <Label at={[mean, H]} attach="n" gap={10} color={C.g}>{ok ? 'E(X) = 5' : `middle ${mean.toFixed(1)}`}</Label>
        <Label at={[a, H / 2]} attach="e" color={col}>a</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={3} max={10} step={0.5} format={v => v.toFixed(1)} />
        <Readouts>
          <Readout color={col} tex={`\\text{area} = (a-2)\\times\\tfrac16 = ${area.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\text{balance point} = \\tfrac{2+a}{2} = ${mean.toFixed(1)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
