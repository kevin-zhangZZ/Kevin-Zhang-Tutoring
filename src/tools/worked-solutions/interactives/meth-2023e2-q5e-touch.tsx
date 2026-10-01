// 2023 Methods Exam 2 Q5e — while h(x) = (1/k)f(k − x) sits entirely above y = x, the inverse of
// h1 (a reflection of part of h in y = x) sits entirely below it, so the two graphs cannot meet.
// Increase k: h comes down, and the first contact is h just touching y = x (h = x and h′ = 1) at
// k ≈ 1.27, x ≈ 1.87 — on the right branch, so the inverse of h1 passes through the same point.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const h = (x: number, k: number) => (Math.exp(k - x) + Math.exp(x - k)) / k

// Tangency: h′ = 1 gives sinh(x − k) = k/2; then h = x gives k + asinh(k/2) = √(4 + k²)/k.
function tangentK() {
  let lo = 0.5
  let hi = 3
  const F = (k: number) => k + Math.asinh(k / 2) - Math.sqrt(4 + k * k) / k
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2
    if (F(m) > 0) hi = m
    else lo = m
  }
  return (lo + hi) / 2
}
const KSTAR = tangentK()
const XSTAR = KSTAR + Math.asinh(KSTAR / 2)

// smallest value of h(x) − x, at h′(x) = 1, i.e. x = k + asinh(k/2)
const gap = (k: number) => {
  const x = k + Math.asinh(k / 2)
  return { x, d: h(x, k) - x }
}

export default function Touch() {
  const [k, setK] = useState(1.1)
  const { x: xg, d } = gap(k)
  const near = Math.abs(k - KSTAR) < 0.006
  const above = !near && k < KSTAR

  let notice
  if (above) {
    notice = (
      <Notice>
        <b><M>h</M> is entirely above <M>y=x</M></b> (closest gap <M>{`\\approx ${d.toFixed(2)}`}</M>). The inverse of{' '}
        <M>h_1</M> is part of <M>h</M> reflected in <M>y=x</M>, so it is entirely <em>below</em> the line. One graph above
        the line and one below cannot meet. Increase <M>k</M>.
      </Notice>
    )
  } else if (near) {
    notice = (
      <Notice tone="good">
        <b>First contact: <M>h</M> just touches <M>y=x</M></b> at <M>{`(${XSTAR.toFixed(2)},\\ ${XSTAR.toFixed(2)})`}</M>,
        with <M>h(x)=x</M> and <M>h&apos;(x)=1</M>. Since <M>{`x\\approx${XSTAR.toFixed(2)}\\ge k`}</M>, the point is on{' '}
        <M>h_1</M>, so its reflection (itself) is on the inverse too. Smallest <M>{`k\\approx${KSTAR.toFixed(2)}`}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Now <M>h</M> dips below <M>y=x</M>, and <M>h</M> and the inverse of <M>h_1</M> cross. Every <M>k</M> above the
        touching value gives intersections, so the <em>smallest</em> <M>k</M> is the touching one. Click{' '}
        &ldquo;Go to the touch&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 5]} y={[0, 5]} equalScale height={360}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={x => h(x, k)} color={C.f} weight={3} />
        <Plot.Parametric xy={t => [h(t, k), t]} domain={[k, k + 3]} color={C.g} weight={3} />
        {above && <Line.Segment point1={[xg, xg]} point2={[xg, h(xg, k)]} color={C.bad} weight={2} />}
        {near && <Point x={XSTAR} y={XSTAR} color={C.good} />}
        <Label at={[4.6, 4.6]} color={C.guide} attach="nw">y = x</Label>
        <Label at={[k + 1.4, h(k + 1.4, k)]} color={C.f} attach="w">h</Label>
        <Label at={[h(k + 0.9, k), k + 0.9]} color={C.g} attach="se">inverse of h₁</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.8} max={2} step={0.002} format={v => v.toFixed(3)} />
        <Buttons>
          <ActionButton label="Go to the touch" onClick={() => setK(Math.round(KSTAR * 1000) / 1000)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\text{min of } h(x)-x \\approx ${d.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\text{touch at } k\\approx${KSTAR.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
