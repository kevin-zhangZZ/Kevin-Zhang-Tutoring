// 2017 Methods Exam 2 Q4i(i) — the number of solutions of gₖ(x) = gₖ⁻¹(x) as k changes. Both
// curves always pass through the origin; the second crossing lies on y = x (gₖ is increasing) and
// is found by bisection on 2e^(kx) − 2 − x = 0. For k > 1/2 it is in the third quadrant, for k < 1/2
// in the first, and as k → 1/2 it slides into the origin and the two crossings merge: the curves
// just touch, with both tangents at O (dashed, gradients 2k and 1/(2k)) equal to y = x. So p = 1/2.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, num } from './kit'

const g = (k: number) => (x: number) => 2 * Math.exp(k * x) - 2
const gInv = (k: number) => (x: number) => Math.log((x + 2) / 2) / k

function bisect(fn: (x: number) => number, a: number, b: number): number {
  let fa = fn(a)
  for (let i = 0; i < 80; i++) {
    const m = (a + b) / 2
    const fm = fn(m)
    if (fa * fm <= 0) b = m
    else {
      a = m
      fa = fm
    }
  }
  return (a + b) / 2
}

/** The crossing of gₖ with y = x other than the origin, or null at k = 1/2. */
function otherRoot(k: number): number | null {
  if (Math.abs(k - 0.5) < 1e-9) return null
  const h = (x: number) => 2 * Math.exp(k * x) - 2 - x
  const xm = Math.log(1 / (2 * k)) / k // the minimum of h
  if (k > 0.5) return bisect(h, -2, xm)
  let hi = xm + 1
  while (h(hi) < 0) hi *= 2
  return bisect(h, xm, hi)
}

export default function Touch() {
  const [k, setK] = useState(1)
  const r = otherRoot(k)
  const gk = g(k)
  const gi = gInv(k)
  const t = (s: string) => s.replace('−', '-')

  let notice
  if (r === null) {
    notice = (
      <Notice tone="good">
        <b>One solution.</b> At <M>{'k=\\tfrac12'}</M> the graph of <M>{'g_k'}</M> touches <M>y=x</M> at the origin
        instead of crossing it (gradient <M>2k=1</M>), so its mirror image touches too, and both dashed tangents are{' '}
        <M>y=x</M> itself. The second crossing has merged into the origin: <M>{'p=\\tfrac12'}</M>.
      </Notice>
    )
  } else if (k > 0.5) {
    notice = (
      <Notice>
        For <M>{'k>\\tfrac12'}</M>, <M>{'g_k'}</M> leaves the origin steeper than <M>y=x</M> (gradient{' '}
        <M>{'2k>1'}</M>), so just to its left it is <em>below</em> <M>y=x</M>. Further left it levels off at{' '}
        <M>y=-2</M> while <M>y=x</M> keeps falling, so they must cross again, in the third quadrant. Slide <M>k</M> down and watch it run into the origin.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        For <M>{'k<\\tfrac12'}</M> the gradient <M>2k</M> at the origin is less than <M>1</M>, so <M>{'g_k'}</M> dips
        below <M>y=x</M> on the <em>right</em> and crosses back later, in the first quadrant. Every <M>k</M> except
        one gives two solutions. Slide <M>k</M> up to find the one that gives only the origin.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 4]} y={[-3, 4]} equalScale height={420}>
        {r !== null && <Region top={gi} bottom={gk} from={Math.min(0, r)} to={Math.max(0, r)} color={C.violet} opacity={0.2} />}
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[-3, -2]} point2={[4, -2]} color={C.f} style="dashed" weight={1} opacity={0.5} />
        <Line.Segment point1={[-2, -3]} point2={[-2, 4]} color={C.g} style="dashed" weight={1} opacity={0.5} />
        <Plot.OfX y={gk} domain={[-3, 4]} color={C.f} weight={3} />
        <Plot.OfX y={gi} domain={[-1.9995, 4]} color={C.g} weight={3} />
        <Line.PointSlope point={[0, 0]} slope={2 * k} color={C.f} weight={1.5} style="dashed" />
        <Line.PointSlope point={[0, 0]} slope={1 / (2 * k)} color={C.g} weight={1.5} style="dashed" />
        <Point x={0} y={0} color={r === null ? C.good : C.ink} />
        {r !== null && r > -3 && r < 4 && <Point x={r} y={r} color={C.ink} />}
        <Label at={[Math.min(Math.log(2.5) / k, 3.7), gk(Math.min(Math.log(2.5) / k, 3.7))]} color={C.f} attach="w">gₖ</Label>
        <Label at={[3.7, gi(3.7)]} color={C.g} attach="s">gₖ⁻¹</Label>
        <Label at={[-2.8, -2.8]} color={C.guide} attach="se" size={12}>y = x</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.3} max={1.5} step={0.01} />
        <Buttons>
          <ActionButton label="k = 1/2" onClick={() => setK(0.5)} />
        </Buttons>
        <Readouts>
          <Readout color={r === null ? C.good : undefined} tex={`\\text{solutions: } ${r === null ? 1 : 2}`} />
          {r !== null && <Readout tex={`x = 0,\\ x \\approx ${t(num(r))}`} />}
          <Readout color={C.f} tex={`g_k'(0) = 2k = ${num(2 * k)}`} />
          <Readout color={C.g} tex={`(g_k^{-1})'(0) = \\tfrac{1}{2k} = ${num(1 / (2 * k))}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
