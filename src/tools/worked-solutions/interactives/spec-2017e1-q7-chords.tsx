// 2017 Specialist Exam 1 Q7 — arc length is a sum of tiny hypotenuses. The astroid arc
// r(t) = cos³t i + sin³t j, 0 ≤ t ≤ π/4, is cut into n chords at equal steps of t. n = 1 is the
// straight-line distance |r(π/4) − r(0)| ≈ 0.737 (a wrong answer in the report); as n grows the
// chord total climbs to the true length 3/4. A toggle adds the legs |Δx| + |Δy| of each little
// right triangle instead of its hypotenuse — what "square-rooting each term" computes — which
// gives 1 for every n and never approaches 3/4.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polyline, Readout, Readouts, Slider, Toggle } from './kit'

const T_END = Math.PI / 4
const r = (t: number): [number, number] => [Math.cos(t) ** 3, Math.sin(t) ** 3]
const EXACT = 0.75

function chordPoints(n: number): [number, number][] {
  return Array.from({ length: n + 1 }, (_, k) => r((T_END * k) / n))
}

export default function Chords() {
  const [n, setN] = useState(3)
  const [legs, setLegs] = useState(false)

  const pts = chordPoints(n)
  let chordSum = 0
  let legSum = 0
  for (let k = 0; k < n; k++) {
    const dx = pts[k + 1][0] - pts[k][0]
    const dy = pts[k + 1][1] - pts[k][1]
    chordSum += Math.hypot(dx, dy)
    legSum += Math.abs(dx) + Math.abs(dy)
  }
  // Each chord's right triangle: across (Δx) first, then up (Δy).
  const corners = pts.slice(0, -1).map((p, k) => [pts[k + 1][0], p[1]] as [number, number])
  const staircase: [number, number][] = []
  pts.forEach((p, k) => {
    staircase.push(p)
    if (k < n) staircase.push(corners[k])
  })
  const showGuides = !legs && n <= 8

  let notice
  if (legs) {
    notice = (
      <Notice tone="warn">
        <b>Adding the legs instead of the hypotenuse</b> gives <M>{'\\sum\\left(|\\Delta x|+|\\Delta y|\\right)=1'}</M> for
        every <M>n</M>: the red staircase always goes <M>{'1-\\tfrac{\\sqrt2}{4}'}</M> across and{' '}
        <M>{'\\tfrac{\\sqrt2}{4}'}</M> up, however fine the steps. That is what square-rooting each term separately
        computes, because <M>{'\\sqrt{a^2+b^2}\\ne a+b'}</M>. Only the hypotenuses close in on <M>{'\\tfrac34'}</M>.
      </Notice>
    )
  } else if (n === 1) {
    notice = (
      <Notice tone="warn">
        <b>One chord is the straight-line distance</b>{' '}
        <M>{'\\left|\\underset{\\sim}{r}\\left(\\tfrac{\\pi}{4}\\right)-\\underset{\\sim}{r}(0)\\right|\\approx 0.737'}</M>,
        which the report lists as a wrong answer. The particle travels along the curve, not across the gap, so the
        path is longer. Increase <M>n</M> to make the chords follow the curve.
      </Notice>
    )
  } else if (n < 12) {
    notice = (
      <Notice>
        Each orange chord is the hypotenuse of a little right triangle (dashed) with legs <M>\Delta x</M> and{' '}
        <M>\Delta y</M>, so its length is <M>{'\\sqrt{\\Delta x^2+\\Delta y^2}'}</M>. More chords hug the curve more
        closely and the total creeps up from <M>0.737</M>. Push <M>n</M> towards <M>24</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>The chords now hug the curve</b> and the total is <M>{`${chordSum.toFixed(4)}`}</M>. Writing each piece as{' '}
        <M>{'\\sqrt{\\left(\\tfrac{\\Delta x}{\\Delta t}\\right)^2+\\left(\\tfrac{\\Delta y}{\\Delta t}\\right)^2}\\,\\Delta t'}</M>{' '}
        and letting the pieces shrink turns the sum into the arc-length integral, which is exactly{' '}
        <M>{'\\tfrac34'}</M>. Now try &ldquo;Add the legs instead&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0.2, 1.12]} y={[-0.08, 0.5]} xStep={0.25} yStep={0.25} height={420} equalScale>
        <Plot.Parametric xy={r} domain={[T_END, Math.PI / 2]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.Parametric xy={r} domain={[0, T_END]} color={C.f} weight={3.5} />
        {showGuides &&
          pts.slice(0, -1).map((p, k) => (
            <Polyline
              key={`g${k}`}
              points={[p, corners[k], pts[k + 1]]}
              color={C.guide}
              weight={1.2}
              strokeStyle="dashed"
              fillOpacity={0}
            />
          ))}
        {legs ? (
          <Polyline points={staircase} color={C.bad} weight={2.5} fillOpacity={0} />
        ) : (
          pts.slice(0, -1).map((p, k) => (
            <Line.Segment key={`c${k}`} point1={p} point2={pts[k + 1]} color={C.g} weight={2.5} />
          ))
        )}
        {pts.map((p, k) => (
          <Point key={`p${k}`} x={p[0]} y={p[1]} color={legs ? C.bad : C.g} />
        ))}
        <Label at={[1, 0]} attach="ne" color={C.f}>t = 0</Label>
        <Label at={r(T_END)} attach="nw" color={C.f}>t = π/4</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={24} step={1} format={v => String(Math.round(v))} />
        <Toggle label="Add the legs instead" checked={legs} onChange={setLegs} />
        <Readouts>
          <Readout color={C.g} tex={`\\text{${n} chord${n === 1 ? '' : 's'}: } \\sum\\sqrt{\\Delta x^2+\\Delta y^2} \\approx ${chordSum.toFixed(4)}`} />
          {legs && <Readout color={C.bad} tex={`\\text{legs: } \\sum\\left(|\\Delta x|+|\\Delta y|\\right) = ${legSum.toFixed(4)}`} />}
          <Readout color={C.f} tex={`\\text{curve: } \\int_0^{\\pi/4} 3\\sin t\\cos t\\,dt = \\tfrac34 = ${EXACT.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
